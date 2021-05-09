export interface Movie {
  budget: number;
  revenue: number;
  tagline: string;
  vote_count: number;
  id?: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: string[];
  overview: string;
  runtime: number;
  vote_average: number;
}
