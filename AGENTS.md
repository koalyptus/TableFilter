# Agent guidelines

Work is tracked in the "TableFilter v1.0.0 Modernization" GitHub Project and
planned in [ROADMAP/](./ROADMAP/README.md). One issue = one small PR.

## Temporary code and follow-ups

When a change leaves temporary code behind (compat aliases, shims, duplicated
logic that a later task removes):

1. Mark it with a `TODO(#<issue>)` comment that links the issue that removes it:
   `// TODO(#881): remove once contains() uses the native helper`
2. Add a checklist item to that issue naming the symbol to delete, plus a
   check such as `grep "TODO(#881)" src` returning nothing.
3. The issue that removes the code must delete the TODO in the same PR.

Never leave a bare `TODO` without an issue number.

## Code comments

Comments document behaviour, not the reasoning behind it. Never reference
internal decisions, justifications or trade-offs: no decision narration
("deliberately not derived", "never built here", "stays with the host"),
no justifications ("so a later render does not discard it", "so the
control is never unnamed"), no trade-offs ("rather than leaving a stale
list behind"), and no purpose clauses that restate a decision.

Write what the code does in the present tense and cite external sources —
legacy line numbers (`paging.js:662-669`), ROADMAP sections, issue
numbers. Platform facts a reader needs ("the native `change` event is not
composed") and contracts a consumer can rely on are fine.

If a comment needs a reason to make sense, the reason belongs in the
issue, PR description or commit body.

## Commits and PRs

- Commit and open PRs as the agent bot (see the `agent-git-setup` and
  `agent-github-access` skills); work in a linked worktree, not the main checkout.
- Reference the issue in the PR body. Use `Refs #n` when the issue needs a
  follow-up, `Closes #n` when the PR completes it (this closes the issue and
  moves it to Done on the board).

## Running tests locally

The test toolchain (grunt-qunit, PhantomJS, Babel 6) is about ten years old and
breaks on current Node. CI runs `npm test` on Node 8.9.4 and builds on Node 24
with `NODE_OPTIONS=--openssl-legacy-provider`. Match that locally.

## Versioning

Do not bump the `package.json` version in feature PRs. Versions change only in
the milestone "Release vX.Y.Z" issue.
