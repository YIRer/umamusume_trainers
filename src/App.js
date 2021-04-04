import React from "react";
import Paper from "@material-ui/core/Paper";
import AppRoutes from "./routes/Routes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: "16px",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Paper elevation={0} classes={{ root: classes.root }}>
      <AppRoutes />
    </Paper>
  );
}

export default App;
