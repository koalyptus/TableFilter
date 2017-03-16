(function(win, TableFilter){
    var tf = new TableFilter('demo', {
        base_path: '../dist/tablefilter/',
        enter_key: false
    });
    tf.init();

    module('Sanity checks');
    test('Disable enter key on textbox filters', function() {
        deepEqual(tf instanceof TableFilter, true, 'TableFilter type');
        deepEqual(tf.enterKey, false, '<Enter> key disabled');
    });
    test('Check enter key on textbox filters is disabled', function() {
        // setup
        tf.enterKey = false;
        var evt = document.createEvent('KeyboardEvent');
        evt.initKeyboardEvent('keydown', true, true, window,
            false, false, false, false, 13, 0);

        tf.setFilterValue(0, 'hello');

        // act
        document.body.dispatchEvent(evt);

        // assert
        deepEqual(tf.getValidRows().length, 0, 'Table not filtered');
    });

})(window, TableFilter);
