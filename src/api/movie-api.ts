import { Categories, SortingOptionsProperties } from "shared/enums";
import { Movie } from "models/movie.model";

const API_URL = "http://localhost:4000/movies";
const limit = 12;
const headers = {
  "Content-Type": "application/json",
};

interface GetMoviesOptions {
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  selectedCategory: Categories;
  searchingValue?: string;
  offset?: number;
}
export interface LoadMoviesResponse {
  data: Movie[];
  totalAmount: number;
}

export function getMovies({
  sortingOption,
  isDownDirection,
  selectedCategory,
  searchingValue = "",
  offset = 0,
}: GetMoviesOptions): Promise<LoadMoviesResponse> {
  return fetch(
    API_URL +
      `?limit=${limit}&offset=${offset}&searchBy=title&search=${searchingValue}&sortOrder=${
        isDownDirection ? "desc" : "asc"
      }&sortBy=${sortingOption}&filter=${
        selectedCategory === Categories.ALL ? "" : selectedCategory
      }`,
    {
      headers,
    }
  ).then((res) => res.json());
}

export function getMovie(id: string): Promise<Movie> {
  return fetch(`${API_URL}/${id}`, {
    headers,
  }).then((res) => res.json());
}

export function addMovie(movie: Movie): Promise<Movie> {
  return fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(movie),
  }).then((res) =>
    res.json().then((data) => {
      if (!res.ok && res.status === 400) {
        throw {
          messages: data.messages,
          status: res.status,
        };
      } else {
        return data;
      }
    })
  );
}

export function editMovie(movie: Movie): Promise<Movie> {
  return fetch(API_URL, {
    method: "PUT",
    headers,
    body: JSON.stringify(movie),
  }).then((res) =>
    res.json().then((data) => {
      if (!res.ok && res.status === 400) {
        throw {
          messages: data.messages,
          status: res.status,
        };
      } else {
        return data;
      }
    })
  );
}

export function deleteMovie(id: number): Promise<Response> {
  return fetch(`${API_URL}/${id}`, { method: "DELETE", headers });
}
