
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    loader: true
});
tf.init();

var loader = tf.feature('loader');

module('Sanity checks');
test('Loader component', function() {
    notEqual(loader, null, 'Loader instanciated');
    equal(loader.cont.nodeName, 'DIV', 'Loader DOM container');
});
test('Does not init if initialised', function() {
    // setup
    var show = loader.show;
    var hit = 0;
    loader.show = function() {
        hit++;
    };

    // act
    loader.init();

    // assert
    deepEqual(hit, 0, 'does not initialise');

    loader.show = show;
});

module('Feature interface');
test('Properties', function() {
    deepEqual(loader.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(loader.feature, 'loader', 'Feature name');
    deepEqual(loader.enabled, true, 'Feature enabled');
    deepEqual(loader.initialized, true, 'Feature enabled');
    deepEqual(typeof loader.config, 'object', 'TF configuration object');
    deepEqual(typeof loader.init, 'function', 'Feature init method');
    deepEqual(typeof loader.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof loader.reset, 'function', 'Feature reset method');
    deepEqual(typeof loader.enable, 'function', 'Feature enable method');
    deepEqual(typeof loader.disable, 'function', 'Feature enable method');
    deepEqual(typeof loader.isEnabled, 'function', 'Feature enable method');
});
test('Can destroy', function() {
    loader.destroy();
    deepEqual(loader.initialized, false, 'not initialised');
});
test('Can reset', function() {
    loader.reset();
    deepEqual(loader.enabled, true, 'enabled');
});
test('Can disable', function() {
    loader.disable();
    deepEqual(loader.enabled, false, 'disabled');
});
test('Can enable', function() {
    loader.enable();
    deepEqual(loader.enabled, true, 'enabled');
});
test('Can init', function() {
    loader.destroy();
    loader.enable();
    loader.init();
    deepEqual(loader.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    loader.isEnabled();
    deepEqual(loader.enabled, true, 'enabled');
});

module('Behaviour');
test('Can show loader', function() {
    loader.show('');
    deepEqual(loader.cont.style.display, '', 'Loader is displayed');
});
test('Does not show loader if feature not enabled', function() {
    // setup
    var isEnabled = loader.isEnabled;
    var hit = 0;
    loader.isEnabled = function() {
        hit++;
    };

    // act
    loader.show('');

    // assert
    deepEqual(hit, 1, 'loader not shown');

    loader.isEnabled = isEnabled;
});
test('Can generate loader in target element', function() {
    // setup
    loader.destroy();
    loader.targetId = 'my-loader';
    var targetEl = document.getElementById('my-loader');

    // act
    loader.init();

    // assert
    deepEqual(targetEl.innerHTML, '<div class="loader">Loading...</div>',
        'Loader injected in target element');
});
test('Can generate loader with custom html', function() {
    // setup
    loader.destroy();
    loader.html = '<h3>loading...</h3>';

    // act
    loader.init();

    // assert
    deepEqual(loader.cont.innerHTML, '<h3>loading...</h3>',
        'Loader with custom html');
});
test('Can show loader when known event is emitted', function() {
    // setup
    var show = loader.show;
    var hit = 0;
    loader.show = function() {
        hit++;
    };

    // act
    tf.emitter.emit('before-clearing-filters', tf);

    // assert
    deepEqual(hit, 1, 'show method is called');

    loader.show = show;
});
test('Can hide loader when known event is emitted', function() {
    // setup
    var show = loader.show;
    var hit = 0;
    var arg = null;
    loader.show = function() {
        hit++;
        arg = arguments[0];
    };

    // act
    tf.emitter.emit('after-clearing-filters', tf);

    // assert
    deepEqual(hit, 1, 'show method is called');
    deepEqual(arg, 'none', 'with `none` argument');

    loader.show = show;
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.isInitialized(), false, 'Filters removed');
});

/**
 * Mount a loader on a table owned by the test
 * @param {String} id Table id
 * @param {Object} loaderConfig `loader` configuration object
 * @returns {TableFilter} Initialised instance
 */
function mountLoader(id, loaderConfig) {
    var table = document.createElement('table');
    table.id = id;
    table.innerHTML = '<tbody>' +
        '<tr><th>From</th><th>Destination</th></tr>' +
        '<tr><td>Sydney</td><td>Adelaide</td></tr>' +
        '</tbody>';
    document.body.appendChild(table);

    var instance = new TableFilter(id, {
        base_path: '../dist/tablefilter/',
        loader: loaderConfig
    });
    instance.init();
    return instance;
}

module('Config-supplied html');
test('Injects html as authored', function() {
    var html = '<span class="spin" style="color:red">Loading</span>' +
        '<my-spinner></my-spinner>';
    var instance = mountLoader('loader-html', { html: html });
    var cont = instance.feature('loader').cont;

    equal(cont.nodeName, 'DIV', 'Legacy container');
    equal(cont.innerHTML, html, 'Markup injected verbatim');
    notEqual(cont.querySelector('my-spinner'), null,
        'Custom element preserved');

    instance.destroy();
});

module('Destroy');
asyncTest('Removes the container and unsubscribes the action events',
    function() {
        var shown = 0;
        var instance = mountLoader('loader-destroy', {
            on_show_loader: function() {
                shown++;
            }
        });
        var loader = instance.feature('loader');
        var cont = loader.cont;

        instance.emitter.emit('before-filtering', instance);
        setTimeout(function() {
            equal(shown, 1, 'on_show_loader called while initialised');

            loader.destroy();
            equal(cont.isConnected, false, 'Container removed from the DOM');

            instance.emitter.emit('before-filtering', instance);
            setTimeout(function() {
                equal(shown, 1, 'on_show_loader not called after destroy');
                instance.destroy();
                start();
            }, 100);
        }, 100);
    });
