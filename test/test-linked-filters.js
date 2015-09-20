(function(win, TableFilter){
    var id = function (id){ return document.getElementById(id); };

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        linked_filters: true,
        col_0: 'multiple',
        col_1: 'checklist',
        on_after_filter: testLinked
    });
    tf.init();

    module('Sanity checks');
    test('Linked filters feature', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instantiated');
        deepEqual(tf.linkedFilters, true, 'Linked filters enabled');
    });

    var option = id('flt1_demo_1');
    option.click();

    function testLinked(tf) {
        test('Check filters are linked', function() {
            var filter0 = tf.getFilterElement(0);
            deepEqual(tf.activeFilterId, 'flt1_demo_1', 'Active filter');
            deepEqual(filter0.options.length, 2,
                'Linked filter expected options number'
            );
        });
        tf.destroy();
        tf = null;
        setExcludedOptions();
    }

    function setExcludedOptions(){
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            linked_filters: true,
            disable_excluded_options: true,
            col_0: 'multiple',
            col_1: 'checklist',
            on_after_filter: testExcludedOptions
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
    }

})(window, TableFilter);
