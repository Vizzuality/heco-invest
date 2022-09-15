import { GroupedEnums as GroupedEnumsType } from 'types/enums';
import { Project as ProjectType } from 'types/project';

export interface FundingProps {
  project: ProjectType;
  enums: GroupedEnumsType;
}
