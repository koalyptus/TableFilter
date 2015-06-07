
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    alternate_rows: true
});
tf.init();

module('Sanity checks');
test('AlternateRows component', function() {
    deepEqual(
        typeof tf.feature('alternateRows'),
        'object',
        'AlternateRows instanciated'
    );
});
