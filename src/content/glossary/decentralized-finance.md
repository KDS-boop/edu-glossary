---
term: "Decentralized Finance (DeFi)"
shortDefinition: "Financial applications and protocols that use blockchains and smart contracts to provide services without relying on one traditional central intermediary."
metaDescription: "Learn how decentralized finance uses blockchains, smart contracts, liquidity, and composability for exchanges, lending, and other financial services."
category: "Blockchain"
letter: "D"
updatedDate: 2026-10-07
image: "./images/decentralized-finance.svg"
imageAlt: "Decentralized finance concept illustration showing users, protocols, and liquidity connected by smart contracts."
relatedTerms: ["Blockchain", "Decentralization", "Smart Contract", "Decentralized Exchange (DEX)", "Stablecoin", "Total Value Locked (TVL)"]
---

Decentralized Finance, usually called DeFi, is an ecosystem of financial applications built with distributed ledger technology and [Smart Contracts](/glossary/smart-contract). These applications can provide functions such as exchanging assets, lending, borrowing, derivatives, payments, and asset management without requiring one bank or broker to operate the entire service. Users interact with contracts, wallets, and interfaces rather than only with a traditional centralized institution.

The word decentralized describes an architectural goal, not a binary label. A protocol may have permissionless contracts while relying on a small group for governance, an upgrade key, an oracle, a website, or a stablecoin issuer. DeFi services should therefore be evaluated component by component: who controls the code, who supplies data, who can pause activity, and where users bear risk.

## The DeFi Building Blocks

The settlement layer is a [Blockchain](/glossary/blockchain) that records transactions and contract state. The application layer contains smart contracts that implement rules for pools, markets, collateral, and claims. Interfaces such as websites and wallets make those contracts easier to use, but the interface is not necessarily the protocol itself.

DeFi applications often use composability. One contract can call another contract, allowing a lending market to accept a token from an exchange or a structured product to combine several primitives. Composability can make new services possible, but it also means a failure in one dependency can affect many connected applications.

Common building blocks include:

- **Decentralized exchanges** use pools or order books to match trades without a conventional exchange custodian.
- **Lending markets** let users supply assets, borrow against collateral, and follow rules for interest and liquidation.
- **Stablecoins** provide tokens intended to track a reference value and are widely used as payment or collateral units.
- **Derivatives protocols** represent contracts whose value depends on an underlying asset or condition.
- **Liquid staking and asset management** represent claims on deposited or staked positions, adding another layer of contract risk.

## A Typical DeFi Transaction

A user connects a wallet to an interface, chooses an operation, reviews the contract call, and signs a transaction. Validators or other network participants process the transaction. The smart contract checks conditions such as balances, collateral ratios, permissions, and available liquidity. If the conditions are satisfied, the contract updates its state and emits events that applications can index.

The user may pay a network fee even when an operation fails, because the network still performed computation. The final result depends on the block in which the transaction is included. On public chains, pending transactions may also be visible to other participants, creating risks related to transaction ordering and [On-Chain Data](/glossary/on-chain-data).

## Measuring DeFi Activity

[Total Value Locked (TVL)](/glossary/total-value-locked) is a common measure of the assets counted as deposited in protocol contracts. It can provide context about the size of a protocol, but it is not the same as revenue, trading volume, user count, or the amount that can be withdrawn immediately. TVL can change because asset prices move even when no one deposits or withdraws.

Other useful measures include fees, revenue, active addresses, outstanding loans, liquidation volume, and transaction counts. Each metric needs a definition and a method. Comparing protocols without checking what is included can create a misleading picture.

## Benefits and Risks

DeFi can make financial software globally accessible, composable, and transparent at the transaction layer. It can reduce dependence on some intermediaries, allow users to retain control of keys, and make rules inspectable in code. These properties do not make a protocol automatically fair, private, or secure.

Risks include smart contract bugs, malicious upgrades, oracle manipulation, bridge failures, liquidity shortages, liquidations, unstable collateral, governance concentration, and phishing. Users can also lose access through a compromised key or approve a contract to move tokens. Regulatory obligations may apply to developers, operators, interfaces, issuers, or users depending on the activity and jurisdiction.

## Permissionless Access and Composability

A major DeFi design characteristic is that a user can often interact directly with public smart contracts rather than opening a traditional financial account. This can reduce friction for compatible wallets and applications, but it does not remove the need for technical knowledge. Users must still understand network fees, transaction signing, token approvals, collateral rules, and the consequences of interacting with unfamiliar contracts.

