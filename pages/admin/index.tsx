import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Briefcase,
  Package,
  Image as ImageIcon,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData, LeadItem } from '@/context/AdminDataContext';

export default function AdminDashboardPage() {
  const { leads, services, packages, artists, updateLeadStatus, isLoading } = useAdminData();
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const newLeads = leads.filter((l) => l.status === 'New');
  const confirmedLeads = leads.filter((l) => l.status === 'Confirmed');
  const inProgressLeads = leads.filter((l) => l.status === 'In Progress' || l.status === 'Contacted');

  const totalPhotosCount = artists.reduce((acc, a) => acc + a.photos.length, 0);

  const getStatusBadge = (status: LeadItem['status']) => {
    switch (status) {
      case 'New':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Welcome back! Here is a summary of your wedding inquiries, active portfolio & content."
      activeNav="dashboard"
    >
      <div className="space-y-8">
        {/* 1. Metric Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Leads */}
          <div className="bg-white rounded-2xl p-5 border border-[#e8dfd3] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total Inquiries
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#c8102e] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{leads.length}</span>
              {newLeads.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  {newLeads.length} new
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Active Pipeline</span>
            </p>
          </div>

          {/* Card 2: Confirmed Bookings */}
          <div className="bg-white rounded-2xl p-5 border border-[#e8dfd3] shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Confirmed Bookings
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{confirmedLeads.length}</span>
              <span className="text-xs text-gray-500">weddings locked</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {inProgressLeads.length} currently in discussion
            </p>
          </div>

          {/* Card 3: Services & Packages */}
          <div className="bg-white rounded-2xl p-5 border border-[#e8dfd3] shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Active Offerings
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#d99824] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">
                {services.length + packages.length}
              </span>
              <span className="text-xs text-gray-500">
                ({services.length} services, {packages.length} pkgs)
              </span>
            </div>
            <Link
              href="/admin/services"
              className="text-xs text-[#c8102e] hover:underline font-semibold mt-2 inline-block"
            >
              Manage Catalog &rarr;
            </Link>
          </div>

          {/* Card 4: Portfolio Gallery */}
          <div className="bg-white rounded-2xl p-5 border border-[#e8dfd3] shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Gallery &amp; Artists
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900">{artists.length}</span>
              <span className="text-xs text-gray-500">artists ({totalPhotosCount} photos)</span>
            </div>
            <Link
              href="/admin/gallery"
              className="text-xs text-[#c8102e] hover:underline font-semibold mt-2 inline-block"
            >
              Update Portfolio &rarr;
            </Link>
          </div>
        </div>

        {/* 2. Quick Action Shortcuts */}
        <div className="bg-gradient-to-r from-[#211210] to-[#361a17] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif-display text-white">
                Quick Content Management
              </h2>
              <p className="text-xs text-gray-300">
                Instantly add new services, packages, or gallery artist portfolios
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/admin/leads"
                className="inline-flex items-center gap-2 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>View Leads ({newLeads.length} New)</span>
              </Link>

              <Link
                href="/admin/services"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </Link>

              <Link
                href="/admin/packages"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </Link>

              <Link
                href="/admin/gallery"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl border border-white/20 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Add Artist</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Recent Incoming Leads Table */}
        <div className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#ebdcc8] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                Recent Inquiries &amp; Quotes
              </h3>
              <p className="text-xs text-gray-500">
                Latest wedding requests submitted via website &quot;Get Quote&quot; buttons
              </p>
            </div>

            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#c8102e] hover:underline flex items-center gap-1"
            >
              <span>View All Leads ({leads.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#faf7f2] text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-[#ebdcc8]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Client Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Event Date &amp; Service</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebdcc8]/50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      <div className="w-6 h-6 border-2 border-[#c8102e] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Loading Firebase data...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      No customer inquiries found in Firebase yet.
                    </td>
                  </tr>
                ) : (
                  leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#fcfaf7] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                      <div>{lead.name}</div>
                      <div className="text-[11px] text-gray-500 font-normal">{lead.createdAt}</div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                      {lead.email && lead.email !== 'N/A' && (
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-0.5">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{lead.email}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{lead.service}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{lead.eventDate}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value as LeadItem['status'])
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                          lead.status
                        )} outline-none cursor-pointer`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-xs font-semibold text-[#c8102e] hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-serif-display text-gray-900">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-gray-500">Submitted on {selectedLead.createdAt}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Phone</span>
                <span className="text-gray-900 font-semibold">{selectedLead.phone}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium block">Email</span>
                <span className="text-gray-900 font-semibold">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium block">Event Date</span>
                <span className="text-gray-900 font-semibold">{selectedLead.eventDate}</span>
              </div>
              <div>
                <span className="text-gray-500 font-medium block">Guest Count</span>
                <span className="text-gray-900 font-semibold">
                  {selectedLead.guestCount || 'N/A'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 font-medium block">Requested Services</span>
                <span className="text-gray-900 font-semibold">{selectedLead.service}</span>
              </div>
              {selectedLead.message && (
                <div className="col-span-2 bg-[#faf7f2] p-3 rounded-xl border border-[#ebdcc8]">
                  <span className="text-gray-500 font-medium block mb-1">Notes / Requirements</span>
                  <p className="text-gray-800 italic">{selectedLead.message}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <a
                href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-1.5 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
