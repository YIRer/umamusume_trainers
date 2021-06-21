import React, { useEffect, useState } from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_CARD, GET_CARDS, ADD_CARD, DELTE_CARD } from "queries/cards";
import { GET_UMAMUSUME } from "queries/umamusume";

import Card from "@material-ui/core/Card";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import EventItems from "components/forms/Admin/Card/CardEventForm/EventItems";

import Loader from "components/Common/Loader";

import CardTags from "./CardTags";
import StatusTable from "./StatusTable";
import BonusTable from "./BonusTable";

import clsx from "clsx";
import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";
import { commonEvents } from "components/forms/Admin/Card/constants";

import TrainingObjects from "./TrainingObjects";

import { CardInfoProps, CardTargetType } from "./types";
import { CardType } from "types/Card/card";
import { SkillType, RelatedSkillsType } from "types/Skill/skill";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: "10px",
    maxWidth: "400px",
    margin: "auto",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "flex-end",
    },
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
    maxWidth: "700px",
    margin: "10px 0",
  },
  image: {
    height: "500px",
    margin: "auto",
    display: "block",
    width: "100%",
    marginTop: "16px",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
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
    width: "calc(40% - 8px)",
    marginBottom: "16px",
    marginRight: "16px",
    minWidth: "220px",
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
    fontSize: "12px",
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
  has: {
    backgroundColor: "#00ad26",
  },
  training: {
    backgroundColor: "#0068ad",
  },

  goToTop: {
    fontSize: "2rem",
    position: "fixed",
    bottom: "58px",
    right: "20px",
  },

  iconInfo: {
    fontSize: "2rem",
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },

  head: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },

  typeIcon: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
  },
}));

