import { useMemo } from 'react';

import { useIntl } from 'react-intl';

export const useAlliesLogos = () => {
  const { formatMessage } = useIntl();

  return useMemo(
    () => [
      // ROW 1
      [
        {
          src: '/images/logos/allies-heco.png',
          alt: formatMessage({ defaultMessage: 'Herencia Colombia', id: 'nZhcAT' }),
          width: 214,
          height: 150,
        },
      ],
      // ROW 2
      [
        {
          src: '/images/logos/allies-presidencia-colombia.png',
          alt: formatMessage({ defaultMessage: 'Presidencia de Colombia', id: 'xxILzE' }),
          width: 162,
          height: 80,
        },
        {
          src: '/images/logos/allies-ministerior-ambiente.png',
          alt: formatMessage({
            defaultMessage: 'Ministerio de ambiente y desarrollo sostenible',
            id: 'ko1LXm',
          }),
          width: 183,
          height: 80,
        },
        {
          src: '/images/logos/allies-departamento-nacional-planeacion.png',
          alt: formatMessage({
            defaultMessage: 'Departamiento Nacional de Planeacion',
            id: 'hSzbKu',
          }),
          width: 256,
          height: 80,
        },
      ],
      // ROW 3
      [
        {
          src: '/images/logos/allies-parques-nacionales-naturales.png',
          alt: formatMessage({
            defaultMessage: 'Unidad Administrativa de Parques Nacionales Naturales de Colombia',
            id: '3rQrSS',
          }),
          width: 150,
          height: 80,
        },
        {
          src: '/images/logos/allies-patrimonio-natural.png',
          alt: formatMessage({
            defaultMessage: 'Patrimonio Natural',
            id: 'orvj8F',
          }),
          width: 114,
          height: 80,
        },
        {
          src: '/images/logos/allies-gordon-betty-moore.png',
          alt: formatMessage({
            defaultMessage: 'Gordon and Betty Moore Foundation',
            id: 'P8c19Y',
          }),
          width: 114,
          height: 80,
        },
        {
          src: '/images/logos/allies-ci-colombia.png',
          alt: formatMessage({
            defaultMessage: 'Conservation International',
            id: '/HOZmK',
          }),
          width: 80,
          height: 80,
        },
        {
          src: '/images/logos/allies-wcs.png',
          alt: formatMessage({
            defaultMessage: 'Wildlife Conservation Society',
            id: 'UgHwIR',
          }),
          width: 84,
          height: 80,
        },
        {
          src: '/images/logos/allies-wwf.png',
          alt: formatMessage({
            defaultMessage: 'World Wildlife Fund',
            id: 'V7dSXH',
          }),
          width: 64,
          height: 80,
        },
        {
          src: '/images/logos/allies-andes-amazon-fund.png',
          alt: formatMessage({
            defaultMessage: 'Andes Amazon Fund',
            id: 'sFd7gz',
          }),
          width: 53,
          height: 80,
        },
        {
          src: '/images/logos/allies-the-nature-conservancy.png',
          alt: formatMessage({
            defaultMessage: 'The Nature Conservancy',
            id: 'MStfWd',
          }),
          width: 160,
          height: 80,
        },
        {
          src: '/images/logos/allies-bezos-earth-fund.png',
          alt: formatMessage({
            defaultMessage: 'Bezos Earth Fund',
            id: 'FDU8fT',
          }),
          width: 122,
          height: 80,
        },
      ],
    ],
    [formatMessage]
  );
};

export const useSupportedByLogos = () => {
  const { formatMessage } = useIntl();

  return useMemo(
    () => [
      {
        src: '/images/logos/supported-by-volo-foundation.png',
        alt: formatMessage({
          defaultMessage: 'Volo Fundation',
          id: 'bovYQa',
        }),
        width: 59,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-bobolink-fundacion.png',
        alt: formatMessage({
          defaultMessage: 'Bobolink Fundacion',
          id: 'fgdxhB',
        }),
        width: 59,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-global-environment-facility.png',
        alt: formatMessage({
          defaultMessage: 'Global environment facility',
          id: 'idE0oW',
        }),
        width: 122,
        height: 54,
      },
      {
        src: '/images/logos/supported-by-un-development-programme.png',
        alt: formatMessage({
          defaultMessage: 'United Nations Development Programme',
          id: 'Pmm0Xv',
        }),
        width: 51,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-the-world-bank.png',
        alt: formatMessage({
          defaultMessage: 'The World Bank',
          id: 'QkxMUG',
        }),
        width: 98,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-eu.png',
        alt: formatMessage({
          defaultMessage: 'European Union',
          id: 'eRRmEa',
        }),
        width: 58,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-fao-un.png',
        alt: formatMessage({
          defaultMessage: 'Food and Agriculture Organization of the United Nations - FAO',
          id: 'shhSYM',
        }),
        width: 242,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-trillion-trees.png',
        alt: formatMessage({
          defaultMessage: 'Trillion Trees',
          id: '3PNhOL',
        }),
        width: 123,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-bid.png',
        alt: formatMessage({
          defaultMessage: 'Inter American Development Bank',
          id: 'I8phsw',
        }),
        width: 94,
        height: 56,
      },
      {
        src: '/images/logos/supported-by-green-climate-fund.png',
        alt: formatMessage({
          defaultMessage: 'Green Climate Fund',
          id: 'IKpwpU',
        }),
        width: 92,
        height: 56,
      },
    ],
    [formatMessage]
  );
};
