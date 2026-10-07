---
term: "Total Value Locked (TVL)"
shortDefinition: "The estimated value of assets counted as deposited or locked in the smart contracts of a DeFi protocol or ecosystem."
metaDescription: "Understand Total Value Locked, how DeFi data providers calculate it, why prices and deposits both affect it, and what TVL cannot show."
category: "Blockchain"
letter: "T"
updatedDate: 2026-10-07
image: "./images/total-value-locked.svg"
imageAlt: "Total Value Locked concept illustration showing assets deposited into a protocol and the reported TVL metric."
relatedTerms: ["Decentralized Finance (DeFi)", "Decentralized Exchange (DEX)", "Smart Contract", "Stablecoin", "On-Chain Data", "Crypto Market Capitalization"]
---

Total Value Locked, usually abbreviated TVL, is a metric used to describe the value of assets counted as deposited in the smart contracts of a decentralized finance protocol or ecosystem. The assets may support lending markets, trading pools, staking-like contracts, vaults, or other applications. Data providers commonly express TVL in a reference currency so that assets with different units can be summarized in one number.

The word locked can be misleading. It does not always mean that funds are subject to a fixed time lock. In many protocols, users can withdraw when the contract rules allow it, provided that liquidity, collateral, and other conditions are available. TVL describes how an analyst classifies contract-held assets; it does not by itself describe a legal claim, a guarantee of liquidity, or the safety of the protocol.

## How TVL Is Calculated

A basic calculation identifies token balances associated with a protocol's contracts, assigns a price to each token, and adds the resulting values. The process sounds simple but requires many methodology decisions:

- Which contract addresses belong to the protocol?
- Which assets count as deposits rather than operational balances or unissued tokens?
- Which price source and timestamp should be used?
- How should bridged, wrapped, staked, borrowed, or receipt tokens be classified?
- How can the same underlying asset be prevented from being counted twice?

DefiLlama, an established open data provider, describes TVL as the value of tokens locked in protocol contracts and documents exclusions such as unissued vesting tokens and certain native staking balances. Other providers may make different decisions. A TVL chart is therefore most useful when its definitions and adapters are understood.

## Protocol and Chain TVL

For a protocol, TVL usually refers to assets held in the contracts that implement that protocol. For a blockchain, a dashboard may add the TVL of protocols attributed to that chain. The chain total can include many different applications and may not be directly comparable with one protocol's figure.

Cross-chain systems require extra care. A bridge can hold assets on one chain that represent value on another, and a protocol can let users move positions between networks. Counting the same economic position on both sides can inflate an aggregate unless the methodology has a specific rule. Receipt tokens can create a similar double-counting problem when a deposit token is deposited again into another contract.

## TVL Changes Without New Deposits

TVL is usually valued at current or recent token prices. If the amount of tokens in a contract stays constant but the price falls, the reported TVL falls too. If the price rises, TVL can rise without any new capital entering. Some dashboards therefore separate TVL from inflow, outflow, balance, or net-deposit metrics.

This distinction matters when interpreting activity. A decline in TVL could reflect withdrawals, falling asset prices, a bridge transfer, a contract migration, or a data-label change. A rise could reflect deposits, appreciation, incentives, or the addition of a newly tracked contract. The metric should be read alongside token balances, transaction history, volume, fees, active addresses, and loan data.

## What TVL Does Not Measure

TVL is not market capitalization, revenue, trading volume, number of users, or protocol security. A protocol can report high TVL while having low trading activity, concentrated deposits, weak code, or limited immediately available liquidity. Some assets in a contract may be borrowed, volatile, or exposed to the same underlying risk. TVL also does not show whether depositors earned a return or whether the protocol's governance is trustworthy.

In [Decentralized Finance (DeFi)](/glossary/decentralized-finance), TVL can be a helpful scale indicator, especially when comparing a protocol's historical footprint under a consistent methodology. It is not a score of quality and should not be used as a standalone basis for a financial decision.

### Is TVL the same as assets under management?

It is sometimes used as a rough comparison, but the terms are not identical. TVL counts contract-held cryptoassets under a data methodology, while assets under management usually refers to a regulated or contractual management relationship.

### Does high TVL mean withdrawals are always available?

No. Withdrawal ability depends on the contract, pool liquidity, collateral rules, network conditions, and any pauses or restrictions.

### Why can TVL differ between dashboards?

Providers can use different contract lists, price sources, token classifications, bridge rules, and double-counting controls. Always check the methodology before comparing figures.
