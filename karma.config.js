module.exports = function (config) {
    config.set({
        basePath: '',
        autoWatch: true,
        frameworks: ['qunit'],
        files: [
            // 'dist/tablefilter/*.js',
            // 'test/test.html',
            'QUNIT',
            'QUNIT_ADAPTER',
            'dist/tablefilter/*.js',
            'test/test.html',
            'test/test.js'/*,
            {
                pattern: 'test/*.html', watched: true,
                served: true, included: true
            },*/

        ],
        browsers: ['PhantomJS'],

        reporters: ['progress', 'coverage'],
        preprocessors: {
            'dist/tablefilter/*.js': ['coverage']
        },

        singleRun: true
    });
};
