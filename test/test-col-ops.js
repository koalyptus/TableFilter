
var id = function (id){ return document.getElementById(id); };
var labels = [];
var addLabel = function(tag) {
    var label = document.createElement(tag);
    label.id = 'tmp-label-' + labels.length;
    document.body.appendChild(label);
    labels.push(label);
    return label;
};
var removeLabels = function() {
    labels.forEach(function(label) {
        document.body.removeChild(label);
    });
    labels = [];
};
var table = id('demo');
var totRowIndex = table.getElementsByTagName('tr').length;

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_always_visible: [
        totRowIndex-6,
        totRowIndex-5,
        totRowIndex-4,
        totRowIndex-3,
        totRowIndex-2,
        totRowIndex-1,
        totRowIndex,
    ],
    extensions: [{
        name: 'colOps',
        id: [
            'sum1', 'sum2',
            'mean1', 'mean2',
            'min1', 'min2',
            'max1', 'max2',
            'median1', 'median2',
            'q1-1', 'q1-2',
            'q3-1', 'q3-2'
        ],
        col: [
            2, 3,
            2, 3,
            2, 3,
            2, 3,
            2, 3,
            2, 3,
            2, 3
        ],
        operation: [
            'sum', 'sum',
            'mean', 'mean',
            'min', 'min',
            'max', 'max',
            'median', 'median',
            'q1', 'q1',
            'q3', 'q3'
        ],
        write_method: [
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml'
        ],
        exclude_row: [
            totRowIndex-6,
            totRowIndex-5,
            totRowIndex-4,
            totRowIndex-3,
            totRowIndex-2,
            totRowIndex-1,
            totRowIndex
        ],
        decimal_precision: [
            0, 2,
            0, 2,
            0, 2,
            0, 2,
            0, 2,
            0, 2,
            0, 2
        ],
        tot_row_index: [
            totRowIndex-6, totRowIndex-6,
            totRowIndex-5, totRowIndex-5,
            totRowIndex-4, totRowIndex-4,
            totRowIndex-3, totRowIndex-3,
            totRowIndex-2, totRowIndex-2,
            totRowIndex-1, totRowIndex-1,
            totRowIndex, totRowIndex
        ]
    }]
});
tf.init();

module('Sanity checks');
test('Column operations', function() {
    var colOps = tf.extension('colOps');
    deepEqual(typeof colOps, 'object', 'ColOps instanciated');
    equal(id('sum1').innerHTML, 9911, 'Sum result');
    equal(id('sum2').innerHTML, 11.85, 'Sum result');
    equal(id('mean1').innerHTML, 1416, 'Mean result');
    equal(id('mean2').innerHTML, 1.69, 'Mean result');
    equal(id('min1').innerHTML, 286, 'Min result');
    equal(id('min2').innerHTML, 0.60, 'Min result');
    equal(id('max1').innerHTML, 2781, 'Max result');
    equal(id('max2').innerHTML, 3.10, 'Max result');
    equal(id('median1').innerHTML, 1412, 'Median result');
    equal(id('median2').innerHTML, 1.50, 'Median result');
    equal(id('q1-1').innerHTML, 872, 'Q1 result');
    equal(id('q1-2').innerHTML, 1.10, 'Q1 result');
    equal(id('q3-1').innerHTML, 2045, 'Q3 result');
    equal(id('q3-2').innerHTML, 2.15, 'Q3 result');
    tf.clearFilters();
});

module('Behaviour checks');
test('Column operations after filtering', function() {
    tf.setFilterValue(0, 'syd');
    tf.filter();
    equal(id('sum1').innerHTML, 3552, 'Sum result');
    equal(id('sum2').innerHTML, 4.60, 'Sum result');
    equal(id('mean1').innerHTML, 888, 'Mean result');
    equal(id('mean2').innerHTML, 1.15, 'Mean result');
    equal(id('min1').innerHTML, 286, 'Min result');
    equal(id('min2').innerHTML, 0.60, 'Min result');
    equal(id('max1').innerHTML, 1412, 'Max result');
    equal(id('max2').innerHTML, 1.50, 'Max result');
    equal(id('median1').innerHTML, 927, 'Median result');
    equal(id('median2').innerHTML, 1.25, 'Median result');
    equal(id('q1-1').innerHTML, 579, 'Q1 result');
    equal(id('q1-2').innerHTML, 0.85, 'Q1 result');
    equal(id('q3-1').innerHTML, 1197, 'Q3 result');
    equal(id('q3-2').innerHTML, 1.45, 'Q3 result');
    tf.clearFilters();
});

