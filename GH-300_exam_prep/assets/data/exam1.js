window.GH3_DATA = window.GH3_DATA || {};

window.GH3_DATA.exam1 = {
  id: "exam1",
  name: "GH-300 \u2014 Practice Exam 1",
  timeMinutes: 100,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A team is concerned that generated code reviews may treat projects from different teams unevenly because of patterns in training data. Which responsible AI principle is MOST directly involved?</p>",
      choices: ["Fairness", "Transparency", "Privacy and security", "Accountability"],
      answer: 0,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Fairness is the principle that focuses on equitable treatment and reducing bias in AI outcomes. If Copilot output could advantage or disadvantage teams because of learned patterns, the concern is bias and fairness.</p><p>Transparency is about helping people understand AI behavior, not whether groups are treated equitably. Privacy and security protects data and systems. Accountability assigns responsibility and oversight, but it does not specifically name the bias concern.</p>"
    },
    {
      n: 2,
      prompt: "<p>A developer uses Copilot to draft an authorization check for an API endpoint. Before merging, what is the BEST responsible next step?</p>",
      choices: ["Merge the code because Copilot filters harmful output before delivery.", "Review, test, and verify the generated logic against the project security requirements.", "Accept only the parts that are longer than the surrounding code.", "Disable Copilot for the repository after any security-related suggestion."],
      answer: 1,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Copilot output must be validated by the developer. Security-sensitive authorization logic should be reviewed, tested, and checked against the actual project requirements before it is merged.</p><p>Filtering reduces some unsafe or low-quality output but does not prove the code is correct. Suggestion length is not a validation method. Disabling Copilot is not the responsible default response to one security-sensitive task; the key is human review and verification.</p>"
    },
    {
      n: 3,
      prompt: "<p>In an IDE, Copilot shows gray text at the cursor that completes the current line. What is this feature?</p>",
      choices: ["Next edit suggestions", "Agent mode", "Inline suggestions rendered as ghost text", "Copilot code review"],
      answer: 2,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Inline suggestions complete code at the cursor, and IDEs render those suggestions as ghost text. The gray text is the presentation of the inline suggestion, not a separate product capability.</p><p>Next edit suggestions predict where the next change should occur, not only what text to insert at the cursor. Agent mode performs broader multi-step work in the IDE. Copilot code review reviews changes rather than showing cursor-level completions.</p>"
    },
    {
      n: 4,
      prompt: "<p>A developer wants Copilot assistance from a terminal and plans to use the current command-line product rather than the old GitHub CLI extension. Which product should they install?</p>",
      choices: ["A GitHub App-based Copilot integration", "Copilot Spaces", "Copilot cloud agent", "The standalone GitHub Copilot CLI"],
      answer: 3,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>The current product name is GitHub Copilot CLI, and it is a standalone command-line tool. It supports interactive use and programmatic prompting from a terminal.</p><p>A GitHub App-based integration is not the current CLI path. Copilot Spaces provide reusable context, not terminal assistance. Copilot cloud agent is an autonomous GitHub-hosted agent and is distinct from local CLI use.</p>"
    },
    {
      n: 5,
      prompt: "<p>A developer in VS Code wants Copilot to inspect several files, plan edits, and apply changes inside the IDE while the developer supervises the work. Which feature best fits this scenario?</p>",
      choices: ["Agent mode in the IDE", "Copilot cloud agent", "Suggestions matching public code", "GitHub Copilot code referencing"],
      answer: 0,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>Agent mode in the IDE is designed for multi-step work inside the editor, such as inspecting project context, planning changes, and applying edits under developer supervision.</p><p>Copilot cloud agent is autonomous and runs on GitHub, so it is not the IDE-local agent mode. Suggestions matching public code is a policy for public-code matches. Code referencing provides attribution-related information and is not a multi-step editing mode.</p>"
    },
    {
      n: 6,
      prompt: "<p>A user receives Copilot access from two organizations in the same enterprise. For most policies, how are conflicting settings usually resolved?</p>",
      choices: ["The most restrictive policy always applies.", "The least restrictive policy usually applies.", "The user chooses the policy in personal settings.", "The oldest organization membership wins."],
      answer: 1,
      topic: "Organization Settings and Policies",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>When multiple organizations are within the same enterprise, the least restrictive policy usually applies for most Copilot policies. This direction is a common exam trap because it reverses in other enterprise scenarios.</p><p>The most restrictive policy almost always applies when the organizations are in different enterprises, not usually within the same enterprise. A user with organization-provided access cannot override organization policy in personal settings. Policy resolution is not based on membership age.</p>"
    },
    {
      n: 7,
      prompt: "<p>During Copilot prompt processing, which context can be gathered while the prompt is securely transmitted?</p>",
      choices: ["Only the final compiled binary", "Only the repository issue list", "Code before and after the cursor, file type, open tabs, and project structure", "Only prompts from previous users in the organization"],
      answer: 2,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "easy",
      explanation: "<p>The documented inbound flow gathers context such as code before and after the cursor, filename and file type, adjacent open tabs, project structure, file paths, languages, and frameworks while transmitting the prompt over HTTPS.</p><p>The final compiled binary is not the described prompt context. Repository issue lists are not named in the canonical prompt-flow context. Prompts from other users are not gathered as local context for a developer request.</p>"
    },
    {
      n: 8,
      prompt: "<p>A team evaluates why Copilot performs worse on a niche internal framework than on common web frameworks. Which limitation category best explains this?</p>",
      choices: ["Feedback loop delivery", "IP indemnity", "Organization policy precedence", "Language and framework specificity"],
      answer: 3,
      topic: "Lifecycle and Limitations",
      objective: "3.2",
      difficulty: "easy",
      explanation: "<p>Language and framework specificity is one of the named limitation categories. Copilot performance can vary across languages and frameworks, especially when a technology is niche or less represented in training data.</p><p>The feedback loop describes how accepted, modified, and rejected suggestions inform future behavior. IP indemnity is a contractual protection for some plans. Organization policy precedence controls feature availability, not model performance on uncommon frameworks.</p>"
    },
    {
      n: 9,
      prompt: "<p>A developer asks Copilot to refactor, write tests, update docs, and redesign the deployment model in one prompt. Which of the 4 Ss is most directly violated?</p>",
      choices: ["Single", "Surround", "Short", "Specific"],
      answer: 0,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Single means focusing a prompt on one well-defined task or question. Combining refactoring, tests, documentation, and deployment redesign asks Copilot to solve several tasks at once.</p><p>Surround is about helpful context such as filenames and related open files. Short is about keeping the prompt concise. Specific is about explicit detail; this prompt has many goals, but the clearest violation is that it is not a single task.</p>"
    },
    {
      n: 10,
      prompt: "<p>A developer wants better performance from Copilot Chat while iterating on a complex bug. What should they manage carefully across turns?</p>",
      choices: ["The IDE window color theme", "Chat history and the context carried into later prompts", "The number of public repositories on GitHub", "The exam scaled-score formula"],
      answer: 1,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Prompt engineering for performance includes the process flow and chat history usage. Prior turns can shape later responses, so the developer should manage the active context and history deliberately.</p><p>The IDE theme does not improve Copilot reasoning. The number of public repositories is not under the developer's control during prompting. The exam scoring model has no relationship to Copilot Chat performance.</p>"
    },
    {
      n: 11,
      prompt: "<p>An engineering director wants to measure Copilot usage and coding impact over time. Which metric is specifically named in GitHub Copilot usage measurement guidance?</p>",
      choices: ["Number of deleted branches", "Average repository age", "Lines of Code Accepted", "Count of open pull requests"],
      answer: 2,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>Lines of Code Accepted is one of the named Copilot impact metrics, along with Average Daily Active Users and Total Acceptance Rate. These metrics can help evaluate usage and productivity trends.</p><p>Deleted branches, repository age, and open pull request count can be useful engineering metrics, but they are not the specific Copilot usage metrics named in the study material.</p>"
    },
    {
      n: 12,
      prompt: "<p>A repository uses CodeQL code scanning and receives an alert on the default branch. The team wants an AI-generated fix suggestion but does not have Copilot seats assigned. Which statement is correct?</p>",
      choices: ["Copilot Autofix is unavailable without a paid Copilot seat.", "Only Copilot Enterprise can generate a fix for CodeQL alerts.", "The team must enable Copilot cloud agent first.", "Copilot Autofix for CodeQL analysis does not require a GitHub Copilot subscription."],
      answer: 3,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "easy",
      explanation: "<p>Copilot Autofix for code scanning automatically generates fix suggestions for CodeQL alerts on pull requests and the default branch, and it does not require a GitHub Copilot subscription.</p><p>A paid Copilot seat, Copilot Enterprise, and Copilot cloud agent are not prerequisites for this specific CodeQL Autofix capability. Assuming a Copilot subscription is required is a known trap.</p>"
    },
    {
      n: 13,
      prompt: "<p>An organization wants to prevent Copilot from using sensitive files as context. Which plans support content exclusions?</p>",
      choices: ["Copilot Business and Copilot Enterprise", "Copilot Free and Copilot Pro only", "All individual plans but no organization plans", "Only GitHub Enterprise Server deployments"],
      answer: 0,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "medium",
      explanation: "<p>Content exclusion is available for Copilot Business and Copilot Enterprise. It can be configured by repository administrators, organization owners, or enterprise owners depending on scope and seat assignment.</p><p>Individual plans such as Free, Pro, Pro+, and Max do not provide content exclusion. GitHub Enterprise Server is not a supported Copilot deployment target, so it is not the right answer.</p>"
    },
    {
      n: 14,
      prompt: "<p>An organization blocks Suggestions matching public code. Which suggestions are checked against GitHub's public-code index?</p>",
      choices: ["All code ever typed by the developer", "Accepted, unmodified Copilot suggestions", "Code copied from private repositories", "Suggestions after the developer rewrites them"],
      answer: 1,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "medium",
      explanation: "<p>The public-code matching process checks accepted, unmodified Copilot suggestions. When the setting is Block and a match is detected, the matching suggestion is not shown or accepted as-is.</p><p>Code written by the developer is not checked by this mechanism. Private repository code and code outside GitHub are not in the public-code index. Suggestions that the developer alters are not checked as accepted, unmodified suggestions.</p>"
    },
    {
      n: 15,
      prompt: "<p>A company assigns a senior engineer to own Copilot rollout decisions, review incidents, and define who is responsible for AI-assisted changes. Which responsible AI principle is MOST directly reflected?</p>",
      choices: ["Inclusiveness", "Fairness", "Accountability", "Transparency"],
      answer: 2,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Accountability is about governance, oversight, and responsibility for AI system outcomes. Assigning ownership for rollout decisions and incidents directly supports that principle.</p><p>Inclusiveness focuses on making systems usable by people with different needs. Fairness addresses bias and equitable treatment. Transparency addresses disclosure and explainability, not primarily ownership of decisions.</p>"
    },
    {
      n: 16,
      prompt: "<p>Copilot suggests a database migration that appears syntactically valid. What is the BEST way to operate responsibly before applying it to production?</p>",
      choices: ["Apply it immediately because generated migrations are deterministic.", "Trust it if the prompt included the correct table name.", "Rely on the public-code matching setting to catch schema errors.", "Review the migration, run it in a safe environment, and confirm rollback behavior."],
      answer: 3,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Responsible operation requires validation of AI output. A migration can change or destroy data, so it should be reviewed, tested in a safe environment, and paired with confirmed rollback behavior before production use.</p><p>Generated migrations are not guaranteed deterministic or correct. Including a table name does not prove the logic is safe. Public-code matching is not a schema validation or migration-safety tool.</p>"
    },
    {
      n: 17,
      prompt: "<p>A developer has just renamed a function. Copilot highlights a different file and suggests updating a call site there. Which IDE capability is this?</p>",
      choices: ["Next edit suggestions", "Inline ghost text only", "Copilot Autofix", "Organization custom instructions"],
      answer: 0,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Next edit suggestions predict the location of the developer's next likely edit. After a rename, suggesting a call-site update in another place matches that capability.</p><p>Inline ghost text completes code at the cursor rather than identifying another edit location. Copilot Autofix is tied to CodeQL code scanning alerts. Organization custom instructions guide behavior but are not the IDE feature that predicts the next edit location.</p>"
    },
    {
      n: 18,
      prompt: "<p>A developer wants to run GitHub Copilot CLI non-interactively from a script by passing a prompt directly. Which option is designed for that use?</p>",
      choices: ["A repository-wide instruction file only", "The -p or --prompt option", "A Copilot Space export", "The GitHub website code review UI"],
      answer: 1,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>GitHub Copilot CLI can run interactively or programmatically. The -p or --prompt option passes a prompt directly for non-interactive use from scripts or command lines.</p><p>Repository instructions may influence Copilot behavior in supported contexts but do not invoke the CLI. Copilot Spaces provide reusable context. The GitHub website code review UI is not a command-line execution mode.</p>"
    },
    {
      n: 19,
      prompt: "<p>An enterprise wants to provide organization-wide documentation context for Copilot after the older context feature was retired. What should it use now?</p>",
      choices: ["A retired Copilot knowledge base", "A legacy GitHub App-based Copilot integration", "Copilot Spaces", "GitHub Enterprise Server"],
      answer: 2,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Copilot Spaces are the current feature for organizing reusable context such as documentation. The retired knowledge bases feature was replaced by Copilot Spaces.</p><p>Retired knowledge bases are no longer the current capability. GitHub App-based Copilot Extensions were sunset and replaced by MCP servers for that extensibility model. GitHub Enterprise Server does not currently support GitHub Copilot.</p>"
    },
    {
      n: 20,
      prompt: "<p>A security team searches the GitHub audit log expecting to find every prompt a developer sent to Copilot locally. What should they know?</p>",
      choices: ["Local client prompts are retained in the audit log for 180 days.", "Local prompts appear only when Suggestions matching public code is blocked.", "Prompt text is visible by searching action:copilot.", "The audit log does not include local client session data such as prompts."],
      answer: 3,
      topic: "Organization Settings and Policies",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>The audit log records Copilot plan changes, policy events, license events, and agent activity on the GitHub website, but it does not include client session data such as prompts a user sends to Copilot locally.</p><p>The 180-day retention applies to audit log retention, not to storing local prompt text. Public-code matching settings do not cause prompts to appear in the audit log. action:copilot finds Copilot audit events, not local prompt contents.</p>"
    },
    {
      n: 21,
      prompt: "<p>In the inbound Copilot prompt flow, which component is responsible for blocking prompt injection and jailbreak attempts before the request reaches the model?</p>",
      choices: ["The proxy filter", "The feedback loop", "The model picker", "The pull request summary feature"],
      answer: 0,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>The inbound proxy filter blocks prompt injection and jailbreak attempts before the prompt proceeds to later processing. It is hosted in a GitHub-owned Microsoft Azure tenant as part of the documented flow.</p><p>The feedback loop concerns learning from accepted, modified, and rejected suggestions. The model picker chooses among available models. Pull request summaries describe PR changes and are not the inbound prompt-injection defense.</p>"
    },
    {
      n: 22,
      prompt: "<p>A practice item asks for the Microsoft Learn training description of Copilot Chat's older context-window size. Which framing is safest for an exam-source explanation?</p>",
      choices: ["It has no context limit in any editor.", "The training described a smaller context window, while current product reality is larger.", "It always reads every file in every repository without filtering.", "The context window is controlled only by the user profile photo setting."],
      answer: 1,
      topic: "Lifecycle and Limitations",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>The study material described a much smaller context window than current Copilot capabilities. A fair exam-prep explanation should identify the exam-source framing and note that the live product has since changed.</p><p>Saying there is no context limit is not supported. Copilot does not automatically read every file in every repository without filtering. User profile settings do not control context-window size.</p>"
    },
    {
      n: 23,
      prompt: "<p>A developer keeps related files open and uses descriptive filenames so Copilot has better surrounding context. Which of the 4 Ss does this demonstrate?</p>",
      choices: ["Short", "Single", "Surround", "Specific"],
      answer: 2,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Surround means using helpful surrounding context, including descriptive filenames and related open files. It helps Copilot infer the task more accurately.</p><p>Short means concise prompting. Single means one well-defined task. Specific means explicit and detailed instructions. Those are useful, but the scenario is specifically about surrounding context.</p>"
    },
    {
      n: 24,
      prompt: "<p>A developer includes two examples of the desired function format before asking Copilot to create a third similar function. What prompting technique is being used?</p>",
      choices: ["Zero-shot prompting", "Role prompting", "Prompt injection", "Few-shot prompting"],
      answer: 3,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "easy",
      explanation: "<p>Few-shot prompting provides multiple examples so the model can follow the pattern for a new task. Showing two functions before asking for a third is a few-shot approach.</p><p>Zero-shot prompting provides no examples. Role prompting asks the model to act in a role such as a security expert. Prompt injection is an attack pattern, not a performance technique for giving examples.</p>"
    },
    {
      n: 25,
      prompt: "<p>A team is modernizing a legacy module and asks Copilot to propose a clearer implementation plus documentation comments. Which productivity use case does this represent?</p>",
      choices: ["Refactoring and documentation assistance", "Audit log streaming", "Enterprise policy inheritance", "Exam renewal scheduling"],
      answer: 0,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "easy",
      explanation: "<p>Copilot can help with code generation, refactoring, modernization of legacy code, and documentation. Asking for a clearer implementation and documentation comments directly matches that productivity use case.</p><p>Audit log streaming, policy inheritance, and renewal scheduling are administrative or certification topics. They do not describe using Copilot to improve code quality in a legacy module.</p>"
    },
    {
      n: 26,
      prompt: "<p>Copilot Autofix prepares a fix suggestion for a CodeQL alert. Which input format is specifically named as part of the alert data it uses?</p>",
      choices: ["JUnit XML only", "SARIF", "A PDF threat model", "A spreadsheet of team assignments"],
      answer: 1,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Copilot Autofix uses CodeQL alert data in SARIF format, surrounding code snippets, and query help text to generate a code change and natural language explanation.</p><p>JUnit XML is commonly associated with test reports, not the named CodeQL alert input here. PDF threat models and team spreadsheets are not the documented Autofix inputs.</p>"
    },
    {
      n: 27,
      prompt: "<p>An organization excludes a sensitive configuration file from Copilot. What is an expected effect of content exclusion?</p>",
      choices: ["Copilot still reviews the file in code review but hides its path.", "Only public-code matching is disabled for that file.", "The file content will not inform Copilot responses.", "The file is automatically deleted from the repository."],
      answer: 2,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "medium",
      explanation: "<p>For affected files, content exclusion means the content will not inform Copilot's responses. Inline suggestions are also unavailable in affected files, and those files are not reviewed in Copilot code review.</p><p>Copilot code review does not review excluded files. Public-code matching is a separate safeguard, not the only effect of exclusion. Content exclusion does not delete or modify repository files.</p>"
    },
    {
      n: 28,
      prompt: "<p>A developer with a Copilot seat assigned by an organization tries to change their personal Suggestions matching public code setting. What happens?</p>",
      choices: ["The personal setting overrides the organization for that developer.", "The setting is ignored only in VS Code.", "The developer can change it after accepting one matching suggestion.", "The toggle is locked and reflects the organization or enterprise policy."],
      answer: 3,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "hard",
      explanation: "<p>When a Copilot seat is assigned by an organization, the Suggestions matching public code setting is inherited from the organization or enterprise. The personal toggle is locked and reflects that policy.</p><p>Personal settings do not override organization-provided policy. The behavior is not limited to VS Code. Accepting a suggestion does not unlock the setting or change the inherited policy.</p>"
    },
    {
      n: 29,
      prompt: "<p>A Copilot governance review focuses on preventing prompts from exposing names, addresses, and identification numbers. Which responsible AI principle is MOST directly involved?</p>",
      choices: ["Privacy and security", "Fairness", "Inclusiveness", "Transparency"],
      answer: 0,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Privacy and security focuses on protecting personal data and systems. Names, addresses, and identification numbers are specifically aligned with personal-data concerns in Copilot filtering.</p><p>Fairness addresses bias and equitable treatment. Inclusiveness addresses access and usability for diverse users. Transparency addresses disclosure and explainability, not primarily protection of personal identifiers.</p>"
    },
    {
      n: 30,
      prompt: "<p>Copilot generates an unfamiliar API call that compiles. What is the BEST validation approach before relying on it?</p>",
      choices: ["Assume compilation proves semantic correctness.", "Check the API documentation, run targeted tests, and review error handling.", "Trust it if it uses a common package name.", "Skip review because Copilot suggestions are filtered outbound."],
      answer: 1,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Validation means confirming that generated output is correct for the actual task. For an unfamiliar API call, documentation review, targeted tests, and error-handling review are appropriate checks.</p><p>Compilation does not prove semantic correctness. A common package name does not prove the call is current or suitable. Outbound filtering does not replace developer validation of API behavior.</p>"
    },
    {
      n: 31,
      prompt: "<p>A developer wants to use Edit mode for multi-file changes. Which IDE support statement is current?</p>",
      choices: ["Edit mode is supported in every editor that supports inline suggestions.", "Edit mode is supported only on the GitHub website.", "Edit mode is supported in VS Code and JetBrains.", "Edit mode is available in NeoVim but not VS Code."],
      answer: 2,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Edit mode is currently supported in VS Code and JetBrains. The study guide may use the older name for this capability, but the current product name is Edit mode.</p><p>Edit mode is not supported in every editor with inline suggestions. It is not only a GitHub website feature. NeoVim is not listed as supporting Edit mode, while VS Code is supported.</p>"
    },
    {
      n: 32,
      prompt: "<p>In GitHub Copilot CLI, a developer wants to cycle into plan mode during an interactive session. Which key sequence is documented for cycling modes?</p>",
      choices: ["Ctrl+P", "Alt+Enter", "Esc twice", "Shift+Tab"],
      answer: 3,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>GitHub Copilot CLI includes a plan mode, and Shift+Tab cycles modes during an interactive session. This lets a developer change how the CLI approaches the task.</p><p>Ctrl+P, Alt+Enter, and pressing Esc twice are plausible terminal or editor shortcuts, but they are not the documented Copilot CLI mode-cycling shortcut in the facts brief.</p>"
    },
    {
      n: 33,
      prompt: "<p>A repository wants reusable prompt templates for consistent Copilot responses in supported IDEs. Where should prompt files be stored?</p>",
      choices: [".github/prompts/*.prompt.md", ".github/hooks/*.json", "AGENTS.md only", "The enterprise audit log"],
      answer: 0,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Prompt files live at .github/prompts/*.prompt.md. They provide reusable prompts for consistent responses in supported IDE contexts.</p><p>.github/hooks/*.json is for hooks, not prompt files. AGENTS.md is an agent instruction file, not the prompt-file location. The enterprise audit log records events and is not a repository prompt-template location.</p>"
    },
    {
      n: 34,
      prompt: "<p>An enterprise wants to allow the Copilot app but block GitHub Copilot CLI. What policy fact makes this possible?</p>",
      choices: ["The Copilot app inherits only personal custom instructions.", "The Copilot app and Copilot CLI are governed by separate client policies.", "The CLI is controlled only by the Suggestions matching public code setting.", "The app is always enabled when any organization enables Copilot Chat."],
      answer: 1,
      topic: "Organization Settings and Policies",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>The Copilot app and GitHub Copilot CLI are governed by separate, independent client policies. An enterprise can allow one client while disallowing the other.</p><p>Personal custom instructions do not determine client availability. Suggestions matching public code is a content safeguard, not the CLI availability policy. Enabling Copilot Chat does not automatically force the app to be enabled.</p>"
    },
    {
      n: 35,
      prompt: "<p>Before Copilot performs intent extraction in the inbound prompt flow, which filter checks for hate speech, inappropriate content, and personal data?</p>",
      choices: ["Code quality validation", "Public-code matching", "Toxicity filtering", "IP indemnity review"],
      answer: 2,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Toxicity filtering runs before intent extraction and checks categories including hate speech, inappropriate content, and personal data such as names, addresses, or identification numbers.</p><p>Code quality validation is part of outbound post-processing. Public-code matching is an optional outbound safeguard when enabled. IP indemnity is a contractual protection, not an inbound filter step.</p>"
    },
    {
      n: 36,
      prompt: "<p>A training module explains that Copilot can adapt a model using a smaller target dataset while leaving the original model unchanged by adding small trainable parts to each layer. What technique is described?</p>",
      choices: ["Content exclusion", "Prompt injection", "Semantic code search", "LoRA"],
      answer: 3,
      topic: "Lifecycle and Limitations",
      objective: "3.2",
      difficulty: "hard",
      explanation: "<p>LoRA, or Low-Rank Adaptation, adds smaller trainable parts to each layer while leaving the original model unchanged. The facts brief notes that GitHub explicitly uses LoRA.</p><p>Content exclusion controls whether selected files can inform Copilot. Prompt injection is an attack against prompt handling. Semantic code search is not the named fine-tuning or adaptation method described here.</p>"
    },
    {
      n: 37,
      prompt: "<p>A developer asks Copilot to act as a testing specialist before suggesting assertions for edge cases. Which prompting approach is this?</p>",
      choices: ["Role prompting", "Zero-shot prompting", "Content exclusion", "Audit log querying"],
      answer: 0,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Role prompting asks Copilot to respond from a specified perspective, such as a testing specialist, security expert, or performance optimizer. The role frames the kind of response expected.</p><p>Zero-shot prompting means asking without examples, but the distinctive feature here is the assigned role. Content exclusion is a privacy control. Audit log querying is an administrative activity.</p>"
    },
    {
      n: 38,
      prompt: "<p>A developer's prompt says only, <em>fix it</em>, after opening a large repository. Which prompt engineering principle would most improve the request?</p>",
      choices: ["Use fewer words in every prompt.", "Add specific details about the failure, expected behavior, and relevant files.", "Remove all surrounding context from the IDE.", "Switch the public-code setting from Block to Allow."],
      answer: 1,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Specific prompts give explicit, detailed instructions. Describing the failure, expected behavior, and relevant files gives Copilot enough context to produce a useful answer.</p><p>Fewer words are not always better if the prompt loses necessary detail. Removing context works against the Surround principle. The public-code setting is a safeguard and does not make an unclear prompt specific.</p>"
    },
    {
      n: 39,
      prompt: "<p>A manager wants both quantitative Copilot usage data and developer sentiment about usage. Which pair of sources is named for measuring impact?</p>",
      choices: ["The billing receipt and exam transcript", "The repository star count and branch list", "The REST API for Copilot usage metrics and the GitHub Copilot Developer Survey", "The local shell history and browser cache"],
      answer: 2,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>The facts brief names the REST API for Copilot usage metrics and the GitHub Copilot Developer Survey as sources for measuring impact through the evaluation stages.</p><p>Billing receipts, exam transcripts, stars, branch lists, shell history, and browser cache may contain other information, but they are not the named Copilot impact measurement sources.</p>"
    },
    {
      n: 40,
      prompt: "<p>A developer asks Copilot to create tests for a new parser. Which request best targets testing quality?</p>",
      choices: ["Write any test that increases the file count.", "Only generate comments that describe the parser.", "Skip assertions because Copilot generated the code.", "Generate unit tests with edge cases and explicit assertions for invalid input."],
      answer: 3,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Copilot can support testing by generating unit and integration tests, identifying edge cases, and writing assertions. Parser tests should include invalid inputs and clear expected outcomes.</p><p>Increasing file count is not a quality goal. Comments do not validate parser behavior. Skipping assertions prevents tests from checking correctness and is especially risky when AI generated the code.</p>"
    },
    {
      n: 41,
      prompt: "<p>A repository administrator excludes a path that is reached through a symbolic link. Why might Copilot still use the content?</p>",
      choices: ["Content exclusions do not apply to symbolic links or repositories on remote filesystems.", "Content exclusions apply only to Markdown files.", "Content exclusions are available only in Copilot Free.", "Content exclusions delete symlinks before Copilot can read them."],
      answer: 0,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "hard",
      explanation: "<p>The content exclusion documentation states that exclusions do not apply to symbolic links or repositories located on remote filesystems. That limitation can explain why content reached through a symlink is still available.</p><p>Content exclusions are not limited to Markdown files and are not a Copilot Free feature. They do not delete symlinks or repository content; they control whether eligible content is used by Copilot.</p>"
    },
    {
      n: 42,
      prompt: "<p>A developer reports that inline suggestions disappeared in a file after the organization added it to a content exclusion rule. What is the BEST interpretation?</p>",
      choices: ["The IDE extension is necessarily broken.", "This is expected because inline suggestions are not available in affected files.", "The public-code index is temporarily stale.", "The file must have been removed from the repository."],
      answer: 1,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "medium",
      explanation: "<p>When a file is affected by content exclusion, inline suggestions are not available in that file. The disappearance is therefore expected behavior if the exclusion rule matches.</p><p>An IDE failure is not the best interpretation without more evidence. Public-code index staleness relates to Suggestions matching public code, not excluded-file inline availability. Content exclusion does not remove files from the repository.</p>"
    },
    {
      n: 43,
      prompt: "<p>A team verifies that its Copilot rollout includes accessible guidance for developers with different abilities and workflows. Which responsible AI principle is MOST directly reflected?</p>",
      choices: ["Accountability", "Privacy and security", "Inclusiveness", "Fairness"],
      answer: 2,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Inclusiveness focuses on designing AI systems and guidance so people with different abilities, backgrounds, and workflows can use them effectively.</p><p>Accountability is about governance and responsibility. Privacy and security protects data and systems. Fairness addresses equitable treatment and bias, which is related but not as direct as accessibility and inclusive use.</p>"
    },
    {
      n: 44,
      prompt: "<p>Copilot drafts code that uses an outdated library pattern. What is the MOST responsible conclusion?</p>",
      choices: ["The code is safe because Copilot generated it.", "The code is safe if no public-code match appears.", "The code should be accepted because older patterns are always more stable.", "The developer should validate it because model suggestions can reflect outdated practices."],
      answer: 3,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>One limitation of LLM-based tools is dependency on training data, which can lead to outdated practices. The developer should validate the suggested pattern against current project and library guidance.</p><p>Copilot generation does not guarantee safety. No public-code match does not prove that an API pattern is current. Older patterns are not automatically more stable or appropriate.</p>"
    },
    {
      n: 45,
      prompt: "<p>A developer configures content exclusions for a repository and then uses Edit mode in VS Code. Which limitation should they know?</p>",
      choices: ["Content exclusion is currently not supported in Edit and Agent modes in editors.", "Content exclusion works only in GitHub Enterprise Server.", "Content exclusion affects only pull request summaries.", "Content exclusion is available only for personal Copilot Pro accounts."],
      answer: 0,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>Current documentation states that content exclusion is not supported in Edit and Agent modes of Copilot Chat in VS Code and other editors. This is an important current-product limitation for IDE use.</p><p>GitHub Enterprise Server does not currently support Copilot. Content exclusion affects inline suggestions, context use, responses, and code review, not only PR summaries. Content exclusion is for Copilot Business and Enterprise, not personal Pro accounts.</p>"
    },
    {
      n: 46,
      prompt: "<p>A developer wants to use GitHub Copilot CLI on a Windows workstation. Which environment is supported?</p>",
      choices: ["Only a Linux container with no Windows terminal access", "Windows PowerShell and WSL", "Only NeoVim running inside SSH", "Only the GitHub Mobile app"],
      answer: 1,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>GitHub Copilot CLI runs on Linux, macOS, and Windows, including Windows PowerShell and WSL. That makes it suitable for a Windows workstation terminal workflow.</p><p>A Linux-only container, NeoVim over SSH, and GitHub Mobile are not the stated Windows CLI support path. Mobile and editor contexts are distinct from the standalone CLI.</p>"
    },
    {
      n: 47,
      prompt: "<p>A study guide still mentions Copilot Spark, but a current exam-prep site must describe the live product accurately. How should the feature be framed?</p>",
      choices: ["As the primary current way to build new apps with Copilot", "As the replacement for MCP servers", "As a retired feature, with current work moving to VS Code, Copilot CLI, and the GitHub Copilot app", "As a GitHub Enterprise Server-only feature"],
      answer: 2,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>Copilot Spark should be covered only as a retired feature. The current replacement framing is to build directly with Copilot in VS Code, GitHub Copilot CLI, and the GitHub Copilot app.</p><p>It should not be presented as the current primary way to build new apps. It did not replace MCP servers. It is not a GitHub Enterprise Server-only feature, and Copilot is not currently available for GitHub Enterprise Server.</p>"
    },
    {
      n: 48,
      prompt: "<p>During outbound post-processing, Copilot detects that a response fails quality or safety checks. What can happen to that response?</p>",
      choices: ["It is always delivered with a warning banner.", "It bypasses filters if the user chose a different model.", "It is stored in the audit log as the final answer.", "It can be truncated or discarded."],
      answer: 3,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>In outbound post-processing, the toxicity filter runs again and the proxy applies final checks such as code quality and optional public-code matching. If any part fails, the response can be truncated or discarded.</p><p>A failed response is not always delivered with a warning. Content filters apply regardless of model choice. The audit log does not store local client session prompt and response content as final answers.</p>"
    },
    {
      n: 49,
      prompt: "<p>A developer asks Copilot, without providing examples, to write a function that parses a date string. What prompting style is this?</p>",
      choices: ["Zero-shot prompting", "Few-shot prompting", "One-shot prompting", "Prompt injection"],
      answer: 0,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Zero-shot prompting asks the model to perform a task without providing examples. The developer gives an instruction but no sample input-output pattern.</p><p>Few-shot prompting provides multiple examples. One-shot prompting provides one example. Prompt injection is an attempt to manipulate the model or reveal system behavior, not a normal no-example prompting style.</p>"
    },
    {
      n: 50,
      prompt: "<p>A developer is debugging a multi-step issue and asks Copilot to first identify likely causes, then design tests, then propose a fix. Which technique is this closest to?</p>",
      choices: ["Disabling all context", "Chain prompting", "Public-code blocking", "IP indemnity"],
      answer: 1,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Chain prompting breaks a complex task into a sequence of related prompts or steps. Asking Copilot to diagnose, test, and then fix in order matches that process-oriented technique.</p><p>Disabling context would make the task harder. Public-code blocking is a safeguard. IP indemnity is a contractual protection for eligible plans when the public-code setting is blocked.</p>"
    },
    {
      n: 51,
      prompt: "<p>A junior developer uses Copilot Chat to understand an unfamiliar framework without leaving the IDE. Which productivity benefit is most directly shown?</p>",
      choices: ["Replacing all code review requirements", "Changing enterprise policy precedence", "Accelerating learning and reducing context switching", "Guaranteeing that generated code has no defects"],
      answer: 2,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>Copilot can accelerate learning and reduce context switching by answering questions and explaining code in the developer's workflow. Understanding an unfamiliar framework inside the IDE directly fits that benefit.</p><p>Copilot does not replace all code review requirements or guarantee defect-free output. Enterprise policy precedence is an administration topic, not the productivity benefit in this scenario.</p>"
    },
    {
      n: 52,
      prompt: "<p>Copilot suggests a performance optimization that changes caching behavior. What should the developer do before merging?</p>",
      choices: ["Merge it because performance suggestions are validated by indemnity.", "Accept it only if it contains no comments.", "Skip tests because caching changes are deterministic.", "Benchmark and test the change, including correctness under stale or concurrent data."],
      answer: 3,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "hard",
      explanation: "<p>Copilot can suggest performance optimizations, but the developer must validate them. Caching changes require benchmarks and correctness tests, especially around stale data and concurrency.</p><p>IP indemnity does not validate performance behavior. The presence or absence of comments is irrelevant to correctness. Caching behavior is not automatically deterministic or safe without targeted tests.</p>"
    },
    {
      n: 53,
      prompt: "<p>An enterprise owner configures content exclusion. Which data is sent to GitHub's server so the correct policy can be returned to the client?</p>",
      choices: ["Only the repository URL", "The full contents of every excluded file", "All local prompt history", "Every accepted suggestion in the repository"],
      answer: 0,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "hard",
      explanation: "<p>For content exclusion policy lookup, only the repository URL is sent so the correct policy can be returned. The facts brief also notes that these URLs are not logged anywhere.</p><p>The full contents of excluded files, local prompt history, and every accepted suggestion are not the data sent for this content-exclusion policy lookup.</p>"
    },
    {
      n: 54,
      prompt: "<p>A developer switches Copilot Chat to a different available model and assumes content filters no longer apply. What is correct?</p>",
      choices: ["Filters apply only to the default model.", "Content filters apply regardless of which model is selected.", "Filters apply only when Copilot Free is used.", "Filters are replaced by the IDE color theme."],
      answer: 1,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "hard",
      explanation: "<p>Content filters apply regardless of which model is chosen. This includes filters on input prompts and output completions, as well as public-code matching behavior when that setting is enabled.</p><p>Filtering is not limited to a default model or to Copilot Free. IDE appearance settings such as a color theme have no relationship to Copilot content filtering.</p>"
    },
    {
      n: 55,
      prompt: "<p>A team publishes guidance that tells users when they are interacting with Copilot-generated assistance and explains when human review is required. Which responsible AI principle is MOST directly supported?</p>",
      choices: ["Reliability and safety", "Fairness", "Transparency", "Language specificity"],
      answer: 2,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Transparency helps people understand when AI is being used and how to interpret its output. Disclosing Copilot-generated assistance and explaining human-review expectations directly supports transparency.</p><p>Reliability and safety focuses on dependable behavior under expected and unexpected conditions. Fairness addresses bias and equitable treatment. Language specificity is a limitation category, not one of Microsoft's responsible AI principles.</p>"
    },
    {
      n: 56,
      prompt: "<p>A Copilot answer confidently recommends an API that was removed from the framework last month. Which limitation does this illustrate?</p>",
      choices: ["Organization instructions always override personal instructions.", "The proxy filter never runs outbound.", "GitHub Enterprise Server supports all Copilot features.", "AI output can reflect outdated training data and must be validated."],
      answer: 3,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Copilot can produce confident but outdated suggestions because LLMs depend partly on training data. The developer must validate generated API guidance against current documentation and project reality.</p><p>Organization instructions do not always override personal instructions; custom instruction precedence puts personal instructions highest. The proxy and filters do run outbound. GitHub Enterprise Server is not currently supported for Copilot.</p>"
    },
    {
      n: 57,
      prompt: "<p>A developer changes the model selection for Copilot Chat and expects inline suggestions and next edit suggestions to use the same model automatically. What should they know?</p>",
      choices: ["Inline suggestions, next edit suggestions, and Chat have independent model selections.", "Changing Chat always changes every other model selection.", "The model picker exists only for Copilot CLI.", "Model selection disables Suggestions matching public code."],
      answer: 0,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The model picker treats inline suggestions, next edit suggestions, and Chat as independent selections. Changing the model for one does not automatically change the others.</p><p>Chat model selection does not force all other selections to change. The model picker is not only a CLI concept. Suggestions matching public code applies regardless of which model is selected.</p>"
    },
    {
      n: 58,
      prompt: "<p>A developer on Copilot Free tries to use Copilot Chat skills in an IDE and finds the feature unavailable. What is the best explanation?</p>",
      choices: ["Chat skills are available only through GitHub Enterprise Server.", "Copilot Chat skills in IDEs are not available in Copilot Free.", "Chat skills require disabling all content filters.", "Chat skills are the same thing as next edit suggestions."],
      answer: 1,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>Copilot Chat skills in IDEs are not available in Copilot Free. This is a feature-availability distinction candidates should know when comparing plans and capabilities.</p><p>GitHub Enterprise Server does not currently support Copilot. Content filters do not need to be disabled for Chat skills. Chat skills are separate from next edit suggestions, which predict edit locations.</p>"
    },
    {
      n: 59,
      prompt: "<p>A developer asks about retention for prompts used in Copilot Chat on GitHub.com. Which statement matches the confirmed guidance?</p>",
      choices: ["Prompts are always retained forever for audit search.", "Prompts are never retained in any Copilot surface.", "Prompts, suggestions, and supporting context are typically retained for 28 days outside the code editor.", "Retention is controlled by the number of generated lines."],
      answer: 2,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>For Copilot Chat used outside the code editor, including GitHub.com, prompts, suggestions, and supporting context are typically retained for 28 days. The code editor has different guidance, including prompt discard after a suggestion is returned for editor completions.</p><p>Prompts are not retained forever for audit search, and the audit log does not include local client session prompt data. It is also incorrect to say prompts are never retained in any surface. Retention is not based on generated line count.</p>"
    },
    {
      n: 60,
      prompt: "<p>A team tests Copilot-assisted workflows with adversarial prompts and unsafe input patterns before broad rollout. Which responsible AI principle is MOST directly supported?</p>",
      choices: ["Transparency", "Inclusiveness", "Fairness", "Reliability and safety"],
      answer: 3,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Reliability and safety focuses on consistent, safe behavior, including under unexpected or adversarial conditions. Testing unsafe input patterns before rollout is a reliability and safety practice.</p><p>Transparency is about disclosure and explainability. Inclusiveness is about accessibility and usability for diverse users. Fairness is about reducing biased or inequitable outcomes.</p>"
    }
  ] } ]
};

