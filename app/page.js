import Hero from "../src/components/Hero/Hero";
import Cards from "../src/components/Cards/Cards";
import apolloClient from "@/app/graphql";
import { GET_ALL_SPACE_DATA } from "@/app/graphql/queries/space";

export const dynamic = "force-dynamic";

async function getSpaceData() {
  try {
    console.log("Fetching space data from GraphQL...");
    const { data, errors } = await apolloClient.query({
      query: GET_ALL_SPACE_DATA,
    });

    if (errors) {
      console.error("GraphQL errors:", errors);
    }

    console.log("GraphQL response received:", {
      launchesCount: data?.space?.launches?.results?.length || 0,
      expeditionsCount: data?.space?.expeditions?.results?.length || 0,
      eventsCount: data?.space?.events?.results?.length || 0,
    });

    return {
      launches: data?.space?.launches || { results: [], count: 0 },
      expeditions: data?.space?.expeditions || { results: [], count: 0 },
      events: data?.space?.events || { results: [], count: 0 },
    };
  } catch (error) {
    console.error("Error fetching space data from GraphQL:", error.message, error.stack);
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
