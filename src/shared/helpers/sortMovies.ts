import { SortingOptionsProperties } from "shared/enums";
import { Movie } from "models";

export function sortMovies(
  movies: Movie[],
  sortingOption: SortingOptionsProperties,
  isDownDirection: boolean
) {
  return movies.sort((movie1, movie2) => {
    switch (sortingOption) {
      case SortingOptionsProperties.RELEASE_DATE: {
        return isDownDirection
          ? new Date(movie1[SortingOptionsProperties.RELEASE_DATE]).getTime() -
              new Date(movie2[SortingOptionsProperties.RELEASE_DATE]).getTime()
          : new Date(movie2[SortingOptionsProperties.RELEASE_DATE]).getTime() -
              new Date(movie1[SortingOptionsProperties.RELEASE_DATE]).getTime();
      }
      case SortingOptionsProperties.TITLE: {
        return isDownDirection
          ? compareStrings(
              movie1[SortingOptionsProperties.TITLE],
              movie2[SortingOptionsProperties.TITLE]
            )
          : compareStrings(
              movie2[SortingOptionsProperties.TITLE],
              movie1[SortingOptionsProperties.TITLE]
            );
      }
    }
  });
}

function compareStrings(inputString1: string, inputString2: string) {
  const string1 = inputString1.toUpperCase();
  const string2 = inputString2.toUpperCase();

  if (string1 < string2) {
    return -1;
  }
  if (string1 > string2) {
    return 1;
  }
  return 0;
}
