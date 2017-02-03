
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    extensions:[{
        name: 'filtersVisibility',
        target_id: 'test',
        btn_text: 'Hello'
    }]
});
tf.init();

var extTargetElement = document.createElement('div');
extTargetElement.setAttribute('id', 'test');
document.body.insertBefore(extTargetElement, tf.tbl);

module('Sanity checks');
test('Filters visibility extension', function() {
    var ext = tf.extension('filtersVisibility');
    deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
    notEqual(ext, null, 'Extension instanciated');
    deepEqual(ext.initialized, true, 'Extension initialized');
});

module('Check UI');
test('UI elements', function() {
    var ext = tf.extension('filtersVisibility');
    var btn = ext.btnEl;
    deepEqual(
        extTargetElement.firstChild.nodeName, 'SPAN', 'Container element');
    deepEqual(btn.nodeName, 'A', 'Button element');
    deepEqual(btn.textContent || btn.innerText, 'Hello', 'Expected text');
    ext.destroy();
});
//     var ext = tf.extension('filtersVisibility');
//     var cont = ext.contEl;
//     var btn = ext.btnEl;
//     deepEqual(cont.nodeName, 'SPAN', 'Container element');
//     deepEqual(btn.nodeName, 'A', 'Button element');
//     deepEqual(btn.title, 'Toggle filters', 'Button tooltip');
//     deepEqual(btn.firstChild.nodeName, 'IMG', 'Image element');
//     deepEqual(btn.firstChild.alt, 'Collapse filters', 'Button tooltip');
// });

// module('Check behaviours');
// test('Toggle filters', function() {
//     var ext = tf.extension('filtersVisibility');
//     ext.toggle();
//     var filtersRow = tf.tbl.rows[tf.getFiltersRowIndex()];
//     deepEqual(filtersRow.style.display, 'none', 'Filters hidden');
//     ext.toggle();
//     deepEqual(filtersRow.style.display, '', 'Filters displayed');
// });

// test('Remove extension', function() {
//     var ext = tf.extension('filtersVisibility');
//     ext.destroy();
//     deepEqual(ext.contEl, null, 'Container element removed');
//     deepEqual(ext.btnEl, null, 'Button element removed');
//     deepEqual(ext.initialized, false, 'Extension not initialized');
// });

test('Button without icon', function() {
    var ext = tf.extension('filtersVisibility');

    // tf.destroy();
    // tf = new TableFilter('demo', {
    //     base_path: '../dist/tablefilter/',
    //     extensions:[{
    //         name: 'filtersVisibility',
    //         enable_icon: false
    //     }]
    // });
    // tf.init();
    ext.btnEl = null;
    ext.targetId = null;
    ext.btnText = '';
    ext.enableIcon = false;
    ext.init();

    deepEqual(ext.contEl.nodeName, 'SPAN', 'Container element');
    deepEqual(ext.btnEl.nodeName, 'A', 'Button element');
    deepEqual(ext.btnEl.innerHTML, 'Toggle filters', 'Expected text');
});
