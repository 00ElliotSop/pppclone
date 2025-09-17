import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Speakers = () => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const galleryImages = [
    '/speak1.gif', '/speak2.gif', '/speak3.gif', '/speakz4.png', '/speak5.jpg', '/speakz6.jpg'
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

  // Add escape key listener
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage !== null) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [selectedImage]);

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
        <link rel="preload" as="image" href="/spkz.jpg" />
        <img
          src="/spkz.jpg"
          alt="Professional Speakers"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">SPEAKERS</h1>
            <p className="text-xl md:text-2xl">
              Professional sound systems for crystal clear audio at your event
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Professional Audio Solutions</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            We utilize 2 Soundcore Rave 3S. Our professional party speaker systems deliver exceptional sound quality for events of all sizes. 
            From intimate gatherings to large celebrations, we have the right audio equipment to ensure 
            your music, announcements, and entertainment sound perfect. Our speaker systems have a built-in AI vocal remover, meaning that any song that you play, our speakers can remove the words and leave the instrumentals! Each speaker delivers a bass shattering 200W of power, and we provide a total of 4 wireless mics. Our speakers are completely wireless and provide a 12-hour playback time. The Soundcore Rave 3S also is USB-C rechargeable, meaning that with a provided power bank, the playback time is essentially limitless.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Features Include:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>2x Soundcore Rave 3S 200W party speakers (that pair seamlessly)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>4x High-quality wireless microphones</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Bluetooth and AUX connectivity</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Multiple input options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Professional setup and testing</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">Perfect For:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Wedding ceremonies and receptions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Corporate presentations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Birthday parties and celebrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Outdoor events and festivals</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Karaoke night</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full"></div>
                  <span>Mobile DJ setup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Speaker Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={`Speaker System ${index + 1}`}
                  className="w-full h-auto max-h-80 object-contain bg-gray-100 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
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
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={galleryImages[selectedImage]}
              alt={`Speaker System ${selectedImage + 1}`}
              className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg"
            />
            
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
              <span className="text-xs md:text-sm">{selectedImage + 1} / {galleryImages.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Ready to Book Our Speakers?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today to add professional audio to your event package.
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

export default Speakers;
