import React from 'react';

import { FormattedMessage } from 'react-intl';

import ImpactChart from 'components/impact-chart';
import LayoutContainer from 'components/layout-container';
import { ImpactProps } from 'layouts/project-page/impact/types';

export const Impact: React.FC<ImpactProps> = ({ project }: ImpactProps) => {
  // TODO: Change for real project attibute
  const projectImpact = [4, 6, 8, 3];
  return (
    <section>
      <LayoutContainer className="mb-20 space-y-6 mt-36">
        <h2 className="pl-16 font-serif text-3xl text-black">
          <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
        </h2>
        <div className="px-2 py-16 lg:justify-between sm:px-12 sm:py-20 lg:flex bg-background-greenLight rounded-2xl">
          <div>
            <h2>
              <FormattedMessage defaultMessage="Estimated Impact" id="PheCRL" />
            </h2>
          </div>
          <div className="py-10 pr-24 pl-28">
            <ImpactChart category={project.category} impact={projectImpact} />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Impact;
