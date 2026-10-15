// Playwright config: runs the existing QUnit HTML suites headlessly
// in Chromium (#893 single-file harness, #894 all suites). Serves
// the repo root with the Vite dev server.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './test/playwright',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:8080'
    },
    webServer: {
        command: 'npx vite --port 8080 --strictPort',
        // Repo root has no index.html, so probe the suite page itself.
        url: 'http://localhost:8080/test/test-emitter.html',
        reuseExistingServer: true,
        timeout: 60000
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' }
        }
    ]
});
