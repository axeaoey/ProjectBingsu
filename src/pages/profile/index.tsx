'use client';

import { useState } from 'react';
import Image from 'next/image';
import LogoutModal from '@/components/LogoutModal';
import Link from 'next/link';

export default function ProfilePage() {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    // TODO: เขียน logic logout จริง เช่น clear token, redirect เป็นต้น
    console.log('Logged out');
    setShowLogout(false);
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#EBE6DE] flex flex-col items-center justify-start relative overflow-hidden">
        {/* Header */}
            <div className="w-full h-[100px] bg-[#69806C] flex items-center px-10 justify-between shadow-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#69806C] rounded-full shadow-md flex items-center justify-center">
                <Link href="/home">
                <span className="text-white text-2xl">{'<'}</span>
                </Link>
                </div>
            </div>
            </div>

        {/* Profile Card */}
        <div className="w-full flex justify-center mt-10">
          <div className="w-[90%] max-w-[500px] bg-gradient-to-b from-[#69806C] to-[#EBE6DE] border border-white/50 shadow-xl rounded-xl p-6 text-center">
            <h2 className="text-white text-4xl font-['Iceland'] mb-2">Full name</h2>
            <p className="text-white text-xl font-['Iceland']">Email@123</p>
            <button
              className="mt-6 w-[145px] h-[60px] bg-[#DBD9D4] border border-white text-[#B51212] text-2xl font-['Iceland'] shadow-md hover:scale-105 transition"
              onClick={() => setShowLogout(true)}
            >
              Log out
            </button>
          </div>
        </div>

        {/* Loyalty Section */}
        <div className="w-full bg-[#947E5A] mt-20 py-10 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10 relative">
            {/* Welcome Message */}
            <div className="bg-[#EBE6DE]/40 border-4 border-white shadow-xl backdrop-blur-md rounded-r-[50px] px-10 py-6">
              <h1 className="text-white text-4xl font-['Iceland'] drop-shadow">
                WELCOME TO THE LOYAL CLUB
              </h1>
            </div>

            {/* Card Rewards */}
            <div className="flex-1 bg-[#EBE6DE]/50 border border-white/50 backdrop-blur-xl shadow-xl rounded-xl overflow-hidden">
              <div className="bg-[#69806C] text-white py-4 text-center text-3xl font-['Iceland'] border-b border-white/25">
                Get your 9th drink for free!
              </div>
              <div className="p-6 grid grid-cols-5 gap-4 place-items-center">
                {[...Array(9)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-[70px] h-[70px] rounded-full border-2 border-white ${
                      idx === 8
                        ? 'bg-[#EBE6DE] text-[#69806C] flex items-center justify-center text-xl font-bold'
                        : 'bg-[#EBE6DE]'
                    }`}
                  >
                    {idx === 8 && 'Free'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full h-[100px] bg-[#69806C] mt-20" />
      </div>

      {/* ✅ Logout Modal */}
      <LogoutModal
        show={showLogout}
        onCancel={() => setShowLogout(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
