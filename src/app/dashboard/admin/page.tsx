import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

// Components
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { StatsOverview } from "@/components/admin/stats-overview";
import { RecentUsersTable } from "@/components/admin/recent-users-table";
import { RecentCoursesTable } from "@/components/admin/recent-courses-table";

// Actions
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
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-300/10 rounded-full blur-[120px] pointer-events-none" 
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
      {/* ===== END BACKGROUND EFFECTS ===== */}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-fit flex-shrink-0 relative z-20 border-r border-blue-100 bg-white/80 backdrop-blur-md">
        <DashboardSidebar role="admin" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Navbar */}
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

            {/* Stats Overview */}
            <div className="relative">
              <StatsOverview stats={stats} />
            </div>

            {/* Tables Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <RecentUsersTable users={recentUsers} />
              </div>

              <div className="bg-white rounded-2xl border border-blue-50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <RecentCoursesTable courses={recentCourses} />
              </div>
            </div>

            {/* ===== NEW: Analytics & Quick Actions Section ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
              
              {/* Analytics Chart Section */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-50 shadow-sm p-5 md:p-7 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">insights</span>
                      </div>
                      Platform Activity
                    </h2>
                    <p className="text-sm font-medium text-slate-500 mt-1.5 ml-1">
                      User engagement and growth over time
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all cursor-pointer">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Year</option>
                    </select>
                    <button className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center group">
                      <span className="material-symbols-outlined text-[20px] group-hover:-translate-y-0.5 transition-transform">
                        download
                      </span>
                    </button>
                  </div>
                </div>

                {/* Chart Placeholder Area */}
                <div className="w-full h-[250px] md:h-[350px] rounded-xl bg-slate-50 border-2 border-slate-100 border-dashed flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-blue-50/50 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-40" />
                  <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 text-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:text-blue-600 group-hover:shadow-lg transition-all duration-300 relative z-10 shadow-sm">
                    <span className="material-symbols-outlined text-4xl">bar_chart</span>
                  </div>
                  <p className="text-slate-700 font-extrabold relative z-10">Insert Your Chart Here</p>
                  <p className="text-slate-400 text-xs font-semibold relative z-10 mt-1">Recommended: Recharts Line/Area Chart</p>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5 md:p-7 flex flex-col hover:shadow-md transition-shadow duration-300">
                <div className="mb-6">
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner">
                      <span className="material-symbols-outlined text-[22px]">bolt</span>
                    </div>
                    Quick Actions
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-1.5 ml-1">
                    Manage platform settings
                  </p>
                </div>

                <div className="flex-1 space-y-3">
                  {[
                    { label: "Add New User", icon: "person_add", color: "blue", desc: "Create an admin or instructor" },
                    { label: "Create Course", icon: "add_circle", color: "blue", desc: "Setup a new learning module" },
                    { label: "System Reports", icon: "summarize", color: "slate", desc: "Download weekly PDF reports" },
                    { label: "Settings", icon: "settings", color: "slate", desc: "Global platform configurations" }
                  ].map((action, i) => (
                    <button 
                      key={i}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all group text-left"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-${action.color}-50 flex items-center justify-center text-${action.color}-600 group-hover:scale-110 transition-transform shrink-0`}>
                        <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                      </div>
                      <div>
                        <p className={`font-bold text-sm text-slate-800 group-hover:text-${action.color}-700 transition-colors`}>
                          {action.label}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                          {action.desc}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 ml-auto group-hover:translate-x-1 group-hover:text-blue-500 transition-all">
                        chevron_right
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
            {/* ===== END NEW SECTION ===== */}

          </div>
        </div>
      </div>
    </div>
  );
}