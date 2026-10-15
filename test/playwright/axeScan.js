// Report-only accessibility scanner (#896): runs AxeBuilder against
// a loaded page, logs a summary, and attaches the violation report
// without failing. Per-component enforcement (zero violations)
// arrives separately, e.g. #897 for the status bar.
const { AxeBuilder } = require('@axe-core/playwright');

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

async function scanAccessibility(page, testInfo, label) {
    const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();
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
