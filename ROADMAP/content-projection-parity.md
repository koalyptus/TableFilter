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
| 1 | ClearButton | `btn_reset.html` (default `<input class="reset">`) | `this.html` | `clearButton.js:113` | `<tf-clear-button>` | 0.8.0 |
| 2 | StatusBar | `status_bar.text`, `msg_*` | `this.text`, `this.msg*` | `statusBar.js:278` | `<tf-status>` | 0.8.0 |
| 3 | RowsCounter | generated count text | `this.label` | `rowsCounter.js:193` | `<tf-rows-counter>` | 0.8.0 |
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
| **P4 No wrapper (route 2)** | button components (ClearButton, Help widget, Paging, filtersVisibility, colsVisibility) | The element renders the bare `<slot>`; a slotted control is the control; the host adds button semantics only for element-rendered content. No nested controls. |
| **P5 Messages preserve HTML** | StatusBar, NoResults | The message node renders configured values as HTML (`innerHTML`), matching legacy `statusBar` (`msgContainer.innerHTML = t`). The label/`text` stays text (legacy used a text node). No silent escaping. |
| **P6 Extensions off-shadow** | colOps, gridLayout | Content written into the light-DOM table is unaffected by Shadow DOM; keep as-is. |
| **P7 Sanitised boundary** | all | Config HTML is integrator-authored but always passed through `sanitizeHtml()` (DOMPurify) before `innerHTML`: ordinary markup is preserved, scripts / event handlers / `javascript:` URLs are stripped. The one shared helper is the trust boundary. |

### P4 in practice — route 2 (no wrapper)

The element template is `<button part="button"><slot></slot></button>`, so a
slotted `btn_reset.html` becomes a control inside a control
(`<button><input type="button" class="reset"></button>` — invalid, two
activatable elements). Legacy had no wrapper: the `<input class="reset">` /
`<a class="reset">` was the control.

**Chosen route: 2 (no wrapper).** The element renders the bare `<slot>` and
never wraps consumer content in a `<button>`. The contract:

- **Consumer content** (`*_html`, or declarative light DOM) is projected
  verbatim and owns its semantics. For `btn_reset.html` the `<input
  class="reset">` / `<a class="reset">` stays the control. The host adds **no**
  `role="button"`/`tabindex` (no double control) but still listens for the
  bubbling `click` to fire the feature action.
- **No consumer content**: the element renders its own control *and only then*
  exposes button semantics (`role="button"`, `tabindex="0"`, Enter/Space),
  themed via `::part(button)`.

Consequences:

- `btn_reset.html` works verbatim, including the default `<input class="reset">`
  icon, so the theme's `input.reset` (`static/style/reset-button.styl`) keeps
  painting it. The interim `!this.html` icon-mode fallback to the legacy path
  can then be dropped.
- `<tf-clear-button>` must change: remove the wrapper `<button>` and stop
  `_update()` setting `button.textContent` (today that deletes the `<slot>`, so
  slotted content is never projected).
- Pager / filtersVisibility / colsVisibility / Help widget adopt the same
  shape: bare slot; host semantics only for element-rendered content.

Trade-off accepted: for consumer-supplied controls the element is a wrapper,
not a single `<button>`.

## 4. Resolved regression: `<tf-status>` HTML messages

The merged `<tf-status>` bridge renders messages with `textContent`
(`src/components/tf-status.js`), while legacy `statusBar` used `innerHTML`
(`statusBar.js:278`). Consumers who put markup in `status_bar.text` / `msg_*`
now see escaped text.

**Decision (parity wins): fix.** Render the `message` part with `innerHTML`
from the `message` attribute, i.e. `this._msgEl.innerHTML = ...`, with the
markup passed through `sanitizeHtml()` first (P7). The `label` part stays
`textContent` — legacy also used a text node for `text`
(`statusBar.js` `labelSpan.appendChild(createText(this.text))`), so it is
already correct. Implemented in
[#1014](https://github.com/koalyptus/TableFilter/issues/1014), with
HTML-message and sanitiser tests.

## 5. Per-milestone execution

### 0.8.0 (parity of the shipped leaf components)
- [ ] `<tf-status>`: render the message part as sanitised HTML (§4, decided); keep the label as text.
- [ ] `<tf-clear-button>`: rework to route 2 (§3) — remove the wrapper
      `<button>`, keep the `<slot>`, stop `_update()` deleting it, and add host
      semantics only for element-rendered content. Then drop the `!this.html`
      icon-mode fallback.
- [ ] `<tf-rows-counter>`: no consumer markup; confirm label is text-only.

### 0.8.x
- [ ] Route every `*_html` injection below through `sanitizeHtml()` (P7).
- [ ] `<tf-loader>`: `loader.html` → slot (P2); text fallback (P3).
- [ ] `<tf-help>`: instructions (`html`/`text`) + button (`btn_html`/`btn_text`) → slot(s); fix the HTML default (inventory row 5).
- [ ] `<tf-no-results>`: `content` → slot or part; decide text vs HTML for the default message.
- [ ] `<tf-popup-filter>`: `image_html` → slotted icon (P2); the icon element owns its semantics (P4 route 2).

### 0.9.0
- [ ] `<tf-pager>`: `btn_*_page_html` → slotted button content (P2/P4 route 2); `btn_*_page_text` → text (P3).

### post-1.0 (extensions)
- [ ] filtersVisibility / colsVisibility: `*_html` → slots, `*_text` → text; fix entity defaults.
- [ ] colOps: unaffected (P6).

## 6. Alternatives considered

- **Keep `innerHTML` string props on every component.** Rejected: duplicates the
  legacy problem, no declarative story, and breaks the "structure/hooks only"
  rule the components already follow.
- **Render everything as `textContent`.** Rejected: silently breaks documented
  HTML config (Help default text, Loader, NoResults, Pager buttons).
- **No sanitiser.** Rejected (review on
  [#1014](https://github.com/koalyptus/TableFilter/issues/1014)): raw
  `innerHTML` of config
  markup is an XSS sink waiting for one accidental untrusted value. Instead
  every injection goes through `sanitizeHtml()` (`src/sanitize.js`,
  **DOMPurify**), the project's first runtime dependency. It is a boundary, not
  a behaviour change for benign config.

## 7. Verification

Each component bridge that handles a `*_html`/`*_text` option adds a Playwright
test asserting (a) the configured content renders through the slot/part,
(b) it is not dropped, and (c) for `*_html`, dangerous markup is stripped by
`sanitizeHtml()` (see the `tf-status` sanitiser test in
[#1014](https://github.com/koalyptus/TableFilter/issues/1014)). The existing
`test/playwright/ce-bridge.spec.js` icon-mode case is the template.
