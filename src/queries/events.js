import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query {
    events {
      id
      title {
        ko
        ja
      }
      eventType
      tags
      condition
    }
  }
`;

export const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
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
`;

export const ADD_EVENT = gql`
  mutation AddEvent($input: EventInputType) {
    addEvent(input: $input) {
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
`;

export const EDIT_EVENT = gql`
  mutation EditEvent($id: ID!, $input: EventInputType) {
    editEvent(id: $id, input: $input) {
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
`;

export const EDIT_EVENTS = gql`
  mutation EditEvents($ids: [ID], $eventsTargetIDs: [[ID]]) {
    editEvents(ids: $ids, eventsTargetIDs: $eventsTargetIDs) {
      id
      title {
        ko
        ja
      }
      targetIDs
    }
  }
`;

export const DELTE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;
