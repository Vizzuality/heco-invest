import { FC } from 'react';

import { useIntl } from 'react-intl';

import FaqList, { ListItem } from 'containers/faq-page/faq-list';

export const FundingTypesList: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <FaqList level="two">
      <ListItem
        title={formatMessage({ defaultMessage: '<US$25,000 (Small grants)', id: 'kZ0sht' })}
      />
      <ListItem
        title={formatMessage({
          defaultMessage: 'US$25,000 – 150,000 (Prototyping)',
          id: 'MZTu88',
        })}
      />
      <ListItem
        title={formatMessage({
          defaultMessage: 'US$150,000 – 750,000 (Market validation)',
          id: 'NLk0cp',
        })}
      />
      <ListItem
        title={formatMessage({
          defaultMessage: '> US$750,000 (Scaling)',
          id: 'E010/S',
        })}
      />
    </FaqList>
  );
};

export default FundingTypesList;
