import React, { useReducer, useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import ObjectItem from "./ObjectItem";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    width: "100%",
  },
  button: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "100%",
  },
}));

export default function CardObjectForm({ list, updateList }) {
  const classes = useStyles();
  const [newObject, setNewObject] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      object: "",
      time: "",
      fan: "",
      raceCourse: "",
    }
  );

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setNewObject({ [name]: value });
  };

  const addButton = (e) => {
    e.preventDefault();
    updateList([...list, newObject]);
    setNewObject({
      object: "",
      time: "",
      fan: "",
      raceCourse: "",
    });
  };

  const editItem = (index, value) => {
    const updatedList = [...list];
    updatedList[index] = value;
    updateList(updatedList);
  };

  const deleteItem = (index) => {
    const removeList = list.filter((_item, i) => index !== i);
    updateList(removeList);
  };

  return (
    <FormControl classes={{ root: classes.formControl }}>
      <h4>육성 목표 추가</h4>
      <div>
        {list.map((item, index) => (
          <ObjectItem
            key={`objectt-${index}`}
            data={item}
            index={index}
            onDelete={deleteItem}
            onEdit={editItem}
          />
        ))}
      </div>
      <div className={classes.formWrapper}>
        <TextField
          className={clsx(classes.root)}
          id="object"
          name="object"
          label="육성 목표"
          value={newObject.object}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="time"
          name="time"
          label="시기"
          value={newObject.time}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="fan"
          name="fan"
          label="팬 수"
          value={newObject.fan}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="raceCourse"
          name="raceCourse"
          label="경기장"
          value={newObject.raceCourse}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={addButton}>
          목표 추가
        </Button>
      </div>
    </FormControl>
  );
}
