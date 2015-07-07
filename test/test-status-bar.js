var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    status_bar: true
});
tf.init();

var statusBar = tf.feature('statusBar');
module('Sanity checks');
test('Status bar component', function() {
    deepEqual(typeof statusBar, 'object', 'StatusBar instantiated');
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
        label.innerHTML.indexOf('→←'), -1, 'Status bar text');
});

