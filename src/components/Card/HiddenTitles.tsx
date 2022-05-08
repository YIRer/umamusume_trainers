import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { HiddenTitle } from "types/Card/card";

const useStyles = makeStyles((_theme) => ({
  objectWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #666666",
  },
  object: {
    textAlign: "center",
    backgroundColor: "#666666",
    color: "white",
    fontWeight: "bold",
    padding: "8px",
  },
  detailRow: {
    padding: "8px",
  },
  arrowIcon: {
    margin: "auto",
  },
}));

const HiddenTitleItem = ({ data }: { data: HiddenTitle }) => {
  const classes = useStyles();
  return (
    <div className={classes.objectWrapper}>
      <div className={classes.itemWrapper}>
        <div className={classes.object}>{data.name}</div>
        <div>
          <div className={classes.detailRow}>{data.condition}</div>
          <Divider />
          <div className={classes.detailRow}>
            {data.rewards && <div>획득 결과: {data.rewards}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const HiddenTitles = ({ HiddenTitles }: { HiddenTitles: HiddenTitle[] }) => {
  return (
    <div>
      {HiddenTitles.map((HiddenTitle, index) => {
        return (
          <HiddenTitleItem data={HiddenTitle} key={`Hidden-title-${index}`} />
        );
      })}
    </div>
  );
};

export default HiddenTitles;
