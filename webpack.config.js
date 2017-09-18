'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development'; // позволяем компилить в 2 режима
const webpack = require('webpack'); // используем компоненты webpack
const path = require('path'); // патч для указания расположения файлы

module.exports = {
    entry: './frontend/main', // указываем наш основной файл
    output: {
        filename: 'build.js', // переименовываем
        path: path.resolve(__dirname, 'public') // выкладываем по url файл
    },

    watch: NODE_ENV === 'development', // работает либо в NODE_ENV либо development, выдаем результат на продакшн

    watchOptions: {
        aggregateTimeout: 100 //через 100 мс будет обновление, webpack ждет пока всё обновится
    },

    plugins: [ // импортируем плагины
        new webpack.DefinePlugin({ // используем компоненты webpack
            NODE_ENV: JSON.stringify(NODE_ENV), // исключаем ошибки
            LANG:JSON.stringify('ru') // ставим язык
        }),
    ],

    module: { // импортируем модули
        loaders: [
            {
                test: /\.jsx$/, // регулярка
                loader: 'babel' // babel компилит из нового js в старый
            }
        ]
    }
};

/** Минифицируем на продакшн **/
if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false, // не нужно предупреждений
                drop_console: true, // консоль можно убрать
                unsafe: true // разрешить убрать небезопасные штуки
            }
        })
    )
}