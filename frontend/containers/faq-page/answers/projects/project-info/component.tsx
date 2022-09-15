import { FC } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import FinancialInstrumentsList from 'containers/faq-page/answers/shared-lists/financial-instruments';
import FundingTypesList from 'containers/faq-page/answers/shared-lists/funding-types';
import ProjectCategoriesList from 'containers/faq-page/answers/shared-lists/project-categories';
import FaqList, { ListItem, ItemValidationTypes } from 'containers/faq-page/faq-list';

export const ProjectInfo: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create a project you will need the following information."
          id="ET6OJw"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the project public page except questions 20 and 21."
          id="qyN+gs"
        />
      </p>
      <FaqList level="one">
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Project name', id: 'D5RCKi' })}
          description={formatMessage({
            defaultMessage: 'A great name is short, crisp, and easily understood.',
            id: 'rPwaWt',
          })}
        />
        <ListItem
          title={formatMessage({ defaultMessage: 'Project pictures', id: '/FrBTj' })}
          description={formatMessage({
            defaultMessage:
              'The project gallery will be the first thing other users will see on your page, it will help you to showcase your project.',
            id: '6cU2pG',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Location', id: 'rvirM2' })}
          description={formatMessage({
            defaultMessage: 'Country, Municipality, State',
            id: 'ANTAp/',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({ defaultMessage: 'Location Area', id: '0Bne2n' })}
          description={formatMessage({
            defaultMessage:
              'Draw on the map or upload a file with the geographical area your project will have an impact on.',
            id: 'YEYmEz',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.YesNo}
          title={formatMessage({
            defaultMessage: 'Are there other Project developers involved in the project?',
            id: 'Xk8qys',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({
            defaultMessage: 'Stage of development or maturity of the project',
            id: 'jUgR7w',
          })}
          description={formatMessage({
            defaultMessage:
              'Select the stage of development of the project or solution at the time of submitting this pitch',
            id: '3hV8r4',
          })}
        >
          <FaqList level="two">
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Scaling - up', id: '0ch6f/' })}
              description={formatMessage({
                defaultMessage:
                  'consolidated, demonstrated project or solution that seeks to be scaled or replicated in other contexts and/or geographies.',
                id: 'CIcAVo',
              })}
            />
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Consolidation', id: 'xG6n98' })}
              description={formatMessage({
                defaultMessage:
                  'project or solution already in implementation that seeks to be strengthened and consolidated.',
                id: 'q0vlJx',
              })}
            />
            <ListItem
              inlineDescription={true}
              title={formatMessage({ defaultMessage: 'Incipient', id: '5/UUMs' })}
              description={formatMessage({
                defaultMessage: 'idea to be developed from scratch.',
                id: 'ui0dk9',
              })}
            />
          </FaqList>
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max36Months}
          title={formatMessage({
            defaultMessage: 'Estimated duration of the project',
            id: 'Oc8Fmg',
          })}
          description={formatMessage({
            defaultMessage: 'Enter the estimated implementation duration for the project.',
            id: '0WuJfZ',
          })}
        />
        <ListItem
          mandatory={true}
          title={formatMessage({
            defaultMessage: 'Which of these topics/sector categories better describe your project?',
            id: 'i2AgQl',
          })}
          description={formatMessage({
            defaultMessage:
              'Select the stage of development of the project or solution at the time of submitting this pitch',
            id: '3hV8r4',
          })}
        >
          <ProjectCategoriesList />
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Problem you are solving', id: 'xBZz+E' })}
          description={formatMessage({
            defaultMessage:
              "Describe the problem or market need that your project or solution seeks to address. It should be a very specific problem, not a macro global issue like 'climate change' or 'poverty'. Make sure that you're showing that the problem is addressing a specific demand (is real) and it affects the poor and vulnerable population and/or the environment. We recommend using numbers to give a dimension of the problem.",
            id: 'ZZPfwt',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({
            defaultMessage: 'The solution or opportunity proposed',
            id: 'OSAxiC',
          })}
          description={formatMessage({
            defaultMessage:
              'Describe the project or solution and describe clearly why you consider it is innovative, different from others and how it can generate an important change and impact towards the target groups. Highlight the characteristics that may attract partners, clients, or investors.',
            id: 'eXDHt0',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: 'Target group',
            id: '0L/mZC',
          })}
          description={formatMessage({
            defaultMessage:
              'Identify the target group(s) of this solution. Try to be very specific and do not cover an unrealistic range of beneficiaries or clients.',
            id: 'Zht65f',
          })}
        >
          <FaqList level="two">
            <ListItem title={formatMessage({ defaultMessage: 'Farmers', id: 'zLCDho' })} />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Entrepreneurs and innovators - startups',
                id: '/3K+SA',
              })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Small and medium businesses', id: 'Kx1fFv' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Urban populations', id: 'MfSkhN' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Indigenous peoples', id: '4+kVuu' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Afro-descendant peoples', id: 'rPEEqE' })}
            />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Peasants and traditional inhabitants',
                id: 'jCeHSc',
              })}
            />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Migrants and displaced groups',
                id: 'EmEy56',
              })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Groups with disabilities', id: 'tAug9g' })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'LGTBQ+ groups', id: 'jC4Plq' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Others', id: 'fqJtkV' })} />
          </FaqList>
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Expected impact', id: 'XgaRPC' })}
          description={formatMessage({
            defaultMessage:
              'Identify the target group(s) of this solution. Try to be very specific and do not cover an unrealistic range of beneficiaries or clients.',
            id: 'Zht65f',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: 'Select which areas your project will have an impact on',
            id: 'hg7Mex',
          })}
          description={formatMessage({
            defaultMessage: 'This will help us measuring the impact of your project.',
            id: '3npveQ',
          })}
        >
          <FaqList level="two">
            <ListItem title={formatMessage({ defaultMessage: 'Conservation', id: '3BcZ1K' })} />
            <ListItem title={formatMessage({ defaultMessage: 'Restoration', id: 'cIQfgu' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Pollutants reduction', id: 'u2WlCd' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Carbon emission reduction', id: 'rtcoCk' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Energy efficiency', id: '3zi0sq' })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Renewable energy', id: 'Kt3qxl' })} />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Carbon storage or sequestration',
                id: '49OGbh',
              })}
            />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Water capacity or efficiency',
                id: '+tol9p',
              })}
            />
            <ListItem
              title={formatMessage({
                defaultMessage: 'Hydrometeorological risk reduction',
                id: 'lfXAQ2',
              })}
            />
            <ListItem title={formatMessage({ defaultMessage: 'Sustainable food', id: 'V1MZuC' })} />
            <ListItem
              title={formatMessage({ defaultMessage: 'Gender equality jobs', id: 'vNQnTR' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Indigenous or ethnic jobs', id: 'nafhHM' })}
            />
            <ListItem
              title={formatMessage({ defaultMessage: 'Community empowerment', id: 'MQoSiG' })}
            />
          </FaqList>
        </ListItem>
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.SelectMultiple}
          title={formatMessage({
            defaultMessage: 'Select in which SDG’s your project will have impact',
            id: 'CPO6eS',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.YesNo}
          title={formatMessage({
            defaultMessage: 'Are you currently looking for funding?',
            id: 'u/E7xG',
          })}
        />
        <ListItem
          validationType={ItemValidationTypes.SelectOne}
          title={formatMessage({
            defaultMessage: 'Funding needed',
            id: 'LanZ2z',
          })}
        >
          <FundingTypesList />
        </ListItem>
        <ListItem
          validationType={ItemValidationTypes.SelectOne}
          title={formatMessage({
            defaultMessage: 'Financial instrument',
            id: '+Hbd1j',
          })}
        >
          <FinancialInstrumentsList />
        </ListItem>
        <ListItem
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'How will the money be used?', id: '1t1fGY' })}
          description={formatMessage({
            defaultMessage:
              'Please briefly describe the main groups of activities or components for the implementation of the project. It is not necessary to be very detailed, just a logical sequence of the general lines of action. These groups of activities should be used to define the estimated budget below.',
            id: '+4Udxw',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.YesNo}
          title={formatMessage({
            defaultMessage: 'Has this project been funded before?',
            id: 'GdS9Mk',
          })}
        />
        <ListItem
          title={formatMessage({
            defaultMessage: 'How much money did the project received or raised?',
            id: 'Nqe54a',
          })}
        />
        <ListItem
          title={formatMessage({
            defaultMessage: 'From which investor or funder?',
            id: 'SXKvVa',
          })}
        />
        <ListItem
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Replicability of the project', id: 'qoImFc' })}
          description={formatMessage({
            defaultMessage:
              'Explain how the solution or project can be replicated in other contexts and geographies. Think practically about the existing opportunities, the partners and allies needed as well as the barriers that this replication effort may face such as climate issues, regulations and legal frameworks, land tenure, institutional capacity, etc.',
            id: '6MoU6D',
          })}
        />
        <ListItem
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Sustainability of the project', id: '8MAKwj' })}
          description={formatMessage({
            defaultMessage:
              'Explain how the impact of the solution or project will be maintained after funding.  Try to be specific and not too vague. Is the solution or project will be financially viable? How? What are the key elements to ensure sustainability (business model, partners, partnerships with governments, etc.)?',
            id: 'oN8abW',
          })}
        />
        <ListItem
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({ defaultMessage: 'Progress and impact tracking', id: 'JJQfhh' })}
          description={formatMessage({
            defaultMessage:
              'How do you plan to measure the progress and impact of the project or solution? What would be the key indicators to be used for these measurements?',
            id: 'yb3Bot',
          })}
        />
        <ListItem
          mandatory={true}
          validationType={ItemValidationTypes.Max600Chars}
          title={formatMessage({
            defaultMessage: 'Short description of the project',
            id: 'YWQkk+',
          })}
          description={formatMessage({
            defaultMessage:
              "This description should succinctly explain your project. It should be a catching text since it's the first thing investors will read.",
            id: 'VaC9C0',
          })}
        />
        <ListItem
          title={formatMessage({
            defaultMessage: 'Relevant links',
            id: 'Si0U4V',
          })}
          description={formatMessage({
            defaultMessage:
              'Use this space to share links to documents, videos and websites that support your pitch.',
            id: 'efZTBX',
          })}
        />
      </FaqList>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default ProjectInfo;
