import React, { useState } from 'react';
import Image from 'next/image';
import {
  UtensilsCrossed,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Sparkles,
  Award,
  X,
  Search,
  ChevronDown,
  Layers,
  DollarSign,
  Users,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData, MenuItem } from '@/context/AdminDataContext';
import ImageKitUploader from '@/components/admin/ImageKitUploader';

export default function AdminMenuPage() {
  const { menus, addMenu, updateMenu, deleteMenu, isLoading } = useAdminData();
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadKey, setUploadKey] = useState(0);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formMinGuests, setFormMinGuests] = useState('100');
  const [formImage, setFormImage] = useState('');
  const [formStarters, setFormStarters] = useState('');
  const [formMainCourse, setFormMainCourse] = useState('');
  const [formRiceAndBreads, setFormRiceAndBreads] = useState('');
  const [formDesserts, setFormDesserts] = useState('');
  const [formBeverages, setFormBeverages] = useState('');

  const filteredMenus = menus.filter((m) => {
    return (
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.tagline && m.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.pricePerPlate && m.pricePerPlate.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const openEditModal = (menu: MenuItem) => {
    setEditingMenu(menu);
    setFormTitle(menu.title);
    setFormTagline(menu.tagline || '');
    setFormPrice(menu.pricePerPlate || '');
    setFormBadge(menu.badge || '');
    setFormMinGuests(menu.minimumGuests || '100');
    setFormImage(menu.image || '');
    setFormStarters((menu.starters || []).join('\n'));
    setFormMainCourse((menu.mainCourse || []).join('\n'));
    setFormRiceAndBreads((menu.riceAndBreads || []).join('\n'));
    setFormDesserts((menu.desserts || []).join('\n'));
    setFormBeverages((menu.beverages || []).join('\n'));
    setUploadKey((k) => k + 1);
  };

  const parseLines = (text: string) =>
    text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenu) return;

    updateMenu(editingMenu.id, {
      title: formTitle,
      tagline: formTagline || undefined,
      pricePerPlate: formPrice,
      badge: formBadge || undefined,
      minimumGuests: formMinGuests,
      image: formImage || undefined,
      starters: parseLines(formStarters),
      mainCourse: parseLines(formMainCourse),
      riceAndBreads: parseLines(formRiceAndBreads),
      desserts: parseLines(formDesserts),
      beverages: parseLines(formBeverages),
    });

    setEditingMenu(null);
  };

  const handleCreateMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) return;

    addMenu({
      title: formTitle,
      tagline: formTagline || 'Authentic gourmet Bengali catering crafted with heritage recipes.',
      pricePerPlate: formPrice,
      badge: formBadge || undefined,
      minimumGuests: formMinGuests || '100',
      image: formImage || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      starters: parseLines(formStarters),
      mainCourse: parseLines(formMainCourse),
      riceAndBreads: parseLines(formRiceAndBreads),
      desserts: parseLines(formDesserts),
      beverages: parseLines(formBeverages),
    });

    // Reset Form
    setFormTitle('');
    setFormTagline('');
    setFormPrice('');
    setFormBadge('');
    setFormMinGuests('100');
    setFormImage('');
    setFormStarters('');
    setFormMainCourse('');
    setFormRiceAndBreads('');
    setFormDesserts('');
    setFormBeverages('');
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Catering & Plate Menu Manager"
      subtitle="Manage plate-wise pricing, dish inclusions, starter menus, and gourmet spreads for Bengali weddings."
      activeNav="menu"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto flex-1">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search menus by title or price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#faf7f2] border border-[#e0d3c1] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
              />
            </div>
            <span className="text-xs text-gray-500 hidden sm:inline">
              {menus.length} Total Menus in Firebase
            </span>
          </div>

          <button
            onClick={() => {
              setFormTitle('');
              setFormTagline('');
              setFormPrice('');
              setFormBadge('');
              setFormMinGuests('100');
              setFormImage('');
              setFormStarters('Fish Fry with Kasundi\nPaneer Tikka Shashlik\nChicken Reshmi Kebab');
              setFormMainCourse('Chingri Malai Curry\nKolkata Mutton Biryani\nBhetki Paturi\nDhokar Dalna');
              setFormRiceAndBreads('Basmati Polao\nKoraishutir Kochuri\nRadhabhallavi');
              setFormDesserts('Baked Rosogolla\nMisti Doi\nMakkhon Sandesh');
              setFormBeverages('Aam Pora Shorbot\nMasala Chai Station');
              setUploadKey((k) => k + 1);
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Plate Menu</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-[#e8dfd3] animate-pulse space-y-4">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="h-20 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredMenus.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-[#d8b590] p-12 text-center max-w-md mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-[#c8102e] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-gray-900 mb-1">No Menus Found</h3>
            <p className="text-xs text-gray-500 mb-4">
              {menus.length === 0
                ? 'Your Firebase database does not have any plate catering packages yet. Click below to add one.'
                : 'No menus match your current search.'}
            </p>
            {menus.length === 0 && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#c8102e] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Create First Plate Menu
              </button>
            )}
          </div>
        )}

        {/* Menus Grid */}
        {!isLoading && filteredMenus.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenus.map((menu) => {
              const totalItems =
                (menu.starters?.length || 0) +
                (menu.mainCourse?.length || 0) +
                (menu.riceAndBreads?.length || 0) +
                (menu.desserts?.length || 0) +
                (menu.beverages?.length || 0);

              return (
                <div
                  key={menu.id}
                  className="bg-white rounded-2xl border border-[#e8dfd3] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header & Badge */}
                    <div className="p-5 pb-4 border-b border-[#f2ede6] relative bg-gradient-to-b from-[#faf6f0] to-white">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-serif-display text-xl font-bold text-gray-900 mb-1 flex-1">
                          {menu.title}
                        </h3>
                        {menu.badge && (
                          <span className="text-[10px] font-bold bg-[#c8102e] text-white px-2 py-0.5 rounded-full shadow-xs flex-shrink-0">
                            {menu.badge}
                          </span>
                        )}
                      </div>
                      {menu.tagline && (
                        <p className="text-xs text-gray-500 line-clamp-1">{menu.tagline}</p>
                      )}

                      {/* Plate Pricing Pill */}
                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold font-serif-display text-[#c8102e]">
                          {menu.pricePerPlate.startsWith('₹') ? menu.pricePerPlate : `₹${menu.pricePerPlate}`}
                        </span>
                        <span className="text-xs font-medium text-gray-500">/ plate (per guest)</span>
                      </div>
                    </div>

                    {/* Dish Preview Breakdown */}
                    <div className="p-5 space-y-3 text-xs">
                      {menu.starters && menu.starters.length > 0 && (
                        <div>
                          <p className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                            <span>Starters ({menu.starters.length}):</span>
                          </p>
                          <p className="text-gray-600 line-clamp-2 pl-3">
                            {menu.starters.join(' • ')}
                          </p>
                        </div>
                      )}

                      {menu.mainCourse && menu.mainCourse.length > 0 && (
                        <div>
                          <p className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" />
                            <span>Main Course ({menu.mainCourse.length}):</span>
                          </p>
                          <p className="text-gray-600 line-clamp-2 pl-3">
                            {menu.mainCourse.join(' • ')}
                          </p>
                        </div>
                      )}

                      {menu.desserts && menu.desserts.length > 0 && (
                        <div>
                          <p className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                            <span>Desserts &amp; Sweets ({menu.desserts.length}):</span>
                          </p>
                          <p className="text-gray-600 line-clamp-2 pl-3">
                            {menu.desserts.join(' • ')}
                          </p>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-100">
                        <span>{totalItems} total items in menu</span>
                        <span>Min {menu.minimumGuests || '100'} guests</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-[#faf7f2] border-t border-[#ebdcc9] flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(menu)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${menu.title}"?`)) {
                          deleteMenu(menu.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isAddModalOpen || editingMenu) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-[#ebdcc9] shadow-2xl overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1c0d0c] via-[#2a1312] to-[#1c0d0c] px-6 py-4 text-white flex items-center justify-between border-b border-amber-900/30 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-xs">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-white tracking-wide">
                    {editingMenu ? `Edit Plate Menu` : 'Create New Plate Menu'}
                  </h3>
                  <p className="text-xs text-gray-300 font-light mt-0.5">
                    {editingMenu ? `Updating "${editingMenu.title}"` : 'Configure catering tier, course inclusions, and plate pricing.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingMenu(null);
                  setIsAddModalOpen(false);
                }}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form id="menu-modal-form" onSubmit={editingMenu ? handleSaveEdit : handleCreateMenu} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-gradient-to-b from-[#fdfbf9] to-white">
              {/* Basic Details Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#ebdcc9] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c4604] border-b border-[#ebdcc9] pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#d99824]" />
                  <span>General Information &amp; Pricing</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Menu Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Bengali Bhoj"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#d8cbba] rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Price Per Plate (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">₹</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1150"
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        className="w-full pl-8 pr-3.5 py-2.5 bg-[#faf7f2] border border-[#d8cbba] rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none font-bold text-[#c8102e] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Highlight Badge (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chef's Special / Most Popular"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#d8cbba] rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Min Guests Required
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 100"
                      value={formMinGuests}
                      onChange={(e) => setFormMinGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#d8cbba] rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Tagline / Menu Highlights
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Authentic Bengali feast with signature Kolkata seafood and live dessert stations."
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf7f2] border border-[#d8cbba] rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Dishes Section (Multi-line textareas with clear cards) */}
              <div className="bg-white p-5 rounded-2xl border border-[#ebdcc9] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebdcc9] pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c4604]">
                    <Layers className="w-3.5 h-3.5 text-[#c8102e]" />
                    <span>Course Inclusions Breakdown</span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium italic">
                    Type 1 item per line
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#e8ded1] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800">
                        🍢 Welcome Drinks &amp; Starters
                      </label>
                      <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {formStarters.split('\n').filter(Boolean).length} items
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Fish Fry with Kasundi&#10;Gondhoraj Paneer Tikka&#10;Chicken Reshmi Kebab"
                      value={formStarters}
                      onChange={(e) => setFormStarters(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#d8cbba] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#c8102e] leading-relaxed resize-y"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#e8ded1] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800">
                        🍛 Main Course Delicacies
                      </label>
                      <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {formMainCourse.split('\n').filter(Boolean).length} items
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Chingri Malai Curry&#10;Kolkata Mutton Biryani&#10;Bhetki Paturi&#10;Chanar Dalna"
                      value={formMainCourse}
                      onChange={(e) => setFormMainCourse(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#d8cbba] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#c8102e] leading-relaxed resize-y"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#e8ded1] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800">
                        🍚 Rice, Pulao &amp; Breads
                      </label>
                      <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {formRiceAndBreads.split('\n').filter(Boolean).length} items
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Basmati Ghee Rice&#10;Radhabhallavi with Chholar Dal&#10;Koraishutir Kochuri"
                      value={formRiceAndBreads}
                      onChange={(e) => setFormRiceAndBreads(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#d8cbba] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#c8102e] leading-relaxed resize-y"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#e8ded1] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800">
                        🍨 Desserts &amp; Mishti
                      </label>
                      <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {formDesserts.split('\n').filter(Boolean).length} items
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Baked Rosogolla&#10;Kheer Kadam&#10;Nolen Gur Ice Cream"
                      value={formDesserts}
                      onChange={(e) => setFormDesserts(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#d8cbba] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#c8102e] leading-relaxed resize-y"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#e8ded1] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800">
                        🫖 Beverages &amp; Paan
                      </label>
                      <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {formBeverages.split('\n').filter(Boolean).length} items
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Aam Pora Shorbot&#10;Live Banarasi Paan Counter&#10;Mineral Water"
                      value={formBeverages}
                      onChange={(e) => setFormBeverages(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#d8cbba] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#c8102e] leading-relaxed resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Showcase Image Uploader */}
              <div className="bg-white p-5 rounded-2xl border border-[#ebdcc9] shadow-xs">
                <ImageKitUploader
                  key={uploadKey}
                  folder="/shuvayan/menu"
                  label="Plate / Food Showcase Image"
                  currentImageUrl={formImage}
                  onUploadSuccess={(url) => setFormImage(url)}
                  onClear={() => setFormImage('')}
                />
              </div>
            </form>

            {/* Sticky Modal Footer Actions */}
            <div className="px-6 py-4 bg-[#faf7f2] border-t border-[#ebdcc9] flex items-center justify-between gap-3 flex-shrink-0">
              <span className="text-xs text-gray-500 hidden sm:inline">
                {editingMenu ? 'Modifications will reflect immediately across live menus.' : 'New plate tier will be published instantly.'}
              </span>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMenu(null);
                    setIsAddModalOpen(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="menu-modal-form"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c8102e] to-[#a80b24] hover:from-[#a80b24] hover:to-[#8c081e] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingMenu ? 'Save Menu Changes' : 'Publish Plate Menu'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
