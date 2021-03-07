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
        const date1 = new Date(
          movie1[SortingOptionsProperties.RELEASE_DATE]
        ).getTime();
        const date2 = new Date(
          movie2[SortingOptionsProperties.RELEASE_DATE]
        ).getTime();

        return isDownDirection ? date1 - date2 : date2 - date1;
      }
      case SortingOptionsProperties.TITLE: {
        const title1 = movie1[SortingOptionsProperties.TITLE];
        const title2 = movie2[SortingOptionsProperties.TITLE];

        return isDownDirection
          ? compareStrings(title1, title2)
          : compareStrings(title2, title1);
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
