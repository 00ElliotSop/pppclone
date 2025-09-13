import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-[#F7E7CE] text-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6">Subscribe to get the latest news and updates from Project Party Productions</p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B5A99A]"
              required
            />
            <button
              type="submit"
              className="bg-[#B5A99A] text-white px-6 py-2 rounded-r-lg hover:bg-gray-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Company Info */}
          <div>
            <img 
              src="/Logo-wide-white-footer.png" 
              alt="Project Party Productions" 
              className="h-16 w-auto mb-4 rounded-lg"
              fetchpriority="high"
              loading="lazy"
              decoding="async"
            />
            <p className="text-gray-300 mb-4">
              Creating unforgettable moments with professional photobooth services and event rentals.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/projectpartyproductions" className="text-gray-300 hover:text-[#F7E7CE] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('/')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Home</button></li>
              <li><button onClick={() => handleLinkClick('/about-us')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">About Us</button></li>
              <li><button onClick={() => handleLinkClick('/backdrops')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Backdrops</button></li>
              <li><button onClick={() => handleLinkClick('/360-videobooth')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">360 Videobooth</button></li>
              <li><button onClick={() => handleLinkClick('/mobile-photobooth')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Mobile Photobooth</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('/faq')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">FAQ</button></li>
              <li><button onClick={() => handleLinkClick('/gallery')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Gallery</button></li>
              <li><button onClick={() => handleLinkClick('/book-now')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Book Now</button></li>
              <li><button onClick={() => handleLinkClick('/speakers')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Speakers</button></li>
              <li><button onClick={() => handleLinkClick('/props')} className="text-gray-300 hover:text-[#F7E7CE] transition-colors text-left">Props</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <span className="text-gray-300">647-957-2057</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span className="text-gray-300">info@projectpartyproductions.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} />
                <span className="text-gray-300">Toronto, ON</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 Project Party Productions. Developed and Designed by <a href="https://elliotsop.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F7E7CE] transition-colors">ElliotSop</a>.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            
            <button onClick={() => handleLinkClick('/terms-of-service')} className="text-gray-400 hover:text-[#F7E7CE] text-sm transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
