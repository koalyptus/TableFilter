requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var dom = require('dom').Dom,
        ColOps = require('modules/colOps').ColOps;

    var table = document.getElementById('demo');
    var totRowIndex = table.getElementsByTagName('tr').length;

    var tf = new TableFilter('demo', {
        rows_always_visible: [totRowIndex],
        col_operation: {
            id: ['sum1', 'sum2'],
            col: [2, 3],
            operation: ['sum', 'mean'],
            write_method: ['innerhtml', 'innerhtml'],
            exclude_row: [totRowIndex],
            decimal_precision: [0, 2],
            tot_row_index: [totRowIndex, totRowIndex]
        }
    });
    tf.init();

    module('Sanity checks');
    test('Column Operations component', function() {
        deepEqual(tf.Cpt.colOps instanceof ColOps, true, 'ColOps constructor');
        notEqual(tf.Cpt.colOps, null, 'ColOps instanciated');
        equal(dom.id('sum1').innerHTML, 9911, 'Sum result');
        equal(dom.id('sum2').innerHTML, 1.69, 'Mean result');
    });

});