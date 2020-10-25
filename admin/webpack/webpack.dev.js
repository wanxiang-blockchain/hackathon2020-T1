let path = require('path');
let projectName = 'yourAppName';
let outPathDev = path.join(__dirname, `../dist`);
let killPort = require('kill-port');
killPort('7080');
module.exports = {
    //context: sourcePath,
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        chunkFilename:'[name].chunk.js',
        path:outPathDev,
        //publicPath:'/'
    },
    devServer:{
        host: 'localhost',
        port:7080,
        hot: true,
        inline: true,
        historyApiFallback: {
            disableDotRule: true
        },
        stats: 'minimal',
        clientLogLevel: 'warning',
        proxy: {
            /*
            '/': {
                //target: "http://172.16.211.113:8007",
                target: "http://172.16.211.114:8007/",
                secure: false, 
                changeOrigin: true
            }
            */
        }
    }  
};