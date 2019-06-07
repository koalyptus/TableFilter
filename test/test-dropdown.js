
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
    tf.setFilterValue(3, '1.1');
    flt1.dispatchEvent(evObj);

    deepEqual(tf.getValidRows().length, 1, 'Table filtered');
    deepEqual(tf.getFilteredData()[0][1][3], '1.1', 'Matched value');
});

test('Can refresh all drop-down filters', function() {
    //setup
    tf.clearFilters();
    var build = dropdown.build;
    var hit = 0;
    dropdown.build = function() { hit++; };

    //act
    dropdown.refreshAll();

    //assert
    deepEqual(hit, 2, 'build method called');

    dropdown.build = build;
});

test('Can select options', function() {
    tf.clearFilters();
    var flt1 = id(tf.fltIds[2]);

    dropdown.selectOptions(2, ['872', '286']);

    deepEqual(flt1.options[5].selected, true, 'Option selected');
    deepEqual(flt1.options[6].selected, true, 'Option selected');
});

test('Can get selected values', function() {
    //setup
    var values = ['286', '872'];
    tf.clearFilters();
    tf.setFilterValue(2, values);

    //act
    var result = dropdown.getValues(2);

    //assert
    deepEqual(values, result);
});
test('Can return values when no selected options', function() {
    //setup
    tf.clearFilters();

    //act
    var result = dropdown.getValues(2);

    //assert
    deepEqual([], result);
});

// Issue 113, addressing option sorting for numeric values
module('Options sorting');
test('Can disable options sorting globally', function() {
    // setup
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_1: 'select',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'multiple',
        col_types: ['string', 'string', 'number', 'number', 'number'],
        sort_select: false
    });

    // act
    tf.init();

    var flt1 = tf.getFilterElement(1);
    var flt2 = tf.getFilterElement(2);
    var flt3 = tf.getFilterElement(3);
    var flt4 = tf.getFilterElement(4);

    // assert
    deepEqual(flt1.options[1].value, 'Adelaide',
        'First option value for column 1');
    deepEqual(flt1.options[6].value, 'Alice Springs',
        'Last option value for column 1');
    deepEqual(flt2.options[1].value, '1412', 'First option value for column 2');
    deepEqual(flt2.options[7].value, '2045', 'Last option value for column 2');
    deepEqual(flt3.options[1].value, '1.4', 'First option value for column 3');
    deepEqual(flt3.options[7].value, '2.15', 'Last option value for column 3');
    deepEqual(flt4.options[1].value, '25.3', 'First option value for column 4');
    deepEqual(flt4.options[7].value, '40', 'Last option value for column 4');
});

test('Can enable options sorting on a column basis', function() {
    // setup
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_1: 'select',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'multiple',
        col_types: ['string', 'string', 'number', 'number', 'number'],
        sort_select: [3, 4]
    });

    // act
    tf.init();

    var flt1 = tf.getFilterElement(1);
    var flt2 = tf.getFilterElement(2);
    var flt3 = tf.getFilterElement(3);
    var flt4 = tf.getFilterElement(4);

    // assert
    deepEqual(flt1.options[1].value, 'Adelaide',
        'First option value for column 1');
    deepEqual(flt1.options[6].value, 'Alice Springs',
        'Last option value for column 1');
    deepEqual(flt2.options[1].value, '1412', 'First option value for column 2');
    deepEqual(flt2.options[7].value, '2045', 'Last option value for column 2');
    deepEqual(flt3.options[1].value, '.6', 'First option value for column 3');
    deepEqual(flt3.options[7].value, '3.1', 'Last option value for column 3');
    deepEqual(flt4.options[1].value, '4.3', 'First option value for column 4');
    deepEqual(flt4.options[7].value, '40', 'Last option value for column 4');
});

test('Can sort options in asc and desc manner', function() {
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_0: 'select',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'multiple',
        col_types: ['string', 'string', 'number', 'number', 'number'],
        case_sensitive: true,
        sort_filter_options_asc: [2, 3],
        sort_filter_options_desc: [0, 4]
    });
    tf.init();

    var flt0 = id(tf.fltIds[0]);
    var flt2 = id(tf.fltIds[2]);
    var flt3 = id(tf.fltIds[3]);
    var flt4 = id(tf.fltIds[4]);

    deepEqual(flt0.options[1].value, 'Sydney',
        'First option value for column 0');
    deepEqual(flt0.options[2].value, 'Adelaide',
        'Last option value for column 0');
    deepEqual(flt2.options[1].value, '286', 'First option value for column 2');
    deepEqual(flt2.options[7].value, '2781', 'Last option value for column 2');
    deepEqual(flt3.options[1].value, '.6', 'First option value for column 3');
    deepEqual(flt3.options[7].value, '3.1', 'Last option value for column 3');
    deepEqual(flt4.options[1].value, '40', 'First option value for column 4');
    deepEqual(flt4.options[7].value, '4.3', 'Last option value for column 4');
});

// issue 714, clear filter text
module('Clear filter text');
test('Can define clear filter text for each column', function() {
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'multiple',
        clear_filter_text: [null, null, 'clear 2', 'clear 3', 'clear 4']
    });
    tf.init();

    var flt2 = tf.getFilterElement(2);
    var flt3 = tf.getFilterElement(3);
    var flt4 = tf.getFilterElement(4);

    deepEqual(flt2.options[0].innerHTML, 'clear 2', 'clear text filter 2');
    deepEqual(flt3.options[0].innerHTML, 'clear 3', 'clear text filter 3');
    deepEqual(flt4.options[0].innerHTML, 'clear 4', 'clear text filter 4');
});
test('Can define clear filter text globally', function() {
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'multiple',
        clear_filter_text: 'reset'
    });
    tf.init();

    var flt2 = tf.getFilterElement(2);
    var flt3 = tf.getFilterElement(3);
    var flt4 = tf.getFilterElement(4);

    deepEqual(flt2.options[0].innerHTML, 'reset', 'clear text filter 2');
    deepEqual(flt3.options[0].innerHTML, 'reset', 'clear text filter 3');
    deepEqual(flt4.options[0].innerHTML, 'reset', 'clear text filter 4');
});


module('Tear down');
test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
    deepEqual(
        tf.feature('dropdown').initialized,
        false,
        'Drop-down not initialised'
    );
});
