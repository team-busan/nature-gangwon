const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://nature-gangwon.shop",
      changeOrigin: true,
    })
  );

  app.use(
    "/naver",
    createProxyMiddleware({
      target: "https://naveropenapi.apigw.ntruss.com/map-direction/v1",
      changeOrigin: true,
    })
  );
};
