import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Card from './card';
import { useNumCols, usePartnersMatrix } from './helpers';

export const OurPartners = () => {
  const partnersMatrix = usePartnersMatrix();
  const numCols = useNumCols();

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold md:text-4xl text-center">
        <FormattedMessage defaultMessage="About the partners" id="0CAqpl" />
      </h2>
      <div className="flex flex-row gap-6 mt-14">
        {partnersMatrix.map((columnPartners, columnIdx) => (
          <div
            key={columnIdx}
            className={cx({
              'flex flex-col gap-6': true,
              'basis-1/3': numCols === 3,
              'basis-1/2': numCols === 2,
              'w-full': numCols === 1,
            })}
          >
            {columnPartners.map(({ logo, text }) => (
              <Card key={logo.src} logo={logo}>
                {text}
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurPartners;
