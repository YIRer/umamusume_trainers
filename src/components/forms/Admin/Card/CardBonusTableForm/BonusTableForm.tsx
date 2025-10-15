import React, { useState } from "react";
import BonusRowInput from "./BonusRowInput";
import BonusRow from "./BonusRow";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";

import { CardBonusEffectTableRowType } from "types/Card/bonus";

interface Props {
  updateTableRow: (bonusData: CardBonusEffectTableRowType[]) => void;
  initialData?: CardBonusEffectTableRowType[];
}

const BonusTableForm = ({ updateTableRow, initialData }: Props) => {
  const [bonusRows, setBonusRows] = useState(initialData ?? []);

  const addEffectRow = (rowData) => {
    const updatedTable = [...bonusRows, rowData];
    setBonusRows(updatedTable);
    updateTableRow(updatedTable);
  };

  const deleteEffectRow = (idx) => {
    const updatedTable = bonusRows.filter((_r, index) => index !== idx);
    setBonusRows(updatedTable);
    updateTableRow(updatedTable);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <tr>
            <TableCell>효과</TableCell>
            <TableCell>0돌</TableCell>
            <TableCell>1돌</TableCell>
            <TableCell>2돌</TableCell>
            <TableCell>3돌</TableCell>
            <TableCell>풀돌</TableCell>
          </tr>
        </TableHead>
        <TableBody>
          {bonusRows.map((bonus, idx) => {
            return (
              <BonusRow
                key={`bonus-${bonus}-${idx}`}
                bonus={bonus}
                index={idx}
                deleteRow={deleteEffectRow}
              />
            );
          })}
        </TableBody>
      </Table>
      <BonusRowInput addRow={addEffectRow} />
    </div>
  );
};

export default BonusTableForm;
