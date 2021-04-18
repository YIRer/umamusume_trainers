import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import StatusTable from "../Card/StatusTable";
import TrainingObjects from "../Card/TrainingObjects";

import DeckSlotItem from "./DeckSlotItem";
import SkillModal from "./SkillModal";

const useStyles = makeStyles((theme) => ({
  // paperRoot: {
  //   padding: "10px",
  // },
  // header: {},
  // section: {
  //   margin: "10px",
  // },
  // image: {
  //   height: "500px",
  //   margin: "auto",
  //   display: "block",
  //   width: "100%",
  //   marginTop: "16px",
  //   backgroundPosition: "center",
  //   backgroundSize: "contain",
  //   backgroundRepeat: "no-repeat",
  // },
}));

const DeckSlot = (props) => {
  const classes = useStyles();

  const [openSkills, setOpenSkills] = useState(false);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
    setOpenSkillModal(true);
  };

  const closeSkillModal = () => {
    setOpenSkillModal(false);
  };

  const handleOpenSkills = () => {
    setOpenSkills(!openSkills);
  };

  return (
    <div>
      <div>
        <b onClick={handleOpenSkills}>스킬 보기</b>
        <Collapse in={openSkills} timeout="auto" unmountOnExit>
          {props.data.training.map((cardData) => (
            <DeckSlotItem
              data={cardData}
              key={`training-${cardData.ja}-${cardData.id}`}
              onSelectSkill={handleSelectSkill}
              showClickedCardInfo={props.showClickedCardInfo}
            />
          ))}
          {props.data.support.map((cardData) => (
            <DeckSlotItem
              data={cardData}
              key={`support-${cardData.ja}-${cardData.id}`}
              onSelectSkill={handleSelectSkill}
              showClickedCardInfo={props.showClickedCardInfo}
            />
          ))}
        </Collapse>
      </div>
      {/* <div className={classes.header}>
        {data.name.ja} {data.name.ko}
      </div>
      {data.playable && <StatusTable data={data} />}
      <section>
        <h4>육성 목표</h4>
        <TrainingObjects data={data.trainingObjects} />
      </section> */}
      {openSkillModal && (
        <SkillModal open data={selectedSkill} onClose={closeSkillModal} />
      )}
    </div>
  );
};

export default DeckSlot;
