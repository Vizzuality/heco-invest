import { OpenCall } from 'types/open-calls';
import { Project as ProjectType } from 'types/project';

export interface OverviewProps {
  project?: ProjectType;
  openCall?: OpenCall;
}
