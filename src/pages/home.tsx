// src/pages/home.tsx

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  const [menuCode, setMenuCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (menuCode.trim().length !== 5) {
      setError('Please enter a valid 5-character menu code');
      return;
    }
    
    // Navigate to menu page with the code
    router.push(`/menu?code=${menuCode.toUpperCase()}`);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#EBE6DE] px-4 md:px-10 lg:px-20 py-10">
      {/* Header Image with overlay */}
      <div className="relative w-full max-w-7xl mx-auto h-[300px] md:h-[500px] rounded-[20px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg.jpeg')] bg-cover bg-center z-0 rounded-[20px]" />
        <div className="absolute inset-0 bg-[#D9D9D9] opacity-70 rounded-[20px] z-10" />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 justify-start">
        {[
          { text: 'Login', path: '/login' },
          { text: 'Cart', path: '/cart' },
          { text: 'Review', path: '/review' },
          { text: 'Order', path: '/order' },
          { text: 'Admin', path: '/admin' },
        ].map(({ text, path }, index) => (
          <Link href={path} key={index}>
            <div className="cursor-pointer flex flex-col justify-center items-center w-[100px] h-[100px] bg-[#69806C] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.25)] text-white font-['Iceland'] text-[24px] transition hover:scale-105">
              {text}
            </div>
          </Link>
        ))}
      </div>

      {/* Enter Menu Code Section */}
      <div className="w-full bg-[#947E5A] h-[424px] flex flex-col justify-center items-center gap-8 px-4 mt-10 rounded-[20px]">
        <h2 className="text-white text-[36px] font-['Iceland'] drop-shadow-md">
          Start Your Order
        </h2>
        
        {error && (
          <div className="text-red-200 font-['Iceland'] text-lg bg-red-600/20 px-4 py-2 rounded">
            {error}
          </div>
        )}
        
        {/* Enter Menu Code Field */}
        <div className="w-[337px] h-[60px] bg-[#EBE6DE] border border-white shadow-[inset_0_10px_20px_rgba(0,0,0,0.25),inset_0_0_20px_white] flex justify-center items-center px-6">
          <input
            type="text"
            placeholder="Enter Menu Code"
            value={menuCode}
            onChange={(e) => {
              setMenuCode(e.target.value.toUpperCase());
              setError('');
            }}
            maxLength={5}
            onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
            className="w-full bg-transparent outline-none text-[28px] font-['Iceland'] text-[#69806C] placeholder-[#69806C] text-center tracking-widest"
          />
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={loading || menuCode.length !== 5}
          className="w-[200px] h-[60px] bg-[#EBE6DE] border border-white shadow-[0_10px_20px_rgba(0,0,0,0.25),0_0_20px_rgba(0,0,0,0.25)] flex justify-center items-center transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-[36px] font-['Iceland'] text-[#69806C] leading-[35px]">
            {loading ? 'Loading...' : 'Confirm'}
          </span>
        </button>

        {/* Test Codes Info */}
        <div className="text-white/80 font-['Iceland'] text-sm text-center">
          <p>Demo Codes: TEST1 (S), TEST2 (M), TEST3 (L)</p>
          <p>DEMO1 (S), DEMO2 (M), DEMO3 (L)</p>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-6 text-center">
          Quick Links
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/order">
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-2 text-center">📦</div>
              <p className="text-[#69806C] font-['Iceland'] text-center">Track Order</p>
            </div>
          </Link>
          <Link href="/profile">
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-2 text-center">👤</div>
              <p className="text-[#69806C] font-['Iceland'] text-center">Profile</p>
            </div>
          </Link>
          <Link href="/review">
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-2 text-center">⭐</div>
              <p className="text-[#69806C] font-['Iceland'] text-center">Reviews</p>
            </div>
          </Link>
          <Link href="/cart">
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-2 text-center">🛒</div>
              <p className="text-[#69806C] font-['Iceland'] text-center">Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}