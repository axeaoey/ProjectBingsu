// src/pages/cart/index.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CartItem {
  id: string;
  cupSize: 'S' | 'M' | 'L';
  shavedIce: {
    flavor: string;
    points: number;
  };
  toppings: Array<{
    name: string;
    points: number;
  }>;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [menuCode, setMenuCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('bingsuCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('bingsuCart', JSON.stringify(items));
    setCartItems(items);
  };

  const calculateItemPrice = (item: CartItem) => {
    let price = 60; // Base price
    const sizePrice = { S: 0, M: 10, L: 20 };
    price += sizePrice[item.cupSize];
    price += item.toppings.length * 10;
    return price * item.quantity;
  };

  const updateQuantity = (id: string, change: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0);
    saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    saveCart(updated);
  };

  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      localStorage.removeItem('bingsuCart');
      setCartItems([]);
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  };

  const handleCheckout = () => {
    if (!menuCode || menuCode.length !== 5) {
      alert('Please enter a valid 5-character menu code');
      return;
    }
    
    // In real implementation, this would validate the code and create orders
    alert(`Processing checkout with code: ${menuCode}`);
    
    // Clear cart after successful checkout
    localStorage.removeItem('bingsuCart');
    setCartItems([]);
    router.push('/order/track');
  };

  const addSampleItem = () => {
    const sample: CartItem = {
      id: Date.now().toString(),
      cupSize: 'M',
      shavedIce: { flavor: 'Matcha', points: 3 },
      toppings: [
        { name: 'Strawberry', points: 5 },
        { name: 'Blueberry', points: 3 }
      ],
      quantity: 1,
      price: 90
    };
    saveCart([...cartItems, sample]);
  };

  return (
    <div className="min-h-screen bg-[#EBE6DE]">
      {/* Header */}
      <div className="w-full h-[100px] bg-[#69806C] flex items-center px-10 shadow-lg">
        <Link href="/home">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
            <span className="text-white text-2xl">{'<'}</span>
          </div>
        </Link>
        <h1 className="ml-6 text-white text-3xl font-['Iceland']">Shopping Cart</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl text-[#69806C] font-['Iceland'] mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 font-['Iceland'] mb-8">
              Add some delicious Bingsu to your cart!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/menu">
                <button className="px-6 py-3 bg-[#69806C] text-white font-['Iceland'] text-lg rounded-lg hover:bg-[#5a6e5e] transition">
                  Go to Menu
                </button>
              </Link>
              <button
                onClick={addSampleItem}
                className="px-6 py-3 bg-gray-400 text-white font-['Iceland'] text-lg rounded-lg hover:bg-gray-500 transition"
              >
                Add Sample Item (Demo)
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl text-[#69806C] font-['Iceland']">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-['Iceland'] text-sm"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-['Iceland'] text-[#543429] font-bold">
                            {item.shavedIce.flavor} Bingsu - Size {item.cupSize}
                          </h3>
                          {item.toppings.length > 0 && (
                            <p className="text-sm text-gray-600 font-['Iceland'] mt-1">
                              Toppings: {item.toppings.map(t => t.name).join(', ')}
                            </p>
                          )}
                          {item.specialInstructions && (
                            <p className="text-sm text-gray-500 font-['Iceland'] mt-1 italic">
                              Note: {item.specialInstructions}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-['Iceland']">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-lg font-['Iceland'] text-[#69806C] font-bold">
                          ฿{calculateItemPrice(item)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h3 className="text-xl text-[#69806C] font-['Iceland'] mb-4">
                  Order Summary
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-['Iceland']">
                    <span>Subtotal</span>
                    <span>฿{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between font-['Iceland'] text-sm text-gray-500">
                    <span>Service Fee</span>
                    <span>฿0</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-['Iceland'] text-xl font-bold text-[#69806C]">
                    <span>Total</span>
                    <span>฿{getSubtotal()}</span>
                  </div>
                </div>

                {!showCheckout ? (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-3 bg-[#69806C] text-white font-['Iceland'] text-lg rounded-lg hover:bg-[#5a6e5e] transition"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 font-['Iceland'] mb-2">
                        Enter Menu Code
                      </label>
                      <input
                        type="text"
                        value={menuCode}
                        onChange={(e) => setMenuCode(e.target.value.toUpperCase())}
                        maxLength={5}
                        placeholder="XXXXX"
                        className="w-full p-3 border-2 border-[#69806C] rounded-lg font-['Iceland'] text-center text-xl tracking-widest"
                      />
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={!menuCode || menuCode.length !== 5}
                      className="w-full py-3 bg-green-600 text-white font-['Iceland'] text-lg rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Order
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="w-full py-2 text-gray-500 font-['Iceland'] hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800 font-['Iceland']">
                    💡 You need a menu code from the counter to complete your order
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}