import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Photobooth360 = () => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const galleryImages = [
    '/360.jpg', '/360-1.jpg', '/360.jpg', '/360-1.jpg', '/360.jpg',
    '/360-1.jpg', '/360.jpg', '/360-1.jpg', '/360.jpg', '/360-1.jpg',
    '/360.jpg', '/360-1.jpg', '/360.jpg', '/360-1.jpg', '/360.jpg'
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
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl" />
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
              alt={`360 Videobooth Gallery ${selectedImage + 1}`}
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photobooth360;
