const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://nature-gangwon.shop",
      changeOrigin: true,
    })
  );

  app.user(
    createProxyMiddleware("/naver", {
      target: "https://naveropenapi.apigw.ntruss.com/map-direction/v1",
      changeOrigin: true,
    })
  );
};
