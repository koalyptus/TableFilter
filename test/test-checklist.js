
var id = function (id){ return document.getElementById(id); };
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_3: 'checklist',
    load_filters_on_demand: false
});
tf.init();

var checkList = tf.feature('checkList');
module('Sanity checks');
test('CheckList component', function() {
    deepEqual(typeof checkList, 'object', 'CheckList instanciated');
    deepEqual(checkList.checkListDiv instanceof Array, true,
        'Type of checkListDiv property');
});

module('UI elements');
test('CheckList UI elements', function() {
    var flt = id(tf.fltIds[3]);
    notEqual(flt, null, 'CheckList UL element');
    deepEqual(flt.firstChild.nodeName, 'LI',
        'First CheckList option element name');
    deepEqual(flt.childNodes.length, 8, 'number of checklist options');
});

module('Behaviour');
test('Can filter on checkList change', function() {
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
    var flt1 = id(tf.fltIds[3]);

    checkList.selectOptions(3, ['1.4', '.6']);

    notEqual(flt1.getAttribute('value').indexOf('1.4'), -1, 'Option selected');
    notEqual(flt1.getAttribute('value').indexOf('.6'), -1, 'Option selected');
});

// Issue 113, addressing option sorting for numeric values
module('Options sorting');
test('Can sort options', function() {
    tf.clearFilters();
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_2: 'checklist',
        col_3: 'checklist',
        col_4: 'checklist',
        sort_num_asc: [2, 3],
        sort_num_desc: [4]
    });
    tf.init();

    var flt2 = id(tf.fltIds[2]);
    var flt3 = id(tf.fltIds[3]);
    var flt4 = id(tf.fltIds[4]);

    deepEqual(
        flt2.getElementsByTagName('li')[1].firstChild.firstChild.value,
        '286',
        'First option value for column 2'
    );
    deepEqual(
        flt2.getElementsByTagName('li')[7].firstChild.firstChild.value,
        '2781',
        'Last option value for column 2'
    );
    deepEqual(
        flt3.getElementsByTagName('li')[1].firstChild.firstChild.value,
        '.6',
        'First option value for column 3'
    );
    deepEqual(
        flt3.getElementsByTagName('li')[7].firstChild.firstChild.value,
        '3.1',
        'Last option value for column 3'
    );
    deepEqual(
        flt4.getElementsByTagName('li')[1].firstChild.firstChild.value,
        '40',
        'First option value for column 4'
    );
    deepEqual(
        flt4.getElementsByTagName('li')[7].firstChild.firstChild.value,
        '4.3',
        'Last option value for column 4'
    );
});

test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(id(tf.fltIds[3]), null, 'CheckList UL element');
});
