import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = await searchParams.get('q');

    if (!query) {
        return NextResponse.json([], { status: 200 })
    }

    const client = await clientPromise;
    const db = client.db("historical_map");
    const mongoQuery: any = {
        ...(query && { $text: { $search: query } }),
    };
    const pins = await db.collection('pins').find(mongoQuery).limit(20).toArray();

    return NextResponse.json(pins, { status: 200 });
}