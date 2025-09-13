import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    '/20250804_204800341.jpg',
    '/20250804_212732774.jpg',
    '/20250804_205503768.jpg',
    '/gallery4.jpg',
    '/20250804_193822216.jpg',
    '/20250804_200807927.jpg',
    '/20250804_204137279.jpg',
    '/20250804_205236101.jpg',
    '/20250804_210506449.jpg',
    '/20250804_204450963.jpg',
    '/20250804_204900014.jpg',
    '/20250804_194812971.jpg',
    '/20250804_193618221.jpg',
    '/20250804_181238676.jpg',
    '/20250804_192508408.jpg',
    '/20250804_212404754.jpg',
    '/20250804_210722523.jpg',
    '/20250804_210332810.jpg',
    '/20250804_210043845.jpg',
    '/20250804_205655968.jpg',
    '/20250804_214331446.jpg',
    '/DSC_0376 2.JPG',
    '/20250804_213017940.jpg'
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-96">
        <link rel="preload" as="image" href="/20250804_192508408.jpg" />
        <img
          src="/20250804_192508408.jpg"
          alt="Gallery Hero"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">GALLERY</h1>
            <p className="text-xl md:text-2xl">
              Explore our collection of memorable moments and stunning setups
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Preload first few gallery images */}
          <link rel="preload" as="image" href={galleryImages[0]} fetchpriority="high" />
          <link rel="preload" as="image" href={galleryImages[1]} fetchpriority="high" />
          <link rel="preload" as="image" href={galleryImages[2]} fetchpriority="high" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((imageSrc, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={imageSrc}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    fetchpriority={index < 6 ? "high" : "auto"}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding={index < 6 ? "sync" : "async"}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={galleryImages[selectedImage]}
              alt={`Gallery ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all border-2 border-white shadow-lg"
            >
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-4 rounded-lg max-w-md text-center">
              <p className="text-xs opacity-75">{selectedImage + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
