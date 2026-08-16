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
  X,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';
import { PackageData } from '@/components/PackageDetailModal';

export default function AdminPackagesPage() {
  const { packages, addPackage, updatePackage, deletePackage, isLoading } = useAdminData();
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
    setFormGuests(pkg.idealGuests || pkg.idealFor || '');
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
      priceRange: formPrice || 'Contact for price',
      idealGuests: formGuests || 'Flexible Guest Count',
      description: formDesc || 'Custom wedding management package tailored to your preferences.',
      features: featureList.length > 0 ? featureList : ['Complete Wedding Coordination'],
      tagline: `Perfect for: ${formGuests}`,
      fullFeatures: featureList,
    });

    setFormTitle('');
    setFormBadge('');
    setFormPrice('');
    setFormFeatures('');
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Packages & Pricing"
      subtitle="Manage wedding packages, pricing tiers, and service inclusions in Firebase."
      activeNav="packages"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Active Package Tiers</h2>
            <p className="text-xs text-gray-500">{packages.length} Packages in Firebase</p>
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

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-3 border-[#c8102e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">Connecting to Firebase Cloud Database...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && packages.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-[#d5c3aa] p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#fcedeb] text-[#c8102e] flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">No Packages in Firebase</h3>
            <p className="text-xs text-gray-500 mb-5">
              Your Firebase packages collection is empty. Click below to create your first package.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Package</span>
            </button>
          </div>
        )}

        {/* Packages Cards Grid */}
        {!isLoading && packages.length > 0 && (
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
      )}
    </div>

      {/* Add / Edit Package Modal */}
      {(isAddModalOpen || editingPackage) && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] space-y-6 my-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {editingPackage ? 'Edit Tier' : 'New Package Tier'}
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  {editingPackage ? `Edit: ${editingPackage.title}` : 'Create Wedding Package'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPackage(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={editingPackage ? handleSaveEdit : handleCreatePackage}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Package Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Bengali Heritage / Premium Package"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Price Range / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="₹3,50,000 - ₹5,50,000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Highlight Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Most Popular / Luxury Tier"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Ideal Guest Count
                </label>
                <input
                  type="text"
                  placeholder="e.g. 250 - 400 Guests"
                  value={formGuests}
                  onChange={(e) => setFormGuests(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Summary Description
                </label>
                <textarea
                  rows={2}
                  placeholder="A short summary of what makes this wedding package tier special..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Package Inclusions
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">1 feature per line</span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Full Vedic Priest & Sacred Ritual Materials&#10;Bridal HD Makeover & Traditional Styling&#10;15 Custom Designer Tatta Trays&#10;Cinematic 4K Wedding Film & Drone Coverage&#10;Floral Royal Mandap & Entrance Gate"
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPackage(null);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
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
