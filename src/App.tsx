import React from "react";
import { MainPage } from "pages/main";
import { ErrorBoundary, Footer } from "shared/components";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <MainPage />
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
