import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import { InputSocialContactProps, SocialContactInputs } from './types';

import InputsSocialContact from '.';

export default {
  component: InputsSocialContact,
  title: 'Containers/InputsSocialContact',
  argTypes: {
    register: { control: { disable: true } },
    errors: { control: { disable: true } },
  },
} as Meta;

const Template: Story<InputSocialContactProps<SocialContactInputs>> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialContactInputs>();
  const onSubmit: SubmitHandler<SocialContactInputs> = (data) => action('onSubmit')(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(errors).length > 0 && <p className="mb-3 text-red-700">Something went wrong</p>}
      <InputsSocialContact {...props} register={register} errors={errors} />
      <Button type="submit" className="mt-2">
        Submit
      </Button>
      <p className="mt-2 text-xs text-gray-50">
        Submit the form to see the {"inputs'"} error state (the inputs are required).
      </p>
    </form>
  );
};

export const Default: Story<InputSocialContactProps<SocialContactInputs>> = Template.bind({});
Default.args = {
  registerOptions: { required: false },
};

export const Required: Story<InputSocialContactProps<SocialContactInputs>> = Template.bind({});
Required.args = {
  registerOptions: { required: 'This field is required' },
};
Required.parameters = {
  docs: {
    source: {
      // NOTE: Needed to prevent Storybook from freezing the browser. More information there:
      // https://github.com/storybookjs/storybook/issues/17098
      type: 'code',
    },
  },
};
