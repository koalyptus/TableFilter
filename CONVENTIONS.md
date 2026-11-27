# Component conventions, patterns and practices

Template for implementing a new `<tf-*>` custom element and its Playwright gate.
Derived from `tf-pager`, `tf-checklist`, `tf-results-per-page`, `tf-popup-filter` and
`<tf-sort-header>`. Every new component PR should run through this checklist before
opening a review.

## 1. File placement

- [ ] Source: `src/components/tf-<name>.js`
- [ ] Spec: `test/playwright/tf-<name>.spec.js`
- [ ] Not part of the legacy webpack bundle; consumers load it as a module
- [ ] No entry added to the Vite `inject-ext-imports` registry unless the component is
  shipped in the published UMD/ESM bundle

## 2. Shadow root and template

- [ ] `attachShadow({ mode: 'open' })` in the constructor
- [ ] A single shared `TEMPLATE` document fragment cloned once per instance
- [ ] Template uses `part` attributes only; **no** `class` attributes or baked-in
  presentational styles (`classless` and `styleless` assertions in the spec)
- [ ] Content projected through named or default slots where the host supplies markup
- [ ] One `<button type="button">` per interactive trigger, or `role="button"` equivalent
- [ ] Decorative spans use `aria-hidden="true"` and no `tabindex`

## 3. Attribute and API conventions

- [ ] `static get observedAttributes()` lists exactly the configuration keys the
  component handles — nothing more, nothing less
- [ ] `connectedCallback()` calls `_update()`
- [ ] `attributeChangedCallback()` calls `_update()`
- [ ] `_update()` renders label text and accessible name into shadow parts
- [ ] `setText(text)` sets the `text` attribute; empty/null renders empty text content
- [ ] `setLabel(label)` sets the `accessible-label` attribute; empty/null removes `aria-label`
- [ ] Attribute → config mapping follows `components/attributes.js` conventions
  (`isSkippedAttribute()` skips `id`, `class`, `style`, `slot`, hidden, title, lang,
  dir, role, tabindex, part, exportparts, `data-*`, `aria-*`)
- [ ] Live-region contract (`role="status"`, `aria-live="polite"`, `aria-atomic="true"`)
  enforced via `applyLiveRegion()` when the component announces updates

## 4. Accessibility (WCAG 2.2 AA target)

- [ ] No accessible names are invented: no `aria-label`, `aria-labelledby`, `title` or
  `aria-sort` until matching attributes are set
- [ ] The element's visible content is its accessible name by default
- [ ] `accessible-label` overrides the default name on the trigger
- [ ] Keyboard activation: Enter and Space activate the focused trigger
- [ ] Composed click retargets to the host element (legacy `<th>` listeners work)
- [ ] All interactive controls reachable by keyboard only
- [ ] Scoped axe scan reports **0 violations** (`scanAccessibility` with `{ include: ... }`)

## 5. Styling / theming

- [ ] No CSS class or presentational style shipped in the element
- [ ] Styling surface is `--tf-*` custom properties + `::part()` hooks
- [ ] `::part()` names documented in the component's docstring
- [ ] Visual parity issue created for the component (see ROADMAP/visual-parity.md)
- [ ] Entry added to the `#1075` release-gate checklist
- [ ] Demo page carries no presentation CSS beyond optional consumer overrides

## 6. Playwright spec template

- [ ] Registers an open shadow root exposing the documented parts (in document order)
- [ ] Invents no accessible names by default
- [ ] Renders accessible names from attributes when set, removes them when cleared
- [ ] Renders attribute text as text content (markup shown literally, XSS-safe)
- [ ] Projects markup through the named/default slot(s)
- [ ] `setText()` / `setLabel()` update trigger text and `aria-label`
- [ ] Exposes `::part()` styling hooks for theming
- [ ] Composed click on the trigger bubbles/retargets to the host
- [ ] Enter and Space activate the focused trigger
- [ ] Two elements keep independent state
- [ ] Upgrades declarative markup present before the module loads
- [ ] Importing the module again keeps a single definition
- [ ] Does not replace an existing definition
- [ ] Does not define the element when `customElements` is unavailable
- [ ] Scoped axe scan passes with 0 violations
- [ ] All tests pass: `npx playwright test test/playwright/tf-<name>.spec.js`

## 7. Comment conventions (see AGENTS.md)

- [ ] Comments document behaviour in the present tense; no decision narration,
  justifications, trade-offs or purpose clauses that restate a decision
- [ ] Cite stable references (issue numbers, ROADMAP sections, symbol names);
  **never cite line numbers**
- [ ] Out-of-scope behaviour explicitly named (e.g. `#932 sets aria-sort`, `#933
  bridges the sort extension`)

## 8. Issue and PR obligations

- [ ] Component issue created with checklist, tests and closing gate
- [ ] Parity issue added to `ROADMAP/visual-parity.md` component table
- [ ] Evidence line added to `#1075` release-gate checklist
- [ ] PR body: `Closes #n`, `Refs #n+1` where relevant
- [ ] No version bump unless the tracked legacy production bundle changes
- [ ] `eslint src/components/tf-<name>.js test/playwright/tf-<name>.spec.js` passes
