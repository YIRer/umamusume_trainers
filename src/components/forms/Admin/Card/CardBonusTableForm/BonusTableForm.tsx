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
            <TableCell>Lv 30</TableCell>
            <TableCell>Lv 35</TableCell>
            <TableCell>Lv 40</TableCell>
            <TableCell>Lv 45</TableCell>
            <TableCell>Lv 50</TableCell>
          </tr>
        </TableHead>
        <TableBody>
          {bonusRows.map((bonus, idx) => {
            return (
              <BonusRow bonus={bonus} index={idx} deleteRow={deleteEffectRow} />
            );
          })}
        </TableBody>
      </Table>
      <BonusRowInput addRow={addEffectRow} />
    </div>
  );
};

export default BonusTableForm;
