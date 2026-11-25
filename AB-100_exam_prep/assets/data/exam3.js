window.AB1_DATA = window.AB1_DATA || {};
window.AB1_DATA.exam3 = {
 "id": "exam3",
 "name": "AB-100 — Practice Exam 3",
 "timeMinutes": 100,
 "units": [
  {
   "title": "",
   "html": "",
   "questions": [
    {
     "n": 1,
     "prompt": "<p>An equipment maker stores product specifications in both a PLM system and a set of marketing spreadsheets, and the two often disagree. A technical support agent must give accurate specifications. What should you recommend?</p>",
     "choices": [
      "Treat the PLM system as the authoritative source and ground only on it",
      "Ground the agent on both sources and let the model average conflicting values",
      "Ground the agent on the marketing spreadsheets because they are easier to read",
      "Ask users to confirm each specification with the agent before it answers"
     ],
     "answer": 0,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>Accuracy requires a single system of record. Grounding on the authoritative source prevents the agent from returning conflicting or wrong specifications.</p><p>Averaging conflicting values produces numbers that may match neither source. Readability does not make marketing spreadsheets accurate. Users cannot validate specifications they are asking about.</p>"
    },
    {
     "n": 2,
     "prompt": "<p>A wealth management firm uses Copilot in a Dynamics 365 customer experience app over Dataverse. Advisors ask questions such as 'Which of my premier households have not been contacted this quarter?' Copilot cannot map 'premier household' to accounts with a Relationship Tier value of 1. Which approach is MOST maintainable?</p>",
     "choices": [
      "Define 'premier household' as a business term mapped to the column value",
      "Train advisors to use exact column names and option values in every question",
      "Create a calculated column named Premier Household on the account table",
      "Build a Copilot Studio topic for each question that advisors commonly ask"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Business terms let you describe organization-specific vocabulary, including how it maps to data, so Copilot can interpret natural-language questions consistently without schema changes or retraining users.</p><p>Forcing users to speak in schema terms defeats the purpose of natural language. Adding calculated columns for every phrase bloats the schema and does not scale. Topic-per-question design is brittle and does not cover new phrasings.</p>"
    },
    {
     "n": 3,
     "prompt": "<p>After a release, a Copilot Studio agent's escalation rate doubled. Session volume is flat and satisfaction for resolved sessions is unchanged. What should you do FIRST?</p>",
     "choices": [
      "Drill into topic-level escalations and transcripts from after the release",
      "Assume the language model degraded and request a newer model",
      "Attribute the rise to seasonal demand and wait for it to settle",
      "Check whether users have lost their Microsoft 365 licenses"
     ],
     "answer": 0,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "hard",
     "explanation": "<p>A sudden change right after a release, with flat volume, points to something in the release. Topic-level analytics show where escalations increased, and transcripts reveal whether a changed topic, action, or condition now hands off users unnecessarily.</p><p><em>Model degradation</em> is speculation and would likely affect satisfaction too. <em>Seasonal demand</em> is unlikely because session volume did not change. <em>License loss</em> would prevent access, not increase escalations within sessions.</p>"
    },
    {
     "n": 4,
     "prompt": "<p>Executives will ask a data agent questions about revenue, and answers must match the figures in official board reports. The data exists in raw lakehouse tables and in a certified semantic model used by those reports. What should you recommend?</p>",
     "choices": [
      "Ground the agent on the raw lakehouse tables so it can calculate revenue its own way",
      "Ground the agent on exported board report PDFs and let it read the charts",
      "Ground the agent on both sources and present whichever number is higher",
      "Ground the agent on the certified semantic model with official measures"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>A certified semantic model encodes agreed business logic and measure definitions, so analytics answers stay consistent with official reporting.</p><p>Raw tables let the agent compute revenue differently from the official definition. Reading charts from PDFs is imprecise and cannot answer new questions. Choosing the higher number is not a valid reconciliation.</p>"
    },
    {
     "n": 5,
     "prompt": "<p>A telecom provider's Dynamics 365 Contact Center receives chats about billing, outages, and device setup. It wants incoming conversations classified automatically and routed to representatives with the matching skills. What should you recommend?</p>",
     "choices": [
      "A single queue where representatives pick conversations at random",
      "A Copilot Studio agent that emails each conversation to a team lead",
      "A Power BI report that shows yesterday's conversation categories",
      "Unified routing with AI-based intent and skill classification"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Unified routing in Dynamics 365 Contact Center can use AI-based classification (such as intent and skill identification) to route work items to the best-qualified representatives.</p><p>A single unrouted queue ignores skills. Emailing conversations introduces delay and manual triage. Power BI reports are retrospective and do not route live work.</p>"
    },
    {
     "n": 6,
     "prompt": "<p>A support agent answers many questions with generative answers. The team wants an AI-assisted way to see which subjects users ask about most and where answers fall short, without reading every transcript. What should you use?</p>",
     "choices": [
      "A manual review of ten random transcripts each week",
      "Theme analysis in Copilot Studio analytics for generative answers",
      "Microsoft Purview eDiscovery searches across user mailboxes",
      "An Excel pivot table of session start times by weekday"
     ],
     "answer": 1,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>Copilot Studio analytics can group user questions into AI-generated themes, showing volume and answer performance by theme. This identifies gaps to tune without reading every transcript.</p><p>A <em>ten-transcript sample</em> is too small to reveal patterns reliably. <em>eDiscovery</em> supports legal investigations, not agent quality analysis. <em>Start times by weekday</em> show load patterns, not subjects or answer quality.</p>"
    },
    {
     "n": 7,
     "prompt": "<p>A company wants to automate a stable, rules-based process that copies approved invoice totals from one system into another with no variation in input format and no judgment required. Which recommendation is MOST appropriate?</p>",
     "choices": [
      "Use an autonomous agent with generative orchestration to decide each step at runtime",
      "Use a custom fine-tuned language model to interpret each invoice total",
      "Use the Researcher agent to investigate each invoice before copying the value",
      "Use a deterministic Power Automate cloud flow instead of a generative agent"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>Agents add the most value when inputs are unstructured, variable, or require reasoning. Stable rules-based processes are cheaper and more predictable with deterministic automation.</p><p>Generative orchestration adds cost and nondeterminism where none is needed. Fine-tuning a model to read a fixed numeric field is unnecessary. Researcher is designed for multi-step research, not data transfer.</p>"
    },
    {
     "n": 8,
     "prompt": "<p>An airline wants an autonomous agent to process compensation requests from incoming web forms. Requests under a set amount can be paid automatically, but higher amounts must be approved by a supervisor before payment. Which design BEST meets the requirement?</p>",
     "choices": [
      "An autonomous agent whose instructions ask the model to be careful with large payments",
      "An autonomous agent that calls an agent flow with a human approval step",
      "A prompt-and-response agent that supervisors query daily to find large requests",
      "A task agent that customers invoke from the airline website to approve their own payments"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Combining an event-triggered autonomous agent with a deterministic agent flow that enforces a human approval for amounts above the threshold provides automation with a reliable human-in-the-loop control.</p><p>Instructions alone do not enforce a hard financial control. A daily query process is manual and delays automation. Letting customers approve their own payments eliminates the control entirely.</p>"
    },
    {
     "n": 9,
     "prompt": "<p>A retail agent must tell customers whether an item is in stock at a specific store right now. Inventory changes every few minutes. How should the agent access inventory data?</p>",
     "choices": [
      "Index inventory snapshots as a knowledge source refreshed once per day",
      "Upload an inventory spreadsheet to the agent's knowledge during each release",
      "Call the inventory system through an action at question time",
      "Fine-tune a model on historical inventory levels to predict availability"
     ],
     "answer": 2,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>Rapidly changing, transactional data should be retrieved live through actions or connectors, which meets the timeliness requirement.</p><p>A daily index and release-time spreadsheet are stale within minutes. A model trained on history predicts trends but cannot report current stock levels.</p>"
    },
    {
     "n": 10,
     "prompt": "<p>A public-sector organization needs an employee-facing agent that answers questions only from approved policy documents. Security reviewers require that the agent cannot create, update, or delete data in any system. Which design should you recommend?</p>",
     "choices": [
      "A task agent with read and write connectors restricted by instructions",
      "An autonomous agent triggered when policy documents are updated",
      "A prompt-and-response agent with knowledge only and no tools",
      "An agent that uses Computer Use to browse the policy portal"
     ],
     "answer": 2,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>A prompt-and-response (retrieval) agent grounded only in approved knowledge, with no tools configured, cannot perform write operations, which satisfies the security requirement by design.</p><p>Write-capable connectors constrained only by instructions can still be misused. An autonomous agent acting on document changes adds unnecessary actions. Computer Use operates user interfaces and could perform actions.</p>"
    },
    {
     "n": 11,
     "prompt": "<p>Telemetry for a Foundry agent shows that most requests are simple intent classification, yet every request uses a large reasoning model, which drives high cost and latency. What is the BEST next step?</p>",
     "choices": [
      "Request a higher tokens-per-minute quota for the large model",
      "Fine-tune the large model so it classifies intents more quickly",
      "Add more knowledge sources to the agent to improve its accuracy",
      "Evaluate a smaller model on a dataset sampled from production traces"
     ],
     "answer": 3,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "hard",
     "explanation": "<p>Telemetry suggests the workload may not need a large model. Running the same evaluations on a smaller model with a representative dataset built from production traces shows whether quality holds, which justifies switching or routing simple requests.</p><p>A <em>higher quota</em> increases throughput but not efficiency. <em>Fine-tuning the large model</em> adds cost and does not change its size or latency profile much. <em>More knowledge sources</em> are unrelated to intent classification cost.</p>"
    },
    {
     "n": 12,
     "prompt": "<p>A company wants thousands of technical manuals to be reusable as grounding data for several Foundry agents and Copilot Studio agents. What should you recommend to make the content AI-ready?</p>",
     "choices": [
      "Store the manuals as a single merged file so agents load everything at once",
      "Keep the manuals on individual laptops and share them on request",
      "Convert the manuals to images so formatting is preserved for the models",
      "Chunk it, enrich it with metadata, and index it in shared Azure AI Search"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>Chunking, metadata enrichment, and a shared vector or hybrid index make large document sets retrievable and reusable across multiple AI systems.</p><p>A single merged file is inefficient to retrieve and exceeds practical context limits. Laptop storage is unavailable to agents. Images make text harder to retrieve and require extra processing.</p>"
    },
    {
     "n": 13,
     "prompt": "<p>A bank's compliance team requires that its customer-facing Copilot Studio agent only runs explicitly designed topics with fixed trigger phrases and never dynamically chains tools or generates answers from knowledge. Which configuration should you recommend?</p>",
     "choices": [
      "Classic orchestration with generative answers turned off",
      "Generative orchestration with detailed topic descriptions",
      "Generative orchestration with the reasoning model enabled",
      "Classic orchestration with conversational boosting enabled"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Classic orchestration triggers designed topics through NLU matching and, with generative answers disabled, does not dynamically plan or generate responses, which provides deterministic behavior.</p><p>Generative orchestration, with or without reasoning, dynamically selects and chains tools and knowledge. Conversational boosting generates answers from knowledge, which the compliance team prohibits.</p>"
    },
    {
     "n": 14,
     "prompt": "<p>Customer service transcripts that will ground a coaching agent contain names, phone numbers, and payment card numbers that the agent does not need. What should you recommend during data preparation?</p>",
     "choices": [
      "Index the transcripts unchanged and instruct the agent not to repeat personal data",
      "Encrypt the transcripts and give the agent the decryption key for retrieval",
      "Detect and redact unnecessary personal data before the transcripts are indexed",
      "Delete all transcripts and ground the agent on general model knowledge"
     ],
     "answer": 2,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "hard",
     "explanation": "<p>Data minimization reduces risk. Removing personal data the use case does not need, for example with PII detection in Foundry Tools, keeps the grounding data relevant and compliant.</p><p>Instructions alone do not reliably prevent disclosure of indexed data. Encryption at rest does not help if the agent decrypts and retrieves the data. Deleting all transcripts removes the content the coaching agent needs.</p>"
    },
    {
     "n": 15,
     "prompt": "<p>An autonomous Copilot Studio agent processes supplier invoices when emails arrive, without any user chatting with it. Operations staff need to confirm each run's trigger, steps, and outcome. What should they use?</p>",
     "choices": [
      "End-of-conversation satisfaction surveys collected by the agent",
      "Microsoft Teams channel analytics for the finance team",
      "The activity view for the agent's runs in Copilot Studio",
      "Microsoft 365 usage reports in the Microsoft 365 admin center"
     ],
     "answer": 2,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>Autonomous agents run from triggers rather than chats. Copilot Studio provides an activity view that shows each run, what triggered it, the steps and tools used, and the outcome, which supports monitoring and troubleshooting.</p><p><em>Satisfaction surveys</em> need a user in a conversation, which autonomous runs lack. <em>Teams channel analytics</em> show channel engagement, not agent runs. <em>Microsoft 365 usage reports</em> summarize product usage, not individual agent runs.</p>"
    },
    {
     "n": 16,
     "prompt": "<p>A health insurer wants to transcribe member calls with speaker separation, remove personal information from the transcripts, and then generate a summary for the case record. Which combination of Foundry Tools should you propose for the first two steps?</p>",
     "choices": [
      "Azure AI Translator and Azure AI Document Intelligence",
      "Azure AI Vision and Azure AI Content Safety",
      "Azure AI Search and Azure AI Translator",
      "Azure AI Speech diarization and Language PII detection"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Speech-to-text with diarization separates speakers in call audio, and the PII detection feature of Azure AI Language identifies and redacts personal information before summarization.</p><p>Translator and Document Intelligence handle language conversion and document extraction. Vision analyzes images and Content Safety detects harmful content. AI Search indexes content; none of these pairs transcribe audio and redact PII.</p>"
    },
    {
     "n": 17,
     "prompt": "<p>In the Cloud Adoption Framework AI adoption guidance, which area covers operational practices such as monitoring AI workloads, managing model versions and retirements, and maintaining business continuity?</p>",
     "choices": [
      "AI strategy",
      "AI plan",
      "Manage AI",
      "Govern AI"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Manage AI covers ongoing operations: deployment practices, monitoring, model lifecycle, and resiliency for AI workloads.</p><p>AI strategy defines direction and use cases. AI plan prepares skills, priorities, and proofs of concept. Govern AI defines policies and risk controls rather than day-to-day operations.</p>"
    },
    {
     "n": 18,
     "prompt": "<p>A team plans to upgrade the model behind its Foundry agent to a newer version. What is the BEST way to confirm the upgrade does not cause regressions?</p>",
     "choices": [
      "Rely on the model provider's published benchmark scores",
      "Switch all production traffic and watch user complaints",
      "Run the same evaluation dataset on both versions and gate on thresholds",
      "Spot-check five favorite questions in the playground"
     ],
     "answer": 2,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "hard",
     "explanation": "<p>Regression testing compares the current and candidate versions on the same representative dataset, with metrics such as groundedness, task adherence, and safety. A release gate based on thresholds prevents shipping a regression.</p><p><em>Public benchmarks</em> do not reflect your prompts, data, or tools. <em>Switching all traffic</em> makes users the test harness. <em>Five spot checks</em> are too few to detect regressions reliably.</p>"
    },
    {
     "n": 19,
     "prompt": "<p>A product support organization wants to ground a Copilot Studio agent on five years of resolved support tickets. The tickets contain customer names, emails, and phone numbers, and new tickets are closed every hour. Which data processing design should you recommend?</p>",
     "choices": [
      "Index the raw tickets and instruct the agent not to reveal personal data",
      "Export the tickets once to a static file and upload it as a knowledge source",
      "Redact PII during ingestion and refresh the index incrementally on a schedule",
      "Store the tickets in the agent instructions so that answers are always current"
     ],
     "answer": 2,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>Removing personal data before indexing prevents exposure at the source, and incremental scheduled indexing keeps grounding data timely as new tickets are resolved.</p><p>Relying on instructions to hide PII is unreliable and vulnerable to prompt manipulation. A one-time export becomes stale. Instructions are not a scalable or appropriate store for large datasets.</p>"
    },
    {
     "n": 20,
     "prompt": "<p>A company has limited AI engineering skills and wants the fastest value with the least infrastructure management. Under the CAF AI technology strategy, which option should it prioritize?</p>",
     "choices": [
      "SaaS AI such as Microsoft 365 Copilot and prebuilt agents",
      "IaaS with self-managed virtual machines hosting open-source models",
      "PaaS with custom models trained and deployed in Microsoft Foundry",
      "On-premises GPU clusters purchased to host models internally"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>The CAF technology strategy compares SaaS, PaaS, and IaaS. SaaS offers the fastest time to value and least management when skills are limited.</p><p>IaaS and on-premises clusters demand the most skills and management. PaaS with custom models suits teams that need customization and have engineering skills.</p>"
    },
    {
     "n": 21,
     "prompt": "<p>Employees want a single entry point for AI in Microsoft 365 Copilot. You have a Copilot Studio agent for procurement that delegates complex spend analysis to a Foundry agent. How should you deliver the experience?</p>",
     "choices": [
      "Ask employees to bookmark the Foundry portal and chat with the procurement Foundry agent directly",
      "Publish the Copilot Studio agent to Microsoft 365 Copilot with the Foundry agent connected",
      "Rebuild the procurement agent as a Power Apps canvas app embedded in Teams",
      "Duplicate the Foundry agent's logic in the Copilot Studio agent's topics"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Publishing the Copilot Studio agent to Microsoft 365 Copilot gives users one entry point, while the multi-agent design continues to delegate specialized analysis to the Foundry agent.</p><p>The Foundry portal is a builder tool, not an end-user channel. A canvas app is not a conversational agent experience in Copilot. Duplicating logic creates divergence and maintenance overhead.</p>"
    },
    {
     "n": 22,
     "prompt": "<p>While applying the Power Platform Well-Architected framework to a customer-facing agent, the team adds citations to answers, clear disclosure that users are talking to AI, and a simple thumbs-up and thumbs-down feedback control. Which pillar does this work primarily support?</p>",
     "choices": [
      "Reliability",
      "Experience Optimization",
      "Security",
      "Performance Efficiency"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Experience Optimization focuses on designing usable, trustworthy, and transparent user experiences, which for intelligent workloads includes citations, AI disclosure, and feedback mechanisms.</p><p>Reliability covers resilience and recovery. Security covers protecting data and access. Performance Efficiency covers scale and responsiveness.</p>"
    },
    {
     "n": 23,
     "prompt": "<p>A Copilot Studio agent is updated every two weeks. Testers currently retype the same questions in the test pane for each release. What should you recommend?</p>",
     "choices": [
      "Run a test set of questions with expected answers automatically per release",
      "Keep manual test pane checks but assign more testers to each release",
      "Run a load test only, since functional behavior rarely changes",
      "Publish each release to a pilot group and skip pre-release testing"
     ],
     "answer": 0,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "medium",
     "explanation": "<p>Agent evaluation with test sets, in Copilot Studio or with tooling such as the Copilot Studio Kit, lets teams run many questions with expected responses automatically and compare results across releases, making regression testing fast and repeatable.</p><p><em>More manual testers</em> increases cost and remains inconsistent. A <em>load test only</em> ignores whether answers are correct. <em>Skipping pre-release testing</em> pushes defects to users.</p>"
    },
    {
     "n": 24,
     "prompt": "<p>Agents built in Copilot Studio and in Microsoft Foundry all need the same set of tools to query and update a warehouse management system. You want to build the integration once and reuse it. What should you recommend?</p>",
     "choices": [
      "Build a separate custom connector and API wrapper for each agent team",
      "Build an MCP server that exposes the warehouse tools to all agents",
      "Grant every agent direct write access to the warehouse database",
      "Configure each agent to automate the warehouse UI with computer use"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>MCP is an open protocol for exposing tools and data to agents. One MCP server can be consumed by Copilot Studio, Foundry, and other MCP-compatible agents.</p><p>Per-team wrappers duplicate effort and drift. Direct database writes bypass business logic and security. UI automation is slower and more fragile than a tool interface.</p>"
    },
    {
     "n": 25,
     "prompt": "<p>A construction firm builds a Power Apps canvas app for subcontractor invoice approval. Invoices arrive as PDFs, amounts must be checked against purchase orders, and low-confidence extractions must not be approved automatically. Which design sequence is BEST?</p>",
     "choices": [
      "Extract with document processing, validate with a prompt, route low confidence to people",
      "A prompt generates invoice totals from the PDF name, then a flow pays all invoices that match",
      "A flow pays invoices first, then document processing extracts the fields for later auditing",
      "Users retype every field into the app, then a prompt checks spelling before the approval"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "hard",
     "explanation": "<p>The sequence uses AI Builder document processing for extraction, a generative prompt for validation against purchase order data, and a deterministic flow with confidence thresholds that send uncertain items to humans.</p><p>A file name contains no reliable amounts, and paying all matches skips the review rule. Paying before extraction reverses the control. Manual retyping removes the benefit of AI and adds errors.</p>"
    },
    {
     "n": 26,
     "prompt": "<p>Before launching a public-facing agent, the security team wants evidence of how well the agent resists jailbreak and harmful content attempts. What should you recommend?</p>",
     "choices": [
      "Run only functional tests of the agent's business scenarios",
      "Run automated red teaming and measure the attack success rate",
      "Trust the default content filters without additional testing",
      "Run a network penetration test of the hosting environment"
     ],
     "answer": 1,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "hard",
     "explanation": "<p>Adversarial testing, such as the AI red teaming capability in Microsoft Foundry, probes the agent with attack strategies and reports metrics such as attack success rate, providing evidence of resilience and guiding mitigations.</p><p><em>Functional tests</em> do not exercise adversarial inputs. <em>Default filters</em> are helpful but must be verified against your agent's behavior. A <em>network penetration test</em> targets infrastructure, not prompt-level attacks.</p>"
    },
    {
     "n": 27,
     "prompt": "<p>A procurement team spends hours emailing vendors to confirm purchase order delivery dates and updating Dynamics 365 Supply Chain Management. Which prebuilt agent should you evaluate first?</p>",
     "choices": [
      "The Sales Qualification Agent in Dynamics 365 Sales",
      "The Analyst agent in Microsoft 365 Copilot",
      "The Supplier Communications Agent in Dynamics 365 Supply Chain Management",
      "The Customer Intent Agent in Dynamics 365 Contact Center and Customer Service"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>The Supplier Communications Agent monitors vendor communications, follows up on purchase order confirmations, and proposes updates in Supply Chain Management.</p><p>The Sales Qualification Agent works with sales leads. Analyst performs data analysis. The Customer Intent Agent discovers service intents. None automates vendor follow-up on purchase orders.</p>"
    },
    {
     "n": 28,
     "prompt": "<p>A logistics company has a REST API described by an OpenAPI definition. It wants the API available to several Copilot Studio agents and to Power Automate flows, with authentication managed centrally. What should you recommend?</p>",
     "choices": [
      "Create a custom connector from the OpenAPI definition",
      "Call the API from an HTTP node inside each agent's topics",
      "Use Computer Use to operate the API's documentation page",
      "Paste the OpenAPI definition into each agent's instructions"
     ],
     "answer": 0,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "medium",
     "explanation": "<p>A custom connector built from an OpenAPI definition can be reused across Copilot Studio agents and Power Automate flows, with centralized authentication settings and data policy governance.</p><p>HTTP nodes duplicate logic and credentials per agent. Computer Use is for user interfaces without APIs. Instructions cannot execute API calls.</p>"
    },
    {
     "n": 29,
     "prompt": "<p>An agent must start work automatically when a new message arrives in a shared mailbox, classify the request, and create a record without any user prompting it. Which approach should you recommend?</p>",
     "choices": [
      "An autonomous agent in Copilot Studio that uses an event trigger",
      "A declarative agent in Microsoft 365 Copilot that users invoke by name",
      "A shared prompt in the prompt library that users run each morning",
      "A SharePoint agent that summarizes the mailbox when a user opens a site"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Autonomous agents in Copilot Studio can respond to triggers and act without a user starting a conversation, which matches the event-driven requirement.</p><p>Declarative agents, shared prompts, and SharePoint agents all respond when a user interacts with them; none processes mailbox events on its own.</p>"
    },
    {
     "n": 30,
     "prompt": "<p>A financial services firm built a risk-scoring agent in Microsoft Foundry Agent Service. Its customer-facing Copilot Studio agent must call the Foundry agent for risk questions while keeping the conversation in Copilot Studio. Which approach should you recommend?</p>",
     "choices": [
      "Rebuild the risk-scoring logic as a Copilot Studio topic",
      "Ask users to open the Foundry portal for risk questions",
      "Add the Foundry agent as a connected agent",
      "Export the Foundry agent's instructions into a prompt action"
     ],
     "answer": 2,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Copilot Studio supports multi-agent designs in which an agent delegates to other agents, including agents built in Microsoft Foundry, so that specialized capabilities are reused while one agent owns the conversation.</p><p>Rebuilding duplicates complex logic and its models. Sending customers to a developer portal is not viable. Copying instructions loses the Foundry agent's tools, models, and data connections.</p>"
    },
    {
     "n": 31,
     "prompt": "<p>A maker edited a managed Copilot Studio agent directly in production, creating an unmanaged layer. The next managed solution upgrade did not take effect. What should you do?</p>",
     "choices": [
      "Export production as unmanaged and treat it as the new source of truth",
      "Remove the unmanaged layer, make the fix in dev, and redeploy as managed",
      "Allow production edits but ask makers to document each change",
      "Delete the managed solution and import the unmanaged version instead"
     ],
     "answer": 1,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "hard",
     "explanation": "<p>Unmanaged customizations on top of managed components take precedence and block upgrades from showing. The supportable fix is to remove the active unmanaged layer, reapply the change in development, redeploy as managed, and restrict maker permissions in production.</p><p><em>Making production the source</em> inverts ALM and loses control of changes. <em>Documented production edits</em> still cause the same layering problem. <em>Importing unmanaged</em> into production makes future upgrades and removal harder.</p>"
    },
    {
     "n": 32,
     "prompt": "<p>Before user messages reach a Foundry model, a solution must detect and redact personal data such as names and account numbers. Which Foundry Tools capability should you include?</p>",
     "choices": [
      "Azure AI Translator document translation",
      "Azure AI Vision image analysis",
      "Azure AI Speech text to speech",
      "PII detection in Azure AI Language"
     ],
     "answer": 3,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>PII detection identifies and redacts personal data in text, making it a suitable preprocessing constraint before content is sent to a model.</p><p>Translator converts languages, Vision analyzes images, and text to speech generates audio. None identifies and redacts personal data in text messages.</p>"
    },
    {
     "n": 33,
     "prompt": "<p>A retailer plans to use Computer Use to update prices on several supplier portals. Security reviewers worry about the agent acting on the wrong sites or misusing credentials. Which controls should you recommend?</p>",
     "choices": [
      "Restrict allowed sites, store credentials securely, and review sessions",
      "Share one administrator password in the agent instructions for all portals",
      "Let the agent browse any website so it can find alternative supplier pages",
      "Disable all logging so that supplier data is not retained in the platform"
     ],
     "answer": 0,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Limiting Computer Use to approved sites, storing credentials securely rather than in prompts, and reviewing recorded activity reduce the risk of misdirected actions and credential misuse.</p><p>Credentials in instructions are exposed and violate least privilege. Unrestricted browsing increases the risk of acting on untrusted sites. Disabling logging removes auditability.</p>"
    },
    {
     "n": 34,
     "prompt": "<p>A Copilot Studio agent has many topics, actions, and knowledge sources. You want the agent to select the right combination dynamically based on the user's request rather than relying only on trigger phrases. What should you do?</p>",
     "choices": [
      "Use classic orchestration and add hundreds of trigger phrases to each topic",
      "Enable generative orchestration and write clear descriptions for each item",
      "Merge all topics into a single topic that contains every possible branch",
      "Remove all descriptions so the orchestrator is not biased by wording"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Generative orchestration uses descriptions of topics, actions, and knowledge to plan which to use, including chaining several, based on intent.</p><p>Classic orchestration with trigger phrases does not dynamically combine capabilities. A single giant topic is hard to maintain and not dynamic. Descriptions are essential for the orchestrator to choose correctly.</p>"
    },
    {
     "n": 35,
     "prompt": "<p>A company extends Microsoft 365 Copilot for finance and operations apps with a Copilot Studio agent and also adds X++ code to expose new data to it. How should these changes move through environments?</p>",
     "choices": [
      "Ship the agent in a Dataverse solution and the X++ code in a deployable package",
      "Ship both the agent and the X++ code together in one Dataverse solution",
      "Edit the agent and the X++ code directly in the production environment",
      "Ship both through Microsoft 365 admin center integrated apps"
     ],
     "answer": 0,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "hard",
     "explanation": "<p>Copilot Studio components are Dataverse solution components, while finance and operations X++ code is delivered through deployable packages. Both must be coordinated so the agent and the code it depends on reach each environment together.</p><p><em>X++ code</em> cannot be shipped inside a Dataverse solution. <em>Direct production edits</em> bypass testing and change control. <em>Integrated apps</em> in the Microsoft 365 admin center deploy apps to users, not X++ or solution components.</p>"
    },
    {
     "n": 36,
     "prompt": "<p>A utility's voice-enabled Copilot Studio agent handles outage calls. The team wants to enable deep reasoning for root-cause questions, but callers abandon when there are long silences. What should you recommend?</p>",
     "choices": [
      "Enable deep reasoning on every voice turn to maximize answer accuracy",
      "Use reasoning only in background steps and keep voice turns fast",
      "Remove voice support and require callers to use the website instead",
      "Increase the maximum response length so callers hear longer explanations"
     ],
     "answer": 1,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Reasoning models add latency, so the design should reserve them for steps where depth matters and where delays are acceptable, while keeping interactive voice turns responsive.</p><p>Reasoning on every turn creates the silence problem. Removing voice abandons the channel requirement. Longer responses add speaking time and do not reduce latency.</p>"
    },
    {
     "n": 37,
     "prompt": "<p>A chemical plant wants to transcribe operators' spoken shift reports. Prebuilt speech to text frequently misrecognizes product codes and chemical names, and the plant floor is noisy. What should you recommend?</p>",
     "choices": [
      "Switch to text to speech so operators listen to reports instead of dictating",
      "Increase the language model temperature used to summarize the transcripts",
      "Ask operators to spell every product code letter by letter when speaking",
      "Create a custom speech model trained with plant audio and domain vocabulary"
     ],
     "answer": 3,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Custom speech models improve recognition for domain-specific vocabulary and acoustic conditions when prebuilt models fall short, which is a classic case for a custom model.</p><p>Text to speech solves the opposite problem. Temperature affects text generation, not recognition accuracy. Spelling every code is impractical and still error-prone in noise.</p>"
    },
    {
     "n": 38,
     "prompt": "<p>A maker tweaked an agent's instructions in production and the agent began ignoring a required disclaimer. How should you prevent similar regressions?</p>",
     "choices": [
      "Freeze the instructions permanently so no one can change them",
      "Let users vote in a poll on which instruction version they prefer",
      "Ask the maker to restore the old wording from memory",
      "Version instructions as code with review and evaluation gates before release"
     ],
     "answer": 3,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "hard",
     "explanation": "<p>Instructions and prompts drive agent behavior and should be treated like code: kept in source control, changed through reviewed pull requests, and deployed only after automated evaluations confirm required behaviors such as disclaimers.</p><p><em>Permanent freezing</em> blocks legitimate improvements. <em>User polls</em> are not a quality or compliance control. <em>Restoring from memory</em> is unreliable and does not prevent recurrence.</p>"
    },
    {
     "n": 39,
     "prompt": "<p>During a pilot of a SharePoint-grounded agent in Microsoft 365, the agent surfaces confidential salary spreadsheets to users who technically have access because of overly broad sharing links. What should you recommend before a broad rollout?</p>",
     "choices": [
      "Add an instruction telling the agent never to mention salaries",
      "Fix oversharing with SharePoint Advanced Management controls",
      "Turn off permission trimming for the agent's knowledge sources",
      "Duplicate all non-confidential files into a separate new tenant"
     ],
     "answer": 1,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Agents in Microsoft 365 respect user permissions, so overshared content must be fixed at the source. SharePoint Advanced Management and restricted content discovery help identify and limit overshared sites.</p><p>Instructions are not a security boundary. Microsoft 365 agents always honor permissions; disabling trimming is neither possible nor desirable. A new tenant is a disproportionate and disruptive response.</p>"
    },
    {
     "n": 40,
     "prompt": "<p>A defense contractor must summarize maintenance logs in a facility where data cannot leave the site and GPU capacity is limited. The task is narrow and well defined. Which approach is MOST appropriate?</p>",
     "choices": [
      "Send logs to the largest cloud-hosted model through a public endpoint",
      "Use Microsoft 365 Copilot Chat with web grounding enabled for summaries",
      "Host a customized small language model locally inside the facility",
      "Train a large foundation model on-site using the limited GPUs available"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Small language models can run on modest local hardware and perform well on narrow tasks, meeting data sovereignty and capacity constraints.</p><p>Cloud endpoints violate the data-residency constraint. Web grounding sends data off-site and is irrelevant to internal logs. Training a foundation model requires far more compute than is available.</p>"
    },
    {
     "n": 41,
     "prompt": "<p>After a model update, several prompts in your organization's prompt library started producing different and lower-quality results. Which prompt library guideline would have prevented this from going unnoticed?</p>",
     "choices": [
      "Lock users to a single prompt so that fewer prompts need to be maintained",
      "Record the model version each prompt was tested on and re-test after updates",
      "Remove example outputs from library entries so models are not constrained",
      "Allow prompts to be edited only once a year during a formal annual review cycle"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>A mature prompt library tracks which model each prompt was tested against and includes regression testing whenever models are updated.</p><p>Limiting users to one prompt reduces value without addressing drift. Example outputs are useful baselines for testing. Annual-only edits delay fixes for problems caused by frequent model updates.</p>"
    },
    {
     "n": 42,
     "prompt": "<p>A retailer classifies millions of product reviews daily with a large model in Microsoft Foundry. Quality is good, but cost and latency are too high. Which approach should you recommend?</p>",
     "choices": [
      "Switch to an even larger model to reduce the number of retries",
      "Add a longer system prompt that asks the model to answer faster",
      "Distill the large model into a smaller fine-tuned model",
      "Classify only a random 10 percent of reviews and estimate the rest"
     ],
     "answer": 2,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "hard",
     "explanation": "<p>Distillation uses a capable model's outputs to fine-tune a smaller, cheaper model that performs well on a narrow task, reducing cost and latency at high volume.</p><p>A larger model increases cost and latency. Prompt wording does not materially change inference speed. Sampling abandons the business requirement to classify all reviews.</p>"
    },
    {
     "n": 43,
     "prompt": "<p>Hundreds of makers are building agents in the default environment, mixing experiments with business-critical agents. What environment strategy should you recommend?</p>",
     "choices": [
      "Use dedicated dev, test, and prod environments and route makers to dev",
      "Keep all agents in the default environment and tag critical ones",
      "Create one environment per agent regardless of its importance",
      "Block all makers from building agents until a central team is hired"
     ],
     "answer": 0,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "medium",
     "explanation": "<p>Separate environments per lifecycle stage, governed as Managed Environments, isolate experiments from production. Environment routing can send new makers to personal development environments instead of the default environment.</p><p><em>Tagging in the default environment</em> provides no isolation or deployment control. <em>One environment per agent</em> creates sprawl and overhead. <em>Blocking all makers</em> stalls adoption unnecessarily.</p>"
    },
    {
     "n": 44,
     "prompt": "<p>A field service company uses Dynamics 365 Field Service and Dynamics 365 Supply Chain Management. Technicians want an agent that checks work orders and tells them whether required parts are available at nearby warehouses. What should you recommend?</p>",
     "choices": [
      "Two separate agents, one per app, that technicians must query one after the other each time",
      "One agent grounded on Dataverse, with inventory data via dual-write or virtual tables",
      "A daily export of inventory data into the Field Service mobile app as attachments",
      "A custom language model fine-tuned on last year's work orders and inventory"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "hard",
     "explanation": "<p>Cross-app AI solutions are designed around shared data. Surfacing Supply Chain inventory in Dataverse alongside Field Service work orders lets one agent answer the combined question.</p><p>Separate agents push integration work onto technicians. Daily attachments are stale and hard to query. A fine-tuned model cannot know current inventory.</p>"
    },
    {
     "n": 45,
     "prompt": "<p>A Microsoft 365 Copilot for Sales administrator wants sellers to see a specific set of CRM fields on contact and opportunity cards in Outlook and to be able to save emails to the CRM. Where should this be configured?</p>",
     "choices": [
      "In the Microsoft Purview data loss prevention policies",
      "In a Copilot Studio topic that formats CRM records",
      "In Exchange transport rules for outbound sales email",
      "In the Copilot for Sales admin settings"
     ],
     "answer": 3,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Copilot for Sales provides admin settings to customize which CRM fields appear in its experiences and to control capabilities such as saving emails and meetings to the CRM.</p><p>Purview DLP protects data but does not configure card fields. A Copilot Studio topic does not change the Copilot for Sales cards. Transport rules process mail flow, not CRM integration.</p>"
    },
    {
     "n": 46,
     "prompt": "<p>A public-facing retail agent receives frequent attempts to override its instructions with role-play prompts. Which design BEST reduces the risk?</p>",
     "choices": [
      "Add a line to the instructions telling the agent never to break rules",
      "Block every user message that is longer than one sentence",
      "Require users to accept terms of use before chatting with the agent",
      "Layer Prompt Shields, content filters, system safeguards, and monitoring"
     ],
     "answer": 3,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "hard",
     "explanation": "<p>Defense in depth works best against jailbreaks: Prompt Shields detect user prompt attacks, content filters block harmful outputs, well-designed system messages constrain behavior, and monitoring plus red teaming catch new techniques.</p><p><em>A single instruction line</em> is exactly what jailbreaks try to override. <em>Blocking long messages</em> harms legitimate users and does not stop short attacks. <em>Terms of use</em> deter some misuse but provide no technical protection.</p>"
    },
    {
     "n": 47,
     "prompt": "<p>An agent project has a one-time implementation cost of $300,000 and an annual run cost of $120,000. It produces $420,000 in annual benefits. What is the simple payback period?</p>",
     "choices": [
      "12 months",
      "9 months",
      "18 months",
      "30 months"
     ],
     "answer": 0,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "hard",
     "explanation": "<p>Net annual benefit is $420,000 - $120,000 = $300,000. Payback = $300,000 / $300,000 = 1 year, or 12 months.</p><p>9 months ignores the annual run cost. 18 months and 30 months come from incorrectly combining the costs and benefits.</p>"
    },
    {
     "n": 48,
     "prompt": "<p>A Power Platform team wants one governed prompt that extracts warranty terms from contracts and reuses it in a canvas app, a Power Automate flow, and a Copilot Studio agent. What should you recommend?</p>",
     "choices": [
      "Copy the prompt text into each app, flow, and agent separately",
      "Train a separate custom model in Foundry for each component",
      "Store the prompt as a column value and read it with Power Fx",
      "Create the prompt once in AI hub and reuse it everywhere"
     ],
     "answer": 3,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "hard",
     "explanation": "<p>Prompts created in AI hub (AI Builder prompts) are reusable components that can be called from Power Apps, Power Automate, and Copilot Studio, so one version is governed and maintained.</p><p>Copies drift apart and complicate maintenance. Separate custom models add unnecessary cost. Storing prompt text in a column does not execute it as a managed AI component.</p>"
    },
    {
     "n": 49,
     "prompt": "<p>Which TCO component is MOST often overlooked when estimating the cost of a grounded agent over three years?</p>",
     "choices": [
      "Ongoing knowledge maintenance, evaluation, and re-testing after changes",
      "The initial license or subscription needed to start building the first agent",
      "The design workshops held before the first prototype is built",
      "The cost of naming and branding the agent for launch"
     ],
     "answer": 0,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "hard",
     "explanation": "<p>Content curation, evaluation pipelines, and re-testing after model updates are recurring costs that are frequently omitted from estimates but persist for the solution's life.</p><p>Licenses and design workshops are visible, up-front costs that are rarely missed. Naming and branding is minor compared to ongoing operational work.</p>"
    },
    {
     "n": 50,
     "prompt": "<p>A marketer at a hospitality company wants to build an audience by typing 'guests who stayed twice last year and opened a spa email' instead of designing segment logic manually. Which capability should you recommend?</p>",
     "choices": [
      "Copilot segment creation in Dynamics 365 Customer Insights",
      "Copilot case summaries in Customer Service",
      "Copilot purchase order summaries in Supply Chain Management",
      "The Sales Qualification Agent in Dynamics 365 Sales"
     ],
     "answer": 0,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Copilot in Dynamics 365 Customer Insights can create segments from natural-language descriptions, speeding up audience building for marketers.</p><p>Case summaries support service representatives. Purchase order summaries support buyers. Sales Qualification researches leads, not marketing segments.</p>"
    },
    {
     "n": 51,
     "prompt": "<p>Makers are sharing Copilot Studio agents with the entire organization without review, and IT has no inventory of agents. What should you recommend FIRST?</p>",
     "choices": [
      "Disable Copilot Studio for all users in the tenant immediately",
      "Apply Purview retention policies to all agent transcripts",
      "Enable Managed Environments with sharing limits and review the agent inventory",
      "Ask makers to report new agents in a shared spreadsheet"
     ],
     "answer": 2,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "hard",
     "explanation": "<p>Managed Environments let admins limit how widely agents can be shared and provide visibility into resources. Combined with tenant-level inventory in the admin centers, this gives governance without blocking innovation.</p><p><em>Disabling Copilot Studio</em> stops all value instead of governing it. <em>Retention policies</em> govern data lifecycle, not sharing or inventory. A <em>self-reported spreadsheet</em> is incomplete and unenforced.</p>"
    },
    {
     "n": 52,
     "prompt": "<p>Employees use Microsoft 365 Copilot daily. They also need to look up and update records in a proprietary order system that exposes a REST API. What is the MOST cost-effective approach?</p>",
     "choices": [
      "Build a separate custom chat application with its own model for order lookups",
      "Buy a second AI assistant product that specializes in order management",
      "Extend Microsoft 365 Copilot with an agent that calls the API via an action",
      "Train a custom model on order system exports so it can answer order questions"
     ],
     "answer": 2,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "hard",
     "explanation": "<p>Extending a platform users already have with actions to line-of-business systems avoids duplicate tools and delivers value at lower cost.</p><p>A separate custom app or second product duplicates the assistant users already have. A model trained on exports cannot update records or reflect current data.</p>"
    },
    {
     "n": 53,
     "prompt": "<p>A strategy team wants a Microsoft 365 agent that can perform multi-step research across internal documents, email, meetings, and the web, and produce a cited report on a competitor's market moves. Which prebuilt agent should you recommend?</p>",
     "choices": [
      "Analyst",
      "Facilitator",
      "Project Manager",
      "Researcher"
     ],
     "answer": 3,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Researcher performs deep, multi-step research across work data and web sources and produces a structured report with citations.</p><p>Analyst focuses on data analysis with code. Facilitator assists meetings. Project Manager helps manage plans and tasks.</p>"
    },
    {
     "n": 54,
     "prompt": "<p>Regulators require that a lending decision-support solution use a single validated model version for every request so outputs can be audited and reproduced. A team proposes a model router to reduce cost. What should you recommend?</p>",
     "choices": [
      "Use the model router because routing always reduces regulatory risk",
      "Use the model router and let it update its underlying models automatically",
      "Use the model router only for requests that the auditors will not review",
      "Deploy the validated model version directly, without a model router"
     ],
     "answer": 3,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "hard",
     "explanation": "<p>A model router dynamically selects among underlying models, which conflicts with a requirement to use one validated, pinned model version for auditability.</p><p>Routing does not inherently reduce regulatory risk. Automatic model changes further violate the pinned-version requirement. Excluding some requests from audit does not meet the regulation.</p>"
    },
    {
     "n": 55,
     "prompt": "<p>A lender's responsible AI review of a pre-screening agent asks whether approval recommendations differ across demographic groups. Which activity addresses this question?</p>",
     "choices": [
      "Measure average response latency under peak load conditions",
      "Encrypt the applicant data stored by the agent at rest",
      "Compare outcome metrics across demographic groups in evaluation data",
      "Add citations to every recommendation the agent produces"
     ],
     "answer": 2,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "medium",
     "explanation": "<p>Fairness is assessed by disaggregating outcomes and error rates across relevant groups and investigating disparities before deployment and during operation.</p><p><em>Latency testing</em> relates to performance and reliability, not fairness. <em>Encryption</em> supports privacy and security, not equitable outcomes. <em>Citations</em> support transparency but do not reveal group disparities.</p>"
    },
    {
     "n": 56,
     "prompt": "<p>Buyers in Dynamics 365 Supply Chain Management receive many confirmed purchase order changes from vendors. They want Copilot to highlight which changes affect delivery dates or downstream demand so they can review the highest-risk changes first in the app. Which capability should you recommend?</p>",
     "choices": [
      "Copilot segment creation in Customer Insights",
      "Copilot purchase order change summaries",
      "Copilot case summaries in Customer Service",
      "The Researcher agent in Microsoft 365 Copilot"
     ],
     "answer": 1,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>Copilot in Supply Chain Management can summarize purchase order changes and their potential impact, helping buyers prioritize reviews within the app.</p><p>Segment creation is a marketing feature. Case summaries support service. Researcher produces reports from broad sources but does not prioritize in-app purchase order changes.</p>"
    },
    {
     "n": 57,
     "prompt": "<p>During an ROI pilot, sales productivity rose 12%, but a new pricing promotion launched at the same time. How should you isolate the agent's contribution?</p>",
     "choices": [
      "Attribute the entire 12% increase to the agent because it launched first",
      "Compare a pilot group using the agent with a similar control group",
      "Ignore the promotion because promotions never affect sales productivity",
      "Survey only the pilot users and use their estimate of the agent's impact"
     ],
     "answer": 1,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>A control group exposed to the same promotion but without the agent isolates the agent's effect, producing credible ROI evidence.</p><p>Attributing all gains to the agent overstates ROI. Promotions clearly can affect sales. Self-reported estimates are subjective and biased.</p>"
    },
    {
     "n": 58,
     "prompt": "<p>An autonomous agent will issue customer refunds. The responsible AI review flags accountability concerns. Which design BEST addresses them?</p>",
     "choices": [
      "Let the agent run fully autonomously and send a monthly summary",
      "Require human approval above a threshold and assign an accountable owner",
      "Disable logging of refund decisions to protect customer privacy",
      "State in the contract that the model vendor is accountable"
     ],
     "answer": 1,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "hard",
     "explanation": "<p>Accountability means people remain answerable for AI system outcomes. Human-in-the-loop approval for high-impact actions, a named owner, and reviewable logs keep meaningful human oversight.</p><p>A <em>monthly summary</em> is too late to catch harmful decisions. <em>Disabling logs</em> removes the evidence needed for oversight and audit. <em>Shifting accountability</em> to a vendor does not remove the organization's responsibility.</p>"
    },
    {
     "n": 59,
     "prompt": "<p>A contact center wants an AI agent to assess conversations against its quality rubric, such as greeting, verification, and resolution, and give supervisors consistent scores at scale instead of sampling a few calls. What should you recommend?</p>",
     "choices": [
      "Customer Intent Agent in Dynamics 365 Customer Service",
      "Supplier Communications Agent in Supply Chain Management",
      "Quality Evaluation Agent in Dynamics 365 Customer Service",
      "Analyst agent in Microsoft 365 Copilot with exported transcripts"
     ],
     "answer": 2,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "hard",
     "explanation": "<p>The Quality Evaluation Agent evaluates conversations and cases against defined quality criteria, giving supervisors consistent, scalable quality assessments.</p><p>Customer Intent discovers intents for routing and self-service. Supplier Communications handles vendors. Exporting transcripts to Analyst is a manual workaround without rubric-based evaluation in the service app.</p>"
    },
    {
     "n": 60,
     "prompt": "<p>A prebuilt Dynamics 365 agent covers about 80% of a company's case-handling process. The remaining steps are company-specific approval rules. What should you recommend?</p>",
     "choices": [
      "Adopt the prebuilt agent and extend it for the unique steps",
      "Build an entirely new agent from scratch so all steps are custom",
      "Reject AI for case handling until a product covers every step",
      "Change the company's approval rules to remove all unique steps"
     ],
     "answer": 0,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>Extending a prebuilt agent captures most of the value quickly and focuses custom effort only on what is unique.</p><p>Building from scratch duplicates the 80% already provided. Waiting for perfect coverage delays value. Changing approval rules to suit a tool may not be acceptable to the business.</p>"
    }
   ]
  }
 ]
};
