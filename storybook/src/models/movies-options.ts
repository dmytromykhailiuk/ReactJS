import { SortingOptionsProperties, Categories } from '../enums';

export interface MoviesOptions {
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  selectedCategory: Categories;
}
