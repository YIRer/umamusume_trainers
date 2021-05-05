import React, { useReducer, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import clsx from "clsx";

import Loader from "components/Common/Loader";

import { GET_UMAMUSUME, EDIT_UMAMUSUME } from "queries/umamusume";

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
}));

const EditUmamusume = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_UMAMUSUME, {
    variables: { id },
  });
  const [editUmamusume, _mutationData] = useMutation(EDIT_UMAMUSUME);
  const [formData, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {
      ko: "",
      ja: "",
      en: "",
      default: "",
      cards: [],
    }
  );

  const setInitData = () => {
    if (data && data.umamusume) {
      const { name, cards, imageSrc } = umamusume;

      setFormInput({
        ko: name.ko,
        ja: name.ja,
        en: name.en,
        default: name.default,
        cards,
        imageSrc,
      });
    }
  };

  useEffect(() => {
    setInitData();
  }, [data]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormInput({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ko, ja, en, cards } = formData;

    const removeSpace = en.replace(/\s/g, "").trim();
    const input = {
      name: { ko, ja, en, default: removeSpace },
      cards,
    };
    editUmamusume({
      variables: {
        id,
        input,
      },
      refetchQueries: [{ query: GET_UMAMUSUME, variables: { id } }],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.push(`/umamusume/${id}`);
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  const { umamusume } = data;
  if (!umamusume) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmit} className={clsx(classes.form)}>
      <FormControl>
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ko"
          name="ko"
          label="한국어 이름"
          defaultValue={umamusume.name.ko}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          id="name-ja"
          name="ja"
          label="일본어 이름"
          defaultValue={umamusume.name.ja}
          onChange={handleChange}
        />
        <TextField
          className={clsx(classes.root)}
          required
          id="name-en"
          name="en"
          label="영문 이름"
          defaultValue={umamusume.name.en}
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

export default withRouter(EditUmamusume);
