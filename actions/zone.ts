"use server"
import axios from "axios";
import { revalidatePath } from "next/cache"
export async function getAllZones() {
  try {
    const zones = await axios.get(`${process.env.MAIN_URL}/api/zones`);
    const zone = zones.data;
    return zone.data;
  } catch (error) {
    console.log("ดึงข้อมูลไม่ได้",error);

    return "ดึงข้อมูลไม่ได้";
  }
}

export async function getZoneById(id: string) {
    try {
    const zones = await axios.get(`${process.env.MAIN_URL}/api/zones/${id}`);
    const zone = zones.data;
    return zone.data;
  } catch (error) {
    console.log("ดึงข้อมูลไม่ได้",error);

    return "ดึงข้อมูลไม่ได้";
  }
}

export async function deleteZone(id: string) {
  try {
    // ✅ เรียก API DELETE ฝั่ง backend
    const res = await fetch(`${process.env.MAIN_URL}/api/zones/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      throw new Error(`Delete failed with status ${res.status}`)
    }

    // ✅ Revalidate หน้า list zones ให้ข้อมูลอัปเดตทันที
    revalidatePath("/zones")

    return { success: true }
  } catch (err) {
    console.error("❌ ลบ Zone ไม่สำเร็จ:", err)
    return { success: false, error: (err as Error).message }
  }
}

export async function updateZone(id: string, formData: any) {
  try {
    // ✅ ประกอบข้อมูลใหม่ตาม schema
    const { room_number, building_name, building_code, floor, beacons, schedules } = formData

    const zoneData = {
      beacons,
      schedules,
      room: {
        building: { code: building_code, name: building_name },
        floor: Number(floor),
        room_number,
      },
    }

    // ✅ เรียก API ฝั่ง backend
    const res = await fetch(`${process.env.MAIN_URL}/api/zones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zoneData),
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`ไม่สามารถอัปเดต Zone ได้ (${res.status})`)
    }

    // ✅ Revalidate หน้า list zones ให้ข้อมูลใหม่ขึ้นทันที
    revalidatePath("/zones")

    return { success: true }
  } catch (err) {
    console.error("❌ Update Zone Error:", err)
    return { success: false, error: (err as Error).message }
  }
}

export async function createZone(formData: any) {
  try {
    const { room_number, building_name, building_code, floor, beacons, schedules } = formData

    const zoneData = {
      beacons,
      schedules,
      room: {
        building: { code: building_code, name: building_name },
        floor: Number(floor),
        room_number,
      },
      polygon: [
        [0, 0],
        [5, 0],
        [5, 5],
        [0, 5],
        [0, 0],
      ], // mock polygon เริ่มต้น
    }

    const res = await fetch(`${process.env.MAIN_URL}/api/zones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(zoneData),
    })

    if (!res.ok) throw new Error("ไม่สามารถเพิ่ม Zone ได้")

    revalidatePath("/zones")

    return { success: true }
  } catch (error) {
    console.error("❌ Create Zone Error:", error)
    return { success: false, error: (error as Error).message }
  }
}