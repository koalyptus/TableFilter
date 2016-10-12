
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    col_types: [
        null, null, null,
        { type: 'formatted-number', decimal: ',', thousands: ','},
        'formatted-number', null,
        { type: 'date', locale: 'fr', },
        { type: 'date', locale: 'en', format: '{dd}-{MM}-{yyyy|yy}' },
        { type: 'date', locale: 'en', format: ['{dd}-{months}-{yyyy|yy}'] },
        'IpAddress'
    ]
});
tf.init();

var dateType = tf.feature('dateType');

module('Sanity checks');
test('DateType feature', function() {
    deepEqual(typeof dateType, 'object', 'DateType instanciated');
    deepEqual(dateType.locale, 'en', 'DateType default locale');
    notEqual(dateType.datetime, null, 'Sugar date instance');
});

module('Feature interface');
test('Properties', function() {
    deepEqual(dateType.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(dateType.feature, 'dateType', 'Feature name');
    deepEqual(dateType.enabled, true, 'Feature enabled');
    deepEqual(dateType.initialized, true, 'Feature enabled');
    deepEqual(typeof dateType.emitter, 'object', 'Feature has emitter instance');
    deepEqual(typeof dateType.config, 'object', 'TF configuration object');
    deepEqual(typeof dateType.init, 'function', 'Feature init method');
    deepEqual(typeof dateType.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof dateType.reset, 'function', 'Feature reset method');
    deepEqual(typeof dateType.enable, 'function', 'Feature enable method');
    deepEqual(typeof dateType.disable, 'function', 'Feature enable method');
    deepEqual(typeof dateType.isEnabled, 'function', 'Feature enable method');
});

test('Can destroy', function() {
    dateType.destroy();
    deepEqual(dateType.initialized, false, 'not initialised');
});
test('Can reset', function() {
    dateType.reset();
    deepEqual(dateType.enabled, true, 'enabled');
});
test('Can disable', function() {
    dateType.disable();
    deepEqual(dateType.enabled, false, 'disabled');
});
test('Can enable', function() {
    dateType.enable();
    deepEqual(dateType.enabled, true, 'enabled');
});
test('Can init', function() {
    dateType.destroy();
    dateType.enable();
    dateType.init();
    deepEqual(dateType.initialized, true, 'initialised');
});
test('Can check is enabled', function() {
    dateType.isEnabled();
    deepEqual(dateType.enabled, true, 'enabled');
});

module('Behaviour');
 test('Can parse date', function() {
     var date0 = dateType.parse('10/25/2017', 'en-US');
     var date1 = dateType.parse('25/10/2017', 'en-GB');
     var date2 = dateType.parse('1997-07-16T19:20:30+01:00', 'en');
     var date3 = dateType.parse('14-Jul-2005', 'fr');

     deepEqual(date0.toISOString(), '2017-10-24T13:00:00.000Z', 'en-US date');
     deepEqual(date1.toISOString(), '2017-10-24T13:00:00.000Z', 'en-GB date');
     deepEqual(date2.toISOString(), '1997-07-16T18:20:30.000Z', 'ISO date');
     deepEqual(date3.getTime(), 1121263200000, 'fr date');
 });
// module('Sanity checks');
// test('Data types', function() {
//     deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
//     deepEqual(
//         tf.hasType(3, ['formatted-number']) &&
//         tf.hasType(4, ['formatted-number']),
//         true, 'Has number column types'
//     );
//     deepEqual(
//         tf.hasType(6, ['date']) &&
//         tf.hasType(7, ['date']) &&
//         tf.hasType(8, ['date']),
//         true, 'Has date column types'
//     );
// });

// module('Data types filtering');
// test('Can filter a column with a string', function() {
//     // act
//     tf.setFilterValue(0, 'carl');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [14, 18], 'Expected rows');

// });

// test('Can filter a EU formatted number', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(3, '1.836,09');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [6], 'Expected rows');
// });

// test('Can filter a EU formatted number column with a number', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(3, 3876);
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [14], 'Expected rows');
// });

// test('Can filter a EU formatted number column with a number without ' +
//     'thousands separator', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(3, '1393,52');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [13], 'Expected rows');
// });

// test('Can filter a EU formatted number column with a number without ' +
//     'decimals', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(3, '2.805');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [7], 'Expected rows');
// });

// test('Can filter a formatted number', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(4, '1,836.09');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [6], 'Expected rows');
// });

// test('Can filter a formatted number column with a number', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(4, 3876);
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [14], 'Expected rows');
// });

// test('Can filter a formatted number column with a number without ' +
//     'thousands separator', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(4, '1393.52');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [13], 'Expected rows');
// });

// test('Can filter a formatted number column with a number without ' +
//     'decimals', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(4, '2,805');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [7], 'Expected rows');
// });

// test('Can filter a EU formatted date column', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(6, '14/7/1994');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [16], 'Expected rows');
// });

// test('Can filter a EU formatted date column with different date separator',
//     function() {
//         // setup
//         tf.clearFilters();

//         // act
//         tf.setFilterValue(6, '20-10-97');
//         tf.filter();

//         // assert
//         deepEqual(tf.getValidRows(), [17], 'Expected rows');
//     });

// test('Can filter a formatted date column', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(7, '7/14/1994');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [16], 'Expected rows');
// });

// test('Can filter a formatted date column with different date separator',
//     function() {
//         // setup
//         tf.clearFilters();

//         // act
//         tf.setFilterValue(7, '10-20-97');
//         tf.filter();

//         // assert
//         deepEqual(tf.getValidRows(), [17], 'Expected rows');
//     });

// test('Can filter a dd-MMM-yyy formatted date column', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(8, '3-Jul-2002');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [8], 'Expected rows');
// });

// test('Can filter a dd-MMM-yyy formatted date column with different date ' +
//     'separator', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(8, '25.Mar.2000');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [4], 'Expected rows');
// });

// test('Can filter an IP address column', function() {
//     // setup
//     tf.clearFilters();

//     // act
//     tf.setFilterValue(9, '219.115.156.145');
//     tf.filter();

//     // assert
//     deepEqual(tf.getValidRows(), [8], 'Expected rows');
// });

// test('Can filter an IP address column with a truncated IP address',
//     function() {
//         // setup
//         tf.clearFilters();

//         // act
//         tf.setFilterValue(9, '219.115.15');
//         tf.filter();

//         // assert
//         deepEqual(tf.getValidRows(), [4, 8, 14], 'Expected rows');
//     });

// module('Tear-down');
// test('can destroy TableFilter DOM elements', function() {
//     tf.destroy();
//     deepEqual(tf.isInitialized(), false, 'Filters removed');
// });
