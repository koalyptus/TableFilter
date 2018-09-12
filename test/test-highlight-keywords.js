
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    highlight_keywords: true
});
tf.init();

var highlightKeyword = tf.feature('highlightKeyword');
module('Sanity checks');
test('HighlightKeyword component', function() {
    deepEqual(typeof highlightKeyword, 'object', 'Instanciated');
    deepEqual(highlightKeyword.highlightCssClass, 'keyword', 'Css class check');
});

module('Behaviour');
test('Highlighted keywords', function() {
    tf.setFilterValue(1, 'Perth');
    tf.setFilterValue(3, '3.1');
    tf.filter();
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 2,
        'Number of applied CSS classes');

    tf.clearFilters();
    // issue 155
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 0,
        'Number of applied CSS classes');
});

// issue 309
test('Match same term with increasing number of chars', function() {
    tf.setFilterValue(1, 'Pe');
    tf.filter();
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 1,
        'Search term matched');

    tf.setFilterValue(1, 'Per');
    tf.filter();
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 1,
        'Search term matched');

    tf.setFilterValue(1, 'Pert');
    tf.filter();
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 1,
        'Search term matched');
});

// issue 628
test('unhighlight with term', function() {
    // setup
    tf.clearFilters();
    tf.setFilterValue(0, 'Sydney');
    tf.filter();

    // act
    highlightKeyword.unhighlight('Sydney', highlightKeyword.highlightCssClass);

    // assert
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 0,
        'term unhighlighted');
});
test('unhighlight with null term', function() {
    // setup
    tf.clearFilters();
    tf.setFilterValue(0, 'Sydney');
    tf.setFilterValue(1, 'Canbe');
    tf.filter();

    // act
    highlightKeyword.unhighlight(null, highlightKeyword.highlightCssClass);

    // assert
    deepEqual(tf.dom().querySelectorAll('.keyword').length, 0,
        'all terms unhighlighted');
});

module('Reset feature');
test('can destroy and init TableFilter', function() {
    tf.destroy();
    tf.init();
    deepEqual(typeof highlightKeyword, 'object', 'Instanciated');
    deepEqual(highlightKeyword.highlightCssClass, 'keyword', 'Css class check');
});

module('Tear-down');
test('can destroy TableFilter DOM elements and clean highlighted words',
    function() {
        tf.setFilterValue(1, 'Perth');
        tf.filter();
        tf.destroy();
        deepEqual(tf.isInitialized(), false, 'Filters removed');
        deepEqual(tf.dom().querySelectorAll('.keyword').length, 0,
            'Number of applied CSS classes');
    }
);
