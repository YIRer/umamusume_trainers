import React, { Dispatch, useReducer, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { UmamusumeType } from "types/Umamusume/umamusume";
import { SkillType } from "types/Skill/skill";
import { CardType } from "types/Card/card";
import {
  searchUmamusumeHelper,
  searchCardsHelper,
  searchSkillsHelper,
} from "helper";

import { initialState, reducer, ACTION_TYPES } from "./SearchReducers";

import SearchFilter from "./SearchFilter";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    marginBottom: "36px",
    flexDirection: "column",
  },

  searchWrapper: {
    display: "flex",
  },

  input: {
    width: "100%",
  },
  searchBtn: {
    marginLeft: "16px",
  },
  filterWrapper: {},
}));

type SearchFormProps = {
  data: Array<UmamusumeType | SkillType | CardType>;
  handleSearch: Dispatch<Array<UmamusumeType | SkillType | CardType>>;
  searchType: "Umamusume" | "Card" | "Skill";
};

export default function SearchForm({
  data,
  handleSearch,
  searchType,
}: SearchFormProps) {
  const classes = useStyles();
  const [searchOptions, stateDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onSearch();
  }, [searchOptions]);

  const handleChangeKeyword = (
    e: React.ChangeEvent<HTMLInputElement> & React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    stateDispatch({
      type: ACTION_TYPES.UPDATE_KEYWORD_FILTER,
      payload: value,
    });
  };

  const onSearch = () => {
    let searchData = [].concat(data);
    switch (searchType) {
      case "Umamusume":
        searchData = searchUmamusumeHelper({
          data: data as UmamusumeType[],
          searchOptions,
        });
        break;
      case "Card":
        searchData = searchCardsHelper({
          data: data as CardType[],
          searchOptions,
        });
        break;
      case "Skill":
        searchData = searchSkillsHelper({
          data: data as SkillType[],
          searchOptions,
        });
        break;
      default:
        break;
    }

    handleSearch(searchData);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const onUpdateStateByAction = ({ type, payload, checked }) => {
    stateDispatch({
      type,
      payload,
      checked,
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchWrapper}>
        <TextField
          classes={{ root: classes.input }}
          onChange={handleChangeKeyword}
          onBlur={handleChangeKeyword}
          label="이름 입력"
          id="search"
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
      <SearchFilter
        searchOptions={searchOptions}
        searchType={searchType}
        handleOnChange={onUpdateStateByAction}
      />
    </div>
  );
}
