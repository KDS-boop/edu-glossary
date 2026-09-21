---
term: "Merkle Tree"
shortDefinition: "A cryptographic tree data structure that optimizes data integrity verification in blockchain."
category: "Blockchain"
letter: "M"
updatedDate: 2026-09-19
relatedTerms: ["Blockchain", "SHA-256", "Decentralization", "Proof of Work", "Hash Function"]
---

Merkle Tree (named after Ralph Merkle) is a hierarchical binary tree data structure where each leaf node contains the hash of a single data block, and each internal node contains the hash of the combination of its two child nodes. The topmost node (root) represents a compact hash of all the data beneath it — a single root hash that summarizes thousands of transactions.

## How It Works

Imagine 8 transactions (T1 through T8). Each transaction is hashed to produce H1 through H8 (leaf nodes). H1 is combined and hashed with H2 to produce a parent, as are H3+H4, H5+H6, and H7+H8. The process continues until a single root hash remains. To verify that T3 exists in a block, one only needs to store the hash path (proof) from H3 to the root — without needing to download the entire block.

## Benefits in Blockchain

Bitcoin stores the Merkle root in the header of every block. When a lightweight client (SPV wallet) wants to verify a transaction, it requests a **Merkle proof** — the hash path from the transaction to the root. This enables verification of specific transactions without having to download the entire blockchain, drastically saving bandwidth and storage. Merkle Tree also ensures data integrity — changing a single transaction will alter the root hash, so tampering is detected immediately.
