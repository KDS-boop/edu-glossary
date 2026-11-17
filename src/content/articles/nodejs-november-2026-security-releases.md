---
title: "Node.js November 2026 Security Releases: HTTP/2, TLS, and Runtime Hardening"
description: "A practical guide to the 11 November 2026 Node.js security releases, affected HTTP/2 and TLS code paths, patched versions, and runtime upgrade priorities."
category: "Cybersecurity"
tags: ["Node.js Security", "HTTP/2", "TLS", "CVE-2026-123863", "CVE-2026-126051", "Patch Management", "JavaScript"]
relatedGlossary: ["Preemptive Cybersecurity", "Firewall", "End-to-End Encryption", "Remote Code Execution", "Digital Provenance"]
author: "eduglossary-team"
publishedDate: 2026-11-17
updatedDate: 2026-11-17
draft: false
coverImage: "/images/articles/nodejs-november-2026-security-releases.svg"
coverImageAlt: "A Node.js security release overview showing HTTP/2 streams and TLS connections moving through a patch verification gate."
---

The Node.js project published security updates for its active 22.x, 24.x, and 26.x release lines on **11 November 2026**. The fixes address multiple vulnerabilities in HTTP/2 session handling, HTTPS request parsing, TLS handshakes and session reuse, proxy error reporting, and other runtime components. The highest severity assigned to the release is **High**. The patched release versions are Node.js **22.23.5**, **24.22.3**, and **26.13.1**.

This is a runtime security update, not simply a dependency refresh for application developers. A Node.js service may inherit the vulnerable behavior from the runtime even when its own package manifest has not changed. Conversely, the presence of a CVE in a release notice does not prove that every application exposes the affected code path. Applicability depends on the APIs used, server configuration, request handling, and the release line in production.

**Status checked: 17 November 2026.** The guidance below is based on the Node.js project's 11 November security release and the corresponding release notes. Check the official advisory and release schedule again before planning a later deployment because supported versions and maintenance releases can change.

## What changed on 11 November 2026?

Node.js published coordinated security releases for three active release lines:

| Release line | Patched version | Release channel |
|---|---:|---|
| Node.js 22.x | 22.23.5 | Jod (LTS) |
| Node.js 24.x | 24.22.3 | Krypton (LTS) |
| Node.js 26.x | 26.13.1 | Lithium (LTS) |

Each version is described by the project as a security release. The advisory rates the highest severity fixed in each line as High. Its issue list contains several High, Medium, and Low severity entries, and the exact set of affected release lines differs by issue. Do not interpret the summary as meaning that every listed CVE affects every application or that all issues have identical prerequisites.

The release also updates bundled or integrated components. The Node.js security notice identifies llhttp updates across 22.x, 24.x, and 26.x; undici updates on 24.x and 26.x; and SQLite updates on 22.x and 24.x. The 26.13.1 release notes additionally list Brotli 1.2.1, llhttp 9.4.4, SQLite 3.54.1, and undici 8.12.4. This matters because application teams sometimes inventory only direct npm dependencies and overlook libraries shipped inside the runtime.

## The most important High-severity issues

### HTTP/2 session teardown can terminate a server

CVE-2026-123863 concerns HTTP/2 session teardown. A remote unauthenticated client can trigger a reachable assertion when a stream still retains nghttp2-allocated header buffers after its session is removed. When the session destructor checks memory accounting, the assertion can fail and terminate the process.

The advisory lists this issue for Node.js 24.x and 26.x. The practical impact is service availability: a process crash can interrupt requests handled by that worker until a supervisor or platform restarts it. Restarting may restore service, but it does not remove the vulnerable code or prevent repeated triggering.

Review services that expose Node.js HTTP/2 endpoints, including applications behind proxies or gateways that preserve HTTP/2 to the origin. A reverse proxy that terminates client HTTP/2 and forwards HTTP/1.1 upstream may change exposure for this particular origin runtime path, but operators must confirm the actual protocol between each hop rather than assume that an edge proxy removes all risk.

### HTTPS request parsing can expose process memory

CVE-2026-123864 concerns re-entrant parsing during a zero-length TLS write. Under a specific handler sequence, Node.js can process another TLS record while the HTTP parser is already handling a request body. The advisory describes a use-after-free and an out-of-bounds heap read that may cause memory belonging to other connections to be copied into a response.

The vulnerable path requires particular application behavior: a handler calls `res.flushHeaders()` before the request body has ended and later calls `res.end()` with a non-empty chunk. Reading the exposed bytes also depends on a route that echoes or stores request-body data. The project explicitly distinguishes this from cleartext `node:http`; the described issue affects HTTPS.

This combination is important for triage. Search for handlers that flush headers early while consuming a request body, especially routes that reflect uploaded or submitted data. Review middleware and streaming abstractions as well as route source because the relevant sequence may be distributed across layers. Do not test with exploit payloads against a live service; use source review and an isolated reproduction environment where necessary.

