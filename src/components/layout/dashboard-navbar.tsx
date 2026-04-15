  "use client";

  import { Button } from "@/components/ui/button";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
  import { DashboardSidebar } from "./dashboard-sidebar";

  interface DashboardNavbarProps {
    title: string;
    role: "student" | "instructor" | "admin";
    // ✅ Ye props add karna zaroori hain taake parent page se link ho sakein
    sidebarOpen?: boolean;
    setSidebarOpen?: (open: boolean) => void;
  }

  export function DashboardNavbar({ 
    title, 
    role, 
    sidebarOpen, 
    setSidebarOpen 
  }: DashboardNavbarProps) {
    return (
     <header className="h-16 border-b border-blue-50 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm">
  <div className="flex items-center gap-4">
    {/* ✅ Mobile Menu Trigger */}
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg"
        >
          <span className="material-symbols-outlined">menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] p-0 bg-white border-r border-blue-50"
      >
        {/* Sidebar content */}
        <DashboardSidebar 
          role={role} 
          onClose={() => setSidebarOpen?.(false)} 
        />
      </SheetContent>
    </Sheet>

    {/* ✅ Title: Desktop aur Mobile dono par clean dikhega */}
    <div className="flex flex-col">
      <h1 className="font-extrabold text-lg md:text-xl text-slate-800 truncate max-w-[200px] md:max-w-none tracking-tight">
        {title}
      </h1>
      {/* Mobile-only sub-indicator (Optional) */}
      <span className="md:hidden text-[10px] text-blue-500 font-bold uppercase tracking-widest leading-none">
        {role}
      </span>
    </div>
  </div>

  {/* Right Side: Role Badge */}
  <div className="flex items-center gap-3">
    {/* Desktop Only Badge - Replaced Orange with Blue */}
    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
      {role}
    </div>

    {/* User Avatar Short-cut (Optional but looks good) */}
    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 md:hidden">
      <span className="material-symbols-outlined text-xl">account_circle</span>
    </div>
  </div>
</header>
    );
  }