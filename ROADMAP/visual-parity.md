# Visual Parity Gate (legacy look, zero consumer CSS)

**Status:** active — tracked by the epic [#1049](https://github.com/koalyptus/TableFilter/issues/1049)
and enforced at release by [#1075](https://github.com/koalyptus/TableFilter/issues/1075).
**Scope:** every `tf-*` custom element and the `<table-filter>` shell.

## 1. Goal

A page that adopts a bridged `tf-*` component renders the legacy default look
from the shipped stylesheet (`dist/tablefilter/style/tablefilter.css`) and the
shipped themes, with zero presentation CSS required from the consuming page.
Consumer `::part()` rules remain an optional override surface, never a
requirement.

## 2. Current state

The bridges apply the legacy class to the **host** only
(`src/modules/statusBar.js:240`, `src/modules/rowsCounter.js:141`,
`src/modules/paging.js:419`). Shadow internals are therefore unreachable from
the shipped stylesheet: `grep -rn "::part" static/style` returns nothing.
`demos/tf-pager.html` and `demos/tf-checklist.html` carry no component
presentation CSS (the shared `partials/style.html` partial styles page chrome
only) and render unstyled native controls; `<tf-help>` is not on this branch
(see #913).

Parity is a target, not a property of the current build.

## 3. Work units: one issue per component

Each component has its own parity issue with its own checklist, tests and
closing gate:

| Component | Legacy stylesheet | Issue |
|---|---|---|
| `<table-filter>` | `static/style/table.styl`, `filters.styl`, `toolbar.styl` | [#1076](https://github.com/koalyptus/TableFilter/issues/1076) |
| `<tf-status>` | `static/style/status-bar.styl` | [#1077](https://github.com/koalyptus/TableFilter/issues/1077) |
| `<tf-rows-counter>` | `static/style/rows-counter.styl` | [#1078](https://github.com/koalyptus/TableFilter/issues/1078) |
| `<tf-clear-button>` | `static/style/reset-button.styl` | [#1079](https://github.com/koalyptus/TableFilter/issues/1079) |
| `<tf-pager>` | `static/style/paging.styl` | [#1080](https://github.com/koalyptus/TableFilter/issues/1080) |
| `<tf-results-per-page>` | `static/style/paging.styl:66` (`select.rspg`), `:72` (`span.rspgSpan`) | [#1081](https://github.com/koalyptus/TableFilter/issues/1081) |
| `<tf-checklist>` | `static/style/filter-checklist.styl` | [#1082](https://github.com/koalyptus/TableFilter/issues/1082) |
| `<tf-help>` | `static/style/help.styl` | [#1083](https://github.com/koalyptus/TableFilter/issues/1083) |

The epic [#1049](https://github.com/koalyptus/TableFilter/issues/1049) holds
only the cross-cutting work (`::part` naming, host-class to part mapping,
`static/style` plumbing, theme matrix, shared harness) and closes when every
component issue closes.

## 4. Per-component issue template

1. Legacy stylesheet source with `file:line` references and the legacy class
   list.
2. Host class the bridge applies, and the legacy class to `::part` mapping.
3. An explicit statement when a part has **no** legacy equivalent, so "parity"
   is not claimed where it cannot exist (checklist trigger, help modal,
   `results-label`/`results-text` — the legacy label is a sibling `span.rspgSpan`
   with no association to the select, `src/modules/paging.js:833-848`).
4. The demo page that proves the component with zero page CSS.
5. Themes: `default`, `mytheme`, `skyblue`, `transparent`.
6. Bridge-state coupling, e.g. `<tf-pager>` requires `enable_icons: false`
   (`src/modules/paging.js:383-385`), which also moves the clear button onto
   the element path and drops the theme-painted eraser (#1048).
7. Evidence lines for the release gate (§6).

## 5. Release gate

The gate is [#1075](https://github.com/koalyptus/TableFilter/issues/1075)
("Release v1.0.0: visual parity gate", milestone "v1.0.0 Release"). It lists
every component issue and cannot be closed without evidence. It also tracks the
non-styling blockers (#1027, #1012, #965) and the closure of milestones 1-3.

"Legacy default look" means the legacy visual language, not pixel identity. A
component may deviate where its accessible implementation requires it — for
example the native `<dialog>` top layer for `<tf-help>` instead of the legacy
absolutely positioned box. Deviations are approved per component and recorded
in that component's issue.

## 6. Evidence tiers

| Tier | What it is | Cost | Role |
|---|---|---|---|
| **A** | One screenshot per component per shipped theme, attached to #1075, plus an explicit sign-off line per component | Minutes per component at release; no tooling | **Mandatory** release evidence |
| **B** | A handful of `getComputedStyle` assertions per component pinning invariants the legacy stylesheet defines (colour, border, padding, width) | An afternoon per component, inside the existing Playwright suite | Optional, opportunistic; **not** a release condition |
| **C** | Screenshot baselines and visual-regression diffing | A project of its own | Out of scope for the gate |

Tier A is the gate because it produces an artefact someone can inspect. Tier B
proves that a shipped rule reaches a part, not that the result looks like
legacy; it cannot judge spacing, hierarchy or alignment. Tier C stays out of
scope: making automated visual verification a precondition would turn a parity
commitment into a tooling project.

## 7. Rules

- Parity work stays additive: no token removal, no class rename. Token
  modernization remains in the "Styling modernization (post-1.0)" milestone.
- The component demos carry no presentation CSS beyond optional consumer
  overrides; a demo rule that styles a part is a gap, not the shipped default.
- A new `tf-*` element adds its parity issue in the same PR that scaffolds the
  element, and adds an evidence line to #1075. Without it the scaffold is not
  done.
