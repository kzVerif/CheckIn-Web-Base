import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"; 
const prisma = new PrismaClient();

// get all checkins
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.checkins.findMany();
    return NextResponse.json(
        {
            message: "ดึงข้อมูล checkins ทั้งหมดสำเร็จ",
            data: data,
        },
        {       
            status: 200,
        }
    );
    } catch (error) {
    console.log("Cannot get all checkins: ", error);
    return NextResponse.json(
        {
            message: "ไม่สามารถดึงข้อมูล checkins ทั้งหมด ได้",
            reason: error,
        },
        {
            status: 500,
        }
    );
 }
}

//create checkins

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const response = await prisma.checkins.create({
      data: body,
    });
    return NextResponse.json({
        message: "สร้าง checkins สำเร็จ",
        response: response,
    });
  } catch (error) {
    console.log("Cannot create checkins: ", error);
    return NextResponse.json({
        message: "สร้าง checkins ไม่สำเร็จ",
        reason: error,
    });
  }
}
