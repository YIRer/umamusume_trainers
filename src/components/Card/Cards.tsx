import React, { useState } from "react";
import Link from "next/link";
import Error from "next/error";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";
import FilterVintageRoundedIcon from "@material-ui/icons/FilterVintageRounded";

import clsx from "clsx";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

import { makeStyles } from "@material-ui/core/styles";

import CardTags from "./CardTags";
import SearchForm from "components/Search/SearchForm";
import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

const useStyles = makeStyles((_theme) => ({
  cardsWrapper: {
    maxWidth: "800px",
    margin: "auto",
  },
  addButton: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1rem",
  },
  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardRoot: {
    display: "flex",
    justifyContent: "center",
    width: "150px",
    position: "relative",
    marginRight: "10px",
    marginBottom: "16px",
    paddingTop: "10px",
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
    right: "0px",
  },
  name: {
    fontSize: "12px",
  },
  cardImgWrapper: {
    position: "relative",
  },

  typeIcon: {
    width: "25px",
    height: "25px",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
}));

export const CardList = ({ data, statusCode }) => {
  const classes = useStyles();
  const [cardList, setCardList] = useState(data.cards);

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div className={classes.cardsWrapper}>
      <h1>육성/서포터 카드 리스트</h1>
      <SearchForm
        data={data.cards}
        handleSearch={setCardList}
        searchType={"Card"}
      />
      검색된 카드 수: {cardList.length}
      <div className={classes.cardWrapper}>
        {cardList.map(
          ({ name, id, imageSrc, star, type, limited, supportType }) => {
            return (
              <Card className={clsx(classes.cardRoot)} key={`card-${id}`}>
                {limited && (
                  <FilterVintageRoundedIcon
                    className={clsx(classes.limited)}
                    color="secondary"
                  />
                )}
                <Link href={`/cards/${id}`}>
                  <a className={clsx(classes.linkWrapper)}>
                    <div className={classes.cardImgWrapper}>
                      <CardMedia
                        className={clsx(classes.cardMedia)}
                        image={prefixImgSrc(imageSrc || "/image/temp.png")}
                        title={`${name.ja} ${name.ko}`}
                      />
                      {supportType && (
                        <img
                          className={classes.typeIcon}
                          src={prefixImgSrc(`/image/icons/${supportType}.png`)}
                          alt={supportType}
                        />
                      )}
                    </div>
                    <CardContent className={clsx(classes.cardContent)}>
                      <div className={classes.name}>
                        {name.ja}
                        <br />
                        {name.ko}
                      </div>
                      <Rating max={5} value={star} name={name.ja} disabled />
                      <CardTags type={type} limited={limited} />
                    </CardContent>
                  </a>
                </Link>
              </Card>
            );
          }
        )}
      </div>
      {isDev && (
        <Link href={"/admin/cards/new"}>
          <a className={classes.addButton}>
            <AddCircleOutlineRoundedIcon fontSize="large" color="primary" />
          </a>
        </Link>
      )}
    </div>
  );
};

export default CardList;
