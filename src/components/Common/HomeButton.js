import React from "react";
import IconButton from "@material-ui/core/IconButton";
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
      <HomeIcon style={{ fontSize: "2rem" }} color="primary" />
    </Link>
  );
}
