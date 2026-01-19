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

// Combined query to fetch all data in a single request
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
