window.ABX_DATA = window.ABX_DATA || {};
window.ABX_DATA.exam4 = {
  "id": "exam4",
  "name": "AB-100 Practice Exam 1",
  "timeMinutes": 80,
  "units": [
    {
      "title": "Original unofficial practice questions",
      "html": "<p>Independent study material, not Microsoft exam content. Aligned to AB-100 skills measured as of November 16, 2026.</p>",
      "questions": [
        {
          "n": 1,
          "prompt": "<p>Harborline Insurance wants an agent to summarize claim evidence, calculate exact contractual limits, and authorize exceptional settlements. Exceptions require a licensed adjuster.</p><p>Which responsibility split should the architect recommend?</p>",
          "choices": [
            "Use AI summaries, deterministic limit calculations, and adjuster approval for exceptions.",
            "Use sentiment analysis to assign settlement authority and a flow to send payments.",
            "Use generative orchestration for summaries and limits; review only rejected claims.",
            "Use a forecasting model for policy limits and prepare all evidence manually."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Match language tasks to AI, exact calculations to rules, and consequential exceptions to the authorized human.</p><p><strong>Why not the others:</strong> B: Sentiment does not establish settlement authority. C: Generative calculations lack contractual determinism and the required exception approval. D: Forecasting does not calculate contractual limits and leaves a suitable AI task manual.</p>"
        },
        {
          "n": 2,
          "prompt": "<p>Aster Pumps grounds maintenance answers in two manuals. The newer manual applies only to another serial-number range, but the agent gives its repair steps for older pumps.</p><p>What should be done first?</p>",
          "choices": [
            "Add authoritative version, asset-applicability, and effective-date metadata and validate retrieval.",
            "Increase the number of retrieved chunks from every manual.",
            "Fine-tune a larger model using both manuals without additional metadata.",
            "Lower output temperature while preserving existing retrieval rules."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Grounding must be relevant to the specific asset, not merely recent or fluent.</p><p><strong>Why not the others:</strong> B: More chunks can amplify contradictory context. C: Fine-tuning does not resolve source applicability. D: Lower temperature does not determine which procedure is valid.</p>"
        },
        {
          "n": 3,
          "prompt": "<p>Bluehaven Logistics wants several AI systems to consume shipment exceptions currently embedded in emails. Updates arrive throughout the day, and the shipment system remains authoritative.</p><p>Which data plan best supports reuse?</p>",
          "choices": [
            "Embed the current inbox in each agent system prompt.",
            "Create an independent spreadsheet export for every agent team.",
            "Expose a governed exception schema with identifiers, provenance, permissions, and freshness expectations.",
            "Train every agent model on an annual archive of exception emails."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A governed data product makes meaning, lineage, access, and update expectations explicit for consumers.</p><p><strong>Why not the others:</strong> A: Prompt duplication is brittle and lacks a reusable data contract. B: Separate spreadsheets create inconsistent copies. D: Annual training cannot provide timely operational facts.</p>"
        },
        {
          "n": 4,
          "prompt": "<p>Cedar Clinics proposes an agent that ranks appointments for rescheduling. Administrators want fewer calls, but clinicians warn that some visits cannot safely be delayed.</p><p>Which requirement should be established before choosing a model?</p>",
          "choices": [
            "Choose a chat channel and minimize its average response length.",
            "Define eligible visits, clinical escalation, accountable approvers, and service outcome measures.",
            "Select the model with the highest general reasoning benchmark score.",
            "Estimate token volume and reserve capacity for all appointments."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Consequences and business constraints determine which decisions may be automated and what success means.</p><p><strong>Why not the others:</strong> A: Channel efficiency does not establish safe eligibility. C: Benchmarks do not define clinical authority. D: Capacity planning cannot replace oversight requirements.</p>"
        },
        {
          "n": 5,
          "prompt": "<p>Juniper Manufacturing has twelve isolated AI prototypes, no shared ownership model, and no baseline for benefits. Executives want adoption aligned to the Cloud Adoption Framework AI adoption process.</p><p>What is the best next step?</p>",
          "choices": [
            "Prioritize business outcomes, assess data and organizational readiness, and pilot with governance and measurable learning.",
            "Require every department to use one model and an identical prompt.",
            "Deploy every prototype enterprise-wide and measure adoption after the first year.",
            "Postpone business sponsorship until a platform migration has completed."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> AI adoption connects strategy and readiness to iterative delivery, governance, and ongoing management.</p><p><strong>Why not the others:</strong> B: Model uniformity alone is not business strategy. C: Broad rollout before validation scales unmanaged risk. D: Sponsorship should guide platform investment rather than follow it.</p>"
        },
        {
          "n": 6,
          "prompt": "<p>Northstar Engineering employees already work in Microsoft 365 Copilot. They need a focused assistant over approved engineering SharePoint content, without an independent runtime or specialized model.</p><p>Which option should be evaluated first?</p>",
          "choices": [
            "Build a separate chat application and implement all conversation hosting.",
            "Replace the document library with Dynamics 365 Sales.",
            "Extend Microsoft 365 Copilot with a scoped agent and approved knowledge sources.",
            "Train a new language model on the complete SharePoint tenant."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Extend an existing experience when its runtime, user context, and knowledge capabilities meet the need.</p><p><strong>Why not the others:</strong> A: A separate runtime adds unneeded ownership. B: A CRM deployment does not solve this engineering knowledge requirement. D: Model training is not required for changing document knowledge.</p>"
        },
        {
          "n": 7,
          "prompt": "<p>Riverton Utilities has a narrow fault-code classification task on intermittently connected field devices. Labeled examples exist; battery use and response time matter more than broad conversation.</p><p>Which strategy is most appropriate to investigate?</p>",
          "choices": [
            "Use document retrieval alone and assume it returns the correct label.",
            "Require a cloud-only large reasoning model for every fault code.",
            "Evaluate a customized small language model against device, task-quality, and maintenance requirements.",
            "Use a public web-search agent as the fault-code classifier."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A narrow workload with constrained execution can justify an SLM if quality and operating requirements are verified.</p><p><strong>Why not the others:</strong> A: Retrieval similarity is not a validated classifier. B: Cloud-only inference conflicts with intermittent connectivity. D: Web search cannot guarantee proprietary offline classification.</p>"
        },
        {
          "n": 8,
          "prompt": "<p>Sable Retail uses Copilot Studio for store operations, a Foundry specialist for constrained optimization, and Microsoft 365 Copilot for managers. Specialists must retain separate implementations and authorization boundaries.</p><p>Which multi-agent design should be favored?</p>",
          "choices": [
            "Define bounded delegation contracts, explicit inputs and outputs, identity handling, and escalation.",
            "Give all specialists a shared administrator identity to simplify delegation.",
            "Copy all specialist instructions into the manager-facing agent.",
            "Allow recursive delegation without task ownership or termination rules."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Cross-platform collaboration needs explicit responsibilities, security, and completion contracts.</p><p><strong>Why not the others:</strong> B: Shared administrator identity erases authorization boundaries. C: Copying instructions does not retain specialist ownership. D: Unbounded recursion creates cost, reliability, and accountability risks.</p>"
        },
        {
          "n": 9,
          "prompt": "<p>Lighthouse Banking wants a shared prompt library. Regulations change, and teams currently paste customer identifiers into example prompts.</p><p>Which library standard should be adopted?</p>",
          "choices": [
            "Require owners, versioned templates, synthetic examples, declared inputs, evaluation cases, and review dates.",
            "Approve templates solely when their outputs sound professional.",
            "Store successful customer chats verbatim and permit unrestricted reuse.",
            "Keep templates as personal notes and circulate the newest wording."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A governed library combines reuse with privacy, ownership, and regression evidence.</p><p><strong>Why not the others:</strong> B: Professional tone does not establish accuracy or compliance. C: Customer transcripts can disclose personal information. D: Personal copies lack controlled versions and ownership.</p>"
        },
        {
          "n": 10,
          "prompt": "<p>Meridian Foods wants an AI Center of Excellence without preventing departmental innovation. Departments have different data maturity and regulatory exposure.</p><p>Which operating model best fits?</p>",
          "choices": [
            "Require the central team to build every agent and own every departmental business metric.",
            "Limit the CoE to negotiating model discounts and tracking license purchases.",
            "Centralize guardrails, reusable patterns, enablement, and assurance while business owners remain accountable for outcomes.",
            "Let departments select independent security policies without a shared agent inventory."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A federated CoE enables delivery with common standards and accountable domain ownership.</p><p><strong>Why not the others:</strong> A: Centralized delivery of everything creates a bottleneck. B: Procurement alone omits architecture, assurance, enablement, and business value. D: Independent security without inventory fragments governance.</p>"
        },
        {
          "n": 11,
          "prompt": "<p>Pinecrest Chemicals has a proprietary terminology task. Prompt improvements and retrieval have been evaluated, but a general model still produces inconsistent specialized labels. A large, legally usable labeled dataset exists.</p><p>What should the architect recommend next?</p>",
          "choices": [
            "Train a foundation model from scratch before checking data quality.",
            "Add every labeled example to each runtime prompt regardless of size.",
            "Replace the task benchmark with general conversational model rankings.",
            "Evaluate custom model adaptation against a held-out task benchmark and its full lifecycle cost."
          ],
          "answer": 3,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Persistent task-specific behavior gaps with suitable data can justify customization, but improvement must be demonstrated independently.</p><p><strong>Why not the others:</strong> A: Full pretraining is a disproportionate first response and still depends on suitable data. B: Unbounded examples introduce cost and context issues rather than a validated customization strategy. C: General rankings do not measure performance on specialized labeling.</p>"
        },
        {
          "n": 12,
          "prompt": "<p>Seabrook Equipment wants one process spanning Dynamics 365 Sales, Customer Service, and Supply Chain Management. Sellers promise dates, support manages installations, and planners control allocation.</p><p>Which strategy should define solution boundaries?</p>",
          "choices": [
            "Create one model-owned customer record that overrides all three applications.",
            "Map the cross-app process, authoritative records, event handoffs, and approval ownership before selecting agents.",
            "Select independent agents and defer customer and order identifier mapping until deployment.",
            "Copy all application data into a single prompt to avoid integration design."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A coherent multi-app strategy preserves business authority while identifying prebuilt and custom agent opportunities.</p><p><strong>Why not the others:</strong> A: A language model should not become an uncontrolled system of record. C: Deferred identifiers and handoffs undermine end-to-end correctness. D: Prompt context does not replace transaction integration and ownership.</p>"
        },
        {
          "n": 13,
          "prompt": "<p>Cobalt Services expects $180,000 in usable staff-capacity benefits in year one. Annual licenses, inference, monitoring, and support cost $90,000; implementation and training cost $60,000 once. Use simple first-year ROI: (benefits minus costs) divided by costs. Ignore discounting.</p><p>Which ROI should be reported?</p>",
          "choices": [
            "120%, dividing total benefits by total first-year costs.",
            "20%, using $150,000 in total first-year costs.",
            "50%, dividing net benefit by the $60,000 implementation cost.",
            "100%, using only $90,000 in annual operating costs."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Costs are $90,000 + $60,000 = $150,000. Net benefit is $30,000, so ROI is $30,000 / $150,000 = 20%.</p><p><strong>Why not the others:</strong> A: Benefits divided by costs is a benefit-cost ratio, not the stated net-benefit ROI. C: The denominator must include all stated first-year costs. D: This excludes the stated implementation and training costs from the first year.</p>"
        },
        {
          "n": 14,
          "prompt": "<p>Alder Travel needs standard CRM-based seller meeting summaries. Existing Microsoft tools meet security requirements, and no differentiating workflow is identified. A custom build requires a dedicated support team.</p><p>Which option should lead the cost-benefit comparison?</p>",
          "choices": [
            "Choose solely by comparing advertised per-token model prices.",
            "Evaluate prebuilt sales assistance and supported extensions before funding a custom replacement.",
            "Train a custom model to eliminate ongoing operating expenses.",
            "Build a custom summarization platform because code ownership guarantees lower TCO."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Buy or extend is a strong candidate for nondifferentiating needs when capabilities fit and reduce lifecycle ownership.</p><p><strong>Why not the others:</strong> A: TCO includes integration, licensing, assurance, adoption, and operations. C: Custom models still need hosting, evaluation, monitoring, and maintenance. D: Ownership adds engineering and support obligations and does not guarantee lower TCO.</p>"
        },
        {
          "n": 15,
          "prompt": "<p>Marsh Analytics sends short label requests and complex investigation requests to one premium model. It wants lower cost without violating quality or latency targets.</p><p>What should the architect recommend?</p>",
          "choices": [
            "Cache every response permanently, including user-specific investigations.",
            "Fine-tune the premium model and assume routing is unnecessary.",
            "Evaluate a model router on representative requests, checking quality, latency, cost, and eligible model boundaries.",
            "Route every request to the cheapest model and measure average token cost only."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Routing can select suitable models per request, but workload-specific evaluation must confirm the trade-offs and compliance constraints.</p><p><strong>Why not the others:</strong> A: Unscoped permanent caching risks stale answers and cross-user disclosure. B: Customization does not inherently address heterogeneous request cost or prove lower TCO. D: Cost-only routing can violate quality or latency requirements for complex tasks.</p>"
        },
        {
          "n": 16,
          "prompt": "<p>Evergreen Housing forecasts 20 minutes saved per application. Its pilot also shows eight minutes of mandatory reviewer effort and occasional rework. Managers propose valuing every generated time saving as cash savings.</p><p>Which ROI method is most defensible?</p>",
          "choices": [
            "Exclude reviewer time because review happens outside the agent interface.",
            "Count all released minutes as headcount savings without a staffing change.",
            "Measure net process time, rework, adoption, and realizable capacity benefits against ongoing and implementation costs.",
            "Multiply responses by the maximum advertised productivity gain."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Value should reflect the changed end-to-end process and benefits the organization can actually realize.</p><p><strong>Why not the others:</strong> A: Review remains a required process cost outside the AI interface. B: Released capacity is not automatically cash savings. D: A marketing maximum does not establish observed or realizable process value.</p>"
        },
        {
          "n": 17,
          "prompt": "<p>Solstice Appliances uses Dynamics 365 Customer Service. Employees use priority to mean both customer entitlement and case urgency, causing inconsistent Copilot interpretations.</p><p>Which design action should come first?</p>",
          "choices": [
            "Use sentiment analysis as the authoritative source of customer entitlement.",
            "Add both meanings to every answer without distinguishing source fields.",
            "Replace case management with a custom language model.",
            "Define approved business terms and map each meaning to the correct CRM fields and context."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Business terminology must distinguish concepts before Copilot customizations can interpret them reliably.</p><p><strong>Why not the others:</strong> A: Sentiment is not a contractual entitlement record. B: Repeating ambiguity does not establish a consistent business interpretation. C: Replacing the application does not resolve semantic definitions.</p>"
        },
        {
          "n": 18,
          "prompt": "<p>Haven Telecom wants a service agent in Dynamics 365 Contact Center voice and messaging channels. Billing changes require customer verification; difficult calls must transfer to a representative with context.</p><p>Which design is most important?</p>",
          "choices": [
            "Read the text-only response template aloud, including long billing tables.",
            "Treat recognized caller speech as authorization for account changes.",
            "Design channel-appropriate interaction, verified identity, guarded billing tools, and contextual human handoff.",
            "Build separate billing authority policies for each channel."
          ],
          "answer": 2,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Omnichannel service must preserve authorization and continuity while adapting the interaction to the channel.</p><p><strong>Why not the others:</strong> A: Text formatting alone does not create an effective voice interaction or secure handoff. B: Speech recognition is not proof of identity or authorization. D: Channel-specific authority rules create inconsistent business controls.</p>"
        },
        {
          "n": 19,
          "prompt": "<p>Bracken Parts wants to react automatically to overdue orders, gather evidence, and suggest an expedite plan. Only a purchasing manager may approve extra freight charges.</p><p>Which agent and flow design is appropriate?</p>",
          "choices": [
            "Send a scheduled email containing every order without investigation.",
            "Let the autonomous agent approve its own expedite requests.",
            "Use an event-driven autonomous agent for investigation and a controlled approval flow before chargeable actions.",
            "Use only a prompt-and-response agent waiting for users to report overdue orders."
          ],
          "answer": 2,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Autonomy can cover bounded preparation while a deterministic approval boundary protects consequential spending.</p><p><strong>Why not the others:</strong> A: Bulk notification does not provide evidence gathering and a proposed plan. B: Self-approval defeats manager-only spending authority. D: A purely reactive interaction does not satisfy automatic initiation.</p>"
        },
        {
          "n": 20,
          "prompt": "<p>Silverfern Leasing receives scanned application forms with tables and key-value fields. A downstream agent needs structured facts with links to the source, not a creative summary.</p><p>Which Foundry Tools capability should lead the design?</p>",
          "choices": [
            "Use an unconstrained generative summary as the authoritative application record.",
            "Use Azure Document Intelligence extraction, validate required fields, and retain source provenance.",
            "Use speech recognition to convert the scanned forms into application records.",
            "Use sentiment analysis to identify each required application field."
          ],
          "answer": 1,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Document Intelligence extracts document content; validation and provenance make extracted facts suitable for downstream use.</p><p><strong>Why not the others:</strong> A: A summary can omit or invent fields and does not replace validated extraction. C: Speech recognition processes audio, not scanned document layouts. D: Sentiment analysis does not extract layout and key-value structures.</p>"
        },
        {
          "n": 21,
          "prompt": "<p>Mapleline Transit has a small stable set of dispatch intents with strict routing rules. A separate public-information agent answers varied questions from approved policies. Both must escalate when uncertain.</p><p>Which architecture fits these needs?</p>",
          "choices": [
            "Use entity extraction alone to generate full policy explanations.",
            "Use unrestricted generative orchestration for dispatch and remove fallback from both agents.",
            "Use a forecasting model to choose topics in both agents.",
            "Use intent recognition such as CLU for dispatch and grounded generative answers with fallback for policy questions."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Stable intent taxonomies suit language-understanding classification; varied knowledge questions can benefit from grounded generation.</p><p><strong>Why not the others:</strong> A: Extracting entities does not synthesize answers to varied policy questions. B: This weakens strict routing and leaves uncertainty without safe recovery. C: Forecasting provides neither intent recognition nor grounded question answering.</p>"
        },
        {
          "n": 22,
          "prompt": "<p>Willow Warranty adds AI to a Power Apps canvas app. A user selects a case, receives a suggested reply, edits it, and submits it through an approved service workflow.</p><p>Which design preserves process control?</p>",
          "choices": [
            "Invoke a reusable prompt with authorized case context, show an editable draft, and submit through validated business logic.",
            "Skip review when the response has a professional tone.",
            "Send all cases to the model so it can select the right customer record.",
            "Let the prompt directly update any case identifier mentioned in its generated reply."
          ],
          "answer": 0,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> AI assists content creation without taking over record authorization, user review, or transaction validation.</p><p><strong>Why not the others:</strong> B: Tone does not establish correct facts or appropriate customer commitments. C: Unnecessary context increases exposure and delegates record selection unsafely. D: Generated text must not determine unvalidated record access or transaction targets.</p>"
        },
        {
          "n": 23,
          "prompt": "<p>Dovetail Stores uses a Copilot Studio prompt action to produce a fixed schema from supplier messages. The agent then calls an order-update flow. Under load, malformed prompt output sometimes reaches the flow.</p><p>Which Well-Architected improvement is most appropriate?</p>",
          "choices": [
            "Return raw output to the order API and allow failures to accumulate.",
            "Retry indefinitely until any output is accepted.",
            "Validate output schema and business rules before the flow, with safe failure, bounded retries, and telemetry.",
            "Add an instruction saying the model must never make formatting mistakes."
          ],
          "answer": 2,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Reliable intelligent workloads need explicit boundaries between probabilistic output and business transactions.</p><p><strong>Why not the others:</strong> A: The transaction boundary should reject malformed input predictably and support recovery. B: Unbounded retries create latency, cost, and duplicate-action risks. D: Instructions help but cannot replace runtime validation and error handling.</p>"
        },
        {
          "n": 24,
          "prompt": "<p>Pelican Energy has an approved asset-management MCP server exposing inspection tools. Its Copilot Studio agent must use the tools without unrestricted asset administration privileges.</p><p>Which extensibility design should be used?</p>",
          "choices": [
            "Put an administrator password in agent instructions so tools can authenticate.",
            "Use A2A to treat every asset API operation as an independently reasoning agent.",
            "Assume MCP discovery proves every published tool is safe for every user.",
            "Connect the approved MCP server, review its tool contracts, and enforce scoped authentication and authorization."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.2 Design extensibility",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> MCP supplies an integration contract; it does not remove server-side authorization or tool-governance requirements.</p><p><strong>Why not the others:</strong> A: Prompts are not credential stores and administrator scope is unnecessary. B: Agent collaboration is unnecessary merely to expose existing tool operations. C: Discovery describes availability, not suitability or user authority.</p>"
        },
        {
          "n": 25,
          "prompt": "<p>Stonebridge Records must automate a legacy supplier website with no supported API. An authorized clerk performs the task today, but page layouts change and final submission creates a binding purchase.</p><p>How should computer use be introduced?</p>",
          "choices": [
            "Pilot scoped credentials, layout-change tests, evidence capture, and approval before binding submission.",
            "Provide unrestricted browser access and let the agent infer purchase authority.",
            "Train on screenshots and omit monitoring once the pilot succeeds.",
            "Prefer visual interaction over any future supported API because it is always more stable."
          ],
          "answer": 0,
          "topic": "Design AI-powered business solutions",
          "objective": "2.2 Design extensibility",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> UI automation can bridge integration gaps, but brittle interfaces and consequential actions require explicit safeguards.</p><p><strong>Why not the others:</strong> B: Browser access and model inference do not establish delegated purchasing authority. C: Initial success does not eliminate later UI drift or operational risk. D: Supported APIs generally provide more dependable contracts than changing layouts.</p>"
        },
        {
          "n": 26,
          "prompt": "<p>Tern Consulting has a Foundry specialist agent that owns complex research tasks. A Copilot Studio coordinator should delegate work and receive results while preserving specialist ownership.</p><p>Which protocol role best matches this requirement?</p>",
          "choices": [
            "Use MCP solely because every independent agent is a static knowledge resource.",
            "Use a prompt library as the runtime transport for specialist tasks.",
            "Share a Dataverse table and omit a delegation contract.",
            "Evaluate A2A for agent-to-agent task collaboration, retaining identity, timeouts, and result validation."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.2 Design extensibility",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> A2A addresses independently implemented agent collaboration; security and operational contracts remain necessary.</p><p><strong>Why not the others:</strong> A: This requirement is agent delegation, not simply access to a tool or resource. B: A template repository does not execute agent-to-agent tasks. C: Shared storage does not define task ownership, completion, or authorization.</p>"
        },
        {
          "n": 27,
          "prompt": "<p>Oceanview Components uses Dynamics 365 Finance and Supply Chain Management. Finance needs workflow-history summaries; planners need help interpreting changes to confirmed purchase orders. Documented in-app capabilities align with both needs.</p><p>What should be recommended first?</p>",
          "choices": [
            "Replace both ERP workflows with one free-form external chat agent.",
            "Use Microsoft 365 Copilot for Sales as the primary ERP change-analysis engine.",
            "Train separate foundation models before examining the in-app experiences.",
            "Evaluate the relevant prebuilt Copilot experiences with business owners, access controls, and approval boundaries."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Evaluate app-specific capabilities before duplicating them while preserving financial and procurement controls.</p><p><strong>Why not the others:</strong> A: A chat replacement discards established workflow and control boundaries. B: Seller assistance is not the appropriate prebuilt fit for these ERP tasks. C: Pretraining is unnecessary before evaluating suitable existing capabilities.</p>"
        },
        {
          "n": 28,
          "prompt": "<p>Elmbridge Finance wants in-app generative help to answer questions about approved internal close procedures as well as standard product guidance. It does not need autonomous journal posting.</p><p>Which approach should be proposed?</p>",
          "choices": [
            "Extend help knowledge in Copilot Studio with governed procedure sources and test permissions and citations.",
            "Enable journal-posting tools and assume the help experience gains procedural knowledge.",
            "Fine-tune a model on last year's journals to teach the current close procedure.",
            "Make the close procedures public to simplify retrieval."
          ],
          "answer": 0,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Custom knowledge can complement standard help while grounding, access, and answer quality remain governed.</p><p><strong>Why not the others:</strong> B: Transaction tools do not replace the required knowledge sources. C: Historical transactions do not provide maintained procedural guidance. D: Public exposure is unnecessary and may violate confidentiality requirements.</p>"
        },
        {
          "n": 29,
          "prompt": "<p>Ambercrest Medical has sellers in Outlook and Teams using Dynamics 365 Sales and service representatives using CRM case knowledge. It wants role-specific Microsoft 365 assistance without replacing CRM workflows.</p><p>Which configuration strategy fits?</p>",
          "choices": [
            "Configure only Copilot for Sales and use opportunity summaries as case-resolution knowledge.",
            "Evaluate Microsoft 365 Copilot for Sales and Copilot for Service with relevant CRM connections, knowledge, and role-based access.",
            "Create a public knowledge-only agent and remove authenticated CRM integration.",
            "Configure only Copilot for Service and migrate opportunity management into knowledge articles."
          ],
          "answer": 1,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Role-specific assistance should connect to relevant sales or service context while preserving existing systems and authorization.</p><p><strong>Why not the others:</strong> A: Sales opportunities do not substitute for service case knowledge and workflows. C: Public knowledge alone cannot meet role-specific CRM assistance needs. D: Service knowledge is not an authoritative sales opportunity system.</p>"
        },
        {
          "n": 30,
          "prompt": "<p>Poppy Legal needs one approved summarization prompt in a Power Automate flow, a canvas app, and a Copilot Studio agent. Makers should not maintain unrelated copies.</p><p>Which design should be recommended?</p>",
          "choices": [
            "Manage a reusable parameterized prompt through Power Platform AI capabilities, including AI hub, and share it with governed consumers.",
            "Build a foundation model so prompt definitions are no longer required.",
            "Store independent prompts in each product and synchronize them by email.",
            "Use a Dynamics 365 forecasting configuration as the shared summarization asset."
          ],
          "answer": 0,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Reusable prompts support apps, flows, and agents; central ownership and evaluation reduce inconsistent copies.</p><p><strong>Why not the others:</strong> B: Model customization does not eliminate task instructions or lifecycle governance. C: Manual duplication weakens lifecycle consistency and shared evaluation. D: Forecasting configuration is not a reusable text-summarization prompt.</p>"
        },
        {
          "n": 31,
          "prompt": "<p>Linden Support sees rising agent latency. Overall model response time is stable, but users report delays after order-status requests. The solution uses retrieval, two tools, and human handoff.</p><p>What should monitoring examine first?</p>",
          "choices": [
            "Compare total monthly token consumption across departments only.",
            "Correlated retrieval and tool traces, including duration, failures, retries, and dependency identifiers.",
            "Remove human handoff because it is the only non-model stage.",
            "Fine-tune the language model immediately using slow conversations."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.1 Analyze, monitor, tune",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> End-to-end traces locate the slow stage when aggregate model timing does not explain user-visible latency.</p><p><strong>Why not the others:</strong> A: Aggregate token use cannot isolate a slow order-status dependency. C: Retrieval and tools are also dependencies, and handoff may be a required safeguard. D: Model tuning is not justified by an unidentified dependency delay.</p>"
        },
        {
          "n": 32,
          "prompt": "<p>Copperleaf Hotels reports a high agent containment rate, yet repeat contacts and incorrect booking-policy answers are increasing. Managers want a tuning backlog.</p><p>Which prioritization method is strongest?</p>",
          "choices": [
            "Discard feedback from conversations that did not escalate.",
            "Optimize only for increasing containment and shortening every answer.",
            "Combine verified failure samples, repeat-contact outcomes, policy risk, and user feedback to rank fixes.",
            "Prioritize the latest negative comment without checking its conversation."
          ],
          "answer": 2,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.1 Analyze, monitor, tune",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Containment alone can hide incorrect outcomes; prioritize validated business failures and risk.</p><p><strong>Why not the others:</strong> A: Incorrect contained conversations may be the most important failures. B: Fewer handoffs can coexist with worse customer outcomes. D: Unverified recency is weaker evidence than validated impact and risk.</p>"
        },
        {
          "n": 33,
          "prompt": "<p>Frostline Freight changed its knowledge indexing pipeline. Tool success and model version are unchanged, but citations now point to outdated tariff documents.</p><p>Which tuning action should be investigated first?</p>",
          "choices": [
            "Increase model creativity so it can infer the newest tariffs.",
            "Compare retrieval results, source freshness, and index-version changes against a known-good evaluation set.",
            "Fine-tune on outdated answers to preserve conversation consistency.",
            "Replace the working order-status connector before reviewing retrieval."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.1 Analyze, monitor, tune",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Evidence points to grounding and indexing; component-level analysis should guide the fix.</p><p><strong>Why not the others:</strong> A: Generation settings cannot establish current authoritative facts. C: Training on the regression reinforces the wrong behavior. D: No evidence links that connector to stale citations.</p>"
        },
        {
          "n": 34,
          "prompt": "<p>Estuary Machines connects Dynamics 365 Sales commitments to Supply Chain fulfillment and Customer Service installation cases. Each agent passes unit tests, but a retry created two installation cases.</p><p>Which test strategy should be added?</p>",
          "choices": [
            "Repeat summarization prompt tests with longer example inputs only.",
            "Accept unit tests and rely on users to report duplicate cases after launch.",
            "Test each app against a different customer identifier to isolate agents.",
            "Run cross-app end-to-end tests for retries, authorization, identifiers, and duplicate prevention with observable expected outcomes."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.2 Manage testing",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Component tests cannot prove cross-system transaction behavior; failure and retry paths need end-to-end coverage.</p><p><strong>Why not the others:</strong> A: Prompt tests do not validate cross-app duplicate prevention. B: A known integration failure must be tested before broad deployment. C: Inconsistent test identities prevent validation of the integrated process.</p>"
        },
        {
          "n": 35,
          "prompt": "<p>Redwood Publishing uses Copilot to generate test cases for a custom classifier. Generated cases resemble training examples and omit rare but costly misclassifications.</p><p>What should the test lead do?</p>",
          "choices": [
            "Let the model define its own expected labels during evaluation.",
            "Review generated cases with experts and add independent held-out, edge, and risk-weighted examples with acceptance thresholds.",
            "Use only generated examples because similarity to training proves accuracy.",
            "Accept the model if average response time is below target."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.2 Manage testing",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> AI accelerates test drafting, but independent coverage and explicit criteria establish real performance.</p><p><strong>Why not the others:</strong> A: Self-defined labels undermine independent ground truth. C: Training-like examples can hide leakage and weak generalization. D: Latency alone does not validate classification quality or costly errors.</p>"
        },
        {
          "n": 36,
          "prompt": "<p>Aspen Facilities must promote a Copilot Studio agent, custom connector, and action flow from development to production. Each environment uses different endpoints and connections.</p><p>Which ALM design is appropriate?</p>",
          "choices": [
            "Edit the production agent and connector manually after each development change.",
            "Copy production credentials into prompts so the package works everywhere.",
            "Move only agent text and rebuild the connector and flow from memory.",
            "Package solution components, use environment-specific configuration and connection references, and promote through tested pipelines."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.3 Design ALM",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Solution-aware deployment separates versioned artifacts from environment bindings and supports repeatable releases.</p><p><strong>Why not the others:</strong> A: Manual production edits create drift and bypass repeatable validation. B: Secrets do not belong in prompts or hard-coded environment configuration. C: Incomplete promotion loses dependencies and reproducibility.</p>"
        },
        {
          "n": 37,
          "prompt": "<p>Ironwood Analytics releases a custom model in Foundry alongside an agent. The model was validated using one dataset snapshot, but deployment later selects a rebuilt index and a different prompt revision.</p><p>Which release practice should be required?</p>",
          "choices": [
            "Version the model, prompts, tools, data and index lineage, and evaluation evidence as a compatible release with rollback.",
            "Replace test evidence after deployment with satisfaction ratings alone.",
            "Rebuild production data from the latest source without recording lineage.",
            "Version only model weights because prompts and indexes do not affect behavior."
          ],
          "answer": 0,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.3 Design ALM",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> AI behavior depends on the configuration and grounding chain; model version alone does not identify a reproducible release.</p><p><strong>Why not the others:</strong> B: Feedback supplements rather than replaces release validation. C: Unrecorded rebuilds prevent reproducibility, diagnosis, and reliable rollback. D: Prompt and grounding changes can materially alter answers and safety.</p>"
        },
        {
          "n": 38,
          "prompt": "<p>Osprey Procurement retrieves a supplier document containing instructions to ignore prior rules and export all contracts to an external address. The agent can call a document-export tool.</p><p>Which defense-in-depth design is required?</p>",
          "choices": [
            "Fine-tune on trusted contracts and trust all future supplier documents.",
            "Tell the model to ignore malicious instructions and leave export permissions unrestricted.",
            "Log exports after execution and use logging as the only mitigation.",
            "Treat retrieved content as untrusted, constrain tool scopes, enforce authorization outside the model, and test injection attempts."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.4 Responsible AI, security, governance, risk, compliance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Prompt manipulation can enter through grounding; independent controls limit impact even when a model is influenced.</p><p><strong>Why not the others:</strong> A: Adaptation does not make third-party runtime content trustworthy. B: Prompt wording alone is not a sufficient security boundary. C: Auditing supports investigation but does not prevent unauthorized disclosure.</p>"
        },
        {
          "n": 39,
          "prompt": "<p>Briar Bank uses a shared search index containing retail and private-banking files. Users must receive only content permitted by their own entitlements, including citations and tool results.</p><p>Which access-control design should be selected?</p>",
          "choices": [
            "Authorize the chat page but give its service account access to all banking files.",
            "Enforce user-aware authorization during retrieval and tool execution, including the content returned to the model.",
            "Remove citations so users cannot identify restricted documents.",
            "Retrieve all documents and ask the model to hide restricted paragraphs."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.4 Responsible AI, security, governance, risk, compliance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Grounding and tools must respect requester permissions before sensitive material becomes model context.</p><p><strong>Why not the others:</strong> A: Entry-point access alone does not preserve per-user data entitlements. C: Hiding provenance does not prevent disclosure of protected facts. D: Instructions are not authorization, and restricted data is already in context.</p>"
        },
        {
          "n": 40,
          "prompt": "<p>Summit Public Services wants an agent in two jurisdictions. Grounding files, model processing, tuning datasets, telemetry, and support access may follow different paths.</p><p>What should be validated before approval?</p>",
          "choices": [
            "Let the model decide which requests may legally cross borders.",
            "Review model processing but exclude prompts and telemetry from the map.",
            "Approve deployment because the web app is hosted in the required jurisdiction.",
            "Map every data movement and processing location to legal requirements, access policies, retention rules, and auditable change controls."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.4 Responsible AI, security, governance, risk, compliance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Residency and governance apply across the AI lifecycle, not only to the frontend or one database.</p><p><strong>Why not the others:</strong> A: Legal movement policy requires accountable governance and enforceable controls. B: Prompts and logs can contain regulated information and need lifecycle analysis. C: Frontend hosting does not establish inference, logging, or other processing locations.</p>"
        }
      ]
    }
  ]
};
