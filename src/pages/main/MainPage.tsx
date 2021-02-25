import React, { useState } from "react";
import { Banner, MovieBoard } from "./components";
import { movies as allMovies } from "../../mocks"
import { filterMovies, sortMovies } from "../../shared/helpers";

const MainPage: React.FC = () => {
  const [categories, onChangeCategories] = useState("ALL");
  const [searchingValue, onChangeSearchingValue] = useState("");
  const [isDownDirection, onChangeSortingDirection] = useState(true);

  const movies = sortMovies(filterMovies(allMovies, searchingValue, categories), isDownDirection);

  return (
    <>
      <header>
        <Banner onChangeSearchingValue={onChangeSearchingValue}/>
      </header>
      <main>
        <MovieBoard
          onChangeCategories={onChangeCategories}
          onChangeSortingDirection={onChangeSortingDirection}
          movies={movies}
        />
      </main>
    </>
  )
}

export default MainPage;