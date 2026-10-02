[CmdletBinding()]
param(
    [string]$RepositoryRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$StateDirectory = (Join-Path $env:LOCALAPPDATA 'Matziq\NflPicks2026')
)

$ErrorActionPreference = 'Stop'
$taskName = 'Matziq NFL Picks 2026 Results'
$root = (Resolve-Path -LiteralPath $RepositoryRoot).Path
$statePath = [System.IO.Path]::GetFullPath($StateDirectory)
if ($statePath.TrimEnd('\') -eq $root.TrimEnd('\') -or $statePath.StartsWith($root.TrimEnd('\') + '\', [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'Watcher state and logs must be outside the publicly served repository.'
}
$python = (Get-Command python -ErrorAction Stop).Source
$python = (& $python -c 'import sys; print(sys.executable)').Trim()
if ($LASTEXITCODE -ne 0) { throw 'Cannot resolve the installed Python runtime.' }
$pythonWindowless = Join-Path (Split-Path -Parent $python) 'pythonw.exe'
if (-not (Test-Path -LiteralPath $pythonWindowless)) { throw 'pythonw.exe is required for a quiet interactive scheduled task.' }
$git = (Get-Command git -ErrorAction Stop).Source
$identity = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing -and $existing.Description -notlike 'Matziq NFL picks 2026:*') {
    throw "The task name '$taskName' is already owned by another task."
}
if ($existing -and $existing.State -eq 'Running') { throw 'The NFL watcher is currently running; retry installation after it exits.' }

$files = @('nfl_watch.py', 'nfl_results.py', 'nfl_common.py', 'nfl_season.py', 'nfl_forecasts.py')
$fingerprints = ($files | ForEach-Object { (Get-FileHash -LiteralPath (Join-Path $PSScriptRoot $_) -Algorithm SHA256).Hash }) -join ''
$algorithm = [System.Security.Cryptography.SHA256]::Create()
try { $version = ([BitConverter]::ToString($algorithm.ComputeHash([System.Text.Encoding]::ASCII.GetBytes($fingerprints)))).Replace('-','').ToLower().Substring(0,16) } finally { $algorithm.Dispose() }
$codePath = Join-Path (Join-Path $statePath 'code') $version
New-Item -ItemType Directory -Path $codePath -Force | Out-Null
foreach ($file in $files) {
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot $file) -Destination (Join-Path $codePath $file) -Force
}
$watcher = Join-Path $codePath 'nfl_watch.py'
& $python -B $watcher --repo-root $root --state-dir $statePath --git-exe $git --bootstrap
if ($LASTEXITCODE -ne 0) { throw 'Watcher bootstrap failed; inspect watcher.log. No task was registered or replaced.' }

$arguments = '-B "{0}" --repo-root "{1}" --state-dir "{2}" --git-exe "{3}" --poll' -f $watcher, $root, $statePath, $git
$action = New-ScheduledTaskAction -Execute $pythonWindowless -Argument $arguments -WorkingDirectory $statePath
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 5)
$logonTrigger = New-ScheduledTaskTrigger -AtLogOn -User $identity
$principal = New-ScheduledTaskPrincipal -UserId $identity -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 10)
$description = 'Matziq NFL picks 2026: monitors the remaining regular season and official playoffs through the last final plus corrections; checks every five minutes when due, coalesces result/forecast tabs, and preserves local user work. Requires this user to be signed in.'
if ($existing) {
    Set-ScheduledTask -TaskName $taskName -Action $action -Description $description | Out-Null
} else {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger @($trigger, $logonTrigger) -Principal $principal -Settings $settings -Description $description | Out-Null
}
Get-ScheduledTask -TaskName $taskName | Select-Object TaskName, State, @{Name='User'; Expression={$_.Principal.UserId}}, @{Name='LogonType'; Expression={$_.Principal.LogonType}}
Get-ScheduledTaskInfo -TaskName $taskName | Select-Object LastRunTime, LastTaskResult, NextRunTime
Write-Output "Private state and logs: $statePath"
