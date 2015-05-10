
var tf = new TableFilter('demo', {
    btn_reset: true
});
tf.init();

var clearButton = tf.Cpt.clearButton;
module('Sanity checks');
test('Clear button component', function() {
    deepEqual(typeof clearButton, 'object', 'ClearButton instanciated');
    notEqual(clearButton.btnResetEl, null, 'btnResetEl property');
});

module('UI elements');
test('ClearButton UI elements', function() {
    var container = clearButton.btnResetEl;
    deepEqual(container.nodeName, 'INPUT', 'Clear button container');
    deepEqual(container.parentNode.id, clearButton.prfxResetSpan+tf.id, 'Container id');
});

module('Destroy and re-init');
test('Remove UI', function() {
    clearButton.destroy();
    var btnResetEl = tf.Cpt.clearButton.btnResetEl;
    deepEqual(btnResetEl, null, 'Clear button is removed');
});

test('Re-set UI', function() {
    tf.enableIcons = false;
    tf.Cpt.clearButton.btnResetHtml = null;
    tf.Cpt.clearButton.btnResetText = 'Clear';
    tf.Cpt.clearButton.init();

    var btnResetEl = tf.Cpt.clearButton.btnResetEl;
    deepEqual(btnResetEl.nodeName, 'A', 'Clear button tag changed');
    deepEqual(btnResetEl.innerText, 'Clear', 'Clear button text');
});

