import { gql } from "@apollo/client";

export const GET_EXPEDITIONS = gql`
  query GetExpeditions {
    space {
      expeditions {
        count
        updatedAt
        results {
          id
          name
          start
          end
          spacestation {
            id
            name
            status {
              id
              name
            }
            orbit
          }
          crew {
            id
            role {
              id
              role
              priority
            }
            astronaut {
              id
              name
              status {
                id
                name
              }
              agency {
                id
                name
                type
              }
            }
          }
        }
      }
    }
  }
`;
