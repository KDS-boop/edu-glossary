---
term: "Confidential Computing"
shortDefinition: "A security approach that protects data in use by processing it inside hardware-backed trusted execution environments."
metaDescription: "Confidential computing, TEEs, remote attestation and data-in-use protection explained."
category: "Cybersecurity"
letter: "C"
updatedDate: 2026-10-06
image: "./images/confidential-computing.svg"
imageAlt: "Confidential computing concept illustration showing protected data inside a hardware-backed trusted execution environment."
relatedTerms: ["End-to-End Encryption", "Hash Function", "Sovereign Cloud"]
---

# Confidential Computing

Confidential computing protects **data in use** by processing workloads inside hardware-backed isolation mechanisms commonly called Trusted Execution Environments (TEEs).

Encryption at rest protects stored data and encryption in transit protects network traffic. Confidential computing extends protection to sensitive data while it is actively processed.

## Remote attestation

A protected workload can produce hardware-backed measurements describing important parts of its execution environment. A verifier can check those measurements before a key-management service releases secrets.

A simplified flow is:

1. Start the workload inside a protected environment.
2. Measure the expected environment.
3. Verify the attestation.
4. Apply a release policy.
5. Process sensitive data inside the protected boundary.

## Practical example

A company wants sensitive analytics in a public cloud. Data is encrypted at rest, then processed in a confidential VM. The key service releases the decryption key only when the attestation policy is satisfied.

NIST's 2026 IR 8320E specifically examines confidential computing for cloud workloads and an example architecture for protecting AI datasets.

## What it does not solve

Confidential computing does not replace identity management, key management, secure coding, monitoring or incident response. Risks can remain in application code, dependencies, input/output paths, side channels, attestation policy and availability.

## Sources

NIST IR 8320E: https://csrc.nist.gov/pubs/ir/8320/e/ipd
NIST May 29 2026 announcement: https://www.nist.gov/news-events/news/2026/05/hardware-enabled-security-draft-report-available-comment
Confidential Computing Consortium: https://confidentialcomputing.io/
