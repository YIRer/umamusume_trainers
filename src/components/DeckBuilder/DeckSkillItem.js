import React, { useEffect, useState } from "react";
import { prefixImgSrc } from "helper";

import { makeStyles } from "@material-ui/core/styles";

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

const Skills = ({ data, onSelectSkill, classes }) => {
  const handleSelectSkill = () => {
    onSelectSkill(data);
  };
  return (
    <img
      onClick={handleSelectSkill}
      src={prefixImgSrc(data.imageSrc)}
      className={classes.image}
    />
  );
};

const DeckSkillItem = (props) => {
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
