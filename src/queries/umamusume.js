import { gql } from "@apollo/client";

export const GET_UMAMUSUMES = gql`
  query {
    umamusumeList {
      id
      name {
        default
        ko
        ja
        en
      }
      imageSrc
    }
  }
`;

export const GET_UMAMUSUMES_All_DATA = gql`
  query {
    umamusumeList {
      id
      name {
        default
        ko
        ja
        en
      }
      imageSrc
      cards {
        id
        imageSrc
        star
        type
        playable
        limited
      }
    }
  }
`;

export const GET_UMAMUSUME = gql`
  query umamusume($id: ID) {
    umamusume(id: $id) {
      id
      name {
        default
        ko
        ja
        en
      }
      imageSrc
      cards {
        id
        imageSrc
        star
        type
        playable
        limited
      }
    }
  }
`;

export const ADD_UMAMUSUME = gql`
  mutation AddUmamusume($input: UmamusumeInputType) {
    addUmamusume(input: $input) {
      name {
        default
        ko
        ja
        en
      }
      imageSrc
      cards {
        id
      }
    }
  }
`;

export const EDIT_UMAMUSUME = gql`
  mutation EditUmamusume($id: ID!, $input: UmamusumeInputType) {
    editUmamusume(id: $id, input: $input) {
      name {
        default
        ko
        ja
        en
      }
      imageSrc
      cards {
        id
      }
    }
  }
`;

export const DELTE_UMAMUSUME = gql`
  mutation DeleteUmamusume($id: ID!, $cards: [CardInputType]) {
    deleteUmamusume(id: $id, cards: $cards) {
      id
    }
  }
`;
