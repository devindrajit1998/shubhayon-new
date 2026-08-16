import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Star,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData, TestimonialItem } from '@/context/AdminDataContext';

export default function AdminTestimonialsPage() {
  const { testimonials, addTestimonial, deleteTestimonial } = useAdminData();
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [event, setEvent] = useState('Bengali Wedding at Rajbari');
  const [date, setDate] = useState('January 2026');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    addTestimonial({
      name,
      event,
      date,
      rating,
      quote,
    });

    setName('');
    setQuote('');
    setIsAddOpen(false);
  };

  return (
    <AdminLayout
      title="Client Reviews & Testimonials"
      subtitle="Manage real customer feedback, wedding event reviews, and star ratings."
      activeNav="testimonials"
    >
      <div className="space-y-6">
        {/* Top Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Active Testimonials</h2>
            <p className="text-xs text-gray-500">{testimonials.length} Reviews live on the website</p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-gray-700 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                  <p className="text-[11px] text-gray-500">
                    {t.event} &bull; {t.date}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Delete testimonial from "${t.name}"?`)) {
                      deleteTestimonial(t.id);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                Add Client Testimonial
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Couple / Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourav & Tanushree"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Event Venue / Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wedding at Rajbari Bawali"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. February 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rating (1-5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Review Feedback Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What did the client say about Shuvayan's services?"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-xl shadow-xs"
                >
                  Add Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
