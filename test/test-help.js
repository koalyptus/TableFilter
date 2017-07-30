
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    help_instructions: true
});
tf.init();

var help = tf.feature('help');
module('Sanity checks');
test('Button element', function() {
    deepEqual(typeof help, 'object', 'Help instanciated');
    notEqual(help.btn, null, 'btn property');
});

module('Feature interface');
test('Properties', function() {
    deepEqual(help.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(help.feature, 'help', 'Feature name');
    deepEqual(help.enabled, true, 'Feature enabled');
    deepEqual(help.initialized, true, 'Feature enabled');
    deepEqual(typeof help.emitter, 'object', 'Feature has emitter instance');
    deepEqual(typeof help.config, 'object', 'TF configuration object');
    deepEqual(typeof help.init, 'function', 'Feature init method');
    deepEqual(typeof help.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof help.reset, 'function', 'Feature reset method');
    deepEqual(typeof help.enable, 'function', 'Feature enable method');
    deepEqual(typeof help.disable, 'function', 'Feature enable method');
    deepEqual(typeof help.isEnabled, 'function', 'Feature enable method');
});
test('Can destroy', function() {
    help.destroy();
    deepEqual(help.initialized, false, 'not initialised');
});
test('Can reset', function() {
    help.reset();
    deepEqual(help.enabled, true, 'enabled');
});
test('Can disable', function() {
    help.disable();
    deepEqual(help.enabled, false, 'disabled');
});
test('Can enable', function() {
    help.enable();
    deepEqual(help.enabled, true, 'enabled');
});
test('Can init', function() {
    help.destroy();
    help.enable();
    help.init();
    deepEqual(help.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    help.isEnabled();
    deepEqual(help.enabled, true, 'enabled');
});

module('UI elements');
test('Help UI elements', function() {
    var container = help.cont,
        helpBtn = help.btn;
    deepEqual(container.nodeName, 'DIV', 'Help container');
    deepEqual(helpBtn.nodeName, 'SPAN', 'Help button');
});

test('Help container auto-closes when user clicks away', function() {
    // setup
    help.toggle();

    // act
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent('mouseup', true, true);
    // mouseup fired from a table cell
    tf.dom().rows[3].cells[2].dispatchEvent(evObj);

    // assert
    deepEqual(help.cont.style.display, 'none',
        'Help container closed after user clicks away'
    );
});

// 376 issue: ensure close button closes popup
test('Close button closes popup', function() {
    // setup
    help.toggle();

    // act
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent('click', true, true);
    help.cont.querySelector('.close').dispatchEvent(evObj);

    // assert
    deepEqual(help.cont.style.display, 'none',
        'Close button closes popup'
    );
});
test('Help button closes popup when already open', function() {
    // setup
    help.toggle();

    // act
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent('click', true, true);
    help.btn.querySelector('.helpBtn').dispatchEvent(evObj);

    // assert
    deepEqual(help.cont.style.display, 'none',
        'Close button closes popup'
    );
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


module('Destroy and re-init');
test('Can init help when property is undefined and toolbar is set',
    function() {
        tf.destroy();
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            help_instructions: undefined,
            // creates toolbar
            rows_counter: true
        });
        tf.init();
        var help = tf.feature('help');

        notEqual(help.btn, null, 'btn property');
        deepEqual(help.btn.childNodes[1].innerHTML, '?', 'Button text');
    }
);

test('Does not init help when property is undefined and toolbar is not set ' +
    'by other feature(s)',
function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/'
    });
    tf.init();
    var help = tf.feature('help');

    deepEqual(help.initialized, false, 'feature not initialized');
    deepEqual(help.btn, null, 'btn property not set');
    deepEqual(help.cont, null, 'cont property not set');
});

test('Can init help when property is defined with a literal object ' +
    'and toolbar is set',
function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        help_instructions: {
            btn_text: '??',
            text: 'hello world'
        },
        // creates toolbar
        rows_counter: true
    });
    tf.init();
    var help = tf.feature('help');

    notEqual(help.btn, null, 'btn property');
    deepEqual(help.btn.childNodes[1].innerHTML, '??', 'Button text');
    deepEqual(help.instrText, 'hello world', 'Text property');
    deepEqual(help.cont.innerHTML.indexOf('hello world') !== -1, true,
        'Text in DOM element');
});

test('Can toggle help when property is undefined and toolbar is set',
    function() {
        tf.destroy();
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            // creates toolbar
            rows_counter: true
        });
        tf.init();
        var help = tf.feature('help');

        // Pull 157, help button regression when setting is undefined
        help.toggle();

        notEqual(help, null, 'help instantiated');
        deepEqual(help.enabled, true, 'help enabled');
        deepEqual(help.cont.style.display, 'inline', 'Container is open');
    });

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
