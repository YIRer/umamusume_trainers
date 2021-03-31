import React, { useReducer, useState } from "react";
import { withRouter } from "react-router";
import { useMutation } from "@apollo/client";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import _ from "lodash";

import { GET_CARDS, ADD_CARD } from "queries/cards";
import { EDIT_SKILLS, GET_SKILLS } from "queries/skills";
import { ranks, stars, cardTypes, initialStatusData } from "./constants";

import SearchUmamusume from "../Umamusume/SearchUmamusume";
import SearchSkills from "../Skills/SearchSkills";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "500px",
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
  const [isTrainingType, checkCardtype] = useState(true);
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
      playable: true,
      limited: false,
    }
  );

  const [statusData, setStatusInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      grass: initialStatusData,
      duct: initialStatusData,
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

    if (name === "type") {
      if (value === "training") {
        checkCardtype(true);
      } else {
        checkCardtype(false);
      }
    }
    setFormInput({ [name]: value });
  };

  const handleChangeCheckbox = (e) => {
    const name = e.target.name;
    const value = e.target.checked;

    setFormInput({ [name]: value });
  };

  const handleStatusChange = (e) => {
    const [type, status] = e.target.name.split("-");
    const value = e.target.value.toString();

    const newState = { ...statusData[type], [status]: value };
    setStatusInput({ [type]: newState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { grass, duct, ...others } = statusData;
    const { name, type, imageName, ...formDatas } = formData;

    const imageSrc =
      targetInfo && imageName
        ? `/image/${targetInfo.name.default}/cards/${type}/${imageName}.png`
        : "/image/temp.png";

    const input = {
      ...formDatas,
      name,
      type,
      imageSrc,
      targetID: targetInfo?.id || null,
      status: {
        ground: {
          grass,
          duct,
        },
        status: others,
      },
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
        ids: [],
        skillsTargetIDs: [],
      };
      relatedSkills.forEach((skillData) => {
        params.ids.push(skillData.id);
        params.skillsTargetIDs.push(
          _.uniq([...skillData.targetIDs, addCard.id])
        );
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

  const renderStatus = () => {
    return (
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.grass?.rank || "G"}
          id="grass-rank"
          name="grass-rank"
          label="잔디 적성"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="grass-bonus"
          name="grass-bonus"
          label="잔디 적성 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.ground?.duct?.rank || "G"}
          id="duct-rank"
          name="duct-rank"
          label="덕트 적성"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="duct-bonus"
          name="duck-bonus"
          label="덕트 적성 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.speed?.rank || "G"}
          id="speed-rank"
          name="speed-rank"
          label="스피드 스탯"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="speed-bonus"
          name="speed-bonus"
          label="스피드 스탯 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.stamina?.rank || "G"}
          id="stamina-rank"
          name="stamina-rank"
          label="스태미너 스탯"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="stamina-bonus"
          name="stamina-bonus"
          label="스테미너 스탯 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.power?.rank || "G"}
          id="power-rank"
          name="power-rank"
          label="파워 스탯"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="power-bonus"
          name="power-bonus"
          label="파워 스탯 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.guts?.rank || "G"}
          id="guts-rank"
          name="guts-rank"
          label="근성 스탯"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="guts-bonus"
          name="guts-bonus"
          label="근성 스탯 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.intelligence?.rank || "G"}
          id="intelligence-rank"
          name="intelligence-rank"
          label="지능 스탯"
          onChange={handleStatusChange}
        >
          {ranks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={clsx(classes.root)}
          required
          id="intelligence-bonus"
          name="intelligence-bonus"
          label="지능 스탯 보너스"
          defaultValue={"0"}
          onChange={handleStatusChange}
        />
      </FormControl>
    );
  };

  const renderSkillIcons = ({ name, imageSrc, effect }) => {
    return (
      <Card
        key={name}
        classes={{
          root: clsx(classes.skillCard),
        }}
      >
        <div className={classes.skillWrapper}>
          <img className={classes.skillIcon} src={imageSrc} alt={name} />
          <div className={classes.skillInfoWrapper}>
            <b>{`${name.ko} ${name.ja}`}</b>
            <span>{effect}</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name"
          name="name"
          label="카드이름"
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
        {isTrainingType && renderStatus()}

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
          relatedSkills.map((skillData) => renderSkillIcons(skillData))}

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
