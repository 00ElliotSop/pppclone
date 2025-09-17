import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Photobooth360 = () => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = React.useState<{index: number, type: 'image' | 'video'} | null>(null);

  const galleryMedia = [
    { src: '/videob1.mp4', type: 'video' as const },
    { src: '/videob2.mp4', type: 'video' as const },
    { src: '/videob3.mp4', type: 'video' as const },
    { src: '/videob4.mp4', type: 'video' as const },
    { src: '/videob5.mp4', type: 'video' as const },
    { src: '/videob6.mp4', type: 'video' as const },
    { src: '/videob7.mp4', type: 'video' as const },
    { src: '/videob8.mp4', type: 'video' as const },
    { src: '/videob9.mp4', type: 'video' as const },
    { src: '/videob10.jpg', type: 'image' as const },
    { src: '/videob11.jpg', type: 'image' as const },
    { src: '/videob12.jpg', type: 'image' as const },
    { src: '/videob13.jpg', type: 'image' as const },
    { src: '/videob14.jpg', type: 'image' as const },
    { src: '/videob15.jpg', type: 'image' as const },
    { src: '/videob16.jpg', type: 'image' as const },
    { src: '/videob17.jpg', type: 'image' as const },
    { src: '/videob18.mp4', type: 'video' as const },
    { src: '/videob19.jpg', type: 'image' as const },
    { src: '/videob20.jpg', type: 'image' as const },
    { src: '/videob21.mp4', type: 'video' as const },
    { src: '/videob22.mp4', type: 'video' as const },
    { src: '/videob23.mp4', type: 'video' as const },
    { src: '/videob24.mp4', type: 'video' as const },
    { src: '/videob25.mp4', type: 'video' as const },
    { src: '/videob26.mp4', type: 'video' as const },
    { src: '/videob27.mp4', type: 'video' as const },
    { src: '/videob28.mp4', type: 'video' as const },
    { src: '/videob29.mp4', type: 'video' as const },
    { src: '/videob30.mp4', type: 'video' as const },
    { src: '/videob31.jpg', type: 'image' as const },
    { src: '/videob32.jpg', type: 'image' as const },
    { src: '/videob33.jpg', type: 'image' as const },
    { src: '/videob34.mp4', type: 'video' as const },
    { src: '/videob35.mp4', type: 'video' as const },
    { src: '/videob36.mp4', type: 'video' as const },
    { src: '/videob37.mp4', type: 'video' as const },
    { src: '/videob38.mp4', type: 'video' as const },
    { src: '/videob39.mp4', type: 'video' as const },
    { src: '/videob40.mp4', type: 'video' as const },
    { src: '/videob41.mp4', type: 'video' as const },
    { src: '/videob42.jpg', type: 'image' as const },
    { src: '/videob43.mp4', type: 'video' as const },
    { src: '/videob44.jpg', type: 'image' as const },
    { src: '/videob45.mp4', type: 'video' as const },
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
      <section className="relative h-screen">
        <link rel="preload" as="image" href="/360.jpg" />
        <img
          src="/360.jpg"
          alt="360 Videobooth"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">360 VIDEOBOOTH</h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience the ultimate 360-degree video booth that captures every angle
            </p>
            <Link
              to="/book-now"
              className="bg-[#B5A99A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300 inline-block"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Ultimate Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/ultimate-360.gif"
                alt="360 Booth Demo"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">The Ultimate 360 Video Booth Experience</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Our 360 Video Booth platform is the biggest in the industry at 46 inches (117CM), and can easily fit over 6+ people</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Completely wireless (we supply our own power, and do not need to be set up next to an outlet) meaning that we can setup virtually anywhere</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Customizable overlays and song of choice (we work with you to ensure that the overlay we create, fits your theme and aesthetics)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700"><a href="/lighting" className="hover:text-[#F7E7CE] transition-colors">Bright wireless RGB lighting</a></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700"><a href="/lighting"className="hover:text-[#F7E7CE] transition-colors">LED signage and LED party lights</a></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700"><a href="/props" className="hover:text-[#F7E7CE] transition-colors">Lots of props!</a></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700"><a href="/stanchions" className="hover:text-[#F7E7CE] transition-colors">Stanchions and red carpet</a></p>
                </div>
                   <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Optional: <a href="/speakers" className="hover:text-[#F7E7CE] transition-colors">2x Wireless party speakers (200W) that come with 4 wireless mics</a></p>
                </div>
                   <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Optional: <a href="/power-station" className="hover:text-[#F7E7CE] transition-colors">Portable 1024wh power station (Ecoflow Delta 3)</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capture Moments Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Capture The Moments From All Sides</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our 360 video booth creates stunning slow-motion videos that capture every angle of your special moments. 
                With professional lighting and high-quality cameras, your guests will feel like celebrities as they create 
                unforgettable content that they'll want to share with everyone. You spent so much putting together your perfect outfit, why not make sure every angle of your look is captured, so the whole fit shines!
              </p>
            </div>
            <div className="relative">
              <link rel="preload" as="image" href="/capture-moments-all-sides.gif" />
              <img
                src="/capture-moments-all-sides.gif"
                alt="360 Videobooth Experience"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">GALLERY</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryMedia.map((media, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index, media.type)}
              >
                <div className="relative">
                  {media.type === 'video' ? (
                    <>
                      <img
                        src={media.src + '#t=0.1'}
                        alt={`Video ${index + 1} preview`}
                        className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
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
                      className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl" />
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
                alt={`360 Videobooth Gallery ${selectedMedia.index + 1}`}
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
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 md:px-4 py-2 rounded-full z-10">
              <span className="text-xs md:text-sm">{selectedMedia.index + 1} / {galleryMedia.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photobooth360;
