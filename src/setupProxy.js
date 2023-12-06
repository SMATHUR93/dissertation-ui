const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/create-jira-ticket',
    createProxyMiddleware({
      target: 'http://localhost:3001', // Your Express server URL
      changeOrigin: true,
    })
  );
};
