require('babel-register');
var getConfig = require('hjs-webpack');
var PublicPage = require('./src/pages/public').default;
var LayoutPage = require('./src/layout').default;
var React = require('react');
var ReactDomServer = require('react-dom/server');

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  html: function(context) {
    return {
      '200.html': context.defaultTemplate(),
      'index.html': context.defaultTemplate()
    }
  }
});
