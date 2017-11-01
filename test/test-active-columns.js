
(function(win, TableFilter){

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        mark_active_columns: true
    });
    tf.init();
    var markActiveColumns = tf.feature('markActiveColumns');

    module('Sanity checks');
    test('Active columns', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        notEqual(markActiveColumns, null, 'markActiveColumns instanciated');
        deepEqual(tf.markActiveColumns, true, 'markActiveColumns property');
        equal(markActiveColumns.emitter.events['before-filtering'].length, 1,
            'subscribed to `before-filtering` event');
        equal(markActiveColumns.emitter.events['cell-processed'].length, 1,
            'subscribed to `cell-processed` event');
    });

    module('Feature interface');
    test('Properties', function() {
        deepEqual(markActiveColumns.tf instanceof TableFilter, true,
            'TableFilter instance');
        deepEqual(markActiveColumns.feature, 'markActiveColumns',
            'Feature name');
        deepEqual(markActiveColumns.enabled, true, 'Feature enabled');
        deepEqual(markActiveColumns.initialized, true, 'Feature initialized');
        deepEqual(typeof markActiveColumns.emitter, 'object',
            'Feature has emitter instance');
        deepEqual(typeof markActiveColumns.config, 'object',
            'TF configuration object');
        deepEqual(typeof markActiveColumns.init, 'function',
            'Feature init method');
        deepEqual(typeof markActiveColumns.destroy, 'function',
            'Feature destroy method');
        deepEqual(typeof markActiveColumns.reset, 'function',
            'Feature reset method');
        deepEqual(typeof markActiveColumns.enable, 'function',
            'Feature enable method');
        deepEqual(typeof markActiveColumns.disable, 'function',
            'Feature enable method');
        deepEqual(typeof markActiveColumns.isEnabled, 'function',
            'Feature enable method');
    });
    test('Can destroy', function() {
        markActiveColumns.destroy();
        deepEqual(markActiveColumns.initialized, false, 'not initialised');
    });
    test('Can reset', function() {
        markActiveColumns.reset();
        deepEqual(markActiveColumns.enabled, true, 'enabled');
    });
    test('Can disable', function() {
        markActiveColumns.disable();
        deepEqual(markActiveColumns.enabled, false, 'disabled');
    });
    test('Can enable', function() {
        markActiveColumns.enable();
        deepEqual(markActiveColumns.enabled, true, 'enabled');
    });
    test('Can init', function() {
        markActiveColumns.destroy();
        markActiveColumns.enable();
        markActiveColumns.init();
        deepEqual(markActiveColumns.enabled, true, 'enabled');
    });
    test('Can check is enabled', function() {
        markActiveColumns.isEnabled();
        deepEqual(markActiveColumns.enabled, true, 'enabled');
    });

    module('Behaviour');
    test('Active columns', function() {
        tf.setFilterValue(1, 'Bri');
        tf.setFilterValue(3, '>2');
        tf.filter();
        var header1 = tf.getHeaderElement(1);
        var header3 = tf.getHeaderElement(3);
        deepEqual(
            header1.className.indexOf('activeHeader') !== -1,
            true,
            'Active filter indicator');
        deepEqual(
            header3.className.indexOf('activeHeader') !== -1,
            true,
            'Active filter indicator');
    });

    test('can highlight column cells', function() {
        // setup
        tf.clearFilters();
        var markActiveColumns = tf.feature('markActiveColumns');
        markActiveColumns.highlightColumn = true;

        // act
        tf.setFilterValue(3, '>2');
        tf.filter();

        // assert
        deepEqual(tf.dom().rows[6].cells[3].className,
            markActiveColumns.cellCssClass, 'cell has expected css class');
        deepEqual(
            tf.dom()
                .querySelectorAll('.' + markActiveColumns.cellCssClass).length,
            7,
            'number of highlighted column cells'
        );
    });

    test('can unhighlight column cells', function() {
        // act
        tf.clearFilters();

        // assert
        deepEqual(
            tf.dom()
                .querySelectorAll('.' + markActiveColumns.cellCssClass).length,
            0,
            'number of highlighted column cells'
        );

        markActiveColumns.highlightColumn = false;
    });

    test('cannot initialiase if already initialised', function() {
        // setup
        var hit = 0;
        var emitterOn = markActiveColumns.emitter.on;
        markActiveColumns.emitter.on = function() {
            hit++;
        };

        // act
        markActiveColumns.init();

        // assert
        deepEqual(hit, 0, 'init exited');

        markActiveColumns.emitter.on = emitterOn;
    });

    test('Active columns with paging', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            mark_active_columns: true,
            paging: true
        });
        tf.init();

        tf.setFilterValue(1, 'Bri');
        tf.setFilterValue(3, '>2');
        tf.filter();
        var header1 = tf.getHeaderElement(1);
        var header3 = tf.getHeaderElement(3);
        deepEqual(
            header1.className.indexOf('activeHeader') !== -1,
            true,
            'Active filter indicator');
        deepEqual(
            header3.className.indexOf('activeHeader') !== -1,
            true,
            'Active filter indicator');
    });

    test('Grid layout active columns', function() {
        tf.destroy();
        tf = null;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            mark_active_columns: true,
            grid_layout: true
        });
        tf.init();

        tf.setFilterValue(1, 'Bri');
        tf.setFilterValue(3, '>2');
        tf.filter();
        var header1 = tf.getHeaderElement(1);
        var header3 = tf.getHeaderElement(3);
        deepEqual(
            header1.className.indexOf('activeHeader') !== -1,
            true,
            'Active filter indicator');
        deepEqual(
            header3.className.indexOf('activeHeader') !== -1,
            true,
            'Active filter indicator');
    });

    test('Cannot destroy if not initialised', function() {
        // setup
        var clearActiveColumns = markActiveColumns.clearActiveColumns;
        var hit = 0;
        markActiveColumns.clearActiveColumns = function() { hit++; };
        markActiveColumns.initialized = false;

        // act
        markActiveColumns.destroy();

        // assert
        deepEqual(hit, 0, 'clearActiveColumns not called');

        markActiveColumns.clearActiveColumns = clearActiveColumns;
    });

    module('Callbacks');
    test('Can trigger onBeforeActiveColumn callback', function() {
        // setup
        var colIndex;
        markActiveColumns.onBeforeActiveColumn = function(feature, colIdx) {
            colIndex = colIdx;
        };

        // act
        markActiveColumns.markActiveColumn(2);

        // assert
        deepEqual(colIndex, 2,
            'expected column index passed to onBeforeActiveColumn');
    });

    test('Can trigger onAfterActiveColumn callback', function() {
        // setup
        var colIndex;
        markActiveColumns.onAfterActiveColumn = function(feature, colIdx) {
            colIndex = colIdx;
        };

        // act
        markActiveColumns.markActiveColumn(3);

        // assert
        deepEqual(colIndex, 3,
            'expected column index passed to onAfterActiveColumn');
    });

    module('mark_active_columns as configuration object');
    test('Sanity checks', function() {
        tf.destroy();
        var hit = 0;
        tf = new TableFilter('demo', {
            base_path: '../dist/tablefilter/',
            mark_active_columns: {
                header_css_class: 'myCssClass',
                on_before_active_column: function(feature, colIndex) {
                    hit = colIndex;
                },
                on_after_active_column: function(feature, colIndex) {
                    hit = colIndex;
                }
            }
        });
        tf.init();
        var markActiveColumns = tf.feature('markActiveColumns');

        deepEqual(tf instanceof TableFilter, true, 'TableFilter instanciated');
        notEqual(markActiveColumns, null, 'markActiveColumns instanciated');
        deepEqual(tf.markActiveColumns, true, 'markActiveColumns property');

        test('Custom header CSS class', function() {
            // setup
            tf.setFilterValue(1, 'Bri');
            tf.setFilterValue(3, '>2');
            var header1 = tf.getHeaderElement(1);
            var header3 = tf.getHeaderElement(3);

            // act
            tf.filter();

            // assert
            deepEqual(
                header1.className.indexOf('myCssClass') !== -1,
                true,
                'Active filter indicator');
            deepEqual(
                header3.className.indexOf('myCssClass') !== -1,
                true,
                'Active filter indicator');
        });

        test('on_before_active_column callback', function() {
            // setup
            tf.clearFilters();
            tf.setFilterValue(1, 'Bri');

            // act
            tf.filter();

            // assert
            deepEqual(hit, 1,
                'expected column index passed to on_before_active_column');
        });

        test('on_after_active_column callback', function() {
            // setup
            tf.clearFilters();
            tf.setFilterValue(3, '>2');

            // act
            tf.filter();

            // assert
            deepEqual(hit, 3,
                'expected column index passed to on_after_active_column');
        });

        module('Tear-down');
        test('can destroy', function() {
            tf.destroy();
            deepEqual(tf.isInitialized(), false, 'Filters removed');
        });
    });

})(window, TableFilter);
