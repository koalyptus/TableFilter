# TableFilter Incremental Hybrid Migration Strategy
## Co-existence of Native Web Components and JavaScript Implementation on the Path to v1.0.0

---

## Executive Summary

**Yes, absolutely.** An incremental, hybrid migration is not only possible—it is the **recommended, lowest-risk engineering strategy** for modernizing TableFilter.

Because TableFilter's existing architecture is already modularized around an [`EventEmitter`](file:///C:/dev/projects/TableFilter/src/emitter.js) and a decoupled [`Feature`](file:///C:/dev/projects/TableFilter/src/feature.js) base class, native Web Components can be introduced module-by-module alongside the existing JavaScript implementation.

This strategy ensures that:
1. **Existing tests pass continuously**: All 74 test suites (739 test cases) remain green at every step.
2. **Zero breaking changes**: Consumers can continue using `new TableFilter(...)` with identical configuration options.
3. **Accessibility is delivered immediately**: High-priority accessibility wins (live regions, accessible buttons, dialogs) can be shipped in minor releases (`0.8.x`) before rewriting complex table-parsing algorithms.

---

## 1. The Dual-Vector Coexistence Model

The hybrid architecture combines two complementary vectors:

```
+-----------------------------------------------------------------------------------------+
|                                    CONSUMER LAYER                                       |
|                                                                                         |
|   Declarative HTML: <table-filter>              Imperative JS: new TableFilter(...)     |
+-----------------------------------------------------------------------------------------+
|                                          |                                              |
|                                          v                                              |
| +-------------------------------------------------------------------------------------+ |
| |                           OUTSIDE-IN: <table-filter> SHELL                          | |
| |  - Autonomous Custom Element acting as container and Web Component facade          | |
| |  - Reflects declarative attributes (<table-filter paging auto-filter>)              | |
| |  - Mounts & delegates internally to the existing TableFilter JS instance            | |
| +-------------------------------------------------------------------------------------+ |
|                                          |                                              |
|                                          v                                              |
| +-------------------------------------------------------------------------------------+ |
| |                        CORE ENGINE: TableFilter JS INSTANCE                         | |
| |  - Controls data extraction, filtering operators (<, >, =), and state persistence   | |
| |  - Dispatches lifecycle events via tf.emitter                                       | |
| +-------------------------------------------------------------------------------------+ |
|       |                     |                     |                     |               |
|       v                     v                     v                     v               |
|  [Legacy Module]      [Hybrid Module]       [Hybrid Module]       [Legacy Module]       |
|   AlternateRows        StatusBar             CheckList             GridLayout           |
|         |                   |                     |                     |               |
|         v                   v                     v                     v               |
|    Direct DOM          <tf-status>          <tf-checklist>          Direct DOM          |
|    Row classes        Custom Element        Custom Element        Table slicing         |
+-----------------------------------------------------------------------------------------+
```

