import React, { useEffect, useState } from "react";
import Link from "next/link";
import Error from "next/error";
import Image from "next/image";
import { useRouter } from "next/router";

import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_CARDS, ADD_CARD, DELTE_CARD } from "queries/cards";
import { GET_UMAMUSUME } from "queries/umamusume";

import Card from "@material-ui/core/Card";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import EventItems from "components/forms/Admin/Card/CardEventForm/EventItems";

import CardTags from "./CardTags";
import StatusTable from "./StatusTable";
import BonusTable from "./BonusTable";
import SimpleBonusTable from "./SimpleBonusTable";
import HiddenTitles from "./HiddenTitles";

import clsx from "clsx";
import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";
import { commonEvents } from "components/forms/Admin/Card/constants";

import TrainingObjects from "./TrainingObjects";

import { CardTargetType } from "./types";
import { CardType } from "types/Card/card";
import { SkillType, RelatedSkillsType } from "types/Skill/skill";

import Helmet from "Helmet/Helmet";
import { formattedDescriptionForCards } from "./helper";

import InFeed from "components/ADsense/InFeed";
import FooterAds from "components/ADsense/FooterAds";

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
    position: "relative",
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
    display: "inline-block",
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
    },
  },

  typeIcon: {
    marginRight: "8px",
    display: "inline-block",
  },
  nameWrapper: {
    wordBreak: "keep-all",
  },

  warning: {
    fontSize: "16px",
    color: "crimson",
    fontWeight: "bold",
  },
}));

const CardInfo = ({ data, statusCode }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const { card } = data;

  const [relatedSkills, setRelatedSkills] = useState<RelatedSkillsType>({
    unique: [],
    training: [],
    has: [],
    base: [],
    awakening: [],
    special: [],
  });
  const [deleteCard, _mutationData] = useMutation(DELTE_CARD);
  const [addCard, _mutationAddData] = useMutation(ADD_CARD);
  const [getTargetInfo, { data: targetData }] = useLazyQuery<{
    umamusume: CardTargetType;
  }>(GET_UMAMUSUME);

  const setInitialSkills = (cardData: CardType) => {
    const {
      uniqueSkillsIds,
      trainingSkillsIds,
      hasSkillsIds,
      baseSkillsIds,
      awakeningSkillsIds,
      specialSkillsIds,
      skills,
    } = cardData;

    const skillData = {
      unique: [],
      training: [],
      has: [],
      base: [],
      awakening: [],
      special: [],
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

    specialSkillsIds?.forEach((sid) => {
      const skill = skills.find(({ id }) => id === sid);
      if (skill) {
        skillData.special.push(skill);
      }
    });

    setRelatedSkills(skillData);
  };

  useEffect(() => {
    setInitialSkills(data.card);
  }, []);

  useEffect(() => {
    if (!targetData) {
      getTargetInfo({ variables: { id: data.card.targetID } });
    }
  }, [targetData]);

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    deleteCard({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_CARDS }],
      awaitRefetchQueries: true,
    }).then(() => {
      router.replace(`/cards`);
    });
  };

  const handleDuplicate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { id: _id, baseSkillsIds, awakeningSkillsIds, ...others } = data.card;
    addCard({
      variables: {
        input: {
          baseSkillsIds: baseSkillsIds ?? [],
          awakeningSkillsIds: awakeningSkillsIds ?? [],
          ...others,
        },
      },
      refetchQueries: [{ query: GET_CARDS }],
      awaitRefetchQueries: true,
    }).then(({ data }) => {
      router.push(`/cards/${data.addCard.id}`);
    });
  };

  const renderSkillCards = (skill: SkillType) => {
    return (
      skill && (
        <Card key={skill.id} classes={{ root: clsx(classes.skillWrapper) }}>
          <Link href={`/skills/${skill.id}`}>
            <a className={classes.skillImgAndInfo}>
              <div className={clsx(classes.skillMedia)}>
                <Image
                  src={prefixImgSrc(skill.imageSrc)}
                  alt={skill.name.ko}
                  width={50}
                  height={50}
                  placeholder="empty"
                />
              </div>
              <div className={classes.skillInfo}>
                <b>
                  {skill.name.ja}
                  <br />
                  {skill.name.ko}
                </b>
                <span>{skill.effect}</span>
              </div>
            </a>
          </Link>
        </Card>
      )
    );
  };

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const commonEventList = card.events.common ?? commonEvents;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <InFeed />
      <Helmet
        title={`${card.name.ko}(${card.name.ja})`}
        url={`/cards/${id}`}
        description={formattedDescriptionForCards(card)}
        imageUrl={prefixImgSrc(card.imageSrc)}
      />
      <div className={classes.header}>
        <h3 className={classes.head}>
          {card.supportType && (
            <div className={classes.typeIcon}>
              <Image
                src={prefixImgSrc(`/image/icons/${card.supportType}.png`)}
                alt={card.supportType}
                width={20}
                height={20}
                placeholder="empty"
              />
            </div>
          )}
          <div className={classes.nameWrapper}>
            {card.name.ja} {card.name.ko}
          </div>
        </h3>
        {isDev && (
          <div className={classes.icons}>
            <IconButton onClick={handleDuplicate}>
              <FileCopyIcon className={clsx(classes.icon)} color="primary" />
            </IconButton>
            <Link href={`/admin/cards/${id}/edit`}>
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
      <CardTags type={card.type} limited={card.limited} />
      <div className={classes.image}>
        <Image
          src={prefixImgSrc(card.imageSrc)}
          placeholder="blur"
          blurDataURL={prefixImgSrc("/image/image-blur-placeholder.png")}
          layout="fill"
          objectFit="contain"
          alt={`${card.name.ko} ${card.name.ja}`}
        />
      </div>
      {card.playable && <StatusTable data={card} />}
      {card.type === "support" && (
        <React.Fragment>
          {card.bonusEffectTable && card.originalEffect ? (
            <SimpleBonusTable
              tableData={card.bonusEffectTable}
              originalEffect={card.originalEffect}
            />
          ) : (
            <BonusTable data={card.bonus} />
          )}
        </React.Fragment>
      )}
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

      {relatedSkills.special?.length > 0 && (
        <section className={classes.section}>
          <h4>스폐셜/진화 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {relatedSkills.special.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}
      {card.type === "training" && (
        <section className={classes.section}>
          <h4>육성 목표</h4>
          <TrainingObjects data={card.trainingObjects} />
        </section>
      )}
      {card.type === "training" && card.hiddenTitle && (
        <section className={classes.section}>
          <h4>히든 칭호</h4>
          <HiddenTitles HiddenTitles={card.hiddenTitle} />
        </section>
      )}
      <section className={classes.section}>
        <span className={classes.warning}>
          한국판과 선택지 결과로 얻는 보너스가 다를 수 있습니다.
        </span>
        {card.type === "training" && (
          <div>
            <h4>공통 이벤트</h4>
            {commonEventList.map((event, index) => (
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
          <Link href={`/umamusume/${targetData.umamusume.id}`}>
            <a>
              <div
                className={classes.umamusume}
                style={{
                  backgroundImage: `url(${prefixImgSrc(
                    targetData.umamusume.imageSrc
                  )})`,
                }}
              />
              <b>{targetData.umamusume.name.ko}</b>
            </a>
          </Link>
        ) : (
          <span>없음</span>
        )}
      </section>
      <FooterAds />
    </Paper>
  );
};

export default CardInfo;
