import { FC } from 'react';

import { useIntl } from 'react-intl';

import FaqList, { ListItem } from 'containers/faq-page/faq-list';

export const OnlinePresenceList: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <FaqList level="two">
      <ListItem title={formatMessage({ defaultMessage: 'Website', id: 'JkLHGw' })} />
      <ListItem title={formatMessage({ defaultMessage: 'LinkedIn', id: 'Rb/hb9' })} />
      <ListItem title={formatMessage({ defaultMessage: 'Facebook', id: 'EmpHyB' })} />
      <ListItem title={formatMessage({ defaultMessage: 'Twitter', id: '8ywLSf' })} />
      <ListItem title={formatMessage({ defaultMessage: 'Instagram', id: '39PtLD' })} />
    </FaqList>
  );
};

export default OnlinePresenceList;
