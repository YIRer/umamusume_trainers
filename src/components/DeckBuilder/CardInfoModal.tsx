import React, { useEffect, useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CardInfo from "./CardInfo";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "helper";

import { CardInfoModalProps } from "./types";
import { CardType } from "types/Card/card";

const useStyles = makeStyles(() => ({
  root: {
    "& > .MuiDialog-container": {
      height: "100% !important",
    },
  },
}));

const setInitialSkills = (cardData: CardType) => {
  const {
    uniqueSkillsIds,
    trainingSkillsIds,
    hasSkillsIds,
    baseSkillsIds,
    awakeningSkillsIds,
    specialSkillsIds,
    skills,
  } = cardData;

  const skillData = {
    unique: [],
    training: [],
    has: [],
    base: [],
    awakening: [],
    special: [],
  };

  uniqueSkillsIds.forEach((sid) => {
    skillData.unique.push(skills.find(({ id }) => id === sid));
  });

  trainingSkillsIds?.forEach((sid) => {
    skillData.training.push(skills.find(({ id }) => id === sid));
  });

  hasSkillsIds?.forEach((sid) => {
    skillData.has.push(skills.find(({ id }) => id === sid));
  });

  baseSkillsIds?.forEach((sid) => {
    skillData.base.push(skills.find(({ id }) => id === sid));
  });

  awakeningSkillsIds?.forEach((sid) => {
    const skill = skills.find(({ id }) => id === sid);
    if (skill) {
      skillData.awakening.push(skill);
    }
  });

  specialSkillsIds?.forEach((sid) => {
    const skill = skills.find(({ id }) => id === sid);
    if (skill) {
      skillData.special.push(skill);
    }
  });

  return skillData;
};

const CardInfoModal = (props: CardInfoModalProps) => {
  const classes = useStyles();
  const modalRef = useRef(null);
  const observer = useRef(null);
  const timer = useRef(null);
  const isMobileSize = isMobile();
  const skillData = setInitialSkills(props.data);
  const [showSelection, toggleShowSelection] = useState(false);

  useEffect(() => {
    if (props.open) {
      timer.current = setTimeout(() => {
        const container = Array.from(
          document.getElementsByClassName("MuiDialog-container")
        )[0] as HTMLDivElement;

        observer.current = new MutationObserver(() => {
          container.style.height = "100%";
          if (props.showSelection) {
            toggleShowSelection(true);
          }
        });

        observer.current.observe(container, {
          attributes: true,
          attributeFilter: ["style"],
        });
      }, 100);
    }

    return () => {
      if (observer.current) {
        observer.current = null;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [props.open]);

  useEffect(() => {
    if (props.showSelection) {
      toggleShowSelection(true);
    }
  }, []);
  
  return (
    <Dialog
      classes={{
        root: classes.root,
      }}
      open={props.open}
      onClose={props.onClose}
      fullScreen={isMobileSize}
    >
      <DialogContent ref={modalRef}>
        <CardInfo
          data={props.data}
          skillData={skillData}
          rootRef={modalRef}
          showSelection={showSelection}
        />
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
