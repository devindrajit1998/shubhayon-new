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
  Layers,
  FolderPlus,
  Info,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';
import { PackageData, InclusionCategory, InclusionTopic } from '@/components/PackageDetailModal';

// Helper: Serializes structured categories into human-editable text
function serializeInclusionCategories(categories?: InclusionCategory[]): string {
  if (!categories || categories.length === 0) return '';
  return categories
    .map((cat) => {
      const header = `### ${cat.categoryName.toUpperCase()}`;
      const topicsText = cat.topics
        .map((t, idx) => {
          if (t.description) {
            return `${idx + 1}. ${t.title}:\n   ${t.description}`;
          }
          return `${idx + 1}. ${t.title}`;
        })
        .join('\n\n');
      return `${header}\n\n${topicsText}`;
    })
    .join('\n\n---\n\n');
}

// Helper: Parses formatted text with headings (e.g. VENUE DECORATION INCLUSIONS: or ### Category) into structured data
function parseInclusionCategories(text: string): { categories: InclusionCategory[]; flatList: string[] } {
  if (!text || !text.trim()) {
    return { categories: [], flatList: [] };
  }

  const lines = text.split('\n');
  const categories: InclusionCategory[] = [];
  const flatList: string[] = [];

  let currentCategoryName = 'General Inclusions';
  let currentTopics: InclusionTopic[] = [];
  let currentTopicTitle = '';
  let currentTopicDesc: string[] = [];

  const flushTopic = () => {
    if (currentTopicTitle.trim()) {
      const topicObj: InclusionTopic = {
        title: currentTopicTitle.trim(),
        description: currentTopicDesc.join(' ').trim() || undefined,
      };
      currentTopics.push(topicObj);
      flatList.push(topicObj.title);
      currentTopicTitle = '';
      currentTopicDesc = [];
    }
  };

  const flushCategory = () => {
    flushTopic();
    if (currentTopics.length > 0) {
      categories.push({
        categoryName: currentCategoryName,
        topics: [...currentTopics],
      });
      currentTopics = [];
    }
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed === '---') continue;

    // Check if line is a Category Heading
    // Formats: "### VENUE DECORATION", "VENUE DECORATION INCLUSIONS:", "VENUE DECORATION:"
    const isCategoryHeading =
      trimmed.startsWith('###') ||
      trimmed.startsWith('##') ||
      (trimmed.endsWith(':') && !trimmed.match(/^\d+[\.\)]/) && trimmed.toUpperCase() === trimmed) ||
      (trimmed.toUpperCase().includes('INCLUSION') && trimmed.endsWith(':'));

    if (isCategoryHeading) {
      flushCategory();
      currentCategoryName = trimmed
        .replace(/^#+\s*/, '')
        .replace(/:$/, '')
        .replace(/INCLUSIONS/i, '')
        .trim();
      continue;
    }

    // Check if line is a Topic Item: "1. Premium Bride Stage:" or "1. Premium Bride Stage" or "- Premium Bride Stage:"
    const itemMatch = trimmed.match(/^(?:\d+[\.\)]|\*|\-)\s*(.+)$/);
    if (itemMatch) {
      flushTopic();
      let rawTitle = itemMatch[1].trim();
      // If title has colon and description on same line: e.g. "1. Premium Stage: Fresh flowers & backdrop"
      if (rawTitle.includes(':') && !rawTitle.endsWith(':')) {
        const colonIdx = rawTitle.indexOf(':');
        currentTopicTitle = rawTitle.substring(0, colonIdx).trim();
        const descRest = rawTitle.substring(colonIdx + 1).trim();
        if (descRest) {
          currentTopicDesc.push(descRest);
        }
      } else {
        currentTopicTitle = rawTitle.replace(/:$/, '').trim();
      }
    } else {
      // Continuation of description for previous topic
      if (currentTopicTitle) {
        currentTopicDesc.push(trimmed);
      } else {
        // Flat text line outside numbered list
        currentTopicTitle = trimmed;
      }
    }
  }

  flushCategory();

  return { categories, flatList };
}

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
  const [formStructuredInclusions, setFormStructuredInclusions] = useState<string>('');
  const [formExclusions, setFormExclusions] = useState<string>('');

  const openEditModal = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormTitle(pkg.title);
    setFormBadge(pkg.badge || '');
    setFormPrice(pkg.priceRange || '');
    setFormGuests(pkg.idealGuests || pkg.idealFor || '');
    setFormDesc(pkg.description || '');

    if (pkg.inclusionCategories && pkg.inclusionCategories.length > 0) {
      setFormStructuredInclusions(serializeInclusionCategories(pkg.inclusionCategories));
    } else if (pkg.features && pkg.features.length > 0) {
      setFormStructuredInclusions(
        `### GENERAL INCLUSIONS\n\n` + pkg.features.map((f, i) => `${i + 1}. ${f}`).join('\n')
      );
    } else {
      setFormStructuredInclusions('');
    }

    setFormExclusions(pkg.exclusions?.join('\n') || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    const { categories, flatList } = parseInclusionCategories(formStructuredInclusions);

    const exclusionList = formExclusions
      .split('\n')
      .map((e) => e.trim())
      .filter(Boolean);

    updatePackage(editingPackage.id, {
      title: formTitle,
      badge: formBadge || undefined,
      priceRange: formPrice,
      idealGuests: formGuests,
      description: formDesc,
      features: flatList.length > 0 ? flatList : editingPackage.features || [],
      fullFeatures: flatList.length > 0 ? flatList : editingPackage.fullFeatures || [],
      inclusionCategories: categories.length > 0 ? categories : undefined,
      exclusions: exclusionList,
    });

    setEditingPackage(null);
  };

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const { categories, flatList } = parseInclusionCategories(formStructuredInclusions);

    const exclusionList = formExclusions
      .split('\n')
      .map((e) => e.trim())
      .filter(Boolean);

    addPackage({
      title: formTitle,
      badge: formBadge || undefined,
      priceRange: formPrice || 'Contact for price',
      idealGuests: formGuests || 'Flexible Guest Count',
      description: formDesc || 'Custom wedding management package tailored to your preferences.',
      features: flatList.length > 0 ? flatList : ['Complete Wedding Coordination'],
      tagline: `Perfect for: ${formGuests}`,
      fullFeatures: flatList.length > 0 ? flatList : ['Complete Wedding Coordination'],
      inclusionCategories: categories.length > 0 ? categories : undefined,
      exclusions: exclusionList,
    });

    setFormTitle('');
    setFormBadge('');
    setFormPrice('');
    setFormStructuredInclusions('');
    setFormExclusions('');
    setIsAddModalOpen(false);
  };

  const loadDemoInclusionsTemplate = () => {
    const demo = `### VENUE DECORATION INCLUSIONS:

1. Premium Bride Stage:
   Fresh/original flower décor, premium backdrop, elegant floral arrangements, sofa seating & sophisticated styling.

2. Premium Groom Stage:
   Fresh/original floral décor, premium backdrop, traditional elements & premium seating arrangement.

3. Luxury Wedding Mandap:
   Fresh/original flowers, floral pillars, canopy, greenery, hanging floral elements & premium detailing.

4. Grand Premium Entrance Gate:
   Bespoke entrance gate with fresh/original flowers, greenery, floral detailing & premium welcome ambience.

5. Complete Hall Decoration:
   Fresh floral installations, hanging elements, greenery, backdrop detailing & coordinated ambience styling.

6. Premium Guest Chairs:
   Premium-quality chairs with elegant covers and coordinated presentation.

7. Premium Tables with Covers:
   Properly arranged tables with quality decorative covers for a sophisticated dining/guest setup.

8. Complete Premium Lighting Setup:
   Stage, mandap, entrance, hall & ambience lighting with a fully coordinated lighting design.

9. Special Entry Experience:
   A professionally designed Special Bride/Groom Entry with coordinated décor, lighting effects and a grand presentation to create a memorable entrance moment.

10. Complete Premium Décor Styling:
    Professional coordination of the colour palette, floral theme, lighting, stage design and overall décor for a luxurious and sophisticated wedding ambience.

---

### PHOTOGRAPHY & CINEMATOGRAPHY:

1. Candid Photography:
   High-end candid wedding moments captured by senior photographers.

2. Cinematic Wedding Film:
   4K teaser film, drone coverage, and highlights video with color grading.

---

### BRIDAL & GROOM MAKEOVER:

1. HD Bridal Makeup:
   Celebrity stylist with international HD products, lashes & hair styling.

2. Groom Styling:
   Beard grooming, hair styling & traditional pagdi styling.`;

    setFormStructuredInclusions(demo);
  };

  return (
    <AdminLayout
      title="Packages Manager"
      subtitle="Manage wedding packages, guest capacities, badges, and service inclusions in Firebase."
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
              setFormPrice('');
              setFormGuests('250 - 400 Guests');
              setFormDesc('Custom package designed for exquisite Bengali weddings.');
              setFormStructuredInclusions(`### VENUE DECORATION INCLUSIONS:

1. Premium Bride Stage:
   Fresh/original flower décor, premium backdrop, elegant floral arrangements & sofa seating.

2. Luxury Wedding Mandap:
   Fresh/original flowers, floral pillars, canopy & premium detailing.

---

### PHOTOGRAPHY:

1. Cinematic Wedding Film:
   4K teaser film, drone coverage, and highlights video.`);
              setFormExclusions('');
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
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
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs cursor-pointer"
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
                  <div className="text-xs text-gray-700 font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c8102e]" />
                    <span>{pkg.idealGuests || pkg.idealFor || 'Customizable Capacity'}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 italic">
                    {pkg.tagline || 'Bespoke Bengali Wedding Package'}
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                {/* Inclusions list */}
                <div className="space-y-1.5 border-t border-gray-100 pt-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Inclusions ({pkg.features?.length || 0})
                  </span>
                  {pkg.features?.slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {(pkg.features?.length || 0) > 4 && (
                    <span className="text-[11px] text-[#c8102e] font-semibold block">
                      +{(pkg.features?.length || 0) - 4} more inclusions
                    </span>
                  )}
                </div>

                {/* Exclusions list on card */}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div className="space-y-1 border-t border-red-100/70 pt-2.5 mt-2.5">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                      Exclusions ({pkg.exclusions.length})
                    </span>
                    {pkg.exclusions.slice(0, 2).map((ex, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-red-700">
                        <span className="text-red-400 font-bold">&times;</span>
                        <span className="truncate">{ex}</span>
                      </div>
                    ))}
                  </div>
                )}
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

      {/* Add / Edit Package Modal - Expanded to Max-W-4xl / 5xl for Ease of Multi-Category Data Entry */}
      {(isAddModalOpen || editingPackage) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-9 shadow-2xl border border-[#ebdcc8] space-y-6 my-6 animate-fadeIn max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {editingPackage ? 'Edit Tier' : 'New Package Tier'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-gray-900">
                  {editingPackage ? `Edit: ${editingPackage.title}` : 'Create Wedding Package'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPackage(null);
                }}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={editingPackage ? handleSaveEdit : handleCreatePackage}
              className="space-y-5 text-xs sm:text-sm"
            >
              {/* Row 1: Title, Badge, Guest Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Heritage Package"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Highlight Badge (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Most Popular / Royal Tier"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Ideal Guest Scope
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 250 - 400 Guests"
                    value={formGuests}
                    onChange={(e) => setFormGuests(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Summary Description */}
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

              {/* Row 3: Structured Multi-Category Inclusions Section with Guidance */}
              <div className="bg-[#fcfaf7] p-4 sm:p-5 rounded-2xl border border-[#ebdcc8] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc8] pb-3">
                  <div>
                    <label className="text-xs font-bold text-[#74161f] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#c8102e]" />
                      <span>Categorized Inclusions &amp; Topic Descriptions</span>
                    </label>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Support headings (e.g. <strong>### VENUE DECORATION:</strong>) followed by numbered topics and multi-line descriptions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={loadDemoInclusionsTemplate}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#c8102e] bg-[#fff5ea] hover:bg-[#ffeade] border border-[#eedfcb] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Load Demo Format</span>
                  </button>
                </div>

                <textarea
                  rows={12}
                  placeholder={`### VENUE DECORATION INCLUSIONS:

1. Premium Bride Stage:
   Fresh/original flower décor, premium backdrop, elegant floral arrangements, sofa seating & sophisticated styling.

2. Luxury Wedding Mandap:
   Fresh/original flowers, floral pillars, canopy, greenery, hanging floral elements & premium detailing.

---

### PHOTOGRAPHY & CINEMATOGRAPHY:

1. Cinematic Wedding Film:
   4K teaser film, drone coverage, and highlights video with color grading.`}
                  value={formStructuredInclusions}
                  onChange={(e) => setFormStructuredInclusions(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] outline-none transition-all font-mono text-xs sm:text-[13px] leading-relaxed"
                />

                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 bg-white/80 p-2.5 rounded-lg border border-[#ebdcc8]">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>Pro-tip:</strong> Use headings like <code className="text-[#c8102e] font-bold">### VENUE DECORATION</code> or <code className="text-[#c8102e] font-bold">PHOTOGRAPHY:</code> to separate categories. Topic numbers with a colon will automatically format with descriptions.
                  </span>
                </div>
              </div>

              {/* Row 4: Package Exclusions */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-red-700 uppercase tracking-wider">
                    Package Exclusions (Optional)
                  </label>
                  <span className="text-[11px] text-gray-400 font-medium">1 item per line</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="AC Banquet Hall Rental Charges&#10;Guest Lodging & Hotel Rooms&#10;Outstation Travel Beyond Kolkata"
                  value={formExclusions}
                  onChange={(e) => setFormExclusions(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPackage(null);
                  }}
                  className="px-6 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
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
