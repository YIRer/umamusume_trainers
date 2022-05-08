import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import { Typography } from "@material-ui/core";
import { CardOriginalEffectType } from "types/Card/bonus";

interface Props {
  updateOriginalEffect: (effect: CardOriginalEffectType) => void;
  initialData?: CardOriginalEffectType;
}

const OriginalEffectForm = ({ updateOriginalEffect, initialData }: Props) => {
  const [level, setLevel] = useState(initialData?.level ?? "");
  const [effect, setEffect] = useState(initialData?.effect ?? "");

  const updateEffect = () => {
    updateOriginalEffect({
      level,
      effect,
    });
    setLevel("");
    setEffect("");
  };

  const removeEffect = () => {
    setLevel("");
    setEffect("");
    updateOriginalEffect({
      level: "",
      effect: "",
    });
  };

  return (
    <div>
      <div>
        <Typography variant="body1">{initialData?.level}</Typography>
        <Typography variant="body2">{initialData?.effect}</Typography>

        <IconButton onClick={removeEffect}>
          <Remove />
        </IconButton>
      </div>
      <div>
        <TextField
          id="original-effect-level"
          name="original-effect-level"
          label="레벨"
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        />
        <TextField
          id="original-effect-effect"
          name="original-effect-effect"
          label="효과"
          value={effect}
          onChange={(e) => {
            setEffect(e.target.value);
          }}
        />

        <IconButton onClick={updateEffect}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default OriginalEffectForm;
