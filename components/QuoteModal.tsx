import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle, Phone, Calendar, User, Mail, MapPin, Sparkles, Send } from 'lucide-react';
import { useAdminData } from '@/context/AdminDataContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function QuoteModal({ isOpen, onClose, initialService }: QuoteModalProps) {
  const { addLead, services } = useAdminData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('Kolkata & Suburbs');
  const [guestCount, setGuestCount] = useState('150-300');
  const [customServices, setCustomServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultServiceOptions = [
    'Priest / Vedic Priests',
    'Trey Decor (Tatta Trays)',
    'Bridal Mehendi & Henna',
    'Bridal Makeover & Styling',
    'Photography & Cinematic Films',
    'Theme & Mandap Decorations',
    'Authentic Bengali Catering',
    'Luxury Bridal Car Service',
    'Grand Bride & Groom Entry',
    'Digital Animated Invitation',
  ];

  const availableServices = services && services.length > 0
    ? Array.from(new Set(services.map((s) => s.title)))
    : defaultServiceOptions;

  const selectedServices = initialService
    ? Array.from(new Set([initialService, ...customServices]))
    : customServices;

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setCustomServices(selectedServices.filter((s) => s !== srv));
    } else {
      setCustomServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const leadPayload = {
      name: name || 'Prospective Client',
      phone: phone,
      email: email || 'N/A',
      eventDate: eventDate || 'TBD',
      eventType: eventLocation ? `Event in ${eventLocation}` : 'Bengali Wedding',
      service: selectedServices.length > 0 ? selectedServices.join(', ') : 'Custom Wedding Inquiry',
      guestCount: guestCount,
      budget: 'Standard',
      message: notes || 'Submitted via Get Quote on website.',
    };

    // 1. Sync to Admin Context & Firebase Firestore directly
    addLead(leadPayload);

    // 2. Also send to /api/leads endpoint
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
    } catch (err) {
      console.warn('API leads submission note:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="quote-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div
        id="quote-modal-container"
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#e5d8c3] my-8"
      >
        {/* Header with decorative background */}
        <div className="bg-gradient-to-r from-[#1c1212] via-[#2d1b1b] to-[#1c1212] p-6 text-white relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image
                src="/images/heart.svg"
                alt="Heart"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
                Shuvayan Wedding &amp; Event Concierge
              </p>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                Request a Custom Quote
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-serif-display text-2xl font-bold text-[#1f2937]">
                Thank You, {name || 'Valued Guest'}!
              </h4>
              <p className="text-sm text-[#4b5563] max-w-md mx-auto leading-relaxed">
                Your wedding inquiry has been received. Our senior wedding planner will contact you at{' '}
                <span className="font-semibold text-[#c8102e]">{phone || 'your phone'}</span> within 24 hours with an itemized proposal.
              </p>
              <div className="pt-6">
                <button
                  onClick={resetAndClose}
                  className="bg-[#c8102e] hover:bg-[#a80b24] text-white font-semibold px-8 py-2.5 rounded-full text-sm shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourav Mukherjee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98300XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="youremail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Expected Event Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guest count & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Event Venue / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. South Kolkata / Salt Lake / Howrah"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                    Expected Guest Count
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none bg-white"
                  >
                    <option value="50-100">Intimate (50 - 100 guests)</option>
                    <option value="100-250">Standard (100 - 250 guests)</option>
                    <option value="250-500">Medium (250 - 500 guests)</option>
                    <option value="500+">Grand Gala (500+ guests)</option>
                  </select>
                </div>
              </div>

              {/* Services Required Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-2">
                  Select Required Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableServices.map((srv) => {
                    const isChecked = selectedServices.some(
                      (s) => s.toLowerCase().includes(srv.toLowerCase().slice(0, 5))
                    );
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-colors ${
                          isChecked
                            ? 'border-[#c8102e] bg-[#fff5f5] text-[#c8102e] font-semibold'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#c8102e] border-[#c8102e] text-white'
                              : 'border-gray-400'
                          }`}
                        >
                          {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                        </span>
                        <span>{srv}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional message / notes */}
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                  Special Notes or Specific Themes
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your wedding dreams, specific catering requests, or dates..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c8102e] hover:bg-[#a80b24] text-white font-semibold py-3 rounded-full text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Calculating Custom Quote...</span>
                  ) : (
                    <>
                      <span>Send Quote Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-gray-500 text-center mt-2">
                  No obligation &bull; Instant WhatsApp callback &bull; Direct planner consultation
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
