
function removeCookie(name){
    var expire = '';
    var hours = -1;
    if(hours){
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = '; expires=' + expire.toGMTString();
    }
    document.cookie = name + '=' + expire;
}

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    paging: true,
    paging_length: 2,
    results_per_page: ['Results per page', [2,4,6]],
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
    deepEqual(typeof store, 'object', 'Store type');
    notEqual(store, null, 'Store instanciated');
    deepEqual(store.duration, 100000, 'Store duration');
});

module('Check page number persistence');
test('Page number value', function() {
    tf.clearFilters();
    tf.filter();
    tf.feature('paging').changePage(1);
    var cookieName = tf.pgNbCookie;
    deepEqual(tf.feature('store').getPageNb(cookieName), '2', 'Page number value');
    tf.clearFilters();
    tf.filter();
});

module('Check page length persistence');
test('Page length value', function() {
    var paging = tf.feature('paging');
    paging.resultsPerPageSlc.options[2].selected = true;
    paging.changeResultsPerPage();
    var cookieName = tf.pgLenCookie;
    deepEqual(tf.feature('store').getPageLength(cookieName), '2', 'Page length value');
    tf.clearFilters();
    tf.filter();
});

module('Check filters persistence');
test('Filters value in cookie', function() {
    tf.setFilterValue(0, 'Sydney');
    tf.setFilterValue(3, '1.5');
    tf.filter();
    var cookieName = tf.fltsValuesCookie;
    deepEqual(tf.feature('store').getFilterValues(cookieName)[0], 'Sydney', 'Filter 0 value');
    deepEqual(tf.feature('store').getFilterValues(cookieName)[3], '1.5', 'Filter 3 value');
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

module('Tear-down');
test('TableFilter removed', function() {
    tf.destroy();
    removeCookie(tf.fltsValuesCookie);
    removeCookie(tf.pgNbCookie);
    removeCookie(tf.pgLenCookie);

    deepEqual(tf.hasGrid(), false, 'Filters removed');
});