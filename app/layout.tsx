// app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner"

export const metadata = {
  title: "ระบบจัดการการเข้าเรียน",
  description: "",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="font-sans bg-gray-50 ">

        <div>

          {children}
          <Toaster richColors position="bottom-right" /> 
          </div>
      </body>
    </html>
  );
}

