---
term: "Brotli"
shortDefinition: "A lossless compression format and implementation used to reduce data size, particularly for web content and application payloads."
metaDescription: "Brotli compression explained: HTTP content encoding, performance trade-offs, decoder security, CVE-2026-111497 and safe updates."
category: "Software Development"
letter: "B"
updatedDate: 2026-10-29
image: "./images/brotli.svg"
imageAlt: "Illustration of data blocks passing through a compression and decompression pipeline, with a shield around the decoder."
relatedTerms: ["Remote Code Execution", "Out-of-Bounds Write", "Codebase"]
---

Brotli is a lossless data-compression format and a family of implementations commonly used to reduce the size of web resources and application data. Lossless compression means that decoding reconstructs the original data exactly. Brotli is especially common for text-based web assets, where reducing transferred bytes can improve loading time and reduce bandwidth consumption.

Brotli is more than a file extension or a browser feature. Applications can use a Brotli encoder to produce compressed data and a decoder to restore the original content. Those two operations have different trust boundaries: producing a response from data the application already controls is not the same as decoding a stream supplied by an untrusted client.

## How Brotli compression works

A compression algorithm looks for structure and repetition that can be represented more compactly. Text contains frequent words, character sequences, markup patterns, and repeated fragments. An encoder can replace some repetitions with references or shorter representations, then package the result into a stream that a decoder can reconstruct.

Brotli combines a static dictionary, context modeling, and general-purpose compression techniques. The static dictionary provides predefined words and phrases that can be useful for common web content. Context modeling allows the encoder to take account of what kinds of symbols are likely in the current position. The decoder follows the stream's format rules to rebuild the original sequence of bytes.

The exact compression ratio depends on the data, encoder settings, and alternatives being compared. Highly repetitive text may compress well, while already-compressed images, encrypted data, or random-looking bytes may see little improvement. Higher compression settings can take more CPU time during encoding, so servers often balance build-time or response-time cost against the saved bytes.

## Brotli in HTTP

In HTTP content negotiation, a client can advertise the encodings it understands with an `Accept-Encoding` request header. A server or CDN can respond with a supported encoding and indicate the representation using `Content-Encoding`, for example `br` for Brotli. The response body is the compressed representation; the client decodes it before displaying a page or passing the payload to application logic.

This approach can reduce the amount of data transferred for HTML, CSS, JavaScript, JSON, SVG, and other text-like resources. It may improve first-load performance on networks where bandwidth is a bottleneck. It does not automatically improve every workload: compressed representations can require CPU, caches may need to distinguish variants, and response headers must correctly describe the encoding.

Web servers often precompress static assets during a build or deployment. This can move the CPU cost from request time to build time and avoid repeatedly compressing the same file. Other applications compress responses dynamically. Similarly, a client library may decompress an HTTP response automatically before passing the result to application code. The visible API can hide the underlying native decoder from the developer.

## Encoder and decoder are different security surfaces

Compression produces a smaller representation; decompression parses a representation and restores content. A decoder must handle malformed, truncated, contradictory, or excessively expensive input safely. It must enforce the format's length and state rules without writing outside memory bounds or consuming unbounded resources.

The risk depends on where input comes from. A build process that compresses trusted static files may have a different exposure from an API server that accepts arbitrary compressed uploads. A server-side HTTP client may automatically decode a response supplied by an upstream service, and that upstream service may be outside the application's control. A package may include a bundled decoder even if the operating system also offers a shared library.

Security testing should therefore ask whether the decoder is present, which implementation and version is used, whether a remote party can influence its input, what limits apply, and what privileges the decoding process has. Searching the codebase for the word `brotli` can help, but it will not reveal every implicit or transitive use.

## CVE-2026-111497: a recent decoder security issue

On 21 October 2026, the Brotli project released version 1.2.1 to fix CVE-2026-111497, an out-of-bounds write that permits remote code execution. The Node.js security release for the 22.x, 24.x, and 26.x lines describes how malformed compressed input could cause the decoder to write beyond an internal buffer. Potential effects include process crashes, memory disclosure, or code execution, depending on the application and environment.

The issue was not limited to source code that directly imports a standalone Brotli package. Node.js identified the problem in its decoder path, and PHP announced Windows package rebuilds on 26 October because the vulnerable decoder was reachable through the cURL extension when automatic HTTP response decompression was enabled. That PHP notice also clarifies that the cURL option is disabled by default, but applications and client libraries can enable it.

This is a useful case study in dependency inventory. An application developer may not choose a library version directly when a runtime bundles the decoder. Another application may rely on a distribution package or an image built by a platform provider. A complete remediation must map the vulnerable implementation to the product that ships it and follow the update path offered by that vendor.

