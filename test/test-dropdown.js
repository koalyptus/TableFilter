
var id = function (id){ return document.getElementById(id); };
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_2: 'multiple',
    col_3: 'select',
    load_filters_on_demand: false
});
tf.init();

var dropdown = tf.feature('dropdown');
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

module('Behaviour');
test('Can filter on drop-down change', function() {
    var flt1 = id(tf.fltIds[3]);

    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent('change', true, true);
    tf.activeFlt = flt1;
    tf.setFilterValue(3, '1.1');
    flt1.dispatchEvent(evObj);

    deepEqual(tf.getValidRows().length, 1, 'Table filtered');
    deepEqual(tf.getFilteredData()[0][1][3], '1.1', 'Matched value');
});

test('Can select options', function() {
    tf.clearFilters();
    var flt1 = id(tf.fltIds[2]);

    dropdown.selectOptions(2, ['872', '286']);

    deepEqual(flt1.options[5].selected, true, 'Option selected');
    deepEqual(flt1.options[6].selected, true, 'Option selected');
});

test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
});
