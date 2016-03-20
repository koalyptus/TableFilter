
var tf = new TableFilter('demo', {
    base_path: '../dist/tablefilter/',
    state: {
        type: ['hash'],
        filters: true,
        page_number: true,
        page_length: true
    },
    paging: true,
    results_per_page: ['Records: ', [2, 4, 6]],
});
tf.init();
var state = tf.feature('state');
var hash = state.hash;

module('Sanity checks');
test('State instance', function() {
    deepEqual(typeof hash, 'object', 'Hash is instantiated');
    deepEqual(hash.lastHash, '', 'Last store hash');
    deepEqual(hash.state, state, 'State instance');
    deepEqual(hash.emitter, state.emitter, 'Emitter instance');
});

module('Behaviour');
test('Can update URL hash', function() {
    // setup
    var stateObj = {
        'page': 2,
        'page_length': 4,
        'col_2': {'flt': '>500'}
    };

    // act
    state.emitter.emit('state-changed', tf, stateObj);

    // assert
    deepEqual(location.hash,
        '#{"page":2,"page_length":4,"col_2":{"flt":">500"}}',
        'URL hash updated');
});

test('Can parse a URL hash', function() {
    // setup
    var hashStr = '#{"page":2,"page_length":4,"col_2":{"flt":">500"}}';

    // act
    var result = hash.parse(hashStr);

    // assert
    deepEqual(result,
        {
            'page': 2,
            'page_length': 4,
            'col_2': {'flt': '>500'}
        },
        'Parsed hash'
    );
});

test('Can sync state', function() {
    // setup
    location.hash = '#{"page":2,"page_length":4,"col_2":{"flt":">500"}}';

    // act
    hash.sync();

    // assert
    deepEqual(tf.getValidRows(), [2,3,5,6,7,8], 'Table filters are synced');
});

module('Tear-down');
test('Can destroy', function() {
    // setup
    location.hash = '';

    // act
    hash.destroy();

    // assert
    deepEqual(hash.state, null, 'State instance is null');
    deepEqual(hash.lastHash, null, 'Last hash reference is null');
    deepEqual(hash.emitter, null, 'Emitter instance is null');
});
