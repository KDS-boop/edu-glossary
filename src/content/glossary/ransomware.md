---
term: "Ransomware"
shortDefinition: "Malware that denies access to files or systems — usually by encrypting them or exfiltrating data and threatening to publish it — until a ransom is paid."
metaDescription: "Ransomware explained: how attacks work, double and triple extortion, RaaS economics, 2024–2026 incident data, and the defenses that limit damage."
category: "Cybersecurity"
letter: "R"
updatedDate: 2026-10-06
image: "./images/ransomware.svg"
imageAlt: "Ransomware concept illustration: cracked shield with padlock chain, ransom demand note, locked folder, encrypted disk and chip on a dark background."
relatedTerms: ["Firewall", "Brute Force Attack", "Symmetric Encryption", "End-to-End Encryption", "Preemptive Cybersecurity", "VPN"]
---

Ransomware is malicious software that denies an organization access to its own data or systems until money changes hands. The classic form encrypts files with strong cryptography and holds the decryption key as the bargaining chip; the increasingly common second form exfiltrates data and threatens to publish or sell it. In modern campaigns the two often appear together. What follows the attack is the ransom note: a demand for payment, typically in hard-to-trace digital assets, with a deadline.

The note is itself engineered for pressure. Short deadlines, escalating threats, and plausible consequences are designed to remove the time a victim needs to think calmly. That is why experienced responders treat the moment-of-crisis decision as the outcome of decisions made earlier: what backups exist, which data actually matters, and who has been pre-authorized to talk to whom.

## How a ransomware attack unfolds

Most campaigns follow a similar progression:

1. **Initial access.** The attacker gains a foothold. Compromised credentials are the most common entry point — stolen through [brute force and credential attacks](/glossary/brute-force-attack/), malicious email, and phishing, or through the social engineering documented in CISA advisory AA23-320A, which describes campaigns using voice phishing, deepfake audio, and help-desk impersonation to talk employees into surrendering credentials.
2. **Entrenchment and reconnaissance.** The attacker escalates privileges, harvests further credentials, and maps what is worth encrypting and what is worth stealing. Exfiltration usually happens in this phase, often days before encryption begins.
3. **Deployment.** Files, servers, and frequently backups are encrypted, or access is otherwise blocked. The payload is typically the same cryptographic family that protects legitimate traffic: [symmetric encryption](/glossary/symmetric-encryption/) for file-level keys, because it is fast enough to encrypt entire servers in hours, locked in turn by an asymmetric layer. The difference between that and the encryption in a messaging app is not strength — it is who holds the key.
4. **Extortion.** The ransom note appears, with a deadline, payment instructions, and — in double or triple extortion campaigns — a promise that the stolen data will be published if no payment arrives.

## Double and triple extortion

Early ransomware was a simple availability-for-cash trade: your files, held for money. Two developments changed the economics of the threat.

- **Single extortion.** The attacker encrypts data and demands payment. Restoring from backups ends the incident.
- **Double extortion.** The attacker also exfiltrates data before encryption. Even a victim that restores perfectly from backup still faces a copy of its data in the attacker's hands, which can be published or sold.
- **Triple extortion.** The stolen data is weaponized against the victim's relationships: regulators, customers, insurers, or partners are threatened with the stolen material.

The practical consequence is that backups no longer end a ransomware incident — they end the availability problem. The confidentiality problem — what was taken, and whether it still exists outside the organization — is a separate question with its own answer.

## Ransomware as a service

The modern threat landscape is dominated by a business model: ransomware as a service (RaaS). Established groups build and run the tools — the encryption software, exfiltration infrastructure, leak sites, affiliate marketing — and recruit affiliates with little specialized skill, paying them a share of what they generate. Public leaderboards rank affiliates, and crews differentiate on tooling, support, and terms. The result makes ransomware behave less like a loose collection of script kiddies and more like a franchise, with competitive pricing and customer support.

