const { override, fixBabelImports, addLessLoader, addWebpackAlias, addTslintLoader } = require('customize-cra')
const path = require('path')

// 关闭mapsource
const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    return config;
};

const optimize =()=>config=>{
  config.optimization ={
    splitChunks:{
      chunks: 'initial',
      minSize: 30000,
      maxSize: 1000000,
      minChunks: 1,
      maxInitialRequests: 6,
      cacheGroups:{
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: 'static/js/vendors.js',
        },
        default: { //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: 'static/js/common.js'
        }
      }
    }
  }
  return config;
}


module.exports = override(
  addTslintLoader(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addWebpackAlias({
    assets: path.resolve(__dirname, './src/assets'),
    routers: path.resolve(__dirname, './src/routers'),
    components: path.resolve(__dirname, './src/components'),
    views: path.resolve(__dirname, './src/views'),
    styles: path.resolve(__dirname, './src/styles')
  }),
  addLessLoader(),
  rewiredMap(),
  optimize()
)