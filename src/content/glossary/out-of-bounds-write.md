---
term: "Out-of-Bounds Write"
shortDefinition: "A memory-safety flaw where a program writes data outside the valid limits of an allocated buffer or object."
metaDescription: "Out-of-bounds write explained: memory safety, common causes, potential impacts, testing, mitigations and patch verification."
category: "Cybersecurity"
letter: "O"
updatedDate: 2026-10-29
image: "./images/out-of-bounds-write.svg"
imageAlt: "Memory blocks with a highlighted boundary showing a write crossing beyond an allocated buffer into adjacent protected memory."
relatedTerms: ["Remote Code Execution", "Brotli", "Firewall"]
---

An out-of-bounds write is a memory-safety defect in which a program writes data beyond the valid range of a buffer, array, or object. The program may believe it is writing into an allocated region, but an incorrect length, index, pointer, or parser state causes bytes to land outside that region. The result can be corrupted program state, a crash, information exposure, or—under some conditions—arbitrary code execution.

The term describes the operation that went wrong, not the final impact. Some out-of-bounds writes are difficult to trigger or cause only a denial of service. Others are more dangerous because an attacker can influence what is written and where, or because the adjacent memory contains security-critical data. Exploitability depends on the code, compiler, allocator, process architecture, mitigations, and input control available to an attacker.

## What is a buffer boundary?

A buffer is a region of memory used to hold bytes or elements. If a program allocates an array of ten elements, valid element indices might be zero through nine. Writing to element ten is outside that array even if the address happens to belong to another readable or writable memory page. An allocation boundary is a property of the program's data structure and ownership, not only a boundary enforced by the operating system.

Programs must track how much memory is available and how much data has been processed. If code trusts an unverified length field, performs arithmetic that overflows, mixes byte counts with element counts, or uses an incorrect offset, it can compute a destination beyond the intended region. In native languages, pointer arithmetic and manual memory management provide flexibility but also make these errors possible.

An out-of-bounds write differs from an out-of-bounds read. A read accesses data outside the intended region and may disclose information or crash the process. A write modifies memory outside the intended region and can corrupt another object or control data. A single bug can sometimes permit both behaviors.

## Common causes

### Incorrect length calculations

A parser may calculate the expected output size from an input header or the length of a variable-size field. If the length is wrong, untrusted, or interpreted differently in two parts of a program, a copy or append operation can exceed the destination. Safe code validates both the format's declared length and the actual buffer capacity before performing the write.

### Off-by-one errors

Loop bounds and terminator space are common sources of mistakes. A loop might process one element too many, or a string copy might reserve space for the text but not its terminating null byte. These defects may occur only with boundary-sized input, which is one reason ordinary sample data can fail to reveal them.

### Integer overflow and truncation

A size calculation can overflow a fixed-width integer or truncate when converted between types. A small computed allocation can then be followed by a write based on the larger original value. Correct code checks arithmetic before allocation and uses types and APIs that express lengths safely.

### Confused state in a streaming parser

A streaming decoder processes input in chunks and may retain state between calls. It has to distinguish a valid request for more input from a permanent format error. If invalid state is misclassified, the parser may continue writing into a buffer that was sized for a different operation. CVE-2026-111497 in the Brotli decoder is an example of a reported out-of-bounds write that can permit remote code execution: the official Node.js notice explains that malformed input could keep a streaming path appending bytes beyond an internal buffer.

### Lifetime and ownership errors

A stale pointer, use-after-free, or incorrect assumption about object ownership can make code write into memory that no longer belongs to the expected object. This is related to memory safety but not synonymous with every out-of-bounds write. Vulnerability reports should identify the specific root cause rather than grouping all memory defects together.

## Why an out-of-bounds write matters

The impact is influenced by what is located next to the target buffer and whether an attacker can influence the input. Corruption can damage an application object, a length field, an index, a pointer, or internal state used by later code. The process may crash when the corrupted value is used. If the memory layout and program behavior provide a suitable path, corruption can affect control flow and potentially enable code execution.

An out-of-bounds write can also affect integrity without achieving code execution. A parser might corrupt a length value or security decision, causing the application to process incorrect data. In other cases, the primary result is denial of service through repeated crashes. Vendor advisories describe the demonstrated and reasonably assessed impact for a particular bug; generic explanations should not be treated as proof of every possible consequence.

Memory protections such as address-space layout randomization (ASLR), non-executable memory, stack canaries, guard pages, and control-flow integrity can make some exploitation paths harder. They do not prove that the underlying defect is safe. The correct action remains to fix the code or install the vendor's patch, then verify the affected build is in use.

## How remote input can reach the bug

An out-of-bounds write may be reachable through a local file, a network protocol, an uploaded archive, an image, a font, a compressed stream, a database field, or another structured input. A remote vulnerability exists when an attacker can make the target process the relevant data across a network or remote service boundary under the conditions described by the advisory.

The apparent application may not include the unsafe operation in its own source. A language runtime, native extension, command-line utility, image decoder, TLS library, or transitive package may process the bytes automatically. This is why dependency inventory, vendor advisories, and the effective runtime version matter as much as a source-code search.

For example, a web API may accept a compressed payload and hand it to a runtime decoder. The API code might only call a high-level decompression function, while the vulnerable write occurs inside the native implementation. Patching the API's validation layer alone does not necessarily repair the decoder. If a vendor provides a fixed runtime or package, update that component and rebuild the deployment artifact.

