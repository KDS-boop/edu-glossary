---
term: "API Gateway"
shortDefinition: "Central API traffic management that acts as a single entry point for all client requests to backend microservices."
category: "Software Development"
letter: "A"
updatedDate: 2026-09-19
relatedTerms: ["API", "Cloud Service Provider", "Firewall"]
---

An API Gateway is an infrastructure layer that acts as a single entry point for all client requests to a collection of backend microservices. Instead of clients needing to know the address and protocol of each microservice directly, all requests are forwarded, converted, and routed through the gateway.

## Core Functions

**Request routing** — the gateway directs requests to the appropriate microservice based on URL path, header, or method. **Authentication & authorization** — the gateway validates JWT tokens, API keys, or OAuth credentials before requests reach the service. **Rate limiting** — the gateway restricts the number of requests per unit time from a single client to prevent abuse. **Protocol translation** — the gateway can accept HTTP requests from clients and convert them to gRPC or WebSocket for internal communication.

## Popular Examples

Kong, AWS API Gateway, Apigee, and Traefik are widely used production API Gateways. Each has different trade-offs — some focus more on performance (written in Go/Rust), while others offer more comprehensive observability and analytics features.

## Architectural Considerations

An API Gateway is a potential single point of failure and bottleneck — the architecture must plan for high availability and auto-scaling at this layer. Placing too much logic in the gateway (over-engineering) can also turn it into a hidden monolith; ideally the gateway only handles cross-cutting concerns.
