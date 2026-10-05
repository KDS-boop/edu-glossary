---
title: "What Is an API Gateway? How API Gateways Work"
description: "A beginner-friendly guide to API gateways — what they are, why applications need them, core functions (auth, routing, rate limiting), and how they fit in microservices and AI architectures."
category: "Software Development"
tags: ["API Gateway", "API", "REST API", "Microservices", "Cloud", "Backend"]
relatedGlossary: ["API", "REST API", "API Gateway", "Full Stack", "Codebase", "OAuth", "JWT"]
author: "eduglossary-team"
publishedDate: 2026-10-05
draft: false
coverImage: "/images/articles/api-gateway-how-it-works.svg"
---

When you use a modern app — mobile, web, or AI-powered — your requests don't usually go directly to backend services. They pass through an **API gateway**.

An **API gateway** is a management layer that sits between clients (apps, browsers, AI agents) and backend services. It handles cross-cutting concerns — authentication, routing, rate limiting, monitoring — so individual services don't have to.

This guide explains what API gateways are, how they work, and why they are commonly used in architectures that need a centralized entry point for APIs.

---

## What Is an API Gateway?

An **API gateway** is a server (or managed service) that acts as a single entry point for all client requests to an application's backend services. It receives requests, applies policies, routes to the appropriate service, and returns responses.

```
Clients
  ↓
API Gateway
  ├─ Authentication
  ├─ Authorization
  ├─ Routing
  ├─ Rate Limiting
  ├─ Monitoring/Logging
  └─ Request/Response Transformation
  ↓
Backend Services (Microservices)
```

Think of it as a **smart receptionist** for your backend:
- Verifies identity (authentication)
- Checks permissions (authorization)
- Routes to the right department (routing)
- Prevents overload (rate limiting)
- Keeps records (logging/monitoring)
- Translates languages (protocol transformation)

---

## Why Do Applications Need an API Gateway?

### The Microservices Problem

Modern applications are often built as **microservices** — many small, independent services (User Service, Order Service, Payment Service, Notification Service).

Without a gateway, clients face problems:
- **Multiple endpoints** — Client must know every service URL
- **Repeated logic** — Each service implements auth, logging, rate limiting separately
- **Protocol mismatch** — Some services use REST, others gRPC, GraphQL
- **Security surface** — Every service exposed directly to internet
- **Observability gaps** — Hard to trace requests across services

### The Gateway Solution

An API gateway centralizes these concerns:
- **Single entry point** — Clients talk to one URL
- **Shared policies** — Auth, rate limits, logging defined once
- **Protocol translation** — REST ↔ gRPC ↔ GraphQL ↔ WebSocket
- **Security perimeter** — Only gateway exposed publicly
- **Unified observability** — All traffic visible in one place

---

## How Does an API Gateway Work?

### Request Flow

```
1. Client Request
   GET https://api.myapp.com/users/123
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

2. Gateway Receives Request
   └─ Parse headers, path, query params

3. Authentication
   └─ Validate JWT/API key
   └─ Reject if invalid (401 Unauthorized)

4. Authorization
   └─ Check scopes/roles for /users/123
   └─ Reject if insufficient (403 Forbidden)

5. Rate Limiting
   └─ Check client quota (e.g., 1000 req/min)
   └─ Reject if exceeded (429 Too Many Requests)

6. Routing
   └─ Match path /users/* → User Service
   └─ Transform request if needed

7. Forward to Backend
   └─ HTTP/gRPC call to internal service
   └─ Handle timeouts, retries, circuit breakers

8. Response Processing
   └─ Transform response (format, filter fields)
   └─ Add headers (cache, CORS, tracing)

9. Return to Client
   200 OK + JSON Response
```

### Response Flow

The gateway can also transform responses:
- Filter sensitive fields (remove internal IDs, passwords)
- Aggregate multiple service responses
- Convert formats (protobuf → JSON)
- Add caching headers
- Inject tracing headers

