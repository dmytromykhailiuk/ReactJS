import { RouterPaths } from "shared/enums";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ErrorPage } from "pages/error";
import { MainPage } from "pages/main";

const Routes = () => {
  return (
    <Switch>
      <Route path={RouterPaths.HOME} exact component={MainPage} />
      <Route path={RouterPaths.FILM} component={MainPage} />
      <Route path={RouterPaths.SEARCH} component={MainPage} />
      <Route path={RouterPaths.ERROR} render={({ history }) => {
        return <ErrorPage navigateToHome={() => history.push(RouterPaths.HOME)} />  
      }} />
      <Redirect to={RouterPaths.ERROR}/>
    </Switch>
  )
};

export default Routes;
