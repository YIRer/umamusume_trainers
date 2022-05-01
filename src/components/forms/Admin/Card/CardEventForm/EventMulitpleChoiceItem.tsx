import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const EventMulitpleChoiceItem = ({
  eventResult,
  index,
  updateResults,
  deleteResults,
}) => {
  const classes = useStyles();

  const [condition, setCondition] = useState(eventResult.condition);
  const [result, setResult] = useState(eventResult.result);

  const onChangeCondition = (e) => {
    const value = e.target.value;
    setCondition(value);
    updateResultsList();
  };

  const onChangeResult = (e) => {
    const value = e.target.value;
    setResult(value);
    updateResultsList();
  };

  const updateResultsList = () => {
    updateResults({
      condition,
      result,
    });
  };

  const removeResult = () => {
    deleteResults(index);
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <TextField
          id="selection-results-condition"
          name="selection-results-condition"
          label="조건"
          value={condition}
          onChange={onChangeCondition}
        />
        <TextField
          id="selection-result"
          name="selection-result"
          label="결과"
          value={result}
          onChange={onChangeResult}
        />
      </div>
      <IconButton color="primary" component="span" onClick={removeResult}>
        <RemoveIcon />
      </IconButton>
    </div>
  );
};

export default EventMulitpleChoiceItem;
