---
term: "Stablecoin"
shortDefinition: "A cryptocurrency designed to maintain a relatively stable value against a reference asset, such as a national currency or commodity."
metaDescription: "Understand stablecoins, their reserve and collateral models, how they move on blockchains, and the risks behind a stable value target."
category: "Blockchain"
letter: "S"
updatedDate: 2026-10-07
image: "./images/stablecoin.svg"
imageAlt: "Stablecoin concept illustration showing a token connected to a reference value and reserve mechanism."
relatedTerms: ["Cryptocurrency", "Decentralized Finance (DeFi)", "Decentralized Exchange (DEX)", "Smart Contract", "On-Chain Data", "Tokenomics"]
---

A stablecoin is a cryptocurrency designed to keep its value close to a reference asset. The reference is often a national currency such as the US dollar, but it can also be another asset or a rules-based target. Stablecoins try to combine the transferability of a blockchain token with a less variable unit of account. The word stable describes the objective, not a guarantee that the token will always trade at exactly the reference value.

## How Stablecoins Maintain a Target Value

Stablecoins use different designs, and the design determines what supports the target.

**Reserve-backed stablecoins** are issued against assets held by an issuer or custodian. The reserve may contain cash, deposits, short-term government securities, or other assets permitted by the arrangement. A holder's ability to redeem depends on the issuer's terms, the reserve's liquidity, legal rights, and the intermediaries involved. Attestations or reports can provide information about reserves, but readers should distinguish a description of holdings from a guarantee of redemption.

**Crypto-collateralized stablecoins** use other cryptoassets as collateral, often through [Smart Contracts](/glossary/smart-contract). Because collateral prices can move sharply, the system may require more collateral than the stablecoin value and may liquidate positions when thresholds are crossed. Oracles provide the price information needed for these rules.

**Algorithmic or under-collateralized designs** attempt to manage supply, incentives, or market operations with software and economic mechanisms. They may hold less direct collateral than a reserve-backed system. Their stability depends on assumptions about liquidity, incentives, governance, and demand, so the risks are different rather than removed.

## Issuance, Transfers, and Redemption

An issuer or protocol creates units according to its rules. The units can then move between [Cryptocurrency](/glossary/cryptocurrency) wallets and smart contracts on a supported blockchain. Transfers are recorded on-chain, and users usually pay the network's transaction fee. A centralized issuer may process redemptions through an off-chain account relationship, while a decentralized system may allow a smart contract to release collateral when conditions are satisfied.

This structure gives stablecoins several practical roles. They can act as a blockchain-native unit of account, move value between wallets, provide trading pairs on a [Decentralized Exchange (DEX)](/glossary/decentralized-exchange), and serve as collateral or settlement liquidity in [Decentralized Finance (DeFi)](/glossary/decentralized-finance). Businesses and applications can also use them for programmable payments or treasury transfers, subject to applicable law and operational controls.

## Why a Stablecoin Can Lose Its Peg

A stablecoin can trade above or below its reference value when users cannot redeem quickly, reserve assets are questioned, markets become illiquid, or demand changes abruptly. A crypto-collateralized design can face falling collateral values and liquidations. A software-based design can fail if its incentives do not produce enough demand or if governance changes the rules. Blockchain congestion, smart contract bugs, oracle errors, and exchange-specific liquidity can also affect the price observed by users.

The reference asset itself matters. A token that targets one US dollar may still expose users to inflation, banking-system dependencies, issuer risk, or legal restrictions. It can also be used on multiple chains through bridges or wrapped representations, creating additional contract and operational risks.

## Stablecoins and Transparency

On-chain balances and transfers can be inspected through [On-Chain Data](/glossary/on-chain-data), but the ledger does not show every fact needed to evaluate a stablecoin. Reserve composition, redemption obligations, custodial arrangements, beneficial ownership, and compliance processes may sit outside the chain. Conversely, a visible balance does not prove that a token is backed one-for-one by high-quality liquid assets.

Stablecoins are therefore best understood as systems with several layers: an issuer or governance process, reserve or collateral arrangements, token contracts, wallets, exchanges, and the blockchain that records transfers. Each layer can introduce different failure modes.

## Types of Stability Mechanisms

It is useful to distinguish the source of a stablecoin's stability from the asset it references. A reserve-backed token may depend on an issuer's ability to hold and manage assets that support redemption. A collateralized protocol may depend on overcollateralization, liquidation rules, and reliable price feeds. Other systems use market incentives or supply mechanisms to encourage the target price.

