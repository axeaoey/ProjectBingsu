import { useState } from "react";
import Link from "next/link";

export default function NavigationButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Array ปุ่ม
  const buttons = [
    { text: isLoggedIn ? "Profile" : "Login", path: isLoggedIn ? "/profile" : "/login" },
    { text: "Cart", path: "/cart" },
    { text: "Review", path: "/review" },
    { text: "Order", path: "/order" },
    { text: "Admin", path: "/admin" },
  ];

  return (
    <div className="absolute top-[280px] left-0 right-0 flex flex-wrap gap-4">
      {buttons.map(({ text, path }, index) => (
        <Link href={path} key={index}>
          <div
            onClick={text === "Login" ? () => setIsLoggedIn(true) : undefined} // กด Login → เปลี่ยน state
            className="cursor-pointer flex flex-col justify-center items-center w-[100px] h-[100px] bg-[#69806C] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.25)] text-white font-['Iceland'] text-[24px] transition hover:scale-105"
          >
            {text}
          </div>
        </Link>
      ))}
    </div>
  );
}