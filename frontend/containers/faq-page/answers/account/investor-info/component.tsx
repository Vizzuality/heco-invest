import { FC } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

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
          <FaqList level="two">
            <ListItem title={formatMessage({ defaultMessage: 'Website', id: 'JkLHGw' })} />
            <ListItem title={formatMessage({ defaultMessage: 'LinkedIn', id: 'Rb/hb9' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Facebook', id: 'EmpHyB' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Twitter', id: '8ywLSf' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Instagram', id: '39PtLD' })} />
          </FaqList>
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
          <FaqList level="two">
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Sustainable agrosystem', id: 'hGDBI4' })}
              description={formatMessage({
                defaultMessage:
                  'sustainable and regenerative agriculture, fishing, and aquaculture as well as manufacturing of derived subproducts.',
                id: 'PFbrpZ',
              })}
            />
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Tourism and recreation', id: 'hOp4Ue' })}
              description={formatMessage({
                defaultMessage:
                  'accommodation, travel, transportation, hospitality, visitor experiences and eco-tourism projects.',
                id: 'MY++C0',
              })}
            />
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Forestry and agroforestry', id: 'sa2DTR' })}
              description={formatMessage({
                defaultMessage:
                  'sustainable timber extraction and forest management practices, including reforestation and restoration.',
                id: 'gbBVhv',
              })}
            />
            <ListItem
              inlineDescription={true}
              title={formatMessage({
                defaultMessage: 'Non-timber forest production',
                id: 'DZ+TNi',
              })}
              description={formatMessage({
                defaultMessage:
                  'production of health, wellness, and cosmetic products; art, clothing, and  handcrafted products; production of food and drinks.',
                id: 'YtyJ9Z',
              })}
            />
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Human capital and Inclusion', id: 'MEywfd' })}
              description={formatMessage({
                defaultMessage:
                  'adequate access to quality education, appropriate health services, and formal employment opportunities that respond to diverse skill profiles and are adapted to regional cultural diversity.',
                id: '+qyVem',
              })}
            />
          </FaqList>
        </ListItem>
        <ListItem
          title={formatMessage({
            defaultMessage: 'Select the ticket size(s) that you provide',
            id: 'G6tmT0',
          })}
        >
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
        </ListItem>
        <ListItem
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: '"Select the instrument type(s) you provide',
            id: 'QGF3ow',
          })}
        >
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
