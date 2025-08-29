'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCurrentUser, isAuthenticated, isAdmin } from "@/utils/api";

export default function NavigationButtons() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  // Function to check auth status
  const checkAuthStatus = () => {
    const loggedIn = isAuthenticated();
    const adminStatus = isAdmin();
    const currentUser = getCurrentUser();
    
    setIsLoggedIn(loggedIn);
    setIsUserAdmin(adminStatus);
    setUser(currentUser);
  };

  useEffect(() => {
    // Check on mount
    checkAuthStatus();
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check periodically (every 2 seconds when on this page)
    const interval = setInterval(checkAuthStatus, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Handle admin button click
  const handleAdminClick = (e: React.MouseEvent) => {
    // Re-check auth status before proceeding
    const currentLoggedIn = isAuthenticated();
    const currentAdminStatus = isAdmin();
    
    if (!currentLoggedIn) {
      e.preventDefault();
      alert('กรุณาเข้าสู่ระบบก่อนเพื่อเข้าถึงหน้า Admin');
      router.push('/login');
      return;
    }
    
    if (!currentAdminStatus) {
      e.preventDefault();
      alert('คุณไม่มีสิทธิ์เข้าถึงหน้า Admin\nเฉพาะผู้ดูแลระบบเท่านั้น');
      return;
    }
    
    // If all checks pass, navigate to admin
    router.push('/admin');
  };

  // Button configurations
  const buttons = [
    { 
      text: isLoggedIn ? "Profile" : "Login", 
      path: isLoggedIn ? "/profile" : "/login",
      requireAuth: false
    },
    { 
      text: "Cart", 
      path: "/cart",
      requireAuth: false
    },
    { 
      text: "Review", 
      path: "/review",
      requireAuth: false
    },
    { 
      text: "Order", 
      path: "/order",
      requireAuth: false
    },
    { 
      text: "Admin", 
      path: "/admin",
      requireAuth: true,
      adminOnly: true
    },
  ];

  return (
    <div className="absolute top-[280px] left-0 right-0 flex flex-wrap gap-4">
      {buttons.map(({ text, path, requireAuth, adminOnly }, index) => {
        // Special handling for admin button
        if (adminOnly) {
          return (
            <div
              key={index}
              onClick={handleAdminClick}
              className="cursor-pointer flex flex-col justify-center items-center w-[100px] h-[100px] bg-[#69806C] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.25)] text-white font-['Iceland'] text-[24px] transition hover:scale-105"
            >
              {text}
            </div>
          );
        }

        // Regular buttons
        return (
          <Link href={path} key={index}>
            <div className="cursor-pointer flex flex-col justify-center items-center w-[100px] h-[100px] bg-[#69806C] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.25)] text-white font-['Iceland'] text-[24px] transition hover:scale-105">
              {text}
            </div>
          </Link>
        );
      })}
    </div>
  );
}