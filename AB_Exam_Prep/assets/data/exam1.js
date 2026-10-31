window.ABX_DATA = window.ABX_DATA || {};
window.ABX_DATA.exam1 = {
  "id": "exam1",
  "name": "AB-620 Practice Exam 1",
  "timeMinutes": 80,
  "units": [
    {
      "title": "",
      "html": "",
      "questions": [
        {
          "n": 1,
          "prompt": "<p>Cedar & Stone Hospitality needs an employee policy agent and a public guest concierge; guests must never see staff procedures.</p><p>What should you do?</p>",
          "choices": [
            "Design separate audience experiences with distinct identity, knowledge-access, and channel boundaries.",
            "Publish one agent everywhere and rely on a disclaimer.",
            "Put all content in one source and tell the prompt to hide staff pages.",
            "Let guests use the employee agent anonymously."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Internal and external audiences have different access needs, so plan identity, content permissions, and channels separately.</p><p><strong>Why not the others:</strong> B: A disclaimer doesn't enforce access control. C: Prompt instructions aren't an authorization boundary. D: Anonymous access conflicts with staff-only content.</p>"
        },
        {
          "n": 2,
          "prompt": "<p>Northwind Trail Gear's internal agent must retrieve service records using each signed-in employee's own permissions.</p><p>What should you do?</p>",
          "choices": [
            "Use the maker's credentials and ask the prompt to filter records.",
            "Preserve the user's identity and authorization context when the agent accesses records.",
            "Ask users to type their employee number into an anonymous agent.",
            "Use one unrestricted shared service account for all staff."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> The identity strategy must carry appropriate user context so data access checks remain effective.</p><p><strong>Why not the others:</strong> A: Prompts cannot replace per-user authorization. C: A typed identifier isn't authenticated identity. D: Shared access bypasses individual permissions.</p>"
        },
        {
          "n": 3,
          "prompt": "<p>Fabrikam Marine's manuals include export-controlled material that only approved technicians may access.</p><p>What should you do?</p>",
          "choices": [
            "Index all manuals publicly and instruct the agent not to quote controlled content.",
            "Give every technician access and hide sensitive responses in conversation history.",
            "Govern the knowledge permissions so retrieval respects each technician's approved access.",
            "Remove citations so restricted documents are harder to identify."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Knowledge sources and permissions must be governed together to preserve the intended boundary.</p><p><strong>Why not the others:</strong> A: Instructions do not enforce access restrictions. B: History is not an authorization control. D: Obscuring provenance doesn't prevent unauthorized retrieval.</p>"
        },
        {
          "n": 4,
          "prompt": "<p>Adatum Logistics' topic must pass a tracking number to a shipment lookup and use the returned estimated arrival date.</p><p>What should you do?</p>",
          "choices": [
            "Schedule a flow to poll every shipment and email the maker.",
            "Ask a generative answers node to estimate the date.",
            "Have the flow read an undocumented global variable.",
            "Create an agent flow with an explicit tracking-number input, lookup action, and date output, then map it in the topic."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Flow parameters define the topic-to-flow contract and expose the authoritative result to later nodes.</p><p><strong>Why not the others:</strong> A: A scheduled flow doesn't provide the requested topic input/output. B: A model cannot replace the authoritative lookup. C: Explicit parameters are more reliable than implicit state.</p>"
        },
        {
          "n": 5,
          "prompt": "<p>Woodgrove Credit Union's loan-exception flow needs a credit officer's review note before subsequent actions continue.</p><p>What should you do?</p>",
          "choices": [
            "Use Request for information to pause, collect the reviewer's input, and pass the returned value to later steps.",
            "Send an email and continue immediately with an empty note.",
            "Ask the model to infer what the officer would write.",
            "Create a topic variable and assume the officer edits it."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> The action pauses for designated human input and exposes the response as a later flow parameter.</p><p><strong>Why not the others:</strong> B: A normal email doesn't wait for a response. C: Model inference cannot replace required human judgment. D: A variable doesn't solicit reviewer input or pause the flow.</p>"
        },
        {
          "n": 6,
          "prompt": "<p>Relecloud's inventory flow sometimes times out. The agent must not report a false success, and support needs useful diagnostics.</p><p>What should you do?</p>",
          "choices": [
            "Return an empty inventory result as a successful lookup.",
            "Handle the connector failure explicitly, return a controlled failure result, and retain diagnostic context.",
            "Retry forever until the connector responds.",
            "Silently say the item is unavailable for every error."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> An explicit error path avoids misleading success and supports investigation.</p><p><strong>Why not the others:</strong> A: That hides failure and confuses it with valid empty data. C: Unbounded retries can stall and amplify an outage. D: This conceals errors and conflates failure with a valid result.</p>"
        },
        {
          "n": 7,
          "prompt": "<p>Tailspin Airways sees intermittent failures after updating a connector and needs to inspect affected executions.</p><p>What should you do?</p>",
          "choices": [
            "Use general conversation analytics as a replacement for run details.",
            "Duplicate the flow and wait for another failure.",
            "Review flow run history and details to correlate inputs, action outcomes, and errors.",
            "Rewrite the agent description to request more user detail."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Execution records help identify failing runs and the step that failed.</p><p><strong>Why not the others:</strong> A: Conversation metrics don't provide the needed execution diagnosis. B: A duplicate doesn't diagnose existing runs. D: The symptom followed a connector change, not necessarily poor input.</p>"
        },
        {
          "n": 8,
          "prompt": "<p>Wide World Importers' topic creates a return label; its flow returns a tracking code that must appear in the response.</p><p>What should you do?</p>",
          "choices": [
            "Ask generative answers to search the web for the new code.",
            "Insert a sample tracking code in the response.",
            "Call the flow after the final response.",
            "Call the flow, map its output, and compose the topic response using that mapped value."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> A topic can invoke a flow and use its returned output deterministically.</p><p><strong>Why not the others:</strong> A: A generated identifier isn't discoverable as knowledge. B: A hard-coded sample isn't the request's result. C: The output must be available before the response is sent.</p>"
        },
        {
          "n": 9,
          "prompt": "<p>Alpine Ski House needs a personalized cancellation answer using approved policy text and the reservation's cancellation window variable.</p><p>What should you do?</p>",
          "choices": [
            "Use a custom prompt with approved policy context and pass the variable explicitly as an input.",
            "Use an unconstrained prompt and let the model create policy.",
            "Search public web pages and expect the node to know the topic variable.",
            "Store a full response for every possible window."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Explicit context and input values shape a tailored response without inventing policy.</p><p><strong>Why not the others:</strong> B: This risks unsupported policy claims. C: A knowledge node won't receive an unpassed variable. D: Enumerated responses are brittle and avoid dynamic input.</p>"
        },
        {
          "n": 10,
          "prompt": "<p>Fourth Coffee's generative answers response must use only its approved employee-benefits site.</p><p>What should you do?</p>",
          "choices": [
            "Leave sources broad and merely tell the node to prefer the site.",
            "Configure the node to ground this response in the approved benefits source.",
            "Replace retrieval with an adaptive card listing benefit pages.",
            "Answer from model memory and cite the site afterward."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Selecting the intended knowledge source narrows grounding for this answer.</p><p><strong>Why not the others:</strong> A: A preference instruction is weaker than selecting the source. C: A card is presentation, not answer retrieval. D: A citation does not prove the answer was grounded there.</p>"
        },
        {
          "n": 11,
          "prompt": "<p>Proseware's topic formats a date differently for expedited service and must reuse the user's earlier selection.</p><p>What should you do?</p>",
          "choices": [
            "Put the condition in the global agent description.",
            "Create an environment for each service option.",
            "Store the selection in a topic variable and use a conditional response path to format the date.",
            "Call a REST endpoint to re-ask for the value."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Topic variables retain conversation values and branches can choose the matching response.</p><p><strong>Why not the others:</strong> A: Descriptions don't execute topic-specific branching. B: Deployment environments aren't conversation branches. D: An unnecessary call doesn't improve topic state handling.</p>"
        },
        {
          "n": 12,
          "prompt": "<p>Contoso Museum needs an event card with a title, date, and two explicit buttons that submit structured choices.</p><p>What should you do?</p>",
          "choices": [
            "Ask a generative answer to invent clickable controls in prose.",
            "Send raw card JSON to an API without rendering it in the conversation.",
            "Ask users to type labels and treat free text as a card submission.",
            "Render an adaptive card with data-bound text and submit actions, and verify channel support."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Cards can present structured content and submit user choices, subject to channel support.</p><p><strong>Why not the others:</strong> A: Generated text isn't an interactive control. B: An API request alone doesn't display a chat card. C: Free text isn't the explicit structured interaction requested.</p>"
        },
        {
          "n": 13,
          "prompt": "<p>Humongous Insurance's topic must fetch policy status from a REST endpoint using an API key, then explain the returned status.</p><p>What should you do?</p>",
          "choices": [
            "Configure an authenticated API tool with explicit request inputs and map its response into the topic.",
            "Add API documentation as knowledge and expect retrieval to execute it.",
            "Put the API key in the user-facing message.",
            "Use an adaptive card as the source of the status."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> An action needs secure authentication and input/output mapping before the topic can use its result.</p><p><strong>Why not the others:</strong> B: Knowledge retrieval does not call an API. C: This exposes a secret. D: A card presents an answer but doesn't retrieve it.</p>"
        },
        {
          "n": 14,
          "prompt": "<p>Blue Yonder Airlines wants employee answers from selected Microsoft 365 documents while respecting source access rules.</p><p>What should you do?</p>",
          "choices": [
            "Copy documents to a public website source.",
            "Use an appropriate Copilot connector-based knowledge integration and validate permissions and indexed content.",
            "Paste every document into instructions.",
            "Create a REST action for each document question."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Connectors can expose enterprise content for retrieval, but source permissions and indexing scope need governance.</p><p><strong>Why not the others:</strong> A: That exposes internal content. C: Instructions aren't a scalable permission-aware index. D: Per-question actions aren't the intended corpus search pattern.</p>"
        },
        {
          "n": 15,
          "prompt": "<p>Fabrikam Research needs semantic retrieval across millions of technical records in an existing Azure AI Search index.</p><p>What should you do?</p>",
          "choices": [
            "Create a card containing every indexed record.",
            "Treat the endpoint as a custom prompt without retrieving documents.",
            "Connect the relevant Azure AI Search index as a grounding source and validate retrieval behavior.",
            "Retrain a model on every record for each conversation."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Azure AI Search retrieves relevant indexed content to ground answers.</p><p><strong>Why not the others:</strong> A: A card isn't a practical index retrieval mechanism. B: A prompt does not replace retrieval. D: Per-request model training isn't the retrieval design.</p>"
        },
        {
          "n": 16,
          "prompt": "<p>Contoso's line-of-business content already has an IT-governed Copilot connector, and the agent needs to answer questions from it.</p><p>What should you do?</p>",
          "choices": [
            "Copy the source to a personal file store.",
            "Add the connector as an adaptive-card action.",
            "Put its URL in instructions and assume user-authorized querying.",
            "Reuse the governed connector and test representative queries and access behavior."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Reusing a governed connector avoids duplicating ingestion and preserves the configured source path.</p><p><strong>Why not the others:</strong> A: That bypasses governance and duplicates content. B: A knowledge connector is not card presentation. C: A URL doesn't configure authenticated integration.</p>"
        },
        {
          "n": 17,
          "prompt": "<p>Adventure Works needs current warranty status from a REST endpoint with a documented request and response contract.</p><p>What should you do?</p>",
          "choices": [
            "Add the REST API as an authenticated tool, map parameters, and expose relevant response fields.",
            "Add API documentation as knowledge and expect live status.",
            "Train a model on the API schema.",
            "Ask customers to paste the endpoint response."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A live API action needs configured authentication, schema, and outputs.</p><p><strong>Why not the others:</strong> B: Documentation retrieval doesn't call the service. C: Training won't execute the endpoint. D: This shifts a system integration task to users.</p>"
        },
        {
          "n": 18,
          "prompt": "<p>Litware's procurement service has an approved custom connector; its agent must create purchase requests.</p><p>What should you do?</p>",
          "choices": [
            "Rebuild it as HTTP and embed credentials in a prompt.",
            "Add the existing connector operation as a tool and configure its required inputs and connection.",
            "Use the connector as a knowledge source.",
            "Use computer use despite the available approved connector."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> A custom connector packages an approved operation and connection for reuse as an action.</p><p><strong>Why not the others:</strong> A: That duplicates an approved integration and mishandles secrets. C: Knowledge retrieval doesn't execute a create operation. D: GUI automation is unnecessary when a direct integration exists.</p>"
        },
        {
          "n": 19,
          "prompt": "<p>Northwind Robotics' MCP server has a read-only parts lookup and unrelated operations; the agent needs only the lookup.</p><p>What should you do?</p>",
          "choices": [
            "Use A2A because every remote tool is another agent.",
            "Index the server URL as knowledge and expect execution.",
            "Connect the MCP server and expose the specific parts-lookup capability the agent needs.",
            "Enable every operation and rely only on prompt instructions."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> MCP provides tools; limiting available capabilities reduces the agent's action surface.</p><p><strong>Why not the others:</strong> A: A2A connects agents, not ordinary tool operations. B: Knowledge retrieval doesn't invoke an MCP tool. D: Unneeded capabilities should be restricted where possible.</p>"
        },
        {
          "n": 20,
          "prompt": "<p>Woodgrove's travel agent must enter trip details into a legacy desktop app with no supported API or connector.</p><p>What should you do?</p>",
          "choices": [
            "Invent an MCP endpoint for the app.",
            "Search screenshots with generative answers.",
            "Share unrestricted maker credentials with all users without review.",
            "Consider computer use with a configured target machine, scoped credentials, and appropriate supervision."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Computer use can interact with GUIs when direct interfaces aren't available, but access needs care.</p><p><strong>Why not the others:</strong> A: A nonexistent API cannot be called. B: Knowledge retrieval cannot perform data entry. C: Shared credentials can grant access beyond user permissions.</p>"
        },
        {
          "n": 21,
          "prompt": "<p>A customer-service agent uses computer use on a changing claims portal, and the team wants to prevent unsafe actions and detect failed runs.</p><p>What should you do?</p>",
          "choices": [
            "Give the tool specific task instructions, scope its machine and identity, add supervision where appropriate, and monitor executions.",
            "Remove all instructions and let the tool decide the task.",
            "Use maker credentials for everyone and assume runs are safe.",
            "Treat a fluent final answer as proof that the portal transaction completed."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Computer use needs bounded instructions, credential governance, oversight, and run observability.</p><p><strong>Why not the others:</strong> B: Unbounded instructions increase unpredictability. C: Shared credentials can expose maker privileges. D: Completion requires execution evidence, not just text.</p>"
        },
        {
          "n": 22,
          "prompt": "<p>Adatum's main agent should send tax questions to a published Copilot Studio specialist that owns its own tools and instructions.</p><p>What should you do?</p>",
          "choices": [
            "Copy its instructions into the main agent and delete it.",
            "Connect the specialist agent and define when the orchestrator should delegate to it.",
            "Use Azure AI Search as a specialist agent.",
            "Put its admin credentials in its description."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A collaborator retains specialized behavior while the main agent routes relevant work.</p><p><strong>Why not the others:</strong> A: Copying loses independent maintenance and specialization. C: A search index is a knowledge resource, not an agent. D: Descriptions must not disclose secrets.</p>"
        },
        {
          "n": 23,
          "prompt": "<p>Proseware wants to connect a Microsoft Foundry agent to its Copilot Studio agent. The Foundry agent currently exposes only Responses and A2A endpoints.</p><p>What should the team do?</p>",
          "choices": [
            "Enable the Responses endpoint only; it is the required protocol for this connection.",
            "Add the Foundry agent as an MCP server because MCP is the required agent-connection protocol.",
            "Enable the Activity protocol endpoint for the Foundry agent before connecting it.",
            "Use the A2A endpoint alone because Copilot Studio connects to Foundry through A2A."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> The Copilot Studio Foundry-agent connection requires the Foundry agent to have its Activity protocol endpoint enabled; the Responses and A2A endpoints alone do not satisfy that prerequisite.</p><p><strong>Why not the others:</strong> A: The Responses endpoint is not the required endpoint for this connection. B: MCP exposes tools and resources; it is a different integration pattern. D: The Foundry connection requires Activity protocol even if an A2A endpoint is also available.</p>"
        },
        {
          "n": 24,
          "prompt": "<p>Fourth Coffee needs natural-language answers over a governed Fabric warehouse and has a Fabric data agent built for its semantic context.</p><p>What should you do?</p>",
          "choices": [
            "Publish every warehouse table as a public website source.",
            "Ask a text-generation agent to guess totals.",
            "Copy the warehouse into a spreadsheet for every question.",
            "Integrate the Fabric data agent as the data specialist and preserve its access boundary."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> The Fabric data agent is designed for Fabric data context; it avoids treating structured data as generic text.</p><p><strong>Why not the others:</strong> A: That exposes sensitive data and loses governance. B: Generated guesses aren't authoritative data. C: That is inefficient and bypasses governed access.</p>"
        },
        {
          "n": 25,
          "prompt": "<p>Tailspin's orchestrator must delegate contextual tasks to a partner's agent built on another framework; the partner supports A2A.</p><p>What should you do?</p>",
          "choices": [
            "Connect through the A2A endpoint and configure authentication and a clear delegation description.",
            "Treat the endpoint as a knowledge URL.",
            "Build a basic HTTP call despite the partner's A2A support.",
            "Use MCP because A2A and MCP are interchangeable."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A2A supports agent-to-agent task communication across frameworks; it fits better than a basic API call here.</p><p><strong>Why not the others:</strong> B: Knowledge retrieval doesn't establish A2A communication. C: HTTP alone lacks the A2A agent contract. D: A2A connects agents; MCP exposes tools/resources.</p>"
        },
        {
          "n": 26,
          "prompt": "<p>Blue Yonder Travel has hotel, rail, and accessibility specialists; a coordinator should call only relevant agents and combine validated results.</p><p>What should you do?</p>",
          "choices": [
            "Have every specialist answer every request.",
            "Give each specialist a bounded responsibility, route relevant subtasks, and synthesize returned results.",
            "Give all specialists identical descriptions.",
            "Chain all three agents even for unrelated requests."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Bounded roles improve routing and reduce unnecessary calls and ambiguity.</p><p><strong>Why not the others:</strong> A: This creates redundant work and conflicting results. C: The orchestrator can't distinguish their responsibilities. D: That adds unnecessary calls and access.</p>"
        },
        {
          "n": 27,
          "prompt": "<p>Fabrikam Energy has a Foundry-backed model and Azure AI Search index of technical procedures; answers must be grounded in the index.</p><p>What should you do?</p>",
          "choices": [
            "Use only the model and assume it knows current procedures.",
            "Use Application Insights as the procedure knowledge source.",
            "Use retrieval from Azure AI Search as grounding for generation with the configured model.",
            "Show the model endpoint in a card and ask users to interpret it."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Search supplies relevant evidence while the model generates from it rather than private model memory.</p><p><strong>Why not the others:</strong> A: Model memory may not include current private content. B: Telemetry is not the knowledge corpus. D: A card doesn't implement grounded generation.</p>"
        },
        {
          "n": 28,
          "prompt": "<p>Contoso Legal wants contract-review prompts tailored to a selected model from the Foundry model catalog.</p><p>What should you do?</p>",
          "choices": [
            "Choose Azure AI Search as the model.",
            "Put the prompt in Application Insights.",
            "Use an unrelated connector as the language model.",
            "Configure the selected Foundry model and a custom prompt with task-specific instructions and approved context."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Model selection controls generation and custom prompts shape the task and context.</p><p><strong>Why not the others:</strong> A: Search retrieves documents but doesn't generate the response. B: Telemetry doesn't execute prompts. C: Connectors retrieve or act; they aren't model selection.</p>"
        },
        {
          "n": 29,
          "prompt": "<p>Litware's production agent has sporadic latency and tool failures; engineers need runtime telemetry correlated across executions.</p><p>What should you do?</p>",
          "choices": [
            "Configure Application Insights telemetry and analyze traces and metrics for operational diagnosis.",
            "Add traces to public knowledge sources.",
            "Rely only on authoring preview tests.",
            "Keep errors only in an ephemeral prompt variable."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Application Insights provides runtime telemetry engineers can analyze across agent executions.</p><p><strong>Why not the others:</strong> B: Operational telemetry isn't user-facing grounding. C: A test view doesn't provide ongoing production monitoring. D: An ephemeral value isn't an operational monitoring system.</p>"
        },
        {
          "n": 30,
          "prompt": "<p>Cedar Grove Utilities needs to correlate failed agent tool calls with runtime telemetry for troubleshooting.</p><p>What should you do?</p>",
          "choices": [
            "Use the evaluation test set as a production telemetry store.",
            "Configure Application Insights telemetry and inspect relevant events and traces alongside agent outcomes.",
            "Add failed traces as public knowledge for users.",
            "Ask the agent to estimate failures from its final responses."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Application Insights provides operational telemetry that can help diagnose runtime behavior.</p><p><strong>Why not the others:</strong> A: Test sets evaluate scenarios rather than collect runtime traces. C: Operational events aren't user-facing knowledge. D: Self-reported estimates aren't reliable telemetry.</p>"
        },
        {
          "n": 31,
          "prompt": "<p>Northwind Marine has a fixed set of conversations and needs a consistent method to score response quality.</p><p>What should you do?</p>",
          "choices": [
            "Use the test-set title as the scoring method.",
            "Treat telemetry as each scenario's expected answer.",
            "Choose an evaluation method that assesses responses against the defined quality criteria and run it on the set.",
            "Count tools and infer answer quality."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Evaluation requires a scoring method aligned to the behavior being measured.</p><p><strong>Why not the others:</strong> A: A name doesn't score responses. B: Telemetry diagnoses behavior but isn't expected semantic content. D: Tool count isn't an answer-quality measure.</p>"
        },
        {
          "n": 32,
          "prompt": "<p>Woodgrove's test results show poor answers only for wire-transfer questions; the maker wants a targeted correction.</p><p>What should you do?</p>",
          "choices": [
            "Delete failed cases to raise the score.",
            "Rewrite every instruction without reviewing failures.",
            "Increase model capacity without evidence.",
            "Inspect failed cases and traces, identify the relevant knowledge or tool behavior, make a focused fix, and rerun."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Case-level review isolates failure causes and supports controlled improvement.</p><p><strong>Why not the others:</strong> A: That hides defects rather than fixing them. B: A broad rewrite can introduce regressions. C: That doesn't address the specific failure.</p>"
        },
        {
          "n": 33,
          "prompt": "<p>Relecloud wants to know whether its agent selects the right tool, not just whether its response sounds fluent.</p><p>What should you do?</p>",
          "choices": [
            "Use an evaluation approach that measures plan or tool-selection behavior and inspect those results.",
            "Score tone only and infer tool selection from wording.",
            "Compare results with unrelated telemetry.",
            "Test no cases that require a tool."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Evaluation should match the target behavior; fluent prose doesn't validate routing.</p><p><strong>Why not the others:</strong> B: Tone doesn't reveal the tool choice. C: Unrelated telemetry isn't a direct routing measure. D: The evaluation must cover the behavior.</p>"
        },
        {
          "n": 34,
          "prompt": "<p>Adventure Works must compare answers before and after a change against known scenarios before promoting the release.</p><p>What should you do?</p>",
          "choices": [
            "Replace the baseline with only successful new cases.",
            "Run the same representative test set before and after, review regressions, and apply acceptance criteria.",
            "Promote if the canvas has no syntax error.",
            "Score by number of source documents."
          ],
          "answer": 1,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Consistent comparison provides release evidence and exposes regressions.</p><p><strong>Why not the others:</strong> A: Changing the baseline hides regressions. C: Valid configuration doesn't prove scenario quality. D: Knowledge volume isn't answer quality.</p>"
        },
        {
          "n": 35,
          "prompt": "<p>Mapleline's quality lead wants a stable test set with representative user questions and behavior expected from the agent.</p><p>What should you do?</p>",
          "choices": [
            "Accept generated cases without inspection.",
            "Replace expectations with whatever the agent currently says.",
            "Create or curate conversations and expected behavior that cover ordinary cases and meaningful edge cases.",
            "Use production feedback alone as the test set."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A representative, reviewed set makes results useful as a repeatable quality signal.</p><p><strong>Why not the others:</strong> A: Generated cases may be irrelevant or inaccurate. B: That can encode current defects as acceptance criteria. D: Feedback is useful but doesn't guarantee systematic coverage.</p>"
        },
        {
          "n": 36,
          "prompt": "<p>Alpine Outfitters wants to move an agent, topic, and related flow from development to test as one managed release.</p><p>What should you do?</p>",
          "choices": [
            "Recreate everything manually from screenshots.",
            "Export only the agent name and assume dependencies follow.",
            "Publish development publicly and treat that channel as test.",
            "Create a solution with the agent and required related components, then promote that solution through environments."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Solutions package related components for managed ALM movement.</p><p><strong>Why not the others:</strong> A: Manual recreation is error-prone and loses relationships. B: Dependencies must be included deliberately. C: A public channel is not a controlled environment.</p>"
        },
        {
          "n": 37,
          "prompt": "<p>Fabrikam's existing agent predates its solution process, and the release manager needs to bring it under ALM.</p><p>What should you do?</p>",
          "choices": [
            "Add the existing agent to the appropriate solution and verify its dependent components.",
            "Create a duplicate in the solution and leave the original unmanaged.",
            "Rename the agent and assume it joined the solution.",
            "Export the maker's browser cache."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Existing agents can be added to solutions and managed with related components.</p><p><strong>Why not the others:</strong> B: This creates divergent artifacts. C: Renaming does not change solution membership. D: A cache isn't a deployable artifact.</p>"
        },
        {
          "n": 38,
          "prompt": "<p>Tailspin uses different API base URLs in development and production; the same agent artifact must work in both.</p><p>What should you do?</p>",
          "choices": [
            "Hard-code production URL into development before each test.",
            "Use an environment variable for the endpoint and configure its value for each target environment.",
            "Put endpoint and key in a public card.",
            "Create separate flows with duplicated endpoint logic."
          ],
          "answer": 1,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Environment variables externalize environment-specific configuration from the solution component.</p><p><strong>Why not the others:</strong> A: This couples environments and risks production calls. C: That exposes configuration and secrets. D: Duplicated implementations are harder to maintain.</p>"
        },
        {
          "n": 39,
          "prompt": "<p>Contoso's platform team wants a controlled process to promote agent solutions from development through test and production with approvals.</p><p>What should you do?</p>",
          "choices": [
            "Email an unmanaged zip to makers for ad hoc imports.",
            "Use a topic as a release approval mechanism.",
            "Use Power Platform Pipelines for the solution deployment path and apply the organization's release governance.",
            "Commit production secrets to source code."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Pipelines support governed solution deployment across designated environments.</p><p><strong>Why not the others:</strong> A: Email distribution lacks a controlled deployment process. B: Topics don't deploy solutions. D: Secrets must not be exposed in source control.</p>"
        },
        {
          "n": 40,
          "prompt": "<p>Proseware imported its solution into test, but its connection reference still points to a developer-owned resource.</p><p>What should you do?</p>",
          "choices": [
            "Leave the personal connection because import succeeded.",
            "Paste a test password into a topic variable.",
            "Store a plaintext password in an environment variable.",
            "Bind the connection reference to an authorized test-environment connection during deployment configuration."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Connection references decouple solution components from a maker-specific connection.</p><p><strong>Why not the others:</strong> A: Successful import doesn't make it suitable. B: Credentials shouldn't be exposed as conversation variables. C: Configuration values shouldn't expose secrets in plaintext.</p>"
        }
      ]
    }
  ]
};
