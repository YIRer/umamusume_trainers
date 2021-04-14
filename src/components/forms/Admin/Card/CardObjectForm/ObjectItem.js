import React, { useReducer, useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    width: "100%",
    margin: "15px",
  },
  item: { flex: 1, display: "flex", justifyContent: "center" },
  buttonWrapper: {
    justifyContent: "space-between",
  },
  button: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "calc(50% - 8px)",
  },
}));

export default function ObjectItem({ data, index, onDelete, onEdit }) {
  const classes = useStyles();
  const [inputObject, setInputObject] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    data
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputObject({ [name]: value });
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handelEdit = () => {
    onEdit(index, inputObject);
  };

  return (
    <div className={classes.wrapper}>
      <TextField
        classes={{ root: classes.item }}
        id="object"
        name="object"
        label="육성 목표"
        value={inputObject.object}
        onChange={handleChange}
      />
      <TextField
        classes={{ root: classes.item }}
        id="time"
        name="time"
        label="시기"
        value={inputObject.time}
        onChange={handleChange}
      />
      <TextField
        classes={{ root: classes.item }}
        id="fan"
        name="fan"
        label="팬 수"
        value={inputObject.fan}
        onChange={handleChange}
      />
      <TextField
        classes={{ root: classes.item }}
        id="raceCourse"
        name="raceCourse"
        label="경기장"
        value={inputObject.raceCourse}
        onChange={handleChange}
      />
      <div className={clsx(classes.item, classes.buttonWrapper)}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handelEdit}
        >
          수정
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
