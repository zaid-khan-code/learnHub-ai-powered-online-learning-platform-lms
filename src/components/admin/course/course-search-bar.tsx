"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface CourseSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function CourseSearchBar({
  value,
  onChange,
  placeholder = "Search by course title...",
  debounceMs = 300,
}: CourseSearchBarProps) {
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
  <span className="material-symbols-outlined text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] transition-colors duration-300 group-focus-within:text-blue-500 z-10 pointer-events-none">
    search
  </span>
  
  {/* Input Field */}
  <Input
    type="text"
    placeholder={placeholder || "Search..."}
    value={localValue}
    onChange={(e) => setLocalValue(e.target.value)}
    className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-4 focus-visible:ring-blue-500/10 focus-visible:border-blue-400 pl-11 pr-10 h-11 transition-all duration-300 shadow-sm hover:border-slate-300"
  />
  
  {/* Clear Button */}
  {localValue && (
    <button
      type="button"
      onClick={() => {
        setLocalValue("");
        onChange("");
      }}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Clear search"
    >
      <span className="material-symbols-outlined text-[18px] block">close</span>
    </button>
  )}
</div>
  );
}
