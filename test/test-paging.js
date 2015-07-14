
var id = function (id){ return document.getElementById(id); };

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    paging: true,
    paging_length: 2,
    results_per_page: ['Results per page ', [2,4,6]]
});
tf.init();

var paging = tf.feature('paging');
module('Sanity checks');
test('Paging component', function() {
    notEqual(paging, null, 'Paging instanciated');
    deepEqual(paging.pagingLength, 2, 'Paging length');
    deepEqual(paging.nbPages, 4, 'Number of pages');
});

module('UI elements');
test('Paging UI elements', function() {
    notEqual(paging.pagingSlc, null, 'Paging drop-down element');
    notEqual(paging.resultsPerPageSlc, null,
        'Number of results per page drop-down element');
    notEqual(id(paging.prfxBtnNextSpan+tf.id), null,
        'Next button container element');
    notEqual(id(paging.prfxBtnPrevSpan+tf.id), null,
        'Previous button container element');
    notEqual(id(paging.prfxBtnLastSpan+tf.id), null,
        'Last button container element');
    notEqual(id(paging.prfxBtnFirstSpan+tf.id), null,
        'First button container element');
});

test('Destroy Paging component', function() {
    paging.destroy();
    deepEqual(paging.pagingSlc, null, 'Paging drop-down element');
    deepEqual(paging.resultsPerPageSlc, null, 'Paging drop-down element');
    deepEqual(id(paging.prfxBtnNextSpan+tf.id), null,
        'Next button container element');
    deepEqual(id(paging.prfxBtnPrevSpan+tf.id), null,
        'Previous button container element');
    deepEqual(id(paging.prfxBtnLastSpan+tf.id), null,
        'Last button container element');
    deepEqual(id(paging.prfxBtnFirstSpan+tf.id), null,
        'First button container element');
    deepEqual(paging.nbPages, 0, 'Number of pages');
});

test('Reset Paging component', function() {
    paging.reset();
    paging.setPage(2);
    notEqual(paging.pagingSlc, null, 'Paging drop-down element');
});

module('Behaviour');
test('Set page', function() {
    paging.setPage(1);
    deepEqual(paging.getPage(), 1, 'Expected page number');
    paging.setPage(3);
    deepEqual(paging.getPage(), 3, 'Expected page number');
    deepEqual(paging.pagingSlc.selectedIndex, 2,
        'Expected page number in paging drop-down selector');
});


test('Set page via drop-down page selector', function() {
    paging.pagingSlc.selectedIndex = 2;
    deepEqual(paging.getPage(), 3, 'Expected page number');
});

test('Filter from non starting page', function() {
    tf.setFilterValue(1, 'Melbourne');
    tf.filter();
    deepEqual(tf.validRowsIndex.length,
        1, 'Expected valid rows after page change');
    deepEqual(tf.nbVisibleRows,
        1, 'Expected visible rows after page change');
});

test('Set results per page', function() {
    tf.clearFilters();
    paging.resultsPerPageSlc.options[1].selected = true;
    paging.changeResultsPerPage();
    deepEqual(paging.pagingLength, 4, 'Expected page length');
    deepEqual(paging.nbPages, 2, 'Expected number of pages');
    paging.resultsPerPageSlc.options[2].selected = true;
    paging.changeResultsPerPage();
    deepEqual(paging.pagingLength, 6, 'Expected page length');
    deepEqual(paging.nbPages, 2, 'Expected number of pages');
});

module('Grid layout');
test('Grid layout with paging', function() {
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        grid_layout: true,
        paging: true,
        paging_length: 2,
        results_per_page: ['Results per page ', [2,4,6]]
    });
    tf.init();

    paging = tf.feature('paging');

    notEqual(paging.pagingSlc, null, 'Paging drop-down element');
    notEqual(paging.resultsPerPageSlc, null,
        'Number of results per page drop-down element');
    notEqual(id(paging.prfxBtnNextSpan+tf.id), null,
        'Next button container element');
    notEqual(id(paging.prfxBtnPrevSpan+tf.id), null,
        'Previous button container element');
    notEqual(id(paging.prfxBtnLastSpan+tf.id), null,
        'Last button container element');
    notEqual(id(paging.prfxBtnFirstSpan+tf.id), null,
        'First button container element');
});

module('Behaviour');
test('Set page', function() {
    paging.setPage(1);
    deepEqual(paging.getPage(), 1, 'Expected page number');
    paging.setPage(3);
    deepEqual(paging.getPage(), 3, 'Expected page number');
});

test('Filter from non starting page', function() {
    tf.setFilterValue(1, 'Perth');
    tf.filter();
    deepEqual(tf.validRowsIndex.length,
        1, 'Expected valid rows after page change');
    deepEqual(tf.nbVisibleRows,
        1, 'Expected visible rows after page change');
});

test('Set results per page', function() {
    paging.resultsPerPageSlc.options[1].selected = true;
    paging.changeResultsPerPage();
    deepEqual(paging.pagingLength, 4, 'Expected page length');
    deepEqual(paging.nbPages, 2, 'Expected number of pages');
    paging.resultsPerPageSlc.options[2].selected = true;
    paging.changeResultsPerPage();
    deepEqual(paging.pagingLength, 6, 'Expected page length');
    deepEqual(paging.nbPages, 2, 'Expected number of pages');

    tf.destroy();
});
