import { useEffect } from "react";
import App from "next/app";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { CookiesProvider } from "react-cookie";

import { ApolloProvider } from "@apollo/client";

import Layout from "components/Layout";
import withApollo from "apollo-client";

import "../styles/globals.css";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function RootApp(props) {
  const { Component, pageProps, apollo } = props;

  return (
    <ApolloProvider client={apollo}>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
}

RootApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
export default withApollo(RootApp);
