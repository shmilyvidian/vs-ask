const { override, fixBabelImports, addLessLoader, addWebpackAlias, addTslintLoader } = require('customize-cra')
const path = require('path')

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
  addLessLoader()
)