import { gql } from "@apollo/client";

export const GET_ALL_SPACE_DATA = gql`
  query GetAllSpaceData {
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
            type {
              id
              name
            }
          }
        }
      }
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
                type {
                  id
                  name
                }
              }
            }
          }
        }
      }
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
          image {
            image_url
            thumbnail_url
          }
          type {
            id
            name
          }
        }
      }
    }
  }
`;
