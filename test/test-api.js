(function(win, TableFilter) {

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/'
    });
    tf.init();

    module('Sanity checks');
    test('TableFilter object', function() {
        deepEqual(tf.id, 'demo', 'id check');
        deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
        deepEqual(tf.getHeadersRowIndex(), 1, 'Headers row index');
        deepEqual(tf.getCellsNb(), 5, 'cells collection length');
        deepEqual(tf.getRowsNb(), 7, 'rows collection length');
        deepEqual(tf.getFilterableRowsNb(), 7, 'number of filterable rows');
        deepEqual(tf.getFilterId(0), 'flt0_demo', 'filter DOM element id');
        deepEqual(tf.getStartRowIndex(), 2, 'Start of filterable rows');
        deepEqual(tf.getLastRowIndex(), 8, 'Last row index');
    });

    module('Public methods');
    test('Get filters values', function() {
        equal(tf.getFilterValue(0), '', 'Column 0 filter value');
        tf.setFilterValue(0, 'Syd');
        tf.setFilterValue(1, 'Ade');
        deepEqual(tf.getFilterValue(0), 'Syd', 'Column 0 filter value');
        deepEqual(tf.getFiltersValue(), ['syd', 'ade', '', '', '']);

    });

    test('Filter table', function() {
        tf.clearFilters();
        deepEqual(tf.getFilterValue(0), '',
            'Column 0 filter value after clearing filters');
        tf.setFilterValue(0, 'Syd');
        tf.filter();
        deepEqual(tf.getValidRows().length, 4, 'Filtered rows number');
    });

    test('Clear filters', function() {
        tf.clearFilters();
        deepEqual(tf.nbVisibleRows, 7, 'Filtered rows number');
        deepEqual(tf.getFiltersValue(), ['', '', '', '', '']);
    });

    test('Get table data', function() {
        deepEqual(tf.getColValues(0),
            [
                'sydney','sydney','sydney',
                'sydney','adelaide','adelaide','adelaide'
            ],
            'Get specified column values'
        );
        deepEqual(
            tf.getTableData(),
            [
                [2, ['Sydney','Adelaide','1412','1.4','25.3']],
                [3, ['Sydney','Brisbane','982','1.5','16']],
                [4, ['Sydney','Canberra','286','.6','4.3']],
                [5, ['Sydney','Melbourne','872','1.1','10.5']],
                [6, ['Adelaide','Perth','2781','3.1','38']],
                [7, ['Adelaide','Alice Springs','1533','2','20.25']],
                [8, ['Adelaide','Brisbane','2045','2.15','40']]
            ],
            'Get table data'
        );
        tf.setFilterValue(0, 'Adelaide');
        tf.filter();
        deepEqual(
            tf.getFilteredData(),
            [
                [6, ['Adelaide','Perth','2781','3.1','38']],
                [7, ['Adelaide','Alice Springs','1533','2','20.25']],
                [8, ['Adelaide','Brisbane','2045','2.15','40']]
            ],
            'Get filtered table data'
        );
        deepEqual(
            tf.getFilteredDataCol(0),
            ['Adelaide','Adelaide','Adelaide'],
            'Get specified column filtered values'
        );
        tf.clearFilters();
        tf.filter();
    });

    test('Destroy', function() {
        tf.destroy();
        deepEqual(tf.hasGrid(), false, 'Filters removed');
    });

})(window, TableFilter);
