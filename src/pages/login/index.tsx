// app/login/page.tsx

import Image from 'next/image';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-black to-[#273028]">
      <div className="relative w-full max-w-[767px] h-[600px] flex shadow-lg">
        {/* Left Image */}
        <div className="relative w-[267px] h-full border-l-[3px] border-white/50">
          <Image
            src="/images/IMG_2401.png"
            alt="login"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right Glass Background */}
        <div className="relative w-[500px] h-full bg-white/30 border-[3px] border-l-0 border-white backdrop-blur-[2px] opacity-20" />

        {/* Foreground Content */}
        <div className="absolute right-0 top-0 w-[500px] h-full flex flex-col items-center justify-start px-6 pt-6">
          <h1 className="text-[64px] md:text-[96px] lg:text-[128px] text-white/50 font-['Iceland'] leading-none drop-shadow-md mb-8">
            Log in
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
