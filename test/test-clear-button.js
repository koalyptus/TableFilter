
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    btn_reset: true
});
tf.init();

var clearButton = tf.feature('clearButton');
module('Sanity checks');
test('Clear button component', function() {
    deepEqual(typeof clearButton, 'object', 'ClearButton instanciated');
    notEqual(clearButton.btnResetEl, null, 'btnResetEl property');
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

module('UI elements');
test('ClearButton UI elements', function() {
    var container = clearButton.btnResetEl;
    deepEqual(container.nodeName, 'INPUT', 'Clear button container');
    deepEqual(
        container.parentNode.id,
        clearButton.prfxResetSpan+tf.id,
        'Container id'
    );
});

module('Destroy and re-init');
test('Remove UI', function() {
    clearButton.destroy();
    var btnResetEl = tf.feature('clearButton').btnResetEl;
    deepEqual(btnResetEl, null, 'Clear button is removed');
});

test('Re-set UI', function() {
    tf.enableIcons = false;
    clearButton = tf.feature('clearButton');
    clearButton.btnResetHtml = null;
    clearButton.btnResetText = 'Clear';
    clearButton.init();

    var btnResetEl = clearButton.btnResetEl;
    deepEqual(btnResetEl.nodeName, 'A', 'Clear button tag changed');
    deepEqual(btnResetEl.innerText, 'Clear', 'Clear button text');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.hasGrid(), false, 'Filters removed');
});
