"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Zones", path: "/zones" },
    { name: "Devices", path: "/devices" },
    { name: "History", path: "/history" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-automax-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
              <span>📘</span>
            </div>
            <span className="text-gray-800 font-semibold text-lg">
              ระบบจัดการการเข้าเรียน
            </span>
          </div>

          {/* เมนู Desktop */}
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
            <button className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold 
                         hover:bg-red-600 hover:text-white transition duration-200">
              SignOut
            </button>
          </div>

          {/* ปุ่มมือถือ */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* เมนูมือถือ */}
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
          <button
            onClick={() => setOpen(false)}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold 
                         hover:bg-red-600 hover:text-white transition duration-200 m-2"
          >
            LogOut
          </button>
        </div>
      )}
    </nav>
  );
}
