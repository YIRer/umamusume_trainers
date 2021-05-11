import React from "react";
import { RouteComponentProps } from "react-router-dom";

export type AppMainBarProps = RouteComponentProps & {};
export type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export type SideButtonProps = {
  rootRef?: React.RefObject<HTMLLIElement>;
  isFixed?: boolean;
};
