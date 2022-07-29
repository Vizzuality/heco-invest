import { FC } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import FinancialInstrumentsList from 'containers/faq-page/answers/shared-lists/financial-instruments';
import FundingTypesList from 'containers/faq-page/answers/shared-lists/funding-types';
import ImpactsList from 'containers/faq-page/answers/shared-lists/impacts';
import OnlinePresenceList from 'containers/faq-page/answers/shared-lists/online-presence';
import ProjectCategoriesList from 'containers/faq-page/answers/shared-lists/project-categories';
import FaqList, { ListItem, ItemValidationTypes } from 'containers/faq-page/faq-list';

export const InvestorInfo: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create an Investor account you will need the following information."
          id="pHaFj5"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the Investor public profile page except questions."
          id="0v43t3"
        />
      </p>
      <FaqList level="one">
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Account language', id: 'WU9L8h' })}
          description={formatMessage({
            defaultMessage:
              'Select the account language in which you want to write the content of this account (including profile information and future projects). This will avoid mixed content in the platform.',
            id: 'si4NjO',
          })}
        />
        <ListItem
          title={formatMessage({ defaultMessage: 'Picture', id: 'wvoA3H' })}
          description={formatMessage({
            defaultMessage: 'Add your logo or a picture that identifies the account.',
            id: '2Cbk6h',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Profile name', id: 's+n2ku' })}
          description={formatMessage({
            defaultMessage: 'The name that will identify the account across the platform.',
            id: 'nlIkQG',
          })}
        />
        <ListItem title={formatMessage({ defaultMessage: 'Contacts', id: '4S241U' })}>
          <FaqList level="two">
            <ListItem
              mandatory={true}
              title={formatMessage({ defaultMessage: 'Email', id: 'sy+pv5' })}
              description={formatMessage({
                defaultMessage:
                  'The email where you want to receive contacts from Project Developers or other Investors',
                id: 'z3jrKr',
              })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Phone number', id: 'jdJhOL' })}
              description={formatMessage({
                defaultMessage:
                  'The phone number for Project Developers or other Investors to reach you/your team',
                id: 'rbmO5C',
              })}
            />
          </FaqList>
        </ListItem>
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Investor/ Funder type', id: 'roJe5R' })}
        >
          <FaqList level="two">
            <ListItem title={formatMessage({ defaultMessage: 'Investor', id: 'nEvNJb' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Angel investor', id: 'fW6hrZ' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Commercial bank', id: 'g8xSgQ' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Family office', id: 'CtWJFx' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Institutional investor', id: 'g5JslF' })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Investment bank', id: '3i3sH1' })} />
            <ListItem
              title={formatMessage({
                defaultMessage: 'International Financial Institution',
                id: 'E/uR6M',
              })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Micro finance', id: 'ygx9Jx' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Non-VC Investment vehicle', id: 'VNrnq9' })}
            />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Venture capital / private equity',
                id: 'tjj29g',
              })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Carbon fund', id: 'MmBQFd' })} />
            <ListItem title={formatMessage({ defaultMessage: 'NGO', id: 'LDgw6G' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Foundation', id: 'q9swhp' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Corporate foundation', id: 'Qd/1Cb' })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Philanthropy', id: 'RPrfBJ' })} />
            <ListItem
              title={formatMessage({
                defaultMessage: 'High-Net-Worth Individual (HNWI) or celebrity',
                id: 'A/or0n',
              })}
            />
          </FaqList>
        </ListItem>
        <ListItem title={formatMessage({ defaultMessage: 'Online Presence', id: 'V+X/MZ' })}>
          <OnlinePresenceList />
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'About', id: 'g5pX+a' })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'What’s your mission?', id: 't39CQq' })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: 'Topics/sector categories that interests you',
            id: '9o8/Wn',
          })}
        >
          <ProjectCategoriesList />
        </ListItem>
        <ListItem
          title={formatMessage({
            defaultMessage: 'Select the ticket size(s) that you provide',
            id: 'G6tmT0',
          })}
        >
          <FundingTypesList />
        </ListItem>
        <ListItem
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: '"Select the instrument type(s) you provide',
            id: 'QGF3ow',
          })}
        >
          <FinancialInstrumentsList />
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.YesNo}
          title={formatMessage({
            defaultMessage: 'Have you previously invested in impact?',
            id: '8XJceA',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Impact you prioritize', id: 'zfuq6W' })}
        >
          <ImpactsList />
        </ListItem>
        <ListItem title={formatMessage({ defaultMessage: 'SDG’s', id: '/apC0L' })} />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({
            defaultMessage: 'What type of projects are you prioritizing?',
            id: 'stKKFV',
          })}
        />
        <ListItem
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Other relevant information', id: 'ee3r6Y' })}
        />
      </FaqList>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default InvestorInfo;
