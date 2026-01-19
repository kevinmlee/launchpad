import Hero from "../src/components/Hero/Hero";
import Cards from "../src/components/Cards/Cards";
import { createApolloClient } from "../src/lib/apollo-client";
import { GET_ALL_SPACE_DATA } from "../src/graphql/queries";

// Force dynamic rendering so we fetch fresh data on each request
export const dynamic = "force-dynamic";

async function getSpaceData() {
  try {
    const client = createApolloClient();
    const { data, errors } = await client.query({
      query: GET_ALL_SPACE_DATA,
    });

    if (errors) {
      console.error("GraphQL errors:", errors);
    }

    return {
      launches: data?.space?.launches || { results: [], count: 0 },
      expeditions: data?.space?.expeditions || { results: [], count: 0 },
      events: data?.space?.events || { results: [], count: 0 },
    };
  } catch (error) {
    console.error("Error fetching space data from GraphQL:", error);
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
