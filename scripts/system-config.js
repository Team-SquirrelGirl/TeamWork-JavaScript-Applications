SystemJS.config({
 transpiler: 'plugin-babel',
 map: {
  'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
  'main': './scripts/main.js',
  'routing': './scripts/routing.js',
  'template-loader': './scripts/template-loader.js',
  'data': './scripts/data.js',
  'updateUI': './scripts/updateUI.js',
  'controllers': './scripts/controllers.js',
  'fb-authentication': './scripts/fb-authentication.js'
 }
});