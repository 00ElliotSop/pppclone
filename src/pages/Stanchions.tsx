import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Stanchions = () => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const galleryImages = [
    '/stanz1.gif', '/stanz2.gif', '/stanz3.gif', '/stanz4x1.jpg', '/stanz5x1.jpg', '/stanz7x1.jpg'
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
        <link rel="preload" as="image" href="/360.jpg" />
        <img
          src="/360.jpg"
          alt="Stanchions and Red Carpet"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">STANCHIONS + RED CARPET</h1>
            <p className="text-xl md:text-2xl">
              Create a VIP entrance and elegant atmosphere for your special event
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">VIP Treatment for Your Guests</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Make your guests feel like celebrities with our elegant stanchions and red carpet setup. Perfect for creating a grand entrance, photo opportunities, and adding a touch of glamour to any event. Our stanchions also can create an elegant line-up to the photo booth or video booth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">What's Included:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>6x Gold stanchions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>6x Red velvet rope barriers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Premium red carpet runner</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Professional setup and removal</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Perfect For:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Wedding entrances</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Corporate galas and award ceremonies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Milestone birthday celebrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Grand opening events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Stanchions & Red Carpet Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={`Stanchions Setup ${index + 1}`}
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
              alt={`Stanchions Setup ${selectedImage + 1}`}
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
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Ready to Roll Out the Red Carpet?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Add elegance and VIP treatment to your event with our stanchions and red carpet package.
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

export default Stanchions;
