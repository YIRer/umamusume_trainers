import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

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

const StatusTable = ({ data }) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              덕트
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              잔디
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.status.ground.duct.rank} + ({data.status.ground.duct.bonus}{" "}
              %)
            </TableCell>
            <TableCell>
              {data.status.ground.grass.rank} + (
              {data.status.ground.grass.bonus} %)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table className={classes.table}>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              스피드
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              스테미너
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              파워
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              근성
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              지능
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {data.status.status.speed.rank} + (
              {data.status.status.speed.bonus} %)
            </TableCell>
            <TableCell>
              {data.status.status.stamina.rank} + (
              {data.status.status.stamina.bonus} %)
            </TableCell>
            <TableCell>
              {data.status.status.power.rank} + (
              {data.status.status.power.bonus} %)
            </TableCell>
            <TableCell>
              {data.status.status.guts.rank} + ({data.status.status.guts.bonus}{" "}
              %)
            </TableCell>
            <TableCell>
              {data.status.status.intelligence.rank} + (
              {data.status.status.intelligence.bonus} %)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default StatusTable;
