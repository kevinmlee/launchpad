import { NextResponse } from "next/server";
import clientPromise from "../../../../src/lib/mongodb";

const SPACE_DEVS_API = "https://ll.thespacedevs.com/2.3.0";

export async function POST() {
  try {
    const response = await fetch(
      `${SPACE_DEVS_API}/expeditions/?is_active=true&ordering=-start&limit=20&mode=detailed`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Space Devs API" },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: "No expedition data received from API" },
        { status: 502 }
      );
    }

    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("expeditions");

    // Clear existing documents and insert each item as its own document
    await collection.deleteMany({});

    const documents = data.results.map((item) => ({
      ...item,
      updatedAt: new Date(),
    }));

    await collection.insertMany(documents);

    return NextResponse.json({
      success: true,
      message: `Updated ${data.results.length} expeditions`,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error refreshing expeditions:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
