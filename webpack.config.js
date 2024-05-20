const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "net": require.resolve("net-browserify"),
            "tls": require.resolve("tls-browserify"),
            "stream": require.resolve("stream-browserify"),
            "timers": require.resolve("timers-browserify"),
            "fs": false 
        }
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    mode: isProduction ? 'production' : 'development',
};

module.exports = config;
