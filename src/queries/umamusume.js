import { gql } from "@apollo/client";

export const GET_UMAMUSUMES = gql`
  query {
    umamusumeList {
      id
      name {
        default
        ko
        ja
      }
      imageSrc
      cards {
        id
      }
    }
  }
`;

export const GET_UMAMUSUME = gql`
  query umamusume($id: ID) {
    umamusume(id: $id) {
      id
      name {
        ko
        default
        ja
      }
      imageSrc
      cards {
        id
      }
    }
  }
`;

export const ADD_UMAMUSUME = gql`
  mutation AddUmamusume($input: UmamusumeInputType) {
    addUmamusume(input: $input) {
      name {
        ko
        default
        ja
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
        ko
        default
        ja
      }
      imageSrc
      cards {
        id
      }
    }
  }
`;
