import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();



//get all device
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.devices.findMany();
    return NextResponse.json(
      {
        message: "ดึงข้อมูล device ทั้งหมดสำเร็จ",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Cannot get all  devices:", error);
    return NextResponse.json(
      {
        message: " ไม่สามารถดึงข้อมูล device ทั้งหมดได้ ",
        reason: error,
      },
      {
        status: 500,
      }
    );
  }
}
