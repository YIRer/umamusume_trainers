import { RouteComponentProps } from "react-router-dom";
import { UmamusumeType } from "types/Umamusume/umamusume";
import { CardObjectType } from "types/Card/object";

export type CardInfoProps = RouteComponentProps & {};
export type CardTargetType = UmamusumeType;
export type TrainingObjectsType = CardObjectType[];
export type TrainingItmeType = {
  data: CardObjectType;
  index: number;
  isLast: boolean;
  checkable?: boolean;
  checked?: boolean;
};
