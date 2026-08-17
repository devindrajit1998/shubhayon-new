import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MessageSquareQuote, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

export default function TestimonialsSection() {
  const { testimonials, addTestimonial, isLoading, error } = useAdminData();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEvent, setReviewerEvent] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerQuote, setReviewerQuote] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewerQuote) return;

    await addTestimonial({
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
    <section id="testimonials" className="py-10 lg:py-14 bg-[#fbf9f6] relative overflow-hidden border-t border-[#f0e5d5]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <p className="text-[#c91103] font-semibold text-sm sm:text-[25px] tracking-normal">
            Cherished Words
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#787576] tracking-tight">
            Couple Reviews &amp; Testimonials
          </h2>

          {/* Red line with Heart Divider */}
          <div className="flex items-center justify-center gap-3 my-2.5">
            <span className="w-12 sm:w-14 h-[1.5px] bg-[#c8102e]" />
            <span className="relative w-3.5 h-3.5 inline-block">
              <Image
                src="/images/heart.svg"
                alt="Heart"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </span>
            <span className="w-12 sm:w-14 h-[1.5px] bg-[#c8102e]" />
          </div>
        </div>

        {/* 1. Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd3] animate-pulse space-y-4"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-2xl" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="pt-6 border-t border-gray-100 flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !error && testimonials.length === 0 && (
          <div className="bg-white border border-dashed border-[#e8dfd3] rounded-3xl p-12 text-center max-w-lg mx-auto space-y-3">
            <MessageSquareQuote className="w-10 h-10 text-[#d99824] mx-auto" />
            <h3 className="font-serif-display text-lg font-bold text-gray-800">
              No Reviews Published Yet
            </h3>
            <p className="text-xs text-gray-500">
              Were you a guest or couple at a recent Shuvayan celebration? We&apos;d love to hear your story!
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Leave the First Review</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. Real Firebase Testimonials Grid */}
        {!isLoading && !error && testimonials.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((t, idx) => (
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
                            className={`w-4 h-4 ${star <= (t.rating || 5)
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
          </>
        )}
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
                <p className="text-xs text-gray-500">Your feedback helps inspire future Bengali brides &amp; grooms</p>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg text-sm cursor-pointer"
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
                    placeholder="e.g. Sreya &amp; Rahul"
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
                    placeholder="e.g. Royal Mandap, Kolkata"
                    value={reviewerEvent}
                    onChange={(e) => setReviewerEvent(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewerRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= reviewerRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Wedding Story / Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share what made your celebration unforgettable with Shuvayan..."
                    value={reviewerQuote}
                    onChange={(e) => setReviewerQuote(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs font-bold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-xl shadow cursor-pointer"
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
