window.ABX_DATA = window.ABX_DATA || {};
window.ABX_DATA.exam2 = {
  "id": "exam2",
  "name": "AB-620 Practice Exam 2",
  "timeMinutes": 80,
  "units": [
    {
      "title": "",
      "html": "",
      "questions": [
        {
          "n": 1,
          "prompt": "<p>Summit Medical Supply needs an internal sales agent and a clinic-buyer agent; buyers may see public catalog facts but not negotiated pricing.</p><p>What should you do?</p>",
          "choices": [
            "Plan separate audiences, channels, identities, and knowledge boundaries, exposing only approved public content to buyers.",
            "Publish the internal agent publicly and tell it to omit prices.",
            "Put contracts in a shared source and hide them with card formatting.",
            "Give buyers sales-representative credentials."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Audience and access constraints must be designed together rather than delegated to response wording.</p><p><strong>Why not the others:</strong> B: Prompts don't enforce data authorization. C: Presentation does not restrict retrieval. D: That violates least privilege.</p>"
        },
        {
          "n": 2,
          "prompt": "<p>Blue Yonder Aviation needs a maintenance agent in Teams and later on a technician portal; each channel must access records under the user's permissions.</p><p>What should you do?</p>",
          "choices": [
            "Assume authentication automatically transfers between all channels.",
            "Plan channel-specific authentication and preserve the user's authorization context for record access.",
            "Use one maker account and store technician names in variables.",
            "Make the portal anonymous because Teams authenticates staff."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Separate channels can have distinct identity requirements, and data access must remain user-authorized.</p><p><strong>Why not the others:</strong> A: Each channel may require different identity configuration. C: A name is not delegated identity. D: Teams sign-in doesn't authenticate the separate portal.</p>"
        },
        {
          "n": 3,
          "prompt": "<p>Quartz Financial's claims agent summarizes documents and recommends actions; a human must approve decisions with legal or financial impact.</p><p>What should you do?</p>",
          "choices": [
            "Let the agent make binding decisions and sample them later.",
            "Use a disclaimer as the only safeguard.",
            "Plan human oversight, documented decision boundaries, and access governance before deployment.",
            "Remove all context even when needed to assess a claim."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Consequential recommendations need governance and the specified human approval boundary.</p><p><strong>Why not the others:</strong> A: Retrospective checks don't provide the required approval. B: A disclaimer doesn't implement oversight or controls. D: Data should be minimized and governed, not blindly discarded.</p>"
        },
        {
          "n": 4,
          "prompt": "<p>Litware Renewables is integrating an agent with a legacy work-order system and must learn what interfaces and identities are supported before selecting a tool.</p><p>What should you do?</p>",
          "choices": [
            "Choose computer use and broad credentials before assessment.",
            "Invent a REST endpoint and payload.",
            "Replace the work-order system with a new model.",
            "Assess system capabilities, data sensitivity, and identity constraints before choosing an integration pattern."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.1 Plan an agent solution",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Requirements and constraints should inform the tool choice rather than guessed endpoints or premature access.</p><p><strong>Why not the others:</strong> A: This skips requirements and access-risk review. B: The interface contract must be verified. C: Model replacement doesn't address integration planning.</p>"
        },
        {
          "n": 5,
          "prompt": "<p>Harbor & Pine's vendor-screening flow receives a vendor ID and must return a status plus a review-required flag to the agent.</p><p>What should you do?</p>",
          "choices": [
            "Define explicit input and output parameters and map them into the topic.",
            "Trigger the flow manually and infer status from email.",
            "Use an undocumented global variable.",
            "Ask generative answers whether the vendor passed screening."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Parameters create a clear flow contract and make results available to later logic.</p><p><strong>Why not the others:</strong> B: Manual triggering doesn't supply the agent contract. C: Implicit state is brittle. D: A model cannot replace authoritative screening.</p>"
        },
        {
          "n": 6,
          "prompt": "<p>Pioneer Rail's safety flow must pause for a supervisor's yes/no review and note before continuing.</p><p>What should you do?</p>",
          "choices": [
            "Message the supervisor and continue as approved.",
            "Add Request for information, collect the supervisor's fields, and use the returned parameters downstream.",
            "Ask the agent to predict the supervisor decision.",
            "Ask the end user to enter the supervisor's response."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> This action pauses for designated human input and resumes with response values.</p><p><strong>Why not the others:</strong> A: A message doesn't wait for a response. C: Prediction cannot replace required human judgment. D: The designated reviewer must provide the review.</p>"
        },
        {
          "n": 7,
          "prompt": "<p>Adatum University's enrollment flow calls two systems; if the second fails after the first succeeds, it must avoid a false completion notice.</p><p>What should you do?</p>",
          "choices": [
            "Send success after the first call regardless.",
            "Retry both calls forever.",
            "Handle the second failure explicitly, return a failure or recoverable status, and make retries deliberate.",
            "Discard errors and set completed."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Explicit error handling prevents partial success from being reported as full completion.</p><p><strong>Why not the others:</strong> A: That misreports an incomplete process. B: Unbounded retries may duplicate effects and stall. D: This hides failure.</p>"
        },
        {
          "n": 8,
          "prompt": "<p>Cascade Sporting Goods notices slower flow runs after adding a connector and needs to locate the slow operation.</p><p>What should you do?</p>",
          "choices": [
            "Change response style and infer connector latency.",
            "Count conversations in analytics.",
            "Change timeout settings without inspecting runs.",
            "Inspect run history and run details to compare step outcomes and timing."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.2 Create and monitor agent flows",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Execution-level detail helps identify which action caused the delay.</p><p><strong>Why not the others:</strong> A: Response style doesn't measure execution time. B: Conversation volume doesn't locate a slow action. C: That may mask rather than diagnose the cause.</p>"
        },
        {
          "n": 9,
          "prompt": "<p>Northstar Apparel's topic calls a flow for a live delivery estimate and must show a fallback when no estimate is returned.</p><p>What should you do?</p>",
          "choices": [
            "Map the output to a topic variable and branch on whether it exists before responding.",
            "Hard-code an average delivery time.",
            "Search the web for the returned estimate.",
            "Call the flow after the final response."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Explicit output mapping and conditional handling avoid presenting missing data as a valid estimate.</p><p><strong>Why not the others:</strong> B: A static average isn't the live result. C: The flow output is already authoritative. D: The response must wait for its result.</p>"
        },
        {
          "n": 10,
          "prompt": "<p>Cobalt Bank must ask for a transfer purpose once, validate it, and reuse it in a later topic response.</p><p>What should you do?</p>",
          "choices": [
            "Store it only in global instructions.",
            "Capture the answer in a topic variable, validate it, and reference it later.",
            "Read it from an unrelated API.",
            "Expect knowledge search to reconstruct it."
          ],
          "answer": 1,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Topic variables retain conversation values for later nodes and logic.</p><p><strong>Why not the others:</strong> A: Instructions aren't per-conversation storage. C: An API call doesn't capture the user's answer. D: Knowledge sources can't know an unprovided value.</p>"
        },
        {
          "n": 11,
          "prompt": "<p>Contoso Field Services needs a repair summary from two topic values with a concise, consistent response format.</p><p>What should you do?</p>",
          "choices": [
            "Use an unconfigured knowledge node and assume it follows the format.",
            "Show raw values in a card and ask the user to summarize.",
            "Pass both values to a custom prompt and specify the required output format and constraints.",
            "Store per-user values in environment variables."
          ],
          "answer": 2,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Explicit inputs ground generation, while output instructions shape the response for the caller.</p><p><strong>Why not the others:</strong> A: Generic retrieval doesn't ensure this custom structure. B: The agent, not the user, should produce the summary. D: Environment variables aren't conversation state.</p>"
        },
        {
          "n": 12,
          "prompt": "<p>Evergreen Lending must present two repayment options as structured choices users can submit in a supported channel.</p><p>What should you do?</p>",
          "choices": [
            "Write plain text and assume the client creates buttons.",
            "Ask the model to invent an endpoint per choice.",
            "Use search results as the selection control.",
            "Use an adaptive card with explicit choice inputs and submit data, confirming channel support."
          ],
          "answer": 3,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Cards can collect structured input, but delivery support must be checked.</p><p><strong>Why not the others:</strong> A: Text doesn't create interactive controls. B: Generated endpoint text doesn't implement submission. C: Search retrieves content rather than collecting a choice.</p>"
        },
        {
          "n": 13,
          "prompt": "<p>Relecloud must show a reservation's details and cancel only after the user confirms.</p><p>What should you do?</p>",
          "choices": [
            "Gate the API tool behind an affirmative confirmation and pass the validated reservation ID.",
            "Call the API as soon as the user mentions a reservation.",
            "Answer from policy knowledge and assume cancellation occurs.",
            "Call the API before displaying details."
          ],
          "answer": 0,
          "topic": "Plan and configure agent solutions",
          "objective": "1.3 Configure topics",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Explicit confirmation prevents the side effect from running before the user reviews the details.</p><p><strong>Why not the others:</strong> B: Mention is not confirmation. C: Knowledge retrieval doesn't execute the action. D: This performs the action before review.</p>"
        },
        {
          "n": 14,
          "prompt": "<p>Solstice Publishing needs internal Microsoft 365 file answers while retaining the source's established access model.</p><p>What should you do?</p>",
          "choices": [
            "Copy files to an unrestricted public site.",
            "Use a suitable Copilot connector knowledge integration and validate scope and user access.",
            "Paste every file into the agent instructions.",
            "Use cards to retrieve content by title."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Connector retrieval can expose enterprise knowledge while respecting configured governance.</p><p><strong>Why not the others:</strong> A: That breaks internal access controls. C: Instructions aren't a scalable corpus. D: Cards don't index documents.</p>"
        },
        {
          "n": 15,
          "prompt": "<p>Fabrikam Biologics has a curated Azure AI Search index and needs semantic retrieval across the approved research documents.</p><p>What should you do?</p>",
          "choices": [
            "Use telemetry as a research index.",
            "Train a new model for every question.",
            "Connect the index as a grounding source and validate retrieval with representative queries.",
            "Search the public web for private records."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Search supplies relevant indexed evidence for grounded answers.</p><p><strong>Why not the others:</strong> A: Telemetry isn't the curated corpus. B: Per-question training isn't required for retrieval. D: Public search cannot reliably retrieve private content.</p>"
        },
        {
          "n": 16,
          "prompt": "<p>Wide World Imports has an approved connector for catalog guidance; users must look up items but not change them.</p><p>What should you do?</p>",
          "choices": [
            "Grant all create, update, and delete operations.",
            "Copy catalog data to a public prompt.",
            "Delegate every lookup to an unrelated A2A agent.",
            "Use an appropriate read-only knowledge path and avoid exposing write operations."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.1 Connect to enterprise knowledge sources",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> The integration should match the read task and apply least privilege.</p><p><strong>Why not the others:</strong> A: Unused write capability violates least privilege. B: That can disclose governed data. C: A direct catalog connector is the appropriate integration.</p>"
        },
        {
          "n": 17,
          "prompt": "<p>Summit Mobility's REST reservation API needs a bearer token and vehicle ID, and returns a reservation key.</p><p>What should you do?</p>",
          "choices": [
            "Configure secure authentication, map the vehicle ID, and expose the returned key as an output.",
            "Put the token in the topic and ask for the ID after the call.",
            "Add the API specification as knowledge and expect it to reserve.",
            "Generate a reservation key with a prompt."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> API tools need secure auth and deliberate parameter mapping; outputs support later logic.</p><p><strong>Why not the others:</strong> B: This exposes a secret and omits the required input. C: Documentation retrieval doesn't execute the action. D: A generated key isn't authoritative.</p>"
        },
        {
          "n": 18,
          "prompt": "<p>Woodgrove Foods has an approved custom connector for inspection tickets; the agent needs only defect code and lot number.</p><p>What should you do?</p>",
          "choices": [
            "Rebuild it with computer use and a shared login.",
            "Add its operation as a tool and map only those required inputs.",
            "Use it only as knowledge.",
            "Expose every connector operation."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> The connector exposes the approved action while minimal inputs keep it scoped.</p><p><strong>Why not the others:</strong> A: That is less direct and exposes credentials. C: Knowledge retrieval doesn't create a ticket. D: Unneeded capabilities increase risk.</p>"
        },
        {
          "n": 19,
          "prompt": "<p>Northstar Transit's MCP server offers route lookup and fare refund, but the agent is authorized only to find routes.</p><p>What should you do?</p>",
          "choices": [
            "Enable both and tell the prompt to avoid refunds.",
            "Connect it as an A2A agent.",
            "Make only the route-lookup MCP tool available to the agent.",
            "Use search to calculate refunds."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> MCP capabilities should be scoped to the authorized function.</p><p><strong>Why not the others:</strong> A: Withholding the tool is a stronger boundary. B: MCP tools and A2A agents are distinct patterns. D: Retrieval doesn't provide or authorize the action.</p>"
        },
        {
          "n": 20,
          "prompt": "<p>Beacon Media's internal rights portal has no API or connector; computer use could change publication rights.</p><p>What should you do?</p>",
          "choices": [
            "Grant broad credentials and allow all changes unsupervised.",
            "Add the portal page as knowledge and expect it to edit rights.",
            "Use a card to update its database directly.",
            "If using computer use, constrain its machine and credentials, define the task, and require oversight for consequential changes."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> GUI automation can help without an API, but access scope and review must reflect side effects.</p><p><strong>Why not the others:</strong> A: That is excessive access and lacks oversight. B: Knowledge doesn't operate the live portal. C: Cards don't execute portal actions.</p>"
        },
        {
          "n": 21,
          "prompt": "<p>Adatum Insurance uses computer use for claim submissions. The agent says it submitted, but the team needs reliable confirmation.</p><p>What should you do?</p>",
          "choices": [
            "Verify an authoritative application or run completion signal and monitor failures.",
            "Trust the agent's final message despite an application error.",
            "Disable monitoring to avoid recording failures.",
            "Add instructions promising every submission succeeds."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A natural-language statement isn't evidence of external state; verify execution outcome.</p><p><strong>Why not the others:</strong> B: Text doesn't prove submission. C: That removes operational evidence. D: Instructions can't guarantee external transactions.</p>"
        },
        {
          "n": 22,
          "prompt": "<p>Pioneer Hardware's agent needs a current stock lookup through a supported API; the endpoint returns available units and a timestamp.</p><p>What should you do?</p>",
          "choices": [
            "Search old product manuals for the live quantity.",
            "Add an API tool, authenticate it, map the item ID, and return both availability and timestamp.",
            "Ask the model to estimate inventory from sales trends.",
            "Use A2A to invoke a non-agent endpoint."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.2 Add tools to agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A live action with explicit inputs and outputs provides current, traceable inventory data.</p><p><strong>Why not the others:</strong> A: Static knowledge won't provide current stock. C: An estimate isn't the authoritative live value. D: A2A is for agent collaboration, not ordinary API operations.</p>"
        },
        {
          "n": 23,
          "prompt": "<p>Pioneer Energy's Copilot Studio agent should delegate tax-credit analysis to a separately maintained Foundry agent.</p><p>What should you do?</p>",
          "choices": [
            "Copy its prompt into every topic and remove the integration.",
            "Connect Application Insights as the tax specialist.",
            "Integrate the Foundry specialist and provide clear delegation criteria with a secured connection.",
            "Expose model weights as connector documents."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A collaborator retains specialist behavior while explicit scope and authentication govern its use.</p><p><strong>Why not the others:</strong> A: Duplicated instructions drift and don't invoke the specialist. B: Telemetry cannot perform analysis. D: Documents don't invoke the hosted agent.</p>"
        },
        {
          "n": 24,
          "prompt": "<p>Cobalt Manufacturing's coordinator must send contextual tasks to a vendor agent built on another framework and supporting A2A.</p><p>What should you do?</p>",
          "choices": [
            "Use generic HTTP and assume it adds A2A semantics.",
            "Use MCP because its role is identical to A2A.",
            "Add the endpoint as a knowledge source.",
            "Use an A2A connection to the vendor endpoint with authentication and clear purpose metadata."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> A2A is designed for agent task communication and contextual metadata across frameworks.</p><p><strong>Why not the others:</strong> A: HTTP alone lacks the agent contract. B: MCP exposes tools/resources; A2A connects agents. C: Knowledge retrieval doesn't establish agent communication.</p>"
        },
        {
          "n": 25,
          "prompt": "<p>Evergreen University needs current answers over Fabric enrollment data and has a Fabric data agent configured with an approved semantic model.</p><p>What should you do?</p>",
          "choices": [
            "Delegate those data questions to the Fabric data agent while preserving its access context.",
            "Export student records to public pages.",
            "Ask a text model to guess current enrollment.",
            "Use computer use to copy the warehouse to a file per query."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A Fabric data agent is built for Fabric data context and relevant queries.</p><p><strong>Why not the others:</strong> B: That exposes restricted data. C: Generated guesses aren't authoritative. D: This is inefficient and bypasses governance.</p>"
        },
        {
          "n": 26,
          "prompt": "<p>Harbor & Pine's order coordinator has return, shipping, and product specialists with distinct tools; only relevant specialists should be called.</p><p>What should you do?</p>",
          "choices": [
            "Give every agent identical descriptions and broad access.",
            "Give each agent a bounded scope, route matching subtasks, and validate the returned result.",
            "Call every specialist for each user turn.",
            "Use one static template instead of invoking specialists."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Clear responsibilities help route requests accurately and avoid unnecessary calls.</p><p><strong>Why not the others:</strong> A: Routing becomes ambiguous and permissions are excessive. C: This adds redundant calls and conflicting answers. D: A template doesn't execute their tools or knowledge.</p>"
        },
        {
          "n": 27,
          "prompt": "<p>Fabrikam Construction already has a permit-check Copilot Studio agent; a project agent should reuse its capabilities instead of rebuilding them.</p><p>What should you do?</p>",
          "choices": [
            "Copy published response text and delete the source.",
            "Assume the agent is a REST endpoint without confirming an API.",
            "Connect the existing agent through a supported collaboration pattern and describe when to delegate.",
            "Index transcripts and call that delegation."
          ],
          "answer": 2,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.3 Configure multi-agent collaboration",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Reusing a maintained specialist preserves its behavior and avoids duplicated configuration.</p><p><strong>Why not the others:</strong> A: Static text doesn't reuse live behavior. B: Agents aren't automatically REST services. D: Transcript retrieval doesn't invoke the agent.</p>"
        },
        {
          "n": 28,
          "prompt": "<p>Solstice Health uses an Azure AI Search index of current procedures and a Foundry model; responses must cite retrieved evidence.</p><p>What should you do?</p>",
          "choices": [
            "Use the model alone and cite procedures from memory.",
            "Treat Application Insights as the procedure corpus.",
            "Index unreviewed chat logs as procedure evidence.",
            "Ground generation with retrieved Search results and review evidence in evaluation."
          ],
          "answer": 3,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Retrieval supplies current evidence while the model generates from it; evidence review checks grounding.</p><p><strong>Why not the others:</strong> A: Private current procedures may be absent from model memory. B: Telemetry isn't domain knowledge. C: Unreviewed user logs aren't an approved source.</p>"
        },
        {
          "n": 29,
          "prompt": "<p>Northwind Data Services compares a selected Foundry model prompt with a variant grounded in Search results.</p><p>What should you do?</p>",
          "choices": [
            "Configure the model and custom prompt, then supply relevant Search context for the grounded variant.",
            "Select Search as the generation model.",
            "Use telemetry as both prompt and knowledge.",
            "Hard-code a response in a card and call it a live comparison."
          ],
          "answer": 0,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Model selection, prompt instructions, and retrieval evidence have distinct roles.</p><p><strong>Why not the others:</strong> B: Search retrieves documents but doesn't generate. C: Telemetry isn't prompt execution or grounding. D: A static card exercises neither model nor retrieval.</p>"
        },
        {
          "n": 30,
          "prompt": "<p>Cascade Travel sees failed tools and negative outcomes; operations needs runtime evidence linked to agent sessions.</p><p>What should you do?</p>",
          "choices": [
            "Inspect only the agent name and topic count.",
            "Review Copilot Studio effectiveness analytics and configured Application Insights telemetry for trends and diagnostic context.",
            "Publish transcripts as public knowledge.",
            "Ask the model to estimate failure rates without telemetry."
          ],
          "answer": 1,
          "topic": "Integrate and extend agents in Copilot Studio",
          "objective": "2.4 Integrate agents with Azure",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Analytics show outcome patterns, while telemetry can add deeper runtime evidence when configured.</p><p><strong>Why not the others:</strong> A: Inventory doesn't explain runtime failures. C: That doesn't measure execution and may expose data. D: Self-reported estimates aren't evidence.</p>"
        },
        {
          "n": 31,
          "prompt": "<p>Mapleline Telecom's knowledge update may affect policy answers; it has a stable set of customer scenarios.</p><p>What should you do?</p>",
          "choices": [
            "Test one new question that passes.",
            "Delete the baseline to avoid comparison.",
            "Run the retained test set and review both answer quality and source behavior for regressions.",
            "Check only whether a source is connected."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> The same set reveals update regressions and case review identifies retrieval or response issues.</p><p><strong>Why not the others:</strong> A: One success doesn't check known scenarios. B: Removing it prevents regression analysis. D: Connectivity doesn't prove answer quality.</p>"
        },
        {
          "n": 32,
          "prompt": "<p>Pioneer Rail's release gate requires the correct policy topic to trigger for each scenario.</p><p>What should you do?</p>",
          "choices": [
            "Score sentiment and infer topic selection.",
            "Omit policy examples from the test set.",
            "Count connected agents as passing cases.",
            "Test the routing behavior and evaluate topic match rather than judging only the final prose."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> The evaluation should measure the required topic behavior, not just fluency.</p><p><strong>Why not the others:</strong> A: Sentiment doesn't measure routing. B: The omitted behavior can't be evaluated. C: Inventory isn't scenario-level evaluation.</p>"
        },
        {
          "n": 33,
          "prompt": "<p>Brightview Retail passes routine tests but fails multi-turn return exceptions; engineers want to locate the weak step.</p><p>What should you do?</p>",
          "choices": [
            "Review failing conversations and execution details, fix the specific handoff or tool, and rerun those cases.",
            "Rewrite the whole agent without inspecting failures.",
            "Remove multi-turn cases because they lower the score.",
            "Add documents without checking whether the failure was a tool handoff."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Case-level inspection identifies a failed turn or operation and rerunning verifies the fix.</p><p><strong>Why not the others:</strong> B: This is broad and may create regressions. C: That hides a real weakness. D: More knowledge may not fix a broken action.</p>"
        },
        {
          "n": 34,
          "prompt": "<p>Evergreen University needs to compare relevance, completeness, and correctness across a curated test set before approval.</p><p>What should you do?</p>",
          "choices": [
            "Measure an unrelated tool operation.",
            "Choose a quality-oriented evaluation aligned to those criteria and review outcomes against the release threshold.",
            "Save the set without running or reviewing it.",
            "Use topic count as the quality score."
          ],
          "answer": 1,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> The scoring method should match the quality criteria and inform a deliberate promotion decision.</p><p><strong>Why not the others:</strong> A: Tool success doesn't establish answer quality. C: A saved set provides no outcome evidence. D: Topic count isn't an outcome measure.</p>"
        },
        {
          "n": 35,
          "prompt": "<p>Brightview Retail wants to use generated scenarios as a regression baseline, but expects them to reflect real requirements.</p><p>What should you do?</p>",
          "choices": [
            "Accept every generated expected answer without review.",
            "Replace expectations with current agent responses.",
            "Generate candidate conversations, review and correct coverage and expectations, then save or run the curated set.",
            "Use generated tests as a substitute for user feedback monitoring."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.1 Evaluate agent performance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Generated cases speed authoring but require review before becoming a trusted baseline.</p><p><strong>Why not the others:</strong> A: Generated expectations can be inaccurate. B: That can encode defects as acceptance criteria. D: Evaluation and production feedback serve different purposes.</p>"
        },
        {
          "n": 36,
          "prompt": "<p>Redwood Energy must move an agent and supporting flow from maker development to managed test.</p><p>What should you do?</p>",
          "choices": [
            "Recreate the agent from screenshots.",
            "Rename the development environment to test.",
            "Export only the flow and assume it contains the agent.",
            "Include the agent and required related components in a solution and promote that solution through environments."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Solutions group components for repeatable deployment and lifecycle management.</p><p><strong>Why not the others:</strong> A: Manual recreation is error-prone. B: Renaming doesn't isolate a deployment target. C: The agent must be included deliberately.</p>"
        },
        {
          "n": 37,
          "prompt": "<p>Mapleline uses different inventory endpoints in development and production, but wants one release artifact.</p><p>What should you do?</p>",
          "choices": [
            "Use an environment variable for the endpoint and configure the value in each environment.",
            "Maintain separate hard-coded agents.",
            "Put endpoint and token in a hidden user message.",
            "Let the model guess the endpoint from a product name."
          ],
          "answer": 0,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Environment variables separate environment-specific values from solution components.</p><p><strong>Why not the others:</strong> B: Copies drift and complicate releases. C: That exposes configuration and secrets. D: Configuration must not rely on model guessing.</p>"
        },
        {
          "n": 38,
          "prompt": "<p>Pioneer Rail needs repeatable solution promotion with approvals between development, test, and production.</p><p>What should you do?</p>",
          "choices": [
            "Ask makers to import emailed unmanaged packages.",
            "Configure Power Platform Pipelines for the solution path and apply the organization's release controls.",
            "Use the test set as the deployment pipeline.",
            "Put production secrets in agent instructions."
          ],
          "answer": 1,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Pipelines support governed, repeatable solution deployment across environments.</p><p><strong>Why not the others:</strong> A: Ad hoc email lacks controlled deployment. C: Evaluation doesn't transport solution components. D: Secrets must not be exposed in source or prompts.</p>"
        },
        {
          "n": 39,
          "prompt": "<p>Solstice Health imported its solution into test, but its connection reference points to a developer-owned resource.</p><p>What should you do?</p>",
          "choices": [
            "Keep the personal connection because import worked.",
            "Put a password in a topic variable.",
            "Bind the connection reference to an authorized connection in the target environment.",
            "Store a plaintext password in configuration."
          ],
          "answer": 2,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Connection references decouple components from maker-specific connections.</p><p><strong>Why not the others:</strong> A: Import success doesn't make it appropriate. B: Conversation variables aren't for credentials. D: Secrets should not be exposed as plaintext.</p>"
        },
        {
          "n": 40,
          "prompt": "<p>Brightview's latest agent and flow changes are absent from the solution being promoted.</p><p>What should you do?</p>",
          "choices": [
            "Rerun the same pipeline without updating the package.",
            "Deploy only the agent and assume the flow updates automatically.",
            "Edit production directly and use it as the new baseline.",
            "Update and verify the solution contents and dependencies, then run the pipeline against that artifact."
          ],
          "answer": 3,
          "topic": "Test and manage agents",
          "objective": "3.2 Implement ALM for agents in Copilot Studio",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A pipeline can promote only components present in its solution package.</p><p><strong>Why not the others:</strong> A: The missing changes remain absent. B: Dependencies need explicit inclusion and verification. C: That bypasses controlled ALM.</p>"
        }
      ]
    }
  ]
};
