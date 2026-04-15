import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { RecentUserDTO } from "@/types/dashboard";

interface DisplayUser {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: "Active" | "Banned";
}

function toDisplayUser(u: RecentUserDTO): DisplayUser {
  return {
    id: u.id,
    name: u.name || "Unknown",
    email: u.email,
    role: u.role.charAt(0) + u.role.slice(1).toLowerCase(),
    joinDate: new Date(u.createdAt).toLocaleDateString(),
    status: "Active",
  };
}

export function RecentUsersTable({ users }: { users: RecentUserDTO[] }) {
  const displayUsers = users.map(toDisplayUser);
  
  // ✅ FIX: Removed orange/primary colors and glowing shadows. Added clean soft colors.
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Student":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Instructor":
        return "bg-indigo-50 text-indigo-700 border-indigo-200"; // Indigo looks premium with Blue
      case "Admin":
        return "bg-rose-50 text-rose-700 border-rose-200"; // Soft red for admin
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
    <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Header Section */}
      <div className="p-5 border-b border-blue-50 flex items-center justify-between relative bg-white">
        <div className="flex items-center gap-4">
          {/* Blue Icon Box */}
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-all duration-300">
            <span className="material-symbols-outlined text-2xl">
              group
            </span>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2 tracking-tight">
              Recent Users
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                {displayUsers.length}
              </span>
            </h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Last 10 registrations
            </p>
          </div>
        </div>
        
        <Link href="/dashboard/admin/users">
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
                User
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                Role
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                Joined
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {displayUsers.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-blue-50/50 transition-colors duration-200 group/row"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* User Info Column */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar: Clean Blue */}
                    <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0 group-hover/row:bg-blue-600 group-hover/row:text-white transition-all duration-300 shadow-sm">
                      {user.name.charAt(0)}
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

                {/* Role Column */}
                <td className="p-4 hidden md:table-cell">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-300 ${getRoleBadgeStyle(user.role)}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current" />
                    {user.role}
                  </span>
                </td>

                {/* Joined Date Column */}
                <td className="p-4 hidden sm:table-cell">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600">
                    <span className="material-symbols-outlined text-[14px] text-blue-500">
                      calendar_today
                    </span>
                    {formatDate(user.joinDate)}
                  </span>
                </td>

                {/* Status Column */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}