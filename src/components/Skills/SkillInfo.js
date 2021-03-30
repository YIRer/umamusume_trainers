import React, { useReducer, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_SKill, GET_SKillS, DELTE_Skill } from "queries/skills";
import { FIND_CARDS } from "queries/cards";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";

// import CardTags from "./CardTags";

import clsx from "clsx";

const useStyles = makeStyles((_theme) => ({
  paperRoot: {
    padding: "10px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  infoSection: {
    textAlign: "center",
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
  tableRoot: {
    backgroundColor: "#333333",
  },
  tableRow: {
    color: "#fff",
  },
}));

const SkillInfo = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SKill, {
    variables: { id },
  });

  const [deleteSkill, _mutationData] = useMutation(DELTE_Skill);
  const [getTargetsInfo, { data: targetsData }] = useLazyQuery(FIND_CARDS);

  useEffect(() => {
    if (data?.skill.targetIDs && !targetsData) {
      getTargetsInfo({ variables: { ids: data.skill.targetIDs } });
    }
  }, [data, targetsData]);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSkill({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_SKillS }],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.replace(`/skills`);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { skill } = data;
  if (!skill) return <p>Error :(</p>;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div className={classes.header}>
        <div className={classes.icons}>
          <Link to="/skills" className={classes.link}>
            <ArrowBackRoundedIcon
              className={clsx(classes.iconArrow)}
              color="primary"
            />
          </Link>
          <Link to={`/admin/skills/${id}/edit`} className={classes.link}>
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
      <section className={classes.infoSection}>
        <img className={classes.image} src={skill.imageSrc} />
        <h3 className={classes.name}>{skill.name}</h3>
        <p>{skill.effect}</p>
        <div>
          {skill.tags.map((tag) => (
            <Chip key={tag} variant="outlined" label={tag} />
          ))}
        </div>
      </section>
      <section className={classes.section}>
        <h4>관련 카드</h4>
        {targetsData?.findCards ? (
          targetsData.findCards.map((card) => (
            <Link
              to={`/cards/${card.id}`}
              key={card.name + card.id}
              className={classes.cardWrapper}
            >
              <div
                className={classes.card}
                style={{
                  backgroundImage: `url(${card.imageSrc})`,
                }}
              />
              <span>{card.name}</span>
            </Link>
          ))
        ) : (
          <span>없음</span>
        )}
      </section>
    </Paper>
  );
};

export default withRouter(SkillInfo);
