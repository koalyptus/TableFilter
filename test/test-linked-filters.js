(function(win, TableFilter){

    var id = function (id){ return document.getElementById(id); };

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        linked_filters: true,
        col_0: 'multiple',
        col_1: 'checklist',
        on_after_reset: testClearFilters
    });
    tf.init();
    tf.setFilterValue(0, 'Sydney');
    tf.getFilterElement(0).focus();
    tf.filter();

    module('Sanity checks');
    test('Linked filters feature', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instantiated');
        deepEqual(tf.linkedFilters, true, 'Linked filters enabled');

        tf.clearFilters();
        tf.onAfterFilter = null;
        tf.destroy();
        tf = null;
        setExcludedOptions();
    });

    // function testLinked(tf) {
    //     test('Check filters are linked', function() {
    //         // var filter0 = tf.getFilterElement(0);
    //         deepEqual(tf.activeFilterId, 'flt1_demo_1', 'Active filter');
    //         // deepEqual(filter0.options.length, 2,
    //         //     'Linked filter expected options number'
    //         // );
    //     });
    //     tf._clearFilters();
    //     tf.onAfterFilter = null;
    //     tf.destroy();
    //     tf = null;
    //     setExcludedOptions();
    // }

    function setExcludedOptions(){
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            linked_filters: true,
            disable_excluded_options: true,
            col_0: 'multiple',
            col_1: 'checklist',
            on_after_filter: testExcludedOptions,
            on_after_reset: testClearFilters
        });
        tf.init();
        tf.setFilterValue(0, 'Sydney');
        tf.getFilterElement(0).focus();
        tf.filter();
    }

    function testExcludedOptions(tf){
        var flt0 = tf.getFilterElement(0);

        test('Check filters are linked', function() {
            deepEqual(tf.activeFilterId, 'flt0_demo', 'Active filter');
            deepEqual(
                flt0.options[1].disabled,
                true,
                'Expected disabled option in master filter'
            );
            deepEqual(
                id('flt1_'+tf.id+'_2').disabled,
                true,
                'Expected disabled option in slave filter'
            );
        });

        tf.onAfterFilter = null;
        setTimeout(tf.clearFilters, 0);
    }

    // Tests for https://github.com/koalyptus/TableFilter/pull/42 issue
    function testClearFilters() {
        test('Check clear filters functionality', function() {
            deepEqual(tf.getFilterableRowsNb(), 7,
                'Nb of valid rows after filters are cleared');
        });
    }

})(window, TableFilter);
