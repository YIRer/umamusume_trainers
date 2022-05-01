import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Remove from "@material-ui/icons/Remove";

const BonusRow = ({ bonus, index, deleteRow }) => {
  const deleteEffectRow = () => {
    deleteRow(index);
  };

  return (
    <TableRow>
      <TableCell>{bonus.name}</TableCell>
      {bonus.effects.map((effect, index) => {
        return (
          <TableCell key={`bonus-${bonus.name}-${effect}-${index}`}>
            {effect}
          </TableCell>
        );
      })}
      <TableCell>
        <IconButton onClick={deleteEffectRow}>
          <Remove />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BonusRow;
