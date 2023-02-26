import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import { ACTION_TYPES } from "./SearchReducers";
import { SEARCH_FILTTER_OPTIONS } from "./constants";
import { prefixImgSrc } from "helper";
import {
  CheckboxFilterItemType,
  CheckboxFilterType,
  RadioFilterItemType,
  RadioFilterType,
  FilterRenderHelperProps,
  SearchFilterProps,
  SeachFilterCardStateKey,
  SeachFilterSkillStateKey,
  FilterControlType,
} from "./types";

const useStyles = makeStyles((_theme) => ({
  filterWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  filterGroupWrapper: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    gridGap: "10px 8px",
    border: "1px solid #eee",
    padding: "8px",
    "& nth-last-child": {
      borderTop: "none",
    },
    "& > span": {
      borderRight: "1px solid #eee",
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px",
      width: "100px",
      textAlign: "center",
      wordBreak: "keep-all",
    },
    "& img": {
      width: "40px",
      height: "40px",
    },
  },
  gradientText: {
    color: " #ffffff",
    fontSize: "30px",
    fontWeight: "bold",
  },
  ssrText: {
    textTransform: "uppercase",
    "-webkit-background-clip": "text",
    textStroke: "4px transparent",
    background:
      "linear-gradient(90deg, rgba(200,255,255,1) 16%, rgba(255,205,239,1) 43%, rgba(255,255,255,1) 64%, rgba(200,255,255,1) 70%, rgba(255,205,239,1) 100%)",
  },
  srText: {
    textTransform: "uppercase",
    "-webkit-background-clip": "text",
    textStroke: "4px transparent",
    background:
      "linear-gradient(90deg, rgba(255,194,56,1) 0%, rgba(251,255,200,1) 24%, rgba(255,217,67,1) 44%, rgba(255,255,255,1) 58%, rgba(252,250,132,1) 60%, rgba(255,194,56,1) 100%)",
  },

  nText: {
    textTransform: "uppercase",
    "-webkit-background-clip": "text",
    textStroke: "4px transparent",
    background:
      "linear-gradient(90deg, rgba(119,125,125,1) 0%, rgba(255,255,255,1) 72%, rgba(119,125,125,1) 100%)",
  },
  filterControlWrapper: {
    display: "grid",
    gridGap: "8px",
    gridTemplateColumns: "1fr 1fr",
    margin: "10px 0",
  },
}));

function CheckboxFilterItem({
  checked,
  onChange,
  value,
  label,
  searchType,
  optionKey,
  disabled,
  imgSrc,
  classes,
}: CheckboxFilterItemType) {
  const handleChange = () => {
    let type = "";
    if (searchType === "Card") {
      switch (optionKey) {
        case "rarity":
          type = ACTION_TYPES.UPDATE_RARITY_FILTER;
          break;
        case "supportTypes":
          type = ACTION_TYPES.UPDATE_SUPPORT_TYPE_FILTER;
          break;
      }
    } else if (searchType === "Skill") {
      switch (optionKey) {
        case "skillRarity":
          type = ACTION_TYPES.UPDATE_SKILL_RARITY_FILTER;
          break;
        case "skillDistance":
          type = ACTION_TYPES.UPDATE_SKILL_DISTANCE_FILTER;
          break;
        case "skillStrategy":
          type = ACTION_TYPES.UPDATE_SKILL_STRATEGY_FILTER;
          break;
      }
    }

    onChange({
      type,
      payload: value,
      checked,
    });
  };
  const iconImgOrLabel = imgSrc ? (
    <img src={prefixImgSrc(imgSrc)} alt={label} />
  ) : (
    <span
      className={clsx({
        [classes.gradientText]: optionKey === "rarity",
        [classes.nText]: optionKey === "rarity" && value === 1,
        [classes.srText]: optionKey === "rarity" && value === 2,
        [classes.ssrText]: optionKey === "rarity" && value === 3,
      })}
    >
      {label}
    </span>
  );
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name={label}
          disabled={disabled}
        />
      }
      label={iconImgOrLabel}
    />
  );
}

function CheckboxFilter({
  data,
  options,
  onChange,
  optionKey,
  searchType,
  conditionProps,
}: CheckboxFilterType) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {options.values.map((value, index) => {
        const label = options.labels[index];
        const imgSrc =
          (optionKey === "skillRarity" || optionKey === "supportTypes") &&
          options.imgSrc[index];

        return (
          <CheckboxFilterItem
            key={`checkbox-${label}-${index}`}
            checked={(data as Array<string | number | boolean>).includes(value)}
            onChange={onChange}
            value={value}
            label={label}
            searchType={searchType}
            optionKey={optionKey}
            disabled={
              optionKey === "supportTypes" &&
              conditionProps?.types === "training"
            }
            imgSrc={imgSrc}
            classes={classes}
          />
        );
      })}
    </React.Fragment>
  );
}

