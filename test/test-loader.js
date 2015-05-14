
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    loader: true
});
tf.init();

module('Sanity checks');
test('Loader component', function() {
    var loader = tf.Cpt.loader;
    notEqual(loader, null, 'Loader instanciated');
    console.log(document.getElementById(loader.prfxLoader+tf.id));
    notEqual(
        document.getElementById(loader.prfxLoader+tf.id),
        null,
        'Loader DOM container'
    );
});
