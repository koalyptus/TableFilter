requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var Help = require('modules/help').Help,
        types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        help_instructions: true
    });
    tf.init();

    var help = tf.Cpt.help;
    module('Sanity checks');
    test('Clear button component', function() {
        deepEqual(help instanceof Help, true, 'Help type');
        notEqual(help, null, 'Help instanciated');
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
        tf.Cpt.help.destroy();
        tf.Cpt.help.helpInstrBtnText = '→Help←';
        tf.Cpt.help.helpInstrText = 'Hello world!';
        tf.Cpt.help.init();

        var container = help.helpInstrContEl,
            helpBtn = help.helpInstrBtnEl;
        notEqual(
            dom.getText(container).indexOf('Hello world!'),
            -1,
            'Help pop-up text'
        );
        notEqual(
            dom.getText(helpBtn).indexOf('→Help←'), -1, 'Help button text');
    });

});
