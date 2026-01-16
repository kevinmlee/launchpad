import { NextResponse } from "next/server";
import dayjs from "dayjs";
import clientPromise from "../../../../src/lib/mongodb";

const SPACE_DEVS_API = "https://ll.thespacedevs.com/2.3.0";

export async function POST() {
  try {
    // Fetch upcoming events from Space Devs API
    const now = dayjs().format("YYYY-MM-DD");
    const response = await fetch(
      `${SPACE_DEVS_API}/events/?date__gte=${now}&ordering=date&limit=20&mode=detailed`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Space Devs API" },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Validate response has data
    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: "No event data received from API" },
        { status: 502 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("events");

    // Replace the events document (store as single document with results array)
    await collection.replaceOne(
      {}, // Match any document (we only keep one)
      {
        results: data.results,
        count: data.count,
        updatedAt: new Date(),
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: `Updated ${data.results.length} events`,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error refreshing events:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
