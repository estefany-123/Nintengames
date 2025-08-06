import { NextResponse } from "next/server";
import swaggerDocument from "../../../../swagger/swagger.json";

export async function GET() {
  return NextResponse.json(swaggerDocument);
}