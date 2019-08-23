const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(
    "/ser",{
          target: "http://42.159.90.42:80",
          changeOrigin: true
      }),
  )
};