The franchise model has also made the industry fragile. Black Kite, which publishes independent victim-tracking data, reported 7,551 ransomware victims in 2026 in its 2026 report — up 24.9% year over year. That growth happened while one of the industry's most prominent brands collapsed: tracked RansomHub victims fell from a peak of roughly 736 to near zero within twelve months after a 2025 law-enforcement action against its infrastructure. Dismantling one crew does not eliminate the threat; affiliates simply relocate to the next brand.

## What 2024–2026 data shows

The numbers support two simultaneous claims: ransomware remains one of the costliest and most pervasive threat categories, and the classic pay-and-decrypt bargain is eroding.

- **Cost.** The FBI's Internet Crime Complaint Center (IC3) recorded a record $16.6 billion in reported losses across all fraud categories in its 2024 report, with ransomware complaints up roughly 9% year over year. The report identified ransomware as the most pervasive threat to critical infrastructure.
- **Recovery costs.** In Sophos' seventh annual State of Ransomware survey (2026, 2,158 IT and security leaders across 17 countries), the typical ransomware victim's recovery bill — repairs, lost productivity, professional services — ran to about $1.7 million.
- **Payment behavior.** Over two years of the same research, median ransom demands fell by about 65% and median payments by about 62%. Victims are increasingly refusing to pay.
- **Encryption is declining, not gone.** In 2026, 56% of successful attacks still encrypted data, and malicious email (26%) and phishing (24%) remained the top two entry vectors. The entry points have not changed; the extortion model has.
- **Government is a marquee target.** Sophos' 2024 survey of state and local governments found a median payment of $2.2 million among the organizations that paid.

The planning implication: the average incident is a seven- to eight-figure business event even when no ransom is paid. The useful question is not how to avoid paying, but how to make the incident survivable.

## Detection and response

Organizations that limit damage detect early and rehearse the response:

- **Endpoint detection and response (EDR)** watching for ransomware's behavioral signature: a process touching or encrypting thousands of files in minutes, privilege escalation to domain-level admins, and mass service stops.
- **Backup integrity checks.** Regular test restores and monitoring of backup jobs matter because backups are one of the most targeted assets in an attack. In Sophos' 2024 government survey, 99% of attacked organizations reported that criminals attempted to compromise their backups during the attack, and more than half (51%) of those attempts succeeded.
- **Network and egress monitoring** for lateral movement and unusually large outbound transfers, which is how an exfiltration is caught before the note arrives to confirm it.
- **Identity monitoring.** Privileged and service accounts are the highest-value targets; impossible-travel logins, unusual privilege changes, and new administrative assignments are early signals.
- **A rehearsed incident response plan** that treats exfiltration as a given. The technical track — isolation, forensics, restore — runs in parallel with legal, communications, and notification tracks. The fastest response is one where the order of operations was decided before the phone rang.

## Defending against ransomware

No single control stops ransomware; effective defense is layered, and the layers below map comfortably onto the NIST Cybersecurity Framework's functions.

1. **3-2-1 backup discipline.** At least three copies of data, on two different media, with at least one offline or immutable. A 3-2-1 count without tested restores is decoration — the backup that has never been restored is a hypothesis, not a plan. Backups are the only control that guarantees recovery regardless of whether any ransom is paid.
2. **Multi-factor authentication (MFA)** on remote access, VPN, and every administrative surface, preferably phishing-resistant for privileged accounts. Because the vishing campaigns in CISA's AA23-320A advisory target the human on the phone at the IT help desk, MFA alone is not enough: verify password resets and account changes through a separate, out-of-band channel.
3. **Patch what is actively exploited.** Many campaigns enter through public, known, unpatched vulnerabilities. CISA's Known Exploited Vulnerabilities (KEV) catalog — vulnerabilities exploited in the wild, with mandated federal patching deadlines — serves as a practical triage list for non-federal organizations as well.
4. **Network segmentation.** If one segment is compromised, segmentation slows lateral movement and limits blast radius. A [firewall](/glossary/firewall/) is necessary at the perimeter but not sufficient: ransomware commonly enters with legitimate credentials, so containment is an internal, east-west problem.
5. **Reduce exposure.** Fewer internet-exposed admin interfaces, fewer standing remote-access paths, fewer shared admin accounts. This is the core practice of [preemptive cybersecurity](/glossary/preemptive-cybersecurity/): shrinking exploitable exposure and likely attack paths before they are used, rather than reacting after compromise.
6. **Rehearse recovery.** Tabletop exercises force the pay-or-don't decision, the regulator-notification decision, and the restore-sequence decision to be made before 3 a.m. on the day it actually matters.
7. **Insurance, with clear expectations.** Cyber insurance can cover a significant share of recovery cost, but it does not settle the pay-or-don't question and it does not fund a restore you cannot actually perform. Insurers increasingly require the controls above — tested backups, MFA, a live recovery plan — before they bind.

