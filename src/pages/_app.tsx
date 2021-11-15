import * as React from "react";
import App from "next/app";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/client";
import withApollo from "apollo-client";
import ClientApp from "../App";
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

function MyApp(props) {
  const { Component, pageProps, apollo } = props;

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ApolloProvider client={apollo}>
        <ClientApp>
          <Component {...pageProps} />
        </ClientApp>
      </ApolloProvider>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
export default withApollo(MyApp);
