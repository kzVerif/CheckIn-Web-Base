import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
//update zones
export async function PATCH(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.body;
    const response = await prisma.zones;
  } catch (error) {}
}
