import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sasha R",
      image: "/Sasha1.JPG",
      title: "OWNER & PHOTOBOOTH OPERATOR",
      quote: "\"EVERY GUEST GETS TREATED LIKE FAMILY.\"",
      description: "I’m Sasha, and I started Project Party Productions because I noticed something was missing in the world of photo booths. Most of them are fun to look at, but they don’t bring energy or excitement to the party. I wanted to change that. I don’t just operate the booth, I’m part of the entertainment! Every detail is carefully thought out to make sure guests are laughing, having fun, and feeling included. We’re all about giving exceptional value and making sure every event is unforgettable. And we’re fully mobile! Whether it’s an indoor or outdoor wedding, a backyard, a field, the beach, or anywhere there are people ready to have a party, Project Party Productions will be there. I’m bubbly, quirky, and full of energy, and I’m backed by an amazing team that makes every event run smoothly. For us, it’s more than just about photos or 360 videos, it’s about creating an experience that everyone remembers long after the party ends. Because at the end of the day, your celebration deserves more than just a photo booth—it deserves an experience!"
    },
    {
      name: "Vick L",
      image: "/Vic.JPG", 
      title: "CHIEF OPERATIONS OFFICER & PHOTOBOOTH OPERATOR",
      quote: "\"MEASURE TWICE, AND CUT ONCE.\"",
      description: "I'm Vic, and I’ve loved working with people for as long as I can remember, starting out as a camp counselor and swimming instructor, and later spending much of my career supporting individuals with developmental differences. These experiences taught me how to connect with all kinds of people, stay attentive to their needs, and help make ideas come to life. At Project Party Productions, I bring that same care and attention to every event. I make sure every detail is planned, every question is answered, and every client’s vision becomes a reality. Communication is key for me, I’m always listening, coordinating, and staying on top of everything so that guests can just enjoy the moment. Whether it’s a photo booth, a 360 video experience, or a completely customized setup, I’m here to make sure the experience is fun, smooth, and unforgettable."
    },
    {
      name: "Sarah R",
      image: "/Sarah1.jpg",
      title: "CHIEF MARKETING OFFICER & PHOTOBOOTH OPERATOR",
      quote: "\"TO INFINITY AND BEYOND.\"",
      description: "Hi online world, my name is Sarah! I’m a creative at heart who loves bringing energy and excitement to every event with Project Party Productions. Whether I’m running our 360 photo booth or our mobile photo booth, I thrive on creating unforgettable experiences and making sure every guest has a blast. What I love most about what I do is seeing the pure joy on people’s faces when they step into the booth and let loose—it’s those candid smiles and fun memories that make it all worthwhile. Being part of a team that turns celebrations into lasting moments is such a privilege, and I can’t wait to keep spreading that same joy at every event we’re a part of."
    },
    {
      name: "Prince A",
      image: "/Prince.JPG",
      title: "CHIEF TECHNOLOGY OFFICER & PHOTOBOOTH OPERATOR",
      quote: "\"INNOVATION WITH PERCISION, EXECUTION WITH PURPOSE.\"",
      description: "I’m Prince, known professionally as ElliotSop. As Chief Technology Officer at Project Party Productions, I bring my background in cybersecurity, software development, and systems engineering to everything we build. I thrive on solving complex problems and turning ideas into streamlined solutions that work flawlessly under pressure. From designing efficient back-end systems to ensuring our technology delivers a fast, reliable, and secure experience for every event, I focus on precision and scalability. My goal is to make sure our team has the tools and technology that not only keep up with demand but push the boundaries of what’s possible in the photo booth industry. Whether it’s integrating new features, optimizing performance, or automating processes to reduce costs for our clients, I’m always thinking about how to deliver innovation without compromise. For me, technology isn’t just about code or hardware—it’s about creating a foundation that allows unforgettable moments to happen seamlessly."
    },
    {
      name: "Havisha S",
      image: "/Havisha1.jpg",
      title: "PHOTOBOOTH OPERATOR",
      quote: "\"WE CAN'T HELP EVERYONE, BUT EVERYONE CAN HELP SOMEONE.\"",
      description: "I’m Havi and I’m someone who loves adventure. I love trying new things, creating moments to laugh about later, and enjoying life as it comes. Too often we get caught up in the rush of routines and the weight of responsibilities, and we forget that joy is what truly connects us. That’s why I love what I do at Project Party Productions. Our booth is a little reminder that life is best enjoyed when we let ourselves play, be silly, and connect with the people around us. What makes my work special is the interaction I get to have with every single person who steps in front of the camera. Whether it’s sparking a laugh, helping someone who’s camera-shy feel comfortable, or encouraging a group to get a little silly with props, I love being able to provide our guests with a collection of moments that last a lifetime."
    },
    {
      name: "Matthew L",
      image: "/Matthew.JPG",
      title: "PHOTOBOOTH OPERATOR",
      quote: "\"NEVER JUDEGE A PERSON BY THEIR WORSE ACTIONS.\"",
      description: "At 24 years old, Matthew brings a wealth of hands-on experience and people-focused skills to every environment he steps into. Starting his career as a swimming instructor and lifeguard, he developed a strong sense of responsibility, attention to detail, and the ability to remain calm under pressure—skills that are invaluable in both safety and event settings. His time as a camp counselor further refined his ability to engage with people from all walks of life, including individuals with disabilities, ensuring everyone felt included, supported, and—most importantly—had a great time. Now working as a welder, Matthew combines precision, discipline, and a strong work ethic with a grounded, team-oriented mindset. His background in high-responsibility roles where safety and enjoyment go hand-in-hand makes him a natural fit for the events industry. Whether helping coordinate logistics or engaging with guests, Matthew brings a unique blend of technical know-how and people skills, making him a reliable and adaptable asset in delivering smooth, safe, and memorable experiences."
    },
    {
      name: "Keval N",
      image: "/Keval1.jpg",
      title: "PHOTOBOOTH OPERATOR",
      quote: "\"UNSHAKEN WHEN THE WORLD IS SHAKEN.\"",
      description: "Husband, father and friend. Building strength through family, discipline, and growth. Guided by stoic calm, fueled by curiosity, and committed to rising stronger each day. At Project Party Production, I bring the same commitments from my personal life to the team. Ensuring that everything runs smoothly with a keen eye and attention to detail. Whether it is the photo booth, 360 video, or any of our other attractions, we are here to ensure it is a fun, memorable, and stress-free experience."
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-screen">
        <link rel="preload" as="image" href="/20250804_182858278 (2).jpg" fetchpriority="high" />
        <img
          src="/20250804_182858278 (2).jpg"
          alt="About Us - Project Party Productions"
          className="w-full h-full object-cover"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">About Us</h1>
            <h2 className="text-3xl md:text-4xl font-semibold">Project Party Productions</h2>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Team Members</h2>
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-600 leading-relaxed">
              Our passionate team of owner-operators brings years of experience and boundless energy to every event. 
              We don't just provide services – we create experiences that leave lasting impressions on you and your guests.
              Each member of our team is dedicated to making your celebration extraordinary.
            </p>
          </div>

          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="flex-shrink-0 lg:w-[65%]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-96 object-cover rounded-2xl shadow-lg"
                      fetchpriority="high"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold text-gray-800 mb-2 text-left">{member.name}</h3>
                  <p className="text-[#B5A99A] text-x1 font-semibold mb-6 leading-tight text-left">
                      {member.title}
                    </p>
                    <p className="text-[#B5A99A] text-x2x1 font-semibold mb-6 leading-tight text-left">
                      {member.quote}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-left">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
