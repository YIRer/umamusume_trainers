import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_SKILLS } from "queries/skills";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import clsx from "clsx";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

import Loader from "components/Common/Loader";

import SearchForm from "../SearchForm";
import * as isDev from "../../constants";
import { prefixImgSrc } from "helper";

const useStyles = makeStyles((_theme) => ({
  skillListWrapper: {
    maxWidth: "880px",
    margin: "auto",
  },
  addButton: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1rem",
  },
  cardRoot: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: "64px",
  },

  cardContentRoot: {
    width: "10rem",
    fontSize: "12px",
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
    maxWidth: "276px",
    height: "64px",
    marginRight: "16px",
    marginBottom: "16px",
  },
}));

export const Skills = (_props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_SKILLS, []);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    if (data && data.skills) {
      setSkillList(data.skills);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  return (
    <div className={classes.skillListWrapper}>
      <h1>스킬 리스트</h1>
      <SearchForm data={data.skills} handleSearch={setSkillList} />
      {skillList.map(({ name, id, imageSrc }) => {
        return (
          <Link
            className={clsx(classes.linkWrapper)}
            to={`/skills/${id}`}
            key={id + name.default}
          >
            <Card className={clsx(classes.cardRoot)}>
              <CardMedia
                className={clsx(classes.cardMedia)}
                image={prefixImgSrc(imageSrc || "/image/temp.png")}
                title={name}
              />
              <CardContent classes={{ root: clsx(classes.cardContentRoot) }}>
                {name.ja}
                <br />
                {name.ko}
              </CardContent>
            </Card>
          </Link>
        );
      })}
      {isDev && (
        <Link to={"/admin/skills/new"} className={classes.addButton}>
          <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
        </Link>
      )}
    </div>
  );
};

export default Skills;
