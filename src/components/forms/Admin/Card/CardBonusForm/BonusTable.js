import React from "react";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import { convertLevel } from "helper";

const useStyles = makeStyles((_theme) => ({
  button: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "100%",
  },
  deleteBtn: {
    width: "50px",
  },
}));

export const BonusTable = ({ data, type, onDelete }) => {
  const classes = useStyles();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>필요 레벨</TableCell>
          <TableCell>기본 보너스</TableCell>
          <TableCell>최대 레벨 보너스</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.__tempID}>
            <TableCell className={classes.level}>
              {convertLevel(item)}
            </TableCell>
            <TableCell className={classes.effect}>{item.effect}</TableCell>
            <TableCell className={classes.maxEffect}>
              {type === "unique" ? "" : item.maxEffect}
            </TableCell>
            <TableCell className={classes.deleteBtn}>
              <IconButton
                onClick={() => {
                  onDelete(item, type);
                }}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BonusTable;
