import React, { useState } from 'react';
import Image from 'next/image';
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Edit2,
  Star,
  Calendar,
  CheckCircle2,
  X,
  User,
  Sparkles,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageKitUploader from '@/components/admin/ImageKitUploader';
import { useAdminData, TestimonialItem } from '@/context/AdminDataContext';

export default function AdminTestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, isLoading } = useAdminData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [event, setEvent] = useState('Bengali Wedding at Rajbari');
  const [date, setDate] = useState('January 2026');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [avatar, setAvatar] = useState('');

  const openAddModal = () => {
    setName('');
    setEvent('Bengali Wedding at Rajbari');
    setDate('January 2026');
    setRating(5);
    setQuote('');
    setAvatar('');
    setIsAddOpen(true);
  };

  const openEditModal = (t: TestimonialItem) => {
    setEditingItem(t);
    setName(t.name);
    setEvent(t.event);
    setDate(t.date);
    setRating(t.rating || 5);
    setQuote(t.quote);
    setAvatar(t.avatar || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    if (editingItem) {
      updateTestimonial(editingItem.id, {
        name,
        event,
        date,
        rating,
        quote,
        avatar,
      });
      setEditingItem(null);
    } else {
      addTestimonial({
        name,
        event,
        date,
        rating,
        quote,
        avatar,
      });
      setIsAddOpen(false);
    }

    setName('');
    setQuote('');
    setAvatar('');
  };

  return (
    <AdminLayout
      title="Client Reviews & Testimonials"
      subtitle="Manage real customer feedback, wedding reviews, and client profile photos stored in Firebase."
      activeNav="testimonials"
    >
      <div className="space-y-6">
        {/* Top Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Active Testimonials</h2>
            <p className="text-xs text-gray-500">{testimonials.length} Reviews in Firebase</p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
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
        {!isLoading && testimonials.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-[#d5c3aa] p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#fcedeb] text-[#c8102e] flex items-center justify-center mx-auto mb-3">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">No Reviews in Firebase</h3>
            <p className="text-xs text-gray-500 mb-5">
              Your Firebase testimonials collection is empty. Click below to add your first client review with couple portrait.
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Review</span>
            </button>
          </div>
        )}

        {/* Testimonials Grid */}
        {!isLoading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
              >
                <div>
                  {/* Top Quote Icon & Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {t.rating || 5}.0 Stars
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 italic leading-relaxed mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author & Profile Photo Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar Thumbnail */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#d99824] bg-amber-50 flex-shrink-0 flex items-center justify-center">
                      {t.avatar ? (
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User className="w-5 h-5 text-[#d99824]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{t.name}</h4>
                      <p className="text-[11px] text-gray-500 truncate">
                        {t.event} &bull; {t.date}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1.5 text-gray-400 hover:text-[#c8102e] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit review & photo"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete testimonial from "${t.name}"?`)) {
                          deleteTestimonial(t.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete review"
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

      {/* Add / Edit Testimonial Modal */}
      {(isAddOpen || editingItem) && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] space-y-5 my-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {editingItem ? 'Edit Review' : 'New Review'}
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  {editingItem ? 'Edit Client Testimonial' : 'Add Client Testimonial'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddOpen(false);
                  setEditingItem(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              {/* Couple Profile Avatar Uploader */}
              <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8]">
                <ImageKitUploader
                  label="Couple / Client Profile Photo (Avatar)"
                  aspect="square"
                  folder="/shuvayan_testimonials"
                  currentImageUrl={avatar}
                  onUploadSuccess={(url) => setAvatar(url)}
                  onClear={() => setAvatar('')}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Couple / Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan & Sreeparna Banerjee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Event Venue & Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Wedding at ITC Sonar"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Event Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. January 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Star Rating ({rating} Stars)
                  </label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300 hover:text-amber-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Review Feedback Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What did the client say about Shuvayan's decor, catering, and hospitality?..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {editingItem ? 'Update Review' : 'Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
