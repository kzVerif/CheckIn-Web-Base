"use client";

import { useState, useMemo } from "react";

export default function HistoryPage() {
  const [filters, setFilters] = useState({
    date: "",
    zone: "ทั้งหมด",
    status: "ทั้งหมด",
  });

  const records = [
    {
      date: "2025-01-20 09:15:30",
      displayDate: "20/1/2568 09:15:30",
      name: "สมชาย ใจดี",
      studentId: "6512345678",
      zone: "ENG201",
      zoneText: "ตึกวิศวกรรม ห้อง 201",
      subject: "ENG101",
      position: "(2.5, 3.1)",
      status: "สำเร็จ",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      date: "2025-01-20 09:20:15",
      displayDate: "20/1/2568 09:20:15",
      name: "สมหญิง รักเรียน",
      studentId: "6512345679",
      zone: "ENG201",
      zoneText: "ตึกวิศวกรรม ห้อง 201",
      subject: "ENG101",
      position: "(1.8, 2.5)",
      status: "สำเร็จ",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      date: "2025-01-21 10:05:00",
      displayDate: "21/1/2568 10:05:00",
      name: "วิชัย เก่งมาก",
      studentId: "6512345680",
      zone: "SCI305",
      zoneText: "ตึกวิทยาศาสตร์ ห้อง 305",
      subject: "SCI201",
      position: "(3.2, 1.9)",
      status: "นอกพื้นที่",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      date: "2025-01-21 08:30:00",
      displayDate: "21/1/2568 08:30:00",
      name: "สมชาย ใจดี",
      studentId: "6512345678",
      zone: "SCI305",
      zoneText: "ตึกวิทยาศาสตร์ ห้อง 305",
      subject: "SCI201",
      position: "(2.1, 1.5)",
      status: "ผิดเวลา",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
  ];

  // ✅ Filter Logic
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const matchDate = filters.date
        ? item.date.startsWith(filters.date)
        : true;

      const matchZone =
        filters.zone === "ทั้งหมด" || item.zone === filters.zone;

      const matchStatus =
        filters.status === "ทั้งหมด" || item.status === filters.status;

      return matchDate && matchZone && matchStatus;
    });
  }, [filters]);

  // ✅ Export CSV ตาม Filter
  const handleExportCSV = () => {
    const header = [
      "วันที่/เวลา",
      "นักเรียน",
      "รหัสนักเรียน",
      "ZONE",
      "วิชา",
      "ตำแหน่ง",
      "สถานะ",
    ];

    const rows = filteredRecords.map((item) => [
      item.displayDate,
      item.name,
      item.studentId,
      item.zoneText,
      item.subject,
      item.position,
      item.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "checkin-history.csv";
    link.click();
  };

  return (
    <div className="container mx-auto min-h-screen py-24 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">History</h1>
          <p className="text-gray-500 mb-8">ประวัติการเข้าเรียนของนักเรียน</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Search Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-2"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />

          <select
            className="border border-gray-300 rounded-xl px-4 py-2"
            value={filters.zone}
            onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
          >
            <option>ทั้งหมด</option>
            <option>ENG201</option>
            <option>SCI305</option>
          </select>

          <select
            className="border border-gray-300 rounded-xl px-4 py-2"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option>ทั้งหมด</option>
            <option>สำเร็จ</option>
            <option>ผิดเวลา</option>
            <option>นอกพื้นที่</option>
          </select>

          <button className="bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">
            ค้นหา
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-sm border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">วันที่/เวลา</th>
              <th className="px-6 py-3 font-semibold">นักเรียน</th>
              <th className="px-6 py-3 font-semibold">ZONE</th>
              <th className="px-6 py-3 font-semibold">วิชา</th>
              <th className="px-6 py-3 font-semibold">ตำแหน่ง</th>
              <th className="px-6 py-3 font-semibold text-center">สถานะ</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredRecords.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{item.displayDate}</td>
                <td className="px-6 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 text-xs">{item.studentId}</span>
                  </div>
                </td>
                <td className="px-6 py-3">{item.zoneText}</td>
                <td className="px-6 py-3">{item.subject}</td>
                <td className="px-6 py-3">{item.position}</td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
