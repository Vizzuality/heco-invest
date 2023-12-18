import { FC } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import ImpactsList from 'containers/faq-page/answers/shared-lists/impacts';
import OnlinePresenceList from 'containers/faq-page/answers/shared-lists/online-presence';
import ProjectCategoriesList from 'containers/faq-page/answers/shared-lists/project-categories';
import FaqList, { ListItem, ItemValidationTypes } from 'containers/faq-page/faq-list';

export const ProjectDeveloperInfo: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create a Project Developer account you will need the following information."
          id="qpp+jm"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the Project Developer public profile page except questions 1 and 6."
          id="svQkqv"
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
          title={formatMessage({ defaultMessage: 'Account name', id: 'Gcv7QB' })}
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
                  'The email where you want to receive contacts from Investors or other Project Developers',
                id: 'ipYSrV',
              })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Phone number', id: 'jdJhOL' })}
              description={formatMessage({
                defaultMessage:
                  'The phone number for Investors or other Project Developers to reach you/your team',
                id: '7A5ik/',
              })}
            />
          </FaqList>
        </ListItem>
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Project Developer type', id: 'VavuU5' })}
        >
          <FaqList level="two">
            <ListItem title={formatMessage({ defaultMessage: 'Academic', id: 'mbxIJy' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Business', id: 'w1Fanr' })}>
              <FaqList level="three">
                <ListItem title={formatMessage({ defaultMessage: 'Cooperative', id: 'DTQxlC' })} />
                <ListItem
                  title={formatMessage({ defaultMessage: 'Large enterprise', id: 'LMjhPg' })}
                />
                <ListItem title={formatMessage({ defaultMessage: 'Corporation', id: 'psPbog' })} />
                <ListItem title={formatMessage({ defaultMessage: 'SME and MSME', id: 'CiYFzk' })} />
                <ListItem title={formatMessage({ defaultMessage: 'Startup', id: 'NxjUBO' })} />
                <ListItem title={formatMessage({ defaultMessage: 'Entrepreneur', id: 'XGd7Tu' })} />
                <ListItem
                  title={formatMessage({
                    defaultMessage: 'Trade or business association',
                    id: 'c8BbZZ',
                  })}
                />
              </FaqList>
            </ListItem>
            <ListItem title={formatMessage({ defaultMessage: 'Government', id: 'bh4rlK' })} />
            <FaqList level="three">
              <ListItem title={formatMessage({ defaultMessage: 'National', id: 'Oy4O4U' })} />
              <ListItem title={formatMessage({ defaultMessage: 'Sub-national', id: '5IVVec' })} />
              <ListItem
                title={formatMessage({
                  defaultMessage: 'Public-private organization',
                  id: 'L51On4',
                })}
              />
              <ListItem title={formatMessage({ defaultMessage: 'NGO', id: 'LDgw6G' })} />
              <ListItem
                title={formatMessage({ defaultMessage: 'IPLC organization', id: 'osBdnp' })}
              />
            </FaqList>
          </FaqList>
        </ListItem>
        <ListItem
          mandatory={true}
          title={formatMessage({
            defaultMessage: 'Entity legal registration number (NIT or RUT)',
            id: 'AiagLY',
          })}
          description={formatMessage({
            defaultMessage:
              'Add your legal registration number so we can verify your legal entity. This information will not be publicly available.',
            id: '02KfzX',
          })}
        />
        <ListItem
          title={formatMessage({
            defaultMessage: 'Online Presence',
            id: 'V+X/MZ',
          })}
        >
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
            defaultMessage: 'Select the topics/sector categories that you work on',
            id: 'LmHPHR',
          })}
        >
          <ProjectCategoriesList />
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: 'Expect to have impact on',
            id: 'YB8bt5',
          })}
        >
          <ImpactsList />
        </ListItem>
        <ListItem
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: 'Select HeCo priority landscapes on which you will have impact',
            id: 'XaFc9D',
          })}
        >
          <FaqList level="two">
            <ListItem title={formatMessage({ defaultMessage: 'Amazon Heart', id: 'SFGITa' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Amazonian Piedmont - Massif', id: '0ZkvWW' })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Caribbean', id: 'WMIv8o' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Central Mountain Range', id: 'JY/Ysq' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Eastern Mountain range', id: 'X1N5qH' })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Orinoquía', id: 'JHlWWV' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Orinoquía Transition', id: 'ybZSf7' })}
            />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Pacific - Caribbean Transition',
                id: 'fhLBuu',
              })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Pacific - Coastal Marine', id: 'jwiyhI' })}
            />
          </FaqList>
        </ListItem>
      </FaqList>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default ProjectDeveloperInfo;
