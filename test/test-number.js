module('Number formatting');

test('Formats values using the requested locale', function() {
    equal(
        window.formatNumberValue(12345.67, { locale: 'de-DE' }),
        '12.345,67',
        'German grouping and decimal separators'
    );
    equal(
        window.formatNumberValue(12345.67, { locale: 'en-US' }),
        '12,345.67',
        'US grouping and decimal separators'
    );
});

test('Supports separator overrides, precision, and affixes', function() {
    equal(
        window.formatNumberValue(12345.678, {
            decimal: ',',
            integerSeparator: '.',
            round: 2,
            prefix: '€',
            suffix: ' net'
        }),
        '€12.345,68 net',
        'Custom format options are applied'
    );
    equal(
        window.formatNumberValue('1415.90', { precision: 0 }),
        '1,416',
        'Fixed precision rounds the value'
    );
});

test('Preserves significant decimal digits and negative sign', function() {
    equal(
        window.formatNumberValue(-1234.5),
        '-1,234.5',
        'The negative sign is retained before the prefix'
    );
    equal(
        window.formatNumberValue(12),
        '12',
        'Integers do not gain unnecessary decimal digits'
    );
});

test('Returns an empty string for invalid or empty values', function() {
    equal(window.formatNumberValue(''), '', 'Empty string');
    equal(window.formatNumberValue(null), '', 'Null');
    equal(window.formatNumberValue(Infinity), '', 'Infinity');
    equal(window.formatNumberValue('not a number'), '', 'Invalid number');
});
