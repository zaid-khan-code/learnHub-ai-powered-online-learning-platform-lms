"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; // ✅ NextAuth hooks for backend connection

interface DashboardSidebarProps {
  role: "student" | "instructor" | "admin";
  onClose?: () => void;
}

const sidebarLinks = {
  student: [
    { label: "My Courses", href: "/dashboard/student", icon: "library_books" },
    { label: "Progress", href: "/dashboard/student/progress", icon: "analytics" },
  ],
  instructor: [
    { label: "Dashboard", href: "/dashboard/instructor", icon: "dashboard" },
    { label: "My Courses", href: "/dashboard/instructor/courses", icon: "library_books" },
    { label: "Create New", href: "/dashboard/instructor/courses/add", icon: "add_circle" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: "dashboard" },
    { label: "Users", href: "/dashboard/admin/users", icon: "group" },
    { label: "Courses", href: "/dashboard/admin/courses", icon: "library_books" },
  ],
};

export function DashboardSidebar({ role, onClose }: DashboardSidebarProps) {
  const { data: session } = useSession(); // ✅ Backend session access
  const pathname = usePathname();
  const links = sidebarLinks[role];
  const [isHovered, setIsHovered] = useState(false);

  // User ke naam ka pehla letter nikalne ke liye logic
  const userInitial = session?.user?.name ? session.user.name[0].toUpperCase() : "U";

  return (
   <div
  className="flex flex-col h-full bg-white border-r border-blue-50 transition-all duration-300 ease-in-out overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
  style={{ width: isHovered ? "260px" : "80px" }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Logo Section */}
  <div className="p-5 border-b border-blue-50 flex items-center">
    <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100 shrink-0 transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-105">
        L
      </div>
      <span
        className={`font-bold text-xl text-slate-800 tracking-tight transition-all duration-300 overflow-hidden whitespace-nowrap ${
          isHovered ? "w-auto opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-4"
        } group-hover:text-blue-600`}
      >
        LearnHub
      </span>
    </Link>
  </div>

  {/* Nav Links */}
  <nav className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
    {links.map((link) => {
      const isActive = pathname === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className={`
            flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group
            ${isActive 
              ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm shadow-blue-50" 
              : "text-slate-500 hover:text-blue-600 hover:bg-slate-50 border border-transparent"}
            ${isHovered ? "justify-start" : "justify-center"}
          `}
        >
          {/* Icon Color Changed from Orange to Blue */}
          <span className={`material-symbols-outlined text-[22px] shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}`}>
            {link.icon}
          </span>
          <span className={`whitespace-nowrap transition-all duration-300 ${isHovered ? "w-auto opacity-100 visible" : "w-0 opacity-0 invisible"}`}>
            {link.label}
          </span>
          
          {isActive && !isHovered && (
            <div className="absolute right-1 w-1.5 h-1.5 rounded-full bg-blue-600" />
          )}
        </Link>
      );
    })}
  </nav>

  {/* User Profile Section */}
  <div className="p-4 border-t border-blue-50 bg-slate-50/50">
    <div className={`rounded-2xl p-2 transition-all duration-300 ${isHovered ? "bg-white border border-blue-100 shadow-sm" : "bg-transparent border-transparent"}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shrink-0 overflow-hidden shadow-inner">
          {session?.user?.image ? (
            <Image src={session.user.image} alt="profile" width={40} height={40} className="w-full h-full object-cover" />
          ) : (
            <span className="text-base">{userInitial}</span>
          )}
        </div>
        
        <div className={`flex-1 min-w-0 transition-all duration-300 ${isHovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"}`}>
          <p className="text-sm font-bold text-slate-800 truncate leading-tight">
            {session?.user?.name} 
          </p>
          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-0.5">
            {role}
          </p>
        </div>
      </div>

      <div className={`space-y-1 mt-3 transition-all duration-500 ${isHovered ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}`}>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">logout</span>
          Sign Out
        </button>
      </div>
    </div>
  </div>
</div>
  );
}