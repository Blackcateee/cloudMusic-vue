// vue.config.js
module.exports = {
  devServer:{
    proxy: {
      '/song': {  // 匹配以此开头的请求
        changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
        target: 'http://localhost:8083',  // 接口的域名
      }
    }
  }
}