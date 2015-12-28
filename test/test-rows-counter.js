
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_counter: true
});
tf.init();
var rowsCounter = tf.feature('rowsCounter');

module('Sanity checks');
test('RowsCounter component', function() {
    notEqual(rowsCounter, null, 'RowsCounter instanciated');
});

module('Feature interface');
test('Properties', function() {
    deepEqual(
        rowsCounter.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(rowsCounter.feature, 'rowsCounter', 'Feature name');
    deepEqual(rowsCounter.enabled, true, 'Feature enabled');
    deepEqual(rowsCounter.initialized, true, 'Feature enabled');
    deepEqual(typeof rowsCounter.emitter, 'object',
        'Feature has emitter instance');
    deepEqual(typeof rowsCounter.config, 'object', 'TF configuration object');
    deepEqual(typeof rowsCounter.init, 'function', 'Feature init method');
    deepEqual(typeof rowsCounter.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof rowsCounter.reset, 'function', 'Feature reset method');
    deepEqual(typeof rowsCounter.enable, 'function', 'Feature enable method');
    deepEqual(typeof rowsCounter.disable, 'function', 'Feature enable method');
    deepEqual(
        typeof rowsCounter.isEnabled, 'function', 'Feature enable method');
});
test('Can destroy', function() {
    rowsCounter.destroy();
    deepEqual(rowsCounter.initialized, false, 'not initialised');
});
test('Can reset', function() {
    rowsCounter.reset();
    deepEqual(rowsCounter.enabled, true, 'enabled');
});
test('Can disable', function() {
    rowsCounter.disable();
    deepEqual(rowsCounter.enabled, false, 'disabled');
});
test('Can enable', function() {
    rowsCounter.enable();
    deepEqual(rowsCounter.enabled, true, 'enabled');
});
test('Can init', function() {
    rowsCounter.destroy();
    rowsCounter.enable();
    rowsCounter.init();
    deepEqual(rowsCounter.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    rowsCounter.isEnabled();
    deepEqual(rowsCounter.enabled, true, 'enabled');
});

module('Behaviour');
test('RowsCounter value', function() {
    equal(rowsCounter.rowsCounterSpan.innerHTML,
        7, 'Counter value');
});

test('RowsCounter component with filtered table', function() {
    tf.setFilterValue(0, 'Syd');
    tf.filter();

    equal(rowsCounter.rowsCounterSpan.innerHTML,
        4, 'Counter value');

    tf.clearFilters();
});

module('Pagination');
test('RowsCounter component with paging', function() {
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        rows_counter: true,
        paging: true
    });
    tf.init();
    equal(tf.feature('rowsCounter').rowsCounterSpan.innerHTML,
        '1-7 / 7', 'Counter value with paging');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.hasGrid(), false, 'Filters removed');
});
