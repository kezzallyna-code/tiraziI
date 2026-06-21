import React from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  artisanName: string;
  image: string;
}

export function GuestProjectPreview({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-primary/5 shadow-sm hover:shadow-md flex flex-col group hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-surface-container">
        <img alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={project.image}/>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5">{project.category}</span>
        <h4 className="font-title-md text-title-md text-on-surface mb-2 font-bold line-clamp-1">{project.title}</h4>
        <p className="text-[12px] text-on-surface-variant flex items-center gap-1.5 mt-auto">
          <span className="material-symbols-outlined text-[16px] text-outline">person</span>
          By {project.artisanName}
        </p>
      </div>
    </div>
  );
}
