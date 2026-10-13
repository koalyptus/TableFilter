# TableFilter: Preliminary Workstreams & Milestone 0.8.0 Blueprint
## Tooling Modernization, Dependency Rationalization, Automated A11y Testing, and Initial Hybrid Components

---

## Executive Summary

To establish a solid, regression-proof foundation before introducing Web Components, three preliminary workstreams must be completed. These workstreams eliminate decade-old build debt, remove unnecessary third-party dependencies in favor of modern standard browser APIs, and establish an automated test and accessibility gate. 

Once in place, **Milestone 0.8.0** introduces the first hybrid Web Components: the `<table-filter>` shell element and the `<tf-status>` accessible status indicator.

```
+-----------------------------------------------------------------------------------------+
|                                PRELIMINARY WORKSTREAMS                                  |
|                                                                                         |
|   1. Build Tooling (Vite)        2. Dependency Rationalization    3. Testing & A11y     |
|   - ESM, CJS, UMD outputs        - diacritics -> String.normalize - Playwright QUnit    |
|   - CSS Custom Properties        - format-number -> Intl.Number   - Axe-Core A11y gate  |
+-----------------------------------------------------------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------------+
|                                    MILESTONE 0.8.0                                      |
|                                                                                         |
|   <table-filter> Shell Element               <tf-status> Custom Element                 |
|   - Wraps existing TableFilter JS            - Open Shadow DOM with ::part()            |
|   - Slotted light DOM <table>                - role="status", aria-live="polite"        |
|   - Dispatches DOM CustomEvents              - Full backward-compat with StatusBar      |
+-----------------------------------------------------------------------------------------+
```

---

## 1. Preliminary Workstream A: Build Tooling Migration (Vite + Modern CSS)

### Current Limitations (`v0.7.3`)
- **Webpack 4 + Grunt**: Relies on deprecated Node 8–10 conventions and fails under modern Node.js versions (`v24.x`).
- **Stylus Preprocessor**: Pre-compiles CSS into static sheets using raster `.gif`/`.png` assets, preventing dynamic runtime CSS customization.

### Target Architecture (Vite)
- **Zero-Config Dev Server**: Instant hot-module replacement for local development and demos.
- **Multi-Format Distribution Output**:
  - `dist/tablefilter.esm.js` (Modern ES Module for `import TableFilter from 'tablefilter'`).
  - `dist/tablefilter.cjs.js` (CommonJS module for legacy Node/bundlers).
  - `dist/tablefilter.umd.js` (UMD bundle exposing `window.TableFilter`).
  - `dist/tablefilter/tablefilter.js` (Preserves the exact legacy distribution path).

### Vite Configuration Blueprint (`vite.config.js`)
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'TableFilter',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => {
                if (format === 'es') return 'tablefilter.esm.js';
                if (format === 'cjs') return 'tablefilter.cjs.js';
                return 'tablefilter.umd.js';
            }
        },
        rollupOptions: {
            output: {
                exports: 'named',
                globals: {}
            }
        },
        sourcemap: true,
        minify: 'esbuild'
    },
    server: {
        port: 8080,
        open: '/demos/index.html'
    }
});
```

### Modern CSS & Custom Properties Transition
- Retain existing CSS class names (`.flt`, `.fltsRow`, `.status`, `.pgSlc`, `.div_checklist`) to guarantee that consumer styling does not break.
- Modernize styles by substituting hardcoded colors with **CSS Custom Properties**:
  ```css
  :root, table-filter {
      --tf-primary: #0969da;
      --tf-primary-hover: #085fc4;
      --tf-bg: #ffffff;
      --tf-text: #24292f;
      --tf-border: #d0d7de;
      --tf-focus-ring: #0969da;
      --tf-row-alt: #f6f8fa;
  }
  ```

---

## 2. Preliminary Workstream B: Dependency Rationalization

### 1. Eliminating `diacritics` (in [`src/string.js`](../src/string.js))
*Current Code*:
```javascript
import {remove as removeDiacritics} from 'diacritics';
// Used in contains(term, data, ..., ignoreDiacritics = true)
```

*Replacement (Native W3C / ECMAScript)*:
```javascript
// Native Unicode Canonical Decomposition (NFD) + Combining Diacritical Mark removal
export const removeDiacritics = (text) => {
    if (!text) return '';
    return String(text)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};
