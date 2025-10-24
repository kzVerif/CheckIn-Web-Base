import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

// get all zones
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.zones.findMany();
    return NextResponse.json(
      {
        message: "ดึงข้อมูล zones ทั้งหมดสำเร็จ",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Cannot get all zones: ", error);
    return NextResponse.json(
      {
        message: "ไม่สามารถดึงข้อมูล zones ทั้งหมด ได้",
        reason: error,
      },
      {
        status: 500,
      }
    );
  }
}

//create zones
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const response = await prisma.zones.create({
      data: body,
    });
    return NextResponse.json({
      message: "สร้าง zones สำเร็จ",
      response: response,
    });
  } catch (error) {
    console.log("Cannot create zones: ", error);
    return NextResponse.json({
      message: "สร้าง zones ไม่สำเร็จ",
      reason: error,
    });
  }
}
