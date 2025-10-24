"use client";

export default function DevicesPage() {
  const devices = [
    {
      id: "a1b2c3d4...",
      studentId: "6512345678",
      name: "สมชาย ใจดี",
      date: "15/1/2568",
    },
    {
      id: "b2c3d4e5...",
      studentId: "6512345679",
      name: "สมหญิง รักเรียน",
      date: "16/1/2568",
    },
    {
      id: "c3d4e5f6...",
      studentId: "6512345680",
      name: "วิชัย เก่งมาก",
      date: "17/1/2568",
    },
  ];

  return (
    <div className="container mx-auto min-h-screen pt-24 px-4 sm:px-6 lg:px-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 m-1">จัดการอุปกรณ์</h1>
          <p className="text-gray-500 text-sm">
            จัดการอุปกรณ์ของนักเรียน
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
          + เพิ่มอุปกรณ์
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-sm border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">DEVICE ID</th>
              <th className="px-6 py-3 font-semibold">รหัสนักเรียน</th>
              <th className="px-6 py-3 font-semibold">ชื่อ-นามสกุล</th>
              <th className="px-6 py-3 font-semibold">วันที่ลงทะเบียน</th>
              <th className="px-6 py-3 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {devices.map((d, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{d.id}</td>
                <td className="px-6 py-3">{d.studentId}</td>
                <td className="px-6 py-3">{d.name}</td>
                <td className="px-6 py-3">{d.date}</td>
                <td className="px-6 py-3 text-center flex justify-center gap-3">
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
