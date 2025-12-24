import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Map from "../components/Map";

/* ============================================================
   🎥 1. CINEMATIC BACKGROUND
   ============================================================ */
const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none w-full h-full" style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
      {/* MAIN DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b1220] to-black" />

      {/* VOLUMETRIC FOG */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0,140,255,0.18), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* MOVING SPOTLIGHT BEAM */}
      <motion.div
        className="absolute top-[50%] left-1/2 w-[200vmax] h-[200vmax] sm:w-[1400px] sm:h-[1400px] rounded-full opacity-30"
        style={{
          transform: 'translate(-50%, -50%)',
          maxWidth: 'none',
          maxHeight: 'none',
          background: "radial-gradient(circle, rgba(0,180,255,0.25), transparent 70%)",
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
            className="absolute w-[1px] sm:w-[2px] h-[200vh] bg-gradient-to-b from-cyan-400/40 to-transparent"
            style={{
              transform: 'translateX(-50%)',
              top: '-30vh',
              left: `${15 + i * 15}%`,
              opacity: 0.15,
            }}
            animate={{ y: ["-20%", "20%", "-20%"], opacity: [0.1, 0.3, 0.1] }}
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
    <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-10 px-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {Object.entries(time).map(([key, value]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-[0_0_15px_rgba(0,200,255,0.2)] text-white"
          >
            <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold">{value}</div>
            <div className="text-[10px] xs:text-xs uppercase mt-0.5 sm:mt-1 tracking-wider text-cyan-300">{key}</div>
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const moveX = useTransform(x, [-300, 300], [-20, 20]);
  const moveY = useTransform(y, [-300, 300], [-10, 10]);

  useEffect(() => {
    // defensive cleanup for motion values
    return () => {
      x.set(0);
      y.set(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={(e) => {
        x.set(e.clientX - window.innerWidth / 2);
        y.set(e.clientY - window.innerHeight / 2);
      }}
    >
      <CinematicBackground />

      <div className="relative z-10">
        {/* ================= HERO ================= */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 relative z-10 pt-20 pb-16 sm:pt-0 sm:pb-0">
          {/* BADGE */}
          <motion.div
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 flex items-center gap-2 mx-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[85vw]">Ekarikthin 2026 • The Grand Cultural Festival</span>
          </motion.div>

          {/* HERO TITLE */}
          <motion.h1
            style={{ x: moveX, y: moveY }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,255,0.4)] px-2 sm:px-4 text-center leading-tight"
          >
            EKARIKTHIN 2K26
          </motion.h1>

          <motion.p
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 font-bold mt-2 sm:mt-3 tracking-wider sm:tracking-widest px-2 sm:px-4 text-center leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            THE CULTURAL EXTRAVAGANZA
          </motion.p>
          <motion.p
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 font-bold tracking-wider sm:tracking-widest px-2 sm:px-4 text-center leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            OF NIT NAGALAND
          </motion.p>

          <motion.p
            className="max-w-2xl mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Experience Northeast India's most electrifying cultural festival — lights, art, music, dance,
            and a cinematic celebration of creativity.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/events"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:shadow-[0_0_35px_rgba(0,200,255,0.6)] transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Events <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <a
              href="#highlights"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-base sm:text-lg text-white bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Highlights
            </a>
          </motion.div>

          <Countdown />
        </section>

        {/* ================= SINGLE LOGO SHOWCASE ================= */}
        <section className="py-12 sm:py-16 md:py-28 relative z-10 text-center px-4" id="highlights">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 mb-8 md:mb-10 drop-shadow-lg">Festival Logo</h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="assests/ekarikthin.png"
              alt="Event Logo"
              className="mx-auto max-w-[300px] object-contain"
            />
          </motion.div>
        </section>

        {/* ================= AFTERMOVIE SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-20 text-center relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 drop-shadow-lg mb-8 md:mb-12">Aftermovie 2023</h2>
          <div className="max-w-4xl mx-auto px-2 sm:px-4">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.3)] border border-white/20 bg-black/30"
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
        <section className="py-12 sm:py-16 md:py-20 text-center relative z-10 px-4 bg-gradient-to-b from-transparent to-black/30">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 drop-shadow-lg mb-8 md:mb-12">Ekarikthin 2020 Movie</h2>
          <div className="max-w-4xl mx-auto px-2 sm:px-4">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.3)] border border-white/20 bg-black/30"
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
        <section className="py-12 sm:py-16 md:py-28 relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-cyan-300 text-center mb-8 md:mb-10">Festival Venue Map</h2>

          <div className="max-w-4xl mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.4)] p-3 sm:p-4 md:p-6">
            <div className="relative group">
              <Map />
              <a 
                href="https://www.google.com/maps/d/embed?mid=1vHMns8xqwBpyWr9j0JgeNNjDNWs&ehbc=2E312F" width="640" height="480" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <div className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
                  <span>Open in Google Maps</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-300 text-sm sm:text-base">
                <span className="opacity-70">Venue:</span>{' '}
                <a 
                  href="https://www.google.com/maps?q=NIT+Nagaland" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 hover:underline"
                >
                  National Institute of Technology Nagaland, Chumukedima, Nagaland - 797103
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
