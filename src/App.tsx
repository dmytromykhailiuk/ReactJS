import React from "react";
import { MainPage } from "pages/main";
import { ErrorBoundary, Footer } from "shared/components";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ErrorPage } from "pages/error";
import { RouterPaths } from "shared/enums";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path={RouterPaths.HOME} exact component={MainPage} />
            <Route path={RouterPaths.FILM} component={MainPage} />
            <Route path={RouterPaths.SEARCH} component={MainPage} />
            <Route path={RouterPaths.ERROR} render={({ history }) => {
              return <ErrorPage navigateToHome={() => history.push('/')} />  
            }} />
            <Redirect to={RouterPaths.ERROR}/>
          </Switch>
        </Router>
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
