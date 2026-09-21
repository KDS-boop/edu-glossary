# Existing Content - Search Intent Map

## Intent Categories

- **Informational (I):** User wants to learn/understand something
- **Navigational (N):** User wants to find a specific page/site
- **Commercial Investigation (CI):** User is researching options before a decision
- **Transactional (T):** User wants to take an action (sign up, buy, download)

---

## Homepage

| Page | URL | Target Queries | Primary Intent | Current Optimization |
|------|-----|----------------|----------------|---------------------|
| Homepage | `/` | `eduglossary`, `tech glossary`, `learn technology terms` | N / I | Title: "Home" - **MISSING keyword**. H1: "Learn Technology Terms, Explained Clearly" - good. |

**Issue:** `<title>Home</title>` is wasteful. Should be `EduGlossary - Learn Technology Terms, Explained Clearly` or similar.

---

## Glossary Pages (22)

### Software Development

| Term | URL | Primary Query Target | Intent | Content Depth | Gap |
|------|-----|---------------------|--------|---------------|-----|
| API | `/glossary/api/` | `what is an API`, `API explained` | I | ~350 words | No FAQ, no examples, no "how it works" section. Competitors have 1000+ words. |
| API Gateway | `/glossary/api-gateway/` | `what is an API gateway` | I | ~350 words | Missing: when to use, architecture diagram concept, comparison with load balancer |
| Codebase | `/glossary/codebase/` | `what is a codebase` | I | ~350 words | Missing: best practices, tools, codebase vs repository |
| Continuous Integration | `/glossary/continuous-integration/` | `what is CI`, `continuous integration explained` | I | ~350 words | Missing: CI vs CD distinction, pipeline stages, tools (Jenkins, GitHub Actions) |
| Full Stack | `/glossary/full-stack/` | `full stack developer`, `full stack explained` | I | ~350 words | Missing: tech stack examples, skills list, career path |

### Blockchain

| Term | URL | Primary Query Target | Intent | Content Depth | Gap |
|------|-----|---------------------|--------|---------------|-----|
| Blockchain | `/glossary/blockchain/` | `what is blockchain`, `blockchain explained` | I | ~350 words | Missing: use cases, types of blockchain, blockchain vs database |
| Consensus Mechanism | `/glossary/consensus-mechanism/` | `consensus mechanism explained` | I | ~350 words | Missing: types comparison (PoW vs PoS vs DPoS), pros/cons |
| Decentralization | `/glossary/decentralization/` | `decentralization explained` | I | ~350 words | Missing: vs centralization comparison, real-world examples |
| Merkle Tree | `/glossary/merkle-tree/` | `merkle tree explained`, `what is a merkle tree` | I | ~350 words | Missing: visual diagram concept, step-by-step construction, use cases beyond blockchain |
| Proof of Work | `/glossary/proof-of-work/` | `proof of work explained` | I | ~350 words | Missing: energy concerns, vs PoS, Bitcoin mining process |

### Cybersecurity

| Term | URL | Primary Query Target | Intent | Content Depth | Gap |
|------|-----|---------------------|--------|---------------|-----|
| Brute Force Attack | `/glossary/brute-force-attack/` | `brute force attack explained` | I | ~350 words | Missing: types (dictionary, rainbow table), prevention methods, real-world examples |
| End-to-End Encryption | `/glossary/end-to-end-encryption/` | `what is end-to-end encryption` | I | ~350 words | Missing: vs encryption at rest, apps that use it, protocol details |
| Firewall | `/glossary/firewall/` | `what is a firewall`, `types of firewalls` | I | ~350 words | Missing: types (stateful, NGFW, WAF), configuration basics, firewall vs antivirus |
| SHA-256 | `/glossary/sha-256/` | `SHA-256 explained`, `what is SHA-256` | I | ~350 words | Missing: vs other hashes, collision resistance, how Bitcoin uses it |

### Cloud Computing

