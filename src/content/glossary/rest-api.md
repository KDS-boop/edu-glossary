---
term: "REST API"
shortDefinition: "An API that follows the REST architectural style, using standard HTTP methods and stateless requests to interact with resources identified by URLs."
category: "Software Development"
letter: "R"
updatedDate: 2026-09-21
relatedTerms: ["API", "API Gateway"]
---

A REST API (Representational State Transfer Application Programming Interface) is an API that adheres to the REST architectural principles defined by Roy Fielding in his 2000 doctoral dissertation. REST APIs use standard HTTP methods, stateless communication, and resource-oriented URLs, making them the most widely implemented API style on the web.

Most public APIs you interact with — Twitter/X API, GitHub API, Stripe payments, weather data services — are REST APIs. Their popularity comes from simplicity: they use the existing HTTP protocol without requiring special client libraries or proprietary protocols.

## Core Principles

**Resource-based.** Every entity (user, order, product) is identified by a unique URL. The URL represents the resource, not an action.

```
GET    /users/42          → retrieve user 42
PUT    /users/42          → update user 42
DELETE /users/42          → delete user 42
GET    /users/42/orders   → retrieve orders belonging to user 42
```

**Stateless.** Each request contains all the information needed to process it. The server does not store client session state between requests. This simplifies server design and improves scalability — any server instance can handle any request.

**Standard HTTP methods.** REST maps CRUD operations to HTTP verbs:

| Operation | HTTP Method | Idempotent? |
|-----------|------------|-------------|
| Create | POST | No |
| Read | GET | Yes |
| Update (full) | PUT | Yes |
| Update (partial) | PATCH | No |
| Delete | DELETE | Yes |

Idempotency means calling the method multiple times produces the same result as calling it once — critical for safe retries in unreliable networks.

**Uniform interface.** Resources are manipulated through a consistent, standardized interface. Clients do not need to know implementation details — only the URL structure and HTTP methods.

## REST API Response Format

REST APIs typically return data in JSON format:

```json
{
  "id": 42,
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "created_at": "2026-01-15T10:30:00Z"
}
```

The response includes an HTTP status code indicating the outcome: `200 OK` for success, `201 Created` for successful resource creation, `404 Not Found` for nonexistent resources, `422 Unprocessable Entity` for validation errors.

## Pagination, Filtering, and Sorting

REST APIs handling large collections use query parameters for pagination, filtering, and sorting:

```
GET /articles?page=3&limit=20&category=blockchain&sort=-published_date
```

Common pagination patterns include offset-based (`?page=2&limit=20`) and cursor-based (`?cursor=abc123&limit=20`). Cursor-based pagination performs better at scale because it does not require the server to count and skip records.

## Authentication

REST APIs authenticate requests through several standard mechanisms:

- **API keys** — a token passed in a header (`Authorization: Bearer abc123`). Simple but less secure for browser-based apps.
- **OAuth 2.0** — a delegation framework that allows third-party apps to access resources on behalf of a user without sharing credentials. Used by social login flows and integrations.
- **JWT (JSON Web Tokens)** — a self-contained token carrying user claims, signed by the server. Enables stateless authentication since the server validates the token without a database lookup.

## REST vs. GraphQL

| Property | REST | GraphQL |
|----------|------|---------|
| Endpoints | Multiple (one per resource) | Single endpoint |
| Data fetching | Server determines response shape | Client specifies exact fields needed |
| Over-fetching | Common (client receives more data than needed) | Eliminated (client requests only what it needs) |
| Versioning | Often required (`/api/v1/`, `/api/v2/`) | Evolved through schema changes |
| Caching | Standard HTTP caching works easily | Requires additional tooling |
| Learning curve | Low | Moderate |

REST remains the default choice for most API projects due to its simplicity, mature tooling, and universal support. GraphQL excels when clients need flexible, nested data queries (e.g., dashboards with complex, varying data needs). For most applications, REST provides the best balance of simplicity, performance, and ecosystem support.

## Best Practices

**Use nouns for resource URLs**, not verbs. `/users` not `/getUsers`. The HTTP method conveys the action.

**Version your API** from the start (`/api/v1/`). Breaking changes to a public API without versioning forces all clients to update simultaneously.

**Return appropriate status codes.** Do not return `200 OK` with an error message in the body — use `4xx` for client errors and `5xx` for server errors.

**Implement rate limiting.** Protect your API from abuse by limiting requests per client per time window. Return `429 Too Many Requests` with a `Retry-After` header when limits are exceeded.

**Document thoroughly.** Tools like OpenAPI (Swagger) generate interactive documentation from API specifications, making it easy for developers to understand and test your API.
