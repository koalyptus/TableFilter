
var tf = new TableFilter('demo', {
    alternate_rows: true
});
tf.init();

module('Sanity checks');
test('AlternateRows component', function() {
    deepEqual(typeof tf.Cpt.alternateRows, 'object', 'AlternateRows instanciated');
});
