import React, { useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_UMAMUSUME,
  GET_UMAMUSUMES,
  DELTE_UMAMUSUME,
} from "../queries/umamusume";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((_theme) => ({
  root: {
    maxWidth: "50%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    color: "inherit",
    padding: "12px",
    display: "flex",
    alignItems: "center",
  },
  section: {
    margin: "10px",
  },
  image: {
    maxHeight: "500px",
    margin: "auto",
    display: "block",
  },
  icon: {
    fontSize: "1.5rem",
  },
  iconArrow: {
    fontSize: "1.8rem",
  },
}));

const Umamusume = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_UMAMUSUME, {
    variables: { id },
  });

  const [deleteUmamusume, _mutationData] = useMutation(DELTE_UMAMUSUME);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUmamusume({
      variables: {
        id,
        cards: data.umamusume.cards,
      },
      refetchQueries: [{ query: GET_UMAMUSUMES }],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.replace(`/umamusume`);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { umamusume } = data;
  if (!umamusume) return <p>Error :(</p>;

  return (
    <Paper>
      <div className={classes.header}>
        <h3>
          {umamusume.name.ko}({umamusume.name.ja})
        </h3>
        <div className={classes.icons}>
          <Link to="/umamusume" className={classes.link}>
            <ArrowBackRoundedIcon
              className={clsx(classes.iconArrow)}
              color="primary"
            />
          </Link>
          <Link to={`/admin/umamusume/${id}/edit`} className={classes.link}>
            <BorderColorRoundedIcon
              className={clsx(classes.icon)}
              color="primary"
            />
          </Link>
          <IconButton onClick={handleDelete}>
            <DeleteRoundedIcon className={clsx(classes.icon)} color="primary" />
          </IconButton>
        </div>
      </div>

      <img className={classes.image} src={umamusume.imageSrc} />
      <section className={classes.section}>
        <h4>카드</h4>
        <div>
          <span>육성</span>
        </div>
        <div>
          <span>서포터</span>
        </div>
      </section>
    </Paper>
  );
};

export default withRouter(Umamusume);
