---
term: "Decentralized Exchange (DEX)"
shortDefinition: "A blockchain-based trading protocol that lets users swap digital assets through smart contracts instead of giving custody to a traditional exchange."
metaDescription: "Understand decentralized exchanges, automated market makers, liquidity pools, slippage, self-custody, and the main risks of on-chain token swaps."
category: "Blockchain"
letter: "D"
updatedDate: 2026-10-07
image: "./images/decentralized-exchange.svg"
imageAlt: "Decentralized exchange concept illustration showing a wallet, on-chain liquidity mechanism, and token swap."
relatedTerms: ["Decentralized Finance (DeFi)", "Smart Contract", "Stablecoin", "On-Chain Data", "Blockchain", "Cryptocurrency"]
---

A Decentralized Exchange, or DEX, is a protocol that lets users trade digital assets through blockchain transactions and smart contracts. Instead of depositing funds into an exchange's internal account and asking a central operator to match orders, a user generally connects a wallet, selects a trade, reviews the transaction, and authorizes a contract to execute the swap. The assets remain under the user's key control until the transaction changes ownership.

DEXs are a major part of [Decentralized Finance (DeFi)](/glossary/decentralized-finance), but they are not all built the same way. The design affects how prices are formed, how liquidity is supplied, how trades are ordered, and what risks participants take.

## Automated Market Makers

Many DEXs use an automated market maker, or AMM. An AMM holds reserves of two or more tokens in a smart-contract pool and uses a mathematical rule to quote trades. A simple constant-product pool tries to keep the product of the two reserve balances within a specified relationship. A trade adds one asset and removes another, so the pool's balance changes and the quoted price moves.

Liquidity providers deposit assets into a pool and receive a claim that represents their share. They may earn a portion of trading fees, but their result depends on trading activity, asset prices, pool rules, incentives, and the value of the assets when they withdraw. If the relative prices change, the provider can experience impermanent loss compared with simply holding the assets outside the pool.

Other DEXs use on-chain order books, concentrated-liquidity ranges, or hybrid designs. Order books resemble traditional markets but require a way to store, update, and match orders on a blockchain. Concentrated liquidity lets providers select price ranges, which can use capital more efficiently while requiring more active management.

## How a Swap Works

The trader first chooses the input and output tokens, amount, and acceptable minimum output. The interface estimates the exchange rate, network fee, price impact, and sometimes a routing path through multiple pools. The user may need to approve a token contract before the swap contract can spend the input asset. A signed transaction is broadcast and processed by the blockchain.

The final output can differ from the estimate if the market moves, another transaction is included first, or the pool has limited liquidity. Slippage settings limit how far the result may move before the transaction reverts, but they cannot make a thin market liquid. Aggregators can route a trade across several DEXs to seek a better quoted result, adding more contracts and dependencies to the transaction.

## DEXs Compared With Centralized Exchanges

A centralized exchange usually manages an internal ledger, holds customer assets, operates an order-matching system, and provides an account or withdrawal process. A DEX publishes its execution rules in contracts and uses the blockchain as the settlement layer. Centralized exchanges can offer fast matching, account recovery, and fiat services; DEXs can offer self-custody, transparent settlement, and access without the same account relationship.

Neither model removes all risk. A centralized exchange adds counterparty, custody, operational, and account-access risks. A DEX adds contract, wallet, oracle, transaction-ordering, liquidity, and token-authenticity risks. A token can also be designed so that selling is restricted or expensive even when a DEX displays it.

## Transparency and Risks

Swaps, pool balances, and contract calls produce [On-Chain Data](/glossary/on-chain-data), which can make activity auditable. Public visibility does not guarantee a correct interface, honest token code, or private identity. Addresses may be linked to people or services through external analysis.

Important risks include smart contract exploits, malicious tokens, oracle failures, bridge dependencies, front-running, sandwich attacks, congestion, and sudden liquidity changes. Users should check contract addresses through trusted documentation, understand approval permissions, review transaction details, and avoid treating a quoted price or past volume as a promise of future results.

### Does a DEX require an account?

Usually it requires a compatible wallet rather than a traditional username and password. The wallet signs transactions, while the blockchain records the resulting state.

### Are DEX trades free?

No. A trade may include a protocol fee, a liquidity-provider fee, a network transaction fee, and price impact. The exact costs depend on the network and market.

### Does a DEX guarantee the best price?

No. Price quality depends on liquidity, routing, fees, transaction timing, and execution conditions. Aggregators can compare venues, but they also introduce additional dependencies.
