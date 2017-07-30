
var id = function (id){ return document.getElementById(id); };

var _tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_0: 'none',
    col_1: 'none',
    col_2: 'none',
    col_3: 'checklist',
    col_4: 'checklist',
    col_5: 'checklist',
    col_6: 'checklist',
    headers_row_index: 1,
    popup_filters: true,
    mark_active_columns: true
}, 2);
_tf.init();

var popupFilter = _tf.feature('popupFilter');
module('Sanity checks');
test('Pop-up filter component', function() {
    notEqual(popupFilter, null, 'PopupFilter instanciated');
    deepEqual(popupFilter.fltElms instanceof Array,
        true, 'Type of fltElms property');
    deepEqual(
        popupFilter.adjustToContainer,
        true,
        'Popup filter width adjusts to container'
    );
    deepEqual(_tf.headersRow, 2, 'Headers row index');
});

module('UI elements');
test('Pop-up filter UI elements', function() {
    var flt3 = popupFilter.fltElms[3];
    var flt4 = popupFilter.fltElms[4];
    var fltIcn3 = popupFilter.fltIcons[3];
    var fltIcn4 = popupFilter.fltIcons[4];
    var fltIcn0 = popupFilter.fltIcons[0];
    var fltIcn1 = popupFilter.fltIcons[0];

    notEqual(flt3, null, 'Filter element exists');
    notEqual(flt4, null, 'Filter element exists');
    deepEqual(fltIcn3.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn4.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn0, undefined, 'Filter icon does not exist for column 0');
    deepEqual(fltIcn1, undefined, 'Filter icon does not exist for column 1');
});

test('Pop-up filter state after filtering', function(){
    var fltIcn4 = popupFilter.fltIcons[4];
    _tf.setFilterValue(4, 'Filter Value 4');
    _tf.filter();

    deepEqual(fltIcn4.src.indexOf('icn_filterActive') !== -1,
        true, 'Icon state');
});

test('Pop-up filter state after clearing', function(){
    var fltIcn3 = popupFilter.fltIcons[3];
    var fltIcn4 = popupFilter.fltIcons[4];
    var fltIcn5 = popupFilter.fltIcons[5];
    var fltIcn6 = popupFilter.fltIcons[6];
    _tf.clearFilters();

    deepEqual(fltIcn3.src.indexOf('icn_filterActive') === -1,
        true, 'Icon state');
    deepEqual(fltIcn4.src.indexOf('icn_filterActive') === -1,
        true, 'Icon state');
    deepEqual(fltIcn5.src.indexOf('icn_filterActive') === -1,
        true, 'Icon state');
    deepEqual(fltIcn6.src.indexOf('icn_filterActive') === -1,
        true, 'Icon state');
});

test('Can open pop-up filter', function(){
    // act
    popupFilter.open(5);

    // assert
    deepEqual(popupFilter.isOpen(5), true,
        'Popup filter is open');
});

test('Can close pop-up filter', function(){
    // act
    popupFilter.close(5);

    // assert
    deepEqual(popupFilter.isOpen(5), false,
        'Popup filter is open');
});

test('Can toggle pop-up filter (initially closed)', function(){
    // setup
    popupFilter.close(6);

    // act
    popupFilter.toggle(6);

    // assert
    deepEqual(popupFilter.isOpen(6), true,
        'Popup filter is toggled');
});

test('Can toggle pop-up filter (initially opened)', function(){
    // setup
    popupFilter.open(6);

    // act
    popupFilter.toggle(6);

    // assert
    deepEqual(popupFilter.isOpen(6), false,
        'Popup filter is toggled');
});

test('Checklist pop-up filter remains open upon filtering', function(){
    // setup
    popupFilter.open(4);

    // act
    _tf.setFilterValue(4, ['Filter Value 4']);
    _tf.filter();

    // assert
    deepEqual(
        popupFilter.isOpen(4),
        true,
        'Checklist pop-up filter still open after filtering'
    );
});

test('Pop-up filter auto-closes when user clicks away', function() {
    // setup
    popupFilter.open(5);

    // act
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent('mouseup', true, true);
    _tf.dom().rows[4].cells[2].dispatchEvent(evObj);

    // assert
    deepEqual(popupFilter.isOpen(5), false,
        'Pop-up filter closed after user clicks away'
    );
});

test('Can close all popup filters', function() {
    // setup
    popupFilter.open(3);

    // act
    popupFilter.closeAll(4);

    // assert
    deepEqual(popupFilter.isOpen(3), false,
        'Pop-up filter closed after closeAll'
    );
});

test('Does not close popup filter if closeOnFiltering false', function() {
    // setup
    popupFilter.closeOnFiltering = false;
    popupFilter.open(4);

    // act
    popupFilter.close(4);

    // assert
    deepEqual(popupFilter.isOpen(4), false,
        'Pop-up filter closed after closeAll'
    );
});

// TODO: fix reset popupFilter component with grouped headers
// test('Can destroy and reset', function(){
//     // setup
//     _tf.clearFilters();
//     _tf.filter();
//     popupFilter.destroy();

//     // act
//     popupFilter.reset();

//     // assert
//     deepEqual(popupFilter.fltElms.length, 7, 'Filters are generated');
//     deepEqual(popupFilter.fltIcons.length, 4, 'Icons are generated');
//     deepEqual(popupFilter.fltSpans.length, 4,
//            'Icon containers are generated');
// });

test('TableFilter removed', function() {
    _tf.destroy();
    var fltIcn1 = popupFilter.fltIcons[3];
    deepEqual(fltIcn1, undefined, 'Filter icon is removed');
    deepEqual(id(_tf.fltIds[3]), null, 'Filter is removed');
});

// test('TableFilter re-initialised', function() {
//     _tf.init();
//     var fltIcn1 = popupFilter.fltIcons[3];
//     deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
//     deepEqual(_tf.getFilterType(3), 'checklist', 'Filter type');
// });

