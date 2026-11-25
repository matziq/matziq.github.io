window.AB1_DATA = window.AB1_DATA || {};
window.AB1_DATA.exam2 = {
 "id": "exam2",
 "name": "AB-100 — Practice Exam 2",
 "timeMinutes": 100,
 "units": [
  {
   "title": "",
   "html": "",
   "questions": [
    {
     "n": 1,
     "prompt": "<p>A utility company wants a Copilot Studio agent to answer questions using asset records in an on-premises SQL Server database that sits behind the corporate firewall. Pilot users report that the agent cannot retrieve any asset data. Which requirement must you address?</p>",
     "choices": [
      "Publish the SQL Server database directly to the internet so the agent can reach it",
      "Provide access through an on-premises data gateway and a supported connector",
      "Copy the asset tables into a personal OneDrive folder owned by the agent maker",
      "Disable authentication on the database so that connection attempts never fail"
     ],
     "answer": 1,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>The issue is availability: the agent cannot reach the data. An on-premises data gateway lets cloud services such as Copilot Studio and Power Platform connectors securely access on-premises sources.</p><p>Exposing the database to the internet or disabling authentication creates serious security risk. Copying data to a personal OneDrive creates stale, ungoverned copies tied to one person.</p>"
    },
    {
     "n": 2,
     "prompt": "<p>A medical-device company uses Copilot in Dynamics 365 Sales. Sales managers want Copilot opportunity summaries to always highlight two custom columns, Contract Renewal Date and Clinical Champion, that the company added to the opportunity table. What should you recommend?</p>",
     "choices": [
      "Create a Copilot Studio topic that reads the two columns when a seller asks",
      "Fine-tune a model in Microsoft Foundry to recognize the two custom columns",
      "Move the two columns into the opportunity description so Copilot reads them",
      "Add the custom columns to the opportunity summary settings"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Copilot in Dynamics 365 Sales lets administrators customize which fields are used in lead and opportunity summaries, including custom columns, so key business data appears consistently.</p><p>A topic would answer only when explicitly asked and would not change the summary. Fine-tuning is unnecessary for selecting fields. Merging data into a free-text description loses structure and breaks reporting.</p>"
    },
    {
     "n": 3,
     "prompt": "<p>An agent receives thousands of thumbs-down reactions and comments each month. The product owner wants a repeatable process that turns this feedback into improvements. What should you recommend?</p>",
     "choices": [
      "Cluster feedback into themes, prioritize by impact, and track fixes in a backlog",
      "Fix whichever comment arrived most recently at the start of each day",
      "Ignore negative reactions that do not include a written comment",
      "Retrain the model automatically each week on all feedback received"
     ],
     "answer": 0,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>A sound feedback process groups feedback into themes, ranks them by frequency and business impact, assigns owners through a backlog, and re-measures after each change to confirm improvement.</p><p><em>Most recent first</em> chases noise rather than the most important issues. <em>Ignoring uncommented reactions</em> discards a large, useful quality signal. <em>Automatic weekly retraining</em> on unvetted feedback can introduce errors and is rarely how agents are tuned.</p>"
    },
    {
     "n": 4,
     "prompt": "<p>A telecom company's CRM contains duplicate customer records, inconsistent phone number formats, and free-text fields with typos. An agent will use this data to personalize service responses. Which preparation step addresses the cleanliness of the grounding data?</p>",
     "choices": [
      "Add more records from additional systems so that errors are statistically diluted",
      "Increase the agent's response length so it can explain any conflicting records",
      "Refresh the index more frequently so that duplicates are replaced sooner",
      "Deduplicate records and standardize formats before the data is used for grounding"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>Cleanliness covers duplicates, inconsistent formats, and invalid values. Cleansing the data before grounding reduces conflicting or wrong personalization.</p><p>Adding more data does not fix existing duplicates and may add more. Longer responses do not resolve which record is correct. Refreshing more often improves timeliness but simply re-indexes the same dirty data.</p>"
    },
    {
     "n": 5,
     "prompt": "<p>A bank's Copilot Studio agent handles authentication and intent capture on the voice channel of Dynamics 365 Contact Center. When calls escalate, representatives complain that customers must repeat their account number and reason for calling. What should you change?</p>",
     "choices": [
      "Pass the collected values as context variables on escalation",
      "Ask the customer to repeat the information once the representative joins",
      "Store the values in an Excel file that representatives check during calls",
      "Create a new case manually after each call with the collected information"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>When a Copilot Studio agent escalates to Dynamics 365 Contact Center, it can pass context variables so that routing and the representative's workspace receive the authenticated identity and captured intent.</p><p>Asking customers to repeat themselves is the problem being solved. Spreadsheets are insecure and not real time. Manual case creation after the call does not help the representative during the conversation.</p>"
    },
    {
     "n": 6,
     "prompt": "<p>After a scheduled refresh of the search index used by a Microsoft Foundry retrieval agent, the groundedness score in evaluations dropped sharply while relevance stayed stable. What should you do FIRST?</p>",
     "choices": [
      "Fine-tune the model on the newly indexed documents right away",
      "Raise the model temperature to encourage more complete answers",
      "Inspect traces of failing queries to check the chunks being retrieved",
      "Replace AI-assisted evaluators with occasional manual spot checks"
     ],
     "answer": 2,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "hard",
     "explanation": "<p>A groundedness drop that coincides with an index refresh suggests that retrieval or chunking changed, so the model is answering without adequate support. Traces show which chunks were retrieved for failing queries and reveal the root cause before any tuning.</p><p><em>Fine-tuning</em> is costly and does not address a retrieval regression. <em>Higher temperature</em> tends to increase unsupported content and lowers groundedness further. <em>Removing evaluators</em> hides the signal instead of diagnosing it.</p>"
    },
    {
     "n": 7,
     "prompt": "<p>An IT help desk agent is grounded on the entire corporate intranet, including cafeteria menus, event photos, and old project sites. Users complain that answers include unrelated content. What should you recommend?</p>",
     "choices": [
      "Increase the number of search results the agent retrieves for each question",
      "Switch to a larger model so that it ignores irrelevant content automatically",
      "Turn on general knowledge so the model can answer without the intranet",
      "Scope the knowledge sources to curated IT support content"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>This is a relevance problem. Narrowing the knowledge sources to content that matches the agent's purpose improves retrieval precision and answer quality.</p><p>Retrieving more results surfaces even more irrelevant content. A larger model still grounds on what it retrieves. General knowledge does not reflect company-specific IT procedures.</p>"
    },
    {
     "n": 8,
     "prompt": "<p>Employees at a consulting firm want to ask an agent to 'book my trip to Chicago next Tuesday within policy'. The agent must check the travel policy, search approved vendors, and create the booking when the employee confirms. Which agent type BEST fits?</p>",
     "choices": [
      "A prompt-and-response agent that returns the policy text only",
      "An autonomous agent that books travel on a nightly schedule",
      "A task agent that performs actions when a user requests them",
      "A SharePoint agent scoped to the travel policy library"
     ],
     "answer": 2,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Task agents carry out multi-step actions on behalf of a user when asked, combining knowledge (policy) with tools (vendor search and booking) and confirming with the user.</p><p>A prompt-and-response agent answers questions but does not complete bookings. A scheduled autonomous agent would not respond to an individual request with confirmation. A SharePoint agent answers from documents but cannot book travel.</p>"
    },
    {
     "n": 9,
     "prompt": "<p>A finance team proposes three agent capabilities: summarizing monthly variance reports, drafting collection reminder emails for review, and automatically raising customer credit limits based on payment history. Which capability requires the strongest human oversight controls?</p>",
     "choices": [
      "Summarizing monthly variance reports",
      "Drafting collection reminder emails for review",
      "All three capabilities require identical oversight",
      "Automatically raising customer credit limits"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>Autonomous actions that change financial exposure are high impact and hard to reverse. They need approval steps, thresholds, logging, and monitoring proportional to the risk.</p><p>Summaries are informational and reviewed by people. Drafts that a person reviews already include a human checkpoint. Oversight should be proportional to risk, so the three capabilities do not need identical controls.</p>"
    },
    {
     "n": 10,
     "prompt": "<p>Customers often send messages such as 'Update my address and tell me when my next bill is due' to a retail bank's Copilot Studio agent. The agent must handle both requests in one turn and decide dynamically which topics, tools, and knowledge to use. Which orchestration approach should you recommend?</p>",
     "choices": [
      "Classic orchestration with standard NLU",
      "Generative orchestration",
      "Conversational language understanding only",
      "Keyword matching in the Fallback topic"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Generative orchestration uses a language model to interpret the request, handle multiple intents, and select and chain topics, tools, and knowledge sources based on their descriptions.</p><p>Classic orchestration triggers a single best-matching topic per turn. CLU recognizes intents and entities but does not plan multi-step chaining on its own. Keyword matching in Fallback is brittle and only runs when nothing else matches.</p>"
    },
    {
     "n": 11,
     "prompt": "<p>A team wants ongoing quality scores for its production Foundry agent, not just a one-time evaluation before release. Which approach should you recommend?</p>",
     "choices": [
      "Run continuous evaluation on sampled production traffic with alerts",
      "Run a batch evaluation once before each major release only",
      "Rely solely on end-user satisfaction survey results each quarter",
      "Write raw prompts to a storage account for future reference"
     ],
     "answer": 0,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>Continuous (online) evaluation scores a sample of real production interactions over time, so quality drift is detected quickly. Alerts in Azure Monitor notify the team when scores fall below thresholds.</p><p><em>Pre-release batch evaluation only</em> misses drift that happens after deployment. <em>Quarterly surveys</em> are slow and low-response, and they do not measure groundedness or safety. <em>Storing raw prompts</em> without analysis provides no quality signal and adds privacy risk.</p>"
    },
    {
     "n": 12,
     "prompt": "<p>A distributor wants its inventory and order data to be usable by agents in Copilot Studio, Microsoft Foundry, and partner AI systems, with consistent operations and centralized authentication. What should you recommend?</p>",
     "choices": [
      "Give each AI system direct read access to the production database tables",
      "Expose the data through a governed MCP server or API with documented schemas",
      "Publish nightly CSV extracts to a public storage container for partners",
      "Ask each agent team to describe the data's meaning in its own agent instructions"
     ],
     "answer": 1,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>Exposing business data through a governed interface with documented schemas, authentication, and consistent operations lets many AI systems reuse it safely. Model Context Protocol is an open standard that agents across platforms can consume.</p><p>Direct database access bypasses business logic and broadens attack surface. Public CSV extracts are stale and insecure. Describing data in instructions does not make it accessible or consistent.</p>"
    },
    {
     "n": 13,
     "prompt": "<p>A pharmaceutical company's Copilot Studio agent must submit sample requests that follow a fixed sequence: validate the requester's license, request manager approval, and write an auditable record. The sequence must run the same way every time. What should you design?</p>",
     "choices": [
      "Agent instructions that describe the steps for the model to follow",
      "A prompt action that generates the approval decision from the request",
      "An agent flow that the agent calls to run the deterministic steps",
      "A knowledge source that documents the sample request procedure"
     ],
     "answer": 2,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Agent flows in Copilot Studio provide deterministic, rule-based automation (including approvals and data writes) that agents can invoke, which suits processes that require consistency and auditability.</p><p>Instructions guide a model but do not guarantee identical execution. A prompt action produces generative output, which is inappropriate for an approval decision. A knowledge source informs answers but does not execute steps.</p>"
    },
    {
     "n": 14,
     "prompt": "<p>During requirements analysis for a Microsoft 365 Copilot rollout, you find that SharePoint sites containing salary data are shared with 'Everyone except external users'. What should you recommend before enabling grounding on this content?</p>",
     "choices": [
      "Proceed, because Microsoft 365 Copilot never returns content from sensitive sites",
      "Move the salary files to a public website so access is managed in one place",
      "Turn off auditing so the sensitive file access is not recorded in logs",
      "Remediate oversharing with corrected permissions and Purview sensitivity labels"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>Microsoft 365 Copilot respects existing permissions, so overshared content becomes discoverable. Fixing permissions and labeling sensitive data is a prerequisite for safe grounding.</p><p>Copilot honors permissions; it does not automatically exclude content users can already access. A public website makes the problem worse. Turning off auditing removes accountability and does not reduce exposure.</p>"
    },
    {
     "n": 15,
     "prompt": "<p>Telemetry for a Copilot Studio agent shows that most generative answer calls are for about twenty frequently asked questions whose answers never change. Capacity consumption is rising quickly. What is the BEST tuning action?</p>",
     "choices": [
      "Add more knowledge sources so generative answers become faster",
      "Move the agent to a larger capacity plan without other changes",
      "Disable analytics collection so sessions consume fewer resources",
      "Author topics with fixed responses for the frequent questions"
     ],
     "answer": 3,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "hard",
     "explanation": "<p>Telemetry shows a stable set of high-volume questions with deterministic answers. Authored topics answer them predictably without a generative answers call, reserving generative AI for long-tail questions and reducing consumption.</p><p><em>More knowledge sources</em> do not reduce the number of generative calls and may slow retrieval. <em>Buying more capacity</em> treats the symptom without improving efficiency. <em>Disabling analytics</em> removes visibility and does not reduce generative consumption.</p>"
    },
    {
     "n": 16,
     "prompt": "<p>A field services firm uses a model-driven Power Apps app. Business analysts want to describe a new page, such as an interactive technician utilization view, in natural language and have it generated, while professional developers can then refine the underlying code. Which capability should you recommend?</p>",
     "choices": [
      "A Power BI report embedded in a dashboard",
      "Generative pages in the model-driven app",
      "A Power Pages site with Liquid templates",
      "A classic canvas app built from a blank screen"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Generative pages let makers describe a page in natural language and have the platform generate a code-first page for a model-driven app, which developers can then refine.</p><p>Embedded Power BI provides analytics, not generated app pages. Power Pages targets external websites. A blank canvas app requires manual low-code design rather than natural-language generation of code.</p>"
    },
    {
     "n": 17,
     "prompt": "<p>An organization has completed its AI strategy using the Cloud Adoption Framework. It now needs to assess skills gaps, prioritize use cases, and run a proof of concept. Which CAF AI adoption phase is next?</p>",
     "choices": [
      "AI plan",
      "AI ready",
      "Secure AI",
      "Manage AI"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>The AI plan phase follows strategy. It covers assessing skills, acquiring talent or partners, prioritizing use cases, and creating proofs of concept.</p><p>AI ready focuses on preparing environments and landing zones. Secure AI focuses on protecting AI workloads. Manage AI covers operating AI workloads in production.</p>"
    },
    {
     "n": 18,
     "prompt": "<p>A data science team fine-tuned a model in Microsoft Foundry to classify warranty claims. Before approving it for production, you must define validation criteria. Which criteria are MOST appropriate?</p>",
     "choices": [
      "Per-class precision and recall on a held-out set compared to a baseline",
      "Accuracy measured on the same data that was used for training",
      "A training loss value that is lower than in the previous run",
      "A successful live demonstration to the executive sponsor"
     ],
     "answer": 0,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "medium",
     "explanation": "<p>Custom models should be validated on data they have not seen that represents production, using metrics suited to the task, such as per-class precision and recall, and compared against agreed thresholds and a baseline, along with safety checks.</p><p><em>Training-set accuracy</em> overstates performance and hides overfitting. <em>Lower training loss</em> does not prove better generalization. A <em>demo</em> is anecdotal and not a measurable acceptance criterion.</p>"
    },
    {
     "n": 19,
     "prompt": "<p>An insurer deploys several agents that pre-assess claims inside a model-driven app. Claims handlers need one place in the app to see what agents have done, what needs their review, and to approve or correct agent output. What should you include in the design?</p>",
     "choices": [
      "A Power Automate run history export shared weekly",
      "An agent feed in the app for reviewing agent activity",
      "A Teams channel where each agent posts raw logs",
      "A Dataverse audit log report viewed by administrators"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>An agent feed surfaces agent activities and items that require human attention within the business app, supporting human-in-the-loop review and approval.</p><p>Weekly exports are not timely and are not in the app. Raw logs in Teams are noisy and not actionable for handlers. Audit logs serve administrators and compliance rather than day-to-day review.</p>"
    },
    {
     "n": 20,
     "prompt": "<p>A healthcare organization wants to define policies for AI risk assessment, responsible AI review, and regulatory compliance before scaling agents. Which CAF AI adoption area addresses this?</p>",
     "choices": [
      "Govern AI",
      "AI strategy",
      "AI ready",
      "Manage AI"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Govern AI establishes policies, risk assessment, and compliance controls for AI use, including responsible AI review.</p><p>AI strategy defines use cases and direction. AI ready prepares infrastructure. Manage AI handles ongoing operations such as monitoring and model lifecycle.</p>"
    },
    {
     "n": 21,
     "prompt": "<p>Employees must use an agent inside Microsoft Teams. The agent must use a fine-tuned model deployed in Microsoft Foundry and custom multi-step orchestration logic that the team controls. What should you recommend?</p>",
     "choices": [
      "A declarative agent for Microsoft 365 Copilot with detailed instructions",
      "A custom engine agent using the Foundry model, published to Teams",
      "A SharePoint agent scoped to the team's document library",
      "A prompt saved in the organization's prompt library for Copilot Chat"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>When you need your own model or orchestration, you build a custom engine agent rather than extending Microsoft 365 Copilot. Custom engine agents can still be published to Teams.</p><p>Declarative agents and SharePoint agents use the Microsoft 365 Copilot orchestrator and models, so they cannot use a custom fine-tuned model or custom orchestration. A saved prompt is not an agent and has no custom logic.</p>"
    },
    {
     "n": 22,
     "prompt": "<p>A Copilot Studio agent is grounded on hundreds of long engineering PDFs that contain complex tables. Users report that answers miss table values and cite the wrong sections. Which data processing approach should you recommend?</p>",
     "choices": [
      "Extract tables with layout, chunk by section, and index for hybrid search",
      "Merge all PDFs into one large file so the model sees the complete context",
      "Convert the PDFs to scanned images to preserve the original table layout",
      "Increase the agent's response length so that it includes more of each document"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Layout-aware extraction (for example with Document Intelligence), semantically meaningful chunking with metadata, and hybrid (keyword and vector) indexing in Azure AI Search improve retrieval precision and citation accuracy.</p><p>One huge file makes retrieval less precise. Images remove machine-readable text. Longer responses do not fix the retrieval of the wrong passages.</p>"
    },
    {
     "n": 23,
     "prompt": "<p>A company uses Dynamics 365 Sales, Dynamics 365 Customer Service, and Dynamics 365 Finance. A Copilot-assisted quote-to-cash process spans all three apps. How should you design testing?</p>",
     "choices": [
      "Test each app's Copilot features in isolation and assume integration works",
      "Run the scenarios in production with real customers during a quiet period",
      "Build end-to-end business scenarios in integrated sandboxes that verify handoffs",
      "Depend on Microsoft's release validation for the cross-app process"
     ],
     "answer": 2,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "hard",
     "explanation": "<p>End-to-end tests should follow the real business process across apps, using representative data in connected nonproduction environments, and verify data handoffs between apps as well as the quality of AI-generated outputs at each step.</p><p><em>Isolated testing</em> misses integration defects where processes cross app boundaries. <em>Testing in production</em> risks real customer impact and data. <em>Microsoft's release validation</em> cannot cover your configuration, data, and integrations.</p>"
    },
    {
     "n": 24,
     "prompt": "<p>A partner hosts a logistics agent on another vendor's platform and exposes it through the Agent2Agent (A2A) protocol. Your Copilot Studio agent must delegate shipment-tracking conversations to it. What should you recommend?</p>",
     "choices": [
      "Index the partner agent's conversation logs with a Copilot connector",
      "Connect the partner agent to your agent by using the A2A protocol",
      "Rebuild the partner agent's logic as topics inside your Copilot Studio agent",
      "Use computer use to operate the partner's website on behalf of each user"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>A2A is designed for agent-to-agent communication and delegation across platforms, letting your agent hand work to the partner agent while each keeps its own logic.</p><p>Indexing logs provides searchable content, not live delegation. Rebuilding the logic duplicates and diverges from the partner's agent. Computer use automates user interfaces and is fragile for this scenario.</p>"
    },
    {
     "n": 25,
     "prompt": "<p>Utility inspectors use a Power Apps canvas app on tablets. They photograph pole equipment, and the app must flag visible damage, record the result, and start a repair work order when damage is detected. Which design should you recommend?</p>",
     "choices": [
      "A prompt action in Copilot Studio that reads the photo file name",
      "A Power BI visual that highlights damaged equipment after each upload",
      "An AI Builder object detection model in the app that triggers a flow",
      "A CLU model that classifies the inspector's spoken notes only"
     ],
     "answer": 2,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>An AI Builder object detection model trained on labeled images can be called from a canvas app to detect damage in photos, and the result can trigger a Power Automate flow to create the work order.</p><p>A file name does not reveal damage. Power BI reports on data after the fact and cannot trigger in-app processing. CLU interprets text, not images.</p>"
    },
    {
     "n": 26,
     "prompt": "<p>You are reviewing prompts for an organization's prompt library. One entry reads: 'Summarize this.' Which revision BEST aligns with Copilot prompt best practices?</p>",
     "choices": [
      "Shorten the prompt to a single word so it is easier to reuse",
      "State the goal, add context, name the source, and set the expected format",
      "Append 'be accurate' and leave the rest of the prompt unchanged",
      "Rewrite the prompt in capital letters to stress its importance"
     ],
     "answer": 1,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "medium",
     "explanation": "<p>Effective Copilot prompts state the goal, provide context such as audience and purpose, reference the sources to use, and set expectations for format and length. Validating library prompts against these elements improves consistency.</p><p>A <em>single word</em> removes the information the model needs. <em>'Be accurate'</em> is vague and does not supply goal, context, or format. <em>Capital letters</em> add emphasis but no useful information.</p>"
    },
    {
     "n": 27,
     "prompt": "<p>A sales organization uses Dynamics 365 Sales and receives thousands of inbound leads. It wants an agent that researches leads, qualifies them, and engages prospects with minimal build effort. What should you recommend?</p>",
     "choices": [
      "The Customer Intent Agent in Dynamics 365 Customer Service",
      "The Supplier Communications Agent in Dynamics 365 Supply Chain Management",
      "The prebuilt Sales Qualification Agent in Dynamics 365 Sales",
      "A custom Foundry agent built from scratch for lead qualification"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>The Sales Qualification Agent is a prebuilt agent designed to research, qualify, and engage leads inside Dynamics 365 Sales, matching the requirement with low effort.</p><p>The Customer Intent Agent discovers service intents from conversations. The Supplier Communications Agent follows up with vendors on purchase orders. A custom Foundry agent adds build effort when a prebuilt agent fits.</p>"
    },
    {
     "n": 28,
     "prompt": "<p>A global retailer wants a shopping assistant that runs in Microsoft Teams and on its public website. It must use the retailer's own orchestration logic and a model selected from Microsoft Foundry, and integrate with proprietary recommendation services. Which approach should you recommend?</p>",
     "choices": [
      "A custom engine agent built with the Microsoft 365 Agents SDK",
      "A declarative agent created with Agent Builder",
      "A SharePoint agent shared across the organization",
      "A prompt action added to the existing Copilot Studio support agent"
     ],
     "answer": 0,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Custom engine agents use their own orchestrator and models (for example from Microsoft Foundry) and can be delivered to multiple channels, including Teams and websites, through the Microsoft 365 Agents SDK.</p><p>Declarative agents run on Microsoft 365 Copilot's orchestrator and are not designed for public websites. SharePoint agents are internal and content-scoped. A prompt action is a component, not a multi-channel agent with custom orchestration.</p>"
    },
    {
     "n": 29,
     "prompt": "<p>An agent built in Foundry Agent Service must block hateful and violent content and detect jailbreak attempts in user prompts. Which solution constraint should you configure?</p>",
     "choices": [
      "A higher temperature setting so that the model avoids unsafe completions",
      "A longer maximum response length so that the model can add safety disclaimers",
      "Guardrails with content filters and prompt shields",
      "An instruction asking users to promise that they will not misuse the agent"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Microsoft Foundry provides configurable guardrails, including content filters for harm categories and prompt shields that detect jailbreak and prompt injection attempts.</p><p>Temperature affects randomness, not safety. Longer responses do not prevent harmful content. User promises are not a technical control.</p>"
    },
    {
     "n": 30,
     "prompt": "<p>A grants agency's Copilot Studio agent must determine applicant eligibility by working through many interdependent rules and exceptions before answering. Accuracy matters more than speed. Which agent behavior should you enable?</p>",
     "choices": [
      "Voice mode so applicants can speak their answers",
      "A higher temperature setting for more creative and varied answers",
      "Conversation Start greetings that list the eligibility rules",
      "Reasoning with a deep reasoning model for the eligibility step"
     ],
     "answer": 3,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "medium",
     "explanation": "<p>Reasoning models are designed for complex, multi-step problem solving and can be applied in Copilot Studio where accuracy on complicated logic matters more than latency.</p><p>Voice mode changes the input modality, not the analysis quality. Higher temperature increases variability and can reduce accuracy. Listing rules in a greeting does not evaluate them.</p>"
    },
    {
     "n": 31,
     "prompt": "<p>Makers in a utility company want to deploy Copilot Studio agents from development to production without learning Azure DevOps, but IT requires approvals and a consistent process. What should you recommend?</p>",
     "choices": [
      "Manual solution exports by each maker sent to IT by email",
      "Pipelines in Power Platform with approvals in a Managed Environment",
      "Azure Site Recovery to replicate the development environment",
      "Dataverse backup in dev and restore into the production environment"
     ],
     "answer": 1,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "medium",
     "explanation": "<p>Pipelines in Power Platform provide in-product, admin-governed deployments of solutions between environments, with support for approvals, so makers can deploy without building their own CI/CD.</p><p><em>Emailed exports</em> are manual, inconsistent, and hard to audit. <em>Azure Site Recovery</em> is for disaster recovery of infrastructure, not application lifecycle. <em>Backup and restore</em> overwrites the whole environment rather than deploying specific components.</p>"
    },
    {
     "n": 32,
     "prompt": "<p>A retailer's Copilot Studio agent must never discuss competitor pricing and must hand refund requests above a set amount to a human. Which design BEST enforces these rules?</p>",
     "choices": [
      "Add competitor websites as knowledge sources so the agent knows what not to say",
      "Rely on the default model behavior because it never discusses competitors",
      "Restrict it in the instructions and use a topic that escalates large refunds",
      "Disable all topics so generative answers handle every refund decision"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Instructions shape generative behavior and boundaries, while a topic provides a deterministic path for rules that must always be enforced, such as escalation above a threshold.</p><p>Adding competitor sites increases the chance of discussing them. Default model behavior does not know your business rules. Removing topics removes the deterministic control you need for escalation.</p>"
    },
    {
     "n": 33,
     "prompt": "<p>A Power Platform administrator wants to control which Model Context Protocol (MCP) servers makers can add to Copilot Studio agents in production environments. What should you recommend?</p>",
     "choices": [
      "Disable generative orchestration in all of the production agents",
      "Govern the MCP connectors with Power Platform data policies",
      "Ask makers to document MCP servers in a SharePoint list",
      "Block Computer Use in the Microsoft 365 admin center"
     ],
     "answer": 1,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "medium",
     "explanation": "<p>MCP servers are added to Copilot Studio through connectors, so Power Platform data policies (DLP) can allow or block those connectors per environment.</p><p>Disabling generative orchestration cripples agents rather than governing MCP specifically. Documentation is not an enforceable control. Computer Use is unrelated to MCP server access.</p>"
    },
    {
     "n": 34,
     "prompt": "<p>A Copilot Studio agent uses SharePoint as a knowledge source with user authentication. A manager and an intern ask the same question. What should you expect?</p>",
     "choices": [
      "Both users receive identical answers based on the agent maker's permissions",
      "Each user gets answers based only on content that user can access",
      "The intern receives an error because knowledge sources require administrator rights",
      "Both users see all content because the agent bypasses SharePoint permissions"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>With user authentication, SharePoint knowledge retrieval respects the signed-in user's permissions, so answers can differ based on access.</p><p>Answers are not based on the maker's permissions in this configuration. Knowledge sources do not require administrator rights. The agent does not bypass SharePoint permissions.</p>"
    },
    {
     "n": 35,
     "prompt": "<p>Auditors ask a lender to show exactly which training data produced each version of its credit-risk model built in Microsoft Foundry. Today, data scientists overwrite the training files in place. What should you recommend?</p>",
     "choices": [
      "Keep overwriting the files but add the date to each folder name",
      "Register versioned data assets and record their lineage with each model version",
      "Retain only the most recent dataset to reduce storage costs",
      "Email a copy of each dataset to the compliance team after training"
     ],
     "answer": 1,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "hard",
     "explanation": "<p>ALM for model data requires immutable, versioned datasets and lineage that links each registered model version to the exact data version, code, and parameters that produced it. This enables reproducibility and audit.</p><p><em>Dated folders over overwritten files</em> still lose earlier content and lack formal lineage. <em>Keeping only the latest</em> makes earlier model versions impossible to reproduce. <em>Emailing datasets</em> spreads sensitive data and provides no reliable lineage.</p>"
    },
    {
     "n": 36,
     "prompt": "<p>A hospital wants a Copilot Studio agent to use Computer Use to enter referrals into a desktop scheduling application that runs only on machines inside the hospital network. Which design should you recommend?</p>",
     "choices": [
      "Run Computer Use on a registered machine inside the network",
      "Use the hosted browser that Microsoft provides for Computer Use",
      "Expose the scheduling database directly through a public endpoint",
      "Replace Computer Use with a SharePoint agent for referrals"
     ],
     "answer": 0,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Computer Use can run on machines that you register and manage, which allows automation of desktop applications that are reachable only from the internal network.</p><p>A Microsoft-hosted browser cannot reach an on-premises desktop application. Publishing the database to the internet creates serious security risk. A SharePoint agent answers questions and cannot operate the scheduling application.</p>"
    },
    {
     "n": 37,
     "prompt": "<p>A marketing team wants to fine-tune a large language model so that generated copy follows the brand voice. They have not yet tried detailed instructions or examples. What should you recommend?</p>",
     "choices": [
      "Start with prompting and examples, and fine-tune only if results fall short",
      "Fine-tune immediately, because fine-tuning is always cheaper than prompting",
      "Train a new foundation model, because brand voice cannot be taught by examples",
      "Avoid AI for marketing copy, because models cannot follow a style guide"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Custom models should be created when simpler techniques such as prompt engineering, few-shot examples, and grounding cannot meet measurable requirements. Fine-tuning adds data, training, hosting, and maintenance costs.</p><p>Fine-tuning is not always cheaper and adds lifecycle overhead. Training a foundation model is far beyond the need. Models can follow style guidance well with good prompts and examples.</p>"
    },
    {
     "n": 38,
     "prompt": "<p>A team extended Copilot in Dynamics 365 Sales with custom prompts and an agent built in Copilot Studio. How should these components be promoted from development to production?</p>",
     "choices": [
      "Edit the production environment directly to keep the versions in sync",
      "Package them as a deployable package in Lifecycle Services",
      "Re-create the prompts and agent in production from a checklist",
      "Include them in a Dataverse solution and deploy it as managed"
     ],
     "answer": 3,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "medium",
     "explanation": "<p>Customizations built on Dataverse and Copilot Studio are solution-aware. Packaging them in a solution and deploying managed solutions through a pipeline provides consistent, reversible promotion, after which feature settings are configured in the target environment.</p><p><em>Direct production edits</em> bypass testing and create unmanaged layers. <em>Lifecycle Services deployable packages</em> are used for finance and operations code, not Dataverse-based Sales customizations. <em>Re-creating from a checklist</em> is manual and error-prone.</p>"
    },
    {
     "n": 39,
     "prompt": "<p>A product team wants its Copilot Studio project agent available in its Microsoft Teams team so that any member can mention the agent in a channel conversation and get answers from the project knowledge base. What should you recommend?</p>",
     "choices": [
      "Share the agent's test-pane link with each individual team member",
      "Convert the agent into a SharePoint page web part only",
      "Publish the agent to Teams and add it to the team's channel",
      "Email a weekly export of the agent's answers to the team"
     ],
     "answer": 2,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "medium",
     "explanation": "<p>Publishing a Copilot Studio agent to the Teams channel and installing it in a team allows members to mention it in channel conversations, bringing answers into the collaborative workflow.</p><p>The test pane is for makers, not production use. A SharePoint web part does not provide in-channel mentions. Weekly exports are not interactive.</p>"
    },
    {
     "n": 40,
     "prompt": "<p>A service desk must classify millions of tickets per month into a fixed set of 20 categories. Latency and per-request cost are critical, and thousands of labeled examples exist. Which approach is MOST appropriate?</p>",
     "choices": [
      "Fine-tune a small language model on the labeled tickets",
      "Send every ticket to the most capable large reasoning model with a long prompt",
      "Have a Copilot Studio agent ask each customer to choose a category manually",
      "Train a new large language model from scratch on all historical tickets"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Small language models fine-tuned for a narrow, high-volume task deliver low latency and lower cost while achieving strong accuracy with good labeled data.</p><p>A large reasoning model is slower and more expensive than necessary for fixed classification. Asking customers to categorize shifts work to users and is error-prone. Training an LLM from scratch is unjustified.</p>"
    },
    {
     "n": 41,
     "prompt": "<p>A policy agent sometimes invents section numbers when the retrieved documents do not contain an answer. Which prompt engineering guideline should you apply?</p>",
     "choices": [
      "Instruct the agent to always provide an answer even if it must estimate details",
      "Remove citations from responses so users are not confused by section numbers",
      "Instruct it to answer only from sources and to say when no answer is found",
      "Ask the agent to answer from memory first and check sources only if asked"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Grounding instructions that restrict answers to retrieved content and allow an explicit 'not found' response reduce fabricated details.</p><p>Forcing an answer increases fabrication. Removing citations hides the problem and reduces transparency. Answering from memory first works against grounding.</p>"
    },
    {
     "n": 42,
     "prompt": "<p>A data science team fine-tuned a model in Microsoft Foundry for summarizing adverse-event reports. Before a Copilot Studio agent uses it in production, what should the architect require?</p>",
     "choices": [
      "Deploy the model immediately and collect user complaints as validation",
      "Check that the training job finished without errors and then deploy it broadly",
      "Ask the data scientists to review three sample outputs informally",
      "Run Foundry evaluations on held-out data and compare with the base model"
     ],
     "answer": 3,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Systematic evaluation in Microsoft Foundry, using held-out data and metrics such as groundedness, relevance, and safety, and comparing with the base model, confirms that fine-tuning improved quality before deployment.</p><p>Using production users as testers creates risk in a safety-critical domain. A successful training job says nothing about output quality. Three informal samples are not statistically meaningful.</p>"
    },
    {
     "n": 43,
     "prompt": "<p>A retailer has a fine-tuned product-recommendation model in production. A new version scored better offline. The business wants to limit the risk of a bad release. What should you recommend?</p>",
     "choices": [
      "Replace the current deployment in place during a maintenance window",
      "Deploy the new version next to the current one and shift traffic gradually",
      "Delete the current version immediately to avoid accidental fallback",
      "Release the new version to all users and review results next quarter"
     ],
     "answer": 1,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "hard",
     "explanation": "<p>A staged rollout keeps the proven version available, routes a small share of traffic to the new version, monitors quality and business metrics, and expands or rolls back based on results.</p><p><em>In-place replacement</em> removes the easy path to roll back. <em>Deleting the current version</em> eliminates rollback entirely. <em>Full release with delayed review</em> exposes everyone to an unproven model for months.</p>"
    },
    {
     "n": 44,
     "prompt": "<p>Business units are submitting many overlapping agent ideas, and several teams have built nearly identical agents. As the AI Center of Excellence lead, what should you establish?</p>",
     "choices": [
      "Central intake with value-based prioritization and a reusable agent catalog",
      "A rule that only the CoE may build agents, with all other teams blocked",
      "A policy that each business unit independently selects its own platforms and standards",
      "A quarterly hackathon that replaces the need for any intake process"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>An AI CoE reduces duplication by providing intake, prioritization against business value, and discoverable reusable assets, while still enabling business units to build.</p><p>Blocking all other teams creates a bottleneck. Letting each unit pick its own standards increases fragmentation. Hackathons generate ideas but do not provide ongoing governance or reuse.</p>"
    },
    {
     "n": 45,
     "prompt": "<p>A software company's support team uses ServiceNow as its service system and works in Outlook and Teams. Representatives want Copilot to summarize customer emails with case context and draft replies grounded in the company knowledge base. What should you recommend?</p>",
     "choices": [
      "Migrate every case to Dynamics 365 Customer Service before enabling Copilot",
      "Use Microsoft 365 Copilot for Sales and map service cases to opportunities",
      "Build Power BI reports over ServiceNow cases for representatives to read",
      "Configure Copilot for Service with ServiceNow and the knowledge base"
     ],
     "answer": 3,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Microsoft 365 Copilot for Service works with third-party service systems as well as Dynamics 365, bringing case context and knowledge-grounded assistance into Outlook and Teams.</p><p>Migration is not required for Copilot for Service. Copilot for Sales targets sellers and CRM opportunities, not service cases. Power BI reports do not provide drafting assistance in the flow of work.</p>"
    },
    {
     "n": 46,
     "prompt": "<p>A European manufacturer requires that prompts and completions for its Microsoft Foundry model deployment are processed only within the EU. Which deployment choice should you recommend?</p>",
     "choices": [
      "A regional Standard or EU Data Zone deployment instead of Global",
      "Customer-managed keys on a Global Standard deployment",
      "A private endpoint on a Global Standard deployment",
      "An EU-hosted web app that calls a Global Standard deployment"
     ],
     "answer": 0,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "medium",
     "explanation": "<p>Global deployment types may process requests in any Azure region. Data Zone deployments keep processing within a geographic zone such as the EU, and regional Standard deployments process in the deployment's region, which meets the processing-location requirement.</p><p><em>Customer-managed keys</em> control encryption at rest, not where inference is processed. A <em>private endpoint</em> secures network access but does not limit processing location. An <em>EU-hosted web app</em> does not change where a Global deployment processes data.</p>"
    },
    {
     "n": 47,
     "prompt": "<p>A Copilot Studio pilot with 50 users had low costs. Production projections for 20,000 users with autonomous agents running on triggers are much higher than expected. Which TCO component was MOST likely underestimated?</p>",
     "choices": [
      "The one-time cost of creating the first version of the agent",
      "The cost of the Microsoft Entra ID tenant used for sign-in",
      "The cost of writing and revising the agent's instructions during the pilot",
      "Usage-based consumption that scales with volume and autonomous runs"
     ],
     "answer": 3,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>Agent costs often include consumption billed by usage. Moving from a small pilot to enterprise scale, especially with autonomous triggers, multiplies consumption.</p><p>Initial build and instruction writing are one-time costs that do not scale with users. Identity costs are not the driver of a dramatic increase in agent consumption.</p>"
    },
    {
     "n": 48,
     "prompt": "<p>A distributor uses the Copilot chat experience in Dynamics 365 Finance. Controllers want the chat to also answer questions about internal close policies stored in SharePoint and to look up exchange-rate data from an external service. What should you recommend?</p>",
     "choices": [
      "Create a separate SharePoint agent and ask controllers to switch between agents",
      "Extend the finance and operations agent in Copilot Studio",
      "Write X++ code that copies SharePoint policies into the Finance database",
      "Replace the Finance Copilot chat with a custom engine agent from scratch"
     ],
     "answer": 1,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "hard",
     "explanation": "<p>The finance and operations Copilot chat is built on Copilot Studio, so you can extend it with additional knowledge sources such as SharePoint and with actions or connectors for external data, keeping one experience for users.</p><p>Separate agents fragment the experience. Copying documents into the database is brittle and duplicates data. Rebuilding from scratch discards built-in app context and adds unnecessary effort.</p>"
    },
    {
     "n": 49,
     "prompt": "<p>An agent will save 10 minutes per case on 60,000 cases per year. The fully loaded labor cost is $60 per hour, and the agent's total annual cost is $250,000. What are the annual net benefit and ROI?</p>",
     "choices": [
      "$600,000 net benefit and an ROI of 240%",
      "$350,000 net benefit and an ROI of 140%",
      "$350,000 net benefit and an ROI of 58%",
      "$100,000 net benefit and an ROI of 40%"
     ],
     "answer": 1,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "hard",
     "explanation": "<p>Time saved is 10 x 60,000 = 600,000 minutes, or 10,000 hours. At $60 per hour, the gross benefit is $600,000. Net benefit is $600,000 - $250,000 = $350,000, and ROI = $350,000 / $250,000 = 140%.</p><p>$600,000 is the gross benefit, not the net. 58% divides net benefit by gross benefit rather than by cost. $100,000 and 40% come from an incorrect hours calculation.</p>"
    },
    {
     "n": 50,
     "prompt": "<p>A customer service director notices that representatives repeatedly solve the same new issues but the knowledge base does not contain articles for them. Which Dynamics 365 Customer Service agent should you recommend?</p>",
     "choices": [
      "Customer Intent Agent",
      "Sales Qualification Agent",
      "Customer Knowledge Management Agent",
      "Supplier Communications Agent"
     ],
     "answer": 2,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>The Customer Knowledge Management Agent helps keep the knowledge base current by generating and updating knowledge articles from resolved cases and conversations.</p><p>Customer Intent Agent discovers intents to improve self-service and routing, not articles. Sales Qualification handles leads. Supplier Communications handles vendor purchase orders.</p>"
    },
    {
     "n": 51,
     "prompt": "<p>A company's Power Platform environment is in a region where some generative AI features in Copilot Studio require data to move to another geography. Compliance prohibits data leaving the region. What should the administrator do?</p>",
     "choices": [
      "Enable cross-geography data movement and inform users afterward",
      "Move the environment to another tenant in a different country",
      "Disable all Copilot Studio agents across the entire tenant",
      "Keep cross-geography data movement off and document the affected features"
     ],
     "answer": 3,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "hard",
     "explanation": "<p>Power Platform lets administrators control whether data can move across geographic locations for generative AI features. Leaving it disabled honors the compliance requirement; the architect should confirm which features remain available and document the impact.</p><p><em>Enabling movement</em> directly violates the stated compliance rule. <em>Moving to another tenant</em> is disruptive and does not address the rule. <em>Disabling all agents</em> is excessive when only certain features are affected.</p>"
    },
    {
     "n": 52,
     "prompt": "<p>A commodities trader's proprietary pricing logic is its main competitive advantage. It wants AI to generate price recommendations using that logic and its own market data. Which approach should you recommend?</p>",
     "choices": [
      "Build a custom solution in Foundry that keeps the logic under its control",
      "Buy a generic pricing SaaS product and replace the proprietary logic with its defaults",
      "Use Microsoft 365 Copilot Chat with prompts that describe the pricing rules each time",
      "Use a prebuilt sales agent and ask it to infer the pricing logic from emails"
     ],
     "answer": 0,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "hard",
     "explanation": "<p>Build is appropriate when the capability is a competitive differentiator that requires full control over logic, data, and models.</p><p>A generic product would discard the differentiator. Re-describing rules in chat prompts is unreliable and ungoverned. A prebuilt sales agent is not designed to implement proprietary pricing algorithms.</p>"
    },
    {
     "n": 53,
     "prompt": "<p>A B2B software company receives hundreds of inbound leads per week. Sales development representatives cannot research each one. Leadership wants an agent that researches leads, prioritizes them, and drafts personalized outreach for sellers to review. What should you recommend?</p>",
     "choices": [
      "Sales Qualification Agent in Dynamics 365 Sales",
      "Customer Knowledge Management Agent in Customer Service",
      "Analyst agent in Microsoft 365 Copilot",
      "Facilitator agent in Microsoft Teams"
     ],
     "answer": 0,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>The Sales Qualification Agent autonomously researches and qualifies inbound leads and can prepare personalized outreach, so sellers focus on the highest-potential leads.</p><p>Knowledge Management builds service articles. Analyst performs data analysis on files. Facilitator assists with meetings; none of them qualify leads.</p>"
    },
    {
     "n": 54,
     "prompt": "<p>You deployed a model router in Microsoft Foundry for a customer support solution. What should you monitor to confirm that it is delivering the expected value?</p>",
     "choices": [
      "Only the total number of requests, because routing decisions are not observable",
      "Only latency, because model routers do not affect cost",
      "Which underlying models handle requests, plus cost and quality metrics",
      "Nothing, because model routers guarantee the best answer for every request"
     ],
     "answer": 2,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>A model router's value is the balance of cost and quality. Monitoring model selection, cost, and quality evaluations confirms the routing performs well on your workload.</p><p>Request counts alone do not show value. Routers are used largely to optimize cost, so cost must be tracked. No routing approach guarantees the best answer, so evaluation is still required.</p>"
    },
    {
     "n": 55,
     "prompt": "<p>An HR agent will be grounded on SharePoint sites that contain some overshared salary documents. Employees must only receive answers from content they are permitted to view. What should you recommend?</p>",
     "choices": [
      "Have the agent connect with the maker's credentials for every user",
      "Copy the HR content into a public site that everyone can read",
      "Use end-user authentication and fix oversharing before launch",
      "Turn off authentication so the agent responds faster to employees"
     ],
     "answer": 2,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "medium",
     "explanation": "<p>With user authentication, retrieval respects each user's permissions. Because permissions are only as good as the underlying access, oversharing must be remediated, for example with SharePoint Advanced Management and Purview data security tools, before broad rollout.</p><p><em>Maker credentials</em> expose everything the maker can read to every user. A <em>public site</em> removes access control entirely. <em>No authentication</em> prevents permission trimming and identity-based auditing.</p>"
    },
    {
     "n": 56,
     "prompt": "<p>A collections team in Dynamics 365 Finance wants to quickly understand a customer's credit and payment history and send a personalized payment reminder without writing it from scratch. Which capability should you recommend?</p>",
     "choices": [
      "Customer Insights - Journeys real-time journeys",
      "Copilot for Service email summaries in Outlook",
      "Supply Chain Management demand planning",
      "Copilot collections summaries and email drafts"
     ],
     "answer": 3,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Copilot in Dynamics 365 Finance supports collections coordinators with customer summaries and generated reminder emails based on payment and credit data.</p><p>Real-time journeys orchestrate marketing campaigns. Copilot for Service targets service representatives. Demand planning forecasts supply needs, not receivables.</p>"
    },
    {
     "n": 57,
     "prompt": "<p>Three months into a Microsoft 365 Copilot rollout, financial savings cannot yet be measured reliably. Which indicators should you track now to show progress toward ROI?</p>",
     "choices": [
      "Only the final annual cost savings, ignoring all other measures until year end",
      "Only the number of licenses purchased, because purchases indicate value",
      "Only the number of prompts in the prompt library, regardless of their usage",
      "Leading indicators such as active usage, task completion, and satisfaction"
     ],
     "answer": 3,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>Leading indicators such as adoption, engagement, time saved per task, and satisfaction predict later financial outcomes and help course-correct early.</p><p>Waiting a year removes the chance to intervene. License count measures spend, not value. Prompt library size measures content, not adoption or outcomes.</p>"
    },
    {
     "n": 58,
     "prompt": "<p>A pharmaceutical company fine-tunes models in Microsoft Foundry using sensitive research data. Only the ML platform team may start fine-tuning jobs or read the training data. Which approach BEST enforces this?</p>",
     "choices": [
      "One shared API key distributed to the ML platform team members",
      "A Conditional Access policy requiring compliant devices only",
      "Least-privilege Azure RBAC roles with managed identities and no key auth",
      "Sensitivity labels applied to the training files in storage"
     ],
     "answer": 2,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "hard",
     "explanation": "<p>Azure role-based access control scoped to the Foundry resources and storage limits who can run tuning and read data. Managed identities and disabling key-based authentication remove shared secrets so every action is tied to an identity and auditable.</p><p>A <em>shared API key</em> cannot distinguish users and is easily leaked. <em>Conditional Access</em> evaluates sign-in conditions but does not grant or restrict specific resource permissions. <em>Sensitivity labels</em> classify content but do not by themselves govern fine-tuning job permissions.</p>"
    },
    {
     "n": 59,
     "prompt": "<p>A project-based firm wants an agent in Teams meetings that keeps an agenda, takes collaborative notes in real time, and tracks follow-up tasks for participants. Which prebuilt Microsoft 365 agent should you recommend?</p>",
     "choices": [
      "Facilitator",
      "Researcher",
      "Analyst",
      "Employee Self-Service"
     ],
     "answer": 0,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Facilitator supports meetings and chats by managing agendas, taking notes collaboratively, and tracking action items.</p><p>Researcher produces in-depth research reports. Analyst analyzes data. Employee Self-Service answers HR and IT policy questions.</p>"
    },
    {
     "n": 60,
     "prompt": "<p>A company is deciding whether to build its own employee chat assistant on Foundry models or buy Microsoft 365 Copilot. Which factor MOST strongly favors buying?</p>",
     "choices": [
      "The need to own, modify, and version every step of the orchestration algorithm",
      "The desire to choose and fine-tune a specific model for a niche task",
      "Broad productivity needs across Microsoft 365 with minimal operations effort",
      "A strategic goal to differentiate through a proprietary assistant experience"
     ],
     "answer": 2,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>Buying fits broad, common needs where a SaaS product already integrates with your apps and data, delivering faster time to value and lower operational burden.</p><p>Owning the orchestration, fine-tuning a specific model, and building a differentiated proprietary experience are all reasons to build rather than buy.</p>"
    }
   ]
  }
 ]
};
