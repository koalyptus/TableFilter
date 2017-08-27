(function(win, TableFilter) {

    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        linked_filters: true,
        col_0: 'checklist',
        col_1: 'multiple',
        load_filters_on_demand: true
    });

    tf.init();

    var checkList = tf.feature('checkList');
    var cont0 = checkList.containers[0];
    var cont1 = tf.getFilterElement(1);

    module('Sanity checks');
    test('Linked filters feature', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter instantiated');
        deepEqual(tf.linkedFilters, true, 'Linked filters enabled');
        deepEqual(tf.loadFltOnDemand, true, 'Load filters on demand setting');
    });

    test('Can generate filter options', function() {
        // setup
        var ct = 0;
        tf.emitter.on(['after-populating-filter'], checkGeneratedFilters);

        function checkGeneratedFilters(tf, colIndex, flt) {
            ct++;

            if (colIndex === 0) {
                // assert
                deepEqual(flt.getElementsByTagName('li').length, 3,
                    'Filter 0 options length');
            }
            if (colIndex === 1) {
                // assert
                deepEqual(flt.options.length, 7, 'Filter 1 options length');
            }
            if (ct === 2) {
                tf.emitter.off(['after-populating-filter'],
                    checkGeneratedFilters);
                canFilterLinkedFilters();
            }
        }

        // act
        var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent('click', true, true);
        cont0.dispatchEvent(evObj);
        cont1.focus();
    });

    function canFilterLinkedFilters() {
        test('Can filter linked filters', function() {
            // act
            tf.activateFilter(0);
            tf.setFilterValue(0, 'Adelaide');
            tf.filter();

            // assert
            deepEqual(cont0.getElementsByTagName('li').length, 2,
                'Filter 0 options length');
            deepEqual(cont1.options.length, 4, 'Filter 1 options length');
        });

        test('Can filter linked filters 2', function() {
            // act
            tf.activateFilter(1);
            tf.setFilterValue(1, 'Brisbane');
            tf.filter();

            // assert
            deepEqual(cont0.getElementsByTagName('li').length, 2,
                'Filter 0 options length');
            deepEqual(cont1.options.length, 2, 'Filter 1 options length');
        });

        test('Can clear filters', function() {
            // act
            tf.clearFilters();

            // assert
            deepEqual(cont0.getElementsByTagName('li').length, 3,
                'Filter 0 options length');
            deepEqual(cont1.options.length, 7, 'Filter 1 options length');
        });

        test('Destroy TableFilter', function() {
            // act
            tf.destroy();

            // assert
            deepEqual(tf.isInitialized(), false, 'Filters removed');
        });
    }

})(window, TableFilter);
