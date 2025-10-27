import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const zones = await prisma.zones.findMany({
      include: {
        beacons: true,       // ✅ ดึง Beacon ทั้งหมดของแต่ละ Zone
        schedules: true,     // ✅ ดึง Schedule ของ Zone นั้น
        Checkins: {
          include: {
            device: true,    // ✅ ในแต่ละ Checkin ดึงข้อมูล Device ที่เช็คชื่อด้วย
          },
        },
      },
    });

    const devices = await prisma.devices.findMany({
      include: {
        checkins: {
          include: {
            zone: true,      // ✅ ให้ checkin ของ device แต่ละตัว ดึง zone มาด้วย
          },
        },
      },
    });

    return NextResponse.json({ zones, devices });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดขณะดึงข้อมูล" },
      { status: 500 }
    );
  }
}
