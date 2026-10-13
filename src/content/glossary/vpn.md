---
term: "VPN"
shortDefinition: "A technology that creates an encrypted tunnel between a user's device and a remote server, masking the user's IP address and protecting data from interception."
metaDescription: "A VPN creates an encrypted tunnel between your device and a remote server, masking your IP address and protecting data from interception online."
category: "Cybersecurity"
letter: "V"
updatedDate: 2026-09-21
relatedTerms: ["Firewall", "End-to-End Encryption", "Symmetric Encryption", "Brute Force Attack", "SHA-256"]
image: './images/vpn.svg'
imageAlt: "VPN concept illustration: A technology that creates an encrypted tunnel between a user's device and a remote server, masking the user's IP address and protecting data from interception."
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

## Frequently Asked Questions

### Does a VPN make me anonymous online?
No. A VPN hides your IP address from websites and encrypts traffic from your ISP, but it does not provide true anonymity. Your identity can still be revealed through: login credentials, browser fingerprinting, cookies, payment information, or if the VPN provider logs your activity. For stronger anonymity, use Tor (onion routing) or combine Tor with a VPN.

### What is the difference between a VPN and a proxy?
A **proxy** forwards traffic for a specific application or protocol (e.g., HTTP proxy for web browsing) without necessarily encrypting it. A **VPN** encrypts *all* traffic at the network interface level, protecting every application on the device. Proxies are faster and simpler for single-app routing; VPNs provide system-wide privacy and security.

### Can a VPN bypass censorship and geo-restrictions?
Often, yes. By routing traffic through a server in a different country, a VPN can access content blocked in your location (streaming services, news sites, social media). However, sophisticated censorship systems (like China's Great Firewall) actively detect and block VPN traffic. Specialized protocols (Obfsproxy, V2Ray, Shadowsocks) or "stealth" VPN modes are needed in high-censorship environments.

### Should I use a free VPN?
Generally, no. Free VPNs must monetize somehow — many sell user data, inject ads, or have weak encryption. They often have data caps, slow speeds, limited server locations, and no independent audits. If privacy is your goal, a reputable paid VPN with a verified no-logs policy is worth the cost. Exceptions: Proton VPN's free tier (from the Proton Mail team) is reputable but has limitations.

### Does a VPN slow down my internet?
Yes, some slowdown is inevitable due to: encryption/decryption overhead, increased latency (traffic travels to the VPN server first), and server load. Modern protocols (WireGuard) minimize this — typically 5-15% speed reduction on nearby servers. Distant servers add more latency. For gaming or latency-sensitive apps, choose a nearby server or use split tunneling (route only specific traffic through VPN).

<!-- content-audit-expansion-v1 -->


## Corporate remote access and site-to-site use

A remote-access VPN typically connects an individual device to an organization's network, while a site-to-site VPN connects network segments, such as two offices or a cloud network and a data center. The access policy should be narrower than simply placing every remote device on the internal network. Use identity-aware authentication, multifactor authentication, device posture checks where appropriate, and per-resource authorization. A VPN connection should not automatically grant administrative access to every reachable system.

Split tunneling sends selected traffic through the VPN and other traffic directly to the internet; full tunneling routes broader traffic through the organization's gateway. Split tunneling can reduce bandwidth demand, but it changes which security controls observe traffic. Full tunneling centralizes inspection but may add latency and increase gateway capacity requirements. Select based on the threat model, business applications, privacy requirements, and support constraints.

## Verifying that the tunnel works as intended

Testing should cover IPv4 and IPv6 behavior, DNS resolution, reconnects after sleep or network changes, expired credentials, and whether routes leak traffic outside the tunnel. A kill switch can reduce exposure during a drop, but its actual behavior should be tested on supported devices. Confirm that internal services cannot be reached by an unauthorized user simply because they know a VPN hostname or IP address.

Choose protocols and software that are maintained and documented, and keep client updates current. Do not treat the country where a VPN server is located as proof of privacy or legal protection. The provider may have access to connection metadata, and a compromised endpoint can expose data before it enters the tunnel or after it exits. Browser fingerprinting, account logins, tracking cookies, and phishing remain possible.

## Operational checklist

Document who can create accounts, approve device access, revoke a lost device, rotate certificates or keys, and review connection logs. Keep logs proportionate to the security purpose and retention policy. Monitor failed logins and unusual access patterns without collecting more browsing information than necessary. For personal use, verify who operates the service, how it is funded, whether security claims have independent support, and which data the provider can observe. A VPN is a useful secure-transport control, not a universal anonymity or endpoint-protection tool.

<!-- content-audit-expansion-v3 -->


## Example: responding to a VPN incident

If an employee loses a device that has an active VPN profile, revoke the device's certificate or session, disable or rotate relevant credentials, and review recent authentication and access logs. If the device used persistent credentials, determine whether those credentials can be reused without the missing hardware. A VPN's encryption does not prevent a thief from using an already authenticated device. Remote access should therefore support revocation and have a clear lost-device procedure.

For an organization, monitor unusual connection times, repeated authentication failures, access to resources outside a user's normal role, and abrupt changes in client version or location. Correlate signals with identity-provider events and endpoint protection. Avoid blanket blocking based on a single geographic or IP signal when legitimate travel and shared networks are common; use risk-aware review and escalation.

For individual users, confirm the service's owner, jurisdiction, privacy policy, independent audit scope, and funding model. A VPN provider can often observe connection metadata and traffic leaving its servers, even though it cannot normally decrypt correctly encrypted HTTPS content. The provider becomes a party that must be trusted.

A VPN is one layer in a layered security design. Combine it with software updates, multifactor authentication, least privilege, endpoint protection, secure DNS configuration, and phishing awareness. After any configuration change, test which traffic is routed through the tunnel and which metadata remains visible to the local network, internet provider, VPN operator, and destination site.

<!-- content-audit-margin-v1 -->
## DNS, routing, and identity should be tested together

A correctly encrypted tunnel can still be misconfigured if DNS requests use an unintended resolver, IPv6 traffic bypasses the tunnel, or access routes are broader than expected. Test traffic paths on each supported operating system and client version, including reconnect behavior after a network change. Verify both what is routed through the VPN and what remains reachable outside it.

For enterprise deployments, map VPN groups to specific network segments and applications. A remote user who only needs one internal service should not receive broad access to server administration interfaces. Combine network policy with identity-based authorization and endpoint health controls, and promptly revoke access when a person changes roles or leaves the organization.

Keep protocol configurations and certificates current, and monitor failed authentication, unusual connection patterns, and unsupported clients. A VPN concentrator is itself a high-value service, so patch its software and isolate its management interface. Regularly test the incident procedure for a compromised account or lost device. These controls turn VPN access from a simple tunnel into a managed part of the organization's security architecture.
