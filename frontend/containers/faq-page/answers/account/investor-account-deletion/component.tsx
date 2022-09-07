import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const InvestorAccountDeletion: FC = () => (
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
        defaultMessage="All content associated with the account will be deleted. If you have created Open Calls to which some Projects have applied, the owners of these Projects will be automatically notified that the Open Call no longer exists."
        id="CqohYm"
      />
    </li>
  </ol>
);

export default InvestorAccountDeletion;
