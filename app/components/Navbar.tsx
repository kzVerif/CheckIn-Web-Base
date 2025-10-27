"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Zones", path: "/zones" },
    { name: "Devices", path: "/devices" },
    { name: "History", path: "/history" },
  ];

  const handleLogoutConfirm = () => {
    Cookies.remove("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm w-full ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
                <span>📘</span>
              </div>
              <span className="text-gray-800 font-semibold text-lg hover:text-indigo-600 transition">
                ระบบจัดการการเข้าเรียน
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {menus.map((menu) => (
                <Link
                  key={menu.path}
                  href={menu.path}
                  className={`px-3 py-2 rounded-xl transition font-medium ${
                    pathname === menu.path
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {menu.name}
                </Link>
              ))}

              {/* ✅ Logout เปิด Modal */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold 
                           hover:bg-red-600 hover:text-white transition duration-200"
              >
                LogOut
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-gray-700 hover:text-indigo-600"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            {menus.map((menu) => (
              <Link
                key={menu.path}
                href={menu.path}
                className={`block px-4 py-3 transition ${
                  pathname === menu.path
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
                onClick={() => setOpen(false)}
              >
                {menu.name}
              </Link>
            ))}

            {/* ✅ Logout Mobile */}
            <button
              onClick={() => {
                setShowLogoutModal(true);
                setOpen(false);
              }}
              className="m-2 bg-red-100 text-red-600 w-full text-left px-4 py-3 font-semibold rounded-xl 
                         hover:bg-red-600 hover:text-white transition"
            >
              LogOut
            </button>
          </div>
        )}
      </nav>

      {/* โชว์ modal ยืนยันออกจากระบบ */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm bg-white/20 pointer-events-none">
          <div
            className="
    pointer-events-auto
    bg-white p-8 rounded-2xl 
    w-[480px] text-center 
    border border-gray-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.2)]
    animate-popup
  "
          >
            <h2 className="font-bold text-xl text-gray-800 mb-6">
              คุณต้องการออกจากระบบหรือไม่?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                ยกเลิก
              </button>

              <button
                onClick={handleLogoutConfirm}
                className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
