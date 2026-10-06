---
term: "Small Language Model (SLM)"
shortDefinition: "A language model designed to use less compute, memory or storage than much larger general-purpose language models."
metaDescription: "Small Language Models, domain specialization, local inference, evaluation, cost, latency and trade-offs explained."
category: "AI & Data"
letter: "S"
updatedDate: 2026-10-06
image: "./images/small-language-model.svg"
imageAlt: "Small language model concept illustration showing an efficient specialized AI model."
relatedTerms: ["Natural Language Processing", "Machine Learning", "Training Data", "Prompt Engineering"]
---

# Small Language Model (SLM)

A Small Language Model (SLM) is a language model designed to operate with lower compute, memory or storage requirements than much larger general-purpose language models.

There is no universal parameter threshold. "Small" is relative to the model family and workload.

## Why use an SLM?

SLMs can provide lower inference cost, lower latency, smaller memory requirements, easier edge deployment and reduced network dependence. The trade-off can be weaker broad reasoning, knowledge coverage or performance on complex tasks.

## Domain-specific SLMs

A compact model can be adapted for a particular industry, language, vocabulary or workflow through continued pre-training, instruction tuning, distillation, retrieval or combinations of these approaches.

For example, an Indonesian enterprise could use a compact model to extract supplier, contract number, dates and payment terms from procurement documents. Retrieval can provide current policies without retraining the model whenever policy changes.

## Practical evaluation

A smaller model should be tested on representative production tasks for quality, factuality, latency, memory, energy, cost per successful task, robustness and privacy.

The useful metric is not model size; it is **cost and performance per successful task**.

## Local deployment

SLMs can run on laptops, gateways, private servers and other constrained environments. Local inference may reduce network transmission, but it does not automatically guarantee privacy: logs, telemetry, access control and application architecture still matter.

## Limits

SLMs can have less general knowledge or reasoning capability than larger models. Specialization can also cause overfitting or leakage of sensitive training material.

## Sources

NIST AI Resource Center: https://airc.nist.gov/
NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
