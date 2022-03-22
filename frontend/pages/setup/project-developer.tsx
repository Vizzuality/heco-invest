import { FC, LabelHTMLAttributes, useState } from 'react';

import { ArrowLeft, Info } from 'react-feather';
import { SubmitErrorHandler, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Button from 'components/button';
import Input from 'components/forms/input';
import TextArea from 'components/forms/textarea';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';
import {
  ProjectDeveloperSetupForm,
  ProjectDeveloperSetupFormOnline,
} from 'types/projectDeveloperSetup';
const languages = [
  { name: 'Spanish', code: 'es' },
  { name: 'English', code: 'en' },
  { name: 'Portuguese', code: 'pt' },
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
    <label className="block font-sans font-semibold text-sm color-gray-800" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
};

const Interests = ({
  items,
  register,
  title,
  name,
  id,
}: {
  items: string[];
  register: UseFormRegister<ProjectDeveloperSetupForm>;
  title: string;
  name: any;
  id: string;
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
          <label
            htmlFor={`${id}-${index}`}
            key={item}
            // className="border border-beige text-center py-2 px-4 rounded cursor-pointer"
          >
            <input
              {...register(name, {
                required: intl.formatMessage({
                  defaultMessage: 'Select at least one option',
                  id: 'wn4QQy',
                }),
              })}
              id={`${id}-${index}`}
              // className="appearance-none checked:w-5 checked:h-5 checked:bg-green-dark"
              name={name}
              type="checkbox"
              value={index}
            />
            {item}
          </label>
        ))}
      </div>
      <label htmlFor={id}>
        <span className="font-sans text-green-dark text-sm underline cursor-pointer">
          {intl.formatMessage({ defaultMessage: 'Select all', id: '94Fg25' })}
        </span>
        <input id={id} type="checkbox" className="appearance-none" value={items} />
      </label>
    </div>
  );
};

const ProjectDeveloper: PageComponent<ProjectDeveloperProps, StaticPageLayoutProps> = () => {
  const { register, trigger, handleSubmit, getValues } = useForm<ProjectDeveloperSetupForm>();
  const [section, setSection] = useState(0);

  const intl = useIntl();

  const handleNext = () => {
    trigger();
    if (section === 2) {
      console.log('submit', getValues());
    } else {
      setSection(section + 1);
    }
  };

  const onSubmit: SubmitHandler<ProjectDeveloperSetupForm> = (values) => {
    console.log(values);
  };

  const onError: SubmitErrorHandler<ProjectDeveloperSetupForm> = (error) => {
    console.log(error);
  };

  const OnlinePresenceItem = ({ item }: { item: keyof ProjectDeveloperSetupFormOnline }) => {
    return (
      <div>
        <Label htmlFor={item}>
          <span className="text-gray-800 font-semibold text-primary text-sm">
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
            <h1>I want to write my content in</h1>
            <p id="language-description">
              Select the account laguage in which you want to write the content of this account.
              This will avoid mixed content in the platform.
            </p>
            <div className="flex gap-x-6">
              {languages.map((lang) => {
                const { name, code } = lang;
                return (
                  <Label key={code} htmlFor={code} className="inline">
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
                    {name}
                  </Label>
                );
              })}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className="mb-6.5">
              <p className="text-gray-800 font-semibold text-primary text-sm mb-4">Picture</p>
              <div className="flex gap-x-4">
                <Image src="/images/avatar.svg" width={48} height={48} alt="profile image" />
                <Label htmlFor="picture">
                  <input
                    id="picture"
                    className="mt-2.5"
                    name="picture"
                    type="file"
                    {...register('picture', {
                      required: true,
                    })}
                  />
                </Label>
              </div>
            </div>
            <div className="flex gap-x-6 mb-6.5">
              <div className="w-1/2">
                <Label htmlFor="profile">
                  <span className="text-gray-800 font-semibold text-primary text-sm">
                    Profile name
                  </span>
                  <Input
                    name="profile"
                    className="mt-2.5"
                    id="profile"
                    type="text"
                    register={register}
                    registerOptions={{ required: true }}
                    placeholder="insert the profile name"
                  />
                </Label>
              </div>
              <div className="w-1/2">
                <Label htmlFor="profile">
                  <span className="text-gray-800 font-semibold text-primary text-sm">
                    Project developer type
                  </span>
                  <Input
                    name="projectDeveloperType"
                    id="profile"
                    className="mt-2.5"
                    type="text"
                    register={register}
                    registerOptions={{ required: true }}
                    placeholder="select the type"
                  />
                </Label>
              </div>
            </div>
            <div className="mb-6.5">
              <Label htmlFor="about">
                <span className="text-gray-800 font-semibold text-primary text-sm">About </span>
                <TextArea
                  name="about"
                  className="mt-2.5"
                  id="about"
                  register={register}
                  registerOptions={{ required: true }}
                  placeholder="Type a short description about what interests you"
                />
              </Label>
            </div>
            <div className="mb-6.5">
              <Label htmlFor="mission">
                <span className="text-gray-800 font-semibold text-primary text-sm">Mission</span>
                <TextArea
                  name="mission"
                  className="mt-2.5"
                  id="mission"
                  register={register}
                  registerOptions={{ required: true }}
                  placeholder="Type a short description about what interests you"
                />
              </Label>
            </div>
            <div>
              <p className="font-sans font-medium text-base text-gray-600 mb-4.5">
                Online presence
              </p>
              <div className="grid grid-cols-2 gap-x-6 w-full">
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
              <h1 className="text-3xl font-semibold font-serif">Your work</h1>
              <p className="font-sans text-gray-600 text-base">Tell us what interests you</p>
            </div>
            <Interests
              register={register}
              title="Select the categories that interests you"
              name="categories"
              id="categories"
              items={categories}
            />
            <Interests
              register={register}
              title="Areas you will be working on (optional)"
              name="mosaic"
              id="mosaic"
              items={mosaic}
            />
            <Interests
              register={register}
              title="Expect to have impact"
              name="impacts"
              id="impacts"
              items={impacts}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        onChange={(e) => console.log('form-value', e.currentTarget.value)}
      >
        <FormSection />
        <div className="flex justify-between align-middle py-4 px-20 border-t border-t-gray-400">
          <div>
            {section !== 0 && (
              <Button theme="primary-white" onClick={() => setSection(section - 1)}>
                <ArrowLeft size={16} className="mr-3" />
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-x-4">
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
            <Button className="block" onClick={handleNext}>
              {section === 2 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectDeveloper;
