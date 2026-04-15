"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

interface RoleChangeDropdownProps {
  currentRole: string;
  userId: string;
  onRoleChange: (userId: string, newRole: string) => void;
  disabled?: boolean;
}

export function RoleChangeDropdown({
  currentRole,
  userId,
  onRoleChange,
  disabled,
}: RoleChangeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const roles = ["Student", "Instructor", "Admin"];

  const handleSelect = (newRole: string) => {
    onRoleChange(userId, newRole);
    setIsOpen(false);
  };

  // Set portal container after mount
  useEffect(() => {
    setPortalContainer(document.body);
    return () => setPortalContainer(null);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const DropdownContent = () => {
    if (!buttonRef.current) return null;

    const buttonRect = buttonRef.current.getBoundingClientRect();

    return (
    <div
        ref={dropdownRef}
        className="bg-white rounded-xl border border-blue-100 overflow-hidden z-[100] shadow-xl shadow-blue-900/5 animate-slide-up"
        style={{
          position: "fixed",
          top: buttonRect.bottom + window.scrollY + 8,
          left: buttonRect.right - 160 + window.scrollX,
          width: "160px",
          minWidth: "160px",
        }}
      >
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelect(role)}
            disabled={role === currentRole}
            className={`
              w-full text-left px-4 py-2.5 text-sm transition-all duration-300
              ${
                role === currentRole
                  ? "bg-blue-50 text-blue-700 font-bold cursor-default border-l-2 border-blue-600"
                  : "text-slate-600 font-medium hover:bg-slate-50 hover:text-blue-600 border-l-2 border-transparent"
              }
            `}
          >
            {role}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative cursor-pointer">
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`bg-white border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 disabled:opacity-50 shadow-sm rounded-lg transition-all duration-300 ${isOpen ? "border-blue-200 bg-blue-50 text-blue-600" : ""}`}
      >
        <span className="material-symbols-outlined text-[18px] mr-1.5 text-blue-500">badge</span>
        <span className="font-semibold">{currentRole}</span>
        <span className={`material-symbols-outlined text-[18px] ml-1 transition-transform duration-300 text-slate-400 ${isOpen ? "rotate-180 text-blue-500" : ""}`}>
          expand_more
        </span>
      </Button>

      {isOpen &&
        portalContainer &&
        createPortal(<DropdownContent />, portalContainer)}
    </div>
  );
  
}
