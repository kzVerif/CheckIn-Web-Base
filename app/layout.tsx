// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "ระบบจัดการการเข้าเรียน",
  description: "",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="font-sans bg-gray-50 ">
        <div>{children}</div>
      </body>
    </html>
  );
}

