import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);
  const [showNewsletterErrorPopup, setShowNewsletterErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    // Remove script and image tags (case insensitive)
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/<img\b[^>]*>/gi, '');
    sanitized = sanitized.replace(/<\/img>/gi, '');
    
    // Remove other potentially dangerous tags
    sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
    sanitized = sanitized.replace(/<embed\b[^>]*>/gi, '');
    
    return sanitized;
  };

  // Validate email format and special characters
  const validateEmailInput = (input: string): string => {
    // Remove script/image tags first
    let sanitized = sanitizeInput(input);
    
    // For email, allow only valid email characters including +
    sanitized = sanitized.replace(/[^a-zA-Z0-9@._+-]/g, '');
    
    return sanitized;
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = validateEmailInput(email.trim());
    
    if (!sanitizedEmail) return;
    
    // Update state with sanitized email
    setEmail(sanitizedEmail);
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      const result = await response.json();

      if (result.success) {
        setShowNewsletterPopup(true);
        setEmail('');
      } else {
        setErrorMessage(result.message || 'There was an error subscribing to our newsletter. Please try again.');
        setShowNewsletterErrorPopup(true);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setErrorMessage('There was an error subscribing to our newsletter. Please try again.');
      setShowNewsletterErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterPopupOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeNewsletterPopup();
    }
  };

  const handleNewsletterErrorPopupOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeNewsletterErrorPopup();
    }
  };
  const closeNewsletterPopup = () => {
    setShowNewsletterPopup(false);
  };

  const closeNewsletterErrorPopup = () => {
    setShowNewsletterErrorPopup(false);
    setErrorMessage('');
  };
  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
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
              onChange={(e) => setEmail(validateEmailInput(e.target.value))}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B5A99A]"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#B5A99A] text-white px-6 py-2 rounded-r-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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
              <li>
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about-us" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/backdrops" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Backdrops
                </Link>
              </li>
              <li>
                <Link 
                  to="/360-videobooth" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  360 Videobooth
                </Link>
              </li>
              <li>
                <Link 
                  to="/mobile-photobooth" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Mobile Photobooth
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/faq" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/book-now" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link 
                  to="/speakers" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link 
                  to="/props" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-300 hover:text-[#F7E7CE] transition-colors"
                >
                  Props
                </Link>
              </li>
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
            
            <Link 
              to="/terms-of-service" 
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-400 hover:text-[#F7E7CE] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>

      {/* Newsletter Subscription Popup */}
      {showNewsletterPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleNewsletterPopupOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-800">
                  Thanks for Subscribing!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for subscribing to our newsletter! You'll receive the latest news and updates from Project Party Productions.
                </p>
                <button
                  onClick={closeNewsletterPopup}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-colors bg-green-600 text-white hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Error Popup */}
      {showNewsletterErrorPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleNewsletterErrorPopupOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-100">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-red-800">
                  Subscription Error
                </h3>
                <p className="text-gray-600 mb-6">
                  {errorMessage}
                </p>
                <button
                  onClick={closeNewsletterErrorPopup}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-colors bg-red-600 text-white hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
