
const release = 'test-sentry'
process.env.RELEASE_VERSION = release
const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = {
//   chainWebpack (config) {
//     config.entry('main').add('babel-polyfill')
//   }
  publicPath:"./",
  // productionSourceMap: true,
  // RELEASE_VERSION:`${release}`,
  configureWebpack: config=>{
    if(process.env.NODE_ENV === 'production'){
      return {
        devtool:"source-map",
        plugins: [
          new SentryCliPlugin({
            include: "./dist", // 作用的文件夹
            release: process.env.RELEASE_VERSION, // 一致的版本号
            configFile: "sentry.properties", // 不用改
            ignore: ['node_modules', 'vue.config.js'],
            urlPrefix: "~/",
          })
        ]
      }
    }
  },
  chainWebpack(config){
    // config.module
    // .rule('source-map')
    // .test(/\.js$/)
    // .pre()
    // .use('source-map-loader')
    // .loader('source-map-loader')
  }

}
