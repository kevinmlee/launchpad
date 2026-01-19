import Hero from "../src/components/Hero/Hero";
import Cards from "../src/components/Cards/Cards";
import clientPromise from "../src/lib/mongodb";

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

async function getSpaceDataFromGraphQL() {
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
}

async function getSpaceDataFromMongoDB() {
  const client = await clientPromise;
  const db = client.db("data");

  const [launches, expeditions, events] = await Promise.all([
    db.collection("launches").find({}).toArray(),
    db.collection("expeditions").find({}).toArray(),
    db.collection("events").find({}).toArray(),
  ]);

  // Convert MongoDB documents to plain objects (remove _id)
  const serialize = (docs) => docs.map(({ _id, ...rest }) => rest);

  return {
    launches: { results: serialize(launches), count: launches.length },
    expeditions: { results: serialize(expeditions), count: expeditions.length },
    events: { results: serialize(events), count: events.length },
  };
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const useGraphQL = params?.graphql === "true";

  let launches, expeditions, events;

  try {
    if (useGraphQL) {
      ({ launches, expeditions, events } = await getSpaceDataFromGraphQL());
    } else {
      ({ launches, expeditions, events } = await getSpaceDataFromMongoDB());
    }
  } catch (error) {
    console.error("Error fetching space data:", error);
    launches = { results: [] };
    expeditions = { results: [] };
    events = { results: [] };
  }

  return (
    <>
      <Hero />
      <Cards launches={launches} expeditions={expeditions} events={events} />
    </>
  );
}
