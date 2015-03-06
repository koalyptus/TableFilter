requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var PopupFilter = require('modules/popupFilter').PopupFilter,
        types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        col_2: 'multiple',
        col_3: 'select',
        popup_filters: true
    });
    tf.init();

    var popupFilter = tf.Cpt.popupFilter;
    module('Sanity checks');
    test('Pop-up filter component', function() {
        deepEqual(popupFilter instanceof PopupFilter, true, 'PopupFilter type');
        notEqual(popupFilter, null, 'PopupFilter instanciated');
        deepEqual(types.isArray(popupFilter.popUpFltElms), true, 'Type of popUpFltElms property');
    });

    module('UI elements');
    test('Pop-up filter UI elements', function() {
        var flt1 = dom.id(tf.fltIds[3]);
        var flt2 = dom.id(tf.fltIds[2]);
        var fltIcn1 = tf.Cpt.popupFilter.popUpFltImgs[3];
        var fltIcn2 = tf.Cpt.popupFilter.popUpFltImgs[2];
        notEqual(flt1, null, 'Filter element exists');
        notEqual(flt2, null, 'Filter element exists');
        deepEqual(flt2.hasAttribute('multiple'), true, 'Multiple select exists');
        deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
        deepEqual(fltIcn2.nodeName, 'IMG', 'Filter icon exists');
    });

    test('TableFilter removed', function() {
        tf.remove();
        var fltIcn1 = tf.Cpt.popupFilter.popUpFltImgs[3];
        deepEqual(fltIcn1, undefined, 'Filter icon is removed');
        deepEqual(dom.id(tf.fltIds[3]), null, 'Filter is removed');
    });

    test('TableFilter re-initialised', function() {
        tf.init();
        var fltIcn1 = tf.Cpt.popupFilter.popUpFltImgs[3];
        deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
        deepEqual(dom.id(tf.fltIds[3]).nodeName, 'SELECT', 'Filter exists');
    });

});
