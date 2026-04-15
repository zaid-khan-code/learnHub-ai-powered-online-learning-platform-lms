"use client";

import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface UnpublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: any;
  onConfirm: () => void;
}

export function UnpublishDialog({
  open,
  onOpenChange,
  course,
  onConfirm,
}: UnpublishDialogProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setPortalContainer(document.body);
    return () => setPortalContainer(null);
  }, []);

  if (!open || !course || !portalContainer) return null;

  const DialogContent = () => (
    <>
      {/* Clean Blur Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[99] animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal Container */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl border border-amber-100 p-6 z-[100] animate-slide-up shadow-xl shadow-amber-500/5"
        style={{
          position: "fixed",
          maxWidth: "448px",
          width: "calc(100% - 32px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl text-amber-600">
              visibility_off
            </span>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-800">
              Unpublish Course?
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Students won't be able to access this course.
            </p>
          </div>
        </div>

        {/* Course Details Box */}
        <div className="rounded-xl border border-slate-100 p-4 mb-6 bg-slate-50">
          <div className="flex items-center gap-3">
            {/* Course Icon */}
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold shadow-sm shrink-0">
              {course.title.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 truncate">
                {course.title}
              </p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {course.students || 0} enrolled students
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl font-bold transition-colors shadow-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1 bg-amber-500 text-white hover:bg-amber-600 rounded-xl font-bold shadow-md shadow-amber-200 transition-all hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px] mr-2">
              visibility_off
            </span>
            Unpublish
          </Button>
        </div>
      </div>
    </>
  );

  return createPortal(<DialogContent />, portalContainer);
}