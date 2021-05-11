import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { PropTypes } from "@material-ui/core";

import { DeckSelectionsProps } from "./types";
import { CardType } from "types/Card/card";
import { Classes } from "types/Common/classes";

const useStyles = makeStyles((_theme) => ({
  ItemRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  selection: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "8px",
  },
}));

const SelectionButton = ({
  data,
  onSelectCard,
  classes,
  color,
}: {
  data: CardType;
  onSelectCard: (card: CardType, isShowSelection?: boolean) => void;
  classes?: Classes;
  color?: PropTypes.Color;
}) => {
  const handleSelectSkill = () => {
    onSelectCard(data, true);
  };

  return (
    <Button
      className={classes.selection}
      variant="contained"
      onClick={handleSelectSkill}
      color={color}
    >
      {data.name.ko}의 선택지 보기
    </Button>
  );
};

const DeckSelections = (props: DeckSelectionsProps) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.ItemRoot}>
      <SelectionButton
        data={data.training[0]}
        onSelectCard={props.showClickedCardInfo}
        classes={classes}
        color={"primary"}
      />
      {data.support.map((card, index) => (
        <SelectionButton
          data={card}
          onSelectCard={props.showClickedCardInfo}
          classes={classes}
          key={card.name.ja + index}
        />
      ))}
    </div>
  );
};

export default DeckSelections;