const CardInfo = (props: CardInfoProps) => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ card: CardType }>(GET_CARD, {
    variables: { id },
  });

  const [relatedSkills, setRelatedSkills] = useState<RelatedSkillsType>({
    unique: [],
    training: [],
    has: [],
    base: [],
    awakening: [],
  });
  const [deleteCard, _mutationData] = useMutation(DELTE_CARD);
  const [addCard, _mutationAddData] = useMutation(ADD_CARD);
  const [getTargetInfo, { data: targetData }] =
    useLazyQuery<{
      umamusume: CardTargetType;
    }>(GET_UMAMUSUME);

  const setInitialSkills = (cardData: CardType) => {
    const {
      uniqueSkillsIds,
      trainingSkillsIds,
      hasSkillsIds,
      baseSkillsIds,
      awakeningSkillsIds,
      skills,
    } = cardData;

    const skillData = {
      unique: [],
      training: [],
      has: [],
      base: [],
      awakening: [],
    };

    uniqueSkillsIds.forEach((sid) => {
      skillData.unique.push(skills.find(({ id }) => id === sid));
    });

    trainingSkillsIds?.forEach((sid) => {
      skillData.training.push(skills.find(({ id }) => id === sid));
    });

    hasSkillsIds?.forEach((sid) => {
      skillData.has.push(skills.find(({ id }) => id === sid));
    });

    baseSkillsIds?.forEach((sid) => {
      skillData.base.push(skills.find(({ id }) => id === sid));
    });

    awakeningSkillsIds?.forEach((sid) => {
      const skill = skills.find(({ id }) => id === sid);
      if (skill) {
        skillData.awakening.push(skill);
      }
    });

    setRelatedSkills(skillData);
  };

  useEffect(() => {
    if (data?.card) {
      setInitialSkills(data.card);
    }
    if (data?.card.targetID && !targetData) {
      getTargetInfo({ variables: { id: data.card.targetID } });
    }
  }, [data, targetData]);

  const handleDelete = (e: React.SyntheticEvent) => {
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

  const handleDuplicate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { id: _id, ...others } = data.card;
    addCard({
      variables: {
        input: {
          ...others,
        },
      },
      refetchQueries: [{ query: GET_CARDS }],
      awaitRefetchQueries: true,
    }).then(({ data }) => {
      props.history.push(`/cards/${data.addCard.id}`);
    });
  };

  const renderSkillCards = (skill: SkillType) => {
    return (
      skill && (
        <Card key={skill.id} classes={{ root: clsx(classes.skillWrapper) }}>
          <Link to={`/skills/${skill.id}`} className={classes.skillImgAndInfo}>
            <img
              className={clsx(classes.skillMedia)}
              src={prefixImgSrc(skill.imageSrc)}
              alt={skill.name.ko}
            />
            <div className={classes.skillInfo}>
              <b>
                {skill.name.ja}
                <br />
                {skill.name.ko}
              </b>
              <span>{skill.effect}</span>
            </div>
          </Link>
        </Card>
      )
    );
  };

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  const { card } = data;
  if (!card) return <p>Error :(</p>;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div className={classes.header}>
        <h3 className={classes.head}>
          {card.supportType && (
            <img
              className={classes.typeIcon}
              src={prefixImgSrc(`/image/icons/${card.supportType}.png`)}
              alt={card.supportType}
            />
          )}
          {card.name.ja} {card.name.ko}
        </h3>
        {isDev && (
          <div className={classes.icons}>
            <IconButton onClick={handleDuplicate}>
              <FileCopyIcon className={clsx(classes.icon)} color="primary" />
            </IconButton>
            <Link to={`/admin/cards/${id}/edit`} className={classes.link}>
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
      <CardTags type={card.type} limited={card.limited} />
      <div
        style={{
          backgroundImage: `url(${prefixImgSrc(card.imageSrc)})`,
        }}
        className={classes.image}
      />
      {card.playable && <StatusTable data={card} />}
      {card.type === "support" && <BonusTable data={card.bonus} />}
      {card.type === "training" && (
        <section className={classes.section}>
          <h4>고유 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {relatedSkills.unique.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}
      {card.type === "training" ? (
        <section className={classes.section}>
          <h4>초기 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {relatedSkills.base.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      ) : (
        <section className={classes.section}>
          <h4>육성 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {relatedSkills.training.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}
      {card.type === "training" ? (
        <section className={classes.section}>
          <h4>각성 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {relatedSkills.awakening.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      ) : (
        <section className={classes.section}>
          <h4>소지 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {relatedSkills.has.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}

      {card.type === "training" && (
        <section className={classes.section}>
          <h4>육성 목표</h4>
          <TrainingObjects data={card.trainingObjects} />
        </section>
      )}
      <section className={classes.section}>
        {card.type === "training" && (
          <div>
            <h4>공통 이벤트</h4>
            {commonEvents.map((event, index) => (
              <EventItems
                eventData={event}
                editable={false}
                key={`event-common-${index}`}
              />
            ))}
          </div>
        )}
        <h4>{card.type === "training" ? "일회성 이벤트" : "육성 이벤트"}</h4>
        {card.events.once.map((event, index) => (
          <EventItems
            eventData={event}
            editable={false}
            key={`event-once-${index}`}
          />
        ))}

        <h4>다회성 이벤트</h4>
        {card.events.multipleTimes.map((event, index) => (
          <EventItems
            eventData={event}
            editable={false}
            key={`event-multiple-event-${index}`}
          />
        ))}
      </section>
      <section className={classes.section}>
        <h4>관련 우마무스메</h4>
        {targetData?.umamusume ? (
          <Link to={`/umamusume/${targetData.umamusume.id}`}>
            <div
              className={classes.umamusume}
              style={{
                backgroundImage: `url(${prefixImgSrc(
                  targetData.umamusume.imageSrc
                )})`,
              }}
            />
            <b>{targetData.umamusume.name.ko}</b>
          </Link>
        ) : (
          <span>없음</span>
        )}
      </section>
    </Paper>
  );
};

export default withRouter(CardInfo);
