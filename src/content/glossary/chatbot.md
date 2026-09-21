---
term: "Chatbot"
shortDefinition: "A computer program that uses natural language processing to carry on conversations with users via text or voice."
category: "AI & Data"
letter: "C"
updatedDate: 2026-09-19
relatedTerms: ["Machine Learning", "Training Data", "Predictive Analytics"]
---

A chatbot is software that simulates human conversation with users, either through text in a chat interface or via voice. Early-generation chatbots were rule-based with simple decision trees — they could only handle predefined paths and failed when users phrased things unexpectedly. Modern chatbots leverage large language models (LLMs) trained on billions of text tokens, enabling them to generate contextual and coherent responses to a much wider range of inputs. The shift from rule-based to LLM-based chatbots represents one of the most significant transitions in conversational AI.

## Modern Architecture

LLM-based chatbots like GPT work by predicting the next token (next-token prediction) from a user's input sequence. The transformer model at the core captures long-range context through the self-attention mechanism. To reduce hallucinations, many systems combine LLMs with **Retrieval-Augmented Generation (RAG)** — the model retrieves information from an external knowledge base before generating an answer, grounding responses in verified sources rather than relying solely on the model's trained knowledge.

## Applications and Challenges

Organizations use chatbots for 24/7 customer service, internal employee assistance, lead generation, and education. Key challenges include hallucinations (producing information that sounds convincing but is inaccurate), training data bias, prompt injection security, and maintaining brand voice consistency. Evaluating chatbot quality is itself a challenge — automated metrics like BLEU scores measure surface-level similarity to reference text but miss deeper qualities like factual accuracy and helpfulness, which often require human evaluation.
