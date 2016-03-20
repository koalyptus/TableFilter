
function removeCookie(name){
    var expire = '';
    var hours = -1;
    if(hours){
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = '; expires=' + expire.toGMTString();
    }
    document.cookie = name + '=' + expire;
}

function readCookie(name){
    var cookieValue = '',
        search = name + '=';
    if(document.cookie.length > 0){
        var cookie = document.cookie,
            offset = cookie.indexOf(search);
        if(offset !== -1){
            offset += search.length;
            var end = cookie.indexOf(';', offset);
            if(end === -1){
                end = cookie.length;
            }
            cookieValue = unescape(cookie.substring(offset, end));
        }
    }
    return cookieValue;
}

var tf = new TableFilter('store', {
    base_path: '../dist/tablefilter/',
    paging: true,
    paging_length: 2,
    results_per_page: ['Results per page', [2, 4, 6]],
    remember_grid_values: true,
    remember_page_number: true,
    remember_page_length: true
});

removeCookie(tf.fltsValuesCookie);
removeCookie(tf.pgNbCookie);
removeCookie(tf.pgLenCookie);

tf.init();
tf.clearFilters();

module('Sanity checks');
test('Store module', function() {
    var store = tf.feature('store');
    deepEqual(tf.hasPersistence, true, 'Requires persistence');
    deepEqual(typeof store, 'object', 'Store type');
    notEqual(store, null, 'Store instanciated');
    deepEqual(store.duration, 100000, 'Store duration');
});

module('Check page number persistence');
test('Page number value', function() {
    tf.clearFilters();
    tf.filter();
    tf.feature('paging').changePage(1);

    deepEqual(tf.feature('store').getPageNb(), '2', 'Page number value');
    tf.clearFilters();
});

module('Check page length persistence');
test('Page length value', function() {
    var paging = tf.feature('paging');
    paging.changeResultsPerPage('2');

    deepEqual(tf.feature('store').getPageLength(), '2', 'Page length value');
    tf.clearFilters();
});

module('Check filters persistence');
test('Filters value in cookie', function() {
    tf.setFilterValue(0, 'Sydney');
    tf.setFilterValue(3, '1.5');
    tf.filter();

    deepEqual(tf.feature('store').getFilterValues()[0],
        'Sydney', 'Filter 0 value');
    deepEqual(tf.feature('store').getFilterValues()[3],
        '1.5', 'Filter 3 value');
});

test('Filters value in cookie', function() {
    tf.setFilterValue(0, 'Sydney');
    tf.setFilterValue(3, '1.5');

    tf.filter();
    deepEqual(tf.feature('store').getFilterValues()[0], 'Sydney',
        'Filter 0 value');
    deepEqual(tf.feature('store').getFilterValues()[3], '1.5',
        'Filter 3 value');
});

test('Filters value with operators in cookie', function() {
    tf.setFilterValue(0, '');
    tf.setFilterValue(1, 'Canberra || Perth');
    tf.setFilterValue(3, '>.6');
    tf.filter();

    deepEqual(tf.feature('store').getFilterValues()[0], ' ', 'Filter 0 value');
    deepEqual(tf.feature('store').getFilterValues()[1],
        'Canberra || Perth', 'Filter 1 value');
    deepEqual(tf.feature('store').getFilterValues()[3], '>.6',
        'Filter 3 value');
    deepEqual(tf.getValidRows().length, 1, 'Expected nb of filtered rows');
});

test('Apply cookie filters value', function() {
    tf.setFilterValue(0, 'Adelaide');
    tf.setFilterValue(3, '>=2');
    tf.filter();
    tf.destroy();
    tf.init();

    deepEqual(tf.getFilterValue(0), 'Adelaide', 'Applied filter value');
    deepEqual(tf.getFilterValue(3), '>=2', 'Applied filter value');
});

test('Can remove cookies on clearFilters', function() {
    tf.clearFilters();

    deepEqual(readCookie(tf.fltsValuesCookie), '',
        'fltsValuesCookie cookie removed');
    deepEqual(readCookie(tf.pgLenCookie), '', 'pgLenCookie cookie removed');
    deepEqual(readCookie(tf.pgNbCookie), '', 'pgNbCookie cookie removed');
});

module('Multiple and checklist filters persistence');
test('Filters value in cookie', function() {
    tf.destroy();
    tf = new TableFilter('store', {
        base_path: '../dist/tablefilter/',
        remember_grid_values: true,
        col_0: 'multiple',
        col_1: 'checklist'
    });
    tf.init();

    tf.setFilterValue(0, ['Sydney', 'Adelaide']);
    tf.setFilterValue(1, ['Alice Springs', 'Brisbane']);
    tf.filter();

    deepEqual(tf.feature('store').getFilterValues()[0],
        'Adelaide || Sydney', 'Filter 0 value');
    deepEqual(tf.feature('store').getFilterValues()[1],
        'Alice Springs || Brisbane', 'Filter 1 value');
    deepEqual(tf.getValidRows().length, 3, 'Expected nb of filtered rows');
});

module('Tear-down');
test('TableFilter removed', function() {
    tf.destroy();
    removeCookie(tf.fltsValuesCookie);
    removeCookie(tf.pgNbCookie);
    removeCookie(tf.pgLenCookie);

    deepEqual(tf.hasGrid(), false, 'Filters removed');
});
