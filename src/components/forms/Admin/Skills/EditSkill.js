import React, { useReducer, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";

import SearchCards from "../Card/SearchCards";

import { FIND_CARDS } from "queries/cards";
import { GET_SKillS, GET_SKill, EDIT_SKILL } from "queries/skills";

import IconRadioGroups from "./IconRadioGroups";
import { iconData, skillTypes } from "./constants";

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
  radioWarpper: {
    display: "flex",
    alignItems: "center",
  },
  label: { display: "flex", alignItems: "center" },
  img: {
    width: "50px",
    height: "50px",
  },
  span: {
    marginLeft: "10px",
  },
}));

const EditSkill = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_SKill, {
    variables: { id },
  });

  const [getTargetsInfo, { data: targetsInfo }] = useLazyQuery(FIND_CARDS);

  const [editSkill, _mutationData] = useMutation(EDIT_SKILL);
  const [relatedCards, setRelatedCards] = useState([]);
  const [modalOpened, setModalState] = useState(false);
  const [formData, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      name: "",
      targetIDs: [],
      effect: "",
      imageSrc: iconData[0].value,
      type: "",
      tags: "",
    }
  );

  const setInitData = () => {
    if (data && data.skill) {
      const { tags, ...others } = skill;

      setFormInput({ tags: tags.join(","), ...others });
      if (targetsInfo) {
        setRelatedCards(targetsInfo.findCards || []);
      }
    }
  };

  useEffect(() => {
    setInitData();
    if (data?.skill.targetIDs && !targetsInfo) {
      getTargetsInfo({ variables: { ids: data.skill.targetIDs } });
    }
  }, [data, targetsInfo]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { tags, ...others } = formData;
    const convertTags = tags.split(",");
    const targetIDs = relatedCards.map((card) => card.id);
    const input = {
      ...others,
      tags: convertTags,
      targetIDs,
    };

    editSkill({
      variables: {
        id,
        input,
      },
      refetchQueries: [
        { query: GET_SKillS },
        {
          query: GET_SKill,
          variables: { id },
        },
      ],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.push(`/skills/${id}`);
    });
  };

  const showSearchModal = () => {
    setModalState(true);
  };
  const hideSearchModal = () => {
    setModalState(false);
  };

  if (loading) return <p>Loading...</p>;

  const { skill } = data;
  if (error || !skill) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name"
          name="name"
          label="이름"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          id="effect"
          name="effect"
          label="효과 및 설명"
          value={formData.effect}
          onChange={handleChange}
        />

        <TextField
          className={clsx(classes.root)}
          id="tags"
          name="tags"
          label="태그 (쉼표로 구분, 공백이 없어야함)"
          value={formData.tags}
          onChange={handleChange}
        />

        <TextField
          className={clsx(classes.root)}
          required
          select
          value={formData.type}
          id="type"
          name="type"
          label="스킬 종류"
          value={skill.type}
          onChange={handleChange}
        >
          {skillTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <IconRadioGroups
          data={iconData}
          name={"imageSrc"}
          value={formData.imageSrc}
          onChange={handleChange}
        />

        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={showSearchModal}
        >
          관련된 카드 선택
        </Button>
        {relatedCards.map(({ name, id }) => (
          <span key={id}>{name}</span>
        ))}
        {modalOpened && (
          <SearchCards
            open
            onSelect={setRelatedCards}
            onClose={hideSearchModal}
            selectedData={targetsInfo.findCards}
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

export default withRouter(EditSkill);
