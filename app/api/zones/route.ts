import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const data = await prisma.zones.findMany();
    // console.log(data);
    return NextResponse.json(
      {
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "error",
      },
      {
        status: 400,
      }
    );
  }
}
