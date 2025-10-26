import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const checkinCount = await prisma.checkins.count({
      where: {
        timestamp: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const zoneCount = await prisma.zones.count();
    const deviceCount = await prisma.devices.count();

    const recentCheckins = await prisma.checkins.findMany({
      take: 5,
    });

    return NextResponse.json(
      {
        message: "ดึงข้อมูลแดชบอร์ดสำเร็จ",
        count: {
          checkin_count: checkinCount,
          zone_count: zoneCount,
          device_count: deviceCount,
        },
        recentCheckins: recentCheckins,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Cannot get checkins cout: ", error);
    return NextResponse.json(
      {
        message: "ดึงข้อมูลแดชบอร์ดไม่สำเร็จ",
        reason: error,
      },
      {
        status: 500,
      }
    );
  }
}
