
var id = function (id){ return document.getElementById(id); };
var table = document.getElementById('demo');
var totRowIndex = table.getElementsByTagName('tr').length;

var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_always_visible: [totRowIndex],
    col_operation: {
        id: ['sum1', 'sum2'],
        col: [2, 3],
        operation: ['sum', 'mean'],
        write_method: ['innerhtml', 'innerhtml'],
        exclude_row: [totRowIndex],
        decimal_precision: [0, 2],
        tot_row_index: [totRowIndex, totRowIndex]
    }
});
tf.init();

module('Sanity checks');
test('Column Operations component', function() {
    deepEqual(typeof tf.Cpt.colOps, 'object', 'ColOps instanciated');
    equal(id('sum1').innerHTML, 9911, 'Sum result');
    equal(id('sum2').innerHTML, 1.69, 'Mean result');
});
