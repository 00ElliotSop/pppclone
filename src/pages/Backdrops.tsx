import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Backdrops = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedBackdrop, setSelectedBackdrop] = useState<number | null>(null);

  const backdrops = [
    // Regular Size Backdrops
    { 
      id: 1, 
      name: 'White', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/white.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/white1.jpg']
    },
    { 
      id: 2, 
      name: 'White marble', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/whitem.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/whitem1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/whitem2.jpg']
    },
    { 
      id: 3, 
      name: 'Black', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/black.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/black1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/black2.jpg']
    },
    { 
      id: 4, 
      name: 'Black with PPP logo', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/pppb.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/pppb1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/pppb2.jpg', 'https://sub.projectpartyproductions.com/Backdropz/pppb3.jpg']
    },
    { 
      id: 5, 
      name: 'Pink roses in enchanted forest', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/pe.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/pe1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/pe2.jpg']
    },
    { 
      id: 6, 
      name: 'White, pink and purple flowerwall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/wp.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/wp1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/wp2.jpg']
    },
    { 
      id: 7, 
      name: 'White and pink flowers with green leaves', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/wpg.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/wpg1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/wpg2.jpg']
    },
    { 
      id: 8, 
      name: 'Flowers around wedding arch', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/wedd.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/wedd1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/wedd2.jpg', 'https://sub.projectpartyproductions.com/Backdropz/wedd3.jpg']
    },
    { 
      id: 9, 
      name: 'Gold shimmer wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/goldb.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/goldb1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/goldb2.jpg']
    },
    { 
      id: 10, 
      name: 'Rose gold shimmer wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/roseb.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/goldrosew1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/goldrosew2.jpg']
    },
    { 
      id: 11, 
      name: 'White and pink flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/wpb.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/wpb1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/wpb2.jpg']
    },
    { 
      id: 12, 
      name: 'VIP hollywood red carpet', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/vip.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/vip1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/vip2.jpg']
    },
    { 
      id: 13, 
      name: 'Red roses flowerwall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/rosesb.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/rosesb1.jpg']
    },
    { 
      id: 14, 
      name: 'White and pink flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/whitefb.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/whitefb1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/whitefb2.jpg']
    },
    { 
      id: 15, 
      name: 'Pink roses flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/pinkroses.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/pinkrose2.jpg', 'https://sub.projectpartyproductions.com/Backdropz/pinkrose3.jpg']
    },
    { 
      id: 16, 
      name: 'Presents in front of fireplace and Christmas tree', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/christmas.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/christmas1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/christmas2.jpg']
    },
    { 
      id: 17, 
      name: 'Red carpet going up stairs to Christmas tree', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/stairsxchristmas.jpg', 
      category: '8ft x 8ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/stairsxchristmas1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/stairsxchristmas2.jpg']
    },
    
    // 7ft x 7ft Backdrops
    { 
      id: 18, 
      name: 'Green Screen', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/greenxscreen.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/greenxscreen3.jpg', 'https://sub.projectpartyproductions.com/Backdropz/greenxscreen4.jpg']
    },
    { 
      id: 19, 
      name: 'Green leaves heart', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/greenxheart.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/greenxwallx4.jpg', 'https://sub.projectpartyproductions.com/Backdropz/greenxwallx2.jpg']
    },
    { 
      id: 20, 
      name: 'Purple, blue, white, and pink flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/purplexbluexwhitexf.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/purplexbluexwhitexf1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/purplexbluexwhitexf2.jpg']
    },
    { 
      id: 21, 
      name: 'Blue and white flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/bluexflowers.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/blueflowers1.jpg', 'https://sub.projectpartyproductions.com/blueflowers2.jpg']
    },
    { 
      id: 22, 
      name: 'White, pink, blue, and purple flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/whitexpinkxbluexflowers.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/whitexpinkxbluexflowers1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/whitexpinkxbluexflowers2.jpg']
    },
    { 
      id: 23, 
      name: 'Toronto Skyline', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/tdot.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/tdot1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/tdot2.jpg']
    },
    { 
      id: 24, 
      name: 'Flower wall going down white brick', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/hangingxflowers.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/hangingxflowers1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/hangingxflowers2.jpg']
    },
    { 
      id: 25, 
      name: 'Gold shimmers going down', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/goldxhanging.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/goldxhanging1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/goldxhanging2.jpg']
    },
    { 
      id: 26, 
      name: 'Red shimmer wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/redxshimmers.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/redxshimmers1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/redxshimmers2.jpg']
    },
    { 
      id: 27, 
      name: 'White roses flower wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/whitexfxwall.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/whitexfxwall1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/whitexfxwall2.jpg']
    },
    { 
      id: 28, 
      name: 'Gold shimmer wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/goldxshimmers.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/goldxwallx7x71.jpg', 'https://sub.projectpartyproductions.com/Backdropz/goldxwallx7x72.jpg']
    },
    { 
      id: 29, 
      name: 'Silver shimmer wall', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/silverxwall.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/silverxwall1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/silverxwall2.jpg']
    },
    { 
      id: 30, 
      name: 'Ornaments from tree and wood', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/ornaments.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/ornaments1.jpg', 'https://sub.projectpartyproductions.com/Backdropz/ornaments2.jpg']
    },
    { 
      id: 31, 
      name: 'Gold lights around wood boards', 
      image: 'https://sub.projectpartyproductions.com/Backdropz/goldxxwood.jpg', 
      category: '7ft x 7ft',
      gallery: ['https://sub.projectpartyproductions.com/Backdropz/goldxoverxwood3.jpg', 'https://sub.projectpartyproductions.com/Backdropz/goldxoverxwood2.jpg']
    }
  ];

  const openBackdropGallery = (backdropIndex: number) => {
    setSelectedBackdrop(backdropIndex);
    setSelectedImage(0);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedBackdrop(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Add escape key listener
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedBackdrop !== null || selectedImage !== null)) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [selectedBackdrop, selectedImage]);

  const nextImage = () => {
    if (selectedBackdrop !== null && selectedImage !== null) {
      const currentGallery = backdrops[selectedBackdrop].gallery;
      setSelectedImage((selectedImage + 1) % currentGallery.length);
    }
  };

  const prevImage = () => {
    if (selectedBackdrop !== null && selectedImage !== null) {
      const currentGallery = backdrops[selectedBackdrop].gallery;
      setSelectedImage((selectedImage - 1 + currentGallery.length) % currentGallery.length);
    }
  };

  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">BACKDROPS</h1>
          <p className="text-lg text-gray-600 mb-4">We currently offer 30+ backdrops and can provide custom backdrops with notice</p>
          <p className="text-xl text-gray-700">Choose from our stunning collection of professional tension backdrops</p>
        </div>
      </section>

      {/* Backdrops Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Preload first few backdrop images */}
          <link rel="preload" as="image" href={backdrops[0].image} fetchpriority="high" />
          <link rel="preload" as="image" href={backdrops[1].image} fetchpriority="high" />
          <link rel="preload" as="image" href={backdrops[2].image} fetchpriority="high" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {backdrops.map((backdrop, index) => (
              <div
                key={backdrop.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openBackdropGallery(index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={backdrop.image}
                    alt={backdrop.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    fetchpriority={index < 8 ? "high" : "auto"}
                    loading={index < 8 ? "eager" : "lazy"}
                    decoding={index < 8 ? "sync" : "async"}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{backdrop.name}</h3>
                    <p className="text-gray-300 text-sm">{backdrop.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedBackdrop !== null && selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={backdrops[selectedBackdrop].gallery[selectedImage]}
              alt={`${backdrops[selectedBackdrop].name} ${selectedImage + 1}`}
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

            {/* Image Info */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 md:px-6 py-2 md:py-3 rounded-full text-center z-10">
              <h3 className="font-semibold text-xs md:text-sm">{backdrops[selectedBackdrop].name}</h3>
              <p className="text-xs md:text-sm opacity-80">{backdrops[selectedBackdrop].category} • {selectedImage + 1} / {backdrops[selectedBackdrop].gallery.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Easy Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Easy Process</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Our streamlined booking process makes it simple to select your perfect backdrop and book your photobooth experience. 
            From consultation to setup, we handle every detail to ensure your event is picture-perfect.
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

export default Backdrops;
