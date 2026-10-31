window.ABX_DATA = window.ABX_DATA || {};
window.ABX_DATA.exam5 = {
  "id": "exam5",
  "name": "AB-100 Practice Exam 2",
  "timeMinutes": 80,
  "units": [
    {
      "title": "Original unofficial practice questions",
      "html": "<p>Independent study material, not Microsoft exam content. Aligned to AB-100 skills measured as of November 16, 2026.</p>",
      "questions": [
        {
          "n": 1,
          "prompt": "<p>Beacon Grocers wants to explain weekly sales variance and forecast demand. Leadership proposes an autonomous agent that can change reorder quantities immediately, although analysts currently approve planning changes.</p><p>Which requirement analysis is most appropriate?</p>",
          "choices": [
            "Treat forecasting accuracy as sufficient authorization for autonomous purchasing.",
            "Use a conversational agent instead of measuring forecast performance.",
            "Separate descriptive and predictive analytics from authorized actions, and establish review rules for inventory changes.",
            "Replace numerical forecasting with sentiment analysis of store manager comments."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Analytics and decision support do not automatically justify autonomous execution; the action boundary needs explicit authority.</p><p><strong>Why not the others:</strong> A: Prediction quality does not confer business authority to spend or reorder. B: Conversation does not replace quantitative validation of a forecasting requirement. D: Sentiment alone does not model the required demand quantities.</p>"
        },
        {
          "n": 2,
          "prompt": "<p>Cairn Rentals wants an agent to promise equipment availability. Historical catalog descriptions are indexed nightly, but reservations change every minute and a mistaken promise incurs penalties.</p><p>Which grounding design should requirements specify?</p>",
          "choices": [
            "Retrieve descriptive knowledge from the catalog and query authorized live availability before making a promise.",
            "Fine-tune a model each month on reservation history.",
            "Use nightly catalog retrieval for every answer to keep architecture consistent.",
            "Increase catalog chunk overlap so reservation changes can be inferred."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Different facts have different freshness needs; operational availability requires a current authoritative check.</p><p><strong>Why not the others:</strong> B: Historical training does not establish current inventory availability. C: Uniform stale data access violates the stated timeliness requirement. D: Chunk overlap cannot supply events absent from the source snapshot.</p>"
        },
        {
          "n": 3,
          "prompt": "<p>Delta Research wants grant, project, and investigator data usable by several AI systems. Different applications reuse project names, and joins sometimes associate spending with the wrong grant.</p><p>What should be defined first?</p>",
          "choices": [
            "A larger response token budget to include more project names.",
            "A longer prompt that asks the model to infer which names refer to the same project.",
            "Canonical identifiers, business definitions, ownership, and lineage for the shared entities.",
            "A separate vector index with undocumented naming rules for every consumer."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Consistent identity and semantics are prerequisites for trustworthy cross-system AI grounding.</p><p><strong>Why not the others:</strong> A: Response length does not resolve incorrect entity joins. B: Prompt inference is not a dependable replacement for authoritative identifiers. D: Undocumented independent mappings preserve the inconsistency.</p>"
        },
        {
          "n": 4,
          "prompt": "<p>Fairwater Shipping is assessing an agent that suggests port diversions. Weather feeds have different update intervals; berth data can be unavailable; diversion decisions require an operations officer.</p><p>Which requirement set best supports architectural evaluation?</p>",
          "choices": [
            "Specify data freshness and outage tolerance, decision deadlines, provenance, and officer approval for each diversion.",
            "Specify only the number of ports and expected concurrent conversations.",
            "Use the model provider service SLA as the complete availability requirement.",
            "Require the agent to fill missing berth data using its most likely prediction."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.1 Analyze requirements",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Decision suitability depends on time-critical data quality and availability as well as clear human authority.</p><p><strong>Why not the others:</strong> B: Scale does not establish whether the information can support a safe timely decision. C: Model availability does not cover external data dependencies or decision deadlines. D: Unverified predictions cannot silently substitute for authoritative operational facts.</p>"
        },
        {
          "n": 5,
          "prompt": "<p>Glenwood University wants AI adoption aligned to the Cloud Adoption Framework. It has a candidate list of student-support use cases but no agreed benefits, risk owners, or readiness assessment.</p><p>What should precede platform expansion?</p>",
          "choices": [
            "Treat completion of one successful demo as approval for the entire portfolio.",
            "Create a sponsored outcome-based roadmap with readiness, risk ownership, and stage gates for evidence-based scaling.",
            "Move all student data to one model endpoint before assessing policies.",
            "Buy capacity for every listed use case before selecting priorities."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> An adoption roadmap connects business value and organizational readiness to governed incremental investment.</p><p><strong>Why not the others:</strong> A: A demo does not validate organization-wide readiness or all use-case risks. C: Consolidating sensitive data first bypasses the necessary governance assessment. D: Capacity-first spending does not establish business value or readiness.</p>"
        },
        {
          "n": 6,
          "prompt": "<p>Hearth Homewares must serve external warranty customers from its own website and mobile application. It needs custom identity integration and brand-specific workflow control; customers do not use its Microsoft 365 tenant.</p><p>Which approach should be evaluated first?</p>",
          "choices": [
            "Publish an internal Microsoft 365 Copilot agent and assume customers inherit employee access.",
            "Use an unmodified internal knowledge agent with anonymous access to all warranty records.",
            "Fine-tune a model so authentication can be performed through conversation.",
            "Build a customer-facing agent with the required channels, identity boundary, and controlled warranty tools."
          ],
          "answer": 3,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A custom agent experience is appropriate when external audience and runtime requirements do not fit an internal Copilot extension.</p><p><strong>Why not the others:</strong> A: An internal extension does not establish the external customer identity and channel design. B: Anonymous broad access violates the customer-specific data boundary. C: Model tuning cannot replace an identity provider and authorization controls.</p>"
        },
        {
          "n": 7,
          "prompt": "<p>Ivory Health has a Copilot Studio intake agent and an independent Foundry scheduling specialist. The specialist performs its own reasoning and returns a proposed appointment plan. Intake must not duplicate scheduling logic.</p><p>Which strategy preserves that boundary?</p>",
          "choices": [
            "Forward every user message to both agents and accept whichever answer arrives first.",
            "Use a supported agent-collaboration approach such as A2A with scoped tasks, identity rules, and explicit completion and failure handling.",
            "Expose only the specialist instruction text as an MCP resource and ask intake to run it.",
            "Train one shared model on both agents and remove explicit task ownership."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Independent reasoning specialists need a delegation contract rather than duplicated internals.</p><p><strong>Why not the others:</strong> A: Racing outputs lacks controlled ownership and may return an incomplete or unauthorized plan. C: Reading instructions does not delegate execution to the specialist. D: Shared training does not preserve independent responsibilities or failure contracts.</p>"
        },
        {
          "n": 8,
          "prompt": "<p>Jade Media asks makers to write a reusable prompt that extracts campaign objectives from a supplied brief. Current prompts contain vague instructions and mix examples with live customer data.</p><p>Which guideline should the architect provide?</p>",
          "choices": [
            "Embed real customer records in every example to increase realism.",
            "State the task, delimit input context, define the output schema, use synthetic examples, and specify behavior for missing facts.",
            "Require confident answers even when the brief omits an objective.",
            "Ask the model to be smart and let it choose all output fields."
          ],
          "answer": 1,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Explicit instructions, bounded context, examples, and uncertainty handling make prompt behavior testable.</p><p><strong>Why not the others:</strong> A: Real records create unnecessary privacy exposure. C: Forced confidence encourages fabricated facts rather than a safe missing-data response. D: Vague instructions do not define the downstream contract.</p>"
        },
        {
          "n": 9,
          "prompt": "<p>Kestrel Museums has a well-performing general model but frequently changing exhibition dates and ticket policies. Staff propose fine-tuning the model whenever a policy changes.</p><p>Which strategy is preferable?</p>",
          "choices": [
            "Fine-tune weekly and stop maintaining authoritative policy documents.",
            "Rely on general model knowledge because its language quality is high.",
            "Keep current policies in governed retrievable sources and evaluate grounded responses before considering model customization.",
            "Use a customized SLM without retrieving any policy updates."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Frequently changing facts are usually better supplied through grounding than repeatedly encoded through model adaptation.</p><p><strong>Why not the others:</strong> A: Model adaptation is not a replacement for a current source of truth. B: Fluency does not imply access to current organization-specific facts. D: A smaller model does not inherently know changing exhibition facts.</p>"
        },
        {
          "n": 10,
          "prompt": "<p>Larkspur Devices wants one tiny customized SLM for broad legal analysis, open-ended planning, and unfamiliar multilingual inquiries. Its only evidence is strong accuracy on a narrow product-labeling dataset.</p><p>What should the architect recommend?</p>",
          "choices": [
            "Benchmark representative workloads and select model capabilities by task rather than generalizing the narrow SLM result.",
            "Deploy the SLM everywhere because smaller models always reduce total business risk.",
            "Replace task evaluation with the count of model parameters.",
            "Increase the product-label training set and assume all unrelated tasks improve equally."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> An SLM can fit bounded tasks, but narrow validation does not establish broad reasoning, language coverage, or legal suitability.</p><p><strong>Why not the others:</strong> B: Lower resource use does not guarantee task quality or lower risk. C: Parameter count alone is not a workload-quality measure. D: More narrow data does not prove unrelated capability.</p>"
        },
        {
          "n": 11,
          "prompt": "<p>Maple Harbor Council wants a CoE to approve high-impact agents. A proposal affects benefit eligibility, while another drafts internal meeting agendas. Teams request identical approval steps for both.</p><p>Which policy is most appropriate?</p>",
          "choices": [
            "Use risk-tiered review with documented accountability, impact assessments, and proportionate assurance evidence.",
            "Let each model determine whether its own use case is high impact.",
            "Prohibit reusable standards so each department can invent its approval policy.",
            "Apply only a prompt style review because all agents generate text."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A CoE should apply common principles with controls proportional to impact rather than making every workflow equally burdensome.</p><p><strong>Why not the others:</strong> B: Risk classification requires accountable organizational governance. C: Independent policies weaken consistency and shared assurance. D: A text interface can still influence consequential decisions.</p>"
        },
        {
          "n": 12,
          "prompt": "<p>Nimble Solar uses Dynamics 365 Sales for leads and Customer Service for support. It wants an AI roadmap covering seller email assistance and service case summaries before any unique automation is built.</p><p>Which strategy best fits?</p>",
          "choices": [
            "Map each need to relevant prebuilt sales and service capabilities, then identify integration and extension gaps.",
            "Use the sales pipeline forecast as the service knowledge source.",
            "Select agents solely by shared visual branding across the applications.",
            "Build one custom model for all functions before inspecting app capabilities."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.2 Design overall AI strategy",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A fit-gap strategy uses existing application strengths and reserves custom investment for unmet requirements.</p><p><strong>Why not the others:</strong> B: Pipeline forecasting is not a substitute for service case context. C: Appearance does not establish functional fit or process integration. D: Custom development before fit assessment duplicates existing value.</p>"
        },
        {
          "n": 13,
          "prompt": "<p>Orchid Claims estimates $240,000 in first-year realized benefits. One-time implementation costs $80,000. Annual licenses and support cost $40,000; variable AI use costs $20,000 at forecast volume. Use ROI = (benefits minus costs) / costs, with no discounting.</p><p>What is the first-year ROI, rounded to the nearest whole percent?</p>",
          "choices": [
            "300%, using only implementation costs of $80,000.",
            "125%, dividing the $100,000 net benefit by $80,000 in implementation costs.",
            "71%, using total first-year costs of $140,000.",
            "171%, using total first-year costs of $140,000."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Net benefit is $240,000 - $140,000 = $100,000; $100,000 / $140,000 is approximately 71%.</p><p><strong>Why not the others:</strong> A: This divides gross benefits by an incomplete cost base. B: This divides by implementation cost alone rather than the complete $140,000 first-year cost base. D: This is gross benefits divided by costs, not the specified ROI.</p>"
        },
        {
          "n": 14,
          "prompt": "<p>Prairie Textiles compares a prebuilt agent subscription with a custom agent. Usage is seasonal, and the custom option needs integration development, evaluations, on-call support, and periodic security reviews.</p><p>Which cost model should be used?</p>",
          "choices": [
            "Compare lifecycle TCO across low, expected, and peak usage, including delivery, consumption, assurance, and support.",
            "Assume custom software has no recurring costs after deployment.",
            "Exclude on-call and evaluation costs because existing staff perform them.",
            "Compare only subscription price with the model inference rate."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Sensitivity analysis exposes utilization and operating-cost trade-offs that a single unit price misses.</p><p><strong>Why not the others:</strong> B: Custom agents retain hosting, support, assurance, and change costs. C: Staff effort still consumes resources and has opportunity cost. D: These prices omit integration and lifecycle responsibilities.</p>"
        },
        {
          "n": 15,
          "prompt": "<p>Quarryline Finance wants a model router for simple extraction and complex reconciliation explanations. Some approved models cannot process regulated data in the required geography.</p><p>Which routing design is defensible?</p>",
          "choices": [
            "Send regulated prompts to the cheapest model if no sensitive answer is retained.",
            "Use only aggregate cost as the release criterion for router changes.",
            "Constrain eligible models to compliant options, then evaluate routing quality, cost, and latency for each task class.",
            "Route across every available model and filter noncompliant answers afterward."
          ],
          "answer": 2,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Compliance is a hard boundary; optimization happens within the permitted model set and must be validated.</p><p><strong>Why not the others:</strong> A: Not retaining output does not make unauthorized processing compliant. B: Cost alone does not prove quality, latency, or residency requirements. D: Output filtering cannot undo prohibited data processing.</p>"
        },
        {
          "n": 16,
          "prompt": "<p>Rosewood Field Services can extend an existing agent in six weeks or build a specialized agent in six months. The custom option offers potentially better dispatch optimization, but its estimated benefit depends on unproven data quality.</p><p>Which investment decision is strongest?</p>",
          "choices": [
            "Pilot the supported extension to measure near-term value while testing the custom option against explicit incremental-value and data-readiness gates.",
            "Choose the extension permanently without measuring unmet dispatch needs.",
            "Choose custom immediately because the largest projected benefit always wins.",
            "Compare implementation labor only and ignore delayed benefit realization."
          ],
          "answer": 0,
          "topic": "Plan AI-powered business solutions",
          "objective": "1.3 Evaluate costs and benefits",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Staged investment accounts for opportunity cost, uncertainty, time to value, and evidence of differentiating benefits.</p><p><strong>Why not the others:</strong> B: A quick start does not prove that valuable differentiation is unnecessary. C: Unproven projections must be adjusted for delivery and data risk. D: Time to value and foregone benefits affect the business case.</p>"
        },
        {
          "n": 17,
          "prompt": "<p>Sundial Instruments wants a Copilot experience for Dynamics 365 Sales to include warranty eligibility from an external service. The service exposes an authenticated API, and access must follow the seller's entitlement.</p><p>Which integration design is most appropriate?</p>",
          "choices": [
            "Copy a service administrator token into the seller prompt library.",
            "Use a supported connector or extension with explicit API schemas, scoped identity, and validated account mapping.",
            "Use computer interaction with the service website despite an appropriate supported API.",
            "Upload warranty records into model training and remove runtime access checks."
          ],
          "answer": 1,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> A governed API contract can add business context while preserving seller authorization and record identity.</p><p><strong>Why not the others:</strong> A: A prompt library is not a secure credential store and administrator scope exceeds the requirement. C: UI interaction adds brittleness when a suitable integration contract exists. D: Training does not enforce current seller-specific permissions or warranty freshness.</p>"
        },
        {
          "n": 18,
          "prompt": "<p>Tamarack Broadband designs a voice agent for Dynamics 365 Contact Center. Customers can request service cancellation, but the account identifier is often misrecognized and cancellation has contractual consequences.</p><p>Which interaction pattern should be designed?</p>",
          "choices": [
            "Increase speaking speed and submit the first recognized account number.",
            "Verify identity, confirm the resolved account and cancellation details, then invoke a guarded tool or hand off.",
            "Treat a generated cancellation explanation as proof the backend transaction succeeded.",
            "Use caller frustration as the signal to bypass verification."
          ],
          "answer": 1,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Voice uncertainty and consequential transactions require explicit confirmation and authorization boundaries.</p><p><strong>Why not the others:</strong> A: Faster speech does not resolve recognition ambiguity or transaction authority. C: Generated language is not evidence that a validated transaction completed. D: Sentiment does not establish identity or permission to cancel.</p>"
        },
        {
          "n": 19,
          "prompt": "<p>Umber Architecture wants an assistant that drafts a client briefing only when a consultant supplies approved notes. It must not monitor events, contact clients, or execute follow-up tasks.</p><p>Which agent pattern is the best starting point?</p>",
          "choices": [
            "Use an autonomous event-driven agent with client email permissions.",
            "Use unrestricted multi-agent planning to decide which clients should receive a briefing.",
            "Use a task agent that submits project changes whenever a draft is produced.",
            "Use a bounded prompt-and-response design with explicit inputs, a reviewable draft, and no outbound action tools."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> The requirement is user-initiated content assistance, not autonomous event processing or execution.</p><p><strong>Why not the others:</strong> A: Autonomy and outbound tools exceed the stated business need. B: Recipient planning adds unrequested authority and scope. C: The requirement excludes follow-up execution and project updates.</p>"
        },
        {
          "n": 20,
          "prompt": "<p>Vale Training receives prerecorded workshop audio and needs searchable transcripts before a knowledge agent can summarize sessions. It does not need live captions.</p><p>Which Foundry Tools capability fits the first processing stage?</p>",
          "choices": [
            "Use a model router as the storage layer for searchable recordings.",
            "Use Document Intelligence to extract tables directly from the audio stream.",
            "Use text sentiment analysis to reconstruct words that were spoken.",
            "Use Azure Speech batch transcription, then validate and index the transcript with source metadata."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Batch speech-to-text fits prerecorded audio; validated transcripts can then support downstream retrieval and summaries.</p><p><strong>Why not the others:</strong> A: Routing selects models; it is not transcription or a search index. B: Document extraction is not the appropriate audio-transcription service. C: Sentiment analysis requires text and does not transcribe audio.</p>"
        },
        {
          "n": 21,
          "prompt": "<p>Westbay Housing has a Copilot Studio repairs agent. Users sometimes ask whether a problem belongs to plumbing or electrical maintenance. Wrong routing delays urgent repairs, and the agent currently guesses a topic.</p><p>Which topic and fallback design is preferable?</p>",
          "choices": [
            "Send every unknown request to a generic knowledge answer without escalation.",
            "Remove the repair topics and rely solely on open-ended conversation.",
            "Ask targeted clarification, recognize urgent safety signals, and escalate unresolved ambiguity with captured context.",
            "Choose whichever topic has the most training phrases whenever confidence is low."
          ],
          "answer": 2,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Fallback should recover safely and preserve context rather than forcing a plausible but unverified route.</p><p><strong>Why not the others:</strong> A: A generic answer can leave urgent operational needs unresolved. B: Unbounded conversation discards required dispatch and safety behavior. D: Topic size does not determine the correct route for an ambiguous issue.</p>"
        },
        {
          "n": 22,
          "prompt": "<p>Xylo Manufacturing is piloting code-first generative pages and an agent feed in a supported model-driven app environment. Supervisors need to see proposed work, completed work, and exceptions across agents.</p><p>Which architecture requirement should govern the pilot?</p>",
          "choices": [
            "Treat a visible activity card as authorization for any supervisor to change any record.",
            "Use the feed as the only transaction system of record.",
            "Preserve authorized record access and explicit action contracts, and expose attributable agent activity and exceptions for supervision.",
            "Let generated page code bypass server-side validation to maximize responsiveness."
          ],
          "answer": 2,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Generated UI and activity feeds should support accountable work without replacing backend authorization or business controls.</p><p><strong>Why not the others:</strong> A: Presentation does not confer record-level permissions. B: An activity view does not replace authoritative transactional records. D: Generated interfaces remain subject to normal business and security controls.</p>"
        },
        {
          "n": 23,
          "prompt": "<p>Yarrow Repairs uses an agent to triage service requests and an agent flow to reserve a technician. Reservation calls can time out after the backend has committed. A second attempt must not book another technician.</p><p>Which design is required?</p>",
          "choices": [
            "Use a stable operation identifier, idempotent reservation handling, explicit status checks, and bounded recovery paths.",
            "Ask a prompt to infer whether a reservation probably exists.",
            "Retry with a new reservation identifier after every timeout.",
            "Hide timeout messages and let the conversation continue as if booking succeeded."
          ],
          "answer": 0,
          "topic": "Design AI-powered business solutions",
          "objective": "2.1 Design AI and agents",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Ambiguous commit outcomes require transaction-safe retries rather than assuming a timeout means failure.</p><p><strong>Why not the others:</strong> B: Language inference cannot establish backend transaction state. C: New identifiers can create duplicate reservations when the first call committed. D: Suppressing errors neither verifies success nor supports reliable recovery.</p>"
        },
        {
          "n": 24,
          "prompt": "<p>Zenith Parks wants a maintenance knowledge agent available from both Teams and SharePoint. Users should see the same approved guidance, but their access to park records differs by role.</p><p>Which design best supports these surfaces?</p>",
          "choices": [
            "Assume hiding the agent from a SharePoint menu secures its data.",
            "Grant every user the agent owner's permissions for consistent answers.",
            "Publish the governed agent to supported Microsoft 365 surfaces and validate identity and source permissions in each context.",
            "Create a separate ungoverned copy of all park records for each surface."
          ],
          "answer": 2,
          "topic": "Design AI-powered business solutions",
          "objective": "2.2 Design extensibility",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Multiple entry points can reuse an agent while still requiring correct identity and authorization across surfaces.</p><p><strong>Why not the others:</strong> A: Navigation visibility is not an authorization boundary. B: Consistency must not override role-specific access. D: Duplicate copies create drift and unnecessary data exposure.</p>"
        },
        {
          "n": 25,
          "prompt": "<p>Acorn Compliance has selected a custom model in Microsoft Foundry for a specialized redaction task. A Copilot Studio agent will call the capability; model versions and output contracts will evolve.</p><p>Which extensibility design best isolates those changes?</p>",
          "choices": [
            "Allow any new model output structure to pass directly into downstream record updates.",
            "Expose a versioned authenticated service contract with validated inputs and outputs, evaluation gates, and explicit failure handling.",
            "Retrain the Copilot Studio agent whenever the service endpoint changes.",
            "Embed deployment-specific secrets and raw model assumptions directly in every topic."
          ],
          "answer": 1,
          "topic": "Design AI-powered business solutions",
          "objective": "2.2 Design extensibility",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> A stable integration boundary decouples agent behavior from model implementation changes while retaining assurance.</p><p><strong>Why not the others:</strong> A: Changing probabilistic output must not bypass schema and business validation. C: Endpoint configuration is an integration concern, not a reason to retrain an agent model. D: Tight coupling and secret duplication undermine security and maintainability.</p>"
        },
        {
          "n": 26,
          "prompt": "<p>Birchlane Labs uses MCP tools from a third-party server. The server owner adds a new delete operation and changes an existing tool description. The lab has a controlled change process.</p><p>Which governance design is necessary?</p>",
          "choices": [
            "Disable audit logging because the server owner can inspect its own logs.",
            "Approve the server once and exclude tool descriptions from future reviews.",
            "Trust all discovered tools because MCP is an interoperability standard.",
            "Track tool inventory and contract changes, apply least privilege, and regression-test newly exposed behaviors before production use."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.2 Design extensibility",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Dynamic discovery does not eliminate change governance; external tool changes can alter orchestration and risk.</p><p><strong>Why not the others:</strong> A: The consuming organization still needs accountable evidence of its agent actions. B: Descriptions influence selection and can change behavior after initial approval. C: Interoperability is not evidence of tool safety or appropriate authority.</p>"
        },
        {
          "n": 27,
          "prompt": "<p>Cypress Wholesale uses Dynamics 365 Finance. Collections coordinators spend time reviewing account context and drafting reminder letters. The business requires staff review before customer communication.</p><p>Which capability should be evaluated first?</p>",
          "choices": [
            "Evaluate the Finance collections coordinator summary and reminder drafting capability while retaining review and existing controls.",
            "Use Dynamics 365 Sales lead scoring as the collections reminder engine.",
            "Replace collection records with emailed generated summaries.",
            "Build a new foundation model before reviewing Finance capabilities."
          ],
          "answer": 0,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> The documented collections experience fits account summarization and reminder drafting without requiring a custom replacement.</p><p><strong>Why not the others:</strong> B: Lead scoring addresses sales qualification rather than collections communication. C: Generated summaries are not substitutes for authoritative finance records. D: This duplicates a potential prebuilt fit and adds unnecessary lifecycle ownership.</p>"
        },
        {
          "n": 28,
          "prompt": "<p>Dune Components wants an approved pilot of finance and operations agent chat to combine current Supply Chain order facts with internal operating guidance. The environment supports the planned knowledge integrations.</p><p>Which knowledge architecture should be proposed?</p>",
          "choices": [
            "Place one month-end order export into the prompt library as live operational truth.",
            "Merge all legal entities into an unrestricted index to avoid user-specific query filters.",
            "Use public product documentation as the source for current company order quantities.",
            "Use governed structured-data access for order facts and curated procedure sources for guidance, validating permissions and freshness separately."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Operational facts and procedural knowledge need appropriate sources and distinct freshness and authorization checks.</p><p><strong>Why not the others:</strong> A: A periodic export cannot satisfy current order-fact requirements. B: Removing boundaries violates authorized access to operational records. C: Public help does not contain current private transactional data.</p>"
        },
        {
          "n": 29,
          "prompt": "<p>Eider Systems is configuring Microsoft 365 Copilot for Sales for sellers who work in Outlook and Teams with Dynamics 365 Sales. A pilot user receives generic assistance but no CRM-specific context.</p><p>What should the team validate first?</p>",
          "choices": [
            "Fine-tune a new model on the user's mailbox before checking connectivity.",
            "Make all CRM records public so the assistant can discover them.",
            "Replace Dynamics 365 Sales with a SharePoint document library.",
            "Validate the supported CRM connection, account consent, required permissions, and association with the intended environment."
          ],
          "answer": 3,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "easy",
          "explanation": "<p><strong>Correct:</strong> Role-specific sales assistance depends on correctly connected and authorized CRM context, not only installation of a chat surface.</p><p><strong>Why not the others:</strong> A: Mailbox training does not establish authorized CRM integration. B: Public access is unnecessary and violates the required CRM boundary. C: Replacing the CRM is disproportionate and does not diagnose configuration.</p>"
        },
        {
          "n": 30,
          "prompt": "<p>Flint Customer Care wants Microsoft 365 Copilot for Service to support representatives using governed service knowledge and CRM context. Another team wants the same drafts inside Dynamics 365 Customer Service.</p><p>Which orchestration plan is strongest?</p>",
          "choices": [
            "Configure one surface and assume all other service experiences inherit every setting automatically.",
            "Align approved knowledge, CRM access, and response-review policies across the service experiences, and test the actual supported surfaces.",
            "Allow generated replies to update case status before checking the source or representative approval.",
            "Use sales opportunity notes as the sole knowledge source for all service responses."
          ],
          "answer": 1,
          "topic": "Design AI-powered business solutions",
          "objective": "2.3 Orchestrate prebuilt agents and apps",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Consistent service outcomes require coordinated knowledge and authorization rather than assuming every product surface behaves identically.</p><p><strong>Why not the others:</strong> A: Cross-product behavior and configuration must be verified explicitly. C: Generation does not replace validated service workflow and review. D: Opportunity notes are not a complete or authoritative service knowledge base.</p>"
        },
        {
          "n": 31,
          "prompt": "<p>Granite Commerce monitors a task agent used by small and large branches. Average response time meets target, but large branches experience long waits and expensive multi-step tool plans.</p><p>Which telemetry view should be added?</p>",
          "choices": [
            "Track only average model latency across all branches.",
            "Use monthly license spend as the sole performance indicator.",
            "Segment end-to-end tail latency, cost per successful task, tool steps, and failure rates by workload cohort.",
            "Rank branches by conversation count without measuring successful outcomes."
          ],
          "answer": 2,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.1 Analyze, monitor, tune",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Averages can hide poor experience and inefficient orchestration for particular cohorts; outcome-linked metrics reveal the trade-off.</p><p><strong>Why not the others:</strong> A: Aggregate model timing hides cohort and downstream tool effects. B: License spend does not explain per-task delays or tool behavior. D: Volume alone does not establish reliability or cost effectiveness.</p>"
        },
        {
          "n": 32,
          "prompt": "<p>Holly Emergency Housing receives complaints that its agent fails when users describe accommodation needs in a second language. Overall satisfaction remains high because most users use the primary language.</p><p>How should the tuning backlog be prioritized?</p>",
          "choices": [
            "Remove second-language access to increase the reported success rate.",
            "Ignore the complaints because the overall satisfaction target is met.",
            "Translate every prompt automatically and release without evaluation.",
            "Review affected conversations with appropriate experts, quantify cohort failure and harm, and prioritize validated fixes and retests."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.1 Analyze, monitor, tune",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Aggregate satisfaction can conceal exclusion; impact and segmented evidence should guide improvement.</p><p><strong>Why not the others:</strong> A: Removing access masks rather than resolves the inclusion problem. B: Averages do not excuse systematic failures for a user group. C: Translation may help but must be tested for meaning, safety, and task success.</p>"
        },
        {
          "n": 33,
          "prompt": "<p>Indigo Renewables releases a new reasoning configuration. Cost per completed task doubles with no improvement in accepted outcomes. Traces show repeated tool planning loops introduced by the change.</p><p>Which response is most appropriate?</p>",
          "choices": [
            "Compare against the previous configuration, constrain or roll back the regression, and retest task quality and cost before re-release.",
            "Increase the token allowance until the loops complete more often.",
            "Report cost per token only and exclude repeated tool work.",
            "Fine-tune a new model before examining the configuration difference."
          ],
          "answer": 0,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.1 Analyze, monitor, tune",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Telemetry links the regression to orchestration behavior; controlled change and outcome-based validation are justified.</p><p><strong>Why not the others:</strong> B: A larger budget can amplify the cost regression without solving unnecessary loops. C: Unit price hides inefficient execution and total task cost. D: The identified change should be isolated before a larger model intervention.</p>"
        },
        {
          "n": 34,
          "prompt": "<p>Jasper Estates uses prompts to summarize tenancy documents. Recent drafts sometimes treat quoted tenant requests as approved landlord policy. The team wants a focused regression suite.</p><p>Which tests should be added?</p>",
          "choices": [
            "Ask the same model whether its answer sounds reasonable without independent review.",
            "Accept any summary that repeats the tenant request accurately.",
            "Test only document length and whether a summary is produced.",
            "Test instruction-context separation, conflicting sources, missing policy evidence, and expected abstention or escalation using reviewed reference outcomes."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.2 Manage testing",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Prompt validation should exercise source authority and uncertainty, not merely fluent summaries of clean examples.</p><p><strong>Why not the others:</strong> A: Unreviewed self-assessment does not establish correct policy interpretation. B: Accurate quotation can still become an incorrect statement of approved policy. C: Output existence does not establish correct source interpretation.</p>"
        },
        {
          "n": 35,
          "prompt": "<p>Kingfisher Freight has a custom risk model used to recommend manual shipment inspections. False negatives are expensive; route distributions are changing, and overall accuracy remains high because most shipments are low risk.</p><p>Which validation criteria should gate the next model release?</p>",
          "choices": [
            "Approve the model if reviewers receive fewer recommendations, regardless of missed risks.",
            "Set risk-weighted precision and recall thresholds, evaluate route cohorts and drift on held-out data, and verify downstream review workload.",
            "Use overall accuracy as the only metric because it is easy to compare.",
            "Evaluate on the tuning dataset to ensure the model learned its examples."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.2 Manage testing",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Class imbalance and changing populations require error-specific and subgroup measures plus operational impact, not accuracy alone.</p><p><strong>Why not the others:</strong> A: Reducing workload can conceal unacceptable false negatives. C: Accuracy can hide costly false negatives in a minority class. D: Tuning-set results do not provide independent generalization evidence.</p>"
        },
        {
          "n": 36,
          "prompt": "<p>Lagoon Medical releases a process spanning Dynamics 365 Customer Service, Finance, a Copilot Studio agent, and a Foundry Agent Service deployment. Independent release schedules previously caused incompatible tool schemas.</p><p>Which ALM strategy should be adopted?</p>",
          "choices": [
            "Force all platforms into one unversioned package and omit compatibility testing.",
            "Coordinate versioned interface contracts and dependency compatibility, use staged integration environments, and define release and rollback ownership.",
            "Make production schema changes first and update tests afterward.",
            "Release each platform independently and rely on agents to infer changed schemas."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.3 Design ALM",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Cross-platform ALM must manage dependencies and operational ownership even when artifacts use different deployment mechanisms.</p><p><strong>Why not the others:</strong> A: A shared package does not eliminate dependency contracts or testing requirements. C: Production-first changes expose users before compatibility is validated. D: Runtime inference is not a safe compatibility strategy.</p>"
        },
        {
          "n": 37,
          "prompt": "<p>Meadow Lending versions grounding datasets and indexes for reproducibility. A privacy deletion request removes a customer record, but an older approved index snapshot still contains it and is available for rollback.</p><p>Which lifecycle design is required?</p>",
          "choices": [
            "Keep every historical index indefinitely because release reproducibility overrides deletion policy.",
            "Delete the customer from the transactional system but exclude embeddings and indexes.",
            "Propagate authorized deletions to derived stores and backups under retention policy, and prevent rollback from reintroducing prohibited data.",
            "Ask the model not to mention deleted customers while retaining unrestricted retrieval."
          ],
          "answer": 2,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.3 Design ALM",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Reproducibility must coexist with privacy and retention obligations across derived AI artifacts.</p><p><strong>Why not the others:</strong> A: Versioning does not nullify lawful deletion and retention requirements. B: Derived stores can retain protected content and must be included in the lifecycle. D: Prompt instructions do not satisfy removal and access-control obligations.</p>"
        },
        {
          "n": 38,
          "prompt": "<p>Norwood Manufacturing allows operations staff to submit examples for custom-model tuning. A submitted batch contains altered safety classifications, and the same staff identity can approve training and publish the resulting model.</p><p>Which control set best addresses the risk?</p>",
          "choices": [
            "Review only customer-facing prompts and exclude training-data permissions.",
            "Separate submission, approval, and deployment privileges; validate dataset provenance and labels; and audit model and data changes.",
            "Use a larger model and retain the same unrestricted publishing identity.",
            "Lower generation temperature after training on the submitted batch."
          ],
          "answer": 1,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.4 Responsible AI, security, governance, risk, compliance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Data poisoning and unauthorized tuning require integrity checks, separation of duties, and accountable change history.</p><p><strong>Why not the others:</strong> A: The attack path is through data and model lifecycle authority, not just runtime prompts. C: Model size does not correct a compromised change process. D: Temperature does not repair corrupted training labels.</p>"
        },
        {
          "n": 39,
          "prompt": "<p>Opal Civic Services wants an agent that recommends eligibility reviews. A pilot performs well overall but produces more unsupported adverse recommendations for users with limited digital literacy. Some cannot use the chat interface effectively.</p><p>Which responsible AI review is necessary before rollout?</p>",
          "choices": [
            "Remove demographic evaluation data before checking for performance disparities.",
            "Make recommendations binding so reviewers cannot introduce inconsistency.",
            "Publish a generic AI disclaimer and approve because overall accuracy meets target.",
            "Assess fairness by affected groups, accessibility and alternative channels, explainability, human accountability, and appeal pathways."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.4 Responsible AI, security, governance, risk, compliance",
          "difficulty": "hard",
          "explanation": "<p><strong>Correct:</strong> Responsible AI includes fairness, inclusiveness, transparency, and accountability; aggregate performance is insufficient for consequential recommendations.</p><p><strong>Why not the others:</strong> A: Without appropriate governed evaluation, disparate outcomes may remain undetected. B: Removing accountable human review and appeal increases consequential decision risk. C: A disclaimer does not mitigate unequal harm or inaccessible interaction.</p>"
        },
        {
          "n": 40,
          "prompt": "<p>Peregrine Energy wants detailed agent telemetry for incident response. Conversations can contain personal data and confidential acquisition plans, and the default proposal logs full prompts to a broadly accessible workspace.</p><p>Which monitoring governance design should be selected?</p>",
          "choices": [
            "Disable all logging so no sensitive data can ever enter monitoring.",
            "Log every prompt indefinitely because telemetry is exempt from data governance.",
            "Let the model decide which employees may read the monitoring workspace.",
            "Collect necessary diagnostic signals with redaction, restricted access, retention limits, and auditable incident access."
          ],
          "answer": 3,
          "topic": "Deploy AI-powered business solutions",
          "objective": "3.4 Responsible AI, security, governance, risk, compliance",
          "difficulty": "medium",
          "explanation": "<p><strong>Correct:</strong> Observability should support investigation without creating an uncontrolled secondary sensitive-data repository.</p><p><strong>Why not the others:</strong> A: Eliminating observability prevents accountable incident investigation; governed collection is preferable. B: Telemetry can contain the same protected information as production inputs. C: Workspace authorization requires enforceable identity and access policy, not language-model judgment.</p>"
        }
      ]
    }
  ]
};
