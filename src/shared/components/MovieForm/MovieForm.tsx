import React from "react";
import classes from "./MovieForm.module.scss";
import { Formik } from 'formik';
import { Movie } from "models/";
import { Input, Dropdown, Button } from "../";
import { categories } from "mocks";
import { ButtonTypes, Categories } from "shared/enums";
import { generateId } from "shared/helpers";
import * as Yup from 'yup';

interface MovieFormProps {
  onSubmitForm: (movie: Movie) => void;
  movie?: Movie;
  submitButtonLabel?: string;
}

interface  FormData {
  title: string;
  releaseDate: string;
  movieUrl: string;
  genre: Categories[];
  overview: string;
  runtime: string;
}

enum MovieFormValues {
  MOVIE_ID = 'movieId',
  TITLE = 'title',
  RELEASE_DATE = 'releaseDate',
  MOVIE_URL = 'movieUrl',
  GENRE = 'genre',
  OVERVIEW = 'overview',
  RUNTIME = 'runtime'
}

const URL_REGEX = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const ValidationSchema = Yup.object().shape({
  [MovieFormValues.TITLE]: Yup.string().required('Title is required'),
  [MovieFormValues.RELEASE_DATE]: Yup.string().required('Relese date is required'),
  [MovieFormValues.MOVIE_URL]: Yup.string().matches(URL_REGEX, 'Enter a valid url').required('Movie URL is required'),
  [MovieFormValues.GENRE]: Yup.array().min(1, "Select at least one genre to proceed").required("Ganre is required"),
  [MovieFormValues.OVERVIEW]: Yup.string().required('Owerview is required'),
  [MovieFormValues.RUNTIME]: Yup.string().required('Runtime is required')
});

const MovieForm: React.FC<MovieFormProps> = ({ onSubmitForm, movie = {}, submitButtonLabel = "SAVE" }) => {
  return (
    <Formik
      initialValues={{
        [MovieFormValues.TITLE]: movie.title || '',
        [MovieFormValues.RELEASE_DATE]: movie.releaseDate || '',
        [MovieFormValues.MOVIE_URL]: movie.movieUrl || '',
        [MovieFormValues.GENRE]: movie.genre || [],
        [MovieFormValues.OVERVIEW]: movie.overview || '',
        [MovieFormValues.RUNTIME]: movie.runtime || '',
      }}
      // validateOnMount={true}
      validationSchema={ValidationSchema}
      validateOnBlur={true}
      onSubmit={(values: FormData) => {
        onSubmitForm({...values, movieId: movie.movieId || generateId()});
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {movie.movieId && <Input 
            disabled={true}
            name={MovieFormValues.MOVIE_ID}
            type="text"
            label="MOVIE ID"
            value={movie.movieId}
          />}
          <Input 
            name={MovieFormValues.TITLE}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Title here'
            label="TITLE"
            error={formik.errors.title && formik.touched.title ? formik.errors[MovieFormValues.TITLE] : ''}
            value={formik.values[MovieFormValues.TITLE]}
          />
          <Input 
            name={MovieFormValues.RELEASE_DATE}
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Select Date'
            label="RELEASE DATE"
            error={formik.errors[MovieFormValues.RELEASE_DATE] && formik.touched[MovieFormValues.RELEASE_DATE] ? formik.errors[MovieFormValues.RELEASE_DATE] : ''}
            value={formik.values[MovieFormValues.RELEASE_DATE]}
          />
          <Input 
            name={MovieFormValues.MOVIE_URL}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Movie URL here'
            label="MOVIE URL"
            error={formik.errors[MovieFormValues.MOVIE_URL] && formik.touched[MovieFormValues.MOVIE_URL] ? formik.errors[MovieFormValues.MOVIE_URL] : ''}
            value={formik.values[MovieFormValues.MOVIE_URL]}
          />

          <Dropdown 
            label="GENRE" 
            placeholder="Select Genre" 
            name={MovieFormValues.GENRE} 
            options={categories}
            error={formik.errors[MovieFormValues.GENRE] && formik.touched[MovieFormValues.GENRE] ? formik.errors[MovieFormValues.GENRE] : ''}
          />

          <Input 
            name={MovieFormValues.OVERVIEW}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Overview here'
            label="OVERVIEW"
            error={formik.errors[MovieFormValues.OVERVIEW] && formik.touched[MovieFormValues.OVERVIEW] ? formik.errors[MovieFormValues.OVERVIEW] : ''}
            value={formik.values[MovieFormValues.OVERVIEW]}
          />
          <Input 
            name={MovieFormValues.RUNTIME}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Runtime here'
            label="RUNTIME"
            error={ formik.errors[MovieFormValues.RUNTIME] && formik.touched[MovieFormValues.RUNTIME] ? formik.errors[MovieFormValues.RUNTIME] : ''}
            value={formik.values[MovieFormValues.RUNTIME]}
          />
          <div className={classes.buttons}>
            <Button 
              type={ButtonTypes.SECONDARY} 
              onButtonClicked={() => formik.resetForm()} 
            >
              RESET
            </Button>
            <Button
              isSubmit={true}
              type={ButtonTypes.PRIMARY}
              disabled={!formik.isValid || !formik.dirty}
            >
              { submitButtonLabel }
            </Button>
          </div>
        </form>
      )}
     </Formik>
  )
}

export default MovieForm;