## How developers prevent out-of-bounds writes

### Prefer memory-safe abstractions

Languages and libraries that enforce array bounds or ownership rules can prevent broad classes of memory errors. Where possible, use well-maintained safe APIs rather than manual pointer arithmetic. A memory-safe language does not make every program vulnerability-free, but it can remove the need for developers to manually prove many low-level memory operations safe.

### Validate sizes and indices

Check that an index is within the permitted range before accessing an array. When calculating a destination size, validate additions and multiplications before they can overflow. Reject malformed lengths instead of silently truncating them. Avoid assuming that a length supplied by an input format exactly matches the bytes that are available.

Validation should match the program's data model. For example, code should not treat a byte count as a character count without accounting for encoding, and should not calculate a buffer size with an integer type too small for the maximum accepted payload. Use libraries that provide explicit capacity and error-handling contracts.

### Use safe copy and parsing APIs

Avoid legacy functions that do not receive or enforce a destination capacity. A safer API can reduce risk when its parameters are used correctly, but it still requires careful size calculations. Treat a failed parse as a terminal error for that input and ensure partially initialized state is not reused as though it were valid.

For streaming code, test transitions between “need more data,” “success,” and “format error.” State machines must not append input after an unrecoverable parse failure. Cleanup should tolerate partial initialization and should never assume that an object is fully formed just because it has a non-null pointer.

### Compile and test with defensive tooling

Where supported, use compiler diagnostics, sanitizers, static analysis, and memory-checking tools. AddressSanitizer can detect many out-of-bounds accesses during testing; UndefinedBehaviorSanitizer can find certain invalid operations; fuzzers can generate inputs that exercise unusual parser states. Tools have different detection capabilities and runtime costs, so use them as complementary checks rather than a guarantee that no defect remains.

Fuzzing is particularly useful for file formats and network parsers. A good harness should call the parser with malformed, truncated, boundary-sized, and mutated inputs, and should treat crashes or sanitizer findings as actionable signals. Keep fuzzing environments isolated, avoid using production secrets, and ensure the test corpus does not accidentally invoke unrelated network services.

### Apply vendor fixes and backports

When a defect is discovered in a shared library or runtime, maintainers may publish a new upstream release or backport a fix into a distribution package. Administrators should check the authoritative bulletin for their OS and package source. A patched package may keep an older-looking version number if the vendor applies the change without importing the newer upstream release number.

After patching, rebuild the software if the vulnerable component is statically linked or bundled into an application binary. Restart processes so that they stop using old code loaded in memory. For containers, rebuild and redeploy the image, then confirm the running digest. For a managed service, verify the provider's rollout state and any action required from customers.

## Temporary mitigations and their limits

If no fix is available, reducing exposure may be reasonable while waiting for a vendor update. Examples include disabling the specific parser or decompression path, restricting accepted input types, applying size and time limits, reducing privileges, or placing a service behind access controls. Any temporary mitigation should be based on the vendor's recommended scope and tested against normal application needs.

Input validation and limits do not necessarily prevent memory corruption caused by a parser bug. A payload can be small but malformed in a way that triggers a boundary error. A firewall can reduce the number of clients that reach an endpoint but does not fix the affected code. A sandbox can reduce the impact without eliminating the defect. Temporary measures should therefore have an owner, an expiry or review date, and a plan to install the permanent fix.

## How to triage a report

A useful security assessment answers several questions:

- **Affected component:** which library, runtime, branch, or package contains the defect?
- **Fixed version:** what update resolves the specific flaw for this distribution?
- **Reachability:** can a remote user or upstream system control the input that reaches the write?
- **Impact:** does the official advisory describe a crash, disclosure, code execution, or another consequence?
- **Prerequisites:** does exploitation require authentication, a feature to be enabled, unusual configuration, or a supported platform?
- **Deployment evidence:** which build is actually running, and when was it updated?
- **Residual risk:** are duplicate copies present in a container, plugin, worker, or serverless layer?

Use the vendor's wording accurately. CVSS and severity labels help prioritization but do not replace environment-specific assessment. A high-severity flaw in an exposed parser may deserve immediate attention; a component that is not deployed may be a lower operational priority, but still needs lifecycle tracking if it is part of a release artifact.

## Frequently asked questions

### Is every out-of-bounds write exploitable remotely?

No. Some require local access, a particular file, or a specific operation. Remote exploitation depends on whether an attacker can influence input that reaches the bug and on the conditions stated by the vendor.

### Does a crash prove that code execution occurred?

No. A crash can be evidence of memory corruption, but it does not establish that code ran or that an attacker gained control. Preserve logs and investigate using authorized testing and the official advisory.

### Can ASLR or a stack canary remove the need to patch?

No. These defenses may make some exploitation techniques harder, but they do not correct the invalid write. Apply the fixed build and retain layered protections.

### Why can an update need a container rebuild?

A container image includes a particular set of binaries and libraries. Updating a package on the build host does not change an already-published image; rebuilding and redeploying creates a new artifact with the patched component.

## Sources

- Node.js Project, [October 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).
- Google Brotli, [v1.2.1 release](https://github.com/google/brotli/releases/tag/v1.2.1).
- CISA, [Secure by Design](https://www.cisa.gov/securebydesign).
