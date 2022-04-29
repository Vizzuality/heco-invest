import { SubmitHandler, useForm } from 'react-hook-form';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import { WebsiteSocialProps, WebsiteSocialInputTypes } from './types';

import SocialContact from '.';

export default {
  component: SocialContact,
  title: 'Containers/Forms/WebsiteSocial',
  argTypes: {},
} as Meta;

const Template: Story<WebsiteSocialProps<WebsiteSocialInputTypes>> = ({ ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WebsiteSocialInputTypes>({ shouldUseNativeValidation: true });
  const onSubmit: SubmitHandler<any> = (data) => action('onSubmit')(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SocialContact {...rest} register={register} />
        <Button type="submit">submit</Button>
        {Object.keys(errors).length > 0 && 'Something went wrong'}
      </form>
    </div>
  );
};

export const Default: Story<WebsiteSocialProps<WebsiteSocialInputTypes>> = Template.bind({});
Default.args = {
  registerOptions: { required: false },
};

export const Required: Story<WebsiteSocialProps<WebsiteSocialInputTypes>> = Template.bind({});
Required.args = {
  registerOptions: { required: 'This field is required' },
};
