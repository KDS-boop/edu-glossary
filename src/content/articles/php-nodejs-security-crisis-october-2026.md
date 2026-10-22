---
title: "PHP and Node.js Security Crisis: Critical CVEs and Patch Guide for October 2026"
description: "Two urgent security updates landed on 21 October 2026. Learn which PHP and Node.js versions are affected, what the CVEs mean, and how to patch safely."
category: "Cybersecurity"
tags: ["PHP Security", "Node.js Security", "CVE", "Remote Code Execution", "Patch Management", "Application Security"]
relatedGlossary: ["Preemptive Cybersecurity", "Ransomware", "REST API"]
author: "eduglossary-team"
publishedDate: 2026-10-22
updatedDate: 2026-10-22
draft: false
coverImage: "/images/articles/php-nodejs-security-alert-october-2026.svg"
coverImageAlt: "Security alert illustration comparing PHP and Node.js, highlighting critical vulnerabilities and the need to install patched runtime versions."
---

On 21 October 2026, the PHP and Node.js projects published urgent security updates for vulnerabilities affecting widely used server-side runtimes. PHP disclosed two critical flaws that can allow **unauthenticated remote code execution (RCE)**. Node.js released patched builds for several high-, medium-, and low-severity issues, including a Brotli decoder flaw whose published description says it can permit remote code execution.

This is a serious patching event for teams that operate public websites, APIs, background workers, and server-side applications. It is not evidence that every PHP or Node.js application has been compromised, and the official notices should not be read as proof that every deployment is equally exposed. The correct response is to identify the runtime that is actually running, compare it with the fixed release for that branch, patch promptly, and verify the deployed process.

**Status checked: 22 October 2026.** Security advisories and release notes can change; confirm the current release on the official project pages before executing a production upgrade.

## Executive summary

- **PHP:** Two critical RCE vulnerabilities: CVE-2026-109618 and CVE-2026-109619. Fixed releases announced on 21 October: PHP 8.5.12, 8.4.27, 8.3.36, and 8.2.35.
- **Node.js:** Ten listed security issues, including high-severity TLS/DNS flaws and a Brotli decoder flaw that may permit RCE. Fixed releases: Node.js 22.23.4, 24.22.1, and 26.12.1.

PHP's official advisory rates the two vulnerabilities at CVSS 4.0 9.2 and urges users to update. The Node.js project's release notes mark the highest-severity issues as **HIGH**. These are separate advisories: a PHP patch does not fix Node.js, and updating npm packages does not replace an out-of-date Node.js executable.

## What happened to PHP?

The PHP security advisory published on 21 October describes two critical vulnerabilities. The affected risk surface includes PHP installations serving web requests, such as PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP, and LiteSpeed. The PHP team identifies mod_php as the highest-risk configuration in its advisory, noting a demonstrated exploit in which an unauthenticated request can trigger the vulnerable path before application code runs.

### CVE-2026-109618: RCE through out-of-memory corruption

The first flaw involves out-of-memory (OOM) handling. Under the vulnerable conditions, PHP may be interrupted while its internal request data is only partially initialized. Cleanup code can then treat that invalid data as valid. The security consequence is potential remote code execution.

This is a runtime-level issue, not simply a bug in a particular framework or a package that can be removed with a dependency update. Whether a specific installation is exposed depends on its PHP build, server integration, and request-processing path. Operators should not assume their application-level validation makes the runtime safe.

### CVE-2026-109619: RCE through stale global state

The second flaw concerns internal state associated with a request. According to the advisory, request-owned state can remain after the memory backing it has been freed. A later request handled by the same worker may use that stale state before normal initialization resets it. This can also lead to remote code execution.

The advisory identifies particular paths involving session upload progress and, on PHP 8.5, fatal-error backtraces. Those details matter when assessing temporary exposure-reduction measures, but they do not turn configuration changes into a complete fix.

### Which PHP versions should be installed?

The fixed PHP releases announced on 21 October are:

- **PHP 8.5:** update to 8.5.12 or a newer security-fixed release.
- **PHP 8.4:** update to 8.4.27 or a newer security-fixed release.
- **PHP 8.3:** update to 8.3.36 or a newer security-fixed release.
- **PHP 8.2:** update to 8.2.35 or a newer vendor-fixed release.

The patch number alone is not the whole story when PHP comes from an operating-system vendor. Linux distributions and long-term-support vendors can backport security fixes into their packages. Check the security bulletin for the exact distribution and package version rather than comparing only the upstream version string.

PHP 8.1 and older no longer receive fixes directly from the PHP project, although some vendors may supply backported patches. PHP 8.2 reaches end of life on **31 December 2026**. If an application still depends on 8.2, apply the available security update now and plan a tested move to a supported branch instead of treating this patch as a long-term maintenance plan.

