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

    test('Filters DOM elements', function() {
        deepEqual(tf.getFilterElement(1).nodeName, 'INPUT',
            'Filter\'s DOM element');
        deepEqual(tf.getHeaderElement(2).nodeName, 'TH',
            'Header\'s DOM element');
    });

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
            tf.getFilteredData(true),
            [
                [1, ['From','Destination','Road Distance (km)',
                    'By Air (hrs)','By Rail (hrs)']],
                [6, ['Adelaide','Perth','2781','3.1','38']],
                [7, ['Adelaide','Alice Springs','1533','2','20.25']],
                [8, ['Adelaide','Brisbane','2045','2.15','40']]
            ],
            'Get filtered table data including columns headers'
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
        tf = null;
    });

    module('TableFilter instance with different filter types');
    test('Test filter types', function() {
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            col_0: 'select',
            col_1: 'multiple',
            col_2: 'checklist'
        });
        tf.init();

        deepEqual(tf.getFilterType(0), 'select', 'Colmun 0 filter type');
        deepEqual(tf.getFilterType(1), 'multiple', 'Colmun 1 filter type');
        deepEqual(tf.getFilterType(2), 'checklist', 'Colmun 2 filter type');
        deepEqual(tf.getFilterType(3), 'input', 'Colmun 3 filter type');
        deepEqual(tf.getFiltersByType('select'), ['flt0_demo'],
            'Get select filter(s)');
        deepEqual(tf.getFiltersByType('multiple'), ['flt1_demo'],
            'Get multiple filter(s)');
        deepEqual(tf.getFiltersByType('checklist'), ['flt2_demo'],
            'Get checklist filter(s)');
        deepEqual(tf.getFiltersByType('input'), ['flt3_demo','flt4_demo'],
            'Get input filter(s)');
    });

    test('Get filters values', function() {
        tf.setFilterValue(0, 'Sydney');
        tf.setFilterValue(1, 'Adelaide');
        deepEqual(tf.getFilterValue(0), 'Sydney', 'Column 0 filter value');
        deepEqual(tf.getFiltersValue(), ['sydney', 'adelaide', '', '', '']);
    });

    test('Filter table', function() {
        tf.clearFilters();
        tf.setFilterValue(1, 'Adelaide');
        tf.filter();
        deepEqual(tf.getValidRows().length, 1, 'Filtered rows number');
    });

    module('TableFilter with pop-up filtes');
    test('Sanity checks', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            popup_filters: true
        });
        tf.init();

        deepEqual(tf.getFiltersRowIndex(), 0, 'Filters row index');
        deepEqual(tf.getHeadersRowIndex(), 1, 'Headers row index');
        deepEqual(tf.getFilterElement(1).nodeName, 'INPUT',
            'Filter\'s DOM element');
        deepEqual(tf.getHeaderElement(2).nodeName, 'TH',
            'Header\'s DOM element');
    });

    test('Get filters values', function() {
        tf.setFilterValue(0, 'Sydney');
        tf.setFilterValue(1, 'Adelaide');
        deepEqual(tf.getFilterValue(0), 'Sydney', 'Column 0 filter value');
        deepEqual(tf.getFiltersValue(), ['sydney', 'adelaide', '', '', '']);
    });

    test('Filter table', function() {
        tf.clearFilters();
        tf.setFilterValue(1, 'Adelaide');
        tf.filter();
        deepEqual(tf.getValidRows().length, 1, 'Filtered rows number');
    });

    module('TableFilter with grid-layout');
    test('Sanity checks', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            grid_layout: true,
            col_0: 'select',
            col_1: 'multiple',
            col_2: 'checklist'
        });
        tf.init();

        deepEqual(tf.getFilterType(0), 'select', 'Colmun 0 filter type');
        deepEqual(tf.getFilterType(1), 'multiple', 'Colmun 1 filter type');
        deepEqual(tf.getFilterType(2), 'checklist', 'Colmun 2 filter type');
        deepEqual(tf.getFilterType(3), 'input', 'Colmun 3 filter type');
        deepEqual(tf.getFiltersByType('select'), ['flt0_demo'],
            'Get select filter(s)');
        deepEqual(tf.getFiltersByType('multiple'), ['flt1_demo'],
            'Get multiple filter(s)');
        deepEqual(tf.getFiltersByType('checklist'), ['flt2_demo'],
            'Get checklist filter(s)');
        deepEqual(tf.getFiltersByType('input'), ['flt3_demo','flt4_demo'],
            'Get input filter(s)');

        deepEqual(tf.getFiltersRowIndex(), 1, 'Filters row index');
        deepEqual(tf.getHeadersRowIndex(), 0, 'Headers row index');
        deepEqual(tf.getFilterElement(1).nodeName, 'SELECT',
            'Filter\'s DOM element');
        deepEqual(tf.getHeaderElement(2).nodeName, 'TH',
            'Header\'s DOM element');
    });

    test('Get filters values', function() {
        tf.setFilterValue(0, 'Sydney');
        tf.setFilterValue(1, 'Adelaide');
        deepEqual(tf.getFilterValue(0), 'Sydney', 'Column 0 filter value');
        deepEqual(tf.getFiltersValue(), ['sydney', 'adelaide', '', '', '']);
    });

    test('Filter table', function() {
        tf.clearFilters();
        tf.setFilterValue(1, 'Adelaide');
        tf.filter();
        deepEqual(tf.getValidRows().length, 1, 'Filtered rows number');
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
        // deepEqual(
        //     tf.getTableData(),
        //     [
        //         [0, ['Sydney','Adelaide','1412','1.4','25.3']],
        //         [1, ['Sydney','Brisbane','982','1.5','16']],
        //         [2, ['Sydney','Canberra','286','.6','4.3']],
        //         [3, ['Sydney','Melbourne','872','1.1','10.5']],
        //         [4, ['Adelaide','Perth','2781','3.1','38']],
        //         [5, ['Adelaide','Alice Springs','1533','2','20.25']],
        //         [6, ['Adelaide','Brisbane','2045','2.15','40']]
        //     ],
        //     'Get table data'
        // );
        // tf.setFilterValue(0, 'Adelaide');
        // tf.filter();
        // deepEqual(
        //     tf.getFilteredData(),
        //     [
        //         [6, ['Adelaide','Perth','2781','3.1','38']],
        //         [7, ['Adelaide','Alice Springs','1533','2','20.25']],
        //         [8, ['Adelaide','Brisbane','2045','2.15','40']]
        //     ],
        //     'Get filtered table data'
        // );
        // deepEqual(
        //     tf.getFilteredData(true),
        //     [
        //         [1, ['From','Destination','Road Distance (km)',
        //             'By Air (hrs)','By Rail (hrs)']],
        //         [6, ['Adelaide','Perth','2781','3.1','38']],
        //         [7, ['Adelaide','Alice Springs','1533','2','20.25']],
        //         [8, ['Adelaide','Brisbane','2045','2.15','40']]
        //     ],
        //     'Get filtered table data including columns headers'
        // );
        // deepEqual(
        //     tf.getFilteredDataCol(0),
        //     ['Adelaide','Adelaide','Adelaide'],
        //     'Get specified column filtered values'
        // );
        // tf.clearFilters();
        // tf.filter();
    });

    test('Destroy', function() {
        tf.destroy();
        deepEqual(tf.hasGrid(), false, 'Filters removed');
        tf = null;
    });

})(window, TableFilter);
