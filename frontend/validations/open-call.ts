import { yupResolver } from '@hookform/resolvers/yup';

import openCallSchemma from 'schemas/open-call';
import { OpenCallForm } from 'types/open-calls';

export default (section: number) => {
  return yupResolver(openCallSchemma(section));
};

export const formPageInputs: Partial<keyof OpenCallForm>[][] = [
  ['name', 'picture', 'country_id', 'department_id', 'municipality_id', 'description'],
  ['impact_description', 'sdgs'],
  ['maximum_funding_per_project', 'instrument_types', 'funding_priorities', 'funding_exclusions'],
  ['closing_at'],
];
