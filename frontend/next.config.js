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
  async rewrites() {
    if (process.env.NEXT_PUBLIC_PROXY_BACKEND !== 'true') return [];

    return [
      {
        source: '/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
    ];
  },
};
