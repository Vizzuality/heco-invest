import { FC } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import FaqList, { ListItem, ItemValidationTypes } from 'containers/faq-page/faq-list';

export const OpenCallInfo: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create an open call you will need the following information."
          id="iSPvEQ"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the open call public page."
          id="ltUH9L"
        />
      </p>
      <FaqList level="one">
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Open call name', id: '8Gp8gS' })}
        />
        <ListItem
          title={formatMessage({ defaultMessage: 'Picture', id: 'wvoA3H' })}
          description={formatMessage({
            defaultMessage: 'A picture can make your open call page more attractive.',
            id: 'iFQwyC',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Country', id: 'vONi+O' })}
        />
        <ListItem title={formatMessage({ defaultMessage: 'State', id: 'ku+mDU' })} />
        <ListItem title={formatMessage({ defaultMessage: 'Municipality', id: '9I1zvK' })} />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'What’s the open call about', id: '4zUbhC' })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Expected impact', id: 'XgaRPC' })}
          description={formatMessage({
            defaultMessage: 'Describe briefly the impact that the project is expected to generate.',
            id: 'jqCFCY',
          })}
        />
        <ListItem title={formatMessage({ defaultMessage: 'SDG’s', id: '/apC0L' })} />
        <ListItem
          mandatory={true}
          title={formatMessage({
            defaultMessage: 'Maximum funding available per project',
            id: '9GzPsf',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({
            defaultMessage: 'Financial instrument available',
            id: 'm38DjH',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({
            defaultMessage: 'Funding priorities',
            id: 'P1f6hp',
          })}
          description={formatMessage({
            defaultMessage: 'What type of projects the funding is covering.',
            id: 'b3Iz6I',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({
            defaultMessage: 'Funding exclusions',
            id: 'gQ16Mj',
          })}
          description={formatMessage({
            defaultMessage: 'What type of projects the funding is not covering.',
            id: 'ydCOwz',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Deadline', id: '8/Da7A' })}
        />
      </FaqList>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default OpenCallInfo;
