import React, { useReducer, useState } from "react";
import { withRouter } from "react-router";
import { useMutation } from "@apollo/client";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import _ from "lodash";

import { GET_CARDS, ADD_CARD } from "queries/cards";
import { EDIT_SKILLS, GET_SKILLS } from "queries/skills";
import { stars, cardTypes, initialStatusData } from "./constants";

import SearchUmamusume from "../Umamusume/SearchUmamusume";
import SearchSkills from "../Skills/SearchSkills";
import CardStatus from "./CardStatus";
import CardEventForm from "./CardEventForm/Form";
import SkillIcons from "./SkillIcons";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "800px",
    margin: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  button: {
    width: "100px",
    margin: "1rem",
  },
  card: {
    width: "100px",
    height: "100px",
    border: "5px solid #ebd834",
    boxSizing: "border-box",
    backgroundPosition: "top center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },

  skillCard: {
    width: "100%",
    maxWidth: "250px",
    height: "100px",
    marginBottom: "10px",
    marginRight: "16px",
  },

  skillWrapper: {
    display: "flex",
    padding: "10px",
  },
  skillIcon: {
    width: "80px",
    height: "80px",
    marginRight: "10px",
  },
  skillInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginBottom: "16px",
  },
}));

const AddCard = (props) => {
  const classes = useStyles();
  const [isTrainingType, checkCardtype] = useState(false);
  const [targetInfo, setTarget] = useState(null);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [modalOpened, setModalState] = useState(false);
  const [skillSearchModalOpened, setSkillSearchModalState] = useState(false);
  const [addCard, _mutationData] = useMutation(ADD_CARD);
  const [editSkills, _mutationSkillsData] = useMutation(EDIT_SKILLS);

  const [formData, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      name: "",
      star: 1,
      targetID: null,
      imageSrc: "",
      type: "training", //common, support
      playable: false,
      limited: false,
      events: {
        common: [],
        once: [],
        multipleTimes: [],
      },
    }
  );

  const [statusData, setStatusInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      turf: initialStatusData,
      duct: initialStatusData,
      short: initialStatusData,
      mile: initialStatusData,
      medium: initialStatusData,
      long: initialStatusData,
      escape: initialStatusData,
      leading: initialStatusData,
      between: initialStatusData,
      pushing: initialStatusData,
      speed: initialStatusData,
      stamina: initialStatusData,
      power: initialStatusData,
      guts: initialStatusData,
      intelligence: initialStatusData,
    }
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleChangeCheckbox = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    if (name === "playable") {
      checkCardtype(value);
    }
    setFormInput({ [name]: value });
  };

  const handleStatusChange = (e) => {
    const [type, status] = e.target.name.split("-");
    const value = e.target.value.toString();

    const newState = { ...statusData[type], [status]: value };
    setStatusInput({ [type]: newState });
  };

  const handleChangeEvents = (eventData) => {
    setFormInput({ events: eventData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      turf,
      duct,
      short,
      mile,
      medium,
      long,
      escape,
      leading,
      between,
      pushing,
      ...others
    } = statusData;
    const { ko, ja, type, imageName, events, ...formDatas } = formData;

    const imageSrc =
      targetInfo && imageName
        ? `/image/${targetInfo.name.default}/cards/${type}/${imageName}.png`
        : "/image/temp.png";

    const input = {
      ...formDatas,
      name: {
        ko,
        ja,
      },
      type,
      imageSrc,
      targetID: targetInfo?.id || null,
      status: {
        ground: {
          turf,
          duct,
        },
        distance: {
          short,
          mile,
          medium,
          long,
        },
        strategy: {
          escape,
          leading,
          between,
          pushing,
        },
        status: others,
      },
      events: removeTempIDs(events),
    };

    addCard({
      variables: {
        input,
      },
      refetchQueries: [{ query: GET_CARDS }],
      awaitRefetchQueries: true,
    }).then(({ data }) => {
      const { addCard } = data;
      const params = {
        addIds: [],
        addTargetIDs: [],
      };
      relatedSkills.forEach((skillData) => {
        params.addIds.push(skillData.id);
        params.addTargetIDs.push(_.uniq([...skillData.targetIDs, addCard.id]));
      });

      editSkills({
        variables: {
          ...params,
        },
        refetchQueries: [{ query: GET_SKILLS }],
        awaitRefetchQueries: true,
      }).then(() => {
        props.history.push("/cards");
      });
    });
  };

  const removeTempIDs = (events) => {
    const once = events.once.map((d) => _.omit(d, ["__tempID"]));
    const multipleTimes = events.multipleTimes.map((d) =>
      _.omit(d, ["__tempID"])
    );

    return {
      once,
      multipleTimes,
      common: events.common,
    };
  };

  const showSearchModal = () => {
    setModalState(true);
  };
  const hideSearchModal = () => {
    setModalState(false);
  };

  const showSkillSearchModal = () => {
    setSkillSearchModalState(true);
  };
  const hideSkillSearchModal = () => {
    setSkillSearchModalState(false);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ja"
          name="ja"
          label="카드이름 (일본어)"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="name-ko"
          name="ko"
          label="카드이름 (한국어)"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="imageName"
          name="imageName"
          label="이미지 파일 이름"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          id="star"
          name="star"
          value={formData.star}
          label="등급"
          onChange={handleChange}
        >
          {stars.map((option) => (
            <MenuItem key={`star-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={formData.type || "training"}
          id="type"
          name="type"
          label="카드 종류"
          onChange={handleChange}
        >
          {cardTypes.map((option) => (
            <MenuItem key={`type-${option.value}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.limited}
              onChange={handleChangeCheckbox}
              name="limited"
            />
          }
          label="한정 여부"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.playable}
              onChange={handleChangeCheckbox}
              name="playable"
            />
          }
          label="육성 가능"
        />
        {isTrainingType && (
          <CardStatus data={statusData} onChange={handleStatusChange} />
        )}

        <CardEventForm onChangeEvents={handleChangeEvents} />

        {targetInfo && (
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${targetInfo.imageSrc})`,
            }}
          ></div>
        )}
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={showSearchModal}
          className={classes.button}
        >
          관련된 우마무스메 선택
        </Button>

        <SearchUmamusume
          open={modalOpened}
          onSelect={setTarget}
          onClose={hideSearchModal}
        />

        {relatedSkills &&
          relatedSkills.map((skillData, index) => (
            <SkillIcons
              name={skillData.name}
              imageSrc={skillData.imageSrc}
              effect={skillData.effect}
              key={`skill_${index}`}
            />
          ))}

        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={showSkillSearchModal}
          className={classes.button}
        >
          관련된 스킬 선택
        </Button>

        <SearchSkills
          open={skillSearchModalOpened}
          onSelect={setRelatedSkills}
          onClose={hideSkillSearchModal}
        />

        <Button
          type="submit"
          className={clsx(classes.button)}
          variant="contained"
          color="primary"
        >
          제출
        </Button>
      </FormControl>
    </form>
  );
};

export default withRouter(AddCard);
