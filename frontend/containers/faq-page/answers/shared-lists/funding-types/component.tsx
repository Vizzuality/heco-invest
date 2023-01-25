import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import FaqList, { ListItem } from 'containers/faq-page/faq-list';

export const FundingTypesList: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <FaqList level="two">
        <ListItem
          // Less than sign must be escaped with an apostrophe
          // https://github.com/formatjs/formatjs/issues/1845
          title={formatMessage({ defaultMessage: "'<US$25,000 (Small grants)", id: 'Uomdkb' })}
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
      <p className="font-normal text-gray-700">
        <FormattedMessage
          defaultMessage="The HeCo Invest platform uses the US dollar as the reference currency, taking into account that the platform is primarily aimed at international investors.  These investors usually use the US dollar as a reference currency which facilitates their understanding of the proposals presented on the platform."
          id="KdWzZW"
        />
      </p>
    </>
  );
};

export default FundingTypesList;
