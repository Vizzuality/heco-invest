import { FC } from 'react';

import { useIntl } from 'react-intl';

import FaqList, { ListItem } from 'containers/faq-page/faq-list';

export const FinancialInstrumentsList: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <FaqList level="two">
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Loan', id: 'OkH5va' })}
        description={formatMessage({
          defaultMessage:
            'a loan is a transaction in which a financial institution grants a predefined amount of money to develop a particular project. The institution or business that receives the loan is obliged to repay it within a certain period of time and to pay the agreed commissions, expenses and interest.',
          id: 'C3hduB',
        })}
      />
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Grant', id: '3ciGOS' })}
        description={formatMessage({
          defaultMessage:
            'technical cooperation grants are resources provided by an entity to fulfil a well-defined purpose or objective. In general, they are non-reimbursable resources that are destined in particular to projects or enterprises in early stages of development.',
          id: 'NP4Cd6',
        })}
      />
      <ListItem
        inlineDescription={true}
        title={formatMessage({ defaultMessage: 'Equity', id: 'Kub2g2' })}
        description={formatMessage({
          defaultMessage:
            'an equity investment consists of the acquisition, by an entity specialized in private equity, of a package of shares of a company or enterprise. The private equity firm thus becomes one of the owners of the company.',
          id: 'TkWozN',
        })}
      />
    </FaqList>
  );
};

export default FinancialInstrumentsList;
