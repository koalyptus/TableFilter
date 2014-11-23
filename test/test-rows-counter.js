requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var RowsCounter = require('modules/rowsCounter').RowsCounter;

    var tf = new TableFilter('demo', {
        rows_counter: true
    });
    tf.init();

    module('Sanity checks');
    test('RowsCounter component', function() {
        deepEqual(tf.Cpt.rowsCounter instanceof RowsCounter, true, 'RowsCounter type');
        notEqual(tf.Cpt.rowsCounter, null, 'RowsCounter instanciated');
        equal(tf.Cpt.rowsCounter.rowsCounterSpan.innerHTML, 7, 'Counter value');
    });

    test('RowsCounter component with paging', function() {
        tf.AddPaging();
        equal(tf.Cpt.rowsCounter.rowsCounterSpan.innerHTML, '1-7 / 7', 'Counter value with paging');
        tf.RemovePaging();
    });

});
