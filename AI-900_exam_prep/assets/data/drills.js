window.AI9_DATA = window.AI9_DATA || {};
window.AI9_DATA.drills = [
  {
    id: "d1-workloads",
    domain: "AI Workloads and Considerations",
    title: "Matching a Business Problem to an AI Workload",
    blurb: "Fixes workload mix-ups by tying each scenario to the one workload that actually solves it.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A bank wants to flag credit card transactions that look unlike a customer's normal spending. Which AI workload is this?",
        choices: ["Anomaly detection", "Knowledge mining", "Object detection", "Speech synthesis"],
        answer: 0,
        topic: "Anomaly detection",
        explanation: "<p>Anomaly detection identifies data points that deviate from an established pattern, which is exactly what unusual spending represents. Knowledge mining extracts structured information from large document stores. Object detection locates items in images. Speech synthesis converts text to audio, not financial data to alerts.</p>"
      },
      {
        n: 2,
        prompt: "A law firm wants to search thousands of scanned contracts to find every clause mentioning a specific liability. Which AI workload applies?",
        choices: ["Conversational AI", "Computer vision", "Knowledge mining", "Anomaly detection"],
        answer: 2,
        topic: "Knowledge mining",
        explanation: "<p>Knowledge mining ingests and indexes large volumes of unstructured content so it can be searched and explored. Conversational AI powers chat interactions rather than document indexing. Computer vision analyzes images and would not interpret contract text. Anomaly detection flags outliers in data streams, not document clauses.</p>"
      },
      {
        n: 3,
        prompt: "A retailer wants a chatbot on its website to answer questions about store hours and return policies. Which workload best fits?",
        choices: ["Anomaly detection", "Generative AI", "Conversational AI", "Document processing"],
        answer: 2,
        topic: "Conversational AI",
        explanation: "<p>Conversational AI is designed to handle dialogue-based interactions such as answering customer questions. Anomaly detection spots unusual patterns in data. Generative AI produces new content, though a simple FAQ bot is better categorized as conversational AI. Document processing extracts data from forms and documents, not chat flows.</p>"
      },
      {
        n: 4,
        prompt: "An insurance company wants to extract the claimant name, date, and damage amount from uploaded PDF claim forms. Which workload is this?",
        choices: ["Knowledge mining", "Document processing", "Computer vision", "Conversational AI"],
        answer: 1,
        topic: "Document processing",
        explanation: "<p>Document processing (such as Azure AI Document Intelligence) extracts structured fields like names, dates, and amounts from forms and documents. Knowledge mining is broader indexing and search over unstructured content. Computer vision analyzes images but does not specialize in structured form field extraction. Conversational AI handles dialogue, not form parsing.</p>"
      },
      {
        n: 5,
        prompt: "A manufacturer wants to detect dents and scratches on car panels as they move along an assembly line. Which AI workload applies?",
        choices: ["NLP", "Anomaly detection", "Generative AI", "Computer vision"],
        answer: 3,
        topic: "Computer vision",
        explanation: "<p>Computer vision analyzes images and video to detect visual defects like dents and scratches. NLP works with text and speech. Anomaly detection flags statistical outliers in data, not surface defects in images. Generative AI produces new content and is not used for visual quality inspection.</p>"
      },
      {
        n: 6,
        prompt: "A marketing team wants to automatically produce unique product description drafts from a short list of bullet points. Which workload is this?",
        choices: ["Generative AI", "Knowledge mining", "Classification", "Document processing"],
        answer: 0,
        topic: "Generative AI",
        explanation: "<p>Generative AI models create new content such as text, images, or code from a prompt, which is exactly what producing product descriptions requires. Knowledge mining indexes and searches existing content. Classification assigns a category to input rather than composing new text. Document processing extracts data from existing documents rather than authoring new ones.</p>"
      },
      {
        n: 7,
        prompt: "A hospital call center wants to transcribe patient voicemails and route them to the correct department. Which workload is primary?",
        choices: ["Computer vision", "Anomaly detection", "NLP", "Document processing"],
        answer: 2,
        topic: "NLP",
        explanation: "<p>NLP includes speech-to-text transcription and text understanding needed to categorize and route messages. Computer vision processes images and video, not audio. Anomaly detection identifies statistical outliers rather than understanding language intent. Document processing handles structured forms, not live voice recordings.</p>"
      },
      {
        n: 8,
        prompt: "An e-commerce site wants to find groups of customers with similar purchase histories to create targeted promotions. Which workload fits?",
        choices: ["Anomaly detection", "Knowledge mining", "Conversational AI", "Machine learning (clustering)"],
        answer: 3,
        topic: "Machine learning",
        explanation: "<p>Clustering, a form of unsupervised machine learning, groups similar data points together without predefined labels, ideal for segmenting customers by behavior. Anomaly detection highlights outliers rather than cohesive groups. Knowledge mining indexes documents for search. Conversational AI supports chatbot dialogue rather than customer segmentation.</p>"
      }
    ]
  },
  {
    id: "d1-responsible",
    domain: "AI Workloads and Considerations",
    title: "The Six Responsible AI Principles",
    blurb: "Cuts through principle confusion by anchoring each scenario to the one Responsible AI pillar it targets.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A hiring algorithm consistently scores candidates from certain zip codes lower even though zip code is not a stated criterion. Which Responsible AI principle is violated?",
        choices: ["Fairness", "Transparency", "Accountability", "Reliability and safety"],
        answer: 0,
        topic: "Fairness",
        explanation: "<p>Fairness requires that AI systems do not produce biased outcomes that disadvantage people based on irrelevant characteristics. Transparency concerns whether decisions are explainable. Accountability is about who is responsible for the system. Reliability and safety is about consistent and safe operation, not discriminatory scoring.</p>"
      },
      {
        n: 2,
        prompt: "An AI diagnostic tool fails unexpectedly when presented with X-rays from a new scanner model, causing missed diagnoses. Which principle is most at risk?",
        choices: ["Inclusiveness", "Privacy and security", "Reliability and safety", "Transparency"],
        answer: 2,
        topic: "Reliability and safety",
        explanation: "<p>Reliability and safety requires AI systems to perform consistently and safely across different conditions, including new equipment. Inclusiveness addresses whether the system serves all people, not operational stability. Privacy and security concerns data protection, not diagnostic accuracy. Transparency involves explaining decisions, not whether the system functions correctly.</p>"
      },
      {
        n: 3,
        prompt: "A credit scoring model returns a denial decision but cannot explain which factors contributed to it. Which principle does this undermine?",
        choices: ["Accountability", "Fairness", "Inclusiveness", "Transparency"],
        answer: 3,
        topic: "Transparency",
        explanation: "<p>Transparency requires that AI systems and their decisions be understandable; a black-box that cannot explain its reasoning violates this principle. Accountability concerns who owns responsibility for outcomes. Fairness is about unbiased treatment of groups. Inclusiveness addresses whether the system serves everyone, not whether decisions can be explained.</p>"
      },
      {
        n: 4,
        prompt: "A city deploys an AI translation app that works well for only three languages, leaving minority-language speakers underserved. Which principle is most relevant?",
        choices: ["Reliability and safety", "Inclusiveness", "Privacy and security", "Accountability"],
        answer: 1,
        topic: "Inclusiveness",
        explanation: "<p>Inclusiveness requires that AI systems are designed so that all people, including minority-language speakers, can benefit. Reliability and safety concerns consistent performance rather than coverage breadth. Privacy and security involves data protection. Accountability concerns who is responsible for outcomes, not who the system reaches.</p>"
      },
      {
        n: 5,
        prompt: "A healthcare app stores patient symptom data in an unencrypted database accessible to third-party advertisers. Which principle is violated?",
        choices: ["Fairness", "Privacy and security", "Transparency", "Reliability and safety"],
        answer: 1,
        topic: "Privacy and security",
        explanation: "<p>Privacy and security requires that AI systems protect personal data and comply with data regulations; exposing health data to advertisers violates this directly. Fairness concerns bias, not data exposure. Transparency is about explainability. Reliability and safety concerns consistent and safe operation, not how data is stored or shared.</p>"
      },
      {
        n: 6,
        prompt: "An autonomous vehicle company cannot identify which team is responsible when the AI makes a dangerous driving decision. Which principle is absent?",
        choices: ["Inclusiveness", "Accountability", "Fairness", "Privacy and security"],
        answer: 1,
        topic: "Accountability",
        explanation: "<p>Accountability requires that people and organizations take responsibility for AI system decisions; unclear ownership of a safety-critical decision directly violates this principle. Inclusiveness is about equitable access. Fairness concerns bias in outcomes. Privacy and security deals with data protection rather than who owns decision responsibility.</p>"
      },
      {
        n: 7,
        prompt: "A voice assistant tested only on adult male voices frequently misunderstands children and female speakers. Which Responsible AI principle does this breach?",
        choices: ["Fairness", "Transparency", "Accountability", "Reliability and safety"],
        answer: 0,
        topic: "Fairness",
        explanation: "<p>Fairness requires that AI systems work equitably across different groups; a system that performs poorly for certain demographics is a fairness failure. Transparency relates to explainability. Accountability concerns ownership of outcomes. Reliability and safety focuses on consistent and safe operation broadly rather than equitable group performance.</p>"
      },
      {
        n: 8,
        prompt: "An AI content-moderation system's decision logic and training data sources are published publicly so regulators can audit them. Which principle does this exemplify?",
        choices: ["Inclusiveness", "Reliability and safety", "Transparency", "Accountability"],
        answer: 2,
        topic: "Transparency",
        explanation: "<p>Transparency means that AI systems and their development practices are open to scrutiny; publishing decision logic and training data sources directly implements this principle. Inclusiveness is about access for all people. Reliability and safety concerns operational consistency. Accountability addresses ownership of responsibility, while transparency focuses on openness and explainability.</p>"
      }
    ]
  },
  {
    id: "d2-techniques",
    domain: "Machine Learning on Azure",
    title: "Regression, Classification \u0026 Clustering",
    blurb: "Clears up technique confusion by linking each learning scenario to the right algorithm family.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A model predicts the selling price of a house based on size, location, and age. What type of machine learning technique is this?",
        choices: ["Regression", "Binary classification", "Clustering", "Multiclass classification"],
        answer: 0,
        topic: "Regression",
        explanation: "<p>Regression predicts a continuous numeric value such as a house price. Binary classification predicts one of two categories. Multiclass classification predicts one category from several. Clustering groups unlabeled data points by similarity and does not predict a numeric output.</p>"
      },
      {
        n: 2,
        prompt: "A model labels each support ticket as one of five categories: billing, technical, shipping, returns, or other. Which technique is this?",
        choices: ["Regression", "Clustering", "Multiclass classification", "Binary classification"],
        answer: 2,
        topic: "Multiclass classification",
        explanation: "<p>Multiclass classification assigns each input to one label chosen from more than two classes, which matches five ticket categories. Regression predicts a numeric value. Clustering groups data without predefined labels. Binary classification handles only two possible outcomes such as spam or not spam.</p>"
      },
      {
        n: 3,
        prompt: "A data scientist trains a model on labeled images to distinguish cats from dogs. Which type of learning is this?",
        choices: ["Unsupervised learning", "Reinforcement learning", "Semi-supervised learning", "Supervised learning"],
        answer: 3,
        topic: "Supervised learning",
        explanation: "<p>Supervised learning uses labeled training examples, and labeled images with cat/dog annotations are the defining example. Unsupervised learning has no labels. Reinforcement learning trains an agent through rewards and penalties. Semi-supervised learning uses a mix of labeled and unlabeled data; training exclusively on labeled examples is fully supervised.</p>"
      },
      {
        n: 4,
        prompt: "A marketing team feeds customer transaction data into a model with no labels and asks it to discover natural groupings. Which technique is used?",
        choices: ["Supervised learning", "Binary classification", "Regression", "Clustering"],
        answer: 3,
        topic: "Clustering",
        explanation: "<p>Clustering is an unsupervised technique that finds natural groupings in unlabeled data. Supervised learning and binary classification both require labeled data. Regression predicts a numeric target variable and also requires a label. All three of those require labels; clustering does not.</p>"
      },
      {
        n: 5,
        prompt: "Which statement correctly describes deep learning?",
        choices: ["It uses shallow decision trees trained on structured data.", "It learns feature representations through multiple layers of artificial neurons.", "It requires manually engineered features before training.", "It applies only to image data and cannot handle text."],
        answer: 1,
        topic: "Deep learning",
        explanation: "<p>Deep learning uses neural networks with many layers that automatically learn hierarchical feature representations from raw data, including both images and text. It does not require manual feature engineering and it is not limited to structured or image data. Shallow decision trees are a classical ML approach, not deep learning.</p>"
      },
      {
        n: 6,
        prompt: "The Transformer architecture underlies modern large language models. What mechanism does it rely on to weigh the importance of different words in a sequence?",
        choices: ["Gradient boosting", "Convolutional filters", "Attention", "Backpropagation"],
        answer: 2,
        topic: "Transformer attention",
        explanation: "<p>The Transformer uses a self-attention mechanism that allows the model to weigh the relevance of every other word when encoding each word, enabling long-range dependencies. Gradient boosting is an ensemble tree method. Convolutional filters are used in CNNs for local pattern detection. Backpropagation is the general training algorithm used across many architectures, not specific to Transformers.</p>"
      },
      {
        n: 7,
        prompt: "An email filter classifies each message as spam or not spam. Which technique does this represent?",
        choices: ["Multiclass classification", "Regression", "Binary classification", "Clustering"],
        answer: 2,
        topic: "Binary classification",
        explanation: "<p>Binary classification assigns each input to one of exactly two classes, which matches the spam/not-spam decision. Multiclass classification handles three or more classes. Regression predicts a continuous numeric value. Clustering groups data without predefined labels and cannot produce a spam/not-spam decision on its own.</p>"
      },
      {
        n: 8,
        prompt: "A researcher trains a model without any labeled data by letting it group news articles by topic similarity. Which technique family is this?",
        choices: ["Supervised learning", "Reinforcement learning", "Unsupervised learning", "Binary classification"],
        answer: 2,
        topic: "Unsupervised learning",
        explanation: "<p>Unsupervised learning discovers structure in data that has no labels, and clustering articles by topic similarity is a classic example. Supervised learning requires labels. Reinforcement learning uses reward signals. Binary classification requires labeled positive and negative examples, which this scenario lacks.</p>"
      }
    ]
  },
  {
    id: "d2-concepts",
    domain: "Machine Learning on Azure",
    title: "Features, Labels, Training \u0026 Validation",
    blurb: "Builds a firm grip on the core ML vocabulary before metrics or model types are introduced.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "In a dataset used to predict house prices, which column is the label?",
        choices: ["Number of bedrooms", "Zip code", "Sale price", "Year built"],
        answer: 2,
        topic: "Labels",
        explanation: "<p>The label is the value the model is trained to predict. Sale price is what the model outputs, making it the label. Number of bedrooms, zip code, and year built are input characteristics used to make that prediction, so they are features.</p>"
      },
      {
        n: 2,
        prompt: "A data scientist holds back 20 percent of the dataset and never uses it during training or hyperparameter tuning. What is this portion called?",
        choices: ["Training set", "Validation set", "Feature store", "Test set"],
        answer: 3,
        topic: "Test data",
        explanation: "<p>The test set is reserved entirely until after training and tuning are complete; it provides an unbiased estimate of final model performance. The training set is used to fit the model. The validation set is used during development to tune hyperparameters. A feature store is an infrastructure component, not a data split.</p>"
      },
      {
        n: 3,
        prompt: "During training, the model achieves 99% accuracy on training data but only 60% on new data. What problem does this illustrate?",
        choices: ["Underfitting", "Data leakage", "Overfitting", "Label imbalance"],
        answer: 2,
        topic: "Overfitting",
        explanation: "<p>Overfitting occurs when a model memorizes the training data, including noise, and fails to generalize to new examples. Underfitting means the model is too simple even for the training data. Data leakage means information from the test set contaminated training. Label imbalance refers to unequal class distribution, not the gap between training and new-data performance.</p>"
      },
      {
        n: 4,
        prompt: "Which statement best describes a feature in a machine learning dataset?",
        choices: ["The output value the model predicts", "A measurable input variable used to make a prediction", "The percentage of correct predictions on the test set", "The algorithm used to fit the model"],
        answer: 1,
        topic: "Features",
        explanation: "<p>A feature is a measurable input attribute, such as age or square footage, that the model uses as evidence to make its prediction. The output value is the label. The percentage of correct predictions is accuracy. The fitting algorithm is the learning algorithm, not a feature.</p>"
      },
      {
        n: 5,
        prompt: "Why is a separate validation set used during model development in addition to the training set?",
        choices: ["To provide more data for training the model weights", "To tune hyperparameters without biasing the final test evaluation", "To store raw data before preprocessing", "To replace the test set once training is finished"],
        answer: 1,
        topic: "Validation data",
        explanation: "<p>The validation set is used to tune hyperparameters and compare model variants so that decisions are guided by held-out data; using the test set for this would give an optimistic and unreliable final estimate. The validation set is not used to train weights. It is not a storage layer. It does not replace the test set.</p>"
      },
      {
        n: 6,
        prompt: "A model trained on historical loan data performs poorly on loans from a new region it has never seen. Which concept best describes this failure?",
        choices: ["Overfitting", "Poor generalization", "Label leakage", "Feature normalization"],
        answer: 1,
        topic: "Generalization",
        explanation: "<p>Generalization is the model's ability to perform well on new, unseen data; failure to do so in a new region is poor generalization. Overfitting is a specific cause of poor generalization due to memorizing training data, but the broader concept is generalization. Label leakage means test information entered training. Feature normalization is a preprocessing step, not a failure mode.</p>"
      },
      {
        n: 7,
        prompt: "Which data split is used to compute the final, unbiased performance score reported to stakeholders after all training is complete?",
        choices: ["Validation set", "Training set", "Feature store", "Test set"],
        answer: 3,
        topic: "Test data",
        explanation: "<p>The test set is held out until all training and tuning decisions are finalized, giving an unbiased estimate of real-world performance suitable for reporting. The training set fits the model. The validation set guides tuning and is already used during development. A feature store is infrastructure for serving features, not a data split.</p>"
      },
      {
        n: 8,
        prompt: "A data scientist adds 50 columns derived from the outcome variable to the training data. What problem does this introduce?",
        choices: ["Overfitting", "Underfitting", "Data leakage", "Feature sparsity"],
        answer: 2,
        topic: "Data leakage",
        explanation: "<p>Data leakage occurs when information about the target is improperly included as a feature, making the model appear to perform well in training but fail in deployment where those derived columns are unavailable. Overfitting means memorizing noise. Underfitting means the model is too simple. Feature sparsity refers to many zero-valued feature values, not contamination by the target.</p>"
      }
    ]
  },
  {
    id: "d2-metrics",
    domain: "Machine Learning on Azure",
    title: "Evaluation Metrics \u0026 the Confusion Matrix",
    blurb: "Drills the right metric for each situation, including the trap of accuracy on imbalanced data.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A confusion matrix cell shows cases where the model predicted positive and the actual label was also positive. What is this cell called?",
        choices: ["False positive", "True negative", "False negative", "True positive"],
        answer: 3,
        topic: "True positive",
        explanation: "<p>A true positive is a case the model correctly predicted as positive. A false positive is predicted positive but actually negative. A true negative is correctly predicted as negative. A false negative is predicted negative but actually positive.</p>"
      },
      {
        n: 2,
        prompt: "A screening model flags 1000 patients as positive. Of those, 200 actually have the disease. What is the model's precision?",
        choices: ["80%", "50%", "20%", "40%"],
        answer: 2,
        topic: "Precision",
        explanation: "<p>Precision = true positives / (true positives + false positives) = 200 / 1000 = 0.20, or 20%. A precision of 80% would imply 800 correct positives out of 1000. 50% and 40% do not match the calculation. Precision measures how many flagged cases are correct, not how many real cases were found.</p>"
      },
      {
        n: 3,
        prompt: "Which metric measures the proportion of actual positive cases that the model correctly identified?",
        choices: ["Precision", "Accuracy", "Recall", "F1 score"],
        answer: 2,
        topic: "Recall",
        explanation: "<p>Recall (also called sensitivity) = true positives / (true positives + false negatives), which is the fraction of real positives that were found. Precision measures correctness among predicted positives. Accuracy measures overall correctness across all classes. F1 score is the harmonic mean of precision and recall.</p>"
      },
      {
        n: 4,
        prompt: "A fraud dataset has 99% legitimate and 1% fraud. A model that always predicts 'legitimate' gets 99% accuracy. Which metric would better reveal the model's failure?",
        choices: ["Accuracy", "R-squared", "F1 score", "RMSE"],
        answer: 2,
        topic: "F1 score",
        explanation: "<p>F1 score is the harmonic mean of precision and recall; a model that never detects fraud would have zero recall and therefore an F1 of zero, exposing the failure. Accuracy is misleading on imbalanced datasets, as the 99% score proves. R-squared and RMSE are regression metrics that do not apply to binary classification.</p>"
      },
      {
        n: 5,
        prompt: "For a regression model predicting energy consumption, which metric measures average prediction error in the same units as the target?",
        choices: ["AUC", "Precision", "F1 score", "MAE"],
        answer: 3,
        topic: "MAE",
        explanation: "<p>Mean Absolute Error (MAE) is the average of the absolute differences between predictions and actual values, reported in the same units as the target. AUC measures classification model discrimination. Precision and F1 score are classification metrics. RMSE is also in the same units but penalizes large errors more heavily than MAE does.</p>"
      },
      {
        n: 6,
        prompt: "An ROC curve plots true positive rate against false positive rate. What does the AUC value represent?",
        choices: ["The model's accuracy on the test set", "The probability that the model ranks a random positive higher than a random negative", "The threshold that maximizes precision", "The proportion of actual negatives correctly identified"],
        answer: 1,
        topic: "AUC-ROC",
        explanation: "<p>AUC (area under the ROC curve) equals the probability that the model assigns a higher score to a randomly chosen positive than to a randomly chosen negative, measuring overall discrimination ability. It is not the same as accuracy. It does not specify an optimal threshold. The proportion of actual negatives correctly identified is specificity (true negative rate).</p>"
      },
      {
        n: 7,
        prompt: "Which metric indicates what proportion of the variance in the target variable is explained by a regression model?",
        choices: ["RMSE", "Recall", "AUC", "R-squared"],
        answer: 3,
        topic: "R-squared",
        explanation: "<p>R-squared (coefficient of determination) measures the proportion of variance in the target that the model explains; a value of 1.0 means perfect prediction. RMSE measures average prediction error magnitude. Recall is a classification metric. AUC measures ranking discrimination for classifiers, not regression fit.</p>"
      },
      {
        n: 8,
        prompt: "A model predicts negative for a patient who actually has a disease. What type of error is this?",
        choices: ["True positive", "False positive", "True negative", "False negative"],
        answer: 3,
        topic: "False negative",
        explanation: "<p>A false negative is a case that is actually positive (has the disease) but the model predicted it as negative. A true positive means the model correctly identified the disease. A false positive means a healthy patient was incorrectly flagged. A true negative means a healthy patient was correctly cleared.</p>"
      }
    ]
  },
  {
    id: "d2-azureml",
    domain: "Machine Learning on Azure",
    title: "Azure Machine Learning Studio, AutoML \u0026 Compute",
    blurb: "Maps the Azure ML studio interface concepts to their correct definitions so nothing gets swapped.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A data scientist wants to try multiple algorithms and hyperparameter combinations without writing infrastructure code. Which Azure ML feature should they use?",
        choices: ["Azure Machine Learning designer", "Automated machine learning", "Model registry", "Responsible AI dashboard"],
        answer: 1,
        topic: "AutoML",
        explanation: "<p>Automated machine learning (AutoML) automatically tries multiple algorithms and hyperparameter combinations with no manual infrastructure setup. The designer is a low-code drag-and-drop pipeline canvas, not an automated search. The model registry stores versioned models. The Responsible AI dashboard analyzes a trained model for fairness and explainability.</p>"
      },
      {
        n: 2,
        prompt: "Which Azure Machine Learning compute target is designed for long-running training jobs that can scale to multiple nodes?",
        choices: ["Compute instance", "Compute cluster", "Inference cluster", "Local computer"],
        answer: 1,
        topic: "Compute cluster",
        explanation: "<p>A compute cluster can scale from zero to many nodes and is designed for training jobs that benefit from distributed or parallel execution. A compute instance is a single VM primarily used for interactive development. An inference cluster hosts deployed models for real-time scoring. A local computer is not a managed Azure compute target.</p>"
      },
      {
        n: 3,
        prompt: "A data engineer registers a connection to an Azure Blob Storage account so experiments can access the data by name. What is this connection called in Azure Machine Learning?",
        choices: ["Data asset", "Model registry", "Datastore", "Compute instance"],
        answer: 2,
        topic: "Datastores",
        explanation: "<p>A datastore in Azure Machine Learning stores the connection information (such as account name and key) to an external storage service. A data asset is a versioned reference to specific data within a datastore. The model registry stores trained models. A compute instance is a virtual machine for development work.</p>"
      },
      {
        n: 4,
        prompt: "After training a model, a team wants to deploy it so it scores individual customer requests within milliseconds. Which endpoint type should they create?",
        choices: ["Batch endpoint", "Real-time endpoint", "Compute cluster", "Pipeline endpoint"],
        answer: 1,
        topic: "Real-time endpoint",
        explanation: "<p>A real-time (online) endpoint returns predictions synchronously in milliseconds, which is needed for live customer requests. A batch endpoint processes large volumes of data asynchronously and is not suitable for low-latency individual requests. A compute cluster is a training resource. A pipeline endpoint runs a reusable training pipeline, not inference.</p>"
      },
      {
        n: 5,
        prompt: "A data scientist wants to build an ML pipeline by connecting dataset, transform, and train modules using drag-and-drop. Which Azure ML tool should they use?",
        choices: ["Automated machine learning", "Azure Machine Learning designer", "Responsible AI dashboard", "Azure Notebooks"],
        answer: 1,
        topic: "Designer",
        explanation: "<p>The Azure Machine Learning designer provides a visual drag-and-drop canvas for building and running ML pipelines without writing code. AutoML automatically searches for the best model rather than providing a visual pipeline canvas. The Responsible AI dashboard assesses a trained model. Azure Notebooks is for writing Jupyter notebook code, not drag-and-drop pipeline building.</p>"
      },
      {
        n: 6,
        prompt: "An ML team wants to store all versions of trained models along with metadata such as training run, framework, and accuracy. What Azure ML feature manages this?",
        choices: ["Datastore", "Data asset", "Compute instance", "Model registry"],
        answer: 3,
        topic: "Model registry",
        explanation: "<p>The model registry in Azure Machine Learning stores versioned models with associated metadata and run lineage, making it easy to track, compare, and deploy specific versions. A datastore is a connection to storage. A data asset is a versioned reference to data, not models. A compute instance is a development VM, not a versioning system for models.</p>"
      },
      {
        n: 7,
        prompt: "Which Azure Machine Learning tool helps teams evaluate a trained model for potential bias, error analysis, and feature importance in a single interactive view?",
        choices: ["Automated machine learning", "Model registry", "Responsible AI dashboard", "Azure Notebooks"],
        answer: 2,
        topic: "Responsible AI dashboard",
        explanation: "<p>The Responsible AI dashboard in Azure Machine Learning aggregates bias detection, error analysis, explainability, and counterfactual analysis into one interactive interface. AutoML automates model search. The model registry stores versioned models. Azure Notebooks is a code authoring environment, not a fairness and explainability analysis tool.</p>"
      },
      {
        n: 8,
        prompt: "A data scientist uses a single-node, fully configured virtual machine in Azure Machine Learning to write and run Jupyter notebooks interactively. What is this resource called?",
        choices: ["Compute cluster", "Batch endpoint", "Inference cluster", "Compute instance"],
        answer: 3,
        topic: "Compute instance",
        explanation: "<p>A compute instance is a managed single-node VM pre-configured with data science tools, used for interactive Jupyter notebook development. A compute cluster is multi-node and designed for training jobs. A batch endpoint runs asynchronous scoring jobs. An inference cluster hosts deployed real-time services.</p>"
      }
    ]
  },
  {
    id: "d3-types",
    domain: "Computer Vision",
    title: "Classification, Detection, Segmentation \u0026 OCR",
    blurb: "Stops the common swap between detection and segmentation by grounding each in its defining output.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A model analyzes a photo and outputs the single label 'golden retriever' for the whole image. Which computer vision task is this?",
        choices: ["Object detection", "Semantic segmentation", "Image classification", "OCR"],
        answer: 2,
        topic: "Image classification",
        explanation: "<p>Image classification assigns a single label to an entire image. Object detection would return bounding boxes around individual dogs. Semantic segmentation would label every pixel. OCR extracts text from images and would not produce an animal breed label.</p>"
      },
      {
        n: 2,
        prompt: "A system identifies every car in a traffic image and draws a rectangle around each one with a confidence score. Which task is this?",
        choices: ["Image classification", "Instance segmentation", "OCR", "Object detection"],
        answer: 3,
        topic: "Object detection",
        explanation: "<p>Object detection locates instances of objects within an image and returns bounding boxes with labels and confidence scores. Image classification labels the whole image. Instance segmentation provides pixel-level masks rather than bounding boxes. OCR reads text characters, not vehicle locations.</p>"
      },
      {
        n: 3,
        prompt: "A self-driving car system labels every pixel in a road scene as 'road', 'pedestrian', 'vehicle', or 'sky'. Which task is this?",
        choices: ["Image classification", "Object detection", "Optical character recognition", "Semantic segmentation"],
        answer: 3,
        topic: "Semantic segmentation",
        explanation: "<p>Semantic segmentation classifies every pixel in an image into a category, providing detailed spatial understanding needed for driving. Image classification produces a single label for the whole image. Object detection produces bounding boxes, not per-pixel labels. Optical character recognition reads text, not scene elements.</p>"
      },
      {
        n: 4,
        prompt: "What is the primary output of an object detection model?",
        choices: ["A single class label for the whole image", "Pixel-level class masks for all regions", "Bounding boxes with class labels and confidence scores", "A transcript of any text visible in the image"],
        answer: 2,
        topic: "Bounding boxes",
        explanation: "<p>Object detection models output bounding boxes (defined by coordinates) around each detected object, along with the class label and confidence score. A single class label is image classification output. Pixel-level masks are segmentation output. A text transcript is OCR output.</p>"
      },
      {
        n: 5,
        prompt: "A developer wants to extract all printed text from scanned book pages. Which Azure AI Vision capability is designed for this?",
        choices: ["Smart crop", "Image captioning", "Background removal", "Read (OCR)"],
        answer: 3,
        topic: "OCR",
        explanation: "<p>The Read capability in Azure AI Vision performs optical character recognition on images and PDF documents, returning the detected text and its location. Smart crop finds aesthetically interesting regions. Image captioning generates a descriptive sentence. Background removal isolates foreground subjects. None of these three extract printed text.</p>"
      },
      {
        n: 6,
        prompt: "Which statement correctly distinguishes semantic segmentation from object detection?",
        choices: ["Semantic segmentation draws bounding boxes; object detection labels pixels.", "Semantic segmentation classifies every pixel; object detection draws bounding boxes around objects.", "Object detection labels every pixel; semantic segmentation counts objects.", "Both tasks produce the same output format."],
        answer: 1,
        topic: "Segmentation vs detection",
        explanation: "<p>Semantic segmentation classifies every pixel into a category while object detection localizes objects with bounding boxes. The first choice reverses the definitions. The third choice incorrectly describes object detection. The fourth choice is false since their output formats differ fundamentally.</p>"
      },
      {
        n: 7,
        prompt: "A recycling plant wants to count and locate individual bottles and cans in an image. Which computer vision task should be used?",
        choices: ["Semantic segmentation", "Image classification", "Object detection", "OCR"],
        answer: 2,
        topic: "Object detection",
        explanation: "<p>Object detection identifies and localizes multiple individual objects in an image with bounding boxes, enabling counting each type of item. Semantic segmentation labels pixels but does not distinguish individual instances for counting. Image classification assigns a single label to the whole image. OCR reads text and cannot count or locate physical objects.</p>"
      },
      {
        n: 8,
        prompt: "A mobile app captures a photo of a restaurant menu and converts the visible text to searchable content. Which capability is used?",
        choices: ["Image classification", "Object detection", "Semantic segmentation", "OCR"],
        answer: 3,
        topic: "OCR",
        explanation: "<p>OCR (optical character recognition) reads printed or handwritten text from images, which is what converting menu text to searchable content requires. Image classification assigns a label to the whole image. Object detection locates objects with bounding boxes but does not read text. Semantic segmentation labels pixels and does not produce text output.</p>"
      }
    ]
  },
  {
    id: "d3-faces",
    domain: "Computer Vision",
    title: "Face Detection, Analysis \u0026 Recognition",
    blurb: "Keeps face detection, analysis, and recognition separate and flags where Limited Access rules apply.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "An app receives a photo and returns only the bounding boxes and count of faces found, with no identity or attribute data. Which capability is used?",
        choices: ["Face recognition", "Face verification", "Face detection", "Face analysis"],
        answer: 2,
        topic: "Face detection",
        explanation: "<p>Face detection locates faces in an image and returns their positions; it does not identify who the person is or analyze attributes. Face recognition identifies or matches the identity of a face. Face verification checks whether two faces belong to the same person. Face analysis returns attributes such as pose or blur quality beyond just locating the face.</p>"
      },
      {
        n: 2,
        prompt: "Azure AI Face can return headPose and blur quality attributes for detected faces. Which capability does this describe?",
        choices: ["Face recognition", "Face detection", "Face analysis", "Face verification"],
        answer: 2,
        topic: "Face analysis",
        explanation: "<p>Face analysis extends detection by returning additional attributes about each face, such as head pose, blur, and mask detection. Face detection only locates faces. Face recognition identifies a specific individual. Face verification compares two specific faces for identity matching and does not return general quality attributes.</p>"
      },
      {
        n: 3,
        prompt: "A security system checks whether the person presenting an ID card is the same individual as the one in the stored photo. Which face capability is this?",
        choices: ["Face detection", "Face analysis", "Face recognition", "Face verification"],
        answer: 3,
        topic: "Face verification",
        explanation: "<p>Face verification compares two face images to determine whether they belong to the same person, which is exactly what matching an ID photo to a live person requires. Face detection only finds and locates faces. Face analysis returns attributes. Face recognition searches a gallery to find who a person is, not comparing exactly two images.</p>"
      },
      {
        n: 4,
        prompt: "Which Azure AI Face feature requires Limited Access approval due to privacy concerns before it can be used in production?",
        choices: ["Face detection in images", "Face analysis for blur quality", "Face identification and recognition", "Counting faces in a crowd"],
        answer: 2,
        topic: "Limited Access policy",
        explanation: "<p>Face identification (matching a face against a gallery) and recognition require Limited Access approval from Microsoft because of the potential for surveillance misuse. Basic face detection, attribute analysis such as blur quality, and counting detected faces are not gated by Limited Access requirements.</p>"
      },
      {
        n: 5,
        prompt: "A time-and-attendance system has a database of employee photos and identifies the matching employee when someone enters the building. Which capability is used?",
        choices: ["Face detection", "Face verification", "Face analysis", "Face identification"],
        answer: 3,
        topic: "Face identification",
        explanation: "<p>Face identification searches a gallery of known faces to determine who a detected face belongs to, which is what attendance systems do. Face detection only finds and locates faces. Face verification compares exactly two faces, not a one-to-many gallery search. Face analysis returns attributes such as pose but does not identify individuals.</p>"
      },
      {
        n: 6,
        prompt: "Which statement best reflects Microsoft's policy regarding emotion inference in the Azure AI Face service?",
        choices: ["Emotion attributes are available to all customers by default.", "Emotion inference from facial expressions has been retired due to privacy and reliability concerns.", "Emotion detection is only available for video input.", "Emotion inference requires a paid premium tier."],
        answer: 1,
        topic: "Face privacy policy",
        explanation: "<p>Microsoft retired the facial emotion inference attributes in Azure AI Face due to concerns about reliability and the potential for harmful use. The feature is not available to customers in any tier. Emotion detection is not limited to video; the capability has been removed across all input types.</p>"
      },
      {
        n: 7,
        prompt: "What does the Azure AI Face detect API return for each detected face in addition to the bounding box location?",
        choices: ["The person's name and employee ID", "A face ID that can be used in follow-up API calls", "A transcript of any speech near the face", "The person's estimated age and emotional state"],
        answer: 1,
        topic: "Face detection",
        explanation: "<p>The face detect API returns a faceId for each detected face, which can be used in subsequent calls such as verification or identification. The person's name requires identification, which is a Limited Access feature. Speech transcription is unrelated to the Face service. Age estimation requires Limited Access, and emotion attributes have been retired.</p>"
      },
      {
        n: 8,
        prompt: "A developer builds an app that locates all faces in a group photo and draws boxes to count attendees. Which Limited Access restriction applies?",
        choices: ["The app requires Limited Access approval because it uses face recognition.", "No Limited Access approval is needed because only face detection is used.", "The app must request approval because it analyzes face attributes.", "All uses of Azure AI Face require a Limited Access application."],
        answer: 1,
        topic: "Limited Access policy",
        explanation: "<p>Basic face detection, which only locates and counts faces without identifying anyone, does not require Limited Access approval. Limited Access is required for identification and recognition features. Analyzing non-sensitive attributes like blur quality is also not gated. Not all Azure AI Face features fall under Limited Access, only the identity-matching capabilities.</p>"
      }
    ]
  },
  {
    id: "d3-services",
    domain: "Computer Vision",
    title: "Azure AI Vision, Custom Vision \u0026 Document Intelligence",
    blurb: "Matches each real-world vision scenario to the correct Azure service so you stop second-guessing.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer calls a single API to get descriptive captions, object tags, and smart-crop coordinates for product photos. Which service provides all of these?",
        choices: ["Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Video Indexer", "Azure AI Vision"],
        answer: 3,
        topic: "Azure AI Vision",
        explanation: "<p>Azure AI Vision's image analysis feature returns captions, tags, objects, and smart-crop coordinates in a single API call. Azure AI Custom Vision requires training a custom model and does not generate captions. Azure AI Document Intelligence extracts fields from forms and documents, not product photos. Azure AI Video Indexer analyzes video streams, not still images.</p>"
      },
      {
        n: 2,
        prompt: "A bakery wants to train a model to detect its own three pastry types in photos. No pre-built model covers these categories. Which service should they use?",
        choices: ["Azure AI Vision", "Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Face"],
        answer: 1,
        topic: "Azure AI Custom Vision",
        explanation: "<p>Azure AI Custom Vision lets you train custom image classification or object detection models with your own labeled images, ideal for domain-specific categories not in pre-built models. Azure AI Vision has general-purpose models that do not cover niche pastry types. Azure AI Document Intelligence handles text extraction from forms. Azure AI Face specifically handles human faces.</p>"
      },
      {
        n: 3,
        prompt: "When you train an Azure AI Custom Vision model, the portal creates two separate resources. What are they called?",
        choices: ["Detection resource and segmentation resource", "Training resource and prediction resource", "Standard tier and free tier endpoints", "Compute instance and compute cluster"],
        answer: 1,
        topic: "Custom Vision resources",
        explanation: "<p>Azure AI Custom Vision uses a training resource for building and evaluating the model and a separate prediction resource for calling the published model in production. These are not named detection/segmentation resources. Tier differences describe pricing, not architectural separation. Compute instances and clusters belong to Azure Machine Learning, not Custom Vision.</p>"
      },
      {
        n: 4,
        prompt: "A financial firm wants to extract the invoice number, vendor name, and total amount from thousands of PDF invoices. Which Azure service is best suited?",
        choices: ["Azure AI Vision Read API", "Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Video Indexer"],
        answer: 2,
        topic: "Document Intelligence",
        explanation: "<p>Azure AI Document Intelligence includes a prebuilt invoice model that extracts structured fields like invoice number, vendor name, and totals. Azure AI Vision Read extracts raw text but does not understand document field semantics. Azure AI Custom Vision handles image classification and object detection, not document field extraction. Azure AI Video Indexer analyzes video content.</p>"
      },
      {
        n: 5,
        prompt: "Which Azure AI Document Intelligence model extracts fields from government-issued identity documents such as passports and driver licenses?",
        choices: ["Prebuilt receipt model", "Prebuilt invoice model", "Prebuilt ID document model", "Prebuilt business card model"],
        answer: 2,
        topic: "Document Intelligence models",
        explanation: "<p>The prebuilt ID document model is trained to extract fields from passports, driver licenses, and similar government IDs. The receipt model handles retail purchase receipts. The invoice model handles vendor invoices. The business card model extracts contact information from business cards.</p>"
      },
      {
        n: 6,
        prompt: "A video streaming company wants to automatically index speaker names, topics, and key frames across thousands of recorded conference talks. Which Azure service is designed for this?",
        choices: ["Azure AI Vision", "Azure AI Custom Vision", "Azure AI Document Intelligence", "Azure AI Video Indexer"],
        answer: 3,
        topic: "Azure AI Video Indexer",
        explanation: "<p>Azure AI Video Indexer analyzes video content to extract insights such as speaker recognition, topic detection, transcript, and key-frame thumbnails. Azure AI Vision handles still-image analysis. Azure AI Custom Vision trains custom image models. Azure AI Document Intelligence extracts fields from documents, not video streams.</p>"
      },
      {
        n: 7,
        prompt: "A developer wants to remove the background from product photos so only the item is shown. Which Azure AI Vision capability handles this?",
        choices: ["Smart crop", "Image captioning", "Background removal", "Read OCR"],
        answer: 2,
        topic: "Background removal",
        explanation: "<p>Azure AI Vision includes a background removal capability that generates a foreground-only image or an alpha matte. Smart crop selects an aesthetically composed region. Image captioning generates a descriptive sentence. Read OCR extracts text. None of these three remove the background.</p>"
      },
      {
        n: 8,
        prompt: "An insurance company scans handwritten claim forms with a unique company-specific layout. Which option best extracts structured field values?",
        choices: ["Prebuilt receipt model in Azure AI Document Intelligence", "Azure AI Vision Read API alone", "Azure AI Custom Vision object detection", "Custom model in Azure AI Document Intelligence"],
        answer: 3,
        topic: "Custom Document Intelligence",
        explanation: "<p>A custom model in Azure AI Document Intelligence is trained on sample labeled forms with the specific layout, learning to extract the company's unique fields. The prebuilt receipt model handles retail receipts, not custom claim forms. The Read API extracts raw text without understanding form structure. Custom Vision classifies or detects objects in images, not form field extraction.</p>"
      }
    ]
  },
  {
    id: "d4-language",
    domain: "Natural Language Processing",
    title: "Key Phrases, Entities, Sentiment \u0026 Summarization",
    blurb: "Untangles the overlapping NLP features so each one maps to exactly the task it performs.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "An app analyzes product reviews and extracts 'battery life', 'camera quality', and 'screen brightness' as main topics. Which NLP feature does this use?",
        choices: ["Named entity recognition", "Sentiment analysis", "Language detection", "Key phrase extraction"],
        answer: 3,
        topic: "Key phrase extraction",
        explanation: "<p>Key phrase extraction identifies the most important noun phrases in text, which is exactly what surfacing topics like 'battery life' represents. Named entity recognition categorizes specific entities such as people, places, and organizations. Sentiment analysis scores text as positive, negative, or neutral. Language detection identifies the language the text is written in.</p>"
      },
      {
        n: 2,
        prompt: "A news aggregator labels 'Microsoft' as an organization and 'Redmond' as a location in articles. Which NLP feature powers this?",
        choices: ["Key phrase extraction", "Named entity recognition", "Extractive summarization", "PII detection"],
        answer: 1,
        topic: "Named entity recognition",
        explanation: "<p>Named entity recognition (NER) detects and categorizes entities such as organizations, locations, and people within text. Key phrase extraction identifies important phrases without categorizing their type. Extractive summarization selects sentences to form a summary. PII detection specifically flags personally identifiable information such as phone numbers and email addresses.</p>"
      },
      {
        n: 3,
        prompt: "A feedback system returns a score of 0.92 positive for the review 'The delivery was fast and the packaging was excellent.' Which NLP feature is this?",
        choices: ["Language detection", "Key phrase extraction", "Sentiment analysis", "Opinion mining"],
        answer: 2,
        topic: "Sentiment analysis",
        explanation: "<p>Sentiment analysis scores text on a positive/negative/neutral scale with a confidence score. Language detection identifies which language was used. Key phrase extraction returns noun phrases rather than scores. Opinion mining links sentiment to specific aspects (e.g., 'delivery was fast'), which is more granular than the overall document score shown here.</p>"
      },
      {
        n: 4,
        prompt: "A compliance system scans emails and flags occurrences of social security numbers, credit card numbers, and passport numbers. Which NLP feature does this use?",
        choices: ["Key phrase extraction", "Named entity recognition", "Opinion mining", "PII detection"],
        answer: 3,
        topic: "PII detection",
        explanation: "<p>PII detection is a specialized feature that identifies and can redact sensitive identifiers such as social security numbers, financial account numbers, and passport numbers. General NER categorizes entities but is not tuned specifically for compliance-sensitive identifiers. Key phrase extraction identifies topics. Opinion mining links sentiment to aspects.</p>"
      },
      {
        n: 5,
        prompt: "A hotel app returns 'cleanliness: positive' and 'noise: negative' from a guest review rather than a single overall score. Which NLP feature produces this?",
        choices: ["Sentiment analysis", "Named entity recognition", "Opinion mining", "Extractive summarization"],
        answer: 2,
        topic: "Opinion mining",
        explanation: "<p>Opinion mining (aspect-based sentiment analysis) links each sentiment to a specific aspect, producing per-aspect labels. Standard sentiment analysis returns an overall document-level score. Named entity recognition categorizes entity types. Extractive summarization selects sentences to condense a document, not produce aspect scores.</p>"
      },
      {
        n: 6,
        prompt: "Which type of summarization selects and returns actual sentences from the source document to form a shorter version?",
        choices: ["Abstractive summarization", "Extractive summarization", "Named entity recognition", "Opinion mining"],
        answer: 1,
        topic: "Extractive summarization",
        explanation: "<p>Extractive summarization identifies and returns the most important sentences from the original document without rewording them. Abstractive summarization generates new sentences that paraphrase the content and may not appear verbatim in the source. Named entity recognition finds entities. Opinion mining links sentiment to aspects and does not produce a summary.</p>"
      },
      {
        n: 7,
        prompt: "An app parses 'I want to cancel my order placed on Monday' to identify the action (cancel), what it applies to (order), and when (Monday). Which NLP components are identified?",
        choices: ["Key phrases, entities, and sentiments", "Languages, intents, and keys", "Intent, entities, and utterance parts", "PII, named entities, and opinion targets"],
        answer: 2,
        topic: "CLU intents and entities",
        explanation: "<p>In conversational language understanding (CLU), the intent is the action (cancel) and the entities are the specific data items extracted (order, Monday). Key phrases and sentiments are separate features. Language detection identifies the language. PII detection looks for sensitive identifiers, not action-oriented elements.</p>"
      },
      {
        n: 8,
        prompt: "A website user submits a support message in an unknown language. The system needs to detect whether it is French, Spanish, or English before routing it. Which NLP feature handles this?",
        choices: ["Named entity recognition", "Language detection", "Sentiment analysis", "Key phrase extraction"],
        answer: 1,
        topic: "Language detection",
        explanation: "<p>Language detection analyzes text and returns the identified language with a confidence score. Named entity recognition categorizes entities but does not identify the language. Sentiment analysis scores tone. Key phrase extraction identifies main topics. None of the other three can determine which language the text is written in.</p>"
      }
    ]
  },
  {
    id: "d4-speech",
    domain: "Natural Language Processing",
    title: "Speech to Text, Text to Speech \u0026 Translation",
    blurb: "Locks down the speech scenario-to-capability mapping including neural voices, SSML, and speaker recognition.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A call center solution converts recorded phone calls to text documents for quality analysis. Which Azure AI Speech capability is used?",
        choices: ["Text to speech", "Speech translation", "Speaker recognition", "Speech to text"],
        answer: 3,
        topic: "Speech to text",
        explanation: "<p>Speech to text converts audio input to written text, which is what transcribing recorded calls requires. Text to speech goes in the opposite direction. Speech translation converts spoken audio to text in a different language. Speaker recognition identifies or verifies who is speaking, not what is said.</p>"
      },
      {
        n: 2,
        prompt: "A navigation app reads turn-by-turn directions aloud in a natural-sounding voice. Which Azure AI Speech capability does this use?",
        choices: ["Speech to text", "Speaker recognition", "Text to speech", "Batch transcription"],
        answer: 2,
        topic: "Text to speech",
        explanation: "<p>Text to speech (speech synthesis) converts written text into spoken audio, which powers reading directions aloud. Speech to text converts audio to text, the opposite direction. Speaker recognition identifies who is speaking. Batch transcription converts large volumes of pre-recorded audio to text asynchronously.</p>"
      },
      {
        n: 3,
        prompt: "A developer uses XML markup in the text input to control speaking rate, pitch, and pauses in synthesized audio. What format is this?",
        choices: ["SSML", "YAML", "Markdown", "JSON"],
        answer: 0,
        topic: "SSML",
        explanation: "<p>SSML (Speech Synthesis Markup Language) is an XML-based language that controls prosody elements such as rate, pitch, volume, and pauses in synthesized speech. YAML and JSON are data serialization formats not used for speech synthesis control. Markdown is a lightweight text-formatting syntax unrelated to audio output.</p>"
      },
      {
        n: 4,
        prompt: "An international conference app converts a speaker's live English speech into spoken French in near-real time. Which Azure AI Speech feature is used?",
        choices: ["Custom neural voice", "Batch transcription", "Speaker recognition", "Speech translation"],
        answer: 3,
        topic: "Speech translation",
        explanation: "<p>Speech translation takes spoken audio in one language and produces text or synthesized speech in a different language in near-real time. Custom neural voice creates a branded synthetic voice from recordings. Batch transcription processes pre-recorded files, not live audio. Speaker recognition identifies who is speaking rather than translating between languages.</p>"
      },
      {
        n: 5,
        prompt: "A media company has 500 hours of archived audio interviews it wants to convert to text overnight. Which Azure AI Speech feature handles this efficiently?",
        choices: ["Real-time speech to text", "Custom neural voice", "SSML synthesis", "Batch transcription"],
        answer: 3,
        topic: "Batch transcription",
        explanation: "<p>Batch transcription is designed to process large volumes of pre-recorded audio files asynchronously, making it suited for overnight processing of hundreds of hours. Real-time speech to text streams and transcribes live audio but is not optimized for bulk offline jobs. Custom neural voice and SSML synthesis produce audio output rather than converting audio to text.</p>"
      },
      {
        n: 6,
        prompt: "A bank verifies that a caller is the account holder by comparing their voice to a stored voice print. Which capability is used?",
        choices: ["Speech translation", "Text to speech", "Speech to text", "Speaker recognition"],
        answer: 3,
        topic: "Speaker recognition",
        explanation: "<p>Speaker recognition includes speaker verification, which confirms that a speaker's voice matches a stored voice print for authentication. Speech translation converts speech across languages. Text to speech synthesizes audio from text. Speech to text transcribes speech to text. None of these three verify identity from voice characteristics.</p>"
      },
      {
        n: 7,
        prompt: "A brand creates a synthetic voice that sounds like their human spokesperson, trained on that person's recorded speech. Which Azure AI Speech feature supports this?",
        choices: ["SSML", "Batch transcription", "Custom neural voice", "Speaker recognition"],
        answer: 2,
        topic: "Custom neural voice",
        explanation: "<p>Custom neural voice lets organizations train a branded synthetic voice model using recordings of a specific speaker. SSML controls prosody of existing voices. Batch transcription converts audio to text. Speaker recognition identifies or verifies a speaker rather than creating a new voice model.</p>"
      },
      {
        n: 8,
        prompt: "Which statement correctly describes the difference between real-time and batch transcription in Azure AI Speech?",
        choices: ["Real-time transcription processes audio files; batch transcription processes live streams.", "Real-time transcription converts live audio immediately; batch transcription converts stored files asynchronously.", "Both process only live audio but at different speeds.", "Batch transcription is more accurate but requires more expensive hardware."],
        answer: 1,
        topic: "Real-time vs batch",
        explanation: "<p>Real-time (continuous) transcription converts a live audio stream as speech occurs, while batch transcription submits stored audio files for asynchronous processing. The first choice reverses the definitions. Both do not exclusively handle live audio. Pricing and hardware differences are not the defining distinction between the two modes.</p>"
      }
    ]
  },
  {
    id: "d4-services",
    domain: "Natural Language Processing",
    title: "Azure AI Language, Speech \u0026 Translator",
    blurb: "Assigns each NLP task to the right Azure service so you never mix up Language, Speech, and Translator.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer wants to add sentiment analysis, key phrase extraction, and NER to a customer feedback portal. Which Azure service provides all three?",
        choices: ["Azure AI Speech", "Azure AI Translator", "Azure AI Language", "Azure AI Bot Service"],
        answer: 2,
        topic: "Azure AI Language",
        explanation: "<p>Azure AI Language consolidates text-based NLP features including sentiment analysis, key phrase extraction, named entity recognition, PII detection, and summarization under one service. Azure AI Speech handles spoken audio. Azure AI Translator converts text between languages. Azure AI Bot Service provides a framework for building conversational bots but does not include NLP text analysis directly.</p>"
      },
      {
        n: 2,
        prompt: "An app needs to convert Latin-script Hindi text to Devanagari script without translating the meaning. Which Azure service handles this?",
        choices: ["Azure AI Language", "Azure AI Speech", "Azure AI Translator", "Azure AI Bot Service"],
        answer: 2,
        topic: "Transliteration",
        explanation: "<p>Azure AI Translator includes a transliteration feature that converts text between scripts without changing the language meaning. Azure AI Language handles text analysis features like NER, not script conversion. Azure AI Speech converts spoken audio to text or vice versa. Azure AI Bot Service is a bot development framework.</p>"
      },
      {
        n: 3,
        prompt: "A global company wants to translate an entire Word document from English to 10 languages while preserving formatting. Which Azure AI Translator feature supports this?",
        choices: ["Text translation API", "Transliteration API", "Document translation", "Language detection"],
        answer: 2,
        topic: "Document translation",
        explanation: "<p>Document translation in Azure AI Translator translates complete documents (Word, PDF, HTML, etc.) while preserving the original layout. The text translation API translates short strings or paragraphs. The transliteration API converts scripts without changing meaning. Language detection identifies the language of text but does not translate it.</p>"
      },
      {
        n: 4,
        prompt: "A company builds a support bot that understands user questions and provides answers from a FAQ knowledge base. Which Azure service orchestrates the conversation?",
        choices: ["Azure AI Language", "Azure AI Translator", "Azure AI Speech", "Azure AI Bot Service"],
        answer: 3,
        topic: "Azure AI Bot Service",
        explanation: "<p>Azure AI Bot Service provides the framework and channels for building, deploying, and connecting conversational bots. Azure AI Language provides the language understanding and question answering capabilities the bot can call. Azure AI Translator handles translation. Azure AI Speech handles spoken input and output, but overall conversation orchestration is managed by Azure AI Bot Service.</p>"
      },
      {
        n: 5,
        prompt: "A developer adds speech-to-text input and text-to-speech output to an existing chatbot. Which Azure service provides these audio capabilities?",
        choices: ["Azure AI Translator", "Azure AI Language", "Azure AI Speech", "Azure AI Bot Service"],
        answer: 2,
        topic: "Azure AI Speech",
        explanation: "<p>Azure AI Speech provides speech recognition (speech to text) and speech synthesis (text to speech). Azure AI Translator converts text between languages but does not process audio. Azure AI Language performs text analysis such as NER and sentiment. Azure AI Bot Service orchestrates conversations but does not generate or process audio directly.</p>"
      },
      {
        n: 6,
        prompt: "An app determines that a user wants to 'check balance', extracts the account number, and routes the request accordingly. Which Azure AI Language feature is this?",
        choices: ["Sentiment analysis", "Key phrase extraction", "PII detection", "Conversational language understanding"],
        answer: 3,
        topic: "CLU",
        explanation: "<p>Conversational language understanding (CLU) classifies user utterances into intents (check balance) and extracts entities (account number). Sentiment analysis scores emotional tone. Key phrase extraction identifies main topics. PII detection flags sensitive identifiers but does not determine user intent or route requests.</p>"
      },
      {
        n: 7,
        prompt: "Which Azure AI Language feature lets you build a question-and-answer system from FAQ documents or web pages?",
        choices: ["Custom NER", "Conversational language understanding", "Custom question answering", "Opinion mining"],
        answer: 2,
        topic: "Question answering",
        explanation: "<p>Custom question answering in Azure AI Language ingests FAQ documents and web pages to build a knowledge base that returns answers to natural language questions. Custom NER trains a model to recognize domain-specific entity types. Conversational language understanding classifies intents in dialogue. Opinion mining links sentiment scores to specific aspects of text.</p>"
      },
      {
        n: 8,
        prompt: "A multilingual support portal receives messages in any language and needs to identify the language before routing them. Which Azure AI Translator feature provides this?",
        choices: ["Document translation", "Transliteration", "Language detection", "Text translation"],
        answer: 2,
        topic: "Language detection",
        explanation: "<p>Azure AI Translator includes a language detection endpoint that identifies the language of submitted text and returns a confidence score. Document translation translates whole files. Transliteration converts between scripts. Text translation translates content between languages but does not identify the source language independently of translating.</p>"
      }
    ]
  },
  {
    id: "d5-basics",
    domain: "Generative AI",
    title: "Tokens, Prompts, Temperature \u0026 Hallucinations",
    blurb: "Builds the core vocabulary of generative AI so parameter questions don't trip you up.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "What are tokens in the context of large language models?",
        choices: ["Authentication keys used to call the API", "Units of text, roughly word fragments, that the model processes", "Individual characters in the input string", "The number of attention layers in the model"],
        answer: 1,
        topic: "Tokens",
        explanation: "<p>Tokens are the basic units LLMs process, roughly corresponding to word fragments or common subwords. A word like 'unbelievable' may be split into several tokens. Tokens are not API keys, individual characters, or architectural components such as attention layers.</p>"
      },
      {
        n: 2,
        prompt: "A generative model returns a confident but completely fabricated citation that does not exist. What is this behavior called?",
        choices: ["Fine-tuning", "Grounding", "Temperature drift", "Hallucination"],
        answer: 3,
        topic: "Hallucinations",
        explanation: "<p>A hallucination is when a language model produces output that sounds plausible but is factually incorrect or entirely invented, such as a fake citation. Fine-tuning is additional training on domain-specific data. Grounding connects the model to real data to reduce hallucinations. Temperature drift is not a defined AI term.</p>"
      },
      {
        n: 3,
        prompt: "A developer sets temperature to 0.1 when calling a language model. What effect does this have on the output?",
        choices: ["The model produces more creative and varied responses.", "The model focuses on the most probable tokens, giving more consistent and deterministic output.", "The model uses fewer tokens per response.", "The model ignores the system message."],
        answer: 1,
        topic: "Temperature",
        explanation: "<p>A low temperature (near 0) makes the model strongly favor the highest-probability tokens, producing more predictable and consistent output. A high temperature increases randomness and creativity. Temperature does not control output length or whether the system message is used.</p>"
      },
      {
        n: 4,
        prompt: "Which type of model can accept both an image and a text description as input and generate a text response?",
        choices: ["A univariate regression model", "A binary classifier", "A multi-modal model", "A speech synthesis model"],
        answer: 2,
        topic: "Multi-modal models",
        explanation: "<p>Multi-modal models accept and generate multiple types of data, such as combining image and text inputs to produce a text response. A univariate regression model predicts a single numeric value. A binary classifier outputs one of two categories. A speech synthesis model converts text to audio and does not process images.</p>"
      },
      {
        n: 5,
        prompt: "In a generative AI API call, what is the text returned by the model in response to the user's input called?",
        choices: ["Token", "Embedding", "Completion", "System message"],
        answer: 2,
        topic: "Prompt and completion",
        explanation: "<p>The model's output is called the completion. The input text sent to the model is the prompt. A token is the unit of text the model processes. An embedding is a numeric vector representation of text used for similarity search. A system message is a special instruction that guides model behavior, not the model's reply.</p>"
      },
      {
        n: 6,
        prompt: "A developer stores documents as dense numeric vectors so that semantically similar texts can be retrieved by comparing vector distances. What are these vectors called?",
        choices: ["Completions", "Tokens", "Embeddings", "System messages"],
        answer: 2,
        topic: "Embeddings",
        explanation: "<p>Embeddings are high-dimensional numeric vectors that represent text in a way that captures semantic meaning; similar content maps to nearby vectors. Completions are the model's text output. Tokens are processing units. System messages are instructions that configure model behavior but are not vector representations.</p>"
      },
      {
        n: 7,
        prompt: "A content platform uses DALL-E to generate unique banner images from text descriptions. What type of model makes this possible?",
        choices: ["A regression model", "A text-to-image generative model", "A binary classification model", "A speech synthesis model"],
        answer: 1,
        topic: "DALL-E image generation",
        explanation: "<p>DALL-E is a text-to-image generative model that produces images from natural language prompts. Regression models predict numeric values. Binary classification models assign one of two categories. Speech synthesis models produce audio, not images.</p>"
      },
      {
        n: 8,
        prompt: "Which parameter, alongside temperature, limits token sampling to a nucleus of likely tokens to control response diversity?",
        choices: ["Top-p", "Max tokens", "SSML", "AUC"],
        answer: 0,
        topic: "Top-p sampling",
        explanation: "<p>Top-p (nucleus sampling) restricts token selection to the smallest set of tokens whose cumulative probability exceeds p, controlling diversity similarly to temperature. Max tokens limits output length rather than sampling diversity. SSML controls speech synthesis prosody. AUC is a classification evaluation metric unrelated to generation parameters.</p>"
      }
    ]
  },
  {
    id: "d5-grounding",
    domain: "Generative AI",
    title: "Prompt Engineering, Grounding, RAG \u0026 Fine-Tuning",
    blurb: "Separates prompting techniques, RAG, and fine-tuning so you pick the right approach for each need.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer includes several example input-output pairs inside the prompt to guide the model's response style. What prompting technique is this?",
        choices: ["Zero-shot prompting", "Fine-tuning", "Few-shot prompting", "Grounding"],
        answer: 2,
        topic: "Few-shot prompting",
        explanation: "<p>Few-shot prompting provides a small number of input-output examples within the prompt itself to demonstrate the desired format or style. Zero-shot prompting gives no examples. Fine-tuning updates the model's weights with additional training data. Grounding connects the model to external factual data sources rather than embedding examples in the prompt.</p>"
      },
      {
        n: 2,
        prompt: "A legal firm wants its AI assistant to answer questions using only its own internal case files, not general internet knowledge. Which technique addresses this?",
        choices: ["Fine-tuning", "Few-shot prompting", "Retrieval augmented generation", "Temperature reduction"],
        answer: 2,
        topic: "RAG",
        explanation: "<p>Retrieval augmented generation (RAG) retrieves relevant documents from a private store at query time and injects them into the prompt, grounding answers in the organization's own content. Fine-tuning changes model weights permanently but does not restrict answers to specific retrieved documents. Few-shot prompting provides examples, not documents. Temperature reduction affects randomness, not knowledge sourcing.</p>"
      },
      {
        n: 3,
        prompt: "What is the purpose of a system message in a generative AI application?",
        choices: ["It stores the conversation history for billing purposes.", "It provides high-level instructions that shape the model's persona and behavior across the session.", "It is the user's typed question sent to the model.", "It is the model's response to the previous turn."],
        answer: 1,
        topic: "System messages",
        explanation: "<p>A system message is a special prompt prefix that sets the model's persona, rules, and scope for the conversation. It is not billing metadata, not the user's question (which is the user message), and not the model's reply (which is the completion).</p>"
      },
      {
        n: 4,
        prompt: "A company needs a model to permanently use its proprietary medical terminology and refuse non-healthcare questions. What is the best approach?",
        choices: ["Adjust the temperature setting", "Fine-tune the base model on domain-specific data", "Use few-shot prompting to demonstrate the style", "Apply only a system message"],
        answer: 1,
        topic: "Fine-tuning",
        explanation: "<p>When the requirement is to permanently embed a consistent style, vocabulary, or behavior into the model, fine-tuning on domain-specific data is the right approach. Temperature controls randomness. Few-shot prompting can guide style but is not persistent across deployments. A system message can set scope but cannot deeply embed proprietary terminology the way fine-tuning can.</p>"
      },
      {
        n: 5,
        prompt: "Which of the four stages in Microsoft's responsible generative AI process involves testing potential harms before deploying a system?",
        choices: ["Operate", "Identify", "Mitigate", "Measure"],
        answer: 3,
        topic: "Responsible GenAI process",
        explanation: "<p>The Measure stage involves evaluating the model and system against potential harms by running red-teaming exercises and systematic tests. Identify is the first stage, which enumerates potential harms. Mitigate is the third stage, implementing controls to reduce harms. Operate is the final stage, monitoring the deployed system in production.</p>"
      },
      {
        n: 6,
        prompt: "A chatbot prompt begins with 'You are a cheerful barista assistant named Brew. Only answer questions about coffee.' Which element is this?",
        choices: ["User message", "Completion", "Grounding document", "System message"],
        answer: 3,
        topic: "System messages",
        explanation: "<p>This is a system message, which defines the model's persona, name, and scope of allowed topics at the start of a conversation. A user message is the human's turn in the conversation. A completion is the model's response. A grounding document is a retrieved text fragment injected into the prompt to provide factual context.</p>"
      },
      {
        n: 7,
        prompt: "What is grounding in the context of generative AI?",
        choices: ["Reducing the model's temperature to zero for determinism", "Connecting model outputs to verified external data so responses are anchored in real facts", "Training the model on new labeled examples to change its weights", "Limiting the number of tokens the model can produce"],
        answer: 1,
        topic: "Grounding",
        explanation: "<p>Grounding connects the model to real, verified data sources so its responses are based on actual information rather than only training knowledge, reducing hallucinations. Setting temperature to zero does not connect the model to external facts. Changing weights is fine-tuning. Token limits control output length, not factual accuracy.</p>"
      },
      {
        n: 8,
        prompt: "When should you prefer fine-tuning over retrieval augmented generation for a generative AI application?",
        choices: ["When the knowledge changes frequently and must always be current", "When you want to embed a consistent style, tone, or behavior deeply into the model", "When you need the model to cite specific source documents in its answers", "When you want to reduce hallucinations by injecting real-time data"],
        answer: 1,
        topic: "Fine-tuning vs RAG",
        explanation: "<p>Fine-tuning is best when you want the model to internalize a consistent style, vocabulary, or domain behavior that would be impractical to prompt-engineer each time. RAG is better for frequently changing knowledge, for citing sources, and for reducing hallucinations with current data, since those scenarios require fresh retrieval rather than baked-in weights.</p>"
      }
    ]
  },
  {
    id: "d5-azure",
    domain: "Generative AI",
    title: "Azure AI Foundry, Azure OpenAI \u0026 Content Safety",
    blurb: "Maps Azure's generative AI platform components so portals, models, and safety controls stay distinct.",
    timeMinutes: 10,
    questions: [
      {
        n: 1,
        prompt: "A developer wants a single portal to discover, test in a playground, and deploy models from OpenAI, Meta, and Mistral. Which Azure service provides this?",
        choices: ["Azure OpenAI Service", "Azure AI Content Safety", "Azure Machine Learning studio", "Azure AI Foundry"],
        answer: 3,
        topic: "Azure AI Foundry",
        explanation: "<p>Azure AI Foundry is the unified portal for exploring the model catalog (which includes models from OpenAI, Meta, Mistral, and others), testing in playgrounds, and deploying. Azure OpenAI Service provides access only to OpenAI models. Azure AI Content Safety filters harmful content. Azure Machine Learning studio focuses on custom ML model training and deployment.</p>"
      },
      {
        n: 2,
        prompt: "Which Azure OpenAI Service model family generates vector embeddings for use in semantic search and RAG pipelines?",
        choices: ["GPT-4", "DALL-E", "Whisper", "text-embedding-ada"],
        answer: 3,
        topic: "Embeddings models",
        explanation: "<p>The text-embedding model family (such as text-embedding-ada-002) produces vector embeddings suitable for semantic search and retrieval. GPT-4 generates text completions. DALL-E generates images. Whisper transcribes audio to text. None of the other three produce embedding vectors for retrieval pipelines.</p>"
      },
      {
        n: 3,
        prompt: "A company deploys a GPT model and wants to screen user inputs and outputs for hate speech, violence, and self-harm. Which Azure service provides these content filters?",
        choices: ["Azure AI Foundry model catalog", "Azure AI Content Safety", "Azure AI Language", "Azure Machine Learning responsible AI dashboard"],
        answer: 1,
        topic: "Azure AI Content Safety",
        explanation: "<p>Azure AI Content Safety analyzes text and images for harmful categories including hate, violence, sexual content, and self-harm. The model catalog lists available models. Azure AI Language performs NLP tasks like sentiment and NER. The responsible AI dashboard assesses model fairness for trained ML models, not real-time content filtering.</p>"
      },
      {
        n: 4,
        prompt: "Within Azure AI Foundry, what is a 'hub' used for?",
        choices: ["Running batch inference jobs on custom ML models", "Providing shared infrastructure, governance, and connections for multiple related AI projects", "Storing prompt flow templates for reuse across subscriptions", "Cataloging third-party model providers"],
        answer: 1,
        topic: "Foundry hubs",
        explanation: "<p>A hub in Azure AI Foundry is a shared governance container that provides centralized connections, compute, storage, and security policies for multiple AI projects within an organization. It is not a batch inference runner, a template store, or a model catalog component.</p>"
      },
      {
        n: 5,
        prompt: "Which Azure OpenAI Service model is specifically designed to transcribe spoken audio to text?",
        choices: ["GPT-4", "DALL-E 3", "text-embedding-ada", "Whisper"],
        answer: 3,
        topic: "Whisper model",
        explanation: "<p>Whisper is the OpenAI audio transcription model available through Azure OpenAI Service that converts spoken audio to text. GPT-4 generates text. DALL-E 3 generates images. text-embedding-ada produces vector embeddings. None of the other three process spoken audio.</p>"
      },
      {
        n: 6,
        prompt: "A developer wants to deploy a large model from the Azure AI Foundry catalog without managing the underlying compute servers. Which deployment option fits?",
        choices: ["Managed compute deployment", "Serverless API deployment", "Compute cluster endpoint", "Azure Machine Learning real-time endpoint"],
        answer: 1,
        topic: "Serverless API deployment",
        explanation: "<p>Serverless API deployment (models-as-a-service) lets developers call a model via API without provisioning or managing infrastructure. Managed compute deployment allocates dedicated virtual machine compute the user must size and manage. Compute cluster endpoints and Azure Machine Learning real-time endpoints require configuring the underlying compute explicitly.</p>"
      },
      {
        n: 7,
        prompt: "In Azure OpenAI Service, what is a 'deployment' in the context of using a model?",
        choices: ["A named instance of a model version assigned a throughput quota for your use", "A fine-tuning training run that updates model weights", "A content safety policy applied to model outputs", "A project container that holds connected resources"],
        answer: 0,
        topic: "Azure OpenAI deployments",
        explanation: "<p>A deployment in Azure OpenAI Service is a named instance of a specific model version with a configured token-per-minute quota that your application calls by deployment name. Fine-tuning is a separate operation that creates a custom model. Content safety policies are configured separately. A project container is an Azure AI Foundry concept, not an Azure OpenAI deployment.</p>"
      },
      {
        n: 8,
        prompt: "A developer uses the 'on your data' feature in Azure OpenAI Service. What does this enable?",
        choices: ["It lets the model generate images from proprietary training data.", "It connects the model to an Azure AI Search index so it answers using the organization's own documents.", "It fine-tunes the model on the organization's private dataset automatically.", "It increases the token quota limit for the deployment."],
        answer: 1,
        topic: "On your data",
        explanation: "<p>The 'on your data' feature integrates with Azure AI Search to perform retrieval augmented generation (RAG), grounding the model's answers in the organization's own indexed documents. It does not generate images, fine-tune the model automatically, or affect token quota limits.</p>"
      }
    ]
  }
];
