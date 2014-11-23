requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var GridLayout = require('modules/gridLayout').GridLayout;

    var tf = new TableFilter('demo', {
        grid_layout: true
    });
    tf.init();

    module('Sanity checks');
    test('GridLayout component', function() {
        deepEqual(tf.Cpt.gridLayout instanceof GridLayout, true, 'GridLayout type');
        notEqual(tf.Cpt.gridLayout, null, 'GridLayout instanciated');
        notEqual(tf.Cpt.gridLayout.tblMainCont, null, 'GridLayout main container element');
        notEqual(tf.Cpt.gridLayout.tblCont, null, 'GridLayout main HTML table container element');
        notEqual(tf.Cpt.gridLayout.headTblCont, null, 'GridLayout headers container element');
        notEqual(tf.Cpt.gridLayout.headTbl, null, 'GridLayout headers HTML table');
    });

    test('Destroy GridLayout component', function() {
        tf.Cpt.gridLayout.destroy();
        deepEqual(tf.Cpt.gridLayout.tblMainCont, null, 'Main container element removed');
        deepEqual(tf.Cpt.gridLayout.tblCont, null, 'Main HTML table container element removed');
        deepEqual(tf.Cpt.gridLayout.headTblCont, null, 'Headers container element removed');
        deepEqual(tf.Cpt.gridLayout.headTbl, null, 'Headers HTML table element removed');
    });

});
