---
term: "Proof of Work"
shortDefinition: "A blockchain consensus mechanism that requires miners to solve computationally intensive cryptographic puzzles to validate blocks."
category: "Blockchain"
letter: "P"
updatedDate: 2026-09-19
relatedTerms: ["Blockchain", "Consensus Mechanism", "SHA-256", "Merkle Tree"]
---

Proof of Work (PoW) is the first consensus mechanism used by Bitcoin and has been the gold standard of blockchain security for over a decade. In this system, miners compete to solve a mathematical puzzle that requires finding a specific nonce — a number that, when combined with block data and hashed, produces a value below the target set by the network.

## The Mining Process

Miners collect unconfirmed transactions into a candidate block, then try various nonce combinations through trial and error. Because SHA-256 hashing is one-way, the only way to find a valid nonce is through billions of trial attempts per second. The first miner to find a solution announces it to the network, other nodes verify it in milliseconds, and the block is added to the chain.

## Security and Cost

PoW security derives from the computational cost a malicious miner would need to expend to attack the network — they would need to control over 50% of the network's hash rate (a 51% attack), which for large networks like Bitcoin costs billions of dollars per year. However, the dark side of PoW is its enormous energy consumption — Bitcoin's estimated energy consumption is on par with that of several small countries.
