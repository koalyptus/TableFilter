(function(win, TableFilter) {

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        linked_filters: true,
        col_0: 'checklist',
        col_1: 'multiple',
        paging: true
    });

    tf.init();

    var checkList = tf.feature('checkList');
    var cont0 = checkList.containers[0];
    var cont1 = tf.getFilterElement(1);

    module('Sanity checks');
    test('Linked filters feature', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instantiated');
        deepEqual(tf.linkedFilters, true, 'Linked filters enabled');
        deepEqual(tf.paging, true, 'Paging setting is on');
    });

    module('Behaviour');
    test('Can link filters 0-1', function() {
        // setup
        tf.clearFilters();
        tf.activateFilter(0);

        // act
        tf.setFilterValue(0, 'Sydney');
        tf.filter();

        // assert
        deepEqual(cont0.getElementsByTagName('li').length, 2,
            'Filter 0 options length');
        deepEqual(cont1.options.length, 5, 'Filter 1 options length');
    });

    test('Can re-populate filters with clearFilters', function() {
        // act
        tf.clearFilters();

        // assert
        deepEqual(cont0.getElementsByTagName('li').length, 3,
            'Filter 0 options length');
        deepEqual(cont1.options.length, 7, 'Filter 1 options length');
    });

    test('Can link filters 1-0', function() {
        // setup
        tf.clearFilters();
        tf.activateFilter(1);

        // act
        tf.setFilterValue(1, 'Brisbane');
        tf.filter();

        // assert
        deepEqual(cont0.getElementsByTagName('li').length, 3,
            'Filter 0 options length');
        deepEqual(cont1.options.length, 2, 'Filter 1 options length');
    });

    test('Can re-populate filter 0 with clear option', function() {
        // setup
        tf.activateFilter(0);

        // act
        tf.setFilterValue(0, '');
        tf.filter();

        // assert
        deepEqual(cont0.getElementsByTagName('li').length, 3,
            'Filter 0 options length');
    });

    test('Can re-populate filter 1 with clear option', function() {
        // setup
        tf.activateFilter(1);

        // act
        tf.setFilterValue(1, '');
        tf.filter();

        // assert
        deepEqual(cont1.options.length, 7, 'Filter 1 options length');
    });

    module('Tear down');
    test('Destroy TableFilter', function() {
        // act
        tf.destroy();

        // assert
        deepEqual(tf.isInitialized(), false, 'Filters removed');
    });

})(window, TableFilter);
