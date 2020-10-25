let webapckMerge = require('webpack-merge');
const {execSync,exec} = require('child_process');
const {existsSync,mkdirSync} = require('fs');
let path = require('path');
let baseConfig = require('./webpack/webpack.base');
let prodConfig = require('./webpack/webpack.prod');
let devConfig = require('./webpack/webpack.dev');
let curConfig = {};
let fs = require('fs');
let projectName = 'comAdmin';

let outPathRelease = path.join(__dirname, `./dist`);
let outPathDev = path.join(__dirname, `./dist`);
//let outPathDev = path.join(__dirname, `./dist`);

//创建目录
mkdirsSyncFun(outPathRelease);
mkdirsSyncFun(outPathDev);

//循环创建目录
function mkdirsSyncFun(dirname, mode){
    if(existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSyncFun(path.dirname(dirname), mode)){
            mkdirSync(dirname, mode);
            return true;
        }
    }
}

function getCurConfig(){
    let argv = process.argv
    console.log('argv=' + argv);
    
    if((/webpack-dev-server|development/).test(argv)){
        curConfig = devConfig;
        curConfig.output.path = outPathDev;
        console.log('outPathDev='+ outPathDev);
    }else{
        //production
        curConfig = prodConfig;
        curConfig.output = {
            path:outPathRelease,
            filename: '[name].js',
            chunkFilename:'[name].chunk.js'
        }
    }
    curConfig = webapckMerge(baseConfig,curConfig);
    return curConfig;
};


let curWebpackConfig = getCurConfig();
console.log(`curWebpackConfig.output.path= ${curWebpackConfig.output.path}`);
module.exports = curWebpackConfig;
