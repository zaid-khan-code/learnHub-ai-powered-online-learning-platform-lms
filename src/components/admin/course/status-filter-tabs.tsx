"use client";

interface StatusFilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const tabs = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Unpublished", value: "unpublished" },
  { label: "Draft", value: "draft" },
];

export function StatusFilterTabs({ value, onChange }: StatusFilterTabsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap bg-slate-50/50 p-1.5 rounded-2xl border border-blue-50 w-fit">
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