
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    help_instructions: true
});
tf.init();

var help = tf.feature('help');
module('Sanity checks');
test('Clear button component', function() {
    deepEqual(typeof help, 'object', 'Help instanciated');
    notEqual(help.btn, null, 'btn property');
});

module('UI elements');
test('Help UI elements', function() {
    var container = help.cont,
        helpBtn = help.btn;
    deepEqual(container.nodeName, 'DIV', 'Help container');
    deepEqual(helpBtn.nodeName, 'SPAN', 'Help button');
});

module('Destroy and re-init');
test('Remove UI', function() {
    help.destroy();
    var container = help.cont,
        helpBtn = help.btn;
    deepEqual(container, null, 'Help container removed');
    deepEqual(helpBtn, null, 'Help button removed');
});

test('Re-set UI', function() {
    var help = tf.feature('help');
    help.destroy();
    help.btnText = '→Help←';
    help.instrText = 'Hello world!';
    help.init();

    var container = help.cont,
        helpBtn = help.btn;
    notEqual(
        container.innerHTML.indexOf('Hello world!'),
        -1,
        'Help pop-up text'
    );
    notEqual(helpBtn.innerHTML.indexOf('→Help←'), -1, 'Help button text');
});
