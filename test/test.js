(function(win, TableFilter) {

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/'
    });
    tf.init();

    module('Table 1: sanity checks');
    test('TableFilter object', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.id, 'demo', 'id check');
        deepEqual(tf.filtersRowIndex, 0, 'Filters row index');
        deepEqual(tf.getCellsNb(), 5, 'filters type collection length');
    });

    module('Table 1: DOM tests');
    test('Filters row', function() {
        equal(tf.tbl.rows[0].className, 'fltrow', 'Filters row CSS class name');
        equal(tf.getFilterElement(0).nodeName, 'INPUT', 'Filter DOM element');
    });


    var tf1 = new TableFilter(
        document.querySelector('.test'),
        {
            base_path: '../dist/tablefilter/',
            filters_row_index: 1,
            btn: true
        }
    );
    tf1.init();
    var btn = document.querySelector('#'+tf1.prfxValButton+'4_'+tf1.id);

    module('Table 2: sanity checks');
    test('TableFilter object', function() {
        notEqual(tf1.id, null, 'id check');
        equal(tf1.filtersRowIndex, 1, 'Filters row index');
        deepEqual(tf1.getCellsNb(), 5, 'filters type collection length');
    });

    module('Table 2: DOM tests');
    test('Filters row', function() {
        equal(
            tf1.tbl.rows[1].className,
            'fltrow',
            'Filters row CSS class name'
        );
        equal(tf1.getFilterElement(0).nodeName, 'INPUT', 'Filter DOM element');
    });
    test('Filter button', function(){
        notEqual(btn, null, 'Button exists');
        deepEqual(btn.nodeName, 'INPUT', 'Expected element');
    });
    test('Filter button click event', function(){
        tf1.setFilterValue(4, '>30');
        btn.click();
        deepEqual(tf1.getValidRows().length, 2, 'Filter button event result');
    });

})(window, TableFilter);
