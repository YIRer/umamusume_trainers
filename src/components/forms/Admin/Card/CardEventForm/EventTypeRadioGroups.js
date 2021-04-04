import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import _ from "lodash";

const useStyles = makeStyles((_theme) => ({
  root: {
    marginTop: "16px",
  },
  warpper: {
    flexDirection: "row",
    margin: "16px",
  },
}));

const EventTypeRadioGroups = ({ data, name, value, onChange }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <b>이벤트 종류</b>
      <RadioGroup
        classes={{ root: classes.warpper }}
        name={name}
        value={value}
        onChange={onChange}
      >
        {data.map((item) => (
          <FormControlLabel
            value={item.value}
            key={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </div>
  );
};
export default EventTypeRadioGroups;
