import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_CARDS } from "queries/cards";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";
import FilterVintageRoundedIcon from "@material-ui/icons/FilterVintageRounded";

import clsx from "clsx";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

import CardTags from "./CardTags";
import SearchForm from "../SearchForm";
import { isDev } from "../../constants";

const useStyles = makeStyles((_theme) => ({
  addButton: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1rem",
  },
  cardWrapper: {
    display: "flex",
  },
  cardRoot: {
    display: "flex",
    justifyContent: "center",
    width: "10rem",
    position: "relative",
    marginRight: "16px",
    marginBottom: "16px",
  },
  cardMedia: {
    width: "6.6rem",
    height: "6.6rem",
    backgroundPosition: "top center",
    margin: 0,
  },
  cardContent: {
    textAlign: "center",
  },
  linkWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  limited: {
    position: "absolute",
    top: "3px",
    right: "3px",
  },
}));

export const CardList = (_props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CARDS, []);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    if (data && data.cards) {
      setCardList(data.cards);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>육성/서포터 카드 리스트</h1>
      <SearchForm data={data.cards} handleSearch={setCardList} />
      <div className={classes.cardWrapper}>
        {cardList.map(({ name, id, imageSrc, star, type, limited }) => {
          return (
            <Card className={clsx(classes.cardRoot)} key={`card-${id}`}>
              {limited && (
                <FilterVintageRoundedIcon
                  className={clsx(classes.limited)}
                  color="secondary"
                />
              )}
              <Link className={clsx(classes.linkWrapper)} to={`/cards/${id}`}>
                <CardMedia
                  className={clsx(classes.cardMedia)}
                  image={imageSrc || "/image/temp.png"}
                  title={`${name.ja} ${name.ko}`}
                />
                <CardContent className={clsx(classes.cardContent)}>
                  <div>
                    {name.ja} {name.ko}
                  </div>
                  <Rating max={5} value={star} name={name.ja} disabled />
                  <CardTags type={type} limited={limited} />
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
      {isDev && (
        <Link to={"/admin/cards/new"} className={classes.addButton}>
          <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
        </Link>
      )}
    </div>
  );
};

export default CardList;
