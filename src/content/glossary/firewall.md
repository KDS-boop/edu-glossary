---
term: "Firewall"
shortDefinition: "A network security system that monitors and controls incoming and outgoing data traffic based on predetermined security rules."
category: "Cybersecurity"
letter: "F"
updatedDate: 2026-09-19
relatedTerms: ["Brute Force Attack", "End-to-End Encryption", "API Gateway", "VPN"]
---

A firewall is the first line of defense in network security infrastructure. This component acts as a gateway that determines which data packets are allowed to pass and which are blocked, based on a set of rules configured by the administrator.

## How a Firewall Works

A firewall operates at several different levels. **Packet filtering** inspects the header of every packet — source IP address, destination, and port number — without examining the actual data payload. **Stateful inspection** tracks active connection states so that only traffic belonging to a legitimate session is allowed through. **Application-level gateway** (proxy firewall) works even deeper, inspecting the payload at the application level such as HTTP or SMTP.

## Modern Firewall Types

The latest generation of firewalls (Next-Generation Firewall or NGFW) combine the above techniques with additional features such as SSL/TLS inspection, intrusion detection system (IDS) integration, and behavior-based filtering. Some cloud-native solutions also offer firewall as a service (FWaaS) that does not require physical hardware.

## Configuration Considerations

Best practices for managing a firewall include implementing a *default deny* policy — blocking all traffic by default and then selectively opening the required ports. Regular audits of firewall rules are also important to remove obsolete rules that are no longer needed.

## Frequently Asked Questions

### What is the difference between a firewall and an antivirus?
A **firewall** is a network perimeter defense — it controls what traffic enters and leaves a network or device based on rules (IP, port, protocol). An **antivirus** is an endpoint defense — it scans files and running processes for malicious code patterns and behaviors. Firewalls stop unauthorized access; antivirus detects and removes malware that already reached the device. Both are necessary — a firewall cannot catch malware in an allowed file download, and antivirus cannot stop a network-based exploit that doesn't involve a file.

### What is a "default deny" policy and why is it important?
**Default deny** means "block everything unless explicitly allowed." The alternative, "default allow," permits all traffic except what is specifically blocked. Default deny is the security best practice because:
- New services/ports are blocked until explicitly approved
- Reduces attack surface (attackers can't probe unknown open ports)
- Forces intentional decision-making about what traffic is needed
- Aligns with the principle of least privilege

Default allow is easier to manage initially but is inherently insecure — any service installed later is automatically exposed.

### What are the main types of firewalls?
1. **Packet filter** — stateless, inspects headers only (fast, limited context)
2. **Stateful firewall** — tracks connection state (TCP handshake, UDP flows), allows return traffic for established connections (standard for most networks)
3. **Application firewall / Proxy** — inspects application-layer payloads (HTTP, DNS, SMTP), can enforce protocol compliance and content filtering
4. **Next-Generation Firewall (NGFW)** — combines stateful inspection with application awareness, IPS/IDS, SSL/TLS inspection, and threat intelligence feeds
5. **Web Application Firewall (WAF)** — specialized for HTTP/HTTPS, protects web apps from OWASP Top 10 attacks (SQLi, XSS, CSRF)

### Can a firewall stop all cyber attacks?
No. Firewalls operate at the network boundary and cannot prevent:
- **Social engineering / phishing** — user actions bypass network controls
- **Insider threats** — authorized users with malicious intent
- **Zero-day exploits** — unknown vulnerabilities with no signature
- **Encrypted threats** — malware in TLS traffic (unless SSL inspection is enabled and trusted)
- **Application logic flaws** — business logic errors in the application itself

Firewalls are a critical layer in defense-in-depth but must be combined with endpoint protection, user training, secure coding, and monitoring.

### What is a host-based firewall vs. network firewall?
A **network firewall** (hardware or VM) sits at the network perimeter (e.g., between LAN and internet) and protects the entire network segment. A **host-based firewall** (software) runs on an individual endpoint (laptop, server) and controls traffic to/from that specific host. Examples: Windows Defender Firewall, `iptables`/`nftables` on Linux, `pf` on BSD. Both are needed — network firewalls protect the perimeter; host firewalls protect individual machines, especially on untrusted networks (public Wi-Fi, roaming laptops).
