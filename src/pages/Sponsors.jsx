import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/* ---------------- Background ---------------- */

const CinematicBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-black dark:via-[#0b1220] dark:to-black transition-colors duration-500" />

      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

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
                theme === "dark"
                  ? "0 0 8px rgba(255,255,255,0.8)"
                  : "0 0 6px rgba(99,102,241,0.6)"
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        );
      })}
    </div>
  );
};

/* ---------------- Sponsors Page ---------------- */

const Sponsors = () => {
  const sponsors = {
    titleSponsor: [
      { id: 1, name: "Tawa Restaurant", logo: "/images/tr.jpeg" },
      { id: 2, name: "Progressive Motors", logo: "/images/pm.jpg" },
      { id: 3, name: "Melody Centre", logo: "/images/mc.jpg" },
     // { id: 4, name: "Swarna Bhoomi", logo: "/images/swarna.jpg" }
    ],
    platinumSponsors: [
      { id: 1, name: "Zone Niathu", logo: "/images/zn.png" }
    ],
    goldSponsors: [
      { id: 1, name: "JJ Arena", logo: "/images/jj.jpg" },
      { id: 2, name: "Ohito Sumi", logo: "/sponsors/logo-placeholder.png" }
    ],
    printingPartner: [
      { id: 1, name: "Printing Partner", logo: "/images/fing.png" }
    ],
    hydrationPartner: [
      { id: 1, name: "Hydration Partner", logo: "/images/os.jpg" }
    ],
    soundPartner: [
      { id: 1, name: "Sound Partner", logo: "/images/ag.jpeg" }
    ],
    lightingPartner: [
      { id: 1, name: "Lighting Partner", logo: "/images/mm.PNG" }
    ],
    ledPartner: [
      { id: 1, name: "LED Partner", logo: "/images/loki.jpeg" }
    ],
    collaborationSponsors: [
      { id: 1, name: "JJ Arena", logo: "/images/jj.jpg" },
      { id: 2, name: "Ohito Sumi", logo: "/sponsors/logo-placeholder.png" }
    ],
    inkindSponsors: [
      { id: 1, name: "Daba Arcade", logo: "/images/da.jpg" },
      { id: 2, name: "Nagaland Running Club", logo: "/images/nrc.jpg" }
    ]
  };

  /* ----------- Render Section ----------- */

  const renderSection = (title, list) => {
    if (!list || list.length === 0) return null;

    return (
      <div className="mb-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <div
          className={`grid gap-10 mx-auto ${
            list.length === 1
              ? "grid-cols-1 justify-items-center max-w-sm"
              : list.length === 2
              ? "grid-cols-1 sm:grid-cols-2 justify-items-center max-w-2xl"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl"
          }`}
        >
          {list.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-32 object-contain mb-3 hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x150?text=" +
                    encodeURIComponent(sponsor.name);
                }}
              />

              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                {sponsor.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  /* ---------------- Render Page ---------------- */

  return (
    <div className="min-h-screen text-gray-900 dark:text-white">
      <CinematicBackground />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Sponsors
        </motion.h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We sincerely thank our sponsors for supporting Ekarikthin 2026.
        </p>
      </section>

      {/* Sponsors Sections */}
      <section className="px-4">
        {renderSection("Title Sponsors", sponsors.titleSponsor)}
        {renderSection("Platinum Sponsors", sponsors.platinumSponsors)}
        {renderSection("Gold Sponsors", sponsors.goldSponsors)}
        {renderSection("Printing Partner", sponsors.printingPartner)}
        {renderSection("Hydration Partner", sponsors.hydrationPartner)}
        {renderSection("Sound Partner", sponsors.soundPartner)}
        {renderSection("Lighting Partner", sponsors.lightingPartner)}
        {renderSection("LED Partner", sponsors.ledPartner)}
        {renderSection("Collaboration Partners", sponsors.collaborationSponsors)}
        {renderSection("In-Kind Sponsors", sponsors.inkindSponsors)}
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4">
        <motion.a
          href="https://forms.gle/U4yETMcXQsQbQ71V6"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-xl font-bold text-amber-900 shadow-lg"
        >
          Become a Sponsor
          <ArrowRight className="ml-2" />
        </motion.a>
      </section>
    </div>
  );
};

export default Sponsors;
