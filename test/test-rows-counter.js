
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_counter: true
});
tf.init();

module('Sanity checks');
test('RowsCounter component', function() {
    notEqual(tf.feature('rowsCounter'), null, 'RowsCounter instanciated');
});

test('RowsCounter component with paging', function() {
    tf.Mod.paging = new TableFilter.Paging(tf);
    var paging = tf.Mod.paging;
    paging.reset();
    equal(tf.feature('rowsCounter').rowsCounterSpan.innerHTML,
        '1-7 / 7', 'Counter value with paging');
    paging.destroy();
});

test('RowsCounter component without paging', function() {
    tf.feature('rowsCounter').refresh();
    equal(tf.feature('rowsCounter').rowsCounterSpan.innerHTML,
        7, 'Counter value');
});
