
(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_widths: ['150px', '100px', '175px', '120px', null]
    });
    tf.init();

    module('Sanity checks');
    test('Column widths', function() {
        var cols = tf.dom().getElementsByTagName('col');
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(cols[1].style.width, '100px', 'Expected column width');
        deepEqual(cols[4].style.width, '', 'Expected column width');
        deepEqual(tf.dom().style.width, '645px', 'Table width set');
        deepEqual(tf.dom().style.tableLayout, 'fixed', 'Table layout fixed');
    });

    test('Grid layout column widths', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            col_widths: ['150px', '100px', '175px', '120px', null],
            grid_layout: true
        });
        tf.init();
        var gridLayout = tf.feature('gridLayout');
        var cols = gridLayout.headTbl.getElementsByTagName('col');
        deepEqual(cols[0].style.width, '150px', 'Expected column width');
        deepEqual(cols[3].style.width, '120px', 'Expected column width');
        deepEqual(
            tf.dom().style.width === gridLayout.headTbl.style.width,
            true,
            'Content and headers table have same width'
        );
    });

})(window, TableFilter);