| Term | URL | Primary Query Target | Intent | Content Depth | Gap |
|------|-----|---------------------|--------|---------------|-----|
| Cloud Service Provider | `/glossary/cloud-service-provider/` | `cloud service provider explained` | I | ~350 words | Missing: comparison table (AWS vs Azure vs GCP), pricing models, selection criteria |
| Hybrid Cloud Storage | `/glossary/hybrid-cloud-storage/` | `hybrid cloud explained` | I | ~350 words | Missing: vs multi-cloud, use cases, architecture diagram concept |
| Storage Area Network | `/glossary/storage-area-network/` | `what is a SAN` | I | ~350 words | Missing: vs NAS comparison, use cases, protocols (Fibre Channel, iSCSI) |
| Virtualization Software | `/glossary/virtualization-software/` | `virtualization explained` | I | ~350 words | Missing: vs containerization, hypervisor types, VMware/VirtualBox examples |

### AI & Data

| Term | URL | Primary Query Target | Intent | Content Depth | Gap |
|------|-----|---------------------|--------|---------------|-----|
| Chatbot | `/glossary/chatbot/` | `what is a chatbot` | I | ~350 words | Missing: types (rule-based vs LLM), use cases, chatbot vs virtual assistant |
| Machine Learning | `/glossary/machine-learning/` | `what is machine learning` | I | ~350 words | Missing: types (supervised/unsupervised/reinforcement), real-world examples, ML vs DL |
| Predictive Analytics | `/glossary/predictive-analytics/` | `predictive analytics explained` | I | ~350 words | Missing: vs descriptive/prescriptive, tools, industry examples |
| Training Data | `/glossary/training-data/` | `what is training data` | I | ~350 words | Missing: data quality principles, labeling, bias, sources |

---

## Articles (1)

| Term | URL | Primary Query Target | Intent | Content Depth | Gap |
|------|-----|---------------------|--------|---------------|-----|
| Getting to Know Astro | `/articles/mengenal-astro-framework/` | `astro framework tutorial` | I | ~89 words | Not competitive for any query. Essentially a stub. |

---

## Hubs (5)

| Hub | URL | Primary Query Target | Intent | Content Depth | Gap |
|-----|-----|---------------------|--------|---------------|-----|
| Blockchain & Decentralization | `/learn/blockchain/` | `blockchain guide`, `learn blockchain` | I | Intro + 6 linked terms | No articles, no deep content, no comparison tables |
| Cloud Computing & Infrastructure | `/learn/cloud-computing/` | `cloud computing guide` | I | Intro + 4 linked terms | No articles, no getting-started guide |
| Software Development | `/learn/software-development/` | `software development guide` | I | Intro + 5 terms + 1 article | Article is a stub (89 words) |
| Cybersecurity | `/learn/cybersecurity/` | `cybersecurity guide` | I | Intro + 4 linked terms | No articles |
| AI & Data | `/learn/ai-and-data/` | `AI and data guide` | I | Intro + 4 linked terms | No articles |

---

## Category Pages

| Category | URL | Intent | Content |
|----------|-----|--------|---------|
| AI & Data | `/glossary/categories/ai-and-data/` | I / N | Filtered card list - thin |
| Blockchain | `/glossary/categories/blockchain/` | I / N | Filtered card list - thin |
| Cloud Computing | `/glossary/categories/cloud-computing/` | I / N | Filtered card list - thin |
| Cybersecurity | `/glossary/categories/cybersecurity/` | I / N | Filtered card list - thin |
| Software Development | `/glossary/categories/software-development/` | I / N | Filtered card list - thin |

**Issue:** Category pages have no unique content. Could be enhanced with intro paragraph, "why learn this topic" section, and links to hub pages.

---

## Summary

| Issue | Impact | Priority |
|-------|--------|----------|
| Homepage `<title>` says "Home" | Wasted title tag, poor CTR | High |
| All glossary entries are ~350 words | Not competitive with 1000+ word competitor pages | High |
| Only 1 article (89 words) | No long-form content for ranking | High |
| Category pages are thin (just filtered cards) | No unique content for Google to index | Medium |
| Hub pages have no articles linked | Missing topical depth signals | Medium |
| No FAQ schema on any page | Missed featured snippet opportunities | Medium |
| No comparison content (X vs Y) | Missing high-intent comparison queries | Medium |
