---
term: "Cryptocurrency"
shortDefinition: "A digital asset that uses cryptography and a blockchain or similar distributed ledger to record ownership and transfers."
metaDescription: "Learn what cryptocurrency is, how blockchain networks record transfers, how coins differ from tokens, and what custody and network risks mean."
category: "Blockchain"
letter: "C"
updatedDate: 2026-10-07
image: "./images/cryptocurrency.svg"
imageAlt: "Cryptocurrency concept illustration showing a digital asset moving between a wallet, blockchain network, and ledger."
relatedTerms: ["Blockchain", "Decentralization", "Proof of Stake", "Smart Contract", "Stablecoin", "Tokenomics"]
---

Cryptocurrency is a digital asset designed to be transferred, stored, or used through a cryptographic network rather than a conventional bank ledger. The record of ownership is maintained by a blockchain or another distributed ledger, and network participants use a [Consensus Mechanism](/glossary/consensus-mechanism) to agree on which transactions are valid. The word combines cryptography, which protects messages and authorization, with currency, although not every cryptocurrency functions as money in everyday use.

## How Cryptocurrency Works

When someone sends cryptocurrency, the transaction is signed with a private key and broadcast to the network. The corresponding public address can be shared so other participants know where to send assets, but the private key must remain secret because it authorizes spending. Nodes check that the signature is valid, that the sender controls the balance, and that the transaction follows the network's rules.

Valid transactions are added to a block. The network's consensus process then determines whether that block becomes part of the canonical ledger. In Proof of Work, miners compete with computation; in [Proof of Stake](/glossary/proof-of-stake), validators commit assets and participate in proposing or confirming blocks. Once enough confirmations or finality conditions are reached, the transaction is considered settled according to that network's rules.

The result is a shared history that does not require one company to keep the only authoritative database. A [Blockchain](/glossary/blockchain) can make records auditable and difficult to alter, but it does not guarantee that every application built on it is safe or that a transaction can be reversed.

## Coins, Tokens, and Stablecoins

A coin is generally the native asset of its own blockchain. Bitcoin is native to Bitcoin, while ether is native to Ethereum and is used to pay for computation and transactions on that network. A token is usually created by a smart contract on an existing blockchain. Tokens can represent access, governance rights, claims on an application, or other digital units.

[Stablecoins](/glossary/stablecoin) are a special category of cryptocurrency intended to track a reference value, often a national currency. Their price objective can make them useful for settlement or accounting inside crypto applications, but the objective depends on reserves, collateral, redemption arrangements, or algorithmic mechanisms. A stablecoin is not automatically risk-free or equivalent to a bank deposit.

## Wallets and Custody

A wallet does not usually contain the asset itself. It stores or manages the keys needed to authorize transactions and reads balances from the ledger. A self-custody wallet leaves key control with the user. A custodial exchange or service holds the keys on the user's behalf and may offer account recovery, trading, or additional services.

Self-custody reduces reliance on an intermediary but makes key management critical. Losing a seed phrase can make assets inaccessible, and malware or phishing can expose signing authority. Custodial services introduce different risks, including account restrictions, operational failures, insolvency, or unauthorized access. Good security practice includes protecting recovery material, checking transaction details before signing, and using separate accounts for different purposes.

## What Cryptocurrency Is Used For

Cryptocurrency can support peer-to-peer transfers, network fees, settlement between applications, collateral in decentralized finance, and programmable ownership records. Some networks emphasize payments, while others provide general-purpose smart contracts. A token's practical role is determined by the protocol and its applications, not simply by its name or market price.

Public ledgers can be transparent, but addresses are usually pseudonymous rather than fully anonymous. Transaction history may be analyzed by linking addresses to services or activity patterns. Users should therefore avoid assuming that a public blockchain provides the same privacy as cash or a confidential payment system.

## Limitations and Risks

Cryptocurrency networks can experience congestion, variable transaction fees, software defects, governance disputes, and chain reorganizations. Asset prices can be volatile, and market liquidity can vary widely. The legal and tax treatment of a cryptocurrency depends on jurisdiction and use. A protocol's cryptographic security also does not protect users from scams, compromised keys, faulty [Smart Contracts](/glossary/smart-contract), or misleading claims.

## Transaction Finality and Network Differences

