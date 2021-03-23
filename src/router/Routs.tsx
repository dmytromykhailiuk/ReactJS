import { RouterPaths } from "shared/enums";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ErrorPage } from "pages/error";
import { MainPageContainer } from "pages/main";

const Routs = () => {
  return (
    <Switch>
      <Route path={RouterPaths.HOME} exact component={MainPageContainer} />
      <Route path={RouterPaths.FILM} component={MainPageContainer} />
      <Route path={RouterPaths.SEARCH} component={MainPageContainer} />
      <Route path={RouterPaths.ERROR} render={({ history }) => {
        return <ErrorPage navigateToHome={() => history.push(RouterPaths.HOME)} />  
      }} />
      <Redirect to={RouterPaths.ERROR}/>
    </Switch>
  )
};

export default Routs;
