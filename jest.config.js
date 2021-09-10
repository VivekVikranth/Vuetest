module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!@babel), /node_modules/(?!vue-typeahead-bootstrap)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.{js}',
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover bootstrap file
  ],
};
