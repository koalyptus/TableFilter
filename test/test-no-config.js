(function(win, TableFilter){

    var tf = new TableFilter('demo');
    tf.basePath = '../dist/tablefilter/';
    tf.init();

    module('Sanity checks');
    test('Features', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.fltGrid, true, 'fltGrid property');
        notEqual(tf.getFilterElement(0), null,
            'Filter element for column 0');
        deepEqual(tf.refRow, 2, 'Reference row index');
        deepEqual(Object.keys(tf.Mod).length, 15, 'Features instantiated');
        notEqual(tf.feature('rowsCounter'), null, 'RowsCounter instantiated');
        deepEqual(tf.rowsCounter, false, 'RowsCounter not enabled');
    });

    module('Feature life cycle');
    test('Can init', function() {
        // setup
        var rowsCounter = tf.feature('rowsCounter');
        tf.rowsCounter = true;
        rowsCounter.enable();

        // act
        rowsCounter.init();

        // assert
        deepEqual(rowsCounter.enabled, true, 'rowsCounter enabled');
        deepEqual(rowsCounter.initialized, true, 'rowsCounter initialized');
    });

    test('Can destroy', function() {
        // setup
        var rowsCounter = tf.feature('rowsCounter');

        // act
        rowsCounter.destroy();

        // assert
        deepEqual(rowsCounter.initialized, false, 'rowsCounter initialized');
    });

    test('Can reset', function() {
        // setup
        var rowsCounter = tf.feature('rowsCounter');

        // act
        rowsCounter.reset();

        // assert
        deepEqual(rowsCounter.enabled, true, 'rowsCounter enabled');
        deepEqual(rowsCounter.initialized, true, 'rowsCounter initialized');
    });

    module('Tear-down');
    test('TableFilter removed', function() {
        tf.destroy();
        deepEqual(tf.isInitialized(), false, 'Filters removed');
    });

})(window, TableFilter);
