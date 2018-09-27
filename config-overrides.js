const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  config = rewireCssModules(config, env);

  require('react-app-rewire-postcss')(config);

  return config;
}
