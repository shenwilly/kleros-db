import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import DisputesPage from "./pages/Disputes";
import CourtsPage from "./pages/Courts";
import AppsPage from "./pages/Apps";
import AboutPage from "./pages/About";
import { CgSpinner } from "react-icons/cg";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { CourtsProvider } from './contexts/Courts';
import useCourts from "./hooks/useCourts";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/shenwilly/kleros-liquid',
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  const { loaded } = useCourts(); // load court metadata
  const loadingClassName = loaded == true ? "fade-out": "";

  return (
    <>
      <SiteWrapper>
          <Router>
        <HeaderWrapper>
          <Header/>
        </HeaderWrapper>
        <PageWrapper>
              <Switch>
                <Route exact path="/">
                  <DisputesPage />
                </Route>
                <Route exact path="/disputes">
                  <DisputesPage />
                </Route>
                <Route exact path="/courts">
                  <CourtsPage />
                </Route>
                <Route exact path="/apps">
                  <AppsPage />
                </Route>
                <Route exact path="/about">
                  <AboutPage />
                </Route>
              </Switch>
        </PageWrapper>
          </Router>
      </SiteWrapper>
      <div className={loadingClassName}>
        <LoadingScreen>
          <CgSpinner className="f1 rotate-center"/>
        </LoadingScreen>
      </div>
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
          <CourtsProvider>
            {children}
          </CourtsProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

function withProviders<P>(
  Component: React.ComponentType<P>
) {
  const ComponentProviders = (props: P) => {
    return (
      <Providers>
        <Component {...props}/>
      </Providers>
    )
  };
  return ComponentProviders;
}

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
  z-index: 1;
  background-color: #fff;
  background-image:
    radial-gradient(at top left, rgb(242,227,255), transparent),
    radial-gradient(at top right, rgb(190,140,243), transparent),
    radial-gradient(at bottom left, rgb(172,120,225), transparent);
`

const LoadingScreen = styled.div.attrs({
  className: 'flex justify-center items-center'
})`
  z-index: 100;
  background-color: #fff;
  background-image:
    radial-gradient(at top left, rgb(242,227,255), transparent),
    radial-gradient(at top right, rgb(190,140,243), transparent),
    radial-gradient(at bottom left, rgb(172,120,225), transparent);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`

export default withProviders(App);