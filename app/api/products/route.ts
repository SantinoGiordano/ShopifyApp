// /app/api/products/route.ts
import { connectToDatabase } from "@/lib/connectToMongo";
import { NextResponse } from "next/server";


export async function GET() {
  const { db } = await connectToDatabase();
  const products = await db.collection("meditationMusic").find().toArray();
  return NextResponse.json(products);
}
