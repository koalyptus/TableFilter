requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    var types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        base_path: '../src/',
        sort: true,
        sort_config: {
            sort_types: ['string','string','number','number','number']
        },
        on_sort_loaded: startTests
    });
    tf.init();

    function startTests(tf){
        var sort = tf.Extensions.sort;
        QUnit.start();

        module('Sanity checks');
        test('Sort extension', function() {
            notEqual(sort, null, 'Sort instanciated');
            deepEqual(sort.stt instanceof SortableTable, true, 'Sort type');
            // notEqual(clearButton.btnResetEl, null, 'btnResetEl property');
        });

        // module('UI elements');
        // test('ClearButton UI elements', function() {
        //     var container = clearButton.btnResetEl;
        //     deepEqual(container.nodeName, 'INPUT', 'Clear button container');
        //     deepEqual(container.parentNode.id, tf.prfxResetSpan+tf.id, 'Container id');
        // });

        // module('Destroy and re-init');
        // test('Remove UI', function() {
        //     clearButton.destroy();
        //     var btnResetEl = tf.Cpt.clearButton.btnResetEl;
        //     deepEqual(btnResetEl, null, 'Clear button is removed');
        // });

        // test('Re-set UI', function() {
        //     tf.enableIcons = false;
        //     tf.Cpt.clearButton.btnResetHtml = null;
        //     tf.Cpt.clearButton.btnResetText = 'Clear';
        //     tf.Cpt.clearButton.init();

        //     var btnResetEl = tf.Cpt.clearButton.btnResetEl;
        //     deepEqual(btnResetEl.nodeName, 'A', 'Clear button tag changed');
        //     deepEqual(dom.getText(btnResetEl), 'Clear', 'Clear button text');
        // });

    }

});
