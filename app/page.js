import Hero from "../src/components/Hero/Hero";
import Cards from "../src/components/Cards/Cards";
import clientPromise from "../src/lib/mongodb";

// Force dynamic rendering so we fetch fresh data from MongoDB on each request
export const dynamic = "force-dynamic";

async function getLaunches() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const launchesDoc = await db.collection("launches").findOne({});

    if (!launchesDoc) {
      return { results: [] };
    }

    return {
      results: launchesDoc.results || [],
      count: launchesDoc.count,
      updatedAt: launchesDoc.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching launches from MongoDB:", error);
    return { results: [] };
  }
}

async function getExpeditions() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const expeditionsDoc = await db.collection("expeditions").findOne({});

    if (!expeditionsDoc) {
      return { results: [] };
    }

    return {
      results: expeditionsDoc.results || [],
      count: expeditionsDoc.count,
      updatedAt: expeditionsDoc.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching expeditions from MongoDB:", error);
    return { results: [] };
  }
}

async function getEvents() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const eventsDoc = await db.collection("events").findOne({});

    if (!eventsDoc) {
      return { results: [] };
    }

    return {
      results: eventsDoc.results || [],
      count: eventsDoc.count,
      updatedAt: eventsDoc.updatedAt?.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching events from MongoDB:", error);
    return { results: [] };
  }
}

export default async function Home() {
  const [launches, expeditions, events] = await Promise.all([
    getLaunches(),
    getExpeditions(),
    getEvents(),
  ]);

  return (
    <>
      <Hero />
      <Cards launches={launches} expeditions={expeditions} events={events} />
    </>
  );
}
