const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/query/projects/:idPr/image',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace with your Django server URL
      changeOrigin: true,
    })
  );
};