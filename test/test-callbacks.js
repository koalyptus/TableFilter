
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    on_filters_loaded: filtersLoadedTests
});
tf.init();


function filtersLoadedTests(){
    tf.setFilterValue(0, 'Adelaide');
    tf.setFilterValue(1, 'Perth');
    tf.filter();

    // issue 241: can filter table in filters loaded callback
    module('TableFilter with filters loaded callback');
    test('Can filter table on callback', function() {
        deepEqual(tf.initialized, true, 'TableFilter is initialized');
        deepEqual(tf.getValidRowsNb(), 1, 'Nb of filtered rows');
    });

    module('Tear-down');
    test('Can destroy', function() {
        tf.destroy();
        deepEqual(tf.isInitialized(), false, 'Destroyed');
    });
}
