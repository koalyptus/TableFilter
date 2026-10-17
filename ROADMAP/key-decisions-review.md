# Technical Review of Key Architectural Decisions
## In-Depth Analysis, Trade-Offs, and Implementation Blueprints for TableFilter

---

## Decision 1: Build Tooling Migration (Vite + Modern CSS)

### 1.1 Context & Current State
- **Current Setup**: Grunt orchestrating Webpack 4, Stylus (`.styl`), Babel 7.10, and multiple deprecated Grunt plugins (`grunt-shell`, `grunt-string-replace`, `grunt-qunit-istanbul`).
- **Core Problems**:
  1. **Node 24 Incompatibility**: Node `v24.16.0` fails or throws deprecation warnings with Webpack 4 and older Babel plugins.
  2. **Monolithic Bundle**: Webpack 4 produces a single UMD file without tree-shakable ES Module (ESM) exports for modern bundlers.
  3. **CSS Rigidity**: Stylus compiles static stylesheets with hardcoded hex colors and raster images (`.gif`/`.png`), preventing dynamic runtime theme customization or dark mode support.
  4. **Build Speed**: Grunt/Webpack dev build cycles take 4–8 seconds, whereas modern tools provide sub-second hot-reloading.

### 1.2 Proposed Architecture with Vite
- **Multi-Format Distribution (`vite.config.js`)**:
  Vite (backed by Rollup and esbuild) will output three standard bundles from the same single source codebase:
  1. `dist/tablefilter.esm.js`: Native ES Module (`import TableFilter from 'tablefilter'`) for modern bundlers (Vite, Webpack 5, Rollup, Next.js).
  2. `dist/tablefilter.cjs.js`: CommonJS (`const TableFilter = require('tablefilter')`) for Node / SSR environments.
  3. `dist/tablefilter.umd.js` & `dist/tablefilter/tablefilter.js`: Universal Module Definition (UMD) exposing `window.TableFilter`, preserving **100% path and API compatibility** for legacy `<script>` tag users.

```
                  +-------------------------------------------------------+
                  |                 src/ (ESM Source Code)                |
                  +-------------------------------------------------------+
                                              |
                                              v
                              +-------------------------------+
                              |      Vite / Rollup Engine     |
                              +-------------------------------+
                                  /           |           \
                                 v            v            v
             +---------------------+  +---------------+  +---------------------+
             | dist/tablefilter.esm|  |dist/...cjs.js |  | dist/tablefilter.umd|
             |       (ESM)         |  |    (CJS)      |  | & dist/.../tablefilter|
             +---------------------+  +---------------+  +---------------------+
```

### 1.3 CSS Modernization Strategy
- **Preserve CSS Selectors**: Keep all existing class names (`.flt`, `.fltsRow`, `.status`, `.pgSlc`, `.div_checklist`, `.rspg`) intact so third-party stylesheets continue working without changes.
- **Preserve the core styling configuration**: Styling is not only per-feature. The engine (`src/tablefilter.js`) owns the stylesheet/theme **loader** (`base_path`, `style_path`, `stylesheet`, `themes`, `themes_path`, `enable_default_theme`) and the core class options (`flts_row_css_class`, `flt_css_class`, `flt_multi_css_class`, `flt_small_css_class`, `single_filter.css_class`, `btn_css_class`) plus the `TF` / `resp` / `sticky` classes applied to the table. Per-feature classes live in the modules and extensions. All of these must keep working when the components take over; porting the loader and core keys into `<table-filter>` is tracked by **#993**.
- **Introduce CSS Custom Properties (`--tf-*`)** _(additive, not a replacement for the class + stylesheet + theme system)_:
  Replace hardcoded color definitions with CSS variables:
  ```css
  :root, table-filter {
      --tf-primary: #0969da;
      --tf-primary-hover: #085fc4;
      --tf-border: #d0d7de;
      --tf-bg: #ffffff;
      --tf-text: #24292f;
      --tf-focus-ring: #0969da;
      --tf-row-alt: #f6f8fa;
      --tf-active-col: #ddf4ff;
  }
  ```
  **Status — additive and deferred.** The tokens are an inert scaffold introduced in #892: every use is `var(--tf-x, <previous value>)`, so rendering is unchanged and the theme stylesheets keep overriding exactly as before. The token *API* and its documentation (#945), the Stylus→CSS build (#944), SVG icons (#943) and dark mode / forced-colors (#969) are a **follow-on "Styling modernization" project after v1.0.0 parity**, not part of the parity milestone. Parity does not depend on them: shadow internals are themeable via the host class + `::part()` (custom properties are an ergonomic overlay for bulk/runtime/cross-boundary theming, and are colours only).
