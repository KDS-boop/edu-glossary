---
term: "On-Chain Data"
shortDefinition: "Information recorded on or derived from a blockchain, including transactions, balances, contract events, blocks, and network activity."
metaDescription: "Learn what on-chain data includes, how analysts interpret blockchain records, and why public ledger visibility does not reveal every economic fact."
category: "Blockchain"
letter: "O"
updatedDate: 2026-10-07
relatedTerms: ["Blockchain", "Smart Contract", "Decentralization", "Total Value Locked (TVL)", "Cryptocurrency", "Crypto Market Capitalization"]
---

On-chain data is information recorded on a blockchain or derived directly from its public ledger. It can include blocks, transactions, wallet balances, token transfers, smart-contract calls, emitted events, validator activity, fees, and the relationships between addresses. Analysts use this data to study how a network operates and how assets move, but the raw record still requires careful interpretation.

## What Is Recorded?

A block normally contains a set of transactions and metadata such as a timestamp, a reference to the previous block, and a cryptographic commitment to the included records. A transaction can transfer a native cryptocurrency, call a smart-contract function, deploy code, or update application state. Token balances may be represented indirectly through contract storage and transfer events rather than as a simple balance field in the block.

Indexing services collect these records and make them searchable. They may decode contract events, label addresses, group related transactions, calculate balances, and provide dashboards. The original ledger is the source of the raw record, while an indexer's labels and derived metrics are an additional analytical layer.

## Addresses Are Not Automatically People

Most public blockchain addresses are pseudonymous. A record can show that an address sent assets to another address, but it usually does not state the person's name, location, employer, or purpose. Analysts can sometimes link an address to an exchange, protocol, company, or public owner through disclosures and behavioral patterns. Those links are hypotheses or classifications that should be distinguished from the transaction itself.

The same person can control many addresses, and one service can control addresses for many customers. A contract can also move assets on behalf of users. These factors make address counts a weak substitute for user counts unless the methodology explains how entities are grouped.

## Common On-Chain Metrics

Researchers may track transaction count, transfer value, active addresses, new addresses, gas use, fees, token-holder balances, contract calls, bridge flows, or validator participation. In [Decentralized Finance (DeFi)](/glossary/decentralized-finance), dashboards can derive [Total Value Locked (TVL)](/glossary/total-value-locked), liquidity, loans, swaps, and protocol revenue from balances and events.

These metrics answer different questions. Transaction count measures recorded operations, not necessarily economic value. Transfer volume can include internal movements, exchange rebalancing, or smart-contract routing. Active addresses count addresses under a chosen definition, not verified people. TVL can change when token prices move, even without new deposits. Good analysis states the time window, chain coverage, token treatment, entity labels, and exclusions.

## On-Chain and Off-Chain Activity

Blockchain records do not contain every part of a crypto market. A centralized exchange may match trades in its internal ledger and publish only deposits and withdrawals on-chain. Orders, account balances, derivatives positions, and many business arrangements can remain off-chain. An analyst who looks only at public transfers may miss that activity or misread an exchange's internal movement as user demand.

Data can also cross chains through bridges, wrapped assets, or messaging systems. Counting both a source asset and its representation on a destination chain can overstate the amount of unique economic value. Stablecoin supply, contract balances, and token burns require similar care when units are issued, redeemed, or moved between networks.

## Uses and Limits

On-chain data supports protocol monitoring, operational alerts, compliance analysis, academic research, public auditing, and historical study. It can reveal contract usage and settlement paths more directly than a private database. A [Blockchain](/glossary/blockchain) can make the underlying record tamper-evident, but data quality still depends on the protocol, indexer, price source, and analytical assumptions.

Privacy is another consideration. Public visibility can make payments traceable even when addresses do not display legal names. Mixing services, privacy tools, encrypted metadata, and off-chain accounts can reduce observability, while mistakes in address reuse can expose relationships. Public data should not be treated as permission to infer sensitive facts about individuals.

### Is on-chain data always accurate?

The ledger records what the protocol accepted, but derived labels and metrics can be wrong or incomplete. Smart-contract bugs, reorganizations, indexer errors, price assumptions, and entity-classification mistakes all require review.

### Does on-chain data show all crypto activity?

No. It excludes or only partially represents many centralized-exchange, custodial, private, and off-chain activities.

### Can on-chain data predict prices?

It can describe historical activity and observable conditions, but it cannot guarantee future prices or outcomes. Interpretation remains uncertain and market conditions can change quickly.
