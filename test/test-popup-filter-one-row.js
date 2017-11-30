
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    popup_filters: true
});
tf.init();

var popupFilter = tf.feature('popupFilter');
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
    deepEqual(tf.headersRow, 1, 'Headers row index');
    // issue 99: getHeadersText for pick-list filter types
    deepEqual(
        tf.getHeadersText()[2],
        'Road Distance (km)',
        'Expected header text for multiple filter type'
    );
    deepEqual(
        tf.getHeadersText()[3],
        'By Air (hrs)',
        'Expected header text for multiple filter type'
    );
    deepEqual(tf.dom().rows[tf.headersRow-1].style.display, 'none',
        'Extra row hidden');
});

module('UI elements');
test('Pop-up filter UI elements', function() {
    var flt1 = tf.getFilterElement(0);
    var flt2 = tf.getFilterElement(1);
    var fltIcn1 = popupFilter.fltIcons[0];
    var fltIcn2 = popupFilter.fltIcons[1];

    notEqual(flt1, null, 'Filter element exists');
    notEqual(flt2, null, 'Filter element exists');
    deepEqual(fltIcn1.nodeName, 'IMG', 'Filter icon exists');
    deepEqual(fltIcn2.nodeName, 'IMG', 'Filter icon exists');
});

test('Can open pop-up filter', function(){
    // act
    popupFilter.open(1);

    // assert
    deepEqual(popupFilter.fltElms[1].style.display, 'block',
        'Popup filter is open');
});

test('Can close pop-up filter', function(){
    // act
    popupFilter.close(1);

    // assert
    deepEqual(popupFilter.fltElms[1].style.display, 'none',
        'Popup filter is open');
});

test('Can toggle pop-up filter (initially closed)', function(){
    // setup
    popupFilter.close(2);

    // act
    popupFilter.toggle(2);

    // assert
    deepEqual(popupFilter.fltElms[2].style.display, 'block',
        'Popup filter is toggled');
});

test('Can toggle pop-up filter (initially opened)', function(){
    // setup
    popupFilter.open(2);

    // act
    popupFilter.toggle(2);

    // assert
    deepEqual(popupFilter.fltElms[2].style.display, 'none',
        'Popup filter is toggled');
});

test('Pop-up filter closes upon filtering', function(){
    // setup
    popupFilter.open(1);

    // act
    tf.setFilterValue(1, 'Adelaide');
    tf.filter();

    // assert
    deepEqual(popupFilter.isOpen(1), false,
        'Pop-up filter closed after filtering'
    );
});

test('Pop-up filter auto-closes when user clicks away', function() {
    // setup
    popupFilter.open(0);

    // act
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent('mouseup', true, true);
    tf.dom().rows[0].cells[2].dispatchEvent(evObj);

    // assert
    deepEqual(popupFilter.isOpen(0), false,
        'Pop-up filter closed after user clicks away'
    );
});

test('Can close all popup filters', function() {
    // setup
    popupFilter.open(0);

    // act
    popupFilter.closeAll();

    // assert
    deepEqual(popupFilter.isOpen(0), false,
        'Pop-up filter closed after closeAll'
    );
});

module('Tear-down');
test('TableFilter removed', function() {
    tf.destroy();
    var fltIcn1 = popupFilter.fltIcons[3];
    deepEqual(fltIcn1, undefined, 'Filter icon is removed');
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
