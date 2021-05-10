import React from "react";

import Radio from "@material-ui/core/Radio";
import { prefixImgSrc } from "helper";
import { makeStyles } from "@material-ui/core/styles";

import { IconRadioGroupsProps } from "./types";

const useStyles = makeStyles((_theme) => ({
  warpper: {
    padding: "15px",
  },
  radioWarpper: {
    display: "flex",
    alignItems: "center",
  },
  label: { display: "flex", alignItems: "center" },
  img: {
    width: "50px",
    height: "50px",
  },
  span: {
    marginLeft: "10px",
  },
}));

export const IconRadioGroups = ({
  data,
  name,
  value,
  onChange,
}: IconRadioGroupsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.warpper}>
      <h4>스킬 아이콘</h4>
      {data.map((item) => (
        <div key={item.id} className={classes.radioWarpper}>
          <Radio
            checked={item.value === value}
            name={name}
            value={item.value}
            id={item.id}
            onChange={onChange}
          />
          <label htmlFor={item.id} className={classes.label}>
            <img
              className={classes.img}
              src={prefixImgSrc(item.value)}
              alt={item.label}
            />
            <span className={classes.span}>{item.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default IconRadioGroups;
