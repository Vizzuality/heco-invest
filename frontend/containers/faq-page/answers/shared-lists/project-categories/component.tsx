import { FC } from 'react';

import { useIntl } from 'react-intl';

import FaqList, { ListItem } from 'containers/faq-page/faq-list';

export const ProjectCategoriesList: FC = () => {
  const { formatMessage } = useIntl();

  return (
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
        title={formatMessage({ defaultMessage: 'Sustainable tourism', id: 'h6nP4+' })}
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
  );
};

export default ProjectCategoriesList;
