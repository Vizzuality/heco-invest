import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import Icon from 'components/icon';
import { Paths } from 'enums';

import NoResultsIcon from 'svgs/discover/no-results.svg';

const DiscoverNoResults = () => {
  const { pathname } = useRouter();
  const { formatMessage } = useIntl();

  const tabs = {
    [Paths.Projects]: formatMessage({ defaultMessage: 'project', id: 'RbFAl7' }),
    [Paths.ProjectDevelopers]: formatMessage({ defaultMessage: 'project developer', id: 'SEnqhq' }),
    [Paths.OpenCalls]: formatMessage({ defaultMessage: 'open call', id: 'fmTQay' }),
    [Paths.Investors]: formatMessage({ defaultMessage: 'investor', id: '8Fez6i' }),
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-sm m-auto text-center lg:max-w-md md:-mt-10 xl:-mt-20">
      <Icon className="w-18 h-18" icon={NoResultsIcon} />
      <h1 className="mt-8 text-lg font-semibold text-green-dark">
        <FormattedMessage defaultMessage="Nothing found" id="bz4Mm+" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="No {tab} matches the keywords you’ve entered. Please <n>try another term</n> or <n>select a filter</n>."
          id="h2D2Rm"
          values={{
            tab: tabs[pathname],
            n: (chunk: string) => <span className="font-semibold">{chunk}</span>,
          }}
        />
      </p>
    </div>
  );
};

export default DiscoverNoResults;
