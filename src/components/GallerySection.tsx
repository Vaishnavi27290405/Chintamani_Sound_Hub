import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/galleryData';
import { GalleryItem } from '../types';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Maximize2,
  X,
  Volume2,
  Layers,
  ArrowRight
} from 'lucide-react';

interface GallerySectionProps {
  onBookPackage: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookPackage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Festivals & Ganpati',
    'Gavdev & Miravnuk',
    'Weddings & Varat',
    'Lloyd Lee Rigs'
  ];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery-section" className="py-16 sm:py-24 bg-[#0a0114] relative">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Chintamani Sound Real Rig Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            LLOYD LEE LIVE STAGE & EVENT GALLERY
          </h2>
          <p className="mt-3 text-sm sm:text-base text-purple-200/80">
            Witness our authentic LLOYD LEE Series Dolby line arrays, tractor mobile trailers, heavy subwoofers, and concert trussing at real Ganpati festivals, Gavdev Sohala, Varat miravnuk, and royal weddings.
          </p>

          {/* Filter Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-[#150529] border border-purple-500/20 text-purple-300 hover:border-purple-400/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#120324] border border-purple-500/20 hover:border-purple-400/60 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-black/60">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  onError={(e) => {
                    if (item.fallbackUrl) {
                      e.currentTarget.src = item.fallbackUrl;
                    }
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0114] via-black/20 to-transparent"></div>

                {/* Category Pill & Real Rig Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-purple-900/90 backdrop-blur-md border border-purple-400/40 text-purple-200 text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.isRealSetupPhoto && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-900/90 backdrop-blur-md border border-emerald-400/50 text-emerald-200 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                      Real Rig Photo
                    </span>
                  )}
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 backdrop-blur-md text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 space-y-2 bg-[#0e021a] flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-purple-300/70 font-mono mt-2">
                    <span className="flex items-center gap-1 truncate max-w-[65%]">
                      <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="text-[11px] text-purple-400 font-medium line-clamp-2 pt-2 border-t border-purple-900/40 font-mono">
                  {item.soundSetup}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#16052e] to-purple-950/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white">
              Want this exact LLOYD LEE Dolby concert sound for your event?
            </h3>
            <p className="text-xs text-purple-300/80 mt-1">
              Select Simple (Birthdays & Weddings), Silver (Gavdev & Varat), or Gold (Ganpati & Festivals) to reserve your date.
            </p>
          </div>

          <button
            onClick={onBookPackage}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs sm:text-sm shrink-0 flex items-center space-x-2 shadow-lg shadow-purple-600/40 transition-all hover:scale-105"
          >
            <span>Book LLOYD LEE Package Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox / Modal for Photo View */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0f041d] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[60vh] bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                onError={(e) => {
                  if (selectedPhoto.fallbackUrl) {
                    e.currentTarget.src = selectedPhoto.fallbackUrl;
                  }
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[60vh] mx-auto"
              />
            </div>

            <div className="p-6 bg-[#130526] border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] font-bold uppercase">
                    {selectedPhoto.category}
                  </span>
                  <span className="text-xs text-purple-300 font-mono">
                    {selectedPhoto.location} • {selectedPhoto.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{selectedPhoto.title}</h3>
                <p className="text-xs text-purple-300/90 font-mono mt-1">
                  Rig: {selectedPhoto.soundSetup}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  onBookPackage();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shrink-0 shadow-md transition-all hover:scale-105"
              >
                Book LLOYD LEE Audio Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
