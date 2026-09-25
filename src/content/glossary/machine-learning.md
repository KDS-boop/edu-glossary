---
term: "Machine Learning"
shortDefinition: "A branch of artificial intelligence that enables systems to learn from data and improve their performance without being explicitly programmed."
category: "AI & Data"
letter: "M"
updatedDate: 2026-09-19
relatedTerms: ["Chatbot", "Training Data", "Predictive Analytics", "Deep Learning", "Natural Language Processing"]
---

Machine Learning (ML) is an approach within artificial intelligence where computers learn to recognize patterns from data and make decisions or predictions without explicit rule-based instructions. Instead of being manually written by a programmer, an ML model learns the relationship between inputs and outputs from historical data examples, then applies those patterns to new, unseen data.

## The ML Workflow

Building a machine learning model typically follows a pipeline:

1. **Data collection** — gather relevant, representative data from the problem domain.
2. **Data preparation** — clean the data, handle missing values, and transform features into a format the model can use.
3. **Model selection** — choose an algorithm suited to the problem type and data characteristics.
4. **Training** — feed the prepared data to the algorithm so it learns patterns by adjusting its internal parameters.
5. **Evaluation** — test the model on data it has never seen to measure how well it generalizes.
6. **Deployment** — integrate the trained model into an application where it can make predictions on live data.

This pipeline is iterative. Poor evaluation results often send developers back to collect more data, engineer better features, or try a different algorithm.

## Three Learning Paradigms

**Supervised learning** uses labeled datasets — each training example includes both the input and the correct output. The model learns to map inputs to correct outputs. Common tasks include classification (assigning categories, like spam vs. not spam) and regression (predicting continuous values, like house prices). This is the most widely used paradigm in practice.

**Unsupervised learning** works without labeled outputs. The algorithm finds hidden structures, groupings, or patterns in the data on its own. Customer segmentation, anomaly detection, and dimensionality reduction are typical use cases. The model discovers what is interesting about the data rather than what you told it to look for.

**Reinforcement learning** involves an agent that learns by interacting with an environment. It takes actions, receives rewards or penalties, and gradually learns a strategy (policy) that maximizes cumulative reward. Game-playing AI, robotics, and resource optimization are common applications. This paradigm differs from the others because learning happens through experience rather than from a static dataset.

## Overfitting and Underfitting

A central challenge in ML is generalization — how well a model performs on new data it has not seen before.

**Overfitting** occurs when a model learns the training data too closely, including its noise and quirks. It performs well on training data but poorly on new data. A model that has memorized the training set rather than learning underlying patterns is overfit.

**Underfitting** is the opposite: the model is too simple to capture the real patterns in the data, resulting in poor performance on both training and new data.

The balance between these two extremes is managed through techniques like cross-validation (testing the model on different subsets of data), regularization (penalizing unnecessary complexity), and collecting more diverse training data.

## Real-World Applications

ML is used across many sectors: content recommendations on streaming platforms, fraud detection in financial transactions, medical diagnosis from radiological images, autonomous vehicles, supply chain optimization, and virtual assistants. The combination of large-scale available data and modern computational power makes ML increasingly practical across domains that were previously difficult to automate.

## Frequently Asked Questions

### What is the difference between AI, Machine Learning, and Deep Learning?
Think of them as nested subsets: **AI** is the broad field of making machines intelligent. **Machine Learning** is a subset of AI where systems learn from data rather than following explicit rules. **Deep Learning** is a subset of ML using multi-layer neural networks to learn complex patterns. All deep learning is ML; all ML is AI; but not all AI is ML (e.g., rule-based expert systems).

### How much data do I need for machine learning?
It depends on the problem complexity and algorithm. Simple problems (linear regression) can work with hundreds of examples. Deep learning typically needs thousands to millions of labeled examples. More data generally improves performance, but quality and representativeness matter more than raw quantity. Techniques like transfer learning (using pre-trained models) can reduce data requirements significantly.

### What is overfitting and how do I prevent it?
Overfitting happens when a model memorizes training data (including noise) instead of learning generalizable patterns. It performs well on training data but poorly on new data. Prevention: more diverse training data, regularization (L1/L2, dropout), cross-validation, simpler models, early stopping, and data augmentation.

### Do I need a GPU for machine learning?
For training deep learning models (neural networks), GPUs accelerate computation dramatically (10-100x faster). For traditional ML (decision trees, linear models) or inference (using trained models), CPUs are often sufficient. Cloud services (AWS, GCP, Azure) provide GPU instances on-demand if you don't have local hardware.

### What is transfer learning?
Transfer learning uses a model pre-trained on a large dataset (e.g., ImageNet for images, BERT for text) and fine-tunes it on your smaller, specific dataset. This leverages learned features from the big dataset, dramatically reducing training time and data requirements. It's the standard approach for most practical deep learning today.
