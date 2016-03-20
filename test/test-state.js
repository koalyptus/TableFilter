
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

module('Behaviour');
test('Can update', function() {
    // setup
    state.state = {};

    // act
    tf.setFilterValue(1, 'Adelaide');
    tf.filter();

    // assert
    deepEqual(state.state.col_1, { 'flt': 'Adelaide' },
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
    state.state = {};

    // act
    state.override({ 'col_1': { 'flt': 'Ade' } });

    // assert
    deepEqual(state.state, { 'col_1': { 'flt': 'Ade' } },
        'State field overriden');
});

test('Can update page number', function() {
    // setup
    state.persistPageNumber = true;
    state.state = {};

    // act
    state.updatePage('2');

    // assert
    deepEqual(state.state.page, '2', 'Page number updated');

    state.persistPageNumber = false;
});

test('Can update page length', function() {
    // setup
    state.persistPageLength = true;
    state.state = {};

    // act
    state.updatePageLength('10');

    // assert
    deepEqual(state.state.page_length, '10', 'Page length updated');

    state.persistPageLength = false;
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
