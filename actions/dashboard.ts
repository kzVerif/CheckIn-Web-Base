import { PrismaClient } from "@prisma/client";
import axios from "axios";
const BASE_URL = process.env.MAIN_URL ?? "http://localhost:3000";
const prisma = new PrismaClient();
export async function getDashBoardData() {
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
      include: {
        device: true,
      },
    });

    return {
      message: "ดึงข้อมูลแดชบอร์ดสำเร็จ",
      count: {
        checkin_count: checkinCount,
        zone_count: zoneCount,
        device_count: deviceCount,
      },
      recentCheckins: recentCheckins,
    };
  } catch (error) {
    console.log("Cannot get checkins cout: ", error);
    return {
      message: "ดึงข้อมูลแดชบอร์ดไม่สำเร็จ",
      reason: error,
    };
    // try {
    //   const dashboardResponse = await axios.get(
    //     `${BASE_URL}/api/dashboard`
    //   );
    //   const data = dashboardResponse.data;
    //   return data;
    // } catch (error) {
    //   console.log("ดึงข้อมูลไม่ได้");

    //   return "ดึงข้อมูลไม่ได้";
    // }
  }
}
