"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zones, ZonesBeacons, ZonesSchedules } from "../columns";
import { toast } from "sonner";
import Link from "next/link";
import { updateZone } from "@/actions/zone";

export default function EditZoneForm({ initialData }: { initialData: zones }) {
  if (!initialData) {
    return (
      <div className="text-center text-gray-600 py-10">
        ⏳ กำลังโหลดข้อมูล Zone...
      </div>
    );
  }

  // ✅ ป้องกัน undefined ทุก field
  const [form, setForm] = useState({
    id: initialData?.id ?? "",
    room_number: initialData?.room?.room_number ?? "",
    building_name: initialData?.room?.building?.name ?? "",
    building_code: initialData?.room?.building?.code ?? "",
    floor: initialData?.room?.floor?.toString() ?? "",
    beacons: initialData?.beacons ?? [],
    schedules: initialData?.schedules ?? [],
  });

  // --- 🧩 Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBeaconChange = (
    index: number,
    field: keyof ZonesBeacons,
    value: string | number
  ) => {
    const updated = [...form.beacons];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, beacons: updated });
  };

  const handleAddBeacon = () => {
    setForm({
      ...form,
      beacons: [...form.beacons, { label: "", mac_address: "", x: 0, y: 0 }],
    });
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ZonesSchedules,
    value: string | number
  ) => {
    const updated = [...form.schedules];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, schedules: updated });
  };

  const handleAddSchedule = () => {
    setForm({
      ...form,
      schedules: [
        ...form.schedules,
        {
          course_code: "",
          day_of_week: 1,
          start_time: "",
          end_time: "",
          semester: "",
        },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id } = form;

    // ✅ toast แบบ promise แจ้งสถานะ
    toast.promise(updateZone(id, form), {
      loading: "กำลังบันทึกข้อมูล...",
      success: "บันทึกสำเร็จ!",
      error: "เกิดข้อผิดพลาดในการบันทึก",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      {/* 🏠 ข้อมูล Zone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Zone ID</label>
          <Input
            name="id"
            value={form.id}
            disabled
            className="bg-gray-100 mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">หมายเลขห้อง</label>
          <Input
            name="room_number"
            value={form.room_number}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">ชั้น</label>
          <Input
            name="floor"
            value={form.floor}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">ชื่ออาคาร</label>
          <Input
            name="building_name"
            value={form.building_name}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">รหัสอาคาร</label>
          <Input
            name="building_code"
            value={form.building_code}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      {/* 📡 Beacons */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">Beacons</h2>
        {form.beacons.map((b, i) => (
          <div key={i} className="grid grid-cols-4 gap-3 mb-2">
            <Input
              placeholder="MAC Address"
              value={b.mac_address}
              onChange={(e) =>
                handleBeaconChange(i, "mac_address", e.target.value)
              }
            />
            <Input
              placeholder="X"
              type="number"
              value={b.x}
              onChange={(e) =>
                handleBeaconChange(i, "x", Number(e.target.value))
              }
            />
            <Input
              placeholder="Y"
              type="number"
              value={b.y}
              onChange={(e) =>
                handleBeaconChange(i, "y", Number(e.target.value))
              }
            />
            <Input
              placeholder="Label"
              value={b.label}
              onChange={(e) => handleBeaconChange(i, "label", e.target.value)}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="link"
          onClick={handleAddBeacon}
          className="text-blue-600 mt-1"
        >
          + เพิ่ม Beacon
        </Button>
      </div>

      {/* 📅 ตารางเรียน */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-3">ตารางเรียน</h2>
        {form.schedules.map((s, i) => (
          <div key={i} className="grid grid-cols-5 gap-3 mb-2">
            <Input
              placeholder="วัน (1=จันทร์)"
              type="number"
              value={s.day_of_week}
              onChange={(e) =>
                handleScheduleChange(i, "day_of_week", Number(e.target.value))
              }
            />
            <Input
              placeholder="เวลาเริ่ม"
              value={s.start_time}
              onChange={(e) =>
                handleScheduleChange(i, "start_time", e.target.value)
              }
            />
            <Input
              placeholder="เวลาสิ้นสุด"
              value={s.end_time}
              onChange={(e) =>
                handleScheduleChange(i, "end_time", e.target.value)
              }
            />
            <Input
              placeholder="รหัสวิชา"
              value={s.course_code}
              onChange={(e) =>
                handleScheduleChange(i, "course_code", e.target.value)
              }
            />
            <Input
              placeholder="ภาคเรียน"
              value={s.semester}
              onChange={(e) =>
                handleScheduleChange(i, "semester", e.target.value)
              }
            />
          </div>
        ))}
        <Button
          type="button"
          variant="link"
          onClick={handleAddSchedule}
          className="text-blue-600 mt-1"
        >
          + เพิ่มตารางเรียน
        </Button>
      </div>

      {/* 🔘 ปุ่ม */}
      <div className="flex justify-end gap-3 pt-4">
        <Link href={"/zones"}>
          <Button type="button" variant="outline">
            ย้อนกลับ
          </Button>
        </Link>
        <Button type="submit">บันทึก</Button>
      </div>
    </form>
  );
}
