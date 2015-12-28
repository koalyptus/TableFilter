
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    alternate_rows: true
});
tf.init();
var tbl = tf.tbl;
var altRows = tf.feature('alternateRows');

module('Sanity checks');
test('AlternateRows component', function() {
    deepEqual(typeof altRows, 'object', 'AlternateRows instanciated');
    deepEqual(altRows.evenCss, 'even', 'Expected even css class');
    deepEqual(altRows.oddCss, 'odd', 'Expected odd css class');
});

module('Feature interface');
test('Properties', function() {
    deepEqual(
        altRows.tf instanceof TableFilter, true, 'TableFilter instance');
    deepEqual(altRows.feature, 'alternateRows', 'Feature name');
    deepEqual(altRows.enabled, true, 'Feature enabled');
    deepEqual(altRows.initialized, true, 'Feature enabled');
    deepEqual(typeof altRows.emitter, 'object', 'Feature has emitter instance');
    deepEqual(typeof altRows.config, 'object', 'TF configuration object');
    deepEqual(typeof altRows.init, 'function', 'Feature init method');
    deepEqual(typeof altRows.destroy, 'function', 'Feature destroy method');
    deepEqual(typeof altRows.reset, 'function', 'Feature reset method');
    deepEqual(typeof altRows.enable, 'function', 'Feature enable method');
    deepEqual(typeof altRows.disable, 'function', 'Feature enable method');
    deepEqual(
        typeof altRows.isEnabled, 'function', 'Feature enable method');
});
test('Can destroy', function() {
    altRows.destroy();
    deepEqual(altRows.initialized, false, 'not initialised');
});
test('Can reset', function() {
    altRows.reset();
    deepEqual(altRows.enabled, true, 'enabled');
});
test('Can disable', function() {
    altRows.disable();
    deepEqual(altRows.enabled, false, 'disabled');
});
test('Can enable', function() {
    altRows.enable();
    deepEqual(altRows.enabled, true, 'enabled');
});
test('Can init', function() {
    altRows.destroy();
    altRows.enable();
    altRows.init();
    deepEqual(altRows.enabled, true, 'enabled');
});
test('Can check is enabled', function() {
    altRows.isEnabled();
    deepEqual(altRows.enabled, true, 'enabled');
});

module('Actions');
test('Filter column', function() {
    tf.setFilterValue(2, '>1400');
    tf.filter();

    deepEqual(tbl.querySelectorAll('tr.odd').length, 2, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 2, 'Even bg removed');
});

test('Clear filters', function() {
    tf.clearFilters();
    tf.filter();

    deepEqual(tbl.querySelectorAll('tr.odd').length, 3, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 4, 'Even bg removed');
});

test('Set background on a row', function() {
    altRows.setRowBg(4);
    deepEqual(tbl.rows[4].className, 'odd', 'Bg set on expected row');
});

test('Remove background on a row', function() {
    altRows.removeRowBg(4);
    deepEqual(tbl.rows[4].querySelectorAll('.odd').length,
        0, 'Bg set on expected row');
});

test('Remove alternating rows', function() {
    altRows.destroy();
    deepEqual(tbl.querySelectorAll('tr.odd').length, 0, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 0, 'Even bg removed');
});

test('Grid layout: initialising alternating rows', function() {
    tf.destroy();
    tf = null;
    tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        grid_layout: true,
        alternate_rows: true
    });
    tf.init();
    tbl = tf.tbl;
    altRows = tf.feature('alternateRows');

    deepEqual(
        tbl.querySelectorAll('tr.odd').length, 4, 'Expected bg for odd rows');
    deepEqual(
        tbl.querySelectorAll('tr.even').length, 3, 'Expected bg for even rows');
});

test('Grid layout: filter column', function() {
    tf.setFilterValue(3, '<2');
    tf.filter();

    deepEqual(tbl.querySelectorAll('tr.odd').length, 2, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 2, 'Even bg removed');
});

test('Grid layout: clear filters', function() {
    tf.clearFilters();
    tf.filter();

    deepEqual(tbl.querySelectorAll('tr.odd').length, 3, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 4, 'Even bg removed');
});

test('Grid layout: set background on a row', function() {
    altRows.setRowBg(4);
    deepEqual(tbl.rows[4].className, 'odd', 'Bg set on expected row');
});

test('Grid layout: remove background on a row', function() {
    altRows.removeRowBg(4);
    deepEqual(tbl.rows[4].querySelectorAll('.odd').length,
        0, 'Bg set on expected row');
});

test('Grid layout: remove alternating rows', function() {
    altRows.destroy();
    deepEqual(tbl.querySelectorAll('tr.odd').length, 0, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 0, 'Even bg removed');
});

module('Tear-down');
test('can destroy TableFilter DOM elements', function() {
    tf.destroy();
    deepEqual(tf.hasGrid(), false, 'Filters removed');
});
