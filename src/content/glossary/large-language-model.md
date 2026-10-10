---
term: "Large Language Model (LLM)"
shortDefinition: "A neural network with billions to trillions of parameters, trained on massive text corpora using the Transformer architecture, that understands and generates human language through next-token prediction."
metaDescription: "Large Language Models (LLMs) explained: Transformer architecture, training vs inference, tokens, parameters, context windows, capabilities, limitations, hallucination, RAG, fine-tuning, and deployment."
category: "AI & Data"
letter: "L"
updatedDate: 2026-10-06
image: "./images/large-language-model.svg"
imageAlt: "Large Language Model concept illustration showing a layered Transformer architecture with attention, feed-forward, and normalization blocks repeated N times."
relatedTerms: ["Small Language Model (SLM)", "Machine Learning", "Natural Language Processing", "Deep Learning", "Training Data", "Prompt Engineering", "Model Context Protocol (MCP)", "AI-Native Development", "Chatbot"]
---

A **Large Language Model (LLM)** is a neural network with billions to trillions of learned parameters, trained on massive text corpora using the **Transformer architecture**, that understands and generates human language through **next-token prediction**. LLMs are the foundational technology behind ChatGPT, Claude, Gemini, Llama, and most modern AI assistants.

"Large" refers to both the model size (parameters) and the training data scale (terabytes of text). There is no universal parameter threshold — a 7B model is large compared to traditional NLP models but small compared to frontier proprietary models whose exact parameter counts are often undisclosed.

---

## How an LLM Works

### The Transformer Architecture

LLMs are built on the **Transformer** architecture introduced in *"Attention Is All You Need"* (Vaswani et al., NeurIPS 2017). The key innovations that made modern LLMs possible:

1. **Self-Attention** — Every token attends to every other token in the sequence, capturing long-range dependencies regardless of distance.
2. **Parallel Processing** — Unlike recurrent networks, all tokens are processed simultaneously during training, enabling massive scale.
3. **Layered Depth** — Dozens to hundreds of identical layers, each refining token representations.
4. **Residual Connections** — Allow gradients to flow through very deep networks.

```
Input Tokens
    ↓
Token Embeddings + Positional Embeddings
    ↓
Transformer Layer 1 (Multi-Head Attention + Feed-Forward + Norm)
    ↓
Transformer Layer 2
    ↓
...
    ↓
Transformer Layer N
    ↓
Output Logits → Probabilities over Vocabulary
    ↓
Next Token
```

### Inside a Transformer Layer

Each layer contains four main sub-blocks:

| Sub-block | Function |
|-----------|----------|
| **Multi-Head Attention** | Computes attention weights between all token pairs; multiple heads learn different relationship types (syntax, semantics, coreference) |
| **Feed-Forward Network (FFN)** | Position-wise MLPs that process each token independently; typically expands to 4× hidden size then projects back |
| **Layer Normalization** | Stabilizes activations across the layer; applied before or after each sub-block (Pre-Norm vs Post-Norm) |
| **Residual Connections** | Add input to sub-block output; critical for training deep networks |

---

## Training vs Inference: Two Different Phases

| Aspect | **Training** | **Inference** |
|--------|--------------|---------------|
| **Goal** | Learn statistical patterns from data | Generate output for a user prompt |
| **Data** | Trillions of tokens (web, books, code, papers) | User prompt + conversation context |
| **Compute** | Weeks/months on GPU/TPU clusters | Milliseconds–seconds per request |
| **Process** | Forward + backward pass, gradient updates | Forward pass only (frozen weights) |
| **Parameters** | Updated via backpropagation | Fixed (read-only) |
| **Cost** | Millions of dollars | Cents per million tokens |
| **Determinism** | Stochastic (data sampling, dropout) | Deterministic if temperature=0 |

### Training Pipeline (Simplified)

1. **Data Collection & Curation** — Web crawls (Common Crawl), books, code repositories, academic papers; filtered for quality, deduplicated, PII-removed.
2. **Tokenization** — Text mapped to integer token IDs via a tokenizer (BPE, WordPiece, SentencePiece); vocabulary typically 50K–250K tokens.
3. **Pre-training** — Self-supervised next-token prediction on the full corpus. The model learns grammar, facts, reasoning patterns, and world knowledge implicitly.
4. **Post-Training** — **Instruction tuning** (supervised fine-tuning on prompt–response pairs) and **RLHF/RLAIF** (Reinforcement Learning from Human/AI Feedback) to align with human preferences for helpfulness, harmlessness, and honesty.

