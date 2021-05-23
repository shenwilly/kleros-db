import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Disputes from "./pages/Disputes";
import Header from "./components/Header";
// import Footer from "./components/Footer";

const App: React.FC = () => {

  return (
    <>
      <Providers>
        <Header/>
        <PageWrapper>
          <Router>
              <Switch>
                <Route exact path="/">
                  <Disputes />
                </Route>
              </Switch>
              {/* <Footer/> */}
          </Router>
        </PageWrapper>
      </Providers>
    </>
  );
};

const Providers: React.FC = ({ children }) => {
  const theme = {
    padding: 8,
    paddingMedium: 16,

    greyLight: 'rgb(180, 180, 180)',
    grey: 'lightgrey',
    greyDark: 'grey',

    sm: '600px',
    md: '960px',
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </>
  );
};

const PageWrapper = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
`

export default App;