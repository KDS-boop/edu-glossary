---
term: "Blockchain"
shortDefinition: "A decentralized digital ledger that records transactions across many computers simultaneously."
category: "Blockchain"
letter: "B"
updatedDate: 2026-09-01
relatedTerms: ["Consensus Mechanism", "Decentralization", "Merkle Tree", "Proof of Work", "SHA-256"]
---

Blockchain is a data structure that stores transaction records in the form of "blocks" that are linked together chronologically and cryptographically secured. Each block contains the hash (a fixed-length digital fingerprint) of the previous block, creating a chain where altering any historical record would require recomputing every subsequent block — a task that is computationally infeasible on a sufficiently large network.

This property — immutability — is what makes blockchain valuable: once data is recorded and confirmed by the network, it cannot be changed or deleted without detection. Any attempt to modify a block changes its hash, which breaks the chain and is immediately rejected by other nodes.

## How It Works

1. New transactions are broadcast to the network and collected into a candidate block.
2. Nodes in the network validate the transactions and compete to solve a computational puzzle (in Proof of Work systems) or are selected to propose blocks (in Proof of Stake systems) through a consensus mechanism.
3. Once a node produces a valid block, other nodes verify it independently and add it to their copy of the chain.
4. Every node maintains its own full copy of the ledger. Discrepancies between copies are resolved by the consensus protocol, which ensures all honest nodes eventually agree on the same history.

The result is a shared, tamper-evident record that no single participant controls.

## Public vs. Private Blockchains

Blockchains differ in who can participate and who can read the data:

- **Public blockchains** (Bitcoin, Ethereum) are open to anyone. Anyone can join the network, run a node, and read the full transaction history. Security comes from the large number of independent participants.
- **Private or permissioned blockchains** (Hyperledger Fabric, R3 Corda) restrict who can join and what they can see. Often used in enterprise settings where participants need to control access to sensitive data while still benefiting from a shared, tamper-evident ledger.

The trade-off is between openness and control: public blockchains maximize trust through transparency, while permissioned blockchains prioritize privacy and regulatory compliance.

## Common Uses

- **Cryptocurrencies** (Bitcoin, Ethereum) — transferring digital assets without a central authority.
- **Smart contracts** — self-executing code that enforces agreements automatically when conditions are met.
- **Supply chain tracking** — recording the provenance and movement of goods across multiple parties.
- **Decentralized identity** — giving individuals control over their own credentials without relying on a central issuer.
