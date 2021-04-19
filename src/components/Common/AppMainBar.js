import React, { useState } from "react";
import { withRouter } from "react-router";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const NAVIGATIONS = [
  {
    path: "/",
    text: "메인으로",
  },
  {
    path: "/umamusume",
    text: "우마무스메 리스트",
  },
  {
    path: "/cards",
    text: "육성/서포터 카드 리스트",
  },
  {
    path: "/skills",
    text: "스킬 리스트",
  },
  {
    path: "/deck-builder",
    text: "덱 빌더",
  },
];

const useStyles = makeStyles((_theme) => ({
  toolBar: {
    justifyContent: "space-between",
  },

  iconButton: {
    color: "white",
  },
}));

export const NavDrawer = ({ open, onClose }) => {
  const handleOnClick = () => {
    onClose();
  };
  return (
    <Drawer anchor={"left"} open={open} onClose={onClose}>
      <List>
        {NAVIGATIONS.map((navData) => {
          return (
            <ListItem key={navData.text} onClick={handleOnClick}>
              <Link to={navData.path}>
                <ListItemText primary={navData.text} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export const AppMainBar = (props) => {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);
  const handleClickBack = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  const showNavDrawer = () => {
    setOpenNav(true);
  };

  const hideNavDrawer = () => {
    setOpenNav(false);
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolBar}>
        <IconButton className={classes.iconButton} onClick={showNavDrawer}>
          <MenuIcon />
        </IconButton>
        <NavDrawer open={openNav} onClose={hideNavDrawer} />
        <Link to={"/"}> 우마무스메 트레이너스</Link>
        <IconButton onClick={handleClickBack} className={classes.iconButton}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(AppMainBar);
