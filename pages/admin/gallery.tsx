import React, { useState } from 'react';
import Image from 'next/image';
import {
  ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Tag,
  User,
  Sparkles,
  Award,
  Layers,
  X,
  ExternalLink,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/context/AdminDataContext';
import { ArtistProfile } from '@/pages/gallery';
import ImageKitUploader from '@/components/admin/ImageKitUploader';

export default function AdminGalleryPage() {
  const {
    categories,
    artists,
    addCategory,
    deleteCategory,
    addArtist,
    updateArtist,
    deleteArtist,
    addPhotoToArtist,
    removePhotoFromArtist,
    isLoading,
  } = useAdminData();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingArtist, setEditingArtist] = useState<ArtistProfile | null>(null);
  const [isAddArtistOpen, setIsAddArtistOpen] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');
  const [activePhotoArtist, setActivePhotoArtist] = useState<ArtistProfile | null>(null);

  // Artist Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Makeover Artist');
  const [formEvents, setFormEvents] = useState('150+ Weddings');
  const [formCategory, setFormCategory] = useState(categories[0] || 'Bridal Makeover');
  const [formAvatar, setFormAvatar] = useState('');
  const [formBio, setFormBio] = useState('');

  // Photo Add Form
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoImage, setNewPhotoImage] = useState('');
  const [uploadKey, setUploadKey] = useState(0);

  const filteredArtists = artists.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const openEditArtist = (artist: ArtistProfile) => {
    setEditingArtist(artist);
    setFormName(artist.name);
    setFormRole(artist.role);
    setFormEvents(artist.eventsCount);
    setFormCategory(artist.category);
    setFormAvatar(artist.avatar || '');
    setFormBio(artist.bio || '');
  };

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtist) return;

    updateArtist(editingArtist.id, {
      name: formName,
      role: formRole,
      eventsCount: formEvents,
      category: formCategory,
      avatar: formAvatar,
      bio: formBio,
    });

    setEditingArtist(null);
  };

  const handleCreateArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    addArtist({
      name: formName,
      role: formRole || 'Specialist Artisan',
      eventsCount: formEvents || '100+ Celebrations',
      category: formCategory,
      avatar: formAvatar,
      bio: formBio,
      photos: [],
    });

    setFormName('');
    setFormAvatar('');
    setFormBio('');
    setIsAddArtistOpen(false);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePhotoArtist || !newPhotoImage) return;

    const addedTitle = newPhotoTitle.trim() || `${activePhotoArtist.name} Showcase`;
    const addedImage = newPhotoImage;

    addPhotoToArtist(activePhotoArtist.id, {
      title: addedTitle,
      image: addedImage,
    });

    // Instantly clear top upload form
    setNewPhotoTitle('');
    setNewPhotoImage('');
    setUploadKey((k) => k + 1);

    // Keep active artist in sync
    const currentArtist = artists.find((a) => a.id === activePhotoArtist.id);
    if (currentArtist) {
      setActivePhotoArtist({
        ...currentArtist,
        photos: [
          ...currentArtist.photos,
          {
            title: addedTitle,
            image: addedImage,
          },
        ],
      });
    }
  };

  return (
    <AdminLayout
      title="Gallery & Artists Manager"
      subtitle="Manage portfolio categories, artist profiles, and their 5-photo showcase strips."
      activeNav="gallery"
    >
      <div className="space-y-8">
        {/* 1. Category Tabs Management */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8dfd3] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Portfolio Categories</h2>
              <p className="text-xs text-gray-500">
                These tabs appear on the public Gallery page filter bar
              </p>
            </div>

            {/* Add Category inline */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="New Category Name..."
                value={newCatInput}
                onChange={(e) => setNewCatInput(e.target.value)}
                className="px-3 py-1.5 bg-[#faf7f2] border border-[#e0d3c1] rounded-xl text-xs focus:ring-2 focus:ring-[#c8102e] outline-none flex-1 sm:w-52"
              />
              <button
                onClick={() => {
                  if (newCatInput.trim()) {
                    addCategory(newCatInput.trim());
                    setNewCatInput('');
                  }
                }}
                className="bg-[#c8102e] text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl hover:bg-[#a80b24] shadow-xs"
              >
                Add Tab
              </button>
            </div>
          </div>

          {/* Active Categories Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#180d0c] text-white'
                  : 'bg-[#faf7f2] text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories ({artists.length})
            </button>

            {categories.map((cat) => (
              <div
                key={cat}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  selectedCategory === cat
                    ? 'bg-[#f6c367] text-[#2a1d1d] border-[#e0aa48] font-bold shadow-xs'
                    : 'bg-[#faf7f2] text-gray-700 border-[#e5d8c3] hover:bg-white'
                }`}
              >
                <button onClick={() => setSelectedCategory(cat)} className="cursor-pointer">
                  {cat}
                </button>
                {categories.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`Remove category "${cat}"?`)) {
                        deleteCategory(cat);
                      }
                    }}
                    className="text-gray-400 hover:text-red-600 p-0.5 rounded"
                    title="Remove Tab"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Artists & Portfolio Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-serif-display text-gray-900">
                Artist Profiles ({filteredArtists.length})
              </h2>
              <p className="text-xs text-gray-500">Each artist profile has a photo gallery strip</p>
            </div>

            <button
              onClick={() => {
                setFormName('');
                setFormRole('Makeover Artist');
                setFormEvents('150+ Weddings');
                setFormCategory(categories[0] || 'Bridal Makeover');
                setIsAddArtistOpen(true);
              }}
              className="inline-flex items-center gap-1.5 bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Artist Profile</span>
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
          {!isLoading && filteredArtists.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-[#d5c3aa] p-12 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#fcedeb] text-[#c8102e] flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">No Artists in Firebase</h3>
              <p className="text-xs text-gray-500 mb-5">
                {selectedCategory !== 'All'
                  ? `No artist profiles found under "${selectedCategory}".`
                  : 'Your Firebase gallery collection is empty. Click below to add your first artist profile.'}
              </p>
              <button
                onClick={() => setIsAddArtistOpen(true)}
                className="inline-flex items-center gap-2 bg-[#c8102e] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Artist Profile</span>
              </button>
            </div>
          )}

          {!isLoading && filteredArtists.length > 0 && (
            <div className="space-y-6">
              {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs p-5 sm:p-6 space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Artist Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#e8c89c] bg-[#fdecd2] flex items-center justify-center font-bold text-sm text-[#8c4604] flex-shrink-0 shadow-xs">
                      {artist.avatar ? (
                        <Image
                          src={artist.avatar}
                          alt={artist.name}
                          fill
                          className="object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span>{artist.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-gray-900">{artist.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fcedc7] text-[#855106] border border-[#f0d492]">
                          {artist.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {artist.role} &bull; {artist.eventsCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setNewPhotoTitle('');
                        setNewPhotoImage('');
                        setUploadKey((k) => k + 1);
                        setActivePhotoArtist(artist);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c4604] bg-[#fdf5e8] hover:bg-[#faecd4] px-3.5 py-1.5 rounded-xl border border-[#ecd2ab] transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Manage Photos ({artist.photos.length})</span>
                    </button>

                    <button
                      onClick={() => openEditArtist(artist)}
                      className="p-1.5 text-gray-500 hover:text-[#c8102e] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteArtist(artist.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Photo Strip Preview */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {artist.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-900 border border-gray-200 shadow-xs"
                    >
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[10px] text-white truncate">{photo.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Add / Edit Artist Modal */}
      {(isAddArtistOpen || editingArtist) && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] space-y-6 my-8 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {editingArtist ? 'Edit Profile' : 'New Specialist'}
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  {editingArtist ? `Edit: ${editingArtist.name}` : 'Add Artist / Specialist'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddArtistOpen(false);
                  setEditingArtist(null);
                }}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={editingArtist ? handleSaveArtist : handleCreateArtist}
              className="space-y-4 text-xs sm:text-sm"
            >
              {/* Artist Avatar Image Uploader with Round Preview */}
              <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#ebdcc8] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d99824] bg-white flex items-center justify-center font-bold text-base text-[#8c4604] flex-shrink-0 shadow-sm">
                    {formAvatar ? (
                      <Image
                        src={formAvatar}
                        alt="Artist Avatar Preview"
                        fill
                        className="object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{formName ? formName.charAt(0) : '?'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                      Artist Profile DP / Avatar
                    </span>
                    <p className="text-[11px] text-gray-500">
                      Upload portrait photo for the artist avatar card &amp; portfolio header
                    </p>
                  </div>
                </div>

                <ImageKitUploader
                  label="Upload Profile Photo (PNG / JPG / WebP)"
                  folder="/shuvayan_artists"
                  currentImageUrl={formAvatar}
                  onUploadSuccess={(url) => setFormAvatar(url)}
                  onClear={() => setFormAvatar('')}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Artist / Specialist Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tania Chakraborty / Joydeep Sengupta"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Specialist Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Master Bridal Makeover"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Experience / Track Record
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 200+ Royal Weddings"
                    value={formEvents}
                    onChange={(e) => setFormEvents(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category Tab
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Artist Bio &amp; Specialty (Shown on Artist Details Page)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Specializing in Bengali traditional Chandan artwork, royal bridal mukut styling..."
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#d8c5b0] rounded-xl text-gray-900 focus:ring-2 focus:ring-[#c8102e] focus:bg-white outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddArtistOpen(false);
                    setEditingArtist(null);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#c8102e] to-[#9e0a22] hover:from-[#a80b24] hover:to-[#80071a] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {editingArtist ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Manager Modal for Specific Artist */}
      {activePhotoArtist && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#ebdcc8] space-y-6 my-8 max-h-[90vh] overflow-y-auto animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d99824] bg-[#d99824]/10 px-2.5 py-0.5 rounded-full border border-[#d99824]/30 mb-1 inline-block">
                  {activePhotoArtist.category} Portfolio
                </span>
                <h3 className="text-xl font-bold font-serif-display text-gray-900">
                  Portfolio Gallery &bull; {activePhotoArtist.name}
                </h3>
              </div>
              <button
                onClick={() => setActivePhotoArtist(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Add New Photo Card */}
            <form
              onSubmit={handleAddPhoto}
              className="bg-[#fcfaf7] p-5 sm:p-6 rounded-2xl border border-[#ebdcc8] space-y-4 shadow-xs"
            >
              <div>
                <ImageKitUploader
                  key={uploadKey}
                  label="Upload New Photo"
                  folder={`/shuvayan_gallery/${(activePhotoArtist.category || 'general').replace(/[^a-zA-Z0-9_-]/g, '_')}`}
                  currentImageUrl={newPhotoImage}
                  onUploadSuccess={(url) => setNewPhotoImage(url)}
                  onClear={() => setNewPhotoImage('')}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 w-full text-xs">
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Photo Title / Caption (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Bengali Mukut / Bridal Makeover"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d8c5b0] rounded-xl outline-none focus:ring-2 focus:ring-[#c8102e]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newPhotoImage}
                  className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer w-full sm:w-auto flex-shrink-0 ${
                    newPhotoImage
                      ? 'bg-[#c8102e] hover:bg-[#a80b24] text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo to Strip</span>
                </button>
              </div>
            </form>

            {/* Current Photos Gallery Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Current Showcase Strip ({activePhotoArtist.photos.length} Photos)
                </h4>
              </div>

              {activePhotoArtist.photos.length === 0 ? (
                <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-xs">
                  No photos in this showcase yet. Upload a photo above to add to the strip.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {activePhotoArtist.photos.map((p, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 shadow-xs group bg-gray-900"
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <button
                          type="button"
                          onClick={() => {
                            removePhotoFromArtist(activePhotoArtist.id, idx);
                            const updated = artists.find((a) => a.id === activePhotoArtist.id);
                            if (updated) setActivePhotoArtist(updated);
                          }}
                          className="self-end p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow cursor-pointer transition-colors"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] text-white truncate font-medium">{p.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setActivePhotoArtist(null)}
                className="bg-[#c8102e] hover:bg-[#a80b24] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