test('Can make column calculations', function() {
    // setup
    var colOps = tf.extension('colOps');

    // act
    var result0 = colOps.columnCalc(2, 'mean', 1);
    var result1 = colOps.columnCalc(2, 'min', 2);
    var result2 = colOps.columnCalc(2, 'max', 0);

    // assert
    deepEqual(result0, 1415.9, 'columnCalc mean');
    deepEqual(result1, 286.00, 'columnCalc min');
    deepEqual(result2, 2781, 'columnCalc max');
});

test('Can make column calculations with formated results', function() {
    // setup
    var colOps = tf.extension('colOps');
    colOps.formatResults[2] = { suffix: ' Km' };
    colOps.formatResults[4] = { suffix: ' Km' };
    colOps.formatResults[6] = { suffix: ' Km' };
    tf.colTypes[2] = { type: 'formatted-number', decimal: '.', thousands: ',' };

    // act
    colOps.calcAll();

    // assert
    deepEqual(id('mean1').innerHTML, '1,416 Km', 'Formatted mean result');
    deepEqual(id('min1').innerHTML, '286 Km', 'Formatted min result');
    deepEqual(id('max1').innerHTML, '2,781 Km', 'Formatted max result');

    colOps.formatResults[2] = undefined;
    colOps.formatResults[4] = undefined;
    colOps.formatResults[6] = undefined;
    tf.colTypes[2] = undefined;
});

test('Can configure result format', function() {
    // setup
    var colOps = tf.extension('colOps');
    var format = { prefix: '$', suffix: '/item' };

    // act
    var format = colOps.configureFormat(2, format);

    // assert
    deepEqual(format.prefix, '$', 'prefix');
    deepEqual(format.suffix, '/item', 'suffix');
    deepEqual(format.decimal, '', 'decimal separator');
    deepEqual(format.integerSeparator, '', 'thousands separator');
});

test('Can configure result format for formatted number column', function() {
    // setup
    var colOps = tf.extension('colOps');
    var format = { prefix: '$', suffix: '/item' };
    tf.colTypes = [null, null, null, null, null];
    tf.colTypes[3] = { type: 'formatted-number', decimal: ',', thousands: '.' };

    // act
    var format = colOps.configureFormat(3, format);

    // assert
    deepEqual(format.prefix, '$', 'prefix');
    deepEqual(format.suffix, '/item', 'suffix');
    deepEqual(format.decimal, ',', 'decimal separator');
    deepEqual(format.integerSeparator, '.', 'thousands separator');
    tf.colTypes[3] = undefined;
});

test('Can format results with default options', function() {
    // setup
    var colOps = tf.extension('colOps');
    var label = addLabel('span');
    var cases = [
        [1234567.891, 2, {}, '1,234,567.89'],
        [-1234567.891, 2, {}, '-1,234,567.89'],
        [0, 2, {}, '0.00'],
        [-0.004, 2, {}, '-0.00'],
        [999.995, 2, {}, '1,000.00'],
        [1234.5, 0, {}, '1,235'],
        [1234.5, 3, {}, '1,234.500'],
        [12, 0, {}, '12']
    ];

    cases.forEach(function(c) {
        // act
        colOps.writeResult(c[0], label.id, 'innerhtml', c[1], c[2]);

        // assert
        equal(label.innerHTML, c[3], 'Result ' + c[0] + ' => ' + c[3]);
    });
    removeLabels();
});

test('Can format results with custom separators', function() {
    // setup
    var colOps = tf.extension('colOps');
    var label = addLabel('span');
    var cases = [
        [1234567.891, { decimal: ',', integerSeparator: '.' }, '1.234.567,89'],
        [1234567.891, { decimal: '', integerSeparator: '' }, '1234567.89'],
        [1234567.891, { decimal: ',', integerSeparator: ' ' }, '1 234 567,89'],
        [-1234567.891, { decimal: ',', integerSeparator: '.' },
            '-1.234.567,89'],
        [123, { integerSeparator: '\'' }, '123.00']
    ];

    cases.forEach(function(c) {
        // act
        colOps.writeResult(c[0], label.id, 'innerhtml', 2, c[1]);

        // assert
        equal(label.innerHTML, c[2], 'Result ' + c[0] + ' => ' + c[2]);
    });
    removeLabels();
});

test('Can format results with prefix and suffix', function() {
    // setup
    var colOps = tf.extension('colOps');
    var label = addLabel('span');
    var cases = [
        [-1234.5, 1, { prefix: '$', suffix: '/item' }, '-$1,234.5/item'],
        [1234.5, 1, { prefix: '€ ' }, '€ 1,234.5'],
        [12.3, 1, { suffix: ' Km' }, '12.3 Km'],
        [1234.5, 2, { decimal: '', integerSeparator: '', prefix: '$' },
            '$1234.50']
    ];

    cases.forEach(function(c) {
        // act
        colOps.writeResult(c[0], label.id, 'innerhtml', c[1], c[2]);

        // assert
        equal(label.innerHTML, c[3], 'Result ' + c[0] + ' => ' + c[3]);
    });
    removeLabels();
});

