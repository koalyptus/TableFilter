import {formatNumberValue} from '../src/number';

var assertCases = function(cases) {
    cases.forEach(function(c) {
        equal(
            formatNumberValue(c[0], c[1]),
            c[2],
            c[3]
        );
    });
};

module('Default formatting');
test('Can format values with the default separators', function() {
    assertCases([
        [1234567.891, undefined, '1,234,567.891', 'Default options object'],
        [1234567.891, {}, '1,234,567.891', 'Grouping and decimals'],
        [-1234567.891, {}, '-1,234,567.891', 'Negative value'],
        [0, {}, '0', 'Zero'],
        [12, {}, '12', 'Integer without decimals'],
        ['1415.90', {}, '1,415.90', 'Significant trailing zeros'],
        [' 1415.90 ', {}, '1,415.90', 'Trims string input'],
        [0.5, {}, '0.5', 'Value below one']
    ]);
});

test('Can format values with a locale', function() {
    assertCases([
        [12345.67, { locale: 'de-DE' }, '12.345,67', 'German separators'],
        [12345.67, { locale: 'en-US' }, '12,345.67', 'US separators'],
        [-12345.67, { locale: 'de-DE' }, '-12.345,67',
            'German separators for a negative value'],
        [1234567.891, { locale: 'de-DE', prefix: '€ ' }, '€ 1.234.567,891',
            'German separators with a prefix']
    ]);
});

module('Separators and grouping');
test('Can override separators and disable grouping', function() {
    assertCases([
        [1234567.891, { decimal: ',', integerSeparator: '.' },
            '1.234.567,891', 'European separators'],
        [-1234567.891, { decimal: ',', integerSeparator: '.' },
            '-1.234.567,891', 'European separators for a negative value'],
        [1234567.891, { decimal: ',', integerSeparator: ' ' },
            '1 234 567,891', 'Space thousands separator'],
        [1234.5, { decimal: '', integerSeparator: ' ' }, '1 234.5',
            'Empty decimal override'],
        [1234567.891, { decimal: '', integerSeparator: '' },
            '1234567.891', 'Empty separators'],
        [1234567.891, { integerSeparator: '' }, '1234567.891',
            'Empty thousands separator disables grouping'],
        [1234567.891, { integerSeparator: null }, '1234567.891',
            'Null thousands separator disables grouping'],
        [1234567.891, { integerSeparator: '\'' }, '1\'234\'567.891',
            'Custom thousands separator'],
        [123, { integerSeparator: '\'' }, '123',
            'No grouping below four digits']
    ]);
});

module('Affixes and sign');
test('Can format values with a prefix and suffix', function() {
    assertCases([
        [-1234.5, { precision: 1, prefix: '$', suffix: '/item' },
            '-$1,234.5/item', 'Sign precedes the prefix'],
        [1234.5, { precision: 1, prefix: '€ ' }, '€ 1,234.5', 'Prefix'],
        [12.3, { precision: 1, suffix: ' Km' }, '12.3 Km', 'Suffix'],
        [1234.5, {
            precision: 2,
            decimal: '',
            integerSeparator: '',
            prefix: '$'
        }, '$1234.50', 'Prefix without separators']
    ]);
});

module('Precision and rounding');
test('Can set precision and round fraction digits', function() {
    assertCases([
        [1234.5, { precision: 0 }, '1,235', 'Zero decimals'],
        [1234.5, { precision: 3 }, '1,234.500', 'Fixed decimals'],
        [12, { precision: 2 }, '12.00', 'Pads missing decimals'],
        ['12', { precision: 2 }, '12.00', 'Pads string input'],
        [1234.567, { precision: 2 }, '1,234.57', 'Precision rounds'],
        [999.995, { precision: 2 }, '1,000.00', 'Rounding carries'],
        [-0.004, { precision: 2 }, '-0.00', 'Negative zero'],
        [1234.567, { round: 1 }, '1,234.6', 'Round caps decimals'],
        [1234.5, { round: 3 }, '1,234.5', 'Round keeps input precision'],
        [1234.5, { round: 0 }, '1,235', 'Round up to an integer'],
        [1234.4, { round: 0 }, '1,234', 'Round down to an integer'],
        [1234.567, { precision: 3, round: 1 }, '1,234.6',
            'Round caps precision'],
        [1.5, { precision: 0, round: 2 }, '1.5',
            'Round allows more decimals than precision'],
        [1.5, { precision: 2, round: 0 }, '2',
            'Zero precision with zero round']
    ]);
});

module('Input validation');
test('Returns an empty string for empty or non-numeric values', function() {
    assertCases([
        [null, {}, '', 'Null'],
        [undefined, {}, '', 'Undefined'],
        ['', {}, '', 'Empty string'],
        ['   ', {}, '', 'Blank string'],
        ['not a number', {}, '', 'Non-numeric string'],
        [NaN, {}, '', 'NaN'],
        [Infinity, {}, '', 'Positive infinity'],
        [-Infinity, {}, '', 'Negative infinity']
    ]);
});

module('Exponent input');
test('Can format values written in exponential notation', function() {
    assertCases([
        [1e21, {}, '1,000,000,000,000,000,000,000', 'Expands large values'],
        ['1e21', {}, '1,000,000,000,000,000,000,000',
            'Expands large string values'],
        ['1e3', {}, '1,000', 'Positive exponent'],
        [' 1e3 ', {}, '1,000', 'Trims string input with an exponent'],
        ['1.23e5', {}, '123,000', 'Exponent with decimals'],
        ['1.5e-3', {}, '0.0015', 'Negative exponent'],
        ['1.5E-3', {}, '0.0015', 'Uppercase negative exponent'],
        ['-1.5e-3', {}, '-0.0015', 'Negative value with an exponent']
    ]);
});

module('Legacy format-number options');
test('Ignores options outside the supported contract', function() {
    var expected = '1,234.57';
    var legacyOptions = {
        precision: 2,
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

    equal(formatNumberValue(1234.567, { precision: 2 }), expected,
        'Baseline output');
    equal(formatNumberValue(1234.567, legacyOptions), expected,
        'Legacy options have no effect');
    equal(formatNumberValue(-1234.567, legacyOptions), '-1,234.57',
        'Negative type has no effect');
});
