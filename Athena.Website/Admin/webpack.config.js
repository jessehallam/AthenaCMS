const path = require('path');

const INPUT_PATH = __dirname;
const OUTPUT_PATH = path.resolve(__dirname, '../wwwroot/admin/dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',

    entry: {
        main: ['@babel/polyfill', path.join(INPUT_PATH, 'index.tsx')]
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },

            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: 'file-loader'
            }
        ]
    },

    output: {
        filename: '[name].js',
        path: OUTPUT_PATH,
        publicPath: '/admin/dist/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(INPUT_PATH, 'index.html')
        })
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    }
};
