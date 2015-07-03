
(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        extensions:[{ name: 'colsVisibility' }]
    });
    tf.init();
    var ext;

    module('Sanity checks');
    test('Extension initialization', function() {
        ext = tf.extension('colsVisibility');
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        notEqual(ext, null, 'Extension instanciated');
        deepEqual(ext.initialized, true, 'Extension initialized');
        deepEqual(ext.text, 'Hide: ', 'Text setting');
        deepEqual(ext.btnText, 'Columns&#9660;', 'Button text setting');
    });

    module('UI checks');
    test('UI elements', function() {
        ext = tf.extension('colsVisibility');
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
        ext = tf.extension('colsVisibility');
        ext.toggle();
        deepEqual(ext.contEl.style.display, 'inline', 'columns list visible');

        ext.toggle();
        deepEqual(ext.contEl.style.display, 'none', 'columns list visible');
    });
    test('Hide columns', function() {
        ext = tf.extension('colsVisibility');
        ext.hideCol(2);
        ext.hideCol(3);
        deepEqual(ext.isColHidden(2), true, 'Expected column is hidden');
        deepEqual(ext.isColHidden(3), true, 'Expected column is hidden');
    });
    test('Show columns', function() {
        ext = tf.extension('colsVisibility');
        ext.showCol(2);
        ext.showCol(3);
        deepEqual(ext.isColHidden(2), false, 'Expected column is displayed');
        deepEqual(ext.isColHidden(3), false, 'Expected column is displayed');
    });
    test('Toggle column', function() {
        ext = tf.extension('colsVisibility');
        ext.toggleCol(2);
        deepEqual(ext.isColHidden(2), true, 'Expected column is hidden');

        ext.toggleCol(2);
        deepEqual(ext.isColHidden(2), false, 'Expected column is displayed');
    });
    test('Destroy extension', function() {
        ext = tf.extension('colsVisibility');
        ext.destroy();
        deepEqual(ext.initialized, false, 'Extension no longer initialized');
        deepEqual(ext.contEl, null, 'Columns list container removed');
        deepEqual(ext.btnEl, null, 'Button removed');
    });
    test('Re-initialize extension', function() {
        ext = tf.extension('colsVisibility');
        ext.init();
        deepEqual(ext.initialized, true, 'Extension initialized');
        tf.destroy();
    });

    module('Behaviour with grid layout');
    test('Re-initialize tablefilter with grid layout on', function() {
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            grid_layout: true,
            extensions:[{ name: 'colsVisibility' }]
        });
        tf.init();

        ext = tf.extension('colsVisibility');
        deepEqual(ext.initialized, true, 'Extension initialized');
    });
    test('Toggle columns list container', function() {
        ext = tf.extension('colsVisibility');
        ext.toggle();
        deepEqual(ext.contEl.style.display, 'inline', 'columns list visible');

        ext.toggle();
        deepEqual(ext.contEl.style.display, 'none', 'columns list visible');
    });
    test('Hide columns', function() {
        ext = tf.extension('colsVisibility');
        ext.hideCol(2);
        ext.hideCol(3);
        deepEqual(ext.isColHidden(2), true, 'Expected column is hidden');
        deepEqual(ext.isColHidden(3), true, 'Expected column is hidden');
    });
    test('Show columns', function() {
        ext = tf.extension('colsVisibility');
        ext.showCol(2);
        ext.showCol(3);
        deepEqual(ext.isColHidden(2), false, 'Expected column is displayed');
        deepEqual(ext.isColHidden(3), false, 'Expected column is displayed');
    });
    test('Toggle column', function() {
        ext = tf.extension('colsVisibility');
        ext.toggleCol(2);
        deepEqual(ext.isColHidden(2), true, 'Expected column is hidden');

        ext.toggleCol(2);
        deepEqual(ext.isColHidden(2), false, 'Expected column is displayed');
    });
    test('Destroy extension and tablefilter', function() {
        ext = tf.extension('colsVisibility');
        ext.destroy();
        deepEqual(ext.initialized, false, 'Extension no longer initialized');
        deepEqual(ext.contEl, null, 'Columns list container removed');
        deepEqual(ext.btnEl, null, 'Button removed');

        tf.destroy();
    });

})(window, TableFilter);
