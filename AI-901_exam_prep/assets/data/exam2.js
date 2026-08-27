window.AI9_DATA = window.AI9_DATA || {};

window.AI9_DATA.exam2 = {
  id: "exam2",
  name: "AI-901 \u2014 Practice Exam 2",
  timeMinutes: 45,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A developer wants to confirm that an AI system\u2019s decisions can be traced back to specific individuals or teams who are responsible for its outcomes. Which responsible AI principle does this BEST describe?</p>",
      choices: ["Fairness", "Transparency", "Accountability", "Inclusiveness"],
      answer: 2,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Accountability means people and organizations must answer for AI system behavior and that governance frameworks assign clear responsibility for outcomes.</p><p>Fairness concerns equitable treatment across groups; transparency concerns whether people can understand how a decision was made; inclusiveness concerns whether everyone can access and use the system.</p>"
    },
    {
      n: 2,
      prompt: "<p>A product team must choose a deployment type that offers the lowest per-token price, routes requests across all Azure regions, and gives immediate access to the newest models. Which type should they choose?</p>",
      choices: ["Global Standard", "Standard (regional)", "Global Provisioned (PTU)", "Data Zone Standard"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Global Standard is Microsoft\u2019s recommended default: pay-per-token billing, global routing for the broadest availability, and first access to the newest models at the lowest price.</p><p>Standard (regional) is locked to a single region; Global Provisioned (PTU) uses reserved capacity billed as provisioned throughput units; Data Zone Standard restricts processing to a geographic zone for data residency.</p>"
    },
    {
      n: 3,
      prompt: "<p>A healthcare app extracts medication names and dosage amounts from free-text clinical notes at scale. Which AI workload category is this?</p>",
      choices: ["Generative AI", "Agentic AI", "Text analysis", "Information extraction"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Information extraction is the workload of pulling structured data \u2014 specific named fields such as medication names and amounts \u2014 from unstructured content such as clinical notes.</p><p>Generative AI creates new content; agentic AI uses multi-step tool-calling agents; text analysis covers broader tasks such as sentiment and summarization rather than targeted field extraction.</p>"
    },
    {
      n: 4,
      prompt: "<p>A developer adds a system message to a deployed chat model instructing it to answer only product-related questions and refuse all others. What does this technique MOST directly accomplish?</p>",
      choices: ["It fine-tunes the model weights for the product domain", "It scopes and constrains model behavior without retraining", "It creates a RAG pipeline that retrieves product documentation", "It provisions a dedicated PTU deployment for the model"],
      answer: 1,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>A system message is sent as the \u2018system\u2019 role in every request and sets the model\u2019s role, persona, and constraints at inference time \u2014 no training or weight changes are involved.</p><p>Fine-tuning changes model weights through a separate training process; RAG injects retrieved passages into the prompt; PTU provisioning is a billing and capacity decision unrelated to behavioral constraints.</p>"
    },
    {
      n: 5,
      prompt: "<p>A team needs to transcribe customer calls in real time using custom acoustic models and synthesize responses in a brand-specific neural voice. Which service is the BEST fit for all three requirements?</p>",
      choices: ["Azure Language", "Azure Speech", "A GPT-4o multimodal model", "Azure Translator"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>Azure Speech covers real-time speech-to-text with custom speech models, neural text-to-speech including custom neural voice, and batch transcription \u2014 all three requirements in one service.</p><p>Azure Language handles text-based NLP, not audio; a GPT-4o multimodal model handles spoken prompts but does not provide custom acoustic models or custom neural voice; Azure Translator handles cross-language text translation, not audio.</p>"
    },
    {
      n: 6,
      prompt: "<p>A developer passes a JPEG of a product assembly diagram into a chat call and asks the model to list each labeled component. Which capability does this use?</p>",
      choices: ["Image generation with the gpt-image-1 family", "Visual input processing by a deployed multimodal model", "Azure Vision Image Analysis", "Content Understanding prebuilt-image analyzer"],
      answer: 1,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>Passing an image into a Responses API call and asking the model to reason about it is \u201cvisual input processing by a deployed multimodal model\u201d \u2014 available in GPT-5.x, GPT-4.1, GPT-4o, and o-series families.</p><p>The gpt-image-1 family generates new images from text prompts; Azure Vision Image Analysis is deprecated and not recommended for new work; the Content Understanding prebuilt-image analyzer extracts structured schema fields via a defined field schema, not open-ended chat.</p>"
    },
    {
      n: 7,
      prompt: "<p>A logistics company must extract vendor name, invoice date, and line-item totals from thousands of scanned PDF invoices with the highest accuracy and lowest latency. They have no labeled training samples. Which service should they use FIRST?</p>",
      choices: ["Document Intelligence prebuilt invoice model", "Content Understanding custom analyzer (zero-shot)", "A vision-enabled GPT-5 model with a structured output prompt", "Azure Vision Read API"],
      answer: 0,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Document Intelligence\u2019s prebuilt invoice model is purpose-trained for exactly these standard invoice fields and delivers the highest accuracy and lowest latency with no training data required.</p><p>Content Understanding zero-shot is excellent for novel or unstructured documents but is generative and less deterministic; a vision-enabled GPT model can reason about invoices but has higher latency and variable output structure; the Azure Vision Read API extracts only raw text with no structured field understanding.</p>"
    },
    {
      n: 8,
      prompt: "<p>A hiring AI consistently ranks equally qualified applicants from certain universities higher than those who attended other schools. Which responsible AI principle is MOST at risk?</p>",
      choices: ["Privacy and security", "Fairness", "Transparency", "Reliability and safety"],
      answer: 1,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Fairness requires AI systems to treat all people equitably and to avoid outcomes that disadvantage groups based on characteristics not relevant to the decision, such as educational institution.</p><p>Privacy and security concerns personal data protection; transparency concerns the explainability of decisions; reliability and safety concerns consistent, harm-free behavior under all conditions.</p>"
    },
    {
      n: 9,
      prompt: "<p>A team wants to run a one-time overnight analysis of 10 million support tickets using a large language model. Which deployment type offers the LOWEST cost and is designed for asynchronous workloads?</p>",
      choices: ["Global Standard", "Standard (regional)", "Global Provisioned (PTU)", "Global Batch"],
      answer: 3,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Global Batch processes large asynchronous jobs at roughly a 50% discount compared to Global Standard, with results delivered within 24 hours \u2014 ideal for one-time bulk workloads where real-time latency is not required.</p><p>Global Standard is the default synchronous pay-per-token tier; Standard (regional) is synchronous and locked to a single region; Global Provisioned (PTU) reserves capacity for high-throughput real-time work and costs more at low volume.</p>"
    },
    {
      n: 10,
      prompt: "<p>A chatbot returns fluent, confident answers about a company policy that contradict the actual policy document. What is the BEST term for this behavior, and what is the recommended primary mitigation?</p>",
      choices: ["Prompt injection; add prompt shields", "Model drift; retrain the model", "Hallucination; ground the model with RAG", "Overfitting; reduce the temperature"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>A confident, fluent, factually wrong output is called a hallucination. The recommended mitigation is grounding via retrieval-augmented generation, which injects the actual policy document into the prompt so the model answers from it rather than from memorized weights.</p><p>Prompt injection is an attack where malicious instructions override a system message; model drift refers to degrading accuracy over time; overfitting and temperature tuning are concepts that do not address factual accuracy against a specific document.</p>"
    }    ,
    {
      n: 11,
      prompt: "<p>A team wants to give a customer-service chatbot knowledge of current product prices that change every week. Fine-tuning cannot keep pace. Which approach is BEST?</p>",
      choices: ["Ground the model with RAG that queries an up-to-date price index", "Increase the temperature so the model explores more answer options", "Use a larger model family with a wider context window", "Add a stop sequence that prevents outdated pricing answers"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>RAG (retrieval-augmented generation) injects current content from a search index into the prompt at query time, so the model always answers from live data without any weight updates.</p><p>Higher temperature increases randomness, not accuracy; a larger context window does not add knowledge the model lacks; stop sequences halt generation but do not supply new factual content.</p>"
    },
    {
      n: 12,
      prompt: "<p>A malicious document embedded in a tool call attempts to override an AI agent\u2019s system message with hidden instructions. Which Azure AI Content Safety feature is designed to detect this specific attack?</p>",
      choices: ["Groundedness detection", "Jailbreak prompt shield", "Indirect prompt injection shield", "Protected material detection"],
      answer: 2,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "hard",
      explanation: "<p>Indirect prompt injection shields detect attempts by malicious content in external data sources \u2014 documents, web pages, tool responses \u2014 to hijack an agent by embedding hidden instructions that override its system message.</p><p>Groundedness detection checks whether model outputs are supported by source content; the jailbreak prompt shield targets direct user messages that try to bypass safety constraints; protected material detection identifies copyrighted content in outputs.</p>"
    },
    {
      n: 13,
      prompt: "<p>A data scientist requires that support-ticket summaries contain ONLY sentences that appeared verbatim in the original ticket, with no paraphrasing or new wording. Which summarization method is required?</p>",
      choices: ["Abstractive summarization", "Generative summarization using a GPT model", "Key phrase extraction", "Extractive summarization"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Extractive summarization selects and returns existing sentences from the source document without generating new wording \u2014 exactly the requirement when verbatim fidelity is mandatory.</p><p>Abstractive summarization writes new sentences that may not appear in the source; a GPT model produces abstractive output by default; key phrase extraction returns keywords and short phrases, not complete sentences.</p>"
    },
    {
      n: 14,
      prompt: "<p>A legal team must process contracts that are up to 200,000 tokens long in a single request. Which model selection criterion is MOST critical for this scenario?</p>",
      choices: ["Context window size", "Temperature setting", "Global Standard deployment type", "Fine-tuning availability"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>The context window determines the maximum amount of input (and output) a model can process in one request, so choosing a model whose context window accommodates the full contract length is the critical criterion.</p><p>Temperature controls output randomness and has no effect on input capacity; Global Standard is a deployment billing type, not a model capability; fine-tuning availability is unrelated to how much text a model can process at once.</p>"
    },
    {
      n: 15,
      prompt: "<p>A developer starting a new project in Foundry wants to generate product marketing images from text descriptions. Which model family should they use?</p>",
      choices: ["Whisper", "text-embedding-3-large", "gpt-image-1", "DALL-E 3"],
      answer: 2,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>The gpt-image-1 family is the current recommended text-to-image generation option in Foundry Models, superseding DALL-E and available in standard and mini variants.</p><p>Whisper is a transcription model for audio; text-embedding-3-large converts text to vectors for search and RAG; DALL-E 3 is the previous generation image model and is no longer the surfaced recommendation for new work.</p>"
    },
    {
      n: 16,
      prompt: "<p>A team writes custom Python orchestration using the OpenAI Agents SDK, packages it, and deploys it so that Foundry provides the managed endpoint, autoscaling, and Entra managed identity. Which agent type are they building?</p>",
      choices: ["An ephemeral agent defined only in code via the Responses API", "A prompt agent authored in the Foundry portal", "A plain chat completion with function calling", "A hosted agent"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>A hosted agent is one where you write the orchestration code (using Agent Framework, LangGraph, or the OpenAI Agents SDK), package it, and Foundry runs it with a managed endpoint, autoscaling, and its own Entra identity.</p><p>An ephemeral agent lives only in calling code with no agent resource created; a prompt agent is declarative \u2014 you configure it in the portal or via SDK without writing orchestration code; a plain chat completion has no persistent state, tools, or identity of its own.</p>"
    },
    {
      n: 17,
      prompt: "<p>A startup must extract named fields from a new category of contract document. They have no labeled samples and must deploy within days. Which Content Understanding capability should they use?</p>",
      choices: ["A zero-shot custom analyzer with a plain-language field schema", "A custom analyzer trained on labeled contract examples", "Document Intelligence custom neural model", "Azure Vision layout analysis"],
      answer: 0,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Content Understanding custom analyzers work zero-shot \u2014 you define fields in plain language in a JSON field schema with no labeled training data, making rapid deployment possible for novel document types.</p><p>A labeled-example custom analyzer improves accuracy but takes time to prepare data; Document Intelligence custom neural model requires labeled training samples on structured forms; Azure Vision layout analysis extracts visual structure and raw text but has no field-level understanding.</p>"
    },
    {
      n: 18,
      prompt: "<p>An AI system monitors email and calendar, then autonomously schedules meetings, books travel, and sends follow-up messages by invoking external tools across multiple steps. Which AI workload type does this BEST represent?</p>",
      choices: ["Text analysis", "Agentic AI", "Information extraction", "Vision AI"],
      answer: 1,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Agentic AI workloads are characterized by multi-step autonomous execution, tool invocation, and goal-driven behavior \u2014 a model that plans and acts across multiple systems fits this definition exactly.</p><p>Text analysis covers NLP tasks like sentiment and summarization without autonomous action; information extraction pulls structured fields from documents without multi-step tool use; vision AI processes images and video, not calendar or email orchestration.</p>"
    },
    {
      n: 19,
      prompt: "<p>A user sends a carefully crafted message that attempts to make a model ignore its system message and adopt a new, unrestricted persona. Which Content Safety feature is specifically designed to detect this attack?</p>",
      choices: ["Jailbreak prompt shield", "Indirect prompt injection shield", "Groundedness detection", "Hate category filter"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>The jailbreak prompt shield analyzes user messages for patterns that attempt to override or circumvent the system message and safety constraints directly in the conversation.</p><p>The indirect prompt injection shield targets hidden instructions in external data sources rather than user messages; groundedness detection checks whether model outputs are supported by grounding documents; the hate category filter scores content for hateful language, not manipulation attacks.</p>"
    },
    {
      n: 20,
      prompt: "<p>Review this code snippet:</p><p><pre>project = AIProjectClient(\n    endpoint=\"https://r.services.ai.azure.com/api/projects/p\",\n    credential=DefaultAzureCredential(),\n)\nopenai = project.get_openai_client()\nresponse = openai.responses.create(model=\"gpt-5-mini\", input=\"Hello\")\nprint(response.output_text)</pre></p><p>What does this code MOST accurately demonstrate?</p>",
      choices: ["Fine-tuning a model with the Foundry SDK", "Creating a prompt agent with persistent instructions", "Sending a single stateless chat request using the Foundry SDK", "Maintaining a multi-turn conversation with context"],
      answer: 2,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The code creates an AIProjectClient, gets an OpenAI client from the project, and calls responses.create() once with a single input \u2014 a single stateless request with no conversation object, which is the Foundry SDK pattern for one-shot chat completions.</p><p>Fine-tuning uses a separate training workflow, not a responses.create() call; a prompt agent requires PromptAgentDefinition and agents.create_version(); multi-turn memory requires creating a conversation object with conversations.create() and reusing its ID.</p>"
    }    ,
    {
      n: 21,
      prompt: "<p>A HIPAA-compliant application must detect and redact patient names, addresses, and medical record numbers from free-text clinical notes before storing them. Which Azure Language capability is the BEST fit?</p>",
      choices: ["Abstractive summarization", "PII detection", "Named entity recognition (general)", "Key phrase extraction"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>PII detection is a core Azure Language feature specifically designed to identify and redact personally identifiable information categories such as names, addresses, and identification numbers from text.</p><p>Abstractive summarization produces condensed text, not redacted output; general named entity recognition can surface person and location entities but lacks the PII-specific categories and redaction output; key phrase extraction returns important terms, not personally identifiable fields.</p>"
    },
    {
      n: 22,
      prompt: "<p>A developer sets <code>temperature=0.0</code> on a deployed model. What is the MOST accurate description of the effect on model output?</p>",
      choices: ["Outputs become highly focused and nearly deterministic", "The model stops generating after reaching a fixed token count", "The model only returns responses supported by grounding documents", "Response latency is reduced significantly"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Temperature controls randomness in token selection. A value of 0.0 makes the model almost always choose the highest-probability token, producing focused, consistent, and nearly deterministic output across repeated calls.</p><p>Token count is controlled by max_tokens, not temperature; grounding behavior depends on RAG or Content Safety groundedness settings; temperature does not directly affect latency.</p>"
    },
    {
      n: 23,
      prompt: "<p>Before asking a model to classify a new support ticket, a developer includes three example ticket-plus-category pairs in the prompt. Which prompting technique is this?</p>",
      choices: ["System message tuning", "Zero-shot prompting", "Retrieval-augmented generation", "Few-shot prompting"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Few-shot prompting means including a small number of worked examples (input-output pairs) in the prompt to demonstrate the desired behavior before asking the model to complete a new instance.</p><p>System message tuning sets the model\u2019s role and constraints but does not supply examples; zero-shot prompting gives the model a task with no examples; RAG injects retrieved documents into the prompt rather than worked examples.</p>"
    },
    {
      n: 24,
      prompt: "<p>A Content Understanding field schema must assign each incoming insurance claim to one of five predefined claim categories. Which field extraction method should be used for this field?</p>",
      choices: ["Extract", "Classify", "Generate", "Summarize"],
      answer: 1,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>The classify method assigns a value from a predefined set of categories \u2014 exactly what is needed when mapping documents to one of five known claim types.</p><p>Extract copies a value that literally appears in the content; generate uses generative AI to produce a new value, such as a summary, not a predefined category; summarize is not one of the three Content Understanding field methods (extract, classify, generate).</p>"
    },
    {
      n: 25,
      prompt: "<p>A RAG application\u2019s model occasionally states facts not found in any of the retrieved passages. The team wants to detect and flag these unsupported outputs automatically. Which Content Safety feature addresses this?</p>",
      choices: ["Jailbreak prompt shield", "Protected material detection", "Groundedness detection", "Hate category severity filter"],
      answer: 2,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Groundedness detection evaluates model outputs against the grounding documents provided in the prompt and flags claims that are not supported by those sources, helping teams surface hallucinations in RAG pipelines.</p><p>The jailbreak prompt shield targets adversarial user inputs; protected material detection identifies copyrighted content in outputs; the hate severity filter scores outputs for hateful language, not factual support.</p>"
    },
    {
      n: 26,
      prompt: "<p>A marketing team uses an AI model to write product descriptions, blog drafts, and social media captions from brief topic notes. Which AI workload category does this represent?</p>",
      choices: ["Information extraction", "Text analysis", "Agentic AI", "Generative AI"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Generative AI workloads produce new content \u2014 text, images, audio, or video \u2014 from input prompts, which is exactly what writing product descriptions and blog drafts from topic notes represents.</p><p>Information extraction pulls structured fields from existing documents; text analysis derives insights such as sentiment or named entities from existing text without creating new content; agentic AI uses multi-step autonomous tool invocation, not just content generation.</p>"
    },
    {
      n: 27,
      prompt: "<p>A developer wants to create separate model deployments, agents, and access-control policies for two different teams, all within a single Foundry resource. What is the correct unit of scoping for this isolation?</p>",
      choices: ["Azure subscription", "Foundry project", "Model deployment", "Foundry resource (AIServices account)"],
      answer: 1,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>A Foundry project is the unit of scoping for access control, billing, and endpoints inside a Foundry resource \u2014 creating one project per team provides the required isolation.</p><p>An Azure subscription is too broad and applies to all resources across the account; a model deployment is a single endpoint within a project, not an isolation boundary; the Foundry resource itself is shared and does not provide per-team isolation without projects.</p>"
    },
    {
      n: 28,
      prompt: "<p>A physical security app requires real-time liveness detection to confirm a captured face belongs to a live person rather than a photograph or video replay. Which Azure service provides this capability, and what is its access status?</p>",
      choices: ["Azure Face \u2014 active but Limited Access, requires application approval", "Azure Vision Image Analysis \u2014 generally available with no restrictions", "Content Understanding prebuilt-image \u2014 generally available, no sign-up needed", "A GPT-4o multimodal model \u2014 available in any Standard deployment"],
      answer: 0,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>Azure Face provides liveness detection (confirming a real person vs a spoof) along with face detection, verification, and identification \u2014 but it is a Limited Access service that requires developers to apply and be approved before use.</p><p>Azure Vision Image Analysis does not provide liveness detection; Content Understanding extracts schema-defined fields and does not perform biometric liveness checks; a multimodal GPT model can describe images but is not designed or validated for biometric liveness verification.</p>"
    },
    {
      n: 29,
      prompt: "<p>A developer wants users to speak a question naturally, have a language model reason about it, and receive a synthesized spoken answer \u2014 all within a single real-time API call. Which capability BEST fits this end-to-end requirement?</p>",
      choices: ["Azure Speech real-time speech-to-text followed by a separate text-to-speech call", "Azure Speech Voice Live low-latency streaming", "A multimodal audio model such as gpt-realtime", "Whisper transcription combined with a separate text generation model"],
      answer: 2,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>Multimodal audio models such as the gpt-realtime family accept speech input, reason with a language model, and return a spoken response in one integrated call \u2014 the exact end-to-end speech-in, reasoning, speech-out architecture described.</p><p>Azure Speech speech-to-text and text-to-speech are two separate services requiring an intermediate text step; Voice Live is a low-latency voice feature within Azure Speech but does not include LLM reasoning; Whisper plus a text generation model requires combining two separate services with no real-time speech output.</p>"
    },
    {
      n: 30,
      prompt: "<p>A team needs a small, low-cost language model that can run inference on an edge device with limited GPU memory. Which Foundry Models family is purpose-built for this scenario?</p>",
      choices: ["GPT-5 series", "Phi", "o-series", "gpt-image-1 family"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Phi is Microsoft\u2019s family of small language models designed for edge and local deployment, offering low cost and low resource requirements while maintaining strong benchmark performance for their size.</p><p>The GPT-5 series is a large general-purpose family requiring significant compute resources; the o-series is optimized for deep reasoning tasks such as math and complex coding, not edge deployment; the gpt-image-1 family generates images from text and is not a text-generation model.</p>"
    }    ,
    {
      n: 31,
      prompt: "<p>A developer writes this agent code:</p><p><pre>openai = project.get_openai_client(agent_name=\"SupportBot\")\nr1 = openai.responses.create(model=\"gpt-5-mini\", input=\"First question\")\nr2 = openai.responses.create(model=\"gpt-5-mini\", input=\"Follow-up\")</pre></p><p>What is the problem with this code?</p>",
      choices: ["No conversation object is created, so the second call has no memory of the first", "get_openai_client() cannot accept an agent_name argument", "DefaultAzureCredential is incompatible with agent-based clients", "responses.create() requires a system message on every call"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>Multi-turn memory requires creating a conversation with openai.conversations.create() and passing its ID as conversation=conversation.id on every subsequent responses.create() call; without it each call is independent and the model has no context from prior turns.</p><p>get_openai_client() does accept agent_name when targeting a specific agent; DefaultAzureCredential is the correct keyless auth method for agent clients; responses.create() does not require a system message on every call since the agent\u2019s instructions serve that role.</p>"
    },
    {
      n: 32,
      prompt: "<p>A team has just identified that a deployed model occasionally produces biased outputs against a demographic group. According to Microsoft\u2019s responsible AI four-stage process, what is the NEXT step after identifying the issue?</p>",
      choices: ["Operate the system with expanded monitoring dashboards", "Mitigate by adding content filters immediately", "Measure the extent, frequency, and conditions of the bias", "Replace the model with a different model family"],
      answer: 2,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "hard",
      explanation: "<p>The four-stage process is identify \u2192 measure \u2192 mitigate \u2192 operate. After identifying a problem, the next step is to measure it \u2014 quantifying the scope, frequency, and conditions \u2014 before selecting an appropriate mitigation.</p><p>Operating with monitoring dashboards is the final stage; jumping directly to content filters skips the measurement step and risks addressing symptoms rather than causes; replacing the model family is a potential mitigation action, not the immediate next step.</p>"
    },
    {
      n: 33,
      prompt: "<p>A developer is evaluating Azure AI Custom Vision for a new image classification project starting today. What retirement timeline must they consider?</p>",
      choices: ["It was retired on January 1, 2026", "It retires September 25, 2026", "It has no announced retirement date", "It retires September 25, 2028, and new projects should use multimodal models"],
      answer: 3,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Azure AI Custom Vision is active but has an announced retirement date of September 25, 2028. For new image classification work, Microsoft\u2019s guidance is to use vision-enabled multimodal models instead.</p><p>Custom Vision was not retired on January 1, 2026; the correct date is 2028, not 2026; the service does have an announced retirement date.</p>"
    },
    {
      n: 34,
      prompt: "<p>A team needs consistent, low-latency sentiment analysis on thousands of customer reviews per hour with predictable per-call cost. Which approach is BETTER suited to this requirement?</p>",
      choices: ["A GPT-5 model with a system message that classifies sentiment", "Azure Language sentiment analysis feature", "An o-series model for deep reasoning about emotional nuance", "Content Understanding classify field for review categorization"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>The Azure Language sentiment analysis feature is a purpose-built, deterministic service designed for consistent typed output, low latency, and predictable per-call pricing at scale \u2014 all priorities stated in the requirement.</p><p>A GPT-5 model can classify sentiment but has higher latency and variable cost; the o-series is designed for complex multi-step reasoning, adding latency and cost with no benefit for simple sentiment labels; Content Understanding classify fields are designed for document processing pipelines, not real-time review scoring.</p>"
    },
    {
      n: 35,
      prompt: "<p>A developer wants the second <code>responses.create()</code> call to retain context from the first call. Which line MUST be added before the first call?</p><p><pre>openai = project.get_openai_client(agent_name=\"MyAgent\")\n# ??? line here\nr1 = openai.responses.create(model=\"gpt-5-mini\", input=\"First\")\nr2 = openai.responses.create(model=\"gpt-5-mini\", input=\"Follow-up\",\n                              conversation=conv.id)</pre></p>",
      choices: ["conv = openai.conversations.create()", "conv = openai.threads.create()", "conv = project.agents.get_conversation()", "conv = openai.sessions.start()"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The Foundry SDK 2.x uses conversations.create() to establish a persistent conversation object; passing its id to subsequent responses.create() calls is what gives the model memory of prior turns.</p><p>threads.create() is the obsolete OpenAI Assistants API vocabulary used in Foundry (classic); project.agents.get_conversation() is not a valid SDK method; sessions.start() does not exist in the Foundry SDK.</p>"
    },
    {
      n: 36,
      prompt: "<p>A retail system uses AI to analyze shelf photos, identify out-of-stock products, and detect misplaced items by interpreting image content. Which AI workload category does this represent?</p>",
      choices: ["Text analysis", "Information extraction", "Agentic AI", "Vision AI"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Vision AI workloads interpret visual input \u2014 images or video \u2014 to derive insights such as object detection, defect identification, or scene understanding, which is exactly what shelf photo analysis involves.</p><p>Text analysis processes written text for sentiment, entities, or summarization; information extraction pulls structured fields from documents; agentic AI executes multi-step autonomous tasks, which shelf image analysis alone does not represent.</p>"
    },
    {
      n: 37,
      prompt: "<p>A compliance integration requires knowing exactly where in a document each Content Understanding extracted value originated. Which output element provides source location as bounding boxes or timestamps?</p>",
      choices: ["Confidence score (0\u20131 per field)", "Markdown output for RAG pipelines", "Grounding information", "Content Safety flag"],
      answer: 2,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Grounding in Content Understanding output provides bounding boxes (for document and image content) or timestamps (for audio and video) showing precisely where in the source material each extracted value came from.</p><p>The confidence score is a 0\u20131 probability of extraction accuracy, not a location; Markdown output is a formatted representation for RAG pipelines, not source coordinates; the Content Safety flag reports safety-related issues, not field locations.</p>"
    },
    {
      n: 38,
      prompt: "<p>A team wants to deploy a fine-tuned open-source model using custom weights on dedicated GPU capacity they can size themselves. Which Foundry deployment option supports this?</p>",
      choices: ["Serverless API Global Standard deployment", "Managed compute deployment (preview)", "Instant access deployment", "Global Provisioned (PTU) deployment"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Managed compute (preview) provides dedicated GPU capacity that the team sizes themselves, and it specifically supports open-source, community, and custom-weight models \u2014 matching both requirements.</p><p>Serverless API Global Standard is for models hosted and managed by Microsoft, not custom weights; instant access calls supported models by name with no deployment but does not accommodate custom weights; Global Provisioned (PTU) reserves throughput for Microsoft-hosted models, not custom-weight open-source models.</p>"
    },
    {
      n: 39,
      prompt: "<p>In a RAG pipeline built on Foundry, what is the role of an embedding model such as text-embedding-3-large?</p>",
      choices: ["It generates the final text response from the retrieved passages", "It translates the query into the document index language", "It converts text passages and queries into numerical vectors for similarity search", "It applies content safety filters to retrieved passages before they enter the prompt"],
      answer: 2,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>An embedding model transforms text \u2014 both the user\u2019s query and the indexed documents \u2014 into numerical vectors; similarity search then finds document chunks whose vectors are closest to the query vector, enabling relevant retrieval.</p><p>A generative model produces the final response after retrieval; language translation is a separate service and not inherent to RAG; content safety filtering is applied by Azure AI Content Safety, not embedding models.</p>"
    },
    {
      n: 40,
      prompt: "<p>A company\u2019s AI assistant has no screen-reader support, making it completely unusable by blind employees. Which responsible AI principle is MOST directly being violated?</p>",
      choices: ["Inclusiveness", "Fairness", "Accountability", "Transparency"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Inclusiveness requires that AI systems be designed so that everyone can use and benefit from them regardless of ability or disability \u2014 lacking screen-reader support directly excludes blind users.</p><p>Fairness concerns whether the system produces equitable outcomes across demographic groups, not whether all groups can physically access it; accountability concerns governance and responsibility for outcomes; transparency concerns whether users understand how the system works.</p>"
    }    ,
    {
      n: 41,
      prompt: "<p>A developer needs the full transcript of a 30-minute recorded support call returned as quickly as possible rather than streamed in real-time chunks. Which Azure Speech capability is designed for this use case?</p>",
      choices: ["Real-time custom speech transcription", "Speaker recognition", "LLM speech (preview)", "Fast transcription"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Azure Speech fast transcription is designed to return a complete transcript of an audio file as quickly as possible \u2014 faster than real-time streaming \u2014 making it the right choice when the entire recording must be transcribed with minimal delay.</p><p>Real-time transcription processes audio as it arrives in chunks; speaker recognition identifies who is speaking rather than producing a full transcript; LLM speech is a preview feature for combining speech with language model reasoning, not batch transcription speed.</p>"
    },
    {
      n: 42,
      prompt: "<p>A media team wants to generate short video clips from text scene descriptions. Which Foundry model family supports text-to-video generation, and what is its current availability?</p>",
      choices: ["gpt-image-1 \u2014 generally available", "FLUX from Black Forest Labs \u2014 generally available", "sora \u2014 in preview", "gpt-realtime \u2014 generally available"],
      answer: 2,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>The sora family (sora, sora-2) is Microsoft\u2019s text-to-video generation model in Foundry Models, currently in preview, designed to produce video clips from text descriptions.</p><p>The gpt-image-1 family generates static images, not video; FLUX from Black Forest Labs is also an image generation model; gpt-realtime is a multimodal audio model for speech-in speech-out, not video generation.</p>"
    },
    {
      n: 43,
      prompt: "<p>A developer must process audio recordings of customer service calls and extract a structured list of topics discussed. Neither Document Intelligence nor Azure Language are sufficient. Which service handles audio as a native modality?</p>",
      choices: ["Document Intelligence custom neural model on audio files", "Azure Language key phrase extraction on a manual transcript", "Document Intelligence prebuilt-audio analyzer", "Content Understanding with a prebuilt-audio or prebuilt-audioSearch analyzer"],
      answer: 3,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>Content Understanding natively supports audio as one of its four modalities, with prebuilt-audio and prebuilt-audioSearch analyzers designed for structured field extraction from recordings \u2014 no prior transcription step required.</p><p>Document Intelligence is documents-only and has no audio analyzer; Azure Language key phrase extraction requires a pre-transcribed text string and returns flat keywords, not structured schema fields; there is no Document Intelligence prebuilt-audio product.</p>"
    },
    {
      n: 44,
      prompt: "<p>A developer is testing a newly fine-tuned model and needs a short-lived, no-SLA deployment that automatically expires after 24 hours. Which deployment type is designed for this evaluation purpose?</p>",
      choices: ["Developer deployment type", "Global Standard", "Data Zone Standard", "Global Provisioned (PTU)"],
      answer: 0,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>The Developer deployment type is specifically designed for evaluating fine-tuned models: it has a 24-hour lifetime, carries no SLA, and costs the same per-token rate as Global Standard without committing to long-lived capacity.</p><p>Global Standard is the general-purpose production tier with no automatic expiry; Data Zone Standard restricts data to a geographic zone, not for temporary evaluation; Global Provisioned (PTU) commits to reserved throughput with higher cost, unsuitable for a short evaluation window.</p>"
    },
    {
      n: 45,
      prompt: "<p>A marketing dashboard uses AI to classify customer reviews as positive, negative, or neutral based on their emotional tone. Which AI workload type does this represent?</p>",
      choices: ["Generative AI", "Text analysis", "Agentic AI", "Information extraction"],
      answer: 1,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Text analysis workloads derive insights from existing text \u2014 including sentiment classification, key phrase extraction, named entity recognition, and summarization \u2014 which is exactly what scoring reviews as positive, negative, or neutral involves.</p><p>Generative AI creates new content; agentic AI involves multi-step autonomous tool use; information extraction pulls specific structured field values from documents rather than classifying overall tone.</p>"
    },
    {
      n: 46,
      prompt: "<p>Review this code snippet:</p><p><pre>from azure.ai.projects.models import PromptAgentDefinition\n\nagent = project.agents.create_version(\n    agent_name=\"Advisor\",\n    definition=PromptAgentDefinition(\n        model=\"gpt-5-mini\",\n        instructions=\"Answer questions about Azure pricing only.\",\n    ),\n)</pre></p><p>What does this code MOST accurately create?</p>",
      choices: ["A hosted agent with custom Python orchestration packaged for Foundry", "A plain chat completion with a per-request system message", "An ephemeral agent definition that runs without creating an agent resource", "A prompt agent with a model, instructions, and a versioned agent resource"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The code calls project.agents.create_version() with a PromptAgentDefinition supplying model and instructions \u2014 the exact SDK pattern for creating a versioned prompt agent resource in the Foundry Agent Service.</p><p>A hosted agent requires custom orchestration code packaged and deployed separately; a plain chat completion uses openai.responses.create() with no agent definition; an ephemeral agent lives only in calling code and uses no create_version() call.</p>"
    },
    {
      n: 47,
      prompt: "<p>A global support app must translate spoken customer queries in real time from Spanish into English text so English-speaking agents can read them. Which Azure capability is the BEST fit?</p>",
      choices: ["Azure Language named entity recognition", "Whisper transcription model", "Azure Speech speech translation", "Azure Translator text translation"],
      answer: 2,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Azure Speech speech translation handles real-time spoken language \u2014 it receives audio input and produces translated text (or speech) output in a target language, covering the full spoken-to-translated pipeline in one service.</p><p>Azure Language NER extracts entities, not translated text; Whisper transcribes audio to text in the original language with no translation; Azure Translator is a text-to-text translation service that requires a pre-transcribed string as input.</p>"
    },
    {
      n: 48,
      prompt: "<p>A content operations team uploads videos and wants prebuilt insights including automatic transcripts, named faces, and topic labels \u2014 without defining a custom field schema. Which service BEST fits?</p>",
      choices: ["Content Understanding prebuilt-videoSearch analyzer", "A GPT-5 multimodal model with video file input", "Azure Vision Image Analysis on sampled video frames", "Azure AI Video Indexer"],
      answer: 3,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Azure AI Video Indexer is a dedicated service that automatically extracts prebuilt insights from video \u2014 faces, transcripts, labels, OCR, topics \u2014 without requiring a custom schema definition.</p><p>Content Understanding prebuilt-videoSearch is designed for schema-driven field extraction in RAG pipelines, not broad automatic indexing; a GPT-5 multimodal model can describe video content but does not provide structured indexing of faces and topics at scale; Azure Vision Image Analysis is deprecated and analyzes individual images, not full video files.</p>"
    },
    {
      n: 49,
      prompt: "<p>A developer converts product catalog entries into numerical vectors using a text-embedding model and stores them in Azure AI Search for semantic lookup. Which AI workload does this BEST support?</p>",
      choices: ["Vision AI", "Agentic AI", "Generative AI (RAG pipeline)", "Information extraction"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Embedding models convert text to vectors that enable semantic similarity search \u2014 this is the retrieval step in a generative AI RAG pipeline, where relevant passages are fetched and inserted into a prompt for a generative model to answer from.</p><p>Vision AI processes image or video input; agentic AI involves autonomous multi-step tool invocation; information extraction pulls structured field values from documents, which is not the role of an embedding and vector search index.</p>"
    },
    {
      n: 50,
      prompt: "<p>A government agency must run structured document field extraction in an air-gapped datacenter with no internet access. Which service supports on-premises deployment via containers?</p>",
      choices: ["Document Intelligence", "Content Understanding", "Azure Vision Read API", "Azure Language summarization"],
      answer: 0,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Document Intelligence offers Docker-based containers that can be deployed on-premises or in air-gapped environments, making it the only option of the four for fully disconnected document processing.</p><p>Content Understanding has no container option and requires a cloud connection; the Azure Vision Read API is a legacy cloud-only service; Azure Language summarization is a cloud service with no container deployment for the summarization feature.</p>"
    }
  ]}]
};
