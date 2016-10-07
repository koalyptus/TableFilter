
var id = function (id){ return document.getElementById(id); };
var table = id('demo');
var totRowIndex = table.getElementsByTagName('tr').length;

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_always_visible: [
        totRowIndex-2,
        totRowIndex-1,
        totRowIndex,
    ],
    extensions: [{
        name: 'colOps',
        id: [
            'sum1', 'sum2',
            'min1', 'min2',
            'max1', 'max2'
        ],
        col: [
            2, 3,
            2, 3,
            2, 3
        ],
        operation: [
            'sum', 'mean',
            'min', 'min',
            'max', 'max'
        ],
        write_method: [
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml',
            'innerhtml', 'innerhtml'
        ],
        exclude_row: [
            totRowIndex-2,
            totRowIndex-1,
            totRowIndex
        ],
        decimal_precision: [0, 2],
        tot_row_index: [
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
    equal(id('sum2').innerHTML, 1.69, 'Mean result');
    equal(id('min1').innerHTML, 286.00, 'Min result');
    equal(id('min2').innerHTML, 0.60, 'Min result');
});

module('Behaviour checks');
test('Column operations after filtering', function() {
    tf.setFilterValue(0, 'syd');
    tf.filter();
    equal(id('sum1').innerHTML, 3552, 'Sum result');
    equal(id('sum2').innerHTML, 1.15, 'Mean result');
    equal(id('min1').innerHTML, 286.00, 'Min result');
    equal(id('min2').innerHTML, 0.60, 'Min result');
    tf.clearFilters();
});

// module('Behaviour checks with grid layout');
// test('Column operations', function() {
//     tf.destroy();
//     tf = null;
//     totRowIndex = totRowIndex-2;
//     tf = new TableFilter('demo', {
//         base_path: '../dist/tablefilter/',
//         grid_layout: true,
//         rows_always_visible: [totRowIndex],
//         extensions: [{
//             name: 'colOps',
//             id: ['sum1', 'sum2'],
//             col: [2, 3],
//             operation: ['sum', 'mean'],
//             write_method: ['innerhtml', 'innerhtml'],
//             exclude_row: [totRowIndex],
//             decimal_precision: [0, 2],
//             tot_row_index: [totRowIndex, totRowIndex]
//         }]
//     });
//     tf.init();

//     equal(id('sum1').innerHTML, 9911, 'Sum result');
//     equal(id('sum2').innerHTML, 1.69, 'Mean result');

//     tf.setFilterValue(2, '>1000');
//     tf.filter();
//     equal(id('sum1').innerHTML, 7771, 'Sum result');
//     equal(id('sum2').innerHTML, 2.16, 'Mean result');

//     tf.destroy();
// });
