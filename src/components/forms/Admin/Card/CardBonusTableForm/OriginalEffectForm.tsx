import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import { Typography } from "@material-ui/core";

const OriginalEffectForm = ({ updateOriginalEffect }) => {
  const [level, setLevel] = useState("");
  const [effect, setEffect] = useState("");

  const updateEffect = () => {
    setLevel('')
    setEffect('')
    updateOriginalEffect({
      level,
      effect,
    });
  };

  const removeEffect = () => {
    setLevel('')
    setEffect('')
    updateOriginalEffect({
      level:'',
      effect:''
    });
  };

  return (
    <div>
      <div>
        <Typography variant="h4">{level}</Typography>
        <Typography variant="body1">{effect}</Typography>
        
        <IconButton>
          <Remove onClick={removeEffect} />
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

        <IconButton>
          <Add onClick={updateEffect} />
        </IconButton>
      </div>
    </div>
  );
};

export default OriginalEffectForm;
