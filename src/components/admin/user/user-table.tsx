"use client";

import { Button } from "@/components/ui/button";
import { RoleChangeDropdown } from "./role-change-dropdown";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Instructor" | "Admin";
  joinDate: string;
  status: "Active" | "Banned";
  avatar: string | null;
}

interface UserTableProps {
  users: User[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRoleChange: (userId: string, newRole: string) => void;
  onBanUser: (user: User) => void;
}

export function UserTable({
  users,
  totalUsers,
  currentPage,
  totalPages,
  onPageChange,
  onRoleChange,
  onBanUser,
}: UserTableProps) {
  
  // ✅ FIX: Clean Light Theme Badges (No Orange Glows)
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Student":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Instructor":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Admin":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

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
                User
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                Email
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                Role
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                Join Date
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-slate-300">
                        group_off
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">No users found</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50/50 transition-colors duration-200 group/row"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar without glowing shadows */}
                      <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0 group-hover/row:bg-blue-600 group-hover/row:text-white transition-all duration-300 overflow-hidden shadow-sm">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-800 truncate max-w-[150px] group-hover/row:text-blue-600 transition-colors">
                          {user.name}
                        </p>
                        <p className="text-xs font-medium text-slate-500 md:hidden mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 hidden md:table-cell">
                    {user.email}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-300 ${getRoleBadgeStyle(user.role)}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current" />
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                      <span className="material-symbols-outlined text-[14px] text-blue-500">
                        calendar_today
                      </span>
                      {formatDate(user.joinDate)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-300 ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <RoleChangeDropdown
                        currentRole={user.role}
                        userId={user.id}
                        onRoleChange={onRoleChange}
                        disabled={user.role === "Admin"}
                      />
                      
                      {/* Ban/Unban Button - Adapted for Light Mode */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBanUser(user)}
                        className={`border rounded-lg transition-all duration-300 hover:scale-105 shadow-sm ${
                          user.status === "Active"
                            ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                            : "border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {user.status === "Active" ? "block" : "check_circle"}
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
              {Math.min(currentPage * 20, totalUsers)}
            </span>{" "}
            of <span className="text-blue-600 font-bold">{totalUsers}</span>{" "}
            users
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