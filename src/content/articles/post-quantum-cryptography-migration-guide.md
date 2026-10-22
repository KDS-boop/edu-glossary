---
title: "Post-Quantum Cryptography Migration: A Practical Readiness Guide"
description: "Learn how post-quantum cryptography works, why harvest-now-decrypt-later matters, and how to inventory, prioritize, and test a safe PQC migration."
category: "Cybersecurity"
tags: ["Post-Quantum Cryptography", "PQC", "Cryptography", "TLS", "Key Management", "Cybersecurity"]
relatedGlossary: ["Post-Quantum Cryptography (PQC)", "End-to-End Encryption", "Symmetric Encryption", "Hash Function"]
author: "eduglossary-team"
publishedDate: 2026-10-23
updatedDate: 2026-10-23
draft: false
coverImage: "/images/articles/post-quantum-cryptography-migration-guide.svg"
coverImageAlt: "Diagram showing a migration from conventional public-key cryptography to a hybrid post-quantum key exchange and a staged cryptographic inventory and testing process."
---

Post-quantum cryptography (PQC) is a family of cryptographic algorithms designed to resist attacks from both conventional computers and sufficiently capable future quantum computers. It is not a special kind of quantum computer, nor does it require an organization to replace every encryption system overnight. It is a planned transition away from public-key algorithms that could become vulnerable if large, fault-tolerant quantum computers become practical.

The transition is already a standards and engineering task. On 13 August 2024, the US National Institute of Standards and Technology (NIST) finalized three post-quantum standards: ML-KEM for establishing shared keys, and ML-DSA and SLH-DSA for digital signatures. In July 2026, the Internet Engineering Task Force (IETF) published RFC 9954, an informational specification for hybrid key exchange in TLS 1.3; RFC 10024 followed in August 2026 with specific hybrid groups combining ML-KEM and conventional elliptic-curve key exchange. These developments provide concrete building blocks, but organizations still need to assess product support, compatibility, performance, and their own risk.

**Status checked: 23 October 2026.** Standards and vendor support can evolve. Confirm the current guidance for your products before making production changes.

## Why does post-quantum cryptography matter?

Much of today's public-key cryptography relies on mathematical problems that are believed to be difficult for classical computers. For example, widely used elliptic-curve and RSA systems underpin key establishment, digital signatures, certificate-based authentication, and secure software updates. A sufficiently capable quantum computer running appropriate algorithms could undermine important uses of RSA and elliptic-curve cryptography.

This does not mean that a quantum computer can automatically read every encrypted file. Symmetric encryption and hash functions have different security properties and are affected differently; migration plans must distinguish key establishment, signatures, and bulk-data encryption rather than treating cryptography as one interchangeable component.

The immediate planning concern is that sensitive encrypted traffic can be collected today and stored for possible decryption later. This is often called **harvest now, decrypt later (HNDL)**. An adversary does not need to decrypt a message at the moment it is intercepted. If the information will remain sensitive for many years, a future cryptographic breakthrough could still matter.

Organizations should therefore consider two timelines:

- **Confidentiality lifetime:** how long intercepted data must remain secret. Examples include long-lived business plans, identity records, sensitive research, and some government or health information.
- **Migration lead time:** how long it takes to inventory dependencies, procure compatible products, test protocols, coordinate vendors, and upgrade systems that may be difficult to replace.

If the confidentiality lifetime plus migration lead time is long, delaying all preparation until a cryptographically relevant quantum computer exists may be too late. That is a risk-management reason to prepare now, not a claim that such a computer is already capable of breaking today's deployed encryption.

## What is changing in the standards?

PQC is not a single algorithm that replaces every cryptographic primitive. The standards address different jobs.

