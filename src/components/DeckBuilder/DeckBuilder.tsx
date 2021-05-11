import React, { useEffect, useState } from "react";
import { GET_CARDS_All_DATA } from "queries/cards";
import { useQuery } from "@apollo/client";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import DeckForm from "./DeckForm";
import CardInfoModal from "./CardInfoModal";
import Loader from "components/Common/Loader";
import { useCookies } from "react-cookie";

import DeckSlot from "./DeckSlot";
import { DeckWithID } from "./types";
import { CardType } from "types/Card/card";

const useStyles = makeStyles((_theme) => ({
  addDeckButton: {
    width: "100%",
    marginTop: "16px",
    marginBottom: "16px",
  },

  warning: {
    marginTop: "50px",
    border: "1px solid #eee",
    boxSizing: "border-box",
    padding: "30px",
  },
}));

const findCardData = (targetID, cache, cards) => {
  if (cache[targetID]) {
    return cache[targetID];
  }

  const targetInfo = cards.find((c) => c.id === targetID);

  cache[targetID] = targetInfo;

  return targetInfo;
};

const COOKIE_NAME = "umamusume-trainesr-deck-builder";

const DeckBuilder = () => {
  const classes = useStyles();
  const cache = {};
  const [deckCookies, setDeckCookies, removeCookie] = useCookies([COOKIE_NAME]);

  const [deckList, setDeckList] = useState<DeckWithID[]>([]);

  const [openCardModal, setOpenCardModal] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { loading, data } = useQuery<{ cards: CardType[] }>(GET_CARDS_All_DATA);

  useEffect(() => {
    if (data && data.cards) {
      setInitData(data.cards);
    }
  }, [data]);

  const setInitData = (list: CardType[]) => {
    if (deckCookies[COOKIE_NAME]) {
      const decks = [];
      deckCookies[COOKIE_NAME].forEach((deck: DeckWithID) => {
        const data = {
          training: [],
          support: [],
          id: deck.id,
        };

        deck.training.forEach((cId) => {
          const card = findCardData(cId, cache, list);
          data.training.push(card);
        });

        deck.support.forEach((cId) => {
          const card = findCardData(cId, cache, list);
          data.support.push(card);
        });

        decks.push(data);
      });

      setDeckList(decks);
    }
  };

  const showCardInfo = (card: CardType, isShowSelection: boolean = false) => {
    setOpenCardModal(true);
    setSelectedCard(card);
    setShowSelection(isShowSelection);
  };

  const hideCardInfo = () => {
    setOpenCardModal(false);
    setSelectedCard(null);
    setShowSelection(false);
  };

  const addDeckList = (deck) => {
    setDeckList([...deckList, deck]);

    const { training, support, id } = deck;
    const addDeck = {
      training: [training[0].id],
      support: support.map(({ id }) => id),
      id,
    };

    const cookie = deckCookies[COOKIE_NAME] || [];
    setCookies([...cookie, addDeck]);
    setOpenAddForm(false);
  };

  const editDeckList = (deck: DeckWithID) => {
    const changedDeck = deckList.map((d) => {
      if (d.id === deck.id) {
        return deck;
      } else {
        return d;
      }
    });
    setDeckList(changedDeck);

    const cookie = deckCookies[COOKIE_NAME] || [];

    const editedCookie = cookie.map((cookie) => {
      if (cookie.id === deck.id) {
        return {
          training: [deck.training[0].id],
          support: deck.support.map(({ id }) => id),
          id: deck.id,
        };
      } else {
        return cookie;
      }
    });
    setCookies(editedCookie);
  };

  const removeDeck = (id: string) => {
    const filteredDeckList = deckList.filter((d) => d.id !== id);
    const cookies = deckCookies[COOKIE_NAME] || [];
    const filteredCookies = cookies.filter((d) => d.id !== id);
    setDeckList(filteredDeckList);
    setCookies(filteredCookies);
  };

  const setCookies = (deckList: DeckWithID[]) => {
    const time = new Date(
      new Date().getTime() + 365 * 60 * 24 * 60 * 60 * 1000
    );
    setDeckCookies(COOKIE_NAME, deckList, {
      path: "/",
      expires: time,
    });
  };

  const toggleAddForm = () => {
    setOpenAddForm(!openAddForm);
  };

  if (loading) {
    return <Loader />;
  }

  const removeAllCookies = () => {
    if (window && window.confirm("저장된 덱 리스트를 전부 제거하시겠습니까?")) {
      removeCookie(COOKIE_NAME, {
        path: "/",
      });
      removeCookie(COOKIE_NAME, {
        path: "/deck-builder",
      });
      setDeckList([]);
    }
  };

  return (
    <div>
      <div>
        {deckList.length > 0
          ? deckList.map((deck, index) => (
              <DeckSlot
                data={deck}
                key={deck.id}
                showClickedCardInfo={showCardInfo}
                index={index}
                cardsData={data.cards}
                onEdit={editDeckList}
                onDelete={removeDeck}
              />
            ))
          : "등록된 덱이 없습니다."}
      </div>
      <Button
        className={classes.addDeckButton}
        onClick={toggleAddForm}
        color={"primary"}
        variant="contained"
      >
        {openAddForm ? "닫기" : "추가"}
      </Button>
      {openAddForm && (
        <DeckForm
          data={data.cards}
          showClickedCardInfo={showCardInfo}
          onSubmit={addDeckList}
        />
      )}

      {openCardModal && (
        <CardInfoModal
          open
          data={selectedCard}
          onClose={hideCardInfo}
          showSelection={showSelection}
        />
      )}
      <div className={classes.warning}>
        <p>
          덱 리스트가 제거되어도 남아있는 문제가 있다면 아래의 버튼을
          눌러주세요. 저장된 쿠키를 모두 제거합니다.
        </p>
        <Button
          className={classes.addDeckButton}
          onClick={removeAllCookies}
          color={"secondary"}
          variant="contained"
        >
          쿠키 제거
        </Button>
      </div>
    </div>
  );
};

export default DeckBuilder;
