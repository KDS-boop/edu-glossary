---
term: "Crypto Market Capitalization"
shortDefinition: "An estimate of the market value of a cryptocurrency based on its price multiplied by the number of units counted as circulating."
metaDescription: "Learn how crypto market capitalization is calculated, how circulating supply differs from total and maximum supply, and why the metric has limits."
category: "Blockchain"
letter: "C"
updatedDate: 2026-10-07
relatedTerms: ["Cryptocurrency", "Tokenomics", "Stablecoin", "Total Value Locked (TVL)", "On-Chain Data", "Blockchain"]
---

Crypto market capitalization is an estimate of the value assigned by the market to a cryptocurrency or token. The common calculation is:

**Market capitalization = current token price x circulating supply**

If a token trades at a certain price and the methodology counts a certain number of units as circulating, multiplying those values produces the reported market cap. For the total crypto market, data providers add the market caps of the assets included in their coverage. The result is a measurement convention, not a cash balance held by a project and not a guarantee that every unit could be sold at the quoted price.

## Which Supply Is Counted?

Supply definitions are central to the calculation. **Circulating supply** attempts to count units that are available to the public and usable in the market. **Total supply** usually describes units that exist, including some that may be locked, reserved, or otherwise unavailable. **Maximum supply** is a protocol or policy limit, when one exists, on how many units can eventually be created.

A token with future emissions, vesting allocations, treasury holdings, or lost units can have different circulating-supply estimates depending on the data provider's rules. Wrapped assets, bridged representations, and tokens held by contracts also require classification decisions. A transparent provider should explain what it includes, what it excludes, and how it updates the number.

## How Prices Are Collected

The price used in a market-cap calculation is commonly derived from trading venues and aggregated across markets. Data providers may filter out markets with weak liquidity, stale prices, unusual activity, or unreliable reporting. They can also use volume-weighted calculations or other rules to reduce the effect of a single exchange.

Different sources may therefore report different market caps for the same asset. Differences can come from the price timestamp, the list of venues, the definition of circulating supply, the treatment of wrapped or locked units, and the currency conversion rate. A market-cap number should be read together with the provider's methodology rather than treated as a universal fact with no assumptions.

## Market Cap Compared With Other Metrics

Market cap is not the same as trading volume. Volume measures the value of trades during a period, while market cap is a point-in-time estimate of all counted units. An asset can have a large market cap and low available liquidity, or high volume and a much smaller market cap.

Market cap is also different from fully diluted valuation, which multiplies the current price by a larger future or maximum supply estimate. Comparing market cap with fully diluted valuation can show how much supply may still enter circulation, but it does not predict whether the price or supply will stay unchanged.

[Total Value Locked (TVL)](/glossary/total-value-locked) measures assets counted inside protocol contracts and is therefore not a substitute for a token's market cap. A protocol token can have a market cap without users depositing it in a DeFi application, and a DeFi protocol can hold assets that are not its own token. [On-Chain Data](/glossary/on-chain-data) can help verify balances and transfers, but it does not by itself determine the correct market price or classify every address.

## Why the Number Has Limits

Market cap assumes that one observed price can be applied to all counted units. In a deep market, that may be a useful summary. In a thin market, selling a large quantity could move the price substantially, so the displayed market cap may be much larger than the cash that could actually be raised. It also does not measure a project's revenue, security, governance quality, adoption, legal claims, or the value of a service.

Stablecoins introduce another nuance. A stablecoin's market cap may approximate the number of units in circulation multiplied by its reference price, but the number does not prove the quality or liquidity of reserves. A token's market cap can also change when supply is minted, burned, unlocked, or reclassified even if its price is unchanged.

Market capitalization is most useful as one standardized way to organize and compare assets under a stated methodology. It should not be used alone to decide whether an asset is cheap, expensive, safe, or suitable for a particular person.

### Does a larger market cap mean a cryptocurrency is safer?

No. It can indicate a larger reported value, but security depends on the protocol, custody, market structure, software, governance, and many other factors.

### Why do two websites show different market caps?

They may use different prices, supply estimates, exchange coverage, update times, or inclusion rules. Check each provider's methodology before comparing numbers.

### What is market-cap dominance?

Dominance is an asset's reported market cap divided by the total market cap of the selected asset set. The result depends on both the asset's data and the provider's definition of the total market.
