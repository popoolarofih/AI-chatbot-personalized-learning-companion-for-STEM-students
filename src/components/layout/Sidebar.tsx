'use client';

import React from 'react';
import {
  School,
  LayoutDashboard,
  FileText,
  BrainCircuit,
  BookOpen,
  Settings,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  { icon: FileText, label: 'My Documents', href: '#', active: true },
  { icon: BrainCircuit, label: 'AI Tutor', href: '#' },
  { icon: BookOpen, label: 'Practice Sets', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-[#252d46] bg-slate-50 dark:bg-[#111521] flex flex-col justify-between p-4 h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
            <School className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-none dark:text-white">STEM Companion</h1>
            <p className="text-slate-500 dark:text-[#95a0c6] text-xs mt-1">University Account</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                item.active
                    ? "bg-primary/10 text-primary dark:bg-primary dark:text-white"
                  : "text-slate-600 dark:text-[#95a0c6] hover:bg-slate-100 dark:hover:bg-[#252d46]"
              )}
            >
              <item.icon size={20} />
              <p className="text-sm font-medium">{item.label}</p>
            </a>
          ))}
        </nav>

        <div className="mt-4">
          <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Subject Filters</p>
          <div className="flex flex-col gap-1">
            {['Math', 'Physics', 'CS'].map((subject) => (
              <button
                key={subject}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-[#95a0c6] hover:bg-slate-100 dark:hover:bg-[#252d46]"
              >
                <span className={cn(
                  "size-2 rounded-full",
                  subject === 'Math' && "bg-accent-blue",
                  subject === 'Physics' && "bg-accent-purple",
                  subject === 'CS' && "bg-green-500"
                )}></span>
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">
        <Star size={16} />
        <span className="truncate">Upgrade Pro</span>
      </button>
    </aside>
  );
};
