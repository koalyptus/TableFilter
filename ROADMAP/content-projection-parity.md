# Content Projection Parity (custom HTML / slotted content)

**Status:** proposed — owned by [#1012](https://github.com/koalyptus/TableFilter/issues/1012).
**Scope:** every feature that lets a consumer inject markup through config.

## 1. Why this exists

Legacy TableFilter lets consumers inject markup through many config options,
which are written to the DOM with `innerHTML`. The v1.0.0 migration promises
100% configuration/API parity
([v1-webcomponents-investigation.md](./v1-webcomponents-investigation.md) §2.4,
[hybrid-migration-strategy.md](./hybrid-migration-strategy.md)), so every one of
these options must keep working — or the change must be an explicit, documented
migration note ([#947](https://github.com/koalyptus/TableFilter/issues/947)).

Left ad hoc, each bridge would invent its own escape hatch. This document fixes
one mechanism and one set of rules for all of them.

## 2. Inventory (legacy `innerHTML` injection)

| # | Feature | Config key(s) | Property | Injected at | Target element | Milestone |
|---|---------|---------------|----------|-------------|----------------|-----------|
| 1 | ClearButton | `btn_reset.html` (default `<input class="reset">`) | `this.html` | `clearButton.js:173` | `<tf-clear-button>` | 0.8.0 |
| 2 | StatusBar | `status_bar.text`, `msg_*` | `this.text`, `this.msg*` | `statusBar.js:294` | `<tf-status>` | 0.8.0 |
| 3 | RowsCounter | generated count text | `this.label` | `rowsCounter.js:207` | `<tf-rows-counter>` | 0.8.0 |
| 4 | Loader | `loader.html` | `this.html` | `loader.js:125` | `<tf-loader>` | 0.8.x |
| 5 | Help | `help_instructions.html`, `.text`, `.btn_html`, `.btn_text` | `this.instrHtml`, `this.instrText`, `this.btnHtml`, `this.btnText` | `help.js:181,188,194,199` | `<tf-help>` | 0.8.x |
| 6 | NoResults | `no_results_message.content` ("accepts HTML") | `this.content` | `noResults.js:102` | `<tf-no-results>` | 0.8.x |
| 7 | PopupFilter | `popup_filters.image_html` | `this.iconHtml` | `popupFilter.js:256` | `<tf-popup-filter>` | 0.8.x |
| 8 | Paging | `btn_{next,prev,first,last}_page_html` | `this.btn*PageHtml` | `paging.js:400,414,428,442` | `<tf-pager>` | 0.9.0 |
| 9 | filtersVisibility | `btn_text`, `btn_html` (+ computed collapse/expand) | `this.btn*Html`, `this.btnText` | `filtersVisibility.js:234,237` | extension | post-1.0 |
| 10 | colsVisibility | `btn_text` (`'Columns&#9660;'`), `btn_html`, `btn_close_text`, `btn_close_html`, `text` | `this.btn*Html`, `this.btn*Text`, `this.text` | `colsVisibility.js:429,437,524,528` | extension | post-1.0 |
| 11 | colOps | `write_method: 'innerHTML'` | `this.outputTypes` | `colOps.js:425` | light-DOM cells | n/a |

Two properties of this table drive the plan:

- Some **`*_text`** defaults already carry markup or entities
  (`colsVisibility.btn_text = 'Columns&#9660;'`; the **default
  `help_instructions.text` is a block of HTML**). "Text" was never really text.
- Some **`*_html`** defaults are themselves *interactive controls*
  (`<input class="reset">` for ClearButton; `<input>` pager buttons).

## 3. Decision

**Custom content is DOM projected into a slot — not policy-free HTML string
props.** Every migrated component exposes:

- a **default `<slot>`** for consumer-supplied content, and
- **`part`** hooks for nodes the component generates itself.

The bridge maps legacy options onto that surface with these rules.

| Rule | Applies to | Behaviour |
|------|-----------|-----------|
| **P1 Slot-first** | all components | One mechanism: default slot + `part`s. No bespoke `innerHTML` API per component. |
| **P2 `*_html` → light DOM** | `btn_reset.html`, `loader.html`, `help_instructions.html`, `btn_html`, `image_html`, `btn_*_page_html` | Bridge sets `host.innerHTML = cfg`; the slot renders it. Keeps integrator CSS classes working (content stays in light DOM). |
| **P3 `*_text` → text** | `*_text`, `text`, `content`, `msg_*` | Rendered with `textContent`. Legacy defaults that embed markup/entities are split into plain text + a `*_html` path (fix the default, not the consumer). |
| **P4 No nested controls** | button components (ClearButton, Help widget, Paging, filtersVisibility, colsVisibility) | The element *is* the button, so `*_html` must be presentational (icon/label). Default control defaults stay on the legacy path until `::part(button)` theming lands (post-1.0). |
| **P5 Messages: text by default** | StatusBar, NoResults | Messages render as text; markup goes through an explicit HTML channel. |
| **P6 Extensions off-shadow** | colOps, gridLayout | Content written into the light-DOM table is unaffected by Shadow DOM; keep as-is. |
| **P7 Trust boundary** | all | Config HTML is integrator-trusted; the engine does not sanitise (unchanged from legacy). A migrated component must **not silently drop or escape** configured content. |

### P4 in practice

In icon mode `btn_reset.html` is `<input class="reset">`, and the theme paints
the eraser on `input.reset` (`static/style/reset-button.styl`). The element
renders a bare `<button part="button">`, so today the ClearButton bridge routes
`html` to the legacy path (`!this.html`, see #912). That is the correct interim
rule and generalises: **for buttons, presentational `html` is slotted; control
`html` waits for `::part()` theming.**

## 4. Known regression (must resolve)

The merged `<tf-status>` bridge renders messages with `textContent`
(`src/components/tf-status.js`), while legacy `statusBar` used `innerHTML`
(`statusBar.js:294`). Consumers who put markup in `status_bar.text` / `msg_*`
now see escaped text. Resolve before the milestone closes, by either:

- **Fix:** give `<tf-status>` an explicit message **part** the bridge may
  populate with `innerHTML` when the configured value is markup-bearing
  (preserves parity, matches P2/P3), or
- **Document:** declare status messages text-only and record the change in #947.

Recommendation: **fix** — parity is the stated contract, and the value is
integrator-trusted config.

## 5. Per-milestone execution

### 0.8.0 (parity of the shipped leaf components)
- [ ] `<tf-status>`: resolve §4 (fix or documented change).
- [ ] `<tf-clear-button>`: presentational-content slot documented + tested (done in #912 for text mode; add when `::part()` theming lands).
- [ ] `<tf-rows-counter>`: no consumer markup; confirm label is text-only.

### 0.8.x
- [ ] `<tf-loader>`: `loader.html` → slot (P2); text fallback (P3).
- [ ] `<tf-help>`: instructions (`html`/`text`) + button (`btn_html`/`btn_text`) → slot(s); fix the HTML default (#5).
- [ ] `<tf-no-results>`: `content` → slot or part; decide text vs HTML for the default message.
- [ ] `<tf-popup-filter>`: `image_html` → slotted icon (P2), presentational only (P4).

### 0.9.0
- [ ] `<tf-pager>`: `btn_*_page_html` → slotted button content (P2/P4); `btn_*_page_text` → text (P3).

### post-1.0 (extensions)
- [ ] filtersVisibility / colsVisibility: `*_html` → slots, `*_text` → text; fix entity defaults.
- [ ] colOps: unaffected (P6).

## 6. Alternatives considered

- **Keep `innerHTML` string props on every component.** Rejected: duplicates the
  legacy problem, no declarative story, and breaks the "structure/hooks only"
  rule the components already follow.
- **Render everything as `textContent`.** Rejected: silently breaks documented
  HTML config (Help default text, Loader, NoResults, Pager buttons).
- **Sanitise config HTML.** Out of scope: config is integrator-authored and
  trusted; sanitising would change behaviour. Tracked as a separate question if
  we ever accept untrusted content.

## 7. Verification

Each component bridge that handles a `*_html`/`*_text` option adds a Playwright
test asserting (a) the configured content renders through the slot/part, and
(b) it is not dropped. The existing `test/playwright/ce-bridge.spec.js` icon-mode
case is the template.
