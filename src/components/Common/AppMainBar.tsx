import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";

import { NavDrawerProps } from "./types";

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

export const NavDrawer = ({ open, onClose }: NavDrawerProps) => {
  const handleOnClick = () => {
    onClose();
  };
  return (
    <Drawer anchor={"left"} open={open} onClose={onClose}>
      <List>
        {NAVIGATIONS.map((navData) => {
          return (
            <ListItem key={navData.text} onClick={handleOnClick}>
              <Link href={navData.path}>
                <ListItemText primary={navData.text} />
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export const AppMainBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const handleClickBack = (e) => {
    e.preventDefault();
    router.back();
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
        <Link href={"/"}> 우마무스메 트레이너스</Link>
        <IconButton onClick={handleClickBack} className={classes.iconButton}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppMainBar;
