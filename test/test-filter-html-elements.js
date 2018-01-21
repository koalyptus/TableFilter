var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/'
});
tf.init();

module('Sanity checks');
test('Filters', function() {
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    notEqual(tf.getFilterElement(0), null, 'Filter generated');
});

module('Filter HTML elements');
test('can filter cell containing a div', function() {
    // setup
    tf.setFilterValue(1, 'Adelaide');

    // act
    tf.filter();

    // assert
    deepEqual(tf.getFilteredColumnData(1), ['Adelaide'], 'Filtered data');
});

test('can filter cell containing a div with a child span', function() {
    // setup
    tf.setFilterValue(1, 'Brisbane');

    // act
    tf.filter();

    // assert
    deepEqual(tf.getFilteredColumnData(1), ['Brisbane', 'Brisbane'],
        'Filtered data');
});

test('can filter cell containing a table', function() {
    // setup
    tf.setFilterValue(1, 'Canberra');

    // act
    tf.filter();

    // assert
    deepEqual(tf.getFilteredColumnData(1), ['Canberra'], 'Filtered data');
});

test('can filter cell containing a textarea', function() {
    // setup
    tf.setFilterValue(1, 'Melbourne');

    // act
    tf.filter();

    // assert
    deepEqual(tf.getFilteredColumnData(1), ['Melbourne'], 'Filtered data');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.clearFilters();
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
