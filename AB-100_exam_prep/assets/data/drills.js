window.AB1_DATA = window.AB1_DATA || {};
window.AB1_DATA.drills = [
 {
  "id": "d1-requirements",
  "topic": "Analyze Requirements",
  "domain": "plan",
  "title": "Requirements and Grounding Data",
  "blurb": "Judge where agents fit and whether grounding data is accurate, relevant, timely, clean, and available.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A knowledge base contains the same article saved three times with slightly different titles, plus entries with broken formatting. Which data quality dimension is MOST affected?</p>",
    "choices": [
     "Cleanliness",
     "Timeliness",
     "Availability",
     "Relevance"
    ],
    "answer": 0,
    "explanation": "<p>Cleanliness covers duplicates, formatting errors, and invalid values that confuse retrieval and answers.</p><p>Timeliness concerns how current data is. Availability concerns whether the agent can access it. Relevance concerns whether content matches the agent's purpose.</p>",
    "tag": "Data quality",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 2,
    "prompt": "<p>Which characteristic MOST indicates that a process benefits from an agent rather than a fixed rules-based workflow?</p>",
    "choices": [
     "Every input arrives in the same fixed format with no exceptions",
     "The process runs once a year and takes only a few minutes to complete",
     "Inputs are unstructured and vary, so each case needs interpretation",
     "The steps never change and require no judgment or decisions"
    ],
    "answer": 2,
    "explanation": "<p>Agents add value when they must interpret variable, unstructured inputs such as emails or documents and decide how to proceed.</p><p>Fixed formats and unchanging steps are better served by deterministic automation. A rare, quick process offers little return on any automation.</p>",
    "tag": "Agent fit",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 3,
    "prompt": "<p>Which question BEST assesses whether grounding data is available to an agent?</p>",
    "choices": [
     "Was the data reviewed and approved by a subject matter expert within the last year?",
     "Does the data contain duplicate records or inconsistent formatting?",
     "Does the data relate to the questions users will ask the agent?",
     "Can the agent reach the data at runtime with the right identity and permissions?"
    ],
    "answer": 3,
    "explanation": "<p>Availability is about access: connectivity, authentication, permissions, and supported connectors at the time the agent needs the data.</p><p>Expert review relates to accuracy and timeliness. Duplicates and formatting relate to cleanliness. Topic match relates to relevance.</p>",
    "tag": "Availability",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 4,
    "prompt": "<p>Service reps report that several knowledge articles used by an agent contain outdated troubleshooting steps. What should you recommend to keep grounding data accurate over time?</p>",
    "choices": [
     "Ask the agent to rewrite each article automatically whenever it is retrieved",
     "Assign content owners and a review cycle informed by user feedback",
     "Hide citations so users cannot see which article an answer came from",
     "Add more articles so that the outdated steps represent a smaller share"
    ],
    "answer": 1,
    "explanation": "<p>Ownership and scheduled review, informed by user feedback, keep source content correct, which directly improves agent accuracy.</p><p>Automatic rewriting without review can introduce new errors. Hiding citations reduces transparency. Adding more articles leaves the incorrect ones in place.</p>",
    "tag": "Accuracy",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 5,
    "prompt": "<p>Many policy documents to be used for grounding are scanned PDFs with tables and images. What should happen before they are indexed?</p>",
    "choices": [
     "Index the scanned images as they are because models read all images perfectly",
     "Delete the tables because agents cannot use tabular information",
     "Extract text and structure with OCR and layout analysis",
     "Rename the files with longer names so the index understands them"
    ],
    "answer": 2,
    "explanation": "<p>Scanned documents need text and layout extraction, for example with Azure Document Intelligence, so retrieval can find and cite their content.</p><p>Indexing raw images limits text retrieval. Tables often hold key facts and should be preserved. File names alone do not make document content searchable.</p>",
    "tag": "Preparation",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 6,
    "prompt": "<p>An HR agent serving employees in several countries often returns benefits information for the wrong country. What should you recommend?</p>",
    "choices": [
     "Merge all country documents into one file to simplify the knowledge source",
     "Increase the number of retrieved passages so the right country appears",
     "Remove all country names from the documents to avoid confusion",
     "Tag documents with region metadata and filter retrieval by country"
    ],
    "answer": 3,
    "explanation": "<p>Metadata and filtering keep retrieval relevant to the user's context, preventing answers based on another country's rules.</p><p>Merging files makes relevance worse. More passages increases noise. Removing country names destroys the context needed to answer correctly.</p>",
    "tag": "Relevance",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 7,
    "prompt": "<p>Several teams building agents cannot find which datasets exist, who owns them, or whether they contain sensitive data. What should you recommend so data is available for other AI systems?</p>",
    "choices": [
     "Ask each team to email the central data platform team whenever they need a new dataset",
     "Register data assets in a governed catalog with owners, classifications, and lineage",
     "Copy every dataset into each team's storage account for convenience",
     "Publish all datasets publicly so discovery is not a problem"
    ],
    "answer": 1,
    "explanation": "<p>A data catalog makes data discoverable and trustworthy, showing ownership, sensitivity, and lineage so AI teams can reuse it safely.</p><p>Email requests do not scale or provide governance. Copying data multiplies cost and risk. Public publication exposes sensitive data.</p>",
    "tag": "Reusable data",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   },
   {
    "n": 8,
    "prompt": "<p>How should you set the level of autonomy for an agent that performs actions in business systems?</p>",
    "choices": [
     "Allow autonomy for low-risk actions and require approval for high-impact ones",
     "Give every action full autonomy so the agent delivers maximum efficiency",
     "Require human approval for every single action, including simple read-only lookups",
     "Let the agent decide its own autonomy level at runtime based on confidence"
    ],
    "answer": 0,
    "explanation": "<p>Autonomy should match risk. Reversible, low-impact tasks can run unattended; high-impact or irreversible actions need human approval and logging.</p><p>Full autonomy ignores risk. Approving every lookup wastes effort and erodes the value of the agent. Letting the agent set its own autonomy removes accountable control.</p>",
    "tag": "Decision autonomy",
    "topic": "Analyze Requirements",
    "objective": "1.1"
   }
  ]
 },
 {
  "id": "d1-adoption",
  "topic": "AI Strategy and Agent Design",
  "domain": "plan",
  "title": "Adoption Strategy and the AI CoE",
  "blurb": "Apply the Cloud Adoption Framework AI adoption process, AI Center of Excellence practices, and multi-app Dynamics 365 designs.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A company has defined its AI use cases and technology strategy. It now needs a skills assessment, prioritized backlog, and proof of concept. Which CAF AI adoption phase does it enter?</p>",
    "choices": [
     "AI ready",
     "Govern AI",
     "Secure AI",
     "AI plan"
    ],
    "answer": 3,
    "explanation": "<p>AI plan follows AI strategy and turns direction into an actionable plan with skills, priorities, and proofs of concept.</p><p>AI ready prepares environments. Govern AI sets policies and risk controls. Secure AI protects AI workloads and data.</p>",
    "tag": "CAF phases",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 2,
    "prompt": "<p>A platform team must prepare Azure environments, networking, and landing zones to host AI workloads. Which CAF AI adoption phase covers this?</p>",
    "choices": [
     "AI strategy",
     "AI plan",
     "AI ready",
     "Manage AI"
    ],
    "answer": 2,
    "explanation": "<p>AI ready focuses on preparing reliable, secure infrastructure such as AI landing zones for the planned workloads.</p><p>AI strategy sets direction, AI plan sequences work and skills, and Manage AI runs workloads after deployment.</p>",
    "tag": "CAF phases",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 3,
    "prompt": "<p>Which CAF AI adoption area focuses on protecting AI workloads, models, and data from threats such as prompt injection and data exfiltration?</p>",
    "choices": [
     "AI strategy",
     "Secure AI",
     "AI plan",
     "AI ready"
    ],
    "answer": 1,
    "explanation": "<p>Secure AI addresses AI-specific security risks and controls across models, data, and applications.</p><p>Strategy, plan, and ready address direction, planning, and environment preparation rather than threat protection.</p>",
    "tag": "CAF phases",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 4,
    "prompt": "<p>What is the PRIMARY role of an executive sponsor for an AI Center of Excellence?</p>",
    "choices": [
     "Align AI with business strategy and secure funding and support",
     "Configure agent topics and knowledge sources personally",
     "Approve every individual prompt that employees write",
     "Monitor daily model latency and error dashboards for all production agents"
    ],
    "answer": 0,
    "explanation": "<p>Executive sponsorship provides strategic alignment, funding, and authority so the CoE can drive adoption across the organization.</p><p>Building agents, approving individual prompts, and monitoring latency are operational tasks handled by makers, the CoE team, and operations staff.</p>",
    "tag": "AI CoE",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 5,
    "prompt": "<p>A large enterprise wants consistent AI standards while letting business units move quickly. Which AI CoE operating model fits BEST?</p>",
    "choices": [
     "A fully centralized team that builds every agent for every department",
     "Hub-and-spoke: a central CoE with champions in business units",
     "A fully decentralized model with no shared standards or guardrails",
     "An outsourced model where a vendor owns all AI decisions permanently"
    ],
    "answer": 1,
    "explanation": "<p>Hub-and-spoke combines central standards and reusable assets with distributed delivery capacity and local business knowledge.</p><p>Full centralization creates bottlenecks. Full decentralization causes fragmentation and risk. Permanently outsourcing decisions removes internal ownership and accountability.</p>",
    "tag": "AI CoE",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 6,
    "prompt": "<p>Which measure should an AI CoE use to demonstrate that its program is creating value?</p>",
    "choices": [
     "The number of meetings the CoE holds each quarter",
     "The number of AI policies the CoE has written, regardless of their adoption",
     "Business outcome KPIs, such as time saved, tracked against baselines",
     "The size of the CoE team compared to other departments"
    ],
    "answer": 2,
    "explanation": "<p>CoEs should measure value realization through outcome KPIs compared against baselines, alongside adoption metrics.</p><p>Meetings, policy counts, and team size measure activity or effort rather than business value.</p>",
    "tag": "AI CoE",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 7,
    "prompt": "<p>A company runs Dynamics 365 Sales, Customer Service, and Field Service. Leaders want AI that gives a complete customer view across sales, cases, and work orders. What should you recommend?</p>",
    "choices": [
     "Use the shared Dataverse customer data with Copilot capabilities across the apps",
     "Create a separate customer master in each app and reconcile them monthly",
     "Build three unrelated agents that each answer questions only about their own app data",
     "Export all records into a data warehouse and remove them from Dataverse"
    ],
    "answer": 0,
    "explanation": "<p>These customer engagement apps share Dataverse, so a unified customer record supports cross-app AI and a complete customer view.</p><p>Separate masters create inconsistency. Isolated agents cannot answer cross-app questions. Removing data from Dataverse breaks the apps themselves.</p>",
    "tag": "Multi-app Dynamics 365",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 8,
    "prompt": "<p>When should responsible AI principles be defined in the CAF AI adoption process?</p>",
    "choices": [
     "After the first agent reaches production and receives complaints",
     "Only when regulators formally request documentation of the company's AI practices",
     "During decommissioning, when models are retired",
     "During AI strategy, so principles shape use case selection from the start"
    ],
    "answer": 3,
    "explanation": "<p>The CAF AI strategy phase includes defining a responsible AI strategy so that principles guide which use cases are pursued and how.</p><p>Waiting for complaints, regulators, or decommissioning means risks are addressed too late and at higher cost.</p>",
    "tag": "AI strategy",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   }
  ]
 },
 {
  "id": "d1-multiagent",
  "topic": "AI Strategy and Agent Design",
  "domain": "plan",
  "title": "Multi-Agent and Extend-or-Build",
  "blurb": "Choose between extending Microsoft 365 Copilot and building custom agents, and design multi-agent solutions across platforms.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>Which statement BEST describes a declarative agent for Microsoft 365 Copilot?</p>",
    "choices": [
     "It runs its own orchestrator, hosting any model the developer chooses, outside Microsoft 365 Copilot",
     "It uses Copilot's orchestrator and models, customized with instructions, knowledge, and actions",
     "It is a fine-tuned language model deployed on dedicated infrastructure",
     "It is a scheduled flow that runs without any language model"
    ],
    "answer": 1,
    "explanation": "<p>Declarative agents extend Microsoft 365 Copilot by declaring instructions, knowledge, and actions while relying on Copilot's orchestration and models.</p><p>Own orchestration and model choice describe custom engine agents. A fine-tuned model is not an agent type. A scheduled flow without a model is workflow automation.</p>",
    "tag": "Declarative agents",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 2,
    "prompt": "<p>Which requirement MOST clearly calls for a custom engine agent instead of a declarative agent?</p>",
    "choices": [
     "Users want to ask questions about documents in SharePoint",
     "The agent should appear in Microsoft 365 Copilot for all licensed users",
     "The agent needs a friendly name and a short set of instructions",
     "The solution must use a specific model and custom orchestration logic"
    ],
    "answer": 3,
    "explanation": "<p>Custom engine agents give you control over orchestration and models, which declarative agents do not.</p><p>SharePoint Q&A, availability in Microsoft 365 Copilot, and custom names or instructions are all achievable with a declarative agent.</p>",
    "tag": "Custom engine agents",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 3,
    "prompt": "<p>What is the key difference between Model Context Protocol (MCP) and the Agent2Agent (A2A) protocol in a multi-agent strategy?</p>",
    "choices": [
     "MCP is used only for voice-enabled agents, while A2A is used only for text agents",
     "MCP connects agents to tools and data; A2A connects agents to other agents",
     "MCP trains models, while A2A deploys trained models to production",
     "MCP is a licensing model, while A2A is a pricing model for agents"
    ],
    "answer": 1,
    "explanation": "<p>MCP standardizes how agents discover and call tools and data sources. A2A standardizes how independent agents exchange tasks and messages.</p><p>Neither protocol is limited to voice or text, trains or deploys models, or defines licensing or pricing.</p>",
    "tag": "Protocols",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 4,
    "prompt": "<p>A Copilot Studio agent for IT support must reuse an existing HR agent that is owned and maintained by the HR team. Which design should you choose?</p>",
    "choices": [
     "Connect the HR agent so the IT agent can delegate to it while HR keeps ownership",
     "Copy the HR agent's topics into the IT agent and maintain both copies",
     "Ask users to log out of the IT agent and open the HR agent manually",
     "Merge both teams' work into one combined agent with a single owner and shared backlog"
    ],
    "answer": 0,
    "explanation": "<p>Connecting an existing agent enables reuse and delegation while preserving separate ownership, testing, and release cycles.</p><p>Copying topics creates duplicate maintenance. Manual switching harms the user experience. Merging teams and agents is unnecessary and reduces separation of concerns.</p>",
    "tag": "Connected agents",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 5,
    "prompt": "<p>A finance analyst wants to upload raw spreadsheet data and get trend analysis and charts through reasoning over the data. Which prebuilt Microsoft 365 Copilot agent is MOST suitable?</p>",
    "choices": [
     "Researcher",
     "Facilitator",
     "Analyst",
     "Sales Qualification Agent"
    ],
    "answer": 2,
    "explanation": "<p>Analyst is designed to reason over raw data, running analysis to produce insights and visualizations.</p><p>Researcher focuses on multi-source research reports. Facilitator supports meetings and collaboration. The Sales Qualification Agent qualifies leads in Dynamics 365 Sales.</p>",
    "tag": "Prebuilt agents",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 6,
    "prompt": "<p>A contact center wants AI to discover the reasons customers contact support from historical conversations and suggest intents to automate. Which prebuilt agent should you evaluate?</p>",
    "choices": [
     "The Supplier Communications Agent in Supply Chain Management",
     "The Researcher agent in Microsoft 365 Copilot",
     "The Sales Qualification Agent in Dynamics 365 Sales",
     "The Customer Intent Agent in Dynamics 365 Customer Service"
    ],
    "answer": 3,
    "explanation": "<p>The Customer Intent Agent analyzes historical interactions to discover customer intents and support self-service and routing.</p><p>The Supplier Communications Agent handles vendor follow-up, Researcher produces research reports, and the Sales Qualification Agent qualifies leads.</p>",
    "tag": "Prebuilt agents",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 7,
    "prompt": "<p>A professional development team needs full control of models, evaluations, and code-first orchestration, while business makers need low-code agents integrated with Microsoft 365. What should you recommend?</p>",
    "choices": [
     "Foundry for the pro-code agents and Copilot Studio for low-code agents, connected",
     "Copilot Studio for both teams, with the pro-code team forbidden from writing any code",
     "Microsoft Foundry for both teams, with business makers writing code",
     "A prompt library for both teams instead of building any agents"
    ],
    "answer": 0,
    "explanation": "<p>Foundry suits code-first development with deep model control, while Copilot Studio suits low-code makers. The two can be combined in a multi-agent design.</p><p>Forcing one platform on both audiences ignores their skills and needs. A prompt library is not a substitute for agents with tools and orchestration.</p>",
    "tag": "Platform choice",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 8,
    "prompt": "<p>Why might you split a large, single agent into several specialized agents?</p>",
    "choices": [
     "To ensure that every agent uses exactly the same instructions, tools, and knowledge",
     "To avoid any need for orchestration between the agents",
     "To give each agent focused instructions and tools with an independent lifecycle",
     "To guarantee lower consumption costs regardless of design"
    ],
    "answer": 2,
    "explanation": "<p>Specialized agents reduce instruction complexity, improve tool selection accuracy, and allow independent lifecycle management.</p><p>Identical instructions defeat specialization. Multiple agents require orchestration. Costs depend on usage and design and are not guaranteed to fall.</p>",
    "tag": "Multi-agent design",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   }
  ]
 },
 {
  "id": "d1-knowledge",
  "topic": "AI Strategy and Agent Design",
  "domain": "plan",
  "title": "Knowledge, Rules, and Custom Models",
  "blurb": "Choose knowledge sources and rules for Copilot Studio and Foundry agents and decide when a custom model is justified.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A Copilot Studio agent must answer questions about open orders stored in Dataverse tables. Which knowledge approach fits BEST?</p>",
    "choices": [
     "Add the Dataverse tables as a knowledge source",
     "Export the tables to PDF files and upload them as documents",
     "Paste sample order records into the agent instructions",
     "Add a public website that describes the company's order process"
    ],
    "answer": 0,
    "explanation": "<p>Copilot Studio supports Dataverse as a knowledge source, letting the agent answer from current structured records.</p><p>PDF exports are stale and lose structure. Instructions are not a data store. A public website does not contain specific order records.</p>",
    "tag": "Knowledge sources",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 2,
    "prompt": "<p>A company wants Microsoft 365 Copilot and agents to answer questions using incident tickets stored in a third-party ITSM system. What should you recommend?</p>",
    "choices": [
     "Ask users to copy ticket text into every chat they start",
     "Enable web search so Copilot finds the tickets on the internet",
     "Train a custom language model on a ticket export each quarter",
     "Index the tickets with a Copilot connector"
    ],
    "answer": 3,
    "explanation": "<p>Copilot connectors bring external content into Microsoft 365 with permissions so Copilot and agents can ground on it.</p><p>Copy-paste does not scale. Internal tickets are not on the public web. Quarterly training produces stale knowledge and high cost.</p>",
    "tag": "Knowledge sources",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 3,
    "prompt": "<p>A data science team already maintains a large hybrid vector index of engineering documents. A Copilot Studio agent must use it. What should you recommend?</p>",
    "choices": [
     "Re-upload every engineering document as files into the agent",
     "Connect the existing Azure AI Search index as knowledge",
     "Recreate the index as hundreds of topics with trigger phrases",
     "Ignore the index and rely on the model's general knowledge"
    ],
    "answer": 1,
    "explanation": "<p>Copilot Studio can use Azure AI Search as a knowledge source, reusing the existing index and its retrieval tuning.</p><p>Re-uploading duplicates content and loses tuning. Topics are not a document retrieval mechanism. General knowledge does not contain proprietary engineering content.</p>",
    "tag": "Knowledge sources",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 4,
    "prompt": "<p>What does the content moderation setting for generative answers in Copilot Studio primarily control?</p>",
    "choices": [
     "Which users in the environment are allowed to publish the agent to channels",
     "How frequently knowledge sources are re-indexed",
     "How strictly harmful or inappropriate content is filtered",
     "Which language model version the agent uses"
    ],
    "answer": 2,
    "explanation": "<p>Content moderation adjusts how strictly generated responses are filtered for harmful or inappropriate content.</p><p>Publishing permissions, re-indexing frequency, and model version selection are separate settings or platform behaviors.</p>",
    "tag": "Rules and constraints",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 5,
    "prompt": "<p>A Copilot Studio agent must always verify a customer's identity with the same steps before discussing account details. How should you implement this rule?</p>",
    "choices": [
     "Add a sentence to the instructions asking the model to verify identity when convenient",
     "Create a topic with a fixed authentication flow that runs before account questions",
     "Rely on generative answers to decide whether verification is necessary",
     "Upload an identity policy document as a knowledge source"
    ],
    "answer": 1,
    "explanation": "<p>Topics provide deterministic, repeatable flows for mandatory steps, which is appropriate for required identity verification.</p><p>Instructions guide behavior but are not a guaranteed sequence. Generative answers may skip steps. A policy document informs answers but does not enforce a flow.</p>",
    "tag": "Rules and constraints",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 6,
    "prompt": "<p>Where should you configure content filtering thresholds for a model used by a Foundry agent?</p>",
    "choices": [
     "In the Microsoft Entra ID sign-in and conditional access settings for the agent's users",
     "In the agent's display name and description fields",
     "In the guardrails or content filter settings for the deployment or agent",
     "In the storage account that holds the agent's files"
    ],
    "answer": 2,
    "explanation": "<p>Microsoft Foundry applies content filters and guardrails to deployments and agents, with configurable thresholds by harm category.</p><p>Identity settings control sign-in. Display name and description do not enforce safety. Storage accounts hold data but do not filter model output.</p>",
    "tag": "Rules and constraints",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 7,
    "prompt": "<p>A manufacturer needs to detect defects that are unique to its products from camera images, and generic image analysis cannot identify them. It has thousands of labeled images. What should you recommend?</p>",
    "choices": [
     "Use a general-purpose chat model and describe the defects in the prompt",
     "Use optical character recognition to read the product images",
     "Ask inspectors to label every new image instead of using AI",
     "Train a custom image detection model on the labeled images"
    ],
    "answer": 3,
    "explanation": "<p>When the visual patterns are unique and labeled examples exist, a custom vision model is justified and typically outperforms generic models.</p><p>Prompt descriptions alone rarely achieve reliable defect detection. OCR reads text, not defects. Manual labeling of every image forgoes automation.</p>",
    "tag": "Custom models",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 8,
    "prompt": "<p>Product prices and policies change weekly. A team proposes fine-tuning a model so it 'knows' current prices. What should you recommend instead?</p>",
    "choices": [
     "Use retrieval-augmented generation grounded on current price data",
     "Fine-tune the model every day so it always reflects the latest prices",
     "Train a new foundation model whenever a price changes",
     "Hard-code prices into the system prompt and update it monthly"
    ],
    "answer": 0,
    "explanation": "<p>Fine-tuning is for behavior, style, or task skills, not for frequently changing facts. Grounding on live data keeps answers current.</p><p>Daily fine-tuning is costly and still lags. Training foundation models is impractical. Hard-coding prices into a monthly prompt is stale and error-prone.</p>",
    "tag": "Custom models",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   }
  ]
 },
 {
  "id": "d1-prompts",
  "topic": "AI Strategy and Agent Design",
  "domain": "plan",
  "title": "Prompt Libraries and Small Models",
  "blurb": "Apply prompt engineering techniques, govern a shared prompt library, and recognize when small language models fit.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>Which combination of prompt elements generally produces the MOST useful response?</p>",
    "choices": [
     "A clear goal, relevant context, sources, and the desired output format",
     "A single keyword so the model can interpret the request freely",
     "A long list of unrelated background facts with no stated goal or audience",
     "A request written entirely in capital letters for emphasis"
    ],
    "answer": 0,
    "explanation": "<p>Effective prompts state the goal, provide context, point to sources, and define expectations for the output.</p><p>A single keyword is ambiguous. Unrelated facts without a goal confuse the model. Capital letters do not add meaning.</p>",
    "tag": "Prompt engineering",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 2,
    "prompt": "<p>An agent performs poorly on a complex request that requires research, comparison, and a recommendation in one prompt. Which technique should you apply?</p>",
    "choices": [
     "Combine even more tasks into the same prompt",
     "Remove the request for a recommendation and hope it is inferred",
     "Break the task into smaller sequential steps or prompts",
     "Use the same prompt repeatedly until the output improves"
    ],
    "answer": 2,
    "explanation": "<p>Decomposing complex tasks, also called prompt chaining, improves accuracy by letting the model focus on one step at a time.</p><p>Adding more tasks increases complexity. Removing the recommendation abandons the requirement. Repeating the same prompt does not address the cause.</p>",
    "tag": "Prompt engineering",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 3,
    "prompt": "<p>A prompt includes customer-provided text that could contain instructions. Which technique helps the model treat that text as data rather than as commands?</p>",
    "choices": [
     "Place the customer text at the very beginning with no labels",
     "Ask the model to obey any instructions it finds embedded in the customer text",
     "Wrap the untrusted text in delimiters and label it as data, not instructions",
     "Remove the system instructions so there is nothing to conflict with"
    ],
    "answer": 2,
    "explanation": "<p>Delimiting untrusted content and explicitly labeling it as data is a prompt engineering practice that helps reduce prompt injection risk, alongside platform safeguards.</p><p>Unlabeled text blurs instructions and data. Obeying embedded instructions invites injection. Removing system instructions eliminates guardrails.</p>",
    "tag": "Prompt engineering",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 4,
    "prompt": "<p>Employees cannot find relevant prompts in a growing prompt library. What should you recommend?</p>",
    "choices": [
     "Sort prompts only by the date they were added",
     "Organize prompts by role, department, and scenario with tags",
     "Limit the library to ten approved prompts for the whole organization",
     "Store prompts in a single long document without headings"
    ],
    "answer": 1,
    "explanation": "<p>Categorizing by audience and scenario with tags makes a prompt library discoverable and useful.</p><p>Date order does not help users find what they need. An arbitrary cap removes value. An unstructured document is hard to search.</p>",
    "tag": "Prompt library",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 5,
    "prompt": "<p>Which guideline should a shared prompt library include regarding sensitive information?</p>",
    "choices": [
     "Include real customer data so prompts produce realistic results",
     "Store passwords in prompts so users do not need to remember them",
     "Share prompts publicly so that external partners can review and improve them",
     "Use placeholders instead of embedding real customer or employee data"
    ],
    "answer": 3,
    "explanation": "<p>Shared prompts should never contain confidential data. Placeholders let users supply context safely at run time.</p><p>Embedding real data or credentials exposes sensitive information. Public sharing risks leaking internal practices and data.</p>",
    "tag": "Prompt library",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 6,
    "prompt": "<p>How should a prompt library owner decide which prompts to keep, improve, or retire?</p>",
    "choices": [
     "Keep every prompt forever because removing prompts reduces choice",
     "Retire prompts at random each quarter to keep the library small",
     "Let the newest prompt in each category automatically replace older ones",
     "Track usage and feedback, and regularly review low-performing prompts"
    ],
    "answer": 3,
    "explanation": "<p>Usage and feedback data show which prompts deliver value, guiding improvement and retirement.</p><p>Keeping everything creates clutter. Random retirement ignores value. Newest is not necessarily best.</p>",
    "tag": "Prompt library",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 7,
    "prompt": "<p>In which scenario is a small language model LEAST appropriate?</p>",
    "choices": [
     "Classifying short messages into a fixed set of categories at high volume",
     "Open-ended reasoning across many unrelated domains and long documents",
     "Running a narrow assistant on a device without reliable connectivity",
     "Extracting specific fields from a consistent form type with low latency"
    ],
    "answer": 1,
    "explanation": "<p>Small language models excel at narrow, well-defined tasks. Broad, complex reasoning across domains generally benefits from larger models.</p><p>Classification, on-device narrow assistants, and consistent extraction are classic small language model use cases.</p>",
    "tag": "Small language models",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   },
   {
    "n": 8,
    "prompt": "<p>A team wants a small language model to match the quality of a large model on one specific summarization task. Which approach is MOST appropriate?</p>",
    "choices": [
     "Fine-tune the small model on task-specific examples, including larger-model outputs",
     "Increase the small model's temperature so it generates richer and more detailed summaries",
     "Use the small model unchanged with a one-word prompt",
     "Replace the task with manual summaries to avoid any model work"
    ],
    "answer": 0,
    "explanation": "<p>Customizing a small model with task-specific data, including distillation from a larger model's outputs, can close much of the quality gap for a narrow task.</p><p>Higher temperature adds randomness, not quality. A one-word prompt underspecifies the task. Manual work abandons the AI goal.</p>",
    "tag": "Small language models",
    "topic": "AI Strategy and Agent Design",
    "objective": "1.2"
   }
  ]
 },
 {
  "id": "d1-roi",
  "topic": "Costs, Benefits, and ROI",
  "domain": "plan",
  "title": "ROI and Total Cost of Ownership",
  "blurb": "Build ROI cases with complete TCO, sound baselines, and measurable benefits for agentic solutions.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>Which cost is part of TCO but is often left out of AI project budgets?</p>",
    "choices": [
     "The license fees shown on the vendor quote",
     "Change management, training, and adoption support for users",
     "The initial build effort estimated by the solution delivery team",
     "The usage charges forecast in the pilot plan"
    ],
    "answer": 1,
    "explanation": "<p>People-related costs such as training, communications, and adoption programs are essential to value realization and are frequently underestimated.</p><p>License fees, build effort, and forecast usage are usually included because they appear in quotes and plans.</p>",
    "tag": "TCO",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 2,
    "prompt": "<p>Which formula calculates ROI for an AI solution?</p>",
    "choices": [
     "(Total benefits - total costs) / total costs",
     "Total benefits / number of licensed users",
     "(Total costs - total benefits) / total benefits",
     "Total benefits x total costs"
    ],
    "answer": 0,
    "explanation": "<p>ROI expresses net benefit as a proportion of cost: (benefits - costs) / costs.</p><p>Benefits per user is a unit metric, not ROI. Costs minus benefits inverts net value. Multiplying benefits by costs has no financial meaning.</p>",
    "tag": "ROI formula",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 3,
    "prompt": "<p>Which is an example of a hard (quantifiable) benefit of an agent?</p>",
    "choices": [
     "Employees feel the company is more innovative",
     "Leaders believe the brand now appears more modern to customers",
     "A 30% reduction in average handling time per service case",
     "Teams describe collaboration as more enjoyable"
    ],
    "answer": 2,
    "explanation": "<p>Hard benefits are measurable in time, cost, revenue, or quality, such as reduced handling time.</p><p>Perceptions of innovation, brand image, and enjoyment are soft benefits; they are valuable but harder to quantify.</p>",
    "tag": "Benefits",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 4,
    "prompt": "<p>When building a business case, why should you include the cost of inaction?</p>",
    "choices": [
     "It guarantees that the project will be approved by finance",
     "It captures losses from continued manual effort, errors, or lost competitiveness",
     "It replaces the need to estimate any implementation or operating costs for the project",
     "It is required only when the project is funded by IT"
    ],
    "answer": 1,
    "explanation": "<p>Comparing against the status quo, including ongoing costs and risks of not acting, gives decision makers a complete picture.</p><p>It does not guarantee approval, does not replace cost estimates, and applies regardless of funding source.</p>",
    "tag": "Cost of inaction",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 5,
    "prompt": "<p>Your ROI model assumes 80% of users will adopt the agent. Finance is skeptical. What should you add to the analysis?</p>",
    "choices": [
     "A larger adoption assumption to offset the finance team's skepticism",
     "A removal of adoption from the model entirely",
     "A sensitivity analysis showing ROI at different adoption rates",
     "A note that adoption rates cannot be estimated"
    ],
    "answer": 2,
    "explanation": "<p>Sensitivity analysis shows how results change as key assumptions vary, building credibility and highlighting break-even points.</p><p>Inflating assumptions undermines trust. Removing adoption ignores a major driver. Stating it cannot be estimated provides no decision support.</p>",
    "tag": "Assumptions",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 6,
    "prompt": "<p>Two agent options have similar three-year ROI. Option A delivers benefits in 2 months; Option B in 12 months. Which factor favors Option A?</p>",
    "choices": [
     "Higher total cost of ownership over three years",
     "Longer implementation timeline with more milestones and checkpoints",
     "Greater dependency on custom model training",
     "Faster time to value, reducing risk and starting returns sooner"
    ],
    "answer": 3,
    "explanation": "<p>When ROI is similar, earlier benefits improve cash flow, payback period, and reduce delivery risk.</p><p>Higher TCO, longer timelines, and greater custom training would all weaken, not favor, an option.</p>",
    "tag": "Time to value",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 7,
    "prompt": "<p>Six months after launch, how should you validate the ROI that was projected?</p>",
    "choices": [
     "Measure actual outcomes against the original baseline",
     "Reuse the projected numbers because the project is already live",
     "Survey the project team about how successful they think it was",
     "Compare the cost to a different project's projected benefits"
    ],
    "answer": 0,
    "explanation": "<p>Benefits realization compares measured results with the pre-launch baseline using consistent metrics.</p><p>Reusing projections is not validation. Team opinion is biased. Comparing with another project's projections is not meaningful.</p>",
    "tag": "Realization",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 8,
    "prompt": "<p>An agent saves each employee two hours per week. When does this saved time translate into financial benefit?</p>",
    "choices": [
     "Immediately, because saved hours always translate directly into equal cash savings",
     "Only if employees report the time savings on a survey",
     "Never, because time savings cannot be part of ROI",
     "When freed capacity is redeployed to valuable work or reduces planned costs"
    ],
    "answer": 3,
    "explanation": "<p>Time saved becomes financial value only when it is redirected to valuable work, avoids hiring, or reduces overtime or other costs.</p><p>Saved hours do not automatically become cash. Surveys measure perception. Time savings can be part of ROI when realization is planned.</p>",
    "tag": "Capacity",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   }
  ]
 },
 {
  "id": "d1-build-buy",
  "topic": "Costs, Benefits, and ROI",
  "domain": "plan",
  "title": "Build, Buy, Extend, and Model Routing",
  "blurb": "Decide when to build, buy, or extend AI components and when a model router optimizes cost and quality.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>When is buying a prebuilt AI capability usually the BEST choice?</p>",
    "choices": [
     "When the capability is the company's main competitive differentiator",
     "When no product supports the required data or processes",
     "When the need is common and a product already meets it well",
     "When the team needs full control over model internals"
    ],
    "answer": 2,
    "explanation": "<p>Buying is ideal for commodity capabilities where products already deliver the value quickly and with lower TCO.</p><p>Differentiation, unsupported requirements, and need for full control are reasons to build or extend instead.</p>",
    "tag": "Buy",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 2,
    "prompt": "<p>A platform meets most needs, but the company must add its own knowledge and connect to two internal systems. Which approach fits?</p>",
    "choices": [
     "Build a new platform from scratch to include the internal systems",
     "Buy a different product that also lacks the internal connections",
     "Extend the platform with company knowledge sources and actions",
     "Wait for the vendor to build connectors for the internal systems"
    ],
    "answer": 2,
    "explanation": "<p>Extending adds company-specific knowledge and actions while keeping the benefits of the existing platform.</p><p>Building from scratch duplicates existing capability. Another product with the same gap does not help. Waiting for the vendor delays value indefinitely.</p>",
    "tag": "Extend",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 3,
    "prompt": "<p>Which risk should you account for when choosing to build a custom AI component?</p>",
    "choices": [
     "Inability to customize the component to business needs",
     "Ongoing maintenance as models, APIs, and security requirements evolve",
     "Dependence on a vendor's product roadmap for new features",
     "Lack of control over where and how the component's data is stored and processed"
    ],
    "answer": 1,
    "explanation": "<p>Custom builds carry lifecycle responsibility: updating models, dependencies, evaluations, and security over time.</p><p>Limited customization, roadmap dependency, and less control over data processing are typical concerns with buying, not building.</p>",
    "tag": "Build",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 4,
    "prompt": "<p>Your team has no machine learning engineers and a deadline in eight weeks. How should this affect a build, buy, or extend decision?</p>",
    "choices": [
     "It favors building, because custom solutions are always faster to deliver",
     "It favors buying or extending, since building needs skills and time",
     "It has no effect, because skills are not a decision criterion",
     "It favors training a foundation model to avoid vendor dependence"
    ],
    "answer": 1,
    "explanation": "<p>Available skills and time to value are key criteria. Limited skills and tight timelines favor buy or extend options.</p><p>Custom solutions are rarely faster. Skills are a core criterion. Training a foundation model is the most skill- and time-intensive option.</p>",
    "tag": "Decision criteria",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 5,
    "prompt": "<p>What does a model router in Microsoft Foundry do?</p>",
    "choices": [
     "It fine-tunes every model in the catalog on the user's prompts",
     "It routes network traffic between Azure regions for redundancy",
     "It translates prompts into multiple languages before sending them to a single model",
     "It routes each prompt to a suitable underlying model to balance quality and cost"
    ],
    "answer": 3,
    "explanation": "<p>A model router is deployed like a model and selects among underlying models per request, using smaller models when sufficient and larger ones when needed.</p><p>It does not fine-tune models, manage network routing, or translate prompts.</p>",
    "tag": "Model router",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 6,
    "prompt": "<p>Which workload benefits MOST from a model router?</p>",
    "choices": [
     "A chat solution with a wide mix of simple and complex requests",
     "A batch job that always performs the same simple classification",
     "A workload that must use one pinned model for audit reasons",
     "A workload that only ever sends highly complex reasoning tasks"
    ],
    "answer": 0,
    "explanation": "<p>Routing pays off when request complexity varies, so simple requests can use cheaper models and complex ones use capable models.</p><p>Uniform simple or uniformly complex workloads gain little from routing because one model fits. A pinned-model requirement conflicts with dynamic routing.</p>",
    "tag": "Model router",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 7,
    "prompt": "<p>Before moving a solution to a model router in production, what should you do?</p>",
    "choices": [
     "Evaluate quality and cost on representative prompts from your workload",
     "Assume quality is identical to the most capable model for all of your prompts",
     "Disable monitoring because the router optimizes itself",
     "Route only the simplest prompts and drop the complex ones"
    ],
    "answer": 0,
    "explanation": "<p>Evaluation on representative data confirms that routing meets quality targets while delivering expected savings.</p><p>Quality may differ when smaller models are selected. Monitoring remains essential. Dropping complex prompts fails users.</p>",
    "tag": "Model router",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   },
   {
    "n": 8,
    "prompt": "<p>A developer team calls three different models directly and maintains custom code to choose among them. What is a benefit of switching to a model router?</p>",
    "choices": [
     "It removes the need to authenticate requests sent to the router deployment",
     "It guarantees zero latency for every request it processes",
     "It eliminates all model consumption charges for routed requests",
     "A single endpoint handles model selection, reducing custom routing code"
    ],
    "answer": 3,
    "explanation": "<p>A model router consolidates model selection behind one deployment, simplifying the application while optimizing cost and quality.</p><p>Authentication is still required, latency is not zero, and consumption is still billed for the models used.</p>",
    "tag": "Model router",
    "topic": "Costs, Benefits, and ROI",
    "objective": "1.3"
   }
  ]
 },
 {
  "id": "d2-dynamics-cx",
  "topic": "Design AI and Agents",
  "domain": "design",
  "title": "Copilot in Dynamics 365 CX and Service",
  "blurb": "Business terms, Copilot customizations, Sales connectors, and Contact Center channel agents.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>What is the primary purpose of defining business terms for Copilot in Dynamics 365 customer experience and service apps?</p>",
    "choices": [
     "To translate Copilot responses into additional languages",
     "To restrict which users can open Copilot in the app",
     "To change the underlying language model that Copilot uses",
     "To help Copilot understand internal vocabulary"
    ],
    "answer": 3,
    "explanation": "<p>Business terms act as a glossary that explains internal jargon and how it relates to business data, improving Copilot's understanding of user questions.</p><p>Translation, access control, and model selection are configured elsewhere and are not the purpose of business terms.</p>",
    "tag": "Business terms",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 2,
    "prompt": "<p>A Customer Service manager wants Copilot's case summaries to emphasize fields that matter to the business, such as Entitlement Level and Product Line. Which approach should you recommend?</p>",
    "choices": [
     "Build a new Foundry model that generates case summaries",
     "Ask representatives to paste field values into case notes",
     "Disable case summaries and use a Power BI report instead",
     "Configure case summaries to use the relevant fields"
    ],
    "answer": 3,
    "explanation": "<p>Copilot summary experiences in Dynamics 365 customer service apps can be configured by administrators so that summaries use the fields that matter to the organization.</p><p>A custom Foundry model is unnecessary for field selection. Pasting values is manual and error-prone. A Power BI report does not provide in-context summaries.</p>",
    "tag": "Customization",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 3,
    "prompt": "<p>Sellers want to ask Copilot in Dynamics 365 Sales about order status held in an ERP system. Which approach extends Copilot in Sales with this capability?</p>",
    "choices": [
     "Add a Copilot Studio extension that connects to the ERP order data",
     "Duplicate the ERP order table into a SharePoint list for sellers",
     "Create a classic workflow that emails order status every morning",
     "Ask sellers to switch to the ERP application to check order status"
    ],
    "answer": 0,
    "explanation": "<p>Copilot in Dynamics 365 Sales can be extended through Copilot Studio, using connectors and actions to bring in data such as ERP order status.</p><p>Duplicating data into SharePoint creates stale copies. Daily emails are not conversational or timely. Switching apps is the friction the requirement seeks to remove.</p>",
    "tag": "Extend Copilot in Sales",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 4,
    "prompt": "<p>A company connects Microsoft 365 Copilot for Sales to its Salesforce CRM. Which statement about the CRM data is accurate?</p>",
    "choices": [
     "Copilot for Sales permanently copies the entire CRM into Microsoft 365",
     "It reads and writes CRM data within the seller's CRM permissions",
     "Copilot for Sales bypasses CRM security so sellers see all accounts",
     "Copilot for Sales works only after the CRM is migrated to Dataverse"
    ],
    "answer": 1,
    "explanation": "<p>Copilot for Sales connects to the CRM and respects the signed-in user's CRM permissions when retrieving or saving data.</p><p>It does not wholesale replicate the CRM, it does not bypass CRM security, and Salesforce is supported without migration.</p>",
    "tag": "Sales connectors",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 5,
    "prompt": "<p>A retailer adds SMS as a channel in Dynamics 365 Contact Center and wants its existing Copilot Studio agent to handle SMS conversations first. What should you do?</p>",
    "choices": [
     "Rebuild the agent specifically for SMS in Microsoft Foundry",
     "Associate the Copilot Studio agent with the SMS channel workstream",
     "Publish the agent to Teams and forward texts to the Teams channel",
     "Create a Power Automate flow that replies to every SMS with a link"
    ],
    "answer": 1,
    "explanation": "<p>In Dynamics 365 Contact Center, Copilot Studio agents are associated with channel workstreams so the same agent can serve as the first responder across channels such as SMS.</p><p>Rebuilding is unnecessary. Teams is not a customer SMS channel. A link-only reply does not provide conversational service.</p>",
    "tag": "Contact Center channels",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 6,
    "prompt": "<p>A bank wants its Copilot Studio agent to verify caller identity on the voice channel before transferring to a representative. Why should verification happen in the agent?</p>",
    "choices": [
     "Representatives get a verified caller and start faster",
     "Representatives no longer need access to customer records at all",
     "Voice calls no longer require routing rules in Contact Center",
     "Verification in the agent removes the need for any escalation"
    ],
    "answer": 0,
    "explanation": "<p>Performing verification in the agent and passing the result during escalation shortens handle time and gives the representative a verified context.</p><p>Representatives still need customer records. Routing is still required. Escalation is still needed for complex issues.</p>",
    "tag": "Contact Center voice",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 7,
    "prompt": "<p>A small insurer has no representatives available overnight. It wants customers who chat after hours to get answers and to have a case created for follow-up the next morning. What should you design?</p>",
    "choices": [
     "An after-hours path that resolves what it can and creates a case",
     "An escalation that transfers every overnight chat to an empty queue",
     "A disabled chat channel with a message to call back during business hours",
     "A Power BI report that lists unanswered overnight chats each week"
    ],
    "answer": 0,
    "explanation": "<p>The agent can detect operating hours, resolve common questions, and use an action or flow to create a case for unresolved issues, which provides continuity without staff.</p><p>Transferring to an empty queue leaves customers waiting. Disabling the channel removes service. A weekly report does not help customers in the moment.</p>",
    "tag": "Contact Center coverage",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 8,
    "prompt": "<p>Representatives in Dynamics 365 Customer Service want Copilot to draft email responses that use case details and knowledge articles. Which feature supports this?</p>",
    "choices": [
     "Customer Insights segment generation",
     "Unified routing overflow rules",
     "Field Service resource scheduling",
     "Copilot email drafting in the app"
    ],
    "answer": 3,
    "explanation": "<p>Copilot in Dynamics 365 Customer Service can draft email responses grounded in the case context and knowledge, which representatives review before sending.</p><p>Segment generation is for marketing audiences. Overflow rules manage queue capacity. Resource scheduling assigns technicians.</p>",
    "tag": "Copilot features in CX",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   }
  ]
 },
 {
  "id": "d2-agent-types",
  "topic": "Design AI and Agents",
  "domain": "design",
  "title": "Agent Types, Topics, and Orchestration",
  "blurb": "Task, autonomous, and prompt-and-response agents, system topics, orchestration choices, agent flows, and prompt actions.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>Which agent type is BEST described as answering user questions by retrieving and summarizing information, without taking actions?</p>",
    "choices": [
     "Autonomous agent",
     "Task agent",
     "Computer Use automation agent",
     "Prompt-and-response agent"
    ],
    "answer": 3,
    "explanation": "<p>Prompt-and-response (retrieval) agents answer questions from knowledge sources and do not perform actions in systems.</p><p>Autonomous agents act on triggers. Task agents perform actions on request. Computer Use operates user interfaces.</p>",
    "tag": "Agent types",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 2,
    "prompt": "<p>A Copilot Studio autonomous agent must start whenever a new high-priority account record is created in Dataverse. What should you configure?</p>",
    "choices": [
     "A Conversation Start topic with a greeting",
     "A Fallback topic that checks for new account records",
     "A prompt action that lists account records",
     "An event trigger on Dataverse record creation"
    ],
    "answer": 3,
    "explanation": "<p>Autonomous agents use event triggers, such as a Dataverse row being added, to start without a user conversation.</p><p>Conversation Start runs when a user starts chatting. Fallback runs on unrecognized input. A prompt action does not start the agent.</p>",
    "tag": "Autonomous triggers",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 3,
    "prompt": "<p>When an agent uses generative orchestration, what most strongly influences whether a custom topic is selected?</p>",
    "choices": [
     "The number of message nodes in the topic",
     "The topic's name and description",
     "The order in which topics were created",
     "The color assigned to the topic in the canvas"
    ],
    "answer": 1,
    "explanation": "<p>With generative orchestration, the planner uses topic, tool, and knowledge descriptions to decide what to use, so clear descriptions are essential.</p><p>Node count, creation order, and display styling do not drive selection.</p>",
    "tag": "Topics with generative orchestration",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 4,
    "prompt": "<p>Under classic orchestration, several topics match a user's message with similar confidence. Which system topic helps the user choose?</p>",
    "choices": [
     "Conversation Start",
     "Multiple Topics Matched",
     "End of Conversation",
     "On Error"
    ],
    "answer": 1,
    "explanation": "<p>The Multiple Topics Matched system topic asks the user to clarify which of several candidate topics they meant.</p><p>Conversation Start greets users. End of Conversation closes the dialog and can collect satisfaction. On Error handles runtime errors.</p>",
    "tag": "System topics",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 5,
    "prompt": "<p>A Copilot Studio agent with classic orchestration should answer from its knowledge sources when no authored topic matches, before giving up. What enables this?</p>",
    "choices": [
     "Generative answers in Conversational boosting",
     "Adding every possible question as a trigger phrase",
     "Removing the Fallback topic from the agent",
     "Setting the agent to only accept button input"
    ],
    "answer": 0,
    "explanation": "<p>The Conversational boosting system topic uses generative answers over configured knowledge when no topic matches.</p><p>Enumerating every phrase is not feasible. Removing Fallback breaks recovery. Button-only input does not answer open questions.</p>",
    "tag": "Generative answers",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 6,
    "prompt": "<p>Why would an architect choose an agent flow rather than letting the agent's model decide each step?</p>",
    "choices": [
     "The process requires creative, varied wording each time it runs",
     "The process should rely on the model's judgment for each step",
     "The process must be predictable, repeatable, and auditable",
     "The process has no defined steps and changes on every request"
    ],
    "answer": 2,
    "explanation": "<p>Agent flows are deterministic automations, so they fit processes that must run the same way every time and be auditable.</p><p>Creative variation and model judgment favor generative approaches. Undefined steps cannot be modeled as a fixed flow.</p>",
    "tag": "Agent flows",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 7,
    "prompt": "<p>Which elements can you define when creating a prompt action for a Copilot Studio agent?</p>",
    "choices": [
     "Trigger phrases, entities, and slot-filling questions for topics",
     "Queue names, routing rules, and service-level agreements",
     "Security roles, business units, and field-level security",
     "Instructions, inputs, optional knowledge, and output format"
    ],
    "answer": 3,
    "explanation": "<p>Prompt actions are built from natural-language instructions with inputs and can include knowledge and a defined output format such as JSON.</p><p>Trigger phrases and slot filling belong to topics. Queues and SLAs belong to routing. Security roles belong to Dataverse security.</p>",
    "tag": "Prompt actions",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 8,
    "prompt": "<p>In a Copilot Studio agent connected to a contact center, which system topic transfers the user to a human representative?</p>",
    "choices": [
     "Greeting",
     "Escalate",
     "Reset Conversation",
     "Sign in"
    ],
    "answer": 1,
    "explanation": "<p>The Escalate system topic handles requests to talk to a person and, when connected to an engagement hub, transfers the conversation.</p><p>Greeting welcomes users. Reset Conversation clears state. Sign in authenticates the user.</p>",
    "tag": "Escalation",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   }
  ]
 },
 {
  "id": "d2-apps-data",
  "topic": "Design AI and Agents",
  "domain": "design",
  "title": "Foundry Tools, Apps, and Grounding Data",
  "blurb": "Foundry Tools selection, generative pages and agent feed, canvas app AI, Well-Architected, and grounding data processing.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A global manufacturer needs product manuals translated into 20 languages while preserving document formatting. Which Foundry Tools capability fits?</p>",
    "choices": [
     "Azure AI Speech text to speech",
     "Azure AI Vision image analysis",
     "Azure AI Language sentiment and opinion analysis",
     "Azure AI Translator document translation"
    ],
    "answer": 3,
    "explanation": "<p>Translator's document translation converts entire documents between languages while preserving structure and formatting.</p><p>Text to speech produces audio. Image analysis describes images. Sentiment analysis scores opinions; none translate documents.</p>",
    "tag": "Foundry Tools",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 2,
    "prompt": "<p>A public chat agent must screen user inputs and model outputs for hate, violence, and self-harm content. Which Foundry Tools capability should you propose?</p>",
    "choices": [
     "Azure AI Document Intelligence",
     "Azure AI Content Safety",
     "Azure AI Translator",
     "Azure AI Speech"
    ],
    "answer": 1,
    "explanation": "<p>Content Safety detects harmful content categories in text and images and can be applied to prompts and responses.</p><p>Document Intelligence extracts document data. Translator converts languages. Speech converts audio and text.</p>",
    "tag": "Foundry Tools",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 3,
    "prompt": "<p>Users search a knowledge base with both exact product codes and natural-language descriptions. Which retrieval design gives the BEST grounding results?</p>",
    "choices": [
     "Keyword search only on document titles",
     "Hybrid keyword and vector search with semantic ranking",
     "Vector search only, with no metadata or keyword matching",
     "Random sampling of documents per query"
    ],
    "answer": 1,
    "explanation": "<p>Hybrid search combines exact keyword matching (good for codes) with vector similarity (good for meaning), and semantic ranking improves relevance.</p><p>Title-only keyword search misses content. Pure vector search can miss exact codes. Random sampling is not retrieval.</p>",
    "tag": "Grounding retrieval",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 4,
    "prompt": "<p>What best describes generative pages in model-driven Power Apps?</p>",
    "choices": [
     "Static HTML pages that makers upload into a Dataverse table as files",
     "Natural-language generated pages with code developers can refine",
     "Power BI paginated reports embedded in the app sitemap",
     "Classic forms that are created by editing XML by hand"
    ],
    "answer": 1,
    "explanation": "<p>Generative pages let makers describe the page they need in natural language, and the platform generates a code-first page for the model-driven app.</p><p>Uploaded static HTML, paginated reports, and hand-edited form XML are not generative page capabilities.</p>",
    "tag": "Generative pages",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 5,
    "prompt": "<p>Why include an agent feed in a business app that uses autonomous agents?</p>",
    "choices": [
     "So agents can bypass security roles when updating business records",
     "So administrators can delete agent telemetry automatically",
     "So users can review agent activity and items needing attention",
     "So the app can run without any Dataverse tables"
    ],
    "answer": 2,
    "explanation": "<p>An agent feed brings agent work into the app where people supervise it, supporting human-in-the-loop oversight.</p><p>It does not bypass security, delete telemetry, or remove the need for data storage.</p>",
    "tag": "Agent feed",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 6,
    "prompt": "<p>A canvas app for warehouse staff should let users ask natural-language questions about the data shown in the app. Which feature should you add?</p>",
    "choices": [
     "An AI Builder object detection model",
     "A Power Automate desktop flow",
     "The Copilot control in the canvas app",
     "A Dataverse plug-in assembly for the app"
    ],
    "answer": 2,
    "explanation": "<p>The Copilot control lets users ask questions about data in a canvas app in natural language.</p><p>Object detection analyzes images. Desktop flows automate UI tasks. Plug-ins run server-side business logic.</p>",
    "tag": "Canvas app AI",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 7,
    "prompt": "<p>Applying the Security pillar of the Power Platform Well-Architected framework to an agent that updates Dataverse, which principle should you apply?</p>",
    "choices": [
     "Give the agent system administrator rights to avoid permission errors",
     "Share one maker's credentials across all of the agent's connections",
     "Grant the agent's identity least-privilege access to needed tables",
     "Disable authentication so external users can use the agent easily"
    ],
    "answer": 2,
    "explanation": "<p>Least privilege limits the blast radius if an agent is misused or manipulated, which is central to the Security pillar.</p><p>Administrator rights, shared maker credentials, and disabling authentication all broaden exposure.</p>",
    "tag": "Well-Architected",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   },
   {
    "n": 8,
    "prompt": "<p>A grounding index of policy documents is rebuilt once a quarter, and users receive outdated answers. What should you change?</p>",
    "choices": [
     "Increase the number of results returned for each query",
     "Schedule frequent incremental indexing of the documents",
     "Lower the model temperature to reduce variation",
     "Add an instruction that tells the model to use the newest policy"
    ],
    "answer": 1,
    "explanation": "<p>Timeliness is a data quality dimension; refreshing the index incrementally on a frequent schedule keeps grounding data current.</p><p>More results, lower temperature, and instructions cannot surface documents that are not in the index.</p>",
    "tag": "Grounding timeliness",
    "topic": "Design AI and Agents",
    "objective": "2.1"
   }
  ]
 },
 {
  "id": "d2-studio-ext",
  "topic": "Extensibility of AI Solutions",
  "domain": "design",
  "title": "MCP, Computer Use, and Agent Behaviors",
  "blurb": "Copilot Studio extensibility with MCP, Computer Use, connectors, multi-agent, reasoning, and voice.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>What does a Model Context Protocol (MCP) server provide to a Copilot Studio agent?</p>",
    "choices": [
     "A user interface automation engine for desktop applications",
     "A replacement for Dataverse as the agent's data store",
     "A standard way to expose tools and resources to the agent",
     "A hosting service for the agent's published web chat"
    ],
    "answer": 2,
    "explanation": "<p>MCP is an open protocol through which servers expose tools and resources that agents can discover and call.</p><p>UI automation is Computer Use. MCP does not replace Dataverse or host web chat.</p>",
    "tag": "MCP",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 2,
    "prompt": "<p>A maker adds an MCP server to a Copilot Studio agent, but the tools are never used. The agent uses classic orchestration. What should you recommend?</p>",
    "choices": [
     "Add trigger phrases for each MCP tool",
     "Turn on generative orchestration",
     "Move the MCP server into a Fallback topic",
     "Convert the MCP tools into knowledge files"
    ],
    "answer": 1,
    "explanation": "<p>MCP tools are selected by the generative orchestrator, so generative orchestration must be enabled for the agent to use them.</p><p>Trigger phrases apply to topics. Fallback is for unrecognized input. Knowledge files cannot execute tools.</p>",
    "tag": "MCP prerequisites",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 3,
    "prompt": "<p>When is Computer Use the MOST appropriate extensibility choice?</p>",
    "choices": [
     "When the system has only a user interface and no API",
     "When the target system offers a documented REST API",
     "When the needed data is already available in Dataverse tables",
     "When an MCP server exposes the required operations"
    ],
    "answer": 0,
    "explanation": "<p>Computer Use automates through the graphical interface and is best reserved for systems without APIs.</p><p>APIs, Dataverse, and MCP are more robust and efficient options when available.</p>",
    "tag": "Computer Use fit",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 4,
    "prompt": "<p>How does Computer Use differ from traditional selector-based RPA?</p>",
    "choices": [
     "It requires recording every click with fixed screen coordinates",
     "It works only with applications that expose an OpenAPI definition",
     "It runs only inside Dataverse plug-in pipelines",
     "It follows natural-language instructions and reads the screen"
    ],
    "answer": 3,
    "explanation": "<p>Computer Use uses a model that reasons over screenshots and natural-language instructions, so it can adapt to some interface changes.</p><p>It does not rely on fixed coordinates, does not require APIs, and is not a Dataverse plug-in.</p>",
    "tag": "Computer Use behavior",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 5,
    "prompt": "<p>Which capabilities are typical of a voice-enabled Copilot Studio agent for interactive voice response?</p>",
    "choices": [
     "Speech recognition, spoken responses, and keypad (DTMF) input",
     "Image recognition, barcode scanning, and handwritten signature capture",
     "Email parsing, calendar booking, and file synchronization",
     "Screen recording, mouse automation, and window resizing"
    ],
    "answer": 0,
    "explanation": "<p>Voice-enabled agents understand speech, speak responses, and accept DTMF input for phone scenarios.</p><p>The other options describe vision, productivity, and UI automation features.</p>",
    "tag": "Voice",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 6,
    "prompt": "<p>Which scenario BEST justifies enabling a reasoning model for a Copilot Studio agent step?</p>",
    "choices": [
     "Comparing contract clauses against complex policy rules",
     "Greeting the user at the start of every conversation",
     "Returning a store's opening hours from a single lookup table",
     "Confirming that the user wants to end the conversation"
    ],
    "answer": 0,
    "explanation": "<p>Reasoning models are suited to complex, multi-step analysis where accuracy outweighs added latency.</p><p>Greetings, simple lookups, and confirmations are simple tasks where reasoning adds cost and latency without benefit.</p>",
    "tag": "Reasoning",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 7,
    "prompt": "<p>In Copilot Studio, what distinguishes a child agent from a connected agent?</p>",
    "choices": [
     "A child agent must be built in Microsoft Foundry, while a connected agent must be built in Teams",
     "A child agent can only answer greetings, while a connected agent can only call MCP tools",
     "A child agent lives in the parent agent; a connected agent is managed and reused separately",
     "A child agent runs on a schedule, while a connected agent runs only when a user types"
    ],
    "answer": 2,
    "explanation": "<p>Child agents are lightweight components within the parent agent, whereas connected agents are independent agents with their own lifecycle that other agents can call.</p><p>Neither type is restricted to a particular build tool, to greetings or MCP only, or to a specific trigger type.</p>",
    "tag": "Multi-agent",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 8,
    "prompt": "<p>An agent's custom connector reads a user's own expense reports. Which authentication design should you recommend?</p>",
    "choices": [
     "A single maker credential shared for all users",
     "Anonymous access with the API key stored in the agent instructions",
     "No authentication because the agent is internal",
     "User authentication so calls use the signed-in user's permissions"
    ],
    "answer": 3,
    "explanation": "<p>End-user authentication ensures each user sees only their own data and actions are attributable.</p><p>Shared maker credentials overexpose data, keys in instructions leak, and internal agents still require authentication.</p>",
    "tag": "Connector authentication",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   }
  ]
 },
 {
  "id": "d2-m365-foundry",
  "topic": "Extensibility of AI Solutions",
  "domain": "design",
  "title": "Microsoft 365 Agents and Foundry Models",
  "blurb": "Declarative and custom engine agents, Teams and SharePoint agents, and custom models in Microsoft Foundry.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A business user wants to quickly create a simple agent with instructions and a few files, directly within Microsoft 365 Copilot. Which tool should they use?</p>",
    "choices": [
     "Agent Builder in Microsoft 365 Copilot",
     "Microsoft Foundry fine-tuning",
     "Power Platform admin center",
     "Microsoft 365 Agents SDK"
    ],
    "answer": 0,
    "explanation": "<p>Agent Builder offers a lightweight, natural-language experience for creating declarative agents inside Microsoft 365 Copilot.</p><p>Fine-tuning creates models, not agents. The admin center is for governance. The Agents SDK is a pro-code option.</p>",
    "tag": "Agent Builder",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 2,
    "prompt": "<p>Which set of components defines a declarative agent for Microsoft 365 Copilot?</p>",
    "choices": [
     "Model weights, training data, and GPU quotas",
     "Queues, workstreams, and routing rules",
     "Instructions, knowledge sources, and actions",
     "Security roles, business units, and teams"
    ],
    "answer": 2,
    "explanation": "<p>Declarative agents are configured with instructions, knowledge (such as SharePoint or connectors), and actions such as API plugins, and run on Copilot's orchestrator.</p><p>Model weights relate to custom models. Queues relate to contact centers. Security roles relate to Dataverse.</p>",
    "tag": "Declarative agents",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 3,
    "prompt": "<p>Which requirement points to a custom engine agent rather than a declarative agent?</p>",
    "choices": [
     "The solution needs SharePoint documents as knowledge",
     "The solution needs a short set of custom written instructions",
     "The solution needs its own orchestrator and model choices",
     "The solution needs to appear in Microsoft 365 Copilot"
    ],
    "answer": 2,
    "explanation": "<p>Custom engine agents bring their own orchestration and models, which is the key differentiator from declarative agents.</p><p>SharePoint knowledge, instructions, and availability in Microsoft 365 Copilot are all supported by declarative agents.</p>",
    "tag": "Custom engine agents",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 4,
    "prompt": "<p>Which statement about SharePoint agents is accurate?</p>",
    "choices": [
     "They answer from selected site content and respect user permissions",
     "They copy site content into a new database that bypasses permissions",
     "They require a professional developer to deploy custom code",
     "They can answer only from public web content, not site files"
    ],
    "answer": 0,
    "explanation": "<p>SharePoint agents are scoped to selected sites, libraries, or files and honor SharePoint permissions.</p><p>They do not bypass permissions, do not require custom code, and use site content.</p>",
    "tag": "SharePoint agents",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 5,
    "prompt": "<p>A department wants employees to use its agent where they already collaborate, including chats and channel conversations. Which channel should you prioritize?</p>",
    "choices": [
     "A standalone public website",
     "An SMS short code",
     "A telephone IVR line",
     "Microsoft Teams"
    ],
    "answer": 3,
    "explanation": "<p>Teams is where employees chat and collaborate, so publishing the agent there maximizes adoption for internal scenarios.</p><p>Public websites, SMS, and IVR target external customers rather than internal collaboration.</p>",
    "tag": "Teams",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 6,
    "prompt": "<p>A model must answer questions about product prices that change daily. Which approach is MOST appropriate?</p>",
    "choices": [
     "Retrieval-augmented generation over current prices",
     "Fine-tuning the model on today's complete price list",
     "Training a new foundation model each week",
     "Increasing the model's maximum output tokens"
    ],
    "answer": 0,
    "explanation": "<p>Retrieval keeps frequently changing facts current without retraining; fine-tuning is better for style, format, or narrow task behavior.</p><p>Fine-tuned prices go stale immediately. Weekly foundation training is impractical. Output length does not affect freshness.</p>",
    "tag": "Fine-tuning vs RAG",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 7,
    "prompt": "<p>An architect must choose among several models in the Microsoft Foundry model catalog for a summarization task. What should drive the decision?</p>",
    "choices": [
     "The model with the largest parameter count available in the catalog",
     "Evaluation results on representative data, plus cost and latency",
     "The model that was most recently added to the catalog",
     "The model whose name appears first alphabetically"
    ],
    "answer": 1,
    "explanation": "<p>Evaluating candidate models on representative tasks, and weighing quality against cost and latency, produces an evidence-based selection.</p><p>Size, recency, and naming do not guarantee fitness for the task.</p>",
    "tag": "Model selection",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   },
   {
    "n": 8,
    "prompt": "<p>A Copilot Studio prompt action needs a model that the organization fine-tuned and deployed in Microsoft Foundry. What should you recommend?</p>",
    "choices": [
     "Retrain the model inside Copilot Studio from the same data",
     "Export the model weights into the prompt instructions",
     "Select the Foundry-deployed model for the prompt action",
     "Recreate the model as an AI Builder object detection model"
    ],
    "answer": 2,
    "explanation": "<p>Copilot Studio prompts can use models deployed in Microsoft Foundry, which lets organizations apply their own fine-tuned models.</p><p>Copilot Studio does not retrain Foundry models. Weights cannot be placed in instructions. Object detection is for images.</p>",
    "tag": "Bring your own model",
    "topic": "Extensibility of AI Solutions",
    "objective": "2.2"
   }
  ]
 },
 {
  "id": "d2-prebuilt",
  "topic": "Prebuilt Agents and Apps",
  "domain": "design",
  "title": "Prebuilt Agents and Dynamics 365 AI",
  "blurb": "Microsoft 365 and Dynamics 365 prebuilt agents, Copilot for Sales and Service, AI hub, and finance and operations Copilot extensions.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A service organization wants to discover the reasons customers contact it from historical conversations so that self-service can be improved. Which agent should you recommend?</p>",
    "choices": [
     "Customer Knowledge Management Agent",
     "Supplier Communications Agent",
     "Customer Intent Agent",
     "Sales Qualification Agent"
    ],
    "answer": 2,
    "explanation": "<p>The Customer Intent Agent discovers and organizes customer intents from conversation history to improve self-service and routing.</p><p>Knowledge Management creates articles. Supplier Communications handles vendors. Sales Qualification handles leads.</p>",
    "tag": "Customer Service agents",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 2,
    "prompt": "<p>Employees spend time searching for HR and IT policies and opening tickets. Which prebuilt Microsoft 365 agent addresses this scenario?</p>",
    "choices": [
     "Employee Self-Service",
     "Analyst",
     "Facilitator",
     "Researcher"
    ],
    "answer": 0,
    "explanation": "<p>The Employee Self-Service agent answers common HR and IT questions and can help with related tasks.</p><p>Analyst analyzes data, Facilitator supports meetings, and Researcher produces research reports.</p>",
    "tag": "Microsoft 365 agents",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 3,
    "prompt": "<p>Where can representatives use Microsoft 365 Copilot for Service capabilities?</p>",
    "choices": [
     "Only inside the Microsoft Foundry portal and its playground",
     "Only in the Power Platform admin center",
     "Only in Dynamics 365 Finance workspaces",
     "In Outlook, Teams, and supported contact center desktops"
    ],
    "answer": 3,
    "explanation": "<p>Copilot for Service brings assistance into Outlook and Teams and can be embedded in supported service desktops.</p><p>The Foundry portal, the admin center, and Finance workspaces are not the representative surfaces.</p>",
    "tag": "Copilot for Service",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 4,
    "prompt": "<p>Which items can makers find and create in Power Platform AI hub?</p>",
    "choices": [
     "Contact Center queues and routing rules",
     "Microsoft Entra conditional access and sign-in policies",
     "Dynamics 365 Finance ledger structures",
     "AI Builder models, document processing, and prompts"
    ],
    "answer": 3,
    "explanation": "<p>AI hub centralizes AI Builder models, document processing, and prompts for makers.</p><p>Queues, conditional access, and ledger setup are configured in other admin experiences.</p>",
    "tag": "AI hub",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 5,
    "prompt": "<p>A user in Dynamics 365 Supply Chain Management wants a quick overview of key metrics and exceptions on a workspace. Which AI feature helps?</p>",
    "choices": [
     "Copilot workspace summaries",
     "Customer Insights segment builder",
     "Contact Center intent routing",
     "SharePoint agent creation"
    ],
    "answer": 0,
    "explanation": "<p>Copilot in finance and operations apps can summarize workspace information to highlight important items.</p><p>Segments, routing, and SharePoint agents serve different products and purposes.</p>",
    "tag": "Finance and operations Copilot",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 6,
    "prompt": "<p>Accountants in Dynamics 365 Finance spend days matching ledger balances to subledger and bank details during close. Which prebuilt agent targets this work?</p>",
    "choices": [
     "Customer Intent Agent",
     "Quality Evaluation Agent",
     "Account Reconciliation Agent",
     "Employee Self-Service agent"
    ],
    "answer": 2,
    "explanation": "<p>The Account Reconciliation Agent helps identify and resolve mismatches during financial reconciliation.</p><p>Customer Intent and Quality Evaluation are service agents, and Employee Self-Service handles HR and IT questions.</p>",
    "tag": "Finance agents",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 7,
    "prompt": "<p>Why can the Copilot chat in finance and operations apps be extended with additional knowledge sources?</p>",
    "choices": [
     "Because it stores all answers in a static FAQ table inside the app",
     "Because it is built on Copilot Studio",
     "Because it requires a custom engine agent for every environment",
     "Because it reads knowledge only from Microsoft Purview labels"
    ],
    "answer": 1,
    "explanation": "<p>The finance and operations Copilot chat is built on Copilot Studio, so organizations can extend it with knowledge sources, topics, and actions.</p><p>It is not a static FAQ, it does not require custom engine agents, and Purview labels are not knowledge sources.</p>",
    "tag": "F&O chat interoperability",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   },
   {
    "n": 8,
    "prompt": "<p>After adding SharePoint procedures as knowledge for in-app help in Dynamics 365 Finance, what should you verify before releasing to users?</p>",
    "choices": [
     "That the SharePoint site is shared with everyone in the tenant for convenience",
     "That Microsoft product documentation has been removed from the help experience",
     "That answers cite correct documents and respect source permissions",
     "That all Finance users have been granted system administrator rights"
    ],
    "answer": 2,
    "explanation": "<p>Validation should confirm answer quality with citations and that grounding respects permissions on the source content.</p><p>Oversharing the site, removing product guidance, or granting administrator rights would harm security or usefulness.</p>",
    "tag": "In-app help",
    "topic": "Prebuilt Agents and Apps",
    "objective": "2.3"
   }
  ]
 },
 {
  "id": "d3-monitor",
  "topic": "Monitor and Tune",
  "domain": "deploy",
  "title": "Monitoring, Telemetry, and Tuning",
  "blurb": "Choose the right monitoring tools, read agent telemetry correctly, and turn feedback into tuning actions.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>In Copilot Studio analytics, which outcome describes a session in which the user stopped responding before the conversation was resolved or escalated?</p>",
    "choices": [
     "Resolved",
     "Escalated",
     "Engaged",
     "Abandoned"
    ],
    "answer": 3,
    "explanation": "<p>An abandoned session ends, typically by timing out, without reaching a resolved or escalated outcome. A rising abandon rate often signals confusing topics or answers that miss the point.</p><p><em>Resolved</em> means the conversation reached a successful end. <em>Escalated</em> means the conversation was handed to a human agent. <em>Engaged</em> describes sessions where users interacted with the agent, not how they ended.</p>",
    "tag": "Outcome metrics",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 2,
    "prompt": "<p>An analyst wants to run custom analysis on raw Copilot Studio conversation transcripts by using Power BI. Where are these transcripts stored by default?</p>",
    "choices": [
     "In the Microsoft Purview audit log store",
     "In a Dataverse table in the agent's environment",
     "In an Azure Storage account that Microsoft manages",
     "In each user's Exchange Online mailbox"
    ],
    "answer": 1,
    "explanation": "<p>Copilot Studio saves conversation transcripts in Dataverse in the agent's environment, subject to retention settings, so they can be queried or analyzed with tools such as Power BI.</p><p>The <em>Purview audit log</em> stores activity events, not full transcripts for analysis. There is no <em>managed storage account</em> you query for transcripts. <em>User mailboxes</em> do not hold Copilot Studio agent transcripts.</p>",
    "tag": "Transcripts",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 3,
    "prompt": "<p>A bank wants to count how often its agent's 'balance lookup' action fails, alongside other telemetry in Azure Application Insights. What should the maker add?</p>",
    "choices": [
     "A satisfaction survey at the end of each conversation",
     "A Dataverse audit setting on the Contact table",
     "A Power BI dashboard on the Dataverse transcript table",
     "A custom telemetry event logged from the topic on failure"
    ],
    "answer": 3,
    "explanation": "<p>When an agent is connected to Application Insights, makers can log custom telemetry events from topics, capturing business-specific events such as action failures for queries, dashboards, and alerts.</p><p>A <em>satisfaction survey</em> measures user sentiment, not specific action failures. <em>Dataverse auditing</em> tracks record changes, not agent action outcomes. A <em>Power BI dashboard on transcripts</em> lacks the event structure and alerting of Application Insights.</p>",
    "tag": "Custom telemetry",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 4,
    "prompt": "<p>Which open standard does Microsoft Foundry use to emit traces of agent runs, including model and tool calls, so they can be viewed in Application Insights?</p>",
    "choices": [
     "Simple Network Management Protocol",
     "Syslog message format",
     "OpenTelemetry",
     "Open Data Protocol (OData)"
    ],
    "answer": 2,
    "explanation": "<p>Foundry tracing is based on OpenTelemetry, which captures spans for each step of an agent run and exports them to Azure Monitor Application Insights for analysis.</p><p><em>Simple Network Management Protocol</em> is a network device management protocol. <em>Syslog</em> is a system log message format, not distributed tracing. <em>OData</em> is a data query protocol, not a tracing standard.</p>",
    "tag": "Tracing",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 5,
    "prompt": "<p>A service team wants customers to rate their experience explicitly when a Copilot Studio conversation ends, and to see the results in analytics. What should you use?</p>",
    "choices": [
     "The satisfaction survey in the end-of-conversation flow",
     "A sentiment model run on transcripts each month",
     "An email survey sent from Dynamics 365 Marketing",
     "The Microsoft 365 admin center feedback page"
    ],
    "answer": 0,
    "explanation": "<p>Copilot Studio's end-of-conversation flow can ask users to rate their satisfaction, and the results are reported as CSAT in the agent's analytics.</p><p><em>Monthly sentiment analysis</em> is inferred, delayed, and not an explicit rating. An <em>email survey</em> is disconnected from the agent's analytics. The <em>admin center feedback page</em> is for product feedback to Microsoft.</p>",
    "tag": "User feedback",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 6,
    "prompt": "<p>A Foundry evaluation flags answers that include facts that do not appear in the retrieved context. Which metric captures this problem?</p>",
    "choices": [
     "Groundedness",
     "Fluency",
     "Coherence",
     "Similarity"
    ],
    "answer": 0,
    "explanation": "<p>Groundedness measures how well a response is supported by the provided context. Unsupported facts lower groundedness even when the answer reads well.</p><p><em>Fluency</em> measures grammar and readability. <em>Coherence</em> measures logical flow and consistency of the response. <em>Similarity</em> compares a response to a ground-truth answer, not to retrieved context.</p>",
    "tag": "Evaluation metrics",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 7,
    "prompt": "<p>Operations staff want to be notified within minutes when the error rate of a production agent's tool calls exceeds a threshold. What should you configure?</p>",
    "choices": [
     "A weekly email export of Copilot Studio analytics",
     "An Azure Monitor alert rule on the Application Insights data",
     "A Purview retention label on agent transcripts",
     "A Power Platform DLP policy for the environment"
    ],
    "answer": 1,
    "explanation": "<p>Azure Monitor alert rules evaluate Application Insights metrics or log queries on a schedule and notify action groups when thresholds are crossed.</p><p>A <em>weekly export</em> is far too slow for near-real-time notification. <em>Retention labels</em> govern how long content is kept. <em>DLP policies</em> control connector use, not error alerts.</p>",
    "tag": "Alerting",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   },
   {
    "n": 8,
    "prompt": "<p>Before changing instructions to improve an agent's accuracy, what should the team do so that it can prove the change helped?</p>",
    "choices": [
     "Change several settings at once to save time",
     "Capture a baseline on a fixed evaluation set before the change",
     "Collect user comments only after the change is live",
     "Switch to a different model at the same time"
    ],
    "answer": 1,
    "explanation": "<p>A baseline on a fixed, representative evaluation set allows a before-and-after comparison. Changing one variable at a time makes it clear which change produced the effect.</p><p><em>Several simultaneous changes</em> make the cause of any improvement unclear. <em>Comments after the change</em> have no before comparison. <em>Switching models at the same time</em> confounds the results.</p>",
    "tag": "Tuning loop",
    "topic": "Monitor and Tune",
    "objective": "3.1"
   }
  ]
 },
 {
  "id": "d3-testing",
  "topic": "Testing AI Solutions",
  "domain": "deploy",
  "title": "Testing and Validation",
  "blurb": "Plan agent and model testing, set validation criteria, and design end-to-end and Copilot-assisted test cases.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>An agent is grounded on SharePoint content with mixed permissions. Which test BEST verifies that users only receive answers from content they can access?</p>",
    "choices": [
     "Test with accounts that represent different roles and permissions",
     "Test with the maker's account, which can see all of the content",
     "Test anonymously so no permission can interfere with results",
     "Review the SharePoint site list without running any queries"
    ],
    "answer": 0,
    "explanation": "<p>Permission-trimmed retrieval must be validated with real identities that differ in access. Comparing answers across role-based test accounts confirms that restricted content does not leak.</p><p>The <em>maker's account</em> sees everything, so it cannot detect leaks. <em>Anonymous testing</em> cannot exercise permission trimming at all. <em>Reviewing a site list</em> does not test actual agent behavior.</p>",
    "tag": "Permission testing",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 2,
    "prompt": "<p>A payroll agent should decline questions about stock prices. Which type of test verifies this behavior?</p>",
    "choices": [
     "Out-of-scope tests that expect a polite decline or redirect",
     "Load tests with many concurrent users",
     "Happy-path tests for supported payroll questions",
     "Accessibility tests of the chat interface"
    ],
    "answer": 0,
    "explanation": "<p>Negative or out-of-scope tests confirm that the agent stays within its boundaries, declining or redirecting rather than inventing answers.</p><p><em>Load tests</em> check performance under volume. <em>Happy-path tests</em> cover supported scenarios only. <em>Accessibility tests</em> check the interface, not scope handling.</p>",
    "tag": "Negative testing",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 3,
    "prompt": "<p>A travel agent asks for destination, dates, and budget across several turns, and users often change their minds. What should the test plan include?</p>",
    "choices": [
     "Single questions that each contain every detail at once",
     "Tests of the welcome message in each supported language",
     "Tests that measure only response time for the first turn",
     "Multi-turn scripts that change earlier answers mid-conversation"
    ],
    "answer": 3,
    "explanation": "<p>Multi-turn tests verify that the agent tracks context, fills and updates slots, and handles corrections, which single-turn tests cannot reveal.</p><p><em>All-in-one questions</em> skip context tracking. <em>Welcome message tests</em> cover only the greeting. <em>First-turn latency</em> says nothing about context handling.</p>",
    "tag": "Multi-turn testing",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 4,
    "prompt": "<p>An agent will be launched to 40,000 employees on the same morning. What should testing confirm before launch?</p>",
    "choices": [
     "Answer quality for a single tester on a quiet day",
     "That the agent icon displays correctly in Teams",
     "Latency and error rates under expected concurrent load",
     "That every topic has a unique trigger phrase"
    ],
    "answer": 2,
    "explanation": "<p>Load and performance tests simulate expected concurrency to confirm acceptable latency, identify throttling, and validate dependent APIs and capacity before a large launch.</p><p>A <em>single tester</em> cannot reveal concurrency problems. The <em>icon</em> is cosmetic. <em>Unique triggers</em> matter for routing but not for load readiness.</p>",
    "tag": "Performance testing",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 5,
    "prompt": "<p>A team uses AI-assisted evaluators to score thousands of responses. How should it make sure the scores can be trusted?</p>",
    "choices": [
     "Use the evaluator scores without any human review",
     "Replace the evaluators with human review of all responses",
     "Have the agent grade its own responses after each answer",
     "Calibrate the evaluators against a human-labeled sample"
    ],
    "answer": 3,
    "explanation": "<p>AI-assisted evaluation scales well, but its judgments should be checked against a set of human-labeled examples to confirm agreement before relying on it.</p><p><em>No human review</em> leaves evaluator errors undetected. <em>Reviewing every response by hand</em> does not scale. <em>Self-grading</em> is biased and unreliable.</p>",
    "tag": "AI-assisted evaluation",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 6,
    "prompt": "<p>Validation results for a custom document classification model look excellent, but performance in production is poor. Investigation shows near-duplicate documents in both training and test sets. What happened?</p>",
    "choices": [
     "The production environment lacked enough capacity",
     "The model was underfitted because the data was too varied",
     "Data leakage between splits inflated the validation results",
     "The evaluation metric was too strict for the task"
    ],
    "answer": 2,
    "explanation": "<p>When test data overlaps with training data, the model is effectively tested on what it already saw, producing optimistic results. Splits must be deduplicated and representative of production.</p><p><em>Capacity</em> affects throughput, not prediction quality. <em>Underfitting</em> would show poor validation scores too. A <em>strict metric</em> would lower, not inflate, validation results.</p>",
    "tag": "Model validation",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 7,
    "prompt": "<p>Who should sign off that an agent for claims adjusters meets business needs before production?</p>",
    "choices": [
     "Business users, against agreed acceptance criteria",
     "The developer who wrote the agent's topics",
     "The Microsoft account team assigned to the customer",
     "The network team that manages the firewall"
    ],
    "answer": 0,
    "explanation": "<p>User acceptance testing is performed by representative business users who confirm the agent meets documented acceptance criteria in realistic scenarios.</p><p>The <em>developer</em> is not independent and does not own the business outcome. The <em>Microsoft account team</em> cannot accept on the business's behalf. The <em>network team</em> is not the business owner.</p>",
    "tag": "User acceptance",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   },
   {
    "n": 8,
    "prompt": "<p>A test manager uses Copilot to draft test cases from user stories. What practice keeps the test suite trustworthy?</p>",
    "choices": [
     "Accept every generated case as written to save time",
     "Trace each generated case to a requirement and review it",
     "Generate new cases each run so no case is ever reused",
     "Delete cases that fail so the suite stays green"
    ],
    "answer": 1,
    "explanation": "<p>Generated test cases accelerate authoring, but each should map to a requirement and be reviewed for correct steps and expected results. A stable, versioned suite enables regression comparison.</p><p><em>Accepting as written</em> risks incorrect expectations. <em>Regenerating each run</em> prevents consistent regression testing. <em>Deleting failing cases</em> hides defects.</p>",
    "tag": "Copilot test cases",
    "topic": "Testing AI Solutions",
    "objective": "3.2"
   }
  ]
 },
 {
  "id": "d3-alm",
  "topic": "ALM for AI Solutions",
  "domain": "deploy",
  "title": "ALM for Agents, Models, and Data",
  "blurb": "Move agents, connectors, Foundry assets, models, and data through environments with control and traceability.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>Which statement about managed solutions is correct?</p>",
    "choices": [
     "They are deployed to downstream environments and are not edited there",
     "They are the type you edit day to day in development",
     "They can only contain canvas apps and not agents",
     "They are exported directly from the production environment"
    ],
    "answer": 0,
    "explanation": "<p>Unmanaged solutions are used for development. Managed solutions are generated from them and deployed to test and production, where components are not edited directly.</p><p><em>Day-to-day editing</em> happens in unmanaged solutions in development. Solutions can contain <em>agents</em> and many other component types. Managed solutions are exported from <em>development</em>, not production.</p>",
    "tag": "Managed solutions",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 2,
    "prompt": "<p>A Copilot Studio agent uses a SharePoint site URL and an API base address that differ between test and production. What should store these values?</p>",
    "choices": [
     "Hardcoded text in each topic",
     "A note in the solution description",
     "Personal connections of the maker",
     "Environment variables in the solution"
    ],
    "answer": 3,
    "explanation": "<p>Environment variables hold configuration values that change per environment and are set during import, so the same managed solution works everywhere.</p><p><em>Hardcoded values</em> require edits in each environment. A <em>description note</em> is documentation, not configuration. <em>Personal connections</em> tie the agent to one user's credentials.</p>",
    "tag": "Environment variables",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 3,
    "prompt": "<p>A team wants Copilot Studio agent changes reviewed and versioned in a Git repository in Azure Repos. What should it do?</p>",
    "choices": [
     "Store screenshots of each topic in the repository",
     "Copy the published agent's web chat link into the repository",
     "Export and unpack the solution with the Power Platform CLI into the repository",
     "Commit a Dataverse backup file to the repository"
    ],
    "answer": 2,
    "explanation": "<p>The Power Platform CLI can export and unpack solutions into source files suitable for version control, review, and pipeline-based builds. Dataverse Git integration is another option for solution-aware source control.</p><p><em>Screenshots</em> cannot be built or deployed. A <em>chat link</em> is not the agent definition. <em>Backups</em> are not reviewable source and capture the whole environment.</p>",
    "tag": "Source control",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 4,
    "prompt": "<p>An enterprise already standardizes on Azure DevOps and wants automated build and release of Power Platform solutions that contain agents. What should you recommend?</p>",
    "choices": [
     "Azure Site Recovery replication plans",
     "Microsoft Intune app protection policies",
     "Power Platform Build Tools for Azure DevOps",
     "SharePoint document library versioning"
    ],
    "answer": 2,
    "explanation": "<p>Power Platform Build Tools provide Azure DevOps tasks to export, unpack, pack, check, and import solutions, enabling automated CI/CD for agents and related components.</p><p><em>Site Recovery</em> is for disaster recovery. <em>Intune</em> manages devices and app protection. <em>Library versioning</em> tracks documents, not solution deployments.</p>",
    "tag": "CI/CD",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 5,
    "prompt": "<p>How should a team provision Microsoft Foundry resources, projects, and model deployments consistently for development, test, and production?</p>",
    "choices": [
     "Manual portal configuration following a written checklist",
     "Infrastructure as code templates such as Bicep deployed by a pipeline",
     "Cloning the production project by copying its API keys",
     "One project with folders named dev, test, and prod"
    ],
    "answer": 1,
    "explanation": "<p>Infrastructure as code makes Foundry resources reproducible and reviewable, and a pipeline applies the same templates with environment-specific parameters.</p><p><em>Manual checklists</em> drift over time. <em>Copying keys</em> does not create infrastructure and spreads secrets. <em>Folders in one project</em> do not isolate access or resources.</p>",
    "tag": "Foundry environments",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 6,
    "prompt": "<p>A team wants to control when the model version behind its Foundry deployment changes so it can test upgrades first. What should it do?</p>",
    "choices": [
     "Always enable automatic upgrades to the newest version",
     "Delete and re-create the deployment every month",
     "Pin a specific model version and test upgrades before switching",
     "Use a different model provider in each environment"
    ],
    "answer": 2,
    "explanation": "<p>Pinning a model version prevents unplanned behavior changes. The team evaluates newer versions in nonproduction and switches deliberately, ahead of any retirement dates.</p><p><em>Automatic upgrades</em> can change behavior without testing. <em>Monthly re-creation</em> adds disruption without control. <em>Different providers per environment</em> make testing meaningless.</p>",
    "tag": "Model versions",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 7,
    "prompt": "<p>A search index that grounds an agent must be rebuilt after a schema change, without downtime and with easy rollback. What approach should you use?</p>",
    "choices": [
     "Delete the live index and rebuild it in place",
     "Edit index fields directly in production during business hours",
     "Build a new versioned index, validate it, then switch to it",
     "Stop the agent until a new index is built from scratch"
    ],
    "answer": 2,
    "explanation": "<p>Building a new index version side by side, validating retrieval quality, and then switching (for example, by updating the agent's configuration or an alias) avoids downtime and keeps the previous version for rollback.</p><p><em>Deleting the live index</em> causes downtime and removes rollback. <em>Editing production directly</em> risks breaking retrieval. <em>Stopping the agent</em> creates an avoidable outage.</p>",
    "tag": "Grounding data ALM",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   },
   {
    "n": 8,
    "prompt": "<p>Which identity should an automated pipeline use to deploy agent solutions to production?</p>",
    "choices": [
     "The personal account of the lead developer",
     "A shared administrator account with a known password",
     "An anonymous connection with no authentication",
     "A service principal with only the permissions it needs"
    ],
    "answer": 3,
    "explanation": "<p>Service principals provide non-interactive, auditable, least-privilege identities for automation, independent of any individual user.</p><p>A <em>personal account</em> breaks when the person leaves and over-privileges automation. A <em>shared admin account</em> is not traceable and is a security risk. <em>Anonymous connections</em> cannot deploy to protected environments.</p>",
    "tag": "Pipeline identity",
    "topic": "ALM for AI Solutions",
    "objective": "3.3"
   }
  ]
 },
 {
  "id": "d3-security",
  "topic": "Responsible AI, Security, and Governance",
  "domain": "deploy",
  "title": "Agent and Model Security",
  "blurb": "Secure agents and models, defend against prompt manipulation, and control access to grounding and tuning data.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>An internal HR agent in Microsoft Teams must know who each employee is so it can personalize answers and respect permissions. Which authentication option should you choose?</p>",
    "choices": [
     "No authentication so the agent is easy to reach",
     "A shared password that employees type into the chat",
     "Authenticate with Microsoft so users sign in with Entra ID",
     "Authentication based on the user's display name"
    ],
    "answer": 2,
    "explanation": "<p>Using Microsoft Entra ID authentication in Teams gives the agent the user's identity, enabling permission-aware grounding and auditing.</p><p><em>No authentication</em> makes the user unknown to the agent. A <em>shared password</em> does not identify individuals and leaks easily. <em>Display names</em> are not a security credential.</p>",
    "tag": "Agent authentication",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 2,
    "prompt": "<p>A Copilot Studio agent calls a partner API that requires an API key. Where should the key be stored?</p>",
    "choices": [
     "In the agent's instructions so the model can include it",
     "In Azure Key Vault, referenced by a secret environment variable",
     "In a global variable set at the start of each conversation",
     "In a SharePoint list that the agent uses as knowledge"
    ],
    "answer": 1,
    "explanation": "<p>Power Platform supports secret environment variables that reference Azure Key Vault, keeping secrets out of solution files and agent content while allowing rotation.</p><p><em>Instructions</em> can be revealed through prompt manipulation. A <em>global variable</em> exposes the secret in agent definitions and transcripts. A <em>knowledge list</em> could surface the key in answers.</p>",
    "tag": "Secrets",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 3,
    "prompt": "<p>An agent updates customer records through a connector. Users must only be able to change records they already have permission to change. How should the connection be configured?</p>",
    "choices": [
     "Use the maker's credentials for every user's request",
     "Use a global administrator service account",
     "Use the end user's credentials for the connector action",
     "Use a connection shared by everyone in the tenant"
    ],
    "answer": 2,
    "explanation": "<p>When an action runs with the end user's credentials, the target system enforces that user's permissions, preventing privilege escalation through the agent.</p><p><em>Maker credentials</em> let users act with the maker's rights. A <em>global administrator</em> account vastly over-privileges the agent. A <em>tenant-wide shared connection</em> ignores individual permissions.</p>",
    "tag": "Least privilege",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 4,
    "prompt": "<p>An agent summarizes web pages that users submit. How should the solution treat the page content to reduce indirect prompt injection risk?</p>",
    "choices": [
     "Treat it as trusted instructions that extend the system message",
     "Treat it as untrusted data, delimit it, and screen it with Prompt Shields",
     "Append it to the system message so the model reads it first",
     "Translate it into another language before sending it to the model"
    ],
    "answer": 1,
    "explanation": "<p>Retrieved content should be clearly separated from instructions (for example, by delimiting or spotlighting it) and screened for embedded attacks, so the model treats it as data to summarize rather than commands to follow.</p><p><em>Treating it as trusted instructions</em> is exactly how injection succeeds. <em>Appending to the system message</em> elevates untrusted content. <em>Translation</em> does not remove embedded instructions.</p>",
    "tag": "Indirect injection",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 5,
    "prompt": "<p>An agent can browse websites and send email on a user's behalf. A security review warns that injected instructions could make it email data to an attacker. What should you add?</p>",
    "choices": [
     "A larger model with stronger reasoning capabilities",
     "A longer system message listing forbidden domains",
     "A faster mailbox connector with higher throughput",
     "User confirmation for sensitive actions and tightly scoped tools"
    ],
    "answer": 3,
    "explanation": "<p>Limiting what tools can do and requiring explicit user confirmation before high-impact actions such as sending email reduces the impact of a successful injection.</p><p>A <em>larger model</em> can still be manipulated. A <em>forbidden domain list</em> in a prompt is easily bypassed. <em>Throughput</em> is unrelated to the risk.</p>",
    "tag": "Excessive agency",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 6,
    "prompt": "<p>A bank requires that its Microsoft Foundry resources are not reachable from the public internet. What should you configure?</p>",
    "choices": [
     "A content filter set to the strictest severity level",
     "Private endpoints and disabled public network access",
     "A Conditional Access policy for administrators only",
     "Sensitivity labels on the Foundry project"
    ],
    "answer": 1,
    "explanation": "<p>Private endpoints place the service on the bank's virtual network, and disabling public network access blocks internet access to the resources.</p><p><em>Content filters</em> govern model inputs and outputs, not network reachability. <em>Conditional Access for admins</em> does not block network paths. <em>Sensitivity labels</em> classify content, not network access.</p>",
    "tag": "Network isolation",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 7,
    "prompt": "<p>The security operations center wants alerts when attackers attempt jailbreaks or data leakage against the organization's Azure AI model deployments. What should you recommend?</p>",
    "choices": [
     "Microsoft Secure Score recommendations for the tenant",
     "Scheduled backups of each Power Platform environment",
     "Azure Cost Management budgets with spending alerts",
     "Threat protection for AI services in Microsoft Defender for Cloud"
    ],
    "answer": 3,
    "explanation": "<p>Microsoft Defender for Cloud offers threat protection for AI workloads, generating security alerts for suspicious activity such as jailbreak attempts that the SOC can investigate.</p><p><em>Secure Score</em> rates posture but does not raise attack alerts. <em>Backups</em> support recovery, not detection. <em>Budgets</em> track spending.</p>",
    "tag": "Threat detection",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 8,
    "prompt": "<p>A firm wants Microsoft 365 Copilot to avoid using files labeled 'Highly Confidential' when it generates responses. What should you configure?</p>",
    "choices": [
     "A Purview DLP policy for the Microsoft 365 Copilot location",
     "A Power Platform DLP policy for the default environment",
     "A Teams meeting policy that disables transcription",
     "An Exchange mail flow rule for outbound email"
    ],
    "answer": 0,
    "explanation": "<p>Microsoft Purview DLP can target Microsoft 365 Copilot to exclude content with specified sensitivity labels from being processed in responses.</p><p><em>Power Platform DLP</em> governs connectors, not Microsoft 365 Copilot content. A <em>meeting policy</em> affects transcription only. A <em>mail flow rule</em> affects email routing, not Copilot processing.</p>",
    "tag": "Sensitive content",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   }
  ]
 },
 {
  "id": "d3-governance",
  "topic": "Responsible AI, Security, and Governance",
  "domain": "deploy",
  "title": "Governance, Compliance, and Responsible AI",
  "blurb": "Govern agents at scale, apply responsible AI principles, and meet data residency and audit requirements.",
  "timeMinutes": 10,
  "questions": [
   {
    "n": 1,
    "prompt": "<p>A company wants lightweight rules for personal productivity agents and stricter review for agents used across the enterprise. What governance model fits?</p>",
    "choices": [
     "One strict approval process for every agent of any size",
     "Tiered zones with controls that increase with reach and risk",
     "No controls at all until an incident occurs",
     "Separate tenants for each department's agents"
    ],
    "answer": 1,
    "explanation": "<p>Zoned governance applies proportionate controls: light guardrails for personal use, more oversight for team agents, and formal review, ALM, and support for enterprise agents.</p><p><em>Uniform strict approval</em> stifles low-risk innovation. <em>No controls</em> invites risk. <em>Separate tenants</em> fragment identity and governance.</p>",
    "tag": "Zoned governance",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 2,
    "prompt": "<p>A CISO wants to discover which AI apps employees use and whether sensitive data appears in prompts and responses. What should you recommend?</p>",
    "choices": [
     "Microsoft Purview Data Security Posture Management for AI",
     "Microsoft Entra Privileged Identity Management",
     "Azure Policy guest configuration",
     "Power Platform environment routing"
    ],
    "answer": 0,
    "explanation": "<p>DSPM for AI in Microsoft Purview provides visibility into AI usage and sensitive data in AI interactions, with recommended policies to reduce risk.</p><p><em>PIM</em> manages just-in-time privileged roles. <em>Guest configuration</em> audits settings inside machines. <em>Environment routing</em> directs makers to development environments.</p>",
    "tag": "AI data security posture",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 3,
    "prompt": "<p>An EU public-sector customer asks how Microsoft 365 Copilot handles data location commitments for EU customers. Which concept should you reference?</p>",
    "choices": [
     "Azure Availability Zones within a single region",
     "Power Platform environment routing rules",
     "Customer Lockbox approval workflows",
     "The EU Data Boundary commitments for Microsoft cloud services"
    ],
    "answer": 3,
    "explanation": "<p>Microsoft 365 Copilot is covered by the EU Data Boundary commitments, under which customer data for EU customers is stored and processed within the EU, with documented exceptions.</p><p><em>Availability Zones</em> address resilience, not residency commitments. <em>Environment routing</em> places makers, not data. <em>Customer Lockbox</em> controls Microsoft engineer access, not data location.</p>",
    "tag": "Data residency",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 4,
    "prompt": "<p>Auditors want to know who changed a Foundry model deployment and when. Where should you look?</p>",
    "choices": [
     "The model's evaluation results page",
     "Copilot Studio analytics for the agent",
     "The Azure Activity log for the resource",
     "The Microsoft 365 message center"
    ],
    "answer": 2,
    "explanation": "<p>The Azure Activity log records control-plane operations on Azure resources, including who created, updated, or deleted deployments and when.</p><p><em>Evaluation results</em> show quality, not change history. <em>Copilot Studio analytics</em> cover conversations, not Azure resource changes. The <em>message center</em> announces Microsoft service changes.</p>",
    "tag": "Audit trails",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 5,
    "prompt": "<p>A regulated firm must keep Microsoft 365 Copilot prompts and responses for seven years and make them searchable for legal holds. What should you use?</p>",
    "choices": [
     "Copilot Studio transcript retention settings in Dataverse",
     "Power BI semantic model scheduled refresh history logs",
     "Azure Backup vaults configured for the Microsoft 365 tenant",
     "Purview retention policies and eDiscovery for Copilot interactions"
    ],
    "answer": 3,
    "explanation": "<p>Microsoft Purview can retain Copilot interactions under retention policies and search or hold them with eDiscovery.</p><p><em>Dataverse transcripts</em> apply to Copilot Studio agents, not Microsoft 365 Copilot interactions. <em>Refresh history</em> is unrelated. <em>Azure Backup</em> does not provide Microsoft 365 Copilot interaction retention.</p>",
    "tag": "Retention",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 6,
    "prompt": "<p>A public agency's agent will serve residents with disabilities and limited English. Which responsible AI principle is MOST directly addressed by supporting screen readers and multiple languages?</p>",
    "choices": [
     "Inclusiveness",
     "Accountability",
     "Transparency",
     "Reliability and safety"
    ],
    "answer": 0,
    "explanation": "<p>Inclusiveness focuses on empowering and engaging everyone, including people with disabilities and diverse language needs.</p><p><em>Accountability</em> is about people being answerable for AI systems. <em>Transparency</em> is about understanding how the system works. <em>Reliability and safety</em> is about consistent, safe operation.</p>",
    "tag": "Inclusiveness",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 7,
    "prompt": "<p>Which design choice MOST directly supports the reliability and safety principle for a medical-information agent?</p>",
    "choices": [
     "Evaluated safe fallbacks and escalation to clinicians when unsure",
     "A friendly persona with a custom avatar for patients",
     "Support for dark mode in the chat interface",
     "A shorter welcome message to save screen space"
    ],
    "answer": 0,
    "explanation": "<p>Reliable and safe systems behave as intended under expected and unexpected conditions, including safe fallback behavior and escalation to qualified humans, verified through testing.</p><p>A <em>persona</em> affects tone, not safety. <em>Dark mode</em> is a usability preference. A <em>shorter welcome</em> is cosmetic.</p>",
    "tag": "Reliability and safety",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   },
   {
    "n": 8,
    "prompt": "<p>When should a team complete a responsible AI impact assessment for a new agent?</p>",
    "choices": [
     "Only after a complaint is received from a user",
     "During design, and update it as the solution changes",
     "Once, after the agent has been in production for a year",
     "Never, if the agent uses a prebuilt Microsoft model"
    ],
    "answer": 1,
    "explanation": "<p>Impact assessments identify stakeholders, intended uses, and potential harms early, so mitigations are designed in. They are revisited when scope, data, or capabilities change.</p><p><em>After a complaint</em> is reactive. <em>After a year</em> is too late to shape the design. <em>Prebuilt models</em> still require assessing your use case.</p>",
    "tag": "Impact assessment",
    "topic": "Responsible AI, Security, and Governance",
    "objective": "3.4"
   }
  ]
 }
];
