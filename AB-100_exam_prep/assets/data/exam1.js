window.AB1_DATA = window.AB1_DATA || {};
window.AB1_DATA.exam1 = {
 "id": "exam1",
 "name": "AB-100 — Practice Exam 1",
 "timeMinutes": 100,
 "units": [
  {
   "title": "",
   "html": "",
   "questions": [
    {
     "n": 1,
     "prompt": "<p>A logistics company plans a Copilot Studio agent that answers driver questions about delivery policies. The SharePoint library it will use contains approved policies, unapproved drafts, and superseded versions going back several years. What should you do <strong>first</strong> to prepare the grounding data?</p>",
     "choices": [
      "Raise the model temperature so the agent can reconcile conflicting versions on its own",
      "Fine-tune a custom language model on every version of every policy document",
      "Curate the library so only current, approved policy versions are indexed",
      "Enable web search so the agent can fill gaps the policy library does not cover"
     ],
     "answer": 2,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "easy",
     "explanation": "<p>Grounding quality depends on accuracy and relevance. Removing drafts and superseded versions (or scoping the knowledge source to an approved folder) prevents the agent from citing outdated or unapproved rules.</p><p>Temperature controls output randomness and does nothing to resolve conflicting sources. Fine-tuning on all versions would bake contradictory content into the model and is costly. Web search adds unrelated public content and does not fix the internal data problem.</p>"
    },
    {
     "n": 2,
     "prompt": "<p>A home-goods retailer uses Copilot in Dynamics 365 Customer Service. Service representatives report that Copilot misinterprets internal phrases such as 'RMA-plus' and 'Tier B shipment' when summarizing cases and answering questions. Which should you recommend FIRST to improve Copilot's interpretation of these phrases?</p>",
     "choices": [
      "Define the phrases as business terms with descriptions",
      "Fine-tune a custom language model in Microsoft Foundry on historical case notes",
      "Create a separate Copilot Studio topic with trigger phrases for each internal phrase",
      "Rename the related Dataverse tables and columns to match the internal phrases"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "easy",
     "explanation": "<p>Business terms (a glossary of organization-specific vocabulary with descriptions) are the lightweight, supported way to teach Copilot in customer experience and service apps what internal jargon means, and they can be maintained by business owners.</p><p>Fine-tuning is costly, slow to update, and unnecessary for vocabulary clarification. Topics control conversation paths, not how Copilot interprets terms in summaries. Renaming Dataverse schema is disruptive, breaks integrations, and still does not explain the meaning of a phrase.</p>"
    },
    {
     "n": 3,
     "prompt": "<p>A retailer has published a Copilot Studio agent that answers order and return questions on its website. Leadership asks how often conversations end with the customer's issue resolved, how often they are handed to a live agent, and how often customers simply leave. Where should you look first?</p>",
     "choices": [
      "The Microsoft Purview audit log for the agent's environment",
      "The solution history of the agent's Dataverse solution",
      "The built-in analytics page for the agent in Copilot Studio",
      "Azure Advisor recommendations for the tenant"
     ],
     "answer": 2,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "easy",
     "explanation": "<p>Copilot Studio includes analytics that summarize session outcomes such as resolved, escalated, and abandoned conversations, along with satisfaction and topic-level detail. This is the fastest source for outcome metrics on a published agent.</p><p>The <em>Purview audit log</em> records administrative and user activities for compliance; it does not compute conversation outcome rates. <em>Solution history</em> tracks solution import and upgrade operations, not runtime conversation outcomes. <em>Azure Advisor</em> gives cost, reliability, and security recommendations for Azure resources, not agent conversation analytics.</p>"
    },
    {
     "n": 4,
     "prompt": "<p>A retailer grounds a product-advice agent on a catalog index. Prices and stock levels change hourly in the ERP system, but the index is rebuilt once a month. Customers report that the agent quotes wrong prices. Which data quality dimension is the root problem?</p>",
     "choices": [
      "Cleanliness",
      "Timeliness",
      "Relevance",
      "Availability"
     ],
     "answer": 1,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "easy",
     "explanation": "<p>Timeliness measures whether data is current enough for the decision being made. A monthly refresh of data that changes hourly makes the grounding stale even if every record was correct when indexed.</p><p>Cleanliness concerns duplicates, formatting errors, and invalid values, which are not described. Relevance concerns whether the content relates to the user's question, and catalog data clearly does. Availability concerns whether the agent can access the data at all, and it can.</p>"
    },
    {
     "n": 5,
     "prompt": "<p>A software vendor's sellers use Copilot in Dynamics 365 Sales. Leadership wants Copilot record summaries to include engagement signals from a partner sales-intelligence application that stores data outside Dataverse. Which approach BEST meets the requirement?</p>",
     "choices": [
      "Export the partner data nightly to Excel files attached to each opportunity",
      "Build a separate canvas app that displays partner data next to the Sales Hub",
      "Ask sellers to paste partner insights into the opportunity description field",
      "Extend Copilot in Sales with a connector to the partner application"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Copilot in Dynamics 365 Sales supports extensibility through connectors (built with Power Platform and Copilot Studio) so that insights from partner or external systems appear directly in Copilot experiences such as record summaries.</p><p>Nightly Excel exports are stale and are not consumed by Copilot summaries. A side-by-side canvas app shows data but does not enrich Copilot output. Manual pasting is error-prone, unscalable, and pollutes the record.</p>"
    },
    {
     "n": 6,
     "prompt": "<p>Analytics for an employee IT help agent show that many sessions about VPN setup end in the fallback topic or with unanswered generative questions. Users report that the agent 'does not know anything about VPN.' What is the BEST tuning action?</p>",
     "choices": [
      "Raise the agent's content moderation level to the highest setting",
      "Review the unrecognized questions, then add a VPN knowledge source or topic",
      "Turn off generative orchestration so only authored topics respond",
      "Republish the agent so the language model refreshes its knowledge"
     ],
     "answer": 1,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>The telemetry points to a content gap: users ask about VPN and nothing grounds or handles the request. Reviewing the actual unrecognized utterances shows what is missing, and adding a knowledge source or targeted topic closes the gap. Afterward, re-check the same metrics.</p><p>Raising <em>content moderation</em> makes generative answers more conservative, which would likely increase unanswered responses rather than fix a missing source. Turning off <em>generative orchestration</em> removes flexibility and does not add any VPN content. <em>Republishing</em> does not teach the model new facts; the agent can only ground on the sources you connect.</p>"
    },
    {
     "n": 7,
     "prompt": "<p>A regional bank wants an agent to help process small-business loan applications. Regulators require that a qualified employee is accountable for every credit decision. Which use of agents BEST meets the requirement?</p>",
     "choices": [
      "Have the agent approve or decline applications autonomously and notify the officer after the fact",
      "Have the agent gather documents and recommend an outcome for a loan officer to approve",
      "Avoid AI entirely because agents cannot be used anywhere in regulated lending processes",
      "Let the agent replace the written credit policy with criteria it learns from past approvals"
     ],
     "answer": 1,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>Decision-support with a human in the loop keeps accountability with a qualified employee while the agent removes manual effort from data gathering and analysis.</p><p>Autonomous approval with after-the-fact notice removes the required human accountability. Regulated industries can use AI with appropriate controls, so excluding it entirely is unnecessary. Replacing documented policy with learned criteria undermines transparency and auditability.</p>"
    },
    {
     "n": 8,
     "prompt": "<p>An insurance company uses Dynamics 365 Contact Center. It wants a Copilot Studio agent to answer customers on web chat and WhatsApp and to hand off to a live representative, including the conversation history, when the customer asks for a person. What should you recommend?</p>",
     "choices": [
      "Publish the agent only to Microsoft Teams and share a link with customers",
      "Attach the agent to Contact Center workstreams with escalation to a human",
      "Build a different agent for each channel and disable transfers to humans",
      "Use a Power Automate flow that emails the transcript to the service queue"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "easy",
     "explanation": "<p>Copilot Studio agents can be attached to Dynamics 365 Contact Center channels (such as chat and messaging) as the AI first line, and the Escalate path transfers the conversation, with its context and transcript, to a human representative through unified routing.</p><p>Teams is an internal channel and does not serve external WhatsApp customers. Separate agents per channel duplicate effort and dropping transfers violates the requirement. Emailing transcripts breaks the live conversation and forces the customer to wait.</p>"
    },
    {
     "n": 9,
     "prompt": "<p>Which business process is the BEST candidate for an autonomous agent?</p>",
     "choices": [
      "Triaging supplier emails and updating purchase orders against clear, documented rules",
      "Deciding whether the company should enter a new international market next fiscal year",
      "Negotiating a one-time merger agreement that requires board-level judgment and approvals",
      "Rewriting the corporate mission statement after a leadership change and rebrand"
     ],
     "answer": 0,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "easy",
     "explanation": "<p>Autonomous agents fit high-volume, repeatable work that is triggered by events, uses accessible data, and has clear success criteria and guardrails, such as processing supplier order changes.</p><p>Market-entry strategy, merger negotiations, and mission statements are infrequent, judgment-heavy decisions with ambiguous criteria. AI can assist with research, but these are poor fits for autonomous execution.</p>"
    },
    {
     "n": 10,
     "prompt": "<p>A logistics company wants an agent that watches a shared mailbox for shipment-exception emails, extracts the shipment number, and creates a case in Dataverse without any employee starting a conversation. Which type of agent should you design?</p>",
     "choices": [
      "An autonomous agent that uses an event trigger",
      "A prompt-and-response agent published to Microsoft Teams",
      "A task agent that employees invoke from Microsoft 365 Copilot",
      "A SharePoint agent scoped to the logistics document library"
     ],
     "answer": 0,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "easy",
     "explanation": "<p>Autonomous agents run in response to events or schedules (such as a new email arriving) and act on behalf of the business without a user prompt, which matches the requirement.</p><p>A prompt-and-response agent only answers when a user asks. A task agent still depends on a user invoking it. A SharePoint agent answers questions over site content and does not monitor mailboxes.</p>"
    },
    {
     "n": 11,
     "prompt": "<p>An insurer wants Copilot Studio agent telemetry to flow into the same monitoring platform its operations team already uses for web apps, so it can build custom queries, dashboards, and alerts that correlate agent activity with back-end API failures. What should you recommend?</p>",
     "choices": [
      "Connect the agent to Azure Application Insights for telemetry",
      "Enable Dataverse auditing on the agent component tables",
      "Export conversation transcripts to Excel on a weekly schedule",
      "Subscribe the team to the Microsoft 365 message center"
     ],
     "answer": 0,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>Copilot Studio can send telemetry to Azure Application Insights, where operations teams can query it with Kusto, build workbooks and dashboards, set alerts, and correlate it with telemetry from other applications.</p><p><em>Dataverse auditing</em> tracks changes to records and configuration, not runtime performance telemetry for correlation and alerting. <em>Weekly Excel exports</em> are manual, delayed, and cannot drive alerts or correlation with API telemetry. The <em>message center</em> announces service changes; it contains no telemetry about your agent.</p>"
    },
    {
     "n": 12,
     "prompt": "<p>A manufacturer stores production, quality, and maintenance data in separate departmental databases with different names for the same fields. It plans several agents in Copilot Studio and Microsoft Foundry that must reuse this data. What should you recommend?</p>",
     "choices": [
      "Upload copies of the relevant tables as files into each agent's own knowledge sources",
      "Let each agent team build a private index using its own field names and refresh schedule",
      "Consolidate the data into a governed shared platform with consistent definitions",
      "Export the databases to spreadsheets every week and email them to the agent owners"
     ],
     "answer": 2,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>Organizing data once in a governed platform (for example, Microsoft Fabric OneLake with a semantic model) gives every AI system the same trustworthy, well-described data with centrally enforced security.</p><p>Per-agent file copies drift out of date and multiply security risk. Private team indexes perpetuate inconsistent definitions. Weekly emailed spreadsheets are stale, unsecured, and not consumable by agents in a reliable way.</p>"
    },
    {
     "n": 13,
     "prompt": "<p>Users of a Copilot Studio agent receive a generic 'Sorry, I didn't get that' message whenever their question is not recognized. The business wants the agent to rephrase once and, after two failed attempts, offer a transfer to a live representative. What should you do?</p>",
     "choices": [
      "Delete the Fallback system topic so that unrecognized input ends the conversation",
      "Add more trigger phrases to the Greeting topic to catch unrecognized questions",
      "Modify the Conversation Start topic to warn users about unsupported questions",
      "Customize the Fallback topic to count retries and redirect to Escalate"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "easy",
     "explanation": "<p>The Fallback system topic runs when no topic matches the user input. It can track the number of retries in a variable and redirect to the Escalate system topic after a threshold.</p><p>Deleting Fallback removes the recovery path and is not how the system topic is intended to be managed. Greeting trigger phrases do not catch arbitrary unrecognized intents. Conversation Start runs only at the beginning of a conversation.</p>"
    },
    {
     "n": 14,
     "prompt": "<p>Sales leaders want to ask natural-language questions such as 'What was gross margin by region last quarter?' over structured sales tables. Early tests return wrong figures because the agent picks the wrong columns. What should you address in the data?</p>",
     "choices": [
      "Convert the tables into PDF reports so the agent reads them as unstructured documents",
      "Remove column metadata from the tables to reduce the number of tokens per request",
      "Grant the agent administrator rights on the database so it can inspect every table",
      "Add clear table and column descriptions and agreed metric definitions"
     ],
     "answer": 3,
     "topic": "Analyze Requirements",
     "objective": "1.1",
     "difficulty": "medium",
     "explanation": "<p>Analytics agents map questions to fields using names, descriptions, and semantic definitions. Well-described schemas and agreed metric definitions make generated queries far more accurate.</p><p>Turning tables into PDFs loses structure and makes calculations less reliable. Removing metadata makes column selection worse, not better. Administrator rights increase risk and do not help the agent understand which column means what.</p>"
    },
    {
     "n": 15,
     "prompt": "<p>A logistics company runs a Microsoft Foundry agent that calls three tools for each shipment inquiry. Users complain that some responses take far too long. You need to find where the time is being spent. What should you use?</p>",
     "choices": [
      "A larger model deployment to speed up the reasoning step",
      "Tracing data that shows the duration of each model and tool call span",
      "A higher maximum output token setting on the deployment",
      "Disabling content filters on the model deployment"
     ],
     "answer": 1,
     "topic": "Monitor and Tune",
     "objective": "3.1",
     "difficulty": "medium",
     "explanation": "<p>Foundry supports OpenTelemetry-based tracing that records each step of an agent run, including model calls and tool calls, with timings. Inspecting spans for slow runs shows whether a specific tool, retrieval, or model step dominates latency, which is the evidence needed before tuning.</p><p>A <em>larger model</em> is a guess and often increases latency; it does not identify the bottleneck. Raising <em>maximum output tokens</em> allows longer responses, which tends to make calls slower. <em>Disabling content filters</em> weakens safety controls and is not a diagnostic step for latency.</p>"
    },
    {
     "n": 16,
     "prompt": "<p>A telecommunications provider already maintains a conversational language understanding (CLU) project in Foundry Tools with custom intents and entities that several applications share. It now builds a Copilot Studio agent and wants the agent to use the same intent model. Which recognition approach should you recommend?</p>",
     "choices": [
      "Use the standard built-in NLU and recreate the intents as trigger phrases",
      "Integrate the existing CLU model for intent recognition",
      "Rely only on generative orchestration and remove intent recognition",
      "Train a separate custom vision model to classify the user utterances"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Copilot Studio can use a CLU model from Foundry Tools (Azure AI Language) for intent recognition. This lets the organization reuse a shared, centrally governed intent model with custom entities.</p><p>Recreating intents in the built-in NLU duplicates work and diverges from the shared model. Generative orchestration alone discards the investment and the shared governance. Vision models classify images, not text utterances.</p>"
    },
    {
     "n": 17,
     "prompt": "<p>A company is starting its AI journey using the Cloud Adoption Framework for Azure. Leadership wants to identify use cases, define measurable business outcomes, and choose between buying and building AI. Which part of the AI adoption process covers this work?</p>",
     "choices": [
      "AI ready",
      "Govern AI",
      "AI strategy",
      "Manage AI"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "easy",
     "explanation": "<p>In the CAF AI adoption guidance, the AI strategy phase identifies use cases, defines the technology strategy (including build versus buy), and sets data and responsible AI strategy.</p><p>AI ready prepares environments and landing zones. Govern AI defines policies and risk controls. Manage AI covers ongoing operations of AI workloads. None of these is where use cases and outcomes are first defined.</p>"
    },
    {
     "n": 18,
     "prompt": "<p>Before publishing a new Copilot Studio agent, a maker wants to type sample questions, see which topic triggers, and inspect variable values as the conversation progresses. What should the maker use?</p>",
     "choices": [
      "A pilot channel in Microsoft Teams with selected employees",
      "The test pane in Copilot Studio with topic tracking enabled",
      "The run history page of a related Power Automate flow",
      "The solution checker for the agent's Dataverse solution"
     ],
     "answer": 1,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "easy",
     "explanation": "<p>The Copilot Studio test pane lets makers chat with the draft agent, follow which topic or node is running, and inspect variables. It is the right tool for interactive validation before publishing.</p><p>A <em>Teams pilot</em> involves real users and comes after the maker has validated the agent's basic behavior. <em>Power Automate run history</em> shows flow runs only, not topic triggering or conversation variables. The <em>solution checker</em> performs static analysis of solution components; it does not run conversations.</p>"
    },
    {
     "n": 19,
     "prompt": "<p>An accounts payable department receives thousands of scanned supplier invoices each week and needs vendor name, invoice number, totals, and line items extracted for an AI-assisted approval process. Which Foundry Tools capability should you propose?</p>",
     "choices": [
      "Azure AI Translator",
      "Azure AI Speech",
      "Azure AI Content Safety",
      "Azure AI Document Intelligence"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "easy",
     "explanation": "<p>Document Intelligence extracts text, key-value pairs, tables, and fields from documents such as invoices, including prebuilt invoice models, which matches the extraction requirement.</p><p>Translator converts text between languages. Speech handles speech-to-text and text-to-speech. Content Safety detects harmful content; none of them extract structured invoice fields.</p>"
    },
    {
     "n": 20,
     "prompt": "<p>An HR department wants employees to ask questions about HR policies stored in SharePoint from within Microsoft 365 Copilot and Teams. All employees have Microsoft 365 Copilot licenses, and no custom orchestration or model choice is required. What should you recommend?</p>",
     "choices": [
      "A custom engine agent in Microsoft Foundry with its own orchestrator and model deployment",
      "A custom language model trained from scratch on the HR policy documents",
      "A Power Apps canvas app with a search box that queries the SharePoint library",
      "A declarative agent for Microsoft 365 Copilot with SharePoint knowledge"
     ],
     "answer": 3,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "easy",
     "explanation": "<p>When users are licensed for Microsoft 365 Copilot and the Copilot orchestrator and models are sufficient, extending Microsoft 365 Copilot with a declarative agent is the fastest, lowest-effort option and inherits its security and compliance.</p><p>A custom engine agent adds build and operations effort that is not needed. Training a model from scratch is unjustified for document Q&A. A canvas app search box is not conversational and does not meet the Copilot experience requirement.</p>"
    },
    {
     "n": 21,
     "prompt": "<p>A travel company wants a customer-facing agent on its public website. Most customers do not have Microsoft 365 accounts, and the agent must call booking APIs and use a model the company selects. Which approach should you recommend?</p>",
     "choices": [
      "Build a custom agent in Copilot Studio or Foundry and publish it to the website",
      "Build a declarative agent for Microsoft 365 Copilot and share it with customers",
      "Enable Researcher in Microsoft 365 Copilot and give customers guest access",
      "Create a SharePoint agent on the public booking policy site and embed it externally"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Anonymous or external users on a public website require a custom agent that the company hosts, with its own channels, actions, and model choices. Copilot Studio and Foundry both support this.</p><p>Declarative agents and Researcher run inside Microsoft 365 Copilot for licensed users in the tenant, not anonymous web customers. SharePoint agents are scoped to SharePoint content for organizational users.</p>"
    },
    {
     "n": 22,
     "prompt": "<p>You are applying the Power Platform Well-Architected framework to an intelligent workload. The requirement states that the agent must keep serving users with a graceful message, rather than failing, when the underlying model endpoint is throttled. Which pillar primarily addresses this requirement?</p>",
     "choices": [
      "Experience Optimization",
      "Reliability",
      "Operational Excellence",
      "Performance Efficiency"
     ],
     "answer": 1,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>The Reliability pillar covers resiliency, fault handling, and graceful degradation so that a workload continues to function when dependencies such as model endpoints are throttled or unavailable.</p><p>Experience Optimization focuses on usability and user experience design. Operational Excellence covers deployment practices, monitoring, and ALM. Performance Efficiency is about scaling and responsiveness under load, not failure handling.</p>"
    },
    {
     "n": 23,
     "prompt": "<p>A bank is defining test exit criteria for a knowledge-grounded policy agent. Which set of metrics is MOST appropriate?</p>",
     "choices": [
      "Groundedness, relevance, answer accuracy against expected results, and latency",
      "Number of topics authored and total lines of instructions written",
      "Server CPU utilization and memory use of the hosting environment",
      "Count of knowledge files uploaded and their combined size on disk"
     ],
     "answer": 0,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "medium",
     "explanation": "<p>Generative agents should be measured on response quality, including whether answers are supported by sources (groundedness), whether they address the question (relevance), and whether they match expected answers, plus operational metrics such as latency.</p><p><em>Topic counts and instruction length</em> describe the build effort, not whether the agent answers correctly. <em>CPU and memory</em> of the platform are managed by the service and say nothing about answer quality. <em>Knowledge file counts and size</em> measure inputs, not the quality of outputs.</p>"
    },
    {
     "n": 24,
     "prompt": "<p>A Copilot Studio agent handles employee requests in Teams. Complex contract analysis must be done by a specialized agent that a data science team built in Foundry Agent Service. How should you design the solution?</p>",
     "choices": [
      "Paste the Foundry agent's instructions into the Copilot Studio agent and delete the Foundry agent",
      "Upload every contract into the Copilot Studio agent's knowledge so it can analyze them itself",
      "Have each agent send email to a shared mailbox that the other agent polls for new work",
      "Add the Foundry agent as a connected agent that the Copilot Studio agent delegates to"
     ],
     "answer": 3,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Multi-agent designs let a front-door agent delegate specialized work. Copilot Studio can connect to other agents, including Foundry agents, so each agent keeps its own expertise, tools, and ownership.</p><p>Copying instructions loses the Foundry agent's tools, models, and evaluation. Uploading all contracts does not provide the specialized analysis capability. Mailbox polling is fragile, slow, and not an agent orchestration pattern.</p>"
    },
    {
     "n": 25,
     "prompt": "<p>A utilities company wants its Copilot Studio agent to classify free-text customer complaints into one of eight categories and return the category and a confidence note as structured JSON that an agent flow consumes. The logic must be reusable across agents. What should you recommend?</p>",
     "choices": [
      "A customized Fallback topic that stores the complaint text in a variable",
      "A CLU entity list that contains every category name as a synonym",
      "An autonomous agent trigger that fires when a complaint is received",
      "A prompt action with instructions, input variables, and JSON output"
     ],
     "answer": 3,
     "topic": "Design AI and Agents",
     "objective": "2.1",
     "difficulty": "medium",
     "explanation": "<p>Prompt actions (prompt tools) in Copilot Studio let you define instructions and inputs for a generative model and return structured output such as JSON, and the prompt can be reused across agents and flows.</p><p>Fallback handles unrecognized input and does not classify text. A CLU entity list extracts known values, not a judgment-based category from free text. A trigger defines when an agent runs, not how text is classified.</p>"
    },
    {
     "n": 26,
     "prompt": "<p>A test lead must create several hundred varied test utterances, including paraphrases and edge cases, for a sales assistant agent. Time is short. Which strategy should you recommend?</p>",
     "choices": [
      "Generate cases with Copilot and run them without review",
      "Use only production conversation logs collected after go-live",
      "Generate cases with Copilot, then have experts review them",
      "Have one analyst handwrite every test case from scratch"
     ],
     "answer": 2,
     "topic": "Testing AI Solutions",
     "objective": "3.2",
     "difficulty": "medium",
     "explanation": "<p>Generative AI is effective at producing diverse paraphrases and edge cases quickly from requirements and sample conversations. Subject matter experts must review and curate the generated cases and their expected results so the test set is accurate and traceable to requirements.</p><p>Running <em>unreviewed generated tests</em> risks incorrect expected answers and gaps in coverage. <em>Production logs after go-live</em> arrive too late to validate the agent before release. <em>Handwriting every case</em> is slow and tends to produce less linguistic variety.</p>"
    },
    {
     "n": 27,
     "prompt": "<p>A strategy analyst needs a multi-step investigation that combines web sources with internal emails, meetings, and documents to produce a cited report. Users already have Microsoft 365 Copilot. What should you recommend first?</p>",
     "choices": [
      "Build a custom Foundry agent with web grounding and Microsoft Graph access",
      "Create a Copilot Studio topic with a fixed question-and-answer script",
      "Train a small language model on the analyst's previous reports",
      "Use the prebuilt Researcher agent in Microsoft 365 Copilot"
     ],
     "answer": 3,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "easy",
     "explanation": "<p>Researcher is a prebuilt Microsoft 365 Copilot agent designed for multi-step research across work data and the web with cited output, so it meets the need with no build effort.</p><p>A custom Foundry agent duplicates a capability that already exists. A scripted topic cannot perform open-ended research. A small model trained on past reports would not access current web or work data.</p>"
    },
    {
     "n": 28,
     "prompt": "<p>A distributor exposes inventory lookup and stock reservation operations through a Model Context Protocol (MCP) server. It wants a Copilot Studio agent to use these operations and automatically pick up new operations as the server adds them. What should you recommend?</p>",
     "choices": [
      "Recreate each operation manually as a separate custom connector action",
      "Add the MCP server as a tool with generative orchestration",
      "Use Computer Use to operate the inventory web portal for each request",
      "Call each operation from an HTTP request node inside dedicated topics"
     ],
     "answer": 1,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "easy",
     "explanation": "<p>When an MCP server is added to a Copilot Studio agent, the tools it exposes are discovered dynamically, so new or updated tools become available to the agent's generative orchestration without manual rework.</p><p>Manually recreated custom connector actions must be updated whenever the server changes. Computer Use is meant for user interfaces without an API, and an API already exists. HTTP nodes in topics are hard-coded and do not discover new operations.</p>"
    },
    {
     "n": 29,
     "prompt": "<p>Which responsibility BEST describes a Microsoft AI Center of Excellence (CoE)?</p>",
     "choices": [
      "Building every agent centrally so business units never create AI solutions themselves",
      "Purchasing AI licenses and leaving architecture and governance to each department",
      "Setting standards, guardrails, reusable assets, and enablement for business units",
      "Replacing the security team as the owner of identity and threat protection"
     ],
     "answer": 2,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "easy",
     "explanation": "<p>An AI CoE is a cross-functional team that accelerates adoption by defining standards, governance, best practices, reusable components, skills programs, and success measurement.</p><p>A CoE that builds everything becomes a bottleneck and blocks scale. Buying licenses without governance is not a CoE function. Security remains a partner discipline; the CoE does not replace it.</p>"
    },
    {
     "n": 30,
     "prompt": "<p>A government agency must automate data entry into a legacy licensing website that has no API and cannot be modified. A Copilot Studio agent should complete the forms on behalf of staff. Which capability should you recommend?</p>",
     "choices": [
      "A Model Context Protocol server",
      "Dataverse virtual tables",
      "Computer Use in Copilot Studio",
      "A custom connector with an OpenAPI definition"
     ],
     "answer": 2,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "easy",
     "explanation": "<p>Computer Use lets a Copilot Studio agent interact with websites and desktop applications through their graphical user interface, which is the right fit when no API is available.</p><p>An MCP server, a custom connector, and virtual tables all require an underlying API or data source to call, which the legacy website does not provide.</p>"
    },
    {
     "n": 31,
     "prompt": "<p>A manufacturer has built a Copilot Studio agent in a development environment and needs to move it to test and then production in a controlled, repeatable way. What should you recommend?</p>",
     "choices": [
      "Recreate the agent by hand in each target environment",
      "Share the agent with production users from the dev environment",
      "Package the agent in a solution and import it as managed downstream",
      "Export an unmanaged solution and import it into production"
     ],
     "answer": 2,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "easy",
     "explanation": "<p>Copilot Studio agents are Dataverse components and should be packaged in solutions. Unmanaged solutions live in development; managed solutions are deployed to test and production so components can be upgraded or removed cleanly.</p><p><em>Manual recreation</em> is error-prone and not repeatable. <em>Sharing from dev</em> runs production users on a development environment with no change control. <em>Unmanaged solutions in production</em> allow direct edits and make clean upgrades and removal difficult.</p>"
    },
    {
     "n": 32,
     "prompt": "<p>Your organization is creating a shared prompt library for Microsoft 365 Copilot users. Which guideline should you include?</p>",
     "choices": [
      "Allow anyone to publish prompts immediately without review to maximize growth",
      "Record purpose, owner, version, and sample output, and review prompts regularly",
      "Store prompts only in personal notes so that teams can keep their best ideas private",
      "Freeze prompts permanently once published so that results stay identical over time"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "easy",
     "explanation": "<p>A useful prompt library is curated: prompts carry metadata, are tested, versioned, owned, and periodically reviewed as models and business needs change.</p><p>Unreviewed publishing spreads low-quality or risky prompts. Personal notes defeat the purpose of sharing. Freezing prompts ignores model updates and changing requirements.</p>"
    },
    {
     "n": 33,
     "prompt": "<p>An HR department wants an agent that runs inside Microsoft 365 Copilot, uses Microsoft 365 Copilot's orchestrator and models, follows custom instructions, and is grounded in HR policy documents in SharePoint. The team has little development capacity. Which design should you recommend?</p>",
     "choices": [
      "A custom engine agent with its own orchestrator",
      "A fine-tuned model deployed in Microsoft Foundry",
      "A Power Apps canvas app embedded in Teams",
      "A declarative agent for Microsoft 365 Copilot"
     ],
     "answer": 3,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "easy",
     "explanation": "<p>Declarative agents customize Microsoft 365 Copilot with instructions, knowledge (such as SharePoint), and optional actions while reusing Copilot's orchestrator, models, and security, and they can be built with low or no code.</p><p>A custom engine agent brings its own orchestration and models, which adds development effort that is not required. A fine-tuned model is not an agent experience in Microsoft 365 Copilot. A canvas app does not provide Copilot conversational grounding.</p>"
    },
    {
     "n": 34,
     "prompt": "<p>An agent that drafts customer follow-up emails returns inconsistent structures: some outputs have subject lines, some do not, and lengths vary widely. Which prompt engineering change BEST addresses this?</p>",
     "choices": [
      "Increase the temperature so the model explores more creative structures",
      "Specify the required output format and include a sample response",
      "Shorten the instructions to a single sentence to reduce confusion",
      "Remove the customer context so the model focuses only on formatting"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Explicit format instructions plus one or more examples (few-shot prompting) are a core technique for consistent, structured output.</p><p>Higher temperature increases variability. Overly short instructions remove guidance. Removing context degrades content quality without guaranteeing format.</p>"
    },
    {
     "n": 35,
     "prompt": "<p>A Copilot Studio agent calls an order API through a custom connector. The API endpoint and credentials differ in development, test, and production. How should you design the agent so the same solution deploys to every environment?</p>",
     "choices": [
      "Hardcode each endpoint in the topic and edit it after import",
      "Maintain three copies of the agent, one per environment",
      "Store the credentials in a global variable inside the agent",
      "Use connection references and environment variables for the endpoint values"
     ],
     "answer": 3,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "medium",
     "explanation": "<p>Connection references decouple a solution's flows and actions from specific connections, and environment variables hold values such as endpoints that change per environment. Both are set at import time, so one managed solution moves through every stage.</p><p><em>Hardcoding and editing after import</em> creates unmanaged changes in downstream environments. <em>Three copies</em> multiply maintenance and drift. <em>Credentials in a variable</em> exposes secrets and still requires per-environment edits.</p>"
    },
    {
     "n": 36,
     "prompt": "<p>A construction firm's project teams each have a SharePoint site. Site owners want to quickly create an agent that answers questions only from their own site's documents and share it with team members, without involving IT developers. What should you recommend?</p>",
     "choices": [
      "Create a SharePoint agent scoped to the project site's content",
      "Build a custom engine agent for each project in Microsoft Foundry",
      "Configure an autonomous agent that copies site files to Dataverse",
      "Deploy a tenant-wide declarative agent that indexes every SharePoint site"
     ],
     "answer": 0,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "medium",
     "explanation": "<p>SharePoint agents can be created by site users directly from a site or selected files, are scoped to that content, respect existing permissions, and can be shared with colleagues.</p><p>A custom engine agent per project is heavy development work. Copying files to Dataverse duplicates content and adds governance risk. A tenant-wide agent does not meet the requirement to answer only from the project's own site.</p>"
    },
    {
     "n": 37,
     "prompt": "<p>Field engineers at remote wind farms have unreliable connectivity. They need an assistant on rugged tablets that classifies fault codes and suggests standard procedures from a narrow, well-defined manual. Which approach is MOST appropriate?</p>",
     "choices": [
      "A small language model customized for the task and deployed on the device",
      "The largest frontier model available, called from the cloud for every request",
      "A Copilot Studio agent that relies on web search for fault code meanings",
      "A declarative agent in Microsoft 365 Copilot that runs only in Teams"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Small language models suit narrow, well-defined tasks where low latency, offline or edge operation, and lower cost matter. Customizing one on the manual fits the scenario.</p><p>A cloud frontier model fails when connectivity is lost and is more expensive than needed. Web search is unreliable for proprietary fault codes and needs connectivity. A Teams-only declarative agent also requires connectivity and does not run on-device.</p>"
    },
    {
     "n": 38,
     "prompt": "<p>A software company builds agents with Microsoft Foundry Agent Service. Today, engineers configure instructions, tools, and model deployments by hand in the portal of the production project. What should you recommend to establish ALM?</p>",
     "choices": [
      "Define agent configuration as code and deploy it through CI/CD pipelines",
      "Continue configuring production by hand but take screenshots of settings",
      "Use one Foundry project for development, testing, and production",
      "Give every engineer the production project's API key for testing"
     ],
     "answer": 0,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "medium",
     "explanation": "<p>Treat agent definitions, instructions, tool configuration, and infrastructure as versioned code. Pipelines deploy them to separate development, test, and production projects, with evaluation gates and approvals, making changes reviewable and repeatable.</p><p><em>Screenshots</em> document settings but provide no version control, review, or automated deployment. A <em>single shared project</em> mixes experiments with production and removes isolation. <em>Sharing production keys</em> breaks least privilege and lets untested changes reach production.</p>"
    },
    {
     "n": 39,
     "prompt": "<p>A law firm wants generated contract clauses to consistently follow its house drafting style and structure. The underlying precedent documents change weekly and are stored in a document repository. Which approach should you recommend?</p>",
     "choices": [
      "Fine-tune in Microsoft Foundry for style and ground facts through retrieval",
      "Fine-tune a model on all precedent documents so the knowledge is stored in the weights",
      "Train a new foundation model from scratch on the firm's complete archive",
      "Raise the model temperature so outputs vary toward the firm's preferred style"
     ],
     "answer": 0,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "medium",
     "explanation": "<p>Fine-tuning is well suited to teaching consistent style, tone, and format, while retrieval-augmented generation keeps frequently changing knowledge current without retraining.</p><p>Embedding weekly-changing knowledge in model weights requires constant retraining and goes stale. Training a foundation model from scratch is prohibitively expensive. Higher temperature increases randomness, not stylistic consistency.</p>"
    },
    {
     "n": 40,
     "prompt": "<p>An insurer receives claim forms in a proprietary layout. Prebuilt document extraction models miss most fields. The insurer has several hundred labeled sample forms. What should you recommend?</p>",
     "choices": [
      "Train a new foundation language model from scratch on the claim forms",
      "Keep using the prebuilt receipt model and add more detailed instructions to the prompt",
      "Assign employees to retype every claim form into Dataverse by hand",
      "Train a custom extraction model in Document Intelligence using the labeled samples"
     ],
     "answer": 3,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>A custom model is justified when prebuilt models cannot meet accuracy for a domain-specific format and labeled data exists. Custom extraction models are built for exactly this scenario.</p><p>Training a foundation model is enormously expensive and unnecessary. A receipt model is designed for a different layout and prompts cannot fix that. Manual retyping does not use AI and does not scale.</p>"
    },
    {
     "n": 41,
     "prompt": "<p>A Copilot Studio agent must answer questions using only the company's approved knowledge sources and must not answer from the model's general training data. Which configuration should you use?</p>",
     "choices": [
      "Add the approved knowledge sources and turn off the use of general knowledge",
      "Add web search as a knowledge source so the agent always has an answer",
      "Lower the content moderation level so fewer answers are blocked",
      "Remove all knowledge sources so the agent relies only on its written instructions"
     ],
     "answer": 0,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "easy",
     "explanation": "<p>Copilot Studio lets you control whether generative answers can draw on the model's general knowledge. Disabling it and adding approved sources keeps answers grounded in company content.</p><p>Web search introduces unapproved public content. Moderation level controls filtering of harmful content, not source restriction. Removing knowledge sources leaves the agent with nothing approved to ground on.</p>"
    },
    {
     "n": 42,
     "prompt": "<p>A water utility wants customers who call its support line to talk to a Copilot Studio agent using natural speech, with the option to enter account numbers on the phone keypad, before being routed to a representative if needed. Which agent capability should you design for?</p>",
     "choices": [
      "Deep reasoning mode for multi-step analysis of requests",
      "Publishing the agent to a Teams channel",
      "A voice-enabled agent on Contact Center telephony",
      "An SMS channel with scheduled text replies"
     ],
     "answer": 2,
     "topic": "Extensibility of AI Solutions",
     "objective": "2.2",
     "difficulty": "easy",
     "explanation": "<p>Copilot Studio supports voice-enabled agents for interactive voice response scenarios, including speech recognition and DTMF (keypad) input, integrated with Dynamics 365 Contact Center telephony for routing to representatives.</p><p>Reasoning improves analysis of complex problems but does not provide a phone interface. Teams channels serve internal users, not public callers. SMS is text-based and does not support live speech.</p>"
    },
    {
     "n": 43,
     "prompt": "<p>A distributor wants to adopt new Copilot capabilities in Dynamics 365 Supply Chain Management. The operations lead wants to avoid surprising warehouse users. Which approach should you recommend?</p>",
     "choices": [
      "Let the features appear in production first and train users afterward",
      "Customize the standard application code to hide the new features",
      "Turn the features on from the Microsoft 365 admin center",
      "Enable the features in a sandbox through Feature management and validate first"
     ],
     "answer": 3,
     "topic": "ALM for AI Solutions",
     "objective": "3.3",
     "difficulty": "medium",
     "explanation": "<p>Finance and operations apps control many capabilities through Feature management per environment. Enabling and validating them in a sandbox, with user acceptance testing and training, before enabling in production is the supportable approach.</p><p><em>Enabling in production first</em> skips validation and creates the exact surprise the lead wants to avoid. <em>Customizing standard code</em> is unnecessary and increases upgrade risk. The <em>Microsoft 365 admin center</em> does not manage Feature management in finance and operations apps.</p>"
    },
    {
     "n": 44,
     "prompt": "<p>A distributor runs Dynamics 365 Sales, Dynamics 365 Customer Service, and Dynamics 365 Finance. It wants an agent that answers 'Why was this customer's order delayed and has the invoice been paid?' What should you recommend as the data foundation?</p>",
     "choices": [
      "Build one isolated agent per app, each with no knowledge of the other two apps' data",
      "Use Dataverse as the shared data layer, with dual-write or virtual tables for finance",
      "Export each app's data nightly to separate spreadsheets for the agent to read",
      "Train a custom language model on a one-time snapshot of all three apps"
     ],
     "answer": 1,
     "topic": "AI Strategy and Agent Design",
     "objective": "1.2",
     "difficulty": "medium",
     "explanation": "<p>Designs spanning multiple Dynamics 365 apps work best on a shared Dataverse layer. Dual-write or virtual tables bring finance and operations data alongside customer engagement data for cross-app reasoning.</p><p>Isolated agents cannot answer a question that spans orders, cases, and invoices. Nightly spreadsheets are stale and ungoverned. A snapshot-trained model is outdated immediately and cannot reflect live status.</p>"
    },
    {
     "n": 45,
     "prompt": "<p>A financial analyst wants to upload several raw spreadsheets in Microsoft 365 Copilot and receive trend analysis, forecasts, and charts that are computed step by step with code rather than estimated by the language model. Which prebuilt Microsoft 365 agent should you recommend?</p>",
     "choices": [
      "Researcher",
      "Facilitator",
      "Analyst",
      "Employee Self-Service"
     ],
     "answer": 2,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>The Analyst agent applies reasoning and can run code (such as Python) over data files to perform calculations, analysis, and visualizations, which suits spreadsheet-based quantitative analysis.</p><p>Researcher focuses on multi-step research and synthesis across work content and the web. Facilitator supports meetings and collaboration. Employee Self-Service answers HR and IT questions.</p>"
    },
    {
     "n": 46,
     "prompt": "<p>An agent summarizes vendor emails. A security review notes that an attacker could hide instructions inside an email that the agent would then follow. Which mitigation BEST addresses this risk?</p>",
     "choices": [
      "Raise the model temperature so responses are less predictable",
      "Encrypt the mailbox contents at rest with customer-managed keys",
      "Enable Prompt Shields for document attacks and limit the agent's tools",
      "Add more knowledge sources so the email has less influence"
     ],
     "answer": 2,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "easy",
     "explanation": "<p>Hidden instructions in retrieved content are an indirect prompt injection. Prompt Shields can detect document attacks, and limiting which tools and permissions the agent has reduces the damage if an attack succeeds.</p><p><em>Higher temperature</em> changes randomness, not resistance to injected instructions. <em>Encryption at rest</em> protects stored data but the agent still reads the decrypted content. <em>More knowledge sources</em> do not stop the model from following instructions within an email.</p>"
    },
    {
     "n": 47,
     "prompt": "<p>Which set of items BEST represents the total cost of ownership (TCO) for a Copilot Studio agent?</p>",
     "choices": [
      "Only the license fees, because consumption, support, and upkeep are covered by the vendor",
      "Only the initial development hours, because agents do not need ongoing work",
      "Only model inference cost, because people and data costs are not part of TCO",
      "Licensing, consumption, build, data preparation, operations, and change management"
     ],
     "answer": 3,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "easy",
     "explanation": "<p>TCO includes all costs over the solution's life: licenses and usage-based consumption, implementation, data work, operations, monitoring, updates, governance, and user enablement.</p><p>Each distractor captures only one cost category and ignores the rest. Agents need ongoing tuning, monitoring, and content maintenance, and people and data costs are often the largest components.</p>"
    },
    {
     "n": 48,
     "prompt": "<p>A manufacturer's sales organization uses Salesforce as its CRM and works mostly in Outlook and Teams. Sellers want CRM-aware email summaries, meeting preparation, and the ability to save emails to the CRM without switching apps. What should you recommend?</p>",
     "choices": [
      "Configure Microsoft 365 Copilot for Sales connected to Salesforce",
      "Migrate all CRM data to Dynamics 365 Sales before using any Copilot features",
      "Build a new agent in Copilot Studio that re-implements email summarization",
      "Create Power BI dashboards of Salesforce data and pin them in Teams"
     ],
     "answer": 0,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "easy",
     "explanation": "<p>Microsoft 365 Copilot for Sales works with both Dynamics 365 and Salesforce CRM and brings CRM insights into Outlook and Teams, including email summaries and saving activities to the CRM.</p><p>Migration is not required because Salesforce is supported. Re-implementing summarization in Copilot Studio duplicates a prebuilt capability. Power BI dashboards show reports but do not provide in-flow email and meeting assistance.</p>"
    },
    {
     "n": 49,
     "prompt": "<p>You are preparing an ROI analysis for using an agent in the accounts payable process. What should you do <strong>first</strong>?</p>",
     "choices": [
      "Measure the current baseline: volume, handling time, cost, and error rate",
      "Deploy the agent to production and estimate benefits from user opinions afterward",
      "Choose the most capable model available so that the benefits are maximized",
      "Use the vendor's published average savings figure as the expected benefit"
     ],
     "answer": 0,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "easy",
     "explanation": "<p>ROI requires a baseline. Without current volumes, times, costs, and error rates, you cannot quantify improvement or compare scenarios.</p><p>Deploying first removes the ability to compare before and after objectively. Model choice comes after understanding requirements and is a cost driver, not a benefit measure. Vendor averages are not specific to your process.</p>"
    },
    {
     "n": 50,
     "prompt": "<p>A Power Platform Center of Excellence wants makers to have a single place in Power Apps and Power Automate where they can discover, create, and manage AI Builder models and prompts. What should you direct them to?</p>",
     "choices": [
      "Power Platform admin center analytics",
      "Microsoft Purview compliance portal",
      "AI hub",
      "Dataverse solution explorer"
     ],
     "answer": 2,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "easy",
     "explanation": "<p>AI hub is the Power Platform experience that centralizes AI capabilities such as AI Builder prebuilt and custom models, document processing, and prompts for makers.</p><p>Admin center analytics reports on usage and capacity. Purview manages compliance and data governance. Solution explorer packages components for ALM but is not an AI discovery and authoring hub.</p>"
    },
    {
     "n": 51,
     "prompt": "<p>A company must prevent Copilot Studio makers from adding connectors for consumer social media services to agents, while allowing approved business connectors. What should you use?</p>",
     "choices": [
      "Data loss prevention policies in the Power Platform admin center",
      "Microsoft Purview sensitivity labels on SharePoint sites",
      "Microsoft Entra Conditional Access policies for makers",
      "Azure Firewall rules on the corporate network perimeter"
     ],
     "answer": 0,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "medium",
     "explanation": "<p>Power Platform DLP policies classify connectors as business, non-business, or blocked and apply to agents and flows in the targeted environments, which is how admins control which connectors agents can use.</p><p><em>Sensitivity labels</em> classify and protect content; they do not control connector usage. <em>Conditional Access</em> governs sign-in conditions, not which connectors a maker may add. <em>Azure Firewall</em> filters network traffic; cloud-to-cloud connector calls are governed in Power Platform.</p>"
    },
    {
     "n": 52,
     "prompt": "<p>A company wants employees to summarize Teams meetings and draft emails in Outlook. All users already have Microsoft 365. What is the BEST approach?</p>",
     "choices": [
      "Build a custom summarization agent in Microsoft Foundry for meetings and email",
      "Buy Microsoft 365 Copilot licenses and use the built-in capabilities",
      "Train a custom small language model on historical meeting transcripts",
      "Extend Dynamics 365 Sales with a custom summarization plug-in for all employees"
     ],
     "answer": 1,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "easy",
     "explanation": "<p>For common productivity scenarios that a SaaS product already covers, buying is usually fastest and lowest TCO.</p><p>Building a custom agent or training a model duplicates existing functionality at higher cost and risk. Dynamics 365 Sales is not the right product for organization-wide meeting and email productivity.</p>"
    },
    {
     "n": 53,
     "prompt": "<p>A telecom contact center wants to reduce average handle time by giving representatives an instant overview of a long case history and the current chat when they pick up a transferred conversation. Which Dynamics 365 Customer Service AI feature should you recommend?</p>",
     "choices": [
      "Copilot case and conversation summaries",
      "Customer Insights - Journeys segment generation",
      "Field Service schedule optimization",
      "Finance cash flow forecasting"
     ],
     "answer": 0,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "easy",
     "explanation": "<p>Copilot in Dynamics 365 Customer Service can summarize cases and conversations so that representatives quickly understand context, which shortens handle time for transfers.</p><p>Segment generation is a marketing feature. Schedule optimization assigns field technicians. Cash flow forecasting is a finance capability; none of them summarize service interactions.</p>"
    },
    {
     "n": 54,
     "prompt": "<p>A support portal sends a mix of simple FAQ-style questions and complex multi-step troubleshooting requests to one large reasoning model. Costs are high. You must reduce cost without degrading answers to complex requests. What should you recommend?</p>",
     "choices": [
      "Switch every request to the smallest available model to minimize token cost",
      "Keep the large reasoning model for every request and cap the number of daily users",
      "Deploy a model router in Microsoft Foundry",
      "Ask users to choose a model from a drop-down list before they submit each question"
     ],
     "answer": 2,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>A model router evaluates each prompt and routes it to an appropriate underlying model, using smaller models for simple requests and more capable models for complex ones, balancing cost and quality.</p><p>Using only the smallest model degrades complex answers. Capping users reduces value rather than optimizing cost. Asking users to pick models adds friction and relies on users understanding model trade-offs.</p>"
    },
    {
     "n": 55,
     "prompt": "<p>A healthcare agent tells users at the start of each conversation that they are interacting with AI, and it cites the source documents for each answer. Which responsible AI principle do these features MOST directly support?</p>",
     "choices": [
      "Inclusiveness",
      "Transparency",
      "Fairness",
      "Privacy and security"
     ],
     "answer": 1,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "medium",
     "explanation": "<p>Disclosing that users are talking to an AI system and showing where answers come from help people understand the system's nature and limitations, which is the transparency principle.</p><p><em>Inclusiveness</em> concerns empowering and engaging people of all abilities and backgrounds. <em>Fairness</em> concerns treating all people and groups equitably. <em>Privacy and security</em> concerns protecting data and resisting attacks, not disclosure to users.</p>"
    },
    {
     "n": 56,
     "prompt": "<p>A manufacturer wants the in-app help and guidance experience in Dynamics 365 Supply Chain Management to answer user questions using its own standard operating procedure documents stored in SharePoint, in addition to Microsoft's product documentation. What should you recommend?</p>",
     "choices": [
      "Rewrite the procedures as task guides in the legacy help pane of each form",
      "Add the SOP library as a knowledge source for in-app help in Copilot Studio",
      "Train a custom model in Microsoft Foundry on the SOPs and replace in-app help",
      "Import the SOP documents into a Dataverse table and enable auditing on it"
     ],
     "answer": 1,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>The Copilot-based in-app help and guidance for finance and operations apps is extensible through Copilot Studio, where you can add organization-specific knowledge sources such as SharePoint so answers include company procedures.</p><p>Rewriting procedures into the legacy help pane is manual and does not feed Copilot answers. Training and replacing in-app help with a custom model is unnecessary and loses product guidance. Storing documents in Dataverse does not connect them to the help experience.</p>"
    },
    {
     "n": 57,
     "prompt": "<p>A CFO asks which criteria to use when evaluating ROI for a portfolio of agent projects. What should you recommend?</p>",
     "choices": [
      "Use only license cost, choosing the projects with the lowest subscription fees",
      "Use only the number of agents deployed, since more agents means more value",
      "Combine quantified benefits and qualitative benefits with full TCO",
      "Use only employee sentiment surveys, because financial measures are unreliable for AI"
     ],
     "answer": 2,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>Sound ROI criteria compare total costs against measurable benefits (time, cost, revenue, quality, risk) and also capture strategic and qualitative value such as employee and customer satisfaction.</p><p>License cost alone ignores benefits and other costs. Agent count measures activity, not value. Sentiment matters but cannot stand alone as an ROI measure.</p>"
    },
    {
     "n": 58,
     "prompt": "<p>Compliance officers need a searchable record of who changed Copilot Studio agents and of user interactions with Microsoft 365 Copilot, retained for investigations. What should you recommend?</p>",
     "choices": [
      "Power BI usage metrics reports",
      "Microsoft Secure Score",
      "The Microsoft 365 Service health dashboard",
      "Microsoft Purview Audit"
     ],
     "answer": 3,
     "topic": "Responsible AI, Security, and Governance",
     "objective": "3.4",
     "difficulty": "medium",
     "explanation": "<p>Microsoft Purview Audit captures activities across Microsoft 365 and Power Platform, including Copilot and agent-related events, and supports search and retention for investigations.</p><p><em>Power BI usage metrics</em> report on report and dashboard views, not agent changes. <em>Secure Score</em> measures security posture; it is not an activity log. <em>Service health</em> reports service incidents, not tenant user activity.</p>"
    },
    {
     "n": 59,
     "prompt": "<p>Buyers at a consumer electronics company spend hours emailing vendors to confirm purchase order delivery dates and quantities and then updating the orders manually. Which prebuilt Dynamics 365 agent BEST addresses this?</p>",
     "choices": [
      "Account Reconciliation Agent in Finance",
      "Customer Intent Agent in Dynamics 365 Customer Service",
      "Supplier Communications Agent in Supply Chain Management",
      "Sales Qualification Agent in Sales"
     ],
     "answer": 2,
     "topic": "Prebuilt Agents and Apps",
     "objective": "2.3",
     "difficulty": "medium",
     "explanation": "<p>The Supplier Communications Agent helps procurement teams by handling vendor follow-up on purchase orders, such as confirmations and changes, and surfacing proposed updates for review in Supply Chain Management.</p><p>Account reconciliation addresses ledger matching. Customer Intent discovers service intents from conversations. Sales Qualification researches and qualifies leads; none of them handle vendor purchase order communication.</p>"
    },
    {
     "n": 60,
     "prompt": "<p>A company uses Dynamics 365 Customer Service with Copilot enabled. Agents need Copilot answers that reflect the company's own troubleshooting guides. What should you recommend?</p>",
     "choices": [
      "Extend the built-in Copilot by adding the troubleshooting guides as knowledge sources",
      "Build a separate custom agent in Foundry and ask service reps to switch between tools",
      "Replace Dynamics 365 Customer Service with a custom-built case management system",
      "Train a custom language model on the guides and host it on dedicated infrastructure"
     ],
     "answer": 0,
     "topic": "Costs, Benefits, and ROI",
     "objective": "1.3",
     "difficulty": "medium",
     "explanation": "<p>Extending an existing AI capability with company knowledge usually delivers value fastest at the lowest cost when the built-in experience already fits the workflow.</p><p>A separate agent adds build cost and context switching. Replacing the platform is far more expensive than the problem requires. Training a custom model adds cost and maintenance when grounding on knowledge sources solves the need.</p>"
    }
   ]
  }
 ]
};
