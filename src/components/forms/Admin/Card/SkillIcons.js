import React from "react";
import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import _ from "lodash";

const useStyles = makeStyles((_theme) => ({
  skillCard: {
    width: "100%",
    maxWidth: "250px",
    height: "100px",
    marginBottom: "10px",
    marginRight: "16px",
  },

  skillWrapper: {
    display: "flex",
    padding: "10px",
  },
  skillIcon: {
    width: "80px",
    height: "80px",
    marginRight: "10px",
  },
  skillInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const SkillIcons = ({ name, imageSrc, effect }) => {
  const classes = useStyles();
  return (
    <Card
      key={name}
      classes={{
        root: clsx(classes.skillCard),
      }}
    >
      <div className={classes.skillWrapper}>
        <img className={classes.skillIcon} src={imageSrc} alt={name} />
        <div className={classes.skillInfoWrapper}>
          <b>{`${name.ko} ${name.ja}`}</b>
          <span>{effect}</span>
        </div>
      </div>
    </Card>
  );
};

export default SkillIcons;
