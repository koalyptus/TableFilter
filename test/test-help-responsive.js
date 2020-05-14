
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    help_instructions: {
        container_adjust_left_position: 20
    },
    responsive: true
});
tf.init();

var help = tf.feature('help');
module('Sanity checks');
test('Button element', function() {
    deepEqual(typeof help, 'object', 'Help instanciated');
    notEqual(help.btn, null, 'btn property');
});

module('Pop-up container position');
test('Help UI elements', function() {
    var container = help.cont,
        helpBtn = help.btn;
    deepEqual(container.nodeName, 'DIV', 'Help container');
    deepEqual(helpBtn.nodeName, 'SPAN', 'Help button');
});

// 772 issue: pop-up container position when table feature horizontal scroll
test('When table has horizontal scroll', function() {
    // setup
    tf.dom().scrollLeft = 10000;

    // act
    help.toggle();

    // assert
    deepEqual(
        parseFloat(help.cont.style.left),
        (help.btn.offsetLeft
        - tf.dom().scrollLeft
        + help.contAdjustLeftPosition),
        'Pop-up container position'
    );
});

test('When table does not have horizontal scroll', function() {
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        help_instructions: true,
        responsive: false
    });
    tf.init();
    var help = tf.feature('help');

    // act
    help.toggle();

    // assert
    deepEqual(help.cont.style.left, '', 'Pop-up container position');
});

module('Tear-down');
test('can destroy Help UI component', function() {
    // act
    tf.destroy();
    var help = tf.feature('help');

    // assert
    deepEqual(help.btn, null, 'Help button removed');
    deepEqual(help.cont, null, 'Help pop-up container removed');
});
