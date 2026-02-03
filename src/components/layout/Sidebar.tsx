'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFilter } from '@/context/FilterContext';
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
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'My Documents', href: '/documents' },
  { icon: BrainCircuit, label: 'AI Tutor', href: '/ai-tutor' },
  { icon: BookOpen, label: 'Practice Sets', href: '/practice-sets' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { selectedSubject, setSelectedSubject } = useFilter();

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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                      ? "bg-primary/10 text-primary dark:bg-primary dark:text-white"
                    : "text-slate-600 dark:text-[#95a0c6] hover:bg-slate-100 dark:hover:bg-[#252d46]"
                )}
              >
                <item.icon size={20} />
                <p className="text-sm font-medium">{item.label}</p>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4">
          <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Subject Filters</p>
          <div className="flex flex-col gap-1">
            {['All', 'Math', 'Physics', 'CS'].map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject as 'All' | 'Math' | 'Physics' | 'CS')}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  selectedSubject === subject
                    ? "bg-slate-200 dark:bg-[#252d46] text-primary dark:text-white"
                    : "text-slate-600 dark:text-[#95a0c6] hover:bg-slate-100 dark:hover:bg-[#252d46]"
                )}
              >
                <span className={cn(
                  "size-2 rounded-full",
                  subject === 'All' && "bg-slate-400",
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
