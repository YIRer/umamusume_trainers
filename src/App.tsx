import React from "react";
import Paper from "@material-ui/core/Paper";
import AppRoutes from "./routes/Routes";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { CookiesProvider } from "react-cookie";

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: "16px",
    marginTop: "80px",
  },
}));

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

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Paper elevation={0} classes={{ root: classes.root }}>
          <AppRoutes />
        </Paper>
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default App;
