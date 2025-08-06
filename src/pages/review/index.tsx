'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0 && review.trim() !== '') {
      // TODO: ส่งข้อมูลไป backend
      setSubmitted(true);
    }
  };

  const customerReviews = [
    {
      name: 'Alice',
      rating: 5,
      text: 'Best shaved ice ever! The mango flavor was amazing.',
    },
    {
      name: 'Bob',
      rating: 4,
      text: 'Great taste, loved the toppings!',
    },
    {
      name: 'Charlie',
      rating: 3,
      text: 'It was good, but the ice melted a bit too fast.',
    },
  ];

  const averageRating =
    customerReviews.reduce((sum, r) => sum + r.rating, 0) /
    customerReviews.length;

  return (
    <div className="relative w-full min-h-screen bg-[#EBE6DE] px-4 md:px-10 lg:px-20 py-10">
      {/* Header Image */}
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

      {/* Section Title */}
      <div className="relative w-full mb-8 mt-4">
        <div className="absolute top-6 left-0 w-[280px] h-24 bg-[#EBE6DE] border-4 border-white shadow-[0_0_10px_rgba(0,0,0,0.25),_0_10px_30px_rgba(0,0,0,0.25)] rounded-r-[30px] flex items-center pl-6">
          <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] font-['Iceland'] leading-none drop-shadow-md">
            Review page
          </h2>
        </div>
      </div>

      {/* Review Form */}
      <div className="w-full py-10 flex flex-col items-center">
        <h1 className="text-[48px] text-[#69806C] font-['Iceland'] mb-6 drop-shadow">
          Review
        </h1>

        {/* ⭐️ Current Rating */}
        <div className="mb-6 text-center text-[#543429] text-xl font-['Iceland']">
          Current Rating:{' '}
          <span className="text-yellow-500 text-3xl">
            {averageRating.toFixed(1)} ★
          </span>
        </div>

        {!submitted ? (
          <div className="bg-white/80 border border-[#69806C] rounded-xl shadow-xl p-6 w-full max-w-xl flex flex-col items-center gap-6">
            {/* ⭐️ Rating Selector */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`text-4xl ${
                    rating >= num ? 'text-yellow-400' : 'text-gray-400'
                  } hover:scale-110 transition`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* ✍️ Textarea */}
            <textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              className="w-full p-4 border border-[#69806C] rounded-md text-[#543429] font-['Iceland'] placeholder:text-[#A3A3A3] resize-none focus:outline-none shadow-inner"
            />

            {/* ✅ Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-48 h-14 bg-[#69806C] text-white text-2xl font-['Iceland'] rounded-lg shadow-md hover:bg-[#506256] transition"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <div className="text-center mt-20 text-[#69806C] text-2xl font-['Iceland']">
            Thank you for your review! 💖
          </div>
        )}
      </div>

      {/* 👥 Other Reviews */}
      <div className="w-full max-w-4xl mx-auto mt-12 mb-20">
        <h2 className="text-3xl text-[#69806C] font-['Iceland'] mb-6">Customer Reviews</h2>
        <div className="flex flex-col gap-4">
          {customerReviews.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-[#69806C] rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-['Iceland'] text-[#543429]">{r.name}</span>
                <span className="text-yellow-400 text-xl">
                  {'★'.repeat(r.rating)}
                  {'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              <p className="text-[#543429] font-['Iceland'] text-base">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