<div class="pqc-table-scroll" tabindex="0" role="region" aria-label="Scrollable comparison of post-quantum cryptography standards and their practical roles">
<table class="pqc-standards-table">
  <thead>
    <tr>
      <th scope="col">Standard</th>
      <th scope="col">Purpose</th>
      <th scope="col">Practical role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>FIPS 203 / ML-KEM</strong></td>
      <td>Key-encapsulation mechanism</td>
      <td>Helps two parties establish a shared secret over a public channel.</td>
    </tr>
    <tr>
      <td><strong>FIPS 204 / ML-DSA</strong></td>
      <td>Digital signature algorithm</td>
      <td>Signs data and supports verification of authenticity and integrity.</td>
    </tr>
    <tr>
      <td><strong>FIPS 205 / SLH-DSA</strong></td>
      <td>Stateless hash-based digital signatures</td>
      <td>Provides a signature approach based on hash functions, with different size and performance trade-offs.</td>
    </tr>
  </tbody>
</table>
</div>

NIST approved all three standards on **13 August 2024**, not in 2026. ML-KEM was derived from CRYSTALS-Kyber, ML-DSA from CRYSTALS-Dilithium, and SLH-DSA from SPHINCS+. Organizations should refer to the final standards and validated implementations rather than relying on older draft names or assuming that a product's marketing term guarantees standards compliance.

The IETF has also documented hybrid key exchange for TLS 1.3. RFC 9954 describes a framework for combining conventional and next-generation key exchange, while RFC 10024 specifies hybrid groups such as X25519MLKEM768. A hybrid exchange combines a conventional mechanism with a post-quantum mechanism so that the resulting key establishment is designed to remain secure if one component is later found inadequate, subject to the construction's assumptions and correct implementation.

Hybrid key exchange is not the same as replacing all digital signatures. A connection may use a post-quantum-capable method to derive session keys while still relying on conventional certificates and signatures for authentication. A complete migration must inventory both.

## The difference between encryption, key establishment, and signatures

A useful migration plan begins by identifying what each cryptographic operation does.

### Key establishment

Key establishment lets communicating parties agree on secret key material without sending the resulting secret in the clear. TLS uses key agreement during a handshake before the parties protect application data. ML-KEM is a post-quantum key-encapsulation mechanism designed for this kind of task. It does not encrypt an entire website's traffic by itself; the established secret is used within a larger protocol.

### Symmetric encryption

Symmetric algorithms use related secret key material to encrypt and decrypt data. They are widely used for bulk traffic and stored files because they are efficient. Their quantum risk profile differs from that of RSA and elliptic-curve public-key systems. Do not replace a symmetric algorithm with ML-KEM as though they performed the same function. Follow standards-based guidance for key sizes and configurations.

### Digital signatures and certificates

Digital signatures help establish authenticity and detect unauthorized changes. They are used in certificates, software and firmware updates, package signing, code-signing workflows, and many identity systems. ML-DSA and SLH-DSA are standardized post-quantum signature options, but adopting them can affect signature size, verification performance, hardware support, certificate profiles, and compatibility with older clients.

### Hash functions

Hash functions are used for integrity checks, digital signatures, password storage constructions, and many other purposes. They are not interchangeable with encryption. Some post-quantum signature designs are hash-based, but that does not mean an organization should replace all hash functions without a defined security requirement.

## A practical PQC migration roadmap

A successful migration is a program of discovery, prioritization, testing, and staged deployment. The first task is not to switch a production setting; it is to find where cryptography is actually used.

### 1. Assign ownership and scope

Create a cross-functional team that includes security, infrastructure, application engineering, procurement, risk, and vendor management. Identify the systems in scope: internet-facing services, VPNs, identity infrastructure, internal APIs, databases, backups, software-signing pipelines, IoT devices, and operational technology.

Record who owns each system and who can authorize changes. Cryptographic dependencies often cross team boundaries, so a technically correct upgrade can still fail if a downstream client or external partner is not ready.

### 2. Build a cryptographic inventory

Find where public-key algorithms, certificates, keys, protocols, and cryptographic libraries are used. Include both systems you operate directly and products supplied by vendors. Look beyond web servers: code-signing services, firmware, authentication gateways, mobile applications, embedded devices, archives, and long-lived backups may have different constraints.

A useful inventory records at least:

- System and business owner.
- Data handled and required confidentiality lifetime.
- Protocols and algorithms in use, where discoverable.
- Certificate authorities, key stores, libraries, and hardware dependencies.
- External integrations and vendor support status.
- Upgrade path, maintenance window, and recovery method.
- Whether a cryptographic component can be updated independently or is embedded in an appliance.

