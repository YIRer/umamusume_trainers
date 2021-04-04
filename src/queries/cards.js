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
      name {
        ko
        ja
      }
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
      name {
        ko
        ja
      }
      star
    }
  }
`;

export const GET_CARDS_All_DATA = gql`
  {
    cards {
      name {
        ko
        ja
      }
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      skills {
        name {
          ko
          ja
        }
        imageSrc
        targetIDs
        id
        effect
        type
      }
      status {
        ground {
          duct {
            rank
            bonus
          }
          turf {
            rank
            bonus
          }
        }
        distance {
          short {
            rank
            bonus
          }
          mile {
            rank
            bonus
          }
          medium {
            rank
            bonus
          }
          long {
            rank
            bonus
          }
        }
        strategy {
          escape {
            rank
            bonus
          }
          leading {
            rank
            bonus
          }
          between {
            rank
            bonus
          }
          pushing {
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
      events {
        common {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description
            result
          }
        }
        once {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description
            result
          }
        }
        multipleTimes {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description
            result
          }
        }
      }
    }
  }
`;

export const GET_CARD = gql`
  query card($id: ID!) {
    card(id: $id) {
      name {
        ko
        ja
      }
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        type
        targetIDs
      }
      status {
        ground {
          duct {
            rank
            bonus
          }
          turf {
            rank
            bonus
          }
        }
        distance {
          short {
            rank
            bonus
          }
          mile {
            rank
            bonus
          }
          medium {
            rank
            bonus
          }
          long {
            rank
            bonus
          }
        }
        strategy {
          escape {
            rank
            bonus
          }
          leading {
            rank
            bonus
          }
          between {
            rank
            bonus
          }
          pushing {
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
      events {
        common {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
        once {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
        multipleTimes {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($input: CardInputType) {
    addCard(input: $input) {
      name {
        ko
        ja
      }
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        type
      }
      status {
        ground {
          duct {
            rank
            bonus
          }
          turf {
            rank
            bonus
          }
        }
        distance {
          short {
            rank
            bonus
          }
          mile {
            rank
            bonus
          }
          medium {
            rank
            bonus
          }
          long {
            rank
            bonus
          }
        }
        strategy {
          escape {
            rank
            bonus
          }
          leading {
            rank
            bonus
          }
          between {
            rank
            bonus
          }
          pushing {
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
      events {
        common {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
        once {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
        multipleTimes {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
      }
    }
  }
`;

export const EDIT_CARD = gql`
  mutation EditCard($id: ID!, $input: CardInputType) {
    editCard(id: $id, input: $input) {
      name {
        ko
        ja
      }
      star
      id
      targetID
      imageSrc
      type
      playable
      limited
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        type
        targetIDs
      }
      status {
        ground {
          duct {
            rank
            bonus
          }
          turf {
            rank
            bonus
          }
        }
        distance {
          short {
            rank
            bonus
          }
          mile {
            rank
            bonus
          }
          medium {
            rank
            bonus
          }
          long {
            rank
            bonus
          }
        }
        strategy {
          escape {
            rank
            bonus
          }
          leading {
            rank
            bonus
          }
          between {
            rank
            bonus
          }
          pushing {
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
      events {
        common {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
        once {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
          }
        }
        multipleTimes {
          title {
            ko
            ja
          }
          eventType
          tags
          condition
          choices {
            description {
              ko
              ja
            }
            result
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
