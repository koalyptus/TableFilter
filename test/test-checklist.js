requirejs(['test-config', '../src/core'], function(config, TableFilter){

    QUnit.start();

    var CheckList = require('modules/checkList').CheckList,
        types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        col_3: 'checklist',
        fill_slc_on_demand: false
    });
    tf.init();

    var checkList = tf.Cpt.checkList;
    module('Sanity checks');
    test('CheckList component', function() {
        deepEqual(checkList instanceof CheckList, true, 'CheckList type');
        notEqual(checkList, null, 'CheckList instanciated');
        deepEqual(types.isArray(checkList.checkListDiv), true, 'Type of checkListDiv property');
    });

    module('UI elements');
    test('CheckList UI elements', function() {
        var flt = dom.id(tf.fltIds[3]);
        notEqual(flt, null, 'CheckList UL element');
        deepEqual(flt.firstChild.nodeName, 'LI', 'First CheckList option element name');
    });

    test('TableFilter removed', function() {
        tf.RemoveGrid();
        deepEqual(dom.id(tf.fltIds[3]), null, 'CheckList UL element');
    });
});
