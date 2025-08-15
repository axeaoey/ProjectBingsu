// src/pages/admin/sales-report/index.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
  orderId: string;
  customerCode: string;
  cupSize: string;
  shavedIce: { flavor: string };
  toppings: Array<{ name: string }>;
  pricing: { total: number };
  status: string;
  createdAt: string;
}

interface SalesData {
  date: string;
  orders: number;
  revenue: number;
  avgOrderValue: number;
}

export default function SalesReportPage() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'all'>('today');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    bestSellingFlavor: '',
    bestSellingTopping: '',
    peakHour: '',
    completionRate: 0
  });

  useEffect(() => {
    calculateSalesData();
  }, [period]);

  const calculateSalesData = () => {
    const orders: Order[] = JSON.parse(localStorage.getItem('bingsuOrders') || '[]');
    
    // Filter by period
    const now = new Date();
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      
      switch (period) {
        case 'today':
          return orderDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        default:
          return true;
      }
    });

    // Group by date
    const groupedData: { [key: string]: Order[] } = {};
    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(order);
    });

    // Calculate daily sales
    const dailySales: SalesData[] = Object.keys(groupedData).map(date => {
      const dayOrders = groupedData[date];
      const revenue = dayOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0);
      
      return {
        date,
        orders: dayOrders.length,
        revenue,
        avgOrderValue: revenue / dayOrders.length
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setSalesData(dailySales);

    // Calculate summary
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0);
    const totalOrders = filteredOrders.length;
    
    // Best selling flavor
    const flavorCount: { [key: string]: number } = {};
    filteredOrders.forEach(order => {
      const flavor = order.shavedIce?.flavor;
      if (flavor) {
        flavorCount[flavor] = (flavorCount[flavor] || 0) + 1;
      }
    });
    const bestSellingFlavor = Object.keys(flavorCount).reduce((a, b) => 
      flavorCount[a] > flavorCount[b] ? a : b, 'N/A'
    );

    // Best selling topping
    const toppingCount: { [key: string]: number } = {};
    filteredOrders.forEach(order => {
      order.toppings?.forEach(topping => {
        toppingCount[topping.name] = (toppingCount[topping.name] || 0) + 1;
      });
    });
    const bestSellingTopping = Object.keys(toppingCount).reduce((a, b) => 
      toppingCount[a] > toppingCount[b] ? a : b, 'N/A'
    );

    // Peak hour
    const hourCount: { [key: string]: number } = {};
    filteredOrders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      const hourStr = `${hour}:00-${hour + 1}:00`;
      hourCount[hourStr] = (hourCount[hourStr] || 0) + 1;
    });
    const peakHour = Object.keys(hourCount).reduce((a, b) => 
      hourCount[a] > hourCount[b] ? a : b, 'N/A'
    );

    // Completion rate
    const completedOrders = filteredOrders.filter(order => order.status === 'Completed').length;
    const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;

    setSummary({
      totalOrders,
      totalRevenue,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      bestSellingFlavor,
      bestSellingTopping,
      peakHour,
      completionRate
    });
  };

  const exportToJSON = () => {
    const data = {
      period,
      summary,
      dailySales: salesData,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `sales_report_${period}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const generateCSV = () => {
    let csv = 'Date,Orders,Revenue,Avg Order Value\n';
    salesData.forEach(data => {
      csv += `${data.date},${data.orders},${data.revenue},${data.avgOrderValue.toFixed(2)}\n`;
    });
    
    const dataUri = 'data:text/csv;charset=utf-8,'+ encodeURIComponent(csv);
    const exportFileDefaultName = `sales_report_${period}_${new Date().toISOString().split('T')[0]}.csv`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-[#EBE6DE] font-['Iceland']">
      {/* Header */}
      <div className="w-full h-[80px] bg-[#69806C] flex items-center px-6 shadow-lg">
        <Link href="/admin">
          <div className="text-white text-2xl hover:opacity-80 cursor-pointer">{'<'}</div>
        </Link>
        <h1 className="ml-6 text-white text-3xl">Sales Report</h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2">
            {(['today', 'week', 'month', 'all'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-lg transition ${
                  period === p
                    ? 'bg-[#69806C] text-white'
                    : 'bg-gray-100 text-[#69806C] hover:bg-gray-200'
                }`}
              >
                {p === 'today' ? 'Today' : 
                 p === 'week' ? 'Last 7 Days' :
                 p === 'month' ? 'Last 30 Days' : 'All Time'}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-[#69806C]">{summary.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-[#69806C]">฿{summary.totalRevenue}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Avg Order Value</p>
            <p className="text-3xl font-bold text-[#69806C]">฿{summary.avgOrderValue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Completion Rate</p>
            <p className="text-3xl font-bold text-[#69806C]">{summary.completionRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-[#69806C] to-[#947E5A] rounded-lg shadow-lg p-6 text-white">
            <p className="text-white/80 text-sm mb-2">Best Selling Flavor</p>
            <p className="text-2xl font-bold">{summary.bestSellingFlavor}</p>
          </div>
          <div className="bg-gradient-to-r from-[#947E5A] to-[#69806C] rounded-lg shadow-lg p-6 text-white">
            <p className="text-white/80 text-sm mb-2">Top Topping</p>
            <p className="text-2xl font-bold">{summary.bestSellingTopping}</p>
          </div>
          <div className="bg-gradient-to-r from-[#69806C] to-[#947E5A] rounded-lg shadow-lg p-6 text-white">
            <p className="text-white/80 text-sm mb-2">Peak Hour</p>
            <p className="text-2xl font-bold">{summary.peakHour}</p>
          </div>
        </div>

        {/* Daily Sales Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl text-[#69806C] mb-4">Daily Sales Breakdown</h3>
          
          {salesData.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No sales data for this period</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-700">Date</th>
                    <th className="text-center py-2 text-gray-700">Orders</th>
                    <th className="text-right py-2 text-gray-700">Revenue</th>
                    <th className="text-right py-2 text-gray-700">Avg Order</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((data, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3">{data.date}</td>
                      <td className="py-3 text-center">{data.orders}</td>
                      <td className="py-3 text-right">฿{data.revenue}</td>
                      <td className="py-3 text-right">฿{data.avgOrderValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td className="py-3">Total</td>
                    <td className="py-3 text-center">{summary.totalOrders}</td>
                    <td className="py-3 text-right">฿{summary.totalRevenue}</td>
                    <td className="py-3 text-right">฿{summary.avgOrderValue.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Sales Chart (Simple Text-based) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl text-[#69806C] mb-4">Sales Trend</h3>
          <div className="space-y-2">
            {salesData.slice(0, 7).map((data, index) => {
              const maxRevenue = Math.max(...salesData.map(d => d.revenue));
              const barWidth = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-24 text-sm text-gray-600">{data.date}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded relative">
                      <div 
                        className="h-full bg-gradient-to-r from-[#69806C] to-[#947E5A] rounded"
                        style={{ width: `${barWidth}%` }}
                      >
                        <span className="absolute right-2 top-1 text-white text-sm">
                          ฿{data.revenue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl text-[#69806C] mb-4">Top Products Performance</h3>
            
            {(() => {
              const orders: Order[] = JSON.parse(localStorage.getItem('bingsuOrders') || '[]');
              const flavorStats: { [key: string]: { count: number; revenue: number } } = {};
              
              orders.forEach(order => {
                const flavor = order.shavedIce?.flavor;
                if (flavor) {
                  if (!flavorStats[flavor]) {
                    flavorStats[flavor] = { count: 0, revenue: 0 };
                  }
                  flavorStats[flavor].count++;
                  flavorStats[flavor].revenue += order.pricing?.total || 0;
                }
              });
              
              const sortedFlavors = Object.entries(flavorStats)
                .sort((a, b) => b[1].revenue - a[1].revenue)
                .slice(0, 5);
              
              return sortedFlavors.length === 0 ? (
                <p className="text-gray-500">No data available</p>
              ) : (
                <div className="space-y-2">
                  {sortedFlavors.map(([flavor, stats], index) => (
                    <div key={flavor} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#69806C]">#{index + 1}</span>
                        <span>{flavor}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">฿{stats.revenue}</p>
                        <p className="text-sm text-gray-500">{stats.count} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Size Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl text-[#69806C] mb-4">Size Distribution</h3>
            
            {(() => {
              const orders: Order[] = JSON.parse(localStorage.getItem('bingsuOrders') || '[]');
              const sizeCount: { [key: string]: number } = { S: 0, M: 0, L: 0 };
              
              orders.forEach(order => {
                if (order.cupSize) {
                  sizeCount[order.cupSize] = (sizeCount[order.cupSize] || 0) + 1;
                }
              });
              
              const total = Object.values(sizeCount).reduce((sum, count) => sum + count, 0);
              
              return total === 0 ? (
                <p className="text-gray-500">No data available</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(sizeCount).map(([size, count]) => {
                    const percentage = total > 0 ? (count / total) * 100 : 0;
                    
                    return (
                      <div key={size}>
                        <div className="flex justify-between mb-1">
                          <span className="text-lg font-bold">Size {size}</span>
                          <span>{count} orders ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded">
                          <div 
                            className="h-full bg-[#69806C] rounded"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl text-[#69806C] mb-4">Export Report</h3>
          <div className="flex gap-4 justify-center">
            <button
              onClick={exportToJSON}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Export as JSON
            </button>
            <button
              onClick={generateCSV}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Export as CSV
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              Print Report
            </button>
          </div>
        </div>

        {/* Report Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Report generated on {new Date().toLocaleString()}</p>
          <p>Bingsu Ordering System © 2024</p>
        </div>
      </div>
    </div>
  );
}