```
*Benefits*:
- 100% native in all modern browsers and Node.js.
- Drops ~15 KB dependency.
- Identical output across all European diacritical marks (e.g. `é` &rarr; `e`, `ç` &rarr; `c`, `ö` &rarr; `o`).

### 2. Eliminating `format-number` (in [`src/extensions/colOps/colOps.js`](../src/extensions/colOps/colOps.js))
*Current Code*:
```javascript
import formatNumber from 'format-number';
// formatNumber(format)(result)
```

*Replacement (Standard Native `Intl.NumberFormat` / Formatter Utility)*:
```javascript
export const formatNumberValue = (value, options = {}) => {
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) return '';

    const decimal = options.decimal || '.';
    const thousands = options.integerSeparator || (decimal === ',' ? '.' : ',');
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    const precision = options.precision !== undefined ? options.precision : 2;

    const parts = num.toFixed(precision).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    const formatted = parts.join(decimal);

    return `${prefix}${formatted}${suffix}`;
};
```
*Benefits*:
- Drops external `format-number` dependency (~30 KB).
- Exactly matches ColOps format configuration contract (`decimal`, `integerSeparator`, `prefix`, `suffix`).

---

## 3. Preliminary Workstream C: Test Runner Modernization & Automated A11y

### Preservation of Existing 74 QUnit Test Suites
The project contains 74 QUnit test files in `test/*.html` with 739 assertions. Rewriting all 74 HTML test fixtures upfront introduces high risk of regression.

### Modern Playwright Test Harness
Playwright can execute the existing QUnit test suites directly against Chromium, Firefox, and WebKit without modifying a single test assertion:

```javascript
// test/runner.spec.js (Playwright QUnit runner)
import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const testFiles = readdirSync('test').filter(f => f.endsWith('.html'));

for (const file of testFiles) {
    test(`QUnit Suite: ${file}`, async ({ page }) => {
        await page.goto(`http://localhost:8080/test/${file}`);
        
        // Wait for QUnit test execution to complete
        await page.waitForSelector('#qunit-testresult .total', { timeout: 10000 });
        
        // Assert zero test failures
        const failed = await page.locator('#qunit-testresult .failed').innerText();
        expect(Number(failed)).toBe(0);
    });
}
```

### Integration of `@axe-core/playwright`
Every test fixture will automatically run an accessibility audit during test execution:
```javascript
import AxeBuilder from '@axe-core/playwright';

test(`Accessibility Audit: ${file}`, async ({ page }) => {
    await page.goto(`http://localhost:8080/test/${file}`);
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze();
    
    expect(results.violations).toEqual([]);
});
```
This guarantees that as we modernize components, accessibility regressions are flagged immediately in CI.

---

## 4. Milestone 0.8.0: Initial Hybrid Web Components

Once the preliminary tooling is established, Milestone 0.8.0 implements the first two Web Components:

### Component 1: `<table-filter>` Shell Component (`src/components/table-filter.js`)
An autonomous custom element that acts as an outer container for slotted tables:

```javascript
export class TableFilterElement extends HTMLElement {
    connectedCallback() {
        // Find slotted table or child table
        const table = this.querySelector('table') || 
            (this.hasAttribute('for') ? document.getElementById(this.getAttribute('for')) : null);
        
        if (!table) return;

        // Extract declarative attributes into TableFilter options
        const config = this._extractConfig();

        // Instantiate existing TableFilter JS engine
        this.tf = new TableFilter(table, config);
        this.tf.init();

        // Bridge internal events to native DOM CustomEvents
        this.tf.emitter.on(['after-filtering'], (tf, args) => {
            this.dispatchEvent(new CustomEvent('tf-filter', { detail: { tf, args }, bubbles: true }));
        });
    }

    disconnectedCallback() {
        if (this.tf) {
            this.tf.destroy();
            this.tf = null;
        }
    }

    // Expose public API methods directly on the DOM element
    filter() { return this.tf.filter(); }
    clearFilters() { return this.tf.clearFilters(); }
    getFilteredData() { return this.tf.getFilteredData(); }
}
customElements.define('table-filter', TableFilterElement);
```

### Component 2: `<tf-status>` Component (`src/components/tf-status.js`)
An accessible status message component encapsulating Open Shadow DOM with CSS parts:

```javascript
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: inline-block; }
    .status-text { margin-right: 0.25rem; font-weight: normal; }
    .status-msg { font-weight: 600; color: var(--tf-status-color, inherit); }
  </style>
  <span class="status-text" part="label"></span>
  <span class="status-msg" part="message"></span>
`;

export class TfStatusElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._labelEl = this.shadowRoot.querySelector('.status-text');
        this._msgEl = this.shadowRoot.querySelector('.status-msg');
    }

    connectedCallback() {
        this.setAttribute('role', 'status');
        this.setAttribute('aria-live', 'polite');
        this.setAttribute('aria-atomic', 'true');
        this._update();
    }

    static get observedAttributes() { return ['text', 'message']; }
    attributeChangedCallback() { this._update(); }

    setMessage(msg) {
        this.setAttribute('message', msg || '');
    }

    _update() {
        if (this._labelEl) this._labelEl.textContent = this.getAttribute('text') || '';
        if (this._msgEl) this._msgEl.textContent = this.getAttribute('message') || '';
    }
}
customElements.define('tf-status', TfStatusElement);
```

### Updating [`StatusBar`](../src/modules/statusBar.js#L26-L35) Feature Class
- Update `src/modules/statusBar.js` to create `<tf-status>` instead of raw `<div>` and `<span>` elements.
- The feature class retains all public properties and methods (`statusBar.message(...)`), fulfilling 100% of the existing contract.

---

## 5. Execution Step Checklist

| Step # | Task Description | Verification Gate |
| :---: | :--- | :--- |
| **1.1** | Replace `diacritics` import with native `String.prototype.normalize('NFD')` in `src/string.js`. | Existing string and filtering tests pass. |
| **1.2** | Replace `format-number` in `src/extensions/colOps/colOps.js` with native formatter. | Existing `test-col-ops.js` tests pass. |
| **1.3** | Create `vite.config.js` with ESM, CJS, and UMD library builds. | Vite builds bundle without errors; outputs verified. |
| **1.4** | Setup Playwright QUnit test runner. | All 74 existing QUnit test files execute and pass. |
| **1.5** | Implement `<table-filter>` Custom Element in `src/components/table-filter.js`. | Declarative `<table-filter>` demo page mounts and filters. |
| **1.6** | Implement `<tf-status>` Custom Element and connect to `src/modules/statusBar.js`. | `test-status-bar.js` passes with zero regressions; screen reader live region verified. |
| **1.7** | Integrate `@axe-core/playwright` accessibility check for status bar. | Zero accessibility violations reported. |
