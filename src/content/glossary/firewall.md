---
term: "Firewall"
shortDefinition: "A network security system that monitors and controls incoming and outgoing data traffic based on predetermined security rules."
category: "Cybersecurity"
letter: "F"
updatedDate: 2026-09-19
relatedTerms: ["Brute Force Attack", "End-to-End Encryption", "API Gateway"]
---

A firewall is the first line of defense in network security infrastructure. This component acts as a gateway that determines which data packets are allowed to pass and which are blocked, based on a set of rules configured by the administrator.

## How a Firewall Works

A firewall operates at several different levels. **Packet filtering** inspects the header of every packet — source IP address, destination, and port number — without examining the actual data payload. **Stateful inspection** tracks active connection states so that only traffic belonging to a legitimate session is allowed through. **Application-level gateway** (proxy firewall) works even deeper, inspecting the payload at the application level such as HTTP or SMTP.

## Modern Firewall Types

The latest generation of firewalls (Next-Generation Firewall or NGFW) combine the above techniques with additional features such as SSL/TLS inspection, intrusion detection system (IDS) integration, and behavior-based filtering. Some cloud-native solutions also offer firewall as a service (FWaaS) that does not require physical hardware.

## Configuration Considerations

Best practices for managing a firewall include implementing a *default deny* policy — blocking all traffic by default and then selectively opening the required ports. Regular audits of firewall rules are also important to remove obsolete rules that are no longer needed.
