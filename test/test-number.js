import {formatNumberValue} from '../src/number';

QUnit.module('Number formatting');

QUnit.test('Formats values using the requested locale', function(assert) {
    assert.equal(
        formatNumberValue(12345.67, {locale: 'de-DE'}),
        '12.345,67',
        'German grouping and decimal separators'
    );
    assert.equal(
        formatNumberValue(12345.67, {locale: 'en-US'}),
        '12,345.67',
        'US grouping and decimal separators'
    );
});

QUnit.test('Supports separator overrides, precision, and affixes',
    function(assert) {
        assert.equal(
            formatNumberValue(12345.678, {
                decimal: ',',
                integerSeparator: '.',
                round: 2,
                prefix: '€',
                suffix: ' net'
            }),
            '€12.345,68 net',
            'Custom format options are applied'
        );
        assert.equal(
            formatNumberValue('1415.90', {precision: 0}),
            '1,416',
            'Fixed precision rounds the value'
        );
    });

QUnit.test('Preserves significant decimal digits and negative sign',
    function(assert) {
        assert.equal(
            formatNumberValue(-1234.5),
            '-1,234.5',
            'The negative sign is retained before the prefix'
        );
        assert.equal(
            formatNumberValue(12),
            '12',
            'Integers do not gain unnecessary decimal digits'
        );
    });

QUnit.test('Returns an empty string for invalid or empty values',
    function(assert) {
        assert.equal(formatNumberValue(''), '', 'Empty string');
        assert.equal(formatNumberValue(null), '', 'Null');
        assert.equal(formatNumberValue(Infinity), '', 'Infinity');
        assert.equal(
            formatNumberValue('not a number'),
            '',
            'Invalid number'
        );
    });
