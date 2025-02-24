import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Error from "next/error";
import { useMutation } from "@apollo/client";
import { GET_SKILLS, DELTE_Skill } from "queries/skills";

import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

import Helmet from "Helmet/Helmet";

// import InFeed from "components/ADsense/InFeed";
import { circleIndexList } from "./constants";

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
    display: "inline-block",
  },
  card: {
    width: "100px",
    height: "100px",
    backgroundPosition: "top center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
  },

  horizon: {
    border: "none",
    width: "100%",
    height: "1px",
    backgroundColor: "#bbb",
    marginBottom: "16px",
  },
}));

const SkillInfo = ({ data, statusCode }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

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
      router.replace(`/skills`);
    });
  };

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const { skill } = data;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Helmet
        title={`${skill.name.ko}(${skill.name.ja})`}
        url={`/skills/${id}`}
        description={`${skill.effect}`}
        imageUrl={prefixImgSrc(skill.imageSrc)}
      />

      <div className={classes.header}>
        {isDev && (
          <div className={classes.icons}>
            <Link href={`/admin/skills/${id}/edit`}>
              <a className={classes.link}>
                <BorderColorRoundedIcon
                  className={clsx(classes.icon)}
                  color="primary"
                />
              </a>
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
        {skill?.evolutionConditions &&
          skill?.evolutionConditions[0] &&
          skill?.evolutionConditions[0].length > 0 && (
            <p>
              {skill?.evolutionConditions?.length > 0 && (
                <hr className={classes.horizon} />
              )}
              {skill?.evolutionConditions.map((condition, index) => (
                <span key={condition + "_" + index}>
                  {circleIndexList[index]}
                  {condition}
                  <br />
                </span>
              ))}
            </p>
          )}
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
            <Link href={`/cards/${card.id}`} key={`card-${card.id}`}>
              <a className={classes.cardWrapper}>
                <div
                  className={classes.card}
                  style={{
                    backgroundImage: `url(${prefixImgSrc(card.imageSrc)})`,
                  }}
                />
              </a>
            </Link>
          ))
        ) : (
          <span>없음</span>
        )}
      </section>
      {/* <InFeed /> */}
    </Paper>
  );
};

export default SkillInfo;
