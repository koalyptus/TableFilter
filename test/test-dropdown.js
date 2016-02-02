
var id = function (id){ return document.getElementById(id); };
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_2: 'multiple',
    col_3: 'select'
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

// Issue 113, addressing option sorting for numeric values
module('Options sorting');
test('Can sort options', function() {
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'multiple',
        sort_num_asc: [2, 3],
        sort_num_desc: [4]
    });
    tf.init();

    var flt2 = id(tf.fltIds[2]);
    var flt3 = id(tf.fltIds[3]);
    var flt4 = id(tf.fltIds[4]);

    deepEqual(flt2.options[1].value, '286', 'First option value for column 2');
    deepEqual(flt2.options[7].value, '2781', 'Last option value for column 2');
    deepEqual(flt3.options[1].value, '.6', 'First option value for column 3');
    deepEqual(flt3.options[7].value, '3.1', 'Last option value for column 3');
    deepEqual(flt4.options[1].value, '40', 'First option value for column 4');
    deepEqual(flt4.options[7].value, '4.3', 'Last option value for column 4');
});

test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
});
