
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    help_instructions: true
});
tf.init();

var help = tf.feature('help');
module('Sanity checks');
test('Clear button component', function() {
    deepEqual(typeof help, 'object', 'Help instanciated');
    notEqual(help.helpInstrBtnEl, null, 'helpInstrBtnEl property');
});

module('UI elements');
test('Help UI elements', function() {
    var container = help.helpInstrContEl,
        helpBtn = help.helpInstrBtnEl;
    deepEqual(container.nodeName, 'DIV', 'Help container');
    deepEqual(helpBtn.nodeName, 'SPAN', 'Help button');
});

module('Destroy and re-init');
test('Remove UI', function() {
    help.destroy();
    var container = help.helpInstrContEl,
        helpBtn = help.helpInstrBtnEl;
    deepEqual(container, null, 'Help container removed');
    deepEqual(helpBtn, null, 'Help button removed');
});

test('Re-set UI', function() {
    var help = tf.feature('help');
    help.destroy();
    help.helpInstrBtnText = '→Help←';
    help.helpInstrText = 'Hello world!';
    help.init();

    var container = help.helpInstrContEl,
        helpBtn = help.helpInstrBtnEl;
    notEqual(
        container.innerHTML.indexOf('Hello world!'),
        -1,
        'Help pop-up text'
    );
    notEqual(helpBtn.innerHTML.indexOf('→Help←'), -1, 'Help button text');
});
