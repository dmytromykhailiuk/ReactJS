import { Movie } from "models/movie.model";

const API_URL = "http://localhost:4000/movies";
const headers = {
  "Content-Type": "application/json",
};

export function getMovies(): Promise<Movie[]> {
  return fetch(API_URL + "?limit=10000", {
    headers,
  })
    .then((res) => res.json())
    .then((res) => res.data);
}

export function addMovie(movie: Movie): Promise<Movie> {
  return fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(movie),
  }).then((res) => res.json());
}

export function editMovie(movie: Movie): Promise<Movie> {
  return fetch(API_URL, {
    method: "PUT",
    headers,
    body: JSON.stringify(movie),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Bad Request");
    }
    return res.json();
  });
}

export function deleteMovie(id: number): Promise<Response> {
  return fetch(`${API_URL}/${id}`, { method: "DELETE", headers });
}
