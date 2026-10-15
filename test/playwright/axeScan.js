// Accessibility scanner (#896 report-only, #897 scoped enforcement):
// runs AxeBuilder against a loaded page, logs a summary and attaches
// the violation report. Callers decide whether to assert.
const { AxeBuilder } = require('@axe-core/playwright');

// Full WCAG 2.x A/AA tag set; the AA target needs the A levels too.
const WCAG_TAGS = [
    'wcag2a', 'wcag2aa',
    'wcag21a', 'wcag21aa',
    'wcag22a', 'wcag22aa'
];

// `include` narrows the audit to a CSS scope (per-component gates,
// e.g. .status in #897); omit it to scan the whole page.
async function scanAccessibility(page, testInfo, label, { include } = {}) {
    const builder = new AxeBuilder({ page }).withTags(WCAG_TAGS);
    if (include) {
        builder.include(include);
    }
    const results = await builder.analyze();
    const summary = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
        description: violation.description
    }));
    await testInfo.attach(`${label} axe report`, {
        body: JSON.stringify(
            { page: label, failures: summary.length, summary },
            null,
            2
        ),
        contentType: 'application/json'
    });
    console.log(
        `axe ${label}: ${summary.length} violation(s) ` +
        `(${summary.map((item) => item.id).join(', ') || 'none'})`
    );
    return results.violations;
}

module.exports = { WCAG_TAGS, scanAccessibility };
