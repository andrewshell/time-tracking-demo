module.exports = {
  plugins: {
    'tailwindcss': './tailwind.js',
    'postcss-modules': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        'nesting-rules': true
      }
    }
  }
};
