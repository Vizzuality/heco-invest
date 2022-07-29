import { FC } from 'react';

import { useIntl } from 'react-intl';

import FaqList, { ListItem } from 'containers/faq-page/faq-list';

export const ImpactsList: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <FaqList level="two">
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Biodiversity', id: 'mbTJWV' })}
        description={formatMessage({
          defaultMessage:
            'Impact of projects on biodiversity conservation, calculated from indicators of endemism, land conservation/restoration, connectivity, and development of sustainable social projects.',
          id: 'DrtKvj',
        })}
      />
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Climate', id: 'MuOp0t' })}
        description={formatMessage({
          defaultMessage:
            'Impact of projects that reduce carbon emissions from the land sector (deforestation/degradation), as wood and soil biomass as well as application of sustainable forest measures.',
          id: 'sWdxgq',
        })}
      />
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Community', id: '4CrCbD' })}
        description={formatMessage({
          defaultMessage:
            'Impact of projects on ensuring and improving equal and inclusive physical, mental, economic, and spiritual health.',
          id: 'lpyO42',
        })}
      />
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Water', id: 't7YvMF' })}
        description={formatMessage({
          defaultMessage:
            'Impact of projects  managing water cycling, quality and availability as well as the management of associated risks.',
          id: '3BIClA',
        })}
      />
    </FaqList>
  );
};

export default ImpactsList;
