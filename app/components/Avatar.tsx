interface AvatarProps {
  name: string;
}

const bgColors = [
  "bg-red-200",
  "bg-orange-200",
  "bg-amber-200",
  "bg-lime-200",
  "bg-green-200",
  "bg-teal-200",
  "bg-cyan-200",
  "bg-sky-200",
  "bg-blue-200",
  "bg-indigo-200",
  "bg-violet-200",
  "bg-purple-200",
  "bg-fuchsia-200",
  "bg-pink-200",
  "bg-rose-200",
];

export default function Avatar({ name }: AvatarProps) {
  // ✅ เอาแค่ตัวแรกเท่านั้น
  const initial = name.charAt(0).toUpperCase();

  // ✅ เลือกสีจาก hash ของชื่อ (สีจะจำประจำชื่อ)
  const colorIndex = name.codePointAt(0)! % bgColors.length;
  const bgColor = bgColors[colorIndex];

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center 
                  rounded-full font-semibold text-gray-800
                  ${bgColor}`}
    >
      {initial}
    </div>
  );
}
