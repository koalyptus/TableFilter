var path = require('path');

module.exports = {
    cache: true,
    entry: path.join(__dirname, '/src/tablefilter.js'),
    output: {
        publicPath: '/dist/tablefilter/',
        path: path.join(__dirname, '/dist/tablefilter'),
        filename: 'tablefilter.js',
        chunkFilename: '[name]-[chunkhash].js',
        // chunkFilename: '[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            sortabletable: '../../../libs/sortabletable.js'
        }
    },
    module: {
        // exprContextRegExp: /$^/,
        // exprContextCritical: true,
        loaders: [{
            test: path.join(__dirname, 'src'),
            exclude: /node_modules/,
            query: {
                compact: false
            },
            loader: 'babel-loader'
        }]
    }
    // ,
    // plugins: [
    //     // new webpack.DefinePlugin({
    //     //     'process.env': {
    //     //         // This has effect on the react lib size
    //     //         'NODE_ENV': JSON.stringify('production')
    //     //     }
    //     // }),
    //     // new webpack.IgnorePlugin(/adapterSortabletable$/),
    //     new Clean(['dist']),
    //     new webpack.optimize.DedupePlugin(),
    //     new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    //     new webpack.optimize.UglifyJsPlugin()
    // ]
};
