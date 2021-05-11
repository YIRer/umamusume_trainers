import React, { useEffect, useState, useReducer } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { v4 as uuidv4 } from "uuid";

import SearchCards from "./SearchCards";
import { withCookies } from "react-cookie";
import { prefixImgSrc } from "helper";

import { DeckWithID, DeckFormProps } from "./types";
import { CardType, TypeOfCard } from "types/Card/card";
import { Classes } from "types/Common/classes";

const useStyles = makeStyles((_theme) => ({
  card: {
    width: "100px",
    height: "128px",
    boxSizing: "border-box",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  },

  slotRoot: {
    display: "flex",
    flexDirection: "column",
    padding: "8px",
  },

  slotHeader: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "20px",
  },

  trainingSlot: {
    minHeight: "128px",
    textAlign: "center",
  },
  supportSlot: {
    display: "flex",
    flexWrap: "wrap",
    padding: "8px",
    borderColor: "#f5e642",
    maxWidth: "336px",
    "& > div": {
      marginRight: "10px",
      marginBottom: "10px",
    },
  },
  emptyMessasge: {
    display: "flex",
    height: "128px",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginLeft: "10px",
  },
  cardActions: {
    justifyContent: "center",
  },
}));

const DeckSlotItem = ({
  data,
  classes,
  clickFn,
}: {
  data: CardType;
  classes: Classes;
  clickFn: (card: CardType, isShowSelection?: boolean) => void;
}) => {
  return (
    <div
      className={classes.card}
      style={{
        backgroundImage: `url(${prefixImgSrc(data.imageSrc)})`,
      }}
      onClick={() => {
        clickFn(data);
      }}
    ></div>
  );
};

const DeckForm = (props: DeckFormProps) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [cardType, setCardType] = useState<TypeOfCard | "">("");
  const [slotName, setSlotName] = useState("");

  const [selectedCards, setSelectedCards] = useReducer(
    (state: DeckWithID, newState: Partial<DeckWithID>) => ({
      ...state,
      ...newState,
    }),
    props.initData || {
      training: [],
      support: [],
    }
  );
  const [cardList, setCardList] = useReducer(
    (state: DeckWithID, newState: Partial<DeckWithID>) => ({
      ...state,
      ...newState,
    }),
    {
      training: [],
      support: [],
    }
  );

  useEffect(() => {
    setInitialCardList(props.data);
  }, []);

  const setInitialCardList = (list: CardType[]) => {
    const data = {
      training: [],
      support: [],
    };

    list.forEach((card) => {
      if (card.type === "training") {
        data.training.push(card);
      } else if (card.type === "support") {
        data.support.push(card);
      }
    });

    setCardList(data);
  };

  const openTrainingCardModal = () => {
    setOpenModal(true);
    setCardType("training");
    setSlotName("training");
  };

  const closeCardModal = () => {
    setOpenModal(false);
    setCardType("");
  };

  const openSupportCardModal = () => {
    setOpenModal(true);
    setCardType("support");
    setSlotName("support");
  };

  const handleSelect = (selectedCards: CardType[]) => {
    if (cardType === "training") {
      const filteredArray = cardList.support.filter(
        (c) => c.targetID !== selectedCards[0]?.targetID
      );

      setCardList({ support: filteredArray });
    }

    setSelectedCards({ [slotName]: selectedCards });

    setSlotName("");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (selectedCards.training.length < 1) {
      window.alert("육성 카드는 필수로 선택해주세요.");
      return;
    }
    const id = props.initData?.id || uuidv4();
    const data = {
      training: selectedCards.training,
      support: selectedCards.support,
      id: id,
    };
    props.onSubmit(data);
  };

  return (
    <Card>
      <CardContent>
        <div className={classes.slotRoot}>
          <div className={classes.slotHeader}>
            <b>육성 카드 선택</b>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={openTrainingCardModal}
            >
              {selectedCards.training.length > 0 ? "변경 하기" : "추가 하기"}
            </Button>
          </div>
          <div className={classes.trainingSlot}>
            {selectedCards.training[0] ? (
              <DeckSlotItem
                data={selectedCards.training[0]}
                classes={classes}
                clickFn={props.showClickedCardInfo}
              />
            ) : (
              <span className={classes.emptyMessasge}>선택된 카드 없음</span>
            )}
          </div>
        </div>
        <div className={classes.slotRoot}>
          <div className={classes.slotHeader}>
            <b>서포트 카드 선택</b>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={openSupportCardModal}
            >
              {selectedCards.support.length > 0 ? "변경 하기" : "추가 하기"}
            </Button>
          </div>
          {selectedCards.support.length > 0 ? (
            <div className={classes.supportSlot}>
              {selectedCards.support.map((card) => (
                <DeckSlotItem
                  key={`card-${card.id}`}
                  data={card}
                  classes={classes}
                  clickFn={props.showClickedCardInfo}
                />
              ))}
            </div>
          ) : (
            <span className={classes.emptyMessasge}>선택된 카드 없음</span>
          )}
        </div>
      </CardContent>
      <CardActions classes={{ root: classes.cardActions }}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </CardActions>
      {openModal && (
        <SearchCards
          open
          type={cardType}
          onClose={closeCardModal}
          onSelect={handleSelect}
          selectedData={selectedCards[slotName]}
          data={cardList[cardType]}
        />
      )}
    </Card>
  );
};

export default withCookies(DeckForm);
