import { yupResolver } from '@hookform/resolvers/yup';

import investorSchema from 'schemas/investor';
import { InvestorForm } from 'types/investor';

export default (section: number) => {
  return yupResolver(investorSchema(section));
};

export const formPageInputs: (keyof InvestorForm)[][] = [
  ['language'],
  [
    'picture',
    'name',
    'investor_type',
    'about',
    'mission',
    'contact_email',
    'contact_phone',
    'website',
    'linkedin',
    'instagram',
    'facebook',
    'twitter',
  ],
  ['categories', 'ticket_sizes', 'instrument_types'],
  ['previously_invested', 'impacts', 'sdgs'],
  ['prioritized_projects_description'],
  ['other_information'],
];