Cryptocurrency systems do not all settle transactions in the same way. Some networks use probabilistic confirmation, where the practical confidence that a transaction will remain in the ledger increases as additional blocks are added. Others provide explicit or economic finality through their consensus rules. The meaning of a confirmation, the expected settlement time, and the cost of sending an asset therefore depend on the underlying network.

The same token symbol can also appear on several blockchains. A user may hold a native asset on one network and a bridged or wrapped representation on another. These representations can have different contract addresses, liquidity conditions, and technical risks. Before sending an asset, users should verify the destination network, token contract where relevant, and receiving address. Sending an asset through an unsupported network can make recovery difficult or impossible.

## Supply, Issuance, and Scarcity

Cryptocurrency supply rules vary considerably. Some protocols specify a maximum supply, while others allow ongoing issuance, periodic burns, or governance-controlled changes. The important question is not only how many units exist today but also how supply is created, distributed, and removed over time.

Circulating supply is an estimate of units considered available in the market under a provider's methodology. It can differ from total supply because some units may be locked, reserved, burned, or otherwise excluded. These definitions matter when comparing assets or calculating metrics such as market capitalization. A supply figure should therefore be read together with the source's methodology rather than treated as a universal accounting standard.

## Security at Different Layers

Cryptocurrency security has several distinct layers. Consensus protects the integrity of the shared ledger, cryptographic signatures protect authorization, and wallets protect or expose the keys used to sign transactions. Applications can add another layer through smart contracts, bridges, or exchange infrastructure.

A secure consensus mechanism does not prevent a user from approving a malicious contract. Likewise, a well-designed wallet cannot guarantee that an exchange, bridge, or protocol will behave correctly. Security analysis should identify the exact failure boundary: key compromise, software vulnerability, consensus attack, oracle failure, service outage, or human error.

## How to Research a Cryptocurrency

A useful research workflow starts with the primary protocol documentation and identifies the asset's native network, supply model, consensus mechanism, and transaction rules. Next, examine the token contract or ledger data where applicable, the distribution and unlock schedule, governance arrangements, and major dependencies. Finally, compare independent data providers because supply, volume, holder counts, and other derived metrics can use different methodologies.

Historical price charts alone cannot explain how a cryptocurrency works. A better technical description separates protocol facts from market observations, distinguishes on-chain records from off-chain claims, and dates any rapidly changing statistics. This approach makes an evergreen glossary definition more reliable than embedding a live market quote that becomes stale immediately.

## Common Misconceptions

Cryptocurrency is not synonymous with blockchain. Blockchain is a type of distributed-ledger technology, while cryptocurrency is an asset category that can use a blockchain or related ledger. Likewise, owning an asset on a blockchain is not the same as owning the underlying software project or the company that develops it.

Cryptocurrency is also not automatically anonymous. Public-chain transactions can be permanently observable, and repeated address use can make activity easier to associate. Privacy properties vary by network and application, so descriptions should distinguish pseudonymity, confidentiality, and anonymity.

Finally, cryptocurrency should not be treated as one uniform technology. Networks differ in consensus, execution environments, fee markets, transaction formats, security assumptions, and governance. A statement that is accurate for one network may be wrong for another.

## Key Questions When Comparing Networks

When comparing cryptocurrencies, start with the settlement model. Identify how blocks are produced, how finality is achieved, and what happens during competing transactions. Then examine execution: whether the network supports smart contracts, how fees are calculated, and what resources users compete for.

The next questions concern economics and security. Check the supply schedule, validator or miner incentives, token distribution, concentration of control, upgrade mechanisms, and major dependencies. Finally, distinguish direct observations from provider-derived metrics. A price, market capitalization, or address count can be useful, but it should always be tied to a date and methodology.

### Is cryptocurrency the same as digital money?

No. Digital money can mean any electronic representation of value, including bank balances and payment-provider balances. Cryptocurrency specifically refers to assets whose transfer and ownership are secured through cryptographic protocols and a distributed ledger.

### Does owning cryptocurrency mean owning a company?

Usually not. Holding a token may provide no ownership, voting, or claim on an issuer unless the protocol or legal agreement explicitly says so. Its rights depend on the token design and governing arrangements.

### Is cryptocurrency an investment recommendation?

No. This entry explains the technology and common uses. Whether an asset is suitable for a person requires independent research and consideration of legal, financial, security, and tax circumstances.
