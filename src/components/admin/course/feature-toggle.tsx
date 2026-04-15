"use client";

import { Button } from "@/components/ui/button";

interface FeatureToggleProps {
  isFeatured: boolean;
  courseId: string;
  onToggle: (courseId: string, isFeatured: boolean) => void;
}

export function FeatureToggle({
  isFeatured,
  courseId,
  onToggle,
}: FeatureToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onToggle(courseId, !isFeatured)}
      className={`border rounded-lg transition-all duration-300 hover:scale-105 shadow-sm ${
        isFeatured
          ? "border-amber-200 text-amber-500 bg-amber-50 hover:bg-amber-100"
          : "border-slate-200 text-slate-400 bg-white hover:border-amber-200 hover:text-amber-500 hover:bg-amber-50"
      }`}
      title={isFeatured ? "Remove from featured" : "Feature on landing page"}
    >
      <span
        className={`material-symbols-outlined text-[18px] ${
          isFeatured ? "animate-pulse" : ""
        }`}
      >
        {isFeatured ? "star" : "star_outline"}
      </span>
    </Button>
  );
}