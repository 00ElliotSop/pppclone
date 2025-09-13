import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroImages = [
    '/main.JPG',
    '/groupgirls.jpg',
    '/20250804_204445724.jpg'
  ];

  const testimonials = [
    {
      name: "Samantha D.",
      location: "Toronto, ON",
      rating: 5,
      text: "Project Party Productions made our event unforgettable. The team was punctual, super friendly, and brought a level of professionalism that put us at ease. Communication was clear from the start and the setup looked amazing. Our guests had a blast at the 360 booth and couldn't stop talking about it."
    },
    {
      name: "Emily R.",
      location: "Toronto, ON",
      rating: 5,
      text: "We hired Project Party Productions for a corporate event and they knocked it out of the park. From the booking process to the execution, everything was smooth and stress free. Their team was enthusiastic and ensured all our guests had fun. We'll definitely be using them again."
    },
    {
      name: "Ahmed K.",
      location: "Mississauga, ON",
      rating: 5,
      text: "I absolutely loved working with Project Party Productions. They were organized, responsive, and incredibly fun to work with. The booth was a huge hit and their team kept the energy high the whole night. It added a special touch to our wedding reception."
    },
    {
      name: "Jessica M.",
      location: "Vaughan, ON",
      rating: 5,
      text: "What impressed me most was how well they handled everything from start to finish. Communication was fast and efficient, and they answered all our questions without hesitation. The team showed up early, looked professional, and brought a fun vibe that elevated our party."
    },
    {
      name: "Michael T.",
      location: "Brampton, ON",
      rating: 5,
      text: "The level of service we received from Project Party Productions was top tier! They were easy to reach before the event and made sure every detail was covered. The booth experience itself was interactive and fun. Our guests were lined up the entire time and the staff kept the mood upbeat and lively."
    },
    {
      name: "Sarah L.",
      location: "Oakville, ON",
      rating: 5,
      text: "We've worked with several vendors in the past, but none matched the professionalism and energy of Project Party Productions. Their team brought great energy and really cared about making the experience special for everyone. The communication leading up to the event was excellent."
    },
    {
      name: "David P.",
      location: "Richmond Hill, ON",
      rating: 5,
      text: "Hiring Project Party Productions was one of the best decisions we made for our celebration. The 360 video booth was a showstopper and the team running it was full of personality and professionalism. They were responsive, punctual, and handled everything seamlessly."
    },
    {
      name: "Lisa K.",
      location: "Markham, ON",
      rating: 5,
      text: "You can tell Project Party Productions takes pride in what they do. From the design of their booth to how they interacted with guests, everything felt intentional and well thought out. Their team was upbeat, organized, and made everyone feel comfortable in front of the camera."
    },
    {
      name: "Robert S.",
      location: "Toronto, ON",
      rating: 5,
      text: "I'm still hearing compliments about the booth from our guests. Project Party Productions made the whole experience smooth and enjoyable. They communicated every step of the way and arrived ready to deliver fun. Their team helped hype people up and it really made our event feel next level."
    },
    {
      name: "Amanda W.",
      location: "Etobicoke, ON",
      rating: 5,
      text: "Professional, fun, and reliable, that's how I would describe Project Party Productions! Their staff was warm and engaging, making sure every guest felt like a star. I appreciated how easy they were to work with before the event and how focused they were during it. Fantastic service all around."
    }
  ];

  const whyChooseUsFeatures = [
    {
      image: '/360.jpg',
      title: 'Project Party Productions brings a professional studio ambience to your event, all of our equipment is fully mobile, no need to connect to any outlets!',
      description: 'Professional mobile setup with no power requirements.'
    },
    {
      image: '/High-definition-Images.jpg',
      title: 'Our photo booths deliver high-definition images, ensuring every smile and detail is captured in stunning clarity.',
      description: 'Crystal clear photos that capture every moment perfectly.'
    },
    {
      image: '/DSC_0381 2.JPG',
      title: 'We offer a variety of backdrops to suit any taste, ensuring your photos are unique and memorable. (32+ Backdrops and also custom backdrops available)',
      description: 'Choose from 32+ backdrops plus custom options.'
    },
    {
      image: '/DSC_1148.JPG',
      title: 'Our modern, fun props will create hilarious photo opportunities and keep your guests entertained. (We offer props for different events, seasons, holidays, and custom props).',
      description: 'Props for every occasion including custom options.'
    },
    {
      image: '/We-are-fully-insured-and-incorporated.jpg',
      title: 'We are fully insured and incorporated and have a $2 million dollar insurance liability.',
      description: 'Complete insurance coverage and professional business standing.'
    },
    {
      image: '/Minimum-of-2-professional-attendants.jpg',
      title: 'We will always have a minimum of 2 professional attendants. We provide excellent customer service and having a first-class experience is our top priority.',
      description: 'Multiple professional attendants ensuring exceptional service.'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="pt-24">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {/* Preload critical images */}
        <link rel="preload" as="image" href={heroImages[0]} fetchpriority="high" />
        <link rel="preload" as="image" href={heroImages[1]} fetchpriority="high" />
        <link rel="preload" as="image" href={heroImages[2]} fetchpriority="high" />
        <link rel="preload" as="image" href={heroImages[3]} fetchpriority="high" />
        <link rel="preload" as="image" href="/Meetdateam.gif" fetchpriority="high" />
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="sync"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
          ))}
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10 px-2">
            <div className="w-full max-w-4xl px-2">
              <h1 className="font-bold mb-4 leading-tight" style={{ 
                fontSize: 'clamp(1.9rem, 7.7vw, 5.8rem)',
                wordWrap: 'break-word',
                hyphens: 'auto'
              }}>
                PROJECT PARTY PRODUCTIONS
              </h1>
              <p className="mb-6 leading-tight px-1" style={{ 
                fontSize: 'clamp(0.95rem, 3.8vw, 1.6rem)',
                wordWrap: 'break-word'
              }}>
                Creating Unforgettable Moments with Professional Photobooth Services
              </p>
              <Link
                to="/book-now"
                className="bg-[#B5A99A] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold hover:bg-[#F7E7CE] hover:text-black transition-all duration-300 inline-block"
                style={{ fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)' }}
              >
                BOOK NOW
              </Link>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/meet-da-team.gif"
                alt="Meet the Team"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 mb-4 px-1" style={{ 
                fontSize: 'clamp(1.6rem, 5.1vw, 3.2rem)',
                lineHeight: '1.2'
              }}>MEET THE TEAM</h2>
              <p className="text-[#B5A99A] font-semibold mb-4 px-1" style={{ 
                fontSize: 'clamp(1.1rem, 3.2vw, 1.6rem)',
                lineHeight: '1.3'
              }}>
                WE BRING THE ENERGY, HANDLE EVERY DETAIL, AND CRAFT UNFORGETTABLE MOMENTS. PROFESSIONALLY, PASSIONATELY, AND ALWAYS WITH A SMILE
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed px-1" style={{ 
                fontSize: 'clamp(0.95rem, 2.6vw, 1.3rem)',
                lineHeight: '1.4'
              }}>
                At Project Party Productions, we're not just a team—we're owner-operators who live and breathe events. We know what it takes to make a party unforgettable because we've been to enough events to know what works (and what doesn't). You'll never see us just standing around like mannequins—we bring the energy, entertainment, and interaction that keeps guests laughing, spinning, and snapping all night long. Our crew is here to cater to every request with a smile, ensuring your event is not only seamless but full of life and fun. Because at the end of the day, your celebration deserves more than just a photo booth—it deserves an experience!
              </p>
              <Link
                to="/about-us"
                className="bg-[#B5A99A] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full hover:bg-[#F7E7CE] hover:text-black transition-all duration-300 inline-block font-semibold"
                style={{ fontSize: 'clamp(0.95rem, 2.6vw, 1.3rem)' }}
              >
                ABOUT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Photobooths Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="font-bold text-center text-gray-800 mb-8 sm:mb-12 md:mb-16 px-1" style={{ 
            fontSize: 'clamp(1.6rem, 5.1vw, 3.2rem)',
            lineHeight: '1.2'
          }}>OUR PHOTOBOOTHS</h2>
          
          {/* Mobile Photobooth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="font-bold text-gray-800 mb-4 px-1" style={{ 
                fontSize: 'clamp(1.4rem, 4.5vw, 2.8rem)',
                lineHeight: '1.2'
              }}>Mobile Photobooth</h3>
              <p className="text-gray-600 leading-relaxed px-1" style={{ 
                fontSize: 'clamp(0.95rem, 2.6vw, 1.3rem)',
                lineHeight: '1.4'
              }}>
                Our Mobile Photobooth is unlike any other in the market. We require no electricity, because we supply our own. We have no wires on the floor, this eliminates any chance of a tripping hazard. Our printer is completely wireless too! We can print a picture in less than 10 seconds! We also work with you to customize your experience!
              </p>
            </div>
            <div className="relative">
              <img
                src="/DSC_0376 2.JPG"
                alt="Mobile Photobooth"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>

          {/* 360 Videobooth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-none">
              <img
                src="/360 Photobooth setup MCA-G.jpg"
                alt="360 Videobooth"
                className="w-full rounded-2xl shadow-lg"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div className="order-1 lg:order-none">
              <h3 className="font-bold text-gray-800 mb-4 px-1" style={{ 
                fontSize: 'clamp(1.4rem, 4.5vw, 2.8rem)',
                lineHeight: '1.2'
              }}>360 Videobooth</h3>
              <p className="text-gray-600 leading-relaxed px-1" style={{ 
                fontSize: 'clamp(0.95rem, 2.6vw, 1.3rem)',
                lineHeight: '1.4'
              }}>
                Our 360 Video Booth platform is the biggest in the industry at 46 inches (117CM), and can easily fit over 6+ people. Just like the Mobile Photobooth our 360 Videobooth is also completely wireless!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="font-bold text-center text-gray-800 mb-8 sm:mb-12 md:mb-16 px-1" style={{ 
            fontSize: 'clamp(1.6rem, 5.1vw, 3.2rem)',
            lineHeight: '1.2'
          }}>OUR SERVICES</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-bold text-gray-800 mb-8 px-1" style={{ 
                fontSize: 'clamp(1.4rem, 4.5vw, 2.4rem)',
                lineHeight: '1.2'
              }}>WE OFFER A VAST RANGE OF CUSTOMIZABLE SERVICES</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F7E7CE] p-3 rounded-lg flex-shrink-0">
                    <div className="w-6 h-6 bg-[#B5A99A] rounded"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2" style={{ 
                      fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)'
                    }}>WEDDINGS</h4>
                    <p className="text-gray-600" style={{ 
                      fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)'
                    }}>Create magical moments for you and your guests.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F7E7CE] p-3 rounded-lg flex-shrink-0">
                    <div className="w-6 h-6 bg-[#B5A99A] rounded"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2" style={{ 
                      fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)'
                    }}>CORPORATE EVENTS</h4>
                    <p className="text-gray-600" style={{ 
                      fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)'
                    }}>Add fun and engagement to your brand activations.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F7E7CE] p-3 rounded-lg flex-shrink-0">
                    <div className="w-6 h-6 bg-[#B5A99A] rounded"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2" style={{ 
                      fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)'
                    }}>PRIVATE PARTIES</h4>
                    <p className="text-gray-600" style={{ 
                      fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)'
                    }}>Make birthday parties, baby showers, and anniversaries unforgettable.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-[#F7E7CE] p-3 rounded-lg flex-shrink-0">
                    <div className="w-6 h-6 bg-[#B5A99A] rounded"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2" style={{ 
                      fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)'
                    }}>CUSTOM EXPERIENCES</h4>
                    <p className="text-gray-600" style={{ 
                      fontSize: 'clamp(0.9rem, 2.4vw, 1.1rem)'
                    }}>Tailored to your event theme, from backdrops to props.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/king-queen2.jpg"
                alt="Our Services"
                className="w-full rounded-2xl shadow-lg transform scale-110 object-cover"
                style={{ transform: 'scale(1.19)', transformOrigin: '30% center' }}
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="text-center text-gray-800 mb-8 sm:mb-12 md:mb-16 font-bold px-1" style={{ 
            fontSize: 'clamp(1.6rem, 5.1vw, 3.2rem)',
            lineHeight: '1.2'
          }}>WHY CHOOSE US?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-2xl shadow-lg mx-auto"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 sm:mb-4 leading-tight px-1" style={{ 
                  fontSize: 'clamp(1.1rem, 3.2vw, 1.4rem)',
                  lineHeight: '1.3'
                }}>
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="font-bold text-center text-gray-800 mb-8 sm:mb-12 md:mb-16 px-1" style={{ 
            fontSize: 'clamp(1.6rem, 5.1vw, 3.2rem)',
            lineHeight: '1.2'
          }}>TESTIMONIALS</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#B5A99A] rounded-2xl p-4 sm:p-6 md:p-8 text-white min-h-[240px] sm:min-h-[280px] md:min-h-[300px] flex flex-col justify-center mx-2">
              <div className="flex justify-center mb-3 sm:mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                ))}
              </div>
              <blockquote className="text-center mb-3 sm:mb-4 md:mb-6 leading-relaxed px-1 sm:px-2" style={{ 
                fontSize: 'clamp(0.95rem, 3.2vw, 1.6rem)',
                lineHeight: '1.4'
              }}>
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="text-center">
                <p className="text-[#F7E7CE] font-semibold px-1" style={{ 
                  fontSize: 'clamp(0.95rem, 2.6vw, 1.4rem)',
                  lineHeight: '1.3'
                }}>
                  {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>

            {/* Testimonial Controls */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#F7E7CE] text-gray-900 p-3 rounded-full hover:bg-white transition-all shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#F7E7CE] text-gray-900 p-3 rounded-full hover:bg-white transition-all shadow-lg"
            >
              <ChevronRight size={20} />
            </button>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-[#B5A99A]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
