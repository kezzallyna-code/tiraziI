import React, { useState } from 'react';

interface PostItem {
  id: string;
  author: string;
  avatar: string;
  specialization: string;
  date: string;
  text: string;
  image?: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden' | 'removed';
}

export function AdminPostModeration({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: "mod-post-1",
      author: "Leila Belkacem",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2_x3_d3fVvyfHmnTf9fgvjmwC81AdX3f4JADyna4UXNNDoa9V1sUEQHWINsexZUMDixO7iZAbFXpFardkBjutDk8WcuQeqPDdqD3Uezidv6ERUlKShh1oKH15AAha-fLMeYY3NgXAxrnq5X-yl99hkJ6GJixSKAT1CAoHK5xMpKZGaMuz1KzmY8-6WskzJIyvFPNcL3XBlPCA567Jv1HALykY7BJDjZV0e4Xoa_YjUFRexhnb88GErM9c2T4CaVfquy1zZb9TsTc",
      specialization: "Modern Kabyle Designer",
      date: "2 hours ago",
      text: "Just finalized the sample templates for our upcoming Mediterranean collection. We are weaving traditional Amazigh symbols into contemporary wool capes.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqmR38wKUArH1jCI6hvkULy8Krkd9kcXLt7w89-lyhohqe3Yj5cgDpVY_xsxcJSnsKMwGbrsNZNQ7ORsMRlAj-jfdIswL3diyPgJLOv8AXUHHGkY1I-9Ee6qEnxUOZaIUZ_RBgjSDtbVkRZyhX2gPsHvbyUjfoHYbGtrLrbPIASoE1qI2eWqthbNViYeVluUhBMCWVVCAhlmlb2oM4gsHpTsw7-IrZtgsICGoqq50kHm1cj8fBn0t-i3VaOut4BdR_9P1n_pQPmVs",
      status: "approved"
    },
    {
      id: "mod-post-2",
      author: "Yasmine Oualid",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAItdWOY1pa8uzAkEWfvWhanlTiXv9DAoduMTmWyO3IE6RDN82XvD58K4_6SF-C86dsaKsAaGQ2dClIuJ7vsSpIdt_g5-vXTTazjbv1k5ROJmzUobVENKACilTR0qMVo_fbj6g_2lfu5jsinhuT-uOtT4_-1_elVDRy9qgoCSDwRerl13FtayNlmGBQeA401jB0e5NI--XWlgcF65mKn3ayMC8HVXAsHIzP_M1Yz2YzYhcwcPpzOFGKEweeMMaeEa4I3vacwU_RRMc",
      specialization: "Embroidery Artist",
      date: "4 hours ago",
      text: "Selling cheap non-textile related duplicate items! Click here to buy quickly!!!",
      status: "pending"
    },
    {
      id: "mod-post-3",
      author: "Sarah Mansouri",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjNQGwW1FtqIG_ah_xaGi5iM0ey8YiUptImzA8i5UWqO6E7ZXIkY50nQYHooP2zEWVNH4VITf8nQ3CYvxG1VRbS0AgIi9SHRUCJBazI4xSuwC68rKyjb_wTuBfxUepqPdczQIEx15cgZV4q3W6F5Si6rInzlRTWD094ovfzwFCUoz9Pd2NVMAlrudU33MrBrutRbcPJUTfq_uF9fTjXvhrrsf4qEFQ9Ux4NgdoWBVdZUQfmqKaZx7Xa61XB8stXzYNkyoza5kBdVI",
      specialization: "Fashion Student",
      date: "1 day ago",
      text: "Unreleased drafts and sketches from the Casbah design challenge. Hoping to collaborate with weavers.",
      status: "hidden"
    },
    {
      id: "mod-post-4",
      author: "Spam Bot",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      specialization: "Marketing Agent",
      date: "2 days ago",
      text: "Casino advertisement links, earn free coins online instantly!",
      status: "removed"
    }
  ]);

  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const updateStatus = (id: string, nextStatus: PostItem['status']) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        triggerToast(`Post ${nextStatus} (preview only).`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleConfirmRemove = () => {
    if (confirmRemoveId) {
      setPosts(prev => prev.map(p => {
        if (p.id === confirmRemoveId) {
          triggerToast("Post removed (preview only).");
          return { ...p, status: 'removed' };
        }
        return p;
      }));
      setConfirmRemoveId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300 relative">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Post Moderation</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Approve, reject, hide, restore, or remove community posts.</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col gap-4">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-outline-variant/15">
                  <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm leading-snug">{post.author}</h4>
                  <p className="text-[11px] text-on-surface-variant/75">{post.specialization} &middot; {post.date}</p>
                </div>
              </div>
              
              {/* Status Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                post.status === 'approved' ? 'bg-green-100 text-green-800' :
                post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                post.status === 'rejected' ? 'bg-orange-100 text-orange-800' :
                post.status === 'hidden' ? 'bg-gray-100 text-gray-700' :
                'bg-red-100 text-red-800'
              }`}>
                {post.status}
              </span>
            </div>

            {/* Post text */}
            {post.status === 'removed' ? (
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <p className="text-[13px] text-red-700 font-medium italic">
                  "This post was removed because it does not respect the TIRAZY community guidelines."
                </p>
              </div>
            ) : (
              <p className="text-sm text-on-surface leading-relaxed">{post.text}</p>
            )}

            {/* Post Image */}
            {post.image && post.status !== 'removed' && (
              <div className="rounded-xl overflow-hidden max-h-48 border border-outline-variant/10 max-w-sm bg-surface-container">
                <img src={post.image} alt="Upload preview" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/10 text-[12px] font-bold">
              {post.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(post.id, 'approved')} className="px-4 py-1.5 bg-primary text-on-primary rounded-lg hover:bg-primary-dark shadow-sm transition-colors">
                    Approve Post
                  </button>
                  <button onClick={() => updateStatus(post.id, 'rejected')} className="px-4 py-1.5 bg-transparent border border-outline-variant hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                    Reject Post
                  </button>
                </>
              )}

              {post.status === 'approved' && (
                <>
                  <button onClick={() => updateStatus(post.id, 'hidden')} className="px-4 py-1.5 bg-transparent border border-outline-variant hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                    Hide Post
                  </button>
                  <button onClick={() => setConfirmRemoveId(post.id)} className="px-4 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-700 transition-colors">
                    Remove Post
                  </button>
                </>
              )}

              {post.status === 'hidden' && (
                <>
                  <button onClick={() => updateStatus(post.id, 'approved')} className="px-4 py-1.5 bg-primary text-on-primary rounded-lg hover:bg-primary-dark shadow-sm transition-colors">
                    Restore Post
                  </button>
                  <button onClick={() => setConfirmRemoveId(post.id)} className="px-4 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-red-700 transition-colors">
                    Remove Post
                  </button>
                </>
              )}

              {(post.status === 'removed' || post.status === 'rejected') && (
                <button onClick={() => updateStatus(post.id, 'approved')} className="px-4 py-1.5 bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  Restore Post
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmRemoveId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif">Remove Post?</h4>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Are you sure you want to remove this post? It will be replaced with the guideline violation notification.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setConfirmRemoveId(null)}
                className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRemove}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-[12px] font-bold shadow-md transition-colors"
              >
                Remove Post
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
