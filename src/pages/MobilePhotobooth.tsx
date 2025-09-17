import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const MobilePhotobooth = () => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const galleryImages = [
    '/mpg1.jpg', '/mpg2.jpg', '/mpg3.jpg', '/m5.jpg',
    '/m6.jpg', '/m7.jpg', '/m8.jpg', '/m9.jpg', '/mpg10.jpg',
    '/mpg11.jpg', '/mpg12.jpg', '/mpg13.jpg', '/mpg14.jpg', '/mpg15.jpg', '/mpg16.jpg', '/mpg17.jpg', '/mpg18.jpg', '/mpg19.jpg',
    '/mpg20.jpg', '/mpg21.jpg', '/mpg22.jpg', '/mpg23.jpg', 
    '/mpg25.jpg', '/mpg26.jpg', '/mpg27.jpg', '/mpg28.jpg', '/mpg29.jpg', '/mpg24.jpg', '/m30.jpg'
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
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

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-screen">
        <link rel="preload" as="image" href="/mpbhero.jpg" />
        <img
          src="/mpbhero.jpg"
          alt="Mobile Photobooth"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">MOBILE PHOTOBOOTH</h1>
            <p className="text-xl md:text-2xl mb-8">
              Professional mobile photobooth with instant prints and endless fun
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
              <link rel="preload" as="image" href="/ultimate-mobile2.gif" />
              <img
                src="/ultimate-mobile2.gif"
                alt="Mobile Photobooth Setup"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">The Ultimate Mobile Photo Booth Experience</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Our mobile photobooth is completely different from anything else in the market. We can setup anywhere and print anywhere (indoors or outdoors), because we have access to our own power</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">We use a DSLR camera for our pictures for the best and highest quality</p>
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
                  <p className="text-gray-700"><a href="/lighting" className="hover:text-[#F7E7CE] transition-colors">LED signage and LED party lights</a></p>
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


    {/*High Quality Prints, Printed Instantly */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">High Quality Prints, Printed Instantly</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">The printer that we use is the DNP DS620A, the best and quickest in the market</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Print in multiple formats (2x3, 4x6, 5x7, 6x8, and much more!)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Multiple picture finishes (Glossy, semi-glossy, matte, metallic, and pearl) {/* Maybe include picture of different formats */}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">All pictures come with a protective sleeve</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#F7E7CE] rounded-full mt-2"></div>
                  <p className="text-gray-700">Just like our photobooth, our printer can be set up anywhere</p>
                </div>

            </div>
     
              </div>
                      <div className="relative">
              <link rel="preload" as="image" href="/Hiiighqualtiy.gif" />
              <img
                src="/Hiiighqualtiy.gif"
                alt="Mobile Photobooth Setup"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
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
              alt={`Mobile Photobooth Gallery ${selectedImage + 1}`}
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
    </div>
  );
};

export default MobilePhotobooth;
