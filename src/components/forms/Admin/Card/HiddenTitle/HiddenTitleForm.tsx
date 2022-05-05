import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { HiddenTitle } from "types/Card/card";

interface Props {
  updateHiddnTitle: (hiddenTitles: HiddenTitle[]) => void;
  initialData?: HiddenTitle[];
}

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    margin: "16px 16px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  rowWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
}));

const HiddenTitleForm = ({ updateHiddnTitle, initialData }: Props) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [rewards, setRewards] = useState("");
  const [hiddenTitles, seHiddenTitlest] = useState(
    initialData ? initialData : []
  );

  const addHiddenTitle = () => {
    const updatedTitles = [
      ...hiddenTitles,
      {
        name: title,
        condition,
        rewards,
      },
    ];

    seHiddenTitlest(updatedTitles as HiddenTitle[]);
    updateHiddnTitle(updatedTitles as HiddenTitle[]);

    setTitle("");
    setCondition("");
    setRewards("");
  };

  const removeHiddenTitle = (index) => {
    const updatedTitles = hiddenTitles.filter((_t, idx) => idx !== index);

    seHiddenTitlest(updatedTitles as HiddenTitle[]);
    updateHiddnTitle(updatedTitles as HiddenTitle[]);
  };

  useEffect(() => {
    if (initialData) {
      seHiddenTitlest(initialData);
    }
  }, [initialData]);
  return (
    <div className={classes.wrapper}>
      <div>
        {hiddenTitles?.map((hiddenTitle, index) => {
          return (
            <div className={classes.rowWrapper} key={`hidden-title-${index}`}>
              <div className={classes.column}>
                <div className={classes.row}>
                  <Typography>타이틀: </Typography>
                  <Typography>{hiddenTitle.name}</Typography>
                </div>
                <div className={classes.row}>
                  <Typography>획득 조건: </Typography>
                  <Typography>{hiddenTitle.condition}</Typography>
                </div>
                <div className={classes.row}>
                  <Typography>획득 보상: </Typography>
                  <Typography>{hiddenTitle.rewards}</Typography>
                </div>
              </div>

              <IconButton
                onClick={() => {
                  removeHiddenTitle(index);
                }}
              >
                <Remove />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div className={classes.rowWrapper}>
        <div className={classes.row}>
          <TextField
            id="hidden-title-name"
            name="hidden-title-name"
            label="히든 타이틀 이름"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            id="hidden-title-name"
            name="hidden-title-name"
            label="획득 조건"
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
            }}
          />
          <TextField
            id="hidden-title-name"
            name="hidden-title-name"
            label="획득 결과"
            value={rewards}
            onChange={(e) => {
              setRewards(e.target.value);
            }}
          />
        </div>
        <IconButton onClick={addHiddenTitle}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default HiddenTitleForm;
