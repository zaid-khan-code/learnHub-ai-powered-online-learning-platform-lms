import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { RecentCourseDTO } from "@/types/dashboard";

interface DisplayCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  status: "Published" | "Draft";
  createdDate: string;
  students: number;
}

function toDisplayCourse(c: RecentCourseDTO): DisplayCourse {
  return {
    id: c.id,
    title: c.title,
    instructor: c.instructorName || "Unknown",
    category: c.category,
    status: c.isPublished ? "Published" : "Draft",
    createdDate: new Date(c.createdAt).toLocaleDateString(),
    students: 0,
  };
}

export function RecentCoursesTable({ courses }: { courses: RecentCourseDTO[] }) {
  const displayCourses = courses.map(toDisplayCourse);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
   <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow duration-300">
  
  {/* Header Section */}
  <div className="p-5 border-b border-blue-50 flex items-center justify-between relative bg-white">
    <div className="flex items-center gap-4">
      {/* Blue Icon Box */}
      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-all duration-300">
        <span className="material-symbols-outlined text-2xl">
          menu_book
        </span>
      </div>
      <div>
        <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2 tracking-tight">
          Recent Courses
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
            {displayCourses.length}
          </span>
        </h2>
        <p className="text-xs font-medium text-slate-500 mt-0.5">Last 10 created</p>
      </div>
    </div>
    <Link href="/dashboard/admin/courses">
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-100 text-xs font-bold transition-all rounded-lg"
      >
        View All
        <span className="material-symbols-outlined text-base ml-1 group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </Button>
    </Link>
  </div>

  {/* Table Section */}
  <div className="overflow-x-auto relative bg-white pb-2">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-blue-50 bg-slate-50/50">
          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Course
          </th>
          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
            Instructor
          </th>
          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
            Status
          </th>
          <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
            Students
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-50">
        {displayCourses.map((course, index) => (
          <tr
            key={course.id}
            className="hover:bg-blue-50/50 transition-colors duration-200 group/row"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Course Column */}
            <td className="p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  {/* Avatar/Initial Icon */}
                  <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0 group-hover/row:bg-blue-600 group-hover/row:text-white transition-all duration-300 shadow-sm">
                    {course.title.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-sm text-slate-800 truncate max-w-[180px] group-hover/row:text-blue-600 transition-colors">
                      {course.title}
                    </p>
                    <p className="text-xs font-medium text-slate-500 md:hidden mt-0.5">
                      {course.instructor}
                    </p>
                    {/* Mobile Category Badge */}
                    <div className="sm:hidden mt-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium">
                        <span className="material-symbols-outlined text-[10px]">
                          category
                        </span>
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </td>

            {/* Instructor & Category Column */}
            <td className="p-4 hidden lg:table-cell">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {course.instructor}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium">
                  <span className="material-symbols-outlined text-[12px] text-blue-400">
                    category
                  </span>
                  {course.category}
                </p>
              </div>
            </td>

            {/* Status Column */}
            <td className="p-4 hidden md:table-cell">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-300 hover:scale-105 ${
                  course.status === "Published"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${course.status === "Published" ? "bg-green-500 animate-pulse" : "bg-slate-400"}`}
                />
                {course.status}
              </span>
            </td>

            {/* Students Column */}
            <td className="p-4 hidden sm:table-cell">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shadow-sm text-xs transition-colors group-hover/row:bg-blue-100">
                <span className="material-symbols-outlined text-[14px]">
                  group
                </span>
                <span className="font-extrabold">{course.students}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
