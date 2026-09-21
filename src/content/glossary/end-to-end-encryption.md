---
term: "End-to-End Encryption"
shortDefinition: "An encryption method where only the sender and the recipient can read a message, with no access granted to third parties including the service provider."
category: "Cybersecurity"
letter: "E"
updatedDate: 2026-09-19
relatedTerms: ["Brute Force Attack", "Firewall", "SHA-256"]
---

End-to-end encryption (E2EE) is a communication method where data is encrypted on the sender's device and only decrypted on the intended recipient's device. Throughout the data's journey — across servers, networks, or the service provider's infrastructure — the ciphertext remains encrypted and cannot be read by anyone other than the two endpoints of the communication.

This is fundamentally different from transport-layer encryption like TLS (the protocol behind HTTPS). TLS protects data while it moves between your device and the server, but the server itself can read the plaintext. With E2EE, even the server never sees the unencrypted content.

## How E2EE Works

Most E2EE systems rely on asymmetric (public-key) cryptography combined with a key exchange protocol. A common approach is the Diffie-Hellman key exchange (or its elliptic-curve variant, ECDH): each party generates a public-private key pair and exchanges public keys. Both sides independently compute a shared secret that an eavesdropper cannot derive from the intercepted public keys alone.

The practical implementation varies by protocol:

- **Signal Protocol** — used by Signal, WhatsApp, and others. Combines the Extended Triple Diffie-Hellman (X3DH) key agreement with the Double Ratchet algorithm, which continuously rotates encryption keys after each message. This provides forward secrecy (compromising one key does not expose past messages) and future secrecy (compromising one key does not expose future messages).
- **PGP/GPG** — used for email encryption. Relies on a web-of-trust model where users verify each other's public keys, typically through key signing.

When you send a message in a WhatsApp conversation, your device encrypts it with the recipient's public key. The encrypted data travels through WhatsApp's servers, which relay it without being able to read it. Only the recipient's device, holding the corresponding private key, can decrypt the message.

## E2EE vs. Transport Encryption

| Property | TLS (Transport) | E2EE |
|---|---|---|
| Who can read the data | Server can see plaintext | Only endpoints can see plaintext |
| Protects against | Network eavesdroppers | Network eavesdroppers AND server compromise |
| Typical use | HTTPS websites | Encrypted messaging, secure file sharing |
| Metadata visibility | Server sees who communicates, when, and how much | Metadata may still be visible to the server |

Most secure applications use both: TLS for the transport layer and E2EE on top of it for application-layer content protection.

## Limitations

E2EE protects message content during transmission and storage, but it does not protect against threats at the endpoints. If the recipient's device is compromised with malware, the screen can be captured, the private key can be extracted, or unencrypted local backups may exist. Additionally, metadata — who communicated with whom, when, and how frequently — is typically still visible to the service provider. Perfect forward secrecy implementations mitigate some key-compromise risks, but endpoint security remains the weakest link in any E2EE system.
