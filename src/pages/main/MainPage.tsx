import React, { useState } from "react";
import { Banner, MovieBoard } from "./components";
import { movies } from "mocks";
import { filterMoviesBySearchingValue } from "shared/helpers"

const MainPage: React.FC = () => {
  const [searchingValue, setSearchingValue] = useState<string>("");

  return (
    <>
      <header>
        <Banner
          onChangeSearchingValue={setSearchingValue}
        />
      </header>
      <main>
        <MovieBoard
          movies={filterMoviesBySearchingValue(movies, searchingValue)}
        />
      </main>
    </>
  )
}

export default MainPage;