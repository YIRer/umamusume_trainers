import React, { useState } from "react";
import Link from "next/link";

import Error from "next/error";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import SearchForm from "components/Search/SearchForm";

import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

import InFeed from "components/ADsense/InFeed";
import FooterAds from "components/ADsense/FooterAds";

const useStyles = makeStyles((_theme) => ({
  umamusumeListWrapper: {
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
    justifyContent: "center",
    width: "10rem",
    height: "10rem",
    marginRight: "16px",
    marginBottom: "16px",
  },
  cardMedia: {
    width: "6.6rem",
    height: "6.6rem",
    backgroundPosition: "top center",
    margin: 0,
  },
  cardName: {
    wordBreak: "keep-all",
    textAlign: "center",
  },
  linkWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

export const UmamusumeList = ({ data, statusCode }) => {
  const classes = useStyles();
  const [umamusumeList, setUmamusumeList] = useState(data.umamusumeList);

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div className={classes.umamusumeListWrapper}>
      <InFeed />
      <h1>우마무스메 리스트</h1>
      <SearchForm
        data={data.umamusumeList}
        handleSearch={setUmamusumeList}
        searchType={"Umamusume"}
      />
      <div className={classes.listWrapper}>
        {umamusumeList.map(({ name, id, imageSrc }) => {
          return (
            <Card className={clsx(classes.cardRoot)} key={id + name.default}>
              <Link href={`/umamusume/${id}`}>
                <a className={clsx(classes.linkWrapper)} target="_blank">
                  <CardMedia
                    className={clsx(classes.cardMedia)}
                    image={prefixImgSrc(imageSrc || "/image/temp.png")}
                    title={name.en}
                  />
                  <CardContent classes={{ root: classes.cardName }}>
                    {name.ko}
                  </CardContent>
                </a>
              </Link>
            </Card>
          );
        })}
      </div>
      {isDev && (
        <Link href={"/admin/umamusume/new"}>
          <a className={classes.addButton}>
            <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
          </a>
        </Link>
      )}
      <FooterAds />
    </div>
  );
};

export default UmamusumeList;
