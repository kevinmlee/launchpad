import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
  query GetLaunches {
    space {
      launches {
        count
        updatedAt
        results {
          id
          name
          net
          window_start
          window_end
          image
          infographic
          status {
            id
            name
            abbrev
            description
          }
          pad {
            id
            name
            latitude
            longitude
            location {
              id
              name
              country_code
            }
          }
          mission {
            id
            name
            description
            type
            orbit {
              id
              name
              abbrev
            }
          }
          rocket {
            id
            configuration {
              id
              name
              full_name
              variant
            }
          }
          launch_service_provider {
            id
            name
            type
          }
        }
      }
    }
  }
`;
