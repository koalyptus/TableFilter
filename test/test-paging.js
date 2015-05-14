
var id = function (id){ return document.getElementById(id); };

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    paging: true,
    paging_length: 2,
    results_per_page: ['Results per page', [2,4,6]]
});
tf.init();

var paging = tf.Cpt.paging;
module('Sanity checks');
test('Paging component', function() {
    notEqual(paging, null, 'Paging instanciated');
    deepEqual(paging.pagingLength, 2, 'Paging length');
    deepEqual(paging.nbPages, 4, 'Number of pages');
});

module('UI elements');
test('Paging UI elements', function() {
    notEqual(paging.pagingSlc, null, 'Paging drop-down element');
    notEqual(paging.resultsPerPageSlc, null, 'Number of results per page drop-down element');
    notEqual(id(paging.prfxBtnNextSpan+tf.id), null, 'Next button container element');
    notEqual(id(paging.prfxBtnPrevSpan+tf.id), null, 'Previous button container element');
    notEqual(id(paging.prfxBtnLastSpan+tf.id), null, 'Last button container element');
    notEqual(id(paging.prfxBtnFirstSpan+tf.id), null, 'First button container element');
});

test('Destroy Paging component', function() {
    paging.destroy();
    deepEqual(paging.pagingSlc, null, 'Paging drop-down element');
    deepEqual(paging.resultsPerPageSlc, null, 'Paging drop-down element');
    deepEqual(id(paging.prfxBtnNextSpan+tf.id), null, 'Next button container element');
    deepEqual(id(paging.prfxBtnPrevSpan+tf.id), null, 'Previous button container element');
    deepEqual(id(paging.prfxBtnLastSpan+tf.id), null, 'Last button container element');
    deepEqual(id(paging.prfxBtnFirstSpan+tf.id), null, 'First button container element');
    deepEqual(paging.nbPages, 0, 'Number of pages');
});
