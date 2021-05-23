import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Disputes from "./pages/Disputes";
import Header from "./components/Header";
import Courts from "./pages/Courts";
import Apps from "./pages/Apps";
import About from "./pages/About";

const App: React.FC = () => {

  return (
    <>
      <Providers>
        <SiteWrapper>
            <Router>
          <HeaderWrapper>
            <Header/>
          </HeaderWrapper>
          <PageWrapper>
                <Switch>
                  <Route exact path="/">
                    <Disputes />
                  </Route>
                  <Route exact path="/disputes">
                    <Disputes />
                  </Route>
                  <Route exact path="/courts">
                    <Courts />
                  </Route>
                  <Route exact path="/apps">
                    <Apps />
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                </Switch>
          </PageWrapper>
            </Router>
        </SiteWrapper>
      </Providers>
    </>
  );
};

const Providers: React.FC = ({ children }) => {
  const theme = {
    padding: 8,
    paddingMedium: 16,

    purplePrimary: 'rgb(144,20,254)',
    purpleDark: 'rgb(66,3,159)',
    purpleDarker: 'rgb(30,7,95)',
    purpleLighter: 'rgb(202,150,255)',
    purpleLightest: 'rgb(242,227,255)',

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

const HeaderWrapper = styled.div.attrs({
  className: 'pt2'
})``

const SiteWrapper = styled.div`
  background-color: #fff;
  background-image:
    radial-gradient(at top left, rgb(232,217,245), transparent),
    radial-gradient(at top right, rgb(202,150,255), transparent),
    radial-gradient(at bottom left, rgb(202,150,255), transparent);
`

export default App;