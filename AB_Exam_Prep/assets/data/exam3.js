window.ABX_DATA = window.ABX_DATA || {};
window.ABX_DATA.exam3 = {
  "id": "exam3",
  "name": "AB-620 Practice Exam 3",
  "timeMinutes": 80,
  "units": [
    {
      "title": "",
      "html": "<p>Original, unofficial practice. Not affiliated with Microsoft; no real exam items are reproduced.</p>",
      "questions": [
        {
          "n": 1,
          "prompt": "<p>Litware needs an employee agent in Teams and a public product-help agent on its website. Only employees may retrieve customer contracts. The agents should reuse supported integration components. What should you recommend?</p>",
          "choices": [
            "Publish one anonymous agent and suppress internal answers with an audience instruction.",
            "Publish both agents with one maker connection to the complete contract library.",
            "Require a contract number before searching the complete library from the public agent.",
            "Separate the audiences, enforce internal access controls, and reuse governed connectors."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Separate audience boundaries while reusing integrations; the data service must still authorize each request.</p><p><strong>Why not the others:</strong> A: Instructions do not enforce an access-control boundary. B: A shared privileged connection can expose internal contracts. C: Knowing a contract number does not prove authorization.</p>"
        },
        {
          "n": 2,
          "prompt": "<p>Proseware plans an agent that updates purchase orders through an enterprise API. Employees must retain their existing row-level permissions, and audit records must identify who requested a change. What identity design should you choose?</p>",
          "choices": [
            "Authenticate users and enforce their existing permissions at the API.",
            "Use one administrator connection and include the employee name in the prompt.",
            "Use anonymous access and collect the employee's department before changing orders.",
            "Use a shared writer identity and filter unauthorized results in the final response."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Authentication identifies the employee; downstream authorization preserves existing permissions.</p><p><strong>Why not the others:</strong> B: A name in prompt text does not constrain an administrator connection. C: Self-reported department information does not establish identity. D: Response filtering cannot prevent unauthorized writes already performed.</p>"
        },
        {
          "n": 3,
          "prompt": "<p>Alpine Ski House wants an agent to recommend refund decisions. Retrieved documents can contain customer-supplied text, and a manager must approve exceptions before money moves. What should the implementation plan prioritize?</p>",
          "choices": [
            "Lower model temperature and let the agent approve all refund-policy exceptions.",
            "Add a policy disclaimer and allow the refund tool to execute before review.",
            "Constrain grounding, enforce policy, and require approval before exception payments.",
            "Remove retrieval and let general model knowledge determine the current refund policy."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Grounding boundaries and enforceable oversight protect consequential actions.</p><p><strong>Why not the others:</strong> A: Lower randomness is not an approval control. B: A disclaimer does not replace approval before an irreversible action. D: Model memory is not authoritative company policy.</p>"
        },
        {
          "n": 4,
          "prompt": "<p>Fourth Coffee has separate support teams maintaining order and loyalty APIs. Three agents need the same validated integrations. Data policies prohibit mixing customer data with a consumer messaging connector. What should you do first?</p>",
          "choices": [
            "Copy API credentials into every agent and rely on a shared instruction template.",
            "Move the prohibited messaging operation to a flow to bypass connector classification.",
            "Enable every connector in production and remove blocked ones after user testing.",
            "Plan reusable connectors and validate their policy classification and permissions."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Reuse must fit environment data policies and least-privilege integration design.</p><p><strong>Why not the others:</strong> A: Duplicating credentials is not governed reuse. B: Flows remain subject to relevant data policies. C: Governance constraints must be resolved before production exposure.</p>"
        },
        {
          "n": 5,
          "prompt": "<p>Wide World Importers needs a topic to check stock, reserve an available quantity, and return a reservation identifier. The sequence must be explicit, with a branch for insufficient stock. What should you build?</p>",
          "choices": [
            "A generative answers node grounded only in the product catalog and reservation policy.",
            "Use a parameterized agent flow with stock checks, branching, and outputs.",
            "A custom prompt that predicts the next reservation identifier from previous transactions.",
            "An adaptive card that stores the requested quantity without invoking a backend action."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A flow expresses ordered integration steps and returns a structured outcome.</p><p><strong>Why not the others:</strong> A: Knowledge retrieval does not execute reservations. C: A generated identifier does not create a reservation. D: Collecting a quantity does not reserve stock.</p>"
        },
        {
          "n": 6,
          "prompt": "<p>Relecloud handles supplier onboarding in an agent flow. A reviewer may approve or reject a case. The supplier record must be created only after approval, and rejected cases need a visible result. What design meets these requirements?</p>",
          "choices": [
            "Create the supplier first and send an approval message when the flow finishes.",
            "Request approval and create the supplier only in the approved branch.",
            "Ask a custom prompt to impersonate the reviewer and return an approval Boolean.",
            "Ask the agent to stop if rejected but leave record creation outside the condition."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> The approval outcome controls the side effect, and both outcomes can be recorded.</p><p><strong>Why not the others:</strong> A: Approval after creation does not gate the side effect. C: A generated decision is not human approval. D: A natural-language instruction does not enforce the required flow branch.</p>"
        },
        {
          "n": 7,
          "prompt": "<p>Litware's order-creation flow sometimes times out after the API accepts the order. Blind retries create duplicates. The topic must report a reliable outcome without displaying internal exceptions. What should you implement?</p>",
          "choices": [
            "Retry every timeout with a new order identifier until the connector reports success.",
            "Convert every connector exception into a successful order response for the topic.",
            "Return the raw exception and ask the user to infer whether an order was created.",
            "Use backend-supported idempotency, handled failures, and safe status outputs."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Idempotency prevents duplicate effects; controlled outputs support recovery and diagnosis.</p><p><strong>Why not the others:</strong> A: New identifiers can create multiple orders. B: Reporting unconfirmed success hides failures. C: Raw exceptions may expose sensitive details and leave the outcome ambiguous.</p>"
        },
        {
          "n": 8,
          "prompt": "<p>Proseware's topic passes a customer display name where its flow requires a numeric customer ID. The flow also returns no value for the confirmation message. What should you change?</p>",
          "choices": [
            "Map the customer-ID input and expose the required confirmation output.",
            "Rename the topic and ask generative orchestration to infer the missing output.",
            "Add the customer directory as knowledge and remove the API input parameter.",
            "Store the confirmation in a designer comment and bind the message to that comment."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A clear parameter contract connects topic variables, action inputs, and response values.</p><p><strong>Why not the others:</strong> B: Renaming does not repair input types or outputs. C: Knowledge does not remove a required API input. D: Comments are not runtime output parameters.</p>"
        },
        {
          "n": 9,
          "prompt": "<p>Alpine Ski House collects dates in an adaptive card, calls an availability flow, and presents results. A guest edits an earlier date after a failed search. Old availability must not appear as current. What should you implement?</p>",
          "choices": [
            "Store the first availability result globally and reuse it for later card submissions.",
            "Validate card inputs, reset dependent results, and rerun with revised dates.",
            "Use a formatting prompt to relabel the old result with the newly selected dates.",
            "Remove required date fields and let the response node infer dates from conversation history."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Explicit state management prevents stale results from being paired with changed inputs.</p><p><strong>Why not the others:</strong> A: The cached result ignores changed search inputs. C: Presentation changes do not refresh availability. D: Unvalidated inferred dates are unreliable transaction inputs.</p>"
        },
        {
          "n": 10,
          "prompt": "<p>Fourth Coffee needs a warranty topic to answer only from an approved maintenance collection. Other topics may use broader knowledge. Answers must indicate when the approved collection lacks evidence. What should you configure?</p>",
          "choices": [
            "Add the collection to the agent and assume every answer uses it exclusively.",
            "Use a message node with the user question and enable Markdown formatting.",
            "Scope a generative answers node to approved sources and handle unanswered questions.",
            "Save the question through an HTTP write before generating an ungrounded answer."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Node-level grounding constrains this response path and enables an evidence-aware fallback.</p><p><strong>Why not the others:</strong> A: Agent-level knowledge is not automatically exclusive to every response. B: Formatting does not retrieve evidence. D: Saving a question does not supply authoritative evidence.</p>"
        },
        {
          "n": 11,
          "prompt": "<p>Wide World Importers retrieves a shipment through Send HTTP request in a topic. The API returns nested JSON, including status and internal diagnostics. Customers should see a concise status card, not the raw response. What should you do?</p>",
          "choices": [
            "Bind the complete JSON body directly to a visible card text field.",
            "Ask general model knowledge to reconstruct status without using the response.",
            "Parse approved fields into typed variables and format the customer response.",
            "Store the API credential in the card so the customer can retrieve the full body."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Separate extraction from presentation and expose only customer-appropriate fields.</p><p><strong>Why not the others:</strong> A: That exposes internal diagnostics. B: Model memory cannot determine this shipment's current status. D: Credentials must not be exposed in a client-visible response.</p>"
        },
        {
          "n": 12,
          "prompt": "<p>Relecloud retrieves approved incident details from a custom service. Its topic must consistently summarize impact, mitigation, and next update using those details rather than model memory. What should you add after retrieval?</p>",
          "choices": [
            "A greeting topic with examples of historical incident summaries.",
            "Use a structured custom prompt supplied with the retrieved incident details.",
            "An HTTP operation that writes the incident back without formatting its fields.",
            "A global variable containing one prewritten summary for all future incidents."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A prompt transforms authorized data into a controlled response structure.</p><p><strong>Why not the others:</strong> A: Historical examples do not supply current incident details. C: A write operation does not define the summary structure. D: A static summary cannot reflect different incident data.</p>"
        },
        {
          "n": 13,
          "prompt": "<p>Litware's address-change topic must validate a postal code, call a customer-update tool only after confirmation, and use the tool result in its final message. What is the best configuration?</p>",
          "choices": [
            "Describe the preferred order in a knowledge article and let the user find it.",
            "Call the update tool immediately and use a card only to confirm afterward.",
            "Show a success message before invoking the tool to reduce perceived latency.",
            "Validate, confirm, invoke the tool, and consume its outputs in sequence."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> An explicit node sequence controls a side effect and subsequent response.</p><p><strong>Why not the others:</strong> A: Knowledge content does not enforce the transactional sequence. B: Post-action confirmation is too late. C: Success must not be claimed before the tool outcome is known.</p>"
        },
        {
          "n": 14,
          "prompt": "<p>Proseware wants employees to discover content from an external repository through Microsoft 365 search and use it as agent knowledge. A supported Copilot connector exists and document-level permissions matter. What should you select?</p>",
          "choices": [
            "A computer-use tool that opens a repository page for every knowledge question.",
            "Use permission-aware Copilot connector ingestion for the approved external repository.",
            "A custom connector operation that updates repository metadata for each search.",
            "An environment variable containing a static export of the complete repository."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Copilot connectors bring external content into Microsoft 365 search while accounting for permissions.</p><p><strong>Why not the others:</strong> A: A GUI workflow does not provide indexed Microsoft 365 discovery. C: A transactional update is not a content indexing strategy. D: Configuration variables are not a searchable permission-aware index.</p>"
        },
        {
          "n": 15,
          "prompt": "<p>Wide World Importers needs answers grounded in engineering documents already vectorized in Azure AI Search. Users also need working links to the originals. What should the team verify?</p>",
          "choices": [
            "Every document URL is replaced with the search service administration endpoint.",
            "Verify the intended index and accessible document URLs for citations.",
            "The index stores only document titles, with document bodies removed after vector creation.",
            "A custom prompt invents missing source URLs from the document titles."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Relevant content grounds answers; source URL metadata supports citations users can open.</p><p><strong>Why not the others:</strong> A: An administration endpoint is not a source document link. C: Answers need usable retrieved content, not merely titles. D: Fabricated URLs do not provide trustworthy citations.</p>"
        },
        {
          "n": 16,
          "prompt": "<p>Fourth Coffee needs a shipment's current delivery state, not yesterday's indexed document. A supported Power Platform connector exposes a read operation for the shipment ID. What should you use?</p>",
          "choices": [
            "A periodically uploaded shipment-status PDF as the only knowledge source.",
            "A custom prompt using examples of common delivery delays as its evidence.",
            "A Copilot connector ingestion schedule instead of the available live read.",
            "Use an authorized live connector read with the validated shipment ID."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A live read meets the transactional freshness requirement.</p><p><strong>Why not the others:</strong> A: A periodic snapshot cannot guarantee current state. B: Examples cannot reveal a particular shipment's live state. C: Indexed discovery does not inherently satisfy immediate transactional freshness.</p>"
        },
        {
          "n": 17,
          "prompt": "<p>Relecloud indexes manuals from several product generations. The agent quotes an obsolete procedure even though the newest manual is present. Retrieved passages are from the old version. What should you investigate first?</p>",
          "choices": [
            "Increase the response length so the model can include more procedural detail.",
            "Switch the final response from Markdown to an adaptive card.",
            "Inspect version metadata and refine the corpus or retrieval filtering.",
            "Instruct the agent to consider every retrieved document equally current."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Wrong evidence requires retrieval and corpus correction before wording is tuned.</p><p><strong>Why not the others:</strong> A: Longer answers do not correct obsolete retrieved evidence. B: Presentation cannot change which version is retrieved. D: That reinforces the version problem.</p>"
        },
        {
          "n": 18,
          "prompt": "<p>Alpine Ski House must automate a legacy desktop booking application with no usable API. A trial works, but reservations are sometimes entered on the wrong screen. What should you configure before expanding the pilot?</p>",
          "choices": [
            "Add an application screenshot as knowledge and remove the automation tool.",
            "Add an MCP connection even though the application exposes no MCP server.",
            "Configure controlled computer use; inspect activity and refine screen-state instructions.",
            "Give unrestricted machine access and stop reviewing runs after one successful booking."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Computer use fits GUI-only systems, but configuration and observed execution require validation.</p><p><strong>Why not the others:</strong> A: A screenshot cannot enter reservations. B: An MCP client requires a compatible server. D: Broader access and no monitoring do not repair screen-state errors.</p>"
        },
        {
          "n": 19,
          "prompt": "<p>Litware has an approved MCP server exposing stock lookup and reorder tools. The agent should discover and invoke those capabilities with the server's required authentication. What should you add?</p>",
          "choices": [
            "Add an authenticated MCP connection with clear metadata and supported transport.",
            "An A2A agent connection using a stock tool schema as an agent card.",
            "A knowledge source containing only copied tool names and descriptions.",
            "A computer-use session that reads the MCP server's code for each request."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> MCP exposes server tools through a standard connection with the required authentication.</p><p><strong>Why not the others:</strong> B: A tool schema does not turn an MCP server into an A2A agent. C: Descriptions alone do not provide executable tools. D: Reading code is not the supported tool invocation contract.</p>"
        },
        {
          "n": 20,
          "prompt": "<p>Proseware already maintains an approved custom connector for its claims API. The agent needs its CheckClaim operation with the same authentication and parameter definitions. What should the builder do?</p>",
          "choices": [
            "Copy the connector description into knowledge and ask the model to execute it.",
            "Add the existing connector operation as a tool and map inputs.",
            "Add a public website source containing the API base URL as the integration.",
            "Store possible claim outcomes in a prompt and remove the API dependency."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Reuse preserves the maintained integration contract and connection model.</p><p><strong>Why not the others:</strong> A: Knowledge descriptions cannot execute the operation. C: A website source does not preserve the callable API contract. D: Predicted outcomes are not authoritative claim records.</p>"
        },
        {
          "n": 21,
          "prompt": "<p>Wide World Importers wants to add a partner REST API as an agent tool. Its OpenAPI description includes read and destructive operations. The initial release is strictly read-only. What should you do?</p>",
          "choices": [
            "Expose all operations and describe deletes as discouraged in the tool metadata.",
            "Import the schema as knowledge and expect REST calls to occur automatically.",
            "Expose approved reads only, with validated schemas, authentication, and mappings.",
            "Remove authentication because the API description does not contain customer data."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> The tool surface and backend permissions should match the read-only boundary.</p><p><strong>Why not the others:</strong> A: Instructions are weaker than excluding and denying destructive capabilities. B: Knowledge ingestion does not create executable API tools. D: The description's contents do not eliminate API access requirements.</p>"
        },
        {
          "n": 22,
          "prompt": "<p>Fourth Coffee's loyalty agent has a separate owner and release schedule and must remain directly available to users. The support agent should delegate loyalty questions to it. What design fits?</p>",
          "choices": [
            "Rebuild loyalty solely as a child of support and retire its separate deployment.",
            "Connect the existing independently managed agent with clear delegation metadata.",
            "Copy loyalty instructions into support before each support-team release.",
            "Treat the loyalty agent's sign-in page as a public knowledge website."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A connected agent preserves independent ownership and deployment while enabling reuse.</p><p><strong>Why not the others:</strong> A: That loses the independent lifecycle and direct availability. C: Copying text does not preserve the maintained executable agent. D: A website knowledge source is not an agent connection.</p>"
        },
        {
          "n": 23,
          "prompt": "<p>Relecloud approved a pilot using an existing Microsoft Foundry agent for equipment analysis. That specialist owns its tools and reasoning. Copilot Studio should delegate analysis rather than rebuild it as a static API call. What should you recommend?</p>",
          "choices": [
            "Use Foundry agent integration after checking authentication and preview suitability.",
            "Add the Foundry project homepage as knowledge and expect the specialist to run.",
            "Copy the model name into a prompt and assume the specialist's tools transfer.",
            "Connect without authentication because both products are Microsoft services."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Agent integration preserves specialist reasoning; preview capabilities need explicit suitability review.</p><p><strong>Why not the others:</strong> B: Retrieving project information does not invoke its agent. C: Model selection does not inherit another agent's tools. D: A shared vendor does not remove identity requirements.</p>"
        },
        {
          "n": 24,
          "prompt": "<p>Wide World Importers has an approved Fabric data agent answering governed analytical questions. Copilot Studio needs that capability in a pilot without duplicating analytical logic. What should you recommend?</p>",
          "choices": [
            "Upload a workspace screenshot and let model memory calculate live analytical results.",
            "Rewrite the analytical model as a collection of public website knowledge pages.",
            "Assume all topic redirects and channels support the data agent without testing.",
            "Connect the Fabric data agent; validate access and supported deployment scenarios."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> The integration delegates analytical questions to the governed specialist.</p><p><strong>Why not the others:</strong> A: A screenshot does not query governed analytical data. B: That duplicates logic and can lose data-access boundaries. C: Documented integration limitations must be checked for the intended scenario.</p>"
        },
        {
          "n": 25,
          "prompt": "<p>Proseware must delegate a multi-step investigation to a partner agent built outside Copilot Studio. The partner implements A2A and owns its reasoning. It exposes no MCP server. Which integration should you choose?</p>",
          "choices": [
            "An MCP connection using the partner's A2A endpoint without modification.",
            "Use an authenticated A2A connection with suitable endpoint and metadata.",
            "A website knowledge source using the partner agent's sign-in page.",
            "An environment variable containing the partner's reasoning instructions."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> A2A supports task delegation to independently implemented agents.</p><p><strong>Why not the others:</strong> A: MCP and A2A are different protocols. C: Retrieving a page does not delegate an investigation. D: Configuration text does not establish agent communication.</p>"
        },
        {
          "n": 26,
          "prompt": "<p>Litware's topic calls a Foundry-hosted RAG service using Azure AI Search. Fluent answers contradict source documents, and traces show irrelevant retrieved chunks. What should the team change first?</p>",
          "choices": [
            "Increase sampling randomness so the model can work around irrelevant evidence.",
            "Remove search and ask the model to state that every answer is grounded.",
            "Improve the retrieval pipeline and corpus, then reevaluate grounded responses.",
            "Add an Application Insights dashboard without changing the retrieval pipeline."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Generation depends on retrieved evidence, so irrelevant chunks need retrieval-side correction.</p><p><strong>Why not the others:</strong> A: Randomness cannot supply missing authoritative evidence. B: A grounding claim is not a retrieval process. D: Observability helps diagnosis but alone does not repair relevance.</p>"
        },
        {
          "n": 27,
          "prompt": "<p>Alpine Ski House is evaluating Foundry model catalog choices for a custom incident-summary prompt. It needs a strict output structure and approved data handling. What should drive model choice?</p>",
          "choices": [
            "Evaluate supported candidates against quality, format, latency, and data requirements.",
            "Choose the largest model because parameter count guarantees structured output.",
            "Choose any catalog entry because every region and deployment path behaves identically.",
            "Replace the prompt with Azure AI Search to obtain a model-selection score."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Model choice must satisfy functional and governance constraints with measured evidence.</p><p><strong>Why not the others:</strong> B: Size does not guarantee schema adherence or task quality. C: Availability and supported capabilities must be verified. D: Search retrieves information; it does not replace model evaluation.</p>"
        },
        {
          "n": 28,
          "prompt": "<p>Fourth Coffee sends telemetry to Application Insights. Production volume appears to spike when builders run many tests. The report must exclude test-canvas conversations without deleting useful diagnostics. What should you do?</p>",
          "choices": [
            "Filter test conversations using the telemetry designMode custom dimension.",
            "Disable Application Insights whenever any builder starts testing the agent.",
            "Delete all telemetry from the environment containing the production agent.",
            "Filter for authenticated users because all authenticated conversations are production."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> The documented designMode dimension distinguishes test-canvas activity.</p><p><strong>Why not the others:</strong> B: That interrupts collection instead of separating activity during analysis. C: That also discards production diagnostics. D: Builders can also be authenticated during tests.</p>"
        },
        {
          "n": 29,
          "prompt": "<p>Relecloud must diagnose slow agent paths using Application Insights. Privacy review prohibits collecting raw customer message text. What should the team do?</p>",
          "choices": [
            "Enable every sensitive logging option and delete the data after diagnosis.",
            "Restrict sensitive logging and analyze approved events and timing signals.",
            "Put messages in environment variables so telemetry cannot identify them.",
            "Disable monitoring permanently because every event necessarily contains a transcript."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Collection must honor privacy constraints; diagnosis need not capture all text.</p><p><strong>Why not the others:</strong> A: Collecting prohibited text already violates the constraint. C: Moving sensitive text into configuration does not make collection acceptable. D: Telemetry scope is configurable and need not include all message content.</p>"
        },
        {
          "n": 30,
          "prompt": "<p>Proseware uses a Foundry service to generate answers from Azure AI Search and returns them through Copilot Studio. The release requires traceable retrieval failures and must not expose internal stack traces. What design should you choose?</p>",
          "choices": [
            "Return an invented answer whenever the search service cannot be reached.",
            "Display the full service exception and access token in the final response.",
            "Correlate approved telemetry and return a safe fallback on retrieval failure.",
            "Log only the final message and assume it identifies every downstream failure."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Cross-system correlation supports diagnosis while controlled error handling protects the user response.</p><p><strong>Why not the others:</strong> A: Fabricated answers violate the grounding requirement. B: That exposes sensitive operational details and credentials. D: A final message alone cannot reliably attribute cross-system failures.</p>"
        },
        {
          "n": 31,
          "prompt": "<p>Wide World Importers tests a return-policy answer that can be correctly paraphrased. The expected meaning is fixed, but exact wording is not. Which evaluation method best matches the requirement?</p>",
          "choices": [
            "Use Compare meaning with an expected answer and passing threshold.",
            "Exact match against a single sentence including its punctuation.",
            "Tool use without an expected tool or topic selected.",
            "Keyword match requiring only the company name to appear."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Compare meaning checks semantic agreement rather than identical wording.</p><p><strong>Why not the others:</strong> B: Exact match rejects valid paraphrases. C: Tool use needs expected capabilities and tests invocation, not meaning. D: A company-name keyword does not establish semantic correctness.</p>"
        },
        {
          "n": 32,
          "prompt": "<p>Litware's cancellation agent must invoke the cancellation tool and report correct policy meaning. Semantic comparison passes even when the tool is skipped. What should the test design include?</p>",
          "choices": [
            "Replace all checks with Exact match on the final confirmation sentence.",
            "Raise the semantic passing threshold until tool invocation is implicitly guaranteed.",
            "Use Content safety alone because cancellation is a consequential action.",
            "Combine expected Tool use with Compare meaning against a reference."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Capability invocation and semantic correctness are separate requirements.</p><p><strong>Why not the others:</strong> A: Matching a sentence does not prove execution. B: A semantic score alone does not establish tool execution. C: Content safety does not validate transaction execution or policy meaning.</p>"
        },
        {
          "n": 33,
          "prompt": "<p>Proseware imports a test set, enables Compare meaning, and gets Invalid results for cases without expected responses. The agent produced answers. What should you do first?</p>",
          "choices": [
            "Supply missing expected answers and rerun the affected evaluation cases.",
            "Treat Invalid as confirmed hallucination and rewrite all agent instructions.",
            "Change the agent channel because imported cases cannot be evaluated semantically.",
            "Lower the passing threshold so missing reference responses receive a passing score."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Compare meaning requires expected answers; Invalid is not an agent-quality verdict.</p><p><strong>Why not the others:</strong> B: Incomplete evaluation configuration does not establish hallucination. C: Missing expected answers explain the result, not the channel. D: A threshold cannot supply the required reference answer.</p>"
        },
        {
          "n": 34,
          "prompt": "<p>Alpine Ski House sees a higher overall pass rate after a prompt change, but refund-exception cases fail more often. Those cases are a small, high-risk part of the test set. What should the release reviewer do?</p>",
          "choices": [
            "Release immediately because the overall pass rate is the only reliable quality signal.",
            "Delete refund-exception tests because they reduce the average score.",
            "Change test data and all prompts before comparing the two pass rates.",
            "Investigate high-risk regressions using segmented results and a stable test set."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Aggregate improvement can conceal consequential subgroup regressions.</p><p><strong>Why not the others:</strong> A: The aggregate masks the observed high-risk regression. B: Removing relevant failures hides risk. C: Multiple changed conditions undermine a meaningful before-and-after comparison.</p>"
        },
        {
          "n": 35,
          "prompt": "<p>Fourth Coffee's agent must decline requests outside its authorized scope. General quality flags some correct refusals for improvement. What evaluation approach best captures the intended behavior?</p>",
          "choices": [
            "Require the agent to answer every question so its abstention score improves.",
            "Use Tool use alone and mark any tool invocation as a successful refusal.",
            "Remove refusal cases and rely on successful knowledge-answer tests only.",
            "Define appropriate refusal in a custom evaluator's instructions and labels."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Custom criteria can classify required refusal as success when general quality is insufficient.</p><p><strong>Why not the others:</strong> A: That violates authorization and scope requirements. B: Invocation does not demonstrate an appropriate refusal. C: That stops testing required behavior.</p>"
        },
        {
          "n": 36,
          "prompt": "<p>Relecloud created an agent outside its team's custom release solution. The next deployment must carry that existing agent and required related components to test. What should the maker do?</p>",
          "choices": [
            "Add the existing agent and required dependencies to the custom solution.",
            "Copy the published chat URL into a solution description and export the empty solution.",
            "Recreate only the greeting in test and assume all tools are copied automatically.",
            "Export conversation transcripts as the agent's deployable definition."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A solution carries the existing agent and related components through ALM.</p><p><strong>Why not the others:</strong> B: A descriptive URL does not package components. C: A greeting does not transfer the existing agent and dependencies. D: Transcripts are conversation data, not a deployable definition.</p>"
        },
        {
          "n": 37,
          "prompt": "<p>Wide World Importers deploys one solution through development, test, and production. Each environment uses a different approved API URL and its own connection. The artifact should not be edited for each deployment. What should you configure?</p>",
          "choices": [
            "Use endpoint environment variables and properly bound connection references.",
            "Hard-code the development URL and maker credentials in exported topic definitions.",
            "Embed every user password and endpoint together in one environment variable.",
            "Use the production URL everywhere and separate requests by agent display name."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Environment-specific values and connection bindings belong outside hard-coded component logic.</p><p><strong>Why not the others:</strong> B: That is insecure and not portable. C: Environment variables do not replace authenticated connection management. D: A display name does not isolate traffic or supply proper target bindings.</p>"
        },
        {
          "n": 38,
          "prompt": "<p>Litware uses Power Platform Pipelines for an agent solution. Compliance requires approval before production and automated validation around deployment. Makers must not bypass the production gate. What should you recommend?</p>",
          "choices": [
            "Give every maker production import rights and put approvals in topic comments.",
            "Replace the pipeline with a knowledge article describing the release order.",
            "Use governed pipeline stages and supported approval and validation extensions.",
            "Deploy to production first and invoke approvals after users begin testing."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Pipeline controls and extensibility can enforce the release process.</p><p><strong>Why not the others:</strong> A: That allows bypassing the required gate. B: Documentation does not enforce permissions or deployment gates. D: Approval after deployment fails the preproduction requirement.</p>"
        },
        {
          "n": 39,
          "prompt": "<p>Proseware's agent solution imports into test, but its order tool cannot connect. The solution contains the flow and custom connector definition. Test needs a separate authorized connection. What should you inspect first?</p>",
          "choices": [
            "Assume the development connection was copied and rewrite the response prompt.",
            "Add the test API password to the visible welcome message for the tool.",
            "Replace the tool with an ungrounded success message to finish acceptance testing.",
            "Check target connection bindings, authorization, and environment-specific configuration."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Component import does not automatically supply an authenticated target connection.</p><p><strong>Why not the others:</strong> A: Response wording cannot repair target authentication. B: Conversation-visible credentials are unsafe and are not connection configuration. C: False success hides an integration failure.</p>"
        },
        {
          "n": 40,
          "prompt": "<p>Alpine Ski House needs repeatable releases of its existing agent, flows, and configuration through test to production. Manual production editing has made changes hard to trace. What should the team implement?</p>",
          "choices": [
            "Keep components outside solutions and copy selected nodes before each release.",
            "Deploy only environment variables and let the model reconstruct flow definitions.",
            "Promote a versioned solution containing related components through controlled stages.",
            "Use conversation exports as the sole source of truth for production changes."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Solution deployment supports repeatable promotion and traceable component versions.</p><p><strong>Why not the others:</strong> A: Manual copying does not provide a coherent release artifact. B: Configuration values do not contain executable definitions. D: Conversation records do not represent versioned solution components.</p>"
        }
      ]
    }
  ]
};
