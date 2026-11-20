---
title: "Adversarial Machine Learning: AI Agent Risks"
description: "Understand adversarial machine learning, agent-specific attack paths, and practical safeguards for models, tools, identities, memory, and data."
category: "Cybersecurity"
tags: ["Adversarial Machine Learning", "AI Agent Security", "Prompt Injection", "AI Red Teaming", "Model Security", "Cybersecurity"]
relatedGlossary: ["Machine Learning", "Large Language Model (LLM)", "Prompt Engineering", "Preemptive Cybersecurity", "Digital Provenance", "Model Context Protocol (MCP)"]
author: "eduglossary-team"
publishedDate: 2026-11-20
updatedDate: 2026-11-20
draft: false
coverImage: "/images/articles/adversarial-machine-learning-ai-agent-security.svg"
coverImageAlt: "Adversarial machine-learning threat map showing poisoned data, prompt injection, and agent tools protected by layered security controls."
---

An AI system can be attacked without exploiting a conventional software bug. An attacker may manipulate the data used for training, craft inputs that change a model's output, extract information through repeated queries, or exploit the tools and permissions attached to an AI agent. These techniques belong to the broader field of **adversarial machine learning (AML)**: the study of how an adversary can influence, misuse, or compromise machine-learning systems and how those risks can be reduced.

The security problem becomes more complicated when a model is connected to tools. A standalone model may return an incorrect answer; an agent may turn an incorrect or manipulated answer into a file change, an API request, a financial transaction, or a message sent to another person. The practical objective is therefore not merely to make a model refuse suspicious prompts. It is to build a system in which untrusted input cannot grant authority, bypass access controls, or create unacceptable consequences. For a related operational view, see our guide to [AI agent security and incident response](/articles/ai-agent-security-incident-response/) the glossary entry on [prompt engineering](/glossary/prompt-engineering/), and our [cybersecurity learning hub](/learn/cybersecurity/).

A timely reference is the National Institute of Standards and Technology's (NIST) initial public draft **SP 2400-102e2026, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations**, published on 9 November 2026. The draft gives special attention to attacks on agentic super-intelligence systems and their mitigations. Its public-comment period closes on **18 December 2026**. It is a draft, not a finalized standard or a blanket compliance requirement. Its taxonomy is nevertheless useful for understanding how model-level attacks and agent-level capabilities combine. [Read the NIST draft and comment details](https://csrc.nist.gov/pubs/sp/2400-102/e2026/ipd).

## What adversarial machine learning covers

Traditional application security often starts with weaknesses in code, configuration, dependencies, identities, and infrastructure. AML adds another dimension: the behavior of a model can be influenced by inputs, training data, feedback, or interactions that are specifically chosen by an adversary.

The attack may happen at different points in a model's lifecycle:

- **Before training:** an attacker may poison or manipulate training data, labels, or data sources.
- **During development and fine-tuning:** malicious examples, compromised model artifacts, or unsafe training pipelines may alter learned behavior.
- **At inference time:** crafted prompts or inputs may cause misclassification, unwanted disclosure, or unsafe output.
- **Inside an agent workflow:** retrieved content, tools, memory, identity delegation, and communication with other agents may be abused.
- **After deployment:** attackers may probe the model, steal information, exploit exposed interfaces, or manipulate operational feedback.

These categories are related, but they are not interchangeable. A poisoned training set is different from a prompt injection in a document. A prompt injection is different from an API that accidentally grants broad write access. An investigation should identify the actual entry point and affected control rather than label every AI failure as an AML attack.

## Why agentic systems have a wider attack surface

An AI agent typically combines a model with orchestration software, tools, and access to an environment. It may search websites, read files, call external APIs, execute code, or use persistent memory. Some systems also coordinate multiple agents.

NIST's 2026 draft describes this expanded exposure: an agent can be manipulated into invoking tools, running code, disclosing information, or making unauthorized changes. Persistent memory can allow malicious content to influence later sessions, while communication between agents can spread an attack across workflow boundaries. These are reasons to evaluate the complete application rather than the model in isolation.

Consider a support agent that can read customer tickets and update account records. A malicious ticket contains an instruction to export other customers' data. The model may treat the ticket as an instruction, but the ticket is only untrusted data. A secure architecture should prevent the requested export through independent authorization checks, restricted data access, and a tool interface that exposes only the operations needed for the support task.

The central design rule is simple: **content can request an action, but it must never authorize the action**.

## Common attack patterns

### Prompt injection and goal hijacking

Prompt injection attempts to influence a model by placing instructions in user input or in content the model retrieves. Direct injection arrives in a user prompt. Indirect injection may be embedded in a webpage, email, document, code comment, image, or retrieved passage.

