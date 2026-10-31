window.ABX_DATA = window.ABX_DATA || {};
window.ABX_DATA.drills = (window.ABX_DATA.drills || []).concat([
  {
    "id": "ab620-1-1",
    "exam": "ab620",
    "domain": "Plan and configure agent solutions",
    "title": "Plan an agent solution",
    "blurb": "Practice audience, identity, deployment, responsible AI, governance, and reuse decisions for integrated agent solutions.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Relecloud wants an agent to answer public questions about service plans. Internal troubleshooting runbooks must remain employee-only. What should the builder plan first?</p>",
        "choices": [
          "Attach the internal runbooks and ask visitors not to request confidential sections.",
          "Define the external audience and expose only approved public resources.",
          "Use an administrator connection so every visitor receives complete answers.",
          "Collect a visitor nickname and use it as authorization for internal resources."
        ],
        "answer": 1,
        "topic": "Plan and configure agent solutions",
        "objective": "1.1 Plan an agent solution",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Audience boundaries determine appropriate knowledge, permissions, and capabilities.</p><p><strong>Why not the others:</strong> A: A visitor instruction is not an access boundary. C: That can expose privileged data. D: A nickname does not establish authorization.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Litware's internal agent must read each employee's expense records through an API without granting broader access. What identity strategy should you recommend?</p>",
        "choices": [
          "Authenticate employees and preserve per-user authorization at the expense service.",
          "Use one unrestricted maker connection and include the employee ID in the question.",
          "Allow anonymous sessions and authorize access from the employee name typed in chat.",
          "Read every employee record and hide unrelated records only in the final answer."
        ],
        "answer": 0,
        "topic": "Plan and configure agent solutions",
        "objective": "1.1 Plan an agent solution",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> The service must enforce what the authenticated user may read.</p><p><strong>Why not the others:</strong> B: A prompt value does not restrict a privileged connection. C: Self-reported identity is not authentication. D: Retrieving unauthorized data already violates the access boundary.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Alpine Ski House plans an employee agent in Teams and a guest-facing website agent. Guests need accessible reservation help, while employees need organizational sign-in. What should be included in the deployment plan?</p>",
        "choices": [
          "Assume test-chat behavior proves authentication works identically on every channel.",
          "Validate channels, authentication, and end-to-end behavior for each audience.",
          "Choose one channel without considering the users' existing access needs.",
          "Disable sign-in for employees to match the public website experience."
        ],
        "answer": 1,
        "topic": "Plan and configure agent solutions",
        "objective": "1.1 Plan an agent solution",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Channel and identity requirements must be verified for each intended audience.</p><p><strong>Why not the others:</strong> A: The authoring test chat does not validate every deployment channel. C: Audience needs are a core deployment constraint. D: That undermines the internal authentication requirement.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Proseware's agent proposes supplier-risk actions based on uploaded text. Reviewers must understand the evidence and approve consequential decisions. Which responsible AI design is best?</p>",
        "choices": [
          "Use a confident response tone and hide uncertainty to increase reviewer trust.",
          "Let uploaded instructions override policy whenever they contain an urgent request.",
          "Ground recommendations, expose uncertainty, and require review before consequential actions.",
          "Replace review with a disclaimer stating that recommendations might be incorrect."
        ],
        "answer": 2,
        "topic": "Plan and configure agent solutions",
        "objective": "1.1 Plan an agent solution",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Evidence, transparency, and oversight address unreliable or inappropriate model decisions.</p><p><strong>Why not the others:</strong> A: Confidence of phrasing is not evidence of correctness. B: Untrusted content must not override control instructions. D: A disclaimer does not enforce required oversight.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Fourth Coffee needs customer records in an agent, but policy blocks sending them to a personal email connector. What should the solution planner do?</p>",
        "choices": [
          "Move the email action into an agent flow to avoid the policy boundary.",
          "Rename the personal email connector to look like an internal service.",
          "Describe the prohibited transfer as a temporary test and publish it unchanged.",
          "Redesign the integration to comply with approved data-policy boundaries."
        ],
        "answer": 3,
        "topic": "Plan and configure agent solutions",
        "objective": "1.1 Plan an agent solution",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> The architecture must comply with connector governance and data protection requirements.</p><p><strong>Why not the others:</strong> A: A flow is not a data-policy bypass. B: A display name does not change policy classification. C: Calling it a test does not make the transfer compliant.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Wide World Importers plans four agents that all query the same approved product API. The integration team will maintain its contract centrally. What should you recommend?</p>",
        "choices": [
          "Reuse a governed connector with centrally maintained API and authentication definitions.",
          "Copy the API definition and hard-coded password into each agent's instructions.",
          "Train each prompt to guess product data so connectors are unnecessary.",
          "Store the API documentation as knowledge and assume it becomes executable."
        ],
        "answer": 0,
        "topic": "Plan and configure agent solutions",
        "objective": "1.1 Plan an agent solution",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> A reusable connector centralizes the supported API contract and authentication configuration.</p><p><strong>Why not the others:</strong> B: That duplicates sensitive implementation details instead of governing reuse. C: Generated guesses cannot replace authoritative API data. D: Documentation is not an authenticated operation.</p>"
      }
    ]
  },
  {
    "id": "ab620-1-2",
    "exam": "ab620",
    "domain": "Plan and configure agent solutions",
    "title": "Create and monitor agent flows in Copilot Studio",
    "blurb": "Practice deterministic flows, human approval, connector configuration, monitoring, parameters, and error handling.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Fourth Coffee needs automation that runs when its agent requests a store restock check. The process must query stock and branch on a threshold. What should you create?</p>",
        "choices": [
          "A knowledge source containing the stock threshold and previous inventory totals.",
          "A greeting topic that describes how staff could check inventory manually.",
          "Create an agent flow with an agent-call trigger, action, and condition.",
          "A static adaptive card with a success message and no action invocation."
        ],
        "answer": 2,
        "topic": "Plan and configure agent solutions",
        "objective": "1.2 Create and monitor agent flows",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> A flow provides an explicit trigger and rule-based action sequence.</p><p><strong>Why not the others:</strong> A: Knowledge does not execute the stock check. B: Describing steps does not automate the process. D: A static response does not query or branch on stock.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Relecloud automates access requests, but an owner must approve before permissions are granted. A rejection must leave permissions unchanged. How should the flow be structured?</p>",
        "choices": [
          "Grant access first and ask the owner to review it after completion.",
          "Request approval and grant permissions only in the approved branch.",
          "Use a custom prompt to predict whether the owner would approve access.",
          "Send an informational email and continue regardless of the owner's response."
        ],
        "answer": 1,
        "topic": "Plan and configure agent solutions",
        "objective": "1.2 Create and monitor agent flows",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> The human outcome must control the side effect.</p><p><strong>Why not the others:</strong> A: That violates approval before granting. C: Prediction is not the required human decision. D: A notification does not gate the action.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Litware adds a Dataverse lookup action to an agent flow. The correct table exists, but the selected connection cannot read it. What should the maker change?</p>",
        "choices": [
          "Configure the lookup inputs and use an authorized least-privilege connection.",
          "Increase the language model's response length to include more lookup context.",
          "Add the table name to the agent greeting and keep the unauthorized connection.",
          "Convert the lookup into a static text response containing an old record."
        ],
        "answer": 0,
        "topic": "Plan and configure agent solutions",
        "objective": "1.2 Create and monitor agent flows",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Connector actions need both correct configuration and permitted access.</p><p><strong>Why not the others:</strong> B: Response length cannot grant table permissions. C: Naming a table does not authorize the connector. D: A static record does not perform the required lookup.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Proseware's nightly reconciliation flow failed after working yesterday. The maker needs to find which action failed and inspect its execution details. Where should the maker begin?</p>",
        "choices": [
          "Review only the agent's welcome message for outdated wording.",
          "Inspect the solution publisher name as the primary runtime error trace.",
          "Change the test-set passing score before inspecting the failed execution.",
          "Inspect the failing run and its action inputs, outputs, and errors."
        ],
        "answer": 3,
        "topic": "Plan and configure agent solutions",
        "objective": "1.2 Create and monitor agent flows",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Run-level diagnostics identify the failed step and its context.</p><p><strong>Why not the others:</strong> A: The welcome message does not reveal the failed action. B: Publisher metadata is not run diagnostics. C: An evaluation threshold does not explain a flow-run failure.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Wide World Importers calls a flow from a topic using a product code. The topic needs the returned stock count for a condition. What configuration is required?</p>",
        "choices": [
          "Keep the values in flow comments and refer to the comments in the topic.",
          "Set the flow name to the product code and infer the count from its title.",
          "Define and map product-code input and stock-count output parameters.",
          "Write the stock count into a prompt example and remove the return value."
        ],
        "answer": 2,
        "topic": "Plan and configure agent solutions",
        "objective": "1.2 Create and monitor agent flows",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Explicit parameter mappings allow data to cross the topic-flow boundary.</p><p><strong>Why not the others:</strong> A: Comments are not runtime parameters. B: A name does not provide typed input and output contracts. D: An example is not the current flow result.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Alpine Ski House's flow receives a transient service error while updating a booking. Users need an understandable failure message, and support needs diagnostic context. What should you implement?</p>",
        "choices": [
          "Return success for all exceptions so the conversation remains friendly.",
          "Handle failures and return safe outcomes with support correlation references.",
          "Return the full stack trace and stored credentials in the response.",
          "Remove error branches and rely on a response-formatting prompt to recover."
        ],
        "answer": 1,
        "topic": "Plan and configure agent solutions",
        "objective": "1.2 Create and monitor agent flows",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Error handling separates useful diagnostics from the customer-facing response.</p><p><strong>Why not the others:</strong> A: That misrepresents whether the update succeeded. C: Sensitive diagnostics and credentials must not be exposed. D: Formatting alone cannot recover or classify a failed action.</p>"
      }
    ]
  },
  {
    "id": "ab620-1-3",
    "exam": "ab620",
    "domain": "Plan and configure agent solutions",
    "title": "Configure topics",
    "blurb": "Practice topic tools and flows, formatted grounded responses, HTTP integration, adaptive cards, and variable scope.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Alpine Ski House has an availability flow with arrival-date and departure-date inputs. A booking topic already collects both values. What should the builder do next?</p>",
        "choices": [
          "Add the flow description as a website knowledge source instead of invoking it.",
          "Rename the date variables to the flow name and remove its required inputs.",
          "Add the flow to the topic and map the collected dates.",
          "Display a fixed availability message without consuming the flow result."
        ],
        "answer": 2,
        "topic": "Plan and configure agent solutions",
        "objective": "1.3 Configure topics",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> The topic must invoke the flow with the correct data contract.</p><p><strong>Why not the others:</strong> A: A description does not run the flow. B: Names do not replace parameter mappings. D: A fixed message does not check the requested dates.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Fourth Coffee wants a topic to call a product tool and display three returned fields in a clear customer response. Internal fields must be omitted. What should you configure?</p>",
        "choices": [
          "Display the entire tool payload because formatting automatically hides internal fields.",
          "Invoke the tool and format only its approved output fields.",
          "Ask the model to invent three attractive values without calling the tool.",
          "Put internal fields in hidden prompt examples and display the raw tool output."
        ],
        "answer": 1,
        "topic": "Plan and configure agent solutions",
        "objective": "1.3 Configure topics",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Explicit output selection controls both content and presentation.</p><p><strong>Why not the others:</strong> A: Formatting does not automatically classify or redact fields. C: Invented values are not authoritative product results. D: Examples do not sanitize raw outputs.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Relecloud retrieves approved outage records through custom knowledge logic. Its topic must transform those records into an impact-and-mitigation response without adding unsupported facts. What should it use?</p>",
        "choices": [
          "Use general model memory and cite the custom source without retrieving it.",
          "Send an HTTP write operation to modify the outage before summarizing it.",
          "Supply retrieved records to a structured, grounding-aware custom prompt.",
          "Store one example outage summary globally and reuse it for every outage."
        ],
        "answer": 2,
        "topic": "Plan and configure agent solutions",
        "objective": "1.3 Configure topics",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> A custom prompt can transform authorized custom knowledge into the desired format.</p><p><strong>Why not the others:</strong> A: A citation claim does not provide evidence. B: Updating a record does not solve the response transformation task. D: A static example cannot represent each current outage.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Litware's topic calls a REST endpoint with Send HTTP request. The JSON body contains an array of cases. The next node needs the selected case's numeric priority. What should the builder do?</p>",
        "choices": [
          "Bind the complete JSON body to a numeric variable without parsing it.",
          "Ask a generative answers node to guess priority from the API host name.",
          "Change the response to Markdown before selecting a case from the array.",
          "Parse the response, select the case, and map its numeric priority."
        ],
        "answer": 3,
        "topic": "Plan and configure agent solutions",
        "objective": "1.3 Configure topics",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> The topic must interpret the actual API response before consuming a nested value.</p><p><strong>Why not the others:</strong> A: A structured body is not itself a numeric priority. B: A host name contains no authoritative case value. C: Presentation formatting does not resolve nested data access.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Wide World Importers wants one topic to answer from a designated approved policy collection rather than every knowledge source on the agent. What should it configure?</p>",
        "choices": [
          "A static message node containing the collection's display name.",
          "A global variable holding the policy library's administrator password.",
          "A tool description stating that unrelated knowledge should be preferred.",
          "Scope a generative answers node to the approved policy collection."
        ],
        "answer": 3,
        "topic": "Plan and configure agent solutions",
        "objective": "1.3 Configure topics",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Node-level knowledge configuration controls grounding for that response path.</p><p><strong>Why not the others:</strong> A: A name alone does not retrieve the collection. B: Credentials do not configure safe topic-level grounding. C: That does not establish the required collection scope.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Proseware collects a case ID in an adaptive card and uses it only within the current topic. Card submission values must be checked before invoking a case tool. What should you do?</p>",
        "choices": [
          "Map card inputs to topic variables and validate before tool invocation.",
          "Use a global variable for every card field and skip validation after submission.",
          "Treat the card's visual label as the tool parameter without an input binding.",
          "Invoke the case tool before submission and overwrite its input after completion."
        ],
        "answer": 0,
        "topic": "Plan and configure agent solutions",
        "objective": "1.3 Configure topics",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Card inputs require appropriate mapping, validation, and scope before tool execution.</p><p><strong>Why not the others:</strong> B: Broad scope and unchecked input are unnecessary and unsafe. C: A visual label is not a submitted-value mapping. D: The tool needs the validated input before it runs.</p>"
      }
    ]
  },
  {
    "id": "ab620-2-1",
    "exam": "ab620",
    "domain": "Integrate and extend agents in Copilot Studio",
    "title": "Connect to enterprise knowledge sources",
    "blurb": "Choose and troubleshoot Copilot connectors, Power Platform connectors, and Azure AI Search for enterprise grounding.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Litware wants external support articles discoverable in Microsoft 365 search and available for agent grounding. A supported Copilot connector exists. Which approach should the team evaluate?</p>",
        "choices": [
          "Ingest approved content through the Copilot connector with appropriate access metadata.",
          "Use a REST delete operation to register articles as searchable knowledge.",
          "Store article titles in environment variables as the enterprise search index.",
          "Run a computer-use tool solely to rename the agent for each article."
        ],
        "answer": 0,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.1 Connect to enterprise knowledge sources",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Copilot connectors support external content discovery and grounding in Microsoft 365.</p><p><strong>Why not the others:</strong> B: Deleting records is not a content indexing mechanism. C: Environment variables are configuration, not an enterprise index. D: Renaming an agent does not ingest external content.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Proseware's external repository has restricted legal documents. Its Copilot connector project must preserve which employees can discover each document. What should the builder validate?</p>",
        "choices": [
          "Index everything as public and ask the model to hide restricted document names.",
          "Copy all restricted files into a shared public folder before ingestion.",
          "Check only whether an administrator can find every document in search.",
          "Map source permissions correctly and verify discovery using different users."
        ],
        "answer": 3,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.1 Connect to enterprise knowledge sources",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Permission-aware ingestion must be tested against real authorization expectations.</p><p><strong>Why not the others:</strong> A: Instructions do not replace indexed access controls. B: That destroys the original access boundary. C: Administrator success does not prove access restrictions for other users.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Fourth Coffee needs live account status from a system supported by a Power Platform connector. The status changes throughout the day. What should the integration use?</p>",
        "choices": [
          "Use last month's exported account report as the only knowledge source.",
          "Ask the model to infer status from the customer's company name.",
          "Use a conversation-summary prompt without retrieving the account record.",
          "Use the supported live connector read with authorized access and required inputs."
        ],
        "answer": 3,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.1 Connect to enterprise knowledge sources",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> A live connector read retrieves current business data.</p><p><strong>Why not the others:</strong> A: A historical snapshot cannot provide current status. B: A name does not contain authoritative account state. C: Summarizing conversation does not query the business system.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Wide World Importers has a connector-backed customer lookup. It returns a valid record, but the topic asks about a different customer. What should the builder inspect first?</p>",
        "choices": [
          "Increase the response temperature to help the agent reinterpret the returned record.",
          "Replace every customer identifier with the connector's display name.",
          "Inspect identifier mappings, action inputs, and the connection's access context.",
          "Add the incorrect record as a permanent expected answer in evaluation."
        ],
        "answer": 2,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.1 Connect to enterprise knowledge sources",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Correct retrieval requires correct parameters and the intended access context.</p><p><strong>Why not the others:</strong> A: Randomness does not correct a wrong lookup. B: A connector name is not a customer key. D: That normalizes a failure rather than fixing retrieval.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Alpine Ski House already has an Azure AI Search index containing vectorized maintenance manuals. Its agent needs grounded answers from that collection. What should it add?</p>",
        "choices": [
          "A pipeline stage that imports only the index name as an agent greeting.",
          "Add the intended index through an Azure AI Search knowledge connection.",
          "A computer-use tool that edits the model's training data for every question.",
          "A static response saying that all manuals have been searched."
        ],
        "answer": 1,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.1 Connect to enterprise knowledge sources",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> A supported knowledge connection lets the agent retrieve indexed content.</p><p><strong>Why not the others:</strong> A: A greeting does not establish retrieval. C: That is not a knowledge connection to the existing index. D: A statement does not perform retrieval.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Relecloud's Azure AI Search answers are relevant, but citations do not link to the original manuals. What should the search-index design include?</p>",
        "choices": [
          "Include source-document URL metadata that authorized users can open.",
          "A single URL pointing to the Azure billing page for every document.",
          "A prompt instruction that fabricates a likely URL from each manual title.",
          "Only vector values, with all source references deliberately removed."
        ],
        "answer": 0,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.1 Connect to enterprise knowledge sources",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Usable source URL fields enable meaningful citations.</p><p><strong>Why not the others:</strong> B: A billing page is not the cited source content. C: Invented URLs are not reliable citations. D: Removing source references prevents useful provenance links.</p>"
      }
    ]
  },
  {
    "id": "ab620-2-2",
    "exam": "ab620",
    "domain": "Integrate and extend agents in Copilot Studio",
    "title": "Add tools to agents",
    "blurb": "Practice selecting, configuring, securing, and monitoring computer use, MCP tools, custom connectors, and REST APIs.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Fourth Coffee must enter approved totals into a legacy Windows application that has no supported API. A person can complete the task through its interface. Which tool should be evaluated?</p>",
        "choices": [
          "Configure computer use for the target machine with clear task instructions.",
          "An Azure AI Search source containing screenshots without an automation tool.",
          "An MCP connection to a server the application does not implement.",
          "An Exact match evaluation method applied to the application title."
        ],
        "answer": 0,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.2 Add tools to agents",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Computer use interacts with graphical applications through a virtual mouse and keyboard.</p><p><strong>Why not the others:</strong> B: Retrieving screenshots cannot enter totals. C: MCP requires an actual compatible server. D: Evaluation does not automate the application.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Alpine Ski House's computer-use pilot intermittently stops after a website changes its sign-in flow. The builder needs to find where execution diverges. What should the builder do?</p>",
        "choices": [
          "Assume all interface changes are harmless and remove monitoring from the pilot.",
          "Inspect execution evidence; refine instructions and validate changed sign-in handling.",
          "Put the website password in the visible tool description for easier diagnosis.",
          "Replace task instructions with one example of a successful final response."
        ],
        "answer": 1,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.2 Add tools to agents",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Monitoring actual GUI execution helps locate state and authentication failures.</p><p><strong>Why not the others:</strong> A: Adaptation is not a guarantee of success on every changed screen. C: Secrets must not be exposed in ordinary descriptions. D: A final response example does not diagnose screen interaction failures.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Litware has a functioning MCP server. The agent must choose its inventory tools at the right time and authenticate through the server's OAuth configuration. What should the builder configure?</p>",
        "choices": [
          "Import only the server homepage as knowledge and omit tool authentication.",
          "Use an A2A connection because OAuth automatically converts all protocols.",
          "Paste an access token into the user-facing greeting to make it globally available.",
          "Configure the MCP connection with clear metadata and matching OAuth settings."
        ],
        "answer": 3,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.2 Add tools to agents",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> The orchestrator uses metadata, while the connection supplies the supported authentication.</p><p><strong>Why not the others:</strong> A: A homepage does not expose authenticated MCP tools. B: Authentication does not make MCP and A2A interchangeable. C: That exposes credentials rather than configuring a secure connection.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Proseware attempts to connect an older MCP server that offers only the deprecated SSE transport. The current supported Copilot Studio integration expects Streamable transport. What should the team do?</p>",
        "choices": [
          "Upgrade to supported Streamable transport and retest the MCP connection.",
          "Change the server description while leaving its unsupported transport unchanged.",
          "Disable authentication because unauthenticated SSE is automatically supported.",
          "Add the server URL as an environment variable and assume that creates a tool connection."
        ],
        "answer": 0,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.2 Add tools to agents",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Transport compatibility must match the current supported MCP integration.</p><p><strong>Why not the others:</strong> B: Metadata cannot repair a transport incompatibility. C: Authentication settings do not change transport support. D: A stored URL does not establish the protocol connection.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Wide World Importers already has an approved custom connector exposing GetInvoice. Its agent needs the same operation. What should the maker do?</p>",
        "choices": [
          "Copy the connector's documentation into a message and expect the API to run.",
          "Add the existing connector operation as a tool and map the invoice ID.",
          "Use a content-safety evaluator to retrieve the invoice from the business system.",
          "Replace the invoice identifier with an unrelated topic title in the request."
        ],
        "answer": 1,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.2 Add tools to agents",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Existing connector operations can be reused as agent tools.</p><p><strong>Why not the others:</strong> A: Documentation is not invocation. C: An evaluator is not a business-data connector. D: The API needs its actual required identifier.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Relecloud adds a REST-based tool for a partner service. The API requires authentication and a case ID, and returns a structured status. What should the builder validate?</p>",
        "choices": [
          "Only the tool icon, because imported operations always infer every runtime requirement.",
          "Only the final answer wording, with the API response ignored after execution.",
          "Validate the API definition, operation, authentication, and parameter contract.",
          "Only the knowledge-source title, because a REST tool is automatically a knowledge document."
        ],
        "answer": 2,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.2 Add tools to agents",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> A reliable tool requires a correctly configured callable API contract.</p><p><strong>Why not the others:</strong> A: Icons do not configure authentication or required inputs. B: Ignoring outputs prevents a trustworthy status response. D: Executable REST tools and knowledge documents are different integration types.</p>"
      }
    ]
  },
  {
    "id": "ab620-2-3",
    "exam": "ab620",
    "domain": "Integrate and extend agents in Copilot Studio",
    "title": "Configure multi-agent collaboration from Copilot Studio",
    "blurb": "Design modular collaboration and choose existing Copilot Studio, Foundry, Fabric, or A2A agent integration patterns.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Fourth Coffee has one cohesive development team and wants to group a single task's tools and knowledge inside its main agent. The helper does not need separate publishing or reuse. What should the team consider?</p>",
        "choices": [
          "Create an externally hosted A2A agent solely to rename the same task.",
          "Create a focused child agent inside the main agent.",
          "Copy every tool into separate independently published agents by default.",
          "Use an environment variable as a replacement for the helper's orchestration."
        ],
        "answer": 1,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.3 Configure multi-agent collaboration",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Child agents provide logical specialization without an independent lifecycle.</p><p><strong>Why not the others:</strong> A: That adds an unnecessary external lifecycle and protocol boundary. C: Independent deployment is not required for this focused helper. D: Configuration storage does not provide agent behavior.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Litware wants a main agent to coordinate procurement and compliance specialists. Each specialist has separate owners, permissions, and release validation. What should the design prioritize?</p>",
        "choices": [
          "Connect specialists with clear responsibilities, least privilege, and delegation tests.",
          "Merge every credential and tool into one agent to eliminate all governance boundaries.",
          "Delegate every request to every specialist and combine all responses without routing.",
          "Assume each specialist's unit tests prove the complete multi-agent workflow."
        ],
        "answer": 0,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.3 Configure multi-agent collaboration",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Separate ownership and boundaries fit independently managed connected agents.</p><p><strong>Why not the others:</strong> B: That undermines the required ownership and permission separation. C: Indiscriminate delegation adds latency and risks inappropriate data sharing. D: Cross-agent orchestration and failures need end-to-end validation.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Proseware already has a published Copilot Studio agent for travel policy in the same environment. Another agent needs to delegate travel questions while the specialist remains independently maintained. What should it use?</p>",
        "choices": [
          "A copy of the specialist's welcome message as the full travel integration.",
          "A REST tool pointing only to the specialist's authoring-page URL.",
          "A replacement static topic containing all historical travel answers.",
          "Connect the existing Copilot Studio agent with clear scope metadata."
        ],
        "answer": 3,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.3 Configure multi-agent collaboration",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Connecting an existing agent enables delegation without duplicating implementation.</p><p><strong>Why not the others:</strong> A: A welcome message does not invoke specialist behavior. B: An authoring page is not a callable specialist integration. C: Static copied answers do not preserve maintained agent behavior.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Relecloud has approved a preview pilot in which a Copilot Studio agent delegates equipment diagnosis to an existing Foundry agent. What should the builder integrate?</p>",
        "choices": [
          "Only the Foundry model catalog description as a website knowledge page.",
          "Only the model name in the greeting, assuming all specialist tools transfer.",
          "Use the supported Foundry agent connection with appropriate access configuration.",
          "An anonymous connection regardless of the specialist's authorization requirements."
        ],
        "answer": 2,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.3 Configure multi-agent collaboration",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> The supported integration delegates to the specialist agent, including its own reasoning.</p><p><strong>Why not the others:</strong> A: A catalog description does not invoke an agent. B: Model identity does not transfer agent capabilities. D: Preview status does not waive access controls.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Wide World Importers wants a pilot agent to answer governed analytical questions through an existing Fabric data agent. Analytical logic should stay in Fabric. What should the builder recommend?</p>",
        "choices": [
          "Convert every analytical question into a public-web search to avoid Fabric permissions.",
          "Connect the Fabric data agent and validate scenario and channel support.",
          "Export one dashboard image and use it as the sole source for live calculations.",
          "Replace the data agent with a text prompt containing its workspace name."
        ],
        "answer": 1,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.3 Configure multi-agent collaboration",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Delegation reuses the analytical specialist, subject to documented integration limitations.</p><p><strong>Why not the others:</strong> A: That neither preserves governed analytics nor respects the access model. C: A static image does not query current analytical data. D: A workspace name is not an analytical execution capability.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Alpine Ski House has a partner specialist that supports A2A but is built on a different framework. The agent must delegate a task with context and receive the specialist response. What should it configure?</p>",
        "choices": [
          "An MCP connection because all agent communication protocols use the same schema.",
          "A knowledge source pointing to the partner's login page instead of an agent connection.",
          "Configure an authenticated A2A connection to the described partner agent.",
          "A shared prompt file with no communication endpoint or connection."
        ],
        "answer": 2,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.3 Configure multi-agent collaboration",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> A2A provides an interoperable agent task-delegation contract.</p><p><strong>Why not the others:</strong> A: MCP tool access and A2A agent delegation use different contracts. B: A login page does not execute delegated tasks. D: Text alone cannot communicate with the external specialist.</p>"
      }
    ]
  },
  {
    "id": "ab620-2-4",
    "exam": "ab620",
    "domain": "Integrate and extend agents in Copilot Studio",
    "title": "Integrate agents with Azure",
    "blurb": "Practice Azure AI Search and Foundry grounding, model-backed custom prompts, and Application Insights telemetry.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Relecloud wants its Foundry-based answer service to generate responses using approved maintenance documents indexed in Azure AI Search. Which design should its Copilot Studio integration invoke?</p>",
        "choices": [
          "Invoke RAG that supplies relevant approved search results to generation.",
          "A generation-only prompt that claims to have searched the index without querying it.",
          "A solution import that replaces every manual with the model deployment name.",
          "A telemetry query used as the sole source of all maintenance procedures."
        ],
        "answer": 0,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.4 Integrate agents with Azure",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> RAG grounds generation in retrieved evidence from the approved index.</p><p><strong>Why not the others:</strong> B: A claim is not retrieval. C: A deployment name does not contain document evidence. D: Operational telemetry is not the approved document corpus.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Litware's Foundry RAG service retrieves outdated documents from Azure AI Search and then produces accurate summaries of those outdated documents. Which change addresses the root cause?</p>",
        "choices": [
          "Raise the generation temperature while keeping the same stale retrieved documents.",
          "Change only the final response color so users recognize old procedures.",
          "Correct corpus freshness and retrieval selection, then retest current answers.",
          "Remove citations while preserving obsolete evidence in the prompt."
        ],
        "answer": 2,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.4 Integrate agents with Azure",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Faithful summarization cannot compensate for stale retrieved evidence.</p><p><strong>Why not the others:</strong> A: Randomness does not refresh the corpus. B: Presentation does not correct source freshness. D: Hiding provenance leaves the incorrect grounding unchanged.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Proseware wants a custom prompt to classify support requests and return a structured result using an approved model available through Foundry. What should the builder validate?</p>",
        "choices": [
          "Only the marketing name, because all catalog models accept identical inputs and outputs.",
          "Only the index schema, because search configuration automatically selects the best model.",
          "Only the greeting text, because a greeting controls the prompt's response schema.",
          "Validate supported integration, deployment requirements, response behavior, and task quality."
        ],
        "answer": 3,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.4 Integrate agents with Azure",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> A catalog choice must be usable in the intended integration and meet task requirements.</p><p><strong>Why not the others:</strong> A: Model capabilities and deployment requirements vary. B: Search schema does not establish model suitability. C: A greeting does not enforce structured prompt behavior.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Alpine Ski House compares two supported Foundry model options for an incident-summary prompt. Both meet governance requirements, but one is faster and omits required mitigation details. What should the team do?</p>",
        "choices": [
          "Select the faster model solely because low latency proves better task quality.",
          "Evaluate quality and latency using representative inputs and required outputs.",
          "Select the slower model solely because longer execution guarantees correctness.",
          "Remove mitigation from the criteria so both models appear equally complete."
        ],
        "answer": 1,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.4 Integrate agents with Azure",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Model selection balances measured performance with functional acceptance criteria.</p><p><strong>Why not the others:</strong> A: Speed does not establish completeness. C: Latency is not proof of quality either. D: That changes the requirement rather than satisfying it.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Fourth Coffee needs agent-level telemetry in Azure for operational analysis. Which service should the builder connect to the agent?</p>",
        "choices": [
          "Azure AI Search, configured as a replacement for operational telemetry collection.",
          "A model catalog entry, configured to store all application execution events.",
          "A static adaptive card, configured as the system's persistent monitoring backend.",
          "Connect Application Insights using the required telemetry configuration."
        ],
        "answer": 3,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.4 Integrate agents with Azure",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Copilot Studio can send agent events to Application Insights for analysis.</p><p><strong>Why not the others:</strong> A: Search is a retrieval service, not the agent telemetry destination. B: A model catalog is not an operational telemetry store. C: A response card is not a monitoring backend.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Wide World Importers connected Application Insights. Analysts want production conversation counts excluding authoring tests. What should they do?</p>",
        "choices": [
          "Delete all events from days when any maker used the test panel.",
          "Count only long responses because test responses are always shorter.",
          "Filter out test-canvas events using the telemetry designMode dimension.",
          "Disable all telemetry and estimate production counts from prompt examples."
        ],
        "answer": 2,
        "topic": "Integrate and extend agents in Copilot Studio",
        "objective": "2.4 Integrate agents with Azure",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> designMode identifies test-canvas telemetry for filtering.</p><p><strong>Why not the others:</strong> A: That also removes valid production events from those days. B: Response length does not identify tests. D: Prompt examples are not production usage evidence.</p>"
      }
    ]
  },
  {
    "id": "ab620-3-1",
    "exam": "ab620",
    "domain": "Test and manage agents",
    "title": "Evaluate agent performance",
    "blurb": "Build representative test sets, select evaluation methods, and interpret results without hiding important regressions.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Fourth Coffee is preparing a test set for a store-support agent. The initial draft contains only three common successful questions. What should the reviewer add?</p>",
        "choices": [
          "Only more copies of the easiest question to increase the pass rate.",
          "Add realistic paraphrases, edge cases, unsupported requests, and failure scenarios.",
          "Only the greeting text because it is shown in every session.",
          "Only questions that the model generated without any relevance review."
        ],
        "answer": 1,
        "topic": "Test and manage agents",
        "objective": "3.1 Evaluate agent performance",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Coverage should represent expected use and important failure behavior.</p><p><strong>Why not the others:</strong> A: Repeated easy cases create misleading coverage. C: Greeting coverage does not test the supported tasks. D: Unreviewed generated cases may not reflect requirements.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Litware generates draft test cases from agent knowledge. Some expected answers refer to retired procedures. What should the team do before treating the set as a release baseline?</p>",
        "choices": [
          "Accept every generated reference because generation guarantees factual correctness.",
          "Rewrite the agent to reproduce the retired procedure in order to pass.",
          "Remove all expected answers and keep Exact match enabled for every case.",
          "Validate cases and expected answers against current approved requirements."
        ],
        "answer": 3,
        "topic": "Test and manage agents",
        "objective": "3.1 Evaluate agent performance",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Generated tests still require human validation and authoritative references.</p><p><strong>Why not the others:</strong> A: Generation does not guarantee a current correct baseline. B: That optimizes for an incorrect expectation. C: Exact match requires an expected answer.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Wide World Importers needs an agent to return one precise warehouse code with no extra text. Which test method best validates the final response?</p>",
        "choices": [
          "Use Exact match against the complete required warehouse-code response.",
          "Compare meaning with a broad paragraph about the warehouse network.",
          "Keyword match requiring only one digit found anywhere in the answer.",
          "Tool use requiring any unrelated knowledge topic to execute."
        ],
        "answer": 0,
        "topic": "Test and manage agents",
        "objective": "3.1 Evaluate agent performance",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Exact match validates the entire response character for character.</p><p><strong>Why not the others:</strong> B: Semantic similarity does not enforce the exact code-only response. C: A partial digit does not validate the full response. D: Resource use does not prove exact output text.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Proseware must verify that a topic uses the approved lookup tool and that its final explanation preserves the reference meaning despite paraphrasing. What should the test use?</p>",
        "choices": [
          "Exact match alone on a friendly opening phrase common to all replies.",
          "Keyword match alone requiring the word lookup in the response.",
          "Content safety alone with a permissive threshold for every category.",
          "Combine expected Tool use with Compare meaning against a reference."
        ],
        "answer": 3,
        "topic": "Test and manage agents",
        "objective": "3.1 Evaluate agent performance",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Separate methods test invocation and semantic correctness.</p><p><strong>Why not the others:</strong> A: A greeting does not establish invocation or answer meaning. B: Mentioning lookup does not prove tool execution. C: Content safety does not validate the stated functional requirements.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Relecloud sees Invalid results for an Exact match test whose cases have no expected answer. What should the tester correct first?</p>",
        "choices": [
          "Treat Invalid as proof that the agent failed its business task.",
          "Lower the passing score while leaving the reference responses blank.",
          "Supply expected responses for the affected Exact match cases and rerun.",
          "Rename the agent and assume the expected answers will be inferred."
        ],
        "answer": 2,
        "topic": "Test and manage agents",
        "objective": "3.1 Evaluate agent performance",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Exact match needs a reference answer to make a comparison.</p><p><strong>Why not the others:</strong> A: An invalid evaluator configuration is not a functional verdict. B: A score change cannot supply missing required inputs. D: An agent name does not define case references.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Alpine Ski House's new prompt improves most answers but worsens escalation cases. The overall average rises. What should the reviewer do?</p>",
        "choices": [
          "Analyze per-case escalation failures and rerun targeted and regression cases.",
          "Approve immediately because a higher average proves every task improved.",
          "Delete escalation cases to avoid inconsistent future score comparisons.",
          "Change every evaluator and prompt simultaneously before investigating the failures."
        ],
        "answer": 0,
        "topic": "Test and manage agents",
        "objective": "3.1 Evaluate agent performance",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Important regressions must be understood rather than hidden by an aggregate.</p><p><strong>Why not the others:</strong> B: An average can conceal subgroup failures. C: Removing required behavior hides defects. D: Many simultaneous changes make attribution difficult.</p>"
      }
    ]
  },
  {
    "id": "ab620-3-2",
    "exam": "ab620",
    "domain": "Test and manage agents",
    "title": "Implement ALM for agents in Copilot Studio",
    "blurb": "Practice solution packaging, existing-agent inclusion, environment-specific configuration, and governed pipeline extensibility.",
    "timeMinutes": 8,
    "questions": [
      {
        "n": 1,
        "prompt": "<p>Fourth Coffee needs a deployable container for its agent and related components that can move between Power Platform environments. What should the builder create?</p>",
        "choices": [
          "Create a custom solution with an appropriate publisher and version.",
          "A conversation transcript containing several successful agent sessions.",
          "A public website link that points to the development test panel.",
          "A prompt example that lists the component names in alphabetical order."
        ],
        "answer": 0,
        "topic": "Test and manage agents",
        "objective": "3.2 Implement ALM for agents in Copilot Studio",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Solutions package components for export, import, and lifecycle management.</p><p><strong>Why not the others:</strong> B: Transcripts are runtime records, not deployment containers. C: A link does not package components. D: A list does not contain deployable definitions.</p>"
      },
      {
        "n": 2,
        "prompt": "<p>Litware has a working agent that is not yet in its team's custom release solution. The team must preserve the existing implementation. What should it do?</p>",
        "choices": [
          "Export only the agent's display name and recreate every action manually in production.",
          "Add a screenshot of the authoring canvas as the solution's only component.",
          "Add the existing agent and required components to the release solution.",
          "Copy the production channel URL into a knowledge-source description."
        ],
        "answer": 2,
        "topic": "Test and manage agents",
        "objective": "3.2 Implement ALM for agents in Copilot Studio",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Existing components can be included in a solution without recreating their logic.</p><p><strong>Why not the others:</strong> A: That does not preserve the implementation as a release artifact. B: A screenshot is not an executable agent definition. D: A URL does not add the agent component to the solution.</p>"
      },
      {
        "n": 3,
        "prompt": "<p>Proseware uses different service base URLs in development and production. Makers currently edit topic formulas after each import. What should the team introduce?</p>",
        "choices": [
          "A hard-coded production URL in every development topic before each test.",
          "A static prompt telling the model to invent the correct endpoint per user.",
          "A shared transcript entry that contains the last successful request URL.",
          "Define a solution environment variable and supply its target value."
        ],
        "answer": 3,
        "topic": "Test and manage agents",
        "objective": "3.2 Implement ALM for agents in Copilot Studio",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Environment variables separate deployment-specific configuration from component logic.</p><p><strong>Why not the others:</strong> A: That couples configuration to logic and risks cross-environment traffic. B: Endpoint configuration must not depend on generated guesses. C: A transcript is not managed deployment configuration.</p>"
      },
      {
        "n": 4,
        "prompt": "<p>Relecloud's solution uses environment variables for service URLs and connection references for connectors. After import, the flow calls the wrong host and lacks authorization. What should be checked?</p>",
        "choices": [
          "Check only the solution description because it automatically overrides all runtime bindings.",
          "Check target variable values and connection-reference mappings to authorized connections.",
          "Check only the response prompt because connector identity is inferred from its wording.",
          "Check only the development connection, assuming its credentials were exported into production."
        ],
        "answer": 1,
        "topic": "Test and manage agents",
        "objective": "3.2 Implement ALM for agents in Copilot Studio",
        "difficulty": "hard",
        "explanation": "<p><strong>Correct:</strong> Configuration values and authenticated connections are separate target deployment concerns.</p><p><strong>Why not the others:</strong> A: Descriptions do not configure runtime values or connection mappings. C: Prompt wording does not authenticate a connector. D: Exported component definitions do not automatically copy usable live credentials.</p>"
      },
      {
        "n": 5,
        "prompt": "<p>Wide World Importers wants the same agent solution promoted through test and then production with a repeatable deployment process. What should it implement?</p>",
        "choices": [
          "Manual production topic edits performed before any changes reach test.",
          "Implement controlled environment promotion stages using Power Platform Pipelines.",
          "A knowledge source that describes the desired release sequence but runs nothing.",
          "A custom prompt that announces a deployment without importing any components."
        ],
        "answer": 1,
        "topic": "Test and manage agents",
        "objective": "3.2 Implement ALM for agents in Copilot Studio",
        "difficulty": "easy",
        "explanation": "<p><strong>Correct:</strong> Pipelines provide a governed process for solution promotion.</p><p><strong>Why not the others:</strong> A: That reverses controlled promotion and reduces repeatability. C: Documentation is not an implemented deployment process. D: An announcement does not deploy the solution.</p>"
      },
      {
        "n": 6,
        "prompt": "<p>Alpine Ski House already uses Power Platform Pipelines. Its release process now needs an external validation step and approval before production. What should the team evaluate?</p>",
        "choices": [
          "Use supported pipeline extensions and gates, preventing unauthorized deployment bypass.",
          "A welcome-message checkbox that any end user can use to approve deployments.",
          "An email sent after production import that asks whether release was acceptable.",
          "Direct production import rights for all makers so they can avoid pending checks."
        ],
        "answer": 0,
        "topic": "Test and manage agents",
        "objective": "3.2 Implement ALM for agents in Copilot Studio",
        "difficulty": "medium",
        "explanation": "<p><strong>Correct:</strong> Pipeline extensions and governance can integrate validation and approvals into promotion.</p><p><strong>Why not the others:</strong> B: End-user conversation input is not a deployment authorization control. C: Postdeployment notification does not provide the required preproduction gate. D: Bypass rights defeat the required validation process.</p>"
      }
    ]
  }
]);
