import React, { useReducer, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import clsx from "clsx";

import Loader from "components/Common/Loader";

import { GET_SKill, EDIT_SKILL } from "queries/skills";

import IconRadioGroups from "./IconRadioGroups";
import { iconData } from "./constants";
import { prefixImgSrc } from "helper";

import { EditSkillProps, skillInputType } from "./types";
import { SkillType } from "types/Skill/skill";

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
    width: "100px",
    height: "100px",
    marginRight: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },
  relatedCards: {
    display: "flex",
    marginTop: "16px",
  },
}));

const EditSkill = (props: EditSkillProps) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<{ skill: SkillType }>(GET_SKill, {
    variables: { id },
  });

  const [editSkill, _mutationData] = useMutation(EDIT_SKILL);
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
    setInitData();
  }, [data]);

  const setInitData = () => {
    if (data && data.skill) {
      const { name, tags, effect, condition, imageSrc } = skill;

      setFormInput({
        tags: tags.join(","),
        ko: name.ko,
        ja: name.ja,
        effect,
        condition,
        imageSrc,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { tags, ko, ja, effect, condition, imageSrc } = formData;
    const convertTags = tags.split(",");
    const input = {
      effect,
      condition,
      imageSrc,
      name: { ko, ja },
      tags: convertTags,
    };

    editSkill({
      variables: {
        id,
        input,
      },
      refetchQueries: [
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

  if (loading) return <Loader />;

  const { skill } = data;
  if (error || !skill) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ja"
          name="ja"
          label="일본어 이름"
          value={formData.ja}
          onChange={handleChange}
        />

        <TextField
          className={clsx(classes.root)}
          id="name-ko"
          name="ko"
          label="한국어 이름"
          value={formData.ko}
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
          id="condition"
          name="condition"
          label="발동 조건"
          value={formData.condition}
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

        <IconRadioGroups
          data={iconData}
          name={"imageSrc"}
          value={formData.imageSrc}
          onChange={handleChange}
        />

        <div className={classes.relatedCards}>
          {skill.relatedCards.map(({ id, imageSrc }) => (
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
