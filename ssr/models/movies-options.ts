import { SortingOptionsProperties, Categories } from '../shared/enums';

export interface MoviesOptions {
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  selectedCategory: Categories;
}