## Common misconceptions

- **"Paying guarantees my data back."** It does not. Attackers have failed to deliver decryptors, taken payment and vanished, or demanded more after payment — and even a successful decryption does not undo the exfiltrated copy, which can be published or sold later. U.S. law-enforcement guidance recommends consulting investigators before paying.
- **"Ransomware mainly targets large enterprises."** The franchise model targets any organization with credential surfaces and a phone that gets answered. CISA has specifically called out vishing campaigns aimed at small and mid-sized organizations that lack dedicated security staff.
- **"With backups, we're fine."** Backups defeat the availability extortion, not the confidentiality extortion. The exfiltration window usually opens days before encryption, so an organization that first notices at encryption time has often already lost data.
- **"A firewall is enough."** A firewall governs the perimeter; ransomware commonly enters the perimeter with valid credentials. Containment happens inside, through segmentation, identity controls, and backups.

## Frequently Asked Questions

### What is ransomware?
Ransomware is malware that denies access to data or systems — typically by encrypting files, or by exfiltrating data and threatening to publish it — until a ransom is paid. Modern campaigns frequently combine both, as double or triple extortion.

### Does paying the ransom get my data back?
There is no guarantee. Victims report failed decryption, partial restores, repeat demands, and attackers who take payment and disappear. Even when payment succeeds, the exfiltrated copy still exists and can be published or sold later, which is why U.S. law-enforcement guidance advises consulting investigators before paying.

### What is the difference between double and triple extortion?
Double extortion adds a threat to publish stolen data on top of encryption, so restoring from backups does not end the incident. Triple extortion extends that threat to the victim's relationships — regulators, customers, insurers, or partners are threatened with the stolen data.

### What is the single most effective ransomware defense?
Tested, offline or immutable backups — the practical 3-2-1 rule. Controls that prevent attacks (MFA, patching, segmentation, exposure reduction) lower the odds of compromise; backups set the ceiling on damage when prevention fails.

### Why do small organizations keep getting targeted?
Small and mid-sized organizations often lack dedicated security staff, and that is exactly the gap the vishing and help-desk impersonation campaigns in CISA advisory AA23-320A exploit: a phone call, a plausible story, and a real password reset. The defense is process — out-of-band verification — not intuition about who is calling.

### How quickly should I respond when I suspect ransomware?
Minutes. The first actions are to isolate affected systems from the network, preserve forensic evidence, and activate the incident response plan, including the legal track. Early speed determines how much data is restorable and whether exfiltration has already completed.

## Sources

FBI Internet Crime Complaint Center, 2024 Internet Crime Report: https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf
Sophos, State of Ransomware 2026 (7th edition): https://assets.sophos.com/X24WTUEQ/at/jbww7pmb8n3gp99wr6hfq4/sophos-state-ransomware-report-2026.pdf
Sophos, The State of Ransomware in State and Local Government 2024: https://www.sophos.com/en-us/blog/the-state-of-ransomware-in-state-and-local-government-2024
Black Kite, 2026 Ransomware Report: https://blackkite.com/reports/2026-ransomware-report
CISA, Advisory AA23-320A — Voice Phishing and Deepfake Impersonation: https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-320a
CISA, Known Exploited Vulnerabilities Catalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
NIST, Cybersecurity Framework: https://www.nist.gov/cyberframework