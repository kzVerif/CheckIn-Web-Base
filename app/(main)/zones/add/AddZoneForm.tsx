"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createZone } from "@/actions/zone";
import Link from "next/link";

export default function AddZoneForm() {
  const [form, setForm] = useState({
    room_number: "",
    building_name: "",
    building_code: "",
    floor: "",
    beacons: [{ label: "", mac_address: "", x: 0, y: 0 }],
    schedules: [
      {
        course_code: "",
        day_of_week: 1,
        start_time: "",
        end_time: "",
        semester: "",
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBeaconChange = (
    index: number,
    field: string,
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
    field: string,
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
    toast.promise(createZone(form), {
      loading: "กำลังเพิ่ม Zone...",
      success: "เพิ่ม Zone สำเร็จ!",
      error: "เกิดข้อผิดพลาดในการเพิ่ม Zone",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">เพิ่ม Zone ใหม่</h1>

      {/* 🏠 ข้อมูล Zone */}
      <div className="grid grid-cols-2 gap-4">
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
        <Button type="submit">บันทึก Zone ใหม่</Button>
      </div>
    </form>
  );
}
