(function () {

    // Configure RequireJS so it resolves relative module paths from the `src`
    // folder.
    require.config({
        baseUrl: '../src',
        paths: {
            extensions: '../src/extensions'/*,
            sortabletable: 'extensions/sortabletable/'*/
        }
    });

}());