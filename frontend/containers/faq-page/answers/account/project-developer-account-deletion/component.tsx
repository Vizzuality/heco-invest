import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const ProjectDeveloperAccountDeletion: FC = () => (
  <ol className="ml-6 list-disc">
    <li>
      <FormattedMessage
        defaultMessage="All information associated with the account will be deleted."
        id="mZF8ZA"
      />
    </li>
    <li>
      <FormattedMessage
        defaultMessage="All users associated with the account will be deleted."
        id="0u3Vzf"
      />
    </li>
    <li>
      <FormattedMessage
        defaultMessage="All content associated with the account will be deleted. If your Projects have applied to Open Calls, the owners of the Open Calls will be automatically notified that the Project no longer exists."
        id="xmwVn+"
      />
    </li>
  </ol>
);

export default ProjectDeveloperAccountDeletion;
