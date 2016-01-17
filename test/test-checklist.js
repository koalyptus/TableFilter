
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
    deepEqual(checkList.checkListDiv instanceof Array, true, 'Type of checkListDiv property');
});

module('UI elements');
test('CheckList UI elements', function() {
    var flt = id(tf.fltIds[3]);
    notEqual(flt, null, 'CheckList UL element');
    deepEqual(flt.firstChild.nodeName, 'LI', 'First CheckList option element name');
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

test('TableFilter removed', function() {
    tf.destroy();
    deepEqual(id(tf.fltIds[3]), null, 'CheckList UL element');
});
