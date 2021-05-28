import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query {
    skills {
      id
      name {
        ko
        ja
      }
      relatedCards {
        name {
          ko
          ja
        }
        imageSrc
        id
      }
      effect
      imageSrc
      tags
      condition
    }
  }
`;

export const GET_SKill = gql`
  query Sklills($id: ID!) {
    skill(id: $id) {
      id
      name {
        ko
        ja
      }
      relatedCards {
        name {
          ko
          ja
        }
        imageSrc
        id
      }
      effect
      imageSrc
      tags
      condition
    }
  }
`;

export const ADD_Sklill = gql`
  mutation AddSkill($input: SkillInputType) {
    addSkill(input: $input) {
      id
      name {
        ko
        ja
      }
      relatedCards {
        name {
          ko
          ja
        }
        imageSrc
        id
      }
      effect
      imageSrc
      tags
      condition
    }
  }
`;

export const EDIT_SKILL = gql`
  mutation EditSkill($id: ID!, $input: SkillInputType) {
    editSkill(id: $id, input: $input) {
      id
      name {
        ko
        ja
      }
      relatedCards {
        name {
          ko
          ja
        }
        imageSrc
        id
      }
      effect
      imageSrc
      tags
      condition
    }
  }
`;

export const EDIT_SKILLS = gql`
  mutation EditSkillS(
    $addIds: [ID]
    $addTargetIDs: [[ID]]
    $deleteIds: [ID]
    $deleteTargetIDs: [[ID]]
  ) {
    editSkills(
      addIds: $addIds
      addTargetIDs: $addTargetIDs
      deleteIds: $deleteIds
      deleteTargetIDs: $deleteTargetIDs
    ) {
      id
      name {
        ko
        ja
      }
      relatedCards {
        name {
          ko
          ja
        }
        imageSrc
        id
      }
    }
  }
`;

export const DELTE_Skill = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      id
    }
  }
`;
