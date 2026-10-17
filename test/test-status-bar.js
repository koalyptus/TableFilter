var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    status_bar: true
});
tf.init();

var statusBar = tf.feature('statusBar');
module('Sanity checks');
test('Status bar component', function() {
    deepEqual(typeof statusBar, 'object', 'StatusBar instantiated');
    notEqual(statusBar.container, null, 'container property');
});
test('Should not initialize if already initialized', function() {
    // setup
    var hit = 0;
    statusBar.initialized = true;
    var initialEmit = statusBar.emitter.emit;
    statusBar.emitter.emit = function() {
        hit++;
    };

    // act
    statusBar.init();

    // assert
    deepEqual(hit, 0, 'emitter.emit not called');

    statusBar.emitter.emit = initialEmit;
});
asyncTest('Can display message', function() {
    // act
    statusBar.message('hello world');

    // assert
    setTimeout(function(){
        start();
        deepEqual(statusBar.msgContainer.innerHTML,
            'hello world', 'Message displayed');
        statusBar.msgContainer.innerHTML = '';
    }, 2);
});
asyncTest('Should not display message if not enabled', function() {
    // setup
    statusBar.enabled = false;

    // act
    statusBar.message('hello world');

    // assert
    setTimeout(function(){
        start();
        deepEqual(statusBar.msgContainer.innerHTML,
            '', 'Message not displayed');
    }, 2);

    statusBar.enabled = true;
});

module('Feature interface');
test('Properties', function() {
    deepEqual(statusBar.tf instanceof TableFilter,
        true, 'TableFilter instance');
    deepEqual(statusBar.feature, 'statusBar', 'Feature name');
    deepEqual(statusBar.enabled, true, 'Feature enabled');
    deepEqual(statusBar.initialized, true, 'Feature enabled');
    deepEqual(typeof statusBar.emitter, 'object',
        'Feature has emitter instance');
    deepEqual(typeof statusBar.config, 'object', 'TF configuration object');
    deepEqual(typeof statusBar.init, 'function', 'Feature init method');
    deepEqual(typeof statusBar.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof statusBar.reset, 'function', 'Feature reset method');
    deepEqual(typeof statusBar.enable, 'function', 'Feature enable method');
    deepEqual(typeof statusBar.disable, 'function', 'Feature enable method');
    deepEqual(typeof statusBar.isEnabled, 'function', 'Feature enable method');
});
test('Can destroy', function() {
    statusBar.destroy();
    deepEqual(statusBar.initialized, false, 'not initialised');
});
test('Can reset', function() {
    statusBar.reset();
    deepEqual(statusBar.enabled, true, 'enabled');
});
test('Can disable', function() {
    statusBar.disable();
    deepEqual(statusBar.enabled, false, 'disabled');
});
test('Can enable', function() {
    statusBar.enable();
    deepEqual(statusBar.enabled, true, 'enabled');
});
test('Can init', function() {
    statusBar.destroy();
    statusBar.enable();
    statusBar.init();
    deepEqual(statusBar.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    statusBar.isEnabled();
    deepEqual(statusBar.enabled, true, 'enabled');
});

module('UI elements');
test('Status bar  UI elements', function() {
    var container = statusBar.container,
        label = statusBar.msgContainer;
    deepEqual(container.nodeName, 'DIV', 'Status bar container');
    deepEqual(label.nodeName, 'SPAN', 'Status bar label');
});

module('Destroy');
test('Remove UI', function() {
    statusBar.destroy();
    var container = statusBar.container,
        label = statusBar.msgContainer;
    deepEqual(container, null, 'Status bar container removed');
    deepEqual(label, null, 'Status bar button removed');
});

module('Re-set UI');
test('Status text', function() {
    statusBar.text = '→←';
    statusBar.init();

    var label = statusBar.labelContainer;
    notEqual(
        label.innerHTML.indexOf('→←'), -1, 'Status bar text');
});
test('Custom container', function() {
    // setup
    statusBar.destroy();
    statusBar.targetId = 'custom-container';

    // act
    statusBar.init();

    // assert
    deepEqual(statusBar.msgContainer.nodeName,
        'SPAN', 'Custom container element');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
