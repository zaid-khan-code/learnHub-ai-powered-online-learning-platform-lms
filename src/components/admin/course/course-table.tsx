"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  status: "Published" | "Unpublished" | "Draft";
  createdDate: string;
  students: number;
  isFeatured: boolean;
}

interface CourseTableProps {
  courses: Course[];
  totalCourses: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onUnpublishClick: (course: Course) => void;
  onDeleteClick: (course: Course) => void;
}

export function CourseTable({
  courses,
  totalCourses,
  currentPage,
  totalPages,
  onPageChange,
  onUnpublishClick,
  onDeleteClick,
}: CourseTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      
      <div className="overflow-x-auto">
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
                Category
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                Created
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                Students
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-slate-300">
                        folder_open
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">No courses found</p>
                  </div>
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr
                  key={course.id}
                  className="hover:bg-blue-50/50 transition-colors duration-200 group/row"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar/Initial Icon */}
                      <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0 group-hover/row:bg-blue-600 group-hover/row:text-white transition-all duration-300 shadow-sm">
                        {course.title.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <Link 
                          href={`/courses/${course.id}`}
                          className="font-bold text-sm text-slate-800 truncate max-w-[200px] group-hover/row:text-blue-600 transition-colors hover:underline cursor-pointer block"
                        >
                          {course.title}
                        </Link>
                        <p className="text-xs font-medium text-slate-500 lg:hidden mt-0.5">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 text-sm font-bold text-slate-800 hidden lg:table-cell">
                    {course.instructor}
                  </td>
                  
                  <td className="p-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium">
                      <span className="material-symbols-outlined text-[10px]">
                        category
                      </span>
                      {course.category}
                    </span>
                  </td>
                  
                  <td className="p-4 text-sm text-slate-600 hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                      <span className="material-symbols-outlined text-[14px] text-blue-500">
                        calendar_today
                      </span>
                      {formatDate(course.createdDate)}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-300 ${
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
                  
                  <td className="p-4 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 shadow-sm text-xs transition-colors group-hover/row:bg-blue-100">
                      <span className="material-symbols-outlined text-[14px]">
                        group
                      </span>
                      <span className="font-extrabold">{course.students}</span>
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUnpublishClick(course)}
                        className={`border rounded-lg transition-all duration-300 hover:scale-105 shadow-sm ${
                          course.status === "Published" 
                            ? "border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300" 
                            : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                        }`}
                        title={course.status === "Published" ? "Unpublish" : "Publish"}
                      >
                        <span className="material-symbols-outlined text-base">
                          {course.status === "Published" ? "visibility_off" : "visibility"}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteClick(course)}
                        className="border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg shadow-sm transition-all duration-300 hover:scale-105"
                        title="Delete Course"
                      >
                        <span className="material-symbols-outlined text-base">
                          delete
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Light Theme */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-blue-50 bg-slate-50/50 gap-4">
          <p className="text-sm font-medium text-slate-500">
            Showing{" "}
            <span className="text-blue-600 font-bold">
              {(currentPage - 1) * 20 + 1}
            </span>{" "}
            to{" "}
            <span className="text-blue-600 font-bold">
              {Math.min(currentPage * 20, totalCourses)}
            </span>{" "}
            of <span className="text-blue-600 font-bold">{totalCourses}</span>{" "}
            courses
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50 rounded-lg shadow-sm"
            >
              <span className="material-symbols-outlined text-base">
                chevron_left
              </span>
            </Button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 disabled:opacity-50 rounded-lg shadow-sm"
            >
              <span className="material-symbols-outlined text-base">
                chevron_right
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}