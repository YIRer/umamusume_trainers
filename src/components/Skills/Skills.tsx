import React, { useState } from "react";
import Link from "next/link";

import Error from "next/error";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import clsx from "clsx";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

import SearchForm from "components/Search/SearchForm";
import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

import InFeed from "components/ADsense/InFeed";
import FooterAds from "components/ADsense/FooterAds";

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
  skillsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

export const Skills = ({ data, statusCode }) => {
  const classes = useStyles();
  const [skillList, setSkillList] = useState(data.skills);

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div className={classes.skillListWrapper}>
      <InFeed />
      <h1>스킬 리스트</h1>
      <SearchForm
        data={data.skills}
        handleSearch={setSkillList}
        searchType={"Skill"}
      />
      검색된 스킬 수: {skillList.length}
      <div className={classes.skillsWrapper}>
        {skillList.map(({ name, id, imageSrc }) => {
          return (
            <Link href={`/skills/${id}`} key={id + name.default}>
              <a className={clsx(classes.linkWrapper)} target="_blank">
                <Card className={clsx(classes.cardRoot)}>
                  <CardMedia
                    className={clsx(classes.cardMedia)}
                    image={prefixImgSrc(imageSrc || "/image/temp.png")}
                    title={name}
                  />
                  <CardContent
                    classes={{ root: clsx(classes.cardContentRoot) }}
                  >
                    {name.ja}
                    <br />
                    {name.ko}
                  </CardContent>
                </Card>
              </a>
            </Link>
          );
        })}
      </div>
      {isDev && (
        <Link href={"/admin/skills/new"}>
          <a className={classes.addButton}>
            <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
          </a>
        </Link>
      )}
      <FooterAds />
    </div>
  );
};

export default Skills;
