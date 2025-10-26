import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LoginData {
  student_id: string;
  password: string;
  device_id: string
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginData = await req.json();
    // console.log("body: ", body);
    

    // 🔍 1. หาผู้ใช้จากฐานข้อมูลด้วย student_id
    const user = await prisma.devices.findUnique({
      where: { student_id: body.student_id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "ไม่พบนักศึกษานี้ในระบบ" },
        { status: 404 }
      );
    }

    // 🔑 2. ตรวจสอบรหัสผ่านด้วย bcrypt.compare
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }
    
    if (user.id != body.device_id) {
      return NextResponse.json(
        { message: "กรุณาเข้าสู่ระบบด้วยอุปกรณ์ที่ถูกต้อง" },
        { status: 401 }
      );
    }

    // 🟢 3. ถ้ารหัสถูก ส่งข้อมูลกลับ (เช่น token หรือ user data)
    return NextResponse.json(
      {
        message: "เข้าสู่ระบบสำเร็จ",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          student_id: user.student_id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Login Error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}

// export async function OPTIONS() {
//   const res = new NextResponse(null, { status: 204 });
//   res.headers.set("Access-Control-Allow-Origin", "*");
//   res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   return res;
// }