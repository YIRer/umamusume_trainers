import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
}));

const BonusRowInput = ({ addRow }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [lv30, setLv30] = useState("");
  const [lv35, setLv35] = useState("");
  const [lv40, setLv40] = useState("");
  const [lv45, setLv45] = useState("");
  const [lv50, setLv50] = useState("");

  const handleChangeLvEffect = (e, level) => {
    const value = e.target.value;
    switch (level) {
      case "30":
        setLv30(value);
        break;
      case "35":
        setLv35(value);
        break;
      case "40":
        setLv40(value);
        break;
      case "45":
        setLv45(value);
        break;
      case "50":
        setLv50(value);
        break;
    }
  };

  const addEffectRow = () => {
    addRow({
      name,
      effects: [lv30, lv35, lv40, lv45, lv50],
    });

    setName('')
    setLv30('')
    setLv35('')
    setLv40('')
    setLv45('')
    setLv50('')
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <TextField
          id="event-effect-table-name"
          name="event-effect-table-name"
          label="효과"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="event-effect-table-lv30"
          name="event-effect-table-lv30"
          label="Lv 30"
          value={lv30}
          onChange={(e) => {
            handleChangeLvEffect(e, "30");
          }}
        />
        <TextField
          id="event-effect-table-lv35"
          name="event-effect-table-lv35"
          label="Lv 35"
          value={lv35}
          onChange={(e) => {
            handleChangeLvEffect(e, "35");
          }}
        />
        <TextField
          id="event-effect-table-lv40"
          name="event-effect-table-lv40"
          label="Lv 40"
          value={lv40}
          onChange={(e) => {
            handleChangeLvEffect(e, "40");
          }}
        />
        <TextField
          id="event-effect-table-lv45"
          name="event-effect-table-lv45"
          label="Lv 45"
          value={lv45}
          onChange={(e) => {
            handleChangeLvEffect(e, "45");
          }}
        />
        <TextField
          id="event-effect-table-lv30"
          name="event-effect-table-lv30"
          label="Lv 50"
          value={lv50}
          onChange={(e) => {
            handleChangeLvEffect(e, "50");
          }}
        />
      </div>
      <IconButton color="primary" component="span" onClick={addEffectRow}>
        <Add /> 추가하기
      </IconButton>
    </div>
  );
};

export default BonusRowInput;
