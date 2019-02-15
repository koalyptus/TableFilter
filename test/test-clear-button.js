
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    btn_reset: true
});
tf.init();

var clearButton = tf.feature('clearButton');

module('Sanity checks');
test('Clear button component', function() {
    deepEqual(typeof clearButton, 'object', 'ClearButton instanciated');
    notEqual(clearButton.container, null, 'container property');
    notEqual(clearButton.element, null, 'element property');
});

module('Feature interface');
test('Properties', function() {
    deepEqual(
        clearButton.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(clearButton.feature, 'btnReset', 'Feature name');
    deepEqual(clearButton.enabled, true, 'Feature enabled');
    deepEqual(clearButton.initialized, true, 'Feature enabled');
    deepEqual(typeof clearButton.emitter, 'object',
        'Feature has emitter instance');
    deepEqual(typeof clearButton.config, 'object', 'TF configuration object');
    deepEqual(typeof clearButton.init, 'function', 'Feature init method');
    deepEqual(typeof clearButton.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof clearButton.reset, 'function', 'Feature reset method');
    deepEqual(typeof clearButton.enable, 'function', 'Feature enable method');
    deepEqual(typeof clearButton.disable, 'function', 'Feature enable method');
    deepEqual(typeof clearButton.isEnabled, 'function',
        'Feature enable method');
});
test('Can destroy', function() {
    clearButton.destroy();
    deepEqual(clearButton.initialized, false, 'not initialised');
});
test('Can reset', function() {
    clearButton.reset();
    deepEqual(clearButton.enabled, true, 'enabled');
});
test('Can disable', function() {
    clearButton.disable();
    deepEqual(clearButton.enabled, false, 'disabled');
});
test('Can enable', function() {
    clearButton.enable();
    deepEqual(clearButton.enabled, true, 'enabled');
});
test('Can init', function() {
    clearButton.destroy();
    clearButton.enable();
    clearButton.init();
    deepEqual(clearButton.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    clearButton.isEnabled();
    deepEqual(clearButton.enabled, true, 'enabled');
});

module('Behaviour');
test('Cannot init if already initialised', function() {
    // setup
    clearButton.initialized = true;
    var emit = clearButton.emitter.emit;
    var hit = 0;
    clearButton.emitter.emit = function() {
        hit++;
    };

    // act
    clearButton.init();

    // assert
    deepEqual(hit, 0, 'does not initialise');

    clearButton.emitter.emit = emit;
});

test('onClick does nothing if not enabled', function() {
    // setup
    clearButton.disable();
    var clearFilters = clearButton.tf.clearFilters;
    var hit = 0;
    clearButton.tf.clearFilters = function() {
        hit++;
    };

    // act
    clearButton.onClick();

    // assert
    deepEqual(hit, 0, 'onClick does nothing');

    clearButton.tf.clearFilters = clearFilters;
});

test('onClick calls clearFilters if enabled', function() {
    // setup
    clearButton.enable();
    var clearFilters = clearButton.tf.clearFilters;
    var hit = 0;
    clearButton.tf.clearFilters = function() {
        hit++;
    };

    // act
    clearButton.onClick();

    // assert
    deepEqual(hit, 1, 'onClick calls clearFilters');

    clearButton.tf.clearFilters = clearFilters;
});

module('UI elements');
test('ClearButton UI elements', function() {
    var container = clearButton.container;
    var element = clearButton.element;
    deepEqual(container.nodeName, 'SPAN', 'Clear button container');
    deepEqual(element.nodeName, 'INPUT', 'Clear button element');
});

module('Destroy and re-init');
test('Remove UI', function() {
    clearButton.destroy();
    var btnResetEl = tf.feature('clearButton').element;
    deepEqual(btnResetEl, null, 'Clear button is removed');
});

test('Re-set UI with no icons and text button', function() {
    clearButton.destroy();
    tf.enableIcons = false;
    clearButton.html = null;
    clearButton.text = 'Clear';
    clearButton.init();

    var btnResetEl = clearButton.element;
    deepEqual(btnResetEl.nodeName, 'A', 'Clear button tag changed');
    deepEqual(btnResetEl.innerText, 'Clear', 'Clear button text');
});

test('Destroy and init with text button and icons enabled', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        btn_reset: {
            text: 'Clear all'
        }
    });
    tf.init();

    clearButton = tf.feature('clearButton');

    var btnResetEl = clearButton.element;
    deepEqual(btnResetEl.nodeName, 'A', 'Clear button tag changed');
    deepEqual(btnResetEl.innerText, 'Clear all', 'Clear button text');
});

test('Destroy and init in external container', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        btn_reset: {
            target_id: 'external-container'
        }
    });
    tf.init();

    clearButton = tf.feature('clearButton');

    deepEqual(clearButton.element.nodeName, 'INPUT', 'Clear button tag');
    deepEqual(clearButton.container.parentNode.id, 'external-container',
        'container id');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
