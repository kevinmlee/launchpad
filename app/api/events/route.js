import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("events");

    const eventsDoc = await collection.findOne({});

    if (!eventsDoc) {
      return NextResponse.json(
        { results: [], message: "No events in database. Run /api/events/refresh first." },
        { status: 200 }
      );
    }

    return NextResponse.json({
      results: eventsDoc.results,
      count: eventsDoc.count,
      updatedAt: eventsDoc.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
