import React from "react";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  button: {
    width: "100px",
    margin: "1rem",
  },
}));

export const Admin = () => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <List component="ul">
        <ListSubheader>우마무스메 관리</ListSubheader>
        <ListItem>
          <Link href="/admin/umamusume">
            <ListItemText primary="우마무스메 리스트" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/admin/umamusume/new">
            <ListItemText primary="우마무스메 추가" />
          </Link>
        </ListItem>
        <Divider />
        <ListSubheader>카드 관리</ListSubheader>
        <ListItem>
          <Link href="/cards">
            <ListItemText primary="카드 리스트" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/admin/cards/new">
            <ListItemText primary="카드 추가" />
          </Link>
        </ListItem>
        <Divider />
        <ListSubheader>스킬 관리</ListSubheader>{" "}
        <ListItem>
          <Link href="/skills">
            <ListItemText primary="스킬 리스트" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/cards">
            <ListItemText primary="스킬 리스트" />
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default Admin;
