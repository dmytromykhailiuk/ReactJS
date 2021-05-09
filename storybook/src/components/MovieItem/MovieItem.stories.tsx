import React from 'react';
import { Story, Meta } from '@storybook/react';

import MovieItem, { MovieItemProps } from './MovieItem';
import { Movie } from '../../models';

const movie: Movie = {
  budget: 55000000,
  genres: ['Drama', 'Romance'],
  id: 337167,
  overview:
    'Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embracean inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey andhe relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it evenbegins.',
  poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
  release_date: '2018-02-07',
  revenue: 136906000,
  runtime: 106,
  tagline: "Don't miss the climax",
  title: 'Fifty Shades Freed',
  vote_average: 6.1,
  vote_count: 1195,
};

export default {
  title: 'Example/MovieItem',
  component: MovieItem,
} as Meta;

const Template: Story<MovieItemProps> = (args: any) => <MovieItem {...args} />;

export const Example = Template.bind({});
Example.args = {
  movie: movie,
  onEditMovie: () => {},
  onDeleteMovie: () => {},
};
