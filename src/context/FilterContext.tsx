'use client';

import React, { createContext, useContext, useState } from 'react';

type Subject = 'All' | 'Math' | 'Physics' | 'CS';

interface FilterContextType {
  selectedSubject: Subject;
  setSelectedSubject: (subject: Subject) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('All');

  return (
    <FilterContext.Provider value={{ selectedSubject, setSelectedSubject }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
