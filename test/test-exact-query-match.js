(function(win, TableFilter){
    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        exact_match: true
    });
    tf.init();

    module('Sanity checks');
    test('Enable exact query match', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter type');
        deepEqual(tf.exactMatch, true, 'Exact query match enable');
    });

    module('Behaviour');
    test('After filtering with `syd`', function() {
        tf.setFilterValue(0, 'syd');
        tf._filter();
        deepEqual(tf.getValidRows().length, 0, 'No matches');
    });

    test('After filtering with `sydney`', function() {
        tf.setFilterValue(0, 'sydney');
        tf._filter();
        deepEqual(tf.getValidRows().length>0, true, 'Matches');
    });

})(window, TableFilter);
