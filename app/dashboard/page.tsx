"use client";

import { useState } from "react";
import { CheckCircle, Clock, MapPin, Smartphone, Percent } from "lucide-react";
import Avatar from "../components/Avatar";

export default function Dashboard() {
  const [activities] = useState([
    {
      name: "สมชาย ใจดี",
      subject: "คณิตศาสตร์ ห้อง 305",
      status: "ผิดเวลา",
      time: "08:30:00",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      name: "วิชัย เก่งมาก",
      subject: "คณิตศาสตร์ ห้อง 305",
      status: "ออกพื้นที่",
      time: "10:05:00",
      color: "bg-red-100 text-red-700",
    },
    {
      name: "สมหญิง รักเรียน",
      subject: "ศิลปะ ห้อง 201",
      status: "สำเร็จ",
      time: "09:20:15",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "สมชาย ใจดี",
      subject: "ศิลปะ ห้อง 201",
      status: "สำเร็จ",
      time: "09:15:30",
      color: "bg-green-100 text-green-700",
    },
  ]);

  return (
    <div className="container mx-auto min-h-screen pt-24 px-4 sm:px-6 lg:px-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">ภาพรวมระบบจัดการการเข้าเรียน</p>

      {/* การ์ดสรุป */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card
          icon={<MapPin className="text-indigo-600" />}
          title="จำนวน Zones"
          value="2"
        />
        <Card
          icon={<Smartphone className="text-green-600" />}
          title="อุปกรณ์ที่ลงทะเบียน"
          value="3"
        />
        <Card
          icon={<CheckCircle className="text-purple-600" />}
          title="เช็คอินวันนี้"
          value="0"
        />
      </div>

      {/* ตารางกิจกรรมล่าสุด */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
  <h2 className="text-lg font-semibold text-gray-700 px-6 py-4 border-b">
    กิจกรรมล่าสุด
  </h2>
  <div className="divide-y divide-gray-100">
    {activities.map((item, index) => (
      <div
        key={index}
        className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
      >
        {/* ✅ ฝั่ง Avatar + รายละเอียด */}
        <div className="flex items-center gap-3">
          <Avatar name={item.name} />
          <div>
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.subject}</p>
          </div>
        </div>

        {/* ✅ ฝั่งสถานะ + เวลา */}
        <div className="flex items-center gap-3">
          <span
            className={`text-sm px-3 py-1 rounded-full ${item.color}`}
          >
            {item.status}
          </span>
          <span className="text-gray-400 text-sm">{item.time}</span>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

// 🧩 Card Component ย่อย
function Card({ icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="bg-indigo-50 p-3 rounded-xl">{icon}</div>
    </div>
  );
}
