import React, { useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CardInfo from "./CardInfo";
import { isMobile } from "helper";

import { CardInfoModalProps } from "./types";
import { CardType } from "types/Card/card";

const setInitialSkills = (cardData: CardType) => {
  const {
    uniqueSkillsIds,
    trainingSkillsIds,
    hasSkillsIds,
    baseSkillsIds,
    awakeningSkillsIds,
    specialSkillsIds,
    evolutionSkillsIds,
    skills,
  } = cardData;

  const skillData = {
    unique: [],
    training: [],
    has: [],
    base: [],
    awakening: [],
    special: [],
    evolution: [],
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
  evolutionSkillsIds?.forEach((sid) => {
    const skill = skills.find(({ id }) => id === sid);
    if (skill) {
      skillData.evolution.push(skill);
    }
  });

  return skillData;
};

const CardInfoModal = (props: CardInfoModalProps) => {
  const modalRef = useRef(null);
  const isMobileSize = isMobile();
  const skillData = setInitialSkills(props.data);
  return (
    <Dialog open={props.open} onClose={props.onClose} fullScreen={isMobileSize}>
      <DialogContent ref={modalRef}>
        <CardInfo
          data={props.data}
          skillData={skillData}
          rootRef={modalRef}
          showSelection={props.showSelection || false}
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
