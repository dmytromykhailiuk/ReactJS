import React from 'react';
import { Story, Meta } from '@storybook/react';

import Dropdown, { DropdownProps } from './Dropdown';
import { MovieFormValues } from '../../enums/movie-form-values';
import { Formik } from 'formik';
import { categories } from '../../mocks/categories.mock';

export default {
  title: 'Example/Dropdown',
  decorators: [(Story) => (
    <Formik
    initialValues={{
      [MovieFormValues.CATEGORY]: [],
    }}
    onSubmit={() => {}}
  >
    {(formik) => (
      <form onSubmit={formik.handleSubmit}>
        <Story />
      </form>
    )}
  </Formik>
  )],
  component: Dropdown
} as Meta;

const Template: Story<DropdownProps> = (args: any) => <Dropdown {...args}/>;

export const Valid = Template.bind({});
Valid.args = {
  label: "GENRE",
  placeholder: "Select Genre",
  name: MovieFormValues.CATEGORY,
  options: categories,
  error: null
};

export const Invalid = Template.bind({});
Invalid.args = {
  label: "GENRE",
  placeholder: "Select Genre",
  name: MovieFormValues.CATEGORY,
  options: categories,
  error: "Something went wrong!"
};
