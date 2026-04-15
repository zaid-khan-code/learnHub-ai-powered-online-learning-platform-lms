interface StatsOverviewProps {
  stats: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: "group",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
      borderColor: "border-blue-500/30",
    },
    {
      label: "Total Courses",
      value: stats.totalCourses.toLocaleString(),
      icon: "menu_book",
      color: "text-primary",
      bgColor: "bg-primary/10",
      glowColor: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      borderColor: "border-primary/30",
    },
    {
      label: "Total Enrollments",
      value: stats.totalEnrollments.toLocaleString(),
      icon: "assignment",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
      borderColor: "border-purple-500/30",
    },
    {
      label: "Total Revenue",
      value: `Rs. ${(stats.totalRevenue / 1000).toFixed(0)}K`,
      icon: "attach_money",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      glowColor: "shadow-[0_0_30px_rgba(34,197,94,0.3)]",
      borderColor: "border-green-500/30",
    },
  ];

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {statCards.map((stat, index) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-blue-50 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
    >
      {/* Soft Blue Gradient Hover Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Blue Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-500 text-sm font-bold tracking-tight uppercase group-hover:text-blue-600 transition-colors">
            {stat.label}
          </span>
          
          {/* Icon Box: Purana primary color hata kar clean blue gradients use kiye hain */}
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-sm">
            <span className="material-symbols-outlined text-2xl">
              {stat.icon}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-3xl font-extrabold text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors">
            {stat.value}
          </p>
          
          {/* Subtle Indicator Line Under Value */}
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1.5 w-12 rounded-full bg-blue-100 overflow-hidden">
              <div className="h-full w-0 group-hover:w-full bg-blue-600 transition-all duration-700 ease-out" />
            </div>
            <span className="text-[10px] text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Live Data
            </span>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}
