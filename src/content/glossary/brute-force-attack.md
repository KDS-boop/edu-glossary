---
term: "Brute Force Attack"
shortDefinition: "An attack technique that tries every possible combination of passwords or keys until the correct one is found."
category: "Cybersecurity"
letter: "B"
updatedDate: 2026-09-19
relatedTerms: ["End-to-End Encryption", "Firewall", "SHA-256"]
---

A brute force attack is a cryptographic attack method that relies on massive trial-and-error attempts of key combinations, passwords, or credentials until a valid pair is found. This approach does not exploit technical vulnerabilities in the system, but rather leverages the weakness of short or easily guessable passwords.

## Attack Variants

**Pure brute force** tries every possible character systematically — from "aaaa" to the longest combination. This approach takes an extremely long time against strong passwords. **Dictionary attack** narrows the scope by using a list of common words and their variations, making it much faster. **Hybrid attack** combines both, taking words from a dictionary and adding number and symbol variations. **Rainbow table attack** uses pre-computed hash tables to accelerate the process of reversing a hash back to the original password.

## Impact and Prevention

Successful brute force attacks can result in unauthorized access, data theft, and mass account compromise. To mitigate these risks, organizations should enforce strict password policies — at least 12 characters with a mix of letters, numbers, and symbols. Rate limiting on authentication endpoints, account lockout after several failed attempts, and implementing multi-factor authentication (MFA) are additional and highly effective defense layers.
