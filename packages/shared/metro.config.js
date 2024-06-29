const path = require('path');
const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

module.exports = {
  /* existing config */
  transformer: {
    unstable_allowRequireContext: true,
  },
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs'],
  },
};