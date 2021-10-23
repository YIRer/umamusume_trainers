import React, { useState, useReducer, useEffect, useMemo } from "react";
import _, { divide } from "lodash";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Collapse from "@material-ui/core/Collapse";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import { prefixImgSrc, searchCardsHelper } from "helper";

import { SearchCardsProps } from "./types";
import { CardType } from "types/Card/card";
import {
  initialState,
  reducer,
  ACTION_TYPES,
} from "components/Search/SearchReducers";
import SearchFilter from "components/Search/SearchFilter";
import { isEqual, omit } from "lodash";

const useStyles = makeStyles((theme) => ({
  paper: { minHeight: "500px", width: "400px" },

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
  openFilter: {
    width: "100%",
    margin: "10px 0",
  },
  titleRoot: {
    position: "relative",
  },
  filterWrapper: {
    position: "absolute",
    left: 0,
    padding: "0px 24px 10px",
    background: "#ffffff",
    zIndex: 10,
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

  const initData = {
    ...initialState,
    types: props.type,
  };

  const [openedFilter, setFilterOpened] = useState(false);
  const [targets, setTargets] = useState(props.selectedData || []);
  const [searchResult, setSearchResult] = useState(props.data);
  const [searchOptions, stateDispatch] = useReducer(reducer, initData);

  useEffect(() => {
    onSearch();
  }, [searchOptions]);

  const appliedFilter = useMemo(() => {
    const omittedInit = omit(initData, "keyword");
    const omittedSearchOptions = omit(searchOptions, "keyword");
    return !isEqual(omittedInit, omittedSearchOptions);
  }, [searchOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    stateDispatch({
      type: ACTION_TYPES.UPDATE_KEYWORD_FILTER,
      payload: value,
    });
  };

  const onSearch = () => {
    const searchData = searchCardsHelper({
      data: props.data as CardType[],
      searchOptions,
    }) as CardType[];
    setSearchResult(searchData);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
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

  const onUpdateStateByAction = ({ type, payload, checked }) => {
    stateDispatch({
      type,
      payload,
      checked,
    });
  };

  const showFilter = () => {
    setFilterOpened(true);
  };
  const hideFilter = () => {
    setFilterOpened(false);
  };
  const handleClear = () => {
    stateDispatch({
      type: ACTION_TYPES.CLEAR_ALL_FILTER_BY_PAYLOAD,
      payload: initData,
    });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      classes={{ paper: clsx(classes.paper) }}
    >
      <DialogTitle
        classes={{
          root: clsx(classes.titleRoot),
        }}
      >
        {props.type === "training" ? "육성" : "서포터"} 카드 선택
        <div className={clsx(classes.searchBar)}>
          <TextField
            id="keyword"
            name="keyword"
            label="카드 이름"
            onChange={handleChange}
            onBlur={onSearch}
            onKeyUp={handleKeyUp}
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
        <div className={classes.filterWrapper}>
          <Collapse in={openedFilter} timeout="auto" unmountOnExit>
            <SearchFilter
              searchOptions={searchOptions}
              searchType={"Card"}
              handleOnChange={onUpdateStateByAction}
              hideFilter={hideFilter}
              showBottomControl={props.type === "support"}
              hideOption={
                props.type === "training"
                  ? "hideTypeAndSupportTypeAndLimited"
                  : "hideType"
              }
              onClear={handleClear}
            />
          </Collapse>
        </div>
        {!openedFilter && (
          <Button
            type="button"
            variant={appliedFilter ? "contained" : "outlined"}
            color={appliedFilter ? "secondary" : "primary"}
            onClick={showFilter}
            className={clsx(classes.openFilter)}
          >
            필터 열기
          </Button>
        )}
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
