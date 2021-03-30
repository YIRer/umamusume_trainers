import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query {
    cards {
      id
      targetID
      imageSrc
      type
      playable
      limited
      name
      star
    }
  }
`;

export const FIND_CARDS = gql`
  query FindCards($ids: [ID]!) {
    findCards(ids: $ids) {
      id
      targetID
      imageSrc
      type
      playable
      limited
      name
      star
    }
  }
`;

export const GET_CARDS_All_DATA = gql`
  {
    cards {
      name
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      status {
        speed {
          rank
          bonus
        }
        stamina {
          rank
          bonus
        }
        power {
          rank
          bonus
        }
        guts {
          rank
          bonus
        }
        intelligence {
          rank
          bonus
        }
      }
    }
  }
`;

export const GET_CARD = gql`
  query card($id: ID!) {
    card(id: $id) {
      name
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      status {
        ground {
          duct {
            rank
            bonus
          }
          grass {
            rank
            bonus
          }
        }
        status {
          speed {
            rank
            bonus
          }
          stamina {
            rank
            bonus
          }
          power {
            rank
            bonus
          }
          guts {
            rank
            bonus
          }
          intelligence {
            rank
            bonus
          }
        }
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($input: CardInputType) {
    addCard(input: $input) {
      name
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      status {
        ground {
          duct {
            rank
            bonus
          }
          grass {
            rank
            bonus
          }
        }
        status {
          speed {
            rank
            bonus
          }
          stamina {
            rank
            bonus
          }
          power {
            rank
            bonus
          }
          guts {
            rank
            bonus
          }
          intelligence {
            rank
            bonus
          }
        }
      }
    }
  }
`;

export const EDIT_CARD = gql`
  mutation EditCard($id: ID!, $input: CardInputType) {
    editCard(id: $id, input: $input) {
      name
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      status {
        ground {
          duct {
            rank
            bonus
          }
          grass {
            rank
            bonus
          }
        }
        status {
          speed {
            rank
            bonus
          }
          stamina {
            rank
            bonus
          }
          power {
            rank
            bonus
          }
          guts {
            rank
            bonus
          }
          intelligence {
            rank
            bonus
          }
        }
      }
    }
  }
`;

export const DELTE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;
