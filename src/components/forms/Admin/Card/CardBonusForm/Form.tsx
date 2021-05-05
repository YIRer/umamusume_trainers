import React, { useReducer, useState, useEffect } from "react";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import BonusInputForm from "./BonusInputForm";
import BonusTable from "./BonusTable";

import _ from "lodash";

import type {
  CardBonusFormProps,
  BonusTypeWithTempID,
  bonusType,
} from "./types";

const useStyles = makeStyles((_theme) => ({
  button: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "100%",
  },
}));

const sortingArr = (arr) => {
  const none = [];
  const haveLevels = [];

  arr.forEach((item) => {
    item.__tempID = _.uniqueId("bonus-data");
    if (item.level === "none") {
      none.push(item);
    } else {
      haveLevels.push(item);
    }
  });

  haveLevels.sort((a, b) => a.level - b.level);
  return [...none, ...haveLevels];
};

const CardBonusForm = ({ onChangeBonus, initialData }: CardBonusFormProps) => {
  const classes = useStyles();
  const [openedBonusInputForm, setBonusInputForm] = useState(false);

  const [bonusObject, setBonusObjectInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      unique: [],
      support: [],
    }
  );

  const setInitialData = () => {
    const { unique, support } = initialData;
    setBonusObjectInput({ unique, support });
  };

  useEffect(() => {
    if (initialData) {
      setInitialData();
    }
  }, [initialData]);

  const showBonusInputForm = () => {
    setBonusInputForm(true);
  };

  const hideBonusInputForm = () => {
    setBonusInputForm(false);
  };

  const handleConfirm = (bonusData: BonusTypeWithTempID, isUnique: boolean) => {
    if (isUnique) {
      const unique = sortingArr([...bonusObject.unique, bonusData]);
      setBonusObjectInput({ unique });
      onChangeBonus({ ...bonusObject, unique });
    } else {
      const bonusArr = sortingArr([...bonusObject.support, bonusData]);
      setBonusObjectInput({ support: bonusArr });
      onChangeBonus({ ...bonusObject, support: bonusArr });
    }

    setBonusInputForm(false);
  };

  const handleDelete = (
    bonusData: BonusTypeWithTempID,
    type: typeof bonusType
  ) => {
    const updatedData = [...bonusObject[type]].filter(
      (ele) => ele.__tempID !== bonusData.__tempID
    );

    setBonusObjectInput({ [type]: updatedData });
    onChangeBonus({ ...bonusObject, [type]: updatedData });
  };

  return (
    <div>
      <div>
        <div>
          <h4>고유 보너스</h4>
          <div>
            {bonusObject.unique.length > 0 && (
              <BonusTable
                data={bonusObject.unique}
                type="unique"
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
        <div>
          <h4>지원 효과</h4>
          {bonusObject.support.length > 0 && (
            <BonusTable
              data={bonusObject.support}
              type="support"
              onDelete={handleDelete}
            />
          )}
        </div>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={
            openedBonusInputForm ? hideBonusInputForm : showBonusInputForm
          }
        >
          {openedBonusInputForm ? "입력 폼 닫기" : "보너스 추가"}
        </Button>
      </div>
      {openedBonusInputForm && (
        <BonusInputForm
          closeForm={hideBonusInputForm}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default CardBonusForm;
