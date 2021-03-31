import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_CARD, GET_CARDS, DELTE_CARD } from "queries/cards";
import { GET_UMAMUSUME } from "queries/umamusume";

import Card from "@material-ui/core/Card";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import CardTags from "./CardTags";
import StatusTable from "./StatusTable";
import { getTypeName } from "helper/index";

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
  skillCardsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillWrapper: {
    width: "40%",
    maxWidth: "250px",
    marginRight: "16px",
  },
  skillMedia: {
    width: "50px",
    height: "50px",
    backgroundPosition: "center",
    marginRight: "10px",
  },
  skillInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    "& > span": {
      fontSize: "12px",
    },
  },
  skillImgAndInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  skilType: {
    textAlign: "center",
    marginTop: "10px",
    color: "white",
    padding: "10px",
  },
  unique: {
    backgroundColor: "#e33a10",
  },
  support: {
    backgroundColor: "#00ad26",
  },
  training: {
    backgroundColor: "#0068ad",
  },
}));

const SkillType = ({ classes, type }) => {
  const getTypeColor = (skilType) => {
    switch (skilType) {
      case "unique":
        return classes.unique;
      case "support":
        return classes.support;

      default:
        return classes.training;
    }
  };

  return (
    <div className={clsx(classes.skilType, getTypeColor(type))}>
      <b>{getTypeName(type)}</b>
    </div>
  );
};

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

  const handleClickBack = (e) => {
    e.preventDefault();
    props.history.goBack();
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
          <IconButton onClick={handleClickBack}>
            <ArrowBackRoundedIcon
              className={clsx(classes.iconArrow)}
              color="primary"
            />
          </IconButton>
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

      <CardTags type={card.type} limited={card.limited} />
      <img className={classes.image} src={card.imageSrc} />
      <StatusTable data={card} />
      <div className={classes.skillCardsWrapper}>
        {card.skills.map((skill) => {
          return (
            <Card key={skill.id} classes={{ root: clsx(classes.skillWrapper) }}>
              <Link
                to={`/skills/${skill.id}`}
                className={classes.skillImgAndInfo}
              >
                <img
                  className={clsx(classes.skillMedia)}
                  src={skill.imageSrc}
                  alt={skill.name.ko}
                />
                <div className={classes.skillInfo}>
                  <b>
                    {skill.name.ko}
                    <br />
                    {skill.name.ja}
                  </b>
                  <span>{skill.effect}</span>
                </div>
              </Link>
              <SkillType classes={classes} type={skill.type} />
            </Card>
          );
        })}
      </div>
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
