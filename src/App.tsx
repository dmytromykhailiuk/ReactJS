import React, { useEffect } from "react";
import { Footer, GoUpButton } from "shared/components";
import { useDispatch } from "react-redux";
import { loadMoviesAction } from "store/movies/actions";
import { Routs } from "router";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMoviesAction());
  }, [])

  return (
    <>  
      <Routs />
      <Footer />
      <GoUpButton />
    </>
  );
}

export default App;
