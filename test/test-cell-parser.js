(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        col_0: 'select',
        cell_parser: {
            cols: [0],
            parse: function(tf, cell) {
                var chk = cell.getElementsByTagName('input')[0];
                if (chk.checked) {
                    return 'yes';
                } else {
                    return 'no';
                }
            }
        }
    });
    tf.init();

    module('Sanity checks');
    test('Sanity checks', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        deepEqual(tf.cellParser.cols.length, 1,
            'Columns implementing cell parser');
        deepEqual(typeof tf.cellParser.parse, 'function', 'Parse function');
        deepEqual(
            tf.getFilterElement(0).nodeName, 'SELECT', 'Expected filter type');
    });

    module('Behaviour');
    test('Can filter with parsed value', function() {
        // setup
        tf.setFilterValue(0, 'yes');

        // act
        tf.filter();

        // assert
        deepEqual(tf.getValidRows(), [2, 4, 5, 7], 'Number of parsed values');
    });

    test('Can parse with custom function', function() {
        // setup
        var cell = tf.dom().rows[3].cells[0];

        // act
        var value = tf.getCellValue(cell);

        // assert
        deepEqual(value, 'no', 'Value returned by custom cell parser');
    });

    test('Should not parse with custom function if no columns defined',
        function() {
            // setup
            var initialCellParser = tf.cellParser;
            var hit = 0;
            var cell = tf.dom().rows[3].cells[0];

            tf.cellParser.cols = [];
            tf.cellParser.parse = function() {
                hit++;
            };

            // act
            tf.getCellValue(cell);

            // assert
            deepEqual(hit, 0, 'Cell parser not invoked');

            tf.cellParser = initialCellParser;
        }
    );

    module('Tear-down');
    test('can destroy', function() {
        tf.destroy();
        deepEqual(tf.isInitialized(), false, 'Filters removed');
    });
})(window, TableFilter);