Automated discovery tools can help, but an incomplete scan is not proof that a system contains no vulnerable cryptography. Confirm results with application owners, source configuration, vendor documentation, and network architecture.

### 3. Prioritize by risk, not by hype

Rank systems using the sensitivity and useful lifetime of their data, exposure to untrusted networks, difficulty of replacement, and the time needed to upgrade. Systems that protect long-lived sensitive information or form a root of trust may deserve earlier attention than short-lived, low-sensitivity workloads.

Prioritization should also consider operational consequences. A legacy device may be hard to replace, while a modern TLS endpoint may be upgraded through a supported software release. Create separate tracks for confidentiality protection (such as key establishment) and authenticity protection (such as signatures and code signing). The urgency and technical path can differ.

### 4. Ask vendors specific questions

Request concrete, version-specific answers from cloud providers, certificate authorities, VPN vendors, hardware suppliers, operating-system maintainers, and cryptographic library providers. Ask which standardized algorithms are supported, whether hybrid TLS or VPN key exchange is available, which versions enable it, whether support is enabled by default, and what limitations exist.

Also ask about hardware acceleration, compliance validation, certificate and signature size, interoperability with older clients, logging, rollback, and end-of-support dates. A general statement that a product is “quantum ready” is not a migration plan. Keep vendor responses with the inventory and revisit them as releases change.

### 5. Test in a representative environment

Begin with a test environment that mirrors important production paths. Verify negotiation between real client and server combinations, including proxies, content delivery networks, load balancers, mobile clients, and partner integrations. Check connection success, handshake latency, CPU and memory usage, message sizes, fragmentation behavior where relevant, and failure handling.

Test both supported and unsupported clients. A secure configuration that breaks a critical integration may be rolled back under pressure; knowing the compatibility boundary ahead of time reduces that risk. Use supported product settings and test suites rather than manually inserting experimental cryptographic code into production.

### 6. Deploy in stages and monitor

Use a controlled rollout: internal test, limited pilot, a small production cohort, then wider deployment. Define success criteria and rollback conditions before each stage. Monitor handshake failures, client-version distribution, certificate errors, latency, and resource use. Record which algorithm was negotiated where the platform exposes that information safely.

Keep a clear distinction between turning on a supported hybrid key exchange and migrating certificate signatures or software-signing systems. One change does not complete the other. Track each workstream against its own inventory and acceptance tests.

### 7. Plan for cryptographic agility

Cryptographic agility is the ability to replace or update algorithms without redesigning the entire application or rebuilding every dependent system. Avoid hard-coded algorithm assumptions where standards and product APIs provide supported configuration. Keep keys, certificates, protocol choices, and libraries manageable through documented lifecycle processes.

Agility does not mean allowing arbitrary algorithms or weakening policy to preserve compatibility. Establish approved configurations, monitor deviations, and ensure emergency changes can be tested and deployed. Document dependencies so the next standards update is a manageable change rather than a full-system discovery exercise.

## What can go wrong during migration?

PQC migration introduces engineering trade-offs that should be measured, not ignored.

- **Larger handshake messages:** post-quantum public keys and ciphertexts can be larger than conventional key-exchange values. This may affect network paths, proxies, and devices with strict message limits.
- **Legacy compatibility:** older clients may not support new groups or signatures. A rollout needs a documented compatibility policy, not an undocumented downgrade.
- **Incomplete coverage:** enabling hybrid key exchange on the public website does not update VPNs, internal service-to-service connections, backups, firmware signatures, or code-signing pipelines.
- **Confusing key exchange with authentication:** a hybrid TLS handshake can protect key establishment while a conventional signature remains in use. Track both components.
- **Unvalidated implementations:** standards publication does not automatically make every library or configuration compliant with a particular regulatory or validation requirement. Check the exact implementation and applicable certification.
- **Overstated readiness claims:** a vendor roadmap, a laboratory test, or a single successful browser connection is not proof that the whole organization has migrated.

