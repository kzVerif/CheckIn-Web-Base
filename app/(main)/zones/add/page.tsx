import AddZoneForm from "./AddZoneForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AddZonePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            เพิ่ม Zone ใหม่
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            กรอกข้อมูลห้อง อาคาร และ Beacon เพื่อสร้าง Zone ใหม่ในระบบ
          </p>
        </div>

        <Link href="/zones">
          <Button variant="outline">กลับไปหน้า Zone</Button>
        </Link>
      </div>

      <AddZoneForm />
    </div>
  )
}
