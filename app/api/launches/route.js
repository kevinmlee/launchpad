import { NextResponse } from "next/server";
import clientPromise from "../../../src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("launches");

    const launchesDoc = await collection.findOne({});

    if (!launchesDoc) {
      return NextResponse.json(
        { results: [], message: "No launches in database. Run /api/launches/refresh first." },
        { status: 200 }
      );
    }

    return NextResponse.json({
      results: launchesDoc.results,
      count: launchesDoc.count,
      updatedAt: launchesDoc.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching launches:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