### Inference Pipeline

1. **Prompt → Tokenization** → Token IDs
2. **Forward Pass** through frozen model layers
3. **Logits → Probabilities** over vocabulary (softmax)
4. **Sampling** (temperature, top-p, top-k) → Next token
5. **Append** token to sequence → Repeat until stop condition (EOS token, max length, stop string)

---

## Tokens: The Atomic Unit

**Tokens** are the basic units LLMs process — not words, not characters, but subword pieces.

- Common words → 1 token (`"the"` → 1 token)
- Longer words → Multiple tokens (`"indescribable"` → `in`, `describ`, `able`)
- Punctuation, whitespace → Often separate tokens
- Numbers → Frequently split by digit (`"2026"` → `20`, `26`)

**Tokenization** is model-specific. Each LLM has its own tokenizer and vocabulary.

```
"Hello, world!" 
→ Tokens: [15496, 11, 1917, 0]  (4 tokens)
→ Characters: 13
```

**Rule of thumb:** 1 token ≈ 0.75 English words ≈ 4 characters.

---

## What Are Parameters?

**Parameters** (weights) are the learned numerical values that determine the model's behavior — the "knowledge" encoded during training.

| Model | Parameters | Notes |
|-------|------------|-------|
| GPT-3 (2020) | 175 billion | Landmark dense model |
| Llama 3 70B | 70 billion | Open-weight, strong benchmark performance |
| Llama 3.1 405B | 405 billion | Largest open-weight model as of 2026 |
| Proprietary frontiers | Undisclosed | Estimated 1T+ for GPT-4 class |
| Small models | 1B–7B | Consumer-hardware deployable |

Parameters are organized in:
- **Embedding matrix**: vocabulary × hidden_size
- **Attention projections**: query, key, value, output per head per layer
- **FFN weights**: hidden_size × 4×hidden_size per layer (twice)
- **Output projection**: hidden_size × vocabulary (often tied to input embeddings)

More parameters generally enable more complex pattern learning, but with diminishing returns, higher compute cost, and greater deployment difficulty.

---

## Context Window

The **context window** is the maximum number of tokens the model can process at once (input + output). It determines how much information the model can "see" when generating a response.

| Model Class | Typical Context Window (2026) |
|-------------|-------------------------------|
| Early LLMs (2020–2022) | 2K–4K tokens |
| Mid-generation | 8K–32K tokens |
| Long-context models | 128K–2M+ tokens |

**Why it matters:**
- Longer context enables: full-repo code review, book-length analysis, multi-document synthesis
- Cost: Standard attention is O(n²) in sequence length; optimizations include Flash Attention, sliding window, grouped-query attention, Mamba/SSM hybrids
- When exceeded: older tokens are truncated (the model "forgets" earlier context)

---

## Capabilities

| Capability | Description |
|------------|-------------|
| **Text Generation** | Articles, stories, emails, marketing copy, creative writing |
| **Code Generation** | Functions, tests, refactoring, debugging, explanation, translation |
| **Summarization** | Papers, meetings, long documents, legal contracts |
| **Translation** | 100+ natural languages; code translation between languages |
| **Question Answering** | General knowledge, document-grounded QA (with RAG) |
| **Reasoning** | Math, logic, planning (improves with scale and CoT prompting) |
| **Analysis** | Sentiment, classification, extraction, structured output |
| **Tool Use** | Function calling, API interaction, code execution (with fine-tuning) |

---

## What LLMs Do Not Do (Common Misconceptions)

| Misconception | Reality |
|---------------|---------|
| "Knows facts" | Predicts plausible text; **hallucinates confidently** |
| "Understands" | Statistical pattern matching; **no mental model or intent** |
| "Remembers" | **No persistent memory** between sessions (unless RAG/memory system added) |
| "Reasons like humans" | Mimics reasoning patterns; **fails on novel logic** |
| "Is deterministic" | **Stochastic sampling**; temperature > 0 = varied outputs |
| "Cites sources" | **Cannot reliably cite**; generates plausible-looking citations |
| "Does math" | Next-token prediction, **not calculation** (use code tool) |
| "Has opinions" | Reflects training data biases; **no beliefs or agency** |

---

## LLM vs Generative AI vs Traditional ML

