import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_UMAMUSUMES_All_DATA } from "queries/umamusume";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

const useStyles = makeStyles((_theme) => ({
  paper: { width: "385px", minHeight: "500px" },

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
    boxSizing: "border-box",
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

const CardItem = ({ umamusume, classes, selectFn, target }) => {
  return (
    <div
      key={umamusume.name.default}
      onClick={() => {
        selectFn(umamusume);
      }}
      className={clsx([
        classes.card,
        { [classes.selected]: target && target.id === umamusume.id },
      ])}
      style={{
        backgroundImage: `url(${umamusume.imageSrc})`,
      }}
    ></div>
  );
};

const SearchUmamusume = (props) => {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_UMAMUSUMES_All_DATA);

  const [keyword, setKeyword] = useState("");
  const [target, setTarget] = useState(props.selectedData || null);
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch();
  };

  const onSearch = () => {
    const searchData = data.umamusumeList.filter(({ name }) => {
      return (
        name.ko.includes(keyword) ||
        name.ja.includes(keyword) ||
        name.en.includes(keyword)
      );
    });
    setSearchResult(searchData);
  };

  const handleSelect = (umamusume) => {
    setTarget(umamusume);
  };

  useEffect(() => {
    if (data && data.umamusumeList) {
      setSearchResult(data.umamusumeList);
    }
  }, [data]);

  const onSelect = () => {
    props.onSelect(target);
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      classes={{ paper: clsx(classes.paper) }}
    >
      <DialogTitle>우마무스메 선택</DialogTitle>
      <DialogContent>
        <FormControl classes={{ root: clsx(classes.searchBar) }}>
          <TextField
            id="keyword"
            name="keyword"
            label="우마무스메 이름"
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
            {searchResult.map((umamusume) =>
              CardItem({ umamusume, classes, selectFn: handleSelect, target })
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onSelect}>
          선택
        </Button>
        <Button variant="outlined" color="secondary" onClick={props.onClose}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchUmamusume;
