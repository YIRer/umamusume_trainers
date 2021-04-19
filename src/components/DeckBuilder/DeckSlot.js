import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StatusTable from "../Card/StatusTable";
import TrainingObjects from "../Card/TrainingObjects";

import DeckSkillItem from "./DeckSkillItem";
import DeckCardList from "./DeckCardList";
import SkillModal from "./SkillModal";
import DeckSelections from "./DeckSelections";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },

  tabs: {
    justifyContent: "center",
  },
  tab: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "100px",
    },
    padding: "6px",
    minWidth: "66px",
  },
  deckDetails: {
    marginTop: "16px",
  },

  contentsWrapper: {
    margin: "auto",
    maxWidth: "600px",
  },
  deckDetailsWrapper: {
    marginBottom: "30px",
  },
}));

const SkillItems = ({ data, onSelectSkill, showClickedCardInfo, classes }) => {
  return (
    <div className={classes.contentsWrapper}>
      {data.training.map((cardData) => (
        <DeckSkillItem
          data={cardData}
          key={`training-${cardData.ja}-${cardData.id}`}
          onSelectSkill={onSelectSkill}
          showClickedCardInfo={showClickedCardInfo}
        />
      ))}
      {data.support.map((cardData) => (
        <DeckSkillItem
          data={cardData}
          key={`support-${cardData.ja}-${cardData.id}`}
          onSelectSkill={onSelectSkill}
          showClickedCardInfo={showClickedCardInfo}
        />
      ))}
    </div>
  );
};

const DeckSlot = (props) => {
  const classes = useStyles();

  const [openDeckDetailes, setOpenDeckDetailes] = useState(false);
  const [tabValue, setTabValue] = useState("Status");
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const toggleOpenDeckDetailes = () => {
    setOpenDeckDetailes(!openDeckDetailes);
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
    setOpenSkillModal(true);
  };

  const closeSkillModal = () => {
    setOpenSkillModal(false);
  };

  const handleTabChange = (e, tabValue) => {
    setTabValue(tabValue);
  };

  return (
    <Card>
      <div className={classes.header} onClick={toggleOpenDeckDetailes}>
        <span>저장된 프리셋 {props.index + 1}</span>
        <IconButton>
          {openDeckDetailes ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      <Collapse in={openDeckDetailes} timeout="auto" unmountOnExit>
        <div className={classes.deckDetailsWrapper}>
          <DeckCardList
            data={props.data}
            showClickedCardInfo={props.showClickedCardInfo}
          />
          <Tabs
            classes={{ flexContainer: classes.tabs }}
            value={tabValue}
            onChange={handleTabChange}
          >
            <Tab
              classes={{ root: classes.tab }}
              value="Status"
              label="스테이터스"
            />
            <Tab
              classes={{ root: classes.tab }}
              value="Objects"
              label="육성 목표"
            />
            <Tab classes={{ root: classes.tab }} value="Skills" label="스킬" />
            <Tab
              classes={{ root: classes.tab }}
              value="Selections"
              label="선택지"
            />
          </Tabs>
          <div className={classes.deckDetails}>
            {tabValue === "Status" && (
              <div className={classes.contentsWrapper}>
                <StatusTable data={props.data.training[0]} />
              </div>
            )}
            {tabValue === "Objects" && (
              <div className={classes.contentsWrapper}>
                <TrainingObjects
                  data={props.data.training[0].trainingObjects}
                />
              </div>
            )}
            {tabValue === "Skills" && (
              <SkillItems
                data={props.data}
                onSelectSkill={handleSelectSkill}
                showClickedCardInfo={props.showClickedCardInfo}
                classes={classes}
              />
            )}
            {tabValue === "Selections" && (
              <DeckSelections
                data={props.data}
                showClickedCardInfo={props.showClickedCardInfo}
              />
            )}
          </div>
        </div>
      </Collapse>
      {openSkillModal && (
        <SkillModal open data={selectedSkill} onClose={closeSkillModal} />
      )}
    </Card>
  );
};

export default DeckSlot;
