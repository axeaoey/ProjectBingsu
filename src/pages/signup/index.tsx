// app/signup/page.tsx

import Image from 'next/image';
import SignUpForm from '@/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#273028] to-[#060907]">
      <div className="relative w-full max-w-[767px] h-[600px] flex shadow-lg">
        {/* Left Image Panel */}
        <div className="relative w-[267px] h-full border-l-[3px] border-white/50">
          <Image
            src="/images/IMG_2401.png"
            alt="signup"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right Glass Panel */}
        <div className="relative w-[500px] h-full bg-white/30 border-[3px] border-l-0 border-white backdrop-blur-[2px] opacity-20" />

        {/* Content */}
        <div className="absolute right-0 top-0 w-[500px] h-full flex flex-col items-center justify-start px-6 pt-6">
          <h1 className="text-[64px] md:text-[96px] lg:text-[128px] text-white/50 font-['Iceland'] leading-none drop-shadow-md mb-4">
            Sign Up
          </h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}