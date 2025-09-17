import React, { useState } from 'react';
import { useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const BookNow = () => {
  const [availability, setAvailability] = useState({
    unavailableDates: [] as string[],
    message: 'We are currently booking events! Contact us to check availability for your date.'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    venue: '',
    message: '',
    agreeToTermsAndTexts: false
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupMessage, setPopupMessage] = useState('');
  const [showUnavailableDatePopup, setShowUnavailableDatePopup] = useState(false);

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

  // Validate special characters (allow only @, -, _, . and alphanumeric)
  const validateSpecialChars = (input: string, isEmail: boolean = false): string => {
    if (isEmail) {
      // For email, allow standard email characters including +
      return input.replace(/[^a-zA-Z0-9@._+-]/g, '');
    } else {
      // For other fields, allow basic special characters but remove most others
      return input.replace(/[^a-zA-Z0-9@._\-\s]/g, '');
    }
  };
  // Load availability data on component mount
  useEffect(() => {
    const savedAvailability = localStorage.getItem('siteAvailability');
    if (savedAvailability) {
      try {
        const parsedAvailability = JSON.parse(savedAvailability);
        // Normalize all dates to ensure consistent format
        if (parsedAvailability.unavailableDates) {
          parsedAvailability.unavailableDates = parsedAvailability.unavailableDates.map(date => 
            new Date(date).toISOString().split('T')[0]
          );
        }
        setAvailability(parsedAvailability);
        console.log('Loaded availability data:', parsedAvailability); // Debug log
      } catch (error) {
        console.error('Error parsing availability data:', error);
      }
    }
  }, []);

  // Listen for storage changes (when admin updates availability)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'siteAvailability' && e.newValue) {
        try {
          const parsedAvailability = JSON.parse(e.newValue);
          // Normalize all dates to ensure consistent format
          if (parsedAvailability.unavailableDates) {
            parsedAvailability.unavailableDates = parsedAvailability.unavailableDates.map(date => 
              new Date(date).toISOString().split('T')[0]
            );
          }
          setAvailability(parsedAvailability);
          console.log('Availability updated from storage:', parsedAvailability); // Debug log
        } catch (error) {
          console.error('Error parsing updated availability data:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check if a date is unavailable
  const isDateUnavailable = (date: string) => {
    // Normalize the date format to ensure consistent comparison
    const normalizedDate = new Date(date).toISOString().split('T')[0];
    const isUnavailable = availability.unavailableDates.includes(normalizedDate);
    console.log(`Checking date ${date} (normalized: ${normalizedDate}): ${isUnavailable ? 'UNAVAILABLE' : 'available'}`);
    console.log('Available unavailable dates:', availability.unavailableDates);
    return isUnavailable;
  };

  // Get the minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Get the maximum date (2 years from today)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    return maxDate.toISOString().split('T')[0];
  };

  const showSuccessPopup = () => {
    setPopupType('success');
    setPopupMessage('Your booking inquiry has been received! We will get back to you within 24 hours.');
    setShowPopup(true);
  };

  const showErrorPopup = (message: string) => {
    setPopupType('error');
    setPopupMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeUnavailableDatePopup = () => {
    setShowUnavailableDatePopup(false);
  };

  const handleSuccessPopupOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleErrorPopupOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleUnavailablePopupOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeUnavailableDatePopup();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let sanitizedValue = value;
    
    // Sanitize input to remove script/image tags
    if (type !== 'checkbox') {
      sanitizedValue = sanitizeInput(value);
      
      // Apply special character validation based on field type
      if (name === 'email') {
        sanitizedValue = validateSpecialChars(sanitizedValue, true);
      } else if (name === 'name' || name === 'venue' || name === 'message') {
        sanitizedValue = validateSpecialChars(sanitizedValue, false);
      } else if (name === 'phone') {
        // For phone, allow only numbers, spaces, hyphens, parentheses, and plus
        sanitizedValue = sanitizedValue.replace(/[^0-9\s\-\(\)\+]/g, '');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : sanitizedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user agreed to terms and texts
    if (!formData.agreeToTermsAndTexts) {
      alert('Please agree to the Terms of Service and text message consent to continue.');
      return;
    }
    
    // Check if selected date is unavailable
    if (isDateUnavailable(formData.eventDate)) {
      setShowUnavailableDatePopup(true);
      return;
    }
    
    submitBookingForm();
  };

  const submitBookingForm = async () => {
    try {
      const response = await fetch('/api/book-now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Show success popup
        showSuccessPopup();
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          eventType: '',
          guestCount: '',
          venue: '',
          message: '',
          agreeToTermsAndTexts: false
        });
      } else {
        showErrorPopup(result.message || 'There was an error submitting your inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED')) {
        showErrorPopup('Unable to connect to our booking system. Please try again in a moment or contact us directly at 647-957-2057 or info@projectpartyproductions.com');
      } else {
        showErrorPopup('There was an error submitting your inquiry. Please try again or contact us directly at info@projectpartyproductions.com');
      }
    }
  };

  // Generate CSS for unavailable dates
  const generateUnavailableDateStyles = () => {
    if (availability.unavailableDates.length === 0) return '';
    
    const styles = availability.unavailableDates.map(date => {
      return `input[type="date"]::-webkit-calendar-picker-indicator ~ * [data-date="${date}"],
              input[type="date"]::-webkit-calendar-picker-indicator ~ * [aria-label*="${new Date(date).toLocaleDateString()}"] {
                background-color: #fee2e2 !important;
                color: #dc2626 !important;
               pointer-events: none !important;
             }
             
             input[type="date"]::-webkit-calendar-picker-indicator ~ * [data-date="${date}"]:hover,
             input[type="date"]::-webkit-calendar-picker-indicator ~ * [aria-label*="${new Date(date).toLocaleDateString()}"]:hover,
             input[type="date"] [data-date="${date}"]:hover,
             input[type="date"] [aria-label*="${new Date(date).toLocaleDateString()}"]:hover {
               background-color: #fecaca !important;
               color: #dc2626 !important;
               cursor: not-allowed !important;
             }
             
             /* Override default blue hover for unavailable dates */
             input[type="date"]::-webkit-calendar-picker-indicator ~ * [data-date="${date}"]:hover,
             input[type="date"]::-webkit-calendar-picker-indicator ~ * [aria-label*="${new Date(date).toLocaleDateString()}"]:hover {
               background-color: #fecaca !important;
               color: #dc2626 !important;
               border-color: #f87171 !important;
             }`;
    }).join('\n');
    
    return styles;
  };

  return (
    <div className="pt-24">
      {/* Dynamic styles for unavailable dates */}
      <style>
        {`
          /* Style unavailable dates in date picker */
          ${generateUnavailableDateStyles()}
          
          /* Additional styling for better visibility and mobile support */
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: none;
            position: relative;
            z-index: 1;
          }
          
          /* Ensure calendar dropdown doesn't get cut off on mobile */
          input[type="date"] {
            position: relative;
            z-index: 10;
          }
          
          /* Mobile calendar positioning fix */
          @media (max-width: 768px) {
            input[type="date"]::-webkit-calendar-picker-indicator {
              position: relative;
              z-index: 20;
            }
            
            /* Ensure calendar popup has proper stacking */
            input[type="date"]:focus,
            input[type="date"]:active {
              z-index: 50 !important;
              position: relative;
            }
          }
          
          /* Custom styling for unavailable dates */
          .date-unavailable {
            background-color: #fee2e2 !important;
            color: #dc2626 !important;
            text-decoration: line-through;
          }
        `}
      </style>
      
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

      {/* Booking Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Check Availability</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent relative z-10 ${
                        formData.eventDate && isDateUnavailable(formData.eventDate) 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                      style={{
                        backgroundImage: availability.unavailableDates.length > 0 ? 
                          `linear-gradient(to right, transparent 0%, transparent 100%)` : 'none',
                        position: 'relative',
                        zIndex: 10
                      }}
                    />
                    {formData.eventDate && isDateUnavailable(formData.eventDate) && (
                      <div className="text-red-600 text-sm mt-1 p-2 bg-red-50 border border-red-200 rounded">
                        <strong>⚠️ Date Unavailable:</strong> This date is not available. Please select a different date.
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="graduation">Graduation</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Guest Count *
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      required
                      min="2"
                      step="1"
                      onKeyPress={(e) => {
                        // Only allow numbers
                        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'Enter') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        // Prevent pasting non-numeric content
                        const paste = e.clipboardData.getData('text');
                        if (!/^\d+$/.test(paste)) {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue/Location
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                    placeholder="Tell us more about your event, preferred services, or any special requests..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTermsAndTexts"
                   id="agreeToTermsAndTexts"
                    checked={formData.agreeToTermsAndTexts}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300 rounded"
                  />
                 <label htmlFor="agreeToTermsAndTexts" className="text-sm text-gray-600 cursor-pointer">
                    I agree to receive text messages from Project Party Productions regarding my booking and event updates, and I agree to the{' '}
                    <a 
                      href="/terms-of-service" 
                      className="text-[#B5A99A] hover:text-[#F7E7CE] underline transition-colors"
                    >
                      Terms of Service
                    </a>
                    . *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B5A99A] text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">How to Get in Touch with Us</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F7E7CE] p-3 rounded-full">
                    <Phone className="text-gray-800" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                    <a href="tel:+16479572057" className="text-gray-600 hover:text-[#B5A99A] transition-colors">647-957-2057</a>
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
                    <p className="text-sm text-gray-500">Including Toronto, Mississauga, Brampton, Vaughan, and surrounding areas</p>
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
                    <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p>We'll review your inquiry and check availability</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p>Our team will contact you within 24 hours</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p>We'll discuss your needs and provide a custom quote</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#F7E7CE] text-gray-800 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <p>Book your date with a simple deposit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success/Error Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={popupType === 'success' ? handleSuccessPopupOverlayClick : handleErrorPopupOverlayClick}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  popupType === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {popupType === 'success' ? (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  popupType === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {popupType === 'success' ? 'Inquiry Received!' : 'Error'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {popupMessage}
                </p>
                <button
                  onClick={closePopup}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    popupType === 'success' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unavailable Date Popup */}
      {showUnavailableDatePopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleUnavailablePopupOverlayClick}
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
                  Date Unavailable
                </h3>
                <p className="text-gray-600 mb-6">
                  Sorry, the selected date is not available. Please choose a different date for your event.
                </p>
                <button
                  onClick={closeUnavailableDatePopup}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-colors bg-red-600 text-white hover:bg-red-700"
                >
                  Choose Another Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNow;
