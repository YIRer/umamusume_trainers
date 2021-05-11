import { RouteComponentProps } from "react-router-dom";
import { CardType } from "types/Card/card";
import { UmamusumeType } from "types/Umamusume/umamusume";
import { Classes } from "types/Common/classes";

export type AddUmamusumeProps = RouteComponentProps & {};
export type EditUmamusumeProps = RouteComponentProps & {};

export type FormInputTpye = {
  ko?: string;
  ja?: string;
  en?: string;
  default?: string;
  cards?: CardType[];
  imageSrc?: string;
};

export type SearchUmamusumeProps = {
  open: boolean;
  onSelect: (target: UmamusumeType) => void;
  onClose: () => void;
  selectedData?: UmamusumeType;
};

export type SearchUmamusumeItem = {
  umamusume: UmamusumeType;
  classes: Classes;
  selectFn: (target: UmamusumeType) => void;
  target: UmamusumeType;
};
