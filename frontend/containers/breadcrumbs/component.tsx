import { FC } from 'react';

import { useIntl } from 'react-intl';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Paths } from 'enums';

import type { BreadcrumbsProps } from './types';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  className,
  substitutions: propSubstitutions = {},
}: BreadcrumbsProps) => {
  const intl = useIntl();
  const { route, asPath } = useRouter();

  // Predefined substitutions for this project. Ideally this would live in a constants file,
  // but due to the need to use `react-intl` they're kept here.
  const substitutions = {
    'project-developer': {
      name: intl.formatMessage({ defaultMessage: 'Project Developers', id: '+K9fF0' }),
      link: Paths.ProjectDevelopers,
    },
    project: {
      name: intl.formatMessage({ defaultMessage: 'Projects', id: 'UxTJRa' }),
      link: Paths.Projects,
    },
    'open-call': {
      name: intl.formatMessage({ defaultMessage: 'Open Calls', id: 'wpyHb9' }),
      link: Paths.OpenCalls,
    },
    investor: {
      name: intl.formatMessage({ defaultMessage: 'Investors', id: 'zdIaHp' }),
      link: Paths.Investors,
    },
  };

  const routeSegments: string[] = route.split('/').slice(1);
  const pathSegments: string[] = asPath.split('/').slice(1);

  const nameFromPathname = (text: string): string =>
    text
      .replace(/(-|_)/, ' ') // Change Dashes and Underscores into spaces
      .split(' ') // Split into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Uppercase words' first letters
      .join(' '); // Join back into a string

  const breadcrumbs: {
    name: string;
    link: string;
  }[] = routeSegments
    .reduce((acc, segment, index) => {
      // Detect whether a route/path segment is for a dynamic route and extract the [param].
      const match: RegExpExecArray = /^\[(.*)\]$/.exec(segment);
      const query: string = match && match[1];

      // Figuring out the name to display on the breadcrumb
      const name: string =
        // Name passed as a substitution via prop
        propSubstitutions[query]?.name ||
        propSubstitutions[segment]?.name ||
        // or name defined in the internal substitutions
        substitutions[segment]?.name ||
        // or as a fallback, we'll use the query or, if none, the route segment itself
        nameFromPathname(query || segment);

      // path is only used in this reducer to automatically build links
      const lastPath: string = acc.length ? acc[acc.length - 1].path : '';
      const path: string = `${lastPath}/${pathSegments[index]}`;

      // Use the path as a link unless a link unless one has been specified in the substitutions
      // Figuring out the link the breadcrumb should link to
      const link: string =
        // Link passed as a substitution via prop
        propSubstitutions[query]?.link ||
        propSubstitutions[segment]?.link ||
        // or link defined in the internal substitutions
        substitutions[segment]?.link ||
        // or as a fallback, we'll use the path
        path;

      acc.push({ name, path, link });

      return acc;
    }, [])
    .map(({ name, link }) => ({ name, link }));

  return (
    <nav
      className={className}
      aria-label={intl.formatMessage({ defaultMessage: 'Breadcrumbs', id: 'ByoZDD' })}
    >
      <ol className="flex gap-3 text-sm text-gray-400">
        {breadcrumbs.map(({ name, link }, index) => {
          const isLastBreadcrumb = index === breadcrumbs.length - 1;

          return (
            <li key={name}>
              <Link key={link} href={link}>
                <a
                  className={cx({
                    'transition-all rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark':
                      true,
                    'text-black cursor-pointer': isLastBreadcrumb,
                  })}
                  aria-current={isLastBreadcrumb ? 'location' : false}
                >
                  {name}
                </a>
              </Link>
              {!isLastBreadcrumb && (
                <span aria-hidden="true" className="ml-3">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
