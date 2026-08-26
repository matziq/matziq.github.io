window.AI9_DATA = window.AI9_DATA || {};

window.AI9_DATA.exam3 = {
  id: "exam3",
  name: "AI-900 \u2014 Practice Exam 3",
  timeMinutes: 45,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A manufacturing plant monitors thousands of sensors in real time and wants to alert engineers when a reading deviates significantly from its historical baseline. Which AI workload category BEST describes this?</p>",
      choices: ["Anomaly detection", "Computer vision", "Conversational AI", "Knowledge mining"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Anomaly detection identifies data points that deviate significantly from an expected pattern or baseline. Monitoring sensor readings and alerting on unexpected deviations is the textbook use case for this workload.</p><p>Computer vision analyzes image and video data and is not relevant to numeric sensor streams. Conversational AI builds dialog systems and chatbots. Knowledge mining extracts insights from large unstructured document repositories, not from real-time sensor time-series data.</p>"
    },
    {
      n: 2,
      prompt: "<p>A model must predict whether a bank transaction is fraudulent (yes or no). Which machine learning technique is MOST appropriate?</p>",
      choices: ["Regression", "Binary classification", "Clustering", "Multiclass classification"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Binary classification predicts one of exactly two discrete outcomes. Because the target is a yes-or-no label (fraudulent vs. legitimate), binary classification is the correct technique.</p><p>Regression predicts a continuous numeric value such as an amount or score, not a two-class label. Clustering is an unsupervised technique that groups data without predefined labels. Multiclass classification handles more than two classes, which is unnecessary when only two outcomes are possible.</p>"
    },
    {
      n: 3,
      prompt: "<p>A self-driving car system must locate all pedestrians, cyclists, and traffic signs in camera frames and mark their positions. Which computer vision task BEST describes this requirement?</p>",
      choices: ["Image classification", "Semantic segmentation", "Object detection", "Optical character recognition"],
      answer: 2,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Object detection identifies multiple objects within an image and marks each one with a bounding box and class label. This provides the location and count of every detected entity in the frame, which is exactly what a self-driving system needs.</p><p>Image classification assigns a single label to the entire image and cannot locate individual objects. Semantic segmentation labels every pixel but the vehicle system needs object locations with bounding boxes, not pixel masks. Optical character recognition extracts text from images and does not detect or locate physical objects like pedestrians.</p>"
    },
    {
      n: 4,
      prompt: "<p>A marketing team wants to analyze customer reviews and automatically determine whether each review expresses a positive, negative, or mixed opinion. Which NLP capability is MOST appropriate?</p>",
      choices: ["Key phrase extraction", "Language detection", "Named entity recognition", "Sentiment analysis"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Sentiment analysis evaluates the emotional polarity of text, returning positive, negative, neutral, or mixed scores. This directly addresses the requirement to classify each review by opinion.</p><p>Key phrase extraction identifies important phrases but does not assign a sentiment polarity. Language detection identifies what language a text is written in and provides no opinion information. Named entity recognition categorizes mentions of people, organizations, and locations but does not measure sentiment.</p>"
    },
    {
      n: 5,
      prompt: "<p>A team wants a model to answer questions using the company handbook without retraining. Which approach should they use FIRST?</p>",
      choices: ["Use retrieval augmented generation to ground the model in the handbook", "Fine-tune a base model on the handbook text", "Increase the temperature setting for more complete responses", "Train a clustering model to index the handbook"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>Retrieval augmented generation (RAG) retrieves relevant passages from the handbook at query time and injects them as context, allowing the model to answer from that source without any retraining or weight changes.</p><p>Fine-tuning updates model weights and requires a training run, violating the no-retraining constraint. Increasing temperature makes responses more varied and random, not more grounded in specific documents. Clustering is an unsupervised grouping technique and does not enable the model to answer questions from a specific knowledge source.</p>"
    },
    {
      n: 6,
      prompt: "<p>A bank's AI makes lending decisions. Regulators require that applicants be told why they were denied credit. Which responsible AI principle does this MOST directly address?</p>",
      choices: ["Fairness", "Transparency", "Reliability and safety", "Privacy and security"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Transparency requires that AI systems and their decisions be understandable and explainable to those affected. Providing applicants with reasons for denial directly enacts this principle.</p><p>Fairness concerns equitable treatment across demographic groups, not the individual explanation of a decision. Reliability and safety focuses on consistent performance and operational safety. Privacy and security concerns the protection of personal data during storage and processing.</p>"
    },
    {
      n: 7,
      prompt: "<p>A binary classifier produces: TP = 90, FP = 10, FN = 60, TN = 840. What is the recall?</p>",
      choices: ["0.90", "0.75", "0.60", "0.50"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>Recall = TP / (TP + FN) = 90 / (90 + 60) = 90 / 150 = 0.60. It measures the fraction of actual positives that the model correctly identifies.</p><p>0.90 is the precision (TP / (TP + FP) = 90 / 100), not the recall. 0.75 does not correspond to any standard metric calculated from these values. 0.50 is not derivable from the given confusion matrix using standard formulas.</p>"
    },
    {
      n: 8,
      prompt: "<p>A startup needs to classify product images into 20 custom categories that are not in any pre-built Azure catalog. Which Azure service is MOST appropriate?</p>",
      choices: ["Azure AI Vision Image Analysis API", "Azure AI Document Intelligence", "Azure AI Face", "Azure AI Custom Vision"],
      answer: 3,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Custom Vision lets you train a custom image classifier using your own labeled images. When the required categories are specific to your domain and absent from pre-built models, Custom Vision is the right choice.</p><p>The Azure AI Vision Image Analysis API uses general-purpose pre-built models that cannot be extended to arbitrary custom product categories without training. Azure AI Document Intelligence extracts structured fields from forms and documents, not product images. Azure AI Face is specifically for facial detection and analysis and has no role in custom product classification.</p>"
    },
    {
      n: 9,
      prompt: "<p>A global e-commerce company needs to translate product descriptions from English into 50 languages. Which Azure service is MOST appropriate?</p>",
      choices: ["Azure AI Translator", "Azure AI Language", "Azure AI Speech", "Azure AI Bot Service"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Translator provides text-to-text machine translation and supports translating a source text into many target languages simultaneously, making it the correct service for large-scale document translation.</p><p>Azure AI Language provides text analytics features such as sentiment analysis and key phrase extraction but does not translate between languages. Azure AI Speech handles audio transcription and synthesis, not written text translation. Azure AI Bot Service is a framework for building conversational bots and does not provide translation directly.</p>"
    },
    {
      n: 10,
      prompt: "<p>A developer wants to interactively test different system prompts with a deployed Azure OpenAI model before writing application code. Which Azure AI Foundry feature is MOST appropriate?</p>",
      choices: ["Prompt flow", "The playground", "Azure AI Content Safety", "The model registry"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>The Azure AI Foundry playground is an interactive browser-based interface that lets developers submit prompts to a deployed model, adjust parameters, and review completions in real time without writing code.</p><p>Prompt flow is a visual orchestration tool for building multi-step LLM pipelines, not a simple interactive testing interface. Azure AI Content Safety is a moderation service for detecting harmful content, not a prompt testing environment. The model registry stores and versions trained models and is not an interactive interface for prompt experimentation.</p>"
    },
    {
      n: 11,
      prompt: "<p>A company builds a virtual assistant that answers customer questions about orders, products, and returns through a chat interface. Which AI workload category BEST describes this?</p>",
      choices: ["Knowledge mining", "Document processing", "Conversational AI", "Computer vision"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Conversational AI encompasses chatbots and virtual assistants that engage users in natural language dialog to answer questions and complete tasks. A customer-facing chat assistant is the core example of this workload.</p><p>Knowledge mining extracts and organizes insights from document repositories and powers search; it is a supporting technology but not the top-level workload category for a chat assistant. Document processing refers to extracting structured data from individual documents. Computer vision analyzes images and video and plays no role in a text-based chat interface.</p>"
    },
    {
      n: 12,
      prompt: "<p>A team registers a connection to an Azure Blob Storage container in Azure Machine Learning so training scripts can reference the data by a logical name. What is this component called?</p>",
      choices: ["A compute instance", "A model endpoint", "A training pipeline", "A datastore"],
      answer: 3,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>A datastore in Azure Machine Learning is a registered connection to a storage service such as Azure Blob Storage or Azure Data Lake. It allows training scripts and pipelines to reference data by a logical name without hardcoding credentials or storage paths.</p><p>A compute instance is a managed development VM for running notebooks and experiments. A model endpoint is the deployment target that serves model predictions. A training pipeline is an orchestrated sequence of steps that prepares data and trains a model; it uses datastores but is not itself the storage connection.</p>"
    },
    {
      n: 13,
      prompt: "<p>A developer needs to extract all printed text from scanned legal documents for full-text indexing. Which computer vision capability is MOST appropriate?</p>",
      choices: ["Optical character recognition (OCR)", "Object detection", "Semantic segmentation", "Image classification"],
      answer: 0,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "easy",
      explanation: "<p>Optical character recognition (OCR) reads printed and handwritten text from images and converts it to machine-readable text strings, which is exactly what is needed to extract and index the text content of scanned documents.</p><p>Object detection draws bounding boxes around physical objects and is not designed to read text content from documents. Semantic segmentation labels pixels by region and has no capability to interpret text characters. Image classification assigns a category label to the whole image and does not extract individual text strings.</p>"
    },
    {
      n: 14,
      prompt: "<p>A compliance team wants to automatically identify all company names, person names, and locations mentioned in financial reports. Which Azure AI Language capability should they use?</p>",
      choices: ["Sentiment analysis", "Named entity recognition", "PII detection", "Question answering"],
      answer: 1,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Named entity recognition (NER) identifies and categorizes mentions of real-world entities such as organizations, people, and locations in text. This directly addresses the requirement to extract company names, person names, and locations from financial reports.</p><p>Sentiment analysis measures emotional polarity and does not categorize entity types. PII detection is specialized for privacy-sensitive personal data such as Social Security numbers and is not the right tool for general business entity extraction. Question answering builds a query interface over a knowledge base and is not designed to scan documents for entity mentions.</p>"
    },
    {
      n: 15,
      prompt: "<p>A developer wants a GPT model to always respond in a formal, professional tone and never discuss competitors. Which prompt engineering technique achieves this MOST reliably across every conversation turn?</p>",
      choices: ["Adding more few-shot examples to each user message", "Reducing the max token count", "Setting a detailed system message that defines persona and constraints", "Increasing the temperature to reduce repetition"],
      answer: 2,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>A system message is sent before the conversation and defines the model's persona, tone, and behavioral constraints. Because it persists for the entire session, it reliably enforces consistent behavior across all turns.</p><p>Few-shot examples in user messages guide style but do not establish a persistent persona or policy constraint. Reducing max tokens limits response length but has no effect on tone or topic restrictions. Increasing temperature makes responses more varied and random, which is contrary to the goal of consistent, policy-compliant output.</p>"
    },
    {
      n: 16,
      prompt: "<p>An AI system that analyzes medical records stores patient data in an unencrypted database accessible to unauthorized staff. Which responsible AI principle is PRIMARILY violated?</p>",
      choices: ["Transparency", "Fairness", "Reliability and safety", "Privacy and security"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Privacy and security requires that AI systems protect personal data and prevent unauthorized access. Storing patient records unencrypted and accessible to unauthorized personnel is a direct violation of this principle.</p><p>Transparency concerns explainability of AI decisions, not data protection. Fairness concerns equitable treatment across demographic groups, not data access controls. Reliability and safety focuses on consistent model performance and operational safety, not on data security practices.</p>"
    },
    {
      n: 17,
      prompt: "<p>A logistics company wants to predict the weight of packages based on their dimensions. Which machine learning technique is MOST appropriate?</p>",
      choices: ["Regression", "Binary classification", "Multiclass classification", "Clustering"],
      answer: 0,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Regression predicts a continuous numeric output. Predicting package weight from dimensional measurements is a continuous value prediction problem, making regression the correct technique.</p><p>Binary classification predicts one of two discrete categories, not a numeric value. Multiclass classification predicts a category from more than two options, also not a numeric value. Clustering is an unsupervised method that groups data by similarity without predicting a target value.</p>"
    },
    {
      n: 18,
      prompt: "<p>A financial firm needs to automatically extract vendor name, invoice number, date, and line items from thousands of supplier invoices. Which Azure service is MOST appropriate?</p>",
      choices: ["Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Vision Read API", "Azure AI Face"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Document Intelligence is purpose-built to extract structured fields and key-value pairs from forms and documents including invoices, receipts, and contracts, making it the correct choice for structured invoice data extraction.</p><p>Azure AI Custom Vision trains custom image classifiers and object detectors and is not designed for document field extraction. The Azure AI Vision Read API extracts raw text via OCR but does not understand document structure or semantic fields. Azure AI Face is specialized for facial detection and analysis and has no relevance to invoice processing.</p>"
    },
    {
      n: 19,
      prompt: "<p>A developer needs to analyze customer support tickets to extract key phrases, detect the language, and classify sentiment in a single service. Which Azure service provides all these capabilities?</p>",
      choices: ["Azure AI Speech", "Azure AI Translator", "Azure AI Language", "Azure AI Bot Service"],
      answer: 2,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Language is a unified text analytics service that provides key phrase extraction, language detection, and sentiment analysis as individual features accessible through a single API, making it the one-stop solution for these requirements.</p><p>Azure AI Speech handles audio transcription and synthesis and does not analyze written text for phrases or sentiment. Azure AI Translator provides text translation between languages but does not offer sentiment analysis or key phrase extraction. Azure AI Bot Service is a conversational framework that relies on other services for language analysis rather than providing it directly.</p>"
    },
    {
      n: 20,
      prompt: "<p>A company deploys a customer-facing Azure OpenAI chatbot that sometimes outputs hate speech. Which Azure service should be configured to detect and block this content at the API level before it reaches users?</p>",
      choices: ["Azure AI Foundry prompt flow", "Azure Machine Learning responsible AI dashboard", "Azure AI Language sentiment analysis", "Azure AI Content Safety"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "hard",
      explanation: "<p>Azure AI Content Safety is a dedicated service for detecting and blocking harmful content categories including hate speech, violence, self-harm, and sexual content in both model inputs and outputs at the API level.</p><p>Azure AI Foundry prompt flow is an orchestration tool for building LLM workflows and does not act as a content moderation filter. The Azure Machine Learning responsible AI dashboard analyzes model fairness and explainability after training and is not an inference-time content filter. Azure AI Language sentiment analysis classifies emotional polarity and does not detect or block specific harmful content categories.</p>"
    },
    {
      n: 21,
      prompt: "<p>A law firm uses AI to automatically read contracts, extract clauses, and populate a case management system without manual data entry. Which AI workload BEST describes this?</p>",
      choices: ["Document processing", "Conversational AI", "Anomaly detection", "Generative AI"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Document processing is the AI workload focused on extracting structured information from unstructured documents such as contracts, forms, and reports. Automatically reading contracts and extracting clauses is the defining example of this workload.</p><p>Conversational AI builds dialog systems for user interaction and is not focused on batch document extraction. Anomaly detection identifies unusual deviations in data patterns and has no relevance to contract clause extraction. Generative AI creates new content and, while it could be used to summarize documents, the primary workload here is structured extraction, not generation.</p>"
    },
    {
      n: 22,
      prompt: "<p>A model achieves 98% accuracy on training data but only 55% on the test set. Which technique would MOST directly address this problem?</p>",
      choices: ["Switching the algorithm from classification to regression", "Adding regularization or reducing model complexity to reduce overfitting", "Collecting a larger test dataset", "Increasing the learning rate during training"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>The large gap between training accuracy and test accuracy is a classic sign of overfitting, where the model memorized training examples instead of learning generalizable patterns. Regularization penalizes model complexity to prevent memorization; reducing model complexity achieves the same effect directly.</p><p>Switching from classification to regression changes the output type and would not fix a generalization gap in a classification model. Collecting a larger test dataset would give a more reliable estimate of performance but would not fix the model's tendency to overfit. Increasing the learning rate changes how quickly weights are updated and typically does not reduce overfitting; it may worsen instability.</p>"
    },
    {
      n: 23,
      prompt: "<p>A medical imaging team needs to precisely outline tumor boundaries at the pixel level in MRI scans so that volume can be measured accurately. Which computer vision technique is MOST appropriate?</p>",
      choices: ["Object detection with bounding boxes", "Image classification", "Semantic segmentation", "Optical character recognition"],
      answer: 2,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Semantic segmentation assigns a class label to every pixel, producing a precise pixel-level map of each region. This is necessary when exact boundary outlines are required for measurement, as in tumor volume calculation.</p><p>Object detection draws bounding boxes around regions of interest but does not produce the pixel-precise boundaries needed for volume measurement. Image classification assigns a single label to the whole image and cannot delineate sub-regions. Optical character recognition reads text and is irrelevant to tissue boundary detection.</p>"
    },
    {
      n: 24,
      prompt: "<p>A multilingual support portal receives tickets in unknown languages and needs to route them to the correct regional team. Which NLP capability should be applied FIRST?</p>",
      choices: ["Sentiment analysis", "Key phrase extraction", "Named entity recognition", "Language detection"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Language detection identifies the language of a text document, which is the prerequisite step before any routing or further language-specific processing can be performed.</p><p>Sentiment analysis determines the emotional tone but cannot identify what language the ticket is written in. Key phrase extraction identifies important phrases but requires knowing the language first to be accurate. Named entity recognition is also language-dependent and cannot serve as the first routing step before language is identified.</p>"
    },
    {
      n: 25,
      prompt: "<p>A company wants an LLM to use specialized medical terminology correctly in writing style across all queries, without injecting documents at every request. Which technique BEST addresses this requirement?</p>",
      choices: ["Fine-tuning the model on domain-specific medical text", "Retrieval augmented generation with a medical knowledge base", "Increasing the context window size", "Using a higher temperature for more creative outputs"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>Fine-tuning adjusts the model's weights using domain-specific examples, encoding the specialized terminology and writing style into the model itself. After fine-tuning, the model applies this style to all queries without needing documents injected at runtime.</p><p>Retrieval augmented generation injects documents at every query, which is explicitly what this requirement wants to avoid. Increasing context window size allows more text per request but does not teach the model new terminology or style. Higher temperature produces more varied and creative outputs but does not encode domain vocabulary into the model's behavior.</p>"
    },
    {
      n: 26,
      prompt: "<p>An AI voice assistant works accurately for speakers with standard American English accents but frequently misrecognizes speech from users with strong regional or non-native accents. Which responsible AI principle is MOST relevant?</p>",
      choices: ["Fairness", "Inclusiveness", "Transparency", "Reliability and safety"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Inclusiveness requires that AI systems be designed to empower and serve all people, including those from diverse linguistic and cultural backgrounds. Failing to work reliably for users with non-standard accents excludes a significant population and violates the principle of building AI that works for everyone.</p><p>Fairness is closely related but focuses primarily on equitable outcomes and preventing discriminatory decisions; the core issue here is that the system was not designed to include the full diversity of users. Transparency concerns how decisions are explained and communicated. Reliability and safety focuses on consistent correct operation, but the root cause is not a random failure; it is a systematic design gap in serving diverse users.</p>"
    },
    {
      n: 27,
      prompt: "<p>A team wants Azure Machine Learning to automatically test multiple algorithms and hyperparameter combinations to find the best classification model without writing training code. Which feature should they use?</p>",
      choices: ["Azure Machine Learning designer", "A compute cluster with GPU nodes", "Automated machine learning (AutoML)", "The Azure Machine Learning model registry"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Automated machine learning (AutoML) systematically iterates through algorithms, preprocessing steps, and hyperparameter ranges to find the best-performing model for the specified task, all without requiring the user to write training code.</p><p>The Azure Machine Learning designer is a drag-and-drop pipeline builder where users manually select and configure each component; it does not perform automated algorithm search. A compute cluster with GPU nodes provides computational resources but has no built-in algorithm search capability. The model registry stores and versions completed trained models but is not involved in searching for the best algorithm.</p>"
    },
    {
      n: 28,
      prompt: "<p>A company wants to verify that a person attempting to log in is the same individual whose face was enrolled during registration. Which Azure AI Face capability is required?</p>",
      choices: ["Face detection", "Face attribute analysis", "Azure AI Custom Vision with face labels", "Face verification"],
      answer: 3,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Face verification compares a detected face against a stored reference face to determine whether they belong to the same person. This one-to-one comparison is exactly what identity verification at login requires.</p><p>Face detection locates faces in an image and returns bounding boxes and basic attributes but does not compare identities. Face attribute analysis returns properties like estimated age, glasses, or smile but cannot confirm who the person is. Azure AI Custom Vision is an image classification and detection service that is not designed for biometric identity verification.</p>"
    },
    {
      n: 29,
      prompt: "<p>A company wants to build a conversational agent that integrates with Microsoft Teams and handles employee vacation requests using natural language. Which Azure service provides the BEST framework for building and deploying this bot?</p>",
      choices: ["Azure AI Bot Service", "Azure AI Language", "Azure AI Speech", "Azure AI Translator"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Bot Service is the Azure framework for building, hosting, and deploying conversational bots. It provides channel integration including Microsoft Teams and can orchestrate language understanding and backend logic.</p><p>Azure AI Language provides text analytics capabilities such as sentiment and entity recognition but is not a bot deployment framework. Azure AI Speech handles audio processing and is a component used within bots, not the deployment framework itself. Azure AI Translator translates text between languages and is not a bot orchestration framework.</p>"
    },
    {
      n: 30,
      prompt: "<p>A large enterprise needs to host a specific open-source LLM with dedicated, predictable low-latency responses for a high-volume internal application. They are willing to manage the compute. Which Azure AI Foundry deployment type is MOST appropriate?</p>",
      choices: ["Serverless API deployment", "Managed compute deployment", "A compute instance in Azure Machine Learning", "Azure OpenAI Service fine-tune deployment"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "hard",
      explanation: "<p>A managed compute deployment in Azure AI Foundry provisions dedicated virtual machines for the specified model, providing consistent low-latency responses and allowing the organization to manage VM size and scaling for predictable high-volume workloads.</p><p>A serverless API deployment uses shared infrastructure on a pay-per-token basis, which can introduce variable latency under high load and is not the right choice when dedicated, predictable performance is required. A compute instance is an Azure Machine Learning development VM and is not a production-scale model serving infrastructure. Azure OpenAI Service fine-tune deployments are for fine-tuned OpenAI models, not arbitrary open-source models from the model catalog.</p>"
    },
    {
      n: 31,
      prompt: "<p>A content team uses AI to automatically draft blog posts, social media captions, and product descriptions from a brief outline. Which AI workload category BEST describes this?</p>",
      choices: ["Knowledge mining", "Computer vision", "Generative AI", "Anomaly detection"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Generative AI creates new text, images, audio, or other content from a prompt or outline. Drafting blog posts and captions from briefs is the defining use case of text generative AI.</p><p>Knowledge mining extracts and indexes insights from existing documents but does not generate new original content. Computer vision analyzes images and video and plays no role in text content creation. Anomaly detection identifies unusual patterns in data and is completely unrelated to content generation.</p>"
    },
    {
      n: 32,
      prompt: "<p>A retailer wants to group customers into purchase-behavior segments without using any predefined categories. Which machine learning technique is MOST appropriate?</p>",
      choices: ["Regression", "Binary classification", "Multiclass classification", "Clustering"],
      answer: 3,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Clustering is an unsupervised technique that discovers natural groupings in data based on feature similarity, without requiring predefined labels or categories. Customer segmentation from behavioral data is a classic clustering use case.</p><p>Regression predicts a continuous numeric value and requires a labeled target variable. Binary classification predicts one of two predefined labels. Multiclass classification predicts one label from a predefined set of categories. Both classification types require labeled training examples and predefined classes, which this scenario explicitly does not have.</p>"
    },
    {
      n: 33,
      prompt: "<p>A warehouse system must count boxes on a pallet and get each box's position. A developer chooses object detection over semantic segmentation. Why is object detection the BEST choice here?</p>",
      choices: ["Object detection provides bounding boxes that locate and count individual items without requiring pixel-level precision", "Semantic segmentation is slower and requires more compute than object detection in all scenarios", "Object detection can read printed labels on boxes; semantic segmentation cannot", "Object detection is designed for 3D spaces; semantic segmentation is only for 2D images"],
      answer: 0,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "hard",
      explanation: "<p>Object detection returns a bounding box and class label for each detected instance, which directly provides both the count and the position of every box on the pallet. This meets the requirement efficiently without the overhead of pixel-level segmentation.</p><p>Semantic segmentation can be faster than object detection in some implementations, so the claim that it is always slower is not accurate; the key reason is fitness for purpose, not speed. Object detection does not inherently read text; OCR is required for that. Both object detection and semantic segmentation work on 2D images; neither is inherently 3D.</p>"
    },
    {
      n: 34,
      prompt: "<p>A legal team receives hundreds of lengthy contracts and wants AI to automatically produce a 3-sentence summary of each document. Which Azure AI Language capability is MOST appropriate?</p>",
      choices: ["Key phrase extraction", "Summarization", "Named entity recognition", "Question answering"],
      answer: 1,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Summarization condenses a document into a shorter version that captures the main points. Extractive and abstractive summarization features in Azure AI Language are designed for exactly this requirement.</p><p>Key phrase extraction identifies the most significant phrases in a document but does not produce a coherent condensed narrative summary. Named entity recognition tags mentions of people, places, and organizations but does not synthesize a summary. Question answering requires a specific question to be posed and returns an answer; it does not automatically generate a document summary.</p>"
    },
    {
      n: 35,
      prompt: "<p>A customer-facing product description generator must produce consistent, accurate descriptions with minimal variation across repeated runs. Which model parameter should be set LOW?</p>",
      choices: ["The max token count", "The number of few-shot examples", "Temperature", "The context window size"],
      answer: 2,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>Temperature controls the randomness of the model's output distribution. A low temperature (close to 0) makes the model more deterministic and consistent, producing the same or very similar outputs for the same input, which is ideal for factual, consistent product descriptions.</p><p>Max token count controls the maximum response length and has no direct effect on output variation or consistency. The number of few-shot examples guides format and style but does not make outputs deterministic. Context window size determines how much input the model can process and does not control output randomness.</p>"
    },
    {
      n: 36,
      prompt: "<p>A self-driving vehicle AI system occasionally misclassifies obstacles at night, and there is no fallback mechanism to alert the driver. Which responsible AI principle does this MOST directly violate?</p>",
      choices: ["Fairness", "Transparency", "Privacy and security", "Reliability and safety"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Reliability and safety requires that AI systems perform correctly and consistently, especially in safety-critical domains, and that safeguards or fallback mechanisms exist when the system may fail. An autonomous vehicle with no fallback for nighttime misclassification is a direct violation of this principle.</p><p>Fairness concerns equitable treatment of different groups and is not the primary issue in a technical safety failure. Transparency concerns explainability of decisions, not the presence of safety fallback mechanisms. Privacy and security concerns data protection and is unrelated to obstacle detection reliability.</p>"
    },
    {
      n: 37,
      prompt: "<p>A fraud detection system must evaluate each credit card transaction within 200 milliseconds and return an approve or reject decision. Which Azure Machine Learning endpoint type should be used?</p>",
      choices: ["A real-time inference endpoint", "A batch inference endpoint", "A training pipeline endpoint", "A compute cluster job endpoint"],
      answer: 0,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>A real-time inference endpoint exposes a model as a low-latency REST API that returns predictions synchronously for individual requests within milliseconds, making it the correct choice for transaction-by-transaction fraud scoring.</p><p>A batch inference endpoint processes large collections of records asynchronously and is not designed for sub-second, per-transaction scoring. A training pipeline endpoint triggers model retraining jobs, not inference. A compute cluster job endpoint is used for running training or data processing jobs, not for low-latency scoring of individual records.</p>"
    },
    {
      n: 38,
      prompt: "<p>A broadcast company wants to automatically generate transcripts, identify speakers, and tag topics in recorded news programs. Which Azure service is MOST appropriate?</p>",
      choices: ["Azure AI Vision Image Analysis API", "Azure AI Video Indexer", "Azure AI Speech batch transcription only", "Azure AI Document Intelligence"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Video Indexer is purpose-built for video analysis and provides temporal intelligence including speaker diarization, full audio transcription, speaker identification, topic detection, and scene analysis all from a single service.</p><p>The Azure AI Vision Image Analysis API analyzes individual image frames and cannot process audio, transcribe speech, or identify speakers. Azure AI Speech batch transcription converts audio to text but does not perform speaker identification or topic tagging. Azure AI Document Intelligence extracts structured data from documents and has no capability to process audio or video content.</p>"
    },
    {
      n: 39,
      prompt: "<p>A developer needs to perform sentiment analysis and key phrase extraction on millions of customer reviews at low cost, without customizing a large language model. Which Azure service is MOST appropriate?</p>",
      choices: ["Azure OpenAI Service with a GPT-4 deployment", "Azure AI Speech", "Azure AI Language", "Azure AI Translator"],
      answer: 2,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "hard",
      explanation: "<p>Azure AI Language provides built-in, cost-effective sentiment analysis and key phrase extraction APIs that require no model customization or training. They are designed for high-volume text analytics workloads at predictable, low per-transaction pricing.</p><p>Azure OpenAI Service with GPT-4 can perform these tasks but at much higher per-token cost and without purpose-built analytics endpoints; it is not the cost-optimal choice for standard NLP analytics. Azure AI Speech handles audio and does not analyze written text for sentiment. Azure AI Translator translates text between languages and provides no sentiment or key phrase analysis.</p>"
    },
    {
      n: 40,
      prompt: "<p>A team needs to build an end-to-end application that retrieves documents from Azure AI Search, formats a prompt, calls an Azure OpenAI model, and formats the output for a web API. Which Azure AI Foundry tool BEST supports building this orchestrated pipeline?</p>",
      choices: ["Azure AI Foundry model catalog", "Azure AI Content Safety", "Azure AI Foundry Evaluations", "Azure AI Foundry prompt flow"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "hard",
      explanation: "<p>Azure AI Foundry prompt flow is a visual low-code authoring tool for building, testing, and deploying orchestrated LLM workflows. It supports chaining retrieval, prompt formatting, LLM calls, and output processing nodes into a deployable pipeline, which is exactly the architecture described.</p><p>The Azure AI Foundry model catalog lets you browse and deploy models but does not orchestrate multi-step application pipelines. Azure AI Content Safety screens content for harmful material and plays no role in orchestrating a RAG pipeline. Azure AI Foundry Evaluations runs quality assessments on model outputs and is not a tool for building inference pipelines.</p>"
    },
    {
      n: 41,
      prompt: "<p>An enterprise uses AI to search thousands of internal documents using natural language queries to surface relevant passages, even when exact keywords are not present. Which AI workload category BEST describes this?</p>",
      choices: ["Anomaly detection", "Computer vision", "Conversational AI", "Knowledge mining"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Knowledge mining uses AI to extract, index, and make searchable the insights embedded in large collections of unstructured documents, enabling semantic search that goes beyond keyword matching. Enterprise document search is a primary knowledge mining scenario.</p><p>Anomaly detection finds unusual patterns in data streams and is unrelated to document search. Computer vision analyzes images and video and plays no role in text-based document retrieval. Conversational AI builds dialog systems; while it may sit on top of a knowledge mining layer, the underlying workload that enables intelligent document search is knowledge mining.</p>"
    },
    {
      n: 42,
      prompt: "<p>A team is comparing two binary classifiers for detecting a rare disease and wants a metric that evaluates overall discrimination ability across all classification thresholds, not just one threshold. Which metric is MOST appropriate?</p>",
      choices: ["Accuracy", "AUC-ROC", "Mean Absolute Error", "R-squared"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>AUC-ROC (area under the receiver operating characteristic curve) measures the model's ability to discriminate between positives and negatives across all possible thresholds. For a rare-disease classification problem where threshold choice matters greatly, AUC-ROC provides a threshold-independent comparison of the two models.</p><p>Accuracy is dominated by the majority class in imbalanced datasets and evaluated at a single threshold, making it a poor choice for rare-event classification. Mean Absolute Error is a regression metric for continuous predictions and is not applicable to classification. R-squared is also a regression metric and has no meaning for binary classification tasks.</p>"
    },
    {
      n: 43,
      prompt: "<p>A security system must scan every visitor's face at a building entrance to identify known individuals against a pre-enrolled watchlist. Which computer vision capability is required?</p>",
      choices: ["Facial detection only", "Facial attribute analysis", "Facial recognition", "Semantic segmentation"],
      answer: 2,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Facial recognition goes beyond detecting that a face is present; it compares detected faces against a database of enrolled identities to determine who the person is. Matching visitors against a watchlist is a facial recognition (identification) task.</p><p>Facial detection only locates faces and returns bounding boxes without identifying who the person is. Facial attribute analysis returns properties like estimated age or smile but cannot identify which enrolled person is present. Semantic segmentation labels pixels by region and is not used for identity verification.</p>"
    },
    {
      n: 44,
      prompt: "<p>A customer service team wants a bot that understands natural language requests such as 'Cancel my order' and maps them to predefined intents and entities. Which NLP capability is MOST appropriate?</p>",
      choices: ["Sentiment analysis with opinion mining", "Standalone named entity recognition", "Text summarization", "Conversational language understanding"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Conversational language understanding (CLU) is designed to interpret natural language utterances, classify them into predefined intents, and extract relevant entities. It is the correct capability for a bot that must map user phrases to actions.</p><p>Sentiment analysis measures the emotional tone of text and does not classify utterances into action intents. Standalone named entity recognition identifies entity types such as names and dates but does not classify intents or enable action routing. Text summarization condenses documents and is not designed to parse user commands into structured intents and entities.</p>"
    },
    {
      n: 45,
      prompt: "<p>A generative AI news assistant sometimes presents outdated facts from its training data. A team adds real-time news retrieval that injects the latest articles as context before each query. This is an example of which technique?</p>",
      choices: ["Grounding", "Fine-tuning", "Temperature reduction", "Prompt injection prevention"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>Grounding connects the model's responses to an external, up-to-date data source rather than relying solely on pre-trained knowledge. Injecting retrieved news articles as context before each query is the definition of grounding the model in current information.</p><p>Fine-tuning updates model weights on new data but does not provide real-time information at inference time and would quickly become stale. Temperature reduction makes responses more deterministic but does not update the model's factual knowledge. Prompt injection prevention is a security technique that guards against malicious inputs overriding instructions and is unrelated to factual grounding.</p>"
    },
    {
      n: 46,
      prompt: "<p>An AI system makes high-stakes decisions autonomously, but no individual or team has been assigned ownership of its performance, monitoring, or error remediation. Which responsible AI principle is MOST violated?</p>",
      choices: ["Transparency", "Accountability", "Inclusiveness", "Reliability and safety"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "hard",
      explanation: "<p>Accountability requires that people and organizations take clear responsibility for AI systems and their outcomes. When no one owns the monitoring or remediation of a high-stakes AI system, the accountability principle is violated because there is no mechanism for redress or correction.</p><p>Transparency concerns how decisions are explained and communicated, not who is responsible for governance. Inclusiveness focuses on serving diverse populations equitably, not on ownership and governance structures. Reliability and safety focuses on consistent correct operation; while related, the specific gap here is organizational ownership, which is accountability.</p>"
    },
    {
      n: 47,
      prompt: "<p>Which characteristic of the Transformer architecture allows it to capture relationships between words that are far apart in a sentence, regardless of their distance?</p>",
      choices: ["Convolutional filters that slide across the input sequence", "Recurrent hidden states passed step by step between tokens", "Self-attention mechanisms that compute relevance scores between all pairs of tokens simultaneously", "Dropout layers that regularize long-distance dependencies"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>Self-attention allows every token to directly attend to every other token in the sequence in a single operation, assigning relevance weights regardless of positional distance. This is what makes Transformers superior to RNNs for capturing long-range dependencies.</p><p>Convolutional filters have a fixed local receptive field and cannot directly model long-range dependencies. Recurrent hidden states pass information step by step; distant relationships must travel through many steps, which leads to vanishing gradient problems. Dropout regularizes networks during training but does not affect the model's structural ability to connect distant tokens.</p>"
    },
    {
      n: 48,
      prompt: "<p>Before calling a GPT model through the Azure OpenAI Service REST API, a developer must first create which resource within the Azure OpenAI Service?</p>",
      choices: ["A prompt flow pipeline", "An Azure AI Foundry project hub", "An Azure AI Content Safety instance", "A model deployment"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>A deployment is the Azure OpenAI Service construct that assigns a specific model version to an endpoint with a designated name, quota, and configuration. API calls are made against the deployment name, so it must exist before any inference can occur.</p><p>A prompt flow pipeline is an Azure AI Foundry orchestration construct and is not required for direct REST API calls to Azure OpenAI. An Azure AI Foundry project hub is an organizational resource for managing AI projects and is not a prerequisite for making Azure OpenAI API calls. An Azure AI Content Safety instance is a separate moderation service and is not required for the base model inference call.</p>"
    },
    {
      n: 49,
      prompt: "<p>The Microsoft responsible generative AI process has four stages. A team measures the frequency and severity of biased outputs across different user groups after identifying potential harms. Which stage does this represent?</p>",
      choices: ["Measure", "Identify", "Mitigate", "Operate"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>The Measure stage involves quantifying the presence and severity of identified harms in model outputs, including systematic testing across user groups to understand the scope of any issues discovered in the Identify stage.</p><p>The Identify stage is the preceding step where potential harms are catalogued; the team has already passed this stage. The Mitigate stage is where countermeasures such as prompt engineering, filtering, and fine-tuning are applied after measurement. The Operate stage covers deployment governance, monitoring, and incident response after the solution is live.</p>"
    },
    {
      n: 50,
      prompt: "<p>A marketing team wants to generate original product lifestyle images from text descriptions using Azure AI services. Which service and model should they use?</p>",
      choices: ["Azure AI Vision with the image generation feature", "Azure OpenAI Service with a DALL-E deployment", "Azure AI Custom Vision with a generative label project", "Azure AI Foundry prompt flow with image synthesis nodes"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Azure OpenAI Service provides access to DALL-E, the OpenAI image generation model that creates original images from text prompts. Deploying DALL-E through Azure OpenAI Service is the correct Azure solution for AI-powered image generation from text descriptions.</p><p>Azure AI Vision does not include an image generation feature; it analyzes existing images. Azure AI Custom Vision trains custom classifiers and object detectors using labeled training images; it does not generate new images from text. Azure AI Foundry prompt flow can orchestrate multi-step pipelines but does not itself contain image synthesis capability; DALL-E must be called through Azure OpenAI Service.</p>"
    }
  ]}]
};
