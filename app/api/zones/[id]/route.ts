import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

//update zones
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const {id} = await params;
    const response = await prisma.zones.update({
      where: {
        id: id,
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
    },{
        status: 500
    });
  }
}

//delete zones
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const response = await prisma.zones.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      message: "ลบข้อมูล zones สำเร็จ",
      response: response,
    },{
        status: 200
    });
  } catch (error) {
    console.log("Cannot delete zones: ", error);
    return NextResponse.json({
      message: "ไม่สามารถลบข้อมูล zones ได้",
      reason: error,
    },{
        status: 500
    });
  }
}

//get by Id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const data = await prisma.zones.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      message: "ดึงข้อมูลด้วย zonesID สำเร็จ",
      data: data,
    },{
        status: 200
    });
  } catch (error) {
    console.log("Cannnot get zones by ID: ", error);
    return NextResponse.json({
      message: "ไม่สามารถดึงข้อมูลด้วย zoneID ได้",
      reason: error,
    },{
        status: 500
    });
  }
}
