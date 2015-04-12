requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var dom = require('dom').Dom,
        Loader = require('modules/loader').Loader;

    var tf = new TableFilter('demo', {
        loader: true
    });
    tf.init();

    module('Sanity checks');
    test('Loader component', function() {
        var loader = tf.Cpt.loader;
        deepEqual(loader instanceof Loader, true, 'Loader constructor');
        notEqual(loader, null, 'Loader instanciated');
        notEqual(dom.id(loader.prfxLoader+tf.id), null, 'Loader DOM container');
    });

});