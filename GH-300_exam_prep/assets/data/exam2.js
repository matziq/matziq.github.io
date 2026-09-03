window.GH3_DATA = window.GH3_DATA || {};

window.GH3_DATA.exam2 = {
  id: "exam2",
  name: "GH-300 \u2014 Practice Exam 2",
  timeMinutes: 100,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A team is adopting GitHub Copilot for code reviews and asks who remains responsible when Copilot suggests a change that later causes a production issue. Which responsible AI principle MOST directly addresses this concern?</p>",
      choices: ["Accountability", "Inclusiveness", "Transparency", "Fairness"],
      answer: 0,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Accountability means people and organizations remain answerable for how AI systems are used and for the outcomes of their decisions. Copilot can assist with review, but the team still owns validation, approval, and deployment choices.</p><p>Inclusiveness focuses on making tools usable by people with different abilities and backgrounds. Transparency focuses on explaining AI behavior and limitations. Fairness focuses on equitable treatment and avoiding harmful bias, not assigning operational responsibility.</p>"
    },
    {
      n: 2,
      prompt: "<p>Copilot generates a migration script that looks correct, but it will run against customer data. What is the MOST responsible next step before using it?</p>",
      choices: ["Run it directly because generated code has already passed Copilot filters", "Review, test, and validate the script in a safe environment before applying it", "Accept the script only if Suggestions matching public code is set to Allow", "Rewrite the script manually and avoid Copilot for database work"],
      answer: 1,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Responsible operation requires validating AI output before relying on it, especially when data integrity or production systems are involved. A safe review and test path catches logic errors, destructive statements, and context misunderstandings before customer data is affected.</p><p>Copilot filters are safeguards, not a guarantee of correctness. Suggestions matching public code controls whether matching public suggestions are shown; it does not validate database safety. Avoiding Copilot entirely is unnecessary when the team uses human review, tests, and appropriate controls.</p>"
    },
    {
      n: 3,
      prompt: "<p>A developer sees faint suggested code at the cursor while typing in an IDE. Which Copilot feature is being displayed?</p>",
      choices: ["Next edit suggestions", "Edit mode", "Inline suggestions rendered as ghost text", "Copilot cloud agent"],
      answer: 2,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Inline suggestions appear in the IDE at the current cursor position and are commonly rendered as ghost text. They complete the code where the developer is already working.</p><p>Next edit suggestions predict where the developer may edit next, not just what appears at the cursor. Edit mode performs broader requested changes in supported editors. Copilot cloud agent is an autonomous GitHub-hosted agent and is not the ghost-text inline completion feature.</p>"
    },
    {
      n: 4,
      prompt: "<p>A Windows developer wants to use GitHub Copilot from PowerShell to ask for a command, iterate interactively, and sometimes pass a prompt non-interactively from scripts. Which tool best fits this workflow?</p>",
      choices: ["Copilot Chat only on GitHub.com", "Copilot code review", "A repository prompt file", "The standalone GitHub Copilot CLI"],
      answer: 3,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>The standalone GitHub Copilot CLI supports Linux, macOS, and Windows, including PowerShell and WSL. It can be used interactively and programmatically with prompt flags, making it the best match for command-line assistance and scripted use.</p><p>Copilot Chat on GitHub.com is not a shell tool. Copilot code review reviews changes rather than managing terminal workflows. Prompt files help reuse prompts in supported IDEs, but they are not supported in the CLI and do not provide an interactive shell experience.</p>"
    },
    {
      n: 5,
      prompt: "<p>A product team wants an AI assistant to work autonomously on an issue in GitHub while developers continue in their IDE. Which current Copilot capability should they consider?</p>",
      choices: ["Copilot cloud agent", "Next edit suggestions", "Suggestions matching public code", "Retired Copilot Spark app builder"],
      answer: 0,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>Copilot cloud agent is the current name for the autonomous GitHub-hosted agent that can work on tasks in GitHub. It is distinct from agent mode in an IDE and from assistive suggestion features.</p><p>Next edit suggestions help predict a developer's next edit location in supported IDEs. Suggestions matching public code is a privacy and safeguard setting, not an autonomous worker. Copilot Spark is retired and should be treated only as history, not as a live capability.</p>"
    },
    {
      n: 6,
      prompt: "<p>A user belongs to two organizations within the same enterprise. One organization enables a Copilot feature and the other disables it. What policy outcome usually applies?</p>",
      choices: ["The feature is always disabled because the most restrictive setting wins", "The least restrictive policy within the same enterprise usually applies", "The enterprise audit log decides based on recent usage", "The user's personal setting overrides both organizations"],
      answer: 1,
      topic: "Organization Settings and Policies",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>When multiple organizations are in the same enterprise, the least restrictive Copilot policy usually applies. This is a common conflict-resolution trap because the direction changes when different enterprises are involved.</p><p>The most restrictive policy almost always applies across different enterprises, not within the same enterprise. Personal settings do not override organization or enterprise policy controls for organization-assigned seats. Audit logs record events; they do not resolve policy conflicts.</p>"
    },
    {
      n: 7,
      prompt: "<p>During prompt construction for an inline suggestion, Copilot considers code before and after the cursor. Which named technique describes this preprocessing approach?</p>",
      choices: ["LoRA adaptation", "Code referencing", "Fill-in-the-Middle", "Prompt file reuse"],
      answer: 2,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "easy",
      explanation: "<p>Fill-in-the-Middle, or FIM, considers both preceding and following code around the cursor as part of prompt preprocessing. It helps translate the user's editing location and surrounding context into a concrete coding task.</p><p>LoRA is a fine-tuning method, not the cursor-context preprocessing technique. Code referencing relates to attribution for matching public code. Prompt file reuse is a customization method for consistent prompts, not the inbound prompt-building process.</p>"
    },
    {
      n: 8,
      prompt: "<p>A training module says Copilot Chat has a much smaller context window than current product documentation suggests. How should an exam-prep question handle that mismatch?</p>",
      choices: ["Ask candidates to choose between the training value and current product value", "Ignore the mismatch and state both values as simultaneously current", "Use only current product claims because the study guide is outdated", "Use one framing and explain that the official study material and current product differ"],
      answer: 3,
      topic: "Lifecycle and Limitations",
      objective: "3.2",
      difficulty: "hard",
      explanation: "<p>When official study material and the current product differ, a fair item should use one framing and explain the discrepancy. This avoids making the correct answer depend on two conflicting authorities in the same question.</p><p>Putting both readings in the choices makes the item ambiguous. Stating both as current is misleading. Using only current product claims can be appropriate for many items, but the exam-prep site must also note where the exam source differs from today's product.</p>"
    },
    {
      n: 9,
      prompt: "<p>A developer writes, <code>Fix this</code>, and Copilot returns an unhelpful answer. Which revised prompt best follows the 4 Ss framework?</p>",
      choices: ["Refactor this JavaScript function to remove duplicate branches while preserving its return values", "Act as a compiler and think about all possible future errors in this repository", "Please inspect everything and make whatever changes you think are appropriate", "Can you help with code quality?"],
      answer: 0,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>The JavaScript refactoring request is single, specific, and short, and it can be strengthened by surrounding context such as keeping the related file open. It gives Copilot a clear task and a constraint to preserve behavior.</p><p>The compiler-role prompt is broad and not focused on a single task. Asking Copilot to inspect everything is vague and open-ended. Asking for help with code quality lacks the specificity needed for a useful coding response.</p>"
    },
    {
      n: 10,
      prompt: "<p>A developer wants Copilot Chat to keep improving a solution across several turns but notices old assumptions are polluting the answer. Which prompt-engineering action is BEST?</p>",
      choices: ["Increase randomness by asking for more creative answers", "Manage the chat history by restating the current goal and constraints", "Switch from few-shot prompting to code referencing", "Disable HTTPS prompt transmission"],
      answer: 1,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Chat history affects later responses, so restating the current goal and constraints helps Copilot focus on the latest intent. This is a practical use of chat history management and chain prompting across turns.</p><p>Asking for more creative answers does not remove stale assumptions. Code referencing is related to matching public code and attribution, not few-shot prompting. HTTPS prompt transmission is part of secure data flow and is not something to disable for prompt quality.</p>"
    },
    {
      n: 11,
      prompt: "<p>A developer is new to a legacy repository and wants to reduce context switching while learning unfamiliar framework patterns. Which Copilot use best supports that productivity goal?</p>",
      choices: ["Disable all inline suggestions until the developer knows the codebase", "Use Copilot only after writing complete implementations", "Ask Copilot to explain nearby code and suggest idiomatic refactors in context", "Use organization policy settings as a code learning tool"],
      answer: 2,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "easy",
      explanation: "<p>Copilot can accelerate learning and reduce context switching by explaining code, suggesting refactors, and helping the developer understand unfamiliar patterns without leaving the IDE workflow.</p><p>Disabling suggestions removes useful assistance rather than improving learning. Waiting until implementations are complete misses Copilot's value during exploration and iteration. Organization policy settings control feature availability and safeguards; they are not a code-understanding workflow.</p>"
    },
    {
      n: 12,
      prompt: "<p>A pull request triggers CodeQL alerts. The maintainer wants AI-generated fix suggestions with explanations but does not want to require every contributor to have a Copilot license. Which feature matches that need?</p>",
      choices: ["Copilot code review with custom instructions", "Copilot cloud agent assigned to the pull request", "GitHub AI Credits for every contributor", "Copilot Autofix for code scanning"],
      answer: 3,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Copilot Autofix for code scanning generates fix suggestions and natural-language explanations for CodeQL alerts on pull requests and the default branch. It is available for CodeQL analysis and does not require a GitHub Copilot subscription.</p><p>Copilot code review and Copilot cloud agent are Copilot capabilities, but the CodeQL alert autofix scenario maps specifically to Copilot Autofix. GitHub AI Credits govern plan usage allowances and are not a requirement for this CodeQL autofix capability.</p>"
    },
    {
      n: 13,
      prompt: "<p>An organization needs Copilot to ignore a directory containing generated source and vendor snapshots. Which plan family supports configuring content exclusions for this purpose?</p>",
      choices: ["Copilot Business and Copilot Enterprise", "Copilot Free and Copilot Student", "Copilot Pro, Pro+, and Max only", "Any individual plan with a personal setting"],
      answer: 0,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "medium",
      explanation: "<p>Content exclusion is available for Copilot Business and Copilot Enterprise. Repository administrators, organization owners, and enterprise owners can use it to exclude specific files, paths, or repositories from Copilot context and review.</p><p>Copilot Free and Student do not provide content exclusion. Individual paid plans such as Pro, Pro+, and Max are not the plan family for this organization-level exclusion feature. A personal setting cannot create organization content exclusions.</p>"
    },
    {
      n: 14,
      prompt: "<p>A developer says content exclusions are configured, but Copilot still seems influenced by type information from an excluded file inside the IDE. What is the BEST explanation?</p>",
      choices: ["Content exclusions never affect chat responses", "The IDE may indirectly provide semantic information such as types or hover definitions", "Suggestions matching public code must be set to Allow", "The excluded file must be on GitHub Enterprise Server"],
      answer: 1,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "hard",
      explanation: "<p>Content exclusions prevent excluded file content from informing inline suggestions, chat responses, and Copilot code review, but the IDE may still provide semantic information indirectly. Examples include type information, hover-over definitions, and build configuration.</p><p>Content exclusions do affect chat responses in supported contexts. Suggestions matching public code is a separate setting and does not explain semantic leakage from the IDE. Copilot is not currently available for GitHub Enterprise Server, so that cannot be the correct explanation.</p>"
    },
    {
      n: 15,
      prompt: "<p>A team designing an internal Copilot rollout makes sure employees with screen readers and varied skill levels can use the training and workflows. Which responsible AI principle is MOST directly reflected?</p>",
      choices: ["Privacy and security", "Accountability", "Inclusiveness", "Reliability and safety"],
      answer: 2,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Inclusiveness means AI systems and related experiences should empower and engage everyone, including people with different abilities, backgrounds, and levels of expertise. Accessible training and workflows directly support this principle.</p><p>Privacy and security focuses on protecting data and systems. Accountability focuses on human ownership and governance. Reliability and safety focuses on consistent, safe operation rather than accessibility and broad participation.</p>"
    },
    {
      n: 16,
      prompt: "<p>Copilot suggests an authentication helper that uses outdated hashing parameters. What should the developer do FIRST?</p>",
      choices: ["Accept it because Copilot has learned from public repositories", "Change the model picker and accept the same code", "Turn on Copilot Memory to make the code secure", "Compare it against current security guidance and revise or reject it"],
      answer: 3,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Copilot output can reflect outdated practices or misunderstand context, so the developer should validate the suggestion against current security guidance and revise or reject it as needed. Human review is essential for security-sensitive code.</p><p>Learning from public repositories does not guarantee current or safe practices. Changing the model picker does not validate the same code. Copilot Memory is a customization feature in preview, not a substitute for security review.</p>"
    },
    {
      n: 17,
      prompt: "<p>A developer changes the model selection for Copilot Chat and expects inline suggestions and next edit suggestions to use the same model automatically. What should they understand?</p>",
      choices: ["Chat, inline suggestions, and next edit suggestions have independent model selections", "Inline suggestions always inherit the Chat model", "Next edit suggestions cannot use model selection", "Changing models disables content filters"],
      answer: 0,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>The model picker treats Chat, inline suggestions, and next edit suggestions as independent selections. Changing one does not automatically change the others.</p><p>Inline suggestions do not always inherit the Chat selection. Next edit suggestions are one of the separately selected feature areas. Content filters continue to apply regardless of which model is selected.</p>"
    },
    {
      n: 18,
      prompt: "<p>While using GitHub Copilot CLI, a developer wants to switch into a mode that plans the work before making changes. Which interaction is supported?</p>",
      choices: ["Create a prompt file under .github/prompts for the CLI", "Use Shift+Tab to cycle modes, including plan mode", "Open retired Copilot Spark and export the command", "Configure a Copilot code review policy"],
      answer: 1,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>GitHub Copilot CLI includes a plan mode, and Shift+Tab cycles modes. This supports interactive command-line sessions where the assistant can plan before proceeding.</p><p>Prompt files are not supported in the CLI. Copilot Spark is retired and not a live path for command generation. Copilot code review policy settings govern review availability and do not switch CLI modes.</p>"
    },
    {
      n: 19,
      prompt: "<p>A repository wants reusable instructions for common tasks in VS Code and Visual Studio, stored as files under the repository. Which location matches current prompt file support?</p>",
      choices: ["AGENTS.md only", ".github/hooks/*.json", ".github/prompts/*.prompt.md", "A retired Copilot knowledge base"],
      answer: 2,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Prompt files live at .github/prompts/*.prompt.md and are supported in VS Code and Visual Studio. They help teams reuse consistent prompts for recurring workflows.</p><p>AGENTS.md contains agent instructions, not reusable prompt files. Hooks live under .github/hooks/*.json. Copilot knowledge bases have been retired and replaced by Copilot Spaces for shared context.</p>"
    },
    {
      n: 20,
      prompt: "<p>An enterprise admin wants to allow the Copilot app but block GitHub Copilot CLI for managed users. What should the admin know?</p>",
      choices: ["The app and CLI share one inseparable client policy", "Blocking the CLI also blocks inline suggestions", "Only repository administrators can control client policies", "The Copilot app and Copilot CLI are governed by separate client policies"],
      answer: 3,
      topic: "Organization Settings and Policies",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>The Copilot app and GitHub Copilot CLI are controlled by separate, independent client policies. An enterprise can allow one client while blocking the other.</p><p>The app and CLI do not share a single inseparable policy. Blocking the CLI is not the same as blocking inline suggestions. Enterprise owners, or users with the Manage enterprise AI controls custom role permission, can manage enterprise AI controls.</p>"
    },
    {
      n: 21,
      prompt: "<p>In the seven-step Copilot prompt flow, a proxy server blocks prompt injection and jailbreak attempts before the request reaches the model. Where does this occur?</p>",
      choices: ["Inbound, during the proxy filter step before toxicity filtering", "Outbound, during suggestion delivery after acceptance", "Outbound, only after matching public code is checked", "Inbound, after code generation by the LLM"],
      answer: 0,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>The proxy filter is an inbound step. It runs before toxicity filtering and is specifically described as blocking prompt injection and jailbreak attempts that try to manipulate the system.</p><p>Suggestion delivery is an outbound step after responses pass filters. Matching public code is an optional outbound check, not the inbound jailbreak defense. Code generation by the LLM occurs after the inbound proxy and toxicity filtering steps.</p>"
    },
    {
      n: 22,
      prompt: "<p>A team expects Copilot to solve a broad architecture problem with minimal context and no human review. Which limitation category is most relevant?</p>",
      choices: ["Language and framework specificity", "Complex problem solving", "Secure HTTPS transmission", "Audit log retention"],
      answer: 1,
      topic: "Lifecycle and Limitations",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Complex problem solving is one of the named limitation categories for LLMs and Copilot. Copilot can help with implementation and reasoning, but high-level design and creativity still need careful human direction and validation.</p><p>Language and framework specificity concerns uneven performance across technologies, not broad architecture ownership. Secure HTTPS transmission is part of data flow rather than a limitation category. Audit log retention is an administrative logging fact, not a model limitation.</p>"
    },
    {
      n: 23,
      prompt: "<p>A developer gives Copilot one example of the desired output format before asking it to transform a second function. What prompting pattern is this?</p>",
      choices: ["Zero-shot prompting", "Role prompting", "One-shot prompting", "Chain prompting"],
      answer: 2,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>One-shot prompting provides exactly one example before asking the model to perform the task. The example anchors the desired structure or style for the next output.</p><p>Zero-shot prompting gives no examples. Role prompting asks Copilot to act in a particular role, such as a security expert. Chain prompting breaks work into a sequence of linked prompts rather than providing a single example.</p>"
    },
    {
      n: 24,
      prompt: "<p>A developer wants Copilot to first identify edge cases, then generate tests, then refactor the implementation based on failures. Which prompt-engineering approach best fits?</p>",
      choices: ["A single vague prompt asking Copilot to improve everything", "Disabling chat history between each step", "Relying only on inline suggestions", "Chain prompting across a sequence of focused steps"],
      answer: 3,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Chain prompting breaks a larger task into sequential, focused prompts whose outputs build on each other. Identifying edge cases, generating tests, and refactoring from failures is a natural chain.</p><p>A vague improve-everything prompt violates the single and specific prompt guidance. Disabling or ignoring useful chat history can remove context needed for later steps. Inline suggestions can help with code completion, but the described multi-step reasoning workflow is a chat prompting pattern.</p>"
    },
    {
      n: 25,
      prompt: "<p>A maintainer wants to modernize repetitive legacy code while preserving behavior. Which Copilot workflow is most appropriate?</p>",
      choices: ["Ask Copilot to refactor a focused section and review the diff against tests", "Let Copilot replace the whole repository without constraints", "Use audit logs to generate the new implementation", "Enable Suggestions matching public code Allow to modernize automatically"],
      answer: 0,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "easy",
      explanation: "<p>Copilot is useful for refactoring and modernizing legacy code when the task is focused and the developer validates the resulting diff with tests. This improves productivity while preserving human control over correctness.</p><p>Replacing an entire repository without constraints is unsafe and unlikely to preserve behavior. Audit logs record administrative and agent activity, not implementation logic. Suggestions matching public code controls matching public suggestions and does not modernize code automatically.</p>"
    },
    {
      n: 26,
      prompt: "<p>A service has tests for happy paths only. The team asks Copilot to identify boundary values, invalid inputs, and assertions for failure cases. Which productivity objective does this best support?</p>",
      choices: ["Managing organization subscriptions", "Supporting testing and security", "Configuring content exclusions", "Selecting an LTS model"],
      answer: 1,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Generating tests, identifying edge cases, and writing assertions map directly to supporting testing and security. Copilot can help broaden coverage beyond happy paths.</p><p>Subscription management is an administrator task. Content exclusions control what files Copilot can use as context in supported environments. Selecting an LTS model is a model availability concept, not the objective for test generation and edge-case analysis.</p>"
    },
    {
      n: 27,
      prompt: "<p>A repository administrator excludes a secrets folder. Which effect should they expect in supported contexts?</p>",
      choices: ["Excluded files will still be reviewed in Copilot code review", "Excluded files will continue informing inline suggestions in other files", "Inline suggestions will not be available in affected files", "The exclusion will apply to symlinks and remote filesystems"],
      answer: 2,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "hard",
      explanation: "<p>Content exclusion means inline suggestions will not be available in affected files. The content in affected files also will not inform inline suggestions in other files, will not inform Copilot responses, and will not be reviewed in Copilot code review.</p><p>Excluded files are not reviewed by Copilot code review in supported contexts. Their content should not inform inline suggestions in other files. Content exclusions do not apply to symlinks or repositories on remote filesystems.</p>"
    },
    {
      n: 28,
      prompt: "<p>A user with a Copilot seat assigned by an organization cannot change Suggestions matching public code in personal settings. Why?</p>",
      choices: ["The setting is available only in Xcode", "The setting applies only to manually written code", "The setting was retired with Copilot Spark", "The setting is inherited from the organization or enterprise"],
      answer: 3,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "medium",
      explanation: "<p>When a user receives a Copilot seat through an organization, Suggestions matching public code is inherited from organization or enterprise policy. The personal toggle is locked and reflects that policy.</p><p>The setting is not limited to Xcode; code referencing is not available in Xcode. It checks accepted, unmodified Copilot suggestions, not all manually written code. Suggestions matching public code is current terminology and was not retired with Copilot Spark.</p>"
    },
    {
      n: 29,
      prompt: "<p>A generated response includes confident claims about an API that no longer exists. Which responsible AI risk is MOST directly illustrated?</p>",
      choices: ["Generative AI tools can produce incorrect or outdated output", "Copilot always uses private repository code for training", "All AI output is legally owned by GitHub", "Content filters are disabled for legacy languages"],
      answer: 0,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Generative AI tools can produce plausible but incorrect or outdated output because they depend on training data and available context. Responsible use requires recognizing this limitation and validating important claims.</p><p>Business and Enterprise data is excluded from training by default, and the statement about always using private repository code is wrong. GitHub does not claim ownership of all AI output. Content filters apply regardless of model selection and are not disabled for legacy languages.</p>"
    },
    {
      n: 30,
      prompt: "<p>Copilot proposes a regex for parsing account identifiers that may include personal data. Which validation practice is BEST?</p>",
      choices: ["Assume toxicity filtering guarantees privacy compliance", "Test against representative safe samples and review privacy implications before use", "Commit it if it appears in ghost text", "Switch to a different IDE to bypass the concern"],
      answer: 1,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Responsible validation includes testing generated code against representative examples and checking privacy implications before using it with personal data. Copilot can assist, but the developer must verify behavior and compliance.</p><p>Toxicity filtering is a safeguard but not a privacy-compliance guarantee. Ghost text is simply how inline suggestions are rendered, not proof of safety. Changing IDEs does not remove the need to validate code that handles personal data.</p>"
    },
    {
      n: 31,
      prompt: "<p>A developer accepts an inline suggestion, then wants Copilot to predict where the next related change should happen in the file. Which feature addresses the location of the next edit?</p>",
      choices: ["Ghost text", "Copilot code review", "Next edit suggestions", "Copilot cloud agent"],
      answer: 2,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Next edit suggestions predict the location of the developer's next edit. They are separate from inline suggestions, which complete code at the current cursor location.</p><p>Ghost text is the rendering of inline suggestions. Copilot code review reviews changes rather than predicting the next edit location. Copilot cloud agent works autonomously on GitHub and is not the IDE next-edit feature.</p>"
    },
    {
      n: 32,
      prompt: "<p>A developer wants to use GitHub Copilot CLI in a build script by sending a prompt directly rather than entering an interactive session. Which capability should they use?</p>",
      choices: ["A Copilot Space attached to the terminal", "A GitHub Mobile chat session", "A .github/instructions file", "The CLI prompt flag for programmatic use"],
      answer: 3,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>GitHub Copilot CLI can be used programmatically with prompt flags such as -p or --prompt. That matches a build-script scenario where the prompt is passed directly.</p><p>Copilot Spaces provide shared context, not a terminal prompt flag. GitHub Mobile is not the build-script interface. Repository instruction files influence Copilot behavior in supported contexts but are not the CLI mechanism for non-interactive prompts.</p>"
    },
    {
      n: 33,
      prompt: "<p>A team wants organization-wide documentation context for Copilot after the retirement of Copilot knowledge bases. Which current capability should they use?</p>",
      choices: ["Copilot Spaces", "Retired Copilot Spark", "Retired GitHub Models", "A retired GitHub App-based Copilot Extension"],
      answer: 0,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Copilot Spaces are the current replacement for retired Copilot knowledge bases when teams need shared context and documentation for Copilot workflows.</p><p>Copilot Spark is retired and should not be treated as a live app-building feature. GitHub Models, the inference service behind Spark's llm() function, is retired. GitHub App-based Copilot Extensions were sunset and replaced by MCP servers.</p>"
    },
    {
      n: 34,
      prompt: "<p>An auditor wants to find Copilot plan changes, policy changes, and license grants. Which audit log query pattern is appropriate?</p>",
      choices: ["actor:Developer for every local prompt", "action:copilot for Copilot events", "filename:copilot for repository content", "model:copilot for selected models"],
      answer: 1,
      topic: "Organization Settings and Policies",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>Audit logs record Copilot plan changes, settings, policies, license grants, removals, and agent activity on the GitHub website. Querying action:copilot is the appropriate pattern for Copilot audit events.</p><p>The audit log does not include local client session prompts. Searching repository filenames is code search, not audit-log querying. Model selection is not queried with a model:copilot audit-log pattern.</p>"
    },
    {
      n: 35,
      prompt: "<p>In Copilot's outbound flow, a generated response fails a code-quality check for a common vulnerability. What happens according to the canonical process?</p>",
      choices: ["It is always delivered with a warning banner", "It is sent back to the user for manual filtering", "It is truncated or discarded if it fails the checks", "It bypasses checks when a premium model is selected"],
      answer: 2,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>During post-processing and response validation, the proxy checks output for toxicity, code quality, common vulnerabilities, and optional matching public code. If any part fails, it is either truncated or discarded.</p><p>The canonical flow does not say unsafe output is always delivered with a warning or sent to users for manual filtering. Content filters apply regardless of model selection, so choosing a different model does not bypass the checks.</p>"
    },
    {
      n: 36,
      prompt: "<p>A team is deciding whether to trust Copilot equally for a mainstream web framework and a niche proprietary language. Which limitation category should guide their expectations?</p>",
      choices: ["Prompt transmission", "Feedback loop delivery", "IP indemnity", "Language and framework specificity"],
      answer: 3,
      topic: "Lifecycle and Limitations",
      objective: "3.2",
      difficulty: "hard",
      explanation: "<p>Language and framework specificity is a named limitation category. Copilot performance can vary across languages and frameworks, and it may be weaker on niche technologies.</p><p>Prompt transmission describes secure HTTPS data flow, not uneven language support. Feedback loop delivery is part of the suggestion lifecycle. IP indemnity is a contractual protection for Business and Enterprise under conditions, not a model capability limitation.</p>"
    },
    {
      n: 37,
      prompt: "<p>A developer wants Copilot to review code from a security perspective. Which prompt best uses role prompting?</p>",
      choices: ["Act as a security expert and identify injection risks in this function", "Make this better", "Use the longest possible context before answering", "Accept the next suggestion if it compiles"],
      answer: 0,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Role prompting asks Copilot to act from a specific perspective, such as a security expert. The prompt also gives a focused task by asking for injection risks in a function.</p><p>Make this better is too vague. Asking for the longest possible context does not define the role or task and may waste context. Accepting a suggestion if it compiles is a validation shortcut, not a role prompt.</p>"
    },
    {
      n: 38,
      prompt: "<p>A prompt includes a concise task, relevant file context, and a few examples of expected output. Which performance principle is being applied?</p>",
      choices: ["Using audit logs to steer completions", "Providing focused context and examples to guide the model", "Disabling all filters for faster output", "Relying on legacy usage counters"],
      answer: 1,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Focused context and examples improve prompt performance by helping Copilot infer the desired task, constraints, and output pattern. This aligns with prompt engineering guidance around specificity, surrounding context, and example-based prompting.</p><p>Audit logs do not steer completions. Filters are safeguards and should not be disabled to improve prompt quality. Legacy usage counters are not the official current term; the current term is GitHub AI Credits.</p>"
    },
    {
      n: 39,
      prompt: "<p>An engineering manager wants to measure whether Copilot adoption is improving over time. Which metric source is specifically supported?</p>",
      choices: ["Local prompt text from the audit log", "A fixed real-exam raw score", "The REST API for Copilot usage metrics", "The Suggestions matching public code index"],
      answer: 2,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>The REST API for Copilot usage metrics is a named source for measuring impact. Metrics include Average Daily Active Users, Total Acceptance Rate, and Lines of Code Accepted.</p><p>The audit log does not include local client session prompt text. A real-exam raw score is not a productivity metric, and the official exam question count is not published. The public-code matching index is a safeguard mechanism, not a usage-metrics source.</p>"
    },
    {
      n: 40,
      prompt: "<p>A developer asks Copilot to generate integration tests, then reviews the assertions and modifies them to cover an unhandled timeout. What is the BEST characterization of this workflow?</p>",
      choices: ["Irresponsible because AI should not be used for tests", "A privacy setting rather than a testing workflow", "A replacement for all human code review", "A responsible use of Copilot to accelerate testing with human validation"],
      answer: 3,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Copilot can generate unit and integration tests, identify edge cases, and write assertions. Reviewing and modifying the generated tests is responsible because it preserves human validation.</p><p>Using AI for tests is within Copilot's productivity goals when validated. The workflow is not a privacy setting. It accelerates testing but does not replace human review and judgment.</p>"
    },
    {
      n: 41,
      prompt: "<p>A developer opens an excluded file while using Edit mode in an editor and expects content exclusion to block all use of that file. What should they know?</p>",
      choices: ["Content exclusion is currently not supported in Edit and Agent modes in editors", "Content exclusion is supported only in Azure Data Studio", "Content exclusion applies only to public repositories", "Content exclusion makes symlinks safer than regular files"],
      answer: 0,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "hard",
      explanation: "<p>Current documentation says content exclusion is not supported in Edit and Agent modes of Copilot Chat in Visual Studio Code and other editors. This is an important current-product caveat for privacy expectations.</p><p>Azure Data Studio is not supported for inline suggestions content exclusion. Content exclusion is not limited to public repositories. Content exclusions do not apply to symlinks, so symlinks are not made safer by the exclusion mechanism.</p>"
    },
    {
      n: 42,
      prompt: "<p>A team blocks Suggestions matching public code and asks whether choosing a different model will bypass that safeguard. What is the correct answer?</p>",
      choices: ["Yes, the safeguard applies only to the default model", "No, the setting applies regardless of which model is selected", "Yes, the safeguard applies only in NeoVim", "No, because it moved to retired Copilot Spark"],
      answer: 1,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "medium",
      explanation: "<p>Suggestions matching public code applies regardless of which model is selected. Model selection does not change the data collection and usage policy or bypass content filters.</p><p>The safeguard is not limited to a default model. Code referencing and matching public code are not available in NeoVim. Copilot Spark was retired, but it did not replace this current safeguard.</p>"
    },
    {
      n: 43,
      prompt: "<p>An AI coding assistant works well for common patterns but may reproduce bias from training data or suggest outdated practices. Which responsible-use habit addresses this risk?</p>",
      choices: ["Treat every fluent answer as authoritative", "Disable all organization policies", "Validate outputs against current standards and human judgment", "Use only retired product names in prompts"],
      answer: 2,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Responsible AI use recognizes that generative systems can reflect biases and outdated practices from training data. Validating against current standards and using human judgment mitigates those risks.</p><p>Fluent answers can still be wrong. Disabling organization policies weakens governance and safeguards. Retired product names can confuse context and should be used only when teaching history or mapping old names to current ones.</p>"
    },
    {
      n: 44,
      prompt: "<p>Copilot writes a function that passes visible tests but uses a library call the team has never approved. Which validation response is BEST?</p>",
      choices: ["Approve it because visible tests passed", "Trust it if the suggestion does not match public code", "Reject all Copilot output from that point forward", "Check dependency policy, license and security posture, then adjust the implementation"],
      answer: 3,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Passing visible tests is not enough when generated code introduces a dependency. The team should validate policy fit, license implications, security posture, and maintainability before accepting or revising the implementation.</p><p>Visible tests may not cover dependency risk. A lack of public-code match does not validate license, vulnerability, or policy concerns. Rejecting all future Copilot output is unnecessary when careful review and validation can address the issue.</p>"
    },
    {
      n: 45,
      prompt: "<p>A developer wants Copilot Chat skills inside the IDE but is using Copilot Free. What should they expect?</p>",
      choices: ["Copilot Chat skills in IDEs are not available in Copilot Free", "Copilot Free includes all IDE chat skills with unlimited completions", "The feature works only in NeoVim", "The feature requires GitHub Enterprise Server"],
      answer: 0,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Copilot Chat skills in IDEs are not available in Copilot Free. Copilot Free also has plan limitations such as auto model selection only and a monthly completion cap.</p><p>Copilot Free does not include all IDE chat skills with unlimited completions. Agent mode is not available in NeoVim, and the IDE chat skills statement is not NeoVim-specific. Copilot is not currently available for GitHub Enterprise Server.</p>"
    },
    {
      n: 46,
      prompt: "<p>A developer asks GitHub Copilot CLI to generate a script that moves files. Which responsible operating practice should accompany this use?</p>",
      choices: ["Run every generated command without review to preserve speed", "Inspect the generated script and test it on safe sample paths before real files", "Disable organization safeguards because CLI prompts are local", "Assume prompt files will validate the script automatically"],
      answer: 1,
      topic: "Copilot CLI",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>GitHub Copilot CLI can generate scripts and manage files, but responsible use requires inspecting commands and testing on safe sample paths before touching real data. This is especially important for destructive file operations.</p><p>Running generated commands without review is unsafe. CLI, Mobile, and Chat on GitHub.com prompts may be retained outside the editor, and safeguards still matter. Prompt files are not supported in the CLI and do not automatically validate generated scripts.</p>"
    },
    {
      n: 47,
      prompt: "<p>A pull request is opened from a feature branch that contains updated Copilot instructions. Which branch's instructions does Copilot read for the pull request?</p>",
      choices: ["Only the base branch instructions", "Only organization instructions, never repository files", "The head branch instructions", "Only personal instructions from the reviewer"],
      answer: 2,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>On pull requests, Copilot reads instructions and skills from the head branch, not the base branch. This matters when a feature branch changes repository guidance for review or agent behavior.</p><p>The base branch is not the source Copilot reads for pull-request instructions. Organization instructions can apply, but they do not replace all repository files. Personal instructions are limited to Copilot Chat on GitHub.com and are not the only source for pull-request behavior.</p>"
    },
    {
      n: 48,
      prompt: "<p>Which statement correctly distinguishes toxicity filtering from the proxy's inbound prompt-injection defense?</p>",
      choices: ["Toxicity filtering is only an outbound code-quality check", "Prompt-injection defense scans only accepted suggestions", "Both are the same check with two names", "The proxy blocks jailbreak attempts; toxicity filtering checks hate speech, inappropriate content, and personal data"],
      answer: 3,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>The inbound proxy filter blocks prompt injection and jailbreak attempts. Toxicity filtering is a separate step that checks categories such as hate speech, inappropriate content, and personal data, and it runs before intent extraction.</p><p>Toxicity filtering is not only an outbound code-quality check; it appears in both inbound and outbound processing. Prompt-injection defense is not a check on accepted suggestions. The two safeguards have distinct purposes in the canonical flow.</p>"
    },
    {
      n: 49,
      prompt: "<p>A developer keeps related files open and uses descriptive filenames before asking Copilot to generate a helper. Which part of the 4 Ss does this emphasize?</p>",
      choices: ["Surround", "Short", "Single", "Specific"],
      answer: 0,
      topic: "Crafting Effective Prompts",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Surround means using helpful surrounding context, including descriptive filenames and related open files. This gives Copilot better information when building the prompt.</p><p>Short means keeping prompts concise. Single means focusing on one task. Specific means giving explicit, detailed instructions. The described behavior is about context around the prompt, so it maps to Surround.</p>"
    },
    {
      n: 50,
      prompt: "<p>A team notices long prompts that include unnecessary history are consuming more plan allowance than expected. Which current term should the team use for that allowance?</p>",
      choices: ["Monthly prompt credits", "GitHub AI Credits", "Retired Copilot Spark tokens", "Legacy matching credits"],
      answer: 1,
      topic: "Prompt Engineering for Performance",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>The current term for plan allowance is GitHub AI Credits. The site should use that product name when discussing usage consumed by prompts, models, and Copilot features.</p><p>Monthly prompt credits is not the official current name. Copilot Spark has retired and is not the current usage allowance. Legacy matching credits are not a credits system; the matching safeguard is called Suggestions matching public code.</p>"
    },
    {
      n: 51,
      prompt: "<p>A team wants both quantitative and qualitative feedback about Copilot impact. Which combination aligns with the measured-impact guidance?</p>",
      choices: ["Only issue counts and repository stars", "Only local prompt transcripts from each developer", "Copilot usage metrics plus the GitHub Copilot Developer Survey", "Only the number of public-code matches"],
      answer: 2,
      topic: "Productivity and Code Quality",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>The guidance names the REST API for Copilot usage metrics and the GitHub Copilot Developer Survey as sources for measuring impact. Together they support quantitative usage data and qualitative developer feedback.</p><p>Issue counts and repository stars do not specifically measure Copilot adoption or effectiveness. Local prompt transcripts are not available from the audit log and raise privacy concerns. Public-code matches are a safeguard signal, not a productivity measurement program.</p>"
    },
    {
      n: 52,
      prompt: "<p>A security team wants IP indemnity protection for Copilot suggestions under the cited learning path. Which condition is required?</p>",
      choices: ["Use only Copilot Free with auto model selection", "Enable retired Copilot Spark exports", "Set Suggestions matching public code to Allow", "Use Copilot Business or Enterprise and set Suggestions matching public code to Block"],
      answer: 3,
      topic: "Testing and Security",
      objective: "5.2",
      difficulty: "hard",
      explanation: "<p>The cited learning path states that IP indemnity is included with Copilot Business and Enterprise, and GitHub assumes legal responsibility only when Suggestions matching public code is set to Block.</p><p>Copilot Free is not the plan family named for IP indemnity. Copilot Spark is retired and unrelated to indemnity. Setting Suggestions matching public code to Allow fails the stated condition for indemnity in the cited material.</p>"
    },
    {
      n: 53,
      prompt: "<p>A repository is hosted on a remote filesystem and uses symbolic links to reference sensitive source. What is the safest content-exclusion assumption?</p>",
      choices: ["Content exclusions do not apply to symlinks or repositories on remote filesystems", "Content exclusions apply more strongly to symlinks than normal files", "Remote filesystems are the only fully supported exclusion target", "Suggestions matching public code replaces content exclusions for symlinks"],
      answer: 0,
      topic: "Privacy Settings and Exclusions",
      objective: "6.1",
      difficulty: "medium",
      explanation: "<p>Content exclusions do not apply to symbolic links or repositories located on remote filesystems. Teams should not rely on exclusions alone for those layouts.</p><p>Symlinks do not receive stronger protection from content exclusions. Remote filesystems are not the fully supported target in this limitation. Suggestions matching public code is a separate safeguard and does not replace content exclusions for symlinked sensitive content.</p>"
    },
    {
      n: 54,
      prompt: "<p>A developer complains that no inline suggestions appear in one file, but Copilot works elsewhere. The repository has content exclusions configured. What is a likely explanation?</p>",
      choices: ["The audit log retained the local prompt and blocked it", "Inline suggestions are unavailable in affected excluded files", "Copilot Autofix disabled the editor", "The file must be using a model version number"],
      answer: 1,
      topic: "Safeguards and Troubleshooting",
      objective: "6.2",
      difficulty: "hard",
      explanation: "<p>When a file is affected by content exclusion, inline suggestions will not be available in that file. If Copilot works elsewhere, an exclusion rule is a plausible cause for missing suggestions in only that path.</p><p>The audit log does not include local client session prompts. Copilot Autofix for code scanning does not disable the editor. Model version numbers are not the right diagnostic path, and content filters apply regardless of model selection.</p>"
    },
    {
      n: 55,
      prompt: "<p>A tool clearly labels AI-generated suggestions and explains that developers must review them before use. Which responsible AI principle is MOST directly served by making the AI role visible?</p>",
      choices: ["Fairness", "Privacy and security", "Transparency", "Language specificity"],
      answer: 2,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Transparency requires people to understand when they are interacting with or using AI and to have insight into how the system should be interpreted. Clear labeling and explanation support that principle.</p><p>Fairness addresses equitable treatment and bias. Privacy and security addresses data and system protection. Language specificity is a limitation category for LLM performance, not one of Microsoft's responsible AI principles.</p>"
    },
    {
      n: 56,
      prompt: "<p>A developer receives a Copilot explanation for a complex algorithm and plans to include it in design documentation. What should they do before publishing it?</p>",
      choices: ["Publish it unchanged because explanations are safer than code", "Check only whether it contains non-ASCII characters", "Accept it if it came from Copilot Chat outside the editor", "Verify the explanation against the code and correct any inaccuracies"],
      answer: 3,
      topic: "Validating AI Output",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>AI-generated explanations can be incomplete or inaccurate, just like generated code. The developer should verify the explanation against the implementation and correct any mistakes before publishing it.</p><p>Explanations are not inherently safe just because they are prose. ASCII formatting is unrelated to technical correctness. The location where Copilot Chat was used does not remove the need to validate the output.</p>"
    },
    {
      n: 57,
      prompt: "<p>A team wants to use Edit mode for broad code changes in an IDE. Which editor support statement is accurate?</p>",
      choices: ["Edit mode is supported in VS Code and JetBrains", "Edit mode is supported in NeoVim only", "Edit mode is a retired name for Copilot Spark", "Edit mode is supported only on GitHub.com"],
      answer: 0,
      topic: "Copilot in the IDE",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Edit mode is the current name for the feature formerly called Copilot Edits, and it is supported in VS Code and JetBrains. This is the current product framing to use.</p><p>Edit mode is not supported only in NeoVim and is not a retired name for Copilot Spark. It is an editor feature, not something supported only on GitHub.com.</p>"
    },
    {
      n: 58,
      prompt: "<p>An organization wants to replace GitHub App-based Copilot Extensions after their sunset. Which current integration approach should they evaluate?</p>",
      choices: ["Retired Copilot Workspace", "MCP servers", "Retired GitHub Models", "Legacy usage counters"],
      answer: 1,
      topic: "Copilot Features and Capabilities",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>GitHub App-based Copilot Extensions were fully sunset and replaced by MCP servers. MCP servers are the current integration direction for extending Copilot workflows.</p><p>Copilot Workspace is retired and absent from current docs. GitHub Models is retired as a live service in this context. Legacy usage counters are unrelated; the current term for usage allowance is GitHub AI Credits.</p>"
    },
    {
      n: 59,
      prompt: "<p>A user asks what happens to prompts from Copilot Chat used outside the code editor, including CLI and GitHub.com chat. Which retention statement is supported?</p>",
      choices: ["They are never retained in any Copilot surface", "They are retained forever in the audit log", "They are typically retained for 28 days outside the editor", "They are retained only if Suggestions matching public code is Allow"],
      answer: 2,
      topic: "Data Handling and Flow",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>For Copilot Chat used outside the code editor, prompts, suggestions, and supporting context are typically retained for 28 days. The same applies to CLI, Mobile, and Chat on GitHub.com, while retention within the editor may vary.</p><p>Prompts are not never retained in every Copilot surface; code editor prompts are discarded once a suggestion is returned, but outside-editor chat has the 28-day retention statement. The audit log does not retain local client session prompts. Suggestions matching public code does not determine chat retention.</p>"
    },
    {
      n: 60,
      prompt: "<p>A developer wants to use Copilot responsibly on a safety-critical change. Which behavior best combines reliability and safety with accountability?</p>",
      choices: ["Accept the fastest answer to reduce context switching", "Rely on public-code matching as the only review step", "Delegate all responsibility to the model after tests pass", "Use Copilot as assistance, then require human review, tests, and documented approval"],
      answer: 3,
      topic: "Responsible AI Principles",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Reliability and safety require careful validation under expected and unexpected conditions, and accountability requires people to remain responsible for decisions. Human review, testing, and documented approval are appropriate safeguards for safety-critical work.</p><p>Accepting the fastest answer favors speed over safety. Public-code matching is a limited safeguard and not a complete review process. Passing tests does not transfer responsibility to the model or remove the need for accountable human approval.</p>"
    }
  ] } ]
};
