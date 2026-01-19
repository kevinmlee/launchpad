import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    space {
      events {
        count
        updatedAt
        results {
          id
          name
          description
          location
          date
          news_url
          video_url
          feature_image
          type {
            id
            name
          }
        }
      }
    }
  }
`;
