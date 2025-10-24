"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Login เฉพาะ Admin ตัวอย่าง (ปรับภายหลังได้)
    if (username === "admin" && password === "1234") {
      Cookies.set("isLoggedIn", "true", { expires: 1 }); // 1 วัน
      router.push("/");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="container mx-auto min-h-screen  from-indigo-100 to-indigo-200 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl p-10 shadow-md w-[380px] text-center"
      >
        <h1 className="text-2xl font-bold mb-2">เข้าสู่ระบบแอดมิน</h1>
        <p className="text-gray-500 mb-6 text-sm">ระบบจัดการการเข้าเรียน</p>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm px-3 py-2 rounded-md mb-4">
            {error}
          </p>
        )}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ชื่อผู้ใช้"
          required
          className="border border-gray-300 rounded-xl px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
          required
          className="border border-gray-300 rounded-xl px-4 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}
