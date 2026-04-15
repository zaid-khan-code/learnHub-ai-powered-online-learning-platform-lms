import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

// Components
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { StatsOverview } from "@/components/admin/stats-overview";
import { RecentUsersTable } from "@/components/admin/recent-users-table";
import { RecentCoursesTable } from "@/components/admin/recent-courses-table";

// ✅ Sirf aapke maujooda actions use ho rahe hain
import { getAllCourses, getAllUsers } from "@/server/action";

export default async function AdminOverviewPage() {
  // 1. Auth & Role Check
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  // 2. Data Fetching (stats only, fetch small page)
  const [coursesRes, usersRes] = await Promise.all([
    getAllCourses(1, 100),
    getAllUsers(1, 100),
  ]);

  const dbCourses = (coursesRes.success && coursesRes.data ? coursesRes.data.items : []) ?? [];
  const dbUsers = (usersRes.success && usersRes.data ? usersRes.data.items : []) ?? [];

  // 3. Stats Calculation (Bina alag action ke)
  const stats = {
    totalUsers: dbUsers.length,
    totalCourses: dbCourses.length,
    totalEnrollments: 0, // Iske liye enrollment table ka action chahiye hoga baad mein
    totalRevenue: dbCourses.reduce(
      (acc: number, curr: { price?: number }) => acc + (curr.price || 0),
      0,
    ), // Base calculation
  };

  // Recent data for tables (Top 5)
  const recentUsers = dbUsers.slice(0, 5);
  const recentCourses = dbCourses.slice(0, 5);

  return (
   <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
  {/* ===== BACKGROUND EFFECTS (Blue & White Theme) ===== */}
  {/* Soft Blue Glows */}
  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
  <div 
    className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-300/10 rounded-full blur-[120px] pointer-events-none" 
    style={{ animationDelay: "1s" }}
  />
  {/* Subtle Grid Pattern for Texture */}
  <div className="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
  {/* ===== END BACKGROUND EFFECTS ===== */}

  {/* Desktop Sidebar */}
  <div className="hidden md:block w-fit flex-shrink-0 relative z-20 border-r border-blue-100 bg-white/80 backdrop-blur-md">
    <DashboardSidebar role="admin" />
  </div>

  {/* Main Content Area */}
  <div className="flex-1 flex flex-col overflow-hidden relative z-10">
    {/* Navbar with subtle shadow */}
    <div className="bg-white/70 backdrop-blur-md border-b border-blue-100">
      <DashboardNavbar title="Platform Overview" role="admin" />
    </div>

    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="w-full px-4 md:px-8 py-6 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-blue-200 shadow-lg">
                <span className="material-symbols-outlined text-white block">
                  dashboard
                </span>
              </div>
              Platform Overview
            </h1>
            <p className="text-slate-500 text-sm md:text-base ml-1">
              Monitor platform health and recent activity
            </p>
          </div>

          {/* System Status Badge */}
          <div className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm transition-all hover:shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-blue-700 font-semibold tracking-wide uppercase">
              System Healthy
            </span>
          </div>
        </div>

        {/* Stats Overview (Pass props as needed) */}
        <div className="relative">
          <StatsOverview stats={stats} />
        </div>

        {/* Tables Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          {/* Recent Users Table Container */}
          <div className="bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <RecentUsersTable users={recentUsers} />
          </div>

          {/* Recent Courses Table Container */}
          <div className="bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <RecentCoursesTable courses={recentCourses} />
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  );
}
