import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import { InputSocialContactProps, SocialContactInputs } from './types';

import InputsSocialContact from '.';

export default {
  component: InputsSocialContact,
  title: 'Containers/InputsSocialContact',
  argTypes: {},
} as Meta;

const Template: Story<InputSocialContactProps<SocialContactInputs>> = ({ ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialContactInputs>({ shouldUseNativeValidation: true });
  const onSubmit: SubmitHandler<any> = (data) => action('onSubmit')(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputsSocialContact {...rest} register={register} />
        <Button type="submit">submit</Button>
        {Object.keys(errors).length > 0 && 'Something went wrong'}
      </form>
    </div>
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
