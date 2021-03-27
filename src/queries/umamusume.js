import { gql } from "@apollo/client";

export const fetchUmamusumes = gql`
  query {
    umamusumeList {
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