### HTTP/2 cleanup and memory-retention flaws

CVE-2026-123865 describes HTTP/2 sessions that fail to clean up after a protocol error occurs during connection shutdown. The advisory says an unauthenticated peer can leave a session and its associated memory and file descriptors retained, resulting in resource exhaustion over time.

CVE-2026-123866 and CVE-2026-123874 address stream lifetime and buffer handling around pending writes. The latter is a use-after-free involving `respondWithFile()` or `respondWithFD()` when a stream is reset while a write is pending. In the advisory, this affects 24.x and 26.x. The release also fixes a separate NULL dereference when an HTTP/2 file download is cancelled (CVE-2026-123875), which is rated Medium.

For operators, these issues make HTTP/2 file-serving and long-lived sessions useful inventory targets. Identify applications using the native `node:http2` API, wrappers built on it, and file-serving paths that use the relevant response methods. Check the exact CVE impact matrix before assigning risk; a shared protocol label does not mean the same version range applies to every flaw.

### TLS callback handling can crash a server

CVE-2026-126051 is a remotely reachable crash in TLS server handshake handling. The advisory identifies deferred callbacks such as `SNICallback`, `OCSPRequest`, `newSession`, and `resumeSession`, as well as `server.addContext()`, as relevant paths. If the socket is destroyed between callback scheduling and execution, a callback can run against a destroyed socket and raise an uncaught exception.

This issue is listed for Node.js 24.x and 26.x. Inventory TLS servers that customize handshake behavior, use OCSP or session hooks, or select certificates and policies dynamically. A simple HTTPS server with none of these custom hooks may have a different exposure profile, but updating remains the correct action because the same release contains other fixes.

### TLS session and SNI policy consistency

CVE-2026-123872 addresses TLS session resumption and Server Name Indication (SNI) behavior in mutual-TLS deployments. The fixes cover session resumption without an appropriate session ID context and prevent renegotiation, Hello Retry Request, or resumed TLS sessions from changing SNI identity. This is especially relevant to systems that use client certificates to distinguish tenants or hostnames.

Review how the service maps hostnames to certificates, client certificate authorities, and authorization policies. Confirm that a resumed session cannot carry an authorization decision from a different hostname or policy context. The security update should be applied even when the application does not use mTLS, because the release contains other relevant defects.

## Medium- and Low-severity fixes still matter

The November release also includes issues that may not be the first priority for every deployment but deserve an applicability check.

- **CVE-2026-123828 (Medium):** an HTTP/2 Alt-Svc buffer overflow when an application passes an attacker-controlled origin, such as a request authority, to `Http2Session.altsvc()`. The advisory lists 24.x and 26.x.
- **CVE-2026-123867 (Medium):** a CA-only SNI context can fall back to the default client CA when no server certificate is configured in that context, potentially bypassing per-host mutual-TLS authorization. This affects 22.x, 24.x, and 26.x.
- **CVE-2026-123868 (Medium):** inbound HTTP/2 data retained by undrained streams is not charged correctly to `maxSessionMemory`, allowing memory exhaustion. The listed affected lines are 24.x and 26.x.
- **CVE-2026-123871 (Medium):** proxy credentials can appear in `ERR_PROXY_INVALID_CONFIG` messages on error paths. Review stderr, container logs, crash reports, and centralized log access if an affected runtime may have emitted these errors.
- **CVE-2026-123875 (Medium):** cancelling a file download using the affected HTTP/2 file-serving methods can trigger a NULL dereference and terminate the process.
- **CVE-2026-123877 (Medium):** TLS session-cache key reuse in `https.Agent` can mix different certificate-authority policies under particular configurations.
- **CVE-2026-123829, CVE-2026-123862, and CVE-2026-123873 (Low):** these address Permission Model path disclosure, a zlib callback assertion after stream destruction, and heap-snapshot destination permission checks. Their preconditions are narrower, but they should be included in runtime inventory and patch records.

The issue descriptions above are summaries, not proof of exploitability for a given service. The official advisory defines each affected release line and the exact technical prerequisites. In particular, a service using HTTP/1 only does not automatically face every HTTP/2 issue, while a service with HTTPS, TLS customization, or proxy handling can still be affected by other entries in the same release.

## How to check whether a deployment needs updating

Start with the runtime actually executing production traffic. A developer workstation version, a container build stage, a CI runner, and the production runtime can all differ. Record the version from the running process or the environment that launches the application:

```bash
node --version
node -p "process.versions"
```

For a containerized service, inspect the base image digest and the Node.js version inside the final runtime image—not only the builder image. For a managed platform, consult the provider's runtime configuration and deployment logs. If the platform uses a runtime that is patched independently, retain its provider advisory or support confirmation as evidence.

