// Dev server only. Library outputs are added in #887-#890.
// CommonJS because package.json has no "type": "module".
module.exports = {
    server: {
        host: '0.0.0.0',
        port: 8080
    }
};
