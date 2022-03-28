import { useState } from 'react';

import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { loadI18nMessages } from 'helpers/i18n';

import MultiPageLayout, { Page, OutroPage } from 'containers/multi-page-layout';

import Head from 'components/head';
import NakedPageLayout, { NakedPageLayoutProps } from 'layouts/naked-page';
import { PageComponent } from 'types';

export async function getServerSideProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

const NewInvestorPage: PageComponent<{}, NakedPageLayoutProps> = (props) => {
  const intl = useIntl();
  const router = useRouter();

  const hasErrors: boolean = false;
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleNextClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseClick = () => {
    router.push('/');
  };

  const handleSubmitClick = () => {
    setIsFormComplete(true);
  };

  const handleCompleteClick = () => {
    router.push('/');
  };

  return (
    <>
      <Head
        title={intl.formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })}
      />

      <MultiPageLayout
        layout="narrow"
        title={intl.formatMessage({ defaultMessage: 'Setup investor profile', id: '7Rh11y' })}
        autoNavigation={false}
        outroButtonText={intl.formatMessage({
          defaultMessage: 'See my profile',
          id: 'TH786p',
        })}
        page={currentPage}
        alert={
          hasErrors
            ? intl.formatMessage({
                defaultMessage:
                  'Something went wrong while submitting your form. Please correct the errors before submitting again.',
                id: 'WTuVeL',
              })
            : null
        }
        isSubmitting={false}
        showOutro={isFormComplete}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        onPageClick={handlePageClick}
        onCloseClick={handleCloseClick}
        onSubmitClick={handleSubmitClick}
        onCompleteClick={handleCompleteClick}
      >
        <Page hasErrors={false}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at cursus erat, in
            auctor leo. Cras condimentum in lectus blandit finibus. Cras a pulvinar orci. Sed sit
            amet arcu laoreet, ultrices leo quis, posuere mauris. Ut facilisis ornare consectetur.
            Maecenas consectetur, neque id lobortis luctus, ligula erat rutrum tellus, eu blandit
            ante sapien et quam. Morbi vitae tellus aliquam, sollicitudin diam eget, rhoncus urna.
            Morbi odio dui, congue a blandit id, fermentum id nibh. Duis auctor fringilla nibh.
            Vestibulum egestas arcu in ipsum sodales, ac tristique tellus ultrices. Etiam porttitor
            elit sit amet arcu aliquet, vel dictum nibh hendrerit.
          </p>
          <p className="mt-4">
            In iaculis scelerisque eros eu condimentum. Vivamus ornare tellus lacus, quis rutrum mi
            tempus et. Sed blandit a magna elementum egestas. Maecenas laoreet congue sagittis.
            Curabitur ac porta ligula. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Sed eu velit vitae enim gravida placerat. Cras vulputate
            non odio sit amet dignissim. Ut tincidunt ut nibh sit amet mollis. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi mauris justo,
            finibus et felis sed, pretium tincidunt nisi. Praesent vehicula efficitur quam eget
            lobortis. Vestibulum ligula ante, rutrum commodo orci at, consectetur maximus diam.
            Donec vitae odio feugiat felis pulvinar sollicitudin vel vel lacus. Nunc aliquet ex
            vitae massa posuere efficitur. Ut quam dolor, sagittis id mauris ac, placerat malesuada
            est.
          </p>
          <p className="mt-4">
            Sed finibus viverra nisi, vulputate elementum mauris ornare sed. Praesent ac faucibus
            velit. Sed malesuada vitae ipsum quis imperdiet. Proin semper aliquet nibh bibendum
            tincidunt. Cras id ipsum a nibh pretium rutrum. Nulla eget tempor odio. Donec ac tempus
            orci. Vivamus accumsan ultricies nisl, non malesuada erat auctor at. Phasellus dapibus
            nisi condimentum mauris cursus vehicula. Fusce scelerisque diam vitae ligula aliquet
            tincidunt.
          </p>
          <p className="mt-4">
            Donec maximus, odio lobortis sodales tristique, eros metus pharetra velit, eu dictum
            justo nibh a quam. Proin accumsan justo id quam accumsan fermentum. Morbi hendrerit
            blandit massa, ut aliquet tellus facilisis quis. Ut a nulla in ante ultrices fringilla
            eu ac ante. Ut blandit sem eget urna consectetur mattis. Donec maximus dolor sit amet
            consequat maximus. Mauris sollicitudin, nisl ac placerat egestas, urna libero accumsan
            magna, eu ullamcorper odio ipsum pellentesque ipsum. Nulla non tincidunt sem. Quisque
            dui ex, posuere quis purus quis, egestas congue ipsum. In quis mi ut lectus vestibulum
            iaculis vitae ac magna. In tristique pharetra ante, non varius ante convallis commodo.
            Maecenas ut cursus nisi.
          </p>
          <p className="mt-4">
            Praesent quis enim turpis. Aenean vel tempus augue, placerat ultrices risus. Aliquam ex
            risus, viverra ut dui in, bibendum dictum nisl. Vivamus sodales efficitur aliquet.
            Mauris id iaculis turpis, ut scelerisque felis. Vestibulum vulputate mattis enim. Sed
            rutrum purus non augue vulputate tristique. Ut malesuada feugiat leo, eu lobortis lectus
            tristique lobortis. Aliquam commodo lacus nec magna aliquam, eu tristique ligula
            malesuada.
          </p>
        </Page>
        <Page hasErrors={false}>
          <p>
            Mauris pellentesque dignissim tellus in semper. Proin ut tincidunt diam, ut fringilla
            justo. Praesent sed vehicula mauris. Suspendisse eu augue mauris. Nullam ultricies urna
            sit amet ante consequat malesuada. Vestibulum libero dui, aliquet quis lacinia eu,
            tincidunt non lacus. Phasellus viverra placerat vehicula. Integer non lobortis ex, vitae
            faucibus ante. Ut interdum rutrum ex, eget eleifend erat iaculis at. Duis commodo luctus
            augue, eget tempus odio sagittis sit amet.
          </p>
          <p>
            Aliquam eu ultrices dui, eu ornare mi. Suspendisse vestibulum scelerisque ligula
            placerat molestie. Nulla mauris nibh, bibendum vitae ante at, pretium commodo sapien.
            Donec semper placerat dui vel congue. Cras tempus lectus et massa pulvinar, in feugiat
            orci scelerisque. In hac habitasse platea dictumst. Donec semper efficitur ipsum vitae
            semper. Quisque feugiat luctus molestie. Vivamus tristique odio ac pretium pellentesque.
            Nam elit turpis, pharetra ac pretium at, consectetur at quam. Donec nec turpis lobortis,
            lobortis nulla vitae, porta magna. Maecenas efficitur rhoncus magna, a tincidunt neque
            consequat sit amet. Suspendisse potenti. Pellentesque volutpat interdum nunc eget
            vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Suspendisse a lobortis orci.
          </p>
          <p>
            Quisque elementum dignissim neque et tempor. Integer malesuada nulla nec elit consequat
            pharetra. Vivamus eget placerat mauris. Mauris bibendum consequat odio, non pellentesque
            dolor sagittis id. Nullam quis venenatis nibh. Quisque semper in velit et semper. Nam
            sit amet felis at diam dictum aliquam. Maecenas velit tellus, dignissim vel porttitor
            molestie, euismod sed risus. Pellentesque eu lacus ut arcu fermentum aliquet. Donec
            dignissim egestas enim sed ornare. Etiam quis ornare metus. In hac habitasse platea
            dictumst. Integer vitae ante porta, porta eros eget, luctus diam. Nullam eget neque
            suscipit, aliquet odio non, ultricies felis.
          </p>
        </Page>
        <Page hasErrors={false}>
          <p>
            Quisque nec egestas velit. Vivamus et sem nec est tristique gravida. Donec consectetur
            porta dignissim. Vivamus nunc libero, porttitor at dolor at, egestas eleifend augue.
            Curabitur diam neque, malesuada eu tortor eget, malesuada ultricies quam. Cras eu
            rhoncus tortor. Curabitur pharetra ligula ultrices, eleifend sapien sit amet, hendrerit
            erat. Duis sit amet eros lobortis, sollicitudin risus a, efficitur sem. Praesent feugiat
            viverra libero vel semper. Sed ut tellus vel dolor tristique aliquet a vitae eros.
          </p>
        </Page>

        <OutroPage>
          <h1 className="font-serif text-2xl font-light sm:text-3xl">
            What would you like to do next?
          </h1>
        </OutroPage>
      </MultiPageLayout>
    </>
  );
};

NewInvestorPage.layout = {
  Component: NakedPageLayout,
};

export default NewInvestorPage;
