import React from 'react';

interface SidebarItem {
  id: string;
  name: string;
  icon: string;
}

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const sidebarItems: SidebarItem[] = [
    { id: 'overview', name: 'Overview', icon: 'dashboard' },
    { id: 'posts', name: 'Post Moderation', icon: 'edit_note' },
    { id: 'reports', name: 'Reports', icon: 'gavel' },
    { id: 'users', name: 'User Management', icon: 'group' },
    { id: 'verifications', name: 'Artisan Verification', icon: 'verified' },
    { id: 'categories', name: 'Category Management', icon: 'category' },
    { id: 'activity', name: 'Platform Activity', icon: 'receipt_long' },
  ];

  return (
    <div className="w-full">
      {/* Desktop Sidebar Layout */}
      <aside className="hidden md:flex flex-col gap-2 p-6 bg-white dark:bg-surface-container-low rounded-[24px] border border-outline-variant/20 shadow-sm sticky top-28 w-full">
        <div className="mb-6 px-4">
          <h3 className="font-title-lg text-title-lg text-tertiary font-serif font-bold">Admin Console</h3>
          <p className="text-[12px] text-on-surface-variant font-medium mt-1">Platform Moderator</p>
        </div>
        <nav className="flex flex-col gap-1 w-full">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left w-full font-label-md text-label-md ${
                  isActive
                    ? 'bg-tertiary/10 text-tertiary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-variant/30'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Tab Bar Layout */}
      <div className="md:hidden w-full bg-white dark:bg-surface-container-low border-b border-outline-variant/20 py-2.5 overflow-x-auto scrollbar-none sticky top-16 z-30">
        <nav className="flex px-4 gap-2 min-w-max">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-[13px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-tertiary text-white font-bold shadow-sm'
                    : 'bg-surface-container/40 text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
