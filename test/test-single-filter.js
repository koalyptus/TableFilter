var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    single_filter: true
});
tf.init();

module('Sanity checks');
test('Single filter', function() {
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersId().length, 1, 'Number of filter');
    deepEqual(tf.getFiltersId(), ['flt0_demo'], 'Filter ID');
    deepEqual(typeof tf.getFilterElement(0), 'object', 'Filter element');
    deepEqual(tf.getFilterElement(0).className, 'single_flt',
        'Default CSS class');
});

module('Behaviour');
test('Filter', function() {
    tf.setFilterValue(0, 'Sydney');
    tf.filter();
    deepEqual(tf.getValidRows().length, 4, 'Filtered rows number');
    tf.clearFilters();
});

module('Exclude columns');
test('Exclude from filtering expected columns', function() {
    // setup
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        single_filter: {
            exclude_cols: [1, 4]
        }
    });
    tf.init();

    // act
    tf.setFilterValue(0, 'Canberra'); // value in column 1
    tf.filter();

    // assert
    deepEqual(tf.getValidRows().length, 0, 'Filtered rows number');


    // act
    tf.clearFilters();
    tf.setFilterValue(0, '20.25'); // value in column 4
    tf.filter();

    // assert
    deepEqual(tf.getValidRows().length, 0, 'Filtered rows number');

    // act
    tf.clearFilters();
    tf.setFilterValue(0, '3.1'); // value in column 1
    tf.filter();

    // assert
    deepEqual(tf.getValidRows().length, 1, 'Filtered rows number');
});

module('Styling');
test('Can customise CSS class', function() {
    // setup
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        single_filter: {
            css_class: 'test'
        }
    });

    // act
    tf.init();

    // assert
    deepEqual(tf.getFilterElement(0).className, 'test', 'Custom CSS class');
});

module('External single filter');
test('Sanity checks', function() {
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        single_filter: true,
        external_flt_ids: ['single-search']
    });
    tf.init();

    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    notEqual(document.querySelector('#single-search').firstChild, null,
        'Filter created in external container');
    deepEqual(tf.getFiltersId().length, 1, 'Number of filter');
    deepEqual(tf.getFiltersId(), ['flt0_demo'], 'Filter ID');
    deepEqual(typeof tf.getFilterElement(0), 'object', 'Filter element');
});

module('Behaviour');
test('Filter', function() {
    tf.setFilterValue(0, 'Bris');
    tf.filter();
    deepEqual(tf.getValidRows().length, 2, 'Filtered rows number');
    tf.clearFilters();
});

module('Single filter with grid layout');
test('Sanity checks', function() {
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        single_filter: true,
        grid_layout: true
    });
    tf.init();

    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    deepEqual(tf.getFiltersId().length, 1, 'Number of filter');
    deepEqual(tf.getFiltersId(), ['flt0_demo'], 'Filter ID');
    deepEqual(typeof tf.getFilterElement(0), 'object', 'Filter element');
});

module('Behaviour');
test('Filter', function() {
    tf.setFilterValue(0, 'Sydney');
    tf.filter();
    deepEqual(tf.getValidRows().length, 4, 'Filtered rows number');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.clearFilters();
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
