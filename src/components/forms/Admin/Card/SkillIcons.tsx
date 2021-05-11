import React from "react";
import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";
import { prefixImgSrc } from "helper";

import clsx from "clsx";

import { SkillIconsProps } from "./types";

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
    fontSize: "12px",
  },
}));

const SkillIcons = ({ name, imageSrc, effect }: SkillIconsProps) => {
  const classes = useStyles();
  return (
    <Card
      key={`${name.ja} ${name.ko}`}
      classes={{
        root: clsx(classes.skillCard),
      }}
    >
      <div className={classes.skillWrapper}>
        <img
          className={classes.skillIcon}
          src={prefixImgSrc(imageSrc)}
          alt={`${name.ja} ${name.ko}`}
        />
        <div className={classes.skillInfoWrapper}>
          <b>{`${name.ja} ${name.ko}`}</b>
          <span>{effect}</span>
        </div>
      </div>
    </Card>
  );
};

export default SkillIcons;
