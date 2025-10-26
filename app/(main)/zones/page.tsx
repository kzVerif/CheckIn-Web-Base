import { getAllZones } from "@/actions/zone"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function DemoPage() {
  const data = await getAllZones()

  return (
    <div className="container mx-auto py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
           จัดการ Zones
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            จัดการพื้นที่เรียน ตารางเรียน และ Beacon ภายในอาคาร
          </p>
        </div>

        <Link href="/zones/add">
          <Button className="flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            เพิ่ม Zone
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            รายการพื้นที่ทั้งหมด ({data.length})
          </h2>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