Avoid inventing a universal deadline for every organization. Follow applicable regulatory requirements, sector guidance, vendor lifecycle plans, and the risk profile of the data and systems you manage.

## A checklist for the first 90 days

An organization beginning from scratch can use this sequence as a planning aid, adjusting it to its size and risk:

**Days 1–30: discover**
- Name an accountable owner and working group.
- Identify critical systems and vendors.
- Start a cryptographic inventory and mark unknowns explicitly.
- Classify sensitive data by confidentiality lifetime.
- Ask suppliers for supported PQC and hybrid-configuration details.

**Days 31–60: prioritize and test**
- Rank systems by risk, exposure, and migration difficulty.
- Select a representative TLS or VPN pilot with vendor-supported settings.
- Define performance, compatibility, security, and rollback criteria.
- Test supported and unsupported client combinations.
- Document gaps in certificates, signatures, firmware, and code signing.

**Days 61–90: prepare deployment**
- Review pilot results and obtain change approval.
- Build staged rollout and monitoring plans.
- Assign owners and target dates to the highest-risk gaps.
- Record vendor dependencies and planned upgrades.
- Schedule a review cadence so the inventory stays current.

This is a planning framework, not a guarantee that a complex environment can be migrated in three months. The goal is to establish visibility, ownership, and an evidence-based order of work.

## Frequently asked questions

### Do we need a quantum computer to start migrating?

No. Inventory, vendor assessment, testing, and architecture improvements can begin before quantum computers threaten deployed cryptography. The need to start depends on the sensitivity and lifetime of protected data and the time needed to change the system.

### Does PQC replace AES?

No. ML-KEM establishes shared key material; it is not a bulk-data encryption algorithm like AES. Use standards and vendor guidance to choose the right primitive for each cryptographic job.

### Is hybrid key exchange the same as full post-quantum security?

No. Hybrid key exchange addresses key establishment for supported protocols. Authentication, digital signatures, certificate chains, software signing, and other cryptographic dependencies need separate assessment.

### Does adopting a standardized algorithm guarantee compliance?

Not automatically. Compliance may depend on the exact implementation, approved mode, validation status, configuration, and applicable policy. Verify those requirements for your environment.

### Should every website administrator immediately change TLS settings?

Not without checking product support and compatibility. Follow the official guidance from your TLS termination provider or software vendor, test in a representative environment, and deploy changes in stages.

## Official sources and further reading

1. [NIST: Post-Quantum Cryptography standards and migration guidance](https://csrc.nist.gov/Projects/post-quantum-cryptography) — current standards and migration resources.
2. [NIST: Approval of FIPS 203, 204, and 205, 13 August 2024](https://csrc.nist.gov/News/2024/postquantum-cryptography-fips-approved) — the finalized key-encapsulation and digital-signature standards.
3. [NIST: Migration to Post-Quantum Cryptography FAQ](https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/) — terminology and practical migration context.
4. [CISA, NSA, and NIST: Quantum-Readiness—Migration to Post-Quantum Cryptography](https://www.cisa.gov/sites/default/files/2023-08/Quantum-Readiness%20-%20Migration%20to%20Post-Quantum%20Cryptography_508c.pdf) — inventory and roadmap recommendations.
5. [Cloudflare: Post-quantum cryptography documentation](https://developers.cloudflare.com/ssl/post-quantum-cryptography/) — implementation details for hybrid key agreement and product support.
6. [RFC 9954: Hybrid Key Exchange in TLS 1.3](https://www.rfc-editor.org/rfc/rfc9954.html) — IETF framework for hybrid key exchange.
7. [RFC 10024: Post-Quantum Traditional Hybrid Key Agreement Mechanisms for TLS 1.3](https://www.rfc-editor.org/rfc/rfc10024.html) — standardized hybrid groups combining ML-KEM and conventional key exchange.

The practical lesson is simple: prepare for post-quantum cryptography through an inventory-led, risk-based migration. Know which systems depend on vulnerable public-key algorithms, protect the data that must remain secret for years, validate real product support, and deploy tested changes in stages. Preparation is more reliable than waiting for a single deadline or assuming that one upgraded TLS endpoint makes an entire organization quantum-resistant.
