---
term: "API"
shortDefinition: "Application Programming Interface, the way two applications communicate with each other."
category: "Software Development"
letter: "A"
updatedDate: 2026-09-05
relatedTerms: ["API Gateway", "Full Stack", "Codebase", "Continuous Integration", "REST API"]
---

An API (Application Programming Interface) is a set of rules and protocols that enable one software application to communicate with another. APIs define the methods, data formats, and conventions that applications use to request and exchange information — without needing to know how the other side is implemented internally.

In practice, an API is what allows a mobile app to fetch data from a server, a website to process a payment, or a script to interact with an external service. It acts as a contract between the caller and the provider: as long as both sides follow the agreed format, the implementation details can change independently.

## How APIs Work

Most modern web APIs follow a request-response model over HTTP. A client (such as a browser or mobile app) sends a request to a specific URL — called an endpoint — including an HTTP method that describes the action. The server processes the request and returns a response, typically in JSON format.

A typical request might look like:

```
GET /api/articles/42 HTTP/1.1
Host: example.com
```

And the response:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 42,
  "title": "Introduction to APIs",
  "status": "published"
}
```

## Common HTTP Methods

APIs use standard HTTP methods to indicate what operation the client wants:

- **GET** — retrieves data. The most common method; should not change server state.
- **POST** — sends data to create a new resource (e.g., submitting a form).
- **PUT** — replaces an entire resource with new data.
- **PATCH** — partially updates an existing resource.
- **DELETE** — removes a resource.

Each method has specific semantics. Using them correctly makes APIs predictable and easier to integrate.

## Common Response Status Codes

When a server responds to an API request, it includes a status code indicating the outcome:

- **200 OK** — the request succeeded.
- **201 Created** — a new resource was successfully created.
- **400 Bad Request** — the client sent invalid data.
- **401 Unauthorized** — authentication is missing or invalid.
- **403 Forbidden** — the client is authenticated but not allowed to perform this action.
- **404 Not Found** — the requested resource does not exist.
- **429 Too Many Requests** — the client has exceeded the rate limit.
- **500 Internal Server Error** — something went wrong on the server side.

Understanding these codes helps developers diagnose issues quickly when integrating with APIs.

## Popular API Types

- **REST API** — the most common style. Uses HTTP methods and stateless requests, with data typically in JSON format. Resources are identified by URLs.
- **GraphQL** — a query language developed by Meta where the client specifies exactly which fields it needs in a single request to a single endpoint. Useful when data needs are complex or vary between clients.
- **WebSocket API** — provides persistent, real-time, two-way communication between client and server. Common in chat applications, live dashboards, and multiplayer games.
- **gRPC** — a high-performance RPC framework developed by Google that uses Protocol Buffers for serialization. Often used for communication between microservices due to its speed and efficiency.

## How APIs Are Consumed

Developers interact with APIs through client libraries, SDKs, or direct HTTP requests. Most APIs require authentication — typically via API keys, OAuth tokens, or JWT (JSON Web Tokens) — to identify the caller and control access.

APIs are also the foundation of modern integrations: payment processing (Stripe), email delivery (SendGrid), cloud services (AWS, Azure), and data providers all expose APIs that applications depend on. The reliability, documentation quality, and versioning strategy of an API directly affect how well these integrations work in practice.
