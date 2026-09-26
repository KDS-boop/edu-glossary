---
term: "Hash Function"
shortDefinition: "A mathematical algorithm that converts any input data into a fixed-length string of characters, used for data integrity verification, security, and indexing."
metaDescription: "A hash function converts any input into a fixed-length cryptographic hash, ensuring data integrity, security, and uniqueness in digital systems."
category: "Blockchain"
letter: "H"
updatedDate: 2026-09-27
relatedTerms: ["SHA-256", "Blockchain", "Merkle Tree", "Digital Signature", "Password Security", "Collision Resistance"]
---

A hash function is a mathematical algorithm that takes an input of any length and produces a fixed-length output called a hash, digest, or fingerprint. The output appears random but is entirely determined by the input — the same input always produces the same hash.

Hash functions are fundamental building blocks in computer science, used for everything from hash tables (efficient data lookup) to digital signatures and blockchain integrity. In cybersecurity and blockchain contexts, we rely on **cryptographic hash functions** with specific security properties that make them suitable for protecting data.

## Essential Properties of Cryptographic Hash Functions

**Deterministic**: The same input always produces the exact same output. This is what makes hash functions useful for verification — if two parties hash the same file independently, they will get identical results.

**Fixed-length output**: Regardless of whether the input is a single character or an entire encyclopedia, the hash output has the same length. SHA-256 always produces 64 hexadecimal characters (256 bits). MD5 always produces 32 hexadecimal characters (128 bits).

**One-way (preimage resistance)**: Given a hash output, it is computationally infeasible to determine the original input. You can verify that a hash matches a known input, but you cannot reverse-engineer the input from the hash alone.

**Avalanche effect**: Changing even a single bit of the input produces a completely different hash output with no observable relationship to the original. This makes it impossible to predict how input changes affect the output.

**Collision resistance**: It should be computationally infeasible to find two different inputs that produce the same hash output. While collisions must theoretically exist (finite output space, infinite input space), a secure hash function makes finding them practically impossible.

## Common Cryptographic Hash Functions

| Function | Output Length | Status | Primary Use |
|----------|--------------|--------|-------------|
| MD5 | 128 bits | Broken (collisions found) | Legacy checksums only |
| SHA-1 | 160 bits | Deprecated | Being replaced everywhere |
| SHA-256 | 256 bits | Secure | Bitcoin, TLS certificates, password storage |
| SHA-3 | 224-512 bits | Secure | Alternative to SHA-2, government systems |
| BLAKE2/BLAKE3 | Various | Secure | High-performance applications |
| SHA-512 | 512 bits | Secure | High-security applications |

SHA-256, a member of the SHA-2 family, is the most widely deployed secure hash function as of 2026. For a detailed examination of SHA-256 specifically, see the SHA-256 entry.

## Practical Applications

### Data Integrity Verification
Software publishers distribute hash checksums alongside downloads. Recomputing the hash of a downloaded file and comparing it to the published hash confirms the file was not corrupted or tampered with during transfer.

Example: Linux distributions publish SHA-256 or SHA-512 checksums for each ISO file. Users verify their download by computing:
```bash
sha256sum ubuntu-22.04.iso
```
and comparing against the published hash.

### Password Storage
Systems never store passwords in plaintext. Instead, they store salted hashes of passwords. When a user logs in, the system hashes the provided password with the same salt and compares the result to the stored hash.

Even if the database is compromised, attackers only see hashes, not plaintext passwords. Proper implementation uses slow, memory-hard functions like Argon2, bcrypt, or scrypt rather than fast hashes like SHA-256.

### Digital Signatures
Instead of signing an entire document (which could be megabytes), the signer hashes the document first and then encrypts the hash with their private key. Verifiers decrypt the signature, hash the document independently, and compare — confirming both authenticity and integrity.

### Blockchain Integrity
Each block in a blockchain contains the hash of the previous block, creating a tamper-evident chain. Altering any historical record changes its hash, which breaks the chain and is rejected by the network. Merkle trees use hash functions to efficiently verify data integrity across large datasets.

### Hash Tables
The non-cryptographic use case: hash functions map keys to array indices for O(1) average-case lookup. This powers dictionaries, caches, and database indexing throughout software systems.

### Content Addressing
Systems like IPFS use content-addressable storage where files are identified by their hash. The same content always has the same hash, enabling deduplication and verification.

## Hash Functions vs. Encryption

Hash functions and encryption both transform data, but serve different purposes:

| Property | Hash Function | Encryption |
|----------|--------------|------------|
| Reversibility | One-way (irreversible) | Two-way (reversible with key) |
| Output size | Fixed length | Same as or larger than input |
| Key required | No | Yes |
| Primary use | Verification, integrity | Confidentiality |
| Example use | Password storage | File encryption |

You encrypt data you need to recover (files, messages), but you hash data you only need to verify (passwords, file integrity, digital signatures).

## Collision Attacks

A collision occurs when two different inputs produce the same hash output. While theoretically inevitable (pigeonhole principle), finding collisions should be computationally infeasible for secure hash functions.

**MD5 collisions**: First demonstrated in 2004. Practical collision attacks exist, making MD5 unsuitable for security.

**SHA-1 collisions**: Demonstrated in 2017 (SHAttered attack). Google created two different PDFs with the same SHA-1 hash.

**SHA-256**: No practical collision attacks as of 2026. Theoretical attacks require 2^128 operations (birthday bound).

### Birthday Paradox
The birthday paradox explains why collisions are easier to find than expected. With 2^n possible outputs, collisions become likely after approximately 2^(n/2) attempts. For SHA-256 (2^256 outputs), this means 2^128 attempts — still computationally infeasible.

## Implementation Considerations

### Constant-Time Comparison
When comparing hashes, use constant-time comparison functions to prevent timing attacks. Standard string equality checks can leak information through timing differences.

### Salting
Always use unique salts when hashing passwords. Salts prevent rainbow table attacks and ensure identical passwords produce different hashes.

### Keyed Hash Functions
HMAC (Hash-based Message Authentication Code) combines a hash function with a secret key for message authentication. Common variants: HMAC-SHA256, HMAC-SHA3.

### Length Extension Attacks
Some hash functions (MD5, SHA-1, SHA-2) are vulnerable to length extension attacks. Using HMAC or switching to SHA-3 prevents this.

## Limitations

Hash functions do not provide:
- **Confidentiality**: They do not hide data
- **Authentication**: They do not prove who created the hash
- **Non-repudiation**: They do not prevent denial of creation

Hash functions are building blocks that combine with other cryptographic primitives — encryption, digital signatures, key exchange — to build complete security systems.

## Frequently Asked Questions

### What is the difference between hashing and encryption?
Hashing is one-way — you cannot recover the original data. Encryption is two-way — you can decrypt with the correct key. Use hashing for verification, encryption for confidentiality.

### Why can't I reverse a hash?
Hash functions are designed to be one-way. They use mathematical operations (modular arithmetic, bitwise operations, compression) that lose information in the process. There is no algorithm to "unhash" a value.

### Are hash functions reversible?
No. Hash functions are mathematically designed to be irreversible. The only way to find an input for a given hash is brute force (trying all possible inputs) or using precomputed tables (defeated by salting).

### What is a collision?
A collision occurs when two different inputs produce the same hash output. Secure hash functions make finding collisions computationally infeasible, though theoretically inevitable.

### How long should a hash be?
Longer hashes provide more security but use more storage. SHA-256 (256 bits) is the current standard. SHA-3 offers flexibility in output length. Avoid MD5 (128 bits) and SHA-1 (160 bits) for security applications.
