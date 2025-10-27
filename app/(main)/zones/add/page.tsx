import AddZoneForm from "./AddZoneForm";

export default function AddZonePage() {
  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            เพิ่ม Zone ใหม่
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            กรอกข้อมูลห้อง อาคาร และ Beacon เพื่อสร้าง Zone ใหม่ในระบบ
          </p>
        </div>

        <AddZoneForm />
      </div>
    </div>
  );
}
