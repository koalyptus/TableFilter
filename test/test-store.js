
var Cookie = TableFilter.Cookie;

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    paging: true,
    paging_length: 2,
    results_per_page: ['Results per page', [2,4,6]],
    remember_grid_values: true,
    remember_page_number: true,
    remember_page_length: true
});

Cookie.remove(tf.fltsValuesCookie);
Cookie.remove(tf.pgNbCookie);
Cookie.remove(tf.pgLenCookie);

tf.init();
tf._clearFilters();

module('Sanity checks');
test('Store module', function() {
    var store = tf.feature('store');
    deepEqual(typeof store, 'object', 'Store type');
    notEqual(store, null, 'Store instanciated');
    deepEqual(store.duration, 100000, 'Store duration');
});

module('Check page number persistence');
test('Page number value', function() {
    tf._clearFilters();
    tf._filter();
    tf.feature('paging')._changePage(1);
    var cookieName = tf.pgNbCookie;
    deepEqual(tf.feature('store').getPageNb(cookieName), '2', 'Page number value');
    tf._clearFilters();
    tf._filter();
});

module('Check page length persistence');
test('Page length value', function() {
    var paging = tf.feature('paging');
    paging.resultsPerPageSlc.options[2].selected = true;
    paging._changeResultsPerPage();
    var cookieName = tf.pgLenCookie;
    deepEqual(tf.feature('store').getPageLength(cookieName), '2', 'Page length value');
    tf._clearFilters();
    tf._filter();
});

module('Check filters persistence');
test('Filters value', function() {
    tf.setFilterValue(0, 'Sydney');
    tf.setFilterValue(3, '1.5');
    tf._filter();
    var cookieName = tf.fltsValuesCookie;
    deepEqual(tf.feature('store').getFilterValues(cookieName)[0], 'Sydney', 'Filter 0 value');
    deepEqual(tf.feature('store').getFilterValues(cookieName)[3], '1.5', 'Filter 3 value');
    tf._clearFilters();
    tf._filter();
});

