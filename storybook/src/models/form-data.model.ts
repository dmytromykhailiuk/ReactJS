import { Categories } from '../enums';

export interface FormData {
  title: string;
  release_date: string;
  poster_path: string;
  genres: (Categories | string)[];
  overview: string;
  runtime: number;
  vote_average: number;
}
