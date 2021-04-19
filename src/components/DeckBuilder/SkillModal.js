import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  skillWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "80px",
    margin: "auto",
    display: "block",
  },
}));

export default function SkillModal(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <div className={classes.skillWrapper}>
          <img className={classes.image} src={data.imageSrc} />
          <h3 className={classes.name}>
            {data.name.ja} <br />
            {data.name.ko}
          </h3>
          <p>{data.effect}</p>
          <p>{data.condition}</p>
          <div>
            {data.tags.map(
              (tag) =>
                tag && (
                  <Chip
                    style={{ marginRight: "8px", marginBottom: "8px" }}
                    key={tag}
                    variant="outlined"
                    label={tag}
                  />
                )
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ margin: "auto" }}
          variant="outlined"
          color="secondary"
          onClick={props.onClose}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
