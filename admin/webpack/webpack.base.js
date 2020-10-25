let path = require('path');
let webpack = require('webpack');
let projectName = 'commonMessageIndex';
let sourcePath = path.join(__dirname, './../src');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
let outPathDev = path.join(__dirname, `../dist`);
// plugins
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let WebpackCleanupPlugin = require('webpack-cleanup-plugin');
let CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    context: sourcePath,
    entry: {
        //config:path.join(__dirname, `../config.js`),
        [projectName]: path.join(__dirname, `../src/${projectName}.tsx`)
    },
    output:{
        filename: '[name].js',
        chunkFilename:'[name].chunk.js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx','.jsx','.less','.css'],
        //建立别名
        alias: {
            "@static": path.join(__dirname, `../src/static`),
            "@views": path.join(__dirname, `../src/views`),
            "@utils": path.join(__dirname, `../src/utils`),
            "@dataModel": path.join(__dirname, `../src/dataModel`),
            "@comModules": path.join(__dirname, `../src/comModules`),
            "@gComponents": path.join(__dirname, `../src/gComponents`)
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  getCustomTransformers: () => ({
                    before: [ tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: true
                      }) ]
                  }),
                  compilerOptions: {
                    module: 'es2015'
                  }
                },
                exclude: /node_modules/
            },
              /*
            //.ts, .tsx 后缀文件
            {
                test: /\.tsx?$/,
                use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly:true,
                            getCustomTransformers:()=>({
                                before:[tsImportPluginFactory()]
                            }),
                            compilerOptions:{
                                module:'es2015'
                            }
                        }
                    }
                ]
            },
            */
            //.css后缀文件
            {
                test: /\.css$/,
                use: [
                    {loader:'style-loader'},
                    {loader: 'css-loader'},
                    //{loader: 'postcss-loader'}
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    //{loader:'postcss-loader'},
                    {
                        loader:'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }, {
                test: /\.(a?png|jpe?g|gif|svg)$/,
                use: 'url-loader?limit=10240'
            }, {
                test: /\.(bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new DllReferencePlugin({
            context: '.',
            manifest:require('../dllVendor/vendor.manifest.json')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
          "_": "lodash"
        }),
        //主页面
        new HtmlWebpackPlugin({
            template:path.join(__dirname,`./../src/${projectName}.html`),
            filename:`index.html`,
            inject: 'body',
            //hash: true, //为静态资源生成hash值
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new CopyPlugin({
            patterns: [
              { from: '../src/static/images/favicon.ico', to: `${outPathDev}/favicon.ico`}
            ],
        }),
        new AddAssetHtmlWebpackPlugin({
			filepath: path.resolve(__dirname, '../dllVendor/vendor.dll.js')  // 指你要往生成的Html中加入什么内容
        })
    ]
};