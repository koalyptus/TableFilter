(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        grid: false
    });
    tf.init();

    module('Sanity checks');
    test('No filters', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.getFilterElement(0), null,
            'No filter element for column 0');
    });

    test('Paging with no filters', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            grid: false,
            paging: true,
            paging_length: 3
        });
        tf.init();
        deepEqual(tf.getFilterElement(4), null,
            'No filter element for column 4');
    });

    test('Grid layout with no filters', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            grid_enable_default_filters: false,
            col_width: ['100px','100px','100px','100px','100px'],
            grid_layout: true
        });
        tf.init();
        deepEqual(tf.getFilterElement(2), null,
            'No filter element for column 2');
    });

})(window, TableFilter);
