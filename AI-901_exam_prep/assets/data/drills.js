window.AI9_DATA = window.AI9_DATA || {};
window.AI9_DATA.drills = [
  {
    id: "d1-responsible",
    topic: "Responsible AI",
    title: "The Six Responsible AI Principles",
    blurb: "Fixes principle mix-ups by tying each scenario to the one principle that governs it.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A bank\u2019s loan model approves men at a noticeably higher rate than women with identical finances. Which principle is most directly at stake?",
        choices: ["Fairness", "Reliability and safety", "Transparency", "Inclusiveness"],
        answer: 0,
        tag: "Fairness",
        explanation: "<p>Fairness governs equitable treatment across demographic groups; a differing approval rate for people with identical inputs is the textbook fairness failure. Reliability and safety is about consistent, non-harmful behavior. Transparency is about explaining decisions. Inclusiveness is about whether everyone can access and use the system at all.</p>"
      },
      {
        n: 2,
        prompt: "An AI medical diagnostic tool has no documented audit process and no named team responsible when it produces a harmful recommendation. Which principle is violated?",
        choices: ["Privacy and security", "Reliability and safety", "Accountability", "Transparency"],
        answer: 2,
        tag: "Accountability",
        explanation: "<p>Accountability requires that people and organizations accept responsibility for AI outcomes and establish governance frameworks. The absence of a responsible team and audit process is an accountability failure. Transparency is about understanding how decisions are made, not about who answers for them. Privacy concerns personal data; reliability concerns consistent safe behavior.</p>"
      },
      {
        n: 3,
        prompt: "A healthcare chatbot stores patient symptom data without consent and shares it with third-party advertisers. Which principle is violated?",
        choices: ["Inclusiveness", "Privacy and security", "Fairness", "Accountability"],
        answer: 1,
        tag: "Privacy and security",
        explanation: "<p>Privacy and security requires that personal data be collected only with consent, stored safely, and not shared without authorization. Sharing symptom data with advertisers without consent is a direct privacy violation. Accountability is about governance. Inclusiveness is about accessibility. Fairness is about equitable treatment of groups.</p>"
      },
      {
        n: 4,
        prompt: "A voice assistant only understands American English clearly and struggles with users who have regional accents or speech impairments. Which principle is most relevant?",
        choices: ["Fairness", "Transparency", "Reliability and safety", "Inclusiveness"],
        answer: 3,
        tag: "Inclusiveness",
        explanation: "<p>Inclusiveness means the system must be usable by everyone regardless of ability or language variant. A voice assistant that fails for users with accents or speech impairments excludes those users. Fairness asks whether groups are treated equally in outcomes, which is related but distinct. Reliability is about consistent behavior. Transparency is about explainability.</p>"
      },
      {
        n: 5,
        prompt: "A content-recommendation system shows only content matching users\u2019 existing views, and users have no way to understand why recommendations are shown. Which principle does the lack of explanation violate?",
        choices: ["Inclusiveness", "Fairness", "Transparency", "Accountability"],
        answer: 2,
        tag: "Transparency",
        explanation: "<p>Transparency requires that people be able to understand how an AI system makes decisions. Accountability is about who is responsible when something goes wrong, not about user-facing explainability. Inclusiveness is about accessibility. Fairness asks whether groups are treated equally, which is a separate concern from unexplained outputs.</p>"
      },
      {
        n: 6,
        prompt: "During testing, an autonomous vehicle AI performs correctly in simulated environments but fails unpredictably in heavy rain. Which principle is most at risk before deployment?",
        choices: ["Reliability and safety", "Privacy and security", "Fairness", "Accountability"],
        answer: 0,
        tag: "Reliability and safety",
        explanation: "<p>Reliability and safety requires a system to behave consistently under all conditions, including unexpected ones, and fail safely rather than harmfully. Unpredictable failures in real conditions are exactly this concern. Fairness is about group equity. Accountability is about governance. Privacy concerns personal data.</p>"
      },
      {
        n: 7,
        prompt: "A hiring tool recommends fewer candidates from one ethnic group. The vendor argues the model is fair because overall accuracy is high. The equitable-outcome concern belongs to which principle?",
        choices: ["Transparency", "Accountability", "Privacy and security", "Fairness"],
        answer: 3,
        tag: "Fairness",
        explanation: "<p>Fairness requires equitable outcomes across demographic groups; high aggregate accuracy can mask biased outcomes for a subgroup, which is the classic fairness problem. Transparency is about explainability. Accountability is about governance. Privacy concerns personal data protection.</p>"
      },
      {
        n: 8,
        prompt: "A citizen with low vision cannot use a government benefit-eligibility checker because the interface has no screen-reader support. Which principle is violated?",
        choices: ["Accountability", "Inclusiveness", "Transparency", "Fairness"],
        answer: 1,
        tag: "Inclusiveness",
        explanation: "<p>Inclusiveness requires that AI systems be accessible to everyone regardless of disability; lacking screen-reader support directly excludes users with low vision. Transparency is about understanding decisions. Fairness is about equitable treatment of groups, not physical access. Accountability is about responsibility and governance.</p>"
      }
    ]
  },
  {
    id: "d1-models",
    topic: "Models and Deployment",
    title: "How Generative Models Work",
    blurb: "Builds intuition for tokens, context windows, temperature, hallucination, and multimodal input.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A user sends a very long document to a generative model. The model responds as if the early sections were never provided. What most likely caused this?",
        choices: ["The temperature was set too high", "The prompt exceeded the model\u2019s context window", "The model applied frequency penalty to repeated terms", "The system message overrode the user prompt"],
        answer: 1,
        tag: "Context window",
        explanation: "<p>The context window is the maximum number of tokens a model can hold at once; content beyond that limit is dropped, so the model behaves as if it was never sent. A high temperature affects randomness, not what is retained. Frequency penalty reduces repeated tokens in output, not in input. The system message is prepended but does not truncate user content.</p>"
      },
      {
        n: 2,
        prompt: "Which of the following best describes a token in a generative language model?",
        choices: ["A cryptographic key used to authenticate API calls", "A label assigned during supervised learning", "A unique session identifier", "A chunk of text \u2014 roughly a word or sub-word \u2014 processed as a unit"],
        answer: 3,
        tag: "Token definition",
        explanation: "<p>Tokens are the fundamental units a language model processes; a token is roughly a word or part of a word (sub-word). Session identifiers, API keys, and supervised-learning labels are all unrelated concepts. Token count determines billing and whether a prompt fits in the context window.</p>"
      },
      {
        n: 3,
        prompt: "A developer lowers temperature from 1.0 to 0.1 for customer support replies. What is the most likely effect?",
        choices: ["Replies become more focused and deterministic", "Replies become shorter because fewer tokens are sampled", "The model begins retrieving answers from the web", "Replies become more creative and varied"],
        answer: 0,
        tag: "Temperature",
        explanation: "<p>A lower temperature concentrates probability mass on the most likely tokens, making outputs more focused and repeatable. Higher temperature increases creativity. Temperature does not change output length (that is max_tokens). Web retrieval requires a separate tool such as Grounding with Bing.</p>"
      },
      {
        n: 4,
        prompt: "A model confidently states that a scientist won a Nobel Prize in 2024, but no such prize was awarded to that person. This type of error is called what?",
        choices: ["A content filter block", "A tokenization failure", "A hallucination", "A context window overflow"],
        answer: 2,
        tag: "Hallucination",
        explanation: "<p>A hallucination is a confident, fluent, factually wrong output. A tokenization failure would affect how input is read, not what is said. A context window overflow causes content to be dropped, not fabricated. A content filter block would suppress output entirely, not replace it with a wrong answer.</p>"
      },
      {
        n: 5,
        prompt: "A developer wants the model to sample only from the top 90% of the probability distribution at each step. Which parameter should they configure?",
        choices: ["frequency_penalty", "max_tokens", "temperature", "top_p"],
        answer: 3,
        tag: "Top-p sampling",
        explanation: "<p>top_p (nucleus sampling) restricts the model to the smallest set of tokens whose cumulative probability reaches the set value; 0.9 means the top 90% of probability mass. Temperature adjusts overall randomness differently. frequency_penalty discourages repeated tokens. max_tokens limits output length, not the sampling distribution.</p>"
      },
      {
        n: 6,
        prompt: "A developer passes both a text description and a product photograph to a model, asking it to generate marketing copy. Which term describes this combined input type?",
        choices: ["Retrieval-augmented generation", "Multimodal input", "Batch inference", "Fine-tuning"],
        answer: 1,
        tag: "Multimodal input",
        explanation: "<p>Multimodal input means the model accepts more than one type of data in a single prompt \u2014 here text and image. Fine-tuning changes model weights. Retrieval-augmented generation augments the prompt with searched content. Batch inference is for submitting many requests asynchronously, not for describing combined input types.</p>"
      },
      {
        n: 7,
        prompt: "A team needs to convert customer reviews into numerical vectors for semantic similarity search. Which model output is designed for this purpose?",
        choices: ["Confidence scores", "Completion tokens", "Embeddings", "SSML output"],
        answer: 2,
        tag: "Embeddings",
        explanation: "<p>Embedding models transform text into dense numerical vectors that capture semantic meaning and enable similarity search and RAG pipelines. Completion tokens are generated text. SSML is speech markup for synthesis. Confidence scores are output by classification or extraction models, not for semantic vector search.</p>"
      },
      {
        n: 8,
        prompt: "In the context of a chat API, the term \u201ccompletion\u201d refers to which part of the interaction?",
        choices: ["The text the model generates in response to the prompt", "The authentication token that closes the session", "The list of candidate tokens the model considered", "The system message sent before the conversation starts"],
        answer: 0,
        tag: "Prompt and completion",
        explanation: "<p>In the prompt-completion paradigm, the prompt is what you send and the completion is the text the model generates back. The system message is part of the prompt. Authentication tokens are API credentials. The internal candidate-token list is not exposed to the caller.</p>"
      }
    ]
  },
  {
    id: "d1-modelchoice",
    topic: "Models and Deployment",
    title: "Choosing the Right Model",
    blurb: "Matches a need \u2014 reasoning, edge, embeddings, images, audio \u2014 to the right Foundry model family.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A student-tutor app must solve multi-step calculus problems reliably, requiring several reasoning passes before answering. Which model family is best suited?",
        choices: ["text-embedding-3-large", "Phi", "o-series (o3, o4-mini)", "gpt-image-1 family"],
        answer: 2,
        tag: "Reasoning models",
        explanation: "<p>The o-series models (o3, o4-mini) are designed for deep reasoning: math, multi-step logic, and complex coding. Phi is a small model for edge and low-cost scenarios, not extended reasoning chains. gpt-image-1 generates images. text-embedding-3-large converts text to vectors for search, not for answering questions.</p>"
      },
      {
        n: 2,
        prompt: "A company wants to run a language model entirely on an edge device with no cloud connectivity and very limited memory. Which family should they evaluate first?",
        choices: ["Phi", "sora", "GPT-5 series", "o-series"],
        answer: 0,
        tag: "Edge models",
        explanation: "<p>Phi is Microsoft\u2019s family of small language models designed for edge deployment, local execution, and constrained hardware. GPT-5 and o-series are large cloud-hosted models. sora is a text-to-video generation model, not a small edge language model.</p>"
      },
      {
        n: 3,
        prompt: "A developer needs to generate images from natural language prompts using Foundry. Which model family is the current recommended choice?",
        choices: ["GPT-4o", "text-embedding-3-small", "DALL-E 3", "gpt-image-1 family"],
        answer: 3,
        tag: "Image generation model",
        explanation: "<p>The gpt-image-1 family (including gpt-image-1-mini and gpt-image-1.5) is the current recommended image-generation option; DALL-E 3 has been superseded. GPT-4o accepts image input but does not generate images. text-embedding-3-small is for semantic search vectors.</p>"
      },
      {
        n: 4,
        prompt: "A team needs to build a semantic search index over millions of documents. Which model type converts documents into searchable vectors?",
        choices: ["gpt-realtime", "text-embedding-3-large", "gpt-image-1", "sora"],
        answer: 1,
        tag: "Embedding models",
        explanation: "<p>Embedding models such as text-embedding-3-large convert text into dense numerical vectors suitable for similarity search and retrieval-augmented generation. gpt-image-1 generates images. sora generates video. gpt-realtime handles real-time audio, not text-to-vector conversion.</p>"
      },
      {
        n: 5,
        prompt: "A media company wants to generate a short promotional video clip from a text script using Foundry Models. Which family supports this (currently in preview)?",
        choices: ["sora / sora-2", "gpt-audio-preview", "text-embedding-3-small", "Phi"],
        answer: 0,
        tag: "Video generation",
        explanation: "<p>sora and sora-2 are the text-to-video generation models available in Foundry Models (currently in preview). Phi is a small language model. gpt-audio-preview handles audio input and output. text-embedding-3-small is for text embeddings.</p>"
      },
      {
        n: 6,
        prompt: "A team must choose between gpt-5-mini and gpt-5 for a high-volume customer chat service. The mini variant will most likely have which trade-off?",
        choices: ["Identical performance but no SLA", "Higher cost per token and slower latency", "Lower cost and faster latency but reduced capability on complex tasks", "Larger context window and better reasoning"],
        answer: 2,
        tag: "Mini model trade-offs",
        explanation: "<p>Smaller mini and nano variants cost less per token and respond faster, making them ideal for high-volume workloads, but they trade off some capability on complex reasoning compared with the full model. They are not more expensive, do not offer a larger context window, and do receive SLA support under the same deployment types.</p>"
      },
      {
        n: 7,
        prompt: "An application needs a model that receives spoken audio and responds with spoken audio in real time, with a language model reasoning in the loop. Which family is designed for this?",
        choices: ["whisper", "gpt-realtime or gpt-audio families", "Azure Speech in Foundry Tools", "Phi"],
        answer: 1,
        tag: "Realtime audio model",
        explanation: "<p>The gpt-realtime and gpt-audio model families handle speech-in, reasoning, and speech-out with low latency. whisper is transcription-only with no synthesis or reasoning. Azure Speech in Foundry Tools provides deterministic transcription and synthesis but no language model reasoning in the loop. Phi is a small text language model.</p>"
      },
      {
        n: 8,
        prompt: "A regulated healthcare company must ensure all inference stays within the European Union. Which selection criterion is most important?",
        choices: ["Cost per token", "Temperature range", "Context window size", "Data residency and region availability"],
        answer: 3,
        tag: "Region and residency",
        explanation: "<p>Data residency requirements govern where processing must occur and determine which deployment type (Data Zone EU or Standard regional) and which models are eligible. Context window size, cost per token, and temperature range are optimization choices but do not dictate where data is processed.</p>"
      }
    ]
  },
  {
    id: "d1-deployment",
    topic: "Models and Deployment",
    title: "Deployment Options & Configuration",
    blurb: "Distinguishes Global Standard, PTU, batch, regional, and Developer tiers plus key inference parameters.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A startup wants to call a GPT-5 model immediately with no reserved capacity and no infrastructure to manage. Which deployment type should they use?",
        choices: ["Global Batch", "Global Provisioned (PTU)", "Developer", "Global Standard"],
        answer: 3,
        tag: "Global Standard",
        explanation: "<p>Global Standard is Microsoft\u2019s recommended default: pay-per-token, no infrastructure, newest models available first, broadest regional footprint. Global Provisioned requires reserving capacity. Developer is a 24-hour evaluation tier with no SLA. Global Batch is for large asynchronous jobs, not interactive calls.</p>"
      },
      {
        n: 2,
        prompt: "A firm runs tens of thousands of API requests per minute and needs guaranteed, consistent throughput with a predictable monthly cost. Which deployment type fits?",
        choices: ["Data Zone Standard", "Global Provisioned (PTU)", "Developer", "Global Standard"],
        answer: 1,
        tag: "Provisioned throughput",
        explanation: "<p>Global Provisioned uses Provisioned Throughput Units (PTU) to reserve dedicated model capacity, delivering predictable latency and throughput for high-volume production at a reserved capacity price. Global Standard is pay-per-token with no throughput guarantee. Data Zone Standard is for residency. Developer has no SLA and expires after 24 hours.</p>"
      },
      {
        n: 3,
        prompt: "A retailer must generate descriptions for 500,000 products overnight. Low cost and a multi-hour turnaround are acceptable. Which deployment type is ideal?",
        choices: ["Developer", "Global Standard", "Global Batch", "Standard (regional)"],
        answer: 2,
        tag: "Batch deployment",
        explanation: "<p>Global Batch processes large asynchronous jobs at roughly a 50% discount, with results returned within 24 hours. It is the designed choice for high-volume offline workloads. Global Standard handles synchronous interactive requests. Standard (regional) restricts data to one region. Developer is for evaluating fine-tuned models, not production volume jobs.</p>"
      },
      {
        n: 4,
        prompt: "A developer is testing a recently fine-tuned model and needs a quick, low-commitment deployment with no uptime guarantee required. Which tier fits?",
        choices: ["Developer", "Global Provisioned (PTU)", "Data Zone Standard", "Global Batch"],
        answer: 0,
        tag: "Developer tier",
        explanation: "<p>The Developer tier is specifically for evaluating fine-tuned models: pay-per-token, 24-hour lifespan, no SLA. Global Provisioned requires committing reserved capacity. Data Zone Standard is for data residency. Global Batch is for large async jobs, not fine-tune evaluation.</p>"
      },
      {
        n: 5,
        prompt: "A team needs inference to stay within the United States or Europe but does not need to pin to a single Azure region. Which type meets this requirement?",
        choices: ["Standard (regional)", "Data Zone Standard", "Global Provisioned", "Global Standard"],
        answer: 1,
        tag: "Data zone residency",
        explanation: "<p>Data Zone Standard processes requests within a defined data zone (US, EU, or APAC), satisfying broad residency requirements without a single-region pin. Global Standard can route anywhere. Standard (regional) pins to one region, which is stricter. Global Provisioned is about throughput reservation, not residency.</p>"
      },
      {
        n: 6,
        prompt: "A model repeats the same phrase in nearly every sentence it generates. Which inference parameter should the developer adjust to reduce this?",
        choices: ["top_p", "max_tokens", "stop sequences", "frequency_penalty"],
        answer: 3,
        tag: "Frequency penalty",
        explanation: "<p>frequency_penalty penalizes tokens proportionally to how often they have already appeared, directly discouraging repeated phrases. max_tokens caps response length. stop sequences halt generation at a specific string. top_p controls the sampling distribution but does not specifically target repeated-token suppression.</p>"
      },
      {
        n: 7,
        prompt: "A customer-service model must answer only product questions and refuse all others. In which message role is this constraint sent?",
        choices: ["As a system-role message before any user turns", "As a POST body header in the HTTP request", "As a stop sequence appended to the prompt", "As a user-role message at the start"],
        answer: 0,
        tag: "System message",
        explanation: "<p>The system message is sent as a message with the \u201csystem\u201d role, placed before any user turns; it sets the model\u2019s persona and constraints. Sending it as a user-role message is incorrect usage. HTTP headers and stop sequences are unrelated mechanisms for controlling model behavior.</p>"
      },
      {
        n: 8,
        prompt: "An AI writing assistant sometimes ends mid-sentence. A low value on one inference parameter is the likely cause. Which parameter is most responsible?",
        choices: ["temperature", "presence_penalty", "max_tokens", "top_p"],
        answer: 2,
        tag: "Max tokens",
        explanation: "<p>max_tokens (or max_output_tokens) is the hard cap on generated tokens per response; a low setting truncates output mid-sentence when the limit is reached. Temperature affects randomness, not length. presence_penalty pushes the model toward new topics but does not truncate. top_p controls sampling distribution, not generation length.</p>"
      }
    ]
  },
  {
    id: "d1-workloads",
    topic: "AI Workloads",
    title: "Matching a Business Problem to an AI Workload",
    blurb: "Given a scenario, identify the correct AI workload \u2014 including the generative-vs-agentic distinction.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A customer service platform automatically routes emails, looks up order data, sends confirmation replies, and escalates complex cases \u2014 all without human intervention per task. Which workload describes this system?",
        choices: ["Agentic AI", "Text analysis", "Information extraction", "Generative AI"],
        answer: 0,
        tag: "Agentic AI workload",
        explanation: "<p>Agentic AI is defined by autonomous multi-step action: the system uses tools, makes decisions, and executes tasks across multiple steps without per-step human oversight. Generative AI produces content (text, images) but does not act autonomously across systems. Text analysis classifies or extracts information from text. Information extraction pulls structured data from documents.</p>"
      },
      {
        n: 2,
        prompt: "A marketing team uses an AI tool to write product taglines and blog post drafts from a short brief. Which workload applies?",
        choices: ["Information extraction", "Speech workload", "Computer vision", "Generative AI"],
        answer: 3,
        tag: "Generative AI workload",
        explanation: "<p>Generative AI produces new content \u2014 text, images, or other media \u2014 from an input prompt; writing taglines and drafts is a classic generative workload. Speech workloads convert between audio and text. Computer vision interprets images. Information extraction pulls structured fields from existing documents.</p>"
      },
      {
        n: 3,
        prompt: "A hospital transcribes doctor\u2013patient conversations from audio recordings and converts them to written notes. Which workload is this?",
        choices: ["Text analysis", "Speech", "Agentic AI", "Computer vision"],
        answer: 1,
        tag: "Speech workload",
        explanation: "<p>Converting audio speech to written text is the speech-to-text (transcription) workload, which belongs to the Speech category. Computer vision works with images, not audio. Text analysis processes text that already exists in written form. Agentic AI involves autonomous multi-step actions across tools, not a single transcription task.</p>"
      },
      {
        n: 4,
        prompt: "An app scans incoming invoices to automatically extract vendor name, invoice number, and line-item totals. Which workload applies?",
        choices: ["Speech", "Computer vision", "Information extraction", "Generative AI"],
        answer: 2,
        tag: "Information extraction workload",
        explanation: "<p>Information extraction pulls structured fields from documents such as invoices; this is the core use case of services like Content Understanding and Document Intelligence. Generative AI produces new content. Speech converts audio. Computer vision analyzes images, though a document scan could involve vision, the workload category for pulling structured fields from documents is information extraction.</p>"
      },
      {
        n: 5,
        prompt: "A retail site automatically tags product images, checks for restricted items, and identifies shelf placement from warehouse camera feeds. Which workload is this?",
        choices: ["Speech", "Computer vision", "Agentic AI", "Text analysis"],
        answer: 1,
        tag: "Computer vision workload",
        explanation: "<p>Computer vision interprets images and video to classify objects, detect items, and derive insights from visual data. Text analysis works with written text. Speech works with audio. Agentic AI involves autonomous multi-step actions; here the system is performing visual interpretation, not orchestrating tools across systems.</p>"
      },
      {
        n: 6,
        prompt: "A news app detects the sentiment and key topics of articles as they are published. Which workload is being applied?",
        choices: ["Text analysis", "Computer vision", "Speech", "Agentic AI"],
        answer: 0,
        tag: "Text analysis workload",
        explanation: "<p>Text analysis covers sentiment analysis, key phrase extraction, entity detection, and related tasks that derive insights from existing written text. Computer vision processes images. Speech processes audio. Agentic AI involves autonomous multi-step action, not a single text-processing task.</p>"
      },
      {
        n: 7,
        prompt: "A travel booking agent researches flight options, books tickets, emails the itinerary, and adds the trip to a calendar \u2014 triggered by a single user request. This is distinct from plain generative AI because it does what?",
        choices: ["Applies named entity recognition", "Produces longer text outputs", "Uses tools to take autonomous multi-step actions across external systems", "Requires a custom neural voice"],
        answer: 2,
        tag: "Generative vs. agentic",
        explanation: "<p>Agentic AI differs from generative AI in that it uses tools to take autonomous multi-step actions across external systems \u2014 booking, emailing, and scheduling are actions on real systems, not just content generation. Text length, custom neural voice, and named entity recognition are unrelated distinguishing factors.</p>"
      },
      {
        n: 8,
        prompt: "An accessibility feature converts spoken commands from a user into text for an application to process. Which workload category does the speech-to-text conversion belong to?",
        choices: ["Information extraction", "Generative AI", "Computer vision", "Speech"],
        answer: 3,
        tag: "Speech workload",
        explanation: "<p>Speech-to-text (transcription) is a speech workload. Generative AI creates new content from prompts. Computer vision interprets visual data. Information extraction pulls structured fields from documents, not from real-time audio input.</p>"
      }
    ]
  },
  {
    id: "d1-textanalysis",
    topic: "AI Workloads",
    title: "Text Analysis Techniques",
    blurb: "Identifies the right Language feature \u2014 NER, sentiment, PII, summarization \u2014 for each scenario.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A compliance team needs to scan support chat logs to find and redact personal data such as names, email addresses, and phone numbers. Which Language feature should they use?",
        choices: ["Key phrase extraction", "Sentiment analysis", "PII detection", "Language detection"],
        answer: 2,
        tag: "PII detection",
        explanation: "<p>PII detection identifies and can redact personally identifiable information such as names, emails, and phone numbers from text. Key phrase extraction finds important topics, not personal identifiers. Sentiment analysis measures opinion polarity. Language detection identifies the language of a text, not personal data within it.</p>"
      },
      {
        n: 2,
        prompt: "An e-commerce platform wants to understand which product features customers mention most often in their reviews. Which feature is most appropriate?",
        choices: ["PII detection", "Key phrase extraction", "Language detection", "Extractive summarization"],
        answer: 1,
        tag: "Key phrase extraction",
        explanation: "<p>Key phrase extraction identifies the most important words and phrases in a document, making it ideal for surfacing frequently mentioned product features. PII detection finds personal identifiers. Language detection identifies the language. Extractive summarization picks representative sentences, not individual key phrases from many reviews.</p>"
      },
      {
        n: 3,
        prompt: "A customer feedback system needs to determine whether each review is positive, negative, or mixed and also identify which specific aspect (e.g., price, quality) drives that sentiment. Which feature covers both needs?",
        choices: ["Extractive summarization", "PII detection", "Named entity recognition", "Sentiment analysis and opinion mining"],
        answer: 3,
        tag: "Sentiment and opinion mining",
        explanation: "<p>Sentiment analysis and opinion mining returns both the overall sentiment polarity and aspect-level opinions, identifying which features are praised or criticized. Named entity recognition identifies entities but not sentiment. Extractive summarization produces shorter text. PII detection finds personal data, not opinions.</p>"
      },
      {
        n: 4,
        prompt: "A multilingual support desk receives tickets in many languages. Before routing, the system needs to identify which language each ticket is written in. Which feature handles this?",
        choices: ["Language detection", "Named entity recognition", "Extractive summarization", "Sentiment analysis"],
        answer: 0,
        tag: "Language detection",
        explanation: "<p>Language detection identifies the natural language of a text document and returns the identified language and a confidence score. Named entity recognition identifies entities within text. Extractive summarization produces shorter text. Sentiment analysis measures opinion polarity, not language identity.</p>"
      },
      {
        n: 5,
        prompt: "A news aggregator needs to shorten articles by selecting the most representative existing sentences from each article, without writing any new text. Which summarization type should it use?",
        choices: ["Named entity recognition", "Opinion mining", "Abstractive summarization", "Extractive summarization"],
        answer: 3,
        tag: "Extractive summarization",
        explanation: "<p>Extractive summarization selects and returns existing sentences from the source document; no new text is written. Abstractive summarization generates new sentences that may not appear verbatim in the source. Named entity recognition finds entities, not summaries. Opinion mining identifies aspect-level sentiment, not summaries.</p>"
      },
      {
        n: 6,
        prompt: "A legal research app needs summaries of lengthy contracts that are written in plain language and may combine information from multiple sections, rather than quoting the contract verbatim. Which feature is appropriate?",
        choices: ["PII detection", "Extractive summarization", "Abstractive summarization", "Key phrase extraction"],
        answer: 2,
        tag: "Abstractive summarization",
        explanation: "<p>Abstractive summarization generates new sentences that paraphrase and synthesize content from across the document, producing readable plain-language summaries. Extractive summarization only copies existing sentences. Key phrase extraction returns keywords, not a summary. PII detection finds personal data.</p>"
      },
      {
        n: 7,
        prompt: "A news pipeline needs to identify mentions of organizations, people, and geographic locations within articles to build a knowledge graph. Which feature should it use?",
        choices: ["Named entity recognition", "PII detection", "Language detection", "Sentiment analysis"],
        answer: 0,
        tag: "Named entity recognition",
        explanation: "<p>Named entity recognition (NER) identifies and categorizes entities such as people, organizations, and locations in text. Language detection identifies the language. Sentiment analysis measures opinion polarity. PII detection focuses on personally identifiable information, which overlaps with NER person entities but is a separate feature tuned for compliance use cases.</p>"
      },
      {
        n: 8,
        prompt: "A developer needs consistent, typed sentiment scores from thousands of short product reviews at low latency and predictable cost. Should they use a purpose-built Language feature or a generative model?",
        choices: ["A generative model, because it is more accurate for sentiment", "A purpose-built Language feature, because it provides consistent typed output at lower latency and cost", "A generative model, because Language features only work in English", "A purpose-built Language feature, but only if reviews exceed 512 tokens"],
        answer: 1,
        tag: "Purpose-built vs. generative",
        explanation: "<p>Purpose-built Language features are preferred when you need consistent typed output, low latency, and predictable cost at scale; sentiment analysis is exactly this scenario. Generative models are not more accurate for this task and cost more per call. Language features support many languages, not just English. The 512-token constraint is not a real restriction that changes this recommendation.</p>"
      }
    ]
  },
  {
    id: "d2-prompts",
    topic: "Generative AI Apps and Agents",
    title: "System Prompts & Prompt Engineering",
    blurb: "Covers system-vs-user prompts, few-shot examples, format instructions, and why prompting comes first.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer wants the model to always respond in JSON with two fields: \u201csummary\u201d and \u201csentiment.\u201d Where is the most appropriate place to specify this requirement?",
        choices: ["In the system message", "By setting top_p to 0", "By reducing max_tokens", "In a stop sequence"],
        answer: 0,
        tag: "System message format",
        explanation: "<p>The system message sets persistent instructions for the model\u2019s behavior \u2014 including output format \u2014 before any user turn. A stop sequence halts generation but does not shape format. Setting top_p to 0 maximizes determinism but does not specify a structure. Reducing max_tokens limits length, not format.</p>"
      },
      {
        n: 2,
        prompt: "A model keeps giving vague answers. A developer adds three labeled input-output examples directly in the prompt. What prompt engineering technique is this?",
        choices: ["Zero-shot prompting", "Fine-tuning", "Few-shot prompting", "Retrieval-augmented generation"],
        answer: 2,
        tag: "Few-shot prompting",
        explanation: "<p>Few-shot prompting includes multiple examples of the desired input-output pattern in the prompt itself, guiding the model toward a specific style or format without changing its weights. Zero-shot includes no examples. Fine-tuning updates model weights with a training dataset. RAG augments the prompt with retrieved documents, not handcrafted examples.</p>"
      },
      {
        n: 3,
        prompt: "A prompt asks the model to classify a customer email with no examples provided. Which term describes this approach?",
        choices: ["One-shot prompting", "Zero-shot prompting", "Fine-tuning", "Few-shot prompting"],
        answer: 1,
        tag: "Zero-shot prompting",
        explanation: "<p>Zero-shot prompting asks the model to perform a task without any examples; the model relies solely on its pretrained knowledge and the task description. Few-shot includes multiple examples. One-shot includes exactly one example. Fine-tuning updates model weights and is not a prompt technique.</p>"
      },
      {
        n: 4,
        prompt: "A developer adds a single labeled example to a prompt before asking the model to classify a new input. What is this technique called?",
        choices: ["Few-shot prompting", "Grounding", "Zero-shot prompting", "One-shot prompting"],
        answer: 3,
        tag: "One-shot prompting",
        explanation: "<p>One-shot prompting includes exactly one example to guide the model\u2019s output format or reasoning. Zero-shot uses no examples. Few-shot uses multiple examples. Grounding means providing the model with retrieved source material to answer from, not a labeled classification example.</p>"
      },
      {
        n: 5,
        prompt: "A model gives a factually wrong answer about a company\u2019s holiday schedule. Before considering fine-tuning or RAG, what should the developer try first?",
        choices: ["Add a frequency penalty", "Deploy a larger model", "Improve the prompt by specifying the task and providing the schedule as source material", "Increase temperature"],
        answer: 2,
        tag: "Prompt engineering first",
        explanation: "<p>Prompt engineering is always the first lever: it is free and fast. Providing the schedule as source material in the prompt (a simple form of grounding) addresses the knowledge gap immediately. Deploying a larger model and fine-tuning are costly and slower. Increasing temperature adds randomness and would likely worsen accuracy. Frequency penalty affects repetition, not factual grounding.</p>"
      },
      {
        n: 6,
        prompt: "A system prompt tells the model \u201cYou are a concise assistant. Respond with no more than two sentences and address a non-technical audience.\u201d Which two prompt engineering best practices does this demonstrate?",
        choices: ["Specifying format and specifying the audience", "RAG and few-shot examples", "Stop sequences and temperature tuning", "Zero-shot and fine-tuning"],
        answer: 0,
        tag: "Specific instructions",
        explanation: "<p>The prompt specifies format (max two sentences) and audience (non-technical), which are both key best practices for prompt engineering. Zero-shot and fine-tuning are unrelated. RAG retrieves content; few-shot provides examples. Stop sequences and temperature are inference parameters, not prompt-writing techniques.</p>"
      },
      {
        n: 7,
        prompt: "A developer wants the model to answer only from a provided policy document and not use its general knowledge. They paste the document into the prompt. What technique is this an example of?",
        choices: ["Custom neural voice", "Fine-tuning", "Few-shot prompting", "Providing source material in the prompt"],
        answer: 3,
        tag: "Source material grounding",
        explanation: "<p>Providing source material directly in the prompt \u2014 the policy document \u2014 grounds the model\u2019s answer in that content and can reduce hallucination for knowledge-bound tasks. Fine-tuning updates weights. Few-shot prompting provides input-output examples. Custom neural voice is a speech synthesis feature, unrelated to text prompting.</p>"
      },
      {
        n: 8,
        prompt: "A team wants the model to write SQL queries from natural language. They include the database schema and two example query-result pairs in the prompt. Which techniques are they combining?",
        choices: ["Zero-shot and fine-tuning", "Source material and few-shot prompting", "RAG and abstractive summarization", "System message and stop sequences"],
        answer: 1,
        tag: "Combined techniques",
        explanation: "<p>The schema is source material that grounds the model in the exact table and column names, while the two query-result pairs are few-shot examples that demonstrate the desired format. Zero-shot and fine-tuning are not in play. RAG involves retrieving content from a search index, not pasting a schema. Stop sequences control generation end points, not SQL format.</p>"
      }
    ]
  },
  {
    id: "d2-portal",
    topic: "Generative AI Apps and Agents",
    title: "The Foundry Portal & Projects",
    blurb: "Maps the Foundry resource, project, portal features, RBAC roles, and the classic-vs-current architecture.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer needs a URL endpoint to connect their application to Foundry. Where does the project endpoint come from?",
        choices: ["It is the Azure subscription management URL", "It is formed from the Foundry resource and project name", "It is generated when a managed compute deployment is created", "It is the Azure OpenAI endpoint for the deployed model"],
        answer: 1,
        tag: "Project endpoint",
        explanation: "<p>The project endpoint has the form https://resource-name.services.ai.azure.com/api/projects/project-name; it is constructed from the Foundry resource and project name. It is not a subscription URL, not tied to managed compute, and not the same as an Azure OpenAI endpoint.</p>"
      },
      {
        n: 2,
        prompt: "Which of the following items lives inside a Foundry project rather than at the Foundry resource level?",
        choices: ["The Azure region where the resource was created", "The Entra tenant directory", "Azure subscription billing alerts", "Model deployments, agents, playgrounds, and evaluations"],
        answer: 3,
        tag: "Project contents",
        explanation: "<p>A Foundry project is the scoping unit for model deployments, agents, playgrounds, evaluations, connections, toolboxes, and observability. Billing alerts are subscription-level. The Azure region is set at resource creation. The Entra tenant is an identity infrastructure concept above the project level.</p>"
      },
      {
        n: 3,
        prompt: "An organization needs to give a data scientist permission to deploy models and create agents in a project, but not to manage the Foundry resource itself. Which RBAC role is appropriate?",
        choices: ["Foundry Project Manager", "Foundry Owner", "Foundry User", "Foundry Account Owner"],
        answer: 0,
        tag: "RBAC roles",
        explanation: "<p>Foundry Project Manager grants permissions scoped to a project, covering deployments and agents but not resource-level administration. Foundry Account Owner has resource-level control. Foundry Owner is broader. Foundry User has read/use permissions but not the ability to manage deployments and create agents.</p>"
      },
      {
        n: 4,
        prompt: "A team wants to interactively test a newly deployed model by sending prompts and reviewing responses inside the Foundry portal without writing any code. Which portal feature do they use?",
        choices: ["The toolbox", "Evaluations", "The playground", "Connections"],
        answer: 2,
        tag: "Playground",
        explanation: "<p>The playground in the Foundry portal allows interactive prompt testing against a deployed model with no code required. Evaluations run structured quality assessments. Connections link to external services such as Azure AI Search. The toolbox groups tools for agents behind an MCP endpoint.</p>"
      },
      {
        n: 5,
        prompt: "A colleague mentions they are still using an \u201cAI hub\u201d with \u201chub-based projects.\u201d What is the current Foundry term for this older architecture?",
        choices: ["Managed compute deployment", "Developer tier deployment", "Foundry resource and Foundry project", "Foundry (classic)"],
        answer: 3,
        tag: "Foundry classic",
        explanation: "<p>Foundry (classic) refers to the older hub-based architecture; it was deprecated on July 15, 2026. The current architecture uses a Foundry resource (top-level) and Foundry project. Managed compute and Developer tier are deployment options, not architectural terms.</p>"
      },
      {
        n: 6,
        prompt: "A Foundry resource is created as which type of Azure resource?",
        choices: ["A CognitiveServices account with the OpenAI kind", "An AIServices account with allow-project-management enabled", "A Machine Learning workspace", "An App Service Plan with AI extensions"],
        answer: 1,
        tag: "Foundry resource type",
        explanation: "<p>A Foundry resource is an AIServices account created with --allow-project-management true; this flag enables the project management capabilities that distinguish it from a plain Foundry Tools endpoint. The CognitiveServices/OpenAI kind is the older pre-rename form. A Machine Learning workspace is a separate service. App Service Plans are for web app hosting.</p>"
      },
      {
        n: 7,
        prompt: "A user has the Foundry User role on a project. Which action can they perform?",
        choices: ["Assign RBAC roles to other users", "Delete the Foundry resource", "Use model deployments and existing agents in the project", "Create new model deployments in the project"],
        answer: 2,
        tag: "Foundry User role",
        explanation: "<p>Foundry User grants the ability to use (call) deployed models and interact with existing agents within the project. Deleting the resource and assigning RBAC roles require Owner or Account Owner. Creating new deployments requires at least Foundry Project Manager permissions.</p>"
      },
      {
        n: 8,
        prompt: "A developer wants to connect a Foundry project to an existing Azure AI Search index so that agents can retrieve documents from it. Where in the portal is this configured?",
        choices: ["Connections", "Toolbox", "Evaluations", "Playground"],
        answer: 0,
        tag: "Connections",
        explanation: "<p>Connections in a Foundry project link to external services such as Azure AI Search, storage accounts, and other Foundry Tools; configuring a connection to a search index is done here. Evaluations run quality assessments. The playground is for interactive testing. The toolbox groups tools for agent use.</p>"
      }
    ]
  },
  {
    id: "d2-sdk",
    topic: "Generative AI Apps and Agents",
    title: "The Foundry SDK & Chat Clients",
    blurb: "Drills the AIProjectClient, project endpoint, responses.create(), and multi-turn conversation patterns.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer writes: project = AIProjectClient(endpoint=..., credential=DefaultAzureCredential()). What does DefaultAzureCredential provide?",
        choices: ["A JWT token generated by the model endpoint", "An API key stored in environment variables", "Keyless Entra-based authentication that tries multiple credential sources automatically", "A shared access signature for blob storage"],
        answer: 2,
        tag: "DefaultAzureCredential",
        explanation: "<p>DefaultAzureCredential is from the Azure Identity library and automatically tries multiple Entra-based authentication sources (managed identity, Azure CLI, VS Code, etc.) in order, enabling keyless authentication without hardcoding secrets. It is not an API key, an SAS token, or a model-generated JWT.</p>"
      },
      {
        n: 2,
        prompt: "A team uses the Foundry SDK 2.x. Which Python package do they install?",
        choices: ["azure-ai-projects", "azure-ai-foundry-classic", "azure-cognitiveservices-language", "openai"],
        answer: 0,
        tag: "SDK package",
        explanation: "<p>The Foundry SDK 2.x is the azure-ai-projects package; version 2.x is for the current Foundry architecture and is API-incompatible with 1.x (Foundry classic). The openai package is the base library but not the Foundry-specific SDK. azure-cognitiveservices-language is a legacy package. azure-ai-foundry-classic is not a real package name.</p>"
      },
      {
        n: 3,
        prompt: "A snippet reads: openai = project.get_openai_client(). What does this method return?",
        choices: ["A list of deployed model names in the project", "A new conversation object for multi-turn chat", "A raw HTTP session for the Azure portal", "An OpenAI client pre-configured with the project\u2019s credentials and endpoint"],
        answer: 3,
        tag: "get_openai_client",
        explanation: "<p>project.get_openai_client() returns an OpenAI-compatible client already configured with the Foundry project\u2019s endpoint and Entra credentials, so the developer does not need to set endpoint and key manually. It does not return an HTTP session, a list of deployments, or a conversation object.</p>"
      },
      {
        n: 4,
        prompt: "A snippet calls: response = openai.responses.create(model=\"gpt-5-mini\", input=\"Hello\"). What should the value of model= be?",
        choices: ["The model family name, such as \u201cgpt-5\u201d", "The deployment name configured in the Foundry project", "The Azure region where the model is hosted", "The project endpoint URL"],
        answer: 1,
        tag: "Deployment name",
        explanation: "<p>In the Foundry SDK, the model= parameter takes the deployment name \u2014 the name given when the model was deployed in the project \u2014 not the model family name. A deployment named \u201cgpt-5-mini\u201d would match a deployment of gpt-5-mini but the name is what matters, not the family. The region and endpoint URL are not passed here.</p>"
      },
      {
        n: 5,
        prompt: "A developer creates a conversation with: conversation = openai.conversations.create(). Then calls responses.create(conversation=conversation.id, input=\u201cFirst question\u201d). What does passing conversation.id accomplish on the next turn?",
        choices: ["It allows the model to retain context from previous turns in the conversation", "It routes the request to a different deployment", "It attaches a file to the conversation", "It resets the conversation so the model forgets prior context"],
        answer: 0,
        tag: "Multi-turn conversation",
        explanation: "<p>Reusing conversation.id in subsequent responses.create() calls is what makes a conversation multi-turn: the Foundry platform stores and replays the conversation history so the model has context from prior turns. It does not reset context, change routing, or attach files.</p>"
      },
      {
        n: 6,
        prompt: "A developer needs to generate embeddings using an Azure OpenAI embedding deployment. Can they use the Foundry SDK project endpoint for this?",
        choices: ["No, embeddings require the azure-cognitiveservices-language package", "Yes, project.get_openai_client() routes embedding requests automatically", "No, embedding requests must use the resource\u2019s OpenAI endpoint directly", "Yes, but only with the Global Batch deployment type"],
        answer: 2,
        tag: "Embeddings endpoint",
        explanation: "<p>The Foundry SDK project endpoint does not currently route embedding requests; developers must use the OpenAI SDK pointed at the resource\u2019s dedicated OpenAI endpoint (https://resource.openai.azure.com/openai/v1/). Batch deployment type and the language package are irrelevant to this routing constraint.</p>"
      },
      {
        n: 7,
        prompt: "In Foundry SDK 2.x, which API is the current model for multi-turn agent conversations, replacing the older threads/messages/runs pattern?",
        choices: ["Threads and runs", "Conversations and responses", "Pipelines and transforms", "Sessions and completions"],
        answer: 1,
        tag: "Conversations and responses",
        explanation: "<p>Foundry SDK 2.x uses conversations and responses as the current multi-turn model; conversations.create() and responses.create() with a conversation.id replace the older threads/messages/runs vocabulary from the OpenAI Assistants API used by Foundry (classic). Sessions, pipelines, and transforms are not Foundry SDK multi-turn terms.</p>"
      },
      {
        n: 8,
        prompt: "A script instantiates AIProjectClient with endpoint=\"https://myres.services.ai.azure.com/api/projects/myproj\". What is \u201cmyres\u201d in this URL?",
        choices: ["The deployment name of the model", "The Entra tenant ID", "The Azure region name", "The Foundry resource name"],
        answer: 3,
        tag: "Project endpoint structure",
        explanation: "<p>In the project endpoint format https://resource-name.services.ai.azure.com/api/projects/project-name, the subdomain before .services.ai.azure.com is the Foundry resource name. The Azure region, deployment name, and Entra tenant ID do not appear in the project endpoint URL in this position.</p>"
      }
    ]
  },
  {
    id: "d2-agents",
    topic: "Generative AI Apps and Agents",
    title: "Agent Anatomy \u2014 Instructions, Tools & Conversations",
    blurb: "Distinguishes agents from chat, prompt vs hosted agents, and the core components of the Foundry Agent Service.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "What is the fundamental difference between a plain chat completion and an agent built with the Foundry Agent Service?",
        choices: ["An agent requires a managed compute deployment", "A chat completion runs in the cloud while agents run locally", "A chat completion uses a larger model", "An agent pairs a model with persistent instructions, tools, and the ability to run multiple steps"],
        answer: 3,
        tag: "Agent vs chat completion",
        explanation: "<p>A chat completion is a single stateless request-response. An agent combines a model with persistent instructions, a set of tools it may invoke, optional knowledge, and multi-step execution and conversation memory. Model size, deployment type, and execution location do not define the distinction.</p>"
      },
      {
        n: 2,
        prompt: "A product manager configures an agent\u2019s behavior entirely in the portal \u2014 choosing a model, writing instructions, and adding tools \u2014 with no application code to maintain. Which agent type is this?",
        choices: ["Ephemeral agent", "Prompt agent", "Custom neural agent", "Hosted agent"],
        answer: 1,
        tag: "Prompt agent",
        explanation: "<p>A prompt agent is declarative: you configure instructions, model, and tools in the portal or via the SDK and Foundry hosts and runs it with no orchestration code to maintain. A hosted agent requires you to write and package orchestration code. An ephemeral agent definition lives only in your code with no persisted agent resource. Custom neural agent is not an agent type.</p>"
      },
      {
        n: 3,
        prompt: "A team writes custom LangGraph orchestration code, packages it, and deploys it so that Foundry manages the endpoint, autoscaling, and Entra identity. Which agent type is this?",
        choices: ["Toolbox agent", "Prompt agent", "Hosted agent", "Ephemeral agent"],
        answer: 2,
        tag: "Hosted agent",
        explanation: "<p>A hosted agent is one where the developer writes the orchestration code (using Agent Framework, LangGraph, OpenAI Agents SDK, etc.) and Foundry runs it with a managed endpoint, autoscaling, and managed identity. Prompt agents require no code. Ephemeral agents have no persisted resource. Toolbox agent is not an agent type.</p>"
      },
      {
        n: 4,
        prompt: "An agent definition is created entirely inside application code using PromptAgentDefinition with no agent resource persisted in the portal. What is this called?",
        choices: ["Ephemeral agent", "Stateless agent", "Prompt agent", "Hosted agent"],
        answer: 0,
        tag: "Ephemeral agent",
        explanation: "<p>An ephemeral agent definition lives only in application code via the Responses API; no agent resource is created in Foundry. Prompt and hosted agents both create a persisted agent resource. Stateless agent is not a Foundry term.</p>"
      },
      {
        n: 5,
        prompt: "Which component of a Foundry agent provides the Entra managed identity used when calling external services such as Azure AI Search or APIs?",
        choices: ["Instructions", "Identity", "Toolbox", "Tools"],
        answer: 1,
        tag: "Agent identity",
        explanation: "<p>Each Foundry agent has an Entra managed identity component that the agent uses when calling external services on its own behalf, without requiring user credentials. Tools are the capabilities the agent can invoke. Instructions define behavior. The toolbox groups tools behind an MCP endpoint but is not the identity source.</p>"
      },
      {
        n: 6,
        prompt: "What is a toolbox in the Foundry Agent Service?",
        choices: ["The set of Language features available in Foundry Tools", "A named set of RBAC permissions for an agent", "A collection of prebuilt agents ready to deploy", "A grouping of tools exposed behind a single MCP endpoint"],
        answer: 3,
        tag: "Toolbox",
        explanation: "<p>A toolbox groups one or more tools behind a single Model Context Protocol (MCP) endpoint, making them accessible to an agent through a unified interface. It is not a collection of prebuilt agents, a set of Language features, or an RBAC permission set.</p>"
      },
      {
        n: 7,
        prompt: "In the current Foundry SDK 2.x multi-turn model, what is the role of conversations.create()?",
        choices: ["It creates a persisted conversation object whose ID is reused across turns to maintain context", "It authenticates the agent with Entra ID", "It compiles the agent\u2019s instructions into a prompt template", "It deploys a new model version to the project"],
        answer: 0,
        tag: "Conversations create",
        explanation: "<p>conversations.create() instantiates a persisted conversation whose ID is then passed to each responses.create() call; this is what makes the model remember prior turns. It does not deploy models, handle authentication (DefaultAzureCredential does that), or compile instructions.</p>"
      },
      {
        n: 8,
        prompt: "A developer writes the agent\u2019s system-level guidance by setting which component?",
        choices: ["Identity", "Toolbox", "Instructions", "Tools"],
        answer: 2,
        tag: "Agent instructions",
        explanation: "<p>Instructions are the system-level guidance that define what the agent is, what it can do, how it should behave, and any constraints \u2014 analogous to a system message but persisted as part of the agent definition. Tools are capabilities. Identity is the Entra managed identity. Toolbox groups tools behind an MCP endpoint.</p>"
      }
    ]
  },
  {
    id: "d2-agenttools",
    topic: "Generative AI Apps and Agents",
    title: "Agent Tools & Grounding",
    blurb: "Picks the right tool \u2014 file search, Bing, function calling, MCP, A2A \u2014 for each agent scenario.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "An agent needs to answer questions from a set of uploaded PDF manuals. Which agent tool is designed for vector search over uploaded files?",
        choices: ["File search", "Grounding with Bing", "Azure Functions", "Code interpreter"],
        answer: 0,
        tag: "File search tool",
        explanation: "<p>File search performs vector search over files that have been uploaded to the agent, enabling the agent to retrieve relevant passages from PDFs or other documents. Code interpreter runs Python code. Grounding with Bing searches the live web. Azure Functions calls external serverless functions; none of these are designed for searching uploaded files.</p>"
      },
      {
        n: 2,
        prompt: "An agent needs to retrieve current stock prices from the web to answer user questions. Which tool enables grounded web search?",
        choices: ["Azure AI Search", "File search", "Code interpreter", "Grounding with Bing"],
        answer: 3,
        tag: "Grounding with Bing",
        explanation: "<p>Grounding with Bing connects the agent to live web search, enabling retrieval of current information. File search searches uploaded files, not the web. Code interpreter runs Python but cannot search the web by itself. Azure AI Search queries a private index, not the live public web.</p>"
      },
      {
        n: 3,
        prompt: "An agent must write and run a Python script to parse a CSV file and return aggregated statistics to the user. Which tool handles this?",
        choices: ["File search", "Code interpreter", "Grounding with Bing", "OpenAPI tools"],
        answer: 1,
        tag: "Code interpreter",
        explanation: "<p>Code interpreter provides a sandboxed Python execution environment; the agent can write code, run it, and return computed results to the user. File search retrieves content from uploaded files. Grounding with Bing searches the web. OpenAPI tools call external APIs defined by an OpenAPI spec.</p>"
      },
      {
        n: 4,
        prompt: "A developer wants an agent to call a custom REST API that has an OpenAPI 3.0 spec. Which tool type is designed for this?",
        choices: ["Azure Functions", "Grounding with Bing", "OpenAPI tools", "Agent-to-agent (A2A)"],
        answer: 2,
        tag: "OpenAPI tools",
        explanation: "<p>OpenAPI tools allow the agent to call any REST API described by an OpenAPI specification, with the agent generating the correct request from the spec. Azure Functions calls serverless functions but is a different invocation model. Grounding with Bing is for web search. A2A routes to another Foundry agent, not an external REST API.</p>"
      },
      {
        n: 5,
        prompt: "A team wants a general-purpose orchestrator agent to delegate specialized tasks to two domain-specific agents. Which tool enables agent-to-agent coordination?",
        choices: ["MCP (Model Context Protocol)", "Agent-to-agent (A2A)", "Code interpreter", "Azure AI Search"],
        answer: 1,
        tag: "Agent-to-agent A2A",
        explanation: "<p>The Agent-to-agent (A2A) tool allows one Foundry agent to route tasks to other specialist agents, enabling multi-agent architectures where an orchestrator delegates to subagents. Azure AI Search queries a knowledge index. MCP exposes a toolbox endpoint but does not route between agents. Code interpreter runs Python locally.</p>"
      },
      {
        n: 6,
        prompt: "An agent needs to search a private SharePoint document library to answer questions about internal company policies. Which tool provides this access?",
        choices: ["SharePoint tool", "Azure Functions", "Grounding with Bing", "File search"],
        answer: 0,
        tag: "SharePoint tool",
        explanation: "<p>The SharePoint tool in the Foundry Agent Service connects the agent to SharePoint document libraries for internal document retrieval. Grounding with Bing searches the public web. File search works with files uploaded directly to the agent. Azure Functions invokes serverless compute and does not include a built-in SharePoint connector.</p>"
      },
      {
        n: 7,
        prompt: "A developer wants to query a private Azure AI Search index so the agent can retrieve company knowledge base articles. Which tool is appropriate?",
        choices: ["Grounding with Bing", "File search", "Azure AI Search", "Code interpreter"],
        answer: 2,
        tag: "Azure AI Search tool",
        explanation: "<p>The Azure AI Search tool connects an agent to a private Azure AI Search index, enabling retrieval-augmented generation from a managed knowledge base. Grounding with Bing targets the public web. File search covers uploaded agent files. Code interpreter runs Python code.</p>"
      },
      {
        n: 8,
        prompt: "A single agent handles all customer interactions for a small business. Later, the team splits tasks among an order agent, a billing agent, and a support agent coordinated by an orchestrator. Which pattern shift does this represent?",
        choices: ["Serverless API to managed compute", "Zero-shot to few-shot prompting", "Prompt agent to hosted agent", "Single-agent to multi-agent"],
        answer: 3,
        tag: "Single vs multi-agent",
        explanation: "<p>Moving from one agent handling everything to an orchestrator routing to specialist subagents is the single-agent to multi-agent pattern; the A2A tool enables this coordination in Foundry. Prompt-to-hosted is about agent type, not topology. Serverless-to-managed compute is a deployment choice. Zero-to-few-shot is a prompting technique.</p>"
      }
    ]
  },
  {
    id: "d2-text",
    topic: "Text and Speech",
    title: "Text Analysis in Practice",
    blurb: "Maps real scenarios to Azure Language features and decides when a generative model wins instead.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer needs to detect whether a document is written in French, Spanish, or English before routing it for translation. Which Azure Language feature applies?",
        choices: ["Named entity recognition", "Sentiment analysis", "Language detection", "PII detection"],
        answer: 2,
        tag: "Language detection",
        explanation: "<p>Language detection identifies the language of a document and returns the identified language code and a confidence score. Named entity recognition identifies entities within the text. Sentiment analysis measures opinion polarity. PII detection finds personally identifiable information.</p>"
      },
      {
        n: 2,
        prompt: "A social media monitoring tool must identify positive, negative, and neutral posts AND determine which specific product features are praised or criticized. Which single feature covers both?",
        choices: ["Language detection", "Sentiment analysis and opinion mining", "Key phrase extraction", "Named entity recognition"],
        answer: 1,
        tag: "Sentiment and opinion mining",
        explanation: "<p>Sentiment analysis and opinion mining returns document-level polarity and aspect-level opinions (e.g., \u201cbattery life\u201d is praised, \u201cprice\u201d is criticized). Key phrase extraction identifies important terms but not sentiment. Named entity recognition identifies entity types. Language detection identifies the language.</p>"
      },
      {
        n: 3,
        prompt: "A legal team needs to scan contracts to find and mask occurrences of names, dates of birth, and social security numbers. Which Azure Language feature is most appropriate?",
        choices: ["Extractive summarization", "Named entity recognition", "Key phrase extraction", "PII detection"],
        answer: 3,
        tag: "PII detection",
        explanation: "<p>PII detection identifies and redacts personally identifiable information such as names, dates of birth, and government IDs. Key phrase extraction finds important topics, not personal identifiers. Extractive summarization shortens documents. Named entity recognition overlaps with PII but is tuned for entity categorization, not compliance redaction.</p>"
      },
      {
        n: 4,
        prompt: "Which Azure Language features are in the \u201ccore\u201d tier that is actively receiving new investment?",
        choices: ["PII detection, language detection, and named entity recognition", "Summarization and entity linking", "Conversational language understanding and question answering", "Sentiment analysis and key phrase extraction"],
        answer: 0,
        tag: "Core vs legacy features",
        explanation: "<p>The core tier includes PII detection, language detection, named entity recognition (prebuilt and custom), and text analytics for health. Sentiment analysis, key phrase extraction, summarization, entity linking, conversational language understanding, and question answering are in the legacy tier \u2014 still supported but not receiving new investment.</p>"
      },
      {
        n: 5,
        prompt: "A news site needs to shorten articles by picking the most important existing sentences. No new text should be generated. Which summarization approach is correct?",
        choices: ["Opinion mining", "Entity linking", "Abstractive summarization", "Extractive summarization"],
        answer: 3,
        tag: "Extractive summarization",
        explanation: "<p>Extractive summarization selects existing sentences verbatim; no new text is written. Abstractive summarization generates new sentences. Opinion mining identifies aspect-level sentiment, not summaries. Entity linking connects recognized entities to a knowledge base.</p>"
      },
      {
        n: 6,
        prompt: "A company wants to extract all mentions of organizations and people from press releases and link each mention to a Wikipedia knowledge base entry. Which feature provides the linking step?",
        choices: ["Named entity recognition", "PII detection", "Entity linking", "Key phrase extraction"],
        answer: 2,
        tag: "Entity linking",
        explanation: "<p>Entity linking disambiguates and links recognized entities to entries in a knowledge base such as Wikipedia. Named entity recognition identifies and categorizes entities but does not link them to external knowledge bases. PII detection focuses on personally identifiable information. Key phrase extraction identifies important terms.</p>"
      },
      {
        n: 7,
        prompt: "A developer needs to perform several text tasks in one call \u2014 summarize, translate, and extract action items \u2014 with flexible, reasoned output. Should they use a purpose-built Language feature or a generative model?",
        choices: ["A generative model, because it handles multiple tasks with reasoning in a single call", "A purpose-built Language feature, because generative models cannot translate", "A generative model, but only with fine-tuning", "A purpose-built Language feature, because it is lower latency"],
        answer: 0,
        tag: "Purpose-built vs generative",
        explanation: "<p>When the task requires flexibility, combining multiple operations, or reasoning across them in a single call, a generative model is the better choice. Purpose-built Language features excel at specific typed tasks at low latency and cost. Generative models can translate. Fine-tuning is not required for multi-task calls.</p>"
      },
      {
        n: 8,
        prompt: "An app must extract the top five topics from thousands of customer feedback comments each hour at predictable low cost. Which approach is most suitable?",
        choices: ["A generative model with a detailed system prompt", "Key phrase extraction from Azure Language in Foundry Tools", "A fine-tuned GPT-5 model", "Named entity recognition"],
        answer: 1,
        tag: "Key phrase extraction",
        explanation: "<p>Key phrase extraction is a purpose-built, low-cost, low-latency feature that identifies the most important terms in text, making it ideal for high-volume topic extraction at predictable cost. A generative model is more flexible but costlier per call. Fine-tuning adds complexity and cost without necessity here. Named entity recognition categorizes entity types, not general topic keywords.</p>"
      }
    ]
  },
  {
    id: "d2-speech",
    topic: "Text and Speech",
    title: "Speech Recognition & Synthesis",
    blurb: "Covers STT modes, TTS and neural voices, SSML, Voice Live, and when to use Speech vs a multimodal model.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A call center wants to transcribe thousands of recorded customer service calls stored in Azure Blob Storage overnight. Which speech-to-text mode is most appropriate?",
        choices: ["Batch transcription", "Voice Live", "Real-time speech to text", "Fast transcription"],
        answer: 0,
        tag: "Batch transcription",
        explanation: "<p>Batch transcription processes large collections of pre-recorded audio files asynchronously, making it ideal for overnight processing of stored recordings. Real-time transcription is for live streaming audio. Fast transcription is optimized for speed on shorter files, not bulk offline processing. Voice Live is a low-latency conversational voice feature, not batch transcription.</p>"
      },
      {
        n: 2,
        prompt: "A developer needs a text-to-speech voice that sounds natural for a consumer app and wants to control pronunciation, rate, and pauses programmatically. Which capability supports this markup?",
        choices: ["Speaker recognition", "Custom neural voice", "SSML (Speech Synthesis Markup Language)", "Fast transcription"],
        answer: 2,
        tag: "SSML",
        explanation: "<p>SSML allows developers to control neural voice output in detail \u2014 pronunciation, speaking rate, pitch, pauses, and emphasis \u2014 through XML markup. Custom neural voice creates a brand-specific voice but SSML is what controls the rendering parameters at runtime. Fast transcription converts speech to text, not the reverse. Speaker recognition identifies who is speaking.</p>"
      },
      {
        n: 3,
        prompt: "A company wants to create a branded AI voice that sounds like their celebrity spokesperson for a virtual assistant. Which gated capability is required?",
        choices: ["Voice Live", "Custom neural voice", "Fast transcription", "Speaker recognition"],
        answer: 1,
        tag: "Custom neural voice",
        explanation: "<p>Custom neural voice is the gated Azure Speech feature that creates a unique synthetic voice from recorded samples of a specific speaker, enabling branded or persona voices. It requires consent from the voice talent and Microsoft approval. Speaker recognition identifies speakers. Voice Live provides low-latency conversational voice. Fast transcription is speech to text.</p>"
      },
      {
        n: 4,
        prompt: "A real-time voice assistant needs to process spoken input, reason about it using a language model, and respond with spoken audio \u2014 all with very low latency. Which is the best choice?",
        choices: ["Batch transcription followed by key phrase extraction", "Custom neural voice with SSML", "Azure Speech real-time STT combined with TTS", "gpt-realtime or gpt-audio model family"],
        answer: 3,
        tag: "Multimodal audio model",
        explanation: "<p>The gpt-realtime and gpt-audio model families handle speech-in, reasoning, and speech-out in a single model with low latency, designed exactly for conversational voice AI. Azure Speech STT + TTS adds a separate LLM in the middle with more latency. Batch transcription is offline. Custom neural voice plus SSML is synthesis-only; it does not perform reasoning.</p>"
      },
      {
        n: 5,
        prompt: "An accessibility app needs to detect which of two known speakers is talking in a recorded meeting. Which Azure Speech feature handles this?",
        choices: ["Speech translation", "Fast transcription", "Speaker recognition", "Voice Live"],
        answer: 2,
        tag: "Speaker recognition",
        explanation: "<p>Speaker recognition identifies or verifies a specific speaker\u2019s identity from audio, including distinguishing between known speakers. Speech translation converts spoken audio to another language. Fast transcription converts audio to text quickly. Voice Live is for low-latency conversational voice, not speaker identification.</p>"
      },
      {
        n: 6,
        prompt: "A global call center transcribes calls in real time and immediately translates the transcript into the agent\u2019s language. Which Azure Speech feature covers the translation step?",
        choices: ["Speech translation", "SSML", "Custom speech models", "Speaker recognition"],
        answer: 0,
        tag: "Speech translation",
        explanation: "<p>Speech translation converts spoken audio directly from one language to text (or speech) in another language in real time. Custom speech models improve transcription accuracy but do not translate. Speaker recognition identifies speakers. SSML controls synthesis markup and does not perform translation.</p>"
      },
      {
        n: 7,
        prompt: "A customer needs very fast transcription of short audio clips in near real time, faster than standard real-time STT, for a low-latency captioning service. Which mode is optimized for this?",
        choices: ["Voice Live", "Custom neural voice", "Batch transcription", "Fast transcription"],
        answer: 3,
        tag: "Fast transcription",
        explanation: "<p>Fast transcription is an Azure Speech mode optimized for low-latency, high-speed conversion of audio to text, making it suitable for near-real-time captioning. Batch transcription processes large offline jobs. Voice Live is for conversational voice. Custom neural voice is for synthesis, not transcription.</p>"
      },
      {
        n: 8,
        prompt: "An app wants to use a conversational voice interaction that feels natural and responds immediately as the user speaks, without waiting for a full utterance to complete. Which Azure Speech feature is designed for this low-latency experience?",
        choices: ["SSML", "Voice Live", "Batch transcription", "Speaker recognition"],
        answer: 1,
        tag: "Voice Live",
        explanation: "<p>Voice Live is the Azure Speech low-latency conversational voice feature built for natural real-time voice interactions where responsiveness as the user speaks is critical. Batch transcription is for offline jobs. Speaker recognition identifies speakers. SSML is markup for controlling speech synthesis parameters, not a conversational mode.</p>"
      }
    ]
  },
  {
    id: "d2-vision",
    topic: "Vision and Image Generation",
    title: "Multimodal Vision Input",
    blurb: "Decides when to use a multimodal model, Content Understanding, or Azure Vision for image tasks.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer wants to pass a photograph and ask \u201cWhat is wrong with the wiring in this image?\u201d to get a reasoned answer. Which model families support this image-in-text-out capability?",
        choices: ["Phi and whisper", "GPT-5.x, GPT-4.1, GPT-4o, and o-series", "gpt-image-1 and sora", "text-embedding-3-large and text-embedding-3-small"],
        answer: 1,
        tag: "Vision-capable models",
        explanation: "<p>GPT-5.x, GPT-4.1, GPT-4o, and o-series models accept image input alongside text in a single prompt (multimodal input). Phi is a small text language model without image input. whisper is audio transcription. gpt-image-1 and sora generate images and video respectively. Embedding models convert text to vectors.</p>"
      },
      {
        n: 2,
        prompt: "A team is evaluating Azure Vision in Foundry Tools for a new project. Their engineer notes that Image Analysis 4.0 is deprecated. What is the current recommendation for image understanding in new projects?",
        choices: ["Switch to Azure Custom Vision for all image tasks", "Use the Read/OCR API which is not deprecated", "Continue using Image Analysis 4.0 as it has no retirement date", "Use a multimodal model or Content Understanding for new work"],
        answer: 3,
        tag: "Image Analysis deprecation",
        explanation: "<p>Image Analysis 4.0 is deprecated (retires September 25, 2028) and the Read/OCR API is labeled legacy; Microsoft\u2019s guidance for new projects is to use a multimodal model or Content Understanding. Azure Custom Vision is itself retiring September 25, 2028. The Read API is labeled legacy, not a recommended new choice.</p>"
      },
      {
        n: 3,
        prompt: "An HR app must verify a job applicant\u2019s identity by comparing a selfie with their ID photo. Which Azure service provides this, and what access requirement applies?",
        choices: ["Azure Face with verification, requiring Limited Access approval", "Azure Vision Image Analysis 4.0, available to all Azure subscribers", "Content Understanding prebuilt-image, available to all Azure subscribers", "Azure Custom Vision, available to all Azure subscribers"],
        answer: 0,
        tag: "Face Limited Access",
        explanation: "<p>Azure Face provides face verification (comparing two images of the same person) but is a Limited Access service that requires applying to Microsoft for approval. Azure Custom Vision is for classification and object detection, not face verification, and is retiring. Image Analysis 4.0 is deprecated. Content Understanding does not provide identity verification.</p>"
      },
      {
        n: 4,
        prompt: "A developer needs to train a model to classify product images into custom categories using labeled examples. Which service should they use, and what warning applies?",
        choices: ["Content Understanding prebuilt-image with no training required", "GPT-5 with fine-tuning on image samples", "Azure Custom Vision, but note it retires September 25, 2028", "Azure Face liveness detection, available to all subscribers"],
        answer: 2,
        tag: "Custom Vision retirement",
        explanation: "<p>Azure Custom Vision still supports training custom image classifiers and object detectors with labeled samples, but it is retiring September 25, 2028. Face liveness is a different capability. Content Understanding uses zero-shot field extraction, not labeled training for image classification. Fine-tuning GPT-5 on image samples is not a supported Custom Vision replacement path.</p>"
      },
      {
        n: 5,
        prompt: "A quality inspector app needs to describe what it sees in a factory floor image, identify defects, and answer questions like \u201cIs the seal intact?\u201d Which approach is most appropriate?",
        choices: ["Azure Vision Image Analysis 4.0 OCR", "Azure Face identification", "Azure Custom Vision object detection", "A multimodal model receiving the image as input"],
        answer: 3,
        tag: "Multimodal model for vision",
        explanation: "<p>A multimodal model (GPT-5.x, GPT-4o, o-series) can receive the image, reason about it in natural language, and answer open-ended questions about what it sees. Custom Vision is for predefined category detection, not open-ended Q&A. Image Analysis 4.0 OCR extracts text, not visual reasoning. Azure Face identifies people, not defects.</p>"
      },
      {
        n: 6,
        prompt: "Which Azure Vision capability was retired for responsible AI reasons and is no longer available?",
        choices: ["Face verification", "Emotion and gender inference from Face", "OCR with the Read API", "Face liveness detection"],
        answer: 1,
        tag: "Retired Face features",
        explanation: "<p>Emotion inference and gender inference were retired from Azure Face for responsible AI reasons. Face liveness detection and verification remain active but require Limited Access approval. The OCR Read API is labeled legacy but not retired.</p>"
      },
      {
        n: 7,
        prompt: "An app uses a multimodal model to answer questions about photographs uploaded by users. The developer checks which model to use. Which family does NOT support image input?",
        choices: ["GPT-5 series", "GPT-4o", "Phi (small language models)", "o-series"],
        answer: 2,
        tag: "Phi image limitation",
        explanation: "<p>Phi is Microsoft\u2019s small language model family designed for text tasks on edge and low-cost devices; it does not support image input. GPT-5 series, GPT-4o, and o-series all support multimodal image input alongside text.</p>"
      },
      {
        n: 8,
        prompt: "A team needs schema-driven field extraction from product images \u2014 extracting SKU, condition, and price from photos of retail items \u2014 without labeled training data. Which service is best suited?",
        choices: ["Content Understanding prebuilt-image analyzer", "Azure Vision Image Analysis 4.0", "Azure Custom Vision", "Azure Face"],
        answer: 0,
        tag: "Content Understanding image",
        explanation: "<p>Content Understanding with the prebuilt-image base analyzer supports zero-shot schema-driven field extraction from images without labeled training data. Image Analysis 4.0 is deprecated and does not support custom field schemas. Custom Vision requires labeled training samples and is retiring. Azure Face is for face detection and verification, not product data extraction.</p>"
      }
    ]
  },
  {
    id: "d2-imagegen",
    topic: "Vision and Image Generation",
    title: "Image Generation",
    blurb: "Covers the gpt-image-1 family, FLUX, sora for video, responsible AI, and DALL-E supersession.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer wants to generate product images from text descriptions using Foundry. Which model family should they use in 2026?",
        choices: ["text-embedding-3-large", "DALL-E 3", "gpt-image-1 family", "GPT-4o with vision input"],
        answer: 2,
        tag: "gpt-image-1 family",
        explanation: "<p>The gpt-image-1 family (gpt-image-1, gpt-image-1-mini, gpt-image-1.5) is the current recommended image-generation option in Foundry; DALL-E 3 has been superseded and is no longer the recommended model. GPT-4o accepts image input but does not generate images. text-embedding-3-large produces text vectors, not images.</p>"
      },
      {
        n: 2,
        prompt: "A graphic designer asks which image-generation models in Foundry are provided by a third-party partner (Black Forest Labs). Which models are these?",
        choices: ["FLUX models", "whisper and gpt-realtime", "gpt-image-1 and gpt-image-1-mini", "sora and sora-2"],
        answer: 0,
        tag: "FLUX models",
        explanation: "<p>FLUX models from Black Forest Labs are available in Foundry Models as partner image-generation models. gpt-image-1 and its variants are Microsoft/OpenAI models. sora and sora-2 are text-to-video models, not image-generation. whisper and gpt-realtime are audio models.</p>"
      },
      {
        n: 3,
        prompt: "What aspect of image output can a developer control through their text prompt when using gpt-image-1?",
        choices: ["The GPU used for rendering", "The file format of the embedding vector", "The model\u2019s training data cutoff date", "Style, composition, subject matter, and mood described in the prompt"],
        answer: 3,
        tag: "Image prompt control",
        explanation: "<p>Text-to-image models are controlled through the prompt: style (photorealistic, watercolor), composition (angle, layout), subject matter (objects, people), and mood (dark, cheerful) can all be specified. Training data cutoff, GPU selection, and embedding file formats are not image-generation control parameters.</p>"
      },
      {
        n: 4,
        prompt: "A studio wants to generate a 10-second promotional video from a text description. Which Foundry model family is designed for text-to-video generation?",
        choices: ["FLUX models", "sora / sora-2", "gpt-realtime", "gpt-image-1 family"],
        answer: 1,
        tag: "Video generation sora",
        explanation: "<p>sora and sora-2 are the text-to-video generation models available in Foundry Models (currently in preview). gpt-image-1 generates still images. FLUX models generate still images. gpt-realtime is for real-time audio, not video generation.</p>"
      },
      {
        n: 5,
        prompt: "Which image-generation model was commonly associated with AI-900 exam content but has since been superseded in Foundry?",
        choices: ["DALL-E 3", "sora", "gpt-image-1", "FLUX"],
        answer: 0,
        tag: "DALL-E superseded",
        explanation: "<p>DALL-E 3 was taught in AI-900 and was the previous recommended image-generation model; it has been superseded by the gpt-image-1 family. gpt-image-1 and FLUX are the current options. sora generates video, not static images.</p>"
      },
      {
        n: 6,
        prompt: "A content team is generating images of real public figures for a news website. Which responsible AI concern is most directly relevant?",
        choices: ["Embedding drift over time", "Hallucination in text output", "Potential for creating misleading or non-consensual depictions of real people", "Context window overflow"],
        answer: 2,
        tag: "Responsible AI image gen",
        explanation: "<p>Generating images of real people raises responsible AI concerns around misleading depictions (deepfakes), non-consensual use of likeness, and misinformation. Hallucination, context window overflow, and embedding drift are text or search concerns, not image-generation responsible AI risks.</p>"
      },
      {
        n: 7,
        prompt: "A developer chooses gpt-image-1-mini over gpt-image-1.5 for a high-volume image-generation pipeline. What trade-off are they accepting?",
        choices: ["Higher cost per image but faster generation", "Lower image quality or capability in exchange for lower cost and faster generation", "Larger output resolution in exchange for longer wait times", "A requirement for labeled training data"],
        answer: 1,
        tag: "Image model sizing",
        explanation: "<p>Like text model mini variants, gpt-image-1-mini trades off some image quality or capability for lower cost and faster generation. It does not cost more, does not produce larger resolution images, and does not require training data \u2014 these are all zero-shot generation models.</p>"
      },
      {
        n: 8,
        prompt: "An app generates marketing images and must apply responsible AI safeguards to prevent the generation of harmful or policy-violating content. Which Foundry Tools service applies content policies to model inputs and outputs?",
        choices: ["Azure Language in Foundry Tools", "Azure Document Intelligence in Foundry Tools", "Azure AI Search", "Azure AI Content Safety"],
        answer: 3,
        tag: "Content safety",
        explanation: "<p>Azure AI Content Safety applies configurable content policies with severity thresholds to detect hate, sexual, violence, and self-harm categories in both inputs and outputs, including generated images. Azure AI Search is for retrieval. Azure Language analyzes text. Document Intelligence extracts fields from documents.</p>"
      }
    ]
  },
  {
    id: "d2-extraction",
    topic: "Information Extraction",
    title: "Content Understanding \u2014 Documents & Fields",
    blurb: "Tests analyzers, field schemas, extract/classify/generate methods, and when to use Content Understanding vs Document Intelligence.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A team creates a reusable processing unit in Content Understanding that defines the content type, the fields to extract, and the output shape. What is this called?",
        choices: ["A confidence score", "A field schema", "A base analyzer ID", "An analyzer"],
        answer: 3,
        tag: "Analyzer concept",
        explanation: "<p>An analyzer is the reusable, configurable processing unit in Content Understanding; it encapsulates the baseAnalyzerId, field schema, output configuration, and model choices. A field schema is one component inside the analyzer definition. The base analyzer ID specifies the content type. A confidence score is output, not a processing unit.</p>"
      },
      {
        n: 2,
        prompt: "A developer defines a Content Understanding analyzer with baseAnalyzerId set to \u201cprebuilt-document.\u201d What does this value specify?",
        choices: ["The name of the custom model trained on labeled samples", "The content modality the analyzer is configured to process", "The Azure region where the analyzer runs", "The output format (JSON or Markdown)"],
        answer: 1,
        tag: "baseAnalyzerId",
        explanation: "<p>baseAnalyzerId specifies the content type (modality) the analyzer is built on: prebuilt-document, prebuilt-image, prebuilt-audio, or prebuilt-video. It does not name a custom trained model, specify a region, or control output format.</p>"
      },
      {
        n: 3,
        prompt: "A field schema method that copies a value that literally appears in the source document is called what?",
        choices: ["Classify", "Generate", "Extract", "Embed"],
        answer: 2,
        tag: "Extract method",
        explanation: "<p>The extract method copies a value that literally appears in the source content, such as a date or an amount that is directly present in the document. Classify assigns a predefined category label. Generate uses generative AI to produce a new value from the content. Embed is not one of the three field methods.</p>"
      },
      {
        n: 4,
        prompt: "A field schema method that assigns one of a predefined set of category labels to a piece of content is called what?",
        choices: ["Classify", "Generate", "Index", "Extract"],
        answer: 0,
        tag: "Classify method",
        explanation: "<p>The classify method assigns a label from a fixed set of categories to a field, such as labeling a contract as Standard, Custom, or Non-standard. Extract copies an existing value. Generate creates a new value using generative AI. Index is not a field extraction method.</p>"
      },
      {
        n: 5,
        prompt: "A team needs a brief plain-language summary of a legal contract that combines ideas from multiple sections. Which field method should the relevant schema field use?",
        choices: ["Classify", "Generate", "Embed", "Extract"],
        answer: 1,
        tag: "Generate method",
        explanation: "<p>The generate method uses generative AI to produce a new value from the content \u2014 such as a summary that synthesizes information from multiple sections. Extract only copies existing text. Classify assigns category labels. Embed is not a Content Understanding field method.</p>"
      },
      {
        n: 6,
        prompt: "A startup wants to extract custom fields from contracts with no labeled training examples. Which service supports this zero-shot custom extraction?",
        choices: ["Azure Custom Vision", "Azure Language named entity recognition", "Document Intelligence custom neural model", "Content Understanding custom analyzer"],
        answer: 3,
        tag: "Zero-shot custom analyzer",
        explanation: "<p>Content Understanding custom analyzers work zero-shot: you describe the fields in plain language and no labeled training data is required (labeled examples can improve accuracy but are optional). Document Intelligence custom neural models require labeled samples. Azure Custom Vision is for image classification and is retiring. Azure Language NER is for text entity categories, not document field extraction.</p>"
      },
      {
        n: 7,
        prompt: "A company processes standard invoices and needs the fastest, most accurate extraction of vendor name, amount due, and due date with a low-latency, deterministic result. Which service is better suited?",
        choices: ["Document Intelligence prebuilt invoice model", "Azure Custom Vision", "Named entity recognition in Azure Language", "Content Understanding prebuilt-document analyzer"],
        answer: 0,
        tag: "Document Intelligence vs CU",
        explanation: "<p>Document Intelligence prebuilt models (invoice, receipt, ID, etc.) are purpose-trained, deterministic, and optimized for structured forms at high accuracy and low latency \u2014 exactly this scenario. Content Understanding is better for unstructured documents and multimodal content. Azure Custom Vision handles images, not invoices. NER identifies text entity categories, not structured invoice fields.</p>"
      },
      {
        n: 8,
        prompt: "A developer needs to extract key clauses from unstructured legal contracts that have no standard layout and no labeled training samples. Which service is the better fit?",
        choices: ["Azure AI Search semantic ranking", "Document Intelligence custom neural model", "Content Understanding custom analyzer", "Azure Custom Vision"],
        answer: 2,
        tag: "CU for unstructured docs",
        explanation: "<p>Content Understanding supports zero-shot extraction from unstructured documents like contracts and policies without labeled data. Document Intelligence custom neural models require labeled samples and are optimized for structured forms. Azure Custom Vision handles images. Azure AI Search semantic ranking retrieves relevant documents but does not extract structured fields from them.</p>"
      }
    ]
  },
  {
    id: "d2-multimodal",
    topic: "Information Extraction",
    title: "Extraction from Images, Audio & Video",
    blurb: "Maps the four Content Understanding modalities to scenarios and compares Video Indexer vs Content Understanding.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "Content Understanding supports four content modalities. Which set is correct?",
        choices: ["Documents, images, audio, video", "Markdown, JSON, CSV, PDF", "Invoices, receipts, IDs, contracts", "Text, image, audio, spreadsheet"],
        answer: 0,
        tag: "Four modalities",
        explanation: "<p>Content Understanding supports four modalities: documents, images, audio, and video. Each has a corresponding base analyzer and a RAG analyzer. Spreadsheets, Markdown, JSON, and CSV are file types, not modality categories. Invoices, receipts, IDs, and contracts are Document Intelligence prebuilt model domains.</p>"
      },
      {
        n: 2,
        prompt: "A developer configures a Content Understanding analyzer to build a RAG pipeline from scanned documents. Which baseAnalyzerId should they use?",
        choices: ["prebuilt-layout", "prebuilt-read", "prebuilt-document", "prebuilt-documentSearch"],
        answer: 3,
        tag: "RAG analyzer",
        explanation: "<p>prebuilt-documentSearch is the RAG analyzer for documents; it returns the content in Markdown with grounding suitable for retrieval-augmented generation pipelines. prebuilt-document is the base extraction analyzer. prebuilt-layout and prebuilt-read are OCR-focused prebuilt analyzers for layout and text reading, not RAG pipelines.</p>"
      },
      {
        n: 3,
        prompt: "A media company needs to extract speaker transcripts, on-screen text, and custom metadata fields from archived news videos. Which service is the best fit?",
        choices: ["Azure AI Video Indexer for all needs", "Content Understanding with a prebuilt-video analyzer and a field schema", "Azure Custom Vision object detection", "Azure Language named entity recognition"],
        answer: 1,
        tag: "Video extraction CU",
        explanation: "<p>Content Understanding with the prebuilt-video base or RAG analyzer and a custom field schema supports schema-driven extraction of transcripts, on-screen text, and custom metadata from video. Azure AI Video Indexer provides prebuilt video insights but does not support custom field schemas for extraction. Custom Vision is for image classification. Language NER processes text, not video.</p>"
      },
      {
        n: 4,
        prompt: "A team needs prebuilt, out-of-the-box video insights like faces, labels, topics, and auto-generated transcripts from existing video files, with no custom field schema required. Which service fits best?",
        choices: ["Content Understanding prebuilt-videoSearch", "Content Understanding prebuilt-video analyzer", "Azure AI Video Indexer", "Azure Speech batch transcription"],
        answer: 2,
        tag: "Video Indexer prebuilt",
        explanation: "<p>Azure AI Video Indexer is a separate active service that delivers prebuilt video insights (faces, labels, transcripts, OCR, topics, speakers) without requiring custom schemas. Content Understanding is better when you want schema-driven field extraction from video. Azure Speech batch transcription handles audio transcription only, not full video insights.</p>"
      },
      {
        n: 5,
        prompt: "A compliance team needs to extract structured fields (call reason, resolution, sentiment) from recorded customer service calls using no labeled training data. Which Content Understanding analyzer type applies?",
        choices: ["prebuilt-video", "prebuilt-audio", "prebuilt-imageSearch", "prebuilt-document"],
        answer: 1,
        tag: "Audio analyzer",
        explanation: "<p>The prebuilt-audio base analyzer processes audio content; with a field schema describing call reason, resolution, and sentiment, Content Understanding can extract these zero-shot. prebuilt-document handles text documents. prebuilt-video handles video. prebuilt-imageSearch is the RAG analyzer for images, not audio.</p>"
      },
      {
        n: 6,
        prompt: "Which Content Understanding analyzer is designed to return Markdown and grounding information optimized for inserting image content into a retrieval-augmented generation pipeline?",
        choices: ["prebuilt-imageSearch", "prebuilt-document", "prebuilt-audioSearch", "prebuilt-image"],
        answer: 0,
        tag: "Image RAG analyzer",
        explanation: "<p>prebuilt-imageSearch is the RAG analyzer for images; it returns Markdown and grounding (bounding boxes) optimized for RAG pipelines. prebuilt-image is the base extraction analyzer. prebuilt-document is for document content. prebuilt-audioSearch is the RAG analyzer for audio, not images.</p>"
      },
      {
        n: 7,
        prompt: "A developer builds a lightweight app that submits product images to Content Understanding and gets back structured JSON fields (name, color, condition) with confidence scores. What does a confidence score of 0.95 on a field indicate?",
        choices: ["The model generated the field using abstractive summarization", "The field was found in fewer than 5% of training samples", "The field was extracted with high confidence but should still be reviewed for critical decisions", "The field is guaranteed to be correct and requires no review"],
        answer: 2,
        tag: "Confidence scores",
        explanation: "<p>Confidence scores (0\u20131) indicate the model\u2019s certainty about an extracted value; 0.95 signals high confidence but does not guarantee correctness \u2014 downstream applications should still consider human review for high-stakes decisions. Scores do not guarantee accuracy, do not describe the extraction method, and are not derived from training sample frequency.</p>"
      },
      {
        n: 8,
        prompt: "A developer needs Content Understanding to show exactly where in a document each extracted value came from \u2014 for example, the bounding box of a date on a form. Which output feature provides this?",
        choices: ["RAG Markdown output", "Field schema generation method", "Confidence scores", "Grounding"],
        answer: 3,
        tag: "Grounding",
        explanation: "<p>Grounding in Content Understanding returns bounding boxes (for documents and images) or timestamps (for audio and video) showing exactly where in the source content each extracted value came from. Confidence scores indicate certainty but not location. RAG Markdown output is for retrieval pipelines. The generate field method produces synthesized values, not provenance information.</p>"
      }
    ]
  }
];
