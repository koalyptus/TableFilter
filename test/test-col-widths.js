
(function(win, TableFilter){
    var id = function (id){ return document.getElementById(id); };

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_widths: ['150px', '100px', '175px', '120px', null]
    });
    tf.init();

    module('Sanity checks');
    test('Column widths', function() {
        var filterRow = tf.tbl.rows[tf.getFiltersRowIndex()];
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(filterRow.cells[1].style.width,
            '100px', 'Expected column width');
        deepEqual(filterRow.cells[4].style.width, '', 'Expected column width');
    });

    test('Grid layout column widths', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            col_widths: ['150px', '100px', '175px', '120px', '200px'],
            grid_layout: true,
            sort: false
        });
        tf.init();
        deepEqual(tf.getHeaderElement(0).style.width,
            '150px', 'Expected column width');
        deepEqual(tf.getHeaderElement(4).style.width,
            '200px', 'Expected column width');
    });

})(window, TableFilter);