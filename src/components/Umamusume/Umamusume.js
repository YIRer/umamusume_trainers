import React from "react";
import { withRouter } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_UMAMUSUME,
  GET_UMAMUSUMES,
  DELTE_UMAMUSUME,
} from "queries/umamusume";

import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Loader from "components/Common/Loader";

import * as isDev from "../../constants";
import { prefixImgSrc } from "helper";

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
  },
  typeIcon: {
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "12px",
    bottom: 0,
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

  const renderCards = (data, type) => {
    return data.map((card) => {
      if (card.type === type) {
        return (
          <Link
            to={`/cards/${card.id}`}
            key={`card=${type}-${card.id}`}
            className={classes.cardWrapper}
          >
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
          </Link>
        );
      }
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  const { umamusume } = data;
  if (!umamusume) return <p>Error :(</p>;

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <div className={classes.header}>
        <h3>
          {umamusume.name.ko}({umamusume.name.ja})
        </h3>

        {isDev && (
          <div className={classes.icons}>
            <Link to={`/admin/umamusume/${id}/edit`} className={classes.link}>
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
    </Paper>
  );
};

export default withRouter(Umamusume);
