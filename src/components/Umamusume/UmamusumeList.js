import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_UMAMUSUMES } from "queries/umamusume";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import SearchForm from "../SearchForm";
import Loader from "components/Common/Loader";

import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

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
  },
}));

export const UmamusumeList = (_props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_UMAMUSUMES, []);
  const [umamusumeList, setUmamusumeList] = useState([]);

  useEffect(() => {
    if (data && data.umamusumeList) {
      setUmamusumeList(data.umamusumeList);
    }
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.umamusumeListWrapper}>
      <h1>우마무스메 리스트</h1>
      <SearchForm data={data.umamusumeList} handleSearch={setUmamusumeList} />
      <div className={classes.listWrapper}>
        {umamusumeList.map(({ name, id, imageSrc }) => {
          return (
            <Card className={clsx(classes.cardRoot)} key={id + name.default}>
              <Link
                className={clsx(classes.linkWrapper)}
                to={`/umamusume/${id}`}
              >
                <CardMedia
                  className={clsx(classes.cardMedia)}
                  image={prefixImgSrc(imageSrc || "/image/temp.png")}
                  title={name.en}
                />
                <CardContent classes={{ root: classes.cardName }}>
                  {name.ko}
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
      {isDev && (
        <Link to={"/admin/umamusume/new"} className={classes.addButton}>
          <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
        </Link>
      )}
    </div>
  );
};

export default UmamusumeList;
