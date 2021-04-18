import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import StatusTable from "../Card/StatusTable";
import TrainingObjects from "../Card/TrainingObjects";

import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  ItemRoot: {
    display: "grid",
    gridTemplateColumns: "100px auto",
    gridGap: "8px",
    marginBottom: "16px",
  },

  cardImage: {
    width: "100px",
    height: "128px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },

  image: {
    width: "50px",
    width: "50px",
    marginRight: "8px",
  },
}));

const Skills = ({ data, onSelectSkill, classes }) => {
  const handleSelectSkill = () => {
    onSelectSkill(data);
  };
  return (
    <img
      onClick={handleSelectSkill}
      src={data.imageSrc}
      className={classes.image}
    />
  );
};

const DeckSlotItem = (props) => {
  const { data } = props;
  const classes = useStyles();
  const [skills, setSkills] = useState([]);

  const setInitialSkills = () => {
    const skillData = {
      uniqueSkills: [],
      baseSkills: [],
      awakeningSkills: [],
      trainingSkills: [],
      hasSkills: [],
    };
    const {
      skills,
      uniqueSkillsIds,
      baseSkillsIds,
      awakeningSkillsIds,
      trainingSkillsIds,
      hasSkillsIds,
    } = data;

    uniqueSkillsIds.forEach((sid) => {
      skillData.uniqueSkills.push(skills.find(({ id }) => id === sid));
    });

    baseSkillsIds?.forEach((sid) => {
      skillData.baseSkills.push(skills.find(({ id }) => id === sid));
    });

    awakeningSkillsIds?.forEach((sid) => {
      const skill = skills.find(({ id }) => id === sid);
      if (skill) {
        skillData.awakeningSkills.push(skill);
      }
    });

    trainingSkillsIds?.forEach((sid) => {
      skillData.trainingSkills.push(skills.find(({ id }) => id === sid));
    });

    hasSkillsIds?.forEach((sid) => {
      skillData.hasSkills.push(skills.find(({ id }) => id === sid));
    });

    setSkills([
      ...skillData.uniqueSkills,
      ...skillData.baseSkills,
      ...skillData.awakeningSkills,
      ...skillData.trainingSkills,
      ...skillData.hasSkills,
    ]);
  };

  useEffect(() => {
    setInitialSkills();
  }, []);

  const handleClick = () => {
    props.showClickedCardInfo(data);
  };

  return (
    <div className={classes.ItemRoot}>
      <div
        className={classes.cardImage}
        style={{
          backgroundImage: `url(${data.imageSrc}`,
        }}
        onClick={handleClick}
      />
      <div>
        {skills.map((skill, index) => (
          <Skills
            data={skill}
            key={skill.name.ja + index}
            onSelectSkill={props.onSelectSkill}
            classes={classes}
          />
        ))}
      </div>
    </div>
  );
};

export default DeckSlotItem;
