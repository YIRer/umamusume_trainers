import React, { useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_CARD, GET_CARDS, DELTE_CARD } from "queries/cards";
import { GET_UMAMUSUME } from "queries/umamusume";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import CardTags from "./CardTags";
import StatusTable from "./StatusTable";

import clsx from "clsx";

const useStyles = makeStyles((_theme) => ({
  paperRoot: {
    padding: "10px",
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
  umamusume: {
    width: "100px",
    height: "100px",
    border: "5px solid #ebd834",
    boxSizing: "border-box",
    backgroundPosition: "top center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },
  tableRoot: {
    backgroundColor: "#333333",
  },
  tableRow: {
    color: "#fff",
  },
}));

const CardInfo = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CARD, {
    variables: { id },
  });

  const [deleteCard, _mutationData] = useMutation(DELTE_CARD);
  const [getTargetInfo, { data: targetData }] = useLazyQuery(GET_UMAMUSUME);

  useEffect(() => {
    if (data?.card.targetID && !targetData) {
      getTargetInfo({ variables: { id: data.card.targetID } });
    }
  }, [data, targetData]);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCard({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_CARDS }],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.replace(`/cards`);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { card } = data;
  if (!card) return <p>Error :(</p>;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div className={classes.header}>
        <h3>{card.name}</h3>
        <div className={classes.icons}>
          <Link to="/cards" className={classes.link}>
            <ArrowBackRoundedIcon
              className={clsx(classes.iconArrow)}
              color="primary"
            />
          </Link>
          <Link to={`/admin/cards/${id}/edit`} className={classes.link}>
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

      <img className={classes.image} src={card.imageSrc} />
      <CardTags type={card.type} limited={card.limited} />
      <StatusTable data={card} />
      <section className={classes.section}>
        <h4>관련 우마무스메</h4>
        {targetData?.umamusume ? (
          <Link to={`/umamusume/${targetData.umamusume.id}`}>
            <div
              className={classes.umamusume}
              style={{
                backgroundImage: `url(${targetData.umamusume.imageSrc})`,
              }}
            />
            <span>{targetData.umamusume.name.ko}</span>
          </Link>
        ) : (
          <span>없음</span>
        )}
      </section>
    </Paper>
  );
};

export default withRouter(CardInfo);