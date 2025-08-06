import Image from 'next/image';
import Link from 'next/link';
import EnterCode from '@/components/entercode';

export default function Order() {
  return (
    <div className="relative w-full min-h-screen bg-[#EBE6DE] px-4 md:px-10 lg:px-20 py-10">
      {/* Header Image with overlay */}
      <div className="relative w-full max-w-7xl mx-auto h-[300px] md:h-[500px] rounded-[20px] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg.jpeg')] bg-cover bg-center z-0 rounded-[20px]" />
        <div className="absolute inset-0 bg-[#D9D9D9] opacity-70 rounded-[20px] z-10" />
      </div>

      {/* Example Button Group with Navigation */}
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

      {/* 🧾 Section Header: Menu Design */}
        <div className="relative w-full mb-8 mt-4">
        <div className="absolute top-6 left-0 w-[280px] h-24 bg-[#EBE6DE] border-4 border-white shadow-[0_0_10px_rgba(0,0,0,0.25),_0_10px_30px_rgba(0,0,0,0.25)] rounded-r-[30px] flex items-center pl-6">
            <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] font-['Iceland'] leading-none drop-shadow-md">
            Order
            </h2>
        </div>
        </div>

        <EnterCode />

      {/* Add more flavor and topping blocks below in similar Tailwind format */}
    </div>
  );
}