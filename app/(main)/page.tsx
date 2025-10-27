import { CheckCircle, MapPin, Smartphone } from "lucide-react";
import Avatar from "../components/Avatar";
import { getDashBoardData } from "@/actions/dashboard";

export interface DashboardResponse {
  message: string;
  count: DashboardCount;
  recentCheckins: Checkin[];
}

export interface DashboardCount {
  checkin_count: number;
  zone_count: number;
  device_count: number;
}

export interface Checkin {
  id: string;
  course_code: string;
  device_id: string;
  status: string;
  timestamp: Date;
  zone_id: string;
  position: CheckinPosition;
  device: Device | null; // ✅ แก้ตรงนี้
}

export interface CheckinPosition {
  x: number;
  y: number;
}

export interface Device {
  id: string;
  email: string;
  name: string;
  password: string;
  registered_at: Date; // ถ้าอยากให้เป็น Date ก็เปลี่ยนได้
  student_id: string;
}

export default async function Dashboard() {
  const dashboard: DashboardResponse = await getDashBoardData();

  return (
    <div className="container mx-auto min-h-screen pt-24 px-4 sm:px-6 lg:px-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-8">ภาพรวมระบบจัดการการเข้าเรียน</p>

      {/* การ์ดสรุป */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card
          icon={<MapPin className="text-indigo-600" />}
          title="จำนวน Zones"
          value={dashboard.count.zone_count}
        />
        <Card
          icon={<Smartphone className="text-green-600" />}
          title="อุปกรณ์ที่ลงทะเบียน"
          value={dashboard.count.device_count}
        />
        <Card
          icon={<CheckCircle className="text-purple-600" />}
          title="เช็คอินวันนี้"
          value={dashboard.count.checkin_count}
        />
      </div>

      {/* ตารางกิจกรรมล่าสุด */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 px-6 py-4 border-b">
          กิจกรรมล่าสุด
        </h2>
        <div className="divide-y divide-gray-100">
          {dashboard.recentCheckins.map((item, index) => {
            const formattedTime = new Date(item.timestamp).toLocaleString(
              "th-TH",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            const statusColor =
              item.status === "checked_in"
                ? "bg-green-100 text-green-600"
                : item.status === "late"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-600";

            return (
              <div
                key={index}
                className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition"
              >
                {/* ✅ ฝั่ง Avatar + รายละเอียด */}
                <div className="flex items-center gap-3">
                  <Avatar name={item.device?.name ?? "ไม่ทราบชื่อ"} />
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.device?.name ?? "ไม่ทราบชื่อ"}
                    </p>
                    <p className="text-sm text-gray-500">
                      รหัสวิชา: {item.course_code}
                    </p>
                  </div>
                </div>

                {/* ✅ ฝั่งสถานะ + เวลา */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${statusColor}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-gray-400 text-sm">{formattedTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 🧩 Card Component ย่อย
function Card({
  icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: number;
}) {
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
