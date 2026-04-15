"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface UserSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function UserSearchBar({
  value,
  onChange,
  placeholder = "Search by name or email...",
  debounceMs = 300,
}: UserSearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative max-w-md group w-full">
  {/* Search Icon */}
  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400 transition-colors duration-300 group-focus-within:text-blue-600 z-10 pointer-events-none">
    search
  </span>
  
  {/* Input Field */}
  <Input
    type="text"
    placeholder={placeholder}
    value={localValue}
    onChange={(e) => setLocalValue(e.target.value)}
    className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-4 focus-visible:ring-blue-50 focus-visible:border-blue-400 pl-11 pr-10 h-11 rounded-xl transition-all duration-300 group-focus-within:shadow-sm font-medium"
  />
  
  {/* Clear Button */}
  {localValue && (
    <button
      type="button"
      onClick={() => {
        setLocalValue("");
        onChange("");
      }}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:scale-105 z-10"
      aria-label="Clear search"
    >
      <span className="material-symbols-outlined text-[18px]">close</span>
    </button>
  )}
</div>
  );
}
