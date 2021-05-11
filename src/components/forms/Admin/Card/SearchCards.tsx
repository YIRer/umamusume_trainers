import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useQuery } from "@apollo/client";
import { GET_CARDS } from "queries/cards";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import { prefixImgSrc } from "helper";

import { CardType } from "types/Card/card";
import { SearchCards, SearchCardItem } from "./types";

const useStyles = makeStyles((_theme) => ({
  paper: { width: "368px", minHeight: "500px" },

  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "20px",
    "& > div": {
      marginRight: "10px",
      marginBottom: "10px",
    },
    "& > div:nth-child(3n)": { marginRight: "0" },
  },

  card: {
    width: "100px",
    height: "100px",
    border: "5px solid #ebd834",
    boxSizing: "content-box",
    backgroundPosition: "top center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
  },

  selected: {
    borderColor: "#eb3734",
  },

  searchBar: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "80% auto",
  },
  searchBtn: {
    marginLeft: "10px",
  },
}));

const CardItem = ({ itemData, classes, selectFn, targets }: SearchCardItem) => {
  const isSelected = Boolean(_.find(targets, (d) => d.id === itemData.id));

  return (
    <div
      key={`card-${itemData.id}`}
      onClick={() => {
        selectFn(itemData, isSelected);
      }}
      className={clsx([classes.card, { [classes.selected]: isSelected }])}
      style={{
        backgroundImage: `url(${prefixImgSrc(itemData.imageSrc)})`,
      }}
    ></div>
  );
};

const SearchCards = (props: SearchCards) => {
  const classes = useStyles();
  const { loading, data } = useQuery<{ cards: CardType[] }>(GET_CARDS);

  const [keyword, setKeyword] = useState("");
  const [targets, setTargets] = useState(props.selectedData || []);
  const [searchResult, setSearchResult] = useState<CardType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch();
  };

  const onSearch = () => {
    const searchData = data.cards.filter(({ name }) => {
      const trimedKeyword = keyword.trim();
      return name.ja.includes(trimedKeyword) || name.ko.includes(trimedKeyword);
    });
    setSearchResult(searchData);
  };

  const handleSelect = (card: CardType, isSelected: boolean) => {
    if (isSelected) {
      const filteredArray = targets.filter((item) => item.id !== card.id);
      setTargets(filteredArray);
    } else {
      setTargets([...targets, card]);
    }
  };

  useEffect(() => {
    if (data && data.cards) {
      setSearchResult(data.cards);
    }
  }, [data]);

  const onSelect = () => {
    props.onSelect(targets);
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      classes={{ paper: clsx(classes.paper) }}
    >
      <DialogTitle>관련카드 선택</DialogTitle>
      <DialogContent>
        <FormControl classes={{ root: clsx(classes.searchBar) }}>
          <TextField
            id="keyword"
            name="keyword"
            label="카드 이름"
            onChange={handleChange}
            onBlur={onSearch}
            disabled={loading}
          />
          <Button
            className={classes.searchBtn}
            variant="contained"
            color="primary"
            onClick={onSearch}
          >
            검색
          </Button>
        </FormControl>
        {loading ? (
          <div>loading...</div>
        ) : searchResult.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          <div className={clsx(classes.cardWrapper)}>
            {searchResult.map((itemData) =>
              CardItem({ itemData, classes, selectFn: handleSelect, targets })
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onSelect}>
          완료
        </Button>
        <Button variant="outlined" color="secondary" onClick={props.onClose}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchCards;
