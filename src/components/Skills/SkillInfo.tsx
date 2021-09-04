import React from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SKill, GET_SKILLS, DELTE_Skill } from "queries/skills";

import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";

import Loader from "components/Common/Loader";

import clsx from "clsx";

import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

import { SkillInfoProps } from "./types";
import { SkillType } from "types/Skill/skill";

import Helmet from "Helmet/Helmet";

const useStyles = makeStyles((_theme) => ({
  paperRoot: {
    padding: "10px",
    maxWidth: "400px",
    margin: "auto",
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
    maxWidth: "80px",
    maxHeight: "80px",
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
}));

const SkillInfo = (props: SkillInfoProps) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ skill: SkillType }>(GET_SKill, {
    variables: { id },
  });

  const [deleteSkill, _mutationData] = useMutation(DELTE_Skill);

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    deleteSkill({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_SKILLS }],
      awaitRefetchQueries: true,
    }).then(() => {
      props.history.replace(`/skills`);
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  const { skill } = data;
  if (!skill) return <p>Error :(</p>;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Helmet
        title={`${skill.name.ko}(${skill.name.ja})`}
        url={`/skills/${id}`}
        description={`${skill.effect}`}
      />

      <div className={classes.header}>
        {isDev && (
          <div className={classes.icons}>
            <Link to={`/admin/skills/${id}/edit`} className={classes.link}>
              <BorderColorRoundedIcon
                className={clsx(classes.icon)}
                color="primary"
              />
            </Link>
            <IconButton onClick={handleDelete}>
              <DeleteRoundedIcon
                className={clsx(classes.icon)}
                color="primary"
              />
            </IconButton>
          </div>
        )}
      </div>
      <section className={classes.infoSection}>
        <img className={classes.image} src={prefixImgSrc(skill.imageSrc)} />
        <h3>
          {skill.name.ja} <br />
          {skill.name.ko}
        </h3>
        <p>{skill.effect}</p>
        <p>{skill.condition}</p>
        <div>
          {skill.tags.map(
            (tag) =>
              tag && (
                <Chip
                  style={{ marginRight: "8px", marginBottom: "8px" }}
                  key={tag}
                  variant="outlined"
                  label={tag}
                />
              )
          )}
        </div>
      </section>
      <section className={classes.section}>
        <h4>관련 카드</h4>
        {skill.relatedCards.length > 0 ? (
          skill.relatedCards.map((card) => (
            <Link
              to={`/cards/${card.id}`}
              key={`card-${card.id}`}
              className={classes.cardWrapper}
            >
              <div
                className={classes.card}
                style={{
                  backgroundImage: `url(${prefixImgSrc(card.imageSrc)})`,
                }}
              />
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
