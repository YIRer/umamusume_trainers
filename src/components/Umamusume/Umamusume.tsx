import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Error from "next/error";
import { useMutation } from "@apollo/client";
import { GET_UMAMUSUMES, DELTE_UMAMUSUME } from "queries/umamusume";

import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { isDev } from "../../constants";
import { prefixImgSrc } from "helper";

import { TypeOfCard } from "types/Card/card";

import { CardType } from "types/Card/card";

import Helmet from "Helmet/Helmet";

import DisplayAds from "components/ADsense/DisplayAds";
import FooterAds from "components/ADsense/FooterAds";

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
  cardWrapper: {
    marginRight: "16px",
    display: "inline-block",
  },
  card: {
    width: "100px",
    height: "100px",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
    position: "relative",
  },
  paperRoot: {
    padding: "16px",
    maxWidth: "400px",
    margin: "auto",
  },
  typeIcon: {
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "12px",
    bottom: 0,
  },
}));

const Umamusume = ({ data, statusCode }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [deleteUmamusume, _mutationData] = useMutation(DELTE_UMAMUSUME);

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    deleteUmamusume({
      variables: {
        id,
        cards: data.umamusume.cards,
      },
    }).then(() => {
      router.replace(`/umamusume`);
    });
  };

  const renderCards = (data: CardType[], type: TypeOfCard) => {
    return data.map((card) => {
      if (card.type === type) {
        return (
          <Link href={`/cards/${card.id}`} key={`card=${type}-${card.id}`}>
            <a className={classes.cardWrapper}>
              <div
                className={classes.card}
                style={{
                  backgroundImage: `url(${prefixImgSrc(card.imageSrc)})`,
                }}
              >
                {type === "support" && (
                  <img
                    className={classes.typeIcon}
                    src={prefixImgSrc(`/image/icons/${card.supportType}.png`)}
                    alt={card.supportType}
                  />
                )}
              </div>
            </a>
          </Link>
        );
      }
    });
  };

  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const { umamusume } = data;
  if (!umamusume) return <p>Error :(</p>;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <DisplayAds />
      <Helmet
        title={`${umamusume.name.ko}(${umamusume.name.ja})`}
        url={`/umamusume/${id}`}
        description={`${umamusume.name.ko}(${umamusume.name.ja})의 육성, 서포트 카드 목록입니다.`}
        imageUrl={prefixImgSrc(umamusume.imageSrc)}
      />
      <div className={classes.header}>
        <h3>
          {umamusume.name.ko}({umamusume.name.ja})
        </h3>

        {isDev && (
          <div className={classes.icons}>
            <Link href={`/admin/umamusume/${id}/edit`}>
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

      <img className={classes.image} src={prefixImgSrc(umamusume.imageSrc)} />
      <section className={classes.section}>
        <h3>카드</h3>
        <div>
          <h4>육성</h4>
          {renderCards(umamusume.cards, "training")}
        </div>
        <div>
          <h4>서포터</h4>
          {renderCards(umamusume.cards, "support")}
        </div>
      </section>
      <FooterAds />
    </Paper>
  );
};

export default Umamusume;
