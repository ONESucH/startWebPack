'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: './main',
    output: {
        filename: 'build.js',
        library: 'main'
    },

    watch: NODE_ENV === 'development', // работает либо в NODE_ENV либо development, выдаем результат на продакшн

    watchOptions: {
        aggregateTimeout: 100 //через 100 мс будет обновление, webpack ждет пока всё обновится
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV), // исключаем ошибки
            LANG:JSON.stringify('ru') // ставим язык
        })
    ],

    module: {
        loaders: [
            {
                test: /\.jsx$/, // регулярка
                loader: 'babel' // babel компили из нового js в старый
            }
        ]
    }
};