---

## Common API Gateway Functions

### 1. Authentication
Verifies **who** is making the request.

| Method | Description |
|--------|-------------|
| **API Keys** | Simple string identifiers; good for server-to-server |
| **JWT (JSON Web Tokens)** | Self-contained tokens with claims; stateless validation |
| **OAuth 2.0 / OIDC** | Delegated authorization; "Sign in with Google" |
| **mTLS** | Mutual TLS; certificate-based for high-security internal traffic |

The gateway validates credentials before forwarding. Invalid → `401 Unauthorized`.

### 2. Authorization
Verifies **what** the authenticated client can do.

| Model | Description |
|-------|-------------|
| **Scope-based** | Token includes `read:users`, `write:orders` |
| **Role-based (RBAC)** | User has role `admin`, `editor`, `viewer` |
| **Attribute-based (ABAC)** | Policies based on attributes (department, resource owner) |
| **Resource-level** | User can only access their own resources (`user_id == token.sub`) |

Insufficient permissions → `403 Forbidden`.

### 3. Routing
Maps incoming requests to backend services.

| Pattern | Example |
|---------|---------|
| **Path-based** | `/api/users/*` → User Service; `/api/orders/*` → Order Service |
| **Header-based** | `x-api-version: v2` → v2 Service |
| **Weighted/Canary** | 90% → v1, 10% → v2 (gradual rollout) |
| **Geographic** | EU users → EU region; US users → US region |

### 4. Rate Limiting
Protects services from overload (intentional or accidental).

| Algorithm | Description |
|-----------|-------------|
| **Fixed Window** | 1000 req/min; resets at minute boundary |
| **Sliding Window** | Smoother; rolling time window |
| **Token Bucket** | Burst allowance + steady rate |
| **Leaky Bucket** | Constant rate; queue excess |

Exceeded → `429 Too Many Requests` with `Retry-After` header.

**Levels**: Global, per-client, per-endpoint, per-API-key.

### 5. Load Distribution
Some gateways handle load balancing across service instances:
- Round-robin
- Least connections
- Weighted (for blue-green deployments)
- Zone-aware (prefer same availability zone)

### 6. Monitoring & Logging
Centralized observability for all traffic:
- Request/response logs (structured JSON)
- Metrics: latency (p50, p95, p99), error rates, throughput
- Distributed tracing (OpenTelemetry, W3C TraceContext)
- Alerts on anomaly detection

### 7. Request/Response Transformation
Adapts between client and service contracts:
- **Path rewriting**: `/v1/users` → `/api/v2/users`
- **Header manipulation**: Add/remove/modify headers
- **Body transformation**: XML ↔ JSON, field mapping, filtering
- **Protocol translation**: REST ↔ gRPC, GraphQL → REST

---

## Simple API Gateway Example

### Scenario: E-commerce Platform

**Services**: User, Product, Order, Payment, Inventory

**Gateway Configuration** (conceptual):

```yaml
routes:
  - path: /api/users/*
    service: user-service
    auth: required
    rate_limit: 100/min
  
  - path: /api/products/*
    service: product-service
    auth: optional  # public catalog
    rate_limit: 500/min
    cache: 60s
  
  - path: /api/orders/*
    service: order-service
    auth: required
    rate_limit: 50/min
  
  - path: /api/payments/*
    service: payment-service
    auth: required
    rate_limit: 20/min  # stricter for payments
    tls: required

policies:
  cors:
    origins: ["https://app.myapp.com", "https://admin.myapp.com"]
  logging:
    level: info
    format: json
  tracing:
    enabled: true
```

**Client Request**:
```
GET https://api.myapp.com/api/products?category=electronics
```

**Gateway Processing**:
1. Matches route → product-service
2. Auth optional → proceeds
3. Rate limit check → under limit
4. Checks cache → miss
5. Forwards to product-service
6. Receives response → caches for 60s
7. Returns to client

