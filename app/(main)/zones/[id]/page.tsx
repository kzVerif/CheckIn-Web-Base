import { getZoneById } from "@/actions/zone";
import EditZoneForm from "./EditZoneForm";

export default async function ZoneEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const zone = await getZoneById(id);

  if (!zone) {
    return (
      <div className="text-center py-20 text-gray-600">
        ❌ ไม่พบ Zone ที่ระบุ
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">แก้ไข Zone {zone.id}</h1>
      <EditZoneForm initialData={zone} />
    </div>
  );
}
