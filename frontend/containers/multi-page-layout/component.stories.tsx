import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import MultiPageLayout, { MultiPageLayoutProps, Page, CompletePage } from './';

export default {
  component: MultiPageLayout,
  title: 'Containers/MultiPageLayout',
  argTypes: {},
} as Meta;

const loremIpsum = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean leo sapien, faucibus at tempus a, blandit eget tortor. Morbi malesuada interdum sapien, nec bibendum nunc condimentum vitae. Fusce semper, nisl bibendum condimentum ullamcorper, neque dolor accumsan turpis, at ullamcorper erat odio ultrices enim. Donec laoreet pulvinar eros, vitae lobortis dui vehicula sed. Quisque sed molestie mi, fermentum luctus justo. Quisque bibendum risus lectus, sed posuere justo sagittis ut. Aliquam ac magna tincidunt, feugiat arcu eu, pharetra diam. Pellentesque et purus lacus. Mauris ullamcorper tempor turpis nec molestie. Aliquam vitae hendrerit enim, a aliquam dolor. Phasellus ut nibh porta elit imperdiet luctus at et dui. Donec urna orci, suscipit a aliquam eu, interdum ac nunc. Phasellus dictum sed tortor at gravida. Proin scelerisque mattis pharetra.',
  'Sed congue nisi justo. In pellentesque, augue sed bibendum imperdiet, est felis feugiat metus, nec consequat metus quam id ex. Aenean quis feugiat lectus. Vestibulum commodo elit eu nisl dapibus venenatis. Aliquam ligula nisi, hendrerit et nisl ut, volutpat elementum eros. Aenean mi ex, tincidunt id imperdiet quis, mollis vitae urna. Suspendisse placerat sem sed tempus commodo. Sed imperdiet hendrerit diam non fringilla. Nunc in lectus elit. Praesent id vehicula sapien, ac lobortis justo. Sed lectus dolor, ornare id nunc ut, dignissim convallis massa. Aenean fermentum vehicula nisl. Etiam gravida nibh sed tincidunt lobortis. Aliquam in magna eros. Nullam blandit tortor sed velit mollis, vitae laoreet ante placerat. Donec nec condimentum nisl.',
  'Fusce porttitor urna consectetur dolor dapibus dictum. Vestibulum bibendum tellus non libero malesuada placerat. Etiam aliquet rutrum augue, quis lobortis purus suscipit sed. Donec felis ipsum, ultricies et tellus quis, placerat aliquet leo. Quisque iaculis vitae diam et commodo. Nam eget condimentum justo, a lacinia lectus. Donec a est hendrerit augue faucibus mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent hendrerit erat vel tellus tincidunt mollis. Vivamus et ante auctor, ullamcorper lacus vel, pretium velit. Curabitur eu pharetra felis.',
  'Nulla sollicitudin nibh tellus, eget maximus leo congue ut. Donec tempor efficitur arcu, nec fringilla sapien tincidunt facilisis. Duis mollis, nisl sed pretium congue, massa odio facilisis ex, eu efficitur orci urna a felis. Donec neque orci, porta pellentesque augue at, vehicula ornare enim. Aenean aliquet dui gravida risus semper, id aliquet magna tincidunt. Mauris molestie libero at elit dignissim facilisis. Maecenas et iaculis eros, id eleifend dolor. Sed posuere, ipsum id pulvinar tempor, sapien sapien gravida elit, non vehicula lacus tellus non elit. Etiam arcu odio, porttitor vitae iaculis ac, dapibus quis dolor. Vivamus tristique, odio nec gravida tincidunt, ex mi semper velit, non porta nulla nulla auctor elit. Fusce eleifend ligula vitae libero consequat, vel accumsan enim ullamcorper. Fusce pulvinar erat et sem viverra, eu aliquet tortor blandit. Praesent ante nisi, condimentum quis nisi eget, convallis tempor metus. Donec nec ullamcorper augue. Ut ut sem consequat, pretium lorem id, vulputate nulla. Phasellus lobortis est libero, ut tempus metus blandit vitae.',
  'Nam at cursus diam, sit amet luctus augue. Nunc et nisl at risus commodo blandit ac ut ligula. Phasellus suscipit, nibh id congue dictum, dolor leo sagittis nulla, sed imperdiet massa ante vel ligula. Vestibulum iaculis hendrerit vehicula. Proin feugiat non ipsum a tempus. Donec id aliquam lectus. Donec tristique, justo in hendrerit lacinia, sem risus tempus tortor, eget dapibus elit magna et libero. Aliquam condimentum tortor odio, eu elementum lacus pharetra et. Phasellus sed interdum nibh, dictum fringilla lacus. Phasellus molestie convallis sapien ac luctus. Quisque at vehicula libero. Curabitur sit amet nulla odio. Etiam purus enim, blandit vel augue vitae, consequat tristique quam. Morbi facilisis tellus vel vestibulum posuere. Fusce quis sapien pulvinar, aliquet massa et, sodales nulla.',
];

