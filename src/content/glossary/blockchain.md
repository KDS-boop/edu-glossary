---
term: "Blockchain"
shortDefinition: "A decentralized digital ledger that records transactions across many computers simultaneously."
metaDescription: "A blockchain is a decentralized digital ledger that records transactions across many computers. Learn how blockchain technology works and its applications."
category: "Blockchain"
letter: "B"
updatedDate: 2026-09-27
relatedTerms: ["Consensus Mechanism", "Decentralization", "Merkle Tree", "Proof of Work", "SHA-256", "Proof of Stake", "Smart Contract", "Hash Function"]
---

Blockchain is a data structure that stores transaction records in the form of "blocks" that are linked together chronologically and cryptographically secured. Each block contains the hash (a fixed-length digital fingerprint) of the previous block, creating a chain where altering any historical record would require recomputing every subsequent block — a task that is computationally infeasible on a sufficiently large network.

This property — immutability — is what makes blockchain valuable: once data is recorded and confirmed by the network, it cannot be changed or deleted without detection. Any attempt to modify a block changes its hash, which breaks the chain and is immediately rejected by other nodes.

## How Blockchain Works

The fundamental process involves several steps:

1. **Transaction creation**: A user initiates a transaction (sending cryptocurrency, executing a smart contract, recording data)
2. **Broadcasting**: The transaction is broadcast to the network of nodes
3. **Validation**: Nodes validate the transaction according to consensus rules
4. **Block formation**: Validated transactions are grouped into a candidate block
5. **Consensus**: Nodes agree on the block's validity through a consensus mechanism
6. **Chain addition**: The new block is added to the blockchain
7. **Distribution**: The updated chain is propagated to all nodes

Every node maintains its own copy of the complete blockchain. This distributed nature ensures no single point of failure and makes the system resilient to attacks.

## Blockchain Anatomy

Each block contains:
- **Header**: Metadata including version, timestamp, previous block hash, Merkle root, nonce, and difficulty target
- **Transaction list**: The actual data being recorded

The **previous block hash** creates the cryptographic link between blocks. Changing any data in a historical block would change its hash, which would invalidate all subsequent blocks — requiring recalculation of all proof-of-work or re-staking of all validators.

## Types of Blockchains

### Public Blockchains
Open to anyone to join, read, write, and validate:
- **Bitcoin**: First blockchain, focused on digital currency
- **Ethereum**: Smart contract platform enabling DeFi and dApps
- **Solana**: High-throughput blockchain for applications
- **Cardano**: Research-driven approach to blockchain

Public blockchains prioritize decentralization and censorship resistance over speed and privacy.

### Private Blockchains
Restricted access, controlled by a single organization:
- **Hyperledger Fabric**: Enterprise-grade permissioned blockchain
- **R3 Corda**: Designed for financial institutions
- **Corda Enterprise**: Private version of Corda

Private blockchains prioritize efficiency and privacy over decentralization.

### Consortium Blockchains
Controlled by a group of organizations rather than a single entity:
- Used by banking consortia for interbank settlements
- Supply chain networks with multiple stakeholders
- Industry-specific collaboration platforms

### Hybrid Blockchains
Combine public and private elements:
- Public verification with private transactions
- Selective data disclosure
- Flexible privacy controls

## Key Properties

**Decentralization**: No single entity controls the network. Power is distributed among participants.

**Immutability**: Once recorded, data cannot be altered without detection. Creates trustless verification.

**Transparency**: All transactions are visible to network participants (amount varies by blockchain type).

**Security**: Cryptographic techniques protect data integrity and participant identities.

**Auditability**: Complete transaction history is available for verification.

**Fault tolerance**: Network continues operating even if some nodes fail.

## Consensus Mechanisms

Blockchains use consensus mechanisms to agree on the valid state:

**Proof of Work (PoW)**: Miners compete to solve computational puzzles. Used by Bitcoin. Energy-intensive but battle-tested.

**Proof of Stake (PoS)**: Validators stake cryptocurrency to participate. Used by Ethereum. More energy-efficient.

**Delegated Proof of Stake (DPoS)**: Token holders vote for delegates. Faster but more centralized.

**Practical Byzantine Fault Tolerance (PBFT)**: Multi-round voting consensus. Used in permissioned blockchains.

The choice of consensus mechanism affects security, speed, decentralization, and energy consumption.

## Smart Contracts and dApps

**Smart contracts** are programs stored on blockchain that execute automatically when conditions are met. They enable complex applications beyond simple transactions.

**Decentralized applications (dApps)** run on blockchain infrastructure:
- **DeFi**: Decentralized finance protocols
- **NFTs**: Digital collectibles and assets
- **DAOs**: Decentralized autonomous organizations
- **Games**: Blockchain-based gaming platforms
- **Identity**: Self-sovereign identity systems

Smart contracts have been estimated to have lost over $3 billion to exploits since 2018, highlighting the importance of security audits.

## Real-World Applications

### Finance
- Cross-border payments (faster, cheaper than traditional banking)
- Remittances (lower fees)
- Decentralized lending and borrowing
- Tokenization of real-world assets

### Supply Chain
- Product provenance tracking
- Anti-counterfeiting
- Automated payments on delivery
- Compliance verification

### Healthcare
- Medical records management
- Drug traceability
- Clinical trial data integrity
- Patient consent management

### Government
- Voting systems
- Land registry
- Identity verification
- Public procurement

### Intellectual Property
- Copyright registration
- Royalty distribution
- Authenticity verification
- Licensing management

## Scalability Challenges

Blockchains face the **scalability trilemma** — it's difficult to achieve decentralization, security, and scalability simultaneously:

**Layer 1 solutions**: Protocol-level improvements
- Sharding (dividing the network into parallel chains)
- Larger block sizes
- Faster block times
- Improved consensus algorithms

**Layer 2 solutions**: Built on top of existing blockchains
- Lightning Network (Bitcoin payment channels)
- Rollups (Ethereum scaling solutions)
- Sidechains (parallel blockchains)
- State channels

**Layer 3 solutions**: Application-specific optimizations

## Security Considerations

**51% attacks**: Controlling majority of network hash rate or stake to rewrite history. Economically prohibitive for large networks.

**Smart contract bugs**: Vulnerabilities in contract code can lead to fund loss. Audits and formal verification reduce risk.

**Private key management**: Losing private keys means losing access to assets. Hardware wallets and multi-signature solutions help.

**Bridge vulnerabilities**: Cross-chain bridges have been exploited for billions. They remain a significant risk.

**Exchange hacks**: Centralized exchanges are attractive targets. Not blockchain vulnerabilities per se, but affect user confidence.

## Regulatory Landscape

Regulation varies globally:
- **United States**: SEC, CFTC oversight; evolving guidance
- **European Union**: MiCA regulation providing comprehensive framework
- **Asia**: Mixed approaches from ban (China) to embrace (Singapore, Japan)
- **Developing nations**: Some adopting blockchain for financial inclusion

Regulatory clarity is improving but remains a challenge for enterprise adoption.

## Future Trends

**Interoperability**: Cross-chain communication protocols (Polkadot, Cosmos)
**Central Bank Digital Currencies (CBDCs)**: Government-issued digital currencies
**Green blockchain**: Proof of Stake adoption reducing energy concerns
**Institutional adoption**: Traditional finance integrating blockchain
**Quantum resistance**: Preparing for quantum computing threats
**Identity solutions**: Self-sovereign identity on blockchain

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
