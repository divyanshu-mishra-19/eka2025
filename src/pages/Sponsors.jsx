import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


// Cinematic Background Component
const CinematicBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* MAIN BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-black dark:via-[#0b1220] dark:to-black transition-colors duration-500" />

      {/* VOLUMETRIC FOG */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen"
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 dark:opacity-30" />
      </motion.div>

      {/* TWINKLING STARS/PARTICLES */}
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
              boxShadow: theme === 'dark' ? '0 0 10px 2px rgba(255, 255, 255, 0.8)' : '0 0 10px 1px rgba(99, 102, 241, 0.6)',
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
  // Sponsor data
  const sponsors = {
    titleSponsor: [
      {
        id: 1,
        name: 'Tawa Restaurant',
        logo: '/images/tr.jpeg',
        url: '#',
        tier: 'title'
      },
      {
        id: 2,
        name: 'Progressive Motors',
        logo: '/images/pm.jpg',
        url: '#',
        tier: 'title'
      },
      {
        id: 3,
        name: 'Melody Centre',
        logo: '/images/mc.jpg',
        url: '#',
        tier: 'title'
      },
    ],
    printingPartner: [
      {
        id: 'print1',
        name: 'Printing Partner',
        logo: '/images/fing.png',
        url: '#',
        tier: 'printing'
      },
    ],
    hydrationPartner: [
      {
        id: 'hydration1',
        name: 'Hydration Partner',
        logo: '/images/os.jpg',
        url: '#',
        tier: 'hydration'
      },
    ],
    soundPartner: [
      {
        id: 'Sound1',
        name: 'Sound Partner',
        logo: '/images/ag.jpeg',
        url: '#',
        tier: 'Sound'
      },
    ],
    lightingPartner: [
      {
        id: 'Lightning1',
        name: 'Lighting Partner',
        logo: '/images/mm.PNG',
        url: '#',
        tier: 'Lighting'
      },
    ],
    ledPartner: [
      {
        id: 'led1',
        name: 'LED Partner',
        logo: '/images/loki.jpeg',
        url: '#',
        tier: 'LED'
      },
    ],
    platinumSponsors: [
      {
        id: 1,
        name: 'Zone Niathu',
        logo: '/images/zn.png',
        url: '#',
        tier: 'platinum'
      },
    ],
    goldSponsors: [
      {
        id: 1,
        name: 'JJ Arena',
        logo: '/images/jj.jpg',
        url: '#',
        tier: 'gold'
      },
      {
        id: 2,
        name: 'Ohito Sumi',
        logo: '/sponsors/logo-placeholder.png',
        url: '#',
        tier: 'gold'
      },
    ],
    collaborationSponsors: [
      {
        id: 1,
        name: 'JJ Arena',
        logo: '/images/jj.jpg',
        url: '#',
        tier: 'gold'
      },
      {
        id: 2,
        name: 'Ohito Sumi',
        logo: '/sponsors/logo-placeholder.png',
        url: '#',
        tier: 'gold'
      },
    ],
    InkindSponsors: [
      {
        id: 1,
        name: 'Daba Arcade',
        logo: '/images/da.jpg',
        url: '#',
        tier: 'gold'
      },
      {
        id: 2,
        name: 'Nagaland Running Club',
        logo: '/images/nrc.jpg',
        url: '#',
        tier: 'gold'
      },
      {
        id: 3,
        name: 'Naga Jersey Club',
        logo: '/images/njh.jpg',
        url: '#',
        tier: 'gold'
      },
    ]
  };

  // Replace with your actual Google Form URL
  const sponsorFormUrl = '#';

  const renderSponsorCard = (sponsor) => {
    let gradient = '';
    let badgeColor = '';

    switch (sponsor.tier) {
      case 'title':
        gradient = 'from-amber-400/10 to-yellow-500/10';
        badgeColor = 'from-amber-400 to-yellow-500';
        break;
      case 'platinum':
        gradient = 'from-yellow-300/10 to-yellow-600/10';
        badgeColor = 'from-yellow-400 to-amber-500';
        break;
      case 'gold':
        gradient = 'from-gray-300/10 to-gray-500/10';
        badgeColor = 'from-gray-300 to-gray-400';
        break;
      case 'printing':
        gradient = 'from-blue-200/10 to-blue-400/10';
        badgeColor = 'from-blue-400 to-blue-600';
        break;
      case 'hydration':
        gradient = 'from-cyan-200/10 to-sky-400/10';
        badgeColor = 'from-cyan-400 to-sky-600';
        break;
       case 'Sound':
        gradient = 'from-cyan-200/10 to-sky-400/10';
        badgeColor = 'from-cyan-400 to-sky-600';
        break;
       case 'Lighting':
        gradient = 'from-cyan-200/10 to-sky-400/10';
        badgeColor = 'from-cyan-400 to-sky-600';
        break;
       case 'LED':
        gradient = 'from-cyan-200/10 to-sky-400/10';
        badgeColor = 'from-cyan-400 to-sky-600';
        break;
      default:
        gradient = 'from-cyan-500/10 to-blue-500/10';
        badgeColor = 'from-cyan-400 to-blue-500';
    }

    return (
      <div className={`relative group bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-${badgeColor.split(' ')[0].split('-')[1]}-500/20`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-grow flex items-center justify-center mb-4 h-40">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x150/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
              }}
            />
          </div>
          <div className="mt-auto">
            <h4 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">{sponsor.name}</h4>
            <div className="flex justify-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${badgeColor} text-white`}>
                <Star className="w-3 h-3 mr-1" />
                {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Tier
              </span>
            </div>
          </div>
        </div>
        {sponsor.url && (
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20"
            aria-label={`Visit ${sponsor.name} website`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white transition-colors duration-500">
      <CinematicBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Sponsors
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're grateful to our amazing sponsors for their generous support in making Ekarikthin 2026 possible.
          </motion.p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Sponsor */}
          {sponsors.titleSponsor.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Title Sponsor
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.titleSponsor.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {renderSponsorCard(sponsor)}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Printing Partner */}
          {sponsors.printingPartner.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Printing Partner
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.printingPartner.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Hydration Partner */}
          {sponsors.hydrationPartner.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Hydration Partner
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.hydrationPartner.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}


          {/* Sound Partner */}
          {sponsors.soundPartner.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Sound Partner
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.soundPartner.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}


          {/* Lighting Partner */}
          {sponsors.lightingPartner.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Lighting Partner
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.lightingPartner.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* LED Partner */}
          {sponsors.ledPartner.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                LED Partner
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.ledPartner.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

           {/* collaboration Partner */}
          {sponsors.collaborationSponsor.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Collaboration & Partners
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.collaborationSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Inkind Partner */}
          {sponsors.InkindSponsors.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 to-sky-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Inkind Sponsors
              </motion.h3>
              <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                {sponsors.InkindSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="w-64 h-64 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 to-sky-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-grow flex items-center justify-center mb-4 h-full">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x400/1a1a2e/e6e6e6?text=' + encodeURIComponent(sponsor.name);
                            }}
                          />
                        </div>
                      </div>
                      {sponsor.url && (
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          aria-label={`Visit ${sponsor.name} website`}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          
          
          {/* Platinum Sponsors */}
          {sponsors.platinumSponsors.length > 0 && (
            <div className="mb-20">
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-10 text-center bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Platinum Sponsors
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {sponsors.platinumSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {renderSponsorCard(sponsor)}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Gold Sponsors */}
          {sponsors.goldSponsors.length > 0 && (
            <div className="mb-16">
              <motion.h3
                className="text-xl md:text-2xl font-bold mb-8 text-center bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Gold Sponsors
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {sponsors.goldSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    {renderSponsorCard(sponsor)}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 md:p-10 border border-gray-200 dark:border-white/10 shadow-xl">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-yellow-600 dark:from-amber-300 dark:to-yellow-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Want to be a part of Ekarikthin 2025?
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join our prestigious list of sponsors and showcase your brand to thousands of attendees at the biggest cultural fest of the year.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <a
                  href="https://forms.gle/U4yETMcXQsQbQ71V6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-bold text-amber-900 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-lg shadow-amber-500/20"
                >
                  <span className="relative z-10">Become a Sponsor</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
