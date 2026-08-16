import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Users,
  Sparkles,
  Award,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';
import { PackageData } from '@/components/PackageDetailModal';

export default function AdminPackagesPage() {
  const { packages, addPackage, updatePackage, deletePackage } = useAdminData();
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formGuests, setFormGuests] = useState('200 - 350 Guests');
  const [formDesc, setFormDesc] = useState('');
  const [formFeatures, setFormFeatures] = useState<string>('');

  const openEditModal = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormTitle(pkg.title);
    setFormBadge(pkg.badge || '');
    setFormPrice(pkg.priceRange || '');
    setFormGuests(pkg.idealGuests || '');
    setFormDesc(pkg.description || '');
    setFormFeatures(pkg.features?.join('\n') || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    const featureList = formFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    updatePackage(editingPackage.id, {
      title: formTitle,
      badge: formBadge || undefined,
      priceRange: formPrice,
      idealGuests: formGuests,
      description: formDesc,
      features: featureList,
    });

    setEditingPackage(null);
  };

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const featureList = formFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    addPackage({
      title: formTitle,
      badge: formBadge || undefined,
      priceRange: formPrice || 'Custom Quote',
      idealGuests: formGuests || 'Flexible',
      description: formDesc || 'Full-fledged authentic Bengali celebration package.',
      features: featureList.length > 0 ? featureList : ['Complete Ritual Management', 'Priest & Purohit', 'Theme Decor'],
    });

    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Packages Manager"
      subtitle="Configure wedding package tiers, inclusions, guest limits, and pricing badges."
      activeNav="packages"
    >
      <div className="space-y-6">
        {/* Top Header Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Active Package Tiers</h2>
            <p className="text-xs text-gray-500">{packages.length} Packages live on the website</p>
          </div>

          <button
            onClick={() => {
              setFormTitle('');
              setFormBadge('Special Tier');
              setFormPrice('₹3,00,000 - ₹5,00,000');
              setFormGuests('250 - 400 Guests');
              setFormDesc('Custom package designed for exquisite Bengali weddings.');
              setFormFeatures('Full Vedic Wedding Priest\nBridal Makeover by Expert\nTatta Trays & Decor\nCinematic Photography');
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Package</span>
          </button>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {pkg.badge && (
                <div className="absolute top-4 right-4 bg-[#fcedc7] text-[#855106] border border-[#f0d492] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-[#c8102e]" />
                  <h3 className="text-lg font-bold font-serif-display text-gray-900">{pkg.title}</h3>
                </div>

                <div className="space-y-1 my-3 bg-[#faf7f2] p-3 rounded-xl border border-[#ebdcc8]">
                  <div className="text-base font-extrabold text-[#c8102e]">{pkg.priceRange}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{pkg.idealGuests}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                {/* Inclusions list */}
                <div className="space-y-1.5 border-t border-gray-100 pt-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Inclusions ({pkg.features?.length || 0})
                  </span>
                  {pkg.features?.slice(0, 5).map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {(pkg.features?.length || 0) > 5 && (
                    <span className="text-[11px] text-[#c8102e] font-semibold block">
                      +{(pkg.features?.length || 0) - 5} more items
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-800 bg-[#faf7f2] hover:bg-[#f0e8dc] py-2 rounded-xl border border-[#e0d3c1] transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Package</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Delete package "${pkg.title}"?`)) {
                      deletePackage(pkg.id);
                    }
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Package Modal */}
      {(isAddModalOpen || editingPackage) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                {editingPackage ? `Edit: ${editingPackage.title}` : 'Create New Package Tier'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPackage(null);
                }}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={editingPackage ? handleSaveEdit : handleCreatePackage}
              className="space-y-3.5 text-xs sm:text-sm"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Package Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Bengali Heritage"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Price Range
                  </label>
                  <input
                    type="text"
                    placeholder="₹3,50,000 - ₹5,50,000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Badge / Highlight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Most Popular"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ideal Guest Size
                </label>
                <input
                  type="text"
                  placeholder="e.g. 250 - 450 Guests"
                  value={formGuests}
                  onChange={(e) => setFormGuests(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Summary Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of what this package offers..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inclusion Features (one per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Vedic Priest & Ritual items&#10;Bridal Makeover with HD Airbrush&#10;Custom Tatta Trays Decor (15 pcs)&#10;4K Cinematic Wedding Film"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPackage(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-xl shadow-xs"
                >
                  {editingPackage ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
