import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

export const OurPartners = () => {
  const intl = useIntl();

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold md:text-4xl text-center">
        <FormattedMessage defaultMessage="About the partners" id="0CAqpl" />
      </h2>
      <div className="mt-8 space-y-6 md:mt-16 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 md:gap-6">
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/idb.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Inter-American Development Bank',
                id: 'AC6emZ',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="The Inter-American Development Bank (IDB) is the main source of multilateral financing and expertise for sustainable economic, social and institutional development in Latin America and the Caribbean. The IDB Natural Capital Lab works to drive innovation in natural capital finance by looking at nature as an asset."
              id="WJcNiD"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/wwf.png"
              width={348}
              height={124}
              objectFit="contain"
              alt={intl.formatMessage({ defaultMessage: 'WWF', id: 'cT6b2H' })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="World Wildlife Fund (WWF) is the largest international conservation organization in the world, with more than 50 offices implementing conservation projects across more than 100 countries and has a membership of almost five million people. WWF has extensive experience working in the Amazon region, with offices in all seven signatory countries of the Leticia Pact. In Colombia, WWF has been working in partnership with the government and a consortium of civil society organizations on Heritage Colombia since 2015."
              id="zkonnO"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/idb-lab.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Inter-American Development Bank Lab',
                id: 'QDj3j7',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="IDB Lab is the innovation laboratory of the Inter-American Development Back Group, the leading source of financing for improving lives in Latin America and the Caribbean. The IDB Lab promotes development through the private sector by identifying, supporting, testing, and piloting new solutions to development challenges. It seeks to create opportunities for poor and vulnerable populations affected by economic, social, or environmental factors in Latin America and the Caribbean."
              id="Gpyrow"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/paulson-institute.png"
              width={348}
              height={124}
              alt={intl.formatMessage({ defaultMessage: 'Paulson Institute', id: 'JRfERD' })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="Paulson Institute: The Paulson Institute (PI) is a non-partisan, independent “think and do tank” delivering solutions that contribute to a more resilient and sustainable world. PI operates at the intersection of economics, financial markets, and environmental protection by promoting market-based solutions to ensure green economic growth. Under their Financing Nature initiative, they are working to identify and implement innovative mechanisms that can rapidly mobilize substantial amounts of funding for nature conservation."
              id="qPKAOa"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/bc3.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Basque Centre for Climate Change',
                id: '6ukMW9',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="BC3's mission is to generate valuable knowledge for policy and decision making, integrating the environmental, socio-economic and ethical dimensions of climate change. Through the production of collaborative and open-source tools such as ARIES, which can track and forecast progress towards sustainable environmental and economic goals, BC3 plays a key role in enhancing regional, national and international economic development."
              id="HVQtvr"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/about-google.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Google Cloud',
                id: 'QlBsxM',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="Google Cloud accelerates every organization’s ability to digitally transform its business. We deliver enterprise-grade solutions that leverage Google’s cutting-edge technology – all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems."
              id="Ob7+Ly"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/about-fao-azul.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Food and Agriculture Organization of the United Nations - FAO',
                id: 'shhSYM',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="The FAO representation in Colombia seeks to improve agriculture and food through technical cooperation with the Government. It collaborates with governmental institutions, cooperation agencies, civil society, academia, and the private sector in areas such as food, agriculture, livestock, fishing, aquaculture, forestry management, and sustainable natural resource management. Additionally, the FAO supports the implementation of Point 1 of the Peace Agreement: Comprehensive Rural Reform. Its support to the national government aims to promote social and territorial cohesion in areas affected by the conflict."
              id="kmtD3U"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/about-ue.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Delegation of the European Union to Colombia',
                id: 'zuK4F3',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            <FormattedMessage
              defaultMessage="The entry into force of the Lisbon Treaty on December 1, 2009, marked the beginning of the European External Action Service. In 2011, the Delegation of the European Commission became the Delegation of the European Union in Colombia, with the status of a diplomatic embassy. Its Ambassador officially represents the European Union in Colombia. Adapting to contemporary challenges includes the defense of human rights, the preservation of peace, international security, and the prevention of internal conflicts—fundamental objectives of the EU's foreign policy."
              id="mILEhu"
            />
          </p>
        </div>
        <div className="p-4 sm:p-6 xl:p-10 bg-background-middle rounded-2xl">
          <div className="text-center">
            <Image
              src="/images/logos/about-maetd.png"
              width={348}
              height={124}
              alt={intl.formatMessage({
                defaultMessage: 'Government of Spain',
                id: 'AS8i3c',
              })}
            />
          </div>
          <p className="hidden mt-3 md:block sm:mt-6">
            {/* TODO: Add missing description (not yet available) */}
            {/* <FormattedMessage defaultMessage="" id="JH1fXz" /> */}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OurPartners;
