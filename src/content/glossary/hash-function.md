---
term: "Hash Function"
shortDefinition: "A mathematical algorithm that converts any input data into a fixed-length string of characters, used for data integrity verification, security, and indexing."
category: "Blockchain"
letter: "H"
updatedDate: 2026-09-21
relatedTerms: ["SHA-256", "Blockchain", "Merkle Tree"]
---

A hash function is a mathematical algorithm that takes an input of any length and produces a fixed-length output called a hash, digest, or fingerprint. The output appears random but is entirely determined by the input — the same input always produces the same hash.

Hash functions are fundamental building blocks in computer science, used for everything from hash tables (efficient data lookup) to digital signatures and blockchain integrity. In cybersecurity and blockchain contexts, we rely on **cryptographic hash functions** with specific security properties that make them suitable for protecting data.

## Essential Properties

**Deterministic.** The same input always produces the exact same output. This is what makes hash functions useful for verification — if two parties hash the same file independently, they will get identical results.

**Fixed-length output.** Regardless of whether the input is a single character or an entire encyclopedia, the hash output has the same length. SHA-256 always produces 64 hexadecimal characters (256 bits). MD5 always produces 32 hexadecimal characters (128 bits).

**One-way (preimage resistance).** Given a hash output, it is computationally infeasible to determine the original input. You can verify that a hash matches a known input, but you cannot reverse-engineer the input from the hash alone.

**Avalanche effect.** Changing even a single bit of the input produces a completely different hash output with no observable relationship to the original. This makes it impossible to predict how input changes affect the output.

**Collision resistance.** It should be computationally infeasible to find two different inputs that produce the same hash output. While collisions must theoretically exist (finite output space, infinite input space), a secure hash function makes finding them practically impossible.

## Common Cryptographic Hash Functions

| Function | Output Length | Status | Primary Use |
|----------|--------------|--------|-------------|
| MD5 | 128 bits | Broken (collisions found) | Legacy checksums only |
| SHA-1 | 160 bits | Deprecated | Being replaced everywhere |
| SHA-256 | 256 bits | Secure | Bitcoin, TLS certificates, password storage |
| SHA-3 | 224-512 bits | Secure | Alternative to SHA-2, government systems |
| BLAKE2/BLAKE3 | Various | Secure | High-performance applications |

SHA-256, a member of the SHA-2 family, is the most widely deployed secure hash function as of 2026. For a detailed examination of SHA-256 specifically, see the SHA-256 entry.

## Practical Applications

**Data integrity verification.** Software publishers distribute hash checksums alongside downloads. Recomputing the hash of a downloaded file and comparing it to the published hash confirms the file was not corrupted or tampered with during transfer.

**Password storage.** Systems never store passwords in plaintext. Instead, they store salted hashes of passwords. When a user logs in, the system hashes the provided password with the same salt and compares the result to the stored hash. Even if the database is compromised, attackers only see hashes, not plaintext passwords.

**Digital signatures.** Instead of signing an entire document (which could be megabytes), the signer hashes the document first and then encrypts the hash with their private key. Verifiers decrypt the signature, hash the document independently, and compare — confirming both authenticity and integrity.

**Blockchain integrity.** Each block in a blockchain contains the hash of the previous block, creating a tamper-evident chain. Altering any historical record changes its hash, which breaks the chain and is rejected by the network. Merkle trees use hash functions to efficiently verify data integrity across large datasets.

**Hash tables.** The non-cryptographic use case: hash functions map keys to array indices for O(1) average-case lookup. This powers dictionaries, caches, and database indexing throughout software systems.

## Hash Functions vs. Encryption

Hash functions and encryption both transform data, but serve different purposes. Encryption is reversible with the correct key — you can decrypt ciphertext back to plaintext. Hash functions are one-way — there is no key that reverses a hash to its input. You can verify a hash matches a known input, but you cannot recover the input from the hash alone.

This distinction matters in practice: you encrypt data you need to recover (files, messages), but you hash data you only need to verify (passwords, file integrity, digital signatures).

## Limitations

Hash functions do not provide confidentiality (they do not hide data), authentication (they do not prove who created the hash), or non-repudiation on their own. They are building blocks that combine with other cryptographic primitives — encryption, digital signatures, key exchange — to build complete security systems. A hash function used in isolation provides integrity checking; combined with other tools, it enables secure communication, verified identity, and tamper-proof records.
