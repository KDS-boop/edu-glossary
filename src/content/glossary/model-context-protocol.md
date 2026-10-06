---
term: "Model Context Protocol (MCP)"
shortDefinition: "An open protocol that standardizes how AI applications connect to external tools, resources and contextual data."
metaDescription: "Model Context Protocol (MCP), clients, servers, tools, resources, authorization and the latest 2026 specification explained."
category: "AI & Data"
letter: "M"
updatedDate: 2026-10-06
image: "./images/model-context-protocol.svg"
imageAlt: "Model Context Protocol concept illustration showing standardized connections between AI models and tools."
relatedTerms: ["API", "Prompt Engineering", "Natural Language Processing"]
---

# Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open protocol for connecting AI applications to external tools and contextual data.

MCP standardizes interaction patterns between an AI host or client and servers that expose **tools**, **resources** and **prompts**.

## Core concepts

**Tools** are executable capabilities and may change external state.

**Resources** provide contextual information such as documents, records or schemas.

**Prompts** provide reusable prompt structures.

An MCP server can sit above REST APIs, databases or internal services. MCP does not replace those systems.

## Practical example

An internal HR assistant can connect to an MCP server exposing a read-only leave-policy resource and a leave-balance tool.

The AI application can retrieve the policy and request the user's balance without receiving unrestricted database credentials. The server can enforce authorization and expose only approved operations.

## Security

Because tools can change external state, applications need least-privilege authorization, input validation, audit logging, rate limiting, secret isolation and protection against prompt injection and data exfiltration.

A tool that can send email or modify records should not be treated like a read-only document.

## Current specification

The official **2026-07-28** specification was released on July 28, 2026. It introduced a stateless protocol core, multi-round-trip requests, header-based routing, cacheable list results, authorization hardening and a formal extensions framework.

## Limits

MCP standardizes communication patterns, not business logic or the complete security model. Safe behavior remains the responsibility of the server and surrounding application.

## Sources

MCP Specification 2026-07-28: https://modelcontextprotocol.io/specification/2026-07-28
MCP 2026-07-28 release: https://blog.modelcontextprotocol.io/posts/2026-07-28/
MCP roadmap, August 2026: https://blog.modelcontextprotocol.io/posts/mcp-roadmap/