---

## API Gateway vs Reverse Proxy

| Aspect | Reverse Proxy | API Gateway |
|--------|---------------|-------------|
| **Primary role** | Forward requests to backend servers | Full API lifecycle management |
| **HTTP handling** | Layer 7 proxy, load balancing | Layer 7 + API semantics |
| **Auth** | Basic (or none) | Rich (OAuth, JWT, API keys, mTLS) |
| **Rate limiting** | Basic or none | Advanced (quota, tiers, algorithms) |
| **Transformation** | Header/path rewrite | Body transformation, protocol translation |
| **Observability** | Access logs | Structured logs, metrics, tracing, analytics |
| **API-specific** | No | Versioning, documentation, developer portal |
| **Examples** | Nginx, HAProxy, Traefik | Kong, Apigee, AWS API Gateway, Azure API Management, Tyk, Gravitee |

**A reverse proxy is infrastructure. An API gateway is API management.**

Many API gateways *include* reverse proxy capabilities (Nginx-based: Kong, APISIX; Envoy-based: Gloo, Ambassador).

---

## API Gateway vs Load Balancer

| Aspect | Load Balancer (L4/L7) | API Gateway |
|--------|----------------------|-------------|
| **Layer** | L4 (TCP) or L7 (HTTP) | L7 (HTTP/HTTPS) |
| **Awareness** | Connection/Request level | API semantics (paths, methods, payloads) |
| **Routing** | IP/port or host/path | Path, header, query, JWT claims, GraphQL operation |
| **Health checks** | TCP/HTTP health endpoints | Can integrate with service mesh health |
| **SSL termination** | Yes | Yes |
| **API features** | No | Auth, rate limit, transform, analytics |

**Load balancers distribute traffic. API gateways manage APIs.**

In practice: Load balancer (AWS ALB, Cloudflare) → API Gateway (Kong, Apigee) → Services.

---

## API Gateway vs Service Mesh

| Aspect | Service Mesh (Istio, Linkerd) | API Gateway |
|--------|------------------------------|-------------|
| **Scope** | Service-to-service (East-West) | Client-to-service (North-South) |
| **Deployment** | Sidecar per pod | Standalone cluster/managed service |
| **Focus** | mTLS, retries, circuit breaking, traffic splitting | Auth, rate limit, developer experience, monetization |
| **Observability** | Deep service mesh telemetry | API-level analytics, developer portal |
| **Policy** | Fine-grained (per-service) | Coarse-grained (per-API) |

**They complement each other.** Service mesh handles internal service communication; API gateway handles external API traffic.

---

## API Gateways in Microservices

In a microservices architecture, the API gateway is the **front door**:

```
                    ┌─────────────────┐
                    │   API Gateway   │
                    │  (North-South)  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  User Service  │ │ Order Service  │ │ Payment Svc    │
└────────┬───────┘ └────────┬───────┘ └────────┬───────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            ▼
                   ┌─────────────────┐
                   │  Service Mesh   │
                   │  (East-West)    │
                   └─────────────────┘
```

**Benefits**:
- Services stay simple (no auth, rate limit, logging code)
- Consistent policies across all services
- Easy to add new services (register route in gateway)
- Canary deployments via gateway routing rules
- Single place for API documentation (OpenAPI aggregation)

---

## API Gateways and Modern AI Applications

API gateways can also play an important role in AI application architectures:

### AI Agent Traffic
- Agents make high-volume, bursty API calls
- Gateway rate limiting prevents agent loops from overwhelming services
- Request/response logging aids agent debugging

### LLM Provider Abstraction
- Route requests to different LLM providers (OpenAI, Anthropic, local models)
- Transform unified request format to provider-specific formats
- Centralize API key management and cost tracking

### RAG Pipeline Integration
- Gateway can orchestrate: Embedding → Vector DB → LLM
- Or route to dedicated RAG microservice
- Cache frequent queries to reduce LLM costs

