import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Cinematic Background Component
const CinematicBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-black dark:via-[#0b1220] dark:to-black transition-colors duration-500" />

      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen"
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 dark:opacity-30" />
      </motion.div>

      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 3;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-400 dark:bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${posX}%`,
              top: `${posY}%`,
              boxShadow:
                theme === 'dark'
                  ? '0 0 10px 2px rgba(255, 255, 255, 0.8)'
                  : '0 0 10px 1px rgba(99, 102, 241, 0.6)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

const Sponsors = () => {
  const sponsors = {
    titleSponsor: [
      { id: 1, name: 'Tawa Restaurant', logo: '/images/tr.jpeg', url: '#', tier: 'title' },
      { id: 2, name: 'Progressive Motors', logo: '/images/pm.jpg', url: '#', tier: 'title' },
      { id: 3, name: 'Melody Centre', logo: '/images/mc.jpg', url: '#', tier: 'title' },
    ],
    printingPartner: [
      { id: 'print1', name: 'Printing Partner', logo: '/images/fing.png', url: '#', tier: 'printing' },
    ],
    hydrationPartner: [
      { id: 'hydration1', name: 'Hydration Partner', logo: '/images/os.jpg', url: '#', tier: 'hydration' },
    ],
    soundPartner: [
      { id: 'Sound1', name: 'Sound Partner', logo: '/images/ag.jpeg', url: '#', tier: 'Sound' },
    ],
    lightingPartner: [
      { id: 'Lightning1', name: 'Lighting Partner', logo: '/images/mm.PNG', url: '#', tier: 'Lighting' },
    ],
    ledPartner: [
      { id: 'led1', name: 'LED Partner', logo: '/images/loki.jpeg', url: '#', tier: 'LED' },
    ],
    platinumSponsors: [
      { id: 1, name: 'Zone Niathu', logo: '/images/zn.png', url: '#', tier: 'platinum' },
    ],
    goldSponsors: [
      { id: 1, name: 'JJ Arena', logo: '/images/jj.jpg', url: '#', tier: 'gold' },
      { id: 2, name: 'Ohito Sumi', logo: '/sponsors/logo-placeholder.png', url: '#', tier: 'gold' },
    ],
    collaborationSponsors: [
      { id: 1, name: 'JJ Arena', logo: '/images/jj.jpg', url: '#', tier: 'gold' },
      { id: 2, name: 'Ohito Sumi', logo: '/sponsors/logo-placeholder.png', url: '#', tier: 'gold' },
    ],
    InkindSponsors: [
      { id: 1, name: 'Daba Arcade', logo: '/images/da.jpg', url: '#', tier: 'gold' },
      { id: 2, name: 'Nagaland Running Club', logo: '/images/nrc.jpg', url: '#', tier: 'gold' },
      { id: 3, name: 'Naga Jersey Club', logo: '/images/njh.jpg', url: '#', tier: 'gold' },
    ],
  };

  const getSponsorStyle = (tier) => ({
    gradient: 'from-cyan-500/10 to-blue-500/10',
    badgeColor: 'from-cyan-400 to-blue-500',
    textGradient: 'from-cyan-400 to-blue-500',
    containerClass: 'max-w-3xl',
    gridCols: 'grid-cols-1',
    cardClass: 'h-56',
  });

  const renderSponsorCard = (sponsor) => {
    const { gradient, badgeColor, cardClass } = getSponsorStyle(sponsor.tier);

    return (
      <div className={`relative group bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border p-6 ${cardClass}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-0 group-hover:opacity-100`} />
        <div className="relative z-10">
          <img src={sponsor.logo} alt={sponsor.name} className="mx-auto max-h-32 object-contain" />
          <h4 className="text-center mt-4 font-bold">{sponsor.name}</h4>
          <div className="flex justify-center mt-2">
            <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${badgeColor} text-white`}>
              <Star className="w-3 h-3 inline mr-1" />
              {sponsor.tier}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSponsorSection = (title, sponsorsList, tier) => {
    if (!sponsorsList || sponsorsList.length === 0) return null;

    return (
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center mb-8">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsList.map((sponsor) => (
            <div key={sponsor.id}>{renderSponsorCard({ ...sponsor, tier })}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white transition-colors duration-500">
      <CinematicBackground />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Sponsors</h1>
        <p>We're grateful to our amazing sponsors for their generous support.</p>
      </section>

      {/* Sponsors Grid */}
      <section className="relative z-10 py-8 px-4">
        {renderSponsorSection('Title Sponsor', sponsors.titleSponsor, 'title')}
        {renderSponsorSection('Platinum Sponsors', sponsors.platinumSponsors, 'platinum')}
        {renderSponsorSection('Gold Sponsors', sponsors.goldSponsors, 'gold')}
        {renderSponsorSection('Printing Partner', sponsors.printingPartner, 'printing')}
        {renderSponsorSection('Hydration Partner', sponsors.hydrationPartner, 'hydration')}
        {renderSponsorSection('Sound Partner', sponsors.soundPartner, 'Sound')}
        {renderSponsorSection('Lighting Partner', sponsors.lightingPartner, 'Lighting')}
        {renderSponsorSection('LED Partner', sponsors.ledPartner, 'LED')}
        {renderSponsorSection('Collaboration Partners', sponsors.collaborationSponsors, 'collaboration')}
        {renderSponsorSection('In-Kind Sponsors', sponsors.InkindSponsors, 'inkind')}
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-4 text-center">
        <a
          href="https://forms.gle/U4yETMcXQsQbQ71V6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-yellow-400 rounded-lg font-bold"
        >
          Become a Sponsor <ArrowRight className="ml-2" />
        </a>
      </section>
    </div>
  );
};

export default Sponsors;
