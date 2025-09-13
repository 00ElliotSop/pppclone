import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    // Event Details
    eventDate: '',
    eventTime: '',
    eventType: '',
    guestCount: '',
    venue: '',
    
    // Contact Information
    name: '',
    email: '',
    phone: '',
    
    // Package Selection
    selectedPackage: '',
    packageHours: 2,
    
    // Backdrop Selection
    selectedBackdrop: '',
    
    // Template Selection
    templateType: 'standard',
    customLogo: null as File | null,
    
    // Special Instructions
    specialInstructions: '',
    
    // Agreement
    agreeToTerms: false,
    signature: '',
    signatureDate: ''
  });

  const packages = [
    {
      id: 'digital-only',
      name: '2 hours Photo Booth (Digital Only)',
      price: 250,
      description: 'Camera with Studio lighting, Basic Backdrop, Custom Photo Template, Digital Share, Props, On-Site event assistance'
    },
    {
      id: 'print-digital',
      name: '2 Hours Photo Booth (Print + Digital)',
      price: 400,
      description: 'Camera with Studio lighting, Basic Backdrop, Custom Photo Template, Unlimited Print, Digital Share, Props, On-Site event assistance'
    },
    {
      id: 'phone-audio',
      name: '3 Hour Photo Booth + Phone Audio Guest Book',
      price: 550,
      description: 'Camera with Studio lighting, Basic Backdrop, Custom Photo Template, Unlimited Print, Digital Share, Props, On-Site event assistance + Phone Audio Guest book'
    },
    {
      id: 'waffle-flower',
      name: '2 Hour Photo Booth + Waffle Sticks + Flower Wall',
      price: 700,
      description: 'Camera with Studio lighting, Flower wall Backdrop, Custom Photo Template, Unlimited Print, Digital Share, Props, On-Site event assistance + Phone Audio Guest book, Red carpet & stanchions, travel fee'
    }
  ];

  const backdrops = [
    'White', 'White with Gold Lines', 'Pink with Gold Confetti', 'Silver Sprinkling',
    'Silver Sequence', 'Champagne Sequence', 'Gold Sprinkling', 'Black Gold Lines',
    'Black', 'Black and Gold Confetti', 'Green Boxwood', 'White Flower Wall',
    'Rose Gold Sequins', 'Navy Blue Sequins', 'Purple Sequins', 'Red Sequins',
    'Emerald Green Sequins', 'Blush Pink Floral', 'Eucalyptus Greenery', 'Tropical Palm',
    'Marble White', 'Marble Black', 'Holographic Silver', 'Holographic Gold',
    'Burgundy Velvet', 'Royal Blue Velvet', 'Dusty Rose Floral', 'Sage Green Floral',
    'Copper Sequins', 'Iridescent White', 'Vintage Lace', 'Geometric Gold'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      customLogo: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking form submitted:', formData);
    alert('Your booking form has been submitted! We will contact you within 24 hours.');
  };

  const selectedPackageDetails = packages.find(pkg => pkg.id === formData.selectedPackage);
  const totalPrice = selectedPackageDetails ? selectedPackageDetails.price + (formData.packageHours > 2 ? (formData.packageHours - 2) * 100 : 0) : 0;

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <link rel="preload" as="image" href="/DSC_0376 2.JPG" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F7E7CE] to-[#B5A99A] p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking Form</h1>
            <p className="text-gray-700">Complete your event details and preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Event Details */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Time *</label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guest Count</label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue/Location *</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                />
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                />
              </div>
            </section>

            {/* Package Selection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Package & Pricing</h2>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="selectedPackage"
                        value={pkg.id}
                        checked={formData.selectedPackage === pkg.id}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
                          <span className="text-lg font-bold text-[#B5A99A]">${pkg.price}.00 CAD</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                        {formData.selectedPackage === pkg.id && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Hours</label>
                            <select
                              name="packageHours"
                              value={formData.packageHours}
                              onChange={handleInputChange}
                              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                            >
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* Backdrop Selection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Backdrop Selection</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {backdrops.map((backdrop) => (
                  <label key={backdrop} className="cursor-pointer">
                    <input
                      type="radio"
                      name="selectedBackdrop"
                      value={backdrop}
                      checked={formData.selectedBackdrop === backdrop}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`p-3 border-2 rounded-lg text-center transition-all ${
                      formData.selectedBackdrop === backdrop 
                        ? 'border-[#F7E7CE] bg-[#F7E7CE] bg-opacity-20' 
                        : 'border-gray-200 hover:border-[#B5A99A]'
                    }`}>
                      <span className="text-sm font-medium">{backdrop}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Template Selection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Template Selection</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="templateType"
                      value="standard"
                      checked={formData.templateType === 'standard'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300"
                    />
                    <span>Standard Template</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="templateType"
                      value="premium"
                      checked={formData.templateType === 'premium'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300"
                    />
                    <span>Premium Template (single photo frame) - $50.00 CAD</span>
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your Logo/Image (Optional)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Travel Fee */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Fee</h2>
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300 rounded"
                  />
                  <div>
                    <span className="font-medium">Travel fee - $50.00 CAD</span>
                    <p className="text-sm text-gray-600">50KM from Scarborough</p>
                  </div>
                </label>
              </div>
            </section>

            {/* Special Instructions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Instructions</h2>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={4}
                placeholder="Anything related to the order (Price, design, Locations, Event setup)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
              />
            </section>

            {/* Payment Information */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#B5A99A] mb-2">
                  Email Transfer 50% Deposit or Final pay to snapsat6ix@gmail.com
                </h3>
                <p className="text-gray-600">Final Pay can also be paid by cash before the start of the event.</p>
              </div>
            </section>

            {/* Terms & Conditions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms & Conditions</h2>
              <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-700 space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Your event is NOT booked until the contract is signed and the deposit is received. Reservations are made on a "first come, first served" basis.</li>
                  <li>PAYMENT DETAILS: Payment must be received within 48 hours of signing the contract OR the contract will automatically be considered VOID.</li>
                  <li>If any provision of these terms shall be unlawful, void, or for any reason unenforceable under Contract Law, then that provision, or portion thereof, shall be deemed separate from the rest of this contract and shall not affect the validity and enforceability of any remaining provisions, or portions thereof. This is the entire agreement between Provider and Client relating to the subject matter herein and shall not be modified except in writing, signed by both parties. In the event of a conflict between parties, the Client agrees to solve any arguments via arbitration.</li>
                </ul>
              </div>
            </section>

            {/* Signature */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Signature</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-[#F7E7CE] focus:ring-[#F7E7CE] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Signature - I agree to all the terms and Conditions. *
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Digital Signature *</label>
                  <input
                    type="text"
                    name="signature"
                    value={formData.signature}
                    onChange={handleInputChange}
                    required
                    placeholder="Type your full name as your digital signature"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signature Date *</label>
                  <input
                    type="date"
                    name="signatureDate"
                    value={formData.signatureDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7E7CE] focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Total */}
            {totalPrice > 0 && (
              <div className="bg-[#F7E7CE] p-6 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  Total: ${totalPrice}.00 CAD
                </h3>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
