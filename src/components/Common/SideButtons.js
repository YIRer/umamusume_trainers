import React, { useState } from "react";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";
import BuffModal from "../Card/BuffModal";

import clsx from "clsx";
import { isMobile } from "helper";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "2rem",
  },

  iconWrapper: {
    position: "absolute",
    bottom: "54px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: "10px 0px 0px 10px",
    boxShadow: "-1px 1px 1px #eee",
  },

  iconWrapper__mobile: { bottom: "140px", right: 0 },
  iconWrapper__fixed: { position: "fixed" },
}));

const SideButtons = (props) => {
  const classes = useStyles();
  const isMobileSize = isMobile();
  const [openModal, setOpenModal] = useState(false);

  const handleModalControl = () => {
    setOpenModal(!openModal);
  };

  const scrollTop = () => {
    if (props.rootRef) {
      props.rootRef.current.scrollTo(0, 0);
    }

    if (window) {
      window.scrollTo(0, 0);
    }
  };
  console.log(props);
  return (
    <div
      className={clsx(
        classes.iconWrapper,
        isMobileSize && classes.iconWrapper__mobile,
        props.isFixed && classes.iconWrapper__fixed
      )}
    >
      <IconButton onClick={scrollTop}>
        <Tooltip title="상단으로" placement="left">
          <ArrowUpwardIcon className={clsx(classes.icon)} color="primary" />
        </Tooltip>
      </IconButton>
      <IconButton onClick={handleModalControl}>
        <Tooltip title="버프 및 디버프 안내" placement="left">
          <InfoIcon className={clsx(classes.icon)} color="primary" />
        </Tooltip>
      </IconButton>
      {openModal && <BuffModal open onClose={handleModalControl} />}
    </div>
  );
};

export default SideButtons;
