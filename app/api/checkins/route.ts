import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { JsonValue } from "@prisma/client/runtime/library";
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
// {
//   "device_id": "ABC123",
//   "student_id": "65010001",
//   "bluetooth_devices": [
//     "AA:11:BB:22:CC:33",
//     "AA:11:BB:22:CC:35"
//   ],
//   "timestamp": "2025-10-25T09:03:12Z"
// }

//create checkins
// * -------------------- 🔹 Interfaces -------------------- */

// 📍 ตำแหน่งในห้อง
interface CheckinsPosition {
  x: number;
  y: number;
}

// 📡 Beacon แต่ละตัวใน Zone
interface ZoneBeacon {
  mac_address: string;
  x: number;
  y: number;
  label: string;
}

// 🧱 อาคาร/ห้อง
interface ZoneRoom {
  room_number: string;
  floor: number;
  building: {
    name: string;
    code: string;
  };
}

// 📅 ตารางเรียนใน Zone
interface ZoneSchedule {
  day_of_week: number; // 1 = Monday
  start_time: string; // "09:00"
  end_time: string; // "12:00"
  course_code: string;
  semester: string;
}

// 🔸 Zone หลัก (MongoDB document)

interface Zone {
  id: string;
  beacons: ZoneBeacon[];
  polygon: JsonValue; // ✅ ใช้แบบนี้แทน number[][]
  room: ZoneRoom;
  schedules: ZoneSchedule[];
}

// 📥 Request ที่มาจากแอปมือถือ
interface CheckinRequest {
  bluetooth_devices: string[];
  device_id: string;
}

/* -------------------- 🧮 Helper Function -------------------- */

function estimatePosition(
  beacons: ZoneBeacon[],
  detectedMacs: string[]
): CheckinsPosition {
  const detected = beacons.filter((b) => detectedMacs.includes(b.mac_address));
  if (detected.length === 0) return { x: 0, y: 0 };

  const x = detected.reduce((sum, b) => sum + Number(b.x), 0) / detected.length;
  const y = detected.reduce((sum, b) => sum + Number(b.y), 0) / detected.length;

  return { x, y };
}

/* -------------------- 🚀 Main API -------------------- */

export async function POST(req: NextRequest) {
  try {
    const body: CheckinRequest = await req.json();
    const { bluetooth_devices, device_id } = body;
    console.log("check in body: ", body);
    

    // 🧱 ดึง Zone ทั้งหมดจาก DB
    const zones: Zone[] = await prisma.zones.findMany();

    let matchedZone: Zone | null = null;

    // 🔍 ตรวจว่าอยู่โซนไหน (match ≥ 2 beacon)
    for (const zone of zones) {
      const zoneMacs = zone.beacons.map((b) => b.mac_address);
      const intersection = bluetooth_devices.filter((mac) =>
        zoneMacs.includes(mac)
      );

      if (intersection.length >= 2) {
        matchedZone = zone;
        break;
      }
    }

    if (!matchedZone) {
      return NextResponse.json(
        { message: "ไม่พบโซนที่ตรงกับ Beacon รอบตัว" },
        { status: 400 }
      );
    }

    // 🕓 ตรวจสอบเวลาเรียนปัจจุบัน
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    const currentTime = now.toTimeString().slice(0, 5); // "09:30"

    const currentSchedule = matchedZone.schedules.find(
      (s) =>
        s.day_of_week == dayOfWeek &&
        s.start_time <= currentTime &&
        s.end_time >= currentTime
    );

    if (!currentSchedule) {
      return NextResponse.json(
        {
          message: "ยังไม่ถึงเวลาเรียน หรืออยู่นอกคาบเรียน",
          zone: matchedZone.room,
        },
        { status: 400 }
      );
    }

    // 📍 ประมาณตำแหน่งจาก Beacon
    const position = estimatePosition(matchedZone.beacons, bluetooth_devices);

    // 🧾 บันทึกข้อมูลเช็กชื่อ
    const newCheckin = await prisma.checkins.create({
      data: {
        device_id,
        zone_id: matchedZone.id,
        status: "checked_in",
        course_code: currentSchedule.course_code,
        position,
        timestamp: new Date(),
      },
    });

    // ✅ ตอบกลับ
    return NextResponse.json(
      {
        message: "เช็คชื่อสำเร็จ",
        zone: matchedZone.room,
        course: currentSchedule.course_code,
        time: `${currentSchedule.start_time} - ${currentSchedule.end_time}`,
        position,
        checkin_id: newCheckin.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Cannot create checkins:", error);
    return NextResponse.json(
      {
        message: "สร้าง checkins ไม่สำเร็จ",
        reason: error.message,
      },
      { status: 500 }
    );
  }
}
