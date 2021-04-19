import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  ItemRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cardImage: {
    width: "80px",
    height: "104px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    cursor: "pointer",
  },

  cardImgWrapper: {
    position: "relative",
    width: "80px",
    height: "104px",
  },
  image: {
    width: "50px",
    width: "50px",
    marginRight: "8px",
  },
  typeIcon: {
    position: "absolute",
    right: "0",
    top: "0",
    width: "25px",
    height: "25px",
  },
  supportCardWrapper: {
    display: "grid",
    width: "260px",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "8px",
    marginTop: "16px",
    marginBottom: "16px",
  },

  trainingCard: {
    width: "100px",
    height: "128px",
  },
  name: {
    display: "flex",
    textAalign: "center",
    wordBreak: "keep-all",
    fontSize: "14px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const CardImage = ({ data, onSelectCard, classes, isTrainingType }) => {
  const handleSelectSkill = () => {
    onSelectCard(data);
  };

  return (
    <div
      className={clsx(
        classes.cardImgWrapper,
        isTrainingType && classes.trainingCard
      )}
    >
      <img
        onClick={handleSelectSkill}
        src={data.imageSrc}
        className={clsx(
          classes.cardImage,
          isTrainingType && classes.trainingCard
        )}
      />
      {!isTrainingType && (
        <img
          className={classes.typeIcon}
          src={`/image/icons/${data.supportType}.png`}
          alt={data.supportType}
        />
      )}
    </div>
  );
};

const DeckCardList = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.ItemRoot}>
      <div>
        <div>
          <CardImage
            data={data.training[0]}
            onSelectCard={props.showClickedCardInfo}
            classes={classes}
            isTrainingType={true}
          />
          <span className={classes.name}>{data.training[0].name.ko}</span>
        </div>
      </div>
      <div className={classes.supportCardWrapper}>
        {data.support.map((card, index) => (
          <div key={card.name.ja + index}>
            <CardImage
              data={card}
              onSelectCard={props.showClickedCardInfo}
              classes={classes}
            />
            <span className={classes.name}>{card.name.ko}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckCardList;