Composability means that DeFi protocols can be combined like software components. A liquidity pool can provide assets to a lending market, while a lending position can become collateral for another application. This modularity encourages experimentation, but it creates dependency chains. An upstream oracle, bridge, stablecoin, or token contract can become a critical point of failure for several downstream systems.

## Liquidity, Collateral, and Liquidation

Many DeFi systems depend on liquidity. A DEX needs sufficient liquidity for swaps, while lending protocols need enough available assets for withdrawals and enough collateral to absorb losses. Liquidity is not identical to TVL: a dashboard can report substantial contract-held assets even when those assets are concentrated, volatile, or otherwise unsuitable for immediate execution.

Lending protocols commonly use collateral ratios and liquidation thresholds. When the value of collateral falls relative to an outstanding loan, a position can become eligible for liquidation according to the protocol's rules. Liquidation mechanisms are designed to protect solvency, but during rapid market moves they can create additional market pressure and losses for borrowers.

## Oracles and External Information

Blockchains cannot natively observe every off-chain fact. DeFi protocols therefore use oracles when a contract needs information such as an asset price. Oracle systems can aggregate data from multiple sources, use cryptoeconomic mechanisms, or rely on designated publishers.

Oracle design is a critical part of protocol security. If a contract accepts a manipulated or stale price, collateral valuation and liquidation decisions can become incorrect. Reviewing a DeFi application therefore requires looking beyond its core contracts and identifying the external data dependencies that influence state changes.

## Governance and Upgradeability

Not every DeFi protocol is immutable. Contracts can sometimes be upgraded, paused, or parameterized by governance votes, multisignature wallets, administrators, or other control mechanisms. These controls can be valuable for responding to bugs, but they create governance and operational dependencies.

When evaluating a protocol, ask who can change contract code, change risk parameters, freeze activity, move treasury assets, or replace an oracle. The answer may reveal a practical concentration of control even when the user-facing application is described as decentralized.

## Measuring DeFi Beyond TVL

TVL is one useful starting point, but a deeper analysis can include trading volume, fees, revenue, liquidity depth, outstanding loans, utilization, liquidation activity, active addresses, transaction counts, and changes in supply. These measures answer different questions and should not be substituted for one another.

For example, high TVL with low utilization tells a different story from high borrowing activity with modest TVL. A rise in fees can come from more users, larger trades, or unusually volatile market conditions. Good DeFi analysis therefore states the metric definition, period, chain coverage, and data source before drawing conclusions.

## DeFi as Financial Infrastructure

DeFi is better understood as a programmable financial infrastructure than as a single application. A user-facing interface can combine wallets, smart contracts, token standards, price feeds, and liquidity venues into one workflow. Beneath the interface, each component can be independently governed and upgraded.

This modularity is valuable for developers. New applications can reuse established contracts rather than rebuilding every primitive from scratch. It also creates a technical due-diligence problem: the security of the overall workflow can be limited by the least reliable dependency. A stablecoin, bridge, oracle, or external protocol can become a critical component even when it is not visible in the interface.

## Composability Versus Complexity

Composability increases the number of possible financial strategies, but it also increases system complexity. A transaction may call several contracts, move multiple tokens, and depend on a price feed within one block. The result can be difficult to understand from the final wallet balance alone.

For technical analysis, trace the transaction path and identify every contract that can affect the outcome. Check approvals, external calls, upgrade permissions, price dependencies, and failure behavior. This is particularly important when an interface presents a complex multi-step strategy as a single action.

## DeFi Data Requires Context

DeFi dashboards can make activity appear simple by reducing complex contract behavior to metrics. Researchers should ask what the dashboard counts, which chains are included, how duplicate positions are handled, and whether prices or labels are applied.

A strong analysis reports both the number and its definition. For example, "TVL" and "trading volume" are not interchangeable, and neither should be interpreted as a direct measure of user welfare, protocol safety, or profitability. Methodology is part of the metric.

### Is DeFi the same as cryptocurrency?

No. Cryptocurrency is a category of digital assets. DeFi is a set of applications and protocols that may use several cryptocurrencies and blockchains to provide financial functions.

### Is DeFi always non-custodial?

No. Many protocols are designed so users keep control of keys, but interfaces, bridges, stablecoin issuers, and related services can introduce custodial or centralized dependencies.

### Does DeFi eliminate financial risk?

No. It changes how services are implemented and where risks appear. Code, collateral, liquidity, governance, market structure, and legal arrangements all still matter.
