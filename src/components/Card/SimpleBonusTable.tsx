import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import {
  CardBonusEffectTableRowType,
  CardOriginalEffectType,
} from "types/Card/bonus";

const useStyles = makeStyles((_theme) => ({
  section: {
    margin: "10px",
    overflow: "auto",
  },
  tableRoot: {
    backgroundColor: "#333333",
    maxWidth: "100%",
    whiteSpace: "nowrap",
  },
  tableRow: {
    color: "#fff",
    maxWidth: "100%",
    whiteSpace: "nowrap",
  },

  tableRowCell: {
    whiteSpace: "pre-wrap",
    wordBreak: "keep-all",
  },
}));

const SimpleBonusTable = ({
  tableData,
  originalEffect,
}: {
  tableData: CardBonusEffectTableRowType[];
  originalEffect: CardOriginalEffectType;
}) => {
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
              보너스 효과
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Lv {originalEffect.level}</TableCell>
            <TableCell>{originalEffect.effect}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h4>지원 효과</h4>
      <Table>
        <TableHead>
          <TableRow classes={{ root: clsx(classes.tableRoot) }}>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              보너스 이름
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              0돌
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              1돌
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              2돌
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              3돌
            </TableCell>
            <TableCell classes={{ root: clsx(classes.tableRow) }}>
              풀돌
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow
              key={`unique-${index}`}
              classes={{ root: clsx(classes.tableRowCell) }}
            >
              <TableCell>{item.name}</TableCell>
              {item.effects.map((effect, index) => {
                return (
                  <TableCell key={`${item.name}-${effect}-${index}`}>
                    {effect}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default SimpleBonusTable;
