window.AI9_DATA = window.AI9_DATA || {};

window.AI9_DATA.exam3 = {
  id: "exam3",
  name: "AI-901 \u2014 Practice Exam 3",
  timeMinutes: 45,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A startup builds a support chatbot that must answer from a product FAQ that changes monthly and cite the exact paragraph used. Which approach should the team implement FIRST?</p>",
      choices: ["Configure an agent with an Azure AI Search tool so it retrieves grounded passages at query time", "Fine-tune a GPT-5-mini model on the full FAQ each month", "Increase temperature so the model explores more of its parametric knowledge", "Switch to an o-series reasoning model to improve factual accuracy"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Attaching Azure AI Search as an agent tool grounds responses in the current FAQ at every query and enables source citations, all without retraining. This is the RAG-first step on the prompt engineering \u2192 grounding \u2192 fine-tuning ladder.</p><p>Fine-tuning encodes facts into model weights and cannot cite sources; running it monthly is also expensive. Raising temperature increases randomness and does not supply new knowledge. O-series models excel at symbolic reasoning but cannot know content absent from their training data.</p>"
    },
    {
      n: 2,
      prompt: "<p>A government agency discovers its AI hiring tool rejects 30% more applicants from one ethnic group than another for equivalent qualifications. Which responsible AI principle is MOST directly violated?</p>",
      choices: ["Reliability and safety", "Fairness", "Transparency", "Accountability"],
      answer: 1,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Fairness requires AI systems to treat all people equitably and not produce materially different outcomes across demographic groups when input qualifications are equal. A 30% disparity by ethnicity is a classic fairness violation.</p><p>Reliability and safety concerns consistent behavior and graceful failure, not demographic disparities. Transparency concerns explainability. Accountability concerns governance and who answers for the system. None of these three addresses unequal group outcomes as directly as Fairness does.</p>"
    },
    {
      n: 3,
      prompt: "<p>A company must deploy a GPT-5 model and guarantee a minimum tokens-per-minute throughput for a production workload. Latency predictability matters more than cost. Which deployment type should they choose?</p>",
      choices: ["Global Batch", "Global Standard", "Global Provisioned", "Data Zone Standard"],
      answer: 2,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Global Provisioned (PTU) reserves dedicated capacity in Provisioned Throughput Units, giving a guaranteed minimum throughput for latency-sensitive production use when cost is secondary.</p><p>Global Batch is asynchronous with up to 24-hour latency and a ~50% discount, making it wrong for latency-sensitive work. Global Standard is pay-per-token without a throughput guarantee. Data Zone Standard restricts data to a region zone for data-residency purposes but provides no throughput guarantee.</p>"
    },
    {
      n: 4,
      prompt: "<p>A data analyst wants to group thousands of support tickets into natural theme clusters without defining categories in advance. Which type of AI workload is this?</p>",
      choices: ["Generative AI producing new textual content", "Agentic AI with multi-step tool orchestration", "Information extraction with unsupervised clustering", "Abstractive summarization"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Grouping items into natural clusters without predefined labels is an information extraction workload that discovers structure in data. The output is derived categorization, not generated content.</p><p>Generative AI produces new content such as text or images in a model call. Agentic AI orchestrates multi-step tasks using tools and persistent state. Abstractive summarization writes new sentences paraphrasing source content, which is generation, not clustering.</p>"
    },
    {
      n: 5,
      prompt: "<p>A call center needs to convert live customer calls to text in real time with streaming output and a custom vocabulary for proprietary product names. Which Azure capability is the BEST fit?</p>",
      choices: ["Azure Speech real-time speech-to-text with a custom speech model", "Whisper transcription model via Foundry Models", "A GPT-realtime multimodal audio model", "Azure Language named entity recognition"],
      answer: 0,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>Azure Speech real-time speech-to-text streams output as audio arrives and supports custom speech models that adapt the acoustic and language model to domain vocabulary, including proprietary product names. It is purpose-built for deterministic, streaming, custom-vocabulary transcription.</p><p>Whisper is a batch transcription model and does not stream. A GPT-realtime model provides conversational reasoning but is not optimized for deterministic custom-vocabulary transcription. Azure Language NER analyzes text that has already been transcribed; it does not convert audio to text.</p>"
    },
    {
      n: 6,
      prompt: "<p>A developer passes an image of a factory floor into a GPT-5 Responses call and asks the model to identify equipment defects. Which Azure capability is being used?</p>",
      choices: ["Azure Vision Image Analysis 4.0", "Interpreting visual input with a deployed multimodal model", "Content Understanding prebuilt-image analyzer", "Azure AI Custom Vision"],
      answer: 1,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>Passing an image into a chat or Responses call and asking a language model to analyze it is exactly what \"interpret visual input by using a deployed multimodal model\" means. GPT-5, GPT-4o, and o-series models all accept image input in their prompts.</p><p>Image Analysis 4.0 is a separate REST API that is also deprecated. Custom Vision trains classifiers on labeled datasets and is retiring September 25, 2028. The Content Understanding prebuilt-image analyzer processes batches of images through a schema-driven pipeline, not a conversational Responses call.</p>"
    },
    {
      n: 7,
      prompt: "<p>A team must extract structured fields from scanned invoices on an air-gapped government network with no internet access. Which service supports this deployment model?</p>",
      choices: ["Content Understanding with the prebuilt-document analyzer", "Azure Document Intelligence containers", "Azure Language key phrase extraction", "Foundry Agent Service with the file search tool"],
      answer: 2,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>Azure Document Intelligence supports containers that run entirely on-premises or in isolated networks with no internet dependency, making it the only valid choice for air-gapped environments.</p><p>Content Understanding has no container option; it is cloud-only. Azure Language key phrase extraction does not extract structured form fields from invoices. The Foundry Agent Service and its file search tool require connectivity to a Foundry cloud endpoint.</p>"
    },
    {
      n: 8,
      prompt: "<p>After a flawed AI system caused financial harm, a company's board wants to know who is responsible for the system's design decisions and how they will be held answerable going forward. Which responsible AI principle addresses this MOST directly?</p>",
      choices: ["Transparency", "Reliability and safety", "Fairness", "Accountability"],
      answer: 3,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Accountability requires that people and organizations accept responsibility for AI systems they build and deploy, and that governance mechanisms exist so those responsible can be identified and held answerable when harm occurs.</p><p>Transparency is about making the system's behavior understandable to users, not about assigning ownership. Reliability and safety concerns consistent, harm-free operation. Fairness concerns equitable treatment across groups. None of these directly addresses \"who is responsible and how will they be held answerable\" the way Accountability does.</p>"
    },
    {
      n: 9,
      prompt: "<p>A developer creates a prompt agent then calls <code>openai.responses.create(input=\"What is the return policy?\")</code> twice without storing or reusing a conversation object. What is the MOST likely problem?</p>",
      choices: ["Each call starts a new context window so the second turn has no memory of the first", "The model refuses the second call because the agent is already in use", "responses.create requires a system message on every call", "get_openai_client does not accept an agent_name parameter"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>Multi-turn context in the Foundry SDK is maintained by passing the same <code>conversation.id</code> to successive <code>responses.create</code> calls. Without a shared conversation parameter each call starts a fresh context window, so the second turn cannot reference anything from the first.</p><p>Agents do not lock to one request at a time. A system message is part of the agent definition, not required on each individual call. <code>get_openai_client</code> does accept an <code>agent_name</code> parameter; that is the documented pattern for targeting a prompt agent.</p>"
    },
    {
      n: 10,
      prompt: "<p>A team must deploy a model for complex multi-step legal analysis requiring symbolic reasoning and detailed planning. Cost is secondary. Which model family should they choose?</p>",
      choices: ["GPT-5-nano for the lowest latency", "o-series (o3 or o4-mini) for deep reasoning", "Phi for edge or low-cost deployment", "An embedding model for similarity search"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>The o-series models (o3, o4-mini) are designed for deep reasoning: math, multi-step logic, and complex analysis. When cost is secondary and the task requires chain-of-thought planning, an o-series model is the correct choice.</p><p>GPT-5-nano is cost- and latency-optimized, not a deep-reasoning model. Phi models are small language models for edge or low-cost scenarios. Embedding models produce vectors for similarity search and cannot generate analytical prose.</p>"
    },
    {
      n: 11,
      prompt: "<p>A developer needs the Azure Language service to detect and redact personal names and email addresses from customer feedback text before storing it. Which Language feature should they use?</p>",
      choices: ["Key phrase extraction", "Sentiment analysis", "PII detection", "Entity linking"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>PII detection in Azure Language identifies and can redact personal information categories such as names, email addresses, phone numbers, and social security numbers. It is a Core-tier, actively evolving feature purpose-built for this scenario.</p><p>Key phrase extraction identifies important topics but does not detect personal data categories. Sentiment analysis returns a positive/negative/neutral score. Entity linking connects recognized entities to a knowledge base but does not identify or redact PII categories.</p>"
    },
    {
      n: 12,
      prompt: "<p>A team wants to generate a voice for a brand that sounds identical to a specific voice actor, with the actor's written consent. Which Azure Speech capability requires a Limited Access application before it can be provisioned?</p>",
      choices: ["Speech translation", "Fast transcription", "Pronunciation assessment", "Custom neural voice"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Custom neural voice is gated by Limited Access because it can replicate a person's voice from recordings. Microsoft requires applicants to demonstrate that they have the voice talent's written consent and a legitimate use case before granting access.</p><p>Speech translation converts spoken audio to a different language and has no access gate. Fast transcription is a high-speed batch transcription mode available to all customers. Pronunciation assessment scores a speaker's accuracy against a reference and is open to all.</p>"
    },
    {
      n: 13,
      prompt: "<p>An AI loan-pricing model offers higher interest rates to applicants from rural ZIP codes, which correlates with a protected class. The team must choose the MOST relevant responsible AI remediation principle. Which is it?</p>",
      choices: ["Accountability", "Transparency", "Fairness", "Inclusiveness"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "hard",
      explanation: "<p>Fairness requires that AI systems produce equitable outcomes across demographic groups and do not encode proxies that disadvantage protected classes. Systematic pricing disparities tied to geographic proxies for ethnicity are a Fairness problem requiring bias detection and correction.</p><p>Accountability concerns governance and who is answerable for the system, not the mechanism of differential treatment. Transparency concerns explainability. Inclusiveness concerns whether all users can access the system. None of these three directly addresses the bias-in-outcome problem the way Fairness does.</p>"
    },
    {
      n: 14,
      prompt: "<p>A developer configures a Content Understanding analyzer with a field named <code>contract_type</code> whose valid values are NDA, MSA, or SOW. Which extraction method should be specified for that field?</p>",
      choices: ["Extract", "Generate", "Classify", "Summarize"],
      answer: 1,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>Classify assigns one of a predefined, enumerated set of categories to a field. When valid values are explicitly listed (NDA, MSA, SOW), Classify is the correct extraction method because it constrains the output to those options.</p><p>Extract copies a value that literally appears in the document, best for exact spans like dates or party names. Generate uses the model to synthesize a value not necessarily present verbatim. Summarize is not one of the three named Content Understanding extraction methods; the three are Extract, Classify, and Generate.</p>"
    },
    {
      n: 15,
      prompt: "<p>An orchestrator agent must delegate a specialized tax question to a dedicated tax-advisor agent and return the consolidated answer to the user. Which Foundry Agent Service tool enables this multi-agent pattern?</p>",
      choices: ["Function calling tool", "Azure AI Search tool", "Agent-to-agent (A2A) tool", "Code interpreter tool"],
      answer: 2,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>The agent-to-agent (A2A) tool lets an orchestrator agent route requests to specialist subagents. Foundry manages routing, identity passing, and observability for this multi-agent pattern natively.</p><p>Function calling invokes a developer-defined external function, not another Foundry agent. Azure AI Search retrieves grounded passages from a search index. Code interpreter runs sandboxed Python. None of these three routes a request to a separate named Foundry agent.</p>"
    },
    {
      n: 16,
      prompt: "<p>A company wants to add face liveness detection to its mobile banking app to verify the user is physically present. Which Azure service provides liveness detection, and what access requirement applies?</p>",
      choices: ["Azure Vision Image Analysis 4.0; no special access is required", "Azure AI Custom Vision; requires a paid tier subscription", "Content Understanding prebuilt-image analyzer; no special access is required", "Azure Face; requires Limited Access approval from Microsoft"],
      answer: 3,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Liveness detection is a feature of Azure Face that determines whether a face capture is from a live person or a spoofed artifact. Azure Face is an active but gated service: any use of face identification, verification, or liveness requires a Limited Access application for responsible AI reasons.</p><p>Image Analysis 4.0 is deprecated and does not include liveness detection. Custom Vision is an image-classification service, not a face-liveness service. Content Understanding uses vision analyzers for field extraction, not biometric liveness checks.</p>"
    },
    {
      n: 17,
      prompt: "<p>A developer must choose between <code>temperature=0</code> and <code>temperature=1.2</code> for extracting structured JSON from invoices where each invoice should always return identical fields. Which setting is correct and why?</p>",
      choices: ["temperature=0, because low temperature makes output focused and repeatable", "temperature=1.2, because higher temperature forces more creative JSON structures", "temperature=0, because it raises the accuracy of the underlying model weights", "temperature=1.2, because it increases the model context window"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Low temperature (near 0) reduces sampling randomness and makes the model's output focused and repeatable. For deterministic structured extraction from the same document, temperature=0 ensures consistent results. Temperature controls output diversity, not model accuracy.</p><p>High temperature increases randomness, which is undesirable for structured extraction that must be consistent. Temperature does not alter the model's underlying learned weights. Temperature has no effect on the context window, which is a model architecture parameter.</p>"
    },
    {
      n: 18,
      prompt: "<p>A product team plans to surface feature importance scores so users can see why the AI recommendation engine ranked item A above item B. Which responsible AI principle does this BEST exemplify?</p>",
      choices: ["Accountability", "Transparency", "Fairness", "Inclusiveness"],
      answer: 1,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Transparency is the principle that people should be able to understand how and why an AI system produces its outputs. Surfacing feature importance scores so users see the basis for a ranking is a transparency practice.</p><p>Accountability is about governance and who is answerable for the system. Fairness is about equitable treatment across demographic groups. Inclusiveness is about ensuring all users can access and benefit from the system. None of these three directly addresses making model reasoning visible to end users the way Transparency does.</p>"
    },
    {
      n: 19,
      prompt: "<p>The following snippet creates a prompt agent and runs a two-turn conversation. What is the MOST critical problem?</p><pre>agent = project.agents.create_version(\n    agent_name=\"Advisor\",\n    definition=PromptAgentDefinition(model=\"gpt-5-mini\",\n                                     instructions=\"Be helpful\"))\nopenai = project.get_openai_client(agent_name=\"Advisor\")\nr1 = openai.responses.create(input=\"What is RAG?\")\nr2 = openai.responses.create(input=\"Give me an example\")</pre>",
      choices: ["PromptAgentDefinition requires a tools list even when no tools are used", "Neither call passes a conversation ID so the second turn has no context from the first", "The model name gpt-5-mini is invalid; the parameter must be a deployment resource name", "get_openai_client does not accept an agent_name parameter"],
      answer: 2,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>Neither <code>responses.create</code> call passes a <code>conversation=conversation.id</code> argument. Without a shared conversation ID, each call starts a fresh context window, so the second turn cannot reference anything from the first. The correct pattern is to call <code>openai.conversations.create()</code> first and then pass its ID to both calls.</p><p>PromptAgentDefinition does not require a tools list; it is optional. In the Foundry SDK the <code>model=</code> field should match a deployment name, but omitting the conversation is the most critical functional error. <code>get_openai_client</code> does accept <code>agent_name</code>; that is the documented pattern.</p>"
    },
    {
      n: 20,
      prompt: "<p>A solution architect needs to classify incoming support emails as billing, technical, or general with low latency and predictable per-call cost. Which approach is BEST?</p>",
      choices: ["Deploy a GPT-5 model and classify each email via a generative prompt", "Use Azure Language custom text classification", "Use Content Understanding with a Classify field schema", "Use Azure Language entity linking"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Azure Language custom text classification trains a classifier on your labeled categories and returns deterministic typed output at low latency with predictable per-call cost. It is the purpose-built choice when categories are predefined and consistency matters.</p><p>A GPT-5 generative prompt can classify text but adds reasoning overhead, higher latency, and variable token cost for a straightforward classification task. Content Understanding Classify is optimized for field extraction within documents, not document-level email routing. Entity linking connects entities to a knowledge base; it does not classify documents into custom categories.</p>"
    },
    {
      n: 21,
      prompt: "<p>A developer wants a summary of a customer review that preserves only the most important original sentences without rewriting them. Which summarization technique should they use?</p>",
      choices: ["Extractive summarization", "Abstractive summarization", "Generative summarization via GPT-5", "Key phrase extraction"],
      answer: 0,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Extractive summarization selects and returns existing sentences verbatim from the source text. When the requirement is to preserve original wording rather than write new sentences, extractive is the correct approach.</p><p>Abstractive summarization writes new sentences paraphrasing the content; the output is not verbatim. Generative summarization via GPT-5 also writes new text. Key phrase extraction identifies important noun phrases but does not produce a sentence-level summary.</p>"
    },
    {
      n: 22,
      prompt: "<p>After Content Understanding analyzes a batch of scanned contracts, the response JSON for each field includes a decimal number between 0 and 1. What does this number represent?</p>",
      choices: ["The percentage of the document that was processed", "The confidence score for that field's extraction", "The number of tokens consumed by the call", "The severity score from Content Safety"],
      answer: 1,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Content Understanding returns optional confidence scores (0\u20131) for each extracted field, indicating the model's certainty that the extracted value is correct. A score near 1.0 means high confidence; a score near 0 means low confidence. These scores help downstream logic route records for human review.</p><p>The percentage of a document processed is not returned as a per-field decimal. Token consumption is not reported per field in the extraction response. Content Safety severity is a separate, categorized score unrelated to field extraction confidence.</p>"
    },
    {
      n: 23,
      prompt: "<p>A healthcare triage assistant routes users to a human nurse whenever the model fails or returns an unexpected output. Which responsible AI principle MOST directly motivates this design?</p>",
      choices: ["Fairness", "Inclusiveness", "Reliability and safety", "Transparency"],
      answer: 2,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Reliability and safety requires that AI systems behave consistently and fail gracefully. Designing a safe fallback \u2014 routing to a human nurse on unexpected model output \u2014 is a canonical reliability-and-safety practice that limits harm in unexpected conditions.</p><p>Fairness addresses differential outcomes across demographic groups. Inclusiveness ensures all users can access the system. Transparency concerns explainability. None of these three directly motivates the \"fail safely by routing to a human\" design pattern the way Reliability and safety does.</p>"
    },
    {
      n: 24,
      prompt: "<p>An agent needs to run sandboxed Python code to compute statistics on a data file uploaded by the user. Which Foundry Agent Service tool should be attached?</p>",
      choices: ["Function calling", "Grounding with Bing", "Azure AI Search", "Code interpreter"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Code interpreter provides the agent with a sandboxed Python execution environment. The agent can write and execute Python, process uploaded files, and return computed results. It is the correct tool for any scenario involving dynamic computation on user-supplied data.</p><p>Function calling invokes a developer-defined external function but does not provide a code execution sandbox. Grounding with Bing retrieves public web search results. Azure AI Search queries a private search index. None of these three can execute arbitrary Python code on an uploaded file.</p>"
    },
    {
      n: 25,
      prompt: "<p>An enterprise must deploy a language model such that all inference traffic and data remain within the European Union for GDPR compliance. Which deployment type should they select?</p>",
      choices: ["Global Standard", "Global Provisioned", "Global Batch", "Data Zone Standard for the EU data zone"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Data Zone Standard processes data within a named data zone (US, EU, or APAC). Selecting the EU data zone ensures all inference traffic stays within the European Union, satisfying GDPR data-residency requirements.</p><p>Global Standard routes traffic to any Azure region worldwide with no residency boundary. Global Provisioned also processes data in any region; it addresses throughput, not residency. Global Batch is asynchronous with no data-residency constraint. Only Data Zone deployments address the EU-only requirement.</p>"
    },
    {
      n: 26,
      prompt: "<p>A developer needs to generate a photorealistic image from a text prompt inside a Foundry project. Which model family should they use?</p>",
      choices: ["Whisper, which is a multimodal generation model", "The gpt-image-1 family", "Azure Vision Image Analysis 4.0", "Azure AI Custom Vision"],
      answer: 1,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>The gpt-image-1 family (gpt-image-1, gpt-image-1-mini, gpt-image-1.5) is the current image-generation model in Foundry Models. It produces high-quality images from text prompts and is the answer whenever image generation is required. FLUX models from Black Forest Labs are an alternative in the catalog.</p><p>Whisper is an audio transcription model; it does not generate images. Image Analysis 4.0 is a vision-understanding API that is deprecated; it does not generate images. Custom Vision is a classifier training service that does not generate images.</p>"
    },
    {
      n: 27,
      prompt: "<p>Which statement BEST distinguishes a generative AI workload from an agentic AI workload?</p>",
      choices: ["Generative AI always requires fine-tuning; agentic AI uses only prompt engineering", "Generative AI produces new content in one model call; agentic AI orchestrates multi-step tasks with tools and persistent state", "Agentic AI runs only on o-series reasoning models; generative AI runs on GPT-5 models", "Generative AI cannot use grounding; agentic AI requires a RAG pipeline"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Generative AI describes workloads that produce new content \u2014 text, images, audio \u2014 typically in a single model call. Agentic AI orchestrates multiple steps, invokes tools, and maintains persistent conversation state to accomplish a goal that cannot be completed in one round trip.</p><p>Neither workload type requires fine-tuning as a prerequisite. Agentic AI can run on any capable model, not only o-series. Both workload types can use grounding; RAG is not exclusive to agents.</p>"
    },
    {
      n: 28,
      prompt: "<p>A developer wants Azure Speech text-to-speech output to pause 500 milliseconds between two sentences, then increase pitch for a third sentence. Which Speech feature enables this runtime control?</p>",
      choices: ["Custom neural voice training", "Pronunciation assessment", "Speaker recognition", "SSML (Speech Synthesis Markup Language)"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>SSML is the XML-based markup that controls Azure Speech text-to-speech rendering. It supports pause duration (<code>&lt;break time=\"500ms\"/&gt;</code>), pitch, rate, volume, and emphasis within a single synthesis request, giving precise runtime control over output prosody.</p><p>Custom neural voice creates a voice from recordings but does not provide runtime synthesis control. Pronunciation assessment evaluates a speaker's spoken accuracy; it is an input analysis feature. Speaker recognition identifies who is speaking from audio; it is not a text-to-speech control feature.</p>"
    },
    {
      n: 29,
      prompt: "<p>A solution must extract structured fields from both scanned invoices and audio recordings of supplier calls using a single consistent schema. Which service supports multi-modal field extraction across documents and audio?</p>",
      choices: ["Content Understanding with modality-specific base analyzers", "Azure Document Intelligence with a custom neural model", "Azure Language with named entity recognition", "Azure Speech with fast transcription"],
      answer: 0,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>Content Understanding supports four modalities \u2014 documents, images, audio, and video \u2014 each with a base analyzer (prebuilt-document, prebuilt-image, prebuilt-audio, prebuilt-video). A developer can define a field schema and apply it across analyzers for different modalities, enabling a unified extraction pipeline for invoices and call recordings.</p><p>Document Intelligence handles documents only; it cannot process audio recordings. Azure Language NER extracts named entities from text, not natively from audio, and does not accept a user-defined schema. Azure Speech fast transcription converts audio to text but does not extract structured fields from the result.</p>"
    },
    {
      n: 30,
      prompt: "<p>A team deploys a prompt agent in the Foundry portal and later needs to update the agent's system instructions without redeploying any application code. How should they do this?</p>",
      choices: ["Edit the agent definition in the Foundry portal or call agents.create_version with new instructions; the update is live immediately", "Redeploy the application container to pick up new environment variables", "Edit the system message in the model's deployment configuration in the Azure portal", "Submit a support ticket to Microsoft to update the agent instructions"],
      answer: 1,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>A prompt agent's instructions are part of the agent definition stored in the Foundry Agent Service. Updating them via the portal editor or by calling <code>agents.create_version</code> with new instructions immediately affects the agent without any application code change or container redeployment.</p><p>Container redeployment is required for hosted agents where orchestration code is packaged, not for prompt agents. Model deployment configuration does not store per-agent instructions. A support ticket is not required; the developer has full control over the agent definition through the Foundry portal and SDK.</p>"
    },
    {
      n: 31,
      prompt: "<p>A company runs 50 million token inference requests per day and wants to reduce per-token cost by approximately 50% by accepting that results may take up to 24 hours. Which deployment type achieves this?</p>",
      choices: ["Global Standard with pay-per-token billing", "Standard (regional) deployment", "Global Batch deployment", "Developer deployment"],
      answer: 2,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Global Batch processes large asynchronous jobs at approximately a 50% discount versus pay-per-token, with a maximum turnaround of 24 hours. It is designed exactly for high-volume, latency-tolerant workloads.</p><p>Global Standard charges full pay-per-token rates with no volume discount. Standard (regional) is also pay-per-token without a batch discount. Developer deployment is a short-lived (24-hour) evaluation tier with no SLA and is not suitable for production 50M-token workloads.</p>"
    },
    {
      n: 32,
      prompt: "<p>A public-sector chatbot must refuse instructions hidden inside documents it is asked to summarize, where an attacker has embedded text telling the model to ignore its rules. Which Azure AI Content Safety capability MOST directly addresses this?</p>",
      choices: ["Severity threshold tuning on the four harm categories", "Groundedness detection", "Protected material detection", "Prompt shields"],
      answer: 3,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "hard",
      explanation: "<p>Prompt shields defend against jailbreak attempts and indirect prompt injection, which is exactly this scenario: malicious instructions smuggled inside content the model reads rather than typed by the user. That indirect path is what distinguishes prompt shields from an ordinary content filter.</p><p>Severity thresholds control how aggressively hate, sexual, violence, and self-harm content is blocked, which does not address hidden instructions. Groundedness detection checks whether an answer is supported by supplied source material rather than whether the source is hostile. Protected material detection flags copyrighted or trademarked content in output.</p>"
    },
    {
      n: 33,
      prompt: "<p>A developer starts a new e-commerce project today and wants to use Azure Vision to identify objects in product images. Which guidance applies?</p>",
      choices: ["Use Image Analysis 4.0, the current recommended API for object detection", "Use Custom Vision, which is fully supported and actively evolving", "Use a multimodal model or Content Understanding; Image Analysis 4.0 and Custom Vision are both retiring", "Use Image Analysis 4.0 because it replaces Content Understanding for image tasks"],
      answer: 0,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>For new projects that need image object identification without labeled training data, the recommended approach is a multimodal model (GPT-5, GPT-4o) or Content Understanding's prebuilt-image analyzer. Azure Vision Image Analysis 4.0 is deprecated (retires September 25, 2028) and Azure AI Custom Vision is also retiring on that date. Neither is the recommended choice for new work.</p><p>Image Analysis 4.0 is explicitly deprecated, not the current recommended API. Custom Vision is retiring and not actively evolving. Image Analysis 4.0 does not replace Content Understanding; newer approaches supersede it. The guidance is to use multimodal models or Content Understanding for new vision projects.</p>"
    },
    {
      n: 34,
      prompt: "<p>A team needs to identify all speakers in a recorded multi-party meeting and label each speech segment with the speaker's ID. Which Azure Speech feature should they use?</p>",
      choices: ["Custom neural voice", "Speaker recognition with diarization", "Pronunciation assessment", "Voice Live for conversational response"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Speaker recognition identifies and differentiates speakers in audio. Combined with transcription and diarization, it labels each speech segment with a speaker ID, which is the correct feature for multi-party meeting attribution.</p><p>Custom neural voice creates a synthetic voice from recordings; it is a text-to-speech feature, not speaker identification. Pronunciation assessment scores a speaker's accuracy against a reference; it does not identify speaker identities. Voice Live is a low-latency conversational voice feature for real-time agents, not post-hoc meeting attribution.</p>"
    },
    {
      n: 35,
      prompt: "<p>A compliance team requires that every sentence in a generated summary be directly traceable to a verbatim sentence in the original document. Which summarization technique is correct?</p>",
      choices: ["Abstractive, because it generates more readable output", "Extractive, because it selects only verbatim sentences from the source", "Either; both Azure Language summarization modes are equivalent in traceability", "Abstractive, because a generative model can attach inline citations"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Extractive summarization selects existing sentences verbatim from the source text. Every sentence in the summary is literally present in the original, which directly satisfies a traceability or attribution compliance requirement.</p><p>Abstractive summarization writes new paraphrased sentences that are not traceable to specific original sentences. The two modes are not equivalent in traceability. Abstractive summaries generated by a language model do not automatically include citations; producing citations requires additional grounding infrastructure.</p>"
    },
    {
      n: 36,
      prompt: "<p>The following code creates a prompt agent but the responses call fails with an authentication error. What is the MOST likely cause?</p><pre>project = AIProjectClient(\n    endpoint=\"https://myresource.services.ai.azure.com/api/projects/myproject\",\n    credential=DefaultAzureCredential())\nopenai = project.get_openai_client(agent_name=\"PolicyBot\")\nr = openai.responses.create(model=\"gpt-5-mini\", input=\"What is policy 12?\")</pre>",
      choices: ["The endpoint uses the wrong URL pattern; it should end with /openai/v1/", "DefaultAzureCredential is not supported; an API key must be used instead", "The model parameter must be gpt-5 not gpt-5-mini", "The caller's Entra identity lacks the Foundry User role on the Foundry project"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The Foundry SDK uses keyless Entra authentication via <code>DefaultAzureCredential</code>. An authentication error typically means the signed-in identity lacks the Foundry User role on the Foundry project. Without that RBAC assignment the call is rejected with a 401 or 403.</p><p>The endpoint URL pattern shown is correct for a Foundry project. <code>DefaultAzureCredential</code> is the recommended credential; an API key is not required. Both gpt-5 and gpt-5-mini are valid model families; the mini variant is not invalid.</p>"
    },
    {
      n: 37,
      prompt: "<p>A developer configures a Content Understanding analyzer to extract the key finding from each paragraph of a pathology report. The finding must be inferred from surrounding clinical text, not copied verbatim. Which extraction method should they specify?</p>",
      choices: ["Extract", "Classify", "Generate", "Summarize"],
      answer: 0,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Generate instructs Content Understanding to produce a new value derived from the content using generative AI. When a finding must be synthesized from surrounding context rather than copied directly, Generate is the correct method.</p><p>Extract copies a value that literally appears in the document and cannot produce an inferred conclusion. Classify assigns one of a predefined set of categories and does not synthesize free-text findings. Summarize is not one of the three named Content Understanding extraction methods; the three are Extract, Classify, and Generate.</p>"
    },
    {
      n: 38,
      prompt: "<p>A developer wants to route model calls to the cheapest variant for simple queries and a more capable variant for complex ones. Which two factors MOST directly control the cost-versus-capability tradeoff at the model selection level?</p>",
      choices: ["Model family variant (e.g., gpt-5-nano vs. gpt-5) and deployment type (e.g., Global Standard vs. Global Batch)", "temperature and frequency_penalty settings", "max_tokens limit and presence_penalty", "stop sequences and top_p nucleus sampling"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Model family variant captures capability: gpt-5-nano and gpt-5-mini are cheaper and faster but less capable than gpt-5. Deployment type captures billing model: Global Batch costs ~50% less than Global Standard for the same model when latency is acceptable. Together these are the primary cost-versus-capability levers at model selection time.</p><p>Temperature and frequency_penalty are inference parameters that affect output style and randomness; they do not change per-token pricing or model capability tier. Max_tokens and presence_penalty shape output length and topic diversity, not cost or capability. Stop sequences and top_p are output-shaping parameters with no cost impact.</p>"
    },
    {
      n: 39,
      prompt: "<p>When should a developer choose a purpose-built Azure Language feature over a generative model for text analysis?</p>",
      choices: ["When the task requires reasoning across multiple documents simultaneously", "When consistent typed output, low latency, and predictable cost are required", "When the source text is in a language the Language service does not support", "When the task involves producing a creative written response"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Purpose-built Azure Language features return consistently typed structured output, operate at low latency, and have predictable per-call cost. These characteristics make them the right choice when consistency, latency, and cost predictability are requirements.</p><p>Multi-document reasoning is a strength of large generative models, not purpose-built features. If a language is unsupported, neither service can help. Creative text generation is explicitly a generative AI task. The question asks for the correct fit for Language features specifically.</p>"
    },
    {
      n: 40,
      prompt: "<p>A team is starting a new project and wants to use Azure AI Custom Vision to train an image classifier. What should they be aware of?</p>",
      choices: ["Custom Vision is a Core-tier Foundry Tools service actively receiving new investment", "Custom Vision was replaced by Image Analysis 4.0, the recommended alternative", "Custom Vision is scheduled to retire September 25, 2028; new projects should consider multimodal models or Content Understanding", "Custom Vision requires a Limited Access application for any image classification use case"],
      answer: 3,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Azure AI Custom Vision is scheduled to retire on September 25, 2028. Microsoft recommends that teams building new projects use multimodal models or Content Understanding rather than investing in Custom Vision at this stage.</p><p>Custom Vision is not a Core-tier service receiving new investment; it is in maintenance mode with a retirement date. Image Analysis 4.0 is itself deprecated and retiring on the same date; it is not the recommended replacement. Custom Vision does not require a Limited Access application; only Azure Face has that gating requirement.</p>"
    },
    {
      n: 41,
      prompt: "<p>An enterprise wants a single agent to answer HR questions, book conference rooms, and query the financial system, with each capability owned by a different team. Which architecture BEST supports this?</p>",
      choices: ["Three separate hosted agents orchestrated by a prompt agent using the A2A tool", "One large prompt agent with all three instruction sets combined in the system message", "One chat completion call with all context passed in a single large prompt", "Three isolated Foundry projects with no inter-agent communication"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The multi-agent pattern using agent-to-agent (A2A) lets an orchestrator prompt agent route requests to specialist subagents, each owned and maintained by a separate team. This separates concerns, allows independent deployment, and leverages Foundry's built-in routing, identity, and observability.</p><p>Combining all instructions in one prompt agent creates a monolithic agent that a single team must maintain; it does not scale to multi-team ownership. A single large chat completion has no persistent state or tool invocation capability. Three isolated projects with no inter-agent communication cannot collaborate to serve a unified user experience.</p>"
    },
    {
      n: 42,
      prompt: "<p>A developer uses Azure Speech batch transcription to process thousands of hour-long recordings overnight but finds some results have not yet appeared by morning. Which Speech capability provides faster guaranteed throughput for pre-recorded audio files?</p>",
      choices: ["Real-time speech-to-text with streaming", "Fast transcription API", "Custom neural voice", "Whisper via Foundry Models"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Fast transcription is a dedicated Azure Speech mode that transcribes pre-recorded audio significantly faster than real-time. It is designed for scenarios where standard batch transcription is too slow and files need to be processed quickly with accelerated throughput.</p><p>Real-time streaming transcription is designed for live audio with a persistent connection; it is not optimized for bulk pre-recorded files. Custom neural voice is a text-to-speech feature; it does not transcribe audio. Whisper via Foundry Models is a batch transcription model that does not guarantee the same faster-than-real-time throughput as fast transcription.</p>"
    },
    {
      n: 43,
      prompt: "<p>A developer is building a pipeline to process thousands of customer emails and needs to detect the language of each email before routing it to a regional service. Which Azure Language feature should they use?</p>",
      choices: ["Sentiment analysis", "Key phrase extraction", "Language detection", "Entity linking"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Language detection is a named Azure Language feature that identifies the language of input text and returns a BCP-47 language code with a confidence score. It is the purpose-built choice for a routing pipeline that needs to determine which language an email is written in.</p><p>Sentiment analysis returns a positive/negative/neutral score and does not identify language. Key phrase extraction identifies important topics but does not return a language code. Entity linking connects entities to a knowledge base; it does not perform language identification.</p>"
    },
    {
      n: 44,
      prompt: "<p>A developer deploys a hosted agent (custom orchestration code) in the Foundry Agent Service. What infrastructure does Foundry provide for a hosted agent that it does NOT automatically provide for a plain Azure Container Apps deployment?</p>",
      choices: ["The ability to run Python code", "A storage account for uploaded files", "A model deployment with a dedicated PTU allocation", "A managed inference endpoint, autoscaling, and a Foundry-managed Entra identity for the agent"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>When you deploy a hosted agent in the Foundry Agent Service, Foundry provides a managed inference endpoint, automatic scaling, and an Entra managed identity assigned to the agent so it can securely call other Azure services. These capabilities are built into the Agent Service and are not automatically provided by a generic container deployment.</p><p>The ability to run Python code is available in any container runtime. A storage account is a separate Azure resource that must be provisioned explicitly. A PTU model deployment is a separate deployment type unrelated to whether the agent is hosted or containerized.</p>"
    },
    {
      n: 45,
      prompt: "<p>A developer must decide whether to tune <code>top_p</code> or <code>temperature</code> for a code-generation task where reproducibility is critical. Which guidance from the inference parameter documentation applies?</p>",
      choices: ["Choose one or the other but not both; tuning both simultaneously produces unpredictable output distributions", "Set both low simultaneously for maximum control", "top_p and temperature are equivalent; either can be used interchangeably", "Only top_p is valid for code generation; temperature is silently ignored"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p><code>top_p</code> (nucleus sampling) and <code>temperature</code> are two distinct sampling strategies. Microsoft's inference documentation explicitly states to tune one or the other but not both simultaneously, because they interact in ways that produce unpredictable output distributions.</p><p>Setting both low at once is the error the guidance warns against. They are not equivalent parameters; they control different aspects of the probability distribution over tokens. There is no model category for which temperature is silently ignored.</p>"
    },
    {
      n: 46,
      prompt: "<p>A developer must choose between Azure Speech and a GPT-realtime multimodal audio model for an application that must transcribe a live customer call, apply a custom acoustic model trained on phone-audio noise, and output an exact word-level transcript with no generative elaboration. Which service is BEST and why?</p>",
      choices: ["GPT-realtime, because it can reason over the audio content as it speaks", "GPT-realtime, because it supports custom acoustic model training", "Azure Speech, because multimodal audio models cannot process audio input at all", "Azure Speech, because it handles real-time streaming and supports custom speech models"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>Azure Speech real-time speech-to-text streams output, supports custom speech model training on domain-specific audio (including phone-quality noise), and produces deterministic word-level transcripts. This combination \u2014 streaming, custom acoustic models, exact transcription \u2014 is the domain Azure Speech was designed for.</p><p>GPT-realtime is a multimodal model that provides conversational reasoning alongside speech; it is not designed for pure deterministic transcription and does not support custom acoustic model training. Multimodal audio models can absolutely process audio input; the last choice is factually wrong and is a distractor.</p>"
    },
    {
      n: 47,
      prompt: "<p>A developer needs to add a tool to a prompt agent so it can search the public web for current news when answering user questions. Which Foundry Agent Service tool should they attach?</p>",
      choices: ["Azure AI Search configured with an internal index", "File search tool with a news document library", "Grounding with Bing tool", "Code interpreter tool"],
      answer: 2,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Grounding with Bing is the Foundry Agent Service tool that enables an agent to search the public web via Bing Search, grounding responses in current web content. It is the correct tool when public internet search is required.</p><p>Azure AI Search queries a private index, not the public web. File search performs vector search over files uploaded to the agent; it cannot search the web. Code interpreter provides sandboxed Python execution; it does not perform web search.</p>"
    },
    {
      n: 48,
      prompt: "<p>A security team discovers that users are pasting documents containing hidden adversarial instructions into a chatbot, attempting to override the system prompt. Which Azure AI Content Safety feature detects this attack?</p>",
      choices: ["Groundedness detection", "Severity threshold adjustment for the Violence category", "Protected material detection", "Prompt shields \u2014 indirect prompt injection detection"],
      answer: 3,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>Prompt shields in Azure AI Content Safety include indirect prompt injection detection, which catches adversarial instructions embedded in documents or data that users paste into the chat. This is distinct from a direct jailbreak attempt in the user's own message text.</p><p>Groundedness detection checks whether a model's response is supported by provided context; it does not detect embedded instructions. Severity threshold adjustment modulates how aggressively content is blocked for harm categories like Violence; it does not detect injections. Protected material detection checks for copyrighted text in model outputs, not adversarial instructions in inputs.</p>"
    },
    {
      n: 49,
      prompt: "<p>An AI job-screening system has been live for six months. The compliance team reviews its safety and fairness metrics in production and decides whether new mitigations are needed. Which stage of the responsible AI process does this activity represent?</p>",
      choices: ["Operate", "Mitigate", "Measure", "Identify"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Operate is the fourth and ongoing stage of the identify \u2192 measure \u2192 mitigate \u2192 operate process. It involves monitoring the system in production, reviewing safety metrics over time, and deciding whether new mitigations are needed as real-world conditions change. An ongoing production compliance review is the Operate stage.</p><p>Mitigate is the earlier stage where specific safeguards are applied before or during deployment. Measure is where harms are evaluated for frequency and severity in controlled conditions. Identify is the initial stage where potential harm scenarios are cataloged. None of these three describes ongoing post-deployment production monitoring and governance review.</p>"
    },
    {
      n: 50,
      prompt: "<p>A developer uses Content Understanding to extract structured data from supplier invoices and needs to verify in the response exactly where in the document each extracted field value came from. Which Content Understanding output feature supports this?</p>",
      choices: ["Confidence scores that report a 0\u20131 probability for each extracted field", "Grounding output, such as bounding boxes showing where each field value is located on the page", "The Markdown rendering returned by RAG analyzers", "Content-safety flags returned alongside each field"],
      answer: 1,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Content Understanding returns grounding information alongside extracted field values. For documents this includes bounding boxes that show the exact page region where the value was located; for audio and video it includes timestamps. Grounding lets downstream systems verify and audit the provenance of each extracted value.</p><p>Confidence scores indicate extraction reliability on a 0\u20131 scale but do not show where in the document the value was found. Markdown rendering is produced by RAG analyzers for retrieval pipelines and does not localize individual field values. Content-safety flags indicate whether extracted content is harmful; they are not provenance markers.</p>"
    }
  ]}]
};
