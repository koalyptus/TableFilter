
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_counter: true
});
tf.init();

module('Sanity checks');
test('RowsCounter component', function() {
    notEqual(tf.feature('rowsCounter'), null, 'RowsCounter instanciated');
});

test('RowsCounter component', function() {
    equal(tf.feature('rowsCounter').rowsCounterSpan.innerHTML,
        7, 'Counter value');
});

test('RowsCounter component with filtered table', function() {
    tf.setFilterValue(0, 'Syd');
    tf.filter();

    equal(tf.feature('rowsCounter').rowsCounterSpan.innerHTML,
        4, 'Counter value');

    tf.clearFilters();
});

module('With pagination');
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
