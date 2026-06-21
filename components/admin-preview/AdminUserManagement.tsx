import React, { useState } from 'react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: string;
  joined: string;
  status: 'active' | 'suspended' | 'banned';
}

export function AdminUserManagement({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [users, setUsers] = useState<UserItem[]>([
    { id: "u-1", name: "Lina Benyahia", email: "lina.benyahia@example.com", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANf5msGfpBwraVf80zGPy0n3JBSPQp6MJnVF9YgMG58-etwGk_a54lmk8QfX1EXbv_uilQ--5g1qGqkj96Jq1s1HxQHwrKM6G_8JXsDi61ArduC2YHPX5ze6HdbARr2B9o5apGNiSMVlfuqennc3iCRJIveZmPd62P4gyjNBOTihnjFjw_D11zWSkiNWJOe3Z6RVlGJURqPC2HDH2q0aCLd_2puyyNjN6gV3ToAS27HUt0Pgw4OeZJWV2jaKEJ_mkq1zOIZGRgRo4", type: "Artisan", joined: "Oct 12, 2023", status: "active" },
    { id: "u-2", name: "Nadia Cherif", email: "nadia.cherif@example.com", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150", type: "Artisan", joined: "Oct 15, 2023", status: "active" },
    { id: "u-3", name: "Rachid Meziane", email: "rachid.meziane@example.com", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Vq2VhoFu44ICvw4kX78ly5ngopQcd_jvPL-otjDl181yWrKmnKypoBLLGF_g44Y8YBOh0mYjQ0zz4fwOwlK0CUHqqhB-DIjyGYJAoL6LMv2ZRNzoPa3XblLnj7m4miCSjVy-hCCt7iV1LwUuXfbheo4qzqpYirr03951PR09kO0u83QfMV99AmHdkFiVtDn8IqhzWEXvu5ozxK1fE3-jQ4MgyJ8aMt4DQ_s1iLegIKF0ZeZjmLw5L3Sz0rWM6PYP1JKGnZWsPgY", type: "Artisan", joined: "Sep 20, 2023", status: "active" },
    { id: "u-4", name: "Yanis Dris", email: "yanis.dris@example.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100", type: "Designer", joined: "Oct 01, 2023", status: "suspended" },
    { id: "u-5", name: "Spam Profile", email: "spammer@botmail.com", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100", type: "Guest", joined: "Oct 02, 2023", status: "banned" }
  ]);

  const [confirmBanId, setConfirmBanId] = useState<string | null>(null);

  const setStatus = (id: string, nextStatus: UserItem['status']) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        triggerToast(`User ${nextStatus === 'active' ? 'restored' : nextStatus === 'suspended' ? 'suspended' : 'banned'} (preview only).`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    setConfirmBanId(null);
  };

  const handleConfirmBan = () => {
    if (confirmBanId) {
      setStatus(confirmBanId, 'banned');
    }
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-primary font-serif">User Management</h3>
        <p className="font-body-md text-on-surface-variant mt-1">Suspend, ban, or restore platform users, and audit account states.</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">User</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Joined</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-outline-variant/10">
                    <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-on-surface">{u.name}</span>
                </td>
                <td className="py-4 text-on-surface-variant font-mono text-[12px]">{u.email}</td>
                <td className="py-4 text-on-surface">{u.type}</td>
                <td className="py-4 text-on-surface-variant">{u.joined}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    u.status === 'active' ? 'bg-green-100 text-green-800' :
                    u.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2 space-x-1 whitespace-nowrap">
                  <button 
                    onClick={() => triggerToast("View Profile (preview only).")}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface transition-colors"
                  >
                    View Profile
                  </button>

                  {u.status === 'active' && (
                    <>
                      <button 
                        onClick={() => setStatus(u.id, 'suspended')}
                        className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface transition-colors"
                      >
                        Suspend User
                      </button>
                      <button 
                        onClick={() => setConfirmBanId(u.id)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-[12px] font-bold text-red-700 transition-colors"
                      >
                        Ban User
                      </button>
                    </>
                  )}

                  {u.status === 'suspended' && (
                    <>
                      <button 
                        onClick={() => setStatus(u.id, 'active')}
                        className="px-2 py-1 bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-lg text-[12px] font-bold transition-colors"
                      >
                        Restore User
                      </button>
                      <button 
                        onClick={() => setConfirmBanId(u.id)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-[12px] font-bold text-red-700 transition-colors"
                      >
                        Ban User
                      </button>
                    </>
                  )}

                  {u.status === 'banned' && (
                    <button 
                      onClick={() => setStatus(u.id, 'active')}
                      className="px-2 py-1 bg-transparent border border-primary text-primary hover:bg-primary/5 rounded-lg text-[12px] font-bold transition-colors"
                    >
                      Restore User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for banning */}
      {confirmBanId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif font-bold">Ban User?</h4>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Are you sure you want to ban this user? They will no longer be able to access their TIRAZY account.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setConfirmBanId(null)}
                className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmBan}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-[12px] font-bold shadow-md transition-colors"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