| Aspect | **Traditional ML** | **LLM** | **Generative AI** |
|--------|-------------------|---------|-------------------|
| **Task** | Specific (classification, regression) | General (any text task) | Any content generation |
| **Training Data** | Labeled, task-specific | Massive unlabeled corpus | Varies by modality |
| **Architecture** | Task-specific (XGBoost, CNN, etc.) | Universal (Transformer) | Transformer, Diffusion, etc. |
| **Adaptation** | Retrain for new task | Prompt / few-shot / fine-tune | Prompt / fine-tune |
| **Data Efficiency** | Needs labeled examples | Zero/few-shot capable | Varies |
| **Deployment** | Lightweight, fast (CPU) | Heavy, GPU-required | Heavy (GPU) |
| **Modality** | Structured/tabular | Primarily text | Text, image, audio, video, 3D |

**All LLMs are generative AI. Not all generative AI are LLMs.** (Image models like Midjourney, DALL-E, Stable Diffusion are generative AI but not LLMs.)

**Traditional ML wins for:** structured data, low-latency requirements, high-accuracy specific tasks, interpretability, cost-sensitive deployment.

**LLMs win for:** open-ended language tasks, rapid prototyping, generalization to unseen tasks, unstructured data, few-shot adaptation.

---

## Key Techniques for Production Use

### Retrieval-Augmented Generation (RAG)
Grounding LLMs with external knowledge by retrieving relevant documents and including them in the prompt. Solves knowledge cutoff, hallucination, and domain-specificity problems.

```
User Query → Embedding → Vector Search → Top-K Documents → Augmented Prompt → LLM → Grounded Answer
```

### Fine-Tuning
Continuing training on a specific dataset (instructions, domain data, preferences) to specialize a pre-trained model. Much cheaper than pre-training. Methods include:
- **Full fine-tuning** — Update all parameters (expensive, catastrophic forgetting risk)
- **LoRA / QLoRA** — Low-rank adapters; update <1% of parameters; efficient, composable
- **Instruction tuning** — Format compliance, style, domain adaptation

### Distillation
Training a smaller **student model** to mimic a larger **teacher model**'s outputs. Preserves capability at lower inference cost. Used to create SLMs from LLMs.

### Quantization
Reducing parameter precision (FP16/BF16 → INT8/INT4/GPTQ/AWQ). Dramatically reduces memory and latency with minimal quality loss. Standard for local deployment.

---

## Limitations and Risks

### Hallucinations
LLMs generate plausible but false information — they predict likely next tokens, not verified facts.
**Mitigation:** RAG, citations, verification layers, human-in-the-loop, confidence scoring.

### Bias
Training data reflects societal biases (gender, race, cultural, political). Models can amplify these.
**Mitigation:** RLHF, constitutional AI, bias benchmarks (BBQ, StereoSet), diverse training data, output filters.

### Context Limits
Fixed context window; long conversations or documents get truncated.
**Mitigation:** RAG, summarization, sliding window, longer-context models, hierarchical memory.

### No Ground Truth Access
Models have no access to reality — only training data patterns.
**Mitigation:** Tool use (search, code execution, APIs), RAG, human verification.

### Non-Determinism
Same prompt → different outputs (unless temperature=0 and seed fixed).
**Mitigation:** Temperature=0 for deterministic tasks; multiple samples + voting for reliability.

### Cost & Latency
Large models need GPUs; inference is slower than traditional APIs.
**Mitigation:** Distillation, quantization, smaller models (SLMs), caching, speculative decoding.

### Security
**Prompt injection** — Malicious input hijacks model behavior.
**Data extraction** — Training data or context memorization leakage.
**Jailbreaking** — Bypassing safety controls.
**Mitigation:** Guardrails, sandboxed tool use, input/output filtering, least-privilege tool access, monitoring.

---

## Deployment Considerations

| Factor | Options / Guidance |
|--------|-------------------|
| **Model Choice** | Open-weight (Llama, Mistral, Qwen) vs Closed (GPT, Claude, Gemini); capability vs cost vs privacy |
| **Hardware** | H100/A100 for training/large inference; consumer GPUs (24GB+) for 7B–13B quantized; CPUs for tiny models |
| **Serving Framework** | vLLM, TGI, Ollama, llama.cpp, TensorRT-LLM — optimized kernels, continuous batching, PagedAttention |
| **Scaling** | Tensor parallelism, pipeline parallelism, data parallelism; KV cache optimization |
| **Observability** | Latency (TTFT, TPOT), throughput, error rates, token usage, cost per request, quality evals |
| **Data Privacy** | Self-hosted for sensitive data; zero-retention APIs; on-prem/air-gapped for regulated workloads |

