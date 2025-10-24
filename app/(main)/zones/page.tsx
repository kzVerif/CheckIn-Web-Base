"use client";

import { useState } from "react";

export default function ZonesPage() {
  const [zones, setZones] = useState([
    {
      id: "zone_eng_201",
      room: "201",
      building: "ตึกวิศวกรรม (ENG)",
      beacons: "4 beacons",
      schedule: "2 ตารางเรียน",
    },
    {
      id: "zone_sci_305",
      room: "305",
      building: "ตึกวิทยาศาสตร์ (SCI)",
      beacons: "4 beacons",
      schedule: "2 ตารางเรียน",
    },
  ]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedZone, setSelectedZone] = useState<any>(null);

  const [form, setForm] = useState({
    id: "",
    room: "",
    building: "",
    beacons: "0 beacons",
    schedule: "0 ตารางเรียน",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
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
    "pointer-events-auto bg-white p-8 rounded-2xl w-[480px] text-center border border-gray-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.2)] animate-popup";

  // ✅ Add
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setZones([...zones, form]);
    setOpenAdd(false);
    showToast("เพิ่ม Zone สำเร็จ!", "success");
    setForm({
      id: "",
      room: "",
      building: "",
      beacons: "0 beacons",
      schedule: "0 ตารางเรียน",
    });
  };

  // ✅ Edit
  const handleEdit = (zone: any) => {
    setSelectedZone(zone);
    setForm(zone);
    setOpenEdit(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setZones(zones.map((z) => (z.id === selectedZone.id ? form : z)));
    setOpenEdit(false);
    showToast("แก้ไข Zone สำเร็จ!", "success");
  };

  // ✅ Delete
  const handleDelete = (zone: any) => {
    setSelectedZone(zone);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setZones(zones.filter((z) => z.id !== selectedZone?.id));
    setOpenDelete(false);
    showToast("ลบ Zone สำเร็จ!", "error");
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 m-1">จัดการ Zones</h1>
          <p className="text-gray-500 text-sm">
            จัดการพื้นที่เรียนและตารางเรียน
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
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
            {zones.map((zone, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{zone.id}</td>
                <td className="px-6 py-3">{zone.room}</td>
                <td className="px-6 py-3">{zone.building}</td>
                <td className="px-6 py-3">{zone.beacons}</td>
                <td className="px-6 py-3">{zone.schedule}</td>

                <td className="px-6 py-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(zone)}
                    className="text-indigo-600 hover:underline"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(zone)}
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

      {/* ✅ Modal Add */}
      {openAdd && (
        <div className={modalStyle}>
          <div className={boxStyle}>
            <h2 className="text-xl font-bold mb-6">เพิ่ม Zone ใหม่</h2>

            <form className="space-y-4 text-left" onSubmit={handleAdd}>
              <input
                type="text"
                required
                placeholder="ZONE ID"
                className="w-full border rounded-xl px-4 py-2"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              />
              <input
                type="text"
                required
                placeholder="ห้อง"
                className="w-full border rounded-xl px-4 py-2"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
              />
              <input
                type="text"
                required
                placeholder="อาคาร"
                className="w-full border rounded-xl px-4 py-2"
                value={form.building}
                onChange={(e) => setForm({ ...form, building: e.target.value })}
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

      {/* ✅ Modal Edit */}
      {openEdit && (
        <div className={modalStyle}>
          <div className={boxStyle}>
            <h2 className="text-xl font-bold mb-6">แก้ไข Zone</h2>

            <form className="space-y-4 text-left" onSubmit={handleEditSubmit}>
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
              />
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-2"
                value={form.building}
                onChange={(e) => setForm({ ...form, building: e.target.value })}
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

      {/* ✅ Modal Delete */}
      {openDelete && (
        <div className={modalStyle}>
          <div className={boxStyle}>
            <h2 className="text-xl font-bold mb-6 text-red-600">
              ต้องการลบ Zone นี้หรือไม่?
            </h2>

            <p className="text-gray-600 mb-6 font-medium">{selectedZone?.id}</p>

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

      {/* ✅ Toast Bottom Right */}
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

          <div
            className="
      h-1 w-full rounded-full overflow-hidden bg-gray-200
    "
          >
            <div
              className={`
          h-full rounded-full
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
          animate-progress
        `}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
