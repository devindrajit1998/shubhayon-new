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
  const { services, addService, updateService, deleteService } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Decoration');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('/images/gallery-1.jpg');

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
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, {
      title: formTitle,
      category: formCategory,
      description: formDesc,
      image: formImage,
    });

    setEditingService(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    addService({
      title: formTitle,
      category: formCategory,
      description: formDesc || 'Expert service tailored to traditional Bengali wedding celebrations.',
      image: formImage || '/images/gallery-1.jpg',
    });

    setFormTitle('');
    setFormDesc('');
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout
      title="Services Manager"
      subtitle="Manage, edit, and add the wedding services displayed across the Shuvayan website."
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
              {services.length} Total Services Active
            </span>
            <button
              onClick={() => {
                setFormTitle('');
                setFormCategory('Decoration');
                setFormDesc('');
                setFormImage('/images/gallery-1.jpg');
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
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
      </div>

      {/* Add / Edit Service Modal */}
      {(isAddModalOpen || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Wedding Service'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingService(null);
                }}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={editingService ? handleSaveEdit : handleCreateService}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Mandap & Floral Decor"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Decoration, Makeover, Catering, Photography"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service Image
                </label>
                
                {/* ImageKit Direct Uploader */}
                <div className="mb-3">
                  <ImageKitUploader
                    label="Upload to ImageKit CDN"
                    folder="/shuvayan_services"
                    onUploadSuccess={(url) => setFormImage(url)}
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="/images/gallery-1.jpg or https://ik.imagekit.io/..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-gray-500">Quick select sample image:</span>
                  {['/images/gallery-1.jpg', '/images/gallery-2.jpg', '/images/gallery-3.jpg', '/images/banner-left.jpg'].map(
                    (img) => (
                      <button
                        type="button"
                        key={img}
                        onClick={() => setFormImage(img)}
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          formImage === img
                            ? 'bg-[#c8102e] text-white border-[#c8102e]'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}
                      >
                        {img.split('/').pop()?.split('.')[0]}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what this service entails for clients..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-xl shadow-xs"
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
