import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Disputes from "./pages/Disputes";
import Header from "./components/Header";
import Courts from "./pages/Courts";
import Apps from "./pages/Apps";
import About from "./pages/About";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/shenwilly/kleros-liquid',
  cache: new InMemoryCache()
});

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
    purpleLight: 'rgb(202,150,255)',
    purpleLighter: 'rgb(242,227,255)',

    greyLight: 'rgb(180, 180, 180)',
    grey: 'lightgrey',
    greyDark: 'grey',

    sm: '600px',
    md: '960px',
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

const PageWrapper = styled.div.attrs({
  className: 'pt1'
})`
  min-height: 100vh;
  width: 100%;
`

const HeaderWrapper = styled.div.attrs({
  className: 'pt2'
})``

const SiteWrapper = styled.div`
  background-color: #fff;
  background-image:
    radial-gradient(at top left, rgb(242,227,255), transparent),
    radial-gradient(at top right, rgb(190,140,243), transparent),
    radial-gradient(at bottom left, rgb(172,120,225), transparent);
`

export default App;