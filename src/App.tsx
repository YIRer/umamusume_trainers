import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { CookiesProvider } from "react-cookie";
import RHelmet from "./Helmet/Helmet";
import AppMainBar from "components/Common/AppMainBar";

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: "16px",
    marginTop: "80px",
  },
}));

const App = ({ children }) => {
  const classes = useStyles();
  return (
    <CookiesProvider>
      <Paper elevation={0} classes={{ root: classes.root }}>
        <RHelmet />
        <AppMainBar />
        {children}
      </Paper>
    </CookiesProvider>
  );
};

export default App;
