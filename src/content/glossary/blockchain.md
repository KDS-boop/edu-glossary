---
term: "Blockchain"
shortDefinition: "A decentralized digital ledger that records transactions across many computers simultaneously."
category: "Blockchain"
letter: "B"
updatedDate: 2026-09-01
relatedTerms: ["Consensus Mechanism", "Decentralization", "Merkle Tree", "Proof of Work", "SHA-256", "Proof of Stake", "Smart Contract", "Hash Function"]
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

## Frequently Asked Questions

### What is the difference between a blockchain and a database?
A database is typically centralized — controlled by one organization that can modify, delete, or override records. A blockchain is decentralized and append-only: once data is written and confirmed by the network, it cannot be altered without detection. Databases prioritize speed and control; blockchains prioritize trustlessness and auditability.

### How does Proof of Work differ from Proof of Stake?
Proof of Work (PoW) requires miners to solve computational puzzles to propose blocks — energy-intensive but battle-tested (Bitcoin). Proof of Stake (PoS) selects validators based on the amount of cryptocurrency they stake as collateral — far more energy-efficient (Ethereum post-Merge). Both achieve consensus but with different security models and resource requirements.

### Can a blockchain be hacked?
The blockchain protocol itself (consensus, cryptography) is extremely hard to attack — a 51% attack on a major network would cost billions. However, vulnerabilities often exist at the *application layer*: smart contract bugs, bridge exploits, private key theft, or exchange hacks. "Blockchain hacks" are almost always smart contract or infrastructure failures, not protocol breaks.

### What is a smart contract?
A smart contract is self-executing code stored on a blockchain that automatically enforces the terms of an agreement when predefined conditions are met. It runs exactly as programmed, without intermediaries. Common uses: token transfers, decentralized exchanges, lending protocols, and NFTs.

### Why do public blockchains need tokens/coins?
Tokens provide economic incentives for network security. In PoW, miners earn block rewards and fees. In PoS, validators stake tokens and earn rewards for honest behavior; dishonest behavior risks slashing (losing staked tokens). The token aligns economic incentives with protocol integrity — without it, there's no reason for participants to secure the network.
