import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { getAllCoursesWithEnrollments } from "@/server/action";
import CourseManagementClient from "./course-management-client";

export default async function AdminCoursesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Strict Role Check
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard/student");
  }

  const response = await getAllCoursesWithEnrollments(1, 100);
  const dbCourses = (response.success && response.data ? response.data.items : []) ?? [];

  const formattedCourses = dbCourses.map((course: any) => ({
    id: course.id,
    title: course.title,
    instructor: course.instructor?.name || "Unknown",
    category: course.category,
    status: course.isPublished ? "Published" : "Unpublished",
    createdDate: new Date(course.createdAt).toLocaleDateString(),
    students: course.students || 0,
    isFeatured: false,
  }));

  return (<div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
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
    {/* Navbar with subtle border and blur */}
    <div className="bg-white/70 backdrop-blur-md border-b border-blue-100">
      <DashboardNavbar title="Course Management" role="admin" />
    </div>

    {/* Scrollable Content Area */}
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {/* Container aligned with the new padding & spacing rules */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
        <CourseManagementClient initialCourses={formattedCourses} />
      </div>
    </div>
  </div>
</div>
  );
}
