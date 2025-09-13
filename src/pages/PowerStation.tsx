import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PowerStation = () => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const galleryImages = [
    '/ecoflow1.png', '/ecoflow2.png', '/ecoflow3.png', '/ecoflow4.png', '/ecoflow5.png', '/ecoflow6.png'
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
        <link rel="preload" as="image" href="/ecoflow.png" />
        <img
          src="/ecoflow.png"
          alt="Power Station"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">POWER STATION</h1>
            <p className="text-xl md:text-2xl">
              Reliable portable power solutions for any outdoor event
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Portable Power Solutions</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            All of our equipment (yes, everything!) do not need to be plugged into an outlet. We ensured this because we want to make sure that we are able to set up anywhere! Don't let power limitations restrict your event location. Our portable power station provides reliable electricity for outdoor venues, remote locations, or anywhere you need additional power. We utilize the Ecoflow Delta 3 plus as our main portable power station. We utilize the power station to power our picture printer (DNP DS620A), so we can set up virtually anywhere! Not only that but we always bring multiple power banks to each event to make sure that we are never out of power, ever!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Features:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Ecoflow Delta 3 Plus 1024Wah that can output up to 1800W</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Multiple outlet options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Silent operation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Weather resistant design</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Ideal For:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Outdoor weddings and ceremonies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Beach and park events</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Festival and fair booths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Remote venue events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Power Station Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={`Power Station ${index + 1}`}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                 loading="eager"
                 decoding="sync"
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
              alt={`Power Station ${selectedImage + 1}`}
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Need Portable Power?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ensure your outdoor event has reliable power with our portable power station rental.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-now"
              className="bg-[#B5A99A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
            >
              BOOK NOW
            </Link>
            <a
              href="mailto:info@projectpartyproductions.com"
              className="bg-transparent border-2 border-[#B5A99A] text-[#B5A99A] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#B5A99A] hover:text-white transition-all duration-300"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PowerStation;
