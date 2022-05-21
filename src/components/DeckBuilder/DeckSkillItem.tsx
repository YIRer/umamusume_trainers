import React, { useEffect, useState } from "react";
import { prefixImgSrc } from "helper";

import { makeStyles } from "@material-ui/core/styles";

import { DeckSkillItemProps } from "./types";
import { Classes } from "types/Common/classes";
import { SkillType } from "types/Skill/skill";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((_theme) => ({
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
    cursor: "pointer",
  },

  image: {
    width: "50px",
    height: "50px",
    marginRight: "8px",
    cursor: "pointer",
  },
}));

const Skills = ({
  data,
  onSelectSkill,
  classes,
}: {
  data: SkillType;
  classes: Classes;
  onSelectSkill: (skill: SkillType) => void;
}) => {
  const handleSelectSkill = () => {
    onSelectSkill(data);
  };
  return (
    <Tooltip title={`${data.name.ja} ${data.name.ko}`} placement="top">
      <img
        onClick={handleSelectSkill}
        src={prefixImgSrc(data.imageSrc)}
        className={classes.image}
      />
    </Tooltip>
  );
};

const DeckSkillItem = (props: DeckSkillItemProps) => {
  const { data } = props;
  const classes = useStyles();
  const [skills, setSkills] = useState<SkillType[]>([]);

  const setInitialSkills = () => {
    const skillData = {
      uniqueSkills: [],
      baseSkills: [],
      awakeningSkills: [],
      trainingSkills: [],
      hasSkills: [],
      special: [],
    };
    const {
      skills,
      uniqueSkillsIds,
      baseSkillsIds,
      awakeningSkillsIds,
      trainingSkillsIds,
      hasSkillsIds,
      specialSkillsIds
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

    specialSkillsIds?.forEach((sid) => {
      skillData.special.push(skills.find(({ id }) => id === sid));
    });

    setSkills([
      ...skillData.uniqueSkills,
      ...skillData.baseSkills,
      ...skillData.awakeningSkills,
      ...skillData.trainingSkills,
      ...skillData.hasSkills,
      ...skillData.special,
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
          backgroundImage: `url(${prefixImgSrc(data.imageSrc)}`,
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

export default DeckSkillItem;
