import { FormattedMessage } from 'react-intl';

import Icon from 'components/icon';
import LayoutContainer from 'components/layout-container';

import ConnectIcon from 'svgs/home/connect.svg';
import CreateAccountIcon from 'svgs/home/create-account.svg';
import SearchFindIcon from 'svgs/home/search-find.svg';

export const FooterBanner = () => (
  <div className="py-16 mt-24 sm:py-28 bg-background-middle">
    <LayoutContainer>
      <h2 className="max-w-md mx-auto font-serif text-2xl font-bold text-center sm:max-w-xl md:max-w-4xl sm:text-3xl md:text-5xl">
        <FormattedMessage defaultMessage="How it works" id="HK3ph8" />
      </h2>
      <p className="max-w-md mx-auto mt-4 text-base text-center md:mt-8 sm:max-w-xl md:max-w-4xl sm:text-lg md:text-xl">
        <FormattedMessage
          defaultMessage="Reach out for what you are looking for, from either <span>Investors</span> or <span>Project Developers</span> and <span>start the conversation</span>. Make sure to update us to help us track your contribution to preserving the Amazon: <span>the future is in your hands too!</span>"
          id="Y7/cBd"
          values={{
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </p>
      <div className="grid grid-rows-3 gap-6 mt-12 md:mt-20 md:grid-rows-none md:grid-cols-3">
        <div className="px-6 py-6 text-center md:py-10 bg-green-light/20 rounded-4xl">
          <Icon
            icon={SearchFindIcon}
            className="w-24 h-24 p-3 mx-auto bg-white rounded-full text-green-dark"
          />
          <h3 className="mt-4 text-xl font-medium uppercase md:mt-14">
            <FormattedMessage defaultMessage="Search and find" id="oiQKNY" />
          </h3>
          <p className="mt-2 md:mt-2.5 text-black/70">
            <FormattedMessage
              defaultMessage="Use our Artificial Intellience tool powered by ARIES, to help you identify what best fits your specific needs."
              id="yXFDuu"
            />
          </p>
        </div>
        <div className="px-6 py-6 text-center md:py-10 bg-green-light/20 rounded-4xl">
          <Icon
            icon={ConnectIcon}
            className="w-24 h-24 p-3 mx-auto bg-white rounded-full text-green-dark"
          />
          <h3 className="mt-4 text-xl font-medium uppercase md:mt-14">
            <FormattedMessage defaultMessage="Connect" id="+vVZ/G" />
          </h3>
          <p className="mt-2 md:mt-2.5 text-black/70">
            <FormattedMessage
              defaultMessage="Start connecting with people to create impact. You can find investors, opportunities to invest in and much much more..."
              id="xusigZ"
            />
          </p>
        </div>
        <div className="px-6 py-6 text-center md:py-10 bg-green-light/20 rounded-4xl">
          <Icon
            icon={CreateAccountIcon}
            className="w-24 h-24 p-3 mx-auto bg-white rounded-full text-green-dark"
          />
          <h3 className="mt-4 text-xl font-medium uppercase md:mt-14">
            <FormattedMessage defaultMessage="Report back" id="RczAkW" />
          </h3>
          <p className="mt-2 md:mt-2.5 text-black/70">
            <FormattedMessage
              defaultMessage="Inspire and educate other users by coming back to the platform and updating us on your progress. We’ll be able to track the Amazon’s improvement thanks to your contribution!"
              id="O1mdXY"
            />
          </p>
        </div>
      </div>
    </LayoutContainer>
  </div>
);

export default FooterBanner;
