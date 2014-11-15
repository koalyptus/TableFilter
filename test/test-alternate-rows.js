requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var dom = require('dom'),
        AlternateRows = require('modules/alternateRows');

    var tf = new TableFilter('demo', {
        alternate_rows: true
    });
    tf.init();

    module('Sanity checks');
    test('AlternateRows component', function() {
        deepEqual(tf.Cpt.alternateRows instanceof AlternateRows, true, 'AlternateRows constructor');
        notEqual(tf.Cpt.alternateRows, null, 'AlternateRows instanciated');
    });

});