import React from "react";
import dynamic from "next/dynamic";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import AppMainBar from "components/Common/AppMainBar";
import InFeed from "components/ADsense/InFeed";
import FooterADs from "components/ADsense/FooterADs";

const SideButtons = dynamic(() => import("components/Common/SideButtons"), {
  ssr: false,
});

const useStyles = makeStyles((_theme) => ({
  root: {
    padding: "16px",
    marginTop: "80px",
    minHeight: "calc(100vh - 80px)",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} classes={{ root: classes.root }}>
      <InFeed />
      <AppMainBar />
      {children}
      <SideButtons isFixed={true} />
      <FooterADs />
    </Paper>
  );
};

export default Layout;
