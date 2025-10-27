"use client";

import { useMemo, useState } from "react";

type Device = {
  deviceId: string;     // คีย์หลัก
  studentId: string;    // รหัสนักเรียน
  fullName: string;     // ชื่อ-นามสกุล
  registered: string;   // ISO date: "2025-01-15"
};

export default function DevicesPage() {
  // ✅ ตัวอย่างข้อมูลให้เหมือนภาพ
  const [devices, setDevices] = useState<Device[]>([
    {
      deviceId: "a1b2c3d4e5f6a7b8c9d0",
      studentId: "6512345678",
      fullName: "สมชาย ใจดี",
      registered: "2025-01-15",
    },
    {
      deviceId: "b2c3d4e5f6a7b8c9d0e1",
      studentId: "6512345679",
      fullName: "สมหญิง รักเรียน",
      registered: "2025-01-16",
    },
    {
      deviceId: "c3d4e5f6a7b8c9d0e1f2",
      studentId: "6512345680",
      fullName: "วิชัย เก่งมาก",
      registered: "2025-01-17",
    },
  ]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const emptyForm: Device = useMemo(
    () => ({ deviceId: "", studentId: "", fullName: "", registered: "" }),
    []
  );
  const [form, setForm] = useState<Device>(emptyForm);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2500);
  };

  const modalStyle =
    "fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm bg-white/20 pointer-events-none";

  const boxStyle =
    "pointer-events-auto bg-white p-8 rounded-2xl w-[560px] text-center border border-gray-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.2)] animate-popup";

  // -------- utils --------
  const truncateId = (id: string, keep = 8) =>
    id.length > keep ? `${id.slice(0, keep)}...` : id;

  const formatDateTH = (iso: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    // ให้ปีเป็น พ.ศ. และรูปแบบ d/M/YYYY
    return d.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  // -------- Add --------
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    // กันซ้ำ deviceId
    if (devices.some((d) => d.deviceId === form.deviceId)) {
      showToast("DEVICE ID นี้ถูกใช้แล้ว", "error");
      return;
    }

    setDevices((prev) => [...prev, form]);
    setOpenAdd(false);
    showToast("เพิ่มอุปกรณ์สำเร็จ!", "success");
    setForm(emptyForm);
  };

  // -------- Edit --------
  const handleOpenEdit = (device: Device) => {
    setSelectedDevice(device);
    setForm(device);
    setOpenEdit(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice) return;

    setDevices((prev) =>
      prev.map((d) => (d.deviceId === selectedDevice.deviceId ? form : d))
    );
    setOpenEdit(false);
    showToast("แก้ไขข้อมูลสำเร็จ!", "success");
  };

  // -------- Delete --------
  const handleOpenDelete = (device: Device) => {
    setSelectedDevice(device);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    if (!selectedDevice) return;
    setDevices((prev) => prev.filter((d) => d.deviceId !== selectedDevice.deviceId));
    setOpenDelete(false);
    showToast("ลบข้อมูลสำเร็จ!", "error");
  };

  return (
    <div className="container mx-auto min-h-screen py-24 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Devices</h1>
          <p className="text-gray-500 mb-8">จัดการอุปกรณ์ของนักเรียน</p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setOpenAdd(true);
          }}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          + เพิ่มอุปกรณ์
        </button>
      </div>

      {/* Table */}
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
            {devices.map((device) => (
              <tr key={device.deviceId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3" title={device.deviceId}>
                  {truncateId(device.deviceId)}
                </td>
                <td className="px-6 py-3">{device.studentId}</td>
                <td className="px-6 py-3">{device.fullName}</td>
                <td className="px-6 py-3">{formatDateTH(device.registered)}</td>

                <td className="px-6 py-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleOpenEdit(device)}
                    className="text-indigo-600 hover:underline"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleOpenDelete(device)}
                    className="text-red-600 hover:underline"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add */}
      {openAdd && (
        <div className={modalStyle}>
          <div className={boxStyle}>
            <h2 className="text-xl font-bold mb-6">เพิ่มอุปกรณ์ใหม่</h2>

            <form className="space-y-4 text-left" onSubmit={handleAdd}>
              <input
                type="text"
                required
                placeholder="DEVICE ID"
                className="w-full border rounded-xl px-4 py-2"
                value={form.deviceId}
                onChange={(e) => setForm({ ...form, deviceId: e.target.value.trim() })}
              />
              <input
                type="text"
                required
                placeholder="รหัสนักเรียน"
                className="w-full border rounded-xl px-4 py-2"
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value.trim() })}
              />
              <input
                type="text"
                required
                placeholder="ชื่อ-นามสกุล"
                className="w-full border rounded-xl px-4 py-2"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />

              <label className="text-sm text-gray-600 block">วันที่ลงทะเบียน</label>
              <input
                type="date"
                required
                className="w-full border rounded-xl px-4 py-2"
                value={form.registered}
                onChange={(e) => setForm({ ...form, registered: e.target.value })}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenAdd(false)}
                  className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {openEdit && (
        <div className={modalStyle}>
          <div className={boxStyle}>
            <h2 className="text-xl font-bold mb-6">แก้ไขอุปกรณ์</h2>

            <form className="space-y-4 text-left" onSubmit={handleEditSubmit}>
              {/* deviceId ไม่ให้แก้เพื่อความปลอดภัย */}
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2 bg-gray-100"
                value={form.deviceId}
                disabled
              />
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2"
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value.trim() })}
              />
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <input
                type="date"
                className="w-full border rounded-xl px-4 py-2"
                value={form.registered}
                onChange={(e) => setForm({ ...form, registered: e.target.value })}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {openDelete && (
        <div className={modalStyle}>
          <div className={boxStyle}>
            <h2 className="text-xl font-bold mb-6 text-red-600">
              ต้องการลบอุปกรณ์นี้หรือไม่?
            </h2>

            <p className="text-gray-600 mb-6 font-medium">
              {selectedDevice?.deviceId}
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                ลบข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div
          className={`
            fixed bottom-6 right-6 z-[99999]
            px-6 py-4 min-w-[260px]
            rounded-xl shadow-2xl font-semibold
            flex flex-col gap-2
            bg-white text-gray-800
            border border-gray-300
            animate-fade-slide
          `}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {toast.type === "success" ? "✅" : "❌"}
            </span>
            <span>{toast.message}</span>
          </div>

          <div className="h-1 w-full rounded-full overflow-hidden bg-gray-200">
            <div
              className={`
                h-full rounded-full
                ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
                animate-progress
              `}
            />
          </div>
        </div>
      )}
    </div>
  );
}