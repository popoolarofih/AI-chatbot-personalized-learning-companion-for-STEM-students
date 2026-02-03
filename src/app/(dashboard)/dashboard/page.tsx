export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <p className="text-slate-500 dark:text-[#95a0c6]">Welcome back! Here&apos;s your learning progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a2033] p-6 rounded-xl border border-slate-200 dark:border-[#252d46]">
          <h3 className="text-sm font-bold text-slate-400 uppercase">XP Gained</h3>
          <p className="text-3xl font-black dark:text-white mt-2">+1,240</p>
        </div>
        <div className="bg-white dark:bg-[#1a2033] p-6 rounded-xl border border-slate-200 dark:border-[#252d46]">
          <h3 className="text-sm font-bold text-slate-400 uppercase">Documents Analyzed</h3>
          <p className="text-3xl font-black dark:text-white mt-2">12</p>
        </div>
        <div className="bg-white dark:bg-[#1a2033] p-6 rounded-xl border border-slate-200 dark:border-[#252d46]">
          <h3 className="text-sm font-bold text-slate-400 uppercase">Current Level</h3>
          <p className="text-3xl font-black dark:text-white mt-2">Level 4</p>
        </div>
      </div>
    </div>
  );
}
