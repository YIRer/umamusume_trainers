import React, { useReducer, useState } from "react";
import { withRouter } from "react-router";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";

import SearchCards from "../Card/SearchCards";

import { GET_SKILLS, ADD_Sklill } from "queries/skills";

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

const AddSkill = (props) => {
  const classes = useStyles();
  const [addSkill, _mutationData] = useMutation(ADD_Sklill);
  const [relatedCards, setRelatedCards] = useState([]);
  const [modalOpened, setModalState] = useState(false);
  const [formData, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      ko: "",
      ja: "",
      targetIDs: [],
      effect: "",
      imageSrc: iconData[0].value,
      type: "",
      tags: "",
    }
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ko, ja, tags, ...others } = formData;
    const convertTags = tags.split(",");
    const targetIDs = relatedCards.map((card) => card.id);
    const input = {
      ...others,
      name: { ko, ja },
      tags: convertTags,
      targetIDs,
    };

    addSkill({
      variables: {
        input,
      },
      refetchQueries: [{ query: GET_SKILLS }],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.push("/skills");
    });
  };

  const showSearchModal = () => {
    setModalState(true);
  };
  const hideSearchModal = () => {
    setModalState(false);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ko"
          name="ko"
          label="한국어 이름"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          id="name-en"
          name="ja"
          label="일본어 이름"
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          id="effect"
          name="effect"
          label="효과 및 설명"
          onChange={handleChange}
        />

        <TextField
          className={clsx(classes.root)}
          id="tags"
          name="tags"
          label="태그 (쉼표로 구분, 공백이 없어야함)"
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
        <SearchCards
          open={modalOpened}
          onSelect={setRelatedCards}
          onClose={hideSearchModal}
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

export default withRouter(AddSkill);
