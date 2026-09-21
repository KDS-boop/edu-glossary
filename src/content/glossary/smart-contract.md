---
term: "Smart Contract"
shortDefinition: "Self-executing code stored on a blockchain that automatically enforces the terms of an agreement when predefined conditions are met."
category: "Blockchain"
letter: "S"
updatedDate: 2026-09-21
relatedTerms: ["Blockchain", "Decentralization", "Consensus Mechanism"]
---

A smart contract is a program stored on a blockchain that executes automatically when predefined conditions are satisfied. Unlike traditional contracts that rely on legal enforcement and human intermediaries, smart contracts enforce their terms through code — the blockchain network itself guarantees execution.

The term was coined by computer scientist Nick Szabo in 1997, long before practical blockchain platforms existed. Szabo's analogy was a vending machine: you insert the correct amount (condition), and the machine dispenses your drink (execution) without requiring a human clerk. Smart contracts apply this principle to complex digital agreements.

## How Smart Contracts Work

Smart contracts run on blockchain platforms that support general-purpose computation, most notably Ethereum. A developer writes the contract logic in a language like Solidity, deploys it to the blockchain, and it receives a fixed address. Anyone can interact with the contract by sending transactions to that address.

Once deployed, the code is immutable — it cannot be changed. This immutability is both a strength (no one can tamper with the contract terms) and a limitation (bugs cannot be patched after deployment without deploying a new contract at a new address).

A basic example: a smart contract could hold 1 ETH in escrow and release it to Party A if a condition is met before a deadline, or return it to Party B otherwise. No intermediary holds the funds; the code enforces the outcome.

## What Makes Smart Contracts Trustworthy

**Deterministic execution.** Given the same inputs, a smart contract always produces the same output. There is no ambiguity or discretion.

**Transparent terms.** The code is publicly visible on the blockchain. Anyone can audit the contract logic before interacting with it.

**Tamper-proof.** Once deployed, the contract code cannot be altered by any single party. The blockchain's consensus mechanism ensures all nodes execute the same code identically.

**Atomic execution.** Smart contracts either execute completely or not at all. Partial execution is not possible — this prevents states where one party fulfills their obligation but the other does not.

## Practical Applications

**Decentralized Finance (DeFi)** is the largest use category. Lending protocols (Aave, Compound) use smart contracts to pool deposits, calculate interest rates, and manage collateral liquidation automatically. Decentralized exchanges (Uniswap) use smart contracts to facilitate token swaps without a centralized order book.

**Non-fungible tokens (NFTs)** are smart contracts that track ownership and transfer rights for unique digital assets. The ERC-721 standard defines the contract interface that NFT marketplaces interact with.

**Decentralized Autonomous Organizations (DAOs)** use smart contracts to manage treasury funds, execute governance votes, and enforce organizational rules without traditional management structures.

**Supply chain management** uses smart contracts to automate payments when shipment tracking data confirms delivery milestones.

## Limitations and Risks

**Bugs are permanent.** A vulnerability in deployed code cannot be patched. The 2016 DAO hack exploited a reentrancy bug in a smart contract, resulting in the theft of 3.6 million ETH. The Ethereum community ultimately performed a hard fork to reverse the damage, but this required extraordinary coordination.

**Oracle dependency.** Smart contracts cannot access external data (price feeds, weather, sports results) on their own. They rely on **oracle services** (like Chainlink) to feed external data on-chain, introducing a trust assumption at the oracle layer.

**Gas costs.** Every computation on Ethereum costs gas, paid by the transaction sender. Complex contract logic can become expensive to execute, creating economic barriers for users.

**Legal uncertainty.** In most jurisdictions, the legal status of smart contracts remains unsettled. Code-based enforcement and legal enforcement operate in different frameworks, and courts have limited precedent for adjudicating smart contract disputes.

Despite these limitations, smart contracts represent a fundamental shift in how agreements can be structured — moving from "trust the counterparty" to "trust the code." As tooling, formal verification methods, and upgrade patterns (proxy contracts) mature, smart contracts are becoming increasingly practical for high-value, real-world applications.
