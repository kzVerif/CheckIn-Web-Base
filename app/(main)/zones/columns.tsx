"use client";

import { deleteZone } from "@/actions/zone";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type zones = {
  id: string;
  beacons: ZonesBeacons[];
  polygon: Object;
  room: ZonesRoom;
  schedules: ZonesSchedules[];
};
export type ZonesBeacons = {
  label: string;
  mac_address: string;
  x: number;
  y: number;
};

export type ZonesRoom = {
  building: ZonesRoomBuilding;
  floor: number;
  room_number: string;
};
export type ZonesSchedules = {
  course_code: string;
  day_of_week: number;
  end_time: string;
  semester: string;
  start_time: string;
};

type ZonesRoomBuilding = {
  code: string;
  name: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<zones>[] = [
  {
    accessorKey: "id",
    header: "Zone ID",
  },
  {
    accessorKey: "room.room_number",
    header: "ห้อง",
    cell: ({ row }) => row.original.room.room_number || "-",
  },
  {
    accessorKey: "room.building.name",
    header: "อาคาร",
    cell: ({ row }) => row.original.room.building.name || "-",
  },
  {
    accessorKey: "room.floor",
    header: "ชั้น",
    cell: ({ row }) => `ชั้น ${row.original.room.floor}`,
  },
  {
    id: "beacon_count",
    header: "จำนวน Beacons",
    cell: ({ row }) => row.original.beacons.length,
  },
  {
    id: "schedule_info",
    header: "วิชา / เวลาเรียน",
    cell: ({ row }) => (
      <div className="space-y-1">
        {row.original.schedules.map((s, i) => (
          <div key={i}>
            <span className="font-medium">{s.course_code}</span>{" "}
            <span className="text-gray-500 text-sm">
              ({s.start_time} - {s.end_time})
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const zone = row.original;

      const handleDelete = async () => {
        if (confirm(`คุณต้องการลบ Zone ${zone.id} หรือไม่?`)) {
          toast.promise(deleteZone(zone.id), {
            loading: "กำลังลบข้อมูล...",
            success: "ลบสำเร็จ!",
            error: "เกิดข้อผิดพลาดในการลบ",
          });
        }
      };

      return (
        <div className="flex gap-2">
          <Link href={`/zones/${zone.id}`}>
            <button
              //   onClick={handleEdit}
              className="px-2 py-1 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium"
            >
              แก้ไข
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
          >
            ลบ
          </button>
        </div>
      );
    },
  },
];
