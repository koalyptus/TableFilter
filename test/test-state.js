
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    state: true
});
tf.init();
var state = tf.feature('state');
module('Sanity checks');
test('State instance', function() {
    deepEqual(tf.state, true, 'State is enabled');
    deepEqual(typeof state, 'object', 'State is instantiated');
    deepEqual(state.initialized, true, 'State is initialized');
    deepEqual(state.enableHash, true, 'Hash is enabled by default');
    deepEqual(state.persistFilters, true, 'Filters are persisted by default');
    deepEqual(state.persistPageNumber, false, 'Page number not persisted');
    deepEqual(state.persistPageLength, false, 'Page length not persisted');
    deepEqual(typeof state.state, 'object', 'State field is an object');
});

test('Should not initialize if already initialized', function() {
    // setup
    var hit = 0;
    state.initialized = true;
    var initialHashInit = state.hash.init;
    state.hash.init = function() {
        hit++;
    };

    // act
    state.init();

    // assert
    deepEqual(hit, 0, 'hash init not called');

    state.hash.init = initialHashInit;
});

module('Behaviour');
test('Can update filters state', function() {
    // setup
    state.state = {};

    // act
    tf.setFilterValue(1, 'Adelaide');
    tf.filter();

    // assert
    deepEqual(state.state.col_1, { 'flt': 'Adelaide' },
        'State object updated');
});

test('Can update state when previously field value is set empty', function() {
    // setup
    state.state = {};
    tf.setFilterValue(0, 'Sydney');
    tf.filter();

    // act
    tf.setFilterValue(0, '');
    tf.filter();

    // assert
    deepEqual(state.state.col_0, { 'flt': undefined },
        'State object updated');
});

test('Can update on clear filters', function() {
    // setup
    state.state = {};

    // act
    tf.clearFilters();

    // assert
    deepEqual(state.state.col_1, undefined, 'State object updated');
});

test('Can update page number', function() {
    // setup
    state.state = {};
    state.pageNb = 2;
    state.persistPageNumber = true;

    // act
    tf.filter();
    state.persistPageNumber = false;

    // assert
    deepEqual(state.state.page, 2, 'Page number updated');
});

test('Can update page number when null', function() {
    // setup
    state.state = {};
    state.pageNb = null;
    state.persistPageNumber = true;

    // act
    tf.filter();
    state.persistPageNumber = false;

    // assert
    deepEqual(state.state.page, undefined, 'Page number updated');
});

test('Can update page length', function() {
    // setup
    state.persistPageLength = true;
    state.state = {};
    state.pageLength = 10;

    // act
    tf.filter();
    state.persistPageLength = false;

    // assert
    deepEqual(state.state.page_length, 10, 'Page length updated');
});

test('Can update page length when null', function() {
    // setup
    state.persistPageLength = true;
    state.state = {};
    state.pageLength = null;

    // act
    tf.filter();
    state.persistPageLength = false;

    // assert
    deepEqual(state.state.page_length, undefined, 'Page length updated');
});

test('Can update sort', function() {
    // setup
    state.persistSort = true;
    state.state = {};

    // act
    tf.emitter.emit('column-sorted', tf, 1, true);
    state.persistSort = false;

    // assert
    deepEqual(state.state.col_1,
        { 'sort': { 'descending': true } }, 'Sort updated');
});

test('Can update sort when previously set', function() {
    // setup
    state.persistSort = true;
    state.state = { col_1: { 'sort': { 'descending': true } } };

    // act
    tf.emitter.emit('column-sorted', tf, 0, false);
    state.persistSort = false;

    // assert
    deepEqual(state.state.col_0,
        { 'sort': { 'descending': false } }, 'Sort updated');
    deepEqual(state.state.col_1.sort, undefined, 'Sort updated');
});

test('Can update columns visibility', function() {
    // setup
    state.persistColsVisibility = true;
    state.state = {};

    // act
    tf.emitter.emit('column-shown', tf, {}, 1, [0, 2]);
    state.persistColsVisibility = false;

    // assert
    deepEqual(state.state.col_0.hidden, true, 'Column 0 visibility updated');
    deepEqual(state.state.col_2.hidden, true, 'Column 2 visibility updated');
});

test('Can update columns visibility when already set', function() {
    // setup
    state.persistColsVisibility = true;
    state.state = {
        col_0: { hidden: true },
        col_2: { hidden: true }
    };

    // act
    tf.emitter.emit('column-shown', tf, {}, 1, []);
    state.persistColsVisibility = false;

    // assert
    deepEqual(state.state.col_0.hidden, undefined,
        'Column 0 visibility updated');
    deepEqual(state.state.col_2.hidden, undefined,
        'Column 2 visibility updated');
});

