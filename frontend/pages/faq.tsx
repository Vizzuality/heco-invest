import { useEffect, useRef } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { withLocalizedRequests } from 'hoc/locale';

import { motion } from 'framer-motion';

import { useFaq, FaqSections, FaqQuestions } from 'hooks/useFaq';
import { useScrollToElement } from 'hooks/useScrollToElement';

import { loadI18nMessages } from 'helpers/i18n';

import FaqExpando from 'containers/faq-page/faq-expando';

import Button from 'components/button';
import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

export const getServerSideProps = withLocalizedRequests(async (context) => {
  // Property 'query' does not exist on type 'GetStaticPropsContext<ParsedUrlQuery, PreviewData>'
  /** @ts-ignore */
  const { locale, query } = context;
  const { sectionId, questionId } = query;

  const sectionExists = Object.values(FaqSections).includes(sectionId as FaqSections);
  const questionExists = Object.values(FaqQuestions).includes(questionId as FaqQuestions);

  if (!!sectionId && !sectionExists) {
    return { notFound: true };
  }

  if (!!questionId && !questionExists) {
    return { notFound: true };
  }

  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type FaqPageProps = {};

const FaqPage: PageComponent<FaqPageProps, StaticPageLayoutProps> = () => {
  const intl = useIntl();
  const router = useRouter();
  const containerRef = useRef(null);
  const faqs = useFaq();
  const scrollToElement = useScrollToElement();

  const { sectionId, questionId } = router.query;

  // Default to 'Account' if there is no sectionId in the url
  const activeSection = sectionId ?? Object.values(FaqSections)[0];

  const faqItems = faqs.find(({ sectionId: id }) => activeSection === id)?.items || [];

  const animationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // We need to ensure that, when the user changes sections, it can see the "top" of the
  // expandos section at the very least. If they can't, we scroll them up to the top of
  // the FAQ aside/main container. Not scrolling to the very top of the page because at
  // this point the user has already read it and scrolled past to it.
  // The reason for this check is that, without this, the user could be at the very bottom
  // of a section, or looking at the footer, and upon clicking to change sections they'd still
  // be stuck at the bottom of the view. .
  useEffect(() => {
    const container = containerRef?.current;

    if (!container || !window) return;

    const positionY = container?.getBoundingClientRect()?.top;
    const windowH = window.innerHeight;
    const shouldScroll = !(positionY - 96 >= 0 && positionY <= windowH);

    if (!shouldScroll) return;

    scrollToElement(containerRef, 96);
  }, [scrollToElement, sectionId]);

  return (
    <>
      <Head
        title={intl.formatMessage({ defaultMessage: 'Frequently Asked Questions', id: 'QA1wrZ' })}
      />

      <LayoutContainer className="mt-8 mb-20 lg:mb-32 bg-background-light">
        <h1 className="font-serif text-3xl font-semibold md:text-4xl">
          <FormattedMessage defaultMessage="We are here to help you" id="IQTULX" />
        </h1>
        <p className="my-3 text-lg text-gray-600 md:my-8">
          <FormattedMessage
            defaultMessage="Browse thought the most frequently asked questions."
            id="jN8Kad"
          />
        </p>

        <hr className="my-8 border-t-background-dark" />

        <div
          ref={containerRef}
          className="relative flex flex-col gap-8 mt-8 md:gap-10 lg:gap-48 2xl:gap-72 lg:flex-row"
        >
          <aside className="justify-start lg:sticky md:self-start md:top-32">
            {faqs.map(({ sectionId: id, name }) => (
              <Button
                key={id}
                theme="naked"
                onClick={() => {
                  router.push(`/faq/${id}`, undefined, { shallow: true });
                }}
                className={cx({
                  'whitespace-nowrap text-sm text-left focus-visible:outline-green-dark': true,
                  'text-green-dark': activeSection === id,
                })}
              >
                {name}
              </Button>
            ))}
          </aside>
          <motion.main className="w-full" key={sectionId as string} {...animationVariants}>
            <div className="border-t border-l border-r rounded-lg shadow-sm border-bg-dark">
              {faqItems.map(({ questionId: id, question, answer }, index) => (
                <FaqExpando
                  className={cx({
                    'rounded-t-lg': index === 0,
                    'rounded-b-lg': index === faqItems.length - 1,
                  })}
                  key={id}
                  defaultOpen={(questionId as FaqQuestions) === id}
                  questionId={id}
                  question={question}
                >
                  {answer}
                </FaqExpando>
              ))}
            </div>
          </motion.main>
        </div>
      </LayoutContainer>
    </>
  );
};

FaqPage.layout = {
  props: {
    footerProps: {
      className: 'mt-0',
    },
  },
};

export default FaqPage;
