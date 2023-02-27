import React, { useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";

import { GET_SKILLS, ADD_Sklill } from "queries/skills";

import IconRadioGroups from "./IconRadioGroups";
import { iconData } from "./constants";

import { skillInputType } from "./types";

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

const AddSkill = () => {
  const classes = useStyles();
  const router = useRouter();
  const [addSkill, _mutationData] = useMutation(ADD_Sklill);
  const [formData, setFormInput] = useReducer(
    (state: skillInputType, newState: Partial<skillInputType>) => ({
      ...state,
      ...newState,
    }),
    {
      ko: "",
      ja: "",
      targetIDs: [],
      effect: "",
      condition: "",
      imageSrc: iconData[0].value,
      tags: "",
      evolutionConditions: "",
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { ko, ja, tags, effect, condition, imageSrc, evolutionConditions } =
      formData;
    const convertTags = tags.split(",");
    const convertEvolutionSkills = evolutionConditions.split(",");
    const input = {
      effect,
      condition,
      imageSrc,
      name: { ko, ja },
      tags: convertTags,
      evolutionConditions: convertEvolutionSkills,
    };

    addSkill({
      variables: {
        input,
      },
      refetchQueries: [{ query: GET_SKILLS }],
      awaitRefetchQueries: true,
    }).then(() => {
      router.push("/skills");
    });
  };

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ja"
          name="ja"
          label="일본어 이름"
          onChange={handleChange}
        />

        <TextField
          className={clsx(classes.root)}
          id="name-ko"
          name="ko"
          label="한국어 이름"
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
          id="condition"
          name="condition"
          label="발동 조건"
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
          id="evolutionConditions"
          name="evolutionConditions"
          label="진화조건(쉼표로 구분)"
          value={formData.evolutionConditions}
          onChange={handleChange}
        />

        <IconRadioGroups
          data={iconData}
          name={"imageSrc"}
          value={formData.imageSrc}
          onChange={handleChange}
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

export default AddSkill;