### Streaming Responses
- LLMs stream tokens; gateway must support HTTP streaming (Server-Sent Events, chunked transfer)
- Buffering/transformation must handle incremental responses

---

## Limitations and Trade-offs

| Concern | Mitigation |
|---------|------------|
| **Single point of failure** | Deploy gateway in HA (multiple replicas, multi-AZ); health checks |
| **Added latency** | Additional network and processing latency; optimize with efficient routing, caching, and appropriate deployment |
| **Complexity** | Start simple; use managed services (AWS API Gateway, Kong Konnect) |
| **Vendor lock-in** | Use open-source (Kong, APISIX, Traefik, Gravitee) or standard APIs |
| **Configuration drift** | GitOps: store gateway config as code (Declarative: Kong deck, Apigee API) |
| **Debugging** | Distributed tracing (OpenTelemetry); request IDs propagated through gateway |

---

## FAQ

### What is the difference between an API gateway and a reverse proxy?
A reverse proxy forwards HTTP requests (load balancing, SSL termination). An API gateway adds API-specific features: authentication, rate limiting, request/response transformation, analytics, developer portal, versioning. Most API gateways include reverse proxy capabilities.

### Do I need an API gateway for a monolith?
Not necessarily. A monolith with a simple load balancer and internal middleware for auth/logging may suffice. API gateways shine when you have multiple services, external consumers, or need centralized policy enforcement.

### What is the difference between API gateway and service mesh?
Service mesh handles **service-to-service** (East-West) traffic inside the cluster (mTLS, retries, circuit breaking). API gateway handles **client-to-service** (North-South) traffic from external consumers (auth, rate limiting, monetization, developer experience). Use both.

### Can an API gateway handle WebSockets and gRPC?
Yes. Modern gateways (Kong, APISIX, Envoy-based, AWS API Gateway v2) support WebSocket upgrade, gRPC proxying, and gRPC-Web for browsers.

### How does an API gateway handle authentication?
It validates credentials (API keys, JWT, OAuth tokens, mTLS) before forwarding requests. Can integrate with identity providers (Auth0, Okta, Keycloak, AWS Cognito). Invalid auth → `401 Unauthorized`.

### What is rate limiting and why does it matter?
Rate limiting restricts request volume per client/time window. Protects services from overload, ensures fair usage, prevents abuse. Returns `429 Too Many Requests` when exceeded.

### Can I use an API gateway for internal services?
Yes. "Internal API gateways" manage service-to-service communication for teams that want API-style governance without full service mesh overhead.

### What are popular API gateways?
**Managed**: AWS API Gateway, Azure API Management, Google Cloud API Gateway, Kong Konnect, Apigee.
**Self-hosted/Open-source**: Kong, APISIX, Traefik, Gravitee, Tyk, KrakenD, Envoy Gateway.
**Service Mesh adjacent**: Gloo, Ambassador, Solo.io.

### How do I choose an API gateway?
Consider: scale, latency requirements, team expertise, cloud vs on-prem, open-source vs managed, plugin ecosystem, GitOps support, cost model, protocol support (REST, GraphQL, gRPC, WebSocket).

---

## Related Concepts

- **[API](/glossary/api/)** — The interface being managed
- **[REST API](/glossary/rest-api/)** — Most common API style through gateways
- **OAuth** — Authorization framework gateways enforce
- **JWT** — Token format gateways validate
- **Microservices** — Architecture pattern requiring gateways
- **Load Balancer** — Infrastructure layer below gateway
- **Reverse Proxy** — Simpler proxy layer
- **Service Mesh** — Complementary East-West layer

---

*This article is part of the EduGlossary Software Development category. Explore related topics in the [Software Development hub](/learn/software-development/).*

---

## Sources

- [What is Amazon API Gateway? — AWS](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
- [Amazon API Gateway — AWS](https://aws.amazon.com/api-gateway/)
