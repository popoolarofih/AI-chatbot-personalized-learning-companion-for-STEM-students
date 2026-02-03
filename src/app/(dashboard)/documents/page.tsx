export default function DocumentsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">My Documents</h1>
        <p className="text-slate-500 dark:text-[#95a0c6]">Manage and analyze your study materials.</p>
      </div>

      <div className="p-12 border-2 border-dashed border-slate-300 dark:border-[#252d46] rounded-xl bg-white/50 dark:bg-[#1a2033] text-center">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
          <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
        </div>
        <h3 className="text-lg font-bold dark:text-white">No documents yet</h3>
        <p className="text-slate-500 dark:text-[#95a0c6] text-sm">Upload files in the AI Tutor to see them here.</p>
      </div>
    </div>
  );
}
