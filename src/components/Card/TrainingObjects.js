import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((_theme) => ({
  section: {
    margin: "10px",
  },
  tableRoot: {
    backgroundColor: "#333333",
  },
  tableRow: {
    color: "#fff",
  },
}));

export default function TrainingObjects({ data }) {
  const classes = useStyles();
  return (
    <div>
      <div>목표: {data.object}</div>
      <div>시기 {data.time}</div>
      <div>팬 수 {data.fan}</div>
      <div>경기장 {data.raceCourse}</div>
    </div>
  );
}
