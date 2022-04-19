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

const routes: {title: string; subroutes: {href: string, text: string}[]}[] = [{
  title: "우마무스메 관리",
  subroutes: [{
    href: "/admin/umamusume",
    text: "우마무스메 리스트"
  }, {
    href: "/admin/umamusume/new",
    text: "우마무스메 추가"
  }]
}, {
  title: "카드 관리",
  subroutes: [{
    href: "/cards",
    text: "카드 리스트"
  }, {
    href: "/admin/cards/new",
    text: "카드 추가"
  }]
}, {
  title: "스킬 관리",
  subroutes: [{
    href: "/skills",
    text: "스킬 리스트"
  }, {
    // NOTE 뭔가 이상함
    href: "/cards",
    text: "스킬 리스트"
  }]
}]

export const Admin = () => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <List component="ul">
        {routes.map(({title, subroutes}, index) => (
          <React.Fragment key={title}>
            <ListSubheader>{title}</ListSubheader>
            {subroutes.map(({href, text}) => (
              <ListItem key={href}>
                <Link href={href}>
                  <ListItemText primary={text}/>
                </Link>
              </ListItem>
            ))}
            {index !== routes.length - 1 ? <Divider/> : <></>}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Admin;