const Template: Story<MultiPageLayoutProps> = (args: MultiPageLayoutProps) => {
  return (
    <>
      <MultiPageLayout title="Page Title" {...args}>
        <Page>
          <h1 className="text-2xl">First Page</h1>
          <p className="mt-5">{loremIpsum[0]}</p>
        </Page>
        <Page>
          <h1 className="text-2xl">Second Page</h1>
          <p className="mt-5">{loremIpsum[1]}</p>
        </Page>
        <Page>
          <h1 className="text-2xl">Third Page</h1>
          <p className="mt-5">{loremIpsum[2]}</p>
        </Page>
        <Page>
          <h1 className="text-2xl">Fourth Page</h1>
          <p className="mt-5">{loremIpsum[3]}</p>
        </Page>
        <CompletePage>
          <h1 className="text-2xl">Final page</h1>
          <p className="mt-5">{loremIpsum[4]}</p>
        </CompletePage>
      </MultiPageLayout>
    </>
  );
};

const TemplateWithErrors: Story<MultiPageLayoutProps> = (args: MultiPageLayoutProps) => {
  return (
    <MultiPageLayout title="Page Title" {...args}>
      <Page>
        <h1 className="text-2xl">First Page</h1>
        <p className="mt-5">{loremIpsum[0]}</p>
      </Page>
      <Page hasErrors={true}>
        <h1 className="text-2xl">Second Page (with Errors)</h1>
        <p className="mt-5">{loremIpsum[1]}</p>
      </Page>
      <Page hasErrors={true}>
        <h1 className="text-2xl">Third Page (with Errors)</h1>
        <p className="mt-5">{loremIpsum[2]}</p>
      </Page>
    </MultiPageLayout>
  );
};

export const Default: Story<MultiPageLayoutProps> = Template.bind({});
Default.args = {};

export const WithErrors: Story<MultiPageLayoutProps> = TemplateWithErrors.bind({});
WithErrors.args = {
  autoNavigation: true,
  alert:
    'Something went wrong while submitting your form. Please correct the errors before submitting again.',
};

export const WithAlert: Story<MultiPageLayoutProps> = Template.bind({});
WithAlert.args = {
  autoNavigation: false,
  page: 3,
  alert:
    'Something went wrong while submitting your form. Please correct the errors before submitting again.',
};

export const Complete: Story<MultiPageLayoutProps> = Template.bind({});
Complete.args = {
  isComplete: true,
};

export const NoProgress: Story<MultiPageLayoutProps> = Template.bind({});
NoProgress.args = {
  page: 2,
  showProgressBar: false,
};

export const CustomButtons: Story<MultiPageLayoutProps> = Template.bind({});
CustomButtons.args = {
  leaveButtonText: 'Close',
  previousButtonText: 'Go back',
  nextButtonText: 'Go forward',
  submitButtonText: 'Submit form',
  completeButtonText: 'Take me to another page',
};
