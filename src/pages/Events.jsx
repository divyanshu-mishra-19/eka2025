import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  X,
  Award,
  ExternalLink,
  Star,
  Users,
  IndianRupee,
  Trophy,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when modal is open + Escape to close
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Let animation finish before clearing selectedEvent
    setTimeout(() => setSelectedEvent(null), 250);
  };

  // Event data (same as you provided, untouched content, only formatting)
  const events = [
    {
      id: 1,
      title: "Voice of Ekarikthin",
      date: "Will be updated soon",
      time: "6:00 PM - 10:00 PM",
      location: "B.B. Court",
      image: "/images/voe.jpg",
      description:
        "🎤 Voice of Ekarikthin (Singing)\nA flagship musical competition where talented singers perform solo to showcase their vocal range, control, and emotional expression.\nOpen to multiple genres, this event celebrates passion for music and stage confidence.\nJudged on voice quality, pitch, expression, and overall performance.",
      shortDescription:
        "A flagship singing competition showcasing vocal talent across genres, judged on voice quality, pitch, and stage presence.",
      tag: "Cultural",
      prizePool: 17000,
      prizeBreakup: {
        first: 10000,
        second: 7000,
      },
      registrationFee: {
        inside: 700,
        outside: 700,
      },
      teamSize: "Solo",
      rules: ["/rules/voe.pdf"],
      highlights: [
        "Open to all music forms",
        "Professional sound and lighting provided",
        "Winning team gets direct entry to the finals next year",
      ],
    },
    {
      id: 2,
      title: "Ritzy",
      date: "Will be updated soon",
      time: "4:00 PM - 8:00 PM",
      location: "BB Court",
      image: "/images/ritzy.jpeg",
      description:
        "Ritzy (Ramp Walk)\nA dazzling fashion event where participants express confidence, elegance, and personality on the ramp.\nIt's not just about outfits, but attitude, posture, and presentation.\nRitzy celebrates individuality, style, and stage presence.",
      shortDescription:
        "A glamorous ramp walk event celebrating confidence, attitude, and fashion sense as participants own the stage with style.",
      tag: "Ramp Walk",
      prizePool: 60000,
      prizeBreakup: {
        first: 15000,
        second: 7500,
        subtitle: 15000,
      },
      registrationFee: {
        inside: 800,
        outside: 800,
      },
      teamSize: "Solo",
      rules: ["/rules/rit_rules.pdf"],
      highlights: [
        "Direct Entry to Mr. Dimapur/Mr. Chumoukedima and Miss Chumoukedima",
        "Judges from the fashion and media industry",
        "Showcase your unique style and confidence",
      ],
    },
    {
      id: 3,
      title: "Cosplay",
      date: "Will be updated soon",
      time: "1:00 PM - 4:00 PM",
      location: "Basketball Court",
      image: "/images/cp.png",
      description:
        "Cosplay\nA creative showcase where participants dress up as iconic characters from movies, anime, comics, or games.\nCosplay focuses on costume design, accuracy, expressions, and performance.\nA perfect blend of imagination, creativity, and fandom culture.",
      shortDescription:
        "Step into the shoes of your favorite characters and bring imagination to life through creative costumes and performances.",
      tag: "Cultural",
      prizePool: 30000,
      prizeBreakup: {
        first: 20000,
        second: 10000,
      },
      registrationFee: {
        inside: {
          solo: 500,
          duo: 800,
          group: 1000,
        },
        outside: {
          solo: 500,
          duo: 800,
          group: 1000,
        },
      },
      teamSize: "Solo / Duo / Group",
      rules: ["/rules/cos.pdf"],
      highlights: [
        "Celebrate anime, comics, movies, and gaming culture",
        "Judged on costume, accuracy, and performance",
        "Perfect for fandom enthusiasts",
      ],
    },
    {
      id: 4,
      title: "Rockville",
      date: "Will be updated soon",
      time: "10:00 AM - 4:00 PM",
      location: "Main Ground",
      image: "/images/rv.jpg",
      description:
        "Rockville \nAn electrifying Musical Band Show that brings the campus alive with powerful beats and vibrant energy.\nA celebration of music, beat , and togetherness, making it one of the most awaited events.\nPure vibes, lights, and unforgettable memories.",
      shortDescription:
        "An electrifying Musical Band filled with music, beats, and energy—where the crowd vibes nonstop.",
      tag: "Music",
      prizePool: 60000,
      prizeBreakup: {
        first: 40000,
        second: 20000,
      },
      registrationFee: {
        inside: 2500,
        outside: 2500,
      },
      teamSize: "1-3 members",
      rules: ["/rules/rock.pdf"],
      highlights: [
        "High-energy EDM and Bollywood mixes",
        "Professional lights and sound system",
        "Massive crowd and unforgettable atmosphere",
      ],
    },
    {
      id: 5,
      title: "BGMI",
      date: "Will be updated soon",
      time: "11:00 AM - 5:00 PM",
      location: "Engineering Block",
      image: "/images/bgmi.jpg",
      description:
        "BGMI\nA competitive battle royale tournament testing teamwork, strategy, and in-game decision-making.\nTeams fight it out in intense matches where survival and coordination are key.\nOnly the smartest and sharpest squads make it to the top.",
      shortDescription:
        "A high-intensity battle royale gaming competition testing strategy, teamwork, and sharp reflexes.",
      tag: "Gaming",
      prizePool: 30000,
      prizeBreakup: {
        first: 18000,
        second: 12000,
      },
      registrationFee: {
        inside: 600,
        outside: 1200,
      },
      teamSize: "4 members",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Custom rooms and fair play ensured",
        "Casting and live spectating for finals",
        "Perfect for competitive squads",
      ],
    },
    {
      id: 6,
      title: "MLBB",
      date: "Will be updated soon",
      time: "All Day",
      location: "Campus Wide",
      image: "/images/mlbb.jpg",
      description:
        "A fast-paced MOBA gaming competition where teams battle using heroes, skills, and strategy.\nEmphasizes coordination, tactical planning, and quick reflexes.\nPerfect for gamers who thrive under pressure.",
      shortDescription:
        "A fast-paced MOBA tournament where teams compete using skills, coordination, and tactical gameplay.",
      tag: "Gaming",
      prizePool: 40000,
      prizeBreakup: {
        first: 24000,
        second: 16000,
      },
      registrationFee: {
        inside: 750,
        outside: 1500,
      },
      teamSize: "5 members",
      rules: ["/rules/mlbb.pdf"],
      highlights: [
        "Structured brackets and fair seeding",
        "Meta-defining strategies and drafts",
        "For serious competitive gamers",
      ],
    },
    {
      id: 7,
      title: "Survive NIT",
      date: "Will be updated soon",
      time: "5:00 PM - 9:00 PM",
      location: "Main Stage",
      image: "/images/sn.png",
      description:
        "A reality-show-inspired survival challenge designed to test physical stamina, mental strength, and strategy.\nParticipants face multiple rounds of tasks and eliminations.\nOnly the most adaptable and determined survive till the end.",
      shortDescription:
        "A survival-based challenge inspired by reality shows, pushing participants through physical, mental, and strategic tasks.",
      tag: "Sports",
      prizePool: 1500,
      prizeBreakup: {
        first: 1500,
        second: 0,
      },
      registrationFee: {
        inside: 50,
        outside: 100,
      },
      teamSize: "As required",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Multiple elimination-style rounds",
        "Tests endurance, wit, and teamwork",
        "For those who love challenges",
      ],
    },
    {
      id: 8,
      title: "Pitch It",
      date: "Will be updated soon",
      time: "6:00 PM - 10:00 PM",
      location: "Open Air Theater",
      image: "/images/pi.png",
      description:
        "An innovation-focused platform where participants pitch ideas addressing real-world problems.\nEncourages creativity, entrepreneurship, and problem-solving skills.\nJudged on innovation, feasibility, impact, and presentation.",
      shortDescription:
        "An innovation-driven event where participants pitch creative ideas and solutions to real-world problems.",
      tag: "Entrepreneurship",
      prizePool: 1500,
      prizeBreakup: {
        first: 1500,
        second: 0,
      },
      registrationFee: {
        inside: 50,
        outside: 100,
      },
      teamSize: "As required",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Perfect for startup and idea-stage founders",
        "Valuable feedback from judges",
        "Platform to refine and validate your ideas",
      ],
    },
    {
      id: 9,
      title: "Brain Snap",
      date: "Will be updated soon",
      time: "7:00 PM - 9:30 PM",
      location: "Amphitheater",
      image: "/images/bs.png",
      description:
        "A mind-bending competition packed with puzzles, riddles, and logical challenges.\nTests analytical thinking, speed, and reasoning abilities.\nPerfect for those who love mental challenges and problem-solving.",
      shortDescription:
        "A brain-teasing competition full of puzzles, riddles, and logical challenges to test problem-solving skills.",
      tag: "Sports",
      prizePool: 1500,
      prizeBreakup: {
        first: 1500,
        second: 0,
      },
      registrationFee: {
        inside: 50,
        outside: 100,
      },
      teamSize: "Solo",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Perfect for puzzle and quiz lovers",
        "Tests logic, memory, and reasoning",
        "Fun yet intellectually intense",
      ],
    },
    {
      id: 10,
      title: "Spell Bee",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/sb.png",
      description:
        "A classic yet thrilling spelling competition that tests vocabulary, pronunciation, and accuracy.\nParticipants compete through multiple rounds with increasing difficulty.\nA true test of language skills and focus.",
      shortDescription:
        "A classic spelling competition that tests vocabulary, pronunciation, and linguistic accuracy.",
      tag: "Sports",
      prizePool: 1500,
      prizeBreakup: {
        first: 1500,
        second: 0,
      },
      registrationFee: {
        inside: 50,
        outside: 100,
      },
      teamSize: "1-6 members",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Progressive difficulty rounds",
        "Tests spelling, memory, and composure",
        "Great for language enthusiasts",
      ],
    },
    {
      id: 11,
      title: "Circuit X",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/cx.png",
      description:
        "A technical event designed for electronics enthusiasts and problem solvers.\nParticipants analyze and solve electrical and electronic circuits within limited time.\nTests conceptual clarity, practical understanding, and logical thinking.",
      shortDescription:
        "An electrical circuit-solving competition designed to test technical knowledge, logic, and practical understanding.",
      tag: "Sports",
      prizePool: 1500,
      prizeBreakup: {
        first: 1500,
        second: 0,
      },
      registrationFee: {
        inside: 50,
        outside: 100,
      },
      teamSize: "1-6 members",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Perfect for ECE / EE enthusiasts",
        "Combines theory with hands-on logic",
        "Timed problem-solving scenarios",
      ],
    },
    {
      id: 12,
      title: "Rangoli",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/rg.png",
      description:
        "An artistic competition celebrating colors, symmetry, and cultural creativity.\nParticipants design visually appealing rangoli patterns based on given themes.\nJudged on creativity, neatness, color usage, and overall presentation.",
      shortDescription:
        "A colorful artistic event celebrating creativity, symmetry, and cultural expression through rangoli designs.",
      tag: "Cultural",
      prizePool: 1000,
      prizeBreakup: {
        first: 1000,
        second: 0,
      },
      registrationFee: {
        inside: 50,
        outside: 100,
      },
      teamSize: "1-6 members",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Traditional art meets modern creativity",
        "Judged on symmetry, design, and theme",
        "Great for art & culture lovers",
      ],
    },
    {
      id: 13,
      title: "Reel of Ekarikthin",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/roe.png",
      description:
        "A short video-making contest capturing the essence and excitement of the fest.\nParticipants create engaging reels highlighting moments, energy, and creativity.\nJudged on originality, editing, storytelling, and impact.",
      shortDescription:
        "A short-reel creation contest capturing the spirit, excitement, and moments of Ekarikthin.",
      tag: "Cultural",
      prizePool: 1500,
      prizeBreakup: {
        first: 1000,
        second: 500,
      },
      registrationFee: {
        inside: 0,
        outside: 0,
      },
      teamSize: "1-6 members",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Create reels during the fest",
        "Focus on storytelling and vibe",
        "Perfect for content creators",
      ],
    },
    {
      id: 14,
      title: "Photo of Ekarikthin",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/photo.jpeg",
      description:
        "A photography competition focused on capturing powerful moments and emotions of the fest.\nParticipants showcase storytelling through visuals.\nJudged on composition, clarity, creativity, and relevance.",
      shortDescription:
        "A photography competition focused on capturing stunning visuals, emotions, and memories of the fest.",
      tag: "Cultural",
      prizePool: 1000,
      prizeBreakup: {
        first: 700,
        second: 300,
      },
      registrationFee: {
        inside: 0,
        outside: 0,
      },
      teamSize: "1-6 members",
      rules: ["Will be Updated Soon"],
      highlights: [
        "Capture the essence of the fest",
        "Open to mobile and DSLR photography",
        "Judged on story and composition",
      ],
    },
    {
      id: 15,
      title: "MEN'S MARATHON",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Campus",
      image: "/images/mar.jpg",
      description:
        "A fitness-focused event promoting endurance, discipline, and healthy living.\nParticipants challenge themselves physically while embracing sportsmanship.\nA run fueled by determination and energy.",
      shortDescription:
        "A test of endurance and determination, promoting fitness, discipline, and sportsmanship.",
      tag: "Sports",
      prizePool: 21500,
      prizeBreakup: {
        first: 10000,
        second: 5000,
        third: 3000,
        consolation: 3500,
      },
      registrationFee: {
        inside: 100,
        outside: 200,
      },
      teamSize: "Solo",
      rules: ["/rules/mar.pdf"],
      highlights: [
        "Distance-based running event",
        "Promotes fitness and discipline",
        "Attractive prizes across positions",
      ],
    },
    {
      id: 16,
      title: "WOMEN'S MARATHON",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Campus",
      image: "/images/mar.jpg",
      description:
        "A fitness-focused event promoting endurance, discipline, and healthy living.\nParticipants challenge themselves physically while embracing sportsmanship.\nA run fueled by determination and energy.",
      shortDescription:
        "A test of endurance and determination, promoting fitness, discipline, and sportsmanship.",
      tag: "Sports",
      prizePool: 16500,
      prizeBreakup: {
        first: 7000,
        second: 4000,
        third: 2000,
        consolation: 3500,
      },
      registrationFee: {
        inside: 70,
        outside: 150,
      },
      teamSize: "Solo",
      rules: ["/rules/mar.pdf"],
      highlights: [
        "Exclusively for women participants",
        "Focus on inclusion and fitness",
        "Great atmosphere and support",
      ],
    },
    {
      id: 17,
      title: "FUTSAL",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/fut.jpg",
      description:
        "A high-energy five-a-side football tournament played with speed and skill.\nFocuses on teamwork, quick passes, and fast gameplay.\nAn action-packed event for football lovers.",
      shortDescription:
        "A thrilling five-a-side football tournament featuring speed, teamwork, and high-energy gameplay.",
      tag: "Sports",
      prizePool: 54000,
      prizeBreakup: {
        first: 30000,
        second: 20000,
        consolation: 4000,
      },
      registrationFee: {
        inside: 1500,
        outside: 2500,
      },
      teamSize: "Team",
      rules: ["/rules/fut.pdf"],
      highlights: [
        "Fast-paced small-sided football",
        "Ideal for competitive teams",
        "High-intensity, crowd-pleasing matches",
      ],
    },
    {
      id: 18,
      title: "Art Exhibition",
      date: "Will be updated soon",
      time: "11:00 AM - 3:00 PM",
      location: "Mini Auditorium",
      image: "/images/ART.jpeg",
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLScqVLvsMQj24HStaQY5AhMmLZFFr-0yXznVUozUG6hbDGNK9Q/viewform?usp=preview",
      description:
        "Step into a world of color, creativity, and imagination at our Art Exhibition, where art comes alive through stunning paintings, sketches, sculptures, and mixed-media works.",
      shortDescription:
        "A vibrant Art Exhibition showcasing creative artworks by talented artists, celebrating imagination, expression, and visual storytelling.",
      tag: "Cultural",
      prizePool: "NA",
      prizeBreakup: {
        first: "NA",
        second: "NA",
        consolation: "NA",
      },
      registrationFee: {
        inside: "NA",
        outside: "NA",
      },
      teamSize: "Solo",
      rules: [],
      highlights: [
        "Sell Your Art",
        
      ],
    },
  ];

  const getTagClasses = (tag) => {
    switch ((tag || "").toLowerCase()) {
      case "cultural":
        return "bg-pink-500/90 text-white";
      case "ramp walk":
        return "bg-violet-500/90 text-white";
      case "music":
        return "bg-amber-400 text-gray-900";
      case "gaming":
        return "bg-emerald-500/90 text-white";
      case "sports":
        return "bg-orange-500/90 text-white";
      case "entrepreneurship":
        return "bg-indigo-500/90 text-white";
      default:
        return "bg-slate-500/90 text-white";
    }
  };

  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return events;

    return events.filter((event) => {
      const tag = (event.tag || "").toLowerCase();
      const title = (event.title || "").toLowerCase();

      if (activeCategory === "cultural") {
        return (
          tag.includes("cultural") ||
          tag.includes("music") ||
          tag.includes("ramp") ||
          title.includes("voice") ||
          title.includes("rockville") ||
          title.includes("cosplay") ||
          title.includes("ritzy")
        );
      }

      if (activeCategory === "sports") {
        return (
          tag.includes("sport") ||
          title.includes("marathon") ||
          title.includes("futsal") ||
          title.includes("survive") ||
          title.includes("brain") ||
          title.includes("spell") ||
          title.includes("circuit")
        );
      }

      if (activeCategory === "gaming") {
        return tag.includes("gaming") || title.includes("bgmi") || title.includes("mlbb");
      }

      return true;
    });
  }, [activeCategory, events]);

  const renderDescription = (text) =>
    (text || "").split("\n").map((line, idx) => (
      <p key={idx} className="text-sm text-gray-700 dark:text-slate-100/90 mb-1.5">
        {line.trim()}
      </p>
    ));

  const renderPrizeBreakup = (prizeBreakup = {}) => {
    const entries = Object.entries(prizeBreakup).filter(
      ([, value]) => value && Number(value) > 0
    );
    if (!entries.length) return null;

    const labelMap = {
      first: "1st Prize",
      second: "2nd Prize",
      third: "3rd Prize",
      consolation: "Consolation",
      subtitle: "Subtitle Awards",
    };

    return (
      <div className="mt-3 space-y-1.5">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center text-xs sm:text-sm"
          >
            <span className="text-gray-700 dark:text-slate-100/80">
              {labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <span className="font-semibold text-emerald-300">
              ₹{Number(value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderRegistrationFee = (fee) => {
    if (!fee) {
      return (
        <div className="text-xs text-gray-600 dark:text-slate-300/80">
          Registration details coming soon.
        </div>
      );
    }

    const isTiered = typeof fee.inside === "object" || typeof fee.outside === "object";

    if (isTiered) {
      return (
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-100 dark:bg-slate-900/40 rounded-lg p-2.5 border border-gray-300 dark:border-slate-700/70">
              <div className="text-[11px] uppercase tracking-wide text-gray-600 dark:text-slate-400">
                Inside College
              </div>
              <div className="mt-1 space-y-0.5">
                <div>
                  <span className="text-gray-700 dark:text-slate-300/90">Solo: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    ₹{fee.inside?.solo ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-slate-300/90">Duo: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    ₹{fee.inside?.duo ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-slate-300/90">Group: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    ₹{fee.inside?.group ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-slate-900/40 rounded-lg p-2.5 border border-gray-300 dark:border-slate-700/70">
              <div className="text-[11px] uppercase tracking-wide text-gray-600 dark:text-slate-400">
                Outside College
              </div>
              <div className="mt-1 space-y-0.5">
                <div>
                  <span className="text-gray-700 dark:text-slate-300/90">Solo: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    ₹{fee.outside?.solo ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-slate-300/90">Duo: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    ₹{fee.outside?.duo ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-slate-300/90">Group: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    ₹{fee.outside?.group ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
        <div className="bg-gray-100 dark:bg-slate-900/40 border border-gray-300 dark:border-slate-700/70 rounded-lg px-3 py-2 text-center">
          <div className="text-[11px] uppercase tracking-wide text-gray-600 dark:text-slate-400">
            Inside College
          </div>
          <div className="mt-1 font-semibold text-emerald-600 dark:text-emerald-300">
            ₹{fee.inside ?? "N/A"}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-slate-900/40 border border-gray-300 dark:border-slate-700/70 rounded-lg px-3 py-2 text-center">
          <div className="text-[11px] uppercase tracking-wide text-gray-600 dark:text-slate-400">
            Outside College
          </div>
          <div className="mt-1 font-semibold text-emerald-600 dark:text-emerald-300">
            ₹{fee.outside ?? "N/A"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full pt-20 sm:pt-24 pb-12 px-3 sm:px-6 lg:px-10 flex flex-col items-center text-gray-800 dark:text-slate-50 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header / Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 dark:from-amber-300 dark:via-yellow-400 dark:to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(251,191,36,0.35)]">
              Events & Competitions
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-200/90 max-w-3xl mx-auto">
            Dive into the heart of Ekarikthin 2026 with cultural showcases, high-energy
            sports, intense gaming battles, and creative competitions.
          </p>

          {/* Category Filters */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "All Events" },
              { id: "cultural", label: "Cultural" },
              { id: "sports", label: "Sports" },
              { id: "gaming", label: "Gaming" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${activeCategory === cat.id
                    ? "bg-emerald-500 text-slate-950 dark:bg-emerald-500 dark:text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.55)]"
                    : "bg-white dark:bg-slate-900/40 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-700/80 hover:bg-gray-100 dark:hover:bg-slate-800/70 hover:border-emerald-500/50"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-10 w-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm text-gray-600 dark:text-slate-300">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600 dark:text-slate-300 mb-3">
                No events found in this category.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/40 transition-colors"
              >
                View All Events
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.03 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-950/80 border border-gray-200 dark:border-slate-800/80 shadow-[0_18px_50px_rgba(15,23,42,0.8)] dark:shadow-[0_18px_50px_rgba(15,23,42,0.8)] overflow-hidden backdrop-blur-sm"
                  onClick={() => openModal(event)}
                >
                  <div className="relative h-56 sm:h-52 md:h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-md ${getTagClasses(
                          event.tag
                        )}`}
                      >
                        {event.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-100/95">
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full">
                        <Calendar size={13} />
                        <span className="truncate max-w-[120px] sm:max-w-[160px]">
                          {event.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full">
                        <IndianRupee size={13} />
                        <span>Fee</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-4.5 md:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-50 mb-1 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300/90 mb-3 line-clamp-2">
                      {event.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-slate-400 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span className="truncate max-w-[120px] sm:max-w-[150px]">
                          {event.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300">
                        <Trophy size={16} />
                        <span className="text-xs sm:text-sm font-semibold">
                          ₹{event.prizePool.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-600 dark:text-slate-300">
                        <span>{event.teamSize}</span>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-slate-900/80 border border-gray-300 dark:border-slate-700/80 text-[10px] group-hover:border-emerald-400/70 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-3 sm:px-4 py-6 sm:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-gray-800 dark:text-slate-50 border border-gray-200 dark:border-slate-700/80 shadow-[0_24px_80px_rgba(15,23,42,0.9)] overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/60 border border-gray-300 dark:border-slate-700/80 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Header image */}
              <div className="relative h-44 sm:h-52 md:h-56 w-full overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute left-5 right-5 bottom-4">
                  <div className="flex flex-wrap justify-between items-end gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold shadow-md ${getTagClasses(
                            selectedEvent.tag
                          )}`}
                        >
                          {selectedEvent.tag}
                        </span>
                        {selectedEvent.teamSize && (
                          <span className="px-2.5 py-1 text-[11px] rounded-full bg-black/40 text-gray-100 dark:text-slate-100 border border-white/10">
                            {selectedEvent.teamSize}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-slate-50">
                        {selectedEvent.title}
                      </h2>
                    </div>
                    <div className="space-y-1 text-[11px] sm:text-xs text-white/95 dark:text-slate-100/95">
                      <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full">
                        <Calendar size={14} />
                        <span className="truncate max-w-[150px] sm:max-w-[200px]">
                          {selectedEvent.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full">
                        <Clock size={14} />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full">
                        <MapPin size={14} />
                        <span className="truncate max-w-[150px] sm:max-w-[200px]">
                          {selectedEvent.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-7 pb-5 pt-4">
                <div className="grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-5 md:gap-6">
                  {/* Left column: description, highlights, rules */}
                  <div>
                    {/* Description */}
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 border border-slate-700/80 px-2.5 py-1 mb-2">
                        <Info size={14} className="text-emerald-300" />
                        <span className="text-[11px] uppercase tracking-wide text-gray-700 dark:text-slate-300">
                          About this event
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-800 rounded-2xl px-3.5 py-3.5 text-sm">
                        {renderDescription(selectedEvent.description)}
                      </div>
                    </div>

                    {/* Highlights */}
                    {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                          <Star size={16} className="text-amber-500 dark:text-amber-300" />
                          Highlights
                        </h3>
                        <ul className="space-y-1.5 text-xs sm:text-sm">
                          {selectedEvent.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-300" />
                              <span className="text-gray-700 dark:text-slate-200/90">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Rules note */}
                    <div className="mt-5 border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/40 rounded-xl px-3.5 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 flex items-center gap-1.5">
                            <Users size={15} className="text-emerald-600 dark:text-emerald-300" />
                            Event Rules & Guidelines
                          </h3>
                          <p className="mt-1 text-xs text-gray-600 dark:text-slate-300/90">
                            Detailed rules will be available in a consolidated PDF. Please
                            ensure you go through them before participating.
                          </p>
                        </div>
                        {selectedEvent.rules && selectedEvent.rules[0] !== "Will be Updated Soon" ? (
                          <a
                            href={selectedEvent.rules[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-xs font-medium border border-gray-300 dark:border-slate-700/80 text-gray-700 dark:text-slate-100"
                          >
                            <ExternalLink size={13} className="mr-1" />
                            View PDF
                          </a>
                        ) : (
                          <span className="text-xs text-gray-500 dark:text-slate-400">Coming soon</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right column: registration & prizes */}
                  <div className="space-y-4">
                    {/* Prize pool */}
                    <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-cyan-500/10 border border-emerald-500/40 rounded-2xl px-3.5 py-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Trophy size={18} className="text-emerald-600 dark:text-emerald-300" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                            Prize Pool
                          </span>
                        </div>
                        <span className="text-xs text-emerald-600 dark:text-emerald-200/90">
                          Exciting rewards
                        </span>
                      </div>
                      <div className="mt-2 text-xl font-bold text-emerald-600 dark:text-emerald-300">
                        ₹{selectedEvent.prizePool.toLocaleString()}
                      </div>
                      {renderPrizeBreakup(selectedEvent.prizeBreakup)}
                    </div>

                    {/* Registration fee */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl px-3.5 py-3.5">
                      <div className="flex items-center gap-1.5 mb-2">
                        <IndianRupee size={16} className="text-emerald-600 dark:text-emerald-300" />
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-slate-200">
                          Registration Fee
                        </h3>
                      </div>
                      {renderRegistrationFee(selectedEvent.registrationFee)}
                    </div>

                    {/* Quick meta */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2">
                        <div className="text-[11px] text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
                          Team size
                        </div>
                        <div className="text-gray-700 dark:text-slate-100 font-medium">
                          {selectedEvent.teamSize || "See rules"}
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2">
                        <div className="text-[11px] text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
                          Category
                        </div>
                        <div className="text-gray-700 dark:text-slate-100 font-medium">
                          {selectedEvent.tag || "Event"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky bottom actions */}
              <div className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950/95 px-4 sm:px-6 md:px-7 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs text-gray-600 dark:text-slate-300/90 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-600 dark:text-emerald-300">
                    <Star size={14} />
                  </span>
                  <span>
                    Registrations are limited. Make sure to confirm your slot at the
                    earliest.
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {selectedEvent.rules && selectedEvent.rules[0] !== "Will be Updated Soon" ? (
                    <a
                      href={selectedEvent.rules[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 text-xs sm:text-sm border border-gray-300 dark:border-slate-700/80 text-gray-700 dark:text-slate-100 transition-colors"
                    >
                      <ExternalLink size={14} className="mr-1.5" />
                      Rules PDF
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-900 text-xs sm:text-sm border border-gray-300 dark:border-slate-700/80 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                    >
                      <ExternalLink size={14} className="mr-1.5" />
                      Rules Coming Soon
                    </button>
                  )}
                  {selectedEvent.registrationUrl ? (
                    <a
                      href={selectedEvent.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeModal}
                      className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/40 transition-colors"
                    >
                      <span>Register Now</span>
                      <ArrowRight size={16} className="ml-1.5" />
                    </a>
                  ) : (
                    <Link
                      to={`/register?event=${selectedEvent.id}`}
                      onClick={closeModal}
                      className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/40 transition-colors"
                    >
                      <span>Register Now</span>
                      <ArrowRight size={16} className="ml-1.5" />
                    </Link>
                  )}
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
