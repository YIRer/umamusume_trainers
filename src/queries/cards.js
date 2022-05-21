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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
      limited
      uniqueSkillsIds
      trainingSkillsIds
      hasSkillsIds
      baseSkillsIds
      awakeningSkillsIds
      specialSkillsIds
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        tags
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
          }
        }
      }
      bonus {
        unique {
          level
          effect
        }
        support {
          level
          effect
          maxEffect
        }
      }
      originalEffect {
        level
        effect
      }
      bonusEffectTable {
        name
        effects
      }
      hiddenTitle {
        name
        condition
        rewards
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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
      limited
      uniqueSkillsIds
      trainingSkillsIds
      hasSkillsIds
      baseSkillsIds
      awakeningSkillsIds
      specialSkillsIds
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        tags
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
          }
        }
      }
      bonus {
        unique {
          level
          effect
        }
        support {
          level
          effect
          maxEffect
        }
      }
      originalEffect {
        level
        effect
      }
      bonusEffectTable {
        name
        effects
      }
      hiddenTitle {
        name
        condition
        rewards
      }
    }
  }
`;

export const GET_CARDS_BY_TYPE = gql`
  query GetCardsByType($type: String!) {
    getCardsByType(type: $type) {
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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
      limited
      uniqueSkillsIds
      trainingSkillsIds
      hasSkillsIds
      baseSkillsIds
      awakeningSkillsIds
      specialSkillsIds
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        tags
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
          }
        }
      }
      bonus {
        unique {
          level
          effect
        }
        support {
          level
          effect
          maxEffect
        }
      }
      originalEffect {
        level
        effect
      }
      bonusEffectTable {
        name
        effects
      }
      hiddenTitle {
        name
        condition
        rewards
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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
      limited
      uniqueSkillsIds
      trainingSkillsIds
      hasSkillsIds
      baseSkillsIds
      awakeningSkillsIds
      specialSkillsIds
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        tags
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
          }
        }
      }
      bonus {
        unique {
          level
          effect
        }
        support {
          level
          effect
          maxEffect
        }
      }
      originalEffect {
        level
        effect
      }
      originalEffect {
        level
        effect
      }
      bonusEffectTable {
        name
        effects
      }
      hiddenTitle {
        name
        condition
        rewards
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
      supportType
      trainingObjects {
        object
        time
        fan
        raceCourse
      }
      limited
      uniqueSkillsIds
      trainingSkillsIds
      hasSkillsIds
      baseSkillsIds
      awakeningSkillsIds
      specialSkillsIds
      skills {
        name {
          ko
          ja
        }
        imageSrc
        id
        effect
        tags
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
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
            results {
              condition
              result
            }
          }
        }
      }
      bonus {
        unique {
          level
          effect
        }
        support {
          level
          effect
          maxEffect
        }
      }
      originalEffect {
        level
        effect
      }
      bonusEffectTable {
        name
        effects
      }
      hiddenTitle {
        name
        condition
        rewards
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