Next, map the application's protocol and API usage. Search source code and dependencies for `node:http2`, `http2.createServer`, `respondWithFile`, `respondWithFD`, `https.createServer`, `flushHeaders()`, custom TLS callbacks, `addContext()`, `Http2Session.altsvc()`, and `https.Agent` custom CA options. These search terms are triage clues rather than a complete static analysis rule: frameworks can call runtime APIs indirectly.

Finally, compare the result with the per-CVE affected release lines. Do not use the most permissive line as a blanket rule. An issue marked 24.x and 26.x may not affect 22.x, while another issue in the same release can affect all three.

## Patch and deployment checklist

1. **Select the correct supported release line.** Upgrade to at least 22.23.5, 24.22.3, or 26.13.1 on the corresponding line, subject to the current Node.js release schedule and any newer security release.
2. **Rebuild the final artifact.** Refresh the final container image or platform runtime, not just the local package lock. Node.js runtime fixes are not installed by updating an unrelated application dependency.
3. **Re-test protocol-sensitive paths.** Run integration tests for HTTP/2 teardown, uploads and streamed responses, HTTPS body handling, TLS callbacks, mTLS/SNI selection, proxy configuration, and graceful shutdown where those features are used.
4. **Observe resource and error behavior.** Monitor process restarts, memory growth, file-descriptor counts, TLS handshake failures, and error logs after rollout. This can catch regressions but is not a substitute for applying the patched runtime.
5. **Roll out progressively.** Deploy to a canary or a small traffic slice, check health and error rates, then continue. Keep a known-good rollback artifact while ensuring that rollback does not restore a vulnerable runtime indefinitely.
6. **Record evidence.** Save the runtime version, image digest or deployment identifier, update time, test results, and the advisory revision used for the decision.

Temporary mitigations such as disabling HTTP/2 or removing a custom TLS hook may reduce exposure for a specific issue, but they are not equivalent to a patched runtime. Make such changes only after assessing the architecture and operational impact, and remove temporary workarounds when the corrected runtime is deployed.

## What this means for Node.js 26 users

Node.js 26.13.1 is the security release published on 11 November 2026 for the 26.x line. It includes fixes across HTTP/2, HTTPS/TLS, dependencies, and other runtime components. A machine already running 26.13.1 is at the version named in that release notice; that statement does not prove that every production artifact, container, or managed runtime uses the same version.

For teams pinning Node.js, exact patch pins improve reproducibility but create an update obligation. Revisit the pin when the project publishes security releases, and confirm that local development, CI, build images, and production all select a compatible patch. A major-only setting such as `26` can follow a different patch depending on the provider's installation behavior and cache state; inspect the effective version in build logs.

Node.js 26 is also not a reason to disregard 22.x or 24.x. Organizations should follow the project's support schedule and use a supported line appropriate to their compatibility and maintenance requirements. Avoid moving between major versions solely to address a patch-level security advisory unless the support policy or a separate compatibility requirement calls for it.

## Frequently asked questions

### Does every Node.js application have to disable HTTP/2?

No. The advisory contains multiple vulnerabilities with different prerequisites and affected versions. Disabling HTTP/2 might mitigate exposure to a particular HTTP/2 code path, but it does not resolve HTTPS or TLS issues in the same release. Updating to the patched runtime is the primary action.

### Is updating npm packages enough?

Not for vulnerabilities in Node.js core or bundled runtime dependencies. Updating the Node.js runtime or the platform-provided runtime is necessary. Application dependencies should still be audited separately, but a clean npm audit is not proof that the underlying Node.js executable is patched.

### If my application runs Node.js 26.13.1, am I secure?

That version contains the fixes listed in the 11 November release for the 26.x line. It is not a complete security guarantee. Applications still need secure configuration, updated dependencies, access controls, monitoring, and subsequent runtime updates when they are released.

### Can a reverse proxy protect an older Node.js origin?

A proxy can change which protocol and data reach the origin, and may reduce exposure to particular network-facing paths. It cannot be treated as a universal fix for runtime defects, especially where the origin still processes HTTPS, TLS callbacks, or other affected functionality. Confirm the actual upstream protocol and the complete request path, then patch the origin runtime.

### What should be done if proxy credentials may have been logged?

After updating Node.js, review the logs that could contain `ERR_PROXY_INVALID_CONFIG` messages, restrict access to sensitive log stores, and rotate credentials if there is evidence or a reasonable possibility that they were exposed. Avoid copying raw proxy URLs into issue trackers or diagnostic output.

## Sources and further reading

- [Node.js Project: Wednesday, November 11, 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases/) — primary advisory and per-CVE affected release lines.
- [Node.js 26.13.1 release notes](https://nodejs.org/en/blog/release/v26.13.1/) — 26.x patch details and bundled dependency updates.
- [Node.js 24.22.3 release notes](https://nodejs.org/en/blog/release/v24.22.3/) — 24.x patch details.
- [Node.js 22.23.5 release notes](https://nodejs.org/en/blog/release/v22.23.5/) — 22.x patch details.
- [Node.js security policy](https://nodejs.org/en/security/) — reporting and security process.
