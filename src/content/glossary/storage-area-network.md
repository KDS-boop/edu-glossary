---
term: "Storage Area Network"
shortDefinition: "A dedicated network that connects servers to high-speed data storage devices (disk arrays)."
category: "Cloud Computing"
letter: "S"
updatedDate: 2026-09-19
relatedTerms: ["Cloud Service Provider", "Hybrid Cloud Storage", "Virtualization Software"]
---

A Storage Area Network (SAN) is a specialized network infrastructure that connects multiple servers with shared storage devices such as disk arrays, tape libraries, and solid-state storage. Unlike Network Attached Storage (NAS), which is file-based, SAN provides block-level access to storage, delivering higher performance and flexibility.

## Architecture and Technology

SAN uses specialized communication protocols such as Fibre Channel or iSCSI to connect servers to storage. **Fibre Channel** is a dedicated protocol with high throughput (10 Gbps to 128 Gbps) commonly used in enterprise data centers. **iSCSI** encapsulates SCSI commands within the TCP/IP protocol, enabling it to leverage standard Ethernet networks, which are more cost-effective.

## Enterprise Benefits

SAN separates storage from computation — a single storage array can be shared by dozens of servers, improving resource efficiency and ease of management. Servers can failover to other servers in a cluster since they all see the same disks, facilitating high availability. Backups and snapshots can also be performed at the storage level without consuming server bandwidth.

## Complexity and Cost

Setting up a SAN requires specialized technical expertise and significant hardware investment. Storage performance tuning, snapshot management, and disaster recovery also require careful planning to avoid bottlenecks.
