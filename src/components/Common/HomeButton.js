import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { isDev } from "../../constants";

export default function HomeButton() {
  return (
    <Link
      to={"/"}
      style={{
        position: "fixed",
        right: "20px",
        bottom: isDev ? "6rem" : "3.5rem",
      }}
    >
      <Tooltip title="메인으로" placement="left">
        <HomeIcon style={{ fontSize: "2rem" }} color="primary" />
      </Tooltip>
    </Link>
  );
}
