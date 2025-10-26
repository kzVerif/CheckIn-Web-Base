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

//register device
export async function POST(req: NextRequest) {
  try {
    const body: registerData = await req.json();

    if (body.password !== body.rePassword) {
      return NextResponse.json(
        { message: "รหัสผ่านไม่ตรงกัน" },
        { status: 400 }
      );
    }

    const isUserExist = await prisma.devices.findFirst({
      where: {
        OR: [
          { student_id: body.student_id },
          { email: body.email },
          { id: body.device_id },
        ],
      },
    });

    if (isUserExist) {
      return NextResponse.json(
        { message: "มีผู้ใช้นี้อยู่แล้ว/มีคนใช้อุปกรณ์นี้แล้ว ไม่สามารถสมัครซ้ำได้" },
        { status: 400 }
      );
    }
    
    const realPassword = await bcrypt.hash(body.password, 10);

    const response = await prisma.devices.create({
      data: {
        id: body.device_id,
        student_id: body.student_id,
        password: realPassword,
        email: body.email,
        name: body.name,
      },
    });

    return NextResponse.json(
      { message: "สมัครสมาชิกสำเร็จ", data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Cannot Resigter:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์", reason: error },
      { status: 500 }
    );
  }
}
