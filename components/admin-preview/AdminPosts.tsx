import React, { useState } from 'react';

interface PostItem {
  id: string;
  preview: string;
  author: string;
  date: string;
  appreciations: number;
  commentsCount: number;
  status: 'Visible' | 'Hidden';
}

export function AdminPosts({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [posts, setPosts] = useState<PostItem[]>([
    { id: "post-1", preview: "Just finalized the sample templates for our upcoming Mediterranean collection...", author: "Leila Belkacem", date: "2 hours ago", appreciations: 24, commentsCount: 2, status: "Visible" },
    { id: "post-2", preview: "Spent the morning adjusting the draping on a traditional Karakou jacket...", author: "Master Amine", date: "Yesterday", appreciations: 42, commentsCount: 1, status: "Visible" },
    { id: "post-3", preview: "Our showroom in Algiers is finally redesigned to highlight the work of local weavers...", author: "Zahra Benali", date: "3 days ago", appreciations: 56, commentsCount: 0, status: "Visible" },
  ]);

  const toggleHide = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Visible' ? 'Hidden' : 'Visible';
        triggerToast(`Post status set to ${nextStatus}.`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleRemove = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setPosts(prev => prev.filter(p => p.id !== id));
      triggerToast("Post removed successfully.");
    }
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Community Posts Moderation</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Audit public posts, check community reaction counts, and hide reported spam.</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">Post Preview</th>
              <th className="pb-3">Author</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-center">Appreciations</th>
              <th className="pb-3 text-center">Comments</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 max-w-[240px] truncate text-[13px] italic text-on-surface-variant">"{post.preview}"</td>
                <td className="py-4 font-bold">{post.author}</td>
                <td className="py-4 text-on-surface-variant">{post.date}</td>
                <td className="py-4 text-center font-mono">{post.appreciations}</td>
                <td className="py-4 text-center font-mono">{post.commentsCount}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    post.status === 'Visible' ? 'bg-green-100 text-green-800' : 'bg-outline-variant/40 text-on-surface-variant/70'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2 space-x-1">
                  <button 
                    onClick={() => triggerToast("Admin action preview only.")}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => toggleHide(post.id)}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    {post.status === 'Visible' ? 'Hide' : 'Show'}
                  </button>
                  <button 
                    onClick={() => handleRemove(post.id)}
                    className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-[12px] font-bold text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