The attacker may try to replace the task, change the agent's priorities, or persuade it to reveal information or invoke a tool. A related failure is goal hijacking: the agent's intended objective is redirected toward an attacker-chosen outcome.

Input filtering can help identify suspicious content, but it should not be treated as a complete boundary. An agent must still treat retrieved material as data, keep trusted instructions separate, and validate every action outside the model.

### Data poisoning

Data poisoning occurs when an attacker influences data used to train, fine-tune, evaluate, or update a model. The impact depends on the data pipeline and the attacker's access. Poisoned examples may degrade performance, create targeted misbehavior, or introduce a hidden behavior that appears only under a particular trigger.

Defenses include controlling who can contribute data, validating source and label quality, preserving dataset provenance, reviewing unusual changes, separating training and evaluation data, and testing for suspicious behavior before release. A model's reported accuracy on a clean benchmark does not prove that its training pipeline is trustworthy.

### Evasion and adversarial inputs

An evasion attack crafts an input to make a model produce a wrong result while the input may appear ordinary to a human. Examples can include subtly modified images, text, audio, or structured records. The relevant techniques differ by modality and task.

For a production system, evaluate inputs that sit near decision boundaries, unusual formatting, missing fields, corrupted metadata, and changes in the environment. A system should define what happens when the model is uncertain, encounters an unsupported input, or cannot establish that an observation is reliable.

### Model extraction and privacy attacks

Repeated queries may reveal information about a model's behavior, approximate its decision boundary, or expose sensitive details that were memorized or included in its context. The risk depends on the model, interface, rate limits, training data, and information exposed by the application.

Limit unnecessary access to inference endpoints, monitor unusual query patterns, avoid placing secrets in prompts or training data, and apply privacy controls to logs and evaluation datasets. Rate limiting can reduce abuse, but it does not replace access control or privacy engineering.

### Tool poisoning and supply-chain compromise

An agent may rely on external tools, connectors, plugins, packages, prompts, model files, or server definitions. If one of these dependencies is malicious or compromised, an agent can be directed toward unsafe behavior even when the base model is unchanged.

Treat tools and integrations as software supply-chain dependencies. Verify their origin, pin versions where practical, review permission scopes, restrict network destinations, and monitor changes in tool behavior. For protocol-based integrations, authenticate the server and validate the capabilities exposed to the agent. Do not automatically trust a tool because it appears in a directory or was previously approved.

### Memory and inter-agent manipulation

Persistent memory creates continuity, but it also creates another place where untrusted information may be stored and reused. An attacker may try to insert false preferences, instructions, credentials, or facts that affect later tasks. In a multi-agent system, one agent's output can become another agent's input, creating opportunities for propagation.

Label the source and trust level of memory items, avoid storing secrets or arbitrary instructions, make important memory changes reviewable, and revalidate high-impact facts when they are used. Inter-agent messages should carry identity and authorization context; a message from another agent is not automatically a trusted command.

### Accidental or unintended agent behavior

Not every dangerous action is an adversarial attack. A model can misunderstand a task, a workflow can contain a logic error, or an agent can behave unexpectedly because of a test or configuration mistake. These events still matter to security operations, but incident analysis should distinguish malicious influence from ordinary failure. The distinction helps teams select the right corrective action.

## A defense-in-depth model for AI systems

No individual control prevents every AML technique. A stronger design combines controls at the data, model, tool, identity, runtime, and operational layers.

### 1. Map assets, trust boundaries, and consequences

List the models, datasets, prompts, tools, identities, memory stores, APIs, and external services in the system. Identify which components contain sensitive information and which can change external state. Map the path from user request to model output to tool action.

Then classify the consequences of failure. An incorrect public summary is not equivalent to an unauthorized payment or a production database update. The controls should reflect the impact, reversibility, and exposure of each action.

### 2. Protect data and model provenance

Record where training and evaluation data came from, who can modify it, and which transformations were applied. Keep data changes reviewable and maintain reproducible training and deployment records where feasible. Verify model and tool artifacts before use, and retain version information so a change in behavior can be traced to a release or dependency.

### 3. Enforce identity and authorization outside the model

Use least-privilege credentials for each agent and tool. Prefer read-only access for read-only tasks, separate identities across environments, and short-lived credentials for temporary access. Enforce authorization in the API or service that performs the operation. A natural-language instruction, model-generated explanation, or tool description must not grant permission.

### 4. Restrict tools and runtime capabilities

Expose narrow functions rather than unrestricted shells, broad database access, or general-purpose write APIs. Apply file-system boundaries, network egress rules, resource limits, and execution isolation. Remove tools that are not required. For consequential actions, use a separate approval step that identifies the target and exact operation.

