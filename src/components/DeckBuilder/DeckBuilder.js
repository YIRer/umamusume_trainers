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

const useStyles = makeStyles((theme) => ({
  addDeckButton: {
    width: "100%",
    marginTop: "16px",
    marginBottom: "16px",
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
  const [deckCookies, setDeckCookies] = useCookies([COOKIE_NAME]);

  const [deckList, setDeckList] = useState([]);

  const [openCardModal, setOpenCardModal] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const { loading, data } = useQuery(GET_CARDS_All_DATA);

  useEffect(() => {
    if (data && data.cards) {
      setInitData(data.cards);
    }
  }, [data]);

  const setInitData = (list) => {
    if (deckCookies[COOKIE_NAME]) {
      const decks = [];
      deckCookies[COOKIE_NAME].forEach((deck) => {
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

  const showCardInfo = (card, isShowSelection = false) => {
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

  const editDeckList = (deck) => {
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

  const removeDeck = (id) => {
    const filteredDeckList = deckList.filter((d) => d.id !== id);
    const cookies = deckCookies[COOKIE_NAME] || [];
    const filteredCookies = cookies.filter((d) => d.id !== id);
    setDeckList(filteredDeckList);
    setCookies(filteredCookies);
  };

  const setCookies = (deckList) => {
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
    </div>
  );
};

export default DeckBuilder;
