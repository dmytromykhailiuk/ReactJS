import { Categories } from "@shared/enums";

export interface FormData {
  title: string;
  releaseDate: string;
  url: string;
  category: Categories[];
  overview: string;
  runtime: string;
  duration: number;
  rating: number;
}
