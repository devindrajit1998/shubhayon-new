import React, { useState } from 'react';
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
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';
import { ServiceItem } from '@/components/ServicesSection';
import ImageKitUploader from '@/components/admin/ImageKitUploader';

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
  const [formImage, setFormImage] = useState('');

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormTitle(service.title);
    setFormCategory(service.category || 'Decoration');
    setFormDesc(service.description || '');
    setFormImage(service.image);
    setUploadKey((k) => k + 1);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, {
      title: formTitle,
      category: formCategory,
      description: formDesc,
      image: formImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-01.jpg',
    });

    setEditingService(null);
    setFormTitle('');
    setFormDesc('');
    setFormImage('');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    addService({
      title: formTitle,
      category: formCategory,
      description: formDesc || 'Expert service tailored to traditional Bengali wedding celebrations.',
      image: formImage || 'https://ik.imagekit.io/thhqkqsnb/shuvayan_assets/Service-thumb-01.jpg',
    });

    setFormTitle('');
    setFormDesc('');
    setFormImage('');
    setUploadKey((k) => k + 1);
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Services Manager"
      subtitle="Manage, edit, and add the wedding services stored in your Firebase cloud database."
      activeNav="services"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search services by title..."
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
              onClick={() => {
                setFormTitle('');
                setFormCategory('Decoration');
                setFormDesc('');
                setFormImage('');
                setUploadKey((k) => k + 1);
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
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
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Service</span>
            </button>
          </div>
        )}

        {/* Services Cards Grid */}
        {!isLoading && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-44 w-full bg-gray-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {service.category || 'Wedding Service'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold font-serif-display text-gray-900 mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {service.description || 'Authentic Bengali wedding and event management service with premium quality.'}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-[#faf7f2] border-t border-[#ebdcc8] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Live on site
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#c8102e] hover:bg-white px-3 py-1.5 rounded-lg border border-gray-300 shadow-xs transition-colors"
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
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Add / Edit Service Modal */}
      {(isAddModalOpen || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] space-y-6 my-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {editingService ? 'Edit Offering' : 'New Offering'}
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  {editingService ? `Edit Service: ${editingService.title}` : 'Add Wedding Service'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingService(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={editingService ? handleSaveEdit : handleCreateService}
              className="space-y-5 text-xs sm:text-sm"
            >
              {/* Service Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Mandap & Floral Decor"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Category Tag & Suggestions */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Decoration, Beauty & Styling, Catering..."
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all mb-2"
                />
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-gray-400 font-medium">Quick suggestions:</span>
                  {['Decoration', 'Beauty & Styling', 'Photography', 'Catering', 'Rituals', 'Music & Entry'].map(
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

              {/* Enhanced ImageKit Uploader with Real Thumbnail Preview */}
              <div className="pt-1">
                <ImageKitUploader
                  key={uploadKey}
                  label="Service Photo"
                  folder="/shuvayan_services"
                  currentImageUrl={formImage}
                  onUploadSuccess={(url) => setFormImage(url)}
                  onClear={() => setFormImage('')}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what this service entails for wedding clients..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingService(null);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
