import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Calendar,
  Trash2,
  Download,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Sparkles,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData, LeadItem } from '@/context/AdminDataContext';

export default function AdminLeadsPage() {
  const { leads, addLead, updateLeadStatus, deleteLead } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newService, setNewService] = useState('Full Wedding Management');
  const [newGuestCount, setNewGuestCount] = useState('250');
  const [newMessage, setNewMessage] = useState('');

  // Filter & search logic
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    addLead({
      name: newName,
      phone: newPhone,
      email: newEmail || 'N/A',
      eventDate: newEventDate || 'TBD',
      eventType: 'Direct Admin Entry',
      service: newService,
      guestCount: newGuestCount,
      budget: 'Standard',
      message: newMessage,
    });

    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewEventDate('');
    setNewMessage('');
    setIsAddModalOpen(false);
  };

  const exportToCSV = () => {
    const headers = 'ID,Name,Phone,Email,Event Date,Service,Guest Count,Status,Created At\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.eventDate}","${l.service}","${l.guestCount || ''}","${l.status}","${l.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shuvayan_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="Leads & Quotes CRM"
      subtitle="Track, filter, and manage incoming wedding quote requests & offline customer inquiries."
      activeNav="leads"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, phone, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#faf7f2] border border-[#e0d3c1] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
            />
          </div>

          {/* Filter Status Pills & Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-[#faf7f2] p-1 rounded-xl border border-[#e0d3c1] text-xs overflow-x-auto no-scrollbar">
              {['All', 'New', 'Contacted', 'In Progress', 'Confirmed', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    filterStatus === st
                      ? 'bg-[#c8102e] text-white shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#59370e] text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#e0d3c1] transition-colors"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#faf7f2] text-gray-600 font-semibold uppercase text-[11px] tracking-wider border-b border-[#ebdcc8]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Client Name</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Event Date</th>
                  <th className="py-3.5 px-4">Requested Service</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebdcc8]/50">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      No leads match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#fcfaf7] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                        <div>{lead.name}</div>
                        <div className="text-[11px] text-gray-400 font-normal">
                          {lead.createdAt}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{lead.phone}</span>
                        </div>
                        {lead.email && lead.email !== 'N/A' && (
                          <div className="text-gray-500 text-xs mt-0.5">{lead.email}</div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-gray-700">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{lead.eventDate}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-gray-900">{lead.service}</span>
                        {lead.guestCount && (
                          <span className="block text-[11px] text-gray-500">
                            ~{lead.guestCount} guests
                          </span>
                        )}
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
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 text-gray-600 hover:text-[#c8102e] hover:bg-red-50 rounded-lg transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete lead "${lead.name}"?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manual Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                Add New Wedding Inquiry
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rupam Bhattacharya"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300XXXXX"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Service / Package
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bridal Makeover, Full Vedic Wedding"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Requirement Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Client notes, special venue details, etc."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-xl shadow-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-serif-display text-gray-900">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-gray-500">Inquiry ID: {selectedLead.id}</p>
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
                <span className="text-gray-500 font-medium block">Estimated Guests</span>
                <span className="text-gray-900 font-semibold">
                  {selectedLead.guestCount || 'N/A'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 font-medium block">Service(s) Requested</span>
                <span className="text-gray-900 font-semibold">{selectedLead.service}</span>
              </div>
              {selectedLead.message && (
                <div className="col-span-2 bg-[#faf7f2] p-3 rounded-xl border border-[#ebdcc8]">
                  <span className="text-gray-500 font-medium block mb-1">Client Notes</span>
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
