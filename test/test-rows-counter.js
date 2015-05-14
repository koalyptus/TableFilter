
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_counter: true
});
tf.init();

module('Sanity checks');
test('RowsCounter component', function() {
    notEqual(tf.Cpt.rowsCounter, null, 'RowsCounter instanciated');
});

test('RowsCounter component with paging', function() {
    tf.Cpt.paging = new TableFilter.Paging(tf);
    var paging = tf.Cpt.paging;
    paging.addPaging();
    equal(tf.Cpt.rowsCounter.rowsCounterSpan.innerHTML, '1-7 / 7', 'Counter value with paging');
    paging.destroy();
});

test('RowsCounter component without paging', function() {
    tf.Cpt.rowsCounter.refresh();
    equal(tf.Cpt.rowsCounter.rowsCounterSpan.innerHTML, 7, 'Counter value');
});
