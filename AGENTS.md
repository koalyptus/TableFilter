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

## Visual parity

A new `tf-*` custom element adds its visual-parity issue in the same PR that
scaffolds it, and adds an evidence line to the release gate
[#1075](https://github.com/koalyptus/TableFilter/issues/1075). A scaffold PR
without the parity issue is not complete. See `ROADMAP/visual-parity.md`.

## Code comments

Comments document behaviour, not the reasoning behind it. Never reference
internal decisions, justifications or trade-offs: no decision narration
("deliberately not derived", "never built here", "stays with the host"),
no justifications ("so a later render does not discard it", "so the
control is never unnamed"), no trade-offs ("rather than leaving a stale
list behind"), and no purpose clauses that restate a decision.

Write what the code does in the present tense. Cite stable references —
ROADMAP sections, issue numbers, symbol names. Never cite line numbers
(`paging.js:662-669`, `line 123`): they move with every edit and become
maintenance. Platform facts a reader needs ("the native `change` event is
not composed") and contracts a consumer can rely on are fine.

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

Feature PRs do not bump the version by default: the normal channel is the
milestone "Release vX.Y.Z" issue. A patch bump is appropriate only as part
of a PR that impacts the tracked legacy production bundle
(`dist/tablefilter/tablefilter.js`), such as edits to `src/modules/*.js`
that change runtime behaviour. When that applies, bump `package.json`,
`package-lock.json` and `dist/starter.html` in the same PR and record the
bump in the PR body.
