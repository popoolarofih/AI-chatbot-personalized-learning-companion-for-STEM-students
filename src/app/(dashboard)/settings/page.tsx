'use client';

import React from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-[#95a0c6]">Manage your account and preferences.</p>
      </div>

      <div className="bg-white dark:bg-[#1a2033] rounded-xl border border-slate-200 dark:border-[#252d46] p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium dark:text-white">Account</h3>
          <p className="text-sm text-slate-500">Sign out of your session.</p>
          <button
            onClick={handleSignOut}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-[#252d46]">
          <h3 className="text-lg font-medium dark:text-white">Preferences</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700 dark:text-slate-300">Dark Mode</span>
              <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">dark_mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
