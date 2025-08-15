'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SalesData {
  date: string;
  orders: number;
  revenue: number;
  topFlavor: string;
  topTopping: string;
}

const mockSalesData: SalesData[] = [
  {
    date: '2024-08-14',
    orders: 45,
    revenue: 5400,
    topFlavor: 'Strawberry',
    topTopping: 'Cherry',
  },
  {
    date: '2024-08-13',
    orders: 38,
    revenue: 4560,
    topFlavor: 'Thai Tea',
    topTopping: 'Strawberry',
  },
  {
    date: '2024-08-12',
    orders: 52,
    revenue: 6240,
    topFlavor: 'Matcha',
    topTopping: 'Blueberry',
  },
  {
    date: '2024-08-11',
    orders: 41,
    revenue: 4920,
    topFlavor: 'Strawberry',
    topTopping: 'Apple',
  },
  {
    date: '2024-08-10',
    orders: 47,
    revenue: 5640,
    topFlavor: 'Thai Tea',
    topTopping: 'Raspberry',
  },
];

export default function SalesReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const totalRevenue = mockSalesData.reduce((sum, data) => sum + data.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, data) => sum + data.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  const flavorStats = mockSalesData.reduce((acc, data) => {
    acc[data.topFlavor] = (acc[data.topFlavor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const toppingStats = mockSalesData.reduce((acc, data) => {
    acc[data.topTopping] = (acc[data.topTopping] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularFlavor = Object.keys(flavorStats).reduce((a, b) => 
    flavorStats[a] > flavorStats[b] ? a : b
  );

  const mostPopularTopping = Object.keys(toppingStats).reduce((a, b) => 
    toppingStats[a] > toppingStats[b] ? a : b
  );

  return (
    <div className="min-h-screen w-full bg-[#EBE6DE] flex flex-col">
      {/* Header */}
      <div className="w-full h-[100px] bg-[#69806C] flex items-center px-10 justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <div className="w-12 h-12 bg-[#69806C] rounded-full shadow-md flex items-center justify-center cursor-pointer">
              <span className="text-white text-2xl">{'<'}</span>
            </div>
          </Link>
          <h1 className="text-white text-3xl font-['Iceland']">Sales Report</h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-8">
        {/* Section Header */}
        <div className="relative w-full mb-8">
          <div className="absolute top-0 left-0 w-[320px] h-24 bg-[#69806C] border-4 border-white shadow-[0_0_10px_rgba(0,0,0,0.25),_0_10px_30px_rgba(0,0,0,0.25)] rounded-r-[30px] flex items-center pl-6">
            <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] font-['Iceland'] leading-none drop-shadow-md">
              รายงานยอดขาย
            </h2>
          </div>
        </div>

        <div className="mt-20 max-w-6xl mx-auto">
          {/* Period Selector */}
          <div className="mb-8 flex gap-4 justify-center">
            {[
              { key: 'daily', label: 'รายวัน' },
              { key: 'weekly', label: 'รายสัปดาห์' },
              { key: 'monthly', label: 'รายเดือน' },
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key as any)}
                className={`px-6 py-2 rounded-lg font-['Iceland'] text-lg transition ${
                  selectedPeriod === period.key
                    ? 'bg-[#69806C] text-white'
                    : 'bg-white/80 text-[#69806C] border border-[#69806C]'
                } hover:scale-105`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6 text-center">
              <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-2">ยอดขายรวม</h3>
              <p className="text-4xl text-[#543429] font-['Iceland'] font-bold">
                ฿{totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6 text-center">
              <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-2">จำนวนออเดอร์</h3>
              <p className="text-4xl text-[#543429] font-['Iceland'] font-bold">
                {totalOrders}
              </p>
            </div>

            <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6 text-center">
              <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-2">ยอดเฉลี่ย/ออเดอร์</h3>
              <p className="text-4xl text-[#543429] font-['Iceland'] font-bold">
                ฿{averageOrderValue.toFixed(0)}
              </p>
            </div>

            <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6 text-center">
              <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-2">รสชาติยอดนิยม</h3>
              <p className="text-2xl text-[#543429] font-['Iceland'] font-bold">
                {mostPopularFlavor}
              </p>
            </div>
          </div>

          {/* Daily Sales Table */}
          <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6">
            <h3 className="text-3xl text-[#69806C] font-['Iceland'] mb-6 text-center">รายละเอียดยอดขาย</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#69806C] text-white">
                    <th className="px-4 py-3 text-left font-['Iceland'] text-xl">วันที่</th>
                    <th className="px-4 py-3 text-center font-['Iceland'] text-xl">จำนวนออเดอร์</th>
                    <th className="px-4 py-3 text-center font-['Iceland'] text-xl">ยอดขาย (฿)</th>
                    <th className="px-4 py-3 text-center font-['Iceland'] text-xl">รสชาติยอดนิยม</th>
                    <th className="px-4 py-3 text-center font-['Iceland'] text-xl">ท็อปปิ้งยอดนิยม</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalesData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white/50' : 'bg-[#EBE6DE]/50'}>
                      <td className="px-4 py-3 font-['Iceland'] text-lg">
                        {new Date(data.date).toLocaleDateString('th-TH')}
                      </td>
                      <td className="px-4 py-3 text-center font-['Iceland'] text-lg">{data.orders}</td>
                      <td className="px-4 py-3 text-center font-['Iceland'] text-lg">
                        ฿{data.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center font-['Iceland'] text-lg">{data.topFlavor}</td>
                      <td className="px-4 py-3 text-center font-['Iceland'] text-lg">{data.topTopping}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Items */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6">
              <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-4 text-center">รสชาติที่นิยม</h3>
              {Object.entries(flavorStats).map(([flavor, count]) => (
                <div key={flavor} className="flex justify-between items-center py-2 border-b border-[#69806C]/20">
                  <span className="font-['Iceland'] text-lg">{flavor}</span>
                  <span className="font-['Iceland'] text-lg font-bold">{count} วัน</span>
                </div>
              ))}
            </div>

            <div className="bg-white/80 border-2 border-[#69806C] rounded-xl p-6">
              <h3 className="text-2xl text-[#69806C] font-['Iceland'] mb-4 text-center">ท็อปปิ้งที่นิยม</h3>
              {Object.entries(toppingStats).map(([topping, count]) => (
                <div key={topping} className="flex justify-between items-center py-2 border-b border-[#69806C]/20">
                  <span className="font-['Iceland'] text-lg">{topping}</span>
                  <span className="font-['Iceland'] text-lg font-bold">{count} วัน</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}