import React, { useReducer, useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles } from "@material-ui/core/styles";
import type { BonusInputFormProps } from "./types";

const requiredLevel = [
  { value: "none", label: "없음" },
  { value: "5", label: "5 ~" },
  { value: "10", label: "10 ~" },
  { value: "15", label: "15 ~" },
  { value: "20", label: "20 ~" },
  { value: "25", label: "25 ~" },
  { value: "30", label: "30 ~" },
  { value: "35", label: "35 ~" },
  { value: "40", label: "40 ~" },
  { value: "45", label: "45 ~" },
];

const useStyles = makeStyles((_theme) => ({
  bonusWrapper: {
    display: "flex",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },

  button: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "calc(50% - 8px)",
  },
}));

const BonusInputForm = ({ closeForm, onConfirm }: BonusInputFormProps) => {
  const classes = useStyles();
  const [bonusData, setBonusInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      level: "none",
      effect: "",
      maxEffect: "",
    }
  );
  const [isUnique, setUnique] = useState(false);

  const handleChange = (e) => {
    const [_type, name] = e.target.name.split("-");
    const value = e.target.value;

    setBonusInput({ [name]: value });
  };

  const handleChangeCheckbox = (e) => {
    const value = e.target.checked;

    setUnique(value);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    onConfirm(bonusData, isUnique);
  };

  return (
    <FormControl classes={{ root: classes.bonusWrapper }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isUnique}
            onChange={handleChangeCheckbox}
            name="unique"
          />
        }
        label="고유 능력"
      />

      <TextField
        select
        id="bonus-level"
        name="bonus-level"
        label="필요 레벨"
        value={bonusData.level}
        onChange={handleChange}
      >
        {requiredLevel.map((option) => (
          <MenuItem
            key={`required-levelr-${option.value}`}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="bonus-effect"
        name="bonus-effect"
        label="효과"
        value={bonusData.effect}
        onChange={handleChange}
      />
      {!isUnique && (
        <TextField
          id="bonus-maxEffect"
          name="bonus-maxEffect"
          label="최대 레벨 보너스"
          value={bonusData.maxEffect}
          onChange={handleChange}
        />
      )}
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
    </FormControl>
  );
};

export default BonusInputForm;
