var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/'
});
tf.init();

module('Sanity checks');
test('Only headers with no rows', function() {
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.refRow, 2, 'Reference row index');
    deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
    deepEqual(tf.getWorkingRows().length, 0, 'No working rows');
});

module('Tear-down');
test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
