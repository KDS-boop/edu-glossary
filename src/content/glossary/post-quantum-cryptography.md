---
term: "Post-Quantum Cryptography (PQC)"
shortDefinition: "Cryptography designed to resist attacks from conventional and future cryptographically capable quantum computers."
metaDescription: "Post-quantum cryptography, NIST ML-KEM, ML-DSA, SLH-DSA, crypto-agility and migration explained."
category: "Cybersecurity"
letter: "P"
updatedDate: 2026-10-06
image: "./images/post-quantum-cryptography.svg"
imageAlt: "Post-quantum cryptography concept illustration showing quantum-resistant cryptographic protection and crypto-agility."
relatedTerms: ["Symmetric Encryption", "Hash Function", "Confidential Computing"]
---

# Post-Quantum Cryptography (PQC)

Post-quantum cryptography (PQC) is a family of algorithms designed to protect communications and data against both classical computers and future large-scale quantum computers. PQC runs on conventional computers; it does not require quantum hardware.

The main concern is that sufficiently capable quantum computers could break some public-key cryptography used today. PQC therefore focuses primarily on quantum-resistant key establishment and digital signatures.

## NIST standards

NIST finalized three standards in 2024:

- FIPS 203: ML-KEM for key encapsulation.
- FIPS 204: ML-DSA for digital signatures.
- FIPS 205: SLH-DSA, a stateless hash-based signature scheme.

NIST's 2026 publications continue work on migration, crypto-agility and additional signature candidates.

## Why migrate now?

Migration can take years because organizations must inventory TLS, VPNs, certificates, HSMs, signing services, applications, embedded devices and third-party dependencies.

Long-lived confidential data also creates a "harvest now, decrypt later" concern: encrypted traffic captured today may be targeted later.

## Practical example

An Indonesian company storing sensitive customer data for many years can inventory RSA and elliptic-curve dependencies, identify long-lived data and test quantum-resistant options in APIs, VPNs and certificate infrastructure before a production migration.

The goal is not merely replacing one algorithm. It is building **crypto-agility**: the ability to change cryptographic mechanisms without redesigning the whole system.

## Limits

PQC does not fix weak identity management, stolen credentials or insecure software. New algorithms can also change key sizes, signatures, bandwidth and CPU requirements, so interoperability and performance testing remain necessary.

## Sources

NIST PQC: https://www.nist.gov/pqc
NIST PQC publications: https://csrc.nist.gov/Projects/Post-Quantum-Cryptography/publications
NIST FIPS 203/204/205: https://csrc.nist.gov/projects/post-quantum-cryptography
