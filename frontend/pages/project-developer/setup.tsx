import { FC, LabelHTMLAttributes, useState } from 'react';

import { ArrowLeft, Info } from 'react-feather';
import {
  FieldPath,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import { ProjectDeveloperSetupForm, ProjectDeveloperSetupFormOnline } from 'types/projectDeveloper';

const languages = [
  { name: 'Spanish', nativeName: 'Español', code: 'es' },
  { name: 'English', nativeName: 'English', code: 'en' },
  { name: 'Portuguese', nativeName: 'Português', code: 'pt' },
];
const onlinePresence = ['website', 'facebook', 'linkedin', 'instagram', 'twitter'];
const categories = [
  'Tourism & Recreation',
  'Forestry & Agroforestry',
  'Non-timber forest production',
  'Sustainable agrosystems',
];
const mosaic = ['Heart of Amazonia', 'Andean Amazonian Piedmont', 'Orinoquía transition'];
const impacts = ['Biodiversity', 'Clime', 'Water', 'Community'];

export async function getStaticProps(ctx) {
  return {
    props: {
      intlMessages: await loadI18nMessages(ctx),
    },
  };
}

type ProjectDeveloperProps = InferGetStaticPropsType<typeof getStaticProps>;

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return (
    <label className="block font-sans text-sm font-semibold text-gray-800" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
};

const Interests = ({
  items,
  register,
  registerOptions,
  title,
  name,
  id,
  errorMessage,
}: {
  items: string[];
  register: UseFormRegister<ProjectDeveloperSetupForm>;
  registerOptions?: RegisterOptions;
  title: string;
  name: any;
  id: string;
  errorMessage?: string;
}) => {
  const intl = useIntl();

  return (
    <div className="mb-7">
      <p className="font-sans font-semibold text-sm text-gray-800 mb-4.5">
        {title}
        <Info className="inline ml-2.5 cursor-pointer" size={14.67} />
      </p>
      <div className="flex gap-4 mb-4">
        {items.map((item, index) => (
          <div key={item}>
            <label
              htmlFor={`${id}-${index}`}
              // className="px-4 py-2 text-center border rounded cursor-pointer border-beige"
            >
              <input
                {...register(name, registerOptions)}
                id={`${id}-${index}`}
                // className="appearance-none checked:w-5 checked:h-5 checked:bg-green-dark"
                name={name}
                type="checkbox"
                value={index}
              />
              {item}
            </label>
            {errorMessage}
          </div>
        ))}
      </div>
      <label htmlFor={id}>
        <span className="font-sans text-sm underline cursor-pointer text-green-dark">
          {intl.formatMessage({ defaultMessage: 'Select all', id: '94Fg25' })}
        </span>
        <input id={id} type="checkbox" className="appearance-none" value={items} />
      </label>
    </div>
  );
};

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, StaticPageLayoutProps> = () => {
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProjectDeveloperSetupForm>();
  const [section, setSection] = useState(0);

  const intl = useIntl();

  // const handleNext = () => {
  //   trigger();
  // };

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    console.log(values);
    if (section === 2) {
      console.log('submit', getValues());
    } else {
      setSection(section + 1);
    }
  };

  const onError: SubmitErrorHandler<ProjectDeveloperSetupForm> = (error) => {
    console.log(error);
  };

  const OnlinePresenceItem = ({ item }: { item: keyof ProjectDeveloperSetupFormOnline }) => {
    return (
      <div>
        <Label htmlFor={item}>
          <span className="text-sm font-semibold text-gray-800 text-primary">
            {item} (optional)
          </span>
          <Input
            className="mt-2.5"
            name={item}
            id={item}
            type="text"
            register={register}
            placeholder="Insert URL"
          />
        </Label>
      </div>
    );
  };

  const FormSection = () => {
    switch (section) {
      case 0:
        return (
          <div>
            <h1 className="mb-6 font-serif text-3xl font-semibold text-green-dark">
              I want to write my content in
            </h1>
            <p id="language-description" className="mb-20 font-sans text-base">
              Select the account laguage in which you want to write the content of this account.
              This will avoid mixed content in the platform.
            </p>
            <div className="flex justify-center mt-2 gap-x-6">
              {languages.map((lang) => {
                const { name, code, nativeName } = lang;
                return (
                  <label
                    key={code}
                    htmlFor={code}
                    className="justify-center block w-64 text-center border rounded-lg py-7 border-beige"
                  >
                    <input
                      name={name}
                      id={code}
                      type="radio"
                      value={code}
                      {...register('language', {
                        required: intl.formatMessage({
                          defaultMessage: 'Select a language',
                          id: 'oqk48P',
                        }),
                      })}
                    />
                    <span className="block">{name}</span>
                    <span>({nativeName})</span>
                  </label>
                );
              })}
            </div>
            {errors.language && <p>{errors.language.message}</p>}
          </div>
        );
      case 1:
        return (
          <div>
            <div className="mb-6">
              <h1 className="mb-2 font-serif text-3xl font-semibold">
                Project developer information
              </h1>
              <p className="font-sans text-base text-gray-600">
                This information will be visible in the profile for other users.
              </p>
            </div>

            <div className="mb-6.5">
              <p className="font-sans font-medium text-base text-gray-600 mb-4.5">General</p>
              <p className="mb-4 text-sm font-semibold text-gray-800 text-primary">Picture</p>
              <div className="flex gap-x-4">
                <Image src="/images/avatar.svg" width={48} height={48} alt="profile image" />
                <label htmlFor="picture" className="bg-green-dark rounded-3xl pt-2.5">
                  <input
                    id="picture"
                    className="appearance-none"
                    name="picture"
                    type="file"
                    {...register('picture', {
                      required: 'This field is required',
                    })}
                  />
                </label>
              </div>
              {errors.picture && <p>{errors.picture.message}</p>}
            </div>
            <div className="flex gap-x-6 mb-6.5">
              <div className="w-1/2">
                <Label htmlFor="profile">
                  <span className="text-sm font-semibold text-gray-800 text-primary">
                    Profile name
                  </span>
                  <Input
                    name="profile"
                    className="mt-2.5"
                    id="profile"
                    type="text"
                    register={register}
                    registerOptions={{ required: 'This field is required' }}
                    placeholder="insert the profile name"
                  />
                </Label>
                {errors.profile && <p>{errors.profile.message}</p>}
              </div>
              <div className="w-1/2">
                <Label htmlFor="profile">
                  <span className="text-sm font-semibold text-gray-800 text-primary">
                    Project developer type
                  </span>
                  <Input
                    name="projectDeveloperType"
                    id="profile"
                    className="mt-2.5"
                    type="text"
                    register={register}
                    registerOptions={{ required: 'This field is required' }}
                    placeholder="select the type"
                  />
                </Label>
                {errors.projectDeveloperType && <p>{errors.projectDeveloperType.message}</p>}
              </div>
            </div>
            <div className="mb-6.5">
              <Label htmlFor="about">
                <span className="text-sm font-semibold text-gray-800 text-primary">About </span>
                <TextArea
                  name="about"
                  className="mt-2.5"
                  id="about"
                  register={register}
                  registerOptions={{ required: 'This field is required' }}
                  placeholder="Type a short description about what interests you"
                />
              </Label>
              {errors.about && <p>{errors.about.message}</p>}
            </div>
            <div className="mb-6.5">
              <Label htmlFor="mission">
                <span className="text-sm font-semibold text-gray-800 text-primary">Mission</span>
                <TextArea
                  name="mission"
                  className="mt-2.5"
                  id="mission"
                  register={register}
                  registerOptions={{ required: 'This field is required' }}
                  placeholder="Type a short description about what interests you"
                />
              </Label>
              {errors.mission && <p>{errors.mission.message}</p>}
            </div>
            <div>
              <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
                Online presence
              </p>
              <div className="grid w-full grid-cols-2 gap-x-6">
                {onlinePresence.map((item) => (
                  <OnlinePresenceItem
                    key={item}
                    item={item as keyof ProjectDeveloperSetupFormOnline}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mb-6">
              <h1 className="font-serif text-3xl font-semibold">Your work</h1>
              <p className="font-sans text-base text-gray-600">Tell us what interests you</p>
            </div>
            <Interests
              register={register}
              registerOptions={{
                required: intl.formatMessage({
                  defaultMessage: 'Select at least one category',
                  id: 'btRcQU',
                }),
              }}
              title="Select the categories that interests you"
              name="categories"
              id="categories"
              items={categories}
              errorMessage={errors.categories && errors.categories.join('')}
            />
            <Interests
              register={register}
              registerOptions={{ required: false }}
              title="Areas you will be working on (optional)"
              name="mosaic"
              id="mosaic"
              items={mosaic}
            />
            <Interests
              register={register}
              registerOptions={{
                required: intl.formatMessage({
                  defaultMessage: 'Select at least one impact',
                  id: 'eoF9Hy',
                }),
              }}
              title="Expect to have impact"
              name="impacts"
              id="impacts"
              items={impacts}
              errorMessage={errors.impact && errors.impact.join('')}
            />
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen m-auto">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col justify-between">
        <div className="max-w-screen-lg m-auto">
          <FormSection />
        </div>
        <div className="flex justify-between h-full px-20 py-4 my-10 align-middle border-t border-t-gray-400">
          <div className="min-w-20 min-h-1">
            {section !== 0 && (
              <Button theme="primary-white" onClick={() => setSection(section - 1)}>
                <ArrowLeft size={16} className="mr-3" />
                Back
              </Button>
            )}
          </div>
          <div className="flex align-middle gap-x-4">
            {[0, 1, 2].map((item) => (
              <Button
                className="w-6 h-6 px-1.75 text-center round"
                key={item}
                theme={item < section ? 'primary-green' : 'secondary-green'}
              >
                {item + 1}
              </Button>
            ))}
          </div>
          <div>
            <Button type="submit" className="block">
              {section === 2 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectDeveloper;
