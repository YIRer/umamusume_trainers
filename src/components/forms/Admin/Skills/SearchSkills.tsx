import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useQuery } from "@apollo/client";
import { GET_SKILLS } from "queries/skills";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import { prefixImgSrc } from "helper";

import { SkillType } from "types/Skill/skill";
import { Classes } from "types/Common/classes";
import { SearchSkills } from "./types";

const useStyles = makeStyles((_theme) => ({
  paper: { width: "368px", minHeight: "500px" },

  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "20px",
  },

  card: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
  },

  selected: {
    border: "2px solid #eb3734",
    boxSizing: "content-box",
  },

  searchBar: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "80% auto",
  },
  searchBtn: {
    marginLeft: "10px",
  },

  skillWrapper: {
    display: "flex",
    padding: "10px",
  },
  skillIcon: {
    width: "80px",
    height: "80px",
    marginRight: "10px",
  },
  skillInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "12px",
    "& > span": {
      fontSize: "12px",
    },
  },
}));

type SkillItem = {
  itemData: SkillType;
  classes: Classes;
  selectFn: (skill: SkillType, isSelected: boolean) => void;
  targets: SkillType[];
};

const SkillItem = ({ itemData, classes, selectFn, targets }: SkillItem) => {
  const isSelected = Boolean(_.find(targets, (d) => d.id === itemData.id));

  return (
    <Card
      key={`skill-${itemData.id}`}
      onClick={() => {
        selectFn(itemData, isSelected);
      }}
      classes={{
        root: clsx([classes.card, { [classes.selected]: isSelected }]),
      }}
    >
      <div className={classes.skillWrapper}>
        <img
          className={classes.skillIcon}
          src={prefixImgSrc(itemData.imageSrc)}
          alt={itemData.name.ko}
        />
        <div className={classes.skillInfoWrapper}>
          <b>
            {itemData.name.ko} <br /> {itemData.name.ja}
          </b>
          <span>{itemData.effect}</span>
        </div>
      </div>
    </Card>
  );
};

const SearchSkills = (props) => {
  const classes = useStyles();
  const {
    loading,
    data,
  }: {
    loading: boolean;
    data: { skills: SkillType[] };
  } = useQuery(GET_SKILLS);

  const [keyword, setKeyword] = useState("");
  const [targets, setTargets] = useState(props.selectedData || []);
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch();
  };

  const onSearch = () => {
    const searchData = data.skills.filter(({ name, tags }) => {
      const trimedKeyword = keyword.trim();
      return (
        name.ko.includes(trimedKeyword) ||
        name.ja.includes(trimedKeyword) ||
        tags.includes(trimedKeyword)
      );
    });
    setSearchResult(searchData);
  };

  const handleSelect: (skill: SkillType, isSelected: boolean) => void = (
    skill,
    isSelected
  ) => {
    if (isSelected) {
      const filteredArray = targets.filter((item) => item.id !== skill.id);
      setTargets(filteredArray);
    } else {
      setTargets([...targets, skill]);
    }
  };

  useEffect(() => {
    if (data && data.skills) {
      setSearchResult(data.skills);
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
      <DialogTitle>관련 스킬 선택</DialogTitle>
      <DialogContent>
        <FormControl classes={{ root: clsx(classes.searchBar) }}>
          <TextField
            id="keyword"
            name="keyword"
            label="스킬 정보 입력 (이름이나 태그)"
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
              SkillItem({ itemData, classes, selectFn: handleSelect, targets })
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

export default SearchSkills;
