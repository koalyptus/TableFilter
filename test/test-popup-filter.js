
var id = function (id){ return document.getElementById(id); };

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_2: 'multiple',
    col_3: 'select',
    popup_filters: true
});
tf.init();

var popupFilter = tf.Cpt.popupFilter;
module('Sanity checks');
test('Pop-up filter component', function() {
    notEqual(popupFilter, null, 'PopupFilter instanciated');
    deepEqual(popupFilter.popUpFltElms instanceof Array, true, 'Type of popUpFltElms property');
});

module('UI elements');
test('Pop-up filter UI elements', function() {
    var flt1 = id(tf.fltIds[3]);
    var flt2 = id(tf.fltIds[2]);
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
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
});

test('TableFilter re-initialised', function() {
    tf.init();
    var fltIcn1 = tf.Cpt.popupFilter.popUpFltImgs[3];
    deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(id(tf.fltIds[3]).nodeName, 'SELECT', 'Filter exists');
});
