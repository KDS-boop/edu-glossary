---
term: "Version Control"
shortDefinition: "A system that records changes to files over time, allowing developers to recall specific versions, compare changes, and collaborate without overwriting each other's work."
metaDescription: "Version control tracks changes to source code over time, enabling developers to collaborate, revert mistakes, and manage multiple versions of a project."
category: "Software Development"
letter: "V"
updatedDate: 2026-09-21
relatedTerms: ["Codebase", "Continuous Integration", "Full Stack", "API", "REST API"]
---

Version control is a system that tracks changes to files over time, enabling developers to recall previous versions, compare differences between versions, and collaborate on shared projects without conflicts. It is the foundational tool of modern software development — no serious software project operates without it.

Git, created by Linus Torvalds in 2005 for Linux kernel development, has become the dominant version control system. Its distributed architecture, performance, and branching model have made it the universal standard, with platforms like GitHub, GitLab, and Bitbucket providing collaboration layers on top.

## How Git Works

Git tracks content as a series of snapshots. When you commit, Git captures the state of all tracked files at that moment and stores it as a **commit** — a permanent record with a unique hash, timestamp, author, and message.

```
commit a3f2b1c
Author: Jane Developer <jane@example.com>
Date:   Mon Sep 15 10:30:00 2026

    Add user authentication endpoint

 Files changed:
   src/routes/auth.ts   | +47 -0
   src/middleware/jwt.ts | +23 -0
   tests/auth.test.ts   | +89 -0
```

Each commit points to its parent commit, forming a directed acyclic graph (DAG). This structure preserves the complete history of every change, making it possible to navigate to any point in the project's history.

## Core Concepts

**Repository.** A directory tracked by Git, containing all files and the complete commit history. The `.git` folder stores the repository's internal database.

**Branch.** An independent line of development. When you create a branch, you create a pointer to a specific commit that diverges from the main line. Changes on a branch do not affect other branches until they are merged. Git branches are lightweight — creating and switching between branches is nearly instantaneous because Git only stores differences.

**Commit.** A snapshot of tracked files at a specific moment. Good commit messages explain *why* a change was made, not just *what* changed. Atomic commits (one logical change per commit) make history readable and rollbacks straightforward.

**Merge.** Integrating changes from one branch into another. Git performs a three-way merge — comparing the two branches and their common ancestor — to produce a combined result. When changes conflict (both branches modified the same lines), Git flags the conflict for manual resolution.

**Remote.** A version of the repository hosted elsewhere (GitHub, GitLab). The default remote is named `origin`. Developers push local commits to the remote and pull remote changes to stay synchronized.

## Why Version Control Matters

**History and accountability.** Every change is recorded with who made it, when, and why. If a bug is introduced, `git blame` and `git bisect` help identify exactly which commit caused it.

**Collaboration without conflict.** Multiple developers can work on the same codebase simultaneously. Branches isolate work, and merges integrate it. Modern Git workflows (feature branches, pull requests) make collaboration structured and reviewable.

**Reversible changes.** Any commit can be reverted. If a deployment introduces a regression, rolling back to a previous commit is a single command. This safety net encourages experimentation and faster iteration.

**Branching for parallel work.** A developer can create a branch to experiment with a feature, fix a bug, or test an idea — all without affecting the stable main branch. This parallelism is essential for teams working on multiple features simultaneously.

## Common Workflows

**Feature branch workflow.** Every feature or fix gets its own branch. The developer works in isolation, pushes the branch, opens a pull request (or merge request), and after code review, the branch is merged into main. This is the dominant workflow for teams using GitHub or GitLab.

**Trunk-based development.** Developers commit directly to main (or short-lived branches that merge within a day). Requires strong CI/CD practices and feature flags to manage incomplete features. Favored by teams prioritizing integration speed over isolation.

**GitFlow.** A structured workflow with dedicated branches for features, releases, and hotfixes. More ceremony than feature branch workflow, but provides clear branch semantics for release management.

## Common Commands

| Command | Purpose |
|---------|---------|
| `git clone` | Copy a remote repository locally |
| `git add` | Stage changes for the next commit |
| `git commit` | Record staged changes as a new commit |
| `git push` | Upload local commits to the remote |
| `git pull` | Download and integrate remote changes |
| `git branch` | Create, list, or delete branches |
| `git merge` | Integrate changes from one branch into another |
| `git log` | View commit history |
| `git diff` | Compare changes between commits or working tree |
| `git stash` | Temporarily shelve uncommitted changes |

## Version Control Beyond Code

While Git was designed for source code, its content-tracking capabilities are useful for any text-based files: documentation, configuration, infrastructure-as-code (Terraform, Ansible), and even data science notebooks. The key requirement is that files are text-based and mergeable — binary files (images, compiled binaries) can be stored but not meaningfully diffed or merged.

For non-text assets (design files, large datasets), specialized version control tools (Git LFS, DVC, P4) complement Git by handling large file storage while Git manages the metadata and workflow.

## Frequently Asked Questions

### What is the difference between Git and GitHub?
**Git** is the distributed version control system — the command-line tool that tracks changes locally and across machines. **GitHub** is a web-based hosting service for Git repositories that adds collaboration features (pull requests, issues, code review, CI/CD, project management). Git works without GitHub; GitHub requires Git. Alternatives include GitLab, Bitbucket, and self-hosted Gitea.

### What is the difference between `git merge` and `git rebase`?
Both integrate changes from one branch into another. **Merge** creates a new commit that combines the two histories — preserves the exact history but creates "merge commits" that some find cluttered. **Rebase** rewrites history by replaying your commits on top of the target branch — produces a linear, cleaner history but modifies commit hashes. Use merge for public/shared branches; rebase for local/feature branches before pushing.

### How do I undo a commit?
- **`git revert <commit>`** — creates a new commit that undoes the changes. Safe for shared history.
- **`git reset --hard <commit>`** — moves the branch pointer back, discarding commits. **Dangerous** for shared history — only use on local commits you haven't pushed.
- **`git commit --amend`** — modifies the most recent commit (message or staged changes). Only for the last local commit.

### What is a "detached HEAD" state?
This happens when you check out a specific commit (not a branch), e.g., `git checkout a1b2c3d`. You are no longer on a branch — new commits won't be attached to any branch and can be lost. To fix: `git checkout -b new-branch-name` to create a branch from that point, or `git checkout main` to return to a branch.

### How do I resolve merge conflicts?
When Git cannot auto-merge (both branches changed the same lines), it marks the conflicted files with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`). Edit the files to resolve the conflict (keep one side, combine, or write new code), then `git add <file>` to mark as resolved, and `git commit` to complete the merge. Tools like `git mergetool` or VS Code's merge editor can help visualize conflicts.
