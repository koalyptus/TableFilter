
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    highlight_keywords: true
});
tf.init();

var highlightKeyword = tf.feature('highlightKeyword');
module('Sanity checks');
test('HighlightKeyword component', function() {
    deepEqual(typeof highlightKeyword, 'object', 'Instanciated');
    deepEqual(highlightKeyword.highlightedNodes instanceof Array,
        true, 'Property check');
});

test('Highlighted keywords', function() {
    tf.setFilterValue(1, 'Perth');
    tf.setFilterValue(3, '3.1');
    tf.filter();
    deepEqual(highlightKeyword.highlightedNodes.length,
        2, 'Number of highlighted words');
    deepEqual(tf.tbl.querySelectorAll('.keyword').length, 2,
        'Number of applied CSS classes');

    tf.clearFilters();
    deepEqual(highlightKeyword.highlightedNodes.length,
        0, 'Number of highlighted words');
    // TODO: uncomment when fixed
    // deepEqual(tf.tbl.querySelectorAll('.keyword').length, 0,
    //     'Number of applied CSS classes');
});

module('Reset feature');
test('can destroy and init TableFilter', function() {
    tf.destroy();
    tf.init();
    deepEqual(typeof highlightKeyword, 'object', 'Instanciated');
    deepEqual(highlightKeyword.highlightedNodes instanceof Array,
        true, 'Property check');
});

module('Tear-down');
test('can destroy TableFilter DOM elements and clean highlighted words',
    function() {
        tf.setFilterValue(1, 'Perth');
        tf.filter();
        tf.destroy();
        deepEqual(tf.hasGrid(), false, 'Filters removed');
        deepEqual(highlightKeyword.highlightedNodes.length,
            0, 'Number of highlighted words');
    }
);
