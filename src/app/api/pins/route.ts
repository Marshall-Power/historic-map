import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    const db = client.db("historical_map"); // or db('your-db-name')
    const pins = await db.collection('pins').find().toArray();
  
    return NextResponse.json(pins);
  }

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const {
            latitude,
            longitude,
            street,
            imageUrl,
            publicId,
            altText,
            yearTaken,
            description,
            tags,
        } = data;

        const client = await clientPromise;
        const db = client.db("historical_map");
        const pins = db.collection("pins");

        const result = await pins.insertOne({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            street,
            imageUrl,
            publicId,
            altText,
            yearTaken: yearTaken ? parseInt(yearTaken) : undefined,
            description,
            tags,
            createdAt: new Date(),
        });

        return NextResponse.json({ insertedId: result.insertedId });
    } catch (err) {
        console.error("DB error:", err);
        return NextResponse.json({ error: "DB insert failed" }, { status: 500 })
    }
}