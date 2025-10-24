"use client";

import Link from "next/link";

export default function ZonesPage() {
  const zones = [
    {
      id: "zone_eng_201",
      room: "201",
      building: "อาคารเรียนรวม (SC1 212)",
      beacons: "4 beacons",
      schedule: "2 ตารางเรียน",
    },
    {
      id: "zone_sci_305",
      room: "305",
      building: "วิทยาศาสตร์ (SCI)",
      beacons: "4 beacons",
      schedule: "2 ตารางเรียน",
    },
  ];

  return (
    <div className="container mx-auto min-h-screen pt-24 px-4 sm:px-6 lg:px-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">จัดการ Zones</h1>
          <p className="text-gray-500 text-sm">
            จัดการพื้นที่เรียนและตารางเรียน
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
          + เพิ่ม Zone
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-sm border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">ZONE ID</th>
              <th className="px-6 py-3 font-semibold">ห้อง</th>
              <th className="px-6 py-3 font-semibold">อาคาร</th>
              <th className="px-6 py-3 font-semibold">BEACONS</th>
              <th className="px-6 py-3 font-semibold">ตารางเรียน</th>
              <th className="px-6 py-3 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {zones.map((zone) => (
              <tr key={zone.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{zone.id}</td>
                <td className="px-6 py-3">{zone.room}</td>
                <td className="px-6 py-3">{zone.building}</td>
                <td className="px-6 py-3">{zone.beacons}</td>
                <td className="px-6 py-3">{zone.schedule}</td>
                <td className="px-6 py-3 text-center flex gap-3 justify-center">
                  <button className="text-indigo-600 hover:underline">
                    แก้ไข
                  </button>
                  <button className="text-red-600 hover:underline">
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
