import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';
import { useAppModals } from '@/context/AppModalContext';

export default function TestimonialsSection() {
  const { testimonials, addTestimonial } = useAdminData();
  const { openQuoteModal } = useAppModals();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEvent, setReviewerEvent] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerQuote, setReviewerQuote] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const defaultTestimonials = [
    {
      id: 't-1',
      name: 'Priyanka & Debashis',
      event: 'Vedic Wedding & Royal Mandap, Kolkata',
      date: 'January 2026',
      rating: 5,
      quote:
        'Shuvayan made our dream wedding flawless! From the Sanskrit Vedic mantras to the grand mandap decor and live Bhetki Paturi banquet, every single guest was mesmerized.',
    },
    {
      id: 't-2',
      name: 'Ananya & Souvik',
      event: 'Bespoke Tatta Trays & Bridal Makeover',
      date: 'December 2025',
      rating: 5,
      quote:
        'The artisanal Tatta tray decoration was the highlight of our Gaye Holud. The bride makeover was so elegant and stayed flawless throughout the night!',
    },
    {
      id: 't-3',
      name: 'Rupsha & Sayantan',
      event: 'Grand Reception & Cinematic Photography',
      date: 'November 2025',
      rating: 5,
      quote:
        'Stress-free, luxurious, and deeply rooted in Bengali culture. Their team handled everything with utter professionalism and warmth. Highly recommended!',
    },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewerQuote) return;

    addTestimonial({
      name: reviewerName,
      event: reviewerEvent || 'Wedding Celebration',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      rating: reviewerRating,
      quote: reviewerQuote,
    });

    setSubmittedReview(true);
    setTimeout(() => {
      setSubmittedReview(false);
      setShowReviewModal(false);
      setReviewerName('');
      setReviewerEvent('');
      setReviewerQuote('');
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-[#fbf9f6] relative overflow-hidden border-t border-[#f0e5d5]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p
            id="testimonials-subheading"
            className="text-[#c8102e] font-semibold text-sm sm:text-base tracking-normal mb-1.5"
          >
            Heartfelt Stories
          </p>
          <h2
            id="testimonials-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4a4646] tracking-tight"
          >
            What Our Couples Say
          </h2>

          {/* Red line with Heart Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="w-14 sm:w-16 h-[1.5px] bg-[#c8102e]" />
            <span className="relative w-3.5 h-3.5 inline-block">
              <Image
                src="/images/heart.svg"
                alt="Heart"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </span>
            <span className="w-14 sm:w-16 h-[1.5px] bg-[#c8102e]" />
          </div>

          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2">
            Real memories and authentic testimonials from couples who celebrated their timeless Bengali weddings with Shuvayan.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              {/* Top Quote Icon and Star Rating */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#d99824] flex items-center justify-center border border-amber-200">
                    <MessageSquareQuote className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (t.rating || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4b4646] leading-relaxed italic pt-2">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & Event Details */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-display text-base font-bold text-gray-900">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#c8102e] font-semibold mt-0.5">
                    {t.event}
                  </p>
                </div>
                {t.date && (
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                    {t.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Share Review CTA Footer */}
        <div className="mt-12 text-center flex items-center justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 bg-[#fffdfa] hover:bg-white text-[#784d16] border border-[#e0cbaf] text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#d99824]" />
            <span>Leave a Couple Review</span>
          </button>
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] space-y-5 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-lg font-bold font-serif-display text-gray-900">
                  Share Your Wedding Experience
                </h3>
                <p className="text-xs text-gray-500">Your feedback helps inspire future Bengali brides & grooms</p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            {submittedReview ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-gray-900">Thank You For Your Review!</h4>
                <p className="text-xs text-gray-500">Your feedback has been saved and published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Couple Names
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sreya & Rahul"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Celebration Venue / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vedic Wedding, ITC Sonar Kolkata"
                    value={reviewerEvent}
                    onChange={(e) => setReviewerEvent(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewerRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewerRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-700 ml-2">
                      {reviewerRating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Review & Experience
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the rituals, decor, catering, and execution..."
                    value={reviewerQuote}
                    onChange={(e) => setReviewerQuote(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
