import React from "react";
import classes from "./MovieForm.module.scss";
import { Formik } from 'formik';
import { FormData, Movie } from "models/";
import { Input, Dropdown, Button } from "../";
import { categories } from "mocks";
import { ButtonTypes, MovieFormValues } from "shared/enums";
import { generateId, ValidationSchema } from "shared/helpers";

interface MovieFormProps {
  onSubmitForm: (movie: Movie) => void;
  movie?: Movie;
  submitButtonLabel?: string;
}

const MovieForm: React.FC<MovieFormProps> = ({ onSubmitForm, movie = {}, submitButtonLabel = "SAVE" }) => {
  return (
    <Formik
      initialValues={{
        [MovieFormValues.TITLE]: movie.title || '',
        [MovieFormValues.RELEASE_DATE]: movie.releaseDate || '',
        [MovieFormValues.MOVIE_URL]: movie.url || '',
        [MovieFormValues.CATEGORY]: movie.category || [],
        [MovieFormValues.OVERVIEW]: movie.overview || '',
        [MovieFormValues.RUNTIME]: movie.runtime || '',
      }}
      validationSchema={ValidationSchema}
      validateOnBlur={true}
      onSubmit={(values: FormData) => {
        onSubmitForm({...values, id: movie.id || generateId()}); // using for edit and create
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {movie.id && <Input 
            disabled={true}
            name={MovieFormValues.MOVIE_ID}
            type="text"
            label="MOVIE ID"
            value={movie.id}
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
            name={MovieFormValues.CATEGORY} 
            options={categories}
            error={formik.errors[MovieFormValues.CATEGORY] && formik.touched[MovieFormValues.CATEGORY] ? formik.errors[MovieFormValues.CATEGORY] : ''}
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
