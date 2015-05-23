
var id = function (id){ return document.getElementById(id); };
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_2: 'multiple',
    col_3: 'select',
    fill_slc_on_demand: false
});
tf.init();

var dropdown = tf.Cpt.dropdown;
module('Sanity checks');
test('Drop-down component', function() {
    deepEqual(typeof dropdown, 'object', 'DropDown instanciated');
    deepEqual(dropdown.opts instanceof Array, true, 'Type of opts property');
});

module('UI elements');
test('Drop-down UI elements', function() {
    var flt1 = id(tf.fltIds[3]);
    var flt2 = id(tf.fltIds[2]);
    notEqual(flt1, null, 'DropDown SELECT element exists');
    notEqual(flt2, null, 'DropDown SELECT element exists');
    deepEqual(flt2.hasAttribute('multiple'), true, 'Multiple select exists');
});

test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
});
