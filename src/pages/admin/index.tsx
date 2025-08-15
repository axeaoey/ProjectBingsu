'use client';

import { useState } from 'react';
import Link from 'next/link';
import LogoutModal from '@/components/LogoutModal';

export default function AdminPage() {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    console.log('Logged out');
    setShowLogout(false);
  };

  const adminButtons = [
    { text: 'สร้างรหัสโค้ด', href: '/admin/create-code' },
    { text: 'ดูรายการออเดอร์', href: '/admin/orders' },
    { text: 'การจัดการข้อมูล', href: '/admin/data-management' },
    { text: 'รายงานยอดขาย', href: '/admin/sales-report' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#EBE6DE] flex flex-col items-center relative overflow-hidden">
      {/* Header */}
      <div className="w-full h-[100px] bg-[#69806C] flex items-center px-10 justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#69806C] rounded-full shadow-md flex items-center justify-center">
            <Link href="/home">
              <span className="text-white text-2xl">{'<'}</span>
            </Link>
          </div>
        </div>
        <button
          className="text-white text-xl font-['Iceland'] underline"
          onClick={() => setShowLogout(true)}
        >
          Log out
        </button>
      </div>

      {/* Admin Menu */}
      <div className="mt-16 w-full max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminButtons.map((btn, idx) => (
          <Link href={btn.href} key={idx}>
            <div className="cursor-pointer w-full h-[100px] bg-[#69806C] rounded-[10px] shadow-[0_5px_20px_rgba(0,0,0,0.25)] text-white text-2xl font-['Iceland'] flex items-center justify-center text-center transition hover:scale-105">
              {btn.text}
            </div>
          </Link>
        ))}
      </div>

      <div className="h-20" />

      {/* Logout Modal */}
      <LogoutModal
        show={showLogout}
        onCancel={() => setShowLogout(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}
