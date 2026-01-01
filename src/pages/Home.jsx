import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Map from "../components/Map";
import { useTheme } from "../context/ThemeContext";

/* ============================================================
   🎥 1. CINEMATIC BACKGROUND
   ============================================================ */
const CinematicBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none w-full h-full" style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
      {/* MAIN BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-black dark:via-[#0b1220] dark:to-black transition-colors duration-500" />

      {/* VOLUMETRIC FOG */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen"
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          backgroundImage: theme === 'dark'
            ? "radial-gradient(ellipse at 50% 50%, rgba(0,140,255,0.1), transparent 70%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* MOVING SPOTLIGHT BEAM */}
      <motion.div
        className="absolute top-[50%] left-1/2 w-[200vmax] h-[200vmax] sm:w-[1400px] sm:h-[1400px] rounded-full opacity-20 dark:opacity-30"
        style={{
          transform: 'translate(-50%, -50%)',
          maxWidth: 'none',
          maxHeight: 'none',
          background: theme === 'dark'
            ? "radial-gradient(circle, rgba(0,180,255,0.15), transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 70%)",
          filter: "blur(160px)",
        }}
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* STAGE LIGHT RAYS */}
      {[...Array(6)].map((_, i) => {
        return (
          <motion.div
            key={i}
            className="absolute w-[1px] sm:w-[2px] h-[200vh] bg-gradient-to-b from-purple-300/30 to-transparent dark:from-cyan-400/40"
            style={{
              transform: 'translateX(-50%)',
              top: '-30vh',
              left: `${15 + i * 15}%`,
              opacity: 0.1,
            }}
            animate={{ y: ["-20%", "20%", "-20%"], opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
};

/* ============================================================
   ⏳ 2. COUNTDOWN TIMER
   ============================================================ */
const Countdown = ({ targetDate = "2026-02-17T00:00:00" }) => {
  const target = new Date(targetDate);

  const [time, setTime] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return false;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff / 3600000) % 24);
      const minutes = Math.floor((diff / 60000) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });

      return true;
    };

    // run once immediately
    const running = update();
    if (!running) return;

    const interval = setInterval(() => {
      const still = update();
      if (!still) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 sm:mt-8 px-3 sm:px-4">
      <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
        {Object.entries(time).map(([key, value]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 p-1.5 sm:p-3 md:p-4 rounded-lg sm:rounded-2xl shadow-lg dark:shadow-[0_0_10px_rgba(0,200,255,0.2)] text-gray-800 dark:text-white"
          >
            <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold leading-none">{value}</div>
            <div className="text-[9px] xs:text-[10px] sm:text-xs uppercase mt-0.5 sm:mt-1 tracking-wider text-cyan-600 dark:text-cyan-300">{key}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   🌌 3. HOMEPAGE HERO
   ============================================================ */
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const moveX = useTransform(x, [-300, 300], [-20, 20]);
  const moveY = useTransform(y, [-300, 300], [-10, 10]);

  useEffect(() => {
    // Check if mobile and update state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      x.set(0);
      y.set(0);
      window.removeEventListener('resize', checkMobile);
    };
  }, [x, y]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      onMouseMove={(e) => {
        // Only apply parallax effect on larger screens
        if (window.innerWidth >= 768) {
          x.set(e.clientX - window.innerWidth / 2);
          y.set(e.clientY - window.innerHeight / 2);
        }
      }}
    >
      <CinematicBackground />

      <div className="relative z-10">
        {/* ================= HERO ================= */}
        <section className="min-h-[78vh] sm:min-h-[85vh] flex flex-col justify-center items-center text-center px-3 sm:px-4 md:px-6 relative z-10 pt-24 sm:pt-32 md:pt-36 pb-6 sm:pb-10">
          {/* BADGE */}
          <motion.div
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/50 dark:bg-white/10 backdrop-blur-xl rounded-full border border-gray-200 dark:border-white/20 shadow-lg text-gray-800 dark:text-white text-xs xs:text-sm sm:text-base font-medium sm:font-semibold mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 mx-2 w-auto max-w-[95vw] sm:max-w-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-300 flex-shrink-0" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">Ekarikthin 2026 • The Grand Cultural Festival</span>
          </motion.div>

          {/* HERO TITLE */}
          <motion.h1
            style={!isMobile ? { x: moveX, y: moveY } : {}}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 dark:from-cyan-300 dark:via-blue-400 dark:to-emerald-300 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(0,200,255,0.4)] px-2 sm:px-4 text-center leading-[1.1] sm:leading-tight"
          >
            EKARIKTHIN 2K26
          </motion.h1>

          <motion.div className="space-y-0.5 sm:space-y-1">
            <motion.p
              className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-700 dark:text-cyan-300 font-bold tracking-wider sm:tracking-widest px-2 sm:px-4 text-center leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              THE CULTURAL EXTRAVAGANZA
            </motion.p>
            <motion.p
              className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-700 dark:text-cyan-300 font-bold tracking-wider sm:tracking-widest px-2 sm:px-4 text-center leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              OF NIT NAGALAND
            </motion.p>
          </motion.div>

          <motion.p
            className="max-w-2xl mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg text-gray-600 dark:text-gray-300 px-3 sm:px-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Experience Northeast India's most electrifying cultural festival — lights, art, music, dance,
            and a cinematic celebration of creativity.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/events"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(0,200,255,0.4)] hover:shadow-[0_0_25px_rgba(0,200,255,0.6)] transition-all duration-300 flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              Explore Events <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <a
              href="#highlights"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base text-gray-700 dark:text-white bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20 transition flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Highlights
            </a>
          </motion.div>

          <Countdown />
        </section>

        {/* ================= SINGLE LOGO SHOWCASE ================= */}
        <section className="py-12 sm:py-16 md:py-20 relative z-10 text-center px-4 sm:px-6 md:px-8" id="highlights">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-300 mb-6 sm:mb-8 md:mb-10 drop-shadow-lg">Festival Logo</h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="px-2"
          >
            <img
              src="assests/ekarikthin.png"
              alt="Event Logo"
              className="mx-auto w-full max-w-[250px] sm:max-w-[300px] object-contain"
            />
          </motion.div>
        </section>

        {/* ================= AFTERMOVIE SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-20 text-center relative z-10 px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-300 drop-shadow-lg mb-6 sm:mb-8 md:mb-10">Aftermovie 2023</h2>
          <div className="max-w-4xl mx-auto px-1 sm:px-3">
            <motion.div
              className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg dark:shadow-[0_0_30px_rgba(0,200,255,0.3)] border border-gray-200 dark:border-white/20 bg-white/50 dark:bg-black/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/T0Hf_Q9SAG8?si=ihRnfdsMLoJV3udL"
                  title="Ekarikthin 2023 Aftermovie"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 'none' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= EKARIKTHIN 2020 MOVIE SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-20 text-center relative z-10 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-black/30">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-300 drop-shadow-lg mb-6 sm:mb-8 md:mb-10">Ekarikthin 2020 Movie</h2>
          <div className="max-w-4xl mx-auto px-1 sm:px-3">
            <motion.div
              className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg dark:shadow-[0_0_30px_rgba(0,200,255,0.3)] border border-gray-200 dark:border-white/20 bg-white/50 dark:bg-black/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/S3skvtm7HfI?si=D5SPT3f6ZDQk9F2R"
                  title="Ekarikthin 2020 Aftermovie"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 'none' }}
                />
              </div>
            </motion.div>
          </div>
        </section>



        {/* ================= MAP SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-20 relative z-10 px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-300 text-center mb-6 sm:mb-8">Festival Venue Map</h2>

          <div className="max-w-4xl mx-auto rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-lg dark:shadow-[0_0_30px_rgba(0,200,255,0.4)] p-2 sm:p-3 md:p-4">
            <div className="relative group">
              <Map />
              <a
                href="https://www.google.com/maps/d/embed?mid=1vHMns8xqwBpyWr9j0JgeNNjDNWs&ehbc=2E312F"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <div className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium flex items-center gap-1.5 sm:gap-2">
                  <span>Open in Maps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                <span className="opacity-70">Venue:</span>{' '}
                <a
                  href="https://www.google.com/maps?q=NIT+Nagaland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-200 hover:underline break-words inline-block max-w-full"
                >
                  NIT Nagaland, Chumukedima, Nagaland - 797103
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
