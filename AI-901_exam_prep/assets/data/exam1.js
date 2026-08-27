window.AI9_DATA = window.AI9_DATA || {};

window.AI9_DATA.exam1 = {
  id: "exam1",
  name: "AI-901 \u2014 Practice Exam 1",
  timeMinutes: 45,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A hospital wants to ensure its triage model does not systematically rank one ethnic group as lower priority than another. Which responsible AI principle MOST directly applies?</p>",
      choices: ["Fairness", "Transparency", "Reliability and safety", "Accountability"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Fairness requires that AI systems treat all people equitably and do not produce biased outcomes based on demographic characteristics such as ethnicity. Systematically ranking one group lower is a classic bias scenario that Fairness directly addresses.</p><p>Transparency concerns explaining how a model works, not whether groups are treated equally. Reliability and safety focuses on consistent behavior under unexpected conditions, not demographic equity. Accountability concerns governance and oversight of who is responsible for outcomes, not whether the model treats groups the same.</p>"
    },
    {
      n: 2,
      prompt: "<p>A developer wants the lowest-cost, no-infrastructure way to start calling a GPT-5 model in Foundry. Which deployment option should they choose FIRST?</p>",
      choices: ["Managed compute with a dedicated GPU cluster", "Serverless API with Global Standard deployment", "Global Batch deployment with asynchronous processing", "Standard regional deployment with single-region compliance"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Global Standard is the default serverless API deployment type. It requires no infrastructure to size or manage, offers pay-per-token billing at the lowest price, and gives access to the newest models first across all Azure regions. Microsoft guidance says to start here.</p><p>Managed compute requires sizing and maintaining a dedicated GPU cluster, the opposite of no-infrastructure. Global Batch is for large asynchronous jobs and trades real-time access for a cost discount, not the starting point for a new integration. Standard regional deployment restricts data to a single region for compliance and is not the lowest-cost default.</p>"
    },
    {
      n: 3,
      prompt: "<p>A retailer builds an app that uses AI to describe product images in natural language for visually impaired shoppers. Which AI workload category BEST describes this solution?</p>",
      choices: ["Text analysis", "Information extraction", "Computer vision", "Generative AI"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Computer vision is the workload category that covers understanding and interpreting image content. Generating a natural-language description from an image is a core computer vision task, specifically visual question answering or image captioning.</p><p>Text analysis applies NLP techniques such as sentiment or entity detection to text, not images. Information extraction pulls structured data from documents such as invoices or forms. Generative AI describes generating new content broadly, but when the input is an image and the AI must understand it visually, the specific workload category is computer vision.</p>"
    },
    {
      n: 4,
      prompt: "<p>An engineer writes the following Python code but the AIProjectClient constructor raises an error immediately. What is the MOST likely missing element?</p><p><pre>from azure.ai.projects import AIProjectClient\n\nproject = AIProjectClient(\n    endpoint=\"https://myres.services.ai.azure.com/api/projects/myproj\"\n)\nopenai = project.get_openai_client()\nresponse = openai.responses.create(model=\"gpt-5-mini\", input=\"Hello\")\nprint(response.output_text)</pre></p>",
      choices: ["A conversation ID argument to maintain multi-turn session state", "A stop sequence to prevent the response from running too long", "The azure-ai-projects package version number in the import statement", "A credential argument such as DefaultAzureCredential()"],
      answer: 3,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>AIProjectClient requires a credential parameter for keyless Entra authentication. The canonical credential is DefaultAzureCredential() imported from azure.identity. Without it, the constructor raises a TypeError or authentication error before any API call is made.</p><p>A conversation ID is only needed for multi-turn agents and is not required for a single-shot response call. A stop sequence is an optional inference parameter, not a constructor requirement. The import statement for AIProjectClient does not include a version number; package versions are set at install time and not passed as arguments.</p>"
    },
    {
      n: 5,
      prompt: "<p>A customer-service chatbot is configured to disclose to every user that it is an AI system and to include a brief explanation of how it reached each answer. Which responsible AI principle does this BEST reflect?</p>",
      choices: ["Transparency", "Accountability", "Inclusiveness", "Reliability and safety"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Transparency requires that people understand how an AI system works, what it is, and why it makes certain decisions. Disclosing AI identity and explaining reasoning directly satisfies this principle.</p><p>Accountability is about governance and who answers for the system\u2019s outcomes, not about explaining its reasoning to end users. Inclusiveness is about ensuring everyone can access and use the system regardless of ability, not about explanation. Reliability and safety concerns consistent, safe behavior under varying conditions, not the practice of explaining decisions.</p>"
    },
    {
      n: 6,
      prompt: "<p>A call center wants live captions displayed on an agent\u2019s screen as customers speak. Which Azure Speech feature is BEST suited?</p>",
      choices: ["Batch transcription for audio stored in Azure Blob", "Real-time speech to text", "Fast transcription for short audio files", "Voice Live for conversational voice"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>Real-time speech to text streams audio and produces transcription results with low latency, making it the right choice for live captions displayed as a customer speaks.</p><p>Batch transcription is designed for asynchronous processing of stored audio files, not live audio streams. Fast transcription is a synchronous high-speed mode for shorter files but is not a live streaming solution. Voice Live is a low-latency conversational voice feature for interactive AI agents, not for generating plain text captions.</p>"
    },
    {
      n: 7,
      prompt: "<p>A developer wants to send product photos to a model and ask it to identify any visible defects. Which approach is BEST for this visual question-answering task?</p>",
      choices: ["Submit images to Azure Custom Vision for defect classification", "Call the Azure Vision Image Analysis 4.0 API", "Pass the images as input to a vision-enabled model in Foundry", "Call the Azure Face API to analyze image content"],
      answer: 2,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>Vision-enabled models such as GPT-5.x, GPT-4.1, GPT-4o, and o-series accept images directly in prompts. Passing the image to such a model and asking a question is the recommended approach for flexible, reasoning-based visual analysis.</p><p>Azure Custom Vision requires training a classifier on labeled examples and is retiring in 2028; it is not suited to open-ended defect description. Azure Vision Image Analysis 4.0 is deprecated and retiring in 2028; it is not the recommended path for new work. Azure Face API is for face-specific tasks such as detection, identification, and liveness, not general object or defect analysis.</p>"
    },
    {
      n: 8,
      prompt: "<p>A company receives thousands of standard supplier invoices daily and needs to extract line-item totals, vendor names, and tax rates with high accuracy and low latency. Which service is BEST?</p>",
      choices: ["Azure Content Understanding with a custom analyzer", "A GPT-5 model prompted to extract invoice fields", "Azure Language named entity recognition", "Azure Document Intelligence prebuilt-invoice model"],
      answer: 3,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Document Intelligence has a purpose-trained prebuilt-invoice model optimized for high accuracy and low latency on standard invoice forms. It is deterministic and documents-only, which is ideal when the document type is well-defined.</p><p>Content Understanding with a custom analyzer is better for unstructured or multimodal content where zero-shot generative extraction is needed. A GPT-5 model is flexible but has higher latency, higher cost, and less deterministic output than a purpose-trained model for a well-defined form type. Azure Language NER identifies named entities in running text but is not designed for structured form-field extraction from scanned documents.</p>"
    },
    {
      n: 9,
      prompt: "<p>A company\u2019s policy documents change every month. The chatbot must answer questions from the current version without producing answers from outdated training data. Which technique should the team use?</p>",
      choices: ["Retrieval-augmented generation grounded on an Azure AI Search index", "Fine-tuning the model after each monthly policy update", "Increasing temperature to make responses more accurate", "Switching to a Phi model to reduce hallucination"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>RAG (retrieval-augmented generation) grounds the model\u2019s responses in documents retrieved at query time. Current policy text is indexed in Azure AI Search; relevant passages are injected into the prompt so the model answers from them rather than from potentially outdated training data.</p><p>Fine-tuning changes model weights to adjust style or narrow behavior; it does not efficiently inject new facts and requires retraining with every update. Increasing temperature adds randomness and does not improve factual accuracy. Switching to Phi reduces cost and size for edge deployment but does not inherently prevent hallucination or keep answers current.</p>"
    },
    {
      n: 10,
      prompt: "<p>Before launching a loan-approval AI, the team runs extensive adversarial tests, edge-case simulations, and staged rollouts to ensure the model behaves safely under unexpected inputs. Which responsible AI principle does this MOST reflect?</p>",
      choices: ["Fairness", "Reliability and safety", "Privacy and security", "Accountability"],
      answer: 1,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Reliability and safety requires that AI systems behave consistently and fail safely, including under unexpected or adversarial conditions. Rigorous testing and staged rollouts are the primary implementation of this principle.</p><p>Fairness is about equitable treatment across demographic groups, not about testing for failure modes. Privacy and security concerns protecting personal data and is not the principle associated with adversarial robustness testing. Accountability is about governance and oversight, not the testing process itself.</p>"
    },
    {
      n: 11,
      prompt: "<p>A research team needs an AI model to solve complex multi-step mathematical proofs and analyze intricate logical arguments. Which model family is BEST suited?</p>",
      choices: ["GPT-5.x general-purpose chat model", "Phi small language model for edge deployment", "o-series reasoning model such as o3", "An embedding model such as text-embedding-3-large"],
      answer: 2,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>The o-series (o3, o4-mini) are deep-reasoning models built specifically for complex math, multi-step logic, and complex coding. They apply extended chain-of-thought processing that general chat models do not perform.</p><p>GPT-5.x is a strong general-purpose model but not specifically optimized for deep mathematical reasoning. Phi is designed for edge and low-cost deployments where compute is limited, not for maximizing reasoning depth. Embedding models convert text to vectors for search and RAG; they do not generate reasoning or answers.</p>"
    },
    {
      n: 12,
      prompt: "<p>A travel company deploys an AI that autonomously browses flight APIs, compares prices, books tickets, and sends confirmation emails without a human approving each step. Which AI workload category BEST describes this?</p>",
      choices: ["Computer vision", "Text analysis", "Information extraction", "Agentic AI"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Agentic AI describes systems where an AI agent autonomously executes multi-step tasks, invokes tools, and makes sequential decisions without human approval at each step. Browsing APIs, comparing options, booking, and emailing is a classic agentic workflow.</p><p>Computer vision analyzes images and video, not travel booking workflows. Text analysis covers NLP tasks such as sentiment and entity detection on text documents. Information extraction pulls structured fields from documents such as forms or invoices, not end-to-end autonomous workflows.</p>"
    },
    {
      n: 13,
      prompt: "<p>A developer wants a model to always respond as a formal customer-service representative without providing this instruction in every user turn. What is the BEST way to achieve this?</p>",
      choices: ["A system message that establishes the persona and tone constraints", "A zero-shot example in the first user turn showing a formal reply", "Increasing temperature to produce more varied formal responses", "A stop sequence that ends each response after one sentence"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>The system message is sent as the system role before any user turns and persists for the conversation. It is the correct mechanism for setting a persistent persona, role, and behavioral constraints without repeating instructions in every turn.</p><p>A zero-shot example in the first user turn can help guide style but only influences that exchange and is not guaranteed to persist. Increasing temperature adds randomness to outputs and does not enforce a formal tone. Stop sequences halt generation at specific strings; they do not enforce a persona or speaking style.</p>"
    },
    {
      n: 14,
      prompt: "<p>An app must classify product reviews as positive, negative, or neutral and return the result as a structured typed value for downstream processing. Which approach is BEST?</p>",
      choices: ["A GPT-5 model prompted to return a sentiment label", "Azure Language sentiment analysis", "Azure Speech to text followed by named entity recognition", "Azure Content Understanding with a Classify field"],
      answer: 1,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>Azure Language sentiment analysis is a purpose-built feature that returns a structured typed sentiment label (positive, negative, neutral, mixed) with confidence scores. It is optimized for consistent output, low latency, and predictable cost, exactly what structured downstream processing requires.</p><p>A GPT-5 model can return a label but has higher latency and cost and less predictable output format. Azure Speech to text converts audio to text; paired with NER it identifies entities, not sentiment. Content Understanding with a Classify field is powerful for document or media modalities but is not the most direct solution for simple short-text sentiment classification.</p>"
    },
    {
      n: 15,
      prompt: "<p>A healthcare app must automatically delete patient voice transcripts 24 hours after processing and must encrypt all data in transit and at rest. Which responsible AI principle does this MOST directly address?</p>",
      choices: ["Inclusiveness", "Transparency", "Privacy and security", "Accountability"],
      answer: 2,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Privacy and security requires that personal data be collected and used with consent, protected from unauthorized access, and handled with appropriate retention policies. Deleting transcripts and encrypting data in transit and at rest are concrete implementations of this principle.</p><p>Inclusiveness is about ensuring the system is accessible to everyone regardless of ability. Transparency is about explaining how the system works, not about data protection controls. Accountability is about governance and oversight structures, not technical data-protection practices.</p>"
    },
    {
      n: 16,
      prompt: "<p>A team needs to extract structured fields from audio recordings of insurance-claim calls. No prebuilt form type in any document-processing service covers this case. Which service should they use?</p>",
      choices: ["Azure Document Intelligence prebuilt-read model", "Azure Language NER applied to a call transcript", "Azure Vision Read API for OCR", "Azure Content Understanding with a prebuilt-audio analyzer"],
      answer: 3,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Azure Content Understanding supports an audio modality with a prebuilt-audio analyzer (and prebuilt-audioSearch for RAG). It can extract custom schema-defined fields from audio recordings without a purpose-trained form model, making it the right choice for call-center audio extraction.</p><p>Azure Document Intelligence processes documents only; it has no audio modality. Azure Language NER can analyze a transcript but requires a separate transcription step and does not return schema-defined structured fields. The Azure Vision Read API performs OCR on images and documents; it cannot process audio.</p>"
    },
    {
      n: 17,
      prompt: "<p>A developer writes this agent code. What does the <code>openai.conversations.create()</code> call specifically accomplish?</p><p><pre>conversation = openai.conversations.create()\nr1 = openai.responses.create(conversation=conversation.id, input=\"First question\")\nr2 = openai.responses.create(conversation=conversation.id, input=\"Follow-up\")</pre></p>",
      choices: ["It creates a persistent multi-turn session so follow-up responses retain conversation context", "It sends the first user message to the agent and returns the initial response", "It initializes a new model deployment scoped to this agent session", "It creates a new Foundry project for the agent to use as a workspace"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>conversations.create() creates a conversation object with a unique ID. Passing that same conversation.id to each subsequent responses.create() call tells the Foundry SDK to include prior turns as context, enabling multi-turn memory within that session.</p><p>The call creates a session identifier only; it does not send any content to the agent. It is unrelated to model deployments, which are created in the Foundry portal or via deployment APIs. It is also unrelated to Foundry projects, which are top-level organizational resources created separately before any SDK calls.</p>"
    },
    {
      n: 18,
      prompt: "<p>A production workload requires a guaranteed minimum throughput with predictable monthly billing regardless of usage variation. Which deployment type is BEST?</p>",
      choices: ["Global Standard serverless deployment", "Global Provisioned (PTU) deployment", "Global Batch deployment with a 24-hour processing window", "Developer deployment for performance evaluation"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Global Provisioned (PTU) deployment reserves dedicated capacity measured in Provisioned Throughput Units. It provides guaranteed throughput and predictable billing, which is exactly right for high-volume production workloads that need consistent latency and budget certainty.</p><p>Global Standard is pay-per-token with shared capacity; it does not guarantee minimum throughput. Global Batch is for large asynchronous jobs processed up to 24 hours later and is not suitable for real-time interactive workloads. Developer deployment has a 24-hour life and no SLA; it is intended for evaluating fine-tuned models, not production traffic.</p>"
    },
    {
      n: 19,
      prompt: "<p>A team uses Azure Custom Vision today. The project manager notes it is retiring in September 2028 and asks what to migrate to for flexible image analysis. Which option is BEST for new work?</p>",
      choices: ["Azure Vision Image Analysis 4.0, which is the current successor", "Azure Face API, which handles general image classification", "A vision-enabled generative model in Foundry or Azure Content Understanding", "Azure AI Video Indexer for image classification tasks"],
      answer: 2,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>For new vision analysis work, Microsoft recommends either passing images to a vision-enabled generative model (GPT-4o, GPT-5.x, o-series) or using Azure Content Understanding for schema-driven extraction. Both provide flexible image analysis without a retiring service dependency.</p><p>Azure Vision Image Analysis 4.0 is also deprecated and retiring September 2028, so migrating to it defers the problem rather than solving it. Azure Face is for face-specific tasks such as detection and liveness, not general image classification. Azure AI Video Indexer provides prebuilt video insights but is not a substitute for image classification.</p>"
    },
    {
      n: 20,
      prompt: "<p>A company adds a feature that automatically converts customer voicemail recordings into written text stored in a CRM database. Which AI workload category BEST describes this?</p>",
      choices: ["Information extraction", "Computer vision", "Generative AI", "Speech"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Speech is the AI workload category that covers converting spoken audio to text (speech to text) and text to audio (text to speech). Converting voicemail recordings to written text is a speech-to-text task.</p><p>Information extraction pulls structured fields from documents and forms, not audio streams. Computer vision analyzes images and video frames, not audio content. Generative AI describes creating new content; converting audio to an accurate transcript is a recognition task, not content generation.</p>"
    },
    {
      n: 21,
      prompt: "<p>A developer provides one labeled example of the desired response format immediately before asking the model a question. What prompting technique is this?</p>",
      choices: ["One-shot prompting", "Fine-tuning the model on example outputs", "Grounding the model with a RAG pipeline", "Adjusting the top_p parameter for sampling control"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>One-shot prompting means supplying exactly one example (input-output pair) in the prompt to guide the model on format or style before the actual question. This is distinct from zero-shot (no example) and few-shot (multiple examples).</p><p>Fine-tuning modifies model weights using a training dataset; it does not apply at inference time within a single prompt. Grounding with RAG retrieves documents and injects them into the prompt to add factual knowledge, not to demonstrate output format. top_p is a sampling parameter that controls token diversity; it does not shape output format.</p>"
    },
    {
      n: 22,
      prompt: "<p>An organization establishes a review board that must approve all AI deployments and has authority to halt any AI project at any stage. Which responsible AI principle does this MOST reflect?</p>",
      choices: ["Transparency", "Accountability", "Inclusiveness", "Fairness"],
      answer: 1,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Accountability requires that people and organizations have the authority and obligation to answer for AI systems and their outcomes. A governance board with approval and halt authority is a direct implementation of organizational accountability.</p><p>Transparency is about explaining how systems work to those affected, not about governance structure. Inclusiveness ensures everyone can use the system, not about oversight mechanisms. Fairness concerns equitable treatment across demographic groups, not about who is responsible for governance decisions.</p>"
    },
    {
      n: 23,
      prompt: "<p>A news app needs to generate short summaries that paraphrase articles in new wording rather than lifting sentences verbatim. Which summarization type does this describe?</p>",
      choices: ["Extractive summarization", "Key phrase extraction", "Abstractive summarization", "Named entity recognition"],
      answer: 2,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Abstractive summarization generates new sentences that paraphrase the source material using generative language. The summary may contain wording that does not appear verbatim in the original document.</p><p>Extractive summarization selects and returns existing sentences from the source text without generating new wording. Key phrase extraction identifies the most important terms and phrases in the text, not full sentence summaries. Named entity recognition detects and classifies named entities such as people, places, and organizations; it does not produce summaries.</p>"
    },
    {
      n: 24,
      prompt: "<p>A developer sets <code>temperature=0</code> when calling a model. What is the PRIMARY effect of this setting?</p>",
      choices: ["Responses become longer and more detailed", "Responses include more diverse and unexpected topics", "Responses improve in factual accuracy", "Responses become more focused and deterministic"],
      answer: 3,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Temperature controls randomness in token selection. A value of 0 makes the model select the highest-probability token at each step, producing focused, deterministic, and repeatable responses.</p><p>Temperature does not control response length; max_tokens controls that. Temperature does not increase topic diversity; low temperature reduces diversity. Temperature does not improve factual accuracy; it only controls how strictly the model follows the probability distribution. Factual accuracy depends on grounding and training data.</p>"
    },
    {
      n: 25,
      prompt: "<p>An agent needs to answer user questions with live, up-to-date information from the public internet. Which agent tool should the developer add?</p>",
      choices: ["Azure AI Search tool configured with an internal document index", "Grounding with Bing tool", "File search tool with uploaded knowledge-base files", "Function calling with a custom REST endpoint"],
      answer: 1,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Grounding with Bing is the agent tool that provides web search access, allowing the agent to retrieve current public-internet information and ground its responses in live search results.</p><p>Azure AI Search queries an internal index of documents the team has indexed; it does not access the live public web. File search performs vector search over files uploaded to the agent\u2019s knowledge store, not the internet. Function calling lets the agent invoke custom code or APIs but does not by itself provide web-search capability; a developer would still have to build and host the search integration.</p>"
    },
    {
      n: 26,
      prompt: "<p>A banking app must verify that the person submitting a selfie is physically present and not replaying a photo or video. Which feature should the developer use?</p>",
      choices: ["Azure Face liveness detection", "Azure Vision Image Analysis 4.0 face detection", "Custom Vision trained on live vs. replay frames", "GPT-4o vision analysis of the selfie image"],
      answer: 0,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Azure Face liveness detection is the purpose-built feature for determining whether a face in an image is from a live person or a spoofing attempt such as a printed photo or video replay. It is an active, gated feature in Azure Face.</p><p>Azure Vision Image Analysis 4.0 is deprecated and does not provide liveness detection. Custom Vision would require labeled training data for live vs. replay frames and is retiring in 2028; it is not appropriate for a security-critical feature. GPT-4o vision analysis is flexible but is not a certified liveness detection solution and should not be used for security-critical identity verification.</p>"
    },
    {
      n: 27,
      prompt: "<p>An e-commerce platform wants to automatically pull the most significant words and phrases from product reviews and use them as searchable tags. Which text analysis capability BEST fits?</p>",
      choices: ["Sentiment analysis", "Named entity recognition", "Key phrase extraction", "Language detection"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Key phrase extraction identifies the most important terms and phrases in a piece of text, making it ideal for generating searchable tags from unstructured review content.</p><p>Sentiment analysis classifies the overall emotional tone (positive, negative, neutral) but does not return key terms for tagging. Named entity recognition identifies specific entities such as people, places, and organizations, not general key phrases. Language detection identifies what language the text is written in, not the important topics within it.</p>"
    },
    {
      n: 28,
      prompt: "<p>A narrator app must insert a two-second pause after each chapter title and increase speaking rate for action sequences mid-sentence. Which Azure Speech feature enables this?</p>",
      choices: ["Custom neural voice training for a specialized voice model", "Azure Speech fast transcription applied to the script", "The rate parameter in the standard text-to-speech REST call", "Speech Synthesis Markup Language (SSML)"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>SSML (Speech Synthesis Markup Language) is an XML-based markup language that gives granular control over speech synthesis, including inserting pauses with &lt;break&gt; elements and changing speaking rate with the rate attribute, all inline within the text.</p><p>Custom neural voice training creates a unique voice model but does not by itself add dynamic pauses or rate changes to output. Fast transcription converts audio to text; it is unrelated to text-to-speech synthesis. The standard rate parameter applies a single rate to the whole request, not dynamically inline within a sentence.</p>"
    },
    {
      n: 29,
      prompt: "<p>A Content Understanding analyzer must produce a one-sentence AI-written summary of each document section. The summary text does NOT appear verbatim anywhere in the document. Which extraction method should the field schema use?</p>",
      choices: ["Extract, which copies a value that appears literally in the document", "Generate, which uses generative AI to create a new value from the content", "Classify, which assigns one of a predefined set of category labels", "baseAnalyzerId, which selects which prebuilt model processes the document"],
      answer: 1,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "hard",
      explanation: "<p>The Generate extraction method instructs Content Understanding to use generative AI to produce a new value derived from the content. This is the correct method when the desired output does not literally exist in the source and must be synthesized, such as a paraphrased summary.</p><p>Extract copies a value that appears literally in the document; it cannot produce a paraphrased summary. Classify assigns the content to one of a predefined set of categories rather than generating free-form text. baseAnalyzerId is a configuration property that specifies which base analyzer to use; it is not an extraction method for individual fields.</p>"
    },
    {
      n: 30,
      prompt: "<p>A user sends a message specifically crafted to override the system prompt and convince the model to ignore its safety guidelines. Which Azure AI Content Safety feature is designed to detect this type of attack?</p>",
      choices: ["Prompt shields for jailbreak detection", "Groundedness detection", "Protected material detection", "Content filter severity thresholds"],
      answer: 0,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Prompt shields are designed to detect and block jailbreak attempts, where a user crafts input to override the system prompt and bypass safety guidelines. They also protect against indirect prompt injection attacks embedded in retrieved documents.</p><p>Groundedness detection checks whether a model\u2019s response is supported by the provided grounding documents, not whether a user is trying to manipulate the system. Protected material detection identifies whether model output reproduces copyrighted or protected content. Content filter severity thresholds configure the level at which hate, sexual, violence, or self-harm content is blocked; they act on the content category, not on manipulation attempts.</p>"
    },
    {
      n: 31,
      prompt: "<p>A developer runs this code and receives an HTTP 404 error from the endpoint. What is the MOST likely cause?</p><p><pre>from azure.ai.projects import AIProjectClient\nfrom azure.identity import DefaultAzureCredential\n\nproject = AIProjectClient(\n    endpoint=\"https://myres.services.ai.azure.com/myproj\",\n    credential=DefaultAzureCredential(),\n)\nopenai = project.get_openai_client()\nresponse = openai.responses.create(model=\"gpt-5-mini\", input=\"Hello\")</pre></p>",
      choices: ["DefaultAzureCredential() does not work with the Foundry SDK; use an API key string instead", "responses.create() is not a valid method; use chat.completions.create() instead", "The endpoint URL is missing the /api/projects/ path segment before the project name", "The model parameter should reference a deployment name, not a model family name"],
      answer: 2,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The correct Foundry project endpoint format is https://&lt;resource&gt;.services.ai.azure.com/api/projects/&lt;project&gt;. The code above omits /api/projects/, producing a malformed URL that resolves to an invalid route and returns a 404 error.</p><p>DefaultAzureCredential() is the correct and recommended keyless auth method for the Foundry SDK. responses.create() is the correct current Foundry SDK method for generating a completion. The deployment-name vs model-family distinction is a real concern but does not cause a 404; it would cause a model-not-found error after a successful HTTP connection.</p>"
    },
    {
      n: 32,
      prompt: "<p>A data team must process 10 million text documents overnight. Results are not needed until the next morning and cost reduction is the top priority. Which deployment type is BEST?</p>",
      choices: ["Standard regional deployment for single-region compliance", "Global Provisioned (PTU) deployment for reserved throughput", "Managed compute with an autoscaling GPU cluster", "Global Batch deployment"],
      answer: 3,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Global Batch deployment is designed for large asynchronous workloads that can tolerate up to 24-hour processing windows. It offers approximately 50% cost savings compared to real-time deployment, making it ideal when results are not needed immediately.</p><p>Standard regional deployment is pay-per-token in real time with no batch discount and adds a single-region constraint that is not required here. Global Provisioned (PTU) is for high-throughput production with guaranteed capacity; its reserved pricing is not the lowest cost for a once-a-night batch job. Managed compute provides dedicated GPU capacity for custom or open-source models; it is not the right choice for a standard API-based cost-saving batch workload.</p>"
    },
    {
      n: 33,
      prompt: "<p>An app receives text messages from global customers and must automatically route each message to the correct regional support team. Which Azure Language feature should it use FIRST?</p>",
      choices: ["Azure Language language detection", "Azure Language key phrase extraction", "Azure Translator text translation", "Azure Speech language identification"],
      answer: 0,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>Language detection in Azure Language identifies which language a piece of text is written in and returns a language code and confidence score. This is the correct FIRST step to route messages to the right regional team before any other processing.</p><p>Key phrase extraction identifies important terms within text but assumes the language is already known. Azure Translator translates text from one language to another but is a subsequent step after identifying the language. Azure Speech language identification works on audio input, not text messages.</p>"
    },
    {
      n: 34,
      prompt: "<p>A safety inspector uploads a photo of a work site and asks an AI to describe any visible hazards. Which approach is BEST?</p>",
      choices: ["Submit the image to Azure Vision Image Analysis 4.0", "Pass the image as visual input to a vision-enabled model such as GPT-4o", "Train a Custom Vision model on labeled hazard images", "Process the image with the Azure Face API"],
      answer: 1,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Vision-enabled models such as GPT-4o, GPT-5.x, and o-series accept images directly in prompts. Passing the image and asking a natural-language question enables flexible, reasoning-based hazard description without training or labeling data.</p><p>Azure Vision Image Analysis 4.0 is deprecated and retiring in 2028; it is not recommended for new work. Custom Vision requires labeled training examples and is itself retiring in September 2028; it is not suitable for open-ended hazard description. Azure Face API is specialized for face detection, identification, and liveness, not general safety hazard analysis.</p>"
    },
    {
      n: 35,
      prompt: "<p>A developer wants the Content Understanding analyzer response to include the exact bounding-box coordinates showing where each extracted value appears in the document. Which feature provides this?</p>",
      choices: ["Setting the confidence threshold to 1.0 to force exact matches", "Using the Extract method for all fields instead of Generate", "Enabling grounding in the analyzer configuration", "Choosing the prebuilt-documentSearch RAG analyzer"],
      answer: 2,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Grounding in Content Understanding returns spatial metadata such as bounding box coordinates (for documents and images) or timestamps (for audio and video) that indicate exactly where in the source the extracted value was found.</p><p>The confidence threshold filters results by certainty but does not add location metadata. Using Extract vs Generate determines whether a value is copied or generated; it does not provide bounding box coordinates. The prebuilt-documentSearch RAG analyzer returns Markdown-formatted content optimized for retrieval pipelines, not structured field extraction with bounding boxes.</p>"
    },
    {
      n: 36,
      prompt: "<p>An enterprise wants a routing agent that delegates customer queries to three specialist subagents: one for billing, one for technical support, and one for shipping, each with its own tools. Which pattern should they implement?</p>",
      choices: ["A multi-agent pattern using the agent-to-agent (A2A) tool with an orchestrator agent", "A single prompt agent with all three tool sets attached to one agent", "A hosted agent running custom LangGraph orchestration on a Foundry managed endpoint", "Fine-tuning a single model to handle all three specialist domains in one pass"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The multi-agent pattern uses an orchestrator agent that routes queries to specialist subagents via the agent-to-agent (A2A) tool. Foundry manages routing, identity, and observability, and each specialist keeps its own focused tool set and instructions.</p><p>A single prompt agent with all three tool sets loses the isolation benefits and makes the instructions and tools harder to manage as complexity grows. A hosted agent with LangGraph is valid but is a code-intensive option; for Foundry-native routing A2A with a prompt orchestrator is the recommended approach. Fine-tuning embeds behavioral patterns into weights but cannot dynamically route to separate tool sets or maintain separate agent identities.</p>"
    },
    {
      n: 37,
      prompt: "<p>A content moderation system must detect text that promotes hatred against people based on their religion. Which Azure AI Content Safety category covers this?</p>",
      choices: ["Self-harm", "Sexual", "Violence", "Hate"],
      answer: 3,
      topic: "Responsible AI",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>The Hate category in Azure AI Content Safety covers content that promotes prejudice, discrimination, or denigration of individuals or groups based on characteristics such as religion, race, ethnicity, or national origin.</p><p>Self-harm covers content that encourages or glorifies self-injury or suicide. Sexual covers explicit or suggestive sexual content. Violence covers graphic descriptions of physical harm to people or animals. None of these categories address religious hatred.</p>"
    },
    {
      n: 38,
      prompt: "<p>A document assistant sends a 90,000-token document in every request and users report the model ignores content from the beginning of the document. Which model configuration is MOST relevant to investigate?</p>",
      choices: ["The temperature setting, which should be lowered to improve focus on early content", "The context window limit of the selected model deployment", "The max_tokens parameter, which controls the output length", "The presence_penalty, which should be increased to diversify the topics covered"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Each model deployment has a finite context window that limits the total tokens it can process in a single request (input plus output). If the document plus prompt exceeds the context window, early content is truncated or ignored. Checking the context window of the deployed model is the first step.</p><p>Temperature affects response randomness, not which input tokens are attended to. max_tokens caps the generated output length; it does not affect how much input the model can process. presence_penalty influences how often the model introduces new topics in output; it has no effect on how much input context is processed.</p>"
    },
    {
      n: 39,
      prompt: "<p>A company continuously monitors public social media posts, detects mentions of its brand, and classifies each mention as positive, negative, or neutral. Which AI workload category BEST describes this?</p>",
      choices: ["Agentic AI", "Information extraction", "Text analysis", "Computer vision"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Text analysis is the workload category that covers NLP techniques applied to text, including sentiment analysis, keyword extraction, entity detection, and summarization. Classifying social media posts by sentiment is a classic text-analysis task.</p><p>Agentic AI involves autonomous multi-step task execution with tools; monitoring and classifying text is not inherently agentic. Information extraction focuses on pulling structured fields from documents such as forms and invoices, not on classifying unstructured posts. Computer vision analyzes images and video, not text content.</p>"
    },
    {
      n: 40,
      prompt: "<p>A developer creates a Foundry resource, then creates a Foundry project inside it. Where are model deployments, agents, evaluations, and Azure AI Search connections all scoped and managed?</p>",
      choices: ["The Foundry project", "The Foundry resource (top-level AIServices account)", "The model deployment endpoint URL", "The Azure subscription where the resource lives"],
      answer: 0,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>A Foundry project is the unit of scoping for access control, billing, and endpoints. Model deployments, agents, playgrounds, evaluations, connections, and observability are all created and managed inside a project.</p><p>The Foundry resource is the top-level Azure resource (an AIServices account) that hosts projects; it is the parent container, not the workspace where deployments live. The model deployment endpoint URL is a runtime call target, not a management scope. The Azure subscription is the billing and governance container for all Azure resources; it does not host Foundry project artifacts directly.</p>"
    },
    {
      n: 41,
      prompt: "<p>A startup wants to build a conversational voice assistant where the AI listens to the user, reasons about the request, and speaks its answer back in one integrated step with no separate STT or TTS pipeline. Which option BEST supports this?</p>",
      choices: ["Azure Speech Voice Live for low-latency conversational voice", "Azure Speech real-time speech to text piped into a text-to-speech synthesis call", "A custom neural voice model configured with SSML prosody markup", "A multimodal audio model such as gpt-realtime-* deployed in Foundry"],
      answer: 3,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>Multimodal audio models such as gpt-realtime-* and gpt-audio-* accept audio input and produce audio output with a language model in the middle. They handle listening, reasoning, and speaking in a single integrated call, which is exactly what responding to spoken prompts with a deployed multimodal model means in the exam objective.</p><p>Voice Live is a low-latency Azure Speech feature for interactive voice but uses Azure Speech for transcription and synthesis, not an LLM in the loop. Piping speech to text into text to speech requires two separate API calls and a separate LLM call in between, not a single integrated step. A custom neural voice is a synthesis feature only; it does not listen or reason.</p>"
    },
    {
      n: 42,
      prompt: "<p>A company has thousands of unstructured legal contracts and needs to extract custom fields such as effective date and governing law. There are NO labeled training samples available. Which service is BEST?</p>",
      choices: ["Azure Document Intelligence custom neural model trained on labeled contract samples", "Azure Content Understanding custom analyzer using zero-shot field definitions", "Azure Language NER with a custom model trained on contract examples", "Azure Document Intelligence prebuilt-invoice model applied to contract documents"],
      answer: 1,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Azure Content Understanding custom analyzers work zero-shot: you describe the fields to extract in plain language and no labeled training data is required. This makes it the right choice when samples are unavailable and the documents are unstructured, such as contracts.</p><p>Azure Document Intelligence custom neural model requires labeled samples to train; that option is explicitly ruled out here. Azure Language NER with a custom model also requires labeled training examples. The prebuilt-invoice model is trained for invoices, not contracts, and custom fields like governing law are not part of its schema.</p>"
    },
    {
      n: 43,
      prompt: "<p>A legal firm builds a tool that reads case filings and produces a concise paragraph summarizing the key arguments. The summary contains wording that does not appear verbatim in the filing. Which AI workload BEST describes this?</p>",
      choices: ["Information extraction", "Computer vision", "Text analysis", "Speech"],
      answer: 2,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "medium",
      explanation: "<p>Text analysis is the workload category that includes summarization. Producing a paraphrased paragraph from a document is an abstractive summarization task, which is a named capability within the text analysis workload.</p><p>Information extraction pulls structured field values from documents; it does not generate narrative summaries. Computer vision analyzes images and video, not textual legal filings. Speech workloads convert between audio and text; the input here is a written document, not audio.</p>"
    },
    {
      n: 44,
      prompt: "<p>A product team wants to generate photorealistic marketing images from text descriptions. Which model family in Foundry Models is CURRENTLY recommended for this?</p>",
      choices: ["gpt-image-1", "DALL-E 3", "Phi visual variant", "sora"],
      answer: 0,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>The gpt-image-1 family (including gpt-image-1, gpt-image-1-mini, and gpt-image-1.5) is the current recommended image-generation model in Foundry Models. It supersedes DALL-E 3 as the recommended choice for text-to-image generation.</p><p>DALL-E 3 is the prior generation and is no longer surfaced as the current recommended image-generation model; gpt-image-1 is the answer for new work. Phi is a family of small language models for text tasks, not image generation. sora is a video-generation model (text to video), not a still-image generator.</p>"
    },
    {
      n: 45,
      prompt: "<p>A developer needs to run a language model on a device with limited compute, limited memory, and intermittent connectivity. Which model family is BEST suited?</p>",
      choices: ["GPT-5.x for maximum reasoning capability", "Phi small language model", "o3 reasoning model for complex multi-step tasks", "text-embedding-3-large for semantic search"],
      answer: 1,
      topic: "Models and Deployment",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Phi is Microsoft\u2019s family of small language models (SLMs) designed specifically for edge and local deployment, where compute and memory are limited. They are optimized for low cost and can run offline or with intermittent connectivity.</p><p>GPT-5.x models are large cloud-hosted models requiring significant compute and a reliable connection; they are not suited for edge devices. o3 is a deep-reasoning model designed for maximum accuracy on complex tasks, requiring substantial compute, the opposite of resource-constrained edge deployment. text-embedding-3-large is a vector embedding model; it converts text to vectors and does not generate language responses.</p>"
    },
    {
      n: 46,
      prompt: "<p>A team is using Azure Vision Image Analysis 4.0 in production and learns it is deprecated and retiring in September 2028. What should they migrate to for new computer vision work?</p>",
      choices: ["Azure Custom Vision, which is the designated successor service", "The Azure Vision Read/OCR API, which is still fully supported", "Azure Face API, which handles general image analysis tasks", "A vision-enabled generative model in Foundry or Azure Content Understanding"],
      answer: 3,
      topic: "Vision and Image Generation",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>For new computer vision work, Microsoft recommends migrating to vision-enabled generative models (such as GPT-4o, GPT-5.x, o-series) for flexible image understanding, or to Azure Content Understanding for schema-driven multimodal extraction. Both are actively evolving paths.</p><p>Azure Custom Vision is also retiring in September 2028, so it is not a viable migration target. The Azure Vision Read/OCR API is labeled legacy and is not a recommended path for new work. Azure Face API is limited to face-specific tasks such as detection, identification, and liveness; it is not a general-purpose image analysis replacement.</p>"
    },
    {
      n: 47,
      prompt: "<p>A Content Understanding analyzer returns a field value along with a score of 0.72. What does this score represent?</p>",
      choices: ["The number of tokens consumed to process that field", "The page number where the field value was found", "A confidence score between 0 and 1 indicating extraction certainty", "The bounding box x-coordinate for the field location"],
      answer: 2,
      topic: "Information Extraction",
      objective: "2.4",
      difficulty: "medium",
      explanation: "<p>Content Understanding returns an optional confidence score between 0 and 1 for extracted fields. A score of 0.72 means the model is 72% confident that the extracted value is correct. Developers use this to threshold results or flag low-confidence extractions for human review.</p><p>Token consumption is tracked separately in usage metadata, not as a per-field score. The page number is part of grounding metadata (location information), not a decimal score between 0 and 1. Bounding box coordinates are also grounding metadata and are given as pixel coordinates, not as a decimal between 0 and 1.</p>"
    },
    {
      n: 48,
      prompt: "<p>A developer wants to transcribe live audio from a microphone and display captions on screen as the user speaks. Which Azure Speech feature is BEST?</p>",
      choices: ["Real-time speech to text", "Batch transcription for stored audio files", "Fast transcription for short pre-recorded clips", "Speaker recognition for identifying the speaker"],
      answer: 0,
      topic: "Text and Speech",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>Real-time speech to text streams audio and produces transcription results continuously with low latency. It is designed exactly for live microphone input where captions must appear as the user speaks.</p><p>Batch transcription is asynchronous and designed for stored audio files; it is not suitable for live streaming. Fast transcription is a synchronous mode for short pre-recorded files submitted as a complete audio payload; it is not a live streaming API. Speaker recognition identifies or verifies who is speaking; it does not produce a text transcript of what was said.</p>"
    },
    {
      n: 49,
      prompt: "<p>A retailer builds a chatbot that composes personalized, original product recommendation paragraphs for each customer based on their browsing history. Which AI workload category BEST describes this?</p>",
      choices: ["Computer vision", "Text analysis", "Information extraction", "Generative AI"],
      answer: 3,
      topic: "AI Workloads",
      objective: "1.3",
      difficulty: "easy",
      explanation: "<p>Generative AI is the workload category that covers creating new original content such as text, images, or code. Composing personalized recommendation paragraphs that did not previously exist is a generative AI task.</p><p>Computer vision analyzes images and video, not text generation. Text analysis applies NLP techniques such as sentiment, entity detection, or summarization to existing text; it classifies or extracts, it does not compose new content. Information extraction pulls structured field values from source documents; it does not generate narrative text.</p>"
    },
    {
      n: 50,
      prompt: "<p>A team wants to deploy an agent that uses custom LangGraph orchestration code, runs as a durable service with autoscaling, and has its own Entra managed identity. Which agent type BEST matches this description?</p>",
      choices: ["Prompt agent configured declaratively in the Foundry portal", "Hosted agent that packages custom orchestration code on a Foundry managed endpoint", "Ephemeral agent defined only in application code via the Responses API", "A plain chat completion enhanced with function calling"],
      answer: 1,
      topic: "Generative AI Apps and Agents",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>A hosted agent is the type where you write the orchestration code (using the Agent Framework, LangGraph, OpenAI Agents SDK, or similar), package it, and Foundry runs it on a managed endpoint with autoscaling and its own Entra managed identity.</p><p>A prompt agent is declarative: you configure instructions and tools in the portal or SDK with no custom orchestration code. An ephemeral agent (Responses API) exists only in your code; no agent resource is created, and it does not provide a durable managed endpoint or Entra identity. A plain chat completion with function calling is stateless and has no persistent agent resource, autoscaling, or managed identity.</p>"
    }
  ]}]
};

