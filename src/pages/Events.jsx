import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowRight, X, Award, ExternalLink, Star, Users, Music, Film, Mic2, IndianRupee } from "lucide-react";
import PaymentButton from '../components/PaymentButton';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Set loading to false when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Small delay to show loading state
    
    return () => clearTimeout(timer);
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    document.body.style.position = 'static';
    // Add a small delay before clearing the selected event to allow the animation to complete
    setTimeout(() => setSelectedEvent(null), 300);
  };

  // Close modal when pressing Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    
    // Cleanup function to ensure body styles are reset when component unmounts
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    };
  }, []);
  
  // Clean up body styles when navigating away
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    };
  }, []);

  const events = [
    {
      id: 1,
      title: "Voice of Ekarikthin",
      date: "March 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "B.B. Court",
      image: "/images/voe.png",
      description: "🎤 Voice of Ekarikthin (Singing)\nA flagship musical competition where talented singers perform solo to showcase their vocal range, control, and emotional expression.\nOpen to multiple genres, this event celebrates passion for music and stage confidence.\nJudged on voice quality, pitch, expression, and overall performance.",
      shortDescription: "A flagship singing competition showcasing vocal talent across genres, judged on voice quality, pitch, and stage presence.",
      tag: "✨ Cultural",
      prizePool: 20000, // Total prize pool
      prizeBreakup: {
        first: 12000,  // 60% of total
        second: 8000   // 40% of total
      },
      registrationFee: {
        inside: 700,
        outside: 700
      },
      teamSize: "Solo",
      registrationLink: "#",
      rules: [
        "Will be Updates Soon"
      ],
      highlights: [
        "Open to all music forms",
        "Professional sound and lighting provided",
        "Winning team gets direct entry to the finals next year"
      ]
    },
    {
      id: 2,
      title: "Ritzy",
      date: "March 16, 2025",
      registrationFee: {
        inside: 800,
        outside: 800
      },
      time: "4:00 PM - 8:00 PM",
      location: "Open Air Theater",
      image: "/images/rit.jpeg",
      description: "Ritzy (Ramp Walk)\nA dazzling fashion event where participants express confidence, elegance, and personality on the ramp.\nIt's not just about outfits, but attitude, posture, and presentation.\nRitzy celebrates individuality, style, and stage presence.",
      shortDescription: "A glamorous ramp walk event celebrating confidence, attitude, and fashion sense as participants own the stage with style.",
      tag: "Ramp Walk",
      prizePool: 50000,
      prizeBreakup: {
        first: 24000,  // 60% of total
        second: 16000,
        subtitle: 10000   // 40% of total
      },
      teamSize: "Solo",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Professional sound system provided",
        "Judges from the music industry",
        "Recording opportunity for top performers"
      ]
    },
    {
      id: 3,
      title: "Cosplay",
      date: "March 17, 2025",
      time: "9:00 AM - 9:00 PM",
      location: "Computer Center",
      image: "/images/cp.png",
      description: " Cosplay\nA creative showcase where participants dress up as iconic characters from movies, anime, comics, or games.\nCosplay focuses on costume design, accuracy, expressions, and performance.\nA perfect blend of imagination, creativity, and fandom culture.",
      shortDescription: "Step into the shoes of your favorite characters and bring imagination to life through creative costumes and performances.",
      tag: "Cultural",
      prizePool: 30000,
      prizeBreakup: {
        first: 20000,  // 60% of total
        second: 10000  // 40% of total
      },
      registrationFee: {
        inside: {
          solo: 500,
          duo: 800,
          group: 1000
        },
        outside: {
          solo: 500,
          duo: 800,
          group: 1000
        }
      },
      teamSize: "2-4 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Mentorship from industry experts",
        "Free food and swag",
        "Chance to pitch to investors"
      ]
    },
    {
      id: 4,
      title: "Rockville",
      date: "March 18, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Business Incubator",
      image: "/images/rv.png",
      description: "Rockville (DJ Night)\nAn electrifying DJ night that brings the campus alive with powerful beats and vibrant energy.\nA celebration of music, dance, and togetherness, making it one of the most awaited events.\nPure vibes, lights, and unforgettable memories.",
      shortDescription: "An electrifying DJ night filled with music, beats, and energy—where the crowd vibes nonstop.",
      tag: "Music",
      prizePool: 60000,
      prizeBreakup: {
        first: 40000,  // 60% of total
        second: 20000  // 40% of total
      },
      registrationFee: {
        inside: 2500,
        outside: 2500
      },
      teamSize: "1-3 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Chance to secure funding",
        "Mentorship from successful entrepreneurs",
        "Networking opportunities"
      ]
    },
    {
      id: 5,
      title: "BGMI",
      date: "March 19, 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Engineering Block",
      image: "/images/bgmi.png",
      description: "BGMI\nA competitive battle royale tournament testing teamwork, strategy, and in-game decision-making.\nTeams fight it out in intense matches where survival and coordination are key.\nOnly the smartest and sharpest squads make it to the top.",
      shortDescription: "A high-intensity battle royale gaming competition testing strategy, teamwork, and sharp reflexes.",
      tag: "Gaming",
      prizePool: 40000,
      prizeBreakup: {
        first: 24000,  // 60% of total
        second: 16000  // 40% of total
      },
      registrationFee: {
        inside: 600,
        outside: 1200
      },
      teamSize: "4 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Workshop on combat robotics",
        "Prizes for innovation and design",
        "Chance to compete in national competitions"
      ]
    },
    {
      id: 6,
      title: "MLBB",
      date: "March 20, 2025",
      time: "All Day",
      location: "Campus Wide",
      image: "/images/ml.png",
      description: "A fast-paced MOBA gaming competition where teams battle using heroes, skills, and strategy.\nEmphasizes coordination, tactical planning, and quick reflexes.\nPerfect for gamers who thrive under pressure.",
      shortDescription: "A fast-paced MOBA tournament where teams compete using skills, coordination, and tactical gameplay.",
      tag: "Gaming",
      prizePool: 50000,
      prizeBreakup: {
        first: 40000,  // 60% of total
        second: 20000  // 40% of total
      },
      registrationFee: {
        inside: 750,
        outside: 1500
      },
      teamSize: "As Required",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Multiple categories to compete in",
        "Exhibition of winning entries",
        "Judged by professional photographers"
      ]
    },
    {
      id: 7,
      title: "Survive NIT",
      date: "March 21, 2025",
      time: "5:00 PM - 9:00 PM",
      location: "Main Stage",
      image: "/images/sn.png",
      description: "A reality-show-inspired survival challenge designed to test physical stamina, mental strength, and strategy.\nParticipants face multiple rounds of tasks and eliminations.\nOnly the most adaptable and determined survive till the end.",
      shortDescription: "A survival-based challenge inspired by reality shows, pushing participants through physical, mental, and strategic tasks.",
      tag: "Sports",
      prizePool: 3000,
      prizeBreakup: {
        first: 3000,  // 60% of total
        second: 0  // 40% of total
      },
      registrationFee: {
        inside: 50,
        outside: 100
      },
      teamSize: "As Required",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Separate categories for solo and group",
        "Professional dance floor",
        "Special performance by professional dancers"
      ]
    },
    {
      id: 8,
      title: "Pitch It",
      date: "March 22, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Open Air Theater",
      image: "/images/pi.png",
      description: "An innovation-focused platform where participants pitch ideas addressing real-world problems.\nEncourages creativity, entrepreneurship, and problem-solving skills.\nJudged on innovation, feasibility, impact, and presentation.",
      shortDescription: "An innovation-driven event where participants pitch creative ideas and solutions to real-world problems.",
      tag: "Entrepreneurship",
      prizePool: 2000,
      prizeBreakup: {
        first: 2000,  // 60% of total
        second: 0  // 40% of total
      },
      registrationFee: {
        inside: 50,
        outside: 100
      },
      teamSize: "As Required",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Professional sound system and stage setup",
        "Judges from the music industry",
        "Winner gets a recording studio session"
      ]
    },
    {
      id: 9,
      title: "Brain Snap",
      date: "March 17, 2025",
      time: "7:00 PM - 9:30 PM",
      location: "Amphitheater",
      image: "/images/bs.png",
      description: "A mind-bending competition packed with puzzles, riddles, and logical challenges.\nTests analytical thinking, speed, and reasoning abilities.\nPerfect for those who love mental challenges and problem-solving.",
      shortDescription: "A brain-teasing competition full of puzzles, riddles, and logical challenges to test problem-solving skills..",
      tag: "Sport",
      prizePool: 2000,
      prizeBreakup: {
        first: 2000,  // 60% of total
        second: 0  // 40% of total
      },
      registrationFee: {
        inside: 50,
        outside: 100
      },
      teamSize: "Solo",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Open mic for all participants",
        "Judged by professional comedians",
        "Winner gets a spot in a professional comedy show"
      ]
    },
    {
      id: 10,
      title: "Spell Bee",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/sb.png",
      description: "A classic yet thrilling spelling competition that tests vocabulary, pronunciation, and accuracy.Participants compete through multiple rounds with increasing difficulty.A true test of language skills and focus.",
      shortDescription: "A classic spelling competition that tests vocabulary, pronunciation, and linguistic accuracy.",
      tag: "Sports",
      prizePool: 2000,
      prizeBreakup: {
        first: 2000,  // 60% of total
        second: 0  // 40% of total
      },
      registrationFee: {
        inside: 50,
        outside: 100
      },
      teamSize: "1-6 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
     {
      id: 11,
      title: "Circuit X",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/cx.png",
      description: "A technical event designed for electronics enthusiasts and problem solvers.Participants analyze and solve electrical and electronic circuits within limited time.Tests conceptual clarity, practical understanding, and logical thinking.",
      shortDescription: "An electrical circuit-solving competition designed to test technical knowledge, logic, and practical understanding.",
      tag: "Sports",
      prizePool: 2000,
      prizeBreakup: {
        first: 2000,  // 60% of total
        second: 0  // 40% of total
      },
      registrationFee: {
        inside: 50,
        outside: 100
      },
      teamSize: "1-6 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
     {
      id: 12,
      title: "Rangoli",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/rg.png",
      description: "An artistic competition celebrating colors, symmetry, and cultural creativity.Participants design visually appealing rangoli patterns based on given themes.Judged on creativity, neatness, color usage, and overall presentation.",
      shortDescription: "A colorful artistic event celebrating creativity, symmetry, and cultural expression through rangoli designs..",
      tag: "Sports",
      prizePool: 2000,
      prizeBreakup: {
        first: 2000,  // 60% of total
        second: 0  // 40% of total
      },
      registrationFee: {
        inside: 50,
        outside: 100
      },
      teamSize: "1-6 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
     {
      id: 13,
      title: "Reel of Ekarikthin",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/roe.png",
      description: "A short video-making contest capturing the essence and excitement of the fest.Participants create engaging reels highlighting moments, energy, and creativity.Judged on originality, editing, storytelling, and impact.",
      shortDescription: "A short-reel creation contest capturing the spirit, excitement, and moments of Ekarikthin.",
      tag: "Cultural",
      prizePool: 3000,
      prizeBreakup: {
        first: 2000,  // 60% of total
        second: 1000  // 40% of total
      },
      registrationFee: {
        inside: 0,
        outside:0
      },
      teamSize: "1-6 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
     {
      id: 14,
      title: "Photo of Ekarikthin",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/photo.jpeg",
      description: "A photography competition focused on capturing powerful moments and emotions of the fest.Participants showcase storytelling through visuals.Judged on composition, clarity, creativity, and relevance.",
      shortDescription: "A photography competition focused on capturing stunning visuals, emotions, and memories of the fest.",
      tag: "Cultural",
      prizePool: 2500,
      prizeBreakup: {
        first: 1500,  // 60% of total
        second: 1000  // 40% of total
      },
      registrationFee: {
        inside: 0,
        outside: 0
      },
      teamSize: "1-6 members",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
     {
      id: 15,
      title: "MEN'S MARATHON",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/mar.jpeg",
      description: "A fitness-focused event promoting endurance, discipline, and healthy living.\nParticipants challenge themselves physically while embracing sportsmanship.\nA run fueled by determination and energy.",
      shortDescription: "A test of endurance and determination, promoting fitness, discipline, and sportsmanship.",
      tag: "Sports",
      prizePool: 21500,
      prizeBreakup: {
        first: 10000,  // 60% of total
        second: 5000,
        third: 3000,
        consolation: 3500  // 40% of total
      },
      registrationFee: {
        inside: 100,
        outside: 200
      },
      teamSize: "Solo",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
    {
      id: 16,
      title: "WOMEN'S MARATHON",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/mar.jpeg",
      description: "A fitness-focused event promoting endurance, discipline, and healthy living.\nParticipants challenge themselves physically while embracing sportsmanship.\nA run fueled by determination and energy.",
      shortDescription: "A test of endurance and determination, promoting fitness, discipline, and sportsmanship.",
      tag: "Sports",
      prizePool: 16500,
      prizeBreakup: {
        first: 7000,  // 60% of total
        second: 4000,
        third: 2000,
        consolation: 3500  // 40% of total
      },
      registrationFee: {
        inside: 70,
        outside: 150
      },
      teamSize: "Solo",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
    {
      id: 17,
      title: "FUTSAL",
      date: "March 17, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/fut.jpeg",
      description: "A high-energy five-a-side football tournament played with speed and skill.Focuses on teamwork, quick passes, \nand fast gameplay.An action-packed event for football lovers.",
      shortDescription: "A thrilling five-a-side football tournament featuring speed, teamwork, and high-energy gameplay.",
      tag: "Sports",
      prizePool: 54000,
      prizeBreakup: {
        first: 30000,  // 60% of total
        second: 20000,
        
        consolation: 4000  // 40% of total
      },
      registrationFee: {
        inside: 1500,
        outside: 2500
      },
      teamSize: "Solo",
      rules: [
        "Will be Updated Soon"
      ],
      highlights: [
        "Categories: Mime, Street Play, and Mono Act",
        "Professional stage and lighting setup",
        "Special workshop with renowned theatre artists"
      ]
    },
  ];

  const icons = {
    "Cultural Night": <Users className="w-7 h-7 text-pink-300" />,
    "Battle of Bands": <Music className="w-7 h-7 text-yellow-300" />,
    "Stand-up Comedy": <Film className="w-7 h-7 text-pink-300" />,
    "Drama & Mime": <Mic2 className="w-7 h-7 text-blue-300" />,
  };

  const getCategoryColor = (tag) => {
    switch(tag) {
      case '✨ Featured Event': return 'from-pink-500 to-purple-600';
      case '🎵 Music Fest': return 'from-yellow-500 to-amber-600';
      case '😂 Comedy Show': return 'from-pink-500 to-rose-600';
      case '🎭 Theatre Show': return 'from-blue-500 to-cyan-600';
      case 'Ramp Walk': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  // Filter events based on active category
  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => {
      if (activeCategory === 'cultural') {
        // Match any cultural-related tags or events with 'cultural' in title (case insensitive)
        const tag = (event.tag || '').toLowerCase();
        const title = (event.title || '').toLowerCase();
        return tag.includes('cultural') || 
               tag.includes('music') || 
               tag.includes('dance') ||
               tag.includes('performance') ||
               title.includes('cultural');
      }
      if (activeCategory === 'mini') {
        // Match any mini events or tech-related events
        const tag = (event.tag || '').toLowerCase();
        const title = (event.title || '').toLowerCase();
        return tag.includes('mini') || 
               tag.includes('tech') || 
               tag.includes('academic') ||
               title.includes('mini');
      }
      if (activeCategory === 'sports') {
        // Match any sports-related events
        const tag = (event.tag || '').toLowerCase();
        const title = (event.title || '').toLowerCase();
        return tag.includes('sport') || 
               tag.includes('game') || 
               tag.includes('battle') ||
               title.includes('sport') || 
               title.includes('game');
      }
      return true;
    });

  // Debug logs
  console.log('Active category:', activeCategory);
  console.log('Filtered events count:', filteredEvents.length);
  console.log('All events:', events);
  console.log('Filtered events:', filteredEvents);

  return (
    <div className="min-h-screen w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 px-2 sm:px-3 md:px-6 relative flex flex-col items-center text-gray-800 dark:text-white transition-all duration-300">
      <div className="max-w-7xl w-full px-1 sm:px-2 md:px-4 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Events & Competitions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
            Experience the excitement of Ekarikthin 2025 through our diverse range of events and competitions.
          </p>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base ${
                activeCategory === 'all' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveCategory('cultural')}
              className={`px-5 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
                activeCategory === 'cultural' 
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Cultural
            </button>
            
            <button
              onClick={() => setActiveCategory('sports')}
              className={`px-5 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
                activeCategory === 'sports' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Sports
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-6 transition-all duration-300 w-full max-w-2xl mx-auto sm:max-w-none">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              onClick={() => openModal(event)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex-shrink-0"
            >
              <div className="relative h-56 sm:h-52 md:h-56 overflow-hidden transition-all duration-300">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  {event.tag}
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.shortDescription}</p>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                
                <div className="w-full mb-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                    <IndianRupee size={16} className="mr-1" />
                    <span className="font-medium">Registration Fee</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                    {event.registrationFee ? (
                      typeof event.registrationFee.inside === 'object' ? (
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-1">Type</th>
                              <th className="text-right pr-2">Inside</th>
                              <th className="text-right">Outside</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100 dark:border-gray-600">
                              <td className="py-1">Solo</td>
                              <td className="text-right pr-2">₹{event.registrationFee.inside?.solo || 'N/A'}</td>
                              <td className="text-right">₹{event.registrationFee.outside?.solo || 'N/A'}</td>
                            </tr>
                            <tr className="border-b border-gray-100 dark:border-gray-600">
                              <td className="py-1">Duo</td>
                              <td className="text-right pr-2">₹{event.registrationFee.inside?.duo || 'N/A'}</td>
                              <td className="text-right">₹{event.registrationFee.outside?.duo || 'N/A'}</td>
                            </tr>
                            <tr>
                              <td className="py-1">Group</td>
                              <td className="text-right pr-2">₹{event.registrationFee.inside?.group || 'N/A'}</td>
                              <td className="text-right">₹{event.registrationFee.outside?.group || 'N/A'}</td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Inside</div>
                            <div className="font-medium">₹{event.registrationFee.inside || 'N/A'}</div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Outside</div>
                            <div className="font-medium">₹{event.registrationFee.outside || 'N/A'}</div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-2 text-gray-500">
                        Registration details coming soon
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Award size={18} className="mr-1" />
                    <span className="text-sm font-medium">₹{event.prizePool.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-400">No events found in this category.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
            >
              View All Events
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 md:bg-opacity-50 flex items-start justify-center p-0 z-50 overflow-y-auto transition-all duration-300 backdrop-blur-sm"
            style={{ top: '0', bottom: '0', left: '0', right: '0' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 my-4 overflow-hidden flex flex-col transition-all duration-300 text-sm border border-gray-200 dark:border-gray-700"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10 shadow-md"
                >
                  <X size={16} />
                </button>
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-5 overflow-y-auto">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        {selectedEvent.tag}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedEvent.teamSize}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {selectedEvent.description}
                    </p>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-2 mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span>{selectedEvent.date} • {selectedEvent.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-2 mb-2">
                      <MapPin size={16} className="mr-2" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    
                    <div className="mt-3 mb-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1.5">Registration Fee</h3>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-lg text-xs">
                        <div className="mb-2">
                          <span className="font-medium">Inside College:</span>
                          {typeof selectedEvent.registrationFee.inside === 'object' ? (
                            <div className="ml-2">
                              <div>Solo: ₹{selectedEvent.registrationFee.inside.solo}</div>
                              <div>Duo: ₹{selectedEvent.registrationFee.inside.duo}</div>
                              <div>Group: ₹{selectedEvent.registrationFee.inside.group}</div>
                            </div>
                          ) : (
                            <span className="ml-2">₹{selectedEvent.registrationFee.inside}</span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Outside College:</span>
                          {typeof selectedEvent.registrationFee.outside === 'object' ? (
                            <div className="ml-2">
                              <div>Solo: ₹{selectedEvent.registrationFee.outside.solo}</div>
                              <div>Duo: ₹{selectedEvent.registrationFee.outside.duo}</div>
                              <div>Group: ₹{selectedEvent.registrationFee.outside.group}</div>
                            </div>
                          ) : (
                            <span className="ml-2">₹{selectedEvent.registrationFee.outside}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <a
                        href="/rules.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        View Rules (PDF)
                      </a>
                      <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Click to view the complete rules and guidelines for this event.
                      </p>
                    </div>
                    
                    {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                      <div className="mt-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Highlights</h3>
                        <ul className="space-y-1 text-xs">
                          {selectedEvent.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 text-sm">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                      <Award size={20} className="mr-2" />
                      <span className="font-bold">Prize Pool</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      ₹{selectedEvent.prizePool.toLocaleString()}
                    </div>
                    
                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">1st Prize</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          ₹{Math.floor(selectedEvent.prizePool * 0.6).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-4">
                        <span className="text-gray-600 dark:text-gray-300">2nd Prize</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          ₹{Math.floor(selectedEvent.prizePool * 0.4).toLocaleString()}
                        </span>
                      </div>
                      
                      <Link 
                        to={`/register?event=${selectedEvent.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          closeModal();
                        }}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-center text-sm sm:text-base"
                      >
                        <span>Register Now</span>
                        <ArrowRight size={18} className="ml-2 inline" />
                      </Link>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        Limited seats available
                      </p>
                  </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Event Rules
                    </h3>
                    <a
                      href="/rules.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Full Rules (PDF)
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Please download the rules document for complete details about the event rules and guidelines.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
