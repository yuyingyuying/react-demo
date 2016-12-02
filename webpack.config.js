// var webpack = require('webpack');
// var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery':'jquery'});
module.exports = {
    entry:{
        index: './src/js/index.js',
    },
    output: {
       path: './static/',
       publicPath: 'http://localhost:8080/static/',
       filename: '[name].js' 
    },
    module: {
        loaders: [
            {test: /.js$/, loader: 'babel', query: { presets: ['react','es2015'] }, exclude: /node_modules/},
            {test: /.less$/, loader: 'style!css!less'},
            {test: /.(jpg|png)$/, loader: 'url?limit=8192'}
        ]
    }
}
