// Guard gate (#1095): scripts/check-bundle-version.js accepts a bundle that
// reports the package version, rejects a different version, annotates
// failures under GitHub Actions and fails cleanly on unreadable files.

const { test, expect } = require('@playwright/test');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..', '..');
const SCRIPT = path.join(REPO_ROOT, 'scripts', 'check-bundle-version.js');
const pkg = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')
);

const run = (bundlePath, extraEnv) => {
    const env = Object.assign({}, process.env, extraEnv);
    try {
        const stdout = execFileSync(
            process.execPath,
            [SCRIPT, bundlePath],
            {
                cwd: REPO_ROOT,
                encoding: 'utf8',
                env,
                stdio: ['ignore', 'pipe', 'pipe']
            }
        );
        return { code: 0, stdout, stderr: '' };
    } catch (err) {
        return {
            code: err.status,
            stdout: err.stdout || '',
            stderr: err.stderr || ''
        };
    }
};

test.describe('check-bundle-version script', () => {
    let dir;

    test.beforeAll(() => {
        dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tf-bundle-version-'));
    });

    test.afterAll(() => {
        fs.rmSync(dir, { recursive: true, force: true });
    });

    const writeBundle = (name, version) => {
        const file = path.join(dir, name);
        fs.writeFileSync(file, `this.version="${version}"`);
        return file;
    };

    test('accepts a bundle that reports the package version', () => {
        const file = writeBundle('match.js', pkg.version);
        const result = run(file, { GITHUB_ACTIONS: '' });
        expect(result.code).toBe(0);
        expect(result.stdout).toContain(`reports ${pkg.version}`);
    });

    test('rejects a bundle with a different version', () => {
        const file = writeBundle('mismatch.js', '0.0.0');
        const result = run(file, { GITHUB_ACTIONS: '' });
        expect(result.code).toBe(1);
        expect(result.stderr).toContain(`does not report ${pkg.version}`);
        expect(result.stderr.startsWith('::error::')).toBe(false);
    });

    test('annotates failures under GitHub Actions', () => {
        const file = writeBundle('annotated.js', '0.0.0');
        const result = run(file, { GITHUB_ACTIONS: 'true' });
        expect(result.code).toBe(1);
        expect(result.stderr.startsWith('::error::')).toBe(true);
    });

    test('fails with a one-line error for a missing file', () => {
        const result = run(path.join(dir, 'missing.js'), {
            GITHUB_ACTIONS: ''
        });
        expect(result.code).toBe(1);
        expect(result.stderr.trim().split('\n')).toHaveLength(1);
    });
});