The official source of truth is the [PHP security advisory for the October 2026 RCE vulnerabilities](https://www.php.net/archive/2026.php#2026-10-21-5).

## What happened to Node.js?

The Node.js project published its 21 October security release for the 22.x, 24.x, and 26.x release lines. The notice lists ten issues: four high-severity, three medium-severity, and three low-severity entries. Several fixes also update bundled dependencies, including c-ares, certificate data, OpenSSL on selected lines, SQLite on 22.x, and Undici.

The most important lesson is that a runtime includes more than the JavaScript language engine. Network resolution, TLS certificate validation, compression, HTTP handling, cryptographic randomness, and filesystem permission checks are also part of the security boundary.

### Brotli decoder flaw: CVE-2026-111497

The Node.js advisory describes a Brotli decoder out-of-bounds write that can permit remote code execution and marks it **HIGH**. The affected release lines are Node.js 22.x, 24.x, and 26.x.

The practical exposure depends on whether the vulnerable decoding path is reachable and how the application handles attacker-controlled compressed data. Do not interpret the advisory as proof that every Node.js service can be exploited by sending any ordinary HTTP request; equally, do not dismiss it because the application does not directly import a package named “Brotli.” Review how the runtime and its dependencies process compressed input.

### DNS and TLS hostname validation

Several high-severity fixes address security-sensitive interpretation of hostnames:

- **CVE-2026-105482** concerns `dns.resolve` truncating names containing a NUL character. Validation and resolution must agree on the exact hostname being processed.
- **CVE-2026-105483** concerns a TLS certificate hostname bypass when an IP is written using fullwidth digits. The release notice lists this issue for Node.js 24.x and 26.x.
- **CVE-2026-106069** concerns TLS certificate hostname bypass when a hostname loosely resolves to an IP address. It affects the 22.x, 24.x, and 26.x lines.
- **CVE-2026-106072**, rated medium, concerns improper certificate validation involving non-canonical IPv4 hostnames and DNS Subject Alternative Names.

These fixes matter most to applications that connect to remote services, accept hostnames from users, or rely on Node.js to validate a TLS peer. Hostname parsing, DNS lookup, and certificate verification are related but distinct stages. Application-level string checks should not be used as a substitute for a patched runtime.

### Other Node.js fixes

The same release also corrects a keep-alive socket response-ordering issue, a cryptographic randomness cache problem involving `crypto.randomUUID()` and `randomInt()` in startup snapshots or single-executable applications, issues in ZIP handling, and permission-model defects. These bugs have different impact and exploitability; review the full advisory if your application uses the affected features.

### Which Node.js versions should be installed?

Use the fixed build for the release line your application is intended to run:

- **Node.js 22.x:** 22.23.4.
- **Node.js 24.x LTS:** 24.22.1.
- **Node.js 26.x Current:** 26.12.1.

If the application is pinned to Node.js 24, update to **24.22.1 or a newer security-fixed 24.x release**, subject to your deployment platform's supported runtime. Do not switch from the LTS branch to a Current release just to get a larger version number. Consult the [Node.js 24.22.1 release notes](https://nodejs.org/en/blog/release/v24.22.1/) and the [complete October security notice](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).

## Why this matters to website owners and developers

Both advisories affect common building blocks, but the risks are not identical. PHP's two critical vulnerabilities are described as unauthenticated RCE and are especially urgent for exposed PHP request-processing deployments. Node.js has a broader set of defects, with the most severe marked HIGH, including a Brotli decoder issue with potential RCE and hostname-validation problems.

Potential consequences of runtime compromise include unauthorized code execution under the service account, access to application secrets available to that process, tampering with application data, and use of the compromised service as a foothold. These are general risks of successful server-side code execution, not claims that exploitation has been observed in every affected installation.

Prioritize services that run an affected build and expose the relevant processing path to untrusted input. Confirm upstream or vendor patch status, then deploy and verify the fix; downloading a package alone does not update old workers or containers.

## A practical patch plan

### 1. Inventory production, staging, and development

Record the runtime and deployment method for every service. Check PHP CLI and the web-serving SAPI separately: `php -v` may report a CLI binary that is not the same build as PHP-FPM or Apache's loaded module. Check the PHP package from the system package manager as well as the version reported by the running service.

For Node.js, inspect the process, service unit, container image, build pipeline, and hosting configuration. A version file such as `.nvmrc` or `.node-version` expresses an intended version; it does not prove which executable a running process loaded.

### 2. Upgrade the runtime through its normal distribution path

Use the official PHP downloads or your distribution's updated security package. For Node.js, use the appropriate official release or your platform's supported runtime image. If the application uses a container, update the base image or Node/PHP image tag, rebuild the image, run tests, and redeploy it. Changing a version declaration without rebuilding and restarting does not patch the already-running binary.

Avoid copying a random binary over a production installation. Preserve the ability to roll back application code, but do not roll back to a vulnerable runtime as a routine response to an unrelated application failure.

### 3. Test critical application paths

In a staging environment, run the normal automated test suite and smoke-test login, session handling, uploads, authentication, database connectivity, outbound HTTPS calls, scheduled jobs, and background workers. Verify compatibility with the exact patched runtime. For services using compressed request bodies or network clients, include the corresponding integration tests.

If your package ecosystem reports dependency vulnerabilities, review and fix those too. However, **`npm audit` is not a substitute for updating Node.js itself**: a clean dependency audit does not certify the runtime executable as patched. Likewise, updating Composer libraries does not replace the PHP binary or package.

### 4. Restart every relevant process

After patching, restart PHP-FPM pools, web-server workers, Node.js services, queue consumers, and scheduled workers as appropriate. Replace old containers and make sure the orchestrator has not retained an earlier image. A rolling deployment can leave a mixture of fixed and vulnerable processes if old instances are not drained.

For PHP, follow the upstream advisory's specific operational instructions. It lists temporary exposure-reduction measures for particular paths, but explicitly says they do not make an installation safe. Do not apply a single `php.ini` setting without reviewing the full advisory, resource limits, upload requirements, and server configuration.

### 5. Verify the version after deployment

Run the version checks inside the actual production container or host after the service has restarted. Confirm the package or image digest, inspect deployment logs, and verify that the expected number of healthy workers is running. Retain the change record: affected service, old version, patched version, deployment time, test result, and owner.

### 6. Check for signs of compromise when exposure warrants it

Patching closes a vulnerability; it does not prove the application was never attacked. For an internet-facing system that remained vulnerable, review web-server and application logs, unexpected child processes, unexplained outbound connections, newly modified files, unfamiliar scheduled tasks, and unauthorized account or deployment changes. Preserve relevant logs before rotating or rebuilding anything that may be needed for investigation.

If there is evidence of compromise, isolate the affected service according to your incident-response procedure, preserve evidence, rotate secrets that may have been accessible to the service, and rebuild from a known-good source. Do not publicly claim a breach merely because a vulnerable version was installed; record the vulnerability exposure and the actual evidence separately.

## Quick verification commands

These commands are starting points; run them in the same environment as the deployed service and adapt them to your operating system or container orchestration.

Check the PHP CLI:

```bash
php -v
command -v php
```

Check PHP-FPM separately when it is installed:

```bash
php-fpm -v
```

The binary name can be versioned or provided by the distribution, and the web server may load a different PHP SAPI. Check the service manager, package database, and web-server configuration rather than assuming the CLI output covers every deployment.

Check Node.js:

```bash
node --version
command -v node
node -p "process.execPath"
```

For a container, run the check inside the container that serves traffic, not only on the host. After deployment, compare the result with the patched version for that release line. If `node --version` reports an older build, determine which process or image still uses it before considering the service fully patched.

## Final checklist

Before marking the incident resolved, verify the runtime version inside the deployed service, confirm the vendor's patch status if packages are backported, and restart every relevant worker or replace every old container. Keep a record of the old and new versions plus the deployment and test results. A patched version reduces exposure to the disclosed flaws, but it does not prove that no attack occurred. Investigate suspicious activity separately, and rotate secrets if evidence indicates that they may have been accessed.

## Official sources and further reading

1. [PHP security advisory: critical remote code execution vulnerabilities, 21 October 2026](https://www.php.net/archive/2026.php#2026-10-21-5) — affected server integrations, fixed versions, and interim measures.
2. [PHP 8.5.12 release announcement](https://news-web.php.net/php.announce/513) — official announcement of the PHP 8.5 security release.
3. [Node.js security releases, 21 October 2026](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) — complete CVE list and affected release lines.
4. [Node.js 24.22.1 LTS release notes](https://nodejs.org/en/blog/release/v24.22.1/) — fixes included in the Node.js 24 security release.
5. [Node.js 26.12.1 release notes](https://nodejs.org/en/blog/release/v26.12.1/) — fixes for the Node.js 26 Current line.
6. [Node.js security policy](https://nodejs.org/en/security/) — project guidance for vulnerability reporting and security updates.

The practical takeaway is straightforward: **check the runtime that is actually serving requests, install the fixed release for that runtime branch, restart all relevant workers, and verify the running version afterward.** For the October 2026 PHP and Node.js advisories, dependency updates alone are not sufficient.
