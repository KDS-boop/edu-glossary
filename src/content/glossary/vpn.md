---
term: "VPN"
shortDefinition: "A technology that creates an encrypted tunnel between a user's device and a remote server, masking the user's IP address and protecting data from interception."
category: "Cybersecurity"
letter: "V"
updatedDate: 2026-09-21
relatedTerms: ["Firewall", "End-to-End Encryption"]
---

A VPN (Virtual Private Network) extends a private network across a public network by encrypting all traffic between the user's device and a VPN server. From the outside, the user's traffic appears to originate from the VPN server's location rather than their actual device, and the encrypted tunnel prevents network operators, ISPs, or attackers on the same network from reading the data.

VPNs are used by individuals seeking privacy on public Wi-Fi, remote workers accessing corporate networks, and organizations that need to encrypt traffic between office locations. The technology is mature and widely available, though its effectiveness depends on the trustworthiness of the VPN provider.

## How a VPN Works

1. The user's device establishes a connection to a VPN server using a VPN protocol.
2. The device and server perform a key exchange to establish a shared encryption key.
3. All subsequent traffic between the device and server is encrypted using that key.
4. Traffic exits the VPN server to its final destination, appearing to come from the server's IP address.

To an outside observer — such as a public Wi-Fi operator — the traffic appears as encrypted data flowing to a single IP address (the VPN server). They cannot see which websites the user visits or what data is transmitted.

## Common VPN Protocols

**OpenVPN** is an open-source protocol that runs on TCP or UDP. It is widely considered the most versatile and audited VPN protocol, supported by nearly every VPN provider. It uses OpenSSL for encryption, offering strong security with configurable cipher suites.

**WireGuard** is a newer, simpler protocol that has gained significant adoption since its inclusion in the Linux kernel in 2020. It uses modern cryptographic primitives (ChaCha20, Curve25519) and has a much smaller codebase (~4,000 lines vs. OpenVPN's ~600,000), making it easier to audit. It generally offers faster connection establishment and better performance than OpenVPN.

**IKEv2/IPsec** is commonly used on mobile devices. It reestablishes the VPN connection automatically when the device switches between networks (e.g., from Wi-Fi to cellular), making it well-suited for mobile use.

## What a VPN Protects Against

**Eavesdropping on public networks.** Without a VPN, anyone on the same Wi-Fi network (coffee shop, airport) can potentially intercept unencrypted traffic using packet sniffing tools. A VPN encrypts all traffic, making intercepted data unreadable.

**IP-based tracking.** Websites and services see the VPN server's IP address instead of the user's real IP, making it harder to correlate browsing activity with a specific individual.

**ISP surveillance.** Without a VPN, the Internet Service Provider can see which websites the user visits and when. A VPN encrypts traffic between the device and the VPN server, hiding this from the ISP.

## What a VPN Does Not Protect Against

**Endpoint compromise.** If the device itself is infected with malware, the VPN provides no protection — the malware operates on the device before encryption occurs.

**Browser fingerprinting.** Even with a VPN, websites can identify users through browser fingerprinting (screen resolution, installed fonts, browser version). A VPN hides the IP address but does not prevent this technique.

**VPN provider trust.** The VPN provider can see all unencrypted traffic passing through its servers. A malicious or legally compelled provider can log browsing activity. Choosing a provider with a verified no-logs policy (independently audited) is essential.

**DNS leaks.** If the VPN does not route DNS queries through the encrypted tunnel, the user's DNS lookups can reveal which websites they visit, even though the traffic itself is encrypted.

## Choosing a VPN Provider

Key factors include: a verified no-logs policy (ideally independently audited), jurisdiction (some countries require VPN providers to retain logs), server locations (more locations = better performance and more IP options), supported protocols (WireGuard or OpenVPN minimum), and transparent ownership. Free VPN services frequently monetize through data collection, making them counterproductive for privacy-conscious users.
