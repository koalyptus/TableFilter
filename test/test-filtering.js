var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_date_type: [null, null, 'ddmmmyyyy']
});
tf.init();

module('Sanity checks');
test('TableFilter object', function() {
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instantiated');
    deepEqual(tf.id, 'demo', 'id check');
    deepEqual(tf.filtersRowIndex, 0, 'Filters row index');
});

module('Issue 74');
test('can filter values in this format: 21.1.18 as string', function(){
    tf.setFilterValue(0, '2');
    tf.filter();
    deepEqual(tf.getValidRows().length, 3, 'Expected number of matches');
});
test('can filter values in this format: 21.1.18 as date', function(){
    tf.clearFilters();
    tf.setFilterValue(1, '21.1.2005');
    tf.filter();
    deepEqual(tf.getValidRows().length, 1, 'Expected number of matches');
});
test('can filter values in this format: 21.1.18 as date with operator',
    function(){
        tf.clearFilters();
        tf.setFilterValue(1, '>21.1.04');
        tf.filter();
        deepEqual(tf.getValidRows().length, 1, 'Expected number of matches');
    }
);

module('Issue 72');
test('can filter values in this format: 21-Jul-2010 as date', function(){
    tf.clearFilters();
    tf.setFilterValue(2, '14-Mar-2009');
    tf.filter();
    deepEqual(tf.getValidRows().length, 1, 'Expected number of matches');
});
test('can filter values in this format: 21-Jul-2010 as date with operator',
    function(){
        tf.clearFilters();
        tf.setFilterValue(2, '<21-Jul-2010');
        tf.filter();
        deepEqual(tf.getValidRows().length, 2, 'Expected number of matches');
    }
);

module('Issue 217');
test('can filter columns with blank space separated values (1)', function(){
    tf.clearFilters();
    tf.setFilterValue(3, 'c');
    tf.filter();
    deepEqual(tf.getValidRows().length, 1, 'Expected number of matches');
});
test('can filter columns with blank space separated values (2)', function(){
    tf.clearFilters();
    tf.setFilterValue(3, 'xyz');
    tf.filter();
    deepEqual(tf.getValidRows().length, 3, 'Expected number of matches');
});
test('can filter columns with alpha numeric values (1)', function(){
    tf.clearFilters();
    tf.setFilterValue(4, '1');
    tf.filter();
    deepEqual(tf.getValidRows().length, 1, 'Expected number of matches');
});
test('can filter columns with alpha numeric values (2)', function(){
    tf.clearFilters();
    tf.setFilterValue(4, 'numeric');
    tf.filter();
    deepEqual(tf.getValidRows().length, 3, 'Expected number of matches');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
