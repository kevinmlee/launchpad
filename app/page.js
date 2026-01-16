import Hero from "../src/components/Hero/Hero";
import ExpeditionsSection from "../src/components/ExpeditionsSection/ExpeditionsSection";
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

    // Return plain object (not MongoDB document with _id)
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

export default async function Home() {
  const launches = await getLaunches();

  return (
    <>
      <Hero />
      <ExpeditionsSection launches={launches} />
    </>
  );
}
