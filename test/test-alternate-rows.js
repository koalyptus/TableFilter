
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

test('Remove alternating rows', function() {
    altRows.remove();
    deepEqual(tbl.querySelectorAll('tr.odd').length, 0, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 0, 'Even bg removed');
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

test('Grid layout: remove alternating rows', function() {
    altRows.remove();
    deepEqual(tbl.querySelectorAll('tr.odd').length, 0, 'Odd bgs removed');
    deepEqual(tbl.querySelectorAll('tr.even').length, 0, 'Even bg removed');
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
