import React from "react";

export type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export type SideButtonProps = {
  rootRef?: React.RefObject<HTMLLIElement>;
  isFixed?: boolean;
};
