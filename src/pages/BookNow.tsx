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
    agreeToTexts: false
  });

  // Load availability data on component mount
  useEffect(() => {
    const savedAvailability = localStorage.getItem('siteAvailability');
    if (savedAvailability) {
      setAvailability(JSON.parse(savedAvailability));
    }
  }, []);

  // Check if a date is unavailable
  const isDateUnavailable = (date: string) => {
    return availability.unavailableDates.includes(date);
  };

  // Get the minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if selected date is unavailable
    if (isDateUnavailable(formData.eventDate)) {
      alert('Sorry, the selected date is not available. Please choose a different date.');
      return;
    }
    
    submitBookingForm();
  };

  const submitBookingForm = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/book-now', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
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
          agreeToTexts: false
        });
      } else {
        alert(result.message || 'There was an error submitting your inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback: create mailto link if backend is not available
      const subject = encodeURIComponent(`Booking Inquiry - ${formData.name} (${formData.eventDate})`);
      const body = encodeURIComponent(`
New Booking Inquiry - Project Party Productions

CONTACT INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

EVENT DETAILS:
Event Date: ${formData.eventDate}
Event Type: ${formData.eventType}
Expected Guest Count: ${formData.guestCount || 'Not specified'}
Venue/Location: ${formData.venue || 'Not specified'}

ADDITIONAL DETAILS:
${formData.message || 'No additional details provided'}

TEXT MESSAGE CONSENT:
${formData.agreeToTexts ? 'Yes, customer agrees to receive text messages' : 'No, customer does not want text messages'}
      `);
      
      window.location.href = `mailto:info@projectpartyproductions.com?subject=${subject}&body=${body}`;
      alert('Opening your email client to send the inquiry. If this doesn\'t work, please contact us directly at info@projectpartyproductions.com');
    }
  };

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

      {/* Booking Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Availability Message */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-[#F7E7CE] border border-[#B5A99A] rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Current Availability</h3>
              <p className="text-gray-700">{availability.message}</p>
              {availability.unavailableDates.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Currently unavailable dates:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {availability.unavailableDates.slice(0, 5).map((date) => (
                      <span key={date} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {new Date(date).toLocaleDateString()}
                      </span>
                    ))}
                    {availability.unavailableDates.length > 5 && (
                      <span className="text-gray-600 text-sm">
                        +{availability.unavailableDates.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

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
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent ${
                        formData.eventDate && isDateUnavailable(formData.eventDate) 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {formData.eventDate && isDateUnavailable(formData.eventDate) && (
                      <p className="text-red-600 text-sm mt-1">This date is not available. Please select a different date.</p>
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
                      Expected Guest Count
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
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
                    name="agreeToTexts"
                    checked={formData.agreeToTexts}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to receive text messages from Project Party Productions regarding my booking and event updates.
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
                    <p className="text-gray-600">647-957-2057</p>
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
    </div>
  );
};

export default BookNow;
