import { MovieFormValues } from '../enums';
import * as Yup from 'yup';

const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

const ValidationSchema = Yup.object().shape({
  [MovieFormValues.TITLE]: Yup.string().required('Title is required'),
  [MovieFormValues.RELEASE_DATE]: Yup.string().required('Relese date is required'),
  [MovieFormValues.MOVIE_URL]: Yup.string().matches(URL_REGEX, 'Enter a valid url').required('Movie URL is required'),
  [MovieFormValues.CATEGORY]: Yup.array().min(1, 'Select at least one genre to proceed').required('Ganre is required'),
  [MovieFormValues.OVERVIEW]: Yup.string().required('Owerview is required'),
  [MovieFormValues.RUNTIME]: Yup.number().min(0, 'Runtime cannot be negative').required('Runtime is required'),
  [MovieFormValues.RATING]: Yup.number()
    .min(0, 'Rating cannot be negative')
    .max(10, 'Rating cannot be greater than 10'),
});

export { ValidationSchema };
