import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Sparkles,
  Check,
  X,
  Upload,
  Loader2,
  Layers,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';
import { ServiceItem } from '@/components/ServicesSection';
import ImageKitUploader from '@/components/admin/ImageKitUploader';

// Dedicated Compact Thumbnail Tile for the 4 supporting service thumbnails
function CompactThumbnailTile({
  label,
  currentImageUrl,
  onUploadSuccess,
  onClear,
  folder = '/shuvayan_services',
}: {
  label: string;
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  onClear: () => void;
  folder?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      const fileDataPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const base64Data = await fileDataPromise;
      const res = await fetch('/api/imagekit/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: base64Data,
          fileName: file.name,
          folder: folder,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onUploadSuccess(data.url);
    } catch (err: any) {
      console.error('Thumbnail upload error:', err);
      setError(err?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider text-center">
        {label}
      </span>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-full aspect-square bg-[#fcfaf7] rounded-2xl border-2 border-dashed border-[#d8cbba] hover:border-[#c8102e] overflow-hidden group transition-all duration-200 flex items-center justify-center shadow-2xs">
        {currentImageUrl ? (
          <>
            <Image
              src={currentImageUrl}
              alt={label}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay with quick actions */}
            <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2 z-10">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-1 text-[10px] font-bold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {isUploading ? 'Uploading...' : 'Replace'}
              </button>
              <button
                type="button"
                onClick={onClear}
                className="w-full py-1 text-[10px] font-bold text-gray-200 hover:text-white bg-white/20 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full h-full flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-red-50/40 transition-colors"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 text-[#c8102e] animate-spin mb-1" />
            ) : (
              <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#c8102e] mb-1 transition-colors" />
            )}
            <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#c8102e] transition-colors">
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </span>
          </button>
        )}
      </div>
      {error && <span className="text-[10px] text-red-600 font-semibold text-center">{error}</span>}
    </div>
  );
}

export default function AdminServicesPage() {
  const { services, addService, updateService, deleteService, isLoading } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);

  // Form State for Add / Edit
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Decoration');
  const [formDesc, setFormDesc] = useState('');
  const [formButtonText, setFormButtonText] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formThumb1, setFormThumb1] = useState('');
  const [formThumb2, setFormThumb2] = useState('');
  const [formThumb3, setFormThumb3] = useState('');
  const [formThumb4, setFormThumb4] = useState('');

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingService(null);
    setFormTitle('');
    setFormCategory('Decoration');
    setFormDesc('');
    setFormButtonText('');
    setFormImage('');
    setFormThumb1('');
    setFormThumb2('');
    setFormThumb3('');
    setFormThumb4('');
    setUploadKey((k) => k + 1);
    setIsAddModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormTitle(service.title);
    setFormCategory(service.category || 'Decoration');
    setFormDesc(service.description || '');
    setFormButtonText(service.buttonText || '');
    setFormImage(service.image || '');
    setFormThumb1(service.thumbnails?.[0] || '');
    setFormThumb2(service.thumbnails?.[1] || '');
    setFormThumb3(service.thumbnails?.[2] || '');
    setFormThumb4(service.thumbnails?.[3] || '');
    setUploadKey((k) => k + 1);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const thumbnails = [
      formThumb1 || formImage,
      formThumb2 || formImage,
      formThumb3 || formImage,
      formThumb4 || formImage,
    ].filter(Boolean);

    updateService(editingService.id, {
      title: formTitle,
      category: formCategory,
      description: formDesc,
      buttonText: formButtonText,
      image: formImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-01.jpg',
      thumbnails,
    });

    setEditingService(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const thumbnails = [
      formThumb1 || formImage,
      formThumb2 || formImage,
      formThumb3 || formImage,
      formThumb4 || formImage,
    ].filter(Boolean);

    addService({
      title: formTitle,
      category: formCategory,
      description: formDesc || 'Expert service tailored to traditional Bengali wedding celebrations.',
      buttonText: formButtonText,
      image: formImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-01.jpg',
      thumbnails,
    });

    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Services Manager"
      subtitle="Manage, edit, and configure wedding services, main showcase photos, supporting thumbnails, and booking buttons."
      activeNav="services"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search services by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#faf7f2] border border-[#e0d3c1] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 hidden sm:inline">
              {services.length} Total Services in Firebase
            </span>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-3 border-[#c8102e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">Connecting to Firebase Cloud Database...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredServices.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-[#d5c3aa] p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#fcedeb] text-[#c8102e] flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">No Services in Firebase</h3>
            <p className="text-xs text-gray-500 mb-5">
              {searchQuery
                ? `No services matched "${searchQuery}".`
                : 'Your Firebase services collection is empty. Click below to add your first service.'}
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Service</span>
            </button>
          </div>
        )}

        {/* Services Cards Grid */}
        {!isLoading && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Main Showcase Image */}
                  <div className="relative h-48 w-full bg-gray-900">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {service.category || 'Wedding Service'}
                    </div>
                  </div>

                  {/* 4 Mini Thumbnails Row */}
                  <div className="grid grid-cols-4 gap-1.5 p-2.5 bg-[#fcfaf7] border-b border-[#ebdcc8]">
                    {[0, 1, 2, 3].map((idx) => {
                      const thumbImg = service.thumbnails?.[idx] || service.image;
                      return (
                        <div key={idx} className="relative aspect-square bg-gray-200 rounded-md overflow-hidden border border-gray-200 shadow-2xs">
                          {thumbImg ? (
                            <Image
                              src={thumbImg}
                              alt={`Thumb ${idx + 1}`}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-400">
                              #{idx + 1}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold font-serif-display text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {service.description || 'Authentic Bengali wedding and event management service with premium quality.'}
                    </p>

                    {service.buttonText && (
                      <span className="inline-block text-[10px] font-semibold text-[#c8102e] bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                        Button: &quot;{service.buttonText}&quot;
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-[#faf7f2] border-t border-[#ebdcc8] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Live on Website
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#c8102e] hover:bg-white px-3 py-1.5 rounded-lg border border-gray-300 shadow-xs transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove "${service.title}"?`)) {
                          deleteService(service.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal - Clean Structured Design */}
      {(isAddModalOpen || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#ebdcc8] my-8 max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
            {/* Sticky Modal Header */}
            <div className="p-6 sm:p-7 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {editingService ? 'Edit Offering' : 'New Offering'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-gray-900">
                  {editingService ? `Edit Service: ${editingService.title}` : 'Add Wedding Service'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingService(null);
                }}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <form
              id="service-form"
              onSubmit={editingService ? handleSaveEdit : handleCreateService}
              className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm"
            >
              {/* Title & Button Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priest / Vedic Priests"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Booking Button Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Book us for priest"
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Category Tag & Suggestions */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rituals, Decoration, Catering..."
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all mb-2"
                />
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-gray-400 font-medium">Suggestions:</span>
                  {['Rituals', 'Decoration', 'Beauty & Styling', 'Photography', 'Catering', 'Music & Entry'].map(
                    (cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormCategory(cat)}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          formCategory === cat
                            ? 'bg-[#c8102e] text-white border-[#c8102e]'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Traditional experienced bengali priests & vedic priests..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Main Showcase Image Uploader */}
              <div className="bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8]">
                <ImageKitUploader
                  key={`main-${uploadKey}`}
                  label="Main Service Showcase Photo (Large Right Image)"
                  folder="/shuvayan_services"
                  currentImageUrl={formImage}
                  onUploadSuccess={(url) => setFormImage(url)}
                  onClear={() => setFormImage('')}
                />
              </div>

              {/* 4 Supporting Thumbnails Section */}
              <div className="bg-[#fcfaf7] p-5 rounded-2xl border border-[#ebdcc8] space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    4 Supporting Photo Thumbnails (Slider Strip)
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Upload 4 distinct photos. Clicking any thumbnail on the frontend switches the large showcase image!
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <CompactThumbnailTile
                    label="Thumb #1"
                    currentImageUrl={formThumb1}
                    onUploadSuccess={(url) => setFormThumb1(url)}
                    onClear={() => setFormThumb1('')}
                  />

                  <CompactThumbnailTile
                    label="Thumb #2"
                    currentImageUrl={formThumb2}
                    onUploadSuccess={(url) => setFormThumb2(url)}
                    onClear={() => setFormThumb2('')}
                  />

                  <CompactThumbnailTile
                    label="Thumb #3"
                    currentImageUrl={formThumb3}
                    onUploadSuccess={(url) => setFormThumb3(url)}
                    onClear={() => setFormThumb3('')}
                  />

                  <CompactThumbnailTile
                    label="Thumb #4"
                    currentImageUrl={formThumb4}
                    onUploadSuccess={(url) => setFormThumb4(url)}
                    onClear={() => setFormThumb4('')}
                  />
                </div>
              </div>
            </form>

            {/* Sticky Modal Action Footer */}
            <div className="p-4 sm:p-5 bg-[#faf7f2] border-t border-[#ebdcc8] flex items-center justify-end gap-3 sticky bottom-0 z-20">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingService(null);
                }}
                className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="service-form"
                className="px-7 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {editingService ? 'Save Service Changes' : 'Create Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
