requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var RowsCounter = require('modules/rowsCounter').RowsCounter;
    var Paging = require('modules/paging').Paging;

    var tf = new TableFilter('demo', {
        rows_counter: true
    });
    tf.init();

    module('Sanity checks');
    test('RowsCounter component', function() {
        deepEqual(tf.Cpt.rowsCounter instanceof RowsCounter, true, 'RowsCounter type');
        notEqual(tf.Cpt.rowsCounter, null, 'RowsCounter instanciated');
    });

    test('RowsCounter component with paging', function() {
        tf.Cpt.paging = new Paging(tf);
        var paging = tf.Cpt.paging;
        paging.addPaging();
        equal(tf.Cpt.rowsCounter.rowsCounterSpan.innerHTML, '1-7 / 7', 'Counter value with paging');
        paging.destroy();
    });

    test('RowsCounter component without paging', function() {
        tf.Cpt.rowsCounter.refresh();
        equal(tf.Cpt.rowsCounter.rowsCounterSpan.innerHTML, 7, 'Counter value');
    });

});
