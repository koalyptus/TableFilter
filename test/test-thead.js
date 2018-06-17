
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    sticky_headers: true
});
tf.init();

module('Sanity checks');
test('thead', function() {
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
    deepEqual(tf.refRow, 2, 'Reference row index');
    deepEqual(tf.getRowsNb(), 7, 'nb working rows');
    deepEqual(tf.getRowsNb(true), 9, 'nb working rows with headers');
    notEqual(tf.getFilterElement(0), null, 'Filter element for column 0');
    deepEqual(tf.dom().tHead.classList.contains(tf.stickyCssClass), true,
        'Sticky headers CSS class');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [2], 'Filtered row');
});

test('thead with paging', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        paging: { length: 3 }
    });
    tf.init();

    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
    deepEqual(tf.refRow, 2, 'Reference row index');
    deepEqual(tf.getRowsNb(), 7, 'nb working rows');
    deepEqual(tf.getRowsNb(true), 9, 'nb working rows with headers');
    notEqual(tf.getFilterElement(0), null, 'Filter element for column 0');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [2], 'Filtered row');
});

test('thead with grid-layout', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        grid_layout: true
    });
    tf.init();

    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersRowIndex(), 1, 'Filters row index');
    deepEqual(tf.refRow, 0, 'Reference row index');
    deepEqual(tf.getRowsNb(), 7, 'nb working rows');
    deepEqual(tf.getRowsNb(true), 7, 'nb working rows with headers');
    notEqual(tf.getFilterElement(0), null, 'Filter element for column 0');

    tf.setFilterValue(1, 'Ade');
    tf.filter();

    deepEqual(tf.getValidRows(), [0], 'Filtered row');
});

module('Tear-down');
test('TableFilter removed', function() {
    tf.clearFilters();
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
