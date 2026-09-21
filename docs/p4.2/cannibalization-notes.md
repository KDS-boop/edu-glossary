# Cannibalization Notes - P4.2

Identified keyword overlap risks between existing pages and proposed content.

---

## Existing Internal Cannibalization Risks

### 1. SHA-256: Cybersecurity category vs Blockchain hub

**Risk level:** Low (intentional cross-linking)

SHA-256 is categorized under Cybersecurity but also appears in the Blockchain hub. Both the Cybersecurity hub intro and Blockchain hub intro reference cryptographic hashing. This is intentional cross-linking and not a true cannibalization issue, since the glossary entry lives at one URL (`/glossary/sha-256/`).

**Action:** No change needed. This is correct hub/category cross-referencing.

---

### 2. API vs API Gateway

**Risk level:** Low

Both terms are in Software Development and cross-link to each other. API Gateway is a specialization of API. They target different queries (`what is an API` vs `what is an API gateway`). Content is distinct.

**Action:** Ensure API article (Article 2) links to API Gateway glossary but does not redefine API Gateway concepts in depth.

---

### 3. Blockchain glossary vs Blockchain hub page

**Risk level:** Low (by design)

The Blockchain hub (`/learn/blockchain/`) and the Blockchain glossary entry (`/glossary/blockchain/`) target slightly different queries:
- Hub: `learn blockchain`, `blockchain guide` (navigational/educational)
- Glossary: `what is blockchain` (definitional)

The hub has intro paragraphs + links to all blockchain terms. The glossary entry has the detailed definition.

**Action:** Ensure hub intro doesn't duplicate the glossary definition verbatim. Hub should provide a learning-path framing, not a re-definition.

---

## Proposed Content Cannibalization Risks

### 4. "Proof of Work vs Proof of Stake" article vs PoW glossary entry

**Risk level:** Medium

The proposed comparison article (Article 1) will rank for `proof of work` queries in addition to `proof of work vs proof of stake`. This could compete with the PoW glossary entry.

**Mitigation:**
- Article should focus on the **comparison** angle, not a standalone PoW definition
- PoW glossary entry should be the canonical definition page for `what is proof of work`
- Article should link to PoW glossary for the full definition, using anchor text like "our Proof of Work definition"
- Add FAQPage schema to both, with the glossary entry owning the "What is Proof of Work?" question

---

### 5. "What is an API?" article vs API glossary entry

**Risk level:** Medium (same as above pattern)

Article 2 targets `what is an API` which is also the primary query for the API glossary entry.

**Mitigation:**
- Article should be a **guide** ("API Explained: A Complete Beginner's Guide"), not just a definition
- API glossary entry should remain the concise, authoritative definition page
- Article links to glossary entry for the core definition
- Differentiate by making article focus on "how APIs work" (process) vs glossary "what an API is" (definition)

---

### 6. "How Machine Learning Works" article vs Machine Learning glossary entry

**Risk level:** Medium

Same pattern. Article 4 targets `how machine learning works` which overlaps with `what is machine learning` (ML glossary entry).

**Mitigation:**
- Article focuses on the **process/workflow** (step-by-step)
- Glossary entry remains the **definition** page
- Article links to glossary for core definition
- FAQPage schema: glossary owns "What is Machine Learning?", article owns "How does Machine Learning work?"

---

### 7. "Cloud Computing Explained" article vs Cloud Service Provider glossary entry

**Risk level:** Low-Medium

Article 5 targets `cloud computing explained` / `what is cloud computing`. CSP glossary entry targets `cloud service provider explained`. These are adjacent but different queries.

**Mitigation:**
- Article is the broad educational overview
- CSP glossary entry is a specific term definition
- Article links to CSP entry for the provider-specific definition
- Low true overlap since queries are distinct

---

### 8. Future: Hash Function glossary vs SHA-256 glossary

**Risk level:** Medium (when Hash Function is added)

A new "Hash Function" glossary entry could compete with the existing SHA-256 entry for queries like `hash function explained` and `SHA-256 hash function`.

**Mitigation:**
- Hash Function should be the **general concept** page
- SHA-256 should be the **specific algorithm** page
- Hash Function article links to SHA-256 as "one implementation"
- SHA-256 article links to Hash Function as "the broader category"
- Differentiate queries: Hash Function owns `what is a hash function`, SHA-256 owns `what is SHA-256`

---

### 9. Future: Deep Learning glossary vs Machine Learning glossary

**Risk level:** Medium (when Deep Learning is added)

**Mitigation:**
- Machine Learning = the umbrella term
- Deep Learning = a specific subset
- ML article covers both briefly, links to DL for deep dive
- DL article goes deep on neural networks, architectures, applications
- Different queries: ML owns `what is machine learning`, DL owns `what is deep learning`

---

## Cannibalization Prevention Rules

1. **One page owns one primary query.** If two pages target the same query, differentiate by angle (definition vs guide vs comparison).
2. **Glossary entries own definitional queries** ("What is X?"). Articles own process/comparison queries ("How does X work?", "X vs Y").
3. **Cross-link with clear hierarchy.** Articles link to glossary for definitions. Glossary entries link to articles for deep dives.
4. **FAQPage schema ownership.** Assign specific FAQ questions to specific pages to avoid schema cannibalization.
5. **Hub pages should NOT duplicate glossary definitions.** Hubs provide learning-path framing, not re-definitions.
6. **Category pages should NOT have unique keyword-targeted content.** They are filtered listings, not standalone SEO pages.

---

## Summary

| Risk | Level | Status |
|------|-------|--------|
| SHA-256: Cyber vs Blockchain | Low | Intentional - no action |
| API vs API Gateway | Low | Distinct queries - no action |
| Blockchain glossary vs hub | Low | Different intent - no action |
| PoW article vs PoW glossary | Medium | Mitigated by differentiation |
| API article vs API glossary | Medium | Mitigated by differentiation |
| ML article vs ML glossary | Medium | Mitigated by differentiation |
| Cloud article vs CSP glossary | Low-Medium | Distinct queries - no action |
| Hash Function vs SHA-256 (future) | Medium | Plan differentiation now |
| Deep Learning vs ML (future) | Medium | Plan differentiation now |

**Overall assessment:** No blocking cannibalization risks. All identified overlaps are manageable with the differentiation strategies above.
