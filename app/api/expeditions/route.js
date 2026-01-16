import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("expeditions");

    const expeditionsDoc = await collection.findOne({});

    if (!expeditionsDoc) {
      return NextResponse.json(
        { results: [], message: "No expeditions in database. Run /api/expeditions/refresh first." },
        { status: 200 }
      );
    }

    return NextResponse.json({
      results: expeditionsDoc.results,
      count: expeditionsDoc.count,
      updatedAt: expeditionsDoc.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching expeditions:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
