
(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        extensions:[{ name: 'colsVisibility' }]
    });
    tf.init();
    var ext;

    module('Sanity checks');
    test('Extension initialization', function() {
        ext = tf.getExtension('colsVisibility');
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        notEqual(ext, null, 'Extension instanciated');
        deepEqual(ext.initialized, true, 'Extension initialized');
        deepEqual(ext.text, 'Hide: ', 'Text setting');
        deepEqual(ext.btnText, 'Columns&#9660;', 'Button text setting');
    });

    module('UI checks');
    test('UI elements', function() {
        ext = tf.getExtension('colsVisibility');
        var span = ext.spanEl;
        var cont = ext.contEl;
        var btn = ext.btnEl;
        deepEqual(span.nodeName, 'SPAN', 'Container element');
        deepEqual(cont.nodeName, 'DIV', 'Container element');
        deepEqual(cont.getElementsByTagName('p')[0].innerHTML,
            'Hide: ', 'Expected text');
        deepEqual(btn.nodeName, 'A', 'Button element');
        deepEqual(btn.innerHTML, 'Columns▼');
    });
    module('Behaviour');
    test('Toggle columns list container', function() {
        ext = tf.getExtension('colsVisibility');
        ext.toggle();
        deepEqual(ext.contEl.style.display, 'inline', 'columns list visible');

        ext.toggle();
        deepEqual(ext.contEl.style.display, 'none', 'columns list visible');
    });
    test('Hide columns', function() {
        ext = tf.getExtension('colsVisibility');
        ext.hideCol(2);
        ext.hideCol(3);
        deepEqual(ext.isColHidden(2), true, 'Expected column is hidden');
        deepEqual(ext.isColHidden(3), true, 'Expected column is hidden');
    });
    test('Show columns', function() {
        ext = tf.getExtension('colsVisibility');
        ext.showCol(2);
        ext.showCol(3);
        deepEqual(ext.isColHidden(2), false, 'Expected column is displayed');
        deepEqual(ext.isColHidden(3), false, 'Expected column is displayed');
    });
    test('Toggle column', function() {
        ext = tf.getExtension('colsVisibility');
        ext.toggleCol(2);
        deepEqual(ext.isColHidden(2), true, 'Expected column is hidden');

        ext.toggleCol(2);
        deepEqual(ext.isColHidden(2), false, 'Expected column is displayed');
    });
    test('Destroy extension', function() {
        ext = tf.getExtension('colsVisibility');
        ext.destroy();
        deepEqual(ext.initialized, false, 'Extension no longer initialized');
        deepEqual(ext.contEl, null, 'Columns list container removed');
        deepEqual(ext.btnEl, null, 'Button removed');
    });

    // module('Behaviour');
    // test('Filter column with custom filter', function() {
    //     var flt = tf.getFilterElement(3);
    //     flt.selectedIndex = flt.options.length-1;
    //     tf.filter();

    //     deepEqual(
    //         tf.getFilteredData().length, 2, 'Expected nb of filtered rows');

    //     tf.clearFilters();

    //     deepEqual(
    //         tf.getFilteredData().length, 7, 'Expected nb of filtered rows');
    // });

    // test('Paging: filter column with custom filter', function() {
    //     tf.destroy();
    //     tf = null;
    //     tf = new TableFilter('demo', {
    //         col_3: 'select',
    //         custom_options: {
    //             cols: [3],
    //             texts: [['0-0.5', '0.5-1', '1-2', '>2']],
    //             values: [['>0 && <=0.5', '>0.5 && <=1', '>1 && <=2', '>2']],
    //             sorts: [false]
    //         },
    //         paging: true,
    //         paging_length: 3
    //     });
    //     tf.init();

    //     var flt = tf.getFilterElement(3);
    //     flt.selectedIndex = flt.options.length-1;
    //     tf.filter();

    //     deepEqual(
    //         tf.getFilteredData().length, 2, 'Expected nb of filtered rows');

    //     tf.clearFilters();

    //     deepEqual(
    //         tf.getFilteredData().length, 7, 'Expected nb of filtered rows');

    //     tf.destroy();
    //     tf = null;
    // });

    // test('Grid layout: filter column with custom filter', function() {
    //     tf = new TableFilter('demo', {
    //         base_path: '../dist/tablefilter/',
    //         col_3: 'select',
    //         custom_options: {
    //             cols: [3],
    //             texts: [['0-0.5', '0.5-1', '1-2', '>2']],
    //             values: [['>0 && <=0.5', '>0.5 && <=1', '>1 && <=2', '>2']],
    //             sorts: [false]
    //         },
    //         grid_layout: true
    //     });
    //     tf.init();

    //     var flt = tf.getFilterElement(3);
    //     flt.selectedIndex = flt.options.length-1;
    //     tf.filter();

    //     deepEqual(
    //         tf.getFilteredData().length, 2, 'Expected nb of filtered rows');

    //     tf.clearFilters();

    //     deepEqual(
    //         tf.getFilteredData().length, 7, 'Expected nb of filtered rows');

    //     tf.destroy();
    //     tf = null;
    // });

})(window, TableFilter);
