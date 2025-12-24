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
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const events = [
    {
      id: 1,
      title: "Voice of Ekarikthin",
      date: "March 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "B.B. Court",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200",
      description: "A magical night of traditional, contemporary and regional cultural performances that showcase the rich diversity of our cultural heritage. Experience an evening filled with vibrant colors, captivating music, and mesmerizing performances that will leave you spellbound.",
      shortDescription: "A magical night of traditional, contemporary and regional cultural performances.",
      tag: "✨ Featured Event",
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
        "Maximum performance time: 10 minutes",
        "No explicit or offensive content",
        "Participants must report 1 hour before the event",
        "Judges' decision will be final"
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
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27d5f0?q=80&w=1200",
      description: "Rock bands from across the region compete for the ultimate prize. Showcase your musical talent and stage presence in this high-energy competition.",
      shortDescription: "Rock bands compete for the ultimate prize in this high-energy competition.",
      tag: "Ramp Walk",
      prizePool: 50000,
      prizeBreakup: {
        first: 24000,  // 60% of total
        second: 16000,
        subtitle: 10000   // 40% of total
      },
      teamSize: "Solo",
      rules: [
        "Maximum 15 minutes performance time",
        "Original compositions get bonus points",
        "Provide your own instruments (drum kit will be provided)",
        "Sound check 2 hours before the event"
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
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200",
      description: "A 24-hour coding marathon where developers, designers, and entrepreneurs come together to build innovative solutions to real-world problems.",
      shortDescription: "24-hour coding marathon to build innovative solutions.",
      tag: "Cosplay",
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
        "Maximum team size: 4 members",
        "No pre-built solutions allowed",
        "Code must be written during the event",
        "Presentations limited to 5 minutes"
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
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
      description: "A platform for budding entrepreneurs to pitch their startup ideas to a panel of investors and industry experts. Win seed funding and mentorship opportunities.",
      shortDescription: "Pitch your startup idea to investors and win funding.",
      tag: "Bands",
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
        "5-minute pitch + 3-minute Q&A",
        "No existing funding over ₹10 lakhs",
        "Must have a working prototype",
        "Business plan submission required"
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
      image: "https://images.unsplash.com/photo-1535378917042-10a22c9593a5?q=80&w=1200",
      description: "Design and build your combat robot to compete in an epic battle of engineering and strategy. Test your robot's strength, durability, and your driving skills.",
      shortDescription: "Combat robotics competition for engineering enthusiasts.",
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
        "Robot weight limit: 15kg",
        "No fire, liquid, or entanglement weapons",
        "Safety inspection required",
        "Arena rules will be strictly enforced"
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
      image: "https://images.unsplash.com/photo-1472214103451-93781bd7b7d2?q=80&w=1200",
      description: "Capture the essence of our college fest through your lens. Submit your best photographs across different categories and win exciting prizes.",
      shortDescription: "Capture and submit your best photographs from the fest.",
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
        "Maximum 3 entries per participant",
        "No digital manipulation allowed",
        "Must be shot during the fest",
        "High-resolution images required"
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
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200",
      description: "Show off your best dance moves in this high-energy dance competition. Solo and group categories available. Let the rhythm take over!",
      shortDescription: "Show off your best dance moves in this high-energy competition.",
      tag: "💃 Dance",
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
        "Maximum 5 minutes performance time",
        "No explicit content",
        "Music must be submitted in advance",
        "Judges' decision is final"
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
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200",
      description: "Rock bands clash for the ultimate musical glory in this high-energy competition. Showcase your musical talent, stage presence, and crowd engagement as you battle it out with the best bands from across the region.",
      shortDescription: "Rock bands clash for the ultimate musical glory. Energy, rhythm & madness!",
      tag: "🎵 Music Fest",
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
        "Maximum 15 minutes performance time",
        "Original compositions get bonus points",
        "Bands must bring their own instruments (drums will be provided)",
        "No explicit lyrics or content"
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
      image: "https://images.unsplash.com/photo-1505373876331-ff89baa1df76?q=80&w=1200",
      description: "Laughter is the best medicine, and we're prescribing a heavy dose! Showcase your comedic timing, wit, and stage presence in this stand-up comedy competition.",
      shortDescription: "Bring the house down with your humor and wit in this stand-up comedy competition.",
      tag: "😂 Comedy Show",
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
        "Maximum 7 minutes per performance",
        "No offensive or discriminatory content",
        "Material must be original",
        "Judges' decision will be final"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
      image: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?q=80&w=1200",
      description: "Experience the power of silence and expression in this unique competition that celebrates the art of mime and drama. Participants will be judged on their ability to convey emotions, tell stories, and captivate the audience without words.",
      shortDescription: "Theatre, mime, storytelling & emotions — witness power without words.",
      tag: "🎭 Theatre Show",
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
        "Time limit: 8-10 minutes per performance",
        "No verbal communication allowed in mime category",
        "Limited props allowed (must be approved in advance)",
        "Content must be original"
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
    <div className="min-h-screen w-full pt-24 px-6 relative flex flex-col items-center text-gray-800 dark:text-white">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-4">
            Events & Competitions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the excitement of Ekarikthin 2025 through our diverse range of events and competitions.
          </p>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
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
              onClick={() => setActiveCategory('mini')}
              className={`px-5 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
                activeCategory === 'mini' 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Mini Events
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  {event.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{event.shortDescription}</p>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                
                <div className="w-full mb-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                    <IndianRupee size={16} className="mr-1" />
                    <span className="font-medium">Registration Fee</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-sm">
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto"
            style={{ top: '0', bottom: '0', left: '0', right: '0' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden flex flex-col"
              style={{ maxHeight: 'calc(100vh - 4rem)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <div className="h-64 md:h-80 w-full overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        {selectedEvent.tag}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedEvent.teamSize}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {selectedEvent.description}
                    </p>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span>{selectedEvent.date} • {selectedEvent.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <MapPin size={16} className="mr-2" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    
                    <div className="mt-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Registration Fee</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rules</h3>
                      <ul className="space-y-2">
                        {selectedEvent.rules.map((rule, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span className="text-gray-600 dark:text-gray-300">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Highlights</h3>
                        <ul className="space-y-2">
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
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg w-full md:w-64 flex-shrink-0">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-3">
                      <Award size={20} className="mr-2" />
                      <span className="font-bold">Prize Pool</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      ₹{selectedEvent.prizePool.toLocaleString()}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center text-sm">
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
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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

                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Event Rules
                  </h3>
                  <ul className="space-y-3">
                    {selectedEvent.rules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span className="text-gray-600 dark:text-gray-300">{rule}</span>
                      </li>
                    ))}
                  </ul>
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
