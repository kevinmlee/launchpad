import Hero from "../src/components/Hero/Hero";
import Cards from "../src/components/Cards/Cards";

export const dynamic = "force-dynamic";

const GRAPHQL_ENDPOINT = "https://graphql.kevinmlee.com/";

const QUERY = `
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

async function getSpaceData() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const json = await response.json();
    const data = json.data;

    return {
      launches: data?.space?.launches || { results: [], count: 0 },
      expeditions: data?.space?.expeditions || { results: [], count: 0 },
      events: data?.space?.events || { results: [], count: 0 },
    };
  } catch (error) {
    console.error("Error fetching space data:", error);
    return {
      launches: { results: [] },
      expeditions: { results: [] },
      events: { results: [] },
    };
  }
}

export default async function Home() {
  const { launches, expeditions, events } = await getSpaceData();

  return (
    <>
      <Hero />
      <Cards launches={launches} expeditions={expeditions} events={events} />
    </>
  );
}
