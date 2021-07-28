module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 配置代理服务器/api，解决本地跨域问题
  // devServer: {
  //   host: "localhost",
  //   port: 8080,
  //   open: true,
  //   proxy: {
  //     "/api": {
  //       target: "",	// 隐藏了接口
  //       secure: true, //若为https则需设置为true
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "/api"
  //       }
  //     }
  //   }
  // },
  runtimeCompiler: true
};
