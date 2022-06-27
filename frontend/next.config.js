const { locales } = require('./locales.config.json');

module.exports = {
  i18n: {
    locales: locales.map(({ locale }) => locale),
    defaultLocale: locales.find((locale) => locale.default).locale,
  },
  images: {
    domains: ['heco.vizzuality.com', 'staging.heco.vizzuality.com', 'staging.hecopilot.org'],
  },
  swcMinify: false,
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

    // Needed by react-map-gl 6.1 to use MapLibre instead of Mapbox GL JS:
    // https://github.com/visgl/react-map-gl/blob/6.1-release/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': 'maplibre-gl',
    };

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
  async redirects() {
    return [
      {
        source: '/discover',
        destination: '/discover/projects',
        permanent: true,
      },
    ];
  },
};
