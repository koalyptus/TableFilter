requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var StatusBar = require('modules/statusBar').StatusBar,
        types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        status_bar: true
    });
    tf.init();

    var statusBar = tf.Cpt.statusBar;
    module('Sanity checks');
    test('Status bar component', function() {
        deepEqual(statusBar instanceof StatusBar, true, 'StatusBar type');
        notEqual(statusBar.statusBarDiv, null, 'statusBarDiv property');
    });

    module('UI elements');
    test('Status bar  UI elements', function() {
        var container = statusBar.statusBarDiv,
            label = statusBar.statusBarSpanText;
        deepEqual(container.nodeName, 'DIV', 'Status bar container');
        deepEqual(label.nodeName, 'SPAN', 'Status bar label');
    });

    module('Destroy');
    test('Remove UI', function() {
        statusBar.destroy();
        var container = statusBar.statusBarDiv,
            label = statusBar.statusBarSpanText;
        deepEqual(container, null, 'Status bar container removed');
        deepEqual(label, null, 'Status bar button removed');
    });

    test('Re-set UI', function() {
        statusBar.statusBarText = '→←';
        statusBar.init();

        var label = statusBar.statusBarSpanText;
        notEqual(
            dom.getText(label).indexOf('→←'), -1, 'Status bar text');
    });

});
