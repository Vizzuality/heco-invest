import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { QueryClient, dehydrate } from 'react-query';

import { useRouter } from 'next/router';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import { CategoryTagDot } from 'containers/category-tag';
import MultiPageLayout, { Page } from 'containers/multi-page-layout';
import TagsGrid from 'containers/tags-grid';

import Combobox, { Option } from 'components/forms/combobox';
import ErrorMessage from 'components/forms/error-message';
import FieldInfo from 'components/forms/field-info';
import Input from 'components/forms/input';
import Label from 'components/forms/label';
import Tag from 'components/forms/tag';
import TagGroup from 'components/forms/tag-group';
import Textarea from 'components/forms/textarea';
import Head from 'components/head';
import NakedPageLayout, { NakedPageLayoutProps } from 'layouts/naked-page';
import { PageComponent } from 'types';
import { ProjectForm } from 'types/project';
import useProjectValidation from 'validations/project';

import { useEnums } from 'services/enums/enumService';
import { CategoryType } from 'types/category';

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient();

  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type ProjectProps = InferGetStaticPropsType<typeof getStaticProps>;

const Project: PageComponent<ProjectProps, NakedPageLayoutProps> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const { formatMessage } = useIntl();
  const resolver = useProjectValidation(currentPage);
  const { push } = useRouter();

  const { data } = useEnums();
  const { category } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
    clearErrors,
  } = useForm<ProjectForm>({
    resolver,
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const handleCreate = useCallback(
    (data: ProjectForm) =>
      // createProjectDeveloper.mutate(data, {
      //   onError: handleServiceErrors,
      //   onSuccess: () => {
      //     push('/project-developers/pending');
      //   },
      // }),
      console.log(data),
    []
  );

  const onSubmit: SubmitHandler<ProjectForm> = (values) => {
    if (currentPage === 6) {
      handleCreate(values);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNextClick = async () => {
    await handleSubmit(onSubmit)();
    // if (!errors) {
    setCurrentPage(currentPage + 1);
    // }
  };

  return (
    <>
      <Head
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
      />
      <MultiPageLayout
        layout="narrow"
        title={formatMessage({ defaultMessage: 'Setup project developer’s account', id: 'bhxvPM' })}
        autoNavigation={false}
        page={currentPage}
        // alert={getAlert()}
        // isSubmitting={createProjectDeveloper.isLoading}
        showOutro={false}
        onNextClick={handleNextClick}
        onPreviousClick={() => setCurrentPage(currentPage - 1)}
        showProgressBar
        onCloseClick={() => setShowLeave(true)}
        // onSubmitClick={handleSubmit(onSubmit)}
      >
        <Page>
          <h1 className="font-serif text-3xl font-semibold mb-2.5">
            <FormattedMessage defaultMessage="Project information" id="5c08Qp" />
          </h1>
          <p className="mb-10 text-gray-600">
            <FormattedMessage
              defaultMessage="This information will be visible in the project page when you launch it."
              id="avVMND"
            />
          </p>
          <form>
            <div className="mb-6.5">
              <Label htmlFor="name">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Project name" id="D5RCKi" />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage: 'A great name is short, crisp, and easily understood.',
                    id: 'rPwaWt',
                  })}
                />
              </Label>
              <Input
                register={register}
                name="name"
                id="name"
                type="text"
                className="mt-2.5"
                placeholder={formatMessage({
                  defaultMessage: 'insert the project name',
                  id: 'iD2hRt',
                })}
              />
              <ErrorMessage id="name" errorText={errors?.name?.message} />
            </div>
            <div className="mb-6.5">
              <Label htmlFor="project-gallery">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Project gallery (optional)" id="7aTDQM" />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'The project gallery will be the first thing other users will see on you page, it will help you to showcase you project.',
                    id: 'c1m3Q7',
                  })}
                />
              </Label>
              {/* Gallery Upload - project_gallery */}
              <ErrorMessage id="name" errorText={errors?.project_gallery?.message} />
            </div>
            <div className="mb-6.5">
              <p className="mb-2.5 text-gray-600">
                <FormattedMessage defaultMessage="Location" id="rvirM2" />
              </p>
              <div className="gap-8 md:flex">
                <div className="w-full">
                  <Label htmlFor="country">
                    <span className="mr-2.5">
                      <FormattedMessage defaultMessage="Country" id="vONi+O" />
                    </span>
                    {/* Combobox - country_id */}
                    <ErrorMessage id="name" errorText={errors?.country_id?.message} />
                  </Label>
                </div>
                <div className="w-full">
                  <Label htmlFor="municipality">
                    <span className="mr-2.5">
                      <FormattedMessage defaultMessage="State" id="ku+mDU" />
                    </span>
                    {/* Combobox - municipality_id */}
                    <ErrorMessage id="name" errorText={errors?.department_id?.message} />
                  </Label>
                </div>
                <div className="w-full">
                  <Label htmlFor="department">
                    <span className="mr-2.5">
                      <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />
                    </span>
                  </Label>
                  {/* Combobox - department_id */}
                  <ErrorMessage id="name" errorText={errors?.municipality_id?.message} />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="location">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Draw or upload your location" id="MHwpc4" />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Draw on the map or upload a file with the geographical area your project will have an impact on.',
                    id: 'YEYmEz',
                  })}
                />
              </Label>
              {/* Shapefile button - location */}
              {/* Map - location */}
              <ErrorMessage id="name" errorText={errors?.location?.message} />
            </div>
            <div className="mb-6.5">
              <p className="mb-2.5 text-gray-600">
                <FormattedMessage defaultMessage="Project developers" id="0wBg9P" />
              </p>
              <Label htmlFor="involved-project-developer">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="Are there other Project developers involved in the project?"
                    id="Xk8qys"
                  />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage: 'Do you have a partnership with someone else?',
                    id: 'nbqoY2',
                  })}
                />
              </Label>
              {/* involved_project_developer_ids */}
              <ErrorMessage
                id="name"
                errorText={errors?.involved_project_developer_ids?.[0].message}
              />
            </div>
          </form>
        </Page>
        <Page>
          <h1 className="font-serif text-3xl font-semibold mb-2.5">
            <FormattedMessage defaultMessage="Description of the project" id="35YoEI" />
          </h1>
          <p className="mb-10 text-gray-600">
            <FormattedMessage
              defaultMessage="Tell us what is the project about the problem and the solution to solve it"
              id="/m/QYW"
            />
          </p>
          <form>
            <div>
              <p className="mb-2.5 text-gray-600 text-base font-medium">
                <FormattedMessage defaultMessage="Development of the project" id="ztd20l" />
              </p>
              <div className="md:flex md:gap-6">
                <div className="w-full">
                  <Label htmlFor="development-stage" id="development-stage-label">
                    <span className="mr-2.5">
                      <FormattedMessage
                        defaultMessage="Stage of development or maturity of the project"
                        id="jUgR7w"
                      />
                    </span>
                    <FieldInfo
                      infoText={formatMessage({
                        defaultMessage:
                          'Select the stage of development of the project or solution at the time of submitting this pitch',
                        id: '3hV8r4',
                      })}
                    />
                  </Label>
                  <Combobox
                    control={control}
                    id="development-stage"
                    name="development_stage"
                    placeholder={formatMessage({ defaultMessage: 'select option', id: 'saBdZ2' })}
                    controlOptions={{ disabled: false }}
                    aria-required
                    aria-describedby="development-stage-error"
                    aria-labelledby="development-stage-label"
                    className="mt-2.5"
                  >
                    <Option key="test">Test</Option>
                  </Combobox>
                  <ErrorMessage
                    id="development-stage-error"
                    errorText={errors?.development_stage?.message}
                  />
                </div>
                <div className="w-full mb-2.5">
                  <Label>
                    <span className="mr-2.5">
                      <FormattedMessage
                        defaultMessage="Estimated duration for project in months"
                        id="l2HvdU"
                      />
                    </span>
                    <FieldInfo
                      infoText={formatMessage({
                        defaultMessage:
                          'Enter the estimated implementation duration for the project. MAX 24 months.',
                        id: '7eO+k/',
                      })}
                    />
                  </Label>
                  <Input
                    name="estimated_duration_in_months"
                    id="estimated-duration-in-months"
                    register={register}
                    type="number"
                    className="mt-2.5"
                    aria-describedby="estimated-duration-in-months-error"
                    placeholder={formatMessage({
                      defaultMessage: 'insert numebr (max 36)',
                      id: '6q3QSr',
                    })}
                  />
                  <ErrorMessage
                    id="estimated-duration-in-months-error"
                    errorText={errors?.estimated_duration_in_months?.message}
                  />
                </div>
              </div>
              <div className="mb-6.5 mt-2">
                <fieldset name="target_groups">
                  <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                    <span className="mr-2.5">
                      <FormattedMessage
                        defaultMessage="Which of these topics/sector categories better describe your project?"
                        id="i2AgQl"
                      />
                    </span>
                    <FieldInfo infoText="MISSING" />
                  </legend>
                  <TagGroup
                    name="target_groups"
                    setValue={setValue}
                    errors={errors}
                    clearErrors={clearErrors}
                  >
                    {category?.map((item) => (
                      <Tag
                        key={item.id}
                        id={item.id}
                        name="target_groups"
                        value={item.id}
                        aria-describedby="target-groups-error"
                        register={register}
                      >
                        <CategoryTagDot category={item.id as CategoryType} />
                        {item.attributes.name}
                      </Tag>
                    ))}
                  </TagGroup>
                </fieldset>
                <ErrorMessage id="categories-error" errorText={errors?.categories?.message} />
              </div>
            </div>
            <div className="mb-6.5">
              <Label htmlFor="problem">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Problem you are solving" id="xBZz+E" />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Describe the problem or market need that your project or solution seeks to address. It should be a very specific problem, not a macro global issue like "climate change" or "poverty". Make sure that your showing that the problem is addressing a specific demand (is real) and it affects the poor and vulnerable population and/or the environment. We recommend using numbers to give a dimension of the problem.',
                    id: '6xBvFx',
                  })}
                />
              </Label>
              <Textarea
                className="mt-2.5"
                name="problem"
                placeholder={formatMessage({
                  defaultMessage: 'insert your answer (max 600 characters)',
                  id: 'hPsrc0',
                })}
                register={register}
              />
              <ErrorMessage id="problem-error" errorText={errors?.problem?.message} />
            </div>
            <div className="mb-6.5">
              <Label htmlFor="solution">
                <span className="mr-2.5">
                  <FormattedMessage
                    defaultMessage="The solution or opportunity proposed"
                    id="OSAxiC"
                  />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Describe the project or solution and describe clearly why you consider it is innovative, different from others and how it can generate an important change and impact towards the target groups. Highlight the characteristics that may attract partners, clients, or investors.',
                    id: 'eXDHt0',
                  })}
                />
              </Label>
              <Textarea
                className="mt-2.5"
                name="solution"
                placeholder={formatMessage({
                  defaultMessage: 'insert your answer (max 600 characters)',
                  id: 'hPsrc0',
                })}
                register={register}
              />
              <ErrorMessage id="solution-error" errorText={errors?.solution?.message} />
            </div>
            <div className="mb-6.5">
              <fieldset name="target_groups">
                <legend className="inline font-sans font-semibold text-sm text-gray-800 mb-4.5">
                  <span className="mr-2.5">
                    <FormattedMessage defaultMessage="Target group" id="0L/mZC" />
                  </span>
                  <FieldInfo
                    infoText={formatMessage({
                      defaultMessage:
                        'Identify the target group(s) of this solution. Try to be very specific and do not cover an unrealistic range of beneficiaries or clients.',
                      id: 'Zht65f',
                    })}
                  />
                </legend>
                <TagGroup
                  name="target_groups"
                  setValue={setValue}
                  errors={errors}
                  clearErrors={clearErrors}
                >
                  {[{ id: 'a', attributes: { name: 'test' } }]?.map((item) => (
                    <Tag
                      key={item.id}
                      id={item.id}
                      name="target_groups"
                      value={item.id}
                      aria-describedby="target-groups-error"
                      register={register}
                    >
                      {item.attributes.name}
                    </Tag>
                  ))}
                </TagGroup>
              </fieldset>
              <ErrorMessage
                id="target-groups-error"
                errorText={errors?.target_groups?.[0].message}
              />
            </div>
            <div className="mb-6.5">
              <Label htmlFor="expected-impact">
                <span className="mr-2.5">
                  <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />
                </span>
                <FieldInfo
                  infoText={formatMessage({
                    defaultMessage:
                      'Describe briefly the impact that the project is expected to generate to the identified users/beneficiaries. Try to explain how the solution or project will achieve this impact. Also try to give some estimates of the number of people impacted, at least to get an initial idea.',
                    id: '4JFhNG',
                  })}
                />
              </Label>
              <Textarea
                className="mt-2.5"
                name="expected_impact"
                placeholder={formatMessage({
                  defaultMessage: 'insert your answer (max 600 characters)',
                  id: 'hPsrc0',
                })}
                register={register}
              />
            </div>
          </form>
        </Page>
      </MultiPageLayout>
    </>
  );
};

Project.layout = {
  Component: NakedPageLayout,
};

export default Project;
