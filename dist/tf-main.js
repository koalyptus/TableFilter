
// requirejs.config({
//     baseUrl: '../dist/libs',
//     paths: {
//         tf: '.'
//     }
// });

requirejs(['core'], function(TableFilter){
    // Your logic here
    var tf = new TableFilter("demo", {
        col_0: 'select',
        col_3: 'checklist',
        base_path: './',
        enable_default_theme: true,
        paging: false,
        alternate_rows: true,
        highlight_keywords: true,
        match_case: false,
        remember_grid_values: true,
        btn_reset: true,
        grid_layout: false
    });

    tf.init();
});