test('Can update filters visibility', function() {
    // setup
    state.persistFiltersVisibility = true;
    state.state = {};

    // act
    tf.emitter.emit('filters-toggled', tf, {}, false);
    state.persistFiltersVisibility = false;

    // assert
    deepEqual(state.state.filters_visibility, false,
        'Filters visibility updated');
});

test('Can update filters visibility when null', function() {
    // setup
    state.persistFiltersVisibility = true;
    state.state = {};
    state.filtersVisibility = null;

    // act
    state.update();
    state.persistFiltersVisibility = false;

    // assert
    deepEqual(state.state.filters_visibility, undefined,
        'Filters visibility updated');
});

test('Can sync state', function() {
    // setup
    state.state = {};
    state.state.col_2 = { 'flt': '>1500' };

    // act
    state.sync();

    // assert
    deepEqual(tf.getValidRows(), [6, 7, 8], 'Table filters are synced');
});

test('Can override state', function() {
    // setup
    var hit = 0;
    var initialEmit = state.emitter.emit;
    var args = null;
    state.emitter.emit = function() {
        args = arguments;
        hit++;
    };
    state.state = {};

    // act
    state.override({ 'col_1': { 'flt': 'Ade' } });

    // assert
    deepEqual(state.state, { 'col_1': { 'flt': 'Ade' } },
        'State field overriden');
    deepEqual(hit, 1, 'event emitted');
    deepEqual(args[0], 'state-changed', 'event name');
    deepEqual(args[1], tf, 'tf parameter');
    deepEqual(args[2], state.state, 'state parameter');

    state.emitter.emit = initialEmit;
});

test('Can override and sync state', function() {
    // setup
    state.state = {};

    // act
    state.overrideAndSync({ 'col_2': { 'flt': '1412' } });

    // assert
    deepEqual(state.state, { 'col_2': { 'flt': '1412' } },
        'State field overriden');
    deepEqual(tf.getValidRows(), [2], 'Table filters are synced');
});

test('Can update page number', function() {
    // setup
    state.persistPageNumber = true;
    state.state = {};

    // act
    state.updatePage('2');
    state.persistPageNumber = false;

    // assert
    deepEqual(state.state.page, '2', 'Page number updated');
});

test('Can update page length', function() {
    // setup
    state.persistPageLength = true;
    state.state = {};

    // act
    state.updatePageLength('10');
    state.persistPageLength = false;

    // assert
    deepEqual(state.state.page_length, '10', 'Page length updated');
});

test('Can update sort', function() {
    // setup
    state.persistSort = true;
    state.state = {};

    // act
    state.updateSort(1, true);
    state.persistSort = false;

    // assert
    deepEqual(state.state.col_1,
        { 'sort': { 'descending': true } }, 'Sort updated');
});

test('Can update columns visibility', function() {
    // setup
    state.persistColsVisibility = true;
    state.state = {};

    // act
    state.updateColsVisibility([0, 2]);
    state.persistColsVisibility = false;

    // assert
    deepEqual(state.state.col_0.hidden, true, 'Column 0 visibility updated');
    deepEqual(state.state.col_2.hidden, true, 'Column 2 visibility updated');
});

test('Can update filters visibility', function() {
    // setup
    state.persistFiltersVisibility = true;
    state.state = {};

    // act
    state.updateFiltersVisibility(false);
    state.persistFiltersVisibility = false;

    // assert
    deepEqual(state.state.filters_visibility, false,
        'Filters visibility updated');
});

test('sync filters can clear filters before applying state', function() {
    // setup
    state.state = {'col_0': { 'flt': 'Ade' }};
    tf.setFilterValue(1, 'Can');
    tf.setFilterValue(2, '1412');

    // act
    state._syncFilters();

    // assert
    deepEqual(tf.getFilterValue(1), '', 'filter 1 cleared');
    deepEqual(tf.getFilterValue(2), '', 'filter 2 cleared');
    deepEqual(tf.getFilterValue(0), 'Ade', 'filter 0 state value applied');
    deepEqual(tf.getValidRows(), [6, 7, 8], 'Filtered rows');
});

module('Tear-down');
test('Can destroy TF', function() {
    // setup
    location.hash = null;

    // act
    tf.destroy();

    // assert
    deepEqual(state.initialized, false, 'State not initialized');
});
