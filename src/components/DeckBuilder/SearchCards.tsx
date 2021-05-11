import React, { useState } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import { prefixImgSrc } from "helper";

import { SearchCardsProps } from "./types";
import { CardType } from "types/Card/card";

const useStyles = makeStyles((theme) => ({
  paper: { minHeight: "500px" },

  cardWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "& > div": {
      marginRight: "10px",
      marginBottom: "10px",
    },
    "& > div:nth-child(2n)": { marginRight: "0" },

    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
      "& > div:nth-child(3n)": { marginRight: "0" },
    },
  },

  card: {
    width: "100px",
    height: "100px",

    boxSizing: "border-box",
    backgroundPosition: "center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
  },

  selected: {
    border: "5px solid #eb3734",
  },

  dialogContent: {
    position: "relative",
  },

  searchBar: {
    display: "grid",
    gridTemplateColumns: "66% auto",
    background: "#fff",
  },
  searchBtn: {
    marginLeft: "10px",
  },
}));

const CardItem = ({ itemData, classes, selectFn, targets }) => {
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

const SearchCards = (props: SearchCardsProps) => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");
  const [targets, setTargets] = useState(props.selectedData || []);
  const [searchResult, setSearchResult] = useState(props.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch();
  };

  const onSearch = () => {
    const searchData = props.data.filter(({ name }) => {
      const trimedKeyword = keyword.trim();
      return name.ja.includes(trimedKeyword) || name.ko.includes(trimedKeyword);
    });
    setSearchResult(searchData);
  };

  const handleSelect = (card: CardType, isSelected: boolean) => {
    if (props.type === "training") {
      if (isSelected) {
        setTargets([]);
      } else {
        setTargets([card]);
      }
    } else {
      if (isSelected) {
        const filteredArray = targets.filter((item) => item.id !== card.id);
        setTargets([...filteredArray]);
      } else {
        if (targets.length >= 6) {
          return;
        }
        setTargets([...targets, card]);
      }
    }
  };

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
      <DialogTitle>
        {props.type === "training" ? "육성" : "서포터"} 카드 선택
        <div className={clsx(classes.searchBar)}>
          <TextField
            id="keyword"
            name="keyword"
            label="카드 이름"
            onChange={handleChange}
            onBlur={onSearch}
          />
          <Button
            className={classes.searchBtn}
            variant="contained"
            color="primary"
            onClick={onSearch}
          >
            검색
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        {searchResult.length === 0 ? (
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
