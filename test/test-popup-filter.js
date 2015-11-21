
var id = function (id){ return document.getElementById(id); };

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_2: 'multiple',
    col_3: 'select',
    col_4: 'none',
    popup_filters: true
});
tf.init();

var popupFilter = tf.feature('popupFilter');
module('Sanity checks');
test('Pop-up filter component', function() {
    notEqual(popupFilter, null, 'PopupFilter instanciated');
    deepEqual(popupFilter.popUpFltElms instanceof Array,
        true, 'Type of popUpFltElms property');
});

module('UI elements');
test('Pop-up filter UI elements', function() {
    var flt1 = id(tf.fltIds[3]);
    var flt2 = id(tf.fltIds[2]);
    var fltIcn1 = popupFilter.popUpFltImgs[3];
    var fltIcn2 = popupFilter.popUpFltImgs[2];
    var fltIcn3 = popupFilter.popUpFltImgs[4];

    notEqual(flt1, null, 'Filter element exists');
    notEqual(flt2, null, 'Filter element exists');
    deepEqual(flt2.hasAttribute('multiple'), true, 'Multiple select exists');
    deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn2.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn3, undefined, 'Filter icon does not exist for column 4');
});

test('TableFilter removed', function() {
    tf.destroy();
    var fltIcn1 = popupFilter.popUpFltImgs[3];
    deepEqual(fltIcn1, undefined, 'Filter icon is removed');
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
});

test('TableFilter re-initialised', function() {
    tf.init();
    var fltIcn1 = popupFilter.popUpFltImgs[3];
    deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(id(tf.fltIds[3]).nodeName, 'SELECT', 'Filter exists');
});

module('Grid-layout');
test('Re-instantiated with grid-layout', function() {
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_2: 'multiple',
        col_3: 'select',
        col_4: 'none',
        popup_filters: true,
        grid_layout: true
    });
    tf.init();

    notEqual(popupFilter, null, 'PopupFilter instanciated');
    deepEqual(popupFilter.popUpFltElms instanceof Array,
        true, 'Type of popUpFltElms property');
});

test('Pop-up filter UI elements with grid-layout', function() {
    var popupFilter = tf.feature('popupFilter');
    var flt1 = id(tf.fltIds[3]);
    var flt2 = id(tf.fltIds[2]);
    var fltIcn1 = popupFilter.popUpFltImgs[3];
    var fltIcn2 = popupFilter.popUpFltImgs[2];
    var fltIcn3 = popupFilter.popUpFltImgs[4];

    notEqual(flt1, null, 'Filter element exists');
    notEqual(flt2, null, 'Filter element exists');
    deepEqual(flt2.hasAttribute('multiple'), true, 'Multiple select exists');
    deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn2.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn3, undefined, 'Filter icon does not exist for column 4');
});

module('Feature interface');
test('Properties', function() {
    var popupFilter = tf.feature('popupFilter');

    deepEqual(popupFilter.tf instanceof TableFilter,
        true, 'TableFilter instance');
    deepEqual(popupFilter.feature, 'popupFilters', 'Feature name');
    deepEqual(popupFilter.enabled, true, 'Feature enabled');
    deepEqual(popupFilter.initialized, true, 'Feature enabled');
    deepEqual(typeof popupFilter.config, 'object', 'TF configuration object');
    deepEqual(typeof popupFilter.init, 'function', 'Feature init method');
    deepEqual(typeof popupFilter.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof popupFilter.reset, 'function', 'Feature reset method');
    deepEqual(typeof popupFilter.enable, 'function', 'Feature enable method');
    deepEqual(typeof popupFilter.disable, 'function', 'Feature enable method');
    deepEqual(typeof popupFilter.isEnabled,
        'function', 'Feature enable method');
});

module('Tear-down');
test('TableFilter removed', function() {
    tf.destroy();
    var fltIcn1 = popupFilter.popUpFltImgs[3];
    deepEqual(fltIcn1, undefined, 'Filter icon is removed');
    deepEqual(id(tf.fltIds[3]), null, 'Filter is removed');
    deepEqual(tf.hasGrid(), false, 'Filters removed');
});
