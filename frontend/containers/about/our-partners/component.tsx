import { FormattedMessage } from 'react-intl';

import Card from './card';
import { usePartners } from './helpers';

export const OurPartners = () => {
  const partners = usePartners();

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold md:text-4xl text-center">
        <FormattedMessage defaultMessage="About the partners" id="0CAqpl" />
      </h2>
      <div className="mt-8 space-y-6 md:mt-16 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 md:gap-6">
        {partners.map(({ logo, text }) => (
          <Card key={logo.src} logo={logo}>
            {text}
          </Card>
        ))}
      </div>
    </div>
  );
};
export default OurPartners;
