'use client';

import { useState } from 'react';
import Link from 'next/link';

type Order = {
  customerId: string;
  orderId: string;
  flavor: string;
  topping: string;
  cupSize: string;
  total: number;
  status: 'Pending' | 'Ready' | 'Completed';
};

const initialOrders: Order[] = [
  {
    customerId: '#xl323',
    orderId: '001',
    flavor: 'Green Tea',
    topping: 'Strawberry',
    cupSize: 'S',
    total: 80,
    status: 'Pending',
  },
  {
    customerId: '#xb451',
    orderId: '002',
    flavor: 'Milk',
    topping: 'Banana',
    cupSize: 'L',
    total: 120,
    status: 'Ready',
  },
];

export default function OrderAdminPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateStatus = (index: number) => {
    const newOrders = [...orders];
    const current = newOrders[index].status;
    if (current === 'Pending') newOrders[index].status = 'Ready';
    else if (current === 'Ready') newOrders[index].status = 'Completed';
    setOrders(newOrders);
  };

  return (
    <div className="min-h-screen bg-[#EBE6DE] font-['Iceland']">
      {/* Header */}
      <div className="w-full h-[60px] bg-[#69806C] flex items-center px-6 shadow-lg">
        <Link href="/admin">
          <div className="text-white text-2xl hover:opacity-80">{'<'}</div>
        </Link>
        <h1 className="ml-6 text-white text-2xl">Order Management</h1>
      </div>

      {/* Orders */}
      <div className="p-6 flex flex-col items-center gap-6">
        <h2 className="text-3xl text-[#69806C] mb-4">Order List</h2>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order, index) => (
            <div
              key={order.orderId}
              className="bg-white/70 backdrop-blur-md border border-white shadow-md p-6 rounded-xl"
            >
              <p className="text-lg text-[#273028] mb-1">
                <span className="font-bold">Customer Code:</span> {order.customerId}
              </p>
              <p className="text-lg text-[#273028] mb-1">
                <span className="font-bold">Order ID:</span> {order.orderId}
              </p>
              <p className="text-lg text-[#273028] mb-1">
                <span className="font-bold">Shaved Ice Flavor:</span> {order.flavor}
              </p>
              <p className="text-lg text-[#273028] mb-1">
                <span className="font-bold">Fruit Toppings:</span> {order.topping}
              </p>
              <p className="text-lg text-[#273028] mb-1">
                <span className="font-bold">Cup Size:</span> {order.cupSize}
              </p>
              <p className="text-lg text-[#273028] mb-3">
                <span className="font-bold">Total:</span> ฿{order.total.toFixed(2)}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-lg font-semibold ${
                    order.status === 'Pending'
                      ? 'text-red-600'
                      : order.status === 'Ready'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  Status: {order.status}
                </span>

                {order.status !== 'Completed' && (
                  <button
                    className="px-4 py-2 bg-[#69806C] text-white rounded-md hover:scale-105 transition"
                    onClick={() => updateStatus(index)}
                  >
                    Mark as {order.status === 'Pending' ? 'Ready' : 'Completed'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