**Status checked: 29 October 2026.** The upstream release is Brotli 1.2.1, but operating-system packages and downstream products can backport a fix using different version numbers. Check the vendor's advisory for the installed package rather than assuming every repository uses the same version scheme.

## Security practices for applications using Brotli

### Keep decoders supported and patched

Track the Brotli implementation and its source. It may be bundled inside a language runtime, installed as a system library, included by a language-specific package, or carried in a vendor-managed image. Update through the supported channel for that distribution or runtime. A patch to one copy does not patch a second copy embedded elsewhere.

### Treat compressed input as untrusted until proven otherwise

A valid compression stream can still be very large after decompression. Apply request-size limits, decompressed-size limits, timeout controls, concurrency limits, and memory limits appropriate to the workload. Be aware of compression bombs and resource exhaustion: these are different from memory corruption, but both can threaten availability.

Size checks should account for the data after decompression, not just the network bytes before decompression. Where streaming APIs are used, monitor decoded output incrementally and stop when an explicit limit is reached. Ensure error handling releases buffers and does not continue processing partial results after a decoding error.

### Make content negotiation predictable

Servers should return a `Content-Encoding` value that matches the representation actually sent. Caches should account for content negotiation to avoid serving a compressed representation to a client that does not support it. Test compressed and uncompressed responses, partial content behavior, range requests, and intermediary cache behavior where those features apply.

### Verify each deployment layer

For containerized systems, update the required packages, rebuild the image, and deploy the new image digest. For managed runtimes, read the provider's rollout notice and determine whether customer action is required. For language runtimes, install the applicable security release and confirm the running process uses it. Don't treat a successful local update as evidence that production is patched.

### Test failure behavior

Tests should exercise truncated data, invalid block structures, incorrect lengths, and other malformed inputs using a safe corpus and a controlled environment. Fuzzing can expose parser edge cases that ordinary happy-path tests miss. Include resource limits and error handling in the test plan, and repeat relevant tests after upgrading the native library.

## Performance and operational trade-offs

Brotli is not always the right choice for every response. It can be effective for text and repetitive structures, but the benefit is smaller for media formats that already compress data. Dynamic compression can add CPU overhead and latency under load. Precompression can improve predictability but requires build tooling and correct cache invalidation.

A production decision should be based on measurements: body size before and after compression, CPU time, memory, latency percentiles, cache hit rates, and the client's network characteristics. Do not enable a more expensive compression level just because it produces a smaller file in a one-time test. Nor should a security incident lead to disabling all compression indefinitely if the vulnerable path can be patched or narrowly disabled.

Security and performance are compatible goals when the decoder is maintained and input limits are suitable. The key is to understand which component performs the work and to maintain an explicit policy for patching it.

## Brotli compared with other encodings

Gzip remains widely supported and is often available as a compatibility option. Deflate is another compression format used in software and protocols. Zstandard is used in many storage, distribution, and service workloads, although support depends on the platform. These formats have different speed, ratio, and compatibility characteristics.

There is no encoding that removes the need for safe parsing. Every decoder must handle malformed input. Switching to another format may change the implementation and risk profile, but it does not guarantee that future vulnerabilities are impossible. If a vendor recommends disabling Brotli temporarily while a fix is pending, follow the recommendation for the affected path and plan a return to a patched configuration when the fix is available.

## Frequently asked questions

### Does Brotli encrypt data?

No. Brotli compresses data; it does not provide confidentiality or peer authentication. HTTPS normally uses TLS to protect data in transit, while Brotli may reduce the size of the HTTP representation carried inside that connection.

### Is Brotli safer when used only by a browser?

The risk depends on the browser's decoder implementation and whether it is patched. End users should keep browsers updated. Website operators must still assess decoders running on their servers, proxies, and clients separately.

### Does an updated web server fix all Brotli copies?

Not necessarily. A CDN, application runtime, native operating-system library, container, and client can each have different copies or update schedules. Inventory all relevant layers and verify the component that performs decompression.

### Should I disable Brotli now?

Not universally. Follow the advisory for the exact product and deployment. Where the vulnerable decoder is reachable and no patch is available, a narrow temporary disablement may reduce risk. Once the appropriate patch is available and verified, restore the necessary functionality according to the vendor's guidance.

## Sources

- Google Brotli, [v1.2.1 release and CVE-2026-111497](https://github.com/google/brotli/releases/tag/v1.2.1), 21 October 2026.
- Node.js Project, [October 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases), 21 October 2026.
- PHP Project, [2026 news archive](https://www.php.net/archive/2026.php), Windows rebuild announcement dated 26 October 2026.
- New Zealand National Cyber Security Centre, [CVE-2026-111497 affecting Brotli decoder](https://www.ncsc.govt.nz/alerts/cve-2026-111497-affecting-brotli-decoder/), checked 29 October 2026.
