requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var dom = require('dom'),
        Loader = require('modules/loader');

    var tf = new TableFilter('demo', {
        loader: true
    });
    tf.init();

    module('Sanity checks');
    test('Loader component', function() {
        deepEqual(tf.Cpt.loader instanceof Loader, true, 'Loader constructor');
        notEqual(tf.Cpt.loader, null, 'Loader instanciated');
        notEqual(dom.id(tf.prfxLoader+tf.id), null, 'Loader DOM container');
    });

});