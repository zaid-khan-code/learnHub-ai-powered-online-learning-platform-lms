"use client";

interface RoleFilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const tabs = [
  { label: "All", value: "all" },
  { label: "Students", value: "student" },
  { label: "Instructors", value: "instructor" },
  { label: "Admins", value: "admin" },
];

export function RoleFilterTabs({ value, onChange }: RoleFilterTabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-6 bg-slate-50/50 p-1.5 rounded-2xl border border-blue-50 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
            value === tab.value
              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}