import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import { convertLevel } from "helper";

import { CardBonusObjectType } from "types/Card/bonus";

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

const BonusTable = ({ data }: { data: CardBonusObjectType }) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <h4>고유 보너스</h4>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              필요 레벨
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              기본 보너스
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              최대 레벨 보너스
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.unique.map((item, index) => (
            <TableRow key={`unique-${index}`}>
              <TableCell>{convertLevel(item)}</TableCell>
              <TableCell>{item.effect}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h4>지원 효과</h4>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              필요 레벨
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              기본 보너스
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              최대 레벨 보너스
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.support.map((item, index) => (
            <TableRow key={`unique-${index}`}>
              <TableCell>{convertLevel(item)}</TableCell>
              <TableCell>{item.effect}</TableCell>
              <TableCell>{item.maxEffect}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default BonusTable;
