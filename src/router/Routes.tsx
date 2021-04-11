import { RouterPaths } from "shared/enums";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ErrorPage } from "pages/error";
import { MainPage } from "pages/main";
import { navigateToHome } from "../shared/helpers";

const Routes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.ERROR} render={() => <ErrorPage navigateToHome={navigateToHome} /> } />
      <Route path={[RouterPaths.HOME, RouterPaths.SEARCH, RouterPaths.FILM]} exact component={MainPage} />
      <Redirect to={RouterPaths.ERROR}/>
    </Switch>
  )
};

export default Routes;
