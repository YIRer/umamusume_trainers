import React, { useReducer, useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import _ from "lodash";

import EventTypeRadioGroups from "./EventTypeRadioGroups";
import EventChoiceInput from "./EventChoiceInput";

import { cardEventTypes } from "../constants";

import type { EventInputFormProps } from "./types";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
  warpper: {
    flexDirection: "row",
  },
  formControl: {
    width: "100%",
  },
  textFieldWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "calc(50% - 10px)",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    marginBottom: "16px",
  },
}));

const initialEvent = {
  ko: "",
  ja: "",
  eventType: "once",
  tags: "",
  choices: [],
  condition: "",
};

const initialChoice = {
  description: {
    ko: "",
    ja: "없음",
  },
  result: "",
};

const EventInputForm = ({
  closeForm,
  onConfirm,
  initialData,
}: EventInputFormProps) => {
  const classes = useStyles();

  const [eventData, setEventInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    initialEvent
  );

  const [choices, setChoices] = useState([]);

  const setInitialData = () => {
    const { title, tags, choices, ...others } = initialData;
    setEventInput({
      ko: title.ko,
      ja: title.ja,
      tags: tags.join(","),
      ...others,
    });
    setChoices(choices);
  };

  useEffect(() => {
    if (initialData) {
      setInitialData();
    }
  }, [initialData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEventInput({ [name]: value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const { ko, ja, tags, __tempID, ...others } = eventData;

    onConfirm({
      title: { ko, ja },
      tags: tags.split(","),
      ...others,
      choices,
      __tempID: __tempID || _.uniqueId(others.eventType),
    });
    setEventInput(initialEvent);
  };

  const addNewChoice = () => {
    const updatedChoices = [...choices, initialChoice];
    setChoices(updatedChoices);
  };

  const updatehoice = (data, choiceIndex) => {
    const updatedData = [...choices];

    updatedData[choiceIndex] = data;
    setChoices(updatedData);
  };

  const removeChoice = (deleteIndex) => {
    const items = choices.filter((_d, index) => index !== deleteIndex);

    setChoices(items);
  };

  return (
    <FormControl classes={{ root: classes.formControl }}>
      <EventTypeRadioGroups
        data={cardEventTypes}
        name="eventType"
        value={eventData.eventType}
        onChange={handleChange}
      />
      <div className={classes.textFieldWrapper}>
        <TextField
          className={clsx(classes.root)}
          id="title-ja"
          name="ja"
          label="이벤트명 (일본어)"
          value={eventData.ja}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="title-ko"
          name="ko"
          label="이벤트명 (한국)"
          value={eventData.ko}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="condition"
          name="condition"
          label="조건"
          value={eventData.condition}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="tags"
          name="tags"
          label="태그 입력"
          value={eventData.tags}
          onChange={handleChange}
        />
      </div>

      <Button variant="contained" onClick={addNewChoice}>
        선택지 추가
      </Button>
      {choices.map((choice, index) => {
        return (
          <EventChoiceInput
            key={`choice-${index}`}
            choiceIndex={index}
            onDelete={removeChoice}
            onConfirmChoice={updatehoice}
            choiceData={choice}
          />
        );
      })}
      <div>
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleConfirm}
          >
            적용 하기
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            disableElevation
            onClick={closeForm}
          >
            등록 취소
          </Button>
        </div>
      </div>
    </FormControl>
  );
};

export default EventInputForm;
