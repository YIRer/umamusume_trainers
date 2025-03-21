import React, { useEffect, useRef } from "react";
import Image from "next/image";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

import EventItems from "components/forms/Admin/Card/CardEventForm/EventItems";

import CardTags from "../Card/CardTags";
import StatusTable from "../Card/StatusTable";
import BonusTable from "../Card/BonusTable";
import SimpleBonusTable from "../Card/SimpleBonusTable";
import HiddenTitles from "../Card/HiddenTitles";

import SideButtons from "../Common/SideButtons";

import clsx from "clsx";
import { commonEvents } from "components/forms/Admin/Card/constants";

import TrainingObjects from "../Card/TrainingObjects";
import { prefixImgSrc } from "helper";

import { CardInfoProps } from "./types";
import { SkillType } from "types/Skill/skill";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: "10px",
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
    marginRight: "10px",
    display: "inline-block",
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

  head: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },

  typeIcon: {
    display: "inline-block",
    marginRight: "8px",
  },

  warning: {
    fontSize: "16px",
    color: "crimson",
    fontWeight: "bold",
  },
}));

const CardInfo = (props: CardInfoProps) => {
  const classes = useStyles();
  const selectionElement = useRef(null);

  const goTosection = () => {
    props.rootRef.current.scrollTo(0, selectionElement.current.offsetTop - 20);
  };

  useEffect(() => {
    if (props.showSelection) {
      goTosection();
    }
  }, []);

  const renderSkillCards = (skill: SkillType) => {
    return (
      skill && (
        <Card key={skill.id} classes={{ root: clsx(classes.skillWrapper) }}>
          <div className={classes.skillImgAndInfo}>
            <div className={clsx(classes.skillMedia)}>
              <Image
                src={prefixImgSrc(skill.imageSrc)}
                alt={skill.name.ko}
                width={50}
                height={50}
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
          </div>
        </Card>
      )
    );
  };

  const { data } = props;

  if (!data) return <p>Error :(</p>;
  return (
    <div className={classes.paperRoot}>
      <div className={classes.header}>
        <h3 className={classes.head}>
          {data.supportType && (
            <div className={classes.typeIcon}>
              <Image
                src={prefixImgSrc(`/image/icons/${data.supportType}.png`)}
                alt={data.supportType}
                width={20}
                height={20}
              />
            </div>
          )}
          {data.name.ko}
          <br />
          {data.name.ja}
        </h3>
      </div>
      <CardTags type={data.type} limited={data.limited} />
      <div
        style={{
          backgroundImage: `url(${prefixImgSrc(data.imageSrc)})`,
        }}
        className={classes.image}
      />
      {data.playable && <StatusTable data={data} />}
      {data.type === "support" && (
        <React.Fragment>
          {data.bonusEffectTable && data.originalEffect ? (
            <SimpleBonusTable
              tableData={data.bonusEffectTable}
              originalEffect={data.originalEffect}
            />
          ) : (
            <BonusTable data={data.bonus} />
          )}
        </React.Fragment>
      )}
      {data.type === "training" && (
        <section className={classes.section}>
          <h4>고유 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.unique.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}
      {data.type === "training" ? (
        <section className={classes.section}>
          <h4>초기 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.base.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      ) : (
        <section className={classes.section}>
          <h4>육성 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.training.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}
      {data.type === "training" ? (
        <section className={classes.section}>
          <h4>각성 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.awakening.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      ) : (
        <section className={classes.section}>
          <h4>소지 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.has.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}

      {props.skillData?.special?.length > 0 && (
        <section className={classes.section}>
          <h4>스폐셜 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.special.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}

      {props.skillData?.special?.length > 0 && (
        <section className={classes.section}>
          <h4>진화 스킬</h4>
          <div className={classes.skillCardsWrapper}>
            {props.skillData.evolution.map((skill) => renderSkillCards(skill))}
          </div>
        </section>
      )}

      {data.type === "training" && (
        <section className={classes.section}>
          <h4>육성 목표</h4>
          <TrainingObjects data={data.trainingObjects} />
        </section>
      )}
      {data.type === "training" && data.hiddenTitle && (
        <section className={classes.section}>
          <h4>히든 칭호</h4>
          <HiddenTitles HiddenTitles={data.hiddenTitle} />
        </section>
      )}
      <section className={classes.section} ref={selectionElement}>
        <span className={classes.warning}>
          한국판과 선택지 결과로 얻는 보너스가 다를 수 있습니다.<br /><br />
          또한 4주년 업데이트 이후 추가되는 카드의 선택지는 업데이트 되지 않습니다.
        </span>
        {data.type === "training" && (
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
        <h4>{data.type === "training" ? "일회성 이벤트" : "육성 이벤트"}</h4>
        {data.events.once.map((event, index) => (
          <EventItems
            eventData={event}
            editable={false}
            key={`event-once-${index}`}
          />
        ))}
        {data.events.multipleTimes.length > 0 && (
          <div>
            <h4>다회성 이벤트</h4>
            {data.events.multipleTimes.map((event, index) => (
              <EventItems
                eventData={event}
                editable={false}
                key={`event-multiple-event-${index}`}
              />
            ))}
          </div>
        )}
        <span className={classes.warning}>
          한국판과 선택지 결과로 얻는 보너스가 다를 수 있습니다.<br /><br />
          또한 4주년 업데이트 이후 추가되는 카드의 선택지는 업데이트 되지 않습니다.
        </span>
      </section>
      <SideButtons rootRef={props.rootRef} />
    </div>
  );
};

export default CardInfo;
