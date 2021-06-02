import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';
import { ButtonTypes } from '../../enums/button-types';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args: any) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Button",
  type: ButtonTypes.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Button",
  type: ButtonTypes.SECONDARY,
};

