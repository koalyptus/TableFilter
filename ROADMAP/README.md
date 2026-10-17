# TableFilter v1.0.0 Roadmap & Modernization Architecture

This directory contains the complete technical specification, architectural investigations, and phased execution plans to modernize **TableFilter** into a fully accessible (WCAG 2.2 AA), native Web Components library while preserving 100% of its established configuration and API contracts.

---

## Roadmap Documentation Index

1. [**v1.0.0 Architecture & Migration Investigation**](./v1-webcomponents-investigation.md)
   - Baseline contract analysis (Configuration, Public Methods, EventEmitter lifecycle, Operators).
   - Native Web Components architecture (Autonomous Custom Elements, slotted Light DOM `<table>`, Shadow DOM encapsulation).
   - Comprehensive Accessibility Strategy (WCAG 2.2 Level AA/AAA, WAI-ARIA APG Data Grid / Combobox patterns, polite live regions).
   - Technical debt liquidation and end-to-end modernization roadmap.

2. [**Incremental Hybrid Migration Strategy**](./hybrid-migration-strategy.md)
   - Dual-vector coexistence model: Outside-In (`<table-filter>` shell) and Inside-Out (`<tf-status>`, `<tf-rows-counter>`).
   - The Bridge Pattern: How custom elements and the legacy `Feature` base class communicate seamlessly.
   - Module migration risk matrix and phased delivery timeline (`v0.8.0` &rarr; `v0.9.0` &rarr; `v1.0.0`).

3. [**Key Architectural Decisions Review**](./key-decisions-review.md)
   - In-depth evaluation of the three preliminary decisions:
     - **Build Tooling Migration**: Vite multi-bundle output (ESM, CJS, UMD) and CSS Custom Properties. Keeps every class name and the core stylesheet/theme loader + class options (tracked by [#993](https://github.com/koalyptus/TableFilter/issues/993)); tokens and `::part()` are additive. Token/theme *modernization* is deferred to the "Styling modernization (post-1.0)" milestone, after the v1.0.0 launch.
     - **Dependency Rationalization**: Native browser replacements for `diacritics` and `format-number`.
     - **Test Runner Modernization**: Playwright headless execution of all 74 QUnit test suites with integrated Axe-Core audits.

4. [**Preliminary Workstreams & Milestone 0.8.0 Blueprint**](./preliminary-and-milestone-0.8.0-plan.md)
   - Step-by-step technical blueprints for preliminary tooling and dependency rationalization.
   - Implementation specification for Milestone 0.8.0 components (`<table-filter>` and `<tf-status>`).
   - Concrete execution task checklist with verification gates.
