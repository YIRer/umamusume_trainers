import React, { useReducer, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #aaa",
    marginTop: "16px",
    padding: "16px",
    borderRadius: "10px",
  },
  button: {
    width: "calc(50% - 10px)",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
}));

const EventChoiceInput = ({
  choiceData,
  onConfirmChoice,
  onDelete,
  choiceIndex,
}) => {
  const classes = useStyles();

  const [choiceInputData, setChoiceInputData] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      ko: "",
      ja: "",
      result: "",
    }
  );

  useEffect(() => {
    setChoiceInputData({
      ko: choiceData.description.ko,
      ja: choiceData.description.ja,
      result: choiceData.result,
    });
  }, [choiceData]);

  const handleChange = (e) => {
    const name = e.target.name.split("-")[1];
    const value = e.target.value;

    setChoiceInputData({ [name]: value });
  };

  const handleConfirmChoice = () => {
    const { ko, ja, ...others } = choiceInputData;
    onConfirmChoice(
      {
        description: {
          ko,
          ja,
        },
        ...others,
      },
      choiceIndex
    );
  };

  const handleDelete = () => {
    onDelete(choiceIndex);
  };

  return (
    <div className={classes.wrapper}>
      <TextField
        className={clsx(classes.root)}
        id="selection-ja"
        name="selection-ja"
        label="선택지 (일본어)"
        value={choiceInputData.ja}
        onChange={handleChange}
      />
      <TextField
        className={clsx(classes.root)}
        id="selection-ko"
        name="selection-ko"
        label="선택지 (한국어)"
        value={choiceInputData.ko}
        onChange={handleChange}
      />
      <TextField
        className={clsx(classes.root)}
        id="result"
        name="selection-result"
        label="결과"
        value={choiceInputData.result}
        onChange={handleChange}
      />
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handleConfirmChoice}
        >
          적용
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default EventChoiceInput;
