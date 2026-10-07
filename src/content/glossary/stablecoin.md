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

### Are stablecoins guaranteed to stay at one dollar?

No. A one-dollar target is a design objective. Market conditions, reserve arrangements, redemption rules, and technical failures can cause a stablecoin to trade away from its target.

### Are stablecoins the same as central bank digital currencies?

No. A stablecoin is generally issued by a private organization or protocol, while a central bank digital currency would be a liability of a central bank. Their legal status, governance, settlement arrangements, and risk profiles differ.

### Are stablecoins always safer than other cryptocurrencies?

They may have less price volatility against their reference asset, but they add reserve, issuer, redemption, smart contract, and regulatory risks. Lower price volatility does not remove those risks.
