import React, { useState } from 'react';import React from 'react';
import { useEffect, useCallback } from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const BookNow: React.FC = () => {
  return (
   <div className="pt-24">
    {/* Hero Section */}
      <section className="relative h-96">
        <link rel="preload" as="image" href="/360.jpg" />
        <img
          src="/360.jpg"
          alt="Book Now"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold">BOOK NOW</h1>
          </div>
        </div>
      </section>

      {/* Booking + Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cal.com Embed */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Pick a time</h2>
            {/* Replace the URL below with your actual Cal.com booking link */}
            <div className="w-full rounded-2xl border border-gray-200 overflow-hidden">
              <iframe
  title="Booking calendar"
  src="https://book.projectpartyproductions.com/index.php/booking"
  style={{ width: '100%', height: '900px', border: 0 }}
  loading="lazy"
/>

            </div>

            <p className="mt-3 text-sm text-gray-500">
  Having trouble? Open it directly:&nbsp;
  <a
    className="text-gray-700 underline"
    href="https://book.projectpartyproductions.com/index.php/booking"
    target="_blank"
    rel="noreferrer"
  >
    book.projectpartyproductions.com
  </a>
</p>

          </div>

          {/* Contact Info (kept) */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              How to Get in Touch with Us
            </h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-[#F7E7CE] p-3 rounded-full">
                  <Phone className="text-gray-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                  <a
                    href="tel:+16479572057"
                    className="text-gray-600 hover:text-[#B5A99A] transition-colors"
                  >
                    647-957-2057
                  </a>
                  <p className="text-sm text-gray-500">Available 9 AM - 9 PM, 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#F7E7CE] p-3 rounded-full">
                  <Mail className="text-gray-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600">info@projectpartyproductions.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#F7E7CE] p-3 rounded-full">
                  <MapPin className="text-gray-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Service Area</h3>
                  <p className="text-gray-600">Greater Toronto Area</p>
                  <p className="text-sm text-gray-500">
                    Including Toronto, Mississauga, Brampton, Vaughan, and surrounding areas
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#F7E7CE] p-3 rounded-full">
                  <Calendar className="text-gray-800" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Booking Timeline</h3>
                  <p className="text-gray-600">Book 2-4 weeks in advance</p>
                  <p className="text-sm text-gray-500">Last-minute bookings may be available</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p>We’ll review your booking and check availability.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p>Our team will contact you within 24 hours.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p>We’ll discuss your needs and provide a custom quote.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <p>Book your date with a simple deposit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookNow;
