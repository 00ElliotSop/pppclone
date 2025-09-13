import React from 'react';
import { Link } from 'react-router-dom';

const MobilePhotobooth = () => {
  const galleryImages = [
    '/mpg1.jpg', '/mpg2.jpg', '/mpg3.jpg', '/m5.jpg',
    '/m6.jpg', '/m7.jpg', '/m8.jpg', '/m9.jpg', '/mpg10.jpg',
    '/mpg11.jpg', '/mpg12.jpg', '/mpg13.jpg', '/mpg14.jpg', '/mpg15.jpg', '/mpg16.jpg', '/mpg17.jpg', '/mpg18.jpg', '/mpg19.jpg',
    '/mpg20.jpg', '/mpg21.jpg', '/mpg22.jpg', '/mpg23.jpg', 
    '/mpg25.jpg', '/mpg26.jpg', '/mpg27.jpg', '/mpg28.jpg', '/mpg29.jpg', '/mpg24.jpg', '/m30.jpg'
  ];

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
              <div key={index} className="group cursor-pointer">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  decoding="sync"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobilePhotobooth;
