import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react';

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-4 weeks in advance, especially during peak wedding season (May-October). However, we can sometimes accommodate last-minute bookings depending on availability.",
      //image: "/360.jpg"
    },
    {
      question: "What's included in your photobooth packages?",
      answer: "All packages include professional lighting, backdrop of your choice, props, on-site attendant, digital copies of all photos, and custom photo templates. Print packages also include unlimited prints during your event.",
     // image: "/360-1.jpg"
    },
    {
      question: "Do you provide props?",
      answer: "Yes! We provide a wide variety of fun and professional props including signs, glasses, hats, masks, and themed accessories. We can also customize props to match your event theme.",
     // image: "/360.jpg"
    },
    {
      question: "How long does setup take?",
      answer: "Setup typically takes 30-45 minutes. We arrive early to ensure everything is ready before your guests arrive. Breakdown takes about 15-20 minutes after your event."
    },
    {
      question: "Can you customize the photo templates?",
      answer: "Absolutely! We can customize photo templates with your names, event date, logos, or any design elements you'd like. We'll work with you to create the perfect design for your event."
    },
    {
      question: "What happens if there's bad weather for outdoor events?",
      answer: "We always have backup plans for outdoor events. We can provide tents or move the setup to a covered area. We'll work with you to ensure your photobooth experience isn't affected by weather."
    },
    {
      question: "Do you travel outside of Toronto?",
      answer: "Yes, we service the Greater Toronto Area and surrounding regions. Travel fees may apply for locations outside our standard service area. Contact us for specific pricing."
    },
    {
      question: "How do we receive our photos?",
      answer: "Digital copies of all photos are provided via a secure online gallery within 48-72 hours after your event. You can download, share, and print the photos as you wish."
    },
    {
      question: "Can guests share photos instantly?",
      answer: "Yes! Our photobooths can be set up to allow instant sharing via email, text, or social media. Guests can share their photos immediately after taking them."
    },
    {
      question: "What if we need to cancel or reschedule?",
      answer: "We understand that plans can change. Please refer to our contract for specific cancellation and rescheduling policies. We try to be as flexible as possible with our clients."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options. Typically, we require a 50% deposit to secure your date, with the balance due before or on the day of your event."
    },
    {
      question: "How much space do you need for setup?",
      answer: "We typically need about 8x8 feet of space for our standard photobooth setup. For the 360 booth, we need about 10x10 feet. We can work with smaller spaces if needed."
    },
    {
      question: "Do you provide an attendant?",
      answer: "Yes! All our packages include at least two professional attendants who will help guests, manage the equipment, and ensure everything runs smoothly throughout your event."
    },
    {
      question: "Can we use our own backdrop?",
      answer: "While we have an extensive collection of professional backdrops, we can discuss using your own backdrop. Additional setup fees may apply depending on the complexity."
    },
    {
      question: "What makes your service different from others?",
      answer: "We're owner-operators who are passionate about creating amazing experiences. We don't just provide equipment - we bring energy, interaction, and professional service that keeps your guests engaged and entertained throughout your event."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-96">
        <link rel="preload" as="image" href="/360.jpg" />
        <img
          src="/360.jpg"
          alt="FAQ Hero"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold">FAQ</h1>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  {openQuestions.has(index) ? (
                    <ChevronUp className="text-[#B5A99A]" size={24} />
                  ) : (
                    <ChevronDown className="text-[#B5A99A]" size={24} />
                  )}
                </button>
                {openQuestions.has(index) && (
                  <div className="px-6 py-4 bg-white">
                    {faq.image && index < 3 && (
                      <img
                        src={faq.image}
                        alt={`FAQ ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        loading="eager"
                        decoding="sync"
                      />
                    )}
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">How to Get in Touch with Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="bg-[#F7E7CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600 text-sm">Toronto, ON<br />Canada</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F7E7CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
              <a href="tel:+16479572057" className="text-gray-600 text-sm hover:text-[#B5A99A] transition-colors">647-957-2057</a>
            </div>
            <div className="text-center lg:transform lg:-translate-x-[16%]">
              <div className="bg-[#F7E7CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-gray-800" size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm lg:transform lg:-translate-x-[8%]">info@projectpartyproductions.com</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F7E7CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-gray-800 font-bold text-lg">G</div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Google Business</h3>
              <div className="mt-4">
                <a href="https://share.google/VArZF5bOJjrN8uNCH" className="text-[#B5A99A] hover:text-[#F7E7CE] transition-colors text-sm">
                  View Our Reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
