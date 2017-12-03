var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/'
});
tf.init();

module('filtering');
test('ignore uneven rows', function() {
    // act
    tf.setFilterValue(1, 'Perth');
    tf.filter();

    // assert
    deepEqual(tf.getValidRows(), [9], 'uneven row');
    deepEqual(tf.getRowDisplay(tf.dom().rows[4]), '', 'uneven row displayed');
    deepEqual(tf.getRowDisplay(tf.dom().rows[5]), '', 'uneven row displayed');
    deepEqual(tf.getRowDisplay(tf.dom().rows[5]), '', 'uneven row displayed');
});

test('display uneven rows when no matches', function() {
    // act
    tf.clearFilters();
    tf.setFilterValue(0, '123');
    tf.filter();

    // assert
    deepEqual(tf.getValidRows(), [], 'uneven row');
    deepEqual(tf.getRowDisplay(tf.dom().rows[4]), '', 'uneven row displayed');
    deepEqual(tf.getRowDisplay(tf.dom().rows[5]), '', 'uneven row displayed');
    deepEqual(tf.getRowDisplay(tf.dom().rows[5]), '', 'uneven row displayed');
});

module('re-initialise');
test('can re-initialise', function() {
    // act
    tf.destroy();
    tf.init();

    // assert
    deepEqual(tf.isInitialized(), true, 'Filters re-initialised');
});

test('can filter', function() {
    // act
    tf.setFilterValue(1, 'Perth');
    tf.filter();

    // assert
    deepEqual(tf.getValidRows(), [9], 'uneven row');
    deepEqual(tf.getRowDisplay(tf.dom().rows[4]), '', 'uneven row displayed');
    deepEqual(tf.getRowDisplay(tf.dom().rows[5]), '', 'uneven row displayed');
    deepEqual(tf.getRowDisplay(tf.dom().rows[5]), '', 'uneven row displayed');
});

module('tear-down');
test('can destroy', function() {
    // act
    tf.destroy();

    // assert
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
