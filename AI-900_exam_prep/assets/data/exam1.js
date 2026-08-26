window.AI9_DATA = window.AI9_DATA || {};

window.AI9_DATA.exam1 = {
  id: "exam1",
  name: "AI-900 \u2014 Practice Exam 1",
  timeMinutes: 45,
  units: [ { title: "", html: "", questions: [
    {
      n: 1,
      prompt: "<p>A retail company wants software that reads scanned purchase orders and automatically extracts the vendor name, order date, and total amount. Which AI workload BEST describes this capability?</p>",
      choices: ["Anomaly detection", "Conversational AI", "Document processing", "Clustering"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Document processing (also called document intelligence) uses AI to extract structured data from forms, invoices, and other documents. Reading a purchase order and pulling out specific fields like vendor name and total amount is a classic document processing scenario.</p><p>Anomaly detection identifies unusual patterns in data over time rather than extracting fields from a document. Conversational AI focuses on chat and voice interactions with users, not document extraction. Clustering is an unsupervised technique that groups similar data points and does not apply to field extraction from a single document.</p>"
    },
    {
      n: 2,
      prompt: "<p>A data scientist needs to predict the sale price of a house based on its size, location, and number of bedrooms. Which machine learning technique is MOST appropriate?</p>",
      choices: ["Clustering", "Regression", "Classification", "Reinforcement learning"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Regression predicts a continuous numeric value. Predicting a house sale price produces a number on a continuous scale, making regression the correct choice.</p><p>Clustering groups unlabeled data into segments and does not produce a predicted price. Classification predicts a discrete category rather than a continuous number. Reinforcement learning trains an agent through rewards and penalties, which is not suited to simple price prediction from tabular features.</p>"
    },
    {
      n: 3,
      prompt: "<p>An e-commerce site wants to automatically tag each product photo with descriptive labels such as blue, sneaker, and laces. Which computer vision task does this represent?</p>",
      choices: ["Object detection", "Semantic segmentation", "Image classification", "Image tagging"],
      answer: 3,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "easy",
      explanation: "<p>Image tagging assigns multiple descriptive labels to an image without locating objects or segmenting pixels. Generating labels like blue, sneaker, and laces for a product photo is exactly what image tagging does.</p><p>Object detection not only identifies objects but also draws bounding boxes around each one, which is more than this scenario requires. Semantic segmentation classifies every pixel in an image into a category. Image classification assigns a single primary category to the whole image rather than a set of descriptive tags.</p>"
    },
    {
      n: 4,
      prompt: "<p>A customer service team wants AI that reads incoming support emails and determines whether each customer feels satisfied, neutral, or frustrated. Which NLP capability does this describe?</p>",
      choices: ["Language detection", "Key phrase extraction", "Named entity recognition", "Sentiment analysis"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Sentiment analysis evaluates text and returns a sentiment label such as positive, neutral, or negative along with a confidence score. Determining that a customer is frustrated or satisfied from email text is a sentiment analysis workload.</p><p>Language detection only identifies which language the text is written in. Key phrase extraction pulls out important nouns and phrases but does not assess emotion. Named entity recognition identifies people, places, dates, and other entities but does not measure how the customer feels.</p>"
    },
    {
      n: 5,
      prompt: "<p>A marketing team asks an AI assistant to write three variations of a social-media post from a brief set of bullet points. Which AI workload category does this fall under?</p>",
      choices: ["Generative AI", "Anomaly detection", "Knowledge mining", "Conversational AI"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "easy",
      explanation: "<p>Generative AI models create new content such as text, images, or code based on a prompt. Producing three variations of a social-media post from bullet points is a content generation task squarely within generative AI.</p><p>Anomaly detection finds unusual patterns in existing data rather than creating new content. Knowledge mining extracts and organizes information from large document collections. Conversational AI focuses on interactive dialog and question answering, not open-ended content creation from bullet-point briefs.</p>"
    },
    {
      n: 6,
      prompt: "<p>A bank's loan-approval model approves loans at a significantly lower rate for applicants from one demographic group even when their financial profiles are equivalent. Which responsible AI principle is MOST at risk?</p>",
      choices: ["Transparency", "Accountability", "Fairness", "Reliability and safety"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Fairness requires that AI systems treat all people equitably and do not produce discriminatory outcomes based on characteristics such as race, gender, or age. A loan model that systematically disadvantages one demographic group is a fairness violation.</p><p>Transparency is about making AI decisions understandable and explainable, not about equitable outcomes. Accountability concerns who is responsible for AI decisions and their consequences. Reliability and safety focuses on ensuring the system performs consistently and without causing harm, which is a different concern from biased decision outcomes.</p>"
    },
    {
      n: 7,
      prompt: "<p>After training a model, a developer evaluates it on the training data and gets 98% accuracy, but accuracy drops to 61% on new data. What problem does this describe?</p>",
      choices: ["Overfitting", "Data leakage", "Underfitting", "Class imbalance"],
      answer: 0,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Overfitting occurs when a model learns the training data too precisely, including its noise, and fails to generalize to unseen data. The large gap between high training accuracy and much lower test accuracy is the hallmark of an overfitted model.</p><p>Underfitting means the model performs poorly even on training data because it has not learned enough patterns. Data leakage occurs when information from the test set influences training, typically inflating test performance rather than reducing it. Class imbalance refers to an unequal distribution of class labels and would not by itself cause this training-versus-test accuracy gap.</p>"
    },
    {
      n: 8,
      prompt: "<p>A logistics company wants to scan shipping labels and extract the recipient address for automated routing. Which Azure AI service is BEST suited for this?</p>",
      choices: ["Azure AI Custom Vision", "Azure AI Face", "Azure AI Vision", "Azure AI Video Indexer"],
      answer: 2,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Vision includes the Read OCR capability, which extracts printed and handwritten text from images and documents. Reading a shipping label to extract an address is a text extraction task that Azure AI Vision handles directly.</p><p>Azure AI Custom Vision is used to train custom image classifiers or object detectors, not for general text extraction. Azure AI Face detects and analyzes human faces and does not perform text recognition. Azure AI Video Indexer analyzes video content for speech, faces, and topics, not static label images.</p>"
    },
    {
      n: 9,
      prompt: "<p>A developer uses Azure AI Language to identify whether a product review praises or criticizes specific features like battery life and camera separately from overall sentiment. Which capability is being used?</p>",
      choices: ["Question answering", "Named entity recognition", "Summarization", "Opinion mining"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Opinion mining identifies specific aspects mentioned in text and assigns sentiment to each aspect individually. Detecting that a review praises battery life but criticizes the camera as separate aspects is exactly what opinion mining does.</p><p>Question answering builds a knowledge base to respond to user queries, not to analyze review aspects. Named entity recognition extracts entities like people, dates, and locations but does not attach sentiment to specific product aspects. Summarization condenses text to a shorter form and does not break down sentiment by feature.</p>"
    },
    {
      n: 10,
      prompt: "<p>Which Azure service provides a managed portal where teams can create projects, deploy foundation models from a catalog, run prompt flow experiments, and evaluate generative AI applications?</p>",
      choices: ["Azure Machine Learning studio", "Azure AI Foundry", "Azure OpenAI Service", "Azure AI Content Safety"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Foundry is the unified portal for building, deploying, and evaluating AI applications. It provides hubs and projects, a model catalog spanning open and proprietary models, prompt flow for orchestrating LLM workflows, and built-in evaluation tools.</p><p>Azure Machine Learning studio focuses on the ML lifecycle for training and deploying traditional and custom ML models, not on the generative AI portal experience. Azure OpenAI Service is the API endpoint for OpenAI models but does not provide the full project management and evaluation portal. Azure AI Content Safety is a specialized safety-filtering service, not a portal for building generative AI applications.</p>"
    },
    {
      n: 11,
      prompt: "<p>A smart-city project streams sensor readings from traffic lights and flags when a sensor produces a value far outside its normal range. Which AI workload does this represent?</p>",
      choices: ["Knowledge mining", "Anomaly detection", "Computer vision", "Conversational AI"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Anomaly detection uses AI to identify data points that deviate significantly from expected patterns. Monitoring sensor streams for values that fall outside a normal range is a textbook anomaly detection workload.</p><p>Knowledge mining extracts and indexes information from documents and unstructured content, not time-series sensor data. Computer vision processes images or video, not numerical sensor streams. Conversational AI enables natural-language interactions with users and has no role in monitoring sensor readings.</p>"
    },
    {
      n: 12,
      prompt: "<p>In Azure Machine Learning, a data scientist wants to train multiple algorithm types in parallel and automatically select the best-performing model with minimal code. Which feature should they use?</p>",
      choices: ["Azure Machine Learning designer", "Compute cluster", "Model registry", "Automated machine learning (AutoML)"],
      answer: 3,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>Automated machine learning (AutoML) in Azure Machine Learning automatically iterates over many algorithms and hyperparameter combinations, then ranks the resulting models. It requires minimal coding and is designed for the try-many-models-and-pick-the-best workflow.</p><p>The Azure Machine Learning designer is a drag-and-drop visual pipeline tool that requires manual configuration of each step. A compute cluster provides infrastructure for training but does not automate algorithm selection. The model registry stores and versions trained models but does not train or compare algorithms.</p>"
    },
    {
      n: 13,
      prompt: "<p>A wildlife monitoring system analyzes trail-camera images and must identify whether a deer, bear, or fox is present in each photo. Which computer vision task is needed?</p>",
      choices: ["Image classification", "Object detection", "OCR", "Semantic segmentation"],
      answer: 0,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Image classification assigns one category label to the whole image. If the goal is simply to identify which animal species is present, multiclass image classification is the right approach.</p><p>Object detection would additionally return bounding-box coordinates for each animal, which is more than required here. OCR extracts text from images and is not applicable to animal identification. Semantic segmentation classifies every individual pixel, which is unnecessary when only a single species label per photo is needed.</p>"
    },
    {
      n: 14,
      prompt: "<p>A healthcare app needs to scan clinical notes and automatically identify mentions of medications, dosage values, and patient names. Which NLP capability addresses this?</p>",
      choices: ["Sentiment analysis", "Named entity recognition", "Language detection", "Text summarization"],
      answer: 1,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Named entity recognition (NER) identifies and classifies named entities in text such as people, organizations, dates, and in healthcare contexts, medications and dosages. Scanning clinical notes to tag medication names, dosages, and patient names is a NER task.</p><p>Sentiment analysis evaluates emotional tone rather than extracting specific entities. Language detection identifies the language the text is written in but does not extract clinical entities. Text summarization condenses a document but does not tag specific medical terms or patient identifiers.</p>"
    },
    {
      n: 15,
      prompt: "<p>A developer writes an instruction telling a language model to always respond as a formal financial advisor and to decline questions outside of finance. What prompt engineering technique is this?</p>",
      choices: ["Grounding", "Fine-tuning", "Setting a system message", "Retrieval augmented generation"],
      answer: 2,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>A system message is a set of instructions provided to the model before the conversation begins that defines its persona, scope, and rules. Telling the model to behave as a financial advisor and restrict its topic is a classic use of a system message.</p><p>Grounding involves supplying relevant factual context alongside the user query. Fine-tuning retrains the model weights on domain-specific data and cannot be done simply by writing a prompt. Retrieval augmented generation connects the model to an external knowledge source at query time and is a different architectural pattern from setting a system message.</p>"
    },
    {
      n: 16,
      prompt: "<p>An AI job-candidate ranking system scores women lower than men with identical qualifications. The project lead accepts responsibility and commits to fixing the model. Which responsible AI principle does this reflect?</p>",
      choices: ["Transparency", "Inclusiveness", "Privacy and security", "Accountability"],
      answer: 3,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Accountability means humans take responsibility for AI systems and their outcomes. When a project lead acknowledges a discriminatory ranking pattern and commits to correcting it, they are demonstrating accountability for the AI system they own.</p><p>Transparency relates to making AI decisions explainable and understandable. Inclusiveness is about designing AI so it benefits all people and is accessible, not specifically about accepting responsibility for outcomes. Privacy and security concerns how personal data is collected and protected, not who is responsible for correcting a biased model.</p>"
    },
    {
      n: 17,
      prompt: "<p>A developer wants to predict whether a new mobile app will be in the Games, Productivity, or Social category based on its description. Which ML technique should they use?</p>",
      choices: ["Multiclass classification", "Binary classification", "Regression", "Clustering"],
      answer: 0,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Multiclass classification predicts which one of three or more discrete categories an item belongs to. Assigning an app to one of three named category labels is a multiclass classification problem.</p><p>Binary classification predicts between exactly two outcomes and would not cover three categories. Regression predicts a continuous numeric value rather than a category label. Clustering groups unlabeled data without predefined categories and requires no labeled training examples.</p>"
    },
    {
      n: 18,
      prompt: "<p>A company uses Azure AI Custom Vision to inspect manufactured parts. The model must detect scratches and dents and return their pixel locations within each image. Which Custom Vision project type is required?</p>",
      choices: ["Image classification (multiclass)", "Image classification (multilabel)", "Object detection", "Semantic segmentation"],
      answer: 2,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Object detection in Azure AI Custom Vision trains models that identify the class of an object and return its bounding-box coordinates within the image. Detecting scratches and dents and returning their locations is object detection.</p><p>Multiclass image classification assigns one label to the whole image without locating defects. Multilabel image classification allows multiple labels per image but does not return spatial coordinates. Semantic segmentation, while pixel-level, is not a project type offered in Azure AI Custom Vision; it supports classification and object detection projects only.</p>"
    },
    {
      n: 19,
      prompt: "<p>A global news platform receives articles in many languages and needs to automatically route each article to the correct regional editorial team. Which NLP capability should be applied FIRST?</p>",
      choices: ["Key phrase extraction", "Summarization", "Language detection", "Sentiment analysis"],
      answer: 2,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "easy",
      explanation: "<p>Language detection identifies which language a piece of text is written in and returns a language code such as fr for French or de for German. Routing articles to regional teams based on language requires knowing the language first, making language detection the correct first step.</p><p>Key phrase extraction surfaces important terms in text but assumes the language is already known. Summarization condenses text but does not identify its language. Sentiment analysis evaluates emotional tone and is only meaningful after the language has been identified.</p>"
    },
    {
      n: 20,
      prompt: "<p>A developer deploys a GPT-4 model in Azure OpenAI Service to answer questions about a product catalog. The model queries an Azure AI Search index of product documents at query time to ground its answers. What technique is this?</p>",
      choices: ["Fine-tuning", "Few-shot prompting", "Embeddings", "Retrieval augmented generation"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Retrieval augmented generation (RAG) connects a language model to an external knowledge base at query time. The model retrieves relevant document chunks from the search index and uses them as grounded context when generating its answer. This is supported natively in Azure OpenAI Service via the on-your-data feature.</p><p>Fine-tuning modifies the model weights using domain-specific data during a training step, not at query time. Few-shot prompting includes example pairs in the prompt to guide behavior but does not involve querying an external index. Embeddings are numerical vector representations used for similarity search but do not by themselves describe the full retrieval-plus-generation pipeline.</p>"
    },
    {
      n: 21,
      prompt: "<p>A hospital system wants AI to search millions of medical records and surface relevant patient history, test results, and prior diagnoses to clinicians. Which AI workload category is this?</p>",
      choices: ["Knowledge mining", "Anomaly detection", "Generative AI", "Document processing"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Knowledge mining uses AI to index and extract insights from large collections of unstructured content, making information discoverable. Searching millions of records to surface relevant patient history for clinicians is a knowledge mining workload.</p><p>Anomaly detection looks for unusual data patterns rather than making a corpus searchable. Generative AI creates new content from a prompt and does not index existing records. Document processing extracts structured fields from individual documents, whereas knowledge mining builds a searchable index across a large corpus.</p>"
    },
    {
      n: 22,
      prompt: "<p>A model evaluation returns: true positives = 80, false positives = 20, false negatives = 30. What is the model's precision?</p>",
      choices: ["0.62", "0.73", "0.80", "0.57"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "medium",
      explanation: "<p>Precision is calculated as TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 0.80. It measures the proportion of positive predictions that are actually correct.</p><p>0.62 is not derivable from these numbers by a standard formula. 0.73 approximates recall, calculated as TP / (TP + FN) = 80 / 110 which equals about 0.727. 0.57 is not a standard metric result from these values.</p>"
    },
    {
      n: 23,
      prompt: "<p>A self-driving vehicle system draws colored boundaries around every pixel belonging to the road, pedestrians, and vehicles in each video frame. Which computer vision technique is being used?</p>",
      choices: ["Object detection", "Optical character recognition", "Image classification", "Semantic segmentation"],
      answer: 3,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Semantic segmentation classifies every pixel in an image into a category such as road, pedestrian, or vehicle. Producing pixel-level colored boundaries around each class is the defining behavior of semantic segmentation.</p><p>Object detection identifies objects and draws rectangular bounding boxes, not pixel-precise boundaries. Optical character recognition extracts text and is not applicable to scene understanding in driving contexts. Image classification assigns a single label to the entire image without locating or segmenting individual regions.</p>"
    },
    {
      n: 24,
      prompt: "<p>A law firm wants AI that reads a contract and produces a list of the most important clauses and topics without the user reading the full document. Which NLP capability does this use?</p>",
      choices: ["Named entity recognition", "Sentiment analysis", "Summarization", "Conversational language understanding"],
      answer: 2,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Summarization condenses a long document into the most important points, which is exactly what a law firm needs when reviewing lengthy contracts. Azure AI Language provides summarization as a built-in feature.</p><p>Named entity recognition tags specific entities such as dates or organizations but does not produce a readable summary. Sentiment analysis evaluates emotional tone and is not designed for contract clause extraction. Conversational language understanding interprets user utterances in a dialog system and is not suited to static document summarization.</p>"
    },
    {
      n: 25,
      prompt: "<p>Which term describes the phenomenon where a large language model generates a plausible-sounding but factually incorrect or invented answer?</p>",
      choices: ["Hallucination", "Prompt injection", "Temperature overflow", "Tokenization error"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "medium",
      explanation: "<p>Hallucination is the term for when a language model produces an answer that sounds confident and coherent but contains false or fabricated information. This occurs because the model predicts plausible next tokens without a reliable grounding mechanism.</p><p>Prompt injection is an attack where a malicious user embeds instructions in input text to hijack the model's behavior, not a description of incorrect factual output. Temperature overflow is not a real AI term. Tokenization error refers to problems in splitting text into tokens, which would cause garbled output rather than a coherent but false answer.</p>"
    },
    {
      n: 26,
      prompt: "<p>A product team releases an AI hiring tool and later learns it has a higher false-rejection rate for applicants with disabilities. They halt the tool and launch a remediation review. Which responsible AI principle BEST reflects this response?</p>",
      choices: ["Privacy and security", "Transparency", "Inclusiveness", "Reliability and safety"],
      answer: 2,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "easy",
      explanation: "<p>Inclusiveness means AI should benefit everyone, including people with disabilities, and should not create or reinforce disadvantage for any group. Halting a tool that unfairly rejects candidates with disabilities and launching a review reflects the inclusiveness principle.</p><p>Privacy and security concerns protecting personal data, not equitable treatment of demographic groups. Transparency is about making AI decisions understandable, not specifically about protecting disadvantaged groups. Reliability and safety addresses consistent performance and harm prevention but does not specifically address equal treatment across disability status.</p>"
    },
    {
      n: 27,
      prompt: "<p>A data scientist notices validation loss begins rising after epoch 20 while training loss keeps falling. They want Azure Machine Learning to halt training automatically at the right moment. Which technique BEST addresses this?</p>",
      choices: ["Batch normalization", "Early stopping", "Feature engineering", "Data augmentation"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "hard",
      explanation: "<p>Early stopping monitors the validation metric during training and halts training once the metric stops improving, preventing the model from continuing to overfit the training set. Validation loss rising while training loss falls is exactly when early stopping should trigger.</p><p>Batch normalization normalizes layer activations to speed up convergence but does not directly prevent overfitting or stop training at the right moment. Feature engineering improves the quality of input data before training and cannot intervene during training epochs. Data augmentation increases training set diversity and may reduce overfitting but does not automatically stop training when validation performance degrades.</p>"
    },
    {
      n: 28,
      prompt: "<p>A startup deploys Mistral 7B from the Azure AI Foundry model catalog and wants to call it via REST without provisioning dedicated GPU infrastructure. Which deployment option should they choose?</p>",
      choices: ["Managed online endpoint", "Batch endpoint", "Serverless API deployment", "Azure Kubernetes Service deployment"],
      answer: 2,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Serverless API deployment in the Azure AI Foundry model catalog lets you call a model via a REST endpoint and pay per token without provisioning or managing underlying compute infrastructure. This is the intended option for customers who want to avoid GPU provisioning overhead.</p><p>Managed online endpoint provides a real-time endpoint but requires you to specify and manage a compute cluster. Batch endpoint is designed for asynchronous large-volume inference, not interactive REST calls. Azure Kubernetes Service deployment requires setting up and managing a Kubernetes cluster, which is significant infrastructure work.</p>"
    },
    {
      n: 29,
      prompt: "<p>A developer needs Azure AI Language to read customer reviews and extract mentions of specific product attributes such as display or keyboard along with whether each is praised or criticized. Which feature is being used?</p>",
      choices: ["Key phrase extraction", "Opinion mining", "Text classification", "Named entity recognition"],
      answer: 1,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Opinion mining is an advanced feature of the sentiment analysis capability in Azure AI Language. It identifies the specific aspects or targets mentioned in a review and assigns a sentiment polarity to each aspect individually, enabling attribute-level analysis.</p><p>Key phrase extraction surfaces important words and phrases but does not associate sentiments with specific attributes. Text classification assigns predefined labels to entire documents and is not designed for aspect-level sentiment. Named entity recognition identifies entity types such as locations and persons but does not analyze product aspects or sentiments.</p>"
    },
    {
      n: 30,
      prompt: "<p>An autonomous vehicle system must know both what each object is (pedestrian, vehicle, road marking) and where each is within the camera frame. Which computer vision task is required?</p>",
      choices: ["Semantic segmentation", "Object detection", "Image classification", "Optical character recognition"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Object detection identifies each object's class and returns a bounding box showing its location within the image frame. A system that must recognize pedestrians, vehicles, and road markings while knowing where each is located requires object detection.</p><p>Semantic segmentation provides pixel-level classification but returns a pixel map rather than discrete object bounding boxes. Image classification labels the whole frame with one category and provides no per-object location. Optical character recognition reads text and is not applicable to detecting pedestrians or vehicles.</p>"
    },
    {
      n: 31,
      prompt: "<p>A voice assistant must understand requests like Book a flight to Dallas and extract the intent (BookFlight) and the destination entity (Dallas). Which AI workload handles this?</p>",
      choices: ["Conversational language understanding", "Sentiment analysis", "Question answering", "Summarization"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "medium",
      explanation: "<p>Conversational language understanding (CLU) classifies user utterances into intents (what the user wants to do) and extracts entities (the details needed to fulfill the intent). A voice assistant recognizing BookFlight and pulling out the destination city is a CLU scenario.</p><p>Summarization shortens long documents into key points and is not used to classify intents or extract entities from commands. Sentiment analysis measures positive or negative tone but does not identify actionable intents. Question answering retrieves answers to posed questions from a knowledge base rather than interpreting structured intents and entities in a conversational flow.</p>"
    },
    {
      n: 32,
      prompt: "<p>Which Azure Machine Learning concept stores versioned, immutable records of trained model artifacts and associated metrics, allowing teams to compare and reuse models across projects?</p>",
      choices: ["Datastore", "Compute instance", "Model registry", "Pipeline component"],
      answer: 2,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "medium",
      explanation: "<p>The model registry in Azure Machine Learning stores versioned, immutable records of trained models including metadata, tags, and performance metrics. Teams use the registry to track, compare, and promote models for deployment across projects.</p><p>A datastore is a connection to external storage such as Azure Blob Storage used to reference datasets, not model artifacts. A compute instance is a cloud virtual machine for interactive development in notebooks. A pipeline component is a reusable step in an ML pipeline that encapsulates code and environment, not a stored model artifact.</p>"
    },
    {
      n: 33,
      prompt: "<p>A generative AI chatbot for a financial firm must refuse all questions outside of investment topics. Which development-time technique BEST enforces this topic boundary?</p>",
      choices: ["Adding a system message with scope restrictions", "Increasing temperature", "Applying RAG over investment documents", "Switching to a smaller model"],
      answer: 0,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>Adding a system message that explicitly instructs the model to answer only investment-related questions and to decline out-of-scope requests is the primary development-time technique for enforcing topic boundaries. The system message sets the model's rules before any user turn begins.</p><p>Increasing temperature makes responses more random and creative, which would make the chatbot less predictable on topic adherence. Applying RAG over investment documents improves factual grounding but does not by itself instruct the model to refuse off-topic questions. Switching to a smaller model changes capability and cost but does not enforce topic restrictions.</p>"
    },
    {
      n: 34,
      prompt: "<p>Which Azure service provides built-in content filtering that can automatically block harmful output categories such as hate speech, violence, and sexual content in generative AI applications?</p>",
      choices: ["Azure AI Language", "Azure AI Foundry", "Azure Machine Learning", "Azure AI Content Safety"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "easy",
      explanation: "<p>Azure AI Content Safety is the dedicated Azure service that provides AI-powered detection and filtering of harmful content categories including hate speech, violence, sexual content, and self-harm. It integrates with Azure OpenAI Service deployments to provide configurable content filtering.</p><p>Azure AI Language is an NLP service for text analysis tasks such as sentiment and NER, not content safety filtering. Azure AI Foundry is a development portal, but the underlying safety filtering capability comes from Azure AI Content Safety. Azure Machine Learning is the ML training and deployment platform and does not provide generative AI content filtering.</p>"
    },
    {
      n: 35,
      prompt: "<p>A developer includes 50 example HR question-and-answer pairs directly in the prompt context to guide a language model's tone and style. No model weights are changed. Which technique is this?</p>",
      choices: ["Fine-tuning", "Pre-training", "Few-shot prompting", "Embedding search"],
      answer: 2,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "medium",
      explanation: "<p>Few-shot prompting includes a small number of example input-output pairs directly in the prompt context to guide the model's behavior without modifying any model weights. Providing example Q and A pairs as prompt context while leaving the model unchanged is few-shot prompting.</p><p>Fine-tuning adapts the model by retraining its weights on new examples, which requires a training run and changes the underlying model. Pre-training is the initial large-scale training of the model from scratch on a vast corpus. Embedding search retrieves similar documents from a vector store and does not involve providing labeled examples in a prompt.</p>"
    },
    {
      n: 36,
      prompt: "<p>An AI credit-scoring tool makes loan eligibility decisions but cannot explain to customers why a specific application was denied. Which responsible AI principle is MOST at risk?</p>",
      choices: ["Transparency", "Reliability and safety", "Accountability", "Fairness"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Transparency requires that AI systems be understandable and that their decisions be explainable to the people they affect. A credit-scoring model that cannot explain its denial decisions violates transparency because affected customers cannot understand why they were rejected.</p><p>Accountability concerns who is responsible for AI outcomes, not the model's ability to explain its reasoning. Fairness addresses whether different groups receive equitable treatment, not whether decisions are explainable. Reliability and safety relates to consistent, safe performance rather than to explainability of individual decisions.</p>"
    },
    {
      n: 37,
      prompt: "<p>In supervised learning, which term describes the portion of a labeled dataset held back from training and used ONLY for a final unbiased estimate of real-world performance?</p>",
      choices: ["Test set", "Feature set", "Training set", "Validation set"],
      answer: 0,
      topic: "Machine Learning on Azure",
      objective: "2.2",
      difficulty: "hard",
      explanation: "<p>The test set is the held-out portion of labeled data that is never used during model training or hyperparameter tuning. It provides a final, unbiased estimate of how the model will perform on truly unseen data after all training decisions have been made.</p><p>The training set is used to fit the model's parameters and is not held back. The validation set is used during training to tune hyperparameters; because decisions are made based on it, it cannot provide a fully unbiased estimate. The feature set describes the input variables in the data, not a partition of the data used for evaluation.</p>"
    },
    {
      n: 38,
      prompt: "<p>A retail company wants to extract structured fields such as merchant name, total, and date from scanned receipts. Which Azure service provides a prebuilt receipt model for this?</p>",
      choices: ["Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Vision", "Azure AI Face"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "medium",
      explanation: "<p>Azure AI Document Intelligence provides prebuilt models for receipts, invoices, business cards, and IDs that extract specific structured fields using layout analysis and OCR. The prebuilt receipt model extracts merchant name, date, total, and line items directly from scanned receipts.</p><p>Azure AI Custom Vision requires you to train your own model and does not have prebuilt receipt extraction. Azure AI Vision provides the general-purpose Read OCR API which extracts raw text but does not interpret receipt-specific fields. Azure AI Face analyzes human faces and performs no document analysis.</p>"
    },
    {
      n: 39,
      prompt: "<p>A developer uses Azure AI Speech to convert spoken Spanish audio into written English text in real time. Which Azure AI Speech capability is being used?</p>",
      choices: ["Text to speech", "Speech translation", "Custom neural voice", "Speaker recognition"],
      answer: 1,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "hard",
      explanation: "<p>Speech translation in Azure AI Speech converts audio in a source language into text or audio in a different target language in real time. Converting spoken Spanish to written English combines speech recognition with translation in a single capability.</p><p>Text to speech converts written text into synthesized audio and does not handle speech input or translation. Custom neural voice creates a branded synthetic voice trained on recordings of a specific speaker and is unrelated to language translation. Speaker recognition identifies or verifies who is speaking and does not translate speech.</p>"
    },
    {
      n: 40,
      prompt: "<p>An organization wants to systematically identify potential harms, measure them, mitigate them, and monitor a generative AI product during live operation. What is the name of this structured four-stage approach?</p>",
      choices: ["Prompt flow", "Red teaming", "Content filtering", "Responsible generative AI operations"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.2",
      difficulty: "hard",
      explanation: "<p>Responsible generative AI describes the four-stage process Microsoft recommends: identify potential harms, measure their presence and severity, mitigate them using techniques such as system messages and content filters, and operate with ongoing monitoring. This covers the full deployment lifecycle.</p><p>Prompt flow is a development tool in Azure AI Foundry for orchestrating LLM workflows, not a safety governance framework. Red teaming is one technique used in the measurement and mitigation stages but is not the name of the overall four-stage process. Content filtering is one mitigation tool within the process, not the name of the complete framework.</p>"
    },
    {
      n: 41,
      prompt: "<p>A media company uses AI to read thousands of news articles and create a searchable index so editors can find all coverage of a given event. Which AI workload category does this represent?</p>",
      choices: ["Knowledge mining", "Anomaly detection", "Conversational AI", "Generative AI"],
      answer: 0,
      topic: "AI Workloads and Considerations",
      objective: "1.1",
      difficulty: "easy",
      explanation: "<p>Knowledge mining uses AI to extract insights and make large unstructured content collections searchable. Building an indexed search system over thousands of news articles so editors can find relevant coverage is a knowledge mining workload.</p><p>Anomaly detection monitors data for unusual patterns rather than building searchable archives. Conversational AI enables dialog-based interactions and is not the underlying mechanism for indexing documents. Generative AI creates new content rather than extracting and organizing existing content into a search index.</p>"
    },
    {
      n: 42,
      prompt: "<p>In Azure Machine Learning, which resource provides an on-demand, scalable pool of virtual machines that auto-scales up for large training jobs and scales down to zero when idle?</p>",
      choices: ["Compute instance", "Compute cluster", "Inference cluster", "Attached compute"],
      answer: 1,
      topic: "Machine Learning on Azure",
      objective: "2.3",
      difficulty: "medium",
      explanation: "<p>A compute cluster in Azure Machine Learning is a managed, scalable pool of virtual machines. It supports auto-scaling from a minimum node count (which can be zero) to a maximum for large parallel or distributed training jobs.</p><p>A compute instance is a single virtual machine for interactive development in notebooks and is not a scalable pool. An inference cluster is used for deploying models to production endpoints rather than for training workloads. Attached compute connects an existing external resource but does not provide the built-in auto-scaling of a native compute cluster.</p>"
    },
    {
      n: 43,
      prompt: "<p>A security application analyzes surveillance photos and draws tight boxes around each person's face along with an estimated age and whether they are wearing glasses. Which computer vision task is this?</p>",
      choices: ["Facial analysis", "OCR", "Image classification", "Object detection"],
      answer: 0,
      topic: "Computer Vision",
      objective: "3.1",
      difficulty: "medium",
      explanation: "<p>Facial analysis detects faces in an image, returns the bounding-box location of each face, and provides attribute predictions such as estimated age, emotion, and accessories like glasses. Detecting faces and predicting age and accessories is facial analysis, offered through Azure AI Face.</p><p>Image classification assigns a category to the whole image without locating individual faces. Object detection identifies and locates generic objects but does not natively predict face-specific attributes like age or accessories. OCR extracts text from images and is entirely unrelated to face detection.</p>"
    },
    {
      n: 44,
      prompt: "<p>A chatbot must understand user requests like What is my balance? and Transfer $200 to savings by identifying the user's goal and relevant numeric details. Which NLP concept is at the core of this chatbot?</p>",
      choices: ["Conversational language understanding", "Summarization", "Sentiment analysis", "Key phrase extraction"],
      answer: 0,
      topic: "Natural Language Processing",
      objective: "4.1",
      difficulty: "medium",
      explanation: "<p>Conversational language understanding (CLU) maps user utterances to predefined intents such as CheckBalance or TransferFunds and extracts entities such as amount and destination. This is the core NLP capability enabling chatbots to interpret and act on user requests.</p><p>Sentiment analysis evaluates emotional tone and cannot classify user intents or extract transactional entities. Key phrase extraction identifies important nouns and phrases but does not map them to actionable intents. Summarization condenses long text and is not used for real-time intent classification in a conversational flow.</p>"
    },
    {
      n: 45,
      prompt: "<p>A developer provides a language model with a detailed description of the assistant's role before the conversation begins to shape its behavior throughout the session. What is this initial instruction called?</p>",
      choices: ["Completion", "System message", "Embedding", "User prompt"],
      answer: 1,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "easy",
      explanation: "<p>A system message is an instruction provided to the model before the user conversation starts. It sets the model's persona, tone, scope, and rules for the entire session. Providing a description of the model's role at the start of a session is the standard use of a system message.</p><p>A user prompt is the message sent by the user turn by turn during the conversation, not the initial persona-setting instruction. A completion is the text that the model generates in response to a prompt. An embedding is a numeric vector representation of text used for similarity search, not a persona instruction.</p>"
    },
    {
      n: 46,
      prompt: "<p>A company uses AI to flag transactions that deviate significantly from a customer's spending patterns as potential fraud. The system processes detailed personal financial histories. Which responsible AI principle is MOST important here?</p>",
      choices: ["Reliability and safety", "Privacy and security", "Fairness", "Transparency"],
      answer: 1,
      topic: "AI Workloads and Considerations",
      objective: "1.2",
      difficulty: "medium",
      explanation: "<p>Privacy and security is the responsible AI principle concerned with protecting personal data and ensuring AI systems handle sensitive information appropriately. Fraud detection necessarily processes detailed financial transaction data, and the responsible handling of this personal spending history falls under privacy and security.</p><p>Reliability and safety focuses on the system performing consistently without causing harm, not on how personal financial data is handled. Fairness addresses equitable treatment across groups, which is a secondary concern here. Transparency relates to explaining AI decisions and is less central than the data privacy concern for this scenario.</p>"
    },
    {
      n: 47,
      prompt: "<p>A team evaluating a regression model wants a metric in the same unit as the target (megawatt-hours) that penalizes large errors more than small ones. Which metric should they use?</p>",
      choices: ["MAE", "Precision", "R-squared", "RMSE"],
      answer: 3,
      topic: "Machine Learning on Azure",
      objective: "2.1",
      difficulty: "easy",
      explanation: "<p>Root Mean Squared Error (RMSE) is expressed in the same units as the target variable and squares each error before averaging and taking the square root, which penalizes large errors more than small ones. For megawatt-hour demand prediction, RMSE gives an interpretable error in megawatt-hours and highlights large forecast misses.</p><p>R-squared is a unitless proportion indicating how much variance is explained and does not share the target's units. Mean Absolute Error (MAE) is in the same units but treats all error magnitudes equally without extra penalty for large errors. Precision is a classification metric that measures the accuracy of positive predictions and is not applicable to a regression problem.</p>"
    },
    {
      n: 48,
      prompt: "<p>A developer wants to use Azure AI Vision to automatically remove the background from product images, leaving only the product on a transparent background. Which Azure AI Vision feature should they use?</p>",
      choices: ["Image tagging", "Background removal", "Optical character recognition", "Smart crop"],
      answer: 1,
      topic: "Computer Vision",
      objective: "3.2",
      difficulty: "easy",
      explanation: "<p>Background removal is a feature of Azure AI Vision that separates the foreground subject from the background and returns the foreground with a transparent background, which is exactly what is needed for clean product images.</p><p>Smart crop generates a thumbnail by identifying the most visually interesting region rather than removing the background. Image tagging assigns descriptive labels to an image but does not modify it. Optical character recognition extracts text from images and has nothing to do with background separation.</p>"
    },
    {
      n: 49,
      prompt: "<p>A developer uses Azure AI Translator to convert a full product manual from English into French and German while preserving the document layout and formatting. Which capability is being used?</p>",
      choices: ["Transliteration", "Document translation", "Custom translation", "Text translation"],
      answer: 3,
      topic: "Natural Language Processing",
      objective: "4.2",
      difficulty: "medium",
      explanation: "<p>Document translation in Azure AI Translator translates entire documents asynchronously while preserving the source document format and layout. Converting a product manual from English to French and German with layout preserved is a document translation task.</p><p>Text translation translates short strings or paragraphs via a synchronous API and does not handle full document layout preservation. Transliteration converts text from one script to another without changing the language, for example Arabic to Latin characters. Custom translation allows you to build a domain-specific translation model but is about model customization, not about translating a full document with layout preservation.</p>"
    },
    {
      n: 50,
      prompt: "<p>Which Azure AI Foundry feature lets a developer visually design and test a chain of LLM calls, tool invocations, and logic steps as a graph, then deploy that chain as a production endpoint?</p>",
      choices: ["Azure Machine Learning designer", "Azure AI Content Safety", "Model catalog", "Prompt flow"],
      answer: 3,
      topic: "Generative AI",
      objective: "5.1",
      difficulty: "hard",
      explanation: "<p>Prompt flow in Azure AI Foundry is a development tool that lets developers create, visualize, and test multi-step LLM workflows as a directed acyclic graph. Each node can be a language model call, a Python function, or a tool integration. Completed flows can be evaluated and deployed as production endpoints.</p><p>The model catalog is a browsable collection of foundation models for selection and deployment and does not provide a visual workflow design surface. Azure Machine Learning designer is a drag-and-drop tool for traditional ML pipelines, not for LLM chain orchestration. Azure AI Content Safety provides content moderation and filtering and is not a workflow design tool.</p>"
    }
  ]}]
};
