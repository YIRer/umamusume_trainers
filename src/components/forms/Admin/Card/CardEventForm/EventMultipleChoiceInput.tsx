import React, { useState } from "react";

import EventMulitpleChoiceItem from "./EventMulitpleChoiceItem";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: "16px 15px",
  },

  formWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const EventMultipleChoiceInput = ({ updateResults }) => {
  const classes = useStyles();

  const [results, setResults] = useState([]);
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState("");

  const updateResult = (data, index) => {
    const updatedResult = results.map((result, idx) => {
      if (index === idx) {
        return data;
      } else {
        return result;
      }
    });
    setResults(updatedResult);

    updateResults(updatedResult);
  };

  const addResult = () => {
    const updatedResults = [
      ...results,
      {
        condition: condition,
        result: result,
      },
    ];
    setResults(updatedResults);

    setCondition("");
    setResult("");
    updateResults(updatedResults);
  };
  const deleteEventResult = (idx) => {
    setResults(results.filter((_r, index) => index !== idx));
  };

  const onChangeCondition = (e) => {
    const value = e.target.value;
    setCondition(value);
  };

  const onChangeResult = (e) => {
    const value = e.target.value;
    setResult(value);
  };

  return (
    <div className={classes.wrapper}>
      {results.map((result, index) => {
        return (
          <EventMulitpleChoiceItem
            key={`event-results-${index}`}
            eventResult={result}
            updateResults={updateResult}
            deleteResults={deleteEventResult}
            index={index}
          />
        );
      })}

      <div className={classes.formWrapper}>
        <div>
          <TextField
            id="selection-results-condition"
            name="selection-ko"
            label="조건"
            value={condition}
            onChange={onChangeCondition}
          />
          <TextField
            id="result"
            name="selection-result"
            label="결과"
            value={result}
            onChange={onChangeResult}
          />
        </div>
        <IconButton color="primary" component="span" onClick={addResult}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default EventMultipleChoiceInput;
