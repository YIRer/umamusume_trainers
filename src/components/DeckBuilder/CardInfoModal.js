import React, { useRef } from "react";
import _ from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CardInfo from "./CardInfo";
import { isMobile } from "helper";

const CardInfoModal = (props) => {
  const modalRef = useRef();
  const isMobileSize = isMobile();
  return (
    <Dialog open={props.open} onClose={props.onClose} fullScreen={isMobileSize}>
      <DialogContent ref={modalRef}>
        <CardInfo data={props.data} rootRef={modalRef} />
      </DialogContent>
      <DialogActions>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          color="secondary"
          onClick={props.onClose}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardInfoModal;