- **Stylus Deprecation Path** _(post-parity, see above)_:
  - Phase 1: Output standard CSS directly alongside the existing theme stylesheets (`default`, `mytheme`, `skyblue`, `transparent`).
  - Phase 2: Deprecate `.styl` files and retain pure modern CSS with native CSS variables and nesting.

### 1.4 Trade-offs & Edge Cases
| Consideration | Risk | Resolution |
| :--- | :--- | :--- |
| **Legacy `base_path` option** | Existing consumers configure `base_path: 'dist/tablefilter/'` to load CSS and extensions dynamically. | Preserve `tf.basePath` resolution in the UMD bundle while allowing ESM consumers to import styles directly (`import 'tablefilter/style'`). Note: the `style_path` / `stylesheet` / `themes_path` overrides are currently ignored (**#822**) and are restored as part of **#993**. |
| **Extension Bundling** | Extensions (`sort`, `colOps`, etc.) are currently loaded via dynamic script tags. | Vite can output individual extension chunks (`dist/tablefilter/extensions/sort/sort.js`) matching the legacy file structure. |

---

## Decision 2: Dependency Rationalization (Native Browser APIs)

### 2.1 Eliminating `diacritics` via `String.prototype.normalize('NFD')`

#### Current Implementation in [`src/string.js`](../src/string.js)
```javascript
import {remove as removeDiacritics} from 'diacritics';
// Used in: contains(term, data, exactMatch, caseSensitive, ignoreDiacritics)
```
- The external `diacritics` package contains a lookup map of ~300 character conversions.
- Adds ~15 KB to the bundle.

#### Proposed Native Implementation
```javascript
/**
 * Removes diacritical marks using standard Unicode NFD decomposition
 * @param  {String} text
 * @return {String} Normalized string
 */
export const removeDiacritics = (text) => {
    if (!text) return '';
    return String(text)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};
```

#### Verification & Edge Cases
- **Accents**: `jérô` &rarr; `jero`, `brün` &rarr; `brun`, `falò` &rarr; `falo`, `café` &rarr; `cafe`. All pass identical to the `diacritics` package.
- **Browser Support**: `String.prototype.normalize()` is standard across Chrome 34+, Firefox 31+, Safari 10+, Edge 12+, Node 0.12+ (100% universal across all target browsers).
- **Test Validation**: [`test/test-ignore-diacritics.js`](../test/test-ignore-diacritics.js) passes 100% with zero regressions.

---

### 2.2 Eliminating `format-number` via Native Formatter Utility

#### Current Implementation in [`src/extensions/colOps/colOps.js`](../src/extensions/colOps/colOps.js)
```javascript
import formatNumber from 'format-number';
// Used in: writeResult(result, label, writeType, precision, format)
// Call: formatNumber(format)(result)
```
- External `format-number` package adds ~30 KB.

#### Proposed Native Implementation (`src/number.js`)
```javascript
/**
 * Formats a numeric value with configurable decimal and thousands separators
 * @param {Number|String} value Numeric value
 * @param {Object} options Formatting options
 * @param {String} [options.decimal='.'] Decimal separator
 * @param {String} [options.integerSeparator=','] Thousands separator
 * @param {String} [options.prefix=''] Value prefix
 * @param {String} [options.suffix=''] Value suffix
 * @param {Number} [options.precision=2] Decimal precision
 * @returns {String} Formatted string
 */
export const formatNumberValue = (value, options = {}) => {
    const num = Number(value);
    if (isNaN(num) || !isFinite(num)) return '';

    const decimal = options.decimal || '.';
    const thousands = options.integerSeparator || '';
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    const precision = options.precision !== undefined ? options.precision : 2;

    const parts = num.toFixed(precision).split('.');
    if (thousands) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    }
    const formatted = parts.join(decimal);

    return `${prefix}${formatted}${suffix}`;
};
```

#### Verification & Edge Cases
- **Custom Separators**: Correctly formats European formats (`1.234,56`), US formats (`1,234.56`), and space-separated formats (`1 234,56`).
- **Precision**: Handles integer rounding (`precision: 0`) and currency precision (`precision: 2`).
- **Test Validation**: [`test/test-col-ops.js`](../test/test-col-ops.js) assertions pass 100%.

---

### 2.3 Preserving `sugar-date` for Initial Hybrid Phase
- **Contract Reality**: TableFilter's date parsing supports format patterns such as `{dd}.{MM}.{yyyy|yy}` and `{dd}-{months}-{yyyy}` across multiple locales.
- **Decision**: Keep `sugar-date` intact in the data engine during the hybrid transition to ensure zero date-filtering regressions. Once the Web Component shell and accessibility targets are complete, evaluate migrating date parsing to standard `Intl.DateTimeFormat` in a dedicated sub-phase.

---

## Decision 3: Test Runner Modernization (Playwright + Axe-Core)

### 3.1 Context & Current Limitations
- **Current Setup**: QUnit executed via `grunt-qunit-istanbul` running a local Node `connect` server on port 8000.
- **Limitations**:
  - Relies on PhantomJS/headless Chrome via Grunt, which is deprecated and fragile on modern systems.
  - No automated accessibility checks (WCAG 2.2 rules must currently be verified manually).
  - Slow serial execution of 74 test files.

### 3.2 Proposed Modern Test Architecture (Playwright)
Rather than rewriting all 74 HTML test files from scratch, Playwright serves as a headless browser runner that executes the existing QUnit test pages directly:

```
[Playwright Test Runner]
       |
       +---> Starts Vite test server (http://localhost:8080)
       |
       +---> Discovers all 74 test/*.html suites
       |
       +---> Runs suites in parallel across Chromium / Firefox / WebKit
       |       |
       |       +--> Monitors window.QUnit.done()
       |       +--> Asserts: results.failed === 0
       |       +--> Injects @axe-core/playwright
       |       +--> Analyzes DOM against WCAG 2.2 AA rules
       |
       +---> Outputs unified TAP / JUnit / HTML test reports
```

### 3.3 Automated Accessibility Gate (`@axe-core/playwright`)
- For each test page loaded in Playwright, Axe-Core analyzes the generated DOM:
  ```javascript
  const accessibilityScan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .disableRules(['page-has-heading-one']) // Test fixture artifact exclusions
      .analyze();
  
  expect(accessibilityScan.violations).toEqual([]);
  ```
- **Benefit**: Every new component and refactored module is automatically audited against accessibility rules on every test run.

---

## 4. Alignment Summary & Next Actions

| Decision Area | Alignment Consensus | Primary Benefit |
| :--- | :--- | :--- |
| **Build Tooling** | Migrate to **Vite** with multi-format output (ESM, CJS, UMD) and CSS Custom Properties. | Fast dev cycle, modern packaging, Node 24 compatibility, 100% legacy UMD support. |
| **Dependency Rationalization** | Replace `diacritics` and `format-number` with native APIs; retain `sugar-date`. | Drops ~45 KB bundle weight, zero third-party vulnerability risks. |
| **Test Runner Modernization** | Use **Playwright** to run existing QUnit HTML suites + **Axe-Core** automated audits. | Zero test rewrite risk, parallel execution, automated WCAG 2.2 verification. |

### Immediate Execution Order
1. **Step 1**: Implement native diacritics removal in [`src/string.js`](../src/string.js) & native number formatter in [`src/extensions/colOps/colOps.js`](../src/extensions/colOps/colOps.js).
2. **Step 2**: Add `vite.config.js` and modernize `package.json` build scripts.
3. **Step 3**: Configure Playwright QUnit test runner and verify baseline test passage.
4. **Step 4**: Implement `<table-filter>` and `<tf-status>` Web Components.
