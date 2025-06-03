import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
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

    return NextResponse.json({insertedId: result.insertedId });
}