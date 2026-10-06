---
term: "Prompt Engineering"
shortDefinition: "The structured design and evaluation of instructions, context, examples and output requirements for AI models."
metaDescription: "Prompt engineering techniques, evaluation, output contracts, RAG, agents and prompt-injection risks explained."
category: "AI & Data"
letter: "P"
updatedDate: 2026-10-06
image: "./images/prompt-engineering.svg"
imageAlt: "Prompt engineering concept illustration showing structured instructions guiding an AI model."
relatedTerms: ["Natural Language Processing", "Machine Learning", "Deep Learning"]
---

# Prompt Engineering

Prompt engineering is the structured design and refinement of instructions given to an AI model. A useful prompt defines the objective, relevant context, constraints, examples and expected output.

It is better treated as an engineering discipline than as a search for a "magic prompt": model behavior changes with model family, version, system instructions, context and available tools.

## Core elements

A production prompt commonly specifies:

- **Objective:** what the model must accomplish.
- **Context:** information required for the task.
- **Constraints:** scope, safety, length or allowed actions.
- **Examples:** representative inputs and outputs.
- **Output contract:** expected structure or schema.
- **Evaluation:** tests used to measure quality.

## Practical example

A support system must classify tickets as billing, technical or account.

Instead of only saying "classify this ticket", define each category, require exactly one label and test representative edge cases. The prompt becomes a versioned artifact that can be evaluated whenever the model changes.

## RAG and agents

For RAG, prompting can specify how retrieved evidence should be used and what to do when evidence is missing.

For agents, prompts can define goals and tool-use rules, but **prompting is not a security boundary**. Applications still need permission controls, sandboxing, input/output validation, secret isolation and audit logs.

## Limits

Prompting cannot guarantee factual accuracy or eliminate hallucinations. Longer prompts can increase latency and context consumption, and conflicting instructions can make behavior less predictable.

## Sources

OpenAI Prompt Engineering Guide: https://developers.openai.com/api/docs/guides/prompt-engineering
NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
