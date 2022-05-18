const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../layouts/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../containers/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next',
    'storybook-react-intl',
    'storybook-addon-mock/register',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  /* nextjs -> no need to import React and can use alias modules */
  webpackFinal: async (config) => {
    // *************************
    // RESOLVE node_modules
    // If you want to add a directory to search in that takes precedence over node_modules/:
    // https://webpack.js.org/configuration/resolve/#resolvemodules
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];

    // Needed by react-map-gl 6.1 to use MapLibre instead of Mapbox GL JS:
    // https://github.com/visgl/react-map-gl/blob/6.1-release/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'mapbox-gl': 'maplibre-gl'
    };

    // *************************
    // SVGS
    // Remove how storybook is handling the svgs. They are using file-loader
    // https://github.com/JetBrains/svg-sprite-loader/issues/267
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test?.toString().includes('svg')) {
        const test = rule.test.toString().replace('svg|', '').replace(/\//g, '');
        return { ...rule, test: new RegExp(test) };
      } else {
        return rule;
      }
    });

    // Add custom loaders for svgs
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