function RadioFilterItem({
  checked,
  onChange,
  value,
  label,
  optionKey,
}: RadioFilterItemType) {
  const handleChange = () => {
    let type = "";
    switch (optionKey) {
      case "types":
        type = ACTION_TYPES.UPDATE_PLAYABLE_FILTER;
        break;
      case "limited":
        type = ACTION_TYPES.UPDATE_LIMITED_FILTER;
        break;
      case "skillGroundType":
        type = ACTION_TYPES.UPDATE_SKILL_GROUND_FILTER;
        break;
    }

    onChange({
      type,
      payload: value,
    });
  };

  return (
    <FormControlLabel
      control={<Radio checked={checked} onChange={handleChange} />}
      value={value}
      label={label}
    />
  );
}

function RadioFilter({ data, options, onChange, optionKey }: RadioFilterType) {
  return (
    <RadioGroup>
      {options.values.map((value, index) => {
        const label = options.labels[index];

        return (
          <RadioFilterItem
            key={`radio-${label}-${index}`}
            checked={data === value}
            onChange={onChange}
            value={value}
            label={label}
            optionKey={optionKey}
          />
        );
      })}
    </RadioGroup>
  );
}

function FilterRenderHelper({
  data,
  searchOption,
  onChange,
  searchType,
  optionKey,
  conditionProps,
}: FilterRenderHelperProps) {
  const { selector } = searchOption;
  if (selector === "checkbox") {
    return (
      <CheckboxFilter
        data={data}
        options={searchOption}
        onChange={onChange}
        searchType={searchType}
        optionKey={optionKey}
        conditionProps={conditionProps}
      />
    );
  }

  if (selector === "radio") {
    return (
      <RadioFilter
        data={data}
        options={searchOption}
        onChange={onChange}
        optionKey={optionKey}
      />
    );
  }
}

function FilterControl({ onChange, hideFilter, onClear }: FilterControlType) {
  const classes = useStyles();
  const clearAllFilter = () => {
    if (onClear) {
      onClear();
      return;
    }
    onChange({
      type: ACTION_TYPES.CLEAR_ALL_FILTER,
    });
  };

  return (
    <div className={classes.filterControlWrapper}>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        onClick={hideFilter}
      >
        필터 닫기
      </Button>
      <Button onClick={clearAllFilter} color={"secondary"} variant="contained">
        상세필터 초기화
        <AutorenewIcon />
      </Button>
    </div>
  );
}

function SearchFilter({
  searchOptions,
  searchType,
  handleOnChange,
  hideFilter,
  showBottomControl = false,
  hideOption,
  onClear,
}: SearchFilterProps) {
  if (searchType === "Umamusume") {
    return null;
  }
  const classes = useStyles();
  const filterOptions = SEARCH_FILTTER_OPTIONS[searchType];
  const keyOfFilterOptions = Object.keys(filterOptions);

  return (
    <div className={classes.filterWrapper}>
      <FilterControl
        onChange={handleOnChange}
        hideFilter={hideFilter}
        onClear={onClear}
      />
      {keyOfFilterOptions.map((key) => {
        if (
          (hideOption === "hideTypeAndSupportTypeAndLimited" &&
            (key === "types" || key === "supportTypes" || key === "limited")) ||
          (hideOption === "hideType" && key === "types")
        ) {
          return null;
        }
        return (
          <div className={classes.filterGroupWrapper} key={`filter-${key}`}>
            <span>{filterOptions[key].type}</span>
            <div>
              <FilterRenderHelper
                data={searchOptions[key]}
                searchOption={filterOptions[key]}
                onChange={handleOnChange}
                searchType={searchType}
                optionKey={
                  key as SeachFilterCardStateKey | SeachFilterSkillStateKey
                }
                conditionProps={{ types: searchOptions.types, hideOption }}
              />
            </div>
          </div>
        );
      })}
      {showBottomControl && (
        <FilterControl
          onChange={handleOnChange}
          hideFilter={hideFilter}
          onClear={onClear}
        />
      )}
    </div>
  );
}

export default SearchFilter;
