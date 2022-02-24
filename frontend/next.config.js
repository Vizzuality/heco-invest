module.exports = {
  i18n: {
    locales: ['en', 'es', 'pt'],
    // If you modify the default locale, modify `setCurrentLocale` in `pages/_app.tsx` as well
    defaultLocale: 'es',
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
