requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var Dropdown = require('modules/dropdown').Dropdown,
        types = require('types').Types,
        dom = require('dom').Dom;

    var tf = new TableFilter('demo', {
        col_2: 'multiple',
        col_3: 'select',
        fill_slc_on_demand: false
    });
    tf.init();

    var dropdown = tf.Cpt.dropdown;
    module('Sanity checks');
    test('Drop-down component', function() {
        deepEqual(dropdown instanceof Dropdown, true, 'DropDown type');
        notEqual(dropdown, null, 'DropDown instanciated');
        deepEqual(types.isArray(dropdown.opts), true, 'Type of opts property');
    });

    module('UI elements');
    test('Drop-down UI elements', function() {
        var flt1 = dom.id(tf.fltIds[3]);
        var flt2 = dom.id(tf.fltIds[2]);
        notEqual(flt1, null, 'DropDown SELECT element exists');
        notEqual(flt2, null, 'DropDown SELECT element exists');
        deepEqual(flt2.hasAttribute('multiple'), true, 'Multiple select exists');
    });

    test('TableFilter removed', function() {
        tf.remove();
        deepEqual(dom.id(tf.fltIds[3]), null, 'Filter is removed');
    });

});