test('Can apply format_result precision and locale', function() {
    // setup
    var colOps = tf.extension('colOps');
    colOps.formatResults[2] = { precision: 2 };
    colOps.formatResults[7] = { locale: 'de-DE' };

    // act
    colOps.calcAll();

    // assert
    equal(id('mean1').innerHTML, '1416.00', 'Precision from format object');
    equal(id('max2').innerHTML, '3,10', 'Locale from format object');

    colOps.formatResults[2] = undefined;
    colOps.formatResults[7] = undefined;
    colOps.calcAll();
});

test('Can cap format_result decimals with round', function() {
    // setup
    var colOps = tf.extension('colOps');
    colOps.formatResults[2] = { precision: 2, round: 1 };

    // act
    colOps.calcAll();

    // assert
    equal(id('mean1').innerHTML, '1416.0', 'Round caps precision');

    colOps.formatResults[2] = undefined;
    colOps.calcAll();
});

test('Ignores unsupported format-number options', function() {
    // setup
    var colOps = tf.extension('colOps');
    var label = addLabel('span');
    var legacyOptions = {
        truncate: 1,
        padLeft: 8,
        padRight: 8,
        negativeType: 'brackets',
        negativeLeftSymbol: '[',
        negativeRightSymbol: ']',
        negativeOut: true,
        decimalsSeparator: ' ',
        noUnits: true
    };

    // act
    colOps.writeResult(1234.567, label.id, 'innerhtml', 2, {});
    var expected = label.innerHTML;
    colOps.writeResult(1234.567, label.id, 'innerhtml', 2, legacyOptions);
    var formatted = label.innerHTML;
    colOps.writeResult(-1234.567, label.id, 'innerhtml', 2, {
        prefix: '$',
        suffix: '/item',
        truncate: 1,
        padLeft: 8
    });
    var negative = label.innerHTML;
    var nullGrouping = colOps.configureFormat(2, { integerSeparator: null });
    colOps.writeResult(1234567.891, label.id, 'innerhtml', 2, nullGrouping);

    // assert
    equal(expected, '1,234.57', 'Baseline output');
    equal(formatted, expected, 'Legacy options have no effect');
    equal(negative, '-$1,234.57/item',
        'Sign and affixes with ignored legacy options');
    equal(label.innerHTML, '1234567.89', 'Null separator disables grouping');
    removeLabels();
});

test('Can write formatted results with each write method', function() {
    // setup
    var colOps = tf.extension('colOps');
    var format = { prefix: '$', decimal: ',', integerSeparator: '.' };
    var span = addLabel('span');
    var input = addLabel('input');
    var textHolder = addLabel('span');
    textHolder.appendChild(document.createTextNode('x'));

    // act
    colOps.writeResult(1234.5, span.id, 'innerHTML', 2, format);
    colOps.writeResult(1234.5, input.id, 'setValue', 2, format);
    colOps.writeResult(1234.5, textHolder.id, 'createTextNode', 2, format);

    // assert
    equal(span.innerHTML, '$1.234,50', 'innerhtml');
    equal(input.value, '$1.234,50', 'setvalue');
    equal(textHolder.firstChild.nodeValue, '$1.234,50', 'createtextnode');
    removeLabels();
});

test('Does not write result when label does not exist', function() {
    // setup
    var colOps = tf.extension('colOps');

    // act & assert
    colOps.writeResult(1, 'non-existent-label', 'innerhtml', 2, {});
    ok(true, 'No exception thrown');
});

test('Can format results using format and column type options', function() {
    // setup
    var colOps = tf.extension('colOps');
    var label = addLabel('span');
    tf.colTypes = [null, null, null, null, null];
    tf.colTypes[3] = { type: 'formatted-number', decimal: ',', thousands: '.' };

    // act
    var plain = colOps.configureFormat(2, { prefix: '$' });
    colOps.writeResult(1234567.891, label.id, 'innerhtml', 2, plain);
    var plainResult = label.innerHTML;
    var typed = colOps.configureFormat(3, { prefix: '$' });
    colOps.writeResult(1234567.891, label.id, 'innerhtml', 2, typed);

    // assert
    equal(plainResult, '$1234567.89', 'Plain number column');
    equal(label.innerHTML, '$1.234.567,89', 'Formatted number column');
    tf.colTypes[3] = undefined;
    removeLabels();
});

module('Tear-down');
test('can destroy', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});
