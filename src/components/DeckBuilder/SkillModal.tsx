import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";
import { prefixImgSrc } from "helper";

import { SkillModalProps } from "./types";
import { circleIndexList } from "components/Skills/constants";

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
  horizon: {
    border: "none",
    width: "100%",
    height: "1px",
    backgroundColor: "#bbb",
    marginBottom: "16px",
  },
}));

export default function SkillModal(props: SkillModalProps) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogContent>
        <div className={classes.skillWrapper}>
          <img className={classes.image} src={prefixImgSrc(data.imageSrc)} />
          <h3>
            {data.name.ja} <br />
            {data.name.ko}
          </h3>
          <p>{data.effect}</p>
          <p>{data.condition}</p>
          {data?.evolutionConditions &&
            data?.evolutionConditions[0].length > 0 && (
              <>
                <hr className={classes.horizon} />
                <p>
                  {data?.evolutionConditions?.map((condition, index) => (
                    <span key={`condition_${condition}`}>
                      {circleIndexList[index]}
                      {condition} <br />
                    </span>
                  ))}
                  <br />
                </p>
              </>
            )}
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
