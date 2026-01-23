import { Linkedin, Instagram, Mail, X } from "lucide-react";
import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

/* ==========================
   3D HOVER CARD COMPONENT
========================== */
const MemberModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div 
        className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 relative border border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-cyan-500/50">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-cyan-400 mb-4">{member.role}</p>
          <p className="text-gray-300 mb-6">{member.bio}</p>
          
          <div className="flex gap-4">
            {member.socials?.linkedin && (
              <a 
                href={member.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#0077b5] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            )}
            {member.socials?.instagram && (
              <a 
                href={member.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#e1306c] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            )}
            {member.socials?.email && (
              <a 
                href={`mailto:${member.socials.email}`}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HoverTeamCard = ({ member, isGeneralSecretary = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], ["15deg", "-15deg"]);
  const rotateY = useTransform(x, [-50, 50], ["-15deg", "15deg"]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <>
      <motion.div
        className={`relative group cursor-pointer ${isGeneralSecretary ? 'max-w-2xl mx-auto' : ''}`}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div 
          className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-0 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 w-full max-w-[280px] mx-auto overflow-hidden ${isGeneralSecretary ? 'border-2 border-cyan-500/50' : ''}`}
          onMouseMove={handleMove}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          style={{
            height: '400px',
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY,
          }}
        >
          <div className="relative h-full">
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover rounded-t-xl group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 rounded-b-xl">
              <div className="text-center">
                <h3 className={`font-bold ${isGeneralSecretary ? 'text-xl' : 'text-lg'} text-white mb-1`}>
                  {member.name}
                </h3>
                <p className={`${isGeneralSecretary ? 'text-cyan-300' : 'text-cyan-300 text-sm'}`}>
                  {member.role}
                </p>
                <p className="text-gray-300 text-xs mt-2 line-clamp-2">{member.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isModalOpen && (
          <MemberModal 
            member={member} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

// General Secretary (Single card at the top)
const generalSecretary = {
  name: "Khrieketouzo Peter Sekhose",
  role: "General Secretary",
  image: "/images/peter.jpeg",
  bio: "Leads the entire team and oversees all operations of Ekarikthin 2026.",
  socials: {
    linkedin: "https://www.linkedin.com/in/khrieketouzo-peter-sekhose?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/khrieketouzosekhose/",
    email: "khrieketouzopetersekhose@gmail.com"
  }
};

// Technical Secretaries
const technicalSecretaries = [
  {
    name: "Hrishabh Raj",
    role: "Technical Secretary and Lead Website Developer",
    image: "https://unsplash.com/photos/an-empty-road-in-the-middle-of-a-forest-xy2UBoeQ4Sc",
    bio: "Manages technical operations and implementations.",
    socials: {
      linkedin: "https://www.linkedin.com/in/hrishabxcode/",
      instagram: "https://www.instagram.com/_hrishabhr/",
      email: "hrishabhtest@gmail.com"
    }
  },
  {
    name: "Lanuyanger Aier",
    role: "Technical Secretary",
    image: "NA",
    bio: "Oversees technical infrastructure and development.",
    socials: {
      linkedin: "#",
      instagram: "#",
      email: "#"
    }
  }
];

// Cultural Secretaries
const culturalSecretaries = [
  {
    name: "Cheerla Sai Varun",
    role: "Cultural Secretary",
    image: "/images/varun.jpeg",
    bio: "Leads cultural events and activities.",
  },
  {
    name: "Khrieto Rhutso",
    role: "Cultural Secretary",
    image: "NA",
    bio: "Manages cultural programs and events.",
  }
];

// Financial Secretaries
const financialSecretaries = [
  {
    name: "Kondari Venkata Teja",
    role: "Financial Secretary",
    image: "/images/teja.jpg",
    bio: "Manages financial operations and budgeting .",
  },
  {
    name: "Vikhosano Rino",
    role: "Financial Secretary",
    image: "NA",
    bio: "Oversees financial management and expenditures.",
  }
];

// E-Sports Secretaries
const sportsSecretaries = [
  {
    name: "Koyyala Kesava",
    role: "Sports Secretary",
    image: "/images/kesava.jpeg",
    bio: "Manages sports activities and inter-hostel tournaments.",
    
  },
  {
    name: "Kyeing David K Konyak",
    role: "Sports Secretary",
    image: "/images/kyeing.jpg",
    bio: "Oversees sports events and promotes athletic participation.",
    
  }
];

// Sports Secretaries
// const esportsSecretaries = [
//   {
//     name: "Ajay Singh Poswal",
//     role: "E-Sports Secretary",
//     image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800",
//     bio: "Coordinates and manages all E-Sports events and tournaments.",
    
//   },
//   {
//     name: "Elias S Thonger",
//     role: "Sports Secretary",
//     image: "https://images.unsplash.com/photo-1517649763962-0c2a4167f0cb?q=80&w=800",
//     bio: "Leads and organizes E-Sports activities and competitions.",
    
//   }
// ];

// Disciplinary Secretaries
const disciplinarySecretaries = [
  {
    name: "Potula Sai Kumar",
    role: "Disciplinary Secretary",
    image: "/images/sai.jpg",
    bio: "Ensures discipline and code of conduct in the hostel.",
  },
  {
    name: "Khyothungo Kikon",
    role: "Disciplinary Secretary",
    image: "/images/kikon.jpeg",
    bio: "Maintains discipline and enforces hostel Rules.",
  }
];

const publicitySecretaries = [
  {
    name: "Leela Phani Sai Nadella",
    role: "Disciplinary Secretary",
    image: "NA",
    bio: "NA",
  },
  {
    name: "Ananya Reddy",
    role: "Disciplinary Secretary",
    image: "NA",
    bio: "Maintains discipline and enforces hostel rules for girls.",
  }
];
// Fermetrix Lab Team


// NSS Secretaries
const nssSecretaries = [
  {
    name: "Pachei  P Khiamniungan",
    role: "NSS Secretary",
    image: "/images/pachei.jpg",
    bio: "Coordinates NSS Activities",
  },
  {
    name: "Manda Rama Sankeerthi",
    role: "NSS Secretary",
    image: "NA",
    bio: "Coordinates NSS programs and social service activities",
  }
];

// Alumni Secretaries
const alumniSecretaries = [
  {
    name: "Chinnala Manoj",
    role: "Alumni Secretary",
    image: "/images/manoj.jpg",
    bio: "Maintains alumni relations and organizes alumni events for boys.",
  },
  {
    name: "Laihamdi Maibangsa",
    role: "Alumni Secretary",
    image: "NA",
    bio: "Coordinates alumni network and engagement activities for girls.",
  }
];

const Team = () => {
  const [selected, setSelected] = useState(null);

  // Spotlight motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useTransform([mouseX, mouseY], ([x, y]) => {
    return `radial-gradient(
      500px circle at ${x}px ${y}px,
      rgba(255,255,255,0.13),
      rgba(0,0,0,0.90)
    )`;
  });

  // Group secretaries into sections
  const secretaryGroups = [
    {
      title: "Technical Secretaries",
      members: technicalSecretaries,
      description: "Overseeing technical operations and infrastructure"
    },
    {
      title: "Cultural Secretaries",
      members: culturalSecretaries,
      description: "Leading cultural events and activities"
    },
    {
      title: "Financial Secretaries",
      members: financialSecretaries,
      description: "Managing financial operations and budgeting"
    },
    {
      title: "NSS Secretaries",
      members: nssSecretaries,
      description: "Leading National Service Scheme activities and community service"
    },
    {
      title: "Alumni Secretaries",
      members: alumniSecretaries,
      description: "Maintaining alumni relations and organizing alumni events"
    },
    // {
    //   title: "E-Sports Secretaries",
    //   members: esportsSecretaries,
    //   description: "Organizing and managing E-Sports events and tournaments"
    // },
    {
      title: "Sports Secretaries",
      members: sportsSecretaries,
      description: "Coordinating sports activities and athletic events"
    },
    {
      title: "Disciplinary Secretaries",
      members: disciplinarySecretaries,
      description: "Ensuring discipline and enforcing hostel rules"
    },
    {
      title: "Alumni Secretaries",
      members: alumniSecretaries,
      description: "Ensuring discipline and enforcing hostel rules"
    },
    // {
    //   title: "clu",
    //   members: disciplinarySecretaries,
    //   description: "Ensuring discipline and enforcing hostel rules"
    // },
    // {
    //   title: "Disciplinary Secretaries",
    //   members: disciplinarySecretaries,
    //   description: "Ensuring discipline and enforcing hostel rules"
    // },
    // {
    //   title: "Disciplinary Secretaries",
    //   members: disciplinarySecretaries,
    //   description: "Ensuring discipline and enforcing hostel rules"
    // },
  ];

  return (
    <div
      className="min-h-screen pt-28 pb-20 px-6 text-white relative overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* 🌟 FULL PAGE SPOTLIGHT */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: spotlight }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-xl">
            Our Team
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            The people who bring EKARIKTHIN to life.
          </p>
        </div>

        {/* GENERAL SECRETARY */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-cyan-300 mb-8">General Secretary</h2>
          <div className="max-w-2xl mx-auto">
            <HoverTeamCard 
              member={generalSecretary} 
              onClick={() => setSelected(generalSecretary)}
              isGeneralSecretary={true}
            />
          </div>
        </div>

        {/* SECRETARIES */}
        {secretaryGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-cyan-300 mb-2">
                {group.title}
                {group.title === "Fermetrix Lab Team" && (
                  <span className="ml-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full">
                    New
                  </span>
                )}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{group.description}</p>
            </div>
            <div className={`grid ${group.title === "Fermetrix Lab Team" ? 'md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'} gap-8 max-w-6xl mx-auto px-6 w-full`}>
              {group.members.map((member, index) => (
                <div key={index} className={`w-full ${group.title === "Fermetrix Lab Team" ? 'max-w-xs mx-auto' : 'sm:w-auto'}`}>
                  <HoverTeamCard
                    member={member}
                    onClick={() => setSelected(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* ---------------- MODAL ---------------- */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 -z-10"
            onClick={() => setSelected(null)}
          />
          <div className="relative bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-white/10"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white">{selected.name}</h1>
                <p className="text-cyan-400 mt-1">{selected.role}</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 px-2">
              {selected.bio}
            </p>

            <div className="flex justify-center gap-4 mt-8">
              {[Linkedin, Instagram, Mail].map((Icon, id) => (
                <a
                  key={id}
                  href="#"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      {/* Footer */}
      <div className="mt-24 mb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="pt-8 border-t border-gray-800">
            <div className="px-4 py-6 sm:px-6">
              <p className="text-gray-400 text-center text-sm sm:text-base">
                Website Developed and Managed by{' '}
                <span className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-200">
                  Fermetrix Lab
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
