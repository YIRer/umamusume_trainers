import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_SKILLS } from "queries/skills";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import clsx from "clsx";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  addButton: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1rem",
  },
  cardRoot: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  cardContentRoot: {
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  cardMedia: {
    width: "50px",
    height: "50px",
    backgroundPosition: "top center",
    margin: 0,
  },
  linkWrapper: {
    width: "100%",
    maxWidth: "200px",
    marginRight: "16px",
  },
}));

export const Skills = (_props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_SKILLS, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.skills.map(({ name, id, imageSrc }) => {
        return (
          <Link
            className={clsx(classes.linkWrapper)}
            to={`/skills/${id}`}
            key={id + name.default}
          >
            <Card className={clsx(classes.cardRoot)}>
              <CardMedia
                className={clsx(classes.cardMedia)}
                image={imageSrc || "/image/temp.png"}
                title={name}
              />
              <CardContent classes={{ root: clsx(classes.cardContentRoot) }}>
                {name.ko}
                <br />
                {name.ja}
              </CardContent>
            </Card>
          </Link>
        );
      })}
      <Link to={"/admin/skills/new"} className={classes.addButton}>
        <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
      </Link>
    </div>
  );
};

export default Skills;