These structures create different dependencies. A reserve-backed stablecoin can be affected by banking access, custody arrangements, reserve liquidity, legal claims, and the operational ability to process redemptions. A crypto-collateralized stablecoin can be affected by collateral volatility, oracle delays, smart-contract bugs, and cascading liquidations. An algorithmic design can be particularly sensitive to changing demand and market confidence. The phrase stablecoin therefore identifies a target behavior, not one universal risk model.

## Liquidity and Market Structure

A stablecoin may trade on centralized exchanges, decentralized exchanges, payment systems, lending protocols, and other venues. The observed price can differ slightly between venues because liquidity, fees, trading pairs, and transaction timing differ. A temporary deviation from the reference value does not necessarily mean the underlying system has permanently failed, but it can become more serious when market depth disappears or redemption mechanisms are impaired.

Liquidity should also be separated from reserves. A reserve can contain assets that are valuable but not immediately available in the venue or currency needed for a redemption. Conversely, a market can temporarily provide trading liquidity even when questions remain about the underlying reserve arrangement. Evaluating both layers is essential.

## Multi-Chain Stablecoins

Many stablecoins circulate across multiple blockchain networks. A native issuance on one chain may be represented elsewhere through a bridge, canonical deployment, or another interoperability mechanism. Each additional chain can introduce contract, bridge, oracle, and operational considerations.

Supply statistics can therefore differ by chain and by data provider. An aggregate supply figure should explain whether it counts native deployments, bridged representations, or both. Analysts should also check whether burned, frozen, or treasury-held units are included in circulating-supply calculations. Comparing two dashboards without aligning these definitions can lead to false conclusions.

## Stablecoin Data and Transparency

Public blockchain records can show token contracts, balances, transfers, mint events, and burn events. They cannot automatically establish the legal ownership of reserve assets or the enforceability of redemption rights. Off-chain attestations, audits, reserve reports, issuer disclosures, and regulatory filings may provide additional information, but each source answers a different question.

For educational or analytical work, separate three concepts: **token supply**, **reserve backing**, and **market price**. Supply describes units recorded under a stated methodology. Backing describes assets or collateral intended to support those units. Market price describes what participants are currently paying on a venue. None of these measurements alone proves the others.

## Stability Is a System, Not a Label

A stablecoin's market behavior reflects several connected mechanisms. The token contract defines how units move and may define minting or burning rules. The issuer or protocol defines how new units are created and how holders can seek redemption. Market participants provide liquidity, while exchanges and payment systems determine where the token can be used.

A disruption in any layer can affect the target price. For example, the blockchain may operate normally while an issuer's redemption process is temporarily unavailable. Conversely, a functioning issuer cannot prevent a smart-contract vulnerability from disrupting a token's on-chain transfer mechanism. This layered view helps explain why stablecoin risk cannot be inferred from the name alone.

## Reading Stablecoin Supply Figures

A reported stablecoin market capitalization or supply should always be accompanied by a source and timestamp. Providers can differ in whether they count burned units, treasury balances, bridged representations, frozen balances, or tokens across every supported chain. A dashboard total is therefore a measurement under a methodology, not an immutable fact.

For historical comparisons, use the same provider and definitions where possible. When comparing different providers, investigate their chain coverage, asset classification, pricing method, and treatment of duplicated representations. The numbers may legitimately diverge without either provider being "wrong."

## What a Good Stablecoin Description Should State

A clear technical description identifies the reference asset, stabilization mechanism, issuer or governance model, redemption path, major collateral, supported chains, and key dependencies. It should also distinguish the token's intended value from the market price observed at a particular venue.

This matters for evergreen educational content because stablecoin markets change quickly. Current supply, volume, and price figures belong in dated data articles or live dashboards; the glossary should focus on definitions, mechanisms, and methodology.

### Are stablecoins guaranteed to stay at one dollar?

No. A one-dollar target is a design objective. Market conditions, reserve arrangements, redemption rules, and technical failures can cause a stablecoin to trade away from its target.

### Are stablecoins the same as central bank digital currencies?

No. A stablecoin is generally issued by a private organization or protocol, while a central bank digital currency would be a liability of a central bank. Their legal status, governance, settlement arrangements, and risk profiles differ.

### Are stablecoins always safer than other cryptocurrencies?

They may have less price volatility against their reference asset, but they add reserve, issuer, redemption, smart contract, and regulatory risks. Lower price volatility does not remove those risks.
