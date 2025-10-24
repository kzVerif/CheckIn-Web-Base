import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

interface registerData {
  device_id: string;
  student_id: string;
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

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
