import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{index: number, type: 'image' | 'video'} | null>(null);

  const galleryMedia = [
  //  { src: 'https://sub.projectpartyproductions.com/20250804_204800341.jpg', type: 'image' as const },
 //    { src: 'https://sub.projectpartyproductions.com/20250804_212732774.jpg', type: 'image' as const },
 //    { src: 'https://sub.projectpartyproductions.com/20250804_205503768.jpg', type: 'image' as const },
 //    { src: 'https://sub.projectpartyproductions.com/20250804_193822216.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_200807927.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_204137279.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_205236101.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_210506449.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_204450963.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_204900014.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_194812971.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_193618221.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_192508408.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_212404754.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_210722523.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_210332810.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_210043845.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_205655968.jpg', type: 'image' as const },
//     { src: 'https://sub.projectpartyproductions.com/20250804_214331446.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/DSC_0376 2.JPG', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/20250804_213017940.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob1.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob2.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob3.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob4.mp4', type: 'video' as const },
    // { src: 'https://sub.projectpartyproductions.com/videob5.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob6.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob7.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob8.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob9.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob10.jpg', type: 'image' as const },
    // { src: 'https://sub.projectpartyproductions.com/videob12.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob13.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob14.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob15.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob16.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob17.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob18.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob19.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob20.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob21.mp4', type: 'video' as const },
  //   { src: 'https://sub.projectpartyproductions.com/videob22.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob23.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob24.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob25.mp4', type: 'video' as const },
  //   { src: 'https://sub.projectpartyproductions.com/videob26.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob27.mp4', type: 'video' as const },
  //   { src: 'https://sub.projectpartyproductions.com/videob28.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob29.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob30.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob31.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob32.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob33.jpg', type: 'image' as const },
  //   { src: 'https://sub.projectpartyproductions.com/videob34.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob35.mp4', type: 'video' as const },
  //   { src: 'https://sub.projectpartyproductions.com/videob36.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob37.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob38.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob39.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob40.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob41.mp4', type: 'video' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob42.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob44.jpg', type: 'image' as const },
   //  { src: 'https://sub.projectpartyproductions.com/videob45.mp4', type: 'video' as const },
  ];

  const openModal = (index: number, type: 'image' | 'video') => {
    setSelectedMedia({ index, type });
    setSelectedImage(index); // Keep for backward compatibility
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setSelectedImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Add escape key listener
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMedia !== null) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [selectedMedia]);

  const nextImage = () => {
    if (selectedMedia !== null) {
      const newIndex = (selectedMedia.index + 1) % galleryMedia.length;
      setSelectedMedia({ index: newIndex, type: galleryMedia[newIndex].type });
      setSelectedImage(newIndex);
    }
  };

  const prevImage = () => {
    if (selectedMedia !== null) {
      const newIndex = (selectedMedia.index - 1 + galleryMedia.length) % galleryMedia.length;
      setSelectedMedia({ index: newIndex, type: galleryMedia[newIndex].type });
      setSelectedImage(newIndex);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-96">
        <link rel="preload" as="image" href="/20250804_192508408.jpg" />
        <img
          src="https://sub.projectpartyproductions.com/20250804_192508408.jpg"
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
          <link rel="preload" as="image" href={galleryMedia[0].src} fetchpriority="high" />
          <link rel="preload" as="image" href={galleryMedia[1].src} fetchpriority="high" />
          <link rel="preload" as="image" href={galleryMedia[2].src} fetchpriority="high" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryMedia.map((media, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index, media.type)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  {media.type === 'video' ? (
                    <>
                      <video
                        src={media.src}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        preload="metadata"
                        muted
                        playsInline
                        style={{ pointerEvents: 'none' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-60 rounded-full p-3">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      fetchpriority={index < 6 ? "high" : "auto"}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding={index < 6 ? "sync" : "async"}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMedia !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedMedia.type === 'video' ? (
              <video
                src={galleryMedia[selectedMedia.index].src}
                className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg"
                controls
                preload="metadata"
              />
            ) : (
              <img
                src={galleryMedia[selectedMedia.index].src}
                alt={`Gallery ${selectedMedia.index + 1}`}
                className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg"
              />
            )}
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 md:p-3 rounded-full transition-all border-2 border-white shadow-lg z-10"
            >
              <X size={20} className="md:w-7 md:h-7" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 rounded-full transition-all z-10"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 rounded-full transition-all z-10"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 md:px-6 py-2 md:py-4 rounded-lg max-w-md text-center z-10">
              <p className="text-xs md:text-sm opacity-75">{selectedMedia.index + 1} / {galleryMedia.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