---

## Common Misconceptions

- **"Bigger is always better."** — Diminishing returns; 7B–70B models often suffice for specific tasks with RAG/fine-tuning.
- **"LLMs replace traditional ML."** — Complementary; traditional ML remains superior for structured data, low latency, high accuracy on narrow tasks.
- **"Fine-tuning teaches new facts."** — Fine-tuning adapts behavior/style; for new knowledge, use RAG. Fine-tuning on facts is unreliable.
- **"Context window = working memory."** — Context is passive; no active maintenance, no prioritization, no forgetting mechanism beyond truncation.
- **"Temperature=0 = deterministic."** — Mostly true, but floating-point non-determinism across hardware/runs can still cause variance.

---

## Frequently Asked Questions

### What does LLM stand for?
**Large Language Model** — a neural network with billions of parameters trained on massive text corpora to understand and generate human language through next-token prediction.

### How is an LLM different from a chatbot?
An **LLM is the underlying model**. A **chatbot is an application** that uses an LLM plus conversation management, safety filters, system prompts, and tool integrations. ChatGPT is a chatbot; GPT-4o is the LLM.

### Do LLMs understand language?
They model statistical patterns in language remarkably well, enabling coherent, contextually appropriate text generation. Whether this constitutes "understanding" is a philosophical debate. Practically: they behave as if they understand, but fail on tasks requiring grounded world models or consistent logic.

### Can LLMs replace programmers?
They accelerate coding (boilerplate, tests, refactoring, explanation, translation) but struggle with system design, novel architecture, debugging complex production issues, understanding business context, and long-horizon reasoning. They are powerful **tools**, not replacements.

### What is fine-tuning?
Taking a pre-trained LLM and continuing training on a specific dataset (instructions, domain data, preferences) to specialize it. Methods include full fine-tuning, LoRA/QLoRA (parameter-efficient), and instruction tuning. Much cheaper than pre-training.

### What is RAG?
**Retrieval-Augmented Generation** — giving an LLM access to external knowledge by retrieving relevant documents and including them in the prompt. Solves knowledge cutoff, hallucination, and domain-specificity problems.

### How do I choose an LLM?
Consider: capability needs (benchmarks, evals), context window, cost/latency, licensing (open vs closed), multilingual support, fine-tuning access, data privacy requirements, vendor lock-in risk, ecosystem/tooling.

### What are "weights"?
Synonym for **parameters** — the learned numerical values in the model that determine its behavior.

### What is temperature?
A sampling parameter controlling output randomness. **0 = deterministic** (greedy/argmax). **0.7–1.0 = creative/varied**. Higher = more random. Does not change model knowledge, only sampling behavior.

### What is the difference between an LLM and an SLM?
**LLM** = Large Language Model (billions to trillions of parameters, cloud/GPU deployment, broad capability). **SLM** = Small Language Model (millions to ~10B parameters, edge/device deployment, domain-specialized). SLMs trade broad reasoning for efficiency, latency, and privacy. See [Small Language Model (SLM)](/glossary/small-language-model/).

---

## Sources

- Vaswani et al., "Attention Is All You Need", NeurIPS 2017: https://arxiv.org/abs/1706.03762
- NIST AI Risk Management Framework (AI RMF 1.0): https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI Resource Center: https://airc.nist.gov/
- Google for Developers, "Introduction to Large Language Models": https://developers.google.com/machine-learning/crash-course/llm
- Google for Developers, "Transformers": https://developers.google.com/machine-learning/crash-course/llm/transformers
- IBM Think, "What is LLM inference?": https://www.ibm.com/think/topics/llm-inference
- Hugging Face, "What are Large Language Models?": https://huggingface.co/learn/llm-course/chapter1/1
- Meta AI, "Llama 3 Model Card": https://github.com/meta-llama/llama3/blob/main/MODEL_CARD.md
- Anthropic, "Constitutional AI: Harmlessness from AI Feedback": https://arxiv.org/abs/2212.08073
- OpenAI, "GPT-4 Technical Report": https://arxiv.org/abs/2303.08774
- Kaplan et al., "Scaling Laws for Neural Language Models", 2020: https://arxiv.org/abs/2001.08361
- Hoffmann et al., "Training Compute-Optimal Large Language Models" (Chinchilla), 2022: https://arxiv.org/abs/2203.15556