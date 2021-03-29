import React, { useEffect } from "react";
import { Footer, GoUpButton } from "shared/components";
import { useDispatch } from "react-redux";
import { loadMoviesAction } from "store/movies/actions";
import { Routes } from "router";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMoviesAction());
  }, [])

  return (
    <>  
      <Routes />
      <Footer />
      <GoUpButton />
    </>
  );
}

export default App;
