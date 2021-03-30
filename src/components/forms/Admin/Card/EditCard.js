import React, { useReducer, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import { GET_UMAMUSUME } from "queries/umamusume";
import { GET_CARDS, GET_CARD, EDIT_CARD } from "queries/cards";
import { ranks, stars, cardTypes, initialStatusData } from "./constants";

import SearchUmamusume from "../Umamusume/SearchUmamusume";

const getImageName = (imageSrc) => {
  try {
    return imageSrc.split("/").pop().split(".")[0];
  } catch (_err) {
    return "";
  }
};

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
}));

const EditCard = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CARD, {
    variables: { id },
  });

  const [isTrainingType, checkCardtype] = useState(true);
  const [targetInfo, setTarget] = useState(null);
  const [modalOpened, setModalState] = useState(false);

  const [getTargetInfo, { data: targetData }] = useLazyQuery(GET_UMAMUSUME);

  const [editCard, _mutationData] = useMutation(EDIT_CARD);
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
      type: "training",
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

  const setInitData = () => {
    if (data && data.card) {
      const { status, imageSrc, ...others } = card;
      const imageName = getImageName(imageSrc);

      setFormInput({ imageSrc, imageName, ...others });
      setStatusInput({ ...status.ground, ...status.status });
      if (targetData) {
        setTarget(targetData.umamusume || null);
      }
    }
  };

  useEffect(() => {
    setInitData();
    if (data?.card.targetID && !targetData) {
      getTargetInfo({ variables: { id: data.card.targetID } });
    }
  }, [data, targetData]);

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
      targetID: targetInfo?.id,
      status: {
        ground: {
          grass,
          duct,
        },
        status: others,
      },
    };

    editCard({
      variables: {
        id,
        input,
      },
      refetchQueries: [
        {
          query: GET_CARD,
          variables: { id },
        },
        { query: GET_CARDS },
      ],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.replace(`/cards/${id}`);
    });
  };

  const showSearchModal = () => {
    setModalState(true);
  };
  const hideSearchModal = () => {
    setModalState(false);
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
          value={statusData.grass?.bonus || "0"}
          onChange={handleStatusChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          select
          value={statusData.duct?.rank || "G"}
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
          value={statusData.duct?.bonus || "0"}
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
          value={statusData.speed?.bonus || "0"}
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
          value={statusData.stamina?.bonus || "0"}
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
          value={statusData.power?.bonus || "0"}
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
          value={statusData.guts?.bonus || "0"}
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
          value={statusData.intelligence?.bonus || "0"}
          onChange={handleStatusChange}
        />
      </FormControl>
    );
  };

  if (loading) return <p>Loading...</p>;

  const { card } = data;
  if (error || !card) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name"
          name="name"
          label="카드이름"
          defaultValue={card.name}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          id="imageName"
          name="imageName"
          label="이미지 파일 이름"
          defaultValue={getImageName(card.imageSrc)}
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
        >
          관련된 우마무스메 선택
        </Button>
        {modalOpened && (
          <SearchUmamusume
            open
            selectedData={targetInfo}
            onSelect={setTarget}
            onClose={hideSearchModal}
          />
        )}
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

export default withRouter(EditCard);
