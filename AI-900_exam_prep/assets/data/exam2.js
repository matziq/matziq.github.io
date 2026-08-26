window.AI9_DATA = window.AI9_DATA || {};

window.AI9_DATA.exam2 = {
  id: "exam2",
  name: "AI-900 \u2014 Practice Exam 2",
  timeMinutes: 45,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A retailer wants to flag transactions that deviate significantly from a customer's normal spending pattern. Which AI workload BEST fits this scenario?</p>",
      choices: ["Anomaly detection", "Knowledge mining", "Conversational AI", "Document processing"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Anomaly detection identifies data points that fall outside expected norms, making it ideal for flagging unusual spending that deviates from a customer's history.</p><p>Knowledge mining extracts insights from large document collections, not transaction streams. Conversational AI handles dialog-based interactions. Document processing reads fields from structured files, not time-series transaction data.</p>"
    },
    {
      n: 2,
      prompt: "<p>A data scientist trains a model and finds near-perfect accuracy on training data but poor accuracy on the validation set. What is this problem called?</p>",
      choices: ["Underfitting", "Overfitting", "Class imbalance", "Data leakage"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>Overfitting occurs when a model memorizes training data including its noise, producing high training accuracy but poor generalization to unseen data.</p><p>Underfitting means the model is too simple and performs poorly on both sets. Class imbalance refers to an unequal distribution of target labels. Data leakage means future information was inadvertently included during training.</p>"
    },
    {
      n: 3,
      prompt: "<p>A developer needs to extract key-value pairs from scanned invoices at scale. Which Azure service should they use FIRST?</p>",
      choices: ["Azure AI Vision", "Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Language"],
      answer: 2,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Document Intelligence is purpose-built for extracting structured fields such as key-value pairs, tables, and line items from forms and invoices using prebuilt and custom models.</p><p>Azure AI Vision provides general image analysis and OCR for plain text but lacks invoice-specific extraction models. Azure AI Custom Vision trains image classifiers and object detectors, not document field extractors. Azure AI Language handles text analytics, not document layout parsing.</p>"
    },
    {
      n: 4,
      prompt: "<p>Which responsible AI principle specifically addresses the need for AI systems to produce consistent, safe results and behave predictably under unexpected conditions?</p>",
      choices: ["Fairness", "Transparency", "Accountability", "Reliability and safety"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Reliability and safety means AI systems should perform as intended under varying conditions, handle failures gracefully, and avoid causing harm through unexpected behavior.</p><p>Fairness focuses on preventing bias across demographic groups. Transparency is about making system behavior understandable. Accountability concerns assigning responsibility for AI decisions, not behavioral predictability.</p>"
    },
    {
      n: 5,
      prompt: "<p>A room-booking chatbot receives: 'Reserve a room for five people tomorrow at 2 PM.' Which component identifies 'five people' as relevant information to extract?</p>",
      choices: ["An entity", "An intent", "An utterance", "A knowledge base"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Entities are specific pieces of structured information extracted from an utterance, such as number of attendees or a date and time. 'Five people' is modeled as a numeric entity.</p><p>An intent represents what the user wants to do, such as book a room. An utterance is the raw text the user typed. A knowledge base stores question-and-answer pairs and is not involved in entity extraction.</p>"
    },
    {
      n: 6,
      prompt: "<p>A company has labeled images of its five proprietary product lines and wants a model to classify new photos into one of those lines. Which Azure service is MOST appropriate?</p>",
      choices: ["Azure AI Vision image analysis", "Azure AI Custom Vision classification", "Azure AI Face", "Azure AI Document Intelligence"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Custom Vision lets you train a custom image classification model with your own labeled data, making it ideal when categories are proprietary and not covered by general prebuilt models.</p><p>Azure AI Vision image analysis provides prebuilt tags and descriptions but cannot learn company-specific product categories. Azure AI Face detects and analyzes human faces, not products. Azure AI Document Intelligence extracts fields from documents, not product images.</p>"
    },
    {
      n: 7,
      prompt: "<p>Which Azure Machine Learning feature lets a non-expert build a predictive model by selecting a dataset and a target column, without writing any code?</p>",
      choices: ["Azure ML notebooks", "The designer", "Automated machine learning", "Compute instances"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "easy",
      explanation: "<p>Automated machine learning (AutoML) iterates over many algorithms and hyperparameter combinations on the user's behalf, requiring only a dataset and a target column to produce a trained model.</p><p>Azure ML notebooks require Python or R code. The designer is low-code but requires manually assembling and connecting pipeline components. Compute instances are managed VMs for running experiments, not a model-building tool.</p>"
    },
    {
      n: 8,
      prompt: "<p>A large language model generates a confident but factually wrong answer about a historical event. Which term describes this failure mode?</p>",
      choices: ["Fine-tuning", "Grounding", "Temperature", "Hallucination"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "easy",
      explanation: "<p>Hallucination refers to the tendency of large language models to generate plausible-sounding but factually incorrect or fabricated content.</p><p>Fine-tuning is the process of further training a pretrained model on domain-specific data. Grounding anchors model output to verified external sources to reduce fabrication. Temperature is a parameter that controls output randomness, not a failure mode name.</p>"
    },
    {
      n: 9,
      prompt: "<p>A global news agency must detect the language of incoming articles before routing them for translation. Which Azure AI Language capability handles this?</p>",
      choices: ["Language detection", "Named entity recognition", "Sentiment analysis", "Key phrase extraction"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Language detection identifies which language a piece of text is written in, which is exactly what the agency needs before routing to the correct translation pipeline.</p><p>Named entity recognition identifies people, places, and organizations but does not identify the language. Sentiment analysis scores text as positive, negative, or neutral. Key phrase extraction surfaces important topics but does not determine the language of the text.</p>"
    },
    {
      n: 10,
      prompt: "<p>When preparing data for a supervised machine learning model, which term describes the column the model is trained to predict?</p>",
      choices: ["Feature", "Label", "Cluster", "Embedding"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "easy",
      explanation: "<p>A label, also called the target variable, is the output value the supervised model is trained to predict, such as a sale price or a fraud indicator.</p><p>Features are the input columns the model uses to make its prediction. A cluster is a group of similar data points found by unsupervised learning. An embedding is a numeric vector representation of data used in deep learning models, not a general term for the prediction target.</p>"
    },
    {
      n: 11,
      prompt: "<p>An AI hiring tool consistently scores resumes from one demographic group lower than equally qualified candidates from another. Which responsible AI principle is being violated?</p>",
      choices: ["Accountability", "Inclusiveness", "Fairness", "Privacy and security"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Fairness requires that AI systems treat all groups equitably and do not discriminate based on protected characteristics such as race, gender, or age.</p><p>Accountability concerns who is responsible for AI outcomes but does not directly describe discriminatory scoring. Inclusiveness focuses on accessibility for people of all abilities. Privacy and security protects personal data from unauthorized access, which is unrelated to scoring bias.</p>"
    },
    {
      n: 12,
      prompt: "<p>Which metric measures the proportion of actual positive cases that a classification model correctly identified?</p>",
      choices: ["Precision", "F1 score", "Accuracy", "Recall"],
      answer: 3,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Recall, also called sensitivity or true positive rate, is calculated as true positives divided by the sum of true positives and false negatives. It answers: of all actual positives, how many did the model catch?</p><p>Precision measures what fraction of predicted positives were actually positive. F1 score is the harmonic mean of precision and recall. Accuracy is the overall fraction of correct predictions across all classes, not specifically about identifying true positives.</p>"
    },
    {
      n: 13,
      prompt: "<p>A developer uses Azure AI Foundry to deploy a GPT model with reserved throughput accessible only by their application. Which deployment type should they configure?</p>",
      choices: ["A dedicated Azure OpenAI Service deployment", "Serverless API deployment", "Managed compute deployment", "A prompt flow endpoint"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>A dedicated deployment in Azure OpenAI Service provisions reserved capacity with a quota in tokens per minute, ensuring only your application consumes that throughput with predictable rate limits.</p><p>Serverless API deployments are pay-per-token with shared infrastructure and no reserved quota. Managed compute deployments host open-source models on dedicated VMs but are not used for Azure OpenAI GPT models. A prompt flow endpoint runs an orchestration pipeline, not a raw model deployment.</p>"
    },
    {
      n: 14,
      prompt: "<p>A security team wants to detect faces in surveillance footage without identifying who the faces belong to. Which capability should they use?</p>",
      choices: ["Facial recognition", "Facial detection", "Facial analysis", "Speaker recognition"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Facial detection locates and returns bounding boxes for faces in an image without identifying the individuals, satisfying the requirement to avoid linking faces to identities.</p><p>Facial recognition matches detected faces against a known set of identities. Facial analysis returns attributes such as age estimate or emotion, which involves more than simple detection. Speaker recognition identifies individuals by voice, not by face in video.</p>"
    },
    {
      n: 15,
      prompt: "<p>Which Azure service is BEST suited for converting recorded customer service calls into searchable text transcripts?</p>",
      choices: ["Azure AI Language", "Azure AI Translator", "Azure AI Speech", "Azure AI Bot Service"],
      answer: 2,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Speech includes a speech-to-text capability that transcribes audio into text, making recorded calls searchable and analyzable downstream.</p><p>Azure AI Language provides text analytics such as sentiment and key phrases but does not transcribe audio. Azure AI Translator translates written text between languages, not speech to text. Azure AI Bot Service builds conversational interfaces and does not perform audio transcription.</p>"
    },
    {
      n: 16,
      prompt: "<p>A team wants to group thousands of customer support tickets into natural categories without any predefined labels. Which machine learning technique should they use?</p>",
      choices: ["Binary classification", "Regression", "Multiclass classification", "Clustering"],
      answer: 3,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Clustering is an unsupervised technique that groups data points by similarity without requiring predefined labels, making it suitable for discovering natural ticket categories.</p><p>Binary classification requires labeled examples and predicts one of two outcomes. Regression predicts a continuous numeric value. Multiclass classification requires labeled training data and predicts one of several known classes, unlike the label-free grouping needed here.</p>"
    },
    {
      n: 17,
      prompt: "<p>In Azure AI Foundry, what is a 'hub'?</p>",
      choices: ["A shared workspace providing centralized governance, security, and resources for multiple projects", "A prebuilt model in the model catalog", "A single prompt flow pipeline", "A compute cluster used for fine-tuning"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>A hub in Azure AI Foundry is a shared top-level resource that centralizes security, connections, compute, and policies so multiple teams and projects can share infrastructure under unified governance.</p><p>Prebuilt models are items in the model catalog, not hubs. A prompt flow pipeline is a distinct orchestration artifact within a project. Compute clusters are infrastructure resources provisioned inside or connected to a hub, not the hub itself.</p>"
    },
    {
      n: 18,
      prompt: "<p>A hospital AI reads chest X-rays and draws bounding boxes around potential nodules, labeling each box with a confidence score. Which computer vision task is this?</p>",
      choices: ["Image classification", "Object detection", "Semantic segmentation", "OCR"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Object detection locates instances of objects within an image and returns bounding boxes with class labels and confidence scores for each detected object, matching this medical imaging scenario.</p><p>Image classification assigns a single label to an entire image without locating objects. Semantic segmentation classifies every pixel, producing a mask rather than bounding boxes. OCR reads text characters from images, not medical features like nodules.</p>"
    },
    {
      n: 19,
      prompt: "<p>Which responsible AI principle emphasizes that an organization must be able to explain why its AI system made a specific decision?</p>",
      choices: ["Inclusiveness", "Privacy and security", "Transparency", "Reliability and safety"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Transparency requires that AI systems and their decision-making processes be understandable and interpretable, so affected parties can know why a particular output was produced.</p><p>Inclusiveness ensures AI benefits everyone regardless of ability or background, not explainability. Privacy and security focuses on protecting personal data. Reliability and safety focuses on predictable, safe behavior rather than on explaining individual decisions.</p>"
    },
    {
      n: 20,
      prompt: "<p>A team further trains an existing language model on company knowledge-base articles so it answers internal policy questions more accurately. Which technique is this?</p>",
      choices: ["Retrieval augmented generation", "Prompt engineering", "Embedding search", "Fine-tuning"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>Fine-tuning involves further training a pretrained model on a domain-specific dataset, adjusting the model weights so it internalizes the content and style of the training material.</p><p>Retrieval augmented generation retrieves documents at inference time and injects them as prompt context without changing model weights. Prompt engineering crafts instructions in the system or user message with no additional training. Embedding search finds semantically similar text chunks but does not adapt the model.</p>"
    },
    {
      n: 21,
      prompt: "<p>An Azure Machine Learning pipeline should reuse intermediate outputs when inputs have not changed. Which component enables this versioned reuse across runs?</p>",
      choices: ["A data asset", "A compute instance", "A datastore", "A model registry entry"],
      answer: 0,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>A data asset in Azure Machine Learning is a versioned, referenceable pointer to data including pipeline step outputs, allowing downstream steps to reuse previously computed results when upstream inputs are unchanged.</p><p>A compute instance is a managed VM for interactive work, not for storing pipeline outputs. A datastore is a connection definition to external storage, not a versioned output cache. A model registry entry stores trained model artifacts, not intermediate pipeline step outputs.</p>"
    },
    {
      n: 22,
      prompt: "<p>A developer wants a low-code way to chain an Azure OpenAI call, a data retrieval step, and a post-processing step into a testable pipeline in Azure AI Foundry. Which tool should they use?</p>",
      choices: ["Azure ML designer", "Prompt flow", "Azure AI Content Safety", "Azure AI Bot Service"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Prompt flow in Azure AI Foundry provides a visual, low-code environment for building, testing, and deploying LLM-based pipelines that can include retrieval steps, model calls, and custom processing logic.</p><p>Azure ML designer builds classic machine learning pipelines, not LLM orchestration flows. Azure AI Content Safety is a content moderation service, not a pipeline authoring tool. Azure AI Bot Service creates conversational bots but does not offer a visual pipeline editor for LLM chaining.</p>"
    },
    {
      n: 23,
      prompt: "<p>Which regression evaluation metric expresses average prediction error in the same units as the target variable and penalizes large errors more heavily than small ones?</p>",
      choices: ["R-squared", "Mean absolute error", "Root mean squared error", "F1 score"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Root mean squared error (RMSE) is the square root of the average squared prediction errors, returning a value in the same unit as the target and penalizing large errors more than mean absolute error does.</p><p>R-squared measures the proportion of variance explained by the model, not average error magnitude. Mean absolute error averages absolute differences without squaring, so it penalizes large errors less heavily. F1 score is a classification metric, not applicable to regression.</p>"
    },
    {
      n: 24,
      prompt: "<p>A media company wants to transcribe videos, detect speakers, identify on-screen text, and tag topics, all in one service. Which Azure service offers all of these capabilities?</p>",
      choices: ["Azure AI Vision", "Azure AI Speech", "Azure AI Language", "Azure AI Video Indexer"],
      answer: 3,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Video Indexer combines speech transcription, speaker diarization, on-screen text (OCR), face detection, and topic tagging in a single video analysis service.</p><p>Azure AI Vision analyzes still images and provides limited video analysis but lacks speaker diarization and topic tagging. Azure AI Speech transcribes audio but does not analyze visual content or tag topics. Azure AI Language analyzes text but does not process audio or video directly.</p>"
    },
    {
      n: 25,
      prompt: "<p>Which NLP capability detects personally identifiable information such as social security numbers and email addresses in text so they can be redacted?</p>",
      choices: ["PII detection", "Key phrase extraction", "Named entity recognition", "Sentiment analysis"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>PII detection is a specialized capability designed to identify and optionally redact categories of sensitive personal information such as identification numbers, financial details, and contact information.</p><p>Key phrase extraction identifies important topical phrases but does not categorize or redact sensitive data. Named entity recognition identifies general entity types such as persons and locations but is not specifically focused on PII redaction. Sentiment analysis scores the emotional tone of text and has no PII awareness.</p>"
    },
    {
      n: 26,
      prompt: "<p>A startup builds an app that creates unique portrait illustrations from user text descriptions. Which Azure OpenAI Service model family supports this use case?</p>",
      choices: ["GPT-4 Turbo", "DALL-E", "Whisper", "text-embedding-ada"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>DALL-E is the Azure OpenAI Service model family for generating images from text prompts, making it the correct choice for producing portrait illustrations from descriptions.</p><p>GPT-4 Turbo generates and processes text and can analyze images but does not generate images. Whisper is a speech-to-text model. text-embedding-ada produces vector embeddings of text for semantic search, not images.</p>"
    },
    {
      n: 27,
      prompt: "<p>A model predicts home sale prices based on square footage, number of bedrooms, and neighborhood. Which machine learning technique does this represent?</p>",
      choices: ["Classification", "Clustering", "Regression", "Anomaly detection"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Regression predicts a continuous numeric output, such as a sale price, by learning relationships between input features and the target variable.</p><p>Classification predicts a discrete category rather than a continuous value. Clustering groups data points by similarity without predicting a specific output value. Anomaly detection flags unusual data points rather than predicting a target value for normal observations.</p>"
    },
    {
      n: 28,
      prompt: "<p>A chatbot is configured to answer only HR policy questions. A user asks about the weather. Which responsible generative AI stage involves implementing filters that block such off-topic requests?</p>",
      choices: ["Identify", "Measure", "Operate", "Mitigate"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>The Mitigate stage involves applying safeguards such as topic filters, system message constraints, and content classifiers that prevent the model from responding to out-of-scope or harmful requests.</p><p>Identify is the stage where potential harms are cataloged before deployment. Measure is the stage where frequency and severity of identified harms are evaluated. Operate is the ongoing post-deployment monitoring stage, not the stage for implementing input filters.</p>"
    },
    {
      n: 29,
      prompt: "<p>Which Azure AI Language feature determines not only overall sentiment but also which specific aspect such as 'price' or 'service' the sentiment refers to in a review?</p>",
      choices: ["Sentiment analysis with opinion mining", "Key phrase extraction", "Named entity recognition", "Summarization"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Opinion mining, a feature of Azure AI Language sentiment analysis, links sentiment scores to specific aspects or targets mentioned in the text, such as identifying that 'The price was too high' is negative about price.</p><p>Key phrase extraction surfaces important topics but does not attach sentiment scores to them. Named entity recognition identifies entity types without sentiment scoring. Summarization condenses text into a shorter form but does not attribute sentiment to specific aspects.</p>"
    },
    {
      n: 30,
      prompt: "<p>A company wants an Azure OpenAI chatbot to answer questions grounded only in its proprietary documentation, not in the model's general training knowledge. Which approach BEST achieves this?</p>",
      choices: ["Fine-tuning the model on the documents", "Retrieval augmented generation with the documents as the data source", "Increasing the temperature parameter", "Deploying with a lower quota"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>Retrieval augmented generation (RAG) retrieves relevant chunks from proprietary documents at query time and injects them as context into the prompt, grounding responses in actual documentation without altering model weights.</p><p>Fine-tuning updates model weights and can improve style or format but does not prevent the model from drawing on general training knowledge. Increasing temperature makes output more random, not more grounded. Lowering quota limits throughput and has no effect on where the model draws its knowledge from.</p>"
    },
    {
      n: 31,
      prompt: "<p>An app must classify a photograph as containing a cat, a dog, or neither. This is an example of which classification type?</p>",
      choices: ["Binary classification", "Multilabel classification", "Multiclass classification", "Regression"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Multiclass classification assigns each input to exactly one of three or more mutually exclusive classes (cat, dog, or neither), which precisely matches this three-class scenario.</p><p>Binary classification has only two output classes. Multilabel classification allows an input to belong to multiple classes simultaneously, which is not needed here since each photo belongs to exactly one class. Regression predicts a continuous numeric value rather than a class label.</p>"
    },
    {
      n: 32,
      prompt: "<p>A legal firm wants to search thousands of scanned case files and automatically surface relevant precedents, key clauses, and party names. Which AI workload describes this capability?</p>",
      choices: ["Anomaly detection", "Conversational AI", "Generative AI", "Knowledge mining"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Knowledge mining uses AI to extract, index, and surface insights from large volumes of unstructured documents such as scanned legal files, enabling intelligent search over the content.</p><p>Anomaly detection flags unusual data points in streams, not document content analysis. Conversational AI handles interactive dialog. Generative AI creates new content; while it can assist with search, knowledge mining is the established term for AI-powered document intelligence and search.</p>"
    },
    {
      n: 33,
      prompt: "<p>Which Azure service translates whole documents from English to Japanese while preserving the original document layout and formatting?</p>",
      choices: ["Azure AI Translator", "Azure AI Speech", "Azure AI Language", "Azure AI Document Intelligence"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Translator includes a document translation feature that asynchronously translates whole documents between languages while preserving the original layout, tables, and formatting.</p><p>Azure AI Speech handles speech-to-text and text-to-speech, not written document translation. Azure AI Language provides text analytics but does not translate documents. Azure AI Document Intelligence extracts structured fields from forms; it does not translate text between languages.</p>"
    },
    {
      n: 34,
      prompt: "<p>A satellite imaging model must assign a class label to every pixel to distinguish roads, buildings, and vegetation. Which computer vision technique is this?</p>",
      choices: ["Object detection", "Semantic segmentation", "Image classification", "Optical character recognition"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Semantic segmentation classifies every pixel in the image into a predefined class, producing a color-coded mask that outlines roads, buildings, and vegetation at pixel level.</p><p>Object detection draws bounding boxes around distinct objects but does not classify individual pixels. Image classification assigns a single label to the entire image rather than per-pixel labels. Optical character recognition reads text characters from images and is unrelated to pixel-level scene labeling.</p>"
    },
    {
      n: 35,
      prompt: "<p>A team wants to verify that their deployed generative AI application returns safe, relevant, and grounded answers before releasing to customers. Which Azure AI Foundry feature supports this systematic evaluation?</p>",
      choices: ["Prompt flow", "The model catalog", "Evaluations", "Content filters"],
      answer: 2,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Foundry evaluations allow teams to run test datasets through a deployed application and score responses against metrics such as groundedness, relevance, and fluency, providing systematic pre-release quality assurance.</p><p>Prompt flow builds orchestration pipelines but does not perform batch evaluation scoring. The model catalog is for browsing and deploying foundation models, not for evaluating a deployed application's response quality. Content filters are real-time moderation controls, not structured evaluation frameworks.</p>"
    },
    {
      n: 36,
      prompt: "<p>Which Azure AI Vision capability reads printed and handwritten text from images and returns machine-readable strings?</p>",
      choices: ["Image captioning", "Dense captioning", "Semantic segmentation", "OCR / Read"],
      answer: 3,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "easy",
      explanation: "<p>The OCR / Read capability in Azure AI Vision extracts printed and handwritten text from images and documents, returning recognized characters as structured text strings.</p><p>Image captioning generates a natural language description of the entire image content. Dense captioning generates captions for multiple regions in an image. Semantic segmentation classifies pixels by region type and does not produce text strings.</p>"
    },
    {
      n: 37,
      prompt: "<p>A content moderation team needs to automatically block user-generated text promoting violence before it reaches other users. Which Azure service is specifically designed for this purpose?</p>",
      choices: ["Azure AI Content Safety", "Azure AI Language", "Azure AI Foundry evaluations", "Azure OpenAI content filters"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Content Safety is a dedicated service that detects harmful content categories including violence, hate speech, sexual content, and self-harm in both user-generated and AI-generated text and images.</p><p>Azure AI Language analyzes text for sentiment and entities but is not a real-time content safety service. Azure AI Foundry evaluations assess model response quality in a development context, not live user content. Azure OpenAI content filters apply to Azure OpenAI Service outputs specifically, not arbitrary user-generated content in a general application.</p>"
    },
    {
      n: 38,
      prompt: "<p>In the Transformer architecture, which mechanism allows the model to weigh the relevance of different input words when generating each output token?</p>",
      choices: ["Convolutional filtering", "Attention", "Backpropagation", "Beam search"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "hard",
      explanation: "<p>The attention mechanism computes a weighted sum of all input token representations when producing each output token, letting the model focus on the most relevant parts of the input sequence at each step.</p><p>Convolutional filtering is used in convolutional neural networks for image processing, not for sequence modeling in Transformers. Backpropagation is the general algorithm for computing gradients during training, not an inference mechanism. Beam search is a decoding strategy for generating output sequences, not a relationship computation mechanism.</p>"
    },
    {
      n: 39,
      prompt: "<p>A call center routes incoming calls by detecting which product the customer mentions in the first 10 seconds. Which workload combination is needed?</p>",
      choices: ["Image classification followed by OCR", "Anomaly detection followed by summarization", "Speech to text followed by named entity recognition", "Text to speech followed by translation"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>First, speech to text converts the spoken audio into text; then named entity recognition (or a custom entity model) identifies which product name appears in that text, enabling routing.</p><p>Image classification and OCR process images, not audio calls. Anomaly detection and summarization do not extract product entities from speech. Text to speech converts text to audio, which is the reverse of what is needed here.</p>"
    },
    {
      n: 40,
      prompt: "<p>Which Azure AI service allows developers to build a custom neural voice that replicates a specific person's vocal characteristics, after obtaining appropriate consent?</p>",
      choices: ["Azure AI Translator", "Azure AI Language", "Azure AI Bot Service", "Azure AI Speech"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Speech includes Custom Neural Voice, which lets developers train a text-to-speech model that replicates a particular person's voice characteristics, subject to Microsoft's usage policies and required speaker consent.</p><p>Azure AI Translator converts text between languages and does not synthesize speech. Azure AI Language provides text analytics such as sentiment and named entity recognition, with no voice synthesis features. Azure AI Bot Service creates conversational interfaces but delegates speech processing to Azure AI Speech.</p>"
    },
    {
      n: 41,
      prompt: "<p>A developer needs to identify specific company logos in social media photos. There are no prebuilt models for these logos. Which Azure service should they use?</p>",
      choices: ["Azure AI Custom Vision object detection", "Azure AI Vision image analysis", "Azure AI Face", "Azure AI Document Intelligence"],
      answer: 0,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "hard",
      explanation: "<p>Azure AI Custom Vision object detection lets you train a model on your own labeled images to detect custom objects such as specific brand logos that are not available in general prebuilt models.</p><p>Azure AI Vision image analysis provides general tagging and object detection for common objects but cannot learn custom brand logos. Azure AI Face detects and identifies human faces, not logos. Azure AI Document Intelligence extracts fields from documents, not brand logos in photographs.</p>"
    },
    {
      n: 42,
      prompt: "<p>A bank offers customers a 24/7 assistant that answers account balance questions, resets PINs, and explains recent charges through a chat interface. Which AI workload is this?</p>",
      choices: ["Anomaly detection", "Conversational AI", "Knowledge mining", "Document processing"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Conversational AI covers chatbots and virtual assistants that interact with users through natural language dialog, handling tasks such as answering questions and executing actions on behalf of the user.</p><p>Anomaly detection flags unusual data patterns and does not interact with users in dialog. Knowledge mining extracts and indexes insights from large document sets rather than conducting real-time user conversations. Document processing reads and extracts fields from files rather than supporting interactive user assistance.</p>"
    },
    {
      n: 43,
      prompt: "<p>Which responsible AI principle requires that individuals whose data trains an AI model retain the right to have that data handled securely and used only for its stated purpose?</p>",
      choices: ["Transparency", "Fairness", "Privacy and security", "Accountability"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Privacy and security requires that AI systems protect personal data throughout its lifecycle, ensuring it is collected with consent, stored securely, and used only for the purposes individuals agreed to.</p><p>Transparency focuses on making AI behavior understandable, not data handling rights. Fairness addresses equitable treatment across demographic groups. Accountability assigns responsibility for AI outcomes, which is related but distinct from the individual data rights described here.</p>"
    },
    {
      n: 44,
      prompt: "<p>Two language model deployments are identical except one uses temperature 0.1 and the other uses 1.5. Which statement correctly describes the difference?</p>",
      choices: ["The 0.1 deployment produces more creative and varied responses", "Temperature has no effect on output variation", "The 1.5 deployment produces more deterministic and focused responses", "The 0.1 deployment produces more deterministic and focused responses"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>A lower temperature (closer to 0) makes token selection more deterministic, consistently picking the highest-probability tokens and producing focused, repetitive output. A higher temperature increases randomness and creativity.</p><p>The 0.1 deployment would not produce more creative output; that is the behavior of the 1.5 deployment. Temperature is a core inference parameter that directly controls output randomness, so it is not without effect. The 1.5 deployment produces more varied, not more deterministic, responses.</p>"
    },
    {
      n: 45,
      prompt: "<p>An e-commerce company wants to identify which pixels in a product photo belong to the item versus the background so they can automatically remove the background. Which technique is MOST appropriate?</p>",
      choices: ["Semantic segmentation", "Object detection", "Image classification", "OCR"],
      answer: 0,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Semantic segmentation classifies every pixel as belonging to the foreground subject or background, enabling precise background removal by producing a per-pixel mask of the product region.</p><p>Object detection draws a rectangular bounding box around the product but does not produce a precise pixel-level mask for background removal. Image classification labels the entire image but does not identify individual pixel regions. OCR reads text from images and has no relevance to background removal.</p>"
    },
    {
      n: 46,
      prompt: "<p>A compliance system scans employee emails to automatically tag mentions of competitor names, product codes, and executive names. Which NLP capability is being applied?</p>",
      choices: ["Key phrase extraction", "Named entity recognition", "Sentiment analysis", "PII detection"],
      answer: 1,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Named entity recognition (NER) identifies and classifies named entities in text into predefined categories such as organizations, products, and persons, which is exactly what the compliance system needs.</p><p>Key phrase extraction surfaces important topics and phrases but does not classify them into entity types. Sentiment analysis determines the emotional tone of text rather than identifying named items. PII detection targets sensitive personal data such as identification numbers, not general business entities like competitor names.</p>"
    },
    {
      n: 47,
      prompt: "<p>A logistics company wants employees to ask a conversational assistant to track shipments and file claims across web and Teams channels. Which Azure service manages the orchestration and channel integration?</p>",
      choices: ["Azure AI Language", "Azure AI Foundry prompt flow", "Azure AI Bot Service", "Azure AI Speech"],
      answer: 2,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Bot Service provides the framework and channel connectors needed to build, deploy, and manage conversational bots across multiple channels including Teams, web chat, and email.</p><p>Azure AI Language provides NLP capabilities such as intent classification that power understanding inside a bot, but it does not manage conversation flow or channel integration. Azure AI Foundry prompt flow orchestrates LLM pipelines but is not a full bot management and multichannel integration service. Azure AI Speech handles speech input and output but does not manage conversational state or channel routing.</p>"
    },
    {
      n: 48,
      prompt: "<p>A team uses Azure AI Search to make scanned legal contracts searchable and wants entity extraction during indexing. Which Azure AI Search feature enables this?</p>",
      choices: ["Full-text indexing", "Semantic ranking", "Faceted navigation", "AI enrichment with a skillset"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "hard",
      explanation: "<p>AI enrichment in Azure AI Search uses a skillset, a pipeline of AI skills, to extract entities, key phrases, and other structured information from raw documents during indexing, making enriched fields queryable.</p><p>Full-text indexing ingests and tokenizes text content but does not apply AI-based entity extraction. Semantic ranking re-orders search results using language understanding but does not extract entities during indexing. Faceted navigation enables filtering results by category, not entity extraction from documents.</p>"
    },
    {
      n: 49,
      prompt: "<p>An enterprise wants to reduce hallucinations in a deployed chatbot by connecting it to a corporate intranet search index at inference time, without retraining the model. Which technique does this describe?</p>",
      choices: ["Retrieval augmented generation", "Fine-tuning", "Prompt engineering", "Embedding generation"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>Retrieval augmented generation (RAG) retrieves relevant documents from an external index at query time and injects them into the prompt as grounding context, reducing hallucinations without changing the model's weights.</p><p>Fine-tuning retrains the model on domain-specific data and updates weights, so it does not fit the no-retraining requirement. Prompt engineering crafts static instructions in the system message but does not dynamically retrieve live corporate documents. Embedding generation converts text to vectors and is a prerequisite for building a retrieval system, not the retrieval technique itself.</p>"
    },
    {
      n: 50,
      prompt: "<p>An AI medical information system provides shorter, less detailed answers to users who phrase questions in certain regional dialects. Which two responsible AI principles are MOST directly violated?</p>",
      choices: ["Reliability and safety and accountability", "Fairness and inclusiveness", "Transparency and privacy and security", "Accountability and transparency"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Fairness is violated because the system treats users inequitably based on dialect, a proxy for cultural or ethnic background. Inclusiveness is violated because the system fails to serve all users equally regardless of how they communicate.</p><p>Reliability and safety and accountability are broad governance principles but do not specifically address discriminatory service based on dialect. Transparency concerns explainability of AI decisions, not differential service quality. Privacy and security protects personal data, which is unrelated to response length disparities.</p>"
    }
  ]}]
};
