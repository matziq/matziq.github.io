window.GH3_DATA = window.GH3_DATA || {};
window.GH3_DATA.drills = [
  {
    "id": "d1-principles",
    "topic": "Responsible AI Principles",
    "title": "Responsible AI Principles",
    "blurb": "Separates the six responsible AI principles by matching each one to a concrete Copilot risk.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A team notices that Copilot-generated examples for a hiring workflow consistently favor one demographic group over another. Which responsible AI principle is most directly involved?",
        "choices": [
          "Fairness",
          "Transparency",
          "Privacy and security",
          "Accountability"
        ],
        "answer": 0,
        "tag": "Fairness",
        "explanation": "<p>Fairness is right because the harm is unequal treatment across groups. Transparency would focus on whether users can understand how the recommendation was produced. Privacy and security would involve misuse or exposure of personal data. Accountability would focus on governance and responsibility for outcomes.</p>"
      },
      {
        "n": 2,
        "prompt": "A Copilot Autofix suggestion includes a natural language explanation so a developer can understand the recommended change before applying it. Which principle does that explanation most directly support?",
        "choices": [
          "Inclusiveness",
          "Reliability and safety",
          "Transparency",
          "Fairness"
        ],
        "answer": 2,
        "tag": "Transparency",
        "explanation": "<p>Transparency is right because explanations help people understand AI-generated recommendations. Reliability and safety is about dependable, safe behavior. Inclusiveness is about accessibility for different users. Fairness is about equitable treatment across groups.</p>"
      },
      {
        "n": 3,
        "prompt": "A team plans to accept AI-generated code only after review, tests, and security checks because the suggestion might contain bugs. Which principle is most directly supported by that practice?",
        "choices": [
          "Accountability",
          "Reliability and safety",
          "Inclusiveness",
          "Privacy and security"
        ],
        "answer": 1,
        "tag": "Reliability and safety",
        "explanation": "<p>Reliability and safety is right because validation reduces the risk of unsafe or incorrect behavior reaching production. Accountability would assign responsibility and governance. Privacy and security would focus on protecting data. Inclusiveness would focus on making the tool usable by people with different needs.</p>"
      },
      {
        "n": 4,
        "prompt": "A company creates a governance process that names who approves Copilot policy changes and who owns incident response for AI-assisted work. Which principle does this best demonstrate?",
        "choices": [
          "Fairness",
          "Privacy and security",
          "Transparency",
          "Accountability"
        ],
        "answer": 3,
        "tag": "Accountability",
        "explanation": "<p>Accountability is right because the scenario assigns human responsibility and governance for AI use. Fairness would be about equitable outcomes. Privacy and security would be about protecting data and systems. Transparency would be about making AI behavior understandable.</p>"
      },
      {
        "n": 5,
        "prompt": "A developer asks Copilot Chat to summarize sensitive customer identifiers from a private file and paste them into a public issue. Which principle is most directly at risk?",
        "choices": [
          "Fairness",
          "Inclusiveness",
          "Privacy and security",
          "Transparency"
        ],
        "answer": 2,
        "tag": "Privacy and security",
        "explanation": "<p>Privacy and security is right because the risk is exposing personal or sensitive data. Fairness concerns equitable treatment. Inclusiveness concerns accessible and usable experiences. Transparency concerns understanding how AI output was produced.</p>"
      },
      {
        "n": 6,
        "prompt": "A team writes guidance so Copilot-assisted workflows remain usable for developers with different abilities, tools, and language backgrounds. Which principle is the best match?",
        "choices": [
          "Inclusiveness",
          "Accountability",
          "Reliability and safety",
          "Fairness"
        ],
        "answer": 0,
        "tag": "Inclusiveness",
        "explanation": "<p>Inclusiveness is right because the focus is enabling people with different abilities and backgrounds to use the system. Accountability is about responsibility and governance. Reliability and safety is about dependable behavior. Fairness is about equitable outcomes for groups.</p>"
      },
      {
        "n": 7,
        "prompt": "A security team enables controls for harmful content and public-code matching regardless of which model a developer selects. Which responsible-AI idea does this most reinforce?",
        "choices": [
          "Transparency",
          "Accountability",
          "Privacy and security",
          "Reliability and safety"
        ],
        "answer": 3,
        "tag": "Safety controls",
        "explanation": "<p>Reliability and safety is right because consistent filters help keep outputs safer across model choices. Privacy and security is related when controls protect data, but the scenario centers on safe behavior. Accountability would describe who owns the controls. Transparency would describe making the controls understandable.</p>"
      },
      {
        "n": 8,
        "prompt": "A team documents that AI suggestions must be reviewed by humans and that the team remains responsible for code it ships. Which principle is most directly reflected?",
        "choices": [
          "Reliability and safety",
          "Accountability",
          "Transparency",
          "Inclusiveness"
        ],
        "answer": 1,
        "tag": "Human responsibility",
        "explanation": "<p>Accountability is right because responsibility stays with people and organizations using the tool. Reliability and safety would focus on whether the resulting system works safely. Transparency would focus on explainability. Inclusiveness would focus on access for all users.</p>"
      }
    ]
  },
  {
    "id": "d1-limitations",
    "topic": "Responsible AI Principles",
    "title": "Limitations and Risks",
    "blurb": "Clarifies the four named limitation categories so similar-sounding risks do not blend together.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "Copilot suggests code that compiles but mishandles authentication edge cases. Which named limitation category best fits this risk?",
        "choices": [
          "Code quality and correctness",
          "Language and framework specificity",
          "Dependency on training data",
          "Complex problem solving"
        ],
        "answer": 0,
        "tag": "Correctness",
        "explanation": "<p>Code quality and correctness is right because the suggestion may contain errors, security concerns, or context misinterpretation. Language and framework specificity is about uneven performance across technologies. Dependency on training data involves bias, outdated practices, or copyright concerns. Complex problem solving involves high-level design or creativity limits.</p>"
      },
      {
        "n": 2,
        "prompt": "A developer working in a niche framework gets weaker Copilot suggestions than teammates using a common web stack. Which limitation category explains this difference?",
        "choices": [
          "Code quality and correctness",
          "Dependency on training data",
          "Language and framework specificity",
          "Complex problem solving"
        ],
        "answer": 2,
        "tag": "Framework specificity",
        "explanation": "<p>Language and framework specificity is right because Copilot performance can vary by technology and may be weaker for niche frameworks. Code quality and correctness is about bugs or security flaws in output. Dependency on training data is about what the model learned from. Complex problem solving is about architecture and design reasoning limits.</p>"
      },
      {
        "n": 3,
        "prompt": "Copilot recommends an old library pattern that used to be common but is no longer considered best practice. Which named limitation category is the best match?",
        "choices": [
          "Complex problem solving",
          "Dependency on training data",
          "Language and framework specificity",
          "Code quality and correctness"
        ],
        "answer": 1,
        "tag": "Training data",
        "explanation": "<p>Dependency on training data is right because suggestions can reflect outdated practices, bias, or copyright concerns from training sources. Code quality and correctness focuses on whether output is wrong or insecure in context. Language and framework specificity focuses on uneven support across technologies. Complex problem solving focuses on design limitations.</p>"
      },
      {
        "n": 4,
        "prompt": "A team asks Copilot to invent an entire distributed-system architecture with subtle consistency guarantees. The answer is fluent but misses key design tradeoffs. Which limitation category is most relevant?",
        "choices": [
          "Dependency on training data",
          "Code quality and correctness",
          "Language and framework specificity",
          "Complex problem solving"
        ],
        "answer": 3,
        "tag": "Complex design",
        "explanation": "<p>Complex problem solving is right because Copilot has limits with high-level design and creativity constraints. Code quality and correctness focuses on bugs in a specific suggestion. Dependency on training data focuses on bias or outdated patterns. Language and framework specificity focuses on varying performance by technology.</p>"
      },
      {
        "n": 5,
        "prompt": "A generated SQL helper lacks parameterization and could introduce injection risk if accepted unchanged. Which limitation category captures this concern?",
        "choices": [
          "Dependency on training data",
          "Language and framework specificity",
          "Code quality and correctness",
          "Complex problem solving"
        ],
        "answer": 2,
        "tag": "Security flaw",
        "explanation": "<p>Code quality and correctness is right because the category includes errors, security concerns, and context misinterpretation. Language and framework specificity is about weaker results in some technologies. Dependency on training data is about learned bias, outdated practices, or copyright concerns. Complex problem solving is about high-level design limits.</p>"
      },
      {
        "n": 6,
        "prompt": "A model produces suggestions that mirror biased examples common in historical source material. Which limitation category is being illustrated?",
        "choices": [
          "Dependency on training data",
          "Language and framework specificity",
          "Code quality and correctness",
          "Complex problem solving"
        ],
        "answer": 0,
        "tag": "Bias source",
        "explanation": "<p>Dependency on training data is right because bias in suggestions can come from patterns learned during training. Code quality and correctness focuses on errors or security issues. Language and framework specificity focuses on technology coverage. Complex problem solving focuses on architecture and design limitations.</p>"
      },
      {
        "n": 7,
        "prompt": "Copilot handles common JavaScript examples well but struggles to produce idiomatic code for a specialized internal DSL. Which limitation category should the developer remember?",
        "choices": [
          "Complex problem solving",
          "Code quality and correctness",
          "Dependency on training data",
          "Language and framework specificity"
        ],
        "answer": 3,
        "tag": "Niche technology",
        "explanation": "<p>Language and framework specificity is right because performance varies across languages, frameworks, and less common technologies. Dependency on training data can influence rare patterns, but the named category for uneven technology performance is language and framework specificity. Code quality and correctness is about faulty output. Complex problem solving is about design-level limits.</p>"
      },
      {
        "n": 8,
        "prompt": "A team relies on Copilot to choose a product architecture without human design review. Which limitation category makes that especially risky?",
        "choices": [
          "Language and framework specificity",
          "Complex problem solving",
          "Dependency on training data",
          "Code quality and correctness"
        ],
        "answer": 1,
        "tag": "Architecture limits",
        "explanation": "<p>Complex problem solving is right because Copilot can be limited in high-level design decisions and creative architectural reasoning. Code quality and correctness focuses on bugs in individual output. Language and framework specificity focuses on uneven technology support. Dependency on training data focuses on bias, outdated practices, or copyright concerns.</p>"
      }
    ]
  },
  {
    "id": "d1-bias",
    "topic": "Responsible AI Principles",
    "title": "Bias, Fairness, and Mitigation",
    "blurb": "Builds the habit of spotting biased output and choosing human-centered mitigation rather than blind acceptance.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "Copilot generates sample user personas that only include one region and one age group for a global product. What is the most responsible next step?",
        "choices": [
          "Review and revise the examples to cover the intended user population",
          "Accept the personas because AI output is neutral by default",
          "Disable all Copilot features for the repository",
          "Treat the issue as only a syntax problem"
        ],
        "answer": 0,
        "tag": "Bias review",
        "explanation": "<p>Reviewing and revising the examples is right because biased or narrow output needs human mitigation. AI output is not neutral by default. Disabling all Copilot features is disproportionate to a correctable content issue. Treating the problem as syntax ignores the fairness and representativeness concern.</p>"
      },
      {
        "n": 2,
        "prompt": "A generated test dataset uses stereotypes in names, locations, and job roles. Which mitigation best fits responsible Copilot use?",
        "choices": [
          "Keep the data because tests are not user-facing",
          "Use the data only if it compiles",
          "Replace the stereotypes and document review expectations",
          "Move the prompt to the CLI so the bias is not visible in the IDE"
        ],
        "answer": 2,
        "tag": "Mitigation",
        "explanation": "<p>Replacing stereotypes and documenting review expectations is right because mitigation requires human review and improved guidance. Keeping biased data because tests are internal still leaves harmful patterns in the codebase. Compilation does not prove fairness. Moving the prompt to the CLI changes the interface, not the bias.</p>"
      },
      {
        "n": 3,
        "prompt": "A developer wants Copilot to generate inclusive example text for an accessibility feature. Which prompt strategy is most likely to reduce biased or narrow output?",
        "choices": [
          "Ask only for the shortest possible output",
          "Ask for diverse, respectful examples and state the intended user groups",
          "Hide related files so Copilot has less context",
          "Rely on the model picker to remove all bias"
        ],
        "answer": 1,
        "tag": "Prompt mitigation",
        "explanation": "<p>Asking for diverse, respectful examples and naming the intended user groups is right because explicit context can steer output toward inclusive coverage. The shortest prompt may omit important constraints. Hiding related files removes useful context. Changing models does not eliminate the need to review for bias.</p>"
      },
      {
        "n": 4,
        "prompt": "Copilot suggests comments that describe one group of users in a negative way. What should the developer do before using the suggestion?",
        "choices": [
          "Accept it if the surrounding code is correct",
          "Assume toxicity filtering guarantees the text is safe",
          "Mark it as a public-code match",
          "Rewrite or reject the harmful language and review for similar issues"
        ],
        "answer": 3,
        "tag": "Harmful language",
        "explanation": "<p>Rewriting or rejecting the harmful language is right because human oversight is required even with filters. Correct surrounding code does not make harmful comments acceptable. A public-code match is a different issue about matching public repositories. Toxicity filtering reduces risk but does not remove the need for review.</p>"
      },
      {
        "n": 5,
        "prompt": "A generated recommendation ranks users in a way that disadvantages a protected group. Which concern should be raised first?",
        "choices": [
          "Whether the model used the newest version",
          "Whether the suggestion came from ghost text",
          "Whether the output creates a fairness harm",
          "Whether the file path is short enough"
        ],
        "answer": 2,
        "tag": "Fairness harm",
        "explanation": "<p>The fairness harm is right because unequal treatment of a protected group is the central risk. Specific model version numbers are not a safe basis for exam content or responsible review. Ghost text describes inline suggestion rendering, not bias. File path length is unrelated to the harmful ranking.</p>"
      },
      {
        "n": 6,
        "prompt": "A team wants to reduce biased Copilot outputs over time. Which practice best supports that goal?",
        "choices": [
          "Use human review, representative examples, and explicit prompt constraints",
          "Accept only outputs that are longer than a paragraph",
          "Ban all examples involving people",
          "Rely only on audit logs to capture every prompt"
        ],
        "answer": 0,
        "tag": "Process control",
        "explanation": "<p>Human review, representative examples, and explicit constraints are right because bias mitigation is an ongoing practice. Banning all people-related examples is overly broad and may harm usefulness. Longer output can still be biased. Audit logs do not capture local Copilot prompts and cannot replace review.</p>"
      },
      {
        "n": 7,
        "prompt": "A developer sees Copilot produce biased code comments after learning from nearby examples in the repository. What is the best corrective action?",
        "choices": [
          "Assume repository instructions rank below organization policies for instructions",
          "Turn on Suggestions matching public code Allow",
          "Switch from Ask mode to Edit mode to make bias impossible",
          "Improve the surrounding examples and reject the biased suggestion"
        ],
        "answer": 3,
        "tag": "Context cleanup",
        "explanation": "<p>Improving surrounding examples and rejecting the biased suggestion is right because Copilot uses context and humans must correct harmful patterns. Suggestions matching public code controls public-code matches, not bias. Edit mode does not make bias impossible. Instruction precedence is separate from fixing biased local context.</p>"
      },
      {
        "n": 8,
        "prompt": "Which review question best catches fairness issues in Copilot-generated sample data?",
        "choices": [
          "Does the output use the current product name for GitHub AI Credits?",
          "Does the data represent groups equitably for the scenario?",
          "Are there exactly four choices?",
          "Did the prompt travel over HTTPS?"
        ],
        "answer": 1,
        "tag": "Fairness check",
        "explanation": "<p>Checking whether the data represents groups equitably is right because fairness review looks for biased or exclusionary patterns. Product naming, item format, and secure transmission can matter in other contexts, but they do not directly test whether sample data treats groups fairly.</p>"
      }
    ]
  },
  {
    "id": "d1-verification",
    "topic": "Validating AI Output",
    "title": "Verification and Human Oversight",
    "blurb": "Reinforces that Copilot output is assistance, not authority, and must be validated before use.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "Copilot generates a convincing authorization check for a pull request. What should the developer do before merging it?",
        "choices": [
          "Review the logic, run appropriate tests, and check security assumptions",
          "Merge it because Copilot suggestions have already passed all possible checks",
          "Skip tests if the code was generated in Agent mode",
          "Trust it only when it contains no comments"
        ],
        "answer": 0,
        "tag": "Human validation",
        "explanation": "<p>Reviewing logic, tests, and security assumptions is right because AI output must be validated by humans. Copilot filters reduce risk but do not prove correctness. Agent mode does not remove review obligations. Comment length has no bearing on whether the logic is safe.</p>"
      },
      {
        "n": 2,
        "prompt": "A Copilot answer cites an API behavior that seems surprising. What is the safest responsible response?",
        "choices": [
          "Use the answer if it sounds confident",
          "Ask Copilot to repeat the same answer twice",
          "Verify the behavior against authoritative documentation or code",
          "Assume the model picker guarantees factual accuracy"
        ],
        "answer": 2,
        "tag": "Fact checking",
        "explanation": "<p>Verifying against authoritative documentation or code is right because Copilot can be fluent and wrong. Confidence is not evidence. Repetition can repeat the same error. Model selection does not eliminate hallucination or the need for validation.</p>"
      },
      {
        "n": 3,
        "prompt": "Copilot suggests a dependency upgrade and migration steps for a production service. Which validation path is best?",
        "choices": [
          "Apply the migration directly to production",
          "Run tests and review release notes before applying the change",
          "Accept only the first suggestion because later suggestions are less reliable",
          "Disable HTTPS prompt transmission"
        ],
        "answer": 1,
        "tag": "Production change",
        "explanation": "<p>Running tests and reviewing release notes is right because production changes require independent validation. Applying directly to production is unsafe. There is no rule that the first suggestion is inherently best. HTTPS transmission is part of secure flow and is not a validation shortcut.</p>"
      },
      {
        "n": 4,
        "prompt": "A developer asks Copilot to generate unit tests. The tests pass, but they assert the current buggy behavior instead of the intended behavior. What went wrong?",
        "choices": [
          "Copilot CLI should have been used instead of the IDE",
          "The prompt was too short to transmit over HTTPS",
          "Suggestions matching public code should have been set to Allow",
          "The developer still needed to validate the tests against requirements"
        ],
        "answer": 3,
        "tag": "Test validation",
        "explanation": "<p>Validating tests against requirements is right because passing tests can still encode the wrong behavior. The CLI versus IDE choice does not determine test intent. Suggestions matching public code controls public-code matches. Prompt transport length is unrelated to whether assertions match requirements.</p>"
      },
      {
        "n": 5,
        "prompt": "A team wants to operate Copilot responsibly during code review. Which habit is most aligned with the facts brief?",
        "choices": [
          "Treat AI comments as final approval",
          "Assume audit logs store the exact local prompt for later review",
          "Review AI comments as suggestions and apply human judgment",
          "Accept all Copilot Autofix patches without reading them"
        ],
        "answer": 2,
        "tag": "Review judgment",
        "explanation": "<p>Reviewing AI comments as suggestions is right because humans remain responsible for deciding what to change. AI comments are not final approval. Audit logs do not include local prompt text. Copilot Autofix suggestions still need developer review even though they include explanations.</p>"
      },
      {
        "n": 6,
        "prompt": "Copilot proposes sample data containing realistic personal identifiers. What should the developer do before committing it?",
        "choices": [
          "Replace it with safe synthetic data and review privacy risk",
          "Move it to a hidden file",
          "Commit it if the identifiers look fictional",
          "Rely on public-code matching to remove personal data"
        ],
        "answer": 0,
        "tag": "Privacy validation",
        "explanation": "<p>Replacing it with safe synthetic data and reviewing privacy risk is right because personal data can create privacy and security harm. Looking fictional is not enough. Hiding the file does not make sensitive data safe. Public-code matching is not a personal-data scrubber.</p>"
      },
      {
        "n": 7,
        "prompt": "A Copilot-generated refactor changes behavior in files the developer did not inspect. Which response best reflects human oversight?",
        "choices": [
          "Ignore the changed files if they are outside the cursor window",
          "Trust the refactor because generated code is owned by GitHub",
          "Assume Edit mode cannot introduce behavior changes",
          "Inspect the diff and run targeted tests before accepting"
        ],
        "answer": 3,
        "tag": "Diff review",
        "explanation": "<p>Inspecting the diff and running targeted tests is right because generated changes need review. GitHub does not take over ownership of the shipped code. Edit mode can change behavior and needs validation. Files outside the original cursor location can still matter.</p>"
      },
      {
        "n": 8,
        "prompt": "A developer wants to validate a Copilot security suggestion. Which evidence is strongest?",
        "choices": [
          "The answer is written in a confident tone",
          "The change is supported by tests, code review, and security reasoning",
          "The suggestion appears as ghost text",
          "The same prompt was used in a previous chat"
        ],
        "answer": 1,
        "tag": "Evidence",
        "explanation": "<p>Tests, code review, and security reasoning are right because they independently validate the suggestion. Confidence is not proof. Ghost text only describes inline rendering. Reusing a prompt does not prove the output is secure or correct.</p>"
      }
    ]
  },
  {
    "id": "d2-completions",
    "topic": "Copilot in the IDE",
    "title": "Completions and Next Edit Suggestions",
    "blurb": "Distinguishes inline ghost-text completions from suggestions that predict the next edit location.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "In an IDE, Copilot shows gray ghost text at the cursor to complete the current line. Which feature is being used?",
        "choices": [
          "Inline suggestions",
          "Next edit suggestions",
          "Copilot cloud agent",
          "Copilot Spaces"
        ],
        "answer": 0,
        "tag": "Ghost text",
        "explanation": "<p>Inline suggestions are right because ghost text renders a completion at the current cursor location. Next edit suggestions predict where the next change should happen. Copilot cloud agent works autonomously on GitHub. Copilot Spaces provide shared context, not cursor completions.</p>"
      },
      {
        "n": 2,
        "prompt": "A developer wants Copilot to predict where the next change should be made after a refactor. Which feature addresses that need?",
        "choices": [
          "Copilot code review",
          "Inline suggestions",
          "Next edit suggestions",
          "Copilot Memory"
        ],
        "answer": 2,
        "tag": "Next location",
        "explanation": "<p>Next edit suggestions are right because they predict the location of the next edit. Inline suggestions complete where the cursor already is. Copilot code review comments on changes. Copilot Memory is customization context, not next-location prediction.</p>"
      },
      {
        "n": 3,
        "prompt": "A user changes the model picker for Chat and expects inline suggestions to use the same model automatically. What should they know?",
        "choices": [
          "The Chat model always controls every Copilot feature",
          "Inline suggestions, next edit suggestions, and Chat have independent model selections",
          "Only Copilot Free can choose separate models",
          "Model changes disable content filters"
        ],
        "answer": 1,
        "tag": "Model picker",
        "explanation": "<p>The independent selections statement is right because inline suggestions, next edit suggestions, and Chat are separate choices. Chat does not automatically control every feature. Copilot Free uses auto model selection only. Content filters apply regardless of model choice.</p>"
      },
      {
        "n": 4,
        "prompt": "A team asks whether content filters disappear when developers choose a different model for inline completions. What is correct?",
        "choices": [
          "Filters run only for Chat",
          "Filters are replaced by repository instructions",
          "Filters run only when public-code matching is Allow",
          "Filters apply regardless of which model is selected"
        ],
        "answer": 3,
        "tag": "Filters",
        "explanation": "<p>Filters applying regardless of model is right because changing models does not change data collection or usage policy. Filters are not limited to Chat. Public-code matching is one optional check, not a condition for all filters. Repository instructions do not replace safety filters.</p>"
      },
      {
        "n": 5,
        "prompt": "A developer on Copilot Free asks which model selection is available for inline suggestions. What is the correct answer?",
        "choices": [
          "Any premium model selected manually",
          "Only a BYOK model",
          "Auto model selection only",
          "No model is available for inline suggestions"
        ],
        "answer": 2,
        "tag": "Free plan",
        "explanation": "<p>Auto model selection only is right for Copilot Free and Student. Manual premium model choice is not available on Free. BYOK is a separate capability and not the Free-plan answer. Free includes an allowance of completions, so saying no model is available is wrong.</p>"
      },
      {
        "n": 6,
        "prompt": "A developer asks whether next edit suggestions are the same thing as ghost text. How should you explain it?",
        "choices": [
          "Next edit suggestions predict where to edit next; ghost text renders inline completions",
          "Ghost text is only shown by Copilot CLI",
          "They are identical names for inline suggestions",
          "Next edit suggestions are retired"
        ],
        "answer": 0,
        "tag": "Feature distinction",
        "explanation": "<p>The distinction is right because next edit suggestions predict an edit location while ghost text displays inline completion text. They are not identical. Copilot CLI is not the source of IDE ghost text. Next edit suggestions are current, with availability varying by editor.</p>"
      },
      {
        "n": 7,
        "prompt": "A Visual Studio Code user asks about next edit suggestions. What status best matches the facts brief?",
        "choices": [
          "Retired with Copilot Spark",
          "Unavailable in all editors",
          "Only available in NeoVim",
          "Generally available in VS Code"
        ],
        "answer": 3,
        "tag": "Availability",
        "explanation": "<p>Generally available in VS Code is right. The feature is not unavailable everywhere and is not a NeoVim-only capability. Copilot Spark was retired, but that retirement does not retire next edit suggestions.</p>"
      },
      {
        "n": 8,
        "prompt": "A developer sees a completion that looks plausible but references the wrong variable in the surrounding file. What is the best response?",
        "choices": [
          "Accept it because inline suggestions are already validated for correctness",
          "Review and test the suggestion before keeping it",
          "Move the file to a symlink",
          "Switch to public-code matching Allow"
        ],
        "answer": 1,
        "tag": "Completion review",
        "explanation": "<p>Reviewing and testing is right because inline suggestions can misinterpret context. Filters do not prove correctness. Symlinks relate to content-exclusion limits and do not validate code. Public-code matching controls matches to public code, not variable correctness.</p>"
      }
    ]
  },
  {
    "id": "d2-modes",
    "topic": "Copilot in the IDE",
    "title": "Ask, Edit, and Agent Mode",
    "blurb": "Prevents mode confusion by separating question answering, targeted edits, and autonomous IDE work.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A developer wants Copilot Chat to explain a function without changing files. Which mode best fits?",
        "choices": [
          "Ask mode",
          "Agent mode",
          "Edit mode",
          "Copilot cloud agent"
        ],
        "answer": 0,
        "tag": "Ask mode",
        "explanation": "<p>Ask mode is right because the developer wants an explanation without file edits. Edit mode is for applying targeted code changes. Agent mode can autonomously work through tasks in the IDE. Copilot cloud agent runs on GitHub and is not the same as an IDE chat mode.</p>"
      },
      {
        "n": 2,
        "prompt": "A developer selects code and asks Copilot to update the implementation in place. Which current name should the site use?",
        "choices": [
          "Copilot Extensions",
          "Copilot Edits",
          "Edit mode",
          "Copilot Workspace"
        ],
        "answer": 2,
        "tag": "Renamed mode",
        "explanation": "<p>Edit mode is right because the feature formerly called Copilot Edits is now named Edit mode. Copilot Extensions were GitHub App-based integrations that were retired and replaced by MCP servers. Copilot Workspace is retired. The old Copilot Edits name should be taught only as history.</p>"
      },
      {
        "n": 3,
        "prompt": "A developer wants Copilot to inspect errors, edit multiple files, and iterate in the IDE. Which mode is intended for that autonomous workflow?",
        "choices": [
          "Ask mode",
          "Agent mode",
          "Copilot Spaces",
          "Suggestions matching public code"
        ],
        "answer": 1,
        "tag": "Agent mode",
        "explanation": "<p>Agent mode is right because it can work through multi-step IDE tasks. Ask mode answers questions without directly making changes. Copilot Spaces provide shared context. Suggestions matching public code is a privacy safeguard, not an IDE work mode.</p>"
      },
      {
        "n": 4,
        "prompt": "A team mixes up Agent mode with Copilot cloud agent. What distinction should they learn?",
        "choices": [
          "They are the same feature with two names",
          "Agent mode was replaced by Spaces",
          "Copilot cloud agent is only ghost text",
          "Agent mode is in the IDE; Copilot cloud agent runs autonomously on GitHub"
        ],
        "answer": 3,
        "tag": "Agent distinction",
        "explanation": "<p>The IDE versus GitHub distinction is right. Agent mode and Copilot cloud agent are separate features. Copilot cloud agent is not ghost text; ghost text is inline suggestions. Spaces did not replace Agent mode.</p>"
      },
      {
        "n": 5,
        "prompt": "A NeoVim user asks whether Agent mode is available in that editor. What is correct?",
        "choices": [
          "It is available only if public-code matching is Block",
          "It is available only with Copilot Free",
          "It is not available in NeoVim",
          "It is the same as Copilot CLI plan mode"
        ],
        "answer": 2,
        "tag": "Editor support",
        "explanation": "<p>Not available in NeoVim is right according to the support facts. Public-code matching does not enable Agent mode. Copilot Free is not the condition. Copilot CLI plan mode is a CLI feature, not IDE Agent mode.</p>"
      },
      {
        "n": 6,
        "prompt": "A Visual Studio user asks whether Edit mode is supported in that IDE. What should the study site say?",
        "choices": [
          "Not supported in Visual Studio",
          "Supported only in the standalone GitHub Copilot CLI",
          "Supported in Visual Studio, Eclipse, and Xcode",
          "Retired and replaced by Copilot Spaces"
        ],
        "answer": 0,
        "tag": "Edit support",
        "explanation": "<p>Not supported in Visual Studio is right; Edit mode is supported in VS Code and JetBrains. It is not a CLI-only feature. It was not retired or replaced by Spaces. Eclipse and Xcode also do not support Edit mode.</p>"
      },
      {
        "n": 7,
        "prompt": "A user says, 'Ask mode changed my repository.' What is the best correction?",
        "choices": [
          "Ask mode bypasses content filters",
          "Ask mode is another name for Copilot cloud agent",
          "Ask mode is retired terminology",
          "Ask mode is for answers; Edit or Agent mode is used for code changes"
        ],
        "answer": 3,
        "tag": "Mode purpose",
        "explanation": "<p>The answer-versus-change distinction is right because Ask mode is for chat responses, while Edit and Agent modes can change code. Ask mode is not Copilot cloud agent, is not retired terminology, and does not bypass content filters.</p>"
      },
      {
        "n": 8,
        "prompt": "A developer asks why the exam guide may mention Copilot Edits. How should a current prep site handle that name?",
        "choices": [
          "Mark it as a live feature separate from Edit mode",
          "Teach that Copilot Edits was renamed Edit mode",
          "Use it as the required current name",
          "Replace every Edit mode reference with Copilot Workspace"
        ],
        "answer": 1,
        "tag": "Name mapping",
        "explanation": "<p>Teaching that Copilot Edits was renamed Edit mode is right because candidates may see the old name in source material. Treating Copilot Edits as a separate live feature is wrong. It is not the current required name. Copilot Workspace is retired and should not replace Edit mode.</p>"
      }
    ]
  },
  {
    "id": "d2-chat",
    "topic": "Copilot CLI",
    "title": "Chat Interfaces and Commands",
    "blurb": "Connects the standalone GitHub Copilot CLI to interactive sessions, prompt mode, and platform support.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A developer wants Copilot assistance directly in a terminal on Windows PowerShell. Which current product name should they use?",
        "choices": [
          "GitHub Copilot CLI",
          "gh copilot extension",
          "Copilot Spark",
          "Copilot knowledge base"
        ],
        "answer": 0,
        "tag": "CLI name",
        "explanation": "<p>GitHub Copilot CLI is right because the current CLI is standalone and works in terminal workflows. The gh copilot extension phrasing is retired terminology. Copilot Spark was retired. Copilot knowledge bases were retired and replaced by Copilot Spaces.</p>"
      },
      {
        "n": 2,
        "prompt": "A developer wants to send one prompt to Copilot CLI from a script instead of chatting interactively. Which capability supports that?",
        "choices": [
          "Only Ask mode in the IDE",
          "A Copilot Space",
          "The -p or --prompt option",
          "Public-code matching Allow"
        ],
        "answer": 2,
        "tag": "Prompt option",
        "explanation": "<p>The -p or --prompt option is right because the CLI can run programmatically as well as interactively. Ask mode is an IDE chat mode. A Copilot Space provides context, not a terminal prompt flag. Public-code matching does not run CLI prompts.</p>"
      },
      {
        "n": 3,
        "prompt": "During a Copilot CLI session, a user cycles modes with Shift+Tab. Which CLI mode from the facts brief can this reach?",
        "choices": [
          "Edit mode",
          "Plan mode",
          "Copilot code review",
          "Copilot Spark export mode"
        ],
        "answer": 1,
        "tag": "Plan mode",
        "explanation": "<p>Plan mode is right because Copilot CLI supports a plan mode and Shift+Tab cycles modes. Edit mode is an IDE feature, not the CLI mode named here. Copilot code review is a review feature. Copilot Spark export was part of a retired product path, not a CLI mode.</p>"
      },
      {
        "n": 4,
        "prompt": "A team asks where GitHub Copilot CLI can run. Which platform statement is supported?",
        "choices": [
          "Only Linux shells are supported",
          "Only GitHub.com browser sessions are supported",
          "Only macOS with third-party agents is supported",
          "Linux, macOS, and Windows, including PowerShell and WSL"
        ],
        "answer": 3,
        "tag": "Platform support",
        "explanation": "<p>Linux, macOS, and Windows with PowerShell and WSL is right. Limiting support to Linux, browser sessions, or macOS with third-party agents contradicts the CLI support facts. Browser Copilot Chat and terminal Copilot CLI are different interfaces.</p>"
      },
      {
        "n": 5,
        "prompt": "A developer on a paid plan asks whether all current plans include Copilot CLI. What should you say?",
        "choices": [
          "Only plans with Copilot Spaces include the CLI",
          "Only Enterprise includes Copilot CLI",
          "All plans include Copilot CLI",
          "The CLI retired with Copilot Extensions"
        ],
        "answer": 2,
        "tag": "Plan inclusion",
        "explanation": "<p>All plans include Copilot CLI is right according to the plan facts. Enterprise is not the only plan. Copilot Spaces are unrelated to CLI inclusion. Copilot Extensions were retired, but the standalone GitHub Copilot CLI is current.</p>"
      },
      {
        "n": 6,
        "prompt": "A user wants Copilot CLI to generate scripts and manage files in a session. Which exam objective does this best match?",
        "choices": [
          "Use GitHub Copilot CLI interactively and in sessions",
          "Manage privacy settings and exclusions",
          "Understand responsible AI principles only",
          "Configure Copilot code review policies"
        ],
        "answer": 0,
        "tag": "CLI objective",
        "explanation": "<p>Using GitHub Copilot CLI interactively and in sessions is right because the objective includes sessions, scripts, and file management. Privacy exclusions are a different domain. Responsible AI principles are important but not the CLI feature objective. Code review policies are administrator settings.</p>"
      },
      {
        "n": 7,
        "prompt": "A developer expects prompt files from .github/prompts to work in Copilot CLI. What is correct?",
        "choices": [
          "Prompt files only work when Copilot Spark is active",
          "Prompt files are required for every CLI command",
          "Prompt files replaced the CLI",
          "Prompt files are not supported in the CLI"
        ],
        "answer": 3,
        "tag": "Prompt files",
        "explanation": "<p>Prompt files not being supported in the CLI is right. They are GA in VS Code and Visual Studio and preview in some IDEs, but not supported in the CLI. They are not required for CLI commands, did not replace the CLI, and do not depend on the retired Copilot Spark.</p>"
      },
      {
        "n": 8,
        "prompt": "A team wants separate policies for the Copilot app and Copilot CLI. Is that possible?",
        "choices": [
          "No, the app and CLI always share one client policy",
          "Yes, the Copilot app and Copilot CLI are governed by separate client policies",
          "Only if GitHub Enterprise Server is used",
          "Only if content exclusions are disabled"
        ],
        "answer": 1,
        "tag": "Client policy",
        "explanation": "<p>Separate client policies are right because the Copilot app and Copilot CLI can be governed independently. They do not have to share one policy. GitHub Enterprise Server does not support Copilot. Content exclusions do not determine whether the app and CLI policies are separate.</p>"
      }
    ]
  },
  {
    "id": "d2-cloud-agent",
    "topic": "Copilot Features and Capabilities",
    "title": "Cloud Agent and Code Review",
    "blurb": "Separates GitHub-hosted autonomous work, IDE Agent mode, code review, and Autofix.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A repository owner assigns a GitHub-hosted autonomous task for Copilot to work on outside the local IDE. Which feature is this?",
        "choices": [
          "Copilot cloud agent",
          "Agent mode in the IDE",
          "Inline suggestions",
          "Next edit suggestions"
        ],
        "answer": 0,
        "tag": "Cloud agent",
        "explanation": "<p>Copilot cloud agent is right because it runs autonomously on GitHub. Agent mode is an IDE workflow. Inline suggestions are ghost-text completions at the cursor. Next edit suggestions predict the next edit location.</p>"
      },
      {
        "n": 2,
        "prompt": "A training page mentions Copilot coding agent. How should a current prep item phrase the concept?",
        "choices": [
          "Use Copilot coding agent as a separate current product",
          "Replace it with Copilot Spark",
          "Copilot cloud agent, formerly Copilot coding agent",
          "Avoid the feature entirely because it is unverified"
        ],
        "answer": 2,
        "tag": "Rename",
        "explanation": "<p>Copilot cloud agent, formerly Copilot coding agent, is right because the product was renamed. Treating the old name as a separate current product is wrong. Copilot Spark was retired. The cloud-agent rename is verified, so the feature should not be omitted as unverified.</p>"
      },
      {
        "n": 3,
        "prompt": "A pull request receives AI-generated review comments based on repository guidance. Which capability is being used?",
        "choices": [
          "Copilot Spaces retirement",
          "Copilot code review",
          "Next edit suggestions",
          "GitHub AI Credits rename"
        ],
        "answer": 1,
        "tag": "Code review",
        "explanation": "<p>Copilot code review is right because it reviews pull requests and can use review standards and instructions. Copilot Spaces retirement is not a capability; knowledge bases were the retired item. Next edit suggestions happen in the editor. GitHub AI Credits are plan allowances, not PR review comments.</p>"
      },
      {
        "n": 4,
        "prompt": "Copilot Autofix proposes a patch for a CodeQL alert on the default branch. What key subscription fact should a candidate know?",
        "choices": [
          "It requires Copilot Enterprise",
          "It requires a Copilot subscription for every user",
          "It works only when public-code matching is Allow",
          "It does not require a GitHub Copilot subscription"
        ],
        "answer": 3,
        "tag": "Autofix",
        "explanation": "<p>Not requiring a GitHub Copilot subscription is right for Copilot Autofix for CodeQL alerts. It is not limited to Enterprise subscribers. Public-code matching does not enable Autofix. The suggestion still needs review even though it includes code and explanation.</p>"
      },
      {
        "n": 5,
        "prompt": "Which input helps Copilot Autofix generate a CodeQL alert fix?",
        "choices": [
          "The real exam question count",
          "A retired Copilot Extensions manifest",
          "SARIF alert data, surrounding code snippets, and query help text",
          "A personal pricing setting"
        ],
        "answer": 2,
        "tag": "Autofix inputs",
        "explanation": "<p>SARIF alert data, surrounding code snippets, and query help text are right because those are named inputs for Copilot Autofix. The real exam question count is not published and is irrelevant. Retired Copilot Extensions manifests do not drive Autofix. Personal pricing settings are not Autofix inputs.</p>"
      },
      {
        "n": 6,
        "prompt": "For Copilot cloud agent access at the enterprise level, what is the policy exception described in the facts brief?",
        "choices": [
          "Enterprises select exactly which organizations get access",
          "Organizations always decide without enterprise involvement",
          "Access is controlled only by local IDE settings",
          "Access requires GitHub Enterprise Server"
        ],
        "answer": 0,
        "tag": "Policy exception",
        "explanation": "<p>Enterprises selecting exactly which organizations get access is right for the Copilot cloud agent exception. Organizations do not always decide alone. Local IDE settings do not control this GitHub-hosted agent policy. GitHub Enterprise Server does not support Copilot.</p>"
      },
      {
        "n": 7,
        "prompt": "On a pull request, which branch supplies instructions and skills for Copilot?",
        "choices": [
          "A retired knowledge base",
          "The base branch only",
          "The default branch regardless of the PR",
          "The head branch"
        ],
        "answer": 3,
        "tag": "PR instructions",
        "explanation": "<p>The head branch is right because Copilot reads instructions and skills from the pull request head branch. The base branch alone is not the source for this behavior. The default branch is not always used. Knowledge bases were retired and replaced by Copilot Spaces.</p>"
      },
      {
        "n": 8,
        "prompt": "A user calls Copilot cloud agent the same thing as Agent mode. What correction is accurate?",
        "choices": [
          "They are identical because both are agentic",
          "Agent mode is in the IDE; Copilot cloud agent runs on GitHub",
          "Agent mode is retired but cloud agent is not",
          "Cloud agent is only a name for inline ghost text"
        ],
        "answer": 1,
        "tag": "Agent comparison",
        "explanation": "<p>The IDE versus GitHub distinction is right because Agent mode and Copilot cloud agent are separate agentic capabilities. They are not identical. Agent mode is current where supported. Cloud agent is not ghost text; inline suggestions are ghost text.</p>"
      }
    ]
  },
  {
    "id": "d2-platform",
    "topic": "Copilot Features and Capabilities",
    "title": "Platform Features and What Replaced What",
    "blurb": "Teaches current names and retired features without making stale products look correct.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "An organization wants shared documentation context for Copilot after knowledge bases were retired. What current feature replaced them?",
        "choices": [
          "Copilot Spaces",
          "Copilot Spark",
          "Copilot Workspace",
          "Suggestions matching public code"
        ],
        "answer": 0,
        "tag": "Spaces",
        "explanation": "<p>Copilot Spaces is right because Copilot knowledge bases were retired and replaced by Spaces. Copilot Spark was retired. Copilot Workspace is retired. Suggestions matching public code is a privacy setting, not shared documentation context.</p>"
      },
      {
        "n": 2,
        "prompt": "A developer asks what replaced GitHub App-based Copilot Extensions after their sunset. What is the correct answer?",
        "choices": [
          "Copilot Workspace",
          "GitHub Models",
          "MCP servers",
          "Inline ghost text"
        ],
        "answer": 2,
        "tag": "Extensions replacement",
        "explanation": "<p>MCP servers are right because GitHub App-based Copilot Extensions were sunset and replaced by MCP servers. Copilot Workspace is retired. GitHub Models retired as a live service. Inline ghost text is an IDE completion display, not an extensibility replacement.</p>"
      },
      {
        "n": 3,
        "prompt": "A study-guide bullet still says to utilize Copilot Spark. How should a current prep site cover Spark?",
        "choices": [
          "As the required current app builder for every plan",
          "As a retired feature, not a live capability",
          "As the replacement for Copilot Spaces",
          "As the new name for GitHub Copilot CLI"
        ],
        "answer": 1,
        "tag": "Spark retirement",
        "explanation": "<p>Covering Copilot Spark as retired is right because the feature is no longer live. It is not the current app builder, did not replace Spaces, and is not the new name for GitHub Copilot CLI. Current replacements include building directly with VS Code, Copilot CLI, and the GitHub Copilot app.</p>"
      },
      {
        "n": 4,
        "prompt": "Which feature is confirmed retired, even though the exact retirement date must not be asserted in a question?",
        "choices": [
          "Inline suggestions",
          "Copilot CLI",
          "Copilot code review",
          "Copilot Workspace"
        ],
        "answer": 3,
        "tag": "Workspace",
        "explanation": "<p>Copilot Workspace is right because its retirement is confirmed while the exact sunset date is not verified for questions. Inline suggestions, Copilot CLI, and Copilot code review are current capabilities.</p>"
      },
      {
        "n": 5,
        "prompt": "A developer sees old material about premium requests. Which current term should the site use instead?",
        "choices": [
          "Copilot Spark credits",
          "PRU",
          "GitHub AI Credits",
          "Duplication detection units"
        ],
        "answer": 2,
        "tag": "AI Credits",
        "explanation": "<p>GitHub AI Credits is right because premium requests and PRU are retired terminology. Copilot Spark credits are not the current plan term. Duplication detection units are not a Copilot plan allowance concept.</p>"
      },
      {
        "n": 6,
        "prompt": "A user asks whether Copilot is supported on GitHub Enterprise Server. What should the answer be?",
        "choices": [
          "No, Copilot is not currently available for GitHub Enterprise Server",
          "Yes, but only for Enterprise plans",
          "Yes, if Copilot Spark is exported",
          "Only for public-code matching"
        ],
        "answer": 0,
        "tag": "GHES",
        "explanation": "<p>Not currently available for GitHub Enterprise Server is right. Enterprise plan names do not make GHES support available. Copilot Spark export is unrelated and Spark is retired. Public-code matching does not add GHES support.</p>"
      },
      {
        "n": 7,
        "prompt": "A candidate sees the phrase duplication detection filter in older content. Which current setting name should they recognize?",
        "choices": [
          "GitHub Models",
          "Copilot knowledge bases",
          "Copilot Edits",
          "Suggestions matching public code"
        ],
        "answer": 3,
        "tag": "Public-code setting",
        "explanation": "<p>Suggestions matching public code is right because it is the current setting name with Allow and Block values. Copilot knowledge bases and Copilot Edits are old names for different concepts. GitHub Models retired as a live service.</p>"
      },
      {
        "n": 8,
        "prompt": "Which current feature group includes Copilot Spaces, custom instructions, MCP servers, agent skills, custom agents, subagents, and hooks?",
        "choices": [
          "Administrator",
          "Customization",
          "Assistive",
          "Retired products"
        ],
        "answer": 1,
        "tag": "Feature taxonomy",
        "explanation": "<p>Customization is right because those items provide context, extension, or behavior customization. Administrator features are policies, audit logs, and subscription management. Assistive features include Chat, inline suggestions, next edit suggestions, PR summaries, and GitHub Desktop support. Retired products are not a current feature group.</p>"
      }
    ]
  },
  {
    "id": "d2-mcp",
    "topic": "Organization Settings and Policies",
    "title": "MCP and Extensibility",
    "blurb": "Targets the MCP replacement story and the common trap about unaffected VS Code extensions.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "After the sunset of GitHub App-based Copilot Extensions, which extensibility mechanism should organizations plan around?",
        "choices": [
          "MCP servers",
          "Copilot Spark",
          "Copilot Workspace",
          "GitHub Enterprise Server"
        ],
        "answer": 0,
        "tag": "MCP replacement",
        "explanation": "<p>MCP servers are right because they replaced GitHub App-based Copilot Extensions. Copilot Spark and Copilot Workspace are retired. GitHub Enterprise Server does not support Copilot and is not an extensibility replacement.</p>"
      },
      {
        "n": 2,
        "prompt": "A VS Code user worries that the Copilot Extensions sunset removed client-side VS Code Copilot extensions. What is correct?",
        "choices": [
          "Only GitHub Enterprise Server can use them now",
          "All VS Code extensions stopped working",
          "Client-side VS Code Copilot extensions are unaffected and supported",
          "They were replaced by Copilot Spark"
        ],
        "answer": 2,
        "tag": "VS Code trap",
        "explanation": "<p>Client-side VS Code Copilot extensions being unaffected is right because the sunset applied to GitHub App-based Copilot Extensions. It did not stop all VS Code extensions. GitHub Enterprise Server is not the path. Copilot Spark was retired and did not replace them.</p>"
      },
      {
        "n": 3,
        "prompt": "An enterprise admin asks what the MCP servers policy controls. Which statement is most accurate?",
        "choices": [
          "It controls all third-party hosts such as Cursor and Claude",
          "It applies where MCP support is generally available",
          "It controls only Suggestions matching public code",
          "It controls audit-log retention"
        ],
        "answer": 1,
        "tag": "MCP policy",
        "explanation": "<p>Applying where MCP support is generally available is right. The policy does not control the GitHub MCP server inside third-party hosts such as Cursor, Windsurf, or Claude. Suggestions matching public code is a separate privacy setting. Audit-log retention is a separate 180-day logging fact.</p>"
      },
      {
        "n": 4,
        "prompt": "Which statement correctly frames Copilot Extensions in exam prep content?",
        "choices": [
          "They are the current required way to extend Copilot",
          "They are needed to use inline suggestions",
          "They are the same as client-side VS Code extensions",
          "They are GitHub App-based integrations that were retired and replaced by MCP servers"
        ],
        "answer": 3,
        "tag": "Retired extensions",
        "explanation": "<p>The retired-and-replaced framing is right for GitHub App-based Copilot Extensions. They are not the current required extension path, are not the same as client-side VS Code extensions, and are not needed for inline suggestions.</p>"
      },
      {
        "n": 5,
        "prompt": "A team wants external tools and data sources to be available to Copilot workflows through a standard server approach. Which current concept best fits?",
        "choices": [
          "Copilot Spark workbench",
          "Copilot knowledge bases",
          "MCP servers",
          "Duplication detection filter"
        ],
        "answer": 2,
        "tag": "External tools",
        "explanation": "<p>MCP servers are right because they are the current extensibility concept. Copilot knowledge bases were retired and replaced by Spaces. Copilot Spark workbench was part of a retired feature. Duplication detection filter is old terminology for a different public-code matching concept.</p>"
      },
      {
        "n": 6,
        "prompt": "A policy designer assumes organization settings always override personal settings. What is the instruction-specific correction?",
        "choices": [
          "Personal instructions outrank repository and organization instructions",
          "Organization instructions rank highest",
          "Only MCP servers can provide instructions",
          "Instructions and policies use the same precedence rules"
        ],
        "answer": 0,
        "tag": "Instruction precedence",
        "explanation": "<p>Personal instructions outranking repository and organization instructions is right for custom instructions. Organization instructions rank lowest, even though organization or enterprise policies can still win for policy control. MCP servers are not the only source of instructions. Instructions and policies should not be treated as the same precedence system.</p>"
      },
      {
        "n": 7,
        "prompt": "Which repository file location is associated with hooks in the customization feature set?",
        "choices": [
          ".github/extensions/*.app.yml",
          ".github/copilot.yml",
          ".github/workflows/spark.yml",
          ".github/hooks/*.json"
        ],
        "answer": 3,
        "tag": "Hooks",
        "explanation": "<p>.github/hooks/*.json is right for hooks. .github/copilot.yml is not the hook location from the facts brief. Copilot Spark workflows are not the current hook mechanism. GitHub App-based Copilot Extensions are retired and not represented by the listed extensions path.</p>"
      },
      {
        "n": 8,
        "prompt": "A candidate needs to remember where prompt files are unsupported. Which answer is correct?",
        "choices": [
          "They are unsupported in VS Code",
          "They are unsupported in the CLI",
          "They are required on GitHub.com",
          "They are the only way to enable MCP"
        ],
        "answer": 1,
        "tag": "Prompt files",
        "explanation": "<p>Unsupported in the CLI is right for prompt files. They are generally available in VS Code and Visual Studio. They are not supported on GitHub.com and are not required there. They do not enable MCP by themselves.</p>"
      }
    ]
  },
  {
    "id": "d3-dataflow",
    "topic": "Data Handling and Flow",
    "title": "The Seven-Step Request Lifecycle",
    "blurb": "Makes the inbound and outbound lifecycle steps concrete, especially proxy and filtering responsibilities.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "In the seven-step flow, which activity belongs to step 1 before the prompt reaches the proxy?",
        "choices": [
          "Secure HTTPS transmission and context gathering",
          "Final response validation only",
          "Audit-log retention",
          "IP indemnity review"
        ],
        "answer": 0,
        "tag": "Step 1",
        "explanation": "<p>Secure HTTPS transmission and context gathering is right because step 1 gathers code before and after the cursor, file information, open tabs, project structure, languages, frameworks, and FIM context. Final response validation is outbound step 5. Audit-log retention and IP indemnity are separate policy topics.</p>"
      },
      {
        "n": 2,
        "prompt": "A question asks which steps are inbound in the request lifecycle. Which range is correct?",
        "choices": [
          "Steps 1 through 3",
          "Steps 5 through 7",
          "Steps 1 through 4",
          "Steps 4 through 7"
        ],
        "answer": 2,
        "tag": "Inbound",
        "explanation": "<p>Steps 1 through 4 are right because inbound includes secure transmission and context gathering, proxy filtering, toxicity filtering, and LLM code generation. Steps 5 through 7 are outbound delivery, validation, feedback, and repeat. The shorter or later ranges split the lifecycle incorrectly.</p>"
      },
      {
        "n": 3,
        "prompt": "The built prompt passes through a proxy server hosted where?",
        "choices": [
          "Only on the developer laptop",
          "In a GitHub-owned Microsoft Azure tenant",
          "In GitHub Enterprise Server",
          "In a customer-owned personal OneDrive"
        ],
        "answer": 1,
        "tag": "Proxy location",
        "explanation": "<p>A GitHub-owned Microsoft Azure tenant is right for the proxy server. The proxy is not only local to the laptop. GitHub Enterprise Server does not support Copilot. OneDrive is unrelated to the Copilot proxy architecture.</p>"
      },
      {
        "n": 4,
        "prompt": "During inbound processing, what is the proxy filter primarily trying to block?",
        "choices": [
          "Public-code matches only",
          "Accepted suggestion telemetry",
          "Retake attempts",
          "Prompt injection and jailbreak attempts"
        ],
        "answer": 3,
        "tag": "Proxy filter",
        "explanation": "<p>Prompt injection and jailbreak attempts are right for the inbound proxy filter. Public-code matching is optional outbound processing. Retake attempts are exam logistics. Accepted suggestion telemetry belongs to feedback and metrics, not inbound proxy filtering.</p>"
      },
      {
        "n": 5,
        "prompt": "Which filtering behavior occurs on both input and output legs of the lifecycle?",
        "choices": [
          "Content exclusions are configured twice",
          "Exam scoring is scaled twice",
          "Toxicity filtering runs before and after generation",
          "Prompt files are expanded after delivery"
        ],
        "answer": 2,
        "tag": "Toxicity",
        "explanation": "<p>Toxicity filtering before and after generation is right because the filter runs on both legs. Content exclusions are a separate feature. Exam scoring is unrelated. Prompt files are a customization feature, not the named lifecycle filter.</p>"
      },
      {
        "n": 6,
        "prompt": "In outbound step 5, what happens if part of a response fails the checks?",
        "choices": [
          "It is truncated or discarded",
          "It becomes a Copilot Space",
          "It is always delivered with a warning",
          "It is stored forever for training"
        ],
        "answer": 0,
        "tag": "Outbound validation",
        "explanation": "<p>Truncated or discarded is right because failed output checks are not delivered as-is. A warning is not the stated result. A response does not become a Copilot Space. The facts brief does not support permanent training storage for failed responses.</p>"
      },
      {
        "n": 7,
        "prompt": "Which named technique in step 1 considers both preceding and following code around the cursor?",
        "choices": [
          "Exam Replay",
          "LoRA",
          "Code referencing",
          "Fill-in-the-Middle"
        ],
        "answer": 3,
        "tag": "FIM",
        "explanation": "<p>Fill-in-the-Middle is right because FIM uses code before and after the cursor during prompt construction. LoRA is a model adaptation method. Code referencing is related to public-code matches. Exam Replay is a retake discount offer, not prompt preprocessing.</p>"
      },
      {
        "n": 8,
        "prompt": "Which checks are part of outbound post-processing and response validation?",
        "choices": [
          "Only renewal eligibility",
          "Toxicity filtering plus code quality checks such as XSS and SQL injection",
          "Only organization instruction precedence",
          "Only local prompt audit logging"
        ],
        "answer": 1,
        "tag": "Step 5 checks",
        "explanation": "<p>Toxicity filtering plus code quality checks such as XSS and SQL injection is right for outbound validation. Renewal eligibility is exam logistics. Instruction precedence is customization behavior. Audit logs do not capture local prompts and are not the step 5 validation checks.</p>"
      }
    ]
  },
  {
    "id": "d3-retention",
    "topic": "Data Handling and Flow",
    "title": "Retention and Training Data",
    "blurb": "Locks in the editor-discard rule, the 28-day qualifier, and plan-based training defaults.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "In the code editor, what happens to prompts after a Copilot suggestion is returned?",
        "choices": [
          "They are discarded",
          "They are retained for the exam time limit",
          "They are always stored for 180 days",
          "They are published to public repositories"
        ],
        "answer": 0,
        "tag": "Editor prompts",
        "explanation": "<p>Discarded is right because editor prompts are not retained after a suggestion is returned. The exam time limit is unrelated. Audit-log retention does not mean editor prompts are stored. Prompts are not published to public repositories.</p>"
      },
      {
        "n": 2,
        "prompt": "Copilot Chat is used outside the code editor on GitHub.com. What retention duration is typically cited for prompts, suggestions, and supporting context?",
        "choices": [
          "Seven days",
          "Until the repository is deleted",
          "28 days",
          "Only during the browser session"
        ],
        "answer": 2,
        "tag": "28 days",
        "explanation": "<p>28 days is right for chat outside the editor, including CLI, Mobile, and Chat on GitHub.com. Seven days is not the confirmed figure. Repository deletion is not the rule. Browser-session-only retention is too short and unsupported.</p>"
      },
      {
        "n": 3,
        "prompt": "For which plans is data excluded from training by default?",
        "choices": [
          "Copilot Free and Copilot Pro",
          "Copilot Business and Copilot Enterprise",
          "Copilot Free only",
          "All individual plans only"
        ],
        "answer": 1,
        "tag": "Training default",
        "explanation": "<p>Copilot Business and Copilot Enterprise are right because their data is excluded from training by default. Free and Pro are not excluded by default. Free only is wrong. The default exclusion does not apply to all individual plans.</p>"
      },
      {
        "n": 4,
        "prompt": "A Copilot Pro subscriber wants to opt out of sharing prompts used to fine-tune the model. What should they know?",
        "choices": [
          "Opt-out requires GitHub Enterprise Server",
          "Only enterprise owners can opt out individual subscribers",
          "Opt-out is impossible for Pro",
          "Individual subscribers can opt out"
        ],
        "answer": 3,
        "tag": "Individual opt-out",
        "explanation": "<p>Individual subscribers can opt out is right. The facts brief confirms individual opt-out for prompts used to fine-tune the model. Enterprise owners are not the only path for individual subscribers. Pro opt-out is not impossible. GitHub Enterprise Server does not support Copilot.</p>"
      },
      {
        "n": 5,
        "prompt": "A question says Copilot Chat inside the editor always follows the same 28-day retention rule as Chat on GitHub.com. What is wrong with that?",
        "choices": [
          "The 28-day figure applies only to the GitHub Copilot CLI",
          "Chat on GitHub.com has no retention",
          "Retention within the editor may vary",
          "The figure is an official exam question count"
        ],
        "answer": 2,
        "tag": "Qualifier",
        "explanation": "<p>Retention within the editor may vary is right, while the 28-day figure is for chat outside the editor. The CLI is only one of the surfaces that figure covers, alongside Copilot Chat on GitHub.com and Copilot on mobile, so narrowing it to the CLI is wrong. Chat on GitHub.com is included in the outside-editor retention statement. It is not an exam question count.</p>"
      },
      {
        "n": 6,
        "prompt": "A Free-plan user assumes their data is excluded from training by default because they are not in an organization. What is correct?",
        "choices": [
          "Free is not excluded from training by default",
          "Free and Pro+ are the only excluded plans",
          "Free data is excluded by default",
          "Training defaults depend on the IDE theme"
        ],
        "answer": 0,
        "tag": "Free plan",
        "explanation": "<p>Free is not excluded from training by default is right. The default exclusion applies to Business and Enterprise. Pro+ is not listed as default-excluded in the facts brief. IDE theme has no bearing on training defaults.</p>"
      },
      {
        "n": 7,
        "prompt": "Which data category is explicitly named in inbound toxicity filtering?",
        "choices": [
          "Only exam renewal windows",
          "Only accepted unmodified code",
          "Only GitHub AI Credits usage",
          "Personal data such as names, addresses, or identification numbers"
        ],
        "answer": 3,
        "tag": "Personal data",
        "explanation": "<p>Personal data such as names, addresses, or identification numbers is right because it is named in toxicity filtering. Accepted unmodified code is part of public-code matching behavior. GitHub AI Credits usage and renewal windows are unrelated to toxicity filtering.</p>"
      },
      {
        "n": 8,
        "prompt": "A developer changes the selected model and asks whether that changes Copilot data collection and usage policy. What is correct?",
        "choices": [
          "Changing models deletes all retained chat data",
          "There are no changes to data collection and usage policy if the AI model changes",
          "Changing models disables filters",
          "Changing models turns Free into Business"
        ],
        "answer": 1,
        "tag": "Model policy",
        "explanation": "<p>No changes to data collection and usage policy is right when the AI model changes. Model changes do not delete all retained chat data, disable filters, or alter the user's plan. Filters apply regardless of model selection.</p>"
      }
    ]
  },
  {
    "id": "d4-fundamentals",
    "topic": "Crafting Effective Prompts",
    "title": "Prompt Fundamentals and the 4 Ss",
    "blurb": "Turns the Single, Specific, Short, Surround framework into scenario choices.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A developer asks Copilot to refactor a function, write tests, explain OAuth, and design a database in one prompt. Which 4 Ss rule is most violated?",
        "choices": [
          "Single",
          "Specific",
          "Short",
          "Surround"
        ],
        "answer": 0,
        "tag": "Single",
        "explanation": "<p>Single is right because the prompt contains several unrelated tasks instead of one well-defined task. Specific would require explicit details. Short would focus on concision. Surround would use filenames and related open files for context.</p>"
      },
      {
        "n": 2,
        "prompt": "A prompt says, 'Make this better.' Which 4 Ss rule would most improve it by adding explicit requirements and details?",
        "choices": [
          "Single",
          "Surround",
          "Specific",
          "Short"
        ],
        "answer": 2,
        "tag": "Specific",
        "explanation": "<p>Specific is right because the weak prompt lacks explicit instructions and details. Single is about one task, which the prompt may already imply. Short is about being concise, not vague. Surround is about context from files and filenames.</p>"
      },
      {
        "n": 3,
        "prompt": "A prompt includes several pages of irrelevant background before asking for a tiny regex change. Which 4 Ss rule is most directly at risk?",
        "choices": [
          "Surround",
          "Short",
          "Single",
          "Specific"
        ],
        "answer": 1,
        "tag": "Short",
        "explanation": "<p>Short is right because the prompt is not concise or to the point. Single addresses whether there is one task. Specific addresses explicit instructions. Surround addresses useful nearby context such as descriptive filenames and related files.</p>"
      },
      {
        "n": 4,
        "prompt": "A developer wants Copilot to infer project conventions. Which 4 Ss practice helps most?",
        "choices": [
          "Ask for every possible solution",
          "Avoid surrounding code",
          "Remove all file paths from the project",
          "Use descriptive filenames and keep related files open"
        ],
        "answer": 3,
        "tag": "Surround",
        "explanation": "<p>Using descriptive filenames and keeping related files open is right because Surround is about helpful context around the prompt. Asking for every possible solution violates focus and brevity. Removing paths and avoiding surrounding code reduce useful context.</p>"
      },
      {
        "n": 5,
        "prompt": "A developer gives Copilot no examples and asks it to create a basic unit test from the current function. What prompting style is this?",
        "choices": [
          "Few-shot prompting",
          "LoRA",
          "Zero-shot prompting",
          "Code referencing"
        ],
        "answer": 2,
        "tag": "Zero-shot",
        "explanation": "<p>Zero-shot prompting is right because no examples are provided. Few-shot prompting supplies multiple examples. LoRA is a model adaptation technique. Code referencing relates to matching public code, not example count.</p>"
      },
      {
        "n": 6,
        "prompt": "A developer provides one example of the desired output format before asking Copilot to transform a new input. What is this called?",
        "choices": [
          "One-shot prompting",
          "Chain prompting",
          "Role prompting",
          "Fill-in-the-Middle"
        ],
        "answer": 0,
        "tag": "One-shot",
        "explanation": "<p>One-shot prompting is right because exactly one example is given. Role prompting assigns a persona or expertise. Chain prompting breaks work into steps. Fill-in-the-Middle considers code before and after the cursor.</p>"
      },
      {
        "n": 7,
        "prompt": "A developer includes three examples of API error handling and asks Copilot to follow the pattern. What prompting style is being used?",
        "choices": [
          "Suggestions matching public code",
          "Zero-shot prompting",
          "Auto model selection",
          "Few-shot prompting"
        ],
        "answer": 3,
        "tag": "Few-shot",
        "explanation": "<p>Few-shot prompting is right because multiple examples are supplied. Zero-shot uses no examples. Auto model selection chooses a model and is not an example strategy. Suggestions matching public code is a safeguard, not a prompting style.</p>"
      },
      {
        "n": 8,
        "prompt": "A developer writes, 'Act as a security expert and review this authentication middleware.' Which prompt technique is being used?",
        "choices": [
          "Public-code matching",
          "Role prompting",
          "Content exclusion",
          "Exam Replay"
        ],
        "answer": 1,
        "tag": "Role prompting",
        "explanation": "<p>Role prompting is right because the prompt assigns security-expert behavior. Public-code matching checks suggestions against public repositories. Content exclusion limits what Copilot can use from configured files. Exam Replay is a retake discount offer.</p>"
      }
    ]
  },
  {
    "id": "d4-context",
    "topic": "Prompt Engineering for Performance",
    "title": "Context Crafting and Custom Instructions",
    "blurb": "Emphasizes instruction precedence and the policy-versus-instruction trap.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "Personal, repository, and organization custom instructions all apply to a Copilot Chat response on GitHub.com. Which has highest precedence?",
        "choices": [
          "Personal instructions",
          "Organization instructions",
          "AGENTS.md",
          "Repository-wide instructions"
        ],
        "answer": 0,
        "tag": "Personal precedence",
        "explanation": "<p>Personal instructions are right because they have highest precedence for custom instructions. Repository instructions come below personal instructions. Organization instructions rank lowest for instructions. AGENTS.md is a repository instruction type, not the top level.</p>"
      },
      {
        "n": 2,
        "prompt": "Within repository custom instructions, which type has the highest precedence?",
        "choices": [
          "AGENTS.md",
          "Repository-wide .github/copilot-instructions.md",
          "Path-specific .github/instructions/NAME.instructions.md",
          "Organization instructions"
        ],
        "answer": 2,
        "tag": "Path-specific",
        "explanation": "<p>Path-specific instructions are right because they outrank repository-wide instructions and AGENTS.md within repository instructions. Repository-wide instructions are broader. AGENTS.md is lower in that repository ordering. Organization instructions are a separate lowest-precedence category for instructions.</p>"
      },
      {
        "n": 3,
        "prompt": "A candidate assumes organization instructions override personal instructions because organization policies often win. What correction is needed?",
        "choices": [
          "Organization instructions always rank highest",
          "Organization ranks lowest for instructions, while policies follow their own control rules",
          "Policies and instructions are identical",
          "Personal instructions are never supported anywhere"
        ],
        "answer": 1,
        "tag": "Policy trap",
        "explanation": "<p>The instruction-versus-policy distinction is right because organization instructions rank lowest, while organization or enterprise policies can still control feature availability. Organization instructions do not always rank highest. Policies and instructions are different mechanisms. Personal instructions are supported for Copilot Chat on GitHub.com.</p>"
      },
      {
        "n": 4,
        "prompt": "Where do reusable prompt files live in a repository?",
        "choices": [
          ".github/hooks/*.json",
          ".github/models/*.prompt",
          ".github/spark/*.md",
          ".github/prompts/*.prompt.md"
        ],
        "answer": 3,
        "tag": "Prompt files",
        "explanation": "<p>.github/prompts/*.prompt.md is right for prompt files. .github/hooks/*.json is for hooks. Copilot Spark and GitHub Models are retired live-service contexts and not prompt-file locations. The models path is not the specified prompt-file convention.</p>"
      },
      {
        "n": 5,
        "prompt": "A team expects Copilot to follow custom instructions identically every time. What should they know?",
        "choices": [
          "Only organization instructions are nondeterministic",
          "Instructions are deterministic build scripts",
          "Copilot may not follow custom instructions identically every time",
          "Instructions disable model behavior"
        ],
        "answer": 2,
        "tag": "Nondeterminism",
        "explanation": "<p>Copilot may not follow custom instructions identically every time is right because AI output is nondeterministic. Instructions are not build scripts. Nondeterminism is not limited to organization instructions. Instructions guide behavior but do not disable model behavior.</p>"
      },
      {
        "n": 6,
        "prompt": "Which statement about all relevant instruction sets is correct?",
        "choices": [
          "All relevant instruction sets are provided to Copilot",
          "Only the highest-precedence instruction is provided to Copilot",
          "Organization instructions erase repository instructions",
          "AGENTS.md disables personal instructions"
        ],
        "answer": 0,
        "tag": "Relevant instructions",
        "explanation": "<p>All relevant instruction sets are provided to Copilot is right, even though precedence decides conflicts. The highest-precedence instruction is not the only one provided. Organization instructions do not erase repository instructions. AGENTS.md does not disable personal instructions.</p>"
      },
      {
        "n": 7,
        "prompt": "A repository contains AGENTS.md and .github/copilot-instructions.md. Which has higher repository-level precedence?",
        "choices": [
          "Audit-log query action:copilot",
          "AGENTS.md",
          "Organization instructions",
          "Repository-wide .github/copilot-instructions.md"
        ],
        "answer": 3,
        "tag": "Repo-wide",
        "explanation": "<p>Repository-wide .github/copilot-instructions.md is right because it outranks AGENTS.md within repository instructions. AGENTS.md is lower in the repository order. Organization instructions are outside the repository ordering and lower overall. Audit-log queries are unrelated to instruction precedence.</p>"
      },
      {
        "n": 8,
        "prompt": "Organization instructions currently apply to which GitHub.com scenarios from the facts brief?",
        "choices": [
          "Only local inline suggestions",
          "Copilot Chat, Copilot code review, and Copilot cloud agent on GitHub.com",
          "Only NeoVim completions",
          "Only retired Copilot Extensions"
        ],
        "answer": 1,
        "tag": "Org support",
        "explanation": "<p>Copilot Chat, Copilot code review, and Copilot cloud agent on GitHub.com is right. Organization instructions are not only local inline suggestions or NeoVim completions. Retired Copilot Extensions are not the support scenario for current organization instructions.</p>"
      }
    ]
  },
  {
    "id": "d5-workflow",
    "topic": "Productivity and Code Quality",
    "title": "Copilot Across the SDLC",
    "blurb": "Shows how Copilot supports generation, refactoring, documentation, learning, modernization, and test creation.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A developer asks Copilot to create boilerplate for a new API handler from nearby project patterns. Which productivity use case is this?",
        "choices": [
          "Code generation",
          "Audit-log streaming",
          "Exam renewal",
          "IP indemnity"
        ],
        "answer": 0,
        "tag": "Generation",
        "explanation": "<p>Code generation is right because Copilot is helping create implementation code from context. Audit-log streaming is administrator monitoring. Exam renewal is certification logistics. IP indemnity is a contractual protection for qualifying plans and settings.</p>"
      },
      {
        "n": 2,
        "prompt": "A team asks Copilot to simplify duplicated logic without changing behavior. Which SDLC activity is most directly represented?",
        "choices": [
          "Subscription management",
          "Content exclusion",
          "Refactoring",
          "Public-code indexing"
        ],
        "answer": 2,
        "tag": "Refactoring",
        "explanation": "<p>Refactoring is right because the goal is improving structure while preserving behavior. Subscription management concerns seats and plans. Content exclusion controls what files Copilot can use. Public-code indexing relates to matching public code, not cleanup of duplicate logic.</p>"
      },
      {
        "n": 3,
        "prompt": "A developer asks Copilot to explain an unfamiliar framework pattern in the current repository. Which benefit from the facts brief is most relevant?",
        "choices": [
          "Guaranteeing the code is correct",
          "Accelerating learning and reducing context switching",
          "Publishing the prompt to the audit log",
          "Bypassing organization policies"
        ],
        "answer": 1,
        "tag": "Learning",
        "explanation": "<p>Accelerating learning and reducing context switching is right because Copilot can explain unfamiliar code and keep the developer in flow. It does not guarantee correctness. Audit logs do not include local prompt text. Copilot does not bypass organization policies.</p>"
      },
      {
        "n": 4,
        "prompt": "A team uses Copilot to write README updates for a changed API. Which productivity use case is this?",
        "choices": [
          "Retake scheduling",
          "Suggestions matching public code",
          "MCP policy inheritance",
          "Documentation generation"
        ],
        "answer": 3,
        "tag": "Documentation",
        "explanation": "<p>Documentation generation is right because Copilot can help write or update docs. Retake scheduling is exam logistics. MCP policy inheritance is administrator configuration. Suggestions matching public code is a safeguard.</p>"
      },
      {
        "n": 5,
        "prompt": "A legacy service needs help converting old patterns to modern equivalents with human review. Which Copilot use case fits?",
        "choices": [
          "Exam scoring",
          "Audit-log retention",
          "Modernizing legacy code",
          "Code referencing only"
        ],
        "answer": 2,
        "tag": "Modernization",
        "explanation": "<p>Modernizing legacy code is right because Copilot can assist with updating older code patterns. Exam scoring is unrelated. Audit-log retention is a logging period. Code referencing is an attribution feature and not the modernization workflow itself.</p>"
      },
      {
        "n": 6,
        "prompt": "A developer asks Copilot to create realistic but non-sensitive records for local tests. Which productivity use case is this?",
        "choices": [
          "Generating sample data",
          "Enabling Copilot Extensions",
          "Changing retake policy",
          "Disabling HTTPS"
        ],
        "answer": 0,
        "tag": "Sample data",
        "explanation": "<p>Generating sample data is right because Copilot can create test data, and responsible review should avoid personal identifiers. Copilot Extensions were retired and replaced by MCP servers. Retake policy and HTTPS transport are unrelated.</p>"
      },
      {
        "n": 7,
        "prompt": "Copilot suggests a performance improvement for a slow loop. What should the developer do before accepting it?",
        "choices": [
          "Assume performance suggestions are always correct",
          "Apply it only if it uses a current model name",
          "Block all organization instructions",
          "Benchmark or test the change and review behavior"
        ],
        "answer": 3,
        "tag": "Optimization review",
        "explanation": "<p>Benchmarking or testing and reviewing behavior is right because performance suggestions still need validation. Performance output is not always correct. Specific model names are not a durable validation criterion. Blocking instructions is unrelated to proving the optimization works.</p>"
      },
      {
        "n": 8,
        "prompt": "A developer asks Copilot to identify edge cases and write assertions for a function. Which domain-5 objective is this closest to?",
        "choices": [
          "Manage subscriptions using the REST API",
          "Support testing and security",
          "Enable code review policies",
          "Configure content exclusions"
        ],
        "answer": 1,
        "tag": "Testing",
        "explanation": "<p>Support testing and security is right because the objective includes generating tests, identifying edge cases, and writing assertions. Subscription management, content exclusions, and code review policies are different objectives outside this test-writing scenario.</p>"
      }
    ]
  },
  {
    "id": "d5-metrics",
    "topic": "Testing and Security",
    "title": "Metrics and Measuring Impact",
    "blurb": "Focuses on the three named usage metrics and the four-stage impact-measurement cycle.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A manager wants a named metric for how many developers use Copilot each day. Which metric fits?",
        "choices": [
          "Average Daily Active Users",
          "Total Acceptance Rate",
          "Lines of Code Accepted",
          "Scaled passing score"
        ],
        "answer": 0,
        "tag": "ADAU",
        "explanation": "<p>Average Daily Active Users is right because it measures daily active Copilot usage. Total Acceptance Rate measures accepted suggestions compared with shown suggestions. Lines of Code Accepted measures accepted generated code volume. Scaled passing score is an exam scoring concept.</p>"
      },
      {
        "n": 2,
        "prompt": "A team wants to track the share of suggestions developers accept. Which named metric should they use?",
        "choices": [
          "Lines of Code Accepted",
          "Average Daily Active Users",
          "Total Acceptance Rate",
          "Audit-log retention"
        ],
        "answer": 2,
        "tag": "Acceptance",
        "explanation": "<p>Total Acceptance Rate is right because it tracks accepted suggestions as a rate. Lines of Code Accepted measures code volume. Average Daily Active Users measures active users. Audit-log retention is 180 days and is not a suggestion-acceptance metric.</p>"
      },
      {
        "n": 3,
        "prompt": "A leader asks how much generated code developers actually kept. Which metric is named in the facts brief?",
        "choices": [
          "Prompt count in audit logs",
          "Lines of Code Accepted",
          "Official exam question count",
          "Number of MCP servers"
        ],
        "answer": 1,
        "tag": "Accepted LOC",
        "explanation": "<p>Lines of Code Accepted is right because it measures accepted generated code volume. Audit logs do not capture local prompt counts. The real exam question count is not published. Number of MCP servers is an extensibility inventory, not a usage-impact metric.</p>"
      },
      {
        "n": 4,
        "prompt": "Which sequence matches the four stages for measuring Copilot impact?",
        "choices": [
          "Adoption, evaluation, sustained efficiency, optimization",
          "Training, pricing, prompting, scoring",
          "Optimization, renewal, adoption, retirement",
          "Evaluation, adoption, optimization, sustained efficiency"
        ],
        "answer": 3,
        "tag": "Four stages",
        "explanation": "<p>Evaluation, adoption, optimization, sustained efficiency is right. The other sequences reorder or replace the named stages with unrelated concepts such as renewal, retirement, pricing, prompting, and scoring.</p>"
      },
      {
        "n": 5,
        "prompt": "Which source can provide Copilot usage metrics through an API?",
        "choices": [
          "Pearson VUE registration",
          "A retired knowledge base",
          "REST API for Copilot usage metrics",
          "The exam score report only"
        ],
        "answer": 2,
        "tag": "Metrics API",
        "explanation": "<p>The REST API for Copilot usage metrics is right because it is a named source. Pearson VUE registration is for exam delivery. Knowledge bases were retired and replaced by Copilot Spaces. An exam score report is not a Copilot usage telemetry source.</p>"
      },
      {
        "n": 6,
        "prompt": "A team wants qualitative feedback in addition to metrics. Which survey source is named?",
        "choices": [
          "GitHub Copilot Developer Survey",
          "Copilot Spark export survey",
          "GitHub Enterprise Server prompt log",
          "Exam Replay questionnaire"
        ],
        "answer": 0,
        "tag": "Survey",
        "explanation": "<p>GitHub Copilot Developer Survey is right because it is named as a source for measuring impact. Copilot Spark export is tied to a retired product. GitHub Enterprise Server does not support Copilot. Exam Replay is a discount offer, not the named developer survey.</p>"
      },
      {
        "n": 7,
        "prompt": "How often can the long-form GitHub Copilot Developer Survey be sent according to the facts brief?",
        "choices": [
          "Every day",
          "Every two weeks",
          "Only during certification renewal",
          "No more than once every four weeks"
        ],
        "answer": 3,
        "tag": "Survey cadence",
        "explanation": "<p>No more than once every four weeks is right for the long-form survey. Every two weeks applies to the short form. Every day is too frequent. Certification renewal is unrelated to the survey cadence.</p>"
      },
      {
        "n": 8,
        "prompt": "A dashboard shows many accepted lines but low test coverage after AI-assisted changes. What should the team conclude?",
        "choices": [
          "Accepted lines alone prove sustained efficiency",
          "They should combine usage metrics with quality and testing review",
          "Metrics replace code review",
          "The score means 700 equals 70 percent"
        ],
        "answer": 1,
        "tag": "Metric limits",
        "explanation": "<p>Combining usage metrics with quality and testing review is right because productivity metrics do not by themselves prove safe or high-quality outcomes. Accepted lines alone are insufficient. Metrics do not replace code review. A scaled score of 700 is not 70 percent.</p>"
      }
    ]
  },
  {
    "id": "d6-exclusions",
    "topic": "Privacy Settings and Exclusions",
    "title": "Content Exclusions and Public Code Matching",
    "blurb": "Highlights what exclusions and public-code matching do, and just as importantly what they do not do.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "Which plans can configure content exclusions?",
        "choices": [
          "Copilot Business and Copilot Enterprise",
          "Copilot Free and Copilot Pro only",
          "All individual plans including Pro+ and Max",
          "Only GitHub Enterprise Server"
        ],
        "answer": 0,
        "tag": "Plan availability",
        "explanation": "<p>Copilot Business and Copilot Enterprise are right because content exclusion is available only for those plans. Free, Pro, Pro+, and Max are not included for this feature. GitHub Enterprise Server does not support Copilot.</p>"
      },
      {
        "n": 2,
        "prompt": "A file is covered by content exclusion. What happens to inline suggestions in that affected file?",
        "choices": [
          "They become mandatory",
          "They continue using the excluded file as context",
          "Inline suggestions will not be available in the affected file",
          "They are stored for 180 days"
        ],
        "answer": 2,
        "tag": "Inline effect",
        "explanation": "<p>Inline suggestions not being available in the affected file is right. Excluded content should not inform inline suggestions in other files either. Suggestions are not mandatory. Audit-log retention is separate and does not describe inline behavior.</p>"
      },
      {
        "n": 3,
        "prompt": "A developer assumes content exclusion prevents every indirect signal from an excluded file. What limitation should they know?",
        "choices": [
          "Content exclusion turns off HTTPS",
          "Copilot may still use semantic information provided indirectly by the IDE",
          "Excluded files are always reviewed in Copilot code review",
          "Exclusion only affects exam questions"
        ],
        "answer": 1,
        "tag": "Semantic leakage",
        "explanation": "<p>Indirect IDE semantic information is right because type information, hover definitions, or build configuration can still convey facts from excluded files. Content exclusion does not turn off HTTPS. Affected files are not reviewed in Copilot code review. Exclusion is a product setting, not an exam-only concept.</p>"
      },
      {
        "n": 4,
        "prompt": "A team uses Edit mode in an editor and expects content exclusions to apply. What is the current limitation?",
        "choices": [
          "Content exclusions apply only in Edit mode",
          "Content exclusions work only on symlinks",
          "Content exclusions require Copilot Spark",
          "Content exclusion is currently not supported in Edit and Agent modes of Copilot Chat in editors"
        ],
        "answer": 3,
        "tag": "Edit and Agent",
        "explanation": "<p>Not supported in Edit and Agent modes of Copilot Chat in editors is right. Exclusions are not limited to Edit mode. Copilot Spark is retired and unrelated. Symlinks are a limitation because exclusions do not apply to them, not the only supported path.</p>"
      },
      {
        "n": 5,
        "prompt": "What server-side data is sent to retrieve a content-exclusion policy?",
        "choices": [
          "Every prompt in the repository",
          "All private file contents",
          "Only the repository URL",
          "The user's exam score"
        ],
        "answer": 2,
        "tag": "Policy lookup",
        "explanation": "<p>Only the repository URL is right, and the facts brief says those URLs are not logged anywhere. Every prompt and all private file contents are not sent for policy lookup. Exam scores are unrelated to content exclusions.</p>"
      },
      {
        "n": 6,
        "prompt": "A developer accepts a Copilot suggestion but edits it before saving. Is that altered suggestion checked for matches to public code?",
        "choices": [
          "No, only accepted unmodified suggestions are checked",
          "Yes, but only in Xcode",
          "Yes, all code written by the user is checked",
          "No, because public code is never indexed"
        ],
        "answer": 0,
        "tag": "Modified suggestions",
        "explanation": "<p>Only accepted unmodified suggestions being checked is right. Code the developer wrote and suggestions the developer altered are not checked for matches. Xcode is not the exception. Public repositories on GitHub.com are indexed for this feature.</p>"
      },
      {
        "n": 7,
        "prompt": "Which setting value blocks suggestions when they match public code under the matching feature?",
        "choices": [
          "Quarantine",
          "Allow",
          "Review",
          "Block"
        ],
        "answer": 3,
        "tag": "Block",
        "explanation": "<p>Block is right because Suggestions matching public code uses Allow and Block values, and Block prevents matching suggestions from being shown. Allow does not block them. Review and Quarantine are not the named values for this setting.</p>"
      },
      {
        "n": 8,
        "prompt": "A user with a Copilot seat assigned by an organization tries to change Suggestions matching public code personally. What happens?",
        "choices": [
          "The personal toggle always overrides the organization",
          "The setting is inherited from the organization or enterprise and the personal toggle is locked",
          "The setting changes only for Copilot Spark",
          "The setting applies only to private code outside GitHub"
        ],
        "answer": 1,
        "tag": "Inheritance",
        "explanation": "<p>Inheritance from the organization or enterprise with a locked personal toggle is right for organization-assigned seats. The personal toggle does not override. Copilot Spark is retired and unrelated. The search process covers public repositories on GitHub.com, not only private code outside GitHub.</p>"
      }
    ]
  },
  {
    "id": "d6-policies",
    "topic": "Safeguards and Troubleshooting",
    "title": "Plans, Policies, and Indemnity",
    "blurb": "Drills the reversible policy-conflict rules, IP indemnity conditions, and audit-log limits.",
    "timeMinutes": 10,
    "questions": [
      {
        "n": 1,
        "prompt": "A user belongs to multiple organizations within the same enterprise, and their Copilot policies conflict. Which policy usually applies?",
        "choices": [
          "The least restrictive policy",
          "The most restrictive policy",
          "The personal policy",
          "The policy from GitHub Enterprise Server"
        ],
        "answer": 0,
        "tag": "Same enterprise",
        "explanation": "<p>The least restrictive policy is right for multiple organizations within the same enterprise. The most restrictive rule applies across different enterprises. A personal policy cannot override organization assignment in this scenario. GitHub Enterprise Server does not support Copilot.</p>"
      },
      {
        "n": 2,
        "prompt": "A user is assigned by organizations in two different enterprises, and one enterprise disables Copilot Chat in GitHub. What usually happens?",
        "choices": [
          "The least restrictive policy wins",
          "The user chooses at sign-in",
          "The most restrictive policy almost always applies",
          "The setting is ignored outside the IDE"
        ],
        "answer": 2,
        "tag": "Different enterprises",
        "explanation": "<p>The most restrictive policy almost always applies across different enterprises, so the disabled setting controls. Least restrictive applies within one enterprise. The user does not choose the winning enterprise at sign-in. The policy is not ignored outside the IDE.</p>"
      },
      {
        "n": 3,
        "prompt": "What conditions are required for GitHub Copilot IP indemnity according to the facts brief?",
        "choices": [
          "Any Free account plus public-code matching Allow",
          "Copilot Business or Enterprise plus Suggestions matching public code set to Block",
          "Only Copilot Autofix with no settings",
          "A personal plan with no organization"
        ],
        "answer": 1,
        "tag": "IP indemnity",
        "explanation": "<p>Business or Enterprise plus Suggestions matching public code set to Block is right. Free accounts and personal plans are not the indemnity condition. Copilot Autofix has its own subscription fact and does not define IP indemnity. Allow is the wrong public-code matching value for indemnity.</p>"
      },
      {
        "n": 4,
        "prompt": "Which three contractual protections are named in the facts brief?",
        "choices": [
          "Exam Replay, scaled score, and Pearson VUE",
          "Ghost text, FIM, and LoRA",
          "Copilot Spark, GitHub Models, and knowledge bases",
          "IP indemnity, Data Protection Agreement, and GitHub Copilot Trust Center"
        ],
        "answer": 3,
        "tag": "Protections",
        "explanation": "<p>IP indemnity, Data Protection Agreement, and GitHub Copilot Trust Center are right because those are the three named contractual protections. Exam logistics, retired features, and technical concepts such as ghost text, FIM, and LoRA are not that protection set.</p>"
      },
      {
        "n": 5,
        "prompt": "What does the GitHub audit log not include for local Copilot use?",
        "choices": [
          "Changes to Copilot policies",
          "License grants and removals",
          "Client session data such as local prompts",
          "Agent activity on the GitHub website"
        ],
        "answer": 2,
        "tag": "Audit limits",
        "explanation": "<p>Client session data such as local prompts is right because audit logs do not include prompts users send locally. Policy changes, license grants and removals, and agent activity on the GitHub website are logged Copilot-related events.</p>"
      },
      {
        "n": 6,
        "prompt": "How long are Copilot-related audit-log events retained before organizations need streaming for longer history?",
        "choices": [
          "180 days",
          "100 minutes",
          "28 days",
          "Five attempts"
        ],
        "answer": 0,
        "tag": "Audit retention",
        "explanation": "<p>180 days is right for audit-log retention. 28 days is the typical retention for chat outside the editor. 100 minutes is the GH-300 exam time limit. Five attempts is part of the Microsoft retake policy.</p>"
      },
      {
        "n": 7,
        "prompt": "Which audit-log query finds all Copilot events?",
        "choices": [
          "mode:edit",
          "actor:student",
          "topic:privacy",
          "action:copilot"
        ],
        "answer": 3,
        "tag": "Audit query",
        "explanation": "<p>action:copilot is right for querying all Copilot events. actor:student, topic:privacy, and mode:edit are not the named audit-log query for all Copilot events. For agent activity, actor:Copilot is another useful query.</p>"
      },
      {
        "n": 8,
        "prompt": "Who can manage enterprise AI controls besides an enterprise owner?",
        "choices": [
          "Any Copilot Free user",
          "A user with the Manage enterprise AI controls custom role permission",
          "Only a repository reader",
          "Only Pearson VUE"
        ],
        "answer": 1,
        "tag": "Admin role",
        "explanation": "<p>A user with the Manage enterprise AI controls custom role permission is right. Copilot Free users, Pearson VUE, and repository readers do not get enterprise AI-control authority from those roles. Enterprise owners can also manage these controls.</p>"
      }
    ]
  }
];
