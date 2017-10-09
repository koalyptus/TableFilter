var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    rows_counter: true
});
tf.init();

var toolbar = tf.feature('toolbar');

module('Sanity checks');
test('toolbar component', function() {
    // assert
    notEqual(toolbar, null, 'toolbar instanciated');
    equal(toolbar.contCssClass, 'inf', 'container css class');
    equal(toolbar.lContCssClass, 'ldiv', 'left container css class');
    equal(toolbar.cContCssClass, 'mdiv', 'middle container css class');
    equal(toolbar.rContCssClass, 'rdiv', 'right container css class');
    equal(toolbar.tgtId, null, 'external container id null');
    notEqual(toolbar.cont, null, 'container created');
    notEqual(toolbar.lCont, null, 'left inner container created');
    notEqual(toolbar.cCont, null, 'middle inner container created');
    notEqual(toolbar.rCont, null, 'right inner container created');
    equal(toolbar.emitter.events['initializing-feature'].length, 1,
        'subscribed to `initializing-feature` event');
    equal(toolbar.emitter.events['initializing-extension'].length, 1,
        'subscribed to `initializing-extension` event');
});

module('Feature interface');
test('Properties', function() {
    deepEqual(toolbar.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(toolbar.feature, 'toolbar', 'Feature name');
    deepEqual(toolbar.enabled, true, 'Feature enabled');
    deepEqual(toolbar.initialized, true, 'Feature enabled');
    deepEqual(typeof toolbar.config, 'object', 'TF configuration object');
    deepEqual(typeof toolbar.init, 'function', 'Feature init method');
    deepEqual(typeof toolbar.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof toolbar.reset, 'function', 'Feature reset method');
    deepEqual(typeof toolbar.enable, 'function', 'Feature enable method');
    deepEqual(typeof toolbar.disable, 'function', 'Feature enable method');
    deepEqual(typeof toolbar.isEnabled, 'function', 'Feature enable method');
});
test('Can destroy', function() {
    toolbar.destroy();
    deepEqual(toolbar.initialized, false, 'not initialised');
});
test('Can reset', function() {
    toolbar.reset();
    deepEqual(toolbar.enabled, true, 'enabled');
});
test('Can disable', function() {
    toolbar.disable();
    deepEqual(toolbar.enabled, false, 'disabled');
});
test('Can enable', function() {
    toolbar.enable();
    deepEqual(toolbar.enabled, true, 'enabled');
});
test('Can init', function() {
    toolbar.destroy();
    toolbar.enable();
    toolbar.init();
    deepEqual(toolbar.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    toolbar.isEnabled();
    deepEqual(toolbar.enabled, true, 'enabled');
});

module('Behaviour');
test('Does not init if initialised', function() {
    // setup
    var createContainer = toolbar.createContainer;
    var hit = 0;
    toolbar.createContainer = function() {
        hit++;
    };

    // act
    toolbar.init();

    // assert
    deepEqual(hit, 0, 'does not initialise');

    toolbar.createContainer = createContainer;
});

test('Does not init if external', function() {
    // setup
    toolbar.initialized = false;
    var createContainer = toolbar.createContainer;
    var hit = 0;
    toolbar.createContainer = function() {
        hit++;
    };

    // act
    toolbar.init(true);

    // assert
    deepEqual(hit, 0, 'does not initialise');

    toolbar.createContainer = createContainer;
    toolbar.initialized = true;
});

test('Can get container', function() {
    // act
    var result = toolbar.container('left');

    // assert
    deepEqual(result, toolbar.cont.querySelector('.ldiv'),
        'left inner container');
});

test('Can get default container', function() {
    // act
    var result = toolbar.container();

    // assert
    deepEqual(result, toolbar.cont.querySelector('.rdiv'),
        'left inner container');
});

test('Can get container with appended element', function() {
    // act
    var result = toolbar.container('center',
        document.createElement('span')
            .appendChild(document.createTextNode('test')));

    // assert
    deepEqual(result.firstChild, toolbar.cont.querySelector('.mdiv').firstChild,
        'center inner container with appended element');
});

test('Can create container with css class', function() {
    // act
    var result = toolbar.createContainer(toolbar.cont, 'test');

    // assert
    deepEqual(result, toolbar.cont.querySelector('.test'),
        'inner container created');
});

module('Custom css');
test('config with custom css', function() {
    // setup
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        toolbar: {
            container_css_class: 'cont-css',
            left_cont_css_class: 'left-cont-css',
            right_cont_css_class: 'right-cont-css',
            center_cont_css_class: 'center-cont-css'
        }
    });

    // act
    tf.init();
    var toolbar = tf.feature('toolbar');

    deepEqual(toolbar.cont, document.querySelector('.cont-css'),
        'container with custom css class');
    deepEqual(toolbar.lCont, toolbar.cont.querySelector('.left-cont-css'),
        'left inner container with custom css class');
    deepEqual(toolbar.rCont, document.querySelector('.right-cont-css'),
        'right inner container with custom css class');
    deepEqual(toolbar.cCont, document.querySelector('.center-cont-css'),
        'middle inner container with custom css class');
});

module('External container');
test('config with external container id', function() {
    // setup
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        toolbar: {
            target_id: 'ext-cont'
        }
    });

    // act
    tf.init();
    var toolbar = tf.feature('toolbar');

    // assert
    deepEqual(toolbar.cont, document.querySelector('#ext-cont').firstChild,
        'external container element');
});

module('Grid-layout');
test('config with grid-layout', function() {
    // setup
    tf.destroy();
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        grid_layout: true,
        toolbar: true
    });

    // act
    tf.init();
    var toolbar = tf.feature('toolbar');

    // assert
    deepEqual(toolbar.cont, document.querySelector('.grd_inf'),
        'container element with grid-layout mode');
});

module('tear-down');
test('destroy TableFilter', function() {
    // act
    tf.destroy();

    // assert
    deepEqual(tf.feature('toolbar').initialized, false, 'toolbar removed');
});