### 5. Treat model output as untrusted until validated

Validate structured outputs against strict schemas. Check identifiers, file paths, URLs, query parameters, and command arguments before passing them to another system. Use allowlists where possible, and fail closed when a high-risk input cannot be validated. Output validation should be performed by application code, not only by a second model prompt.

### 6. Test attacks and failure paths

Build a test set that covers direct and indirect prompt injection, poisoned or misleading retrieved content, unusual input formats, tool misuse, unauthorized privilege changes, memory contamination, and service failures. Include tests in which the model behaves incorrectly on purpose. The key question is whether the surrounding system still blocks unauthorized activity.

Use red-team exercises for realistic attack paths, but also run repeatable regression tests after model, prompt, tool, and dependency changes. Record both successful attacks and controls that prevented them.

### 7. Monitor actions and prepare to contain incidents

Log important tool invocations, authorization outcomes, data access, identity changes, model and tool versions, and approval decisions. Protect the logs and avoid collecting unnecessary sensitive content. Alert on repeated denied operations, unexpected destinations, large data transfers, permission expansion, and unusual behavior.

Prepare an independent stop mechanism. Operators should be able to pause an agent, revoke its credentials, block a tool, isolate its runtime, and preserve evidence without depending on the agent's cooperation.

## Example: testing an agent that reads documents

Suppose an internal agent answers questions using a folder of policy documents. A test document contains a hidden instruction asking the agent to ignore the question, find a payroll file, and send it to an external address.

A useful security test checks several independent controls:

1. The retrieval layer returns only documents the user is authorized to access.
2. The agent treats the embedded instruction as document content, not as a system policy.
3. The agent has no email-sending capability unless the task explicitly requires it.
4. The downstream service checks the user's identity and permissions before returning sensitive information.
5. An attempted access outside the task scope is recorded and can trigger an alert.

The test passes only when unauthorized access is blocked, even if the model follows the malicious instruction. A refusal message is helpful, but an external access control is the stronger guarantee.

## A practical review checklist

Before release, verify that the team can identify its models, data, tools, identities, and memory stores; trace important artifacts to trusted sources; enforce permissions outside the model; validate tool inputs and outputs; test indirect prompt injection and tool poisoning; and revoke credentials or stop the agent independently. Keep the deployment scope limited when effective permissions or external actions cannot be explained and audited.

## What to monitor next

NIST SP 2400-102e2026 remains an initial public draft through its 18 December 2026 comment deadline. Review it as a taxonomy for threat modelling, not as certification for an ordinary chatbot or agent. MITRE ATLAS also tracks adversary techniques against AI-enabled systems and can support red-team planning. [Explore MITRE ATLAS](https://atlas.mitre.org/).

## Frequently asked questions

### Is every prompt injection an adversarial machine-learning attack?

Prompt injection is a model-manipulation technique often discussed within AI security and AML. Whether a particular event fits a taxonomy depends on the system and attack path. It should not be confused with a conventional software vulnerability or an authorization failure, although several weaknesses can combine in one incident.

### Is the November 2026 NIST draft a mandatory standard?

No. SP 2400-102e2026 is an initial public draft open for comment. It is a reference for taxonomy and terminology, not a blanket legal requirement or proof of compliance.

## Conclusion

Adversarial machine learning is broader than a malicious prompt. Attacks can affect training data, inference, model privacy, tools, credentials, memory, and the supply chain. Agentic systems amplify the consequences because model decisions can trigger actions in external environments.

Defend the complete system: protect data provenance, limit tools, enforce authorization outside the model, validate inputs and outputs, test realistic attacks, and preserve an independent path to stop operations. These controls make a deployment more resilient even when the model itself makes a mistake.

## Official sources and further reading

- [NIST SP 2400-102e2026: Adversarial Machine Learning — A Taxonomy and Terminology of Attacks and Mitigations](https://csrc.nist.gov/pubs/sp/2400-102/e2026/ipd), published 9 November 2026; public comments close 18 December 2026.
- [NIST: Adversarial Machine Learning Taxonomy and Terminology — Draft announcement](https://csrc.nist.gov/news/2026/adversarial-machine-learning-taxonomy-2026-draft).
- [MITRE ATLAS](https://atlas.mitre.org/), a knowledge base of adversary tactics and techniques against AI-enabled systems.
- [NIST AI 100-2 E2025: Adversarial Machine Learning — A Taxonomy and Terminology of Attacks and Mitigations](https://csrc.nist.gov/pubs/ai/100/2/e2025/final), the earlier NIST taxonomy series.