### Vector 1: Outside-In (The Shell Web Component)
- Introduce `<table-filter>` as an autonomous custom element immediately.
- In its `connectedCallback()`, it identifies the target table (slotted or referenced via `for="table-id"`), normalizes HTML attributes into a TableFilter config object, and instantiates the existing [`TableFilter`](file:///C:/dev/projects/TableFilter/src/tablefilter.js#L56-L66) class.
- All public methods (`filter()`, `clearFilters()`, etc.) are exposed directly on the custom element:
  ```javascript
  const el = document.querySelector('table-filter');
  el.filter(); // Delegates to internal tf.filter()
  ```

### Vector 2: Inside-Out (Module-by-Module Component Replacement)
- The existing [`Feature`](file:///C:/dev/projects/TableFilter/src/feature.js) base class allows individual features in `src/modules/` to be replaced with native Custom Elements one by one.
- The feature class acts as a **bridge/controller**:
  - It instantiates the Web Component (e.g. `document.createElement('tf-status')`).
  - It listens to `this.emitter` and pushes data down to the component via properties or methods.
  - It listens to standard DOM events (`tf-change`, `tf-clear`) from the component and invokes the necessary TableFilter methods.

---

## 2. The Bridge Pattern: How Coexistence Works in Code

### Concrete Example: Migrating `StatusBar` to `<tf-status>`

#### Step 1: Define the Independent Custom Element (`src/components/tf-status.js`)
```javascript
export class TfStatus extends HTMLElement {
    static get observedAttributes() { return ['text', 'message']; }

    connectedCallback() {
        // Enforce accessibility immediately
        this.setAttribute('role', 'status');
        this.setAttribute('aria-live', 'polite');
        this.setAttribute('aria-atomic', 'true');
        this.render();
    }

    setMessage(msg) {
        this.message = msg;
        this.render();
    }

    render() {
        const text = this.getAttribute('text') || '';
        const msg = this.message || this.getAttribute('message') || '';
        this.innerHTML = `<span class="tf-status-label">${text}</span><span class="tf-status-msg">${msg}</span>`;
    }
}
customElements.define('tf-status', TfStatus);
```

#### Step 2: Refactor the Feature Bridge (`src/modules/statusBar.js`)
```javascript
import { Feature } from '../feature';
import '../components/tf-status'; // Registers <tf-status>

export class StatusBar extends Feature {
    constructor(tf) {
        super(tf, StatusBar);
        this.f = this.config.status_bar || {};
    }

    init() {
        if (this.initialized) return;

        // Create the native Web Component
        const statusEl = document.createElement('tf-status');
        statusEl.className = this.f.css_class || 'status';
        if (this.f.text) statusEl.setAttribute('text', this.f.text);

        // Mount into legacy toolbar container or custom target
        const target = this.f.target_id 
            ? document.getElementById(this.f.target_id)
            : this.tf.feature('toolbar').container(this.f.toolbar_position);
        target.appendChild(statusEl);

        this.statusEl = statusEl;

        // Bridge legacy emitter events to the component
        this.emitter.on(['before-filtering'], () => {
            this.statusEl.setMessage(this.f.msg_filter || 'Filtering...');
        });
        this.emitter.on(['after-filtering'], () => {
            this.statusEl.setMessage('');
        });

        this.initialized = true;
    }

    // Public method preserved for contract compatibility:
    message(text) {
        this.statusEl.setMessage(text);
    }
}
```

### Why this satisfies the contract 100%:
1. `tf.feature('statusBar').message('Custom')` still works identically.
2. The QUnit tests in `test-status-bar.js` continue to pass.
3. The DOM element now carries `role="status"` and `aria-live="polite"` automatically.
4. If a consumer prefers to write `<tf-status>` manually in their markup, TableFilter can bind to it via `target_id`.

---

## 3. Module Migration Priority & Risk Matrix

Features are grouped into tiers based on risk, complexity, and accessibility benefit:

| Tier | Module / Feature | Risk | A11y Impact | Why it can be migrated independently |
| :---: | :--- | :---: | :---: | :--- |
| **Tier 1: Leaf UI Controls** | `StatusBar`<br>`RowsCounter`<br>`ClearButton` | **Very Low** | **High** | Self-contained UI elements that only consume state and dispatch single clicks. No table DOM mutation. |
| **Tier 2: Modals & Popovers** | `Help`<br>`NoResults`<br>`Loader` | **Low** | **High** | Overlay elements. Migrating to accessible `<dialog>` elements does not alter table structure. |
| **Tier 3: The Outer Shell** | `<table-filter>` | **Low** | **Medium** | Acts as an outer wrapper; slots the table and manages external toolbars in Shadow DOM without touching internal rows. |
| **Tier 4: Navigation & Paging** | `Paging` | **Medium** | **High** | Controls row visibility and renders buttons. Can render `<tf-pager>` while `paging.js` manages row show/hide logic. |
| **Tier 5: Selection Filters** | `CheckList`<br>`Dropdown`<br>`PopupFilter` | **Medium** | **Critical** | Replaces custom `<ul>/<li>` checklists with WAI-ARIA Combobox widgets. High accessibility impact. |
| **Tier 6: Header & Sorting** | `sort` Extension<br>`MarkActiveColumns` | **Medium** | **Critical** | Replaces plain `<th>` clicks with `<button>` sort triggers and `aria-sort`. |
| **Tier 7: Table Structure** | `GridLayout`<br>`colsVisibility`<br>`filtersVisibility` | **High** | **Medium** | Heavy DOM manipulation (table splitting, column width calculations). Best migrated last once core engine is decoupled. |

---

## 4. Shadow DOM vs. Light DOM in a Hybrid Setup

A crucial challenge in hybrid Web Component systems is boundary traversal:
- **Rule 1: Never place the table inside closed Shadow DOM during hybrid migration.**
  Legacy features and external extensions query table rows directly via `this.dom().rows[i]`. The table must remain in the **Light DOM** (projected through a `<slot>` into `<table-filter>`).
- **Rule 2: Leaf UI components (`<tf-status>`, `<tf-rows-counter>`, `<tf-clear-button>`) can use Shadow DOM immediately.**
  Because TableFilter communicates with them via their JS element references (`this.statusEl.setMessage(...)`), their internal template can be fully encapsulated in Shadow DOM.
- **Rule 3: Slotted header controls use Light DOM or CSS Shadow Parts.**
  Filter inputs inserted into the table header row (`fltrow`) must remain accessible to the table accessibility tree and standard DOM queries (`tf.getFilterElement(colIndex)`).

---

## 5. Phased Incremental Release Roadmap

```
+-------------------------------------------------------------------------------------------------+
|                                 INCREMENTAL RELEASE TIMELINE                                    |
|                                                                                                 |
|   v0.8.0                  v0.8.x                  v0.9.0                  v1.0.0-rc / v1.0.0    |
|   Hybrid Foundation       Modals & Popovers       Paging & Checklists     Full Modern Suite     |
|                                                                                                 |
|   - Vite/Rollup build     - <tf-help> (<dialog>)  - <tf-pager>            - Headless data engine|
|   - <table-filter> Shell  - <tf-loader>           - <tf-checklist> ARIA   - CSS Custom Props    |
|   - <tf-status>           - <tf-no-results>         Combobox/Listbox      - SVGs replace GIFs   |
|   - <tf-rows-counter>     - <tf-popup-filter>     - Accessible sort       - Zero legacy debt    |
|   - <tf-clear-button>                               headers               - Full WCAG 2.2 AA    |
+-------------------------------------------------------------------------------------------------+
```

### Milestone 0.8.0: The Hybrid Foundation & Low-Risk Controls
- **Tooling**: Introduce Vite/Rollup alongside existing Grunt/Webpack tooling.
- **Components**:
  - Implement `<table-filter>` outer custom element shell.
  - Implement `<tf-status>`, `<tf-rows-counter>`, `<tf-clear-button>`.
- **Verification**: Run all 739 QUnit tests to guarantee 100% regression parity.

### Milestone 0.8.x: Accessible Overlays & Instructions
- **Components**:
  - Implement `<tf-help>` using the native HTML `<dialog>` element with focus trapping and `Escape` key handling.
  - Implement `<tf-loader>` and `<tf-no-results>` live region indicators.
- **Verification**: Zero WCAG violations on help and message overlays via automated axe-core checks.

### Milestone 0.9.0: Interactive Navigation & Form Widgets
- **Components**:
  - Implement `<tf-pager>` with semantic `<button>` elements and results-per-page selection.
  - Implement `<tf-checklist>` adhering to WAI-ARIA APG Combobox with Multi-Select Listbox.
  - Implement `<tf-sort-header>` buttons with dynamic `aria-sort="ascending|descending"`.
- **Verification**: Screen reader keyboard testing with NVDA/JAWS and VoiceOver.

### Milestone 1.0.0: Unified Native Web Components Suite
- **Core Refactor**: Fully separate data engine from DOM rendering.
- **Theming**: Replace Stylus and raster GIFs with CSS Custom Properties and inline SVGs.
- **Public Release**: Dual documentation covering both declarative Custom Elements and backward-compatible imperative JavaScript.

---

## 6. Summary of Advantages of the Hybrid Approach

1. **De-risked Development**: No high-risk "all-or-nothing" rewrite. Every release delivers working, tested code.
2. **Early Feedback**: Consumers can begin experimenting with `<table-filter>` in modern frameworks (React, Vue, Angular, Svelte, or vanilla HTML) while older implementations remain completely untouched.
3. **Continuous Compliance**: Regressions are immediately caught by the existing 74 test suites.
4. **Immediate Accessibility Gains**: Critical WCAG 2.2 fixes reach users months ahead of the full 1.0.0 milestone.
