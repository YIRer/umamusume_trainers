import React from "react";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Helmet from "Helmet/Helmet";

import { makeStyles } from "@material-ui/core/styles";
import { prefixImgSrc } from "helper";

const useStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    width: "200px",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "24px",
  },
  linkItem: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    textAlign: "center",
  },
}));

const routes: {href: string; text: string;}[] = [{
  href: "/umamusume",
  text: "우마무스메 리스트"
}, {
  href: "/cards",
  text: "육성/서포터 카드 리스트"
}, {
  href: "/skills",
  text: "스킬 리스트"
}, {
  href: "/deck-builder",
  text: "덱 빌더"
}]

const MainPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet />
      <h1>우마무스메 트레이너스</h1>

      <img
        className={classes.logo}
        src={prefixImgSrc("/image/logo.png")}
        alt="umamusume-logo"
      />
      <div className={classes.links}>
        <List component="ul">
          {routes.map(({href, text}) => (
            <ListItem key={href} classes={{ root: classes.linkItem }}>
              <Link href={href}>
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default MainPage;
