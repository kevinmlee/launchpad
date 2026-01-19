import { NextResponse } from "next/server";
import clientPromise from "../../../../src/lib/mongodb";

const SPACE_DEVS_API = "https://ll.thespacedevs.com/2.2.0";

export async function POST() {
  try {
    const response = await fetch(`${SPACE_DEVS_API}/launch/upcoming?limit=20`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Space Devs API" },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: "No launch data received from API" },
        { status: 502 }
      );
    }

    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("launches");

    // Clear existing documents and insert each item as its own document
    await collection.deleteMany({});

    const documents = data.results.map((item) => ({
      ...item,
      updatedAt: new Date(),
    }));

    await collection.insertMany(documents);

    return NextResponse.json({
      success: true,
      message: `Updated ${data.results.length} launches`,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error refreshing launches:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
