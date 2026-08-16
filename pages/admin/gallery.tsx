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

  // Photo Add Form
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoImage, setNewPhotoImage] = useState('/images/gallery-1.jpg');

  const filteredArtists = artists.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const openEditArtist = (artist: ArtistProfile) => {
    setEditingArtist(artist);
    setFormName(artist.name);
    setFormRole(artist.role);
    setFormEvents(artist.eventsCount);
    setFormCategory(artist.category);
  };

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtist) return;

    updateArtist(editingArtist.id, {
      name: formName,
      role: formRole,
      eventsCount: formEvents,
      category: formCategory,
    });

    setEditingArtist(null);
  };

  const handleCreateArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    addArtist({
      name: formName,
      role: formRole,
      eventsCount: formEvents,
      category: formCategory,
      photos: [
        {
          title: 'Bridal Styling Sample 1',
          image: '/images/gallery-1.jpg',
        },
        {
          title: 'Bridal Styling Sample 2',
          image: '/images/gallery-2.jpg',
        },
        {
          title: 'Bridal Styling Sample 3',
          image: '/images/gallery-3.jpg',
        },
        {
          title: 'Bridal Styling Sample 4',
          image: '/images/gallery-4.jpg',
        },
        {
          title: 'Bridal Styling Sample 5',
          image: '/images/gallery-5.jpg',
        },
      ],
    });

    setFormName('');
    setIsAddArtistOpen(false);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePhotoArtist || !newPhotoImage) return;

    addPhotoToArtist(activePhotoArtist.id, {
      title: newPhotoTitle || 'Wedding Portfolio Capture',
      image: newPhotoImage,
    });

    setNewPhotoTitle('');
    // refresh active photo artist
    const updated = artists.find((a) => a.id === activePhotoArtist.id);
    if (updated) setActivePhotoArtist(updated);
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

          <div className="space-y-6">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="bg-white rounded-2xl border border-[#e8dfd3] shadow-xs p-5 sm:p-6 space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Artist Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#fdecd2] border border-[#e8c89c] text-[#8c4604] flex items-center justify-center font-bold text-sm">
                      {artist.name.charAt(0)}
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
                      onClick={() => setActivePhotoArtist(artist)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c4604] bg-[#fdf5e8] hover:bg-[#faecd4] px-3.5 py-1.5 rounded-xl border border-[#ecd2ab] transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Manage Photos ({artist.photos.length})</span>
                    </button>

                    <button
                      onClick={() => openEditArtist(artist)}
                      className="p-1.5 text-gray-600 hover:text-[#c8102e] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit Artist"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete artist "${artist.name}" and all portfolio photos?`)) {
                          deleteArtist(artist.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Artist"
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
        </div>
      </div>

      {/* Add / Edit Artist Modal */}
      {(isAddArtistOpen || editingArtist) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold font-serif-display text-gray-900">
                {editingArtist ? `Edit: ${editingArtist.name}` : 'Add Artist Profile'}
              </h3>
              <button
                onClick={() => {
                  setIsAddArtistOpen(false);
                  setEditingArtist(null);
                }}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={editingArtist ? handleSaveArtist : handleCreateArtist}
              className="space-y-3.5 text-xs sm:text-sm"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Artist / Specialist Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tania Chakraborty"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Specialist Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Makeover Artist, Master Henna Designer"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Experience / Completed Count
                </label>
                <input
                  type="text"
                  placeholder="e.g. 200+ Weddings Done"
                  value={formEvents}
                  onChange={(e) => setFormEvents(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category Tab
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c8102e] outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddArtistOpen(false);
                    setEditingArtist(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#c8102e] hover:bg-[#a80b24] rounded-xl shadow-xs"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#ebdcc8] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-serif-display text-gray-900">
                  Manage Photos: {activePhotoArtist.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {activePhotoArtist.photos.length} Portfolio Photos Active
                </p>
              </div>
              <button
                onClick={() => setActivePhotoArtist(null)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Add New Photo Form with ImageKit */}
            <form
              onSubmit={handleAddPhoto}
              className="bg-[#faf7f2] p-4 rounded-xl border border-[#ebdcc8] space-y-3"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Add New Photo to Portfolio
              </h4>

              <div className="mb-2">
                <ImageKitUploader
                  label="Upload Photo to ImageKit CDN"
                  folder={`/shuvayan_gallery/${activePhotoArtist.category}`}
                  onUploadSuccess={(url) => setNewPhotoImage(url)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Photo Title / Caption</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Bengali Mukut"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#c8102e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    required
                    placeholder="/images/gallery-1.jpg or https://ik.imagekit.io/..."
                    value={newPhotoImage}
                    onChange={(e) => setNewPhotoImage(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#c8102e]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#c8102e] hover:bg-[#a80b24] px-4 py-1.5 rounded-lg shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Portfolio</span>
                </button>
              </div>
            </form>

            {/* Current Photos Grid with Delete Option */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Current Photo Gallery
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activePhotoArtist.photos.map((p, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 shadow-xs group bg-gray-900"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <button
                        type="button"
                        onClick={() => {
                          removePhotoFromArtist(activePhotoArtist.id, idx);
                          const updated = artists.find((a) => a.id === activePhotoArtist.id);
                          if (updated) setActivePhotoArtist(updated);
                        }}
                        className="self-end p-1 bg-red-600 hover:bg-red-700 text-white rounded-md shadow"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] text-white truncate font-medium">{p.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
              <button
                onClick={() => setActivePhotoArtist(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl"
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
