import React, { useReducer, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";

import SearchCards from "../Card/SearchCards";

import { GET_SKILLS, ADD_Sklill } from "queries/skills";

import IconRadioGroups from "./IconRadioGroups";
import { iconData } from "./constants";
import { prefixImgSrc } from "helper";

import { AddSkillProps, skillInputType } from "./types";
import { CardType } from "types/Card/card";

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
  cardWrapper: {
    marginRight: "16px",
  },
  card: {
    width: "100px",
    height: "100px",
    backgroundPosition: "top center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },
  relatedCards: {
    display: "flex",
    marginTop: "16px",
  },
}));

const AddSkill = (props: AddSkillProps) => {
  const classes = useStyles();
  const [addSkill, _mutationData] = useMutation(ADD_Sklill);
  const [relatedCards, setRelatedCards] = useState<CardType[]>([]);
  const [modalOpened, setModalState] = useState(false);
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

        <div className={classes.relatedCards}>
          {relatedCards.map(({ id, imageSrc }) => (
            <div className={classes.cardWrapper} key={`related-card-${id}`}>
              <div
                className={classes.card}
                style={{
                  backgroundImage: `url(${prefixImgSrc(imageSrc)})`,
                }}
              />
            </div>
          ))}
        </div>

        <SearchCards
          open={modalOpened}
          onSelect={setRelatedCards}
          onClose={hideSearchModal}
          selectedData={relatedCards}
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
