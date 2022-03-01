const { locales } = require('./locales.config.json');

module.exports = {
  i18n: {
    locales: locales.map(({ locale }) => locale),
    defaultLocale: locales.find((locale) => locale.default).locale,
  },
  swcMinify: true,
  eslint: {
    dirs: [
      'components',
      'containers',
      'hoc',
      'hooks',
      'layouts',
      'lib',
      'pages',
      'services',
      'store',
      'types',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
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
