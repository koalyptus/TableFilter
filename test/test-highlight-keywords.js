requirejs(['test-config', '../src/core'], function(config, TableFilter){

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
        tf.SetFilterValue(1, 'Perth');
        tf.SetFilterValue(3, '3.1');
        tf._Filter();
        deepEqual(highlightKeyword.highlightedNodes.length, 2, 'Number of highlighted words');

        tf._ClearFilters();
        tf._Filter();
        deepEqual(highlightKeyword.highlightedNodes.length, 0, 'Number of highlighted words');
    });
});