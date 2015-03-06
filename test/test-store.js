requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var Store = require('modules/store').Store;
    var Cookie = require('cookie').Cookie;

    var tf = new TableFilter('demo', {
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
        deepEqual(tf.Cpt.store instanceof Store, true, 'Store type');
        notEqual(tf.Cpt.store, null, 'Store instanciated');
        deepEqual(tf.Cpt.store.duration, 100000, 'Store duration');
    });

    module('Check page number persistence');
    test('Page number value', function() {
        tf._clearFilters();
        tf._filter();
        tf.Cpt.paging._changePage(1);
        var cookieName = tf.pgNbCookie;
        deepEqual(tf.Cpt.store.getPageNb(cookieName), '2', 'Page number value');
        tf._clearFilters();
        tf._filter();
    });

    module('Check page length persistence');
    test('Page length value', function() {
        var paging = tf.Cpt.paging;
        paging.resultsPerPageSlc.options[2].selected = true;
        paging._changeResultsPerPage();
        var cookieName = tf.pgLenCookie;
        deepEqual(tf.Cpt.store.getPageLength(cookieName), '2', 'Page length value');
        tf._clearFilters();
        tf._filter();
    });

    module('Check filters persistence');
    test('Filters value', function() {
        tf.setFilterValue(0, 'Sydney');
        tf.setFilterValue(3, '1.5');
        tf._filter();
        var cookieName = tf.fltsValuesCookie;
        deepEqual(tf.Cpt.store.getFilterValues(cookieName)[0], 'Sydney', 'Filter 0 value');
        deepEqual(tf.Cpt.store.getFilterValues(cookieName)[3], '1.5', 'Filter 3 value');
        tf._clearFilters();
        tf._filter();
    });

});
