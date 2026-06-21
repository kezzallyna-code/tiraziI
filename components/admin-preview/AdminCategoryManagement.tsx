import React, { useState } from 'react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

export function AdminCategoryManagement({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: "cat-1", name: "Traditional Karakou", slug: "traditional-karakou", description: "Authentic Algerian velvet jackets with Fetla embroidery.", status: "active", createdDate: "Jan 15, 2023" },
    { id: "cat-2", name: "Haute Couture", slug: "haute-couture", description: "High-end custom-fitted Mediterranean fashion designs.", status: "active", createdDate: "Feb 10, 2023" },
    { id: "cat-3", name: "Hand Embroidery", slug: "hand-embroidery", description: "Traditional gold, silver, and silk thread needlework.", status: "active", createdDate: "Mar 22, 2023" },
    { id: "cat-4", name: "Silk Weaving", slug: "silk-weaving", description: "Hand-loomed natural silk fabrics and panels.", status: "active", createdDate: "Apr 05, 2023" },
    { id: "cat-5", name: "Bridal Couture", slug: "bridal-couture", description: "Wedding collections, custom dresses, and accessories.", status: "active", createdDate: "May 12, 2023" },
    { id: "cat-6", name: "Jewelry & Accessories", slug: "jewelry-accessories", description: "Handcrafted traditional jewelry and styling accessories.", status: "active", createdDate: "Jun 18, 2023" },
    { id: "cat-7", name: "Leather Craft", slug: "leather-craft", description: "Tooled leather bags, belts, and traditional slippers.", status: "active", createdDate: "Jul 20, 2023" },
    { id: "cat-8", name: "Traditional Weaving", slug: "traditional-weaving", description: "Hand-woven wool tapestries and Kabyle carpets.", status: "active", createdDate: "Aug 02, 2023" },
  ]);

  // Categories currently in use by mock projects/posts (should block deletion)
  const inUseCategoryNames = [
    "Traditional Karakou",
    "Haute Couture",
    "Hand Embroidery",
    "Silk Weaving",
    "Leather Craft",
    "Traditional Weaving"
  ];

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<CategoryItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const toggleStatus = (id: string, currentStatus: CategoryItem['status']) => {
    const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setCategories(prev => prev.map(cat => {
      if (cat.id === id) {
        triggerToast(`Category ${nextStatus === 'active' ? 'activated' : 'deactivated'} (preview only).`);
        return { ...cat, status: nextStatus };
      }
      return cat;
    }));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const slug = formName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newCategory: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: formName,
      slug,
      description: formDescription,
      status: 'active',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    setCategories(prev => [...prev, newCategory]);
    triggerToast("Category added successfully (preview only).");
    
    // Reset form
    setFormName('');
    setFormDescription('');
    setShowAddModal(false);
  };

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal || !formName.trim()) return;

    const slug = formName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setCategories(prev => prev.map(cat => {
      if (cat.id === showEditModal.id) {
        return { ...cat, name: formName, slug, description: formDescription };
      }
      return cat;
    }));

    triggerToast("Category updated successfully (preview only).");
    setShowEditModal(null);
    setFormName('');
    setFormDescription('');
  };

  const openEditModal = (cat: CategoryItem) => {
    setShowEditModal(cat);
    setFormName(cat.name);
    setFormDescription(cat.description);
  };

  const handleDeleteAttempt = (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;

    // In use check
    if (inUseCategoryNames.includes(cat.name)) {
      triggerToast("This category is currently in use. Deactivate it instead.");
      return;
    }

    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      setCategories(prev => prev.filter(c => c.id !== confirmDeleteId));
      triggerToast("Category deleted successfully (preview only).");
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-container-low p-6 rounded-[24px] border border-outline-variant/10 shadow-sm space-y-6 animate-in fade-in duration-300 relative">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-serif">Category Management</h3>
          <p className="font-body-md text-on-surface-variant mt-1">Manage project and craft categories.</p>
        </div>
        <button 
          onClick={() => {
            setFormName('');
            setFormDescription('');
            setShowAddModal(true);
          }}
          className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-md text-label-md hover:bg-primary-dark shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/20 text-on-surface-variant/80 font-label-md">
              <th className="pb-3 pl-2">Category Name</th>
              <th className="pb-3">Slug</th>
              <th className="pb-3">Description</th>
              <th className="pb-3">Created</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-on-surface">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-surface-container/10">
                <td className="py-4 pl-2 font-bold whitespace-nowrap">{cat.name}</td>
                <td className="py-4 text-on-surface-variant font-mono text-[12px]">{cat.slug}</td>
                <td className="py-4 text-on-surface-variant max-w-[200px] truncate" title={cat.description}>{cat.description}</td>
                <td className="py-4 text-on-surface-variant whitespace-nowrap">{cat.createdDate}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    cat.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-outline-variant/40 text-on-surface-variant/75'
                  }`}>
                    {cat.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2 space-x-1 whitespace-nowrap">
                  <button 
                    onClick={() => openEditModal(cat)}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => toggleStatus(cat.id, cat.status)}
                    className="px-2 py-1 bg-transparent hover:bg-surface-container border border-outline-variant rounded-lg text-[12px] font-bold text-on-surface-variant transition-colors"
                  >
                    {cat.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handleDeleteAttempt(cat.id)}
                    className="px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-[12px] font-bold text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif font-bold">Add Category</h4>
            <form onSubmit={handleAddCategory} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-on-surface-variant/80">Category Name</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Silk Weaving" 
                  required
                  className="w-full bg-surface-container-lowest border border-[#E8DED3] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 outline-none text-sm transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-on-surface-variant/80">Description</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Description of crafts or collections" 
                  rows={3}
                  className="w-full bg-surface-container-lowest border border-[#E8DED3] focus:border-primary rounded-xl px-4 py-2 outline-none text-sm transition-all resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary rounded-full text-[12px] font-bold shadow-md hover:bg-primary-dark transition-colors"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif font-bold">Edit Category</h4>
            <form onSubmit={handleEditCategory} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-on-surface-variant/80">Category Name</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full bg-surface-container-lowest border border-[#E8DED3] focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2 outline-none text-sm transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-on-surface-variant/80">Description</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-surface-container-lowest border border-[#E8DED3] focus:border-primary rounded-xl px-4 py-2 outline-none text-sm transition-all resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(null)}
                  className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary rounded-full text-[12px] font-bold shadow-md hover:bg-primary-dark transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for deleting */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-[24px] border border-outline-variant/30 shadow-2xl max-w-sm w-full space-y-4">
            <h4 className="font-title-lg text-title-lg text-primary font-serif font-bold">Delete Category?</h4>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              Are you sure you want to permanently delete this category? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button 
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-outline-variant rounded-full text-[12px] font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-[12px] font-bold shadow-md transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
