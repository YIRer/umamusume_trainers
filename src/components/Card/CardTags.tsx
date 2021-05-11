import React from "react";
import Chip from "@material-ui/core/Chip";
import { TypeOfCard } from "types/Card/card";

const convertType = (type: TypeOfCard) =>
  type === "training" ? "육성" : "서포터";
const convertLimited = (limited: boolean) => (limited ? "한정" : "통상");

export const CardTags = ({
  type,
  limited,
}: {
  type: TypeOfCard;
  limited: boolean;
}) => {
  return (
    <div>
      <Chip
        variant="outlined"
        label={convertType(type)}
        style={{ marginRight: "6px", fontSize: "12px" }}
      />
      <Chip
        color={limited ? "secondary" : "primary"}
        label={convertLimited(limited)}
        style={{ fontSize: "12px" }}
      />
    </div>
  );
};

export default CardTags;
