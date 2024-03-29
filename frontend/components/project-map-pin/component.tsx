import { FC, Fragment } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Button from 'components/button';
import Icon from 'components/icon';

import MapPinIcon from 'svgs/project/marker.svg';
// VERIFICATION PROJECTS: HIDDEN
// import TrustedMapPinIcon from 'svgs/project/trusted-marker.svg';

import { ProjectMapPinProps } from './types';

export const ProjectMapPin: FC<ProjectMapPinProps> = ({ category, interactive = true }) => {
  const Container = ({ children }) =>
    interactive ? (
      <Button theme="naked" size="smallest" className="focus-visible:outline-green-dark">
        {children}
      </Button>
    ) : (
      <Fragment>{children}</Fragment>
    );

  return (
    <Container>
      {interactive && (
        <span className="sr-only">
          {/* VERIFICATION PROJECTS: HIDDEN
        {trusted && <FormattedMessage defaultMessage="Open verified project" id="9fHGyd" />}
        {!trusted && <FormattedMessage defaultMessage="Open project" id="fUM67k" />}
        */}
          <FormattedMessage defaultMessage="Open project" id="fUM67k" />
        </span>
      )}
      <Icon
        // VERIFICATION PROJECTS: HIDDEN
        // icon={trusted ? TrustedMapPinIcon : MapPinIcon}
        icon={MapPinIcon}
        className={cx({
          'fill-category-tourism text-category-tourism': category === 'sustainable-tourism',
          'fill-category-production text-category-production':
            category === 'non-timber-forest-production',
          'fill-category-agrosystems text-category-agrosystems':
            category === 'sustainable-agrosystems',
          'fill-category-forestry text-category-forestry': category === 'forestry-and-agroforestry',
          'fill-category-human text-category-human': category === 'human-capital-and-inclusion',
        })}
      />
    </Container>
  );
};

export default ProjectMapPin;
