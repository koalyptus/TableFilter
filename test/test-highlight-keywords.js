requirejs(['test-config', '../src/tablefilter'], function(config, TableFilter){

    QUnit.start();

    var dom = require('dom').Dom,
        Highlight = require('modules/highlightKeywords').HighlightKeyword;

    var tf = new TableFilter('demo', {
        highlight_keywords: true
    });
    tf.init();

    var highlightKeyword = tf.Cpt.highlightKeyword;
    module('Sanity checks');
    test('HighlightKeyword component', function() {
        deepEqual(highlightKeyword instanceof Highlight, true, 'Instance of expected class type');
        notEqual(highlightKeyword, null, 'Instanciated');
        deepEqual(highlightKeyword.highlightedNodes instanceof Array, true, 'Property check');
    });

    test('Highlighted keywords', function() {
        tf.setFilterValue(1, 'Perth');
        tf.setFilterValue(3, '3.1');
        tf._filter();
        deepEqual(highlightKeyword.highlightedNodes.length, 2, 'Number of highlighted words');

        tf._clearFilters();
        tf._filter();
        deepEqual(highlightKeyword.highlightedNodes.length, 0, 'Number of highlighted words');
    });
});