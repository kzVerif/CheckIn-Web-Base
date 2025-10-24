import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

//update zones
export async function PATCH(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const zoneId = await params.id;
    const response = await prisma.zones.update({
      where: {
        id: zoneId,
      },
      data: body,
    });
    return NextResponse.json(
      {
        message: "อัพเดท zones สำเร็จ",
        response: response,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Cannot update zones: ", error);
    return NextResponse.json({
      message: "ไม่สามารถอัพเดท zones ได้",
      reason: error,
    });
  }
}

//delete zones
export async function DELETE(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  try {
    const zoneId = await params.id;
    const response = await prisma.zones.delete({
      where: {
        id: zoneId,
      },
    });
    return NextResponse.json({
      message: "ลบข้อมูล zones สำเร็จ",
      response: response,
    });
  } catch (error) {
    console.log("Cannot delete zones: ", error);
    return NextResponse.json({
      message: "ไม่สามารถลบข้อมูล zones ได้",
      reason: error,
    });
  }
}
