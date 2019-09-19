const path = require('path');
const { ProvidePlugin } = require('webpack');

module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'index')
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
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
            }
        ]
    },

    output: {
        filename: 'plugin.admin-custom-fields.js',
        path: path.join(__dirname, 'lib')
    },

    plugins: [
        new ProvidePlugin({
            //react: 'react'
        })
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    